using HanLexicon.Application.Interfaces;
using HanLexicon.Application.Common;
using HanLexicon.Domain.Interfaces;
using HanLexicon.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers
{
    [Route("api/v1/media")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly IStorageService _storageService;
        private readonly IUnitOfWork _unitOfWork;

        public MediaController(IStorageService storageService, IUnitOfWork unitOfWork)
        {
            _storageService = storageService;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("upload-batch")]
        public async Task<IActionResult> UploadBatch(List<IFormFile> files, [FromQuery] string folder = "general")
        {
            if (files == null || files.Count == 0)
                return BadRequest(ApiResponse<object>.Failure("Không có file nào được chọn."));

            var uploadedUrls = new List<object>();
            var errors = new List<string>();

            foreach (var file in files)
            {
                try
                {
                    if (file.Length > 0)
                    {
                        using var stream = file.OpenReadStream();
                        var fileNameWithFolder = $"{folder.Trim('/')}/{file.FileName}";
                        
                        var fileUrl = await _storageService.UploadFileAsync(stream, fileNameWithFolder, file.ContentType);
                        
                        // LƯU VÀO DATABASE
                        var mediaFile = new MediaFile
                        {
                            Id = Guid.NewGuid(),
                            FileName = file.FileName,
                            MediaType = file.ContentType.StartsWith("image") ? "image" : "audio",
                            MimeType = file.ContentType,
                            FileSizeKb = (int)(file.Length / 1024),
                            CdnUrl = fileUrl,
                            StorageKey = fileNameWithFolder,
                            OwnerType = "General", // Hoặc gắn với ID cụ thể nếu cần
                            OwnerId = Guid.Empty,
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
                catch (Exception ex)
                {
                    errors.Add($"Lỗi khi upload file {file.FileName}: {ex.Message}");
                }
            }

            await _unitOfWork.SaveChangesAsync();

            return Ok(ApiResponse<object>.Success(new {
                total = uploadedUrls.Count,
                files = uploadedUrls
            }, "Upload và lưu Database hoàn tất."));
        }
    }
}
