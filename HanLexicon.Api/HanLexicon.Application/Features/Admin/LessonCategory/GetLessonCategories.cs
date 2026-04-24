using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Application.Features.Admin.LessonCategory;

public record QueryGetLessonCategories : IRequest<List<LessonCategoryDto>>;

public class GetLessonCategoriesHandler : IRequestHandler<QueryGetLessonCategories, List<LessonCategoryDto>>
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public GetLessonCategoriesHandler(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<List<LessonCategoryDto>> Handle(QueryGetLessonCategories request, CancellationToken cancellationToken)
    {
        var categories = await _uow.Repository<Infrastructure.Postgres.LessonCategory>().Query()
            .OrderBy(c => c.SortOrder)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<LessonCategoryDto>>(categories);
    }
}
