using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;

namespace HanLexicon.Application.Features.Admin.Vocabulary;

public record UpdateVocabularyCommand(
    Guid Id,
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

public class UpdateVocabularyHandler : IRequestHandler<UpdateVocabularyCommand, VocabularyDto>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public UpdateVocabularyHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<VocabularyDto> Handle(UpdateVocabularyCommand request, CancellationToken cancellationToken)
    {
        var vocabulary = await _uow.Repository<Infrastructure.Postgres.Vocabulary>().GetByIdAsync(request.Id);
        if (vocabulary == null) throw new Exception("Vocabulary not found");

        vocabulary.LessonId = request.LessonId;
        vocabulary.SortOrder = request.SortOrder;
        vocabulary.Word = request.Word;
        vocabulary.Pinyin = request.Pinyin;
        vocabulary.Meaning = request.Meaning;
        vocabulary.MeaningEn = request.MeaningEn;
        vocabulary.ExampleCn = request.ExampleCn;
        vocabulary.ExamplePy = request.ExamplePy;
        vocabulary.ExampleVn = request.ExampleVn;
        vocabulary.AudioUrl = request.AudioUrl;
        vocabulary.ImageUrl = request.ImageUrl;

        _uow.Repository<Infrastructure.Postgres.Vocabulary>().Update(vocabulary);
        await _uow.SaveChangesAsync(cancellationToken);

        return _mapper.Map<VocabularyDto>(vocabulary);
    }
}
