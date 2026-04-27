using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using HanLexicon.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Admin.VocabulariesAdmin
{
    public record QueryGetImportJobs(int Page = 1, int PageSize = 10) : IRequest<PagedResult<ImportJobDto>>;

    public class ImportJobDto
    {
        public Guid Id { get; set; }
        public string Status { get; set; } = null!;
        public string FileName { get; set; } = null!;
        public int TotalRows { get; set; }
        public int ProcessedRows { get; set; }
        public int FailedRows { get; set; }
        public string? ErrorLog { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? FinishedAt { get; set; }
    }

    public class GetImportJobsHandler : IRequestHandler<QueryGetImportJobs, PagedResult<ImportJobDto>>
    {
        private readonly IUnitOfWork _uow;
        public GetImportJobsHandler(IUnitOfWork uow) => _uow = uow;

        public async Task<PagedResult<ImportJobDto>> Handle(QueryGetImportJobs request, CancellationToken cancellationToken)
        {
            var query = _uow.Repository<ImportJob>().Query().AsNoTracking();

            var totalItems = await query.CountAsync(cancellationToken);
            var items = await query
                .OrderByDescending(x => x.CreatedAt)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new ImportJobDto
                {
                    Id = x.Id,
                    Status = x.Status,
                    FileName = x.FileName,
                    TotalRows = x.TotalRows,
                    ProcessedRows = x.ProcessedRows,
                    FailedRows = x.FailedRows,
                    ErrorLog = x.ErrorLog,
                    CreatedAt = x.CreatedAt,
                    FinishedAt = x.FinishedAt
                })
                .ToListAsync(cancellationToken);

            return new PagedResult<ImportJobDto>
            {
                Items = items,
                TotalItems = totalItems,
                TotalPages = (int)Math.Ceiling(totalItems / (double)request.PageSize),
                CurrentPage = request.Page
            };
        }
    }
}
