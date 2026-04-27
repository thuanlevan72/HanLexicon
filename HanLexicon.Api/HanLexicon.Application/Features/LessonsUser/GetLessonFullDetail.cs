using HanLexicon.Domain.Entities;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.LessonsUser
{
    public record QueryGetLessonFullDetail(Guid LessonId) : IRequest<LessonFullDetailDto>;

    public class LessonFullDetailDto
    {
        public Guid Id { get; set; }
        public string TitleCn { get; set; } = null!;
        public string TitleVn { get; set; } = null!;
        public string? Description { get; set; }
        public int CurrentIndex { get; set; } = 0;
        public List<VocabularyDto> Vocabularies { get; set; } = new();
        public List<HanziCardDto> HanziCards { get; set; } = new();
        public List<QuizQuestionFullDto> Quizzes { get; set; } = new();
    }

    public class QuizQuestionFullDto
    {
        public Guid Id { get; set; }
        public string Question { get; set; } = null!;
        public string? Explanation { get; set; }
        public int Difficulty { get; set; }
        public List<QuizOptionDto> Options { get; set; } = new();
    }

    public class GetLessonFullDetailHandler : IRequestHandler<QueryGetLessonFullDetail, LessonFullDetailDto>
    {
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUserService _currentUserService;

        public GetLessonFullDetailHandler(IUnitOfWork uow, ICurrentUserService currentUserService)
        {
            _uow = uow;
            _currentUserService = currentUserService;
        }

        public async Task<LessonFullDetailDto> Handle(QueryGetLessonFullDetail request, CancellationToken cancellationToken)
        {
            var lesson = await _uow.Repository<Lesson>().Query()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.LessonId, cancellationToken);

            if (lesson == null) throw new Exception("Lesson not found");

            // Lấy tiến độ hiện tại của người dùng
            int savedIndex = 0;
            if (_currentUserService.UserId != Guid.Empty)
            {
                var progress = await _uow.Repository<UserProgress>().Query()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(p => p.UserId == _currentUserService.UserId && p.LessonId == request.LessonId, cancellationToken);
                if (progress != null) savedIndex = progress.CurrentIndex;
            }

            var vocabularies = await _uow.Repository<Vocabulary>().Query()
                .Where(v => v.LessonId == request.LessonId)
                .OrderBy(v => v.SortOrder)
                .ToListAsync(cancellationToken);

            var hanziCards = await _uow.Repository<HanziCard>().Query()
                .Where(h => h.LessonId == request.LessonId)
                .OrderBy(h => h.SortOrder)
                .ToListAsync(cancellationToken);

            var quizzes = await _uow.Repository<QuizQuestion>().Query()
                .Include(q => q.QuizOptions)
                .Where(q => q.LessonId == request.LessonId)
                .OrderBy(q => q.SortOrder)
                .ToListAsync(cancellationToken);

            return new LessonFullDetailDto
            {
                Id = lesson.Id,
                TitleCn = lesson.TitleCn,
                TitleVn = lesson.TitleVn,
                Description = lesson.Description,
                CurrentIndex = savedIndex,
                Vocabularies = vocabularies.Select(v => new VocabularyDto
                {
                    Id = v.Id, Word = v.Word, Pinyin = v.Pinyin, Meaning = v.Meaning,
                    AudioUrl = v.AudioUrl, ImageUrl = v.ImageUrl,
                    ExampleCn = v.ExampleCn, ExamplePy = v.ExamplePy, ExampleVn = v.ExampleVn
                }).ToList(),
                HanziCards = hanziCards.Select(h => new HanziCardDto
                {
                    Id = h.Id, Character = h.Character, Pinyin = h.Pinyin, Meaning = h.Meaning,
                    StrokeCount = h.StrokeCount, Radical = h.Radical, Mnemonic = h.Mnemonic
                }).ToList(),
                Quizzes = quizzes.Select(q => new QuizQuestionFullDto
                {
                    Id = q.Id, Question = q.Question, Explanation = q.Explanation, Difficulty = q.Difficulty,
                    Options = q.QuizOptions.Select(o => new QuizOptionDto
                    {
                        Id = o.Id, OptionText = o.OptionText, IsCorrect = o.IsCorrect
                    }).OrderBy(o => o.Id).ToList()
                }).ToList()
            };
        }
    }
}
