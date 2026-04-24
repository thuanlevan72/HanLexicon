using Application.Features.Auth;
using HanLexicon.Application.Features.Auth;
using HanLexicon.Application.Features.Lessons;
using HanLexicon.Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HanLexicon.Api.Controllers.Auth
{
    /// <summary>
    /// API xác thực người dùng, đăng ký và quản lý phiên làm việc.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IAuthService _authService;
        public AuthController(IMediator mediator, IAuthService authService)
        {
            _mediator = mediator;
            _authService = authService;
        }

        /// <summary>
        /// Đăng nhập vào hệ thống.
        /// </summary>
        /// <param name="command">Thông tin đăng nhập (Email/Username, Password).</param>
        /// <returns>AuthResultDto chứa JWT Token và thông tin User.</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand command)
        {
            // Giới hạn: 1 IP chỉ được thử đăng nhập 5 lần mỗi phút
            var result = await _mediator.Send(command);

            if (!result.IsSuccess)
                return Unauthorized(new { result.Message, result.Errors });

            return Ok(result);
        }

        /// <summary>
        /// Làm mới Access Token bằng Refresh Token.
        /// </summary>
        [HttpPost("refresh_token")]
        [Authorize]
        public async Task<IActionResult> Refresht([FromBody] RefreshTokenCommand command)
        {
            // Giới hạn: 1 IP chỉ được thử đăng nhập 5 lần mỗi phút
            var clientIp = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            //bool isAllowed = await _rateLimitService.IsAllowedAsync($"login_{clientIp}", 5, TimeSpan.FromMinutes(1));

            //if (!isAllowed) return StatusCode(429, "Bạn spam quá nhanh, vui lòng thử lại sau 1 phút!");
            var result = await _mediator.Send(command);

            if (!result.IsSuccess)
                return Unauthorized(new { result.Message, result.Errors });

            return Ok(result);
        }

        /// <summary>
        /// Đăng ký tài khoản người dùng mới.
        /// </summary>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand command)
        {
            var result = await _mediator.Send(command);

            if (!result.IsSuccess)
                return BadRequest(new { result.Message, result.Errors });

            return Ok(new { result.Message });
        }

        /// <summary>
        /// Đăng xuất khỏi thiết bị hiện tại.
        /// Vô hiệu hóa Refresh Token đang sử dụng.
        /// </summary>
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        {
            await _authService.RevokeSingleTokenAsync(request.ClientRefreshToken);
            return Ok(new { message = "Đã đăng xuất thiết bị hiện tại." });
        }

        /// <summary>
        /// Đăng xuất khỏi tất cả thiết bị.
        /// Xóa toàn bộ phiên làm việc của người dùng hiện tại.
        /// </summary>
        [HttpPost("logout-all")]
        [Authorize]
        public async Task<IActionResult> LogoutAll()
        {
            await _authService.RevokeAllUserTokensAsync();
            return Ok(new { message = "Đã đăng xuất khỏi tất cả các thiết bị." });
        }
    }
}
