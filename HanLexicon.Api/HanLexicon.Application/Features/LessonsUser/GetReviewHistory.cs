using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.LessonsUser
{
    public record QueryGetReviewHistory(Guid LessonId) : IRequest<List<ReviewHistoryDto>>;

    public class ReviewHistoryDto
    {
        public Guid Id { get; set; }
        public short Score { get; set; }
        public short TotalQuestions { get; set; }
        public short CorrectCount { get; set; }
        public string? DetailsJson { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class GetReviewHistoryHandler : IRequestHandler<QueryGetReviewHistory, List<ReviewHistoryDto>>
    {
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUserService _currentUser;

        public GetReviewHistoryHandler(IUnitOfWork uow, ICurrentUserService currentUser)
        {
            _uow = uow;
            _currentUser = currentUser;
        }

        public async Task<List<ReviewHistoryDto>> Handle(QueryGetReviewHistory request, CancellationToken cancellationToken)
        {
            var userId = _currentUser.UserId;
            if (userId == Guid.Empty) return new List<ReviewHistoryDto>();

            var results = await _uow.Repository<ReviewHistory>()
                .Query()
                .AsNoTracking()
                .Where(x => x.UserId == userId && x.LessonId == request.LessonId)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync(cancellationToken);

            return results.Select(x => new ReviewHistoryDto
            {
                Id = x.Id,
                Score = x.Score,
                TotalQuestions = x.TotalQuestions,
                CorrectCount = x.CorrectCount,
                DetailsJson = x.DetailsJson,
                CreatedAt = x.CreatedAt
            }).ToList();
        }
    }
}
