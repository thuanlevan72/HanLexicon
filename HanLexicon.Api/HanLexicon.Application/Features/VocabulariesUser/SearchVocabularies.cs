using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using VocabEntity = HanLexicon.Domain.Entities.Vocabulary;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HanLexicon.Application.Features.Search;

namespace HanLexicon.Application.Features.VocabulariesUser
{
    public record QuerySearchVocabularies(Guid UserId, string Query) : IRequest<List<VocabEntity>>;

    public class SearchVocabulariesHandler : IRequestHandler<QuerySearchVocabularies, List<VocabEntity>>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMediator _mediator;

        public SearchVocabulariesHandler(IUnitOfWork uow, IMediator mediator)
        {
            _uow = uow;
            _mediator = mediator;
        }

        public async Task<List<VocabEntity>> Handle(QuerySearchVocabularies request, CancellationToken cancellationToken)
        {
            var results = await _uow.Repository<VocabEntity>().Query()
                .Where(v => v.Word.Contains(request.Query) || v.Meaning.Contains(request.Query))
                .Take(20)
                .ToListAsync(cancellationToken);

            // Ghi nhật ký tra cứu
            if (!string.IsNullOrEmpty(request.Query))
            {
                await _mediator.Send(new LogSearchHistoryCommand(request.UserId, request.Query, results.FirstOrDefault()?.Id), cancellationToken);
            }

            return results;
        }
    }
}
