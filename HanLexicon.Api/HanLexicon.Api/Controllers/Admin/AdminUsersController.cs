using HanLexicon.Application.Features.Admin.UsersAdmin;
using HanLexicon.Application.Common;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/v1/admin/users")]
    [Authorize(Roles = "admin")]
    public class AdminUsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AdminUsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(
            [FromQuery] string? search, 
            [FromQuery] bool? isActive,
            [FromQuery] string? sortBy,
            [FromQuery] bool isDescending = true,
            [FromQuery] int page = 1, 
            [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new QueryGetUsers(search, isActive, sortBy, isDescending, page, pageSize));
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserDetails(Guid id)
        {
            var result = await _mediator.Send(new QueryGetUserDetails(id));
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpGet("{id}/stats")]
        public async Task<IActionResult> GetStudentStats(Guid id)
        {
            var result = await _mediator.Send(new QueryGetStudentStats(id));
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateUserStatus(Guid id, [FromBody] CommandUpdateUserStatus command)
        {
            if (id != command.Id) return BadRequest();
            var result = await _mediator.Send(command);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CommandCreateUser command)
        {
            var result = await _mediator.Send(command);
            if (!result.IsSuccess) return BadRequest(ApiResponse<object>.Failure((IEnumerable<string>?)null, result.Message));
            return Ok(ApiResponse<object>.Success(null, result.Message));
        }
    }
}
