using HanLexicon.Application.Features.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HanLexicon.Api.Controllers
{
    /// <summary>
    /// API cung cấp thông tin cá nhân và thống kê học tập của người dùng.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Lấy thống kê tổng quát (Điểm trung bình, Số bài học hoàn thành...).
        /// Dữ liệu từ View v_user_stats.
        /// </summary>
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            return Ok(await _mediator.Send(new QueryGetUserStats()));
        }

        /// <summary>
        /// Lấy danh sách tiến độ của tất cả từ vựng mà người dùng đã tương tác.
        /// </summary>
        [HttpGet("word-progress")]
        public async Task<IActionResult> GetWordProgress()
        {
            return Ok(await _mediator.Send(new QueryGetUserWordProgress()));
        }
    }
}
