using HanLexicon.Application.Features.LessonsUser;
using HanLexicon.Application.Features.VocabulariesUser;
using Application.Interfaces;
using HanLexicon.Application.Common;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers
{
    [Route("api/v1/study-progress")]
    [ApiController]
    [Authorize]
    public class StudyProgressController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;

        public StudyProgressController(IMediator mediator, ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
        }

        [HttpPost("lessons")]
        public async Task<IActionResult> SaveLessonProgress([FromBody] SaveUserProgressCommand command)
        {
            var finalCommand = command with { UserId = _currentUserService.UserId };
            return Ok(ApiResponse<bool>.Success(await _mediator.Send(finalCommand)));
        }

        [HttpPost("vocabularies")]
        public async Task<IActionResult> UpdateWordProgress([FromBody] UpdateWordProgressCommand command)
        {
            var finalCommand = command with { UserId = _currentUserService.UserId };
            return Ok(ApiResponse<bool>.Success(await _mediator.Send(finalCommand)));
        }
    }
}
