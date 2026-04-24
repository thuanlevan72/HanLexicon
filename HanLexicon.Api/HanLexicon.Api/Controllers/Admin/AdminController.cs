using HanLexicon.Application.Features.Admin.Content;
using HanLexicon.Application.Features.Admin.Lesson;
using HanLexicon.Application.Features.Admin.LessonCategory;
using HanLexicon.Application.Features.Admin.Vocabulary;
using Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Api.Controllers.Admin
{
    /// <summary>
    /// API quản trị dành riêng cho Admin.
    /// Quản lý danh mục, bài học, từ vựng và các thành phần nội dung khác.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;
        private readonly IUnitOfWork _uow;

        public AdminController(IMediator mediator, ICurrentUserService currentUserService, IUnitOfWork uow)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
            _uow = uow;
        }

        #region Lesson Category
        /// <summary>
        /// Lấy danh sách tất cả các danh mục bài học (HSK, Giao tiếp...).
        /// </summary>
        /// <returns>Danh sách các CategoryDto.</returns>
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            return Ok(await _mediator.Send(new QueryGetLessonCategories()));
        }

        /// <summary>
        /// Tạo mới một danh mục bài học.
        /// </summary>
        /// <param name="command">Thông tin danh mục (Name, Slug, SortOrder).</param>
        /// <returns>Danh mục vừa tạo.</returns>
        [HttpPost("categories")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateLessonCategoryCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        /// <summary>
        /// Cập nhật thông tin danh mục bài học.
        /// </summary>
        /// <param name="id">ID danh mục.</param>
        /// <param name="command">Thông tin cập nhật.</param>
        [HttpPut("categories/{id}")]
        public async Task<IActionResult> UpdateCategory(short id, [FromBody] UpdateLessonCategoryCommand command)
        {
            if (id != command.Id) return BadRequest();
            return Ok(await _mediator.Send(command));
        }

        /// <summary>
        /// Xóa một danh mục bài học.
        /// </summary>
        /// <param name="id">ID danh mục cần xóa.</param>
        [HttpDelete("categories/{id}")]
        public async Task<IActionResult> DeleteCategory(short id)
        {
            var result = await _mediator.Send(new DeleteLessonCategoryCommand(id));
            return result ? Ok() : NotFound();
        }
        #endregion

        #region Lesson
        /// <summary>
        /// Lấy danh sách tất cả bài học trong hệ thống.
        /// </summary>
        /// <param name="categoryId">Lọc theo danh mục (tùy chọn).</param>
        [HttpGet("lessons")]
        public async Task<IActionResult> GetLessons([FromQuery] short? categoryId)
        {
            return Ok(await _mediator.Send(new QueryGetLessonsAdmin(categoryId)));
        }

        /// <summary>
        /// Tạo mới một bài học.
        /// </summary>
        /// <param name="command">Thông tin bài học. Lưu ý 'Filename' dùng để định danh Game.</param>
        [HttpPost("lessons")]
        public async Task<IActionResult> CreateLesson([FromBody] CreateLessonCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        /// <summary>
        /// Cập nhật thông tin bài học.
        /// </summary>
        [HttpPut("lessons/{id}")]
        public async Task<IActionResult> UpdateLesson(Guid id, [FromBody] UpdateLessonCommand command)
        {
            if (id != command.Id) return BadRequest();
            return Ok(await _mediator.Send(command));
        }

        /// <summary>
        /// Xóa bài học khỏi hệ thống.
        /// </summary>
        [HttpDelete("lessons/{id}")]
        public async Task<IActionResult> DeleteLesson(Guid id)
        {
            var result = await _mediator.Send(new DeleteLessonCommand(id));
            return result ? Ok() : NotFound();
        }
        #endregion

        #region Vocabulary
        /// <summary>
        /// Lấy danh sách từ vựng.
        /// </summary>
        /// <param name="lessonId">Lọc theo bài học (tùy chọn).</param>
        [HttpGet("vocabularies")]
        public async Task<IActionResult> GetVocabularies([FromQuery] Guid? lessonId)
        {
            return Ok(await _mediator.Send(new QueryGetVocabulariesAdmin(lessonId)));
        }

        /// <summary>
        /// Tạo mới một từ vựng thủ công.
        /// </summary>
        [HttpPost("vocabularies")]
        public async Task<IActionResult> CreateVocabulary([FromBody] CreateVocabularyCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        /// <summary>
        /// Cập nhật từ vựng.
        /// </summary>
        [HttpPut("vocabularies/{id}")]
        public async Task<IActionResult> UpdateVocabulary(Guid id, [FromBody] UpdateVocabularyCommand command)
        {
            if (id != command.Id) return BadRequest();
            return Ok(await _mediator.Send(command));
        }

        /// <summary>
        /// Xóa từ vựng.
        /// </summary>
        [HttpDelete("vocabularies/{id}")]
        public async Task<IActionResult> DeleteVocabulary(Guid id)
        {
            var result = await _mediator.Send(new DeleteVocabularyCommand(id));
            return result ? Ok() : NotFound();
        }

        /// <summary>
        /// Import từ vựng hàng loạt từ file Excel và Zip Media.
        /// </summary>
        /// <param name="excelFile">File Excel chứa data.</param>
        /// <param name="mediaZip">File Zip chứa Audio/Ảnh.</param>
        /// <param name="categoryId">ID danh mục (tùy chọn).</param>
        /// <returns>ID của Job vừa khởi tạo.</returns>
        [HttpPost("vocabularies/import")]
        public async Task<IActionResult> ImportVocabulary(IFormFile excelFile, IFormFile? mediaZip, [FromQuery] short? categoryId)
        {
            if (excelFile == null) return BadRequest("Phải có file Excel.");

            // Lưu file tạm lên server
            var tempExcelPath = Path.GetTempFileName() + ".xlsx";
            using (var stream = new FileStream(tempExcelPath, FileMode.Create)) await excelFile.CopyToAsync(stream);

            string? tempZipPath = null;
            if (mediaZip != null)
            {
                tempZipPath = Path.GetTempFileName() + ".zip";
                using (var stream = new FileStream(tempZipPath, FileMode.Create)) await mediaZip.CopyToAsync(stream);
            }

            var jobId = await _mediator.Send(new ImportVocabularyCommand(
                tempExcelPath,
                tempZipPath,
                _currentUserService.UserId,
                excelFile.FileName,
                categoryId
            ));

            return Ok(new { jobId });
        }

        /// <summary>
        /// Lấy trạng thái xử lý của một Job Import.
        /// </summary>
        /// <param name="jobId">ID của Job.</param>
        [HttpGet("vocabularies/import-status/{jobId}")]
        public async Task<IActionResult> GetImportStatus(Guid jobId)
        {
            var job = await _uow.Repository<ImportJob>().GetByIdAsync(jobId);
            if (job == null) return NotFound();
            return Ok(job);
        }
        #endregion

        #region Hanzi Card
        /// <summary> Lấy danh sách thẻ chữ Hán theo bài học. </summary>
        [HttpGet("hanzi-cards")] public async Task<IActionResult> GetHanziCards([FromQuery] Guid lessonId) => Ok(await _mediator.Send(new QueryGetHanziCards(lessonId)));

        /// <summary> Tạo mới thẻ chữ Hán. </summary>
        [HttpPost("hanzi-cards")] public async Task<IActionResult> CreateHanziCard([FromBody] CreateHanziCardCommand cmd) => Ok(await _mediator.Send(cmd));

        /// <summary> Cập nhật thẻ chữ Hán. </summary>
        [HttpPut("hanzi-cards/{id}")]
        public async Task<IActionResult> UpdateHanziCard(Guid id, [FromBody] UpdateHanziCardCommand cmd) { if (id != cmd.Id) return BadRequest(); return Ok(await _mediator.Send(cmd)); }

        /// <summary> Xóa thẻ chữ Hán. </summary>
        [HttpDelete("hanzi-cards/{id}")]
        public async Task<IActionResult> DeleteHanziCard(Guid id) => Ok(await _mediator.Send(new DeleteHanziCardCommand(id)));
        #endregion

        #region Challenge Word
        /// <summary> Lấy danh sách từ vựng thử thách theo bài học. </summary>
        [HttpGet("challenge-words")] public async Task<IActionResult> GetChallengeWords([FromQuery] Guid lessonId) => Ok(await _mediator.Send(new QueryGetChallengeWords(lessonId)));

        /// <summary> Tạo mới từ vựng thử thách. </summary>
        [HttpPost("challenge-words")] public async Task<IActionResult> CreateChallengeWord([FromBody] CreateChallengeWordCommand cmd) => Ok(await _mediator.Send(cmd));

        /// <summary> Cập nhật từ vựng thử thách. </summary>
        [HttpPut("challenge-words/{id}")]
        public async Task<IActionResult> UpdateChallengeWord(Guid id, [FromBody] UpdateChallengeWordCommand cmd) { if (id != cmd.Id) return BadRequest(); return Ok(await _mediator.Send(cmd)); }

        /// <summary> Xóa từ vựng thử thách. </summary>
        [HttpDelete("challenge-words/{id}")]
        public async Task<IActionResult> DeleteChallengeWord(Guid id) => Ok(await _mediator.Send(new DeleteChallengeWordCommand(id)));
        #endregion

        #region Radical
        /// <summary> Lấy danh sách bộ RadicalSet. </summary>
        [HttpGet("radical-sets")] public async Task<IActionResult> GetRadicalSets([FromQuery] Guid? lessonId) => Ok(await _mediator.Send(new QueryGetRadicalSets(lessonId)));

        /// <summary> Tạo mới RadicalSet. </summary>
        [HttpPost("radical-sets")] public async Task<IActionResult> CreateRadicalSet([FromBody] CreateRadicalSetCommand cmd) => Ok(await _mediator.Send(cmd));

        /// <summary> Cập nhật RadicalSet. </summary>
        [HttpPut("radical-sets/{id}")]
        public async Task<IActionResult> UpdateRadicalSet(Guid id, [FromBody] UpdateRadicalSetCommand cmd) { if (id != cmd.Id) return BadRequest(); return Ok(await _mediator.Send(cmd)); }

        /// <summary> Xóa RadicalSet. </summary>
        [HttpDelete("radical-sets/{id}")]
        public async Task<IActionResult> DeleteRadicalSet(Guid id) => Ok(await _mediator.Send(new DeleteRadicalSetCommand(id)));

        /// <summary> Lấy danh sách các bộ thủ trong một Set. </summary>
        [HttpGet("radicals")] public async Task<IActionResult> GetRadicals([FromQuery] Guid setId) => Ok(await _mediator.Send(new QueryGetRadicals(setId)));

        /// <summary> Tạo mới bộ thủ. </summary>
        [HttpPost("radicals")] public async Task<IActionResult> CreateRadical([FromBody] CreateRadicalCommand cmd) => Ok(await _mediator.Send(cmd));

        /// <summary> Cập nhật bộ thủ. </summary>
        [HttpPut("radicals/{id}")]
        public async Task<IActionResult> UpdateRadical(Guid id, [FromBody] UpdateRadicalCommand cmd) { if (id != cmd.Id) return BadRequest(); return Ok(await _mediator.Send(cmd)); }

        /// <summary> Xóa bộ thủ. </summary>
        [HttpDelete("radicals/{id}")]
        public async Task<IActionResult> DeleteRadical(Guid id) => Ok(await _mediator.Send(new DeleteRadicalCommand(id)));
        #endregion

        #region Quiz
        /// <summary> Lấy danh sách câu hỏi trắc nghiệm của bài học. </summary>
        [HttpGet("quizzes")] public async Task<IActionResult> GetQuizzes([FromQuery] Guid lessonId) => Ok(await _mediator.Send(new QueryGetQuizQuestions(lessonId)));

        /// <summary> Tạo mới câu hỏi trắc nghiệm. </summary>
        [HttpPost("quizzes")] public async Task<IActionResult> CreateQuiz([FromBody] CreateQuizQuestionCommand cmd) => Ok(await _mediator.Send(cmd));

        /// <summary> Cập nhật câu hỏi. </summary>
        [HttpPut("quizzes/{id}")]
        public async Task<IActionResult> UpdateQuiz(Guid id, [FromBody] UpdateQuizQuestionCommand cmd) { if (id != cmd.Id) return BadRequest(); return Ok(await _mediator.Send(cmd)); }

        /// <summary> Xóa câu hỏi. </summary>
        [HttpDelete("quizzes/{id}")]
        public async Task<IActionResult> DeleteQuiz(Guid id) => Ok(await _mediator.Send(new DeleteQuizQuestionCommand(id)));

        /// <summary> Lấy các lựa chọn cho một câu hỏi. </summary>
        [HttpGet("quiz-options")] public async Task<IActionResult> GetQuizOptions([FromQuery] Guid questionId) => Ok(await _mediator.Send(new QueryGetQuizOptions(questionId)));

        /// <summary> Tạo mới lựa chọn đáp án. </summary>
        [HttpPost("quiz-options")] public async Task<IActionResult> CreateQuizOption([FromBody] CreateQuizOptionCommand cmd) => Ok(await _mediator.Send(cmd));

        /// <summary> Cập nhật lựa chọn. </summary>
        [HttpPut("quiz-options/{id}")]
        public async Task<IActionResult> UpdateQuizOption(Guid id, [FromBody] UpdateQuizOptionCommand cmd) { if (id != cmd.Id) return BadRequest(); return Ok(await _mediator.Send(cmd)); }

        /// <summary> Xóa lựa chọn. </summary>
        [HttpDelete("quiz-options/{id}")]
        public async Task<IActionResult> DeleteQuizOption(Guid id) => Ok(await _mediator.Send(new DeleteQuizOptionCommand(id)));
        #endregion

        #region Document
        /// <summary> Lấy danh sách tài liệu dành cho Admin (Bao gồm cả chưa published). </summary>
        [HttpGet("documents-admin")] public async Task<IActionResult> GetAdminDocuments([FromQuery] short? categoryId) => Ok(await _mediator.Send(new QueryGetAdminDocuments(categoryId)));

        /// <summary> Tạo mới tài liệu học tập. </summary>
        [HttpPost("documents")] public async Task<IActionResult> CreateDocument([FromBody] CreateDocumentCommand cmd) => Ok(await _mediator.Send(cmd));

        /// <summary> Cập nhật tài liệu. </summary>
        [HttpPut("documents/{id}")]
        public async Task<IActionResult> UpdateDocument(Guid id, [FromBody] UpdateDocumentCommand cmd) { if (id != cmd.Id) return BadRequest(); return Ok(await _mediator.Send(cmd)); }

        /// <summary> Xóa tài liệu. </summary>
        [HttpDelete("documents/{id}")]
        public async Task<IActionResult> DeleteDocument(Guid id) => Ok(await _mediator.Send(new DeleteDocumentCommand(id)));
        #endregion

        #region Dashboard
        /// <summary>
        /// Báo cáo tổng quan về các bài học (Số lượng từ, câu hỏi...).
        /// Dữ liệu từ View v_lessons_summary.
        /// </summary>
        [HttpGet("dashboard/lessons-summary")]
        public async Task<IActionResult> GetLessonsSummary()
        {
            var summary = await _uow.Repository<VLessonsSummary>().Query().ToListAsync();
            return Ok(summary);
        }

        /// <summary>
        /// Lấy 50 Job Import gần nhất để theo dõi.
        /// </summary>
        [HttpGet("dashboard/import-jobs")]
        public async Task<IActionResult> GetImportJobs()
        {
            var jobs = await _uow.Repository<ImportJob>().Query()
                .OrderByDescending(x => x.CreatedAt)
                .Take(50)
                .ToListAsync();
            return Ok(jobs);
        }
        #endregion
    }
}
