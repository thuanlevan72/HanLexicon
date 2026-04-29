using Application.Features.Auth;
using HanLexicon.Application.Features.Auth;
using HanLexicon.Application.Interfaces;
using HanLexicon.Application.Common;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers.Auth
{
    [Route("api/v1/auth")]
    [ApiController          ]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IAuthService _authService;

        public AuthController(IMediator mediator, IAuthService authService)
        {
            _mediator = mediator;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand command)
        {
            var result = await _mediator.Send(command);
            if (!result.IsSuccess) return BadRequest(ApiResponse<object>.Failure(result.Errors, result.Message));
            return Ok(ApiResponse<object>.Success(null, "Đăng ký thành công."));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand command)
        {
            // Tự động lấy IP từ request nếu có thể
            string? remoteIp = HttpContext.Connection.RemoteIpAddress?.ToString();
            
            // Kiểm tra header X-Forwarded-For nếu chạy sau proxy/load balancer
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
            {
                remoteIp = Request.Headers["X-Forwarded-For"].ToString().Split(',')[0].Trim();
            }

            // Ưu tiên IP từ server phát hiện được, nếu không có mới dùng IP từ client gửi lên (hoặc fallback 127.0.0.1)
            string finalIp = !string.IsNullOrEmpty(remoteIp) && remoteIp != "::1" 
                ? remoteIp 
                : (!string.IsNullOrEmpty(command.ipAddress) ? command.ipAddress : "127.0.0.1");

            // Lấy User Agent
            string userAgent = Request.Headers["User-Agent"].ToString();

            var updatedCommand = command with { ipAddress = finalIp, userAgent = userAgent };
            
            var result = await _mediator.Send(updatedCommand);
            if (!result.IsSuccess) return Unauthorized(ApiResponse<object>.Failure(result.Errors, result.Message, 401));
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        {
            await _authService.RevokeSingleTokenAsync(request.ClientRefreshToken);
            return Ok(ApiResponse<object>.Success(null, "Đã đăng xuất."));
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            // Tự động lấy IP từ request
            string? remoteIp = HttpContext.Connection.RemoteIpAddress?.ToString();
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
            {
                remoteIp = Request.Headers["X-Forwarded-For"].ToString().Split(',')[0].Trim();
            }
            string finalIp = !string.IsNullOrEmpty(remoteIp) && remoteIp != "::1" ? remoteIp : "127.0.0.1";
            string userAgent = Request.Headers["User-Agent"].ToString();

            var result = await _mediator.Send(new RefreshTokenCommand(request.RefreshToken, finalIp, userAgent));
            if (!result.IsSuccess) return Unauthorized(ApiResponse<object>.Failure(result.Errors, result.Message, 401));
            return Ok(ApiResponse<object>.Success(result));
        }
    }

    public class LogoutRequest { public string ClientRefreshToken { get; set; } = null!; }
    public class RefreshTokenRequest { public string RefreshToken { get; set; } = null!; }
}
