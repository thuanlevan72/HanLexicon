using Amazon.S3;
using Amazon.S3.Transfer;
using HanLexicon.Application.Interfaces;
using Infrastructure.S3;
using Microsoft.Extensions.Options;

namespace HanLexicon.Infrastructure.S3;

public class S3StorageService : IStorageService
{
    private readonly S3Settings _settings;
    private readonly IAmazonS3 _s3Client;

    public S3StorageService(IOptions<S3Settings> options)
    {
        _settings = options.Value;

        // Cấu hình S3 Client (Hỗ trợ cả AWS chuẩn và Cloudflare R2/MinIO)
        var config = new AmazonS3Config
        {
            ServiceURL = _settings.ServiceUrl,
            ForcePathStyle = true // Cần thiết cho MinIO
        };
        _s3Client = new AmazonS3Client(_settings.AccessKey, _settings.SecretKey, config);
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType)
    {
        // Đổi tên file để chống trùng lặp (Thêm GUID)
        var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";

        var uploadRequest = new TransferUtilityUploadRequest
        {
            InputStream = fileStream,
            Key = uniqueFileName,
            BucketName = _settings.BucketName,
            ContentType = contentType,
            CannedACL = S3CannedACL.PublicRead // Tùy chọn: Để file có thể đọc được public
        };

        using var fileTransferUtility = new TransferUtility(_s3Client);
        await fileTransferUtility.UploadAsync(uploadRequest);

        // Trả về URL đầy đủ để lưu vào Database
        return $"{_settings.PublicCdnUrl}/{uniqueFileName}";
    }
}