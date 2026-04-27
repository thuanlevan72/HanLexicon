using HanLexicon.Domain.Entities;
using HanLexicon.Application.DTOs.gamesData;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.LessonsUser
{
    // 1. Query lấy danh sách Category (Rút gọn)
    public record QueryGetCategories() : IRequest<List<CategorySimpleResponseDto>>;

    public class CategorySimpleResponseDto
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
    }

    public class GetCategoriesHandler : IRequestHandler<QueryGetCategories, List<CategorySimpleResponseDto>>
    {
        private readonly IUnitOfWork _uow;
        public GetCategoriesHandler(IUnitOfWork uow) => _uow = uow;

        public async Task<List<CategorySimpleResponseDto>> Handle(QueryGetCategories request, CancellationToken cancellationToken)
        {
            return await _uow.Repository<LessonCategory>()
                .Query()
                .AsNoTracking()
                .OrderBy(x => x.SortOrder)
                .Select(x => new CategorySimpleResponseDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Slug = x.Slug
                })
                .ToListAsync(cancellationToken);
        }
    }

    // 2. Query lấy danh sách Lesson theo CategoryId
    public record QueryGetLessonsByCategory(short CategoryId) : IRequest<List<GameItemDto>>;

    public class GetLessonsByCategoryHandler : IRequestHandler<QueryGetLessonsByCategory, List<GameItemDto>>
    {
        private readonly IUnitOfWork _uow;
        public GetLessonsByCategoryHandler(IUnitOfWork uow) => _uow = uow;

        public async Task<List<GameItemDto>> Handle(QueryGetLessonsByCategory request, CancellationToken cancellationToken)
        {
            return await _uow.Repository<Lesson>()
                .Query()
                .AsNoTracking()
                .Where(x => x.CategoryId == request.CategoryId)
                .OrderBy(x => x.SortOrder)
                .Select(x => new GameItemDto
                {
                    Id = x.Id,
                    Title = x.TitleCn,
                    Translation = x.TitleVn,
                    Desc = x.Description,
                    Link = x.Filename
                })
                .ToListAsync(cancellationToken);
        }
    }
}
