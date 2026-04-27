using HanLexicon.Application.Features.Admin.DashboardAdmin;
using HanLexicon.Application.Common;
using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers.Admin
{
    [Route("api/v1/admin/dashboard")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class AdminDashboardController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMediator _mediator;

        public AdminDashboardController(IUnitOfWork uow, IMediator mediator)
        {
            _uow = uow;
            _mediator = mediator;
        }

        [HttpGet("overall-stats")]
        public async Task<IActionResult> GetOverallStats()
        {
            var result = await _mediator.Send(new QueryGetSystemOverallStats());
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("import-stats")]
        public async Task<IActionResult> GetImportStats()
        {
            var query = _uow.Repository<ImportJob>().Query();
            var stats = new
            {
                Total = await query.CountAsync(),
                Pending = await query.CountAsync(j => j.Status == "Pending"),
                Processing = await query.CountAsync(j => j.Status == "Processing"),
                Completed = await query.CountAsync(j => j.Status == "Completed"),
                Failed = await query.CountAsync(j => j.Status == "Failed")
            };
            return Ok(ApiResponse<object>.Success(stats));
        }
    }
}
