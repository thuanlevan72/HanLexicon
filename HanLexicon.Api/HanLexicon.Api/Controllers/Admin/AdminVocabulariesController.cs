using HanLexicon.Application.Features.Admin.VocabulariesAdmin;
using Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using HanLexicon.Domain.Entities;
using HanLexicon.Application.Common;
using HanLexicon.Application.DTOs.Admin;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/v1/admin/vocabularies")]
    [Authorize(Roles = "admin")]
    public class AdminVocabulariesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;

        public AdminVocabulariesController(IMediator mediator, ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<IActionResult> GetVocabularies(
            [FromQuery] string? search, 
            [FromQuery] short? categoryId,
            [FromQuery] Guid? lessonId,
            [FromQuery] bool? missingAudio,
            [FromQuery] bool? missingImage,
            [FromQuery] int page = 1, 
            [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new QueryGetVocabulariesAdmin(search, categoryId, lessonId, missingAudio, missingImage, page, pageSize));
            return Ok(ApiResponse<PagedResult<VocabularyDto>>.Success(result));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVocabulary([FromBody] CreateVocabularyCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<VocabularyDto>.Success(result));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVocabulary(Guid id, [FromBody] UpdateVocabularyCommand cmd)
        {
            if (id != cmd.Id) return BadRequest();
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<VocabularyDto>.Success(result));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVocabulary(Guid id)
        {
            var result = await _mediator.Send(new DeleteVocabularyCommand(id));
            return Ok(ApiResponse<bool>.Success(result));
        }

        [HttpGet("jobs")]
        public async Task<IActionResult> GetImportJobs([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new QueryGetImportJobs(page, pageSize));
            return Ok(ApiResponse<PagedResult<ImportJobDto>>.Success(result));
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportVocabulary(IFormFile excelFile, [FromQuery] short? categoryId, [FromQuery] Guid? lessonId)
        {
            if (excelFile == null) return BadRequest();
            var tempExcelPath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString() + ".xlsx");
            using (var stream = new FileStream(tempExcelPath, FileMode.Create)) await excelFile.CopyToAsync(stream);
            var jobId = await _mediator.Send(new ImportVocabularyCommand(tempExcelPath, null, _currentUserService.UserId, excelFile.FileName, categoryId, lessonId));
            return Ok(ApiResponse<object>.Success(new { jobId }));
        }
    }
}
