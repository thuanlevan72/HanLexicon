using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin.UsersAdmin
{
    public record QueryGetStudentStats(Guid UserId) : IRequest<StudentLearningStatsDto>;

    public class StudentLearningStatsDto
    {
        public int LessonsCompleted { get; set; }
        public int LessonsStarted { get; set; }
        public double AvgScore { get; set; }
        public int TotalTimeSeconds { get; set; }
        public List<LearningActivityDto> RecentActivities { get; set; }
        public List<LessonProgressDto> Roadmap { get; set; }
        public List<ReviewHistoryDetailDto> ReviewHistory { get; set; }
    }

    public class LessonProgressDto
    {
        public Guid LessonId { get; set; }
        public string Title { get; set; }
        public string Level { get; set; }
        public bool IsCompleted { get; set; }
        public int Score { get; set; }
        public DateTime? LastPlayed { get; set; }
    }

    public class ReviewHistoryDetailDto
    {
        public Guid Id { get; set; }
        public string LessonTitle { get; set; }
        public int Score { get; set; }
        public int CorrectCount { get; set; }
        public int TotalQuestions { get; set; }
        public string DetailsJson { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class LearningActivityDto
    {
        public string ActivityType { get; set; } // Lesson, Quiz
        public string Title { get; set; }
        public int Score { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class GetStudentStatsHandler : IRequestHandler<QueryGetStudentStats, StudentLearningStatsDto>
    {
        private readonly IUnitOfWork _uow;
        public GetStudentStatsHandler(IUnitOfWork uow) => _uow = uow;

        public async Task<StudentLearningStatsDto> Handle(QueryGetStudentStats request, CancellationToken cancellationToken)
        {
            // Lấy từ View v_user_stats
            var statsView = await _uow.Repository<VUserStat>().Query()
                .FirstOrDefaultAsync(x => x.UserId == request.UserId, cancellationToken);

            // 1. Hoạt động gần đây
            var recentActivities = await _uow.Repository<UserProgress>().Query()
                .Include(x => x.Lesson)
                .Where(x => x.UserId == request.UserId)
                .OrderByDescending(x => x.LastPlayed)
                .Take(5)
                .Select(x => new LearningActivityDto
                {
                    ActivityType = "Bài học",
                    Title = x.Lesson.TitleCn + " / " + x.Lesson.TitleVn,
                    Score = (int)x.Score,
                    Timestamp = x.LastPlayed
                })
                .ToListAsync(cancellationToken);

            // 2. Lộ trình học tập (Roadmap)
            var roadmap = await _uow.Repository<Lesson>().Query()
                .Include(l => l.Category)
                .Include(l => l.UserProgresses.Where(up => up.UserId == request.UserId))
                .OrderBy(l => l.Category.SortOrder).ThenBy(l => l.SortOrder)
                .Select(l => new LessonProgressDto
                {
                    LessonId = l.Id,
                    Title = l.TitleCn + " / " + l.TitleVn,
                    Level = l.Category.Slug,
                    IsCompleted = l.UserProgresses.Any(up => up.UserId == request.UserId && up.Completed),
                    Score = (int)(l.UserProgresses.Where(up => up.UserId == request.UserId).Select(up => (short?)up.Score).FirstOrDefault() ?? 0),
                    LastPlayed = l.UserProgresses.Where(up => up.UserId == request.UserId).Select(up => (DateTime?)up.LastPlayed).FirstOrDefault()
                })
                .ToListAsync(cancellationToken);

            // 3. Lịch sử kiểm tra chi tiết (Review History)
            var reviewHistory = await _uow.Repository<ReviewHistory>().Query()
                .Include(h => h.Lesson)
                .Where(h => h.UserId == request.UserId)
                .OrderByDescending(h => h.CreatedAt)
                .Select(h => new ReviewHistoryDetailDto
                {
                    Id = h.Id,
                    LessonTitle = h.Lesson.TitleCn + " / " + h.Lesson.TitleVn,
                    Score = h.Score,
                    CorrectCount = h.CorrectCount,
                    TotalQuestions = h.TotalQuestions,
                    DetailsJson = h.DetailsJson,
                    CreatedAt = h.CreatedAt
                })
                .ToListAsync(cancellationToken);

            return new StudentLearningStatsDto
            {
                LessonsCompleted = (int)(statsView?.LessonsCompleted ?? 0),
                LessonsStarted = (int)(statsView?.LessonsStarted ?? 0),
                AvgScore = (double)(statsView?.AvgScore ?? 0),
                TotalTimeSeconds = (int)(statsView?.TotalTimeSeconds ?? 0),
                RecentActivities = recentActivities,
                Roadmap = roadmap,
                ReviewHistory = reviewHistory
            };
        }
    }
}
