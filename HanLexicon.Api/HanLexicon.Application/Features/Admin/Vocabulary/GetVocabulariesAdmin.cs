using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Application.Features.Admin.Vocabulary;

public record QueryGetVocabulariesAdmin(Guid? LessonId) : IRequest<List<VocabularyDto>>;

public class GetVocabulariesAdminHandler : IRequestHandler<QueryGetVocabulariesAdmin, List<VocabularyDto>>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public GetVocabulariesAdminHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<VocabularyDto>> Handle(QueryGetVocabulariesAdmin request, CancellationToken cancellationToken)
    {
        var query = _uow.Repository<Infrastructure.Postgres.Vocabulary>().Query()
            .Include(v => v.Lesson)
            .AsQueryable();

        if (request.LessonId.HasValue)
        {
            query = query.Where(v => v.LessonId == request.LessonId.Value);
        }

        var vocabularies = await query
            .OrderBy(v => v.LessonId)
            .ThenBy(v => v.SortOrder)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<VocabularyDto>>(vocabularies);
    }
}
