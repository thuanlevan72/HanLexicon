using HanLexicon.Domain.Entities;
using HanLexicon.Application.DTOs.gamesData;
using HanLexicon.Domain.Interfaces;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HanLexicon.Application.Features.LessonsUser
{
    // Query
    public record QueryGetLessons() : IRequest<List<GameCategoryResponseDto>>;
    public class GetLessons: IRequestHandler<QueryGetLessons, List<GameCategoryResponseDto>>
    {
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUserService _currentUser;

        public GetLessons(IUnitOfWork uow, ICurrentUserService currentUser)
        {
            _uow = uow;
            _currentUser = currentUser;
        }

        public async Task<List<GameCategoryResponseDto>> Handle(QueryGetLessons request, CancellationToken cancellationToken)
        {
            var userId = _currentUser.UserId;

            return await _uow.Repository<LessonCategory>()
                .Query()
                .AsNoTracking()
                .OrderBy(x => x.SortOrder)
                .Select(x => new GameCategoryResponseDto
                {
                    CategorySlug = x.Slug,
                    Items = x.Lessons
                        .OrderBy(l => l.SortOrder)
                        .Select(lesson => new GameItemDto
                        {
                            Id = lesson.Id,
                            Badge = lesson.Badge,
                            Desc = lesson.Description,
                            Icon = lesson.Icon,
                            Link = lesson.Filename,
                            Title = lesson.TitleCn,
                            Translation = lesson.TitleVn,
                            Score = lesson.UserProgresses
                                .Where(up => up.UserId == userId)
                                .Select(up => (short?)up.Score)
                                .FirstOrDefault()
                        }).ToList()
                })
                .ToListAsync(cancellationToken);
        }
    }
}
