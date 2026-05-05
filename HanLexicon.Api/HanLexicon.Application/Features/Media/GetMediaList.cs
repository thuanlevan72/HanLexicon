using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Media
{
    public record QueryGetMediaList(
        string? Search = null, 
        string? MediaType = null, 
        string? Folder = null,
        string? SortBy = "CreatedAt", 
        bool IsDescending = true,
        int Page = 1, 
        int PageSize = 20) : IRequest<MediaListResponse>;

    public class MediaListResponse
    {
        public List<MediaDto> Items { get; set; } = new();
        public List<string> Folders { get; set; } = new();
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }

    public class MediaDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; } = null!;
        public string MediaType { get; set; } = null!;
        public string CdnUrl { get; set; } = null!;
        public string? MimeType { get; set; }
        public string Folder { get; set; } = "general";
        public int? FileSizeKb { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class GetMediaListHandler : IRequestHandler<QueryGetMediaList, MediaListResponse>
    {
        private readonly IUnitOfWork _uow;
        public GetMediaListHandler(IUnitOfWork uow) => _uow = uow;

        public async Task<MediaListResponse> Handle(QueryGetMediaList request, CancellationToken cancellationToken)
        {
            var query = _uow.Repository<MediaFile>().Query().AsNoTracking();

            // Fetch explicitly created folders
            var dbFolders = await _uow.Repository<MediaFolder>().Query().AsNoTracking()
                                     .Select(f => f.Name)
                                     .ToListAsync(cancellationToken);

            // Fetch distinct folders from existing files for backward compatibility
            var fileFolders = await _uow.Repository<MediaFile>().Query().AsNoTracking()
                                     .Where(m => m.StorageKey.Contains("/"))
                                     .Select(m => m.StorageKey)
                                     .ToListAsync(cancellationToken);
                                     
            var derivedFolders = fileFolders
                .Select(key => key.Substring(0, key.IndexOf('/')))
                .Distinct();

            var folders = dbFolders.Union(derivedFolders)
                .OrderBy(f => f)
                .ToList();

            if (!folders.Contains("general")) folders.Insert(0, "general");

            if (!string.IsNullOrEmpty(request.Search))
            {
                var s = request.Search.ToLower();
                query = query.Where(m => m.FileName.ToLower().Contains(s));
            }

            if (!string.IsNullOrEmpty(request.MediaType))
            {
                var mt = request.MediaType.ToLower();
                query = query.Where(m => m.MediaType.ToLower() == mt);
            }

            if (!string.IsNullOrEmpty(request.Folder))
            {
                var folderPattern = request.Folder == "general" ? "" : request.Folder + "/";
                if (request.Folder == "general")
                {
                    query = query.Where(m => !m.StorageKey.Contains("/"));
                }
                else
                {
                    query = query.Where(m => m.StorageKey.StartsWith(folderPattern));
                }
            }

            query = request.SortBy?.ToLower() switch
            {
                "filename" => request.IsDescending ? query.OrderByDescending(m => m.FileName) : query.OrderBy(m => m.FileName),
                "size" => request.IsDescending ? query.OrderByDescending(m => m.FileSizeKb) : query.OrderBy(m => m.FileSizeKb),
                _ => request.IsDescending ? query.OrderByDescending(m => m.CreatedAt) : query.OrderBy(m => m.CreatedAt)
            };

            var totalItems = await query.CountAsync(cancellationToken);
            var totalPages = (int)Math.Ceiling(totalItems / (double)request.PageSize);

            var items = await query
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(m => new MediaDto
                {
                    Id = m.Id,
                    FileName = m.FileName,
                    MediaType = m.MediaType,
                    CdnUrl = m.CdnUrl,
                    MimeType = m.MimeType,
                    Folder = m.StorageKey.Contains("/") ? m.StorageKey.Substring(0, m.StorageKey.IndexOf("/")) : "general",
                    FileSizeKb = m.FileSizeKb,
                    CreatedAt = m.CreatedAt
                })
                .ToListAsync(cancellationToken);

            return new MediaListResponse
            {
                Items = items,
                Folders = folders,
                TotalItems = totalItems,
                TotalPages = totalPages
            };
        }
    }
}
