using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Search
{
    public record LogSearchHistoryCommand(Guid UserId, string Query, Guid? VocabId) : IRequest<bool>;

    public class LogSearchHistoryHandler : IRequestHandler<LogSearchHistoryCommand, bool>
    {
        private readonly IUnitOfWork _uow;

        public LogSearchHistoryHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<bool> Handle(LogSearchHistoryCommand request, CancellationToken cancellationToken)
        {
            var searchHistory = new SearchHistory
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                Query = request.Query,
                VocabId = request.VocabId,
                SearchedAt = DateTime.UtcNow
            };

            _uow.Repository<SearchHistory>().Add(searchHistory);
            await _uow.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
