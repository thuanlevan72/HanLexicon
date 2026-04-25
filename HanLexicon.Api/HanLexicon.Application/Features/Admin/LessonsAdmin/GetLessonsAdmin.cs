using HanLexicon.Domain.Entities;
using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Application.Features.Admin.LessonsAdmin;

public record QueryGetLessonsAdmin(short? CategoryId) : IRequest<List<LessonDto>>;

public class GetLessonsAdminHandler : IRequestHandler<QueryGetLessonsAdmin, List<LessonDto>>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public GetLessonsAdminHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<LessonDto>> Handle(QueryGetLessonsAdmin request, CancellationToken cancellationToken)
    {
        var query = _uow.Repository<Lesson>().Query()
            .Include(l => l.Category)
            .AsQueryable();

        if (request.CategoryId.HasValue)
        {
            query = query.Where(l => l.CategoryId == request.CategoryId.Value);
        }

        var lessons = await query
            .OrderBy(l => l.CategoryId)
            .ThenBy(l => l.SortOrder)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<LessonDto>>(lessons);
    }
}
