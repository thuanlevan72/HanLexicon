using Application.Interfaces;
using HanLexicon.Application.DTOs.authDto;
using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Common;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace HanLexicon.Application.Services
{
    public class AuthService : IAuthService
    {

        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService; // Inject anh chàng này vào
        private readonly Guid _currentId;

        public AuthService(IConfiguration configuration, IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
        {
            _configuration = configuration;
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
            _currentId = _currentUserService.UserId;

        }

        public async Task<AuthResultDto> LoginAsync(string? email, string? userName, string password, string ipAddress)
        {
            // 1. FAIL-FAST: Bắt lỗi dữ liệu đầu vào rỗng
            if (string.IsNullOrWhiteSpace(email) && string.IsNullOrWhiteSpace(userName))
                throw new ArgumentException("Phải cung cấp Email hoặc Username để đăng nhập.");

            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Mật khẩu không được để trống.");
           
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                // 1. Tìm user theo Email
                var userRepository = _unitOfWork.Repository<User>();
                // 2. Tìm User (KHÔNG dùng Transaction cho thao tác Read)
                // Ưu tiên tìm theo chính xác trường được truyền vào
                var user = await userRepository.Query()
                    .FirstOrDefaultAsync(x =>
                        (!string.IsNullOrEmpty(email) && x.Email == email) ||
                        (!string.IsNullOrEmpty(userName) && x.Username == userName));

                // 3. Bắt lỗi không tìm thấy tài khoản hoặc tài khoản bị khóa
                if (user == null)
                    throw new UnauthorizedAccessException("Tài khoản hoặc mật khẩu không chính xác.");

                if (!user.IsActive)
                    throw new UnauthorizedAccessException("Tài khoản của bạn đã bị khóa.");

                // 4. Verify Password bằng BCrypt
                bool isPasswordValid = BCrypt.Net.BCrypt.EnhancedVerify(password, user.PasswordHash);
                if (!isPasswordValid)
                    throw new UnauthorizedAccessException("Tài khoản hoặc mật khẩu không chính xác.");
                // 5. Nếu mọi thứ đúng, cập nhật LastLoginAt (Thao tác GHI đơn giản, không cần Transaction)
                user.LastLoginAt = DateTime.UtcNow;

                List<string> role = user.UserRoles.Select(x => x.Role.Code).ToList();



                // TODO: Generate JWT Token và Refresh Token ở đây
                string accessToken = await GenerateJwtTokenAsync(role, user, ipAddress);
                string refreshToken = GenerateRefreshToken();



                userRepository.Update(user);

                _unitOfWork.Repository<UserSession>().Add(new UserSession
                {
                    UserId = user.Id,
                    CreatedAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddDays(3), // cho 3 ngày mới xóa tokken hiệu lực
                    RefreshToken = refreshToken,
                    IpAddress = IPAddress.Parse(ipAddress),
                    UserAgent = ""
                });
                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitTransactionAsync();


                return new AuthResultDto
                {
                    IsSuccess = true,
                    Message = "Đăng nhập thành công",
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                };
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }

        public async Task<AuthResultDto> RefreshTokenAsync(string clientRefreshToken)
        {
            // 1. FAIL-FAST
            if (string.IsNullOrWhiteSpace(clientRefreshToken))
                throw new ArgumentException("Refresh Token không được để trống.");

            try
            {
                var sessionRepo = _unitOfWork.Repository<UserSession>();

                // 2. Tìm Session trong DB (Kèm theo User và Roles)
                // LƯU Ý: Phải Include UserRoles và Role để lúc tạo token không bị lỗi NullReference
                var session = await sessionRepo.Query()
                    .Include(s => s.User)
                        .ThenInclude(u => u.UserRoles)
                        .ThenInclude(ur => ur.Role)
                    .FirstOrDefaultAsync(s => s.RefreshToken == clientRefreshToken && s.UserId == _currentId);

                if (session == null)
                    throw new UnauthorizedAccessException("Refresh Token không hợp lệ hoặc không tồn tại.");

                // 3. Kiểm tra Hạn sử dụng của Refresh Token
                if (session.ExpiresAt < DateTime.UtcNow)
                {
                    // Nếu hết hạn thì tiện tay xóa luôn cho sạch Database
                    sessionRepo.Delete(session);
                    await _unitOfWork.SaveChangesAsync();
                    throw new UnauthorizedAccessException("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                }

                var user = session.User;
                if (user == null || !user.IsActive)
                    throw new UnauthorizedAccessException("Tài khoản của bạn đã bị khóa hoặc không tồn tại.");

                // 4. MỞ TRANSACTION: Xóa token cũ & cấp token mới
                await _unitOfWork.BeginTransactionAsync();

                List<string> roles = user.UserRoles.Select(x => x.Role.Code).ToList();

                // Tạo bộ đôi Token mới
                string newAccessToken = await GenerateJwtTokenAsync(roles, user, session.IpAddress?.ToString() ?? "");
                string newRefreshToken = GenerateRefreshToken();

                // Xóa Session cũ (Chống tái sử dụng Token - Bảo mật cao)
                sessionRepo.Delete(session);

                // Tạo Session mới
                sessionRepo.Add(new UserSession
                {
                    UserId = user.Id,
                    CreatedAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddDays(3), // Gia hạn thêm 3 ngày
                    RefreshToken = newRefreshToken,
                    IpAddress = session.IpAddress, // Giữ nguyên IP cũ hoặc lấy từ HttpContext nếu bạn truyền vào
                    UserAgent = session.UserAgent
                });

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();

                return new AuthResultDto
                {
                    IsSuccess = true,
                    Message = "Làm mới Token thành công",
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                };
            }
            catch (Exception)
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }

        public async Task<AuthResultDto> RegisterAsync(
            string userName,
            string password,
            string? displayName,
            string? email)
        {
            // 1. FAIL-FAST: Validate đầu vào
            if (string.IsNullOrWhiteSpace(userName))
                throw new ArgumentException("Tên đăng nhập không được để trống.");

            if (string.IsNullOrWhiteSpace(password) || password.Length < 6)
                throw new ArgumentException("Mật khẩu phải có ít nhất 6 ký tự.");

           
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var userRepository = _unitOfWork.Repository<User>();
                // 2. Kiểm tra trùng lặp (ĐỌC TRƯỚC, KHÔNG CẦN TRANSACTION)
                bool isUsernameExist = await userRepository.Query().AnyAsync(u => u.Username == userName);
                if (isUsernameExist)
                    throw new InvalidOperationException("Tên đăng nhập này đã có người sử dụng.");

                if (!string.IsNullOrWhiteSpace(email))
                {
                    bool isEmailExist = await userRepository.Query().AnyAsync(u => u.Email == email);
                    if (isEmailExist)
                        throw new InvalidOperationException("Email này đã được đăng ký.");
                }
                // 3. Chuẩn bị dữ liệu ghi (Băm pass)
                string hashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
                Guid userId = Guid.NewGuid();

                var newUser = new User
                {
                    Id = userId,
                    CreatedAt = DateTime.UtcNow,
                    DisplayName = displayName ?? userName, // Cấp fallback nếu displayName null
                    IsActive = true,
                    PasswordHash = hashedPassword,
                    Email = email,
                    Username = userName,
                };

                var newRole = new UserRole
                {
                    CreatedAt = DateTime.UtcNow,
                    RoleId = (short)RoleEnum.Student,
                    UserId = userId,
                };

                userRepository.Add(newUser);
                _unitOfWork.Repository<UserRole>().Add(newRole);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();

                return new AuthResultDto { IsSuccess = true, Message = "Đăng ký thành công" };

            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
           
        }

        public async Task RevokeAllUserTokensAsync()
        {

            try
            {
                var sessionRepo = _unitOfWork.Repository<UserSession>();

                // Tìm toàn bộ phiên đăng nhập của User này
                var activeSessions = await sessionRepo.Query()
                    .Where(s => s.UserId == _currentId)
                    .ToListAsync();

                if (activeSessions.Any())
                {
                    // Xóa tất cả. (Nếu IRepository của bạn có hàm DeleteRange thì dùng, không thì lặp foreach để Delete)
                    foreach (var session in activeSessions)
                    {
                        sessionRepo.Delete(session);
                    }

                    await _unitOfWork.SaveChangesAsync();
                }
            }
            catch (Exception)
            {
                // Log lỗi nếu cần
                throw;
            }
        }

        public async Task RevokeSingleTokenAsync(string clientRefreshToken)
        {
            if (string.IsNullOrWhiteSpace(clientRefreshToken))
                return; // Đăng xuất thì nếu đầu vào sai cứ im lặng return, không cần văng lỗi

            try
            {
                var sessionRepo = _unitOfWork.Repository<UserSession>();

                // Tìm chính xác session khớp cả Token và UserId
                var session = await sessionRepo.Query()
                    .FirstOrDefaultAsync(s => s.RefreshToken == clientRefreshToken && s.UserId == _currentId);

                if (session != null)
                {
                    sessionRepo.Delete(session);
                    await _unitOfWork.SaveChangesAsync();
                }
            }
            catch (Exception)
            {
                // Log lỗi nếu cần
                throw;
            }
        }

        private async Task<string> GenerateJwtTokenAsync(List<string> roles, User user, string ipAddress)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("ipAddress", ipAddress)
            };

            // ==========================================
            // THÊM MỚI: NHÉT CÁC ROLE VÀO JWT TOKEN
            // ==========================================
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}
