using HanLexicon.Application.Common;
using HanLexicon.Application.Interfaces;
using Application.Interfaces;
using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Media
{
    public record UploadMediaBatchCommand(List<IFormFile> Files, string Folder = "general") : IRequest<UploadMediaBatchResult>;

    public record UploadMediaBatchResult(int Total, List<object> Files);

    public class UploadMediaBatchHandler : IRequestHandler<UploadMediaBatchCommand, UploadMediaBatchResult>
    {
        private readonly IStorageService _storageService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public UploadMediaBatchHandler(IStorageService storageService, IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
        {
            _storageService = storageService;
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task<UploadMediaBatchResult> Handle(UploadMediaBatchCommand request, CancellationToken cancellationToken)
        {
            var uploadedUrls = new List<object>();
            Guid? userId = _currentUserService.IsAuthenticated ? _currentUserService.UserId : null;

            foreach (var file in request.Files)
            {
                if (file.Length > 0)
                {
                    using var stream = file.OpenReadStream();
                    var folder = request.Folder?.Trim('/') ?? "general";
                    var fileNameWithFolder = folder == "general" ? file.FileName : $"{folder}/{file.FileName}";
                    
                    var fileUrl = await _storageService.UploadFileAsync(stream, fileNameWithFolder, file.ContentType);
                    
                    var mediaFile = new MediaFile
                    {
                        Id = Guid.NewGuid(),
                        FileName = file.FileName,
                        MediaType = file.ContentType.StartsWith("image") ? "image" : "audio",
                        MimeType = file.ContentType,
                        FileSizeKb = (int)(file.Length / 1024),
                        CdnUrl = fileUrl,
                        StorageKey = fileNameWithFolder,
                        OwnerType = "General",
                        OwnerId = Guid.Empty,
                        UploadedBy = userId,
                        CreatedAt = DateTime.UtcNow
                    };
                    _unitOfWork.Repository<MediaFile>().Add(mediaFile);

                    uploadedUrls.Add(new {
                        id = mediaFile.Id,
                        originalName = file.FileName,
                        url = fileUrl
                    });
                }
            }

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new UploadMediaBatchResult(uploadedUrls.Count, uploadedUrls);
        }
    }
}
