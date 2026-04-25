using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.LessonsUser
{
    public record SaveUserProgressCommand(Guid UserId, Guid LessonId, short Score, bool Completed, int TimeSpentS) : IRequest<bool>;

    public class SaveUserProgressHandler : IRequestHandler<SaveUserProgressCommand, bool>
    {
        private readonly IUnitOfWork _uow;

        public SaveUserProgressHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<bool> Handle(SaveUserProgressCommand request, CancellationToken cancellationToken)
        {
            var repo = _uow.Repository<UserProgress>();
            var existingProgress = await repo.Query()
                .FirstOrDefaultAsync(p => p.UserId == request.UserId && p.LessonId == request.LessonId, cancellationToken);

            if (existingProgress != null)
            {
                // Cập nhật bản ghi duy nhất (như BRD đặc tả)
                existingProgress.Score = Math.Max(existingProgress.Score, request.Score);
                existingProgress.Completed = existingProgress.Completed || request.Completed;
                existingProgress.Attempts += 1;
                existingProgress.TimeSpentS += request.TimeSpentS;
                existingProgress.LastPlayed = DateTime.UtcNow;
                
                repo.Update(existingProgress);
            }
            else
            {
                // Thêm mới nếu chưa có
                var newProgress = new UserProgress
                {
                    Id = Guid.NewGuid(),
                    UserId = request.UserId,
                    LessonId = request.LessonId,
                    Score = request.Score,
                    Completed = request.Completed,
                    Attempts = 1,
                    TimeSpentS = request.TimeSpentS,
                    LastPlayed = DateTime.UtcNow,
                    CreatedAt = DateTime.UtcNow
                };
                repo.Add(newProgress);
            }

            await _uow.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
