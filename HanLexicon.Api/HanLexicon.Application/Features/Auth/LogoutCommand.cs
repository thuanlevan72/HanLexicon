using HanLexicon.Domain.Entities;
using Application.Interfaces;
using HanLexicon.Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Features.Auth
{
    public class LogoutRequest 
    {
        public string ClientRefreshToken { get; set; }
        public bool LogoutAllDevices { get; set; }
    }
    public record LogoutCommand(LogoutRequest LogoutRequest) : IRequest<string>;
    public class LogoutCommandHandler : IRequestHandler<LogoutCommand, string>
    {
        private readonly IAuthService _authService;
        private readonly ICurrentUserService _currentUserService;
        public LogoutCommandHandler(IAuthService authService, ICurrentUserService currentUserService)
        {
            _authService = authService;
            _currentUserService = currentUserService;
        }
        public async Task<string> Handle(LogoutCommand request, CancellationToken cancellationToken)
        {

            // 2. X? lý 2 l?a ch?n
            if (request.LogoutRequest.LogoutAllDevices)
            {
                // L?a ch?n 1: Ðang xu?t m?i thi?t b?
                await _authService.RevokeAllUserTokensAsync();
                return "Ðã dang xu?t thành công kh?i T?T C? các thi?t b?.";
            }
            else
            {
                // L?a ch?n 2: Ðang xu?t thi?t b? hi?n t?i (Truy?n kèm currentUserId d? b?o m?t)
                await _authService.RevokeSingleTokenAsync(request.LogoutRequest.ClientRefreshToken);
                return "Ðã dang xu?t thành công kh?i thi?t b? hi?n t?i.";
            }

        }
    }
}
