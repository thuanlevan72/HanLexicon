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

        public DictionaryController(IMediator mediator, ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
        }

        /// <summary>
        /// Lấy danh sách từ vựng có phân trang và lọc theo Level dành cho học viên
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetVocabularies([FromQuery] string? search, [FromQuery] string? level, [FromQuery] int page = 1, [FromQuery] int pageSize = 12)
        {
            var result = await _mediator.Send(new QueryGetVocabulariesPaged(search, level, page, pageSize));
            return Ok(ApiResponse<PagedResult<Vocabulary>>.Success(result));
        }

        [HttpGet("search")]
        public async Task<ActionResult<ApiResponse<List<Vocabulary>>>> Search([FromQuery] string query)
        {
            var results = await _mediator.Send(new QuerySearchVocabularies(_currentUserService.UserId, query));
            return Ok(ApiResponse<List<Vocabulary>>.Success(results));
        }
    }
}
