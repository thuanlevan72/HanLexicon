using HanLexicon.Application.Features.LessonsUser;
using HanLexicon.Application.Common;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers
{
    [ApiController]
    [Route("api/v1/learning")]
    public class LearningController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LearningController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Phân loại theo Level: Trả về danh sách HSK1, HSK2... và các nhóm bài học bên trong.
        /// </summary>
        [HttpGet("catalog")]
        public async Task<IActionResult> GetCatalog()
        { 
            var result = await _mediator.Send(new QueryGetLessons());
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _mediator.Send(new QueryGetCategories());
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("categories/{categoryId}/lessons")]
        public async Task<IActionResult> GetLessonsByCategory(short categoryId)
        {
            var result = await _mediator.Send(new QueryGetLessonsByCategory(categoryId));
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("lessons/{id}")]
        public async Task<IActionResult> GetLessonDetail(Guid id)
        {
            var result = await _mediator.Send(new QueryGetLessonFullDetail(id));
            return Ok(ApiResponse<object>.Success(result));
        }

        /// <summary>
        /// Lấy danh sách từ vựng theo từng nhóm bài học cụ thể.
        /// </summary>
        [HttpGet("lessons/{id}/vocabularies")]
        public async Task<IActionResult> GetVocabularies(Guid id)
        {
            var result = await _mediator.Send(new QueryGetVocabularyByLesson(id));
            return Ok(ApiResponse<object>.Success(result));
        }
    }
}
