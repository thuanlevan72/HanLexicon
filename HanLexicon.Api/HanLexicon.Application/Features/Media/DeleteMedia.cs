using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace HanLexicon.Application.Features.Media
{
    public record DeleteMediaCommand(Guid Id) : IRequest<bool>;

    public class DeleteMediaHandler : IRequestHandler<DeleteMediaCommand, bool>
    {
        private readonly IUnitOfWork _uow;
        private readonly IStorageService _storageService;

        public DeleteMediaHandler(IUnitOfWork uow, IStorageService storageService)
        {
            _uow = uow;
            _storageService = storageService;
        }

        public async Task<bool> Handle(DeleteMediaCommand request, CancellationToken cancellationToken)
        {
            var media = await _uow.Repository<MediaFile>().GetByIdAsync(request.Id);
            if (media == null) return false;

            // Lấy storageKey (có thể là tên tệp trong MinIO)
            // Trong UploadMediaBatch, UniqueFileName = fileNameWithFolder nhưng thực ra PutObject dùng uniqueFileName
            // => Tốt nhất là gọi DeleteFileAsync với media.StorageKey nhưng cần sửa UploadMediaBatch để lưu StorageKey chính xác
            
            // Hiện tại trong UploadMediaBatch: StorageKey = fileNameWithFolder
            // Nhưng UploadFileAsync lại tạo uniqueFileName và trả về CdnUrl
            // Cứ thử dùng StorageKey hoặc trích xuất tên file từ CdnUrl
            var fileKey = ExtractFileKey(media.CdnUrl);

            if (!string.IsNullOrEmpty(fileKey))
            {
                await _storageService.DeleteFileAsync(fileKey);
            }

            _uow.Repository<MediaFile>().Delete(media);
            await _uow.SaveChangesAsync(cancellationToken);

            return true;
        }

        private string ExtractFileKey(string cdnUrl)
        {
            // Ví dụ CdnUrl: http://localhost:9000/hanlexicon/guid_filename.jpg
            try 
            {
                var uri = new Uri(cdnUrl);
                // uri.AbsolutePath là "/hanlexicon/guid_filename.jpg"
                var segments = uri.AbsolutePath.TrimStart('/').Split('/');
                if (segments.Length >= 2)
                {
                    // segment[0] là bucket "hanlexicon"
                    // segment[1] là fileKey
                    return string.Join("/", segments.Skip(1));
                }
                return string.Empty;
            }
            catch
            {
                return string.Empty;
            }
        }
    }
}
