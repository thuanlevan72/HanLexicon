using HanLexicon.Domain.Entities;
using Application.Interfaces;
using HanLexicon.Application.DTOs.authDto;
using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Common;
using HanLexicon.Domain.Interfaces;
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
            // 1. FAIL-FAST: B?t l?i d? li?u d?u vào r?ng
            if (string.IsNullOrWhiteSpace(email) && string.IsNullOrWhiteSpace(userName))
                throw new ArgumentException("Ph?i cung c?p Email ho?c Username d? dang nh?p.");

            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("M?t kh?u không du?c d? tr?ng.");
           
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                // 1. Tìm user theo Email
                var userRepository = _unitOfWork.Repository<User>();
                // 2. Tìm User (KHÔNG dùng Transaction cho thao tác Read)
                // Uu tiên tìm theo chính xác tru?ng du?c truy?n vào
                var user = await userRepository.Query()
                    .Include(u => u.UserRoles)
                        .ThenInclude(ur => ur.Role)
                    .FirstOrDefaultAsync(x =>
                        (!string.IsNullOrEmpty(email) && x.Email == email) ||
                        (!string.IsNullOrEmpty(userName) && x.Username == userName));

                // 3. B?t l?i không tìm th?y tài kho?n ho?c tài kho?n b? khóa
                if (user == null)
                    throw new UnauthorizedAccessException("Tài kho?n ho?c m?t kh?u không chính xác.");

                if (!user.IsActive)
                    throw new UnauthorizedAccessException("Tài kho?n c?a b?n dã b? khóa.");

                // 4. Verify Password b?ng BCrypt
                bool isPasswordValid = BCrypt.Net.BCrypt.EnhancedVerify(password, user.PasswordHash);
                if (!isPasswordValid)
                    throw new UnauthorizedAccessException("Tài kho?n ho?c m?t kh?u không chính xác.");
                // 5. N?u m?i th? dúng, c?p nh?t LastLoginAt (Thao tác GHI don gi?n, không c?n Transaction)
                user.LastLoginAt = DateTime.UtcNow;

                List<string> role = user.UserRoles.Select(x => x.Role.Code).ToList();



                // TODO: Generate JWT Token và Refresh Token ? dây
                string accessToken = await GenerateJwtTokenAsync(role, user, ipAddress);
                string refreshToken = GenerateRefreshToken();



                userRepository.Update(user);

                _unitOfWork.Repository<UserSession>().Add(new UserSession
                {
                    UserId = user.Id,
                    CreatedAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddDays(3), // cho 3 ngày m?i xóa tokken hi?u l?c
                    RefreshToken = refreshToken,
                    IpAddress = IPAddress.Parse(ipAddress),
                    UserAgent = ""
                });
                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitTransactionAsync();


                return new AuthResultDto
                {
                    IsSuccess = true,
                    Message = "Ðang nh?p thành công",
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    UserId = user.Id
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
                throw new ArgumentException("Refresh Token không du?c d? tr?ng.");

            try
            {
                var sessionRepo = _unitOfWork.Repository<UserSession>();

                // 2. Tìm Session trong DB (Kèm theo User và Roles)
                // LUU Ý: Ph?i Include UserRoles và Role d? lúc t?o token không b? l?i NullReference
                var session = await sessionRepo.Query()
                    .Include(s => s.User)
                        .ThenInclude(u => u.UserRoles)
                        .ThenInclude(ur => ur.Role)
                    .FirstOrDefaultAsync(s => s.RefreshToken == clientRefreshToken && s.UserId == _currentId);

                if (session == null)
                    throw new UnauthorizedAccessException("Refresh Token không h?p l? ho?c không t?n t?i.");

                // 3. Ki?m tra H?n s? d?ng c?a Refresh Token
                if (session.ExpiresAt < DateTime.UtcNow)
                {
                    // N?u h?t h?n thì ti?n tay xóa luôn cho s?ch Database
                    sessionRepo.Delete(session);
                    await _unitOfWork.SaveChangesAsync();
                    throw new UnauthorizedAccessException("Phiên dang nh?p dã h?t h?n. Vui lòng dang nh?p l?i.");
                }

                var user = session.User;
                if (user == null || !user.IsActive)
                    throw new UnauthorizedAccessException("Tài kho?n c?a b?n dã b? khóa ho?c không t?n t?i.");

                // 4. M? TRANSACTION: Xóa token cu & c?p token m?i
                await _unitOfWork.BeginTransactionAsync();

                List<string> roles = user.UserRoles.Select(x => x.Role.Code).ToList();

                // T?o b? dôi Token m?i
                string newAccessToken = await GenerateJwtTokenAsync(roles, user, session.IpAddress?.ToString() ?? "");
                string newRefreshToken = GenerateRefreshToken();

                // Xóa Session cu (Ch?ng tái s? d?ng Token - B?o m?t cao)
                sessionRepo.Delete(session);

                // T?o Session m?i
                sessionRepo.Add(new UserSession
                {
                    UserId = user.Id,
                    CreatedAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddDays(3), // Gia h?n thêm 3 ngày
                    RefreshToken = newRefreshToken,
                    IpAddress = session.IpAddress, // Gi? nguyên IP cu ho?c l?y t? HttpContext n?u b?n truy?n vào
                    UserAgent = session.UserAgent
                });

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();

                return new AuthResultDto
                {
                    IsSuccess = true,
                    Message = "Làm m?i Token thành công",
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken,
                    UserId = user.Id
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
            // 1. FAIL-FAST: Validate d?u vào
            if (string.IsNullOrWhiteSpace(userName))
                throw new ArgumentException("Tên dang nh?p không du?c d? tr?ng.");

            if (string.IsNullOrWhiteSpace(password) || password.Length < 6)
                throw new ArgumentException("M?t kh?u ph?i có ít nh?t 6 ký t?.");

           
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var userRepository = _unitOfWork.Repository<User>();
                // 2. Ki?m tra trùng l?p (Ð?C TRU?C, KHÔNG C?N TRANSACTION)
                bool isUsernameExist = await userRepository.Query().AnyAsync(u => u.Username == userName);
                if (isUsernameExist)
                    throw new InvalidOperationException("Tên dang nh?p này dã có ngu?i s? d?ng.");

                if (!string.IsNullOrWhiteSpace(email))
                {
                    bool isEmailExist = await userRepository.Query().AnyAsync(u => u.Email == email);
                    if (isEmailExist)
                        throw new InvalidOperationException("Email này dã du?c dang ký.");
                }
                // 3. Chu?n b? d? li?u ghi (Bam pass)
                string hashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
                Guid userId = Guid.NewGuid();

                var newUser = new User
                {
                    Id = userId,
                    CreatedAt = DateTime.UtcNow,
                    DisplayName = displayName ?? userName, // C?p fallback n?u displayName null
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

                return new AuthResultDto { IsSuccess = true, Message = "Ðang ký thành công" };

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

                // Tìm toàn b? phiên dang nh?p c?a User này
                var activeSessions = await sessionRepo.Query()
                    .Where(s => s.UserId == _currentId)
                    .ToListAsync();

                if (activeSessions.Any())
                {
                    // Xóa t?t c?. (N?u IRepository c?a b?n có hàm DeleteRange thì dùng, không thì l?p foreach d? Delete)
                    foreach (var session in activeSessions)
                    {
                        sessionRepo.Delete(session);
                    }

                    await _unitOfWork.SaveChangesAsync();
                }
            }
            catch (Exception)
            {
                // Log l?i n?u c?n
                throw;
            }
        }

        public async Task RevokeSingleTokenAsync(string clientRefreshToken)
        {
            if (string.IsNullOrWhiteSpace(clientRefreshToken))
                return; // Ðang xu?t thì n?u d?u vào sai c? im l?ng return, không c?n vang l?i

            try
            {
                var sessionRepo = _unitOfWork.Repository<UserSession>();

                // Tìm chính xác session kh?p c? Token và UserId
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
                // Log l?i n?u c?n
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
            // THÊM M?I: NHÉT CÁC ROLE VÀO JWT TOKEN
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
