using HanLexicon.Domain.Entities;
using HanLexicon.Application.DTOs.gamesData;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Application.Features.LessonsUser;

public record QueryGetVocabularyByLesson(Guid LessonId) : IRequest<List<VocabularyItemDto>>;

public class GetVocabularyByLessonHandler : IRequestHandler<QueryGetVocabularyByLesson, List<VocabularyItemDto>>
{
    private readonly IUnitOfWork _uow;

    public GetVocabularyByLessonHandler(IUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<List<VocabularyItemDto>> Handle(QueryGetVocabularyByLesson request, CancellationToken cancellationToken)
    {
        return await _uow.Repository<Vocabulary>().Query()
            .Where(v => v.LessonId == request.LessonId)
            .OrderBy(v => v.SortOrder)
            .Select(v => new VocabularyItemDto
            {
                Id = v.Id,
                Word = v.Word,
                Pinyin = v.Pinyin,
                Meaning = v.Meaning,
                MeaningEn = v.MeaningEn,
                ExampleCn = v.ExampleCn,
                ExamplePy = v.ExamplePy,
                ExampleVn = v.ExampleVn,
                AudioUrl = v.AudioUrl,
                ImageUrl = v.ImageUrl,
                SortOrder = v.SortOrder
            })
            .ToListAsync(cancellationToken);
    }
}
