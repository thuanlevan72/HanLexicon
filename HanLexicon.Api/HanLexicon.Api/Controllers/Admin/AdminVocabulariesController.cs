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
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

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

        [HttpGet]
        public async Task<IActionResult> GetVocabularies(
            [FromQuery] string? search, 
            [FromQuery] short? categoryId, 
            [FromQuery] Guid? lessonId,
            [FromQuery] int page = 1, 
            [FromQuery] int pageSize = 10)
        {
            IQueryable<Vocabulary> query = _uow.Repository<Vocabulary>().Query()
                .Include(v => v.Lesson)
                .ThenInclude(l => l.Category);

            // 1. Lọc theo từ khóa tìm kiếm
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(v => v.Word.Contains(search) 
                                      || v.Meaning.Contains(search) 
                                      || v.Pinyin.Contains(search));
            }

            // 2. Lọc theo Danh mục (HSK Level)
            if (categoryId.HasValue && categoryId > 0)
            {
                query = query.Where(v => v.Lesson.CategoryId == categoryId.Value);
            }

            // 3. Lọc theo Bài học cụ thể
            if (lessonId.HasValue && lessonId != Guid.Empty)
            {
                query = query.Where(v => v.LessonId == lessonId.Value);
            }

            var totalItems = await query.CountAsync();
            var items = await query
                .OrderBy(v => v.Word)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = new PagedResult<Vocabulary>(items, totalItems, page, pageSize);
            return Ok(ApiResponse<PagedResult<Vocabulary>>.Success(result));
        }

        [HttpGet("jobs")]
        public async Task<IActionResult> GetImportJobs([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var query = _uow.Repository<ImportJob>().Query();
            var totalItems = await query.CountAsync();
            var items = await query.OrderByDescending(j => j.CreatedAt).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return Ok(ApiResponse<PagedResult<ImportJob>>.Success(new PagedResult<ImportJob>(items, totalItems, page, pageSize)));
        }

        [HttpGet("import-status/{jobId}")]
        public async Task<IActionResult> GetImportStatus(Guid jobId)
        {
            var job = await _uow.Repository<ImportJob>().GetByIdAsync(jobId);
            if (job == null) return NotFound(ApiResponse<object>.Failure(new List<string> { "Không tìm thấy." }));
            return Ok(ApiResponse<object>.Success(job));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVocabulary([FromBody] VocabularyDto dto)
        {
            try {
                var vocab = new Vocabulary {
                    Id = Guid.NewGuid(),
                    LessonId = dto.LessonId,
                    Word = dto.Word ?? "",
                    Pinyin = dto.Pinyin ?? "",
                    Meaning = dto.Meaning ?? "",
                    MeaningEn = dto.MeaningEn,
                    AudioUrl = dto.AudioUrl,
                    ImageUrl = dto.ImageUrl,
                    ExampleCn = dto.ExampleCn,
                    ExamplePy = dto.ExamplePy,
                    ExampleVn = dto.ExampleVn,
                    SortOrder = dto.SortOrder
                };
                _uow.Repository<Vocabulary>().Add(vocab);
                await _uow.SaveChangesAsync();
                return Ok(ApiResponse<Vocabulary>.Success(vocab, "Thành công."));
            } catch (Exception ex) { return BadRequest(ApiResponse<object>.Failure(new List<string> { ex.Message })); }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVocabulary(Guid id, [FromBody] VocabularyDto dto)
        {
            try {
                var existing = await _uow.Repository<Vocabulary>().GetByIdAsync(id);
                if (existing == null) return NotFound();
                existing.Word = dto.Word ?? existing.Word;
                existing.Pinyin = dto.Pinyin ?? existing.Pinyin;
                existing.Meaning = dto.Meaning ?? existing.Meaning;
                existing.MeaningEn = dto.MeaningEn;
                existing.AudioUrl = dto.AudioUrl;
                existing.ImageUrl = dto.ImageUrl;
                existing.ExampleCn = dto.ExampleCn;
                existing.ExamplePy = dto.ExamplePy;
                existing.ExampleVn = dto.ExampleVn;
                existing.LessonId = dto.LessonId;
                existing.SortOrder = dto.SortOrder;
                _uow.Repository<Vocabulary>().Update(existing);
                await _uow.SaveChangesAsync();
                return Ok(ApiResponse<object>.Success(null));
            } catch (Exception ex) { return BadRequest(ApiResponse<object>.Failure(new List<string> { ex.Message })); }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVocabulary(Guid id)
        {
            var vocab = await _uow.Repository<Vocabulary>().GetByIdAsync(id);
            if (vocab == null) return NotFound();
            _uow.Repository<Vocabulary>().Delete(vocab);
            await _uow.SaveChangesAsync();
            return Ok(ApiResponse<object>.Success(null));
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportVocabulary(IFormFile excelFile, [FromQuery] short? categoryId)
        {
            if (excelFile == null) return BadRequest();
            var tempExcelPath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString() + ".xlsx");
            using (var stream = new FileStream(tempExcelPath, FileMode.Create)) await excelFile.CopyToAsync(stream);
            var jobId = await _mediator.Send(new ImportVocabularyCommand(tempExcelPath, null, _currentUserService.UserId, excelFile.FileName, categoryId));
            return Ok(ApiResponse<object>.Success(new { jobId }));
        }
    }
}
