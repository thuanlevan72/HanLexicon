using HanLexicon.Domain.Entities;
using AutoMapper;
using HanLexicon.Application.DTOs.Admin;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin.LessonCategories
{
    public record QueryGetLessonCategories(string? Search = null) : IRequest<List<LessonCategoryDto>>;

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
            var query = _uow.Repository<LessonCategory>().Query().AsNoTracking();

            if (!string.IsNullOrEmpty(request.Search))
            {
                query = query.Where(c => c.Name.Contains(request.Search) || c.Slug.Contains(request.Search));
            }

            var categories = await query
                .OrderBy(c => c.SortOrder)
                .ToListAsync(cancellationToken);

            return _mapper.Map<List<LessonCategoryDto>>(categories);
        }
    }
}
