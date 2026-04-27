using HanLexicon.Application.Features.Admin.LessonCategories;
using HanLexicon.Application.Features.Admin.LessonsAdmin;
using HanLexicon.Application.Features.Admin.LogsAdmin;
using HanLexicon.Application.Features.Admin.HanziCards;
using HanLexicon.Application.Features.Admin.Quizzes;
using HanLexicon.Application.Features.Admin.Documents;
using HanLexicon.Application.Features.Admin.Radicals;
using HanLexicon.Application.Features.Admin.ChallengeWords;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Application.Common;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/v1/admin")]
    [Authorize(Roles = "admin")]
    public class AdminLearningManagerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AdminLearningManagerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // --- SYSTEM LOGS ---
        [HttpGet("logs")]
        public async Task<IActionResult> GetLogs([FromQuery] string? level, [FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
        {
            var result = await _mediator.Send(new QueryGetLogs(level, search, page, pageSize));
            return Ok(ApiResponse<object>.Success(result));
        }

        // --- LESSON CATEGORIES ---
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories([FromQuery] string? search)
        {
            var result = await _mediator.Send(new QueryGetLessonCategories(search));
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPost("categories")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateLessonCategoryCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPut("categories/{id}")]
        public async Task<IActionResult> UpdateCategory(short id, [FromBody] UpdateLessonCategoryCommand cmd)
        {
            if (id != cmd.Id) return BadRequest();
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpDelete("categories/{id}")]
        public async Task<IActionResult> DeleteCategory(short id)
        {
            var result = await _mediator.Send(new DeleteLessonCategoryCommand(id));
            return Ok(ApiResponse<object>.Success(result));
        }

        // --- LESSONS ---
        [HttpGet("lessons")]
        public async Task<IActionResult> GetLessons([FromQuery] short? categoryId)
        {
            var result = await _mediator.Send(new QueryGetLessonsAdmin(categoryId));
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPost("lessons")]
        public async Task<IActionResult> CreateLesson([FromBody] CreateLessonCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpPut("lessons/{id}")]
        public async Task<IActionResult> UpdateLesson(Guid id, [FromBody] UpdateLessonCommand cmd)
        {
            if (id != cmd.Id) return BadRequest();
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<object>.Success(result));
        }

        [HttpDelete("lessons/{id}")]
        public async Task<IActionResult> DeleteLesson(Guid id)
        {
            var result = await _mediator.Send(new DeleteLessonCommand(id));
            return Ok(ApiResponse<object>.Success(result));
        }

        // --- HANZI CARDS ---
        [HttpGet("lessons/{lessonId}/hanzi")]
        public async Task<IActionResult> GetHanziCards(Guid lessonId)
        {
            var result = await _mediator.Send(new QueryGetHanziCards(lessonId));
            return Ok(ApiResponse<List<HanziCardDto>>.Success(result));
        }

        [HttpPost("hanzi")]
        public async Task<IActionResult> CreateHanziCard([FromBody] CreateHanziCardCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<HanziCardDto>.Success(result));
        }

        [HttpPut("hanzi/{id}")]
        public async Task<IActionResult> UpdateHanziCard(Guid id, [FromBody] UpdateHanziCardCommand cmd)
        {
            if (id != cmd.Id) return BadRequest();
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<HanziCardDto>.Success(result));
        }

        [HttpDelete("hanzi/{id}")]
        public async Task<IActionResult> DeleteHanziCard(Guid id)
        {
            var result = await _mediator.Send(new DeleteHanziCardCommand(id));
            return Ok(ApiResponse<bool>.Success(result));
        }

        // --- QUIZZES ---
        [HttpGet("lessons/{lessonId}/quizzes")]
        public async Task<IActionResult> GetQuizzes(Guid lessonId)
        {
            var result = await _mediator.Send(new QueryGetQuizQuestions(lessonId));
            return Ok(ApiResponse<List<QuizQuestionDto>>.Success(result));
        }

        [HttpPost("quizzes")]
        public async Task<IActionResult> CreateQuiz([FromBody] CreateQuizQuestionCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<QuizQuestionDto>.Success(result));
        }

        [HttpPut("quizzes/{id}")]
        public async Task<IActionResult> UpdateQuiz(Guid id, [FromBody] UpdateQuizQuestionCommand cmd)
        {
            if (id != cmd.Id) return BadRequest();
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<QuizQuestionDto>.Success(result));
        }

        [HttpDelete("quizzes/{id}")]
        public async Task<IActionResult> DeleteQuiz(Guid id)
        {
            var result = await _mediator.Send(new DeleteQuizQuestionCommand(id));
            return Ok(ApiResponse<bool>.Success(result));
        }

        // --- QUIZ OPTIONS ---
        [HttpGet("quizzes/{questionId}/options")]
        public async Task<IActionResult> GetQuizOptions(Guid questionId)
        {
            var result = await _mediator.Send(new QueryGetQuizOptions(questionId));
            return Ok(ApiResponse<List<QuizOptionDto>>.Success(result));
        }

        [HttpPost("quizzes/options")]
        public async Task<IActionResult> CreateQuizOption([FromBody] CreateQuizOptionCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<QuizOptionDto>.Success(result));
        }

        [HttpPut("quizzes/options/{id}")]
        public async Task<IActionResult> UpdateQuizOption(Guid id, [FromBody] UpdateQuizOptionCommand cmd)
        {
            if (id != cmd.Id) return BadRequest();
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<QuizOptionDto>.Success(result));
        }

        [HttpDelete("quizzes/options/{id}")]
        public async Task<IActionResult> DeleteQuizOption(Guid id)
        {
            var result = await _mediator.Send(new DeleteQuizOptionCommand(id));
            return Ok(ApiResponse<bool>.Success(result));
        }

        // --- DOCUMENTS ---
        [HttpGet("documents")]
        public async Task<IActionResult> GetDocuments([FromQuery] short? categoryId)
        {
            var result = await _mediator.Send(new QueryGetAdminDocuments(categoryId));
            return Ok(ApiResponse<List<AdminDocumentDto>>.Success(result));
        }

        [HttpPost("documents")]
        public async Task<IActionResult> CreateDocument([FromBody] CreateDocumentCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<AdminDocumentDto>.Success(result));
        }

        [HttpPut("documents/{id}")]
        public async Task<IActionResult> UpdateDocument(Guid id, [FromBody] UpdateDocumentCommand cmd)
        {
            if (id != cmd.Id) return BadRequest();
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<AdminDocumentDto>.Success(result));
        }

        [HttpDelete("documents/{id}")]
        public async Task<IActionResult> DeleteDocument(Guid id)
        {
            var result = await _mediator.Send(new DeleteDocumentCommand(id));
            return Ok(ApiResponse<bool>.Success(result));
        }

        // --- RADICAL SETS ---
        [HttpGet("radicals/sets")]
        public async Task<IActionResult> GetRadicalSets([FromQuery] Guid? lessonId)
        {
            var result = await _mediator.Send(new QueryGetRadicalSets(lessonId));
            return Ok(ApiResponse<List<RadicalSetDto>>.Success(result));
        }

        [HttpPost("radicals/sets")]
        public async Task<IActionResult> CreateRadicalSet([FromBody] CreateRadicalSetCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<RadicalSetDto>.Success(result));
        }

        [HttpPut("radicals/sets/{id}")]
        public async Task<IActionResult> UpdateRadicalSet(Guid id, [FromBody] UpdateRadicalSetCommand cmd)
        {
            if (id != cmd.Id) return BadRequest();
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<RadicalSetDto>.Success(result));
        }

        [HttpDelete("radicals/sets/{id}")]
        public async Task<IActionResult> DeleteRadicalSet(Guid id)
        {
            var result = await _mediator.Send(new DeleteRadicalSetCommand(id));
            return Ok(ApiResponse<bool>.Success(result));
        }

        // --- RADICALS ---
        [HttpGet("radicals/sets/{setId}/items")]
        public async Task<IActionResult> GetRadicals(Guid setId)
        {
            var result = await _mediator.Send(new QueryGetRadicals(setId));
            return Ok(ApiResponse<List<RadicalDto>>.Success(result));
        }

        [HttpPost("radicals")]
        public async Task<IActionResult> CreateRadical([FromBody] CreateRadicalCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<RadicalDto>.Success(result));
        }

        [HttpPut("radicals/{id}")]
        public async Task<IActionResult> UpdateRadical(Guid id, [FromBody] UpdateRadicalCommand cmd)
        {
            if (id != cmd.Id) return BadRequest();
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<RadicalDto>.Success(result));
        }

        [HttpDelete("radicals/{id}")]
        public async Task<IActionResult> DeleteRadical(Guid id)
        {
            var result = await _mediator.Send(new DeleteRadicalCommand(id));
            return Ok(ApiResponse<bool>.Success(result));
        }

        // --- CHALLENGE WORDS ---
        [HttpGet("lessons/{lessonId}/challenge-words")]
        public async Task<IActionResult> GetChallengeWords(Guid lessonId)
        {
            var result = await _mediator.Send(new QueryGetChallengeWords(lessonId));
            return Ok(ApiResponse<List<ChallengeWordDto>>.Success(result));
        }

        [HttpPost("challenge-words")]
        public async Task<IActionResult> CreateChallengeWord([FromBody] CreateChallengeWordCommand cmd)
        {
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<ChallengeWordDto>.Success(result));
        }

        [HttpPut("challenge-words/{id}")]
        public async Task<IActionResult> UpdateChallengeWord(Guid id, [FromBody] UpdateChallengeWordCommand cmd)
        {
            if (id != cmd.Id) return BadRequest();
            var result = await _mediator.Send(cmd);
            return Ok(ApiResponse<ChallengeWordDto>.Success(result));
        }

        [HttpDelete("challenge-words/{id}")]
        public async Task<IActionResult> DeleteChallengeWord(Guid id)
        {
            var result = await _mediator.Send(new DeleteChallengeWordCommand(id));
            return Ok(ApiResponse<bool>.Success(result));
        }
    }
}
