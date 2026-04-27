using HanLexicon.Application.Features.Users;
using HanLexicon.Application.Common;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers
{
    /// <summary>
    /// Nghiệp vụ quản lý hồ sơ và phân tích dữ liệu cá nhân.
    /// </summary>
    [Route("api/v1/profile")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProfileController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var result = await _mediator.Send(new QueryGetProfile());
            return Ok(ApiResponse<object>.Success(result));
        }

        /// <summary>
        /// Lấy bảng thống kê thành tích học tập (Điểm, Thời gian...).
        /// </summary>
        [HttpGet("analytics")]
        public async Task<IActionResult> GetAnalytics()
        {
            var result = await _mediator.Send(new QueryGetUserStats());
            return Ok(ApiResponse<object>.Success(result));
        }

        /// <summary>
        /// Lấy danh sách tiến độ chi tiết của các từ vựng đã học.
        /// </summary>
        [HttpGet("vocabulary-mastery")]
        public async Task<IActionResult> GetVocabularyMastery()
        {
            var result = await _mediator.Send(new QueryGetUserWordProgress());
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("learning-history")]
        public async Task<IActionResult> GetLearningHistory()
        {
            var result = await _mediator.Send(new QueryGetUserLearningHistory());
            return Ok(ApiResponse<object>.Success(result));
        }
    }
}
