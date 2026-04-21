using HanLexicon.Application.Features.Lessons;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HanLexicon.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LessonsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public LessonsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("Getessons")]
        public async Task<IActionResult> GetLessons()

        { 
            return Ok(await _mediator.Send(new QueryGetLessons()));
        }

    }
}
