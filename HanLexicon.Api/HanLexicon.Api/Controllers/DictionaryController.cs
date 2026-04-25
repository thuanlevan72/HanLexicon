using HanLexicon.Application.Features.VocabulariesUser;
using Application.Interfaces;
using HanLexicon.Application.Common;
using VocabEntity = HanLexicon.Domain.Entities.Vocabulary;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        /// Tra từ: Trả về nghĩa Anh/Việt, Pinyin, Ví dụ và Hình ảnh/Âm thanh (nếu có).
        /// </summary>
        [HttpGet("search")]
        public async Task<ActionResult<ApiResponse<List<VocabEntity>>>> Search([FromQuery] string query)
        {
            var results = await _mediator.Send(new QuerySearchVocabularies(_currentUserService.UserId, query));
            return Ok(ApiResponse<List<VocabEntity>>.Success(results));
        }
    }
}
