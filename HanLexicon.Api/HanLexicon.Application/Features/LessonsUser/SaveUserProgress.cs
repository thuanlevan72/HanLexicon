using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.LessonsUser
{
    public record SaveUserProgressCommand(
        Guid LessonId, 
        Guid UserId, 
        short Score, 
        bool Completed, 
        int TimeSpentS, 
        int? CurrentIndex,
        short? TotalQuestions = null,
        short? CorrectCount = null,
        string? DetailsJson = null
    ) : IRequest<bool>;

    public class SaveUserProgressHandler : IRequestHandler<SaveUserProgressCommand, bool>
    {
        private readonly IUnitOfWork _uow;
        public SaveUserProgressHandler(IUnitOfWork uow) => _uow = uow;

        public async Task<bool> Handle(SaveUserProgressCommand request, CancellationToken cancellationToken)
        {
            var repo = _uow.Repository<UserProgress>();
            var progress = await repo.Query()
                .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.LessonId == request.LessonId, cancellationToken);

            if (progress != null)
            {
                // Cập nhật kỷ lục cũ
                if (request.Score > progress.Score) progress.Score = request.Score;
                if (request.Completed) progress.Completed = true;
                
                // Cập nhật vị trí đang học (nếu có gửi lên)
                if (request.CurrentIndex.HasValue)
                {
                    progress.CurrentIndex = request.CurrentIndex.Value;
                }

                progress.Attempts += 1;
                progress.LastPlayed = DateTime.UtcNow;
                repo.Update(progress);
            }
            else
            {
                // Tạo mới tiến độ bài học
                var newProgress = new UserProgress
                {
                    UserId = request.UserId,
                    LessonId = request.LessonId,
                    Score = request.Score,
                    Completed = request.Completed,
                    CurrentIndex = request.CurrentIndex ?? 0,
                    Attempts = 1,
                    LastPlayed = DateTime.UtcNow,
                    CreatedAt = DateTime.UtcNow
                };
                repo.Add(newProgress);
            }

            // LƯU LỊCH SỬ CHI TIẾT: Chỉ lưu khi có thông tin câu hỏi (thường là khi kết thúc bài test/review)
            if (request.TotalQuestions.HasValue && request.CorrectCount.HasValue)
            {
                var history = new ReviewHistory
                {
                    UserId = request.UserId,
                    LessonId = request.LessonId,
                    Score = request.Score,
                    TotalQuestions = request.TotalQuestions.Value,
                    CorrectCount = request.CorrectCount.Value,
                    DetailsJson = request.DetailsJson,
                    CreatedAt = DateTime.UtcNow
                };
                _uow.Repository<ReviewHistory>().Add(history);
            }

            // ĐỒNG BỘ TỪ VỰNG: Nếu học viên hoàn thành bài học (học mới), ghi nhận toàn bộ từ vựng trong bài
            if (request.Score >= 80) // Ngưỡng coi là đã học thuộc sơ bộ
            {
                var vocabIds = await _uow.Repository<Vocabulary>().Query()
                    .Where(v => v.LessonId == request.LessonId)
                    .Select(v => v.Id)
                    .ToListAsync(cancellationToken);

                var wordRepo = _uow.Repository<UserWordProgress>();
                foreach (var vId in vocabIds)
                {
                    var wp = await wordRepo.Query()
                        .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.VocabId == vId, cancellationToken);
                    
                    if (wp == null)
                    {
                        wordRepo.Add(new UserWordProgress
                        {
                            UserId = request.UserId,
                            VocabId = vId,
                            Status = "learned",
                            ReviewCount = 1,
                            LastReviewed = DateTime.UtcNow
                        });
                    }
                    else
                    {
                        wp.ReviewCount += 1;
                        wp.LastReviewed = DateTime.UtcNow;
                        wordRepo.Update(wp);
                    }
                }
            }

            await _uow.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
