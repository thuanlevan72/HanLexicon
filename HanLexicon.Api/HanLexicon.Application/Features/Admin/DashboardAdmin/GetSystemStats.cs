using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin.DashboardAdmin
{
    public record QueryGetSystemOverallStats() : IRequest<SystemOverallStatsDto>;

    public class SystemOverallStatsDto
    {
        public int TotalUsers { get; set; }
        public int TotalLessons { get; set; }
        public int TotalVocabularies { get; set; }
        public int TotalLogs { get; set; }
        public int TotalCategories { get; set; }
    }

    public class GetSystemStatsHandler : IRequestHandler<QueryGetSystemOverallStats, SystemOverallStatsDto>
    {
        private readonly IUnitOfWork _uow;
        public GetSystemStatsHandler(IUnitOfWork uow) => _uow = uow;

        public async Task<SystemOverallStatsDto> Handle(QueryGetSystemOverallStats request, CancellationToken cancellationToken)
        {
            return new SystemOverallStatsDto
            {
                TotalUsers = await _uow.Repository<User>().Query().CountAsync(cancellationToken),
                TotalLessons = await _uow.Repository<Lesson>().Query().CountAsync(cancellationToken),
                TotalVocabularies = await _uow.Repository<Vocabulary>().Query().CountAsync(cancellationToken),
                TotalLogs = await _uow.Repository<SystemLog>().Query().CountAsync(cancellationToken),
                TotalCategories = await _uow.Repository<LessonCategory>().Query().CountAsync(cancellationToken)
            };
        }
    }
}
