using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using Microsoft.AspNetCore.Mvc;

namespace HanLexicon.Api.Controllers
{
    /// <summary>
    /// API quản lý tệp tin đa phương tiện (Hình ảnh, Âm thanh).
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IStorageService _storageService;
        private readonly IUnitOfWork _unitOfWork;

        public FilesController(IStorageService storageService, IUnitOfWork unitOfWork)
        {
            _storageService = storageService;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Upload một tệp tin lên server và liên kết với một thực thể (Lesson/Vocabulary).
        /// </summary>
        /// <param name="file">Dữ liệu tệp tin.</param>
        /// <param name="ownerType">Loại thực thể sở hữu (ví dụ: 'Lesson', 'Vocabulary').</param>
        /// <param name="ownerId">ID của thực thể sở hữu.</param>
        /// <returns>Thông tin tệp đã upload (CdnUrl, FileName...).</returns>
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file, [FromQuery] string ownerType, [FromQuery] Guid ownerId)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File không hợp lệ.");

            using var stream = file.OpenReadStream();
            
            // 1. Upload lên Minio
            var fileUrl = await _storageService.UploadFileAsync(stream, file.FileName, file.ContentType);

            // 2. Lưu thông tin vào Database (Bảng MediaFile theo BRD)
            var mediaFile = new MediaFile
            {
                Id = Guid.NewGuid(),
                FileName = file.FileName,
                MediaType = file.ContentType.StartsWith("image") ? "image" : "file",
                MimeType = file.ContentType,
                FileSizeKb = (int)(file.Length / 1024),
                CdnUrl = fileUrl,
                StorageKey = fileUrl.Split('/').Last(), // Key tạm thời từ URL
                OwnerType = ownerType,
                OwnerId = ownerId,
                CreatedAt = DateTime.UtcNow
            };

            _unitOfWork.Repository<MediaFile>().Add(mediaFile);
            await _unitOfWork.SaveChangesAsync();

            return Ok(new
            {
                mediaFile.Id,
                mediaFile.CdnUrl,
                mediaFile.FileName
            });
        }
    }
}
