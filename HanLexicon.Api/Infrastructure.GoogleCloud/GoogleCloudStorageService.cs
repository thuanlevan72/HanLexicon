using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using HanLexicon.Application.Interfaces;
using Infrastructure.GoogleCloud;
using Microsoft.Extensions.Options;

namespace Infrastructure.GoogleCloud;

public class GoogleCloudStorageService : IStorageService
{
    private readonly GoogleCloudSettings _settings;
    private readonly StorageClient _storageClient;

    public GoogleCloudStorageService(IOptions<GoogleCloudSettings> options)
    {
        _settings = options.Value;

        // Khởi tạo Client bằng file JSON Key của Google Cloud
        if (!File.Exists(_settings.JsonKeyFilePath))
        {
            throw new FileNotFoundException($"Không tìm thấy file Key của Google Cloud tại: {_settings.JsonKeyFilePath}");
        }

        var credential = GoogleCredential.FromFile(_settings.JsonKeyFilePath);
        _storageClient = StorageClient.Create(credential);
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType)
    {
        // 1. Tạo tên file duy nhất (Chống trùng đè file cũ)
        var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";

        // 2. Upload file stream thẳng lên Google Cloud
        var imageObject = await _storageClient.UploadObjectAsync(
            bucket: _settings.BucketName,
            objectName: uniqueFileName,
            contentType: contentType,
            source: fileStream,
            // Tùy chọn: Set quyền Public cho file để ai cũng xem được (Nếu Bucket của bạn cho phép)
            options: new UploadObjectOptions { PredefinedAcl = PredefinedObjectAcl.PublicRead }
        );

        // 3. Trả về URL đầy đủ. 
        // Ví dụ: https://storage.googleapis.com/khuvuontiengtrung-bucket/123-abc-image.png
        return $"{_settings.PublicCdnUrl}/{uniqueFileName}";
    }
}