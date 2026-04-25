using HanLexicon.Domain.Entities;
using HanLexicon.Application.DTOs.docsData;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Application.Features.LessonsUser;

public record QueryGetDocuments(short? CategoryId) : IRequest<List<DocumentCategoryResponseDto>>;

public class GetDocumentsHandler : IRequestHandler<QueryGetDocuments, List<DocumentCategoryResponseDto>>
{
    private readonly IUnitOfWork _uow;

    public GetDocumentsHandler(IUnitOfWork _uow)
    {
        this._uow = _uow;
    }

    public async Task<List<DocumentCategoryResponseDto>> Handle(QueryGetDocuments request, CancellationToken cancellationToken)
    {
        var categoryQuery = _uow.Repository<LessonCategory>().Query()
            .Include(c => c.Documents)
            .AsNoTracking();

        if (request.CategoryId.HasValue)
        {
            categoryQuery = categoryQuery.Where(c => c.Id == request.CategoryId.Value);
        }

        return await categoryQuery
            .Where(c => c.Documents.Any(d => d.IsPublished))
            .OrderBy(c => c.SortOrder)
            .Select(c => new DocumentCategoryResponseDto
            {
                CategoryId = c.Id,
                CategoryName = c.Name,
                Documents = c.Documents
                    .Where(d => d.IsPublished)
                    .OrderBy(d => d.SortOrder)
                    .Select(d => new DocumentItemDto
                    {
                        Id = d.Id,
                        Title = d.Title,
                        Description = d.Description,
                        DownloadUrl = d.DownloadUrl,
                        DocType = d.DocType
                    }).ToList()
            })
            .ToListAsync(cancellationToken);
    }
}
