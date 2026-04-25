using HanLexicon.Domain.Entities;
using HanLexicon.Application.DTOs.gamesData;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanLexicon.Application.Features.LessonsUser
{
    // Query
    public record QueryGetLessons() : IRequest<List<GameCategoryResponseDto>>;
    public class GetLessons: IRequestHandler<QueryGetLessons, List<GameCategoryResponseDto>>
    {
        private readonly IUnitOfWork _uow;

        public GetLessons(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<List<GameCategoryResponseDto>> Handle(QueryGetLessons request, CancellationToken cancellationToken)
        {
            return await _uow.Repository<LessonCategory>()
                .Query()
                .AsNoTracking()
                .OrderBy(x => x.SortOrder)
                .Select(x => new GameCategoryResponseDto
                {
                    CategorySlug = x.Slug,
                    Items = x.Lessons.Select(lessons => new GameItemDto
                    {
                        Badge = lessons.Badge,
                        Desc = lessons.Description,
                        Icon = lessons.Icon,
                        Link = lessons.Filename,
                        Title = lessons.TitleCn,
                        Translation = lessons.TitleVn

                    }).ToList()
                })
                .ToListAsync(cancellationToken);
        }
    }
}
