using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin.DashboardAdmin
{
    public record QueryGetGrowthStats() : IRequest<List<GrowthStatsDto>>;

    public class GrowthStatsDto
    {
        public string Name { get; set; } = string.Empty;
        public int Users { get; set; }
        public int Lessons { get; set; }
    }

    public class GetGrowthStatsHandler : IRequestHandler<QueryGetGrowthStats, List<GrowthStatsDto>>
    {
        private readonly IUnitOfWork _uow;
        public GetGrowthStatsHandler(IUnitOfWork uow) => _uow = uow;

        public async Task<List<GrowthStatsDto>> Handle(QueryGetGrowthStats request, CancellationToken cancellationToken)
        {
            var now = DateTime.UtcNow;
            var fiveMonthsAgo = new DateTime(now.Year, now.Month, 1).AddMonths(-4);

            var userQuery = _uow.Repository<User>().Query();
            var lessonQuery = _uow.Repository<Lesson>().Query();

            var stats = new List<GrowthStatsDto>();

            for (int i = 0; i < 5; i++)
            {
                var monthStart = fiveMonthsAgo.AddMonths(i);
                var monthEnd = monthStart.AddMonths(1);

                var userCount = await userQuery.CountAsync(u => u.CreatedAt < monthEnd, cancellationToken);
                var lessonCount = await lessonQuery.CountAsync(l => l.CreatedAt < monthEnd, cancellationToken);

                stats.Add(new GrowthStatsDto
                {
                    Name = $"Tháng {monthStart.Month}",
                    Users = userCount,
                    Lessons = lessonCount
                });
            }

            return stats;
        }
    }
}
