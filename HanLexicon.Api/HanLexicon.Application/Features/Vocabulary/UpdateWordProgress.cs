using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Vocabulary
{
    public record UpdateWordProgressCommand(Guid UserId, Guid VocabId, string Status) : IRequest<bool>;

    public class UpdateWordProgressHandler : IRequestHandler<UpdateWordProgressCommand, bool>
    {
        private readonly IUnitOfWork _uow;

        public UpdateWordProgressHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<bool> Handle(UpdateWordProgressCommand request, CancellationToken cancellationToken)
        {
            var repo = _uow.Repository<UserWordProgress>();
            var progress = await repo.Query()
                .FirstOrDefaultAsync(p => p.UserId == request.UserId && p.VocabId == request.VocabId, cancellationToken);

            if (progress != null)
            {
                progress.Status = request.Status;
                progress.ReviewCount += 1;
                progress.LastReviewed = DateTime.UtcNow;
                repo.Update(progress);
            }
            else
            {
                var newProgress = new UserWordProgress
                {
                    UserId = request.UserId,
                    VocabId = request.VocabId,
                    Status = request.Status,
                    ReviewCount = 1,
                    LastReviewed = DateTime.UtcNow
                };
                repo.Add(newProgress);
            }

            await _uow.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
