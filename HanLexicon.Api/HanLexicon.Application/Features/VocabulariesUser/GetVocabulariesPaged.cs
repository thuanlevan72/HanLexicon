using HanLexicon.Application.Common;
using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.VocabulariesUser
{
    public record QueryGetVocabulariesPaged(string? Search, string? Level, int Page = 1, int PageSize = 12) : IRequest<PagedResult<Vocabulary>>;

    public class GetVocabulariesPagedHandler : IRequestHandler<QueryGetVocabulariesPaged, PagedResult<Vocabulary>>
    {
        private readonly IUnitOfWork _uow;

        public GetVocabulariesPagedHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<PagedResult<Vocabulary>> Handle(QueryGetVocabulariesPaged request, CancellationToken cancellationToken)
        {
            var query = _uow.Repository<Vocabulary>().Query()
                .Include(v => v.Lesson)
                .ThenInclude(l => l.Category)
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Search))
            {
                query = query.Where(v => v.Word.Contains(request.Search) || v.Meaning.Contains(request.Search) || v.Pinyin.Contains(request.Search));
            }

            if (!string.IsNullOrEmpty(request.Level) && request.Level != "Tất cả")
            {
                query = query.Where(v => v.Lesson.Category.Name == request.Level);
            }

            var totalItems = await query.CountAsync(cancellationToken);
            var items = await query
                .OrderBy(v => v.Word)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            return new PagedResult<Vocabulary>(items, totalItems, request.Page, request.PageSize);
        }
    }
}
