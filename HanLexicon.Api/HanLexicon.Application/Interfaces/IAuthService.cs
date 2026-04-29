using HanLexicon.Domain.Entities;
using HanLexicon.Application.DTOs.authDto;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanLexicon.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResultDto> LoginAsync(string? email, string? userName, string password, string ipAddress, string? userAgent);
        Task<AuthResultDto> RegisterAsync(string userName,
            string password,
            string? displayName,
            string? email);
        Task<AuthResultDto> RefreshTokenAsync(string clientRefreshToken, string ipAddress, string? userAgent);
        Task RevokeAllUserTokensAsync();
        Task RevokeSingleTokenAsync(string clientRefreshToken);
    }
}
