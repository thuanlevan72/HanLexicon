using HanLexicon.Application.Features.Users;
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
        private readonly ICurrentUserService _currentUserService;
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
            if (string.IsNullOrWhiteSpace(email) && string.IsNullOrWhiteSpace(userName))
                return new AuthResultDto { IsSuccess = false, Message = "Phải cung cấp Email hoặc Username để đăng nhập." };

            if (string.IsNullOrWhiteSpace(password))
                return new AuthResultDto { IsSuccess = false, Message = "Mật khẩu không được để trống." };
           
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var userRepository = _unitOfWork.Repository<User>();
                var user = await userRepository.Query()
                    .Include(u => u.UserRoles)
                        .ThenInclude(ur => ur.Role)
                    .FirstOrDefaultAsync(x =>
                        (!string.IsNullOrEmpty(email) && x.Email == email) ||
                        (!string.IsNullOrEmpty(userName) && x.Username == userName));

                if (user == null)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    return new AuthResultDto { IsSuccess = false, Message = "Tài khoản hoặc mật khẩu không chính xác." };
                }

                if (!user.IsActive)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    return new AuthResultDto { IsSuccess = false, Message = "Tài khoản của bạn đã bị khóa." };
                }

                bool isPasswordValid = BCrypt.Net.BCrypt.EnhancedVerify(password, user.PasswordHash);
                if (!isPasswordValid)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    return new AuthResultDto { IsSuccess = false, Message = "Tài khoản hoặc mật khẩu không chính xác." };
                }

                user.LastLoginAt = DateTime.UtcNow;
                List<string> roleCodes = user.UserRoles.Select(x => x.Role.Code.ToLower()).ToList();
                
                // Xác định role chính để trả về cho Frontend
                string primaryRole = roleCodes.Contains("admin") ? "admin" : "student";

                string accessToken = await GenerateJwtTokenAsync(roleCodes, user, ipAddress);
                string refreshToken = GenerateRefreshToken();

                userRepository.Update(user);

                _unitOfWork.Repository<UserSession>().Add(new UserSession
                {
                    UserId = user.Id,
                    CreatedAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddDays(3),
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
                    RefreshToken = refreshToken,
                    UserId = user.Id,
                    User = new UserProfileDto
                    {
                        Id = user.Id,
                        Username = user.Username,
                        Email = user.Email ?? "",
                        DisplayName = user.DisplayName ?? user.Username,
                        IsActive = user.IsActive,
                        CreatedAt = user.CreatedAt,
                        Avatar = $"https://api.dicebear.com/7.x/avataaars/svg?seed={user.Username}",
                        Role = primaryRole
                    }
                };
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                return new AuthResultDto { IsSuccess = false, Message = "Đã có lỗi xảy ra: " + ex.Message };
            }
        }

        public async Task<AuthResultDto> RefreshTokenAsync(string clientRefreshToken)
        {
            if (string.IsNullOrWhiteSpace(clientRefreshToken))
                return new AuthResultDto { IsSuccess = false, Message = "Refresh Token không được để trống." };

            try
            {
                var sessionRepo = _unitOfWork.Repository<UserSession>();
                var session = await sessionRepo.Query()
                    .Include(s => s.User)
                        .ThenInclude(u => u.UserRoles)
                        .ThenInclude(ur => ur.Role)
                    .FirstOrDefaultAsync(s => s.RefreshToken == clientRefreshToken && s.UserId == _currentId);

                if (session == null)
                    return new AuthResultDto { IsSuccess = false, Message = "Refresh Token không hợp lệ hoặc không tồn tại." };

                if (session.ExpiresAt < DateTime.UtcNow)
                {
                    sessionRepo.Delete(session);
                    await _unitOfWork.SaveChangesAsync();
                    return new AuthResultDto { IsSuccess = false, Message = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." };
                }

                var user = session.User;
                if (user == null || !user.IsActive)
                    return new AuthResultDto { IsSuccess = false, Message = "Tài khoản của bạn đã bị khóa hoặc không tồn tại." };

                await _unitOfWork.BeginTransactionAsync();
                List<string> roles = user.UserRoles.Select(x => x.Role.Code.ToLower()).ToList();

                string newAccessToken = await GenerateJwtTokenAsync(roles, user, session.IpAddress?.ToString() ?? "");
                string newRefreshToken = GenerateRefreshToken();

                sessionRepo.Delete(session);

                sessionRepo.Add(new UserSession
                {
                    UserId = user.Id,
                    CreatedAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddDays(3),
                    RefreshToken = newRefreshToken,
                    IpAddress = session.IpAddress,
                    UserAgent = session.UserAgent
                });

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();

                return new AuthResultDto
                {
                    IsSuccess = true,
                    Message = "Làm mới Token thành công",
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken,
                    UserId = user.Id
                };
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                return new AuthResultDto { IsSuccess = false, Message = "Đã có lỗi xảy ra: " + ex.Message };
            }
        }

        public async Task<AuthResultDto> RegisterAsync(string userName, string password, string? displayName, string? email)
        {
            if (string.IsNullOrWhiteSpace(userName))
                return new AuthResultDto { IsSuccess = false, Message = "Tên đăng nhập không được để trống." };

            if (string.IsNullOrWhiteSpace(password) || password.Length < 6)
                return new AuthResultDto { IsSuccess = false, Message = "Mật khẩu phải có ít nhất 6 ký tự." };

            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var userRepository = _unitOfWork.Repository<User>();
                
                bool isUsernameExist = await userRepository.Query().AnyAsync(u => u.Username == userName);
                if (isUsernameExist)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    return new AuthResultDto { IsSuccess = false, Message = "Tên đăng nhập này đã có người sử dụng." };
                }

                if (!string.IsNullOrWhiteSpace(email))
                {
                    bool isEmailExist = await userRepository.Query().AnyAsync(u => u.Email == email);
                    if (isEmailExist)
                    {
                        await _unitOfWork.RollbackTransactionAsync();
                        return new AuthResultDto { IsSuccess = false, Message = "Email này đã được đăng ký." };
                    }
                }

                string hashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
                Guid userId = Guid.NewGuid();

                var newUser = new User
                {
                    Id = userId,
                    CreatedAt = DateTime.UtcNow,
                    DisplayName = displayName ?? userName,
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
                return new AuthResultDto { IsSuccess = false, Message = "Đã có lỗi xảy ra: " + ex.Message };
            }
        }

        public async Task RevokeAllUserTokensAsync()
        {
            try
            {
                var sessionRepo = _unitOfWork.Repository<UserSession>();
                var activeSessions = await sessionRepo.Query()
                    .Where(s => s.UserId == _currentId)
                    .ToListAsync();

                if (activeSessions.Any())
                {
                    foreach (var session in activeSessions)
                    {
                        sessionRepo.Delete(session);
                    }
                    await _unitOfWork.SaveChangesAsync();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task RevokeSingleTokenAsync(string clientRefreshToken)
        {
            if (string.IsNullOrWhiteSpace(clientRefreshToken))
                return;

            try
            {
                var sessionRepo = _unitOfWork.Repository<UserSession>();
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
