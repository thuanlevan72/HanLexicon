using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Npgsql;
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
            // 1. XỬ LÝ TIẾN ĐỘ HỌC TẬP (Study Progress)
            // Nếu có currentIndex, đây là một cập nhật về việc xem thẻ bài học
            if (request.CurrentIndex.HasValue)
            {
                var studyRepo = _uow.Repository<UserStudyProgress>();
                var study = await studyRepo.Query()
                    .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.LessonId == request.LessonId, cancellationToken);

                if (study != null)
                {
                    study.CurrentIndex = request.CurrentIndex.Value;
                    if (request.Completed) study.IsCompleted = true;
                    study.LastStudiedAt = DateTime.UtcNow;
                    studyRepo.Update(study);
                }
                else
                {
                    studyRepo.Add(new UserStudyProgress
                    {
                        UserId = request.UserId,
                        LessonId = request.LessonId,
                        CurrentIndex = request.CurrentIndex.Value,
                        IsCompleted = request.Completed,
                        LastStudiedAt = DateTime.UtcNow,
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }

            // 2. XỬ LÝ KẾT QUẢ THI/ÔN TẬP (Exam Summary)
            // Chỉ cập nhật điểm số và lịch sử nếu đây là một bài test (có điểm số hoặc số câu hỏi)
            if (request.TotalQuestions.HasValue || request.Score > 0)
            {
                var examRepo = _uow.Repository<UserProgress>();
                var exam = await examRepo.Query()
                    .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.LessonId == request.LessonId, cancellationToken);

                if (exam != null)
                {
                    if (request.Score > exam.Score) exam.Score = request.Score;
                    if (request.Score >= 80) exam.Completed = true;
                    exam.Attempts += 1;
                    exam.LastPlayed = DateTime.UtcNow;
                    examRepo.Update(exam);
                }
                else
                {
                    examRepo.Add(new UserProgress
                    {
                        UserId = request.UserId,
                        LessonId = request.LessonId,
                        Score = request.Score,
                        Completed = request.Score >= 80,
                        Attempts = 1,
                        LastPlayed = DateTime.UtcNow,
                        CreatedAt = DateTime.UtcNow
                    });
                }

                // Lưu lịch sử chi tiết (ReviewHistory)
                if (request.TotalQuestions.HasValue && request.CorrectCount.HasValue)
                {
                    _uow.Repository<ReviewHistory>().Add(new ReviewHistory
                    {
                        UserId = request.UserId,
                        LessonId = request.LessonId,
                        Score = request.Score,
                        TotalQuestions = request.TotalQuestions.Value,
                        CorrectCount = request.CorrectCount.Value,
                        DetailsJson = request.DetailsJson,
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }

            // 3. ĐỒNG BỘ TỪ VỰNG (Nếu đạt điểm cao coi như đã học xong các từ trong bài)
            if (request.Score >= 80)
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

            try
            {
                await _uow.SaveChangesAsync(cancellationToken);
            }
            catch (DbUpdateException ex) when (ex.InnerException is PostgresException { SqlState: "23505" })
            {
                // Unique constraint violation - ignoring as record already exists (mục đích đạt được)
            }
            return true;
        }
    }
}
