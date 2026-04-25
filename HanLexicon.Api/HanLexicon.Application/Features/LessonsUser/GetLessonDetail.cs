using HanLexicon.Domain.Entities;
using HanLexicon.Application.DTOs.gamesData;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Application.Features.LessonsUser;

public record QueryGetLessonDetail(Guid LessonId) : IRequest<LessonFullDetailDto>;

public class GetLessonDetailHandler : IRequestHandler<QueryGetLessonDetail, LessonFullDetailDto>
{
    private readonly IUnitOfWork _uow;

    public GetLessonDetailHandler(IUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<LessonFullDetailDto> Handle(QueryGetLessonDetail request, CancellationToken cancellationToken)
    {
        var lesson = await _uow.Repository<Lesson>().Query()
            .Include(l => l.HanziCards)
            .Include(l => l.RadicalSets)
                .ThenInclude(rs => rs.Radicals)
            .Include(l => l.QuizQuestions)
                .ThenInclude(q => q.QuizOptions)
            .FirstOrDefaultAsync(l => l.Id == request.LessonId, cancellationToken);

        if (lesson == null) return null;

        return new LessonFullDetailDto
        {
            Id = lesson.Id,
            TitleCn = lesson.TitleCn,
            TitleVn = lesson.TitleVn,
            Filename = lesson.Filename,
            Description = lesson.Description,
            HanziCards = lesson.HanziCards.OrderBy(c => c.SortOrder).Select(c => new HanziCardDto
            {
                Id = c.Id,
                Character = c.Character,
                Pinyin = c.Pinyin,
                Meaning = c.Meaning,
                Mnemonic = c.Mnemonic,
                StrokeCount = c.StrokeCount,
                Radical = c.Radical,
                SortOrder = c.SortOrder
            }).ToList(),
            RadicalSets = lesson.RadicalSets.OrderBy(rs => rs.SetNumber).Select(rs => new RadicalSetDto
            {
                Id = rs.Id,
                Title = rs.Title,
                Icon = rs.Icon,
                SetNumber = rs.SetNumber,
                Radicals = rs.Radicals.OrderBy(r => r.SortOrder).Select(r => new RadicalDto
                {
                    Id = r.Id,
                    Radical = r.Radical1,
                    Name = r.Name,
                    Meaning = r.Meaning,
                    ExampleChars = r.ExampleChars,
                    SortOrder = r.SortOrder
                }).ToList()
            }).ToList(),
            Quizzes = lesson.QuizQuestions.OrderBy(q => q.SortOrder).Select(q => new QuizQuestionDto
            {
                Id = q.Id,
                Question = q.Question,
                Explanation = q.Explanation,
                Difficulty = q.Difficulty,
                SortOrder = q.SortOrder,
                Options = q.QuizOptions.OrderBy(o => o.SortOrder).Select(o => new QuizOptionDto
                {
                    Id = o.Id,
                    OptionText = o.OptionText,
                    IsCorrect = o.IsCorrect,
                    SortOrder = o.SortOrder
                }).ToList()
            }).ToList()
        };
    }
}
