using HanLexicon.Application.Features.Lessons;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HanLexicon.Api.Controllers
{
    /// <summary>
    /// API cung cấp dữ liệu bài học và học tập cho người dùng.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class LessonsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;

        public LessonsController(IMediator mediator, ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
        }

        /// <summary>
        /// Lấy danh sách tất cả các danh mục và bài học tương ứng.
        /// Dùng để hiển thị ở màn hình chọn bài học.
        /// </summary>
        /// <returns>Cấu trúc cây Categories và Lessons.</returns>
        [HttpGet("GetLessons")]
        public async Task<IActionResult> GetLessons()
        { 
            return Ok(await _mediator.Send(new QueryGetLessons()));
        }

        /// <summary>
        /// Lấy chi tiết đầy đủ của một bài học.
        /// Bao gồm: HanziCards, RadicalSets và Quizzes.
        /// </summary>
        /// <param name="id">ID của bài học.</param>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLessonDetail(Guid id)
        {
            return Ok(await _mediator.Send(new QueryGetLessonDetail(id)));
        }

        /// <summary>
        /// Lấy danh sách từ vựng phục vụ các trò chơi trong bài học.
        /// </summary>
        /// <param name="id">ID của bài học.</param>
        [HttpGet("{id}/vocabularies")]
        public async Task<IActionResult> GetVocabularies(Guid id)
        {
            return Ok(await _mediator.Send(new QueryGetVocabularyByLesson(id)));
        }

        /// <summary>
        /// Lấy danh sách tài liệu bổ trợ (PDF, etc.) có thể tải về.
        /// </summary>
        /// <param name="categoryId">Lọc theo danh mục (tùy chọn).</param>
        [HttpGet("documents")]
        public async Task<IActionResult> GetDocuments([FromQuery] short? categoryId)
        {
            return Ok(await _mediator.Send(new QueryGetDocuments(categoryId)));
        }

        /// <summary>
        /// Lưu tiến độ học tập sau khi hoàn thành một bài học.
        /// Hệ thống tự động tính toán điểm cao nhất và cộng dồn thời gian học.
        /// </summary>
        /// <param name="command">Kết quả học tập (Score, TimeSpent, Completed).</param>
        /// <returns>True nếu lưu thành công.</returns>
        [HttpPost("SaveProgress")]
        [Authorize]
        public async Task<IActionResult> SaveProgress([FromBody] SaveUserProgressCommand command)
        {
            var finalCommand = command with { UserId = _currentUserService.UserId };
            var result = await _mediator.Send(finalCommand);
            return Ok(new { success = result });
        }


    }
}
