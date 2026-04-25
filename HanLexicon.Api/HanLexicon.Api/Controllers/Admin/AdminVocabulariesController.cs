using HanLexicon.Application.Features.Admin.VocabulariesAdmin;
using Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using HanLexicon.Domain.Entities;
using HanLexicon.Application.Common;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers.Admin
{
    [Route("api/v1/admin/vocabularies")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class AdminVocabulariesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;
        private readonly IUnitOfWork _uow;

        public AdminVocabulariesController(IMediator mediator, ICurrentUserService currentUserService, IUnitOfWork uow)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
            _uow = uow;
        }

        /// <summary>
        /// Import từ vựng hàng loạt từ Excel. 
        /// Có hỗ trợ upload file Zip chứa media (ảnh/âm thanh) để tự động mapping.
        /// </summary>
        [HttpPost("import")]
        public async Task<IActionResult> ImportVocabulary(IFormFile excelFile, IFormFile? mediaZip, [FromQuery] short? categoryId)
        {
            if (excelFile == null) return BadRequest(ApiResponse<object>.Failure("File Excel là bắt buộc."));

            var tempExcelPath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString() + ".xlsx");
            using (var stream = new FileStream(tempExcelPath, FileMode.Create)) await excelFile.CopyToAsync(stream);

            string? tempZipPath = null;
            if (mediaZip != null)
            {
                tempZipPath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString() + ".zip");
                using (var stream = new FileStream(tempZipPath, FileMode.Create)) await mediaZip.CopyToAsync(stream);
            }

            var jobId = await _mediator.Send(new ImportVocabularyCommand(
                tempExcelPath,
                tempZipPath,
                _currentUserService.UserId,
                excelFile.FileName,
                categoryId
            ));

            return Ok(ApiResponse<object>.Success(new { jobId }, "Yêu cầu import đã được gửi vào hàng chờ."));
        }

        [HttpGet("import-status/{jobId}")]
        public async Task<IActionResult> GetImportStatus(Guid jobId)
        {
            var job = await _uow.Repository<ImportJob>().GetByIdAsync(jobId);
            if (job == null) return NotFound(ApiResponse<object>.Failure("Không tìm thấy Job."));
            return Ok(ApiResponse<object>.Success(job));
        }
    }
}
