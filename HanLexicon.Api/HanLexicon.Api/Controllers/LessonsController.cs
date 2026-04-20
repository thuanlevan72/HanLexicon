using HanLexicon.Application.Features.Lessons;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres.Persistence;
using Infrastructure.Postgres.Repositories;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        private static readonly string[] Summaries =
        [
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        ];

        [HttpGet("Getessons")]
        public async Task<IActionResult> GetLessons()

        { 
            return Ok(await _mediator.Send(new QueryGetLessons()));
        }

    }
}
