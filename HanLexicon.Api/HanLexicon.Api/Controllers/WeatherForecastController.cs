using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres.Persistence;
using Infrastructure.Postgres.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {

        private readonly HanLexiconDbContext _hanLexiconDbContext;
        private readonly IUnitOfWork _unitOfWork;


        public WeatherForecastController(HanLexiconDbContext hanLexiconDbContext, UnitOfWork unitOfWork)
        {
            _hanLexiconDbContext = hanLexiconDbContext;
            _unitOfWork = unitOfWork;
        }

        private static readonly string[] Summaries =
        [
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        ];

        [HttpGet("GetTestData")]
        public async Task<IActionResult> GetTestDataGet()

        {
            var a = await _hanLexiconDbContext.LessonCategories.Include(x => x.Lessons).ToListAsync();
            return Ok(a);
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
