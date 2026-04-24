using HanLexicon.Application.Features.Search;
using HanLexicon.Application.Features.Vocabulary;
using Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Api.Controllers
{
    /// <summary>
    /// API tra cứu và quản lý tiến độ từ vựng cá nhân.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VocabulariesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUserService _currentUserService;

        public VocabulariesController(IMediator mediator, IUnitOfWork uow, ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _uow = uow;
            _currentUserService = currentUserService;
        }

        /// <summary>
        /// Tìm kiếm từ vựng theo chữ Hán hoặc nghĩa.
        /// Tự động ghi lại lịch sử tra cứu của người dùng.
        /// </summary>
        /// <param name="query">Từ khóa tìm kiếm.</param>
        /// <returns>Danh sách 20 kết quả phù hợp nhất.</returns>
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            var results = await _uow.Repository<Vocabulary>().Query()
                .Where(v => v.Word.Contains(query) || v.Meaning.Contains(query))
                .Take(20)
                .ToListAsync();

            // Ghi nhật ký tra cứu như BRD đặc tả
            if (!string.IsNullOrEmpty(query))
            {
                await _mediator.Send(new LogSearchHistoryCommand(_currentUserService.UserId, query, results.FirstOrDefault()?.Id));
            }

            return Ok(results);
        }

        /// <summary>
        /// Cập nhật trạng thái thông thạo của một từ vựng (Học/Thuộc/Cần ôn tập).
        /// </summary>
        /// <param name="command">Dữ liệu tiến độ (VocabId, Status...).</param>
        /// <returns>True nếu thành công.</returns>
        [HttpPost("UpdateProgress")]
        public async Task<IActionResult> UpdateProgress([FromBody] UpdateWordProgressCommand command)
        {
            // Đảm bảo chỉ cập nhật cho chính mình
            var finalCommand = command with { UserId = _currentUserService.UserId };
            var result = await _mediator.Send(finalCommand);
            return Ok(new { success = result });
        }
    }
}
