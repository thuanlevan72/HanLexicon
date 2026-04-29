using HanLexicon.Application.Interfaces;
using HanLexicon.Application.Common;
using HanLexicon.Domain.Interfaces;
using HanLexicon.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet("folders")]
        public async Task<IActionResult> GetFolders()
        {
            var keys = await _unitOfWork.Repository<MediaFile>().Query()
                .Select(x => x.StorageKey)
                .ToListAsync();

            var folders = keys
                .Where(k => k.Contains("/"))
                .Select(k => k.Substring(0, k.LastIndexOf('/')))
                .Distinct()
                .OrderBy(f => f)
                .ToList();

            return Ok(ApiResponse<object>.Success(folders));
        }

        [HttpGet("files")]
        public async Task<IActionResult> GetFiles([FromQuery] string folder = "", [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
        {
            var query = _unitOfWork.Repository<MediaFile>().Query();

            if (!string.IsNullOrEmpty(folder))
            {
                // Tìm file có StorageKey bắt đầu bằng thư mục và theo sau là tên file
                query = query.Where(f => f.StorageKey.StartsWith(folder + "/"));
            }

            var total = await query.CountAsync();
            var files = await query
                .OrderByDescending(f => f.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(f => new
                {
                    f.Id,
                    f.FileName,
                    f.MediaType,
                    f.CdnUrl,
                    f.StorageKey,
                    f.FileSizeKb,
                    f.CreatedAt
                })
                .ToListAsync();

            return Ok(ApiResponse<object>.Success(new { total, page, pageSize, files }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(Guid id)
        {
            var file = await _unitOfWork.Repository<MediaFile>().GetByIdAsync(id);
            if (file == null)
                return NotFound(ApiResponse<object>.Failure("File không tồn tại."));

            // 1. Xóa file trên MinIO
            var deletedFromStorage = await _storageService.DeleteFileAsync(file.StorageKey);

            // 2. Xóa trong Database (luôn xóa kể cả MinIO lỗi 404 nếu file đã mất)
            _unitOfWork.Repository<MediaFile>().Delete(file);
            await _unitOfWork.SaveChangesAsync();

            return Ok(ApiResponse<object>.Success(null, "Xóa file thành công."));
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
                        var fileNameWithFolder = $"{folder.Trim('/')}/{Guid.NewGuid()}_{file.FileName}";
                        
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
