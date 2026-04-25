using HanLexicon.Domain.Entities;
using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Application.Features.Admin.LessonCategories;

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
        var categories = await _uow.Repository<LessonCategory>().Query()
            .OrderBy(c => c.SortOrder)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<LessonCategoryDto>>(categories);
    }
}
