using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;

namespace HanLexicon.Application.Features.Admin.Vocabulary;

public record CreateVocabularyCommand(
    Guid LessonId,
    short SortOrder,
    string Word,
    string Pinyin,
    string Meaning,
    string? MeaningEn,
    string? ExampleCn,
    string? ExamplePy,
    string? ExampleVn,
    string? AudioUrl,
    string? ImageUrl
) : IRequest<VocabularyDto>;

public class CreateVocabularyHandler : IRequestHandler<CreateVocabularyCommand, VocabularyDto>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public CreateVocabularyHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<VocabularyDto> Handle(CreateVocabularyCommand request, CancellationToken cancellationToken)
    {
        var vocabulary = new Infrastructure.Postgres.Vocabulary
        {
            Id = Guid.NewGuid(),
            LessonId = request.LessonId,
            SortOrder = request.SortOrder,
            Word = request.Word,
            Pinyin = request.Pinyin,
            Meaning = request.Meaning,
            MeaningEn = request.MeaningEn,
            ExampleCn = request.ExampleCn,
            ExamplePy = request.ExamplePy,
            ExampleVn = request.ExampleVn,
            AudioUrl = request.AudioUrl,
            ImageUrl = request.ImageUrl
        };

        _uow.Repository<Infrastructure.Postgres.Vocabulary>().Add(vocabulary);
        await _uow.SaveChangesAsync(cancellationToken);

        return _mapper.Map<VocabularyDto>(vocabulary);
    }
}
