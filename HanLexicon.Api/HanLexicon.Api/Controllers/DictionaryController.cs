using HanLexicon.Application.Features.VocabulariesUser;
using Application.Interfaces;
using HanLexicon.Application.Common;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using HanLexicon.Application.Common;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace HanLexicon.Api.Controllers
{
    [Route("api/v1/dictionary")]
    [ApiController]
    [Authorize]
    public class DictionaryController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;
        private readonly IUnitOfWork _uow;

        public DictionaryController(IMediator mediator, ICurrentUserService currentUserService, IUnitOfWork uow)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
            _uow = uow;
        }

        /// <summary>
        /// Lấy danh sách từ vựng có phân trang và lọc theo Level dành cho học viên
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetVocabularies([FromQuery] string? search, [FromQuery] string? level, [FromQuery] int page = 1, [FromQuery] int pageSize = 12)
        {
            var query = _uow.Repository<Vocabulary>().Query()
                .Include(v => v.Lesson)
                .ThenInclude(l => l.Category)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(v => v.Word.Contains(search) || v.Meaning.Contains(search) || v.Pinyin.Contains(search));
            }

            if (!string.IsNullOrEmpty(level) && level != "Tất cả")
            {
                // Lọc theo tên Category (ví dụ: HSK 1, HSK 2)
                query = query.Where(v => v.Lesson.Category.Name == level);
            }

            var totalItems = await query.CountAsync();
            var items = await query
                .OrderBy(v => v.Word)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = new PagedResult<Vocabulary>(items, totalItems, page, pageSize);
            return Ok(ApiResponse<PagedResult<Vocabulary>>.Success(result));
        }

        [HttpGet("search")]
        public async Task<ActionResult<ApiResponse<List<Vocabulary>>>> Search([FromQuery] string query)
        {
            // Logic cũ vẫn giữ nguyên hoặc dùng chung với hàm Get ở trên
            var results = await _uow.Repository<Vocabulary>().Query()
                .Where(v => v.Word.Contains(query) || v.Meaning.Contains(query))
                .Take(20)
                .ToListAsync();
            return Ok(ApiResponse<List<Vocabulary>>.Success(results));
        }
    }
}
