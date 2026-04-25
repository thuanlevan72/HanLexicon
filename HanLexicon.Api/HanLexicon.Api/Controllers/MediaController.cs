using HanLexicon.Application.Interfaces;
using HanLexicon.Application.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HanLexicon.Api.Controllers
{
    /// <summary>
    /// API chuyên dụng để đẩy tài nguyên lên kho lưu trữ MinIO.
    /// </summary>
    [Route("api/v1/media")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly IStorageService _storageService;

        public MediaController(IStorageService storageService)
        {
            _storageService = storageService;
        }

        /// <summary>
        /// Đẩy một hoặc nhiều file vào một thư mục cụ thể trên MinIO.
        /// </summary>
        /// <param name="files">Danh sách các file cần upload.</param>
        /// <param name="folder">Tên thư mục muốn lưu (ví dụ: 'avatars', 'lessons/audio').</param>
        /// <returns>Danh sách các URL của file sau khi upload thành công.</returns>
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
                        // Gán tên file kèm folder để MinIO tự hiểu là cây thư mục
                        var fileNameWithFolder = $"{folder.Trim('/')}/{file.FileName}";
                        
                        var fileUrl = await _storageService.UploadFileAsync(stream, fileNameWithFolder, file.ContentType);
                        
                        uploadedUrls.Add(new {
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

            if (uploadedUrls.Count == 0)
                return StatusCode(500, ApiResponse<object>.Failure(errors, "Tất cả các file đều upload thất bại."));

            return Ok(ApiResponse<object>.Success(new {
                total = uploadedUrls.Count,
                files = uploadedUrls,
                errors = errors.Count > 0 ? errors : null
            }, "Upload hoàn tất."));
        }
    }
}
