using HanLexicon.Application.Interfaces;
using Microsoft.Extensions.Options;
using Minio;
using Minio.DataModel.Args;

namespace Infrastructure.Minio;

public class MinioStorageService : IStorageService
{
    private readonly MinioSettings _settings;
    private readonly IMinioClient _minioClient;

    public MinioStorageService(IOptions<MinioSettings> options)
    {
        _settings = options.Value;
        
        _minioClient = new MinioClient()
            .WithEndpoint(_settings.Endpoint)
            .WithCredentials(_settings.AccessKey, _settings.SecretKey)
            .WithSSL(_settings.UseSSL)
            .Build();
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType)
    {
        var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";

        // Đảm bảo bucket tồn tại
        var beArgs = new BucketExistsArgs().WithBucket(_settings.BucketName);
        bool found = await _minioClient.BucketExistsAsync(beArgs).ConfigureAwait(false);
        if (!found)
        {
            var mbArgs = new MakeBucketArgs().WithBucket(_settings.BucketName);
            await _minioClient.MakeBucketAsync(mbArgs).ConfigureAwait(false);
            
            // Set chính sách public read (tùy chọn, tùy vào nhu cầu bảo mật)
            string policy = $@"{{""Version"":""2012-10-17"",""Statement"":[{{""Effect"":""Allow"",""Principal"":{{""AWS"":[""*""]}},""Action"":[""s3:GetBucketLocation"",""s3:ListBucket""],""Resource"":[""arn:aws:s3:::{_settings.BucketName}""]}},{{""Effect"":""Allow"",""Principal"":{{""AWS"":[""*""]}},""Action"":[""s3:GetObject""],""Resource"":[""arn:aws:s3:::{_settings.BucketName}/*""]}}]}}";
            var sbpa = new SetPolicyArgs().WithBucket(_settings.BucketName).WithPolicy(policy);
            await _minioClient.SetPolicyAsync(sbpa).ConfigureAwait(false);
        }

        // Upload file
        var putObjectArgs = new PutObjectArgs()
            .WithBucket(_settings.BucketName)
            .WithObject(uniqueFileName)
            .WithStreamData(fileStream)
            .WithObjectSize(fileStream.Length)
            .WithContentType(contentType);

        await _minioClient.PutObjectAsync(putObjectArgs).ConfigureAwait(false);

        return $"{_settings.PublicUrl}/{_settings.BucketName}/{uniqueFileName}";
    }
}
