using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.S3
{
    public class S3Settings
    {
        public string AccessKey { get; set; } = string.Empty;
        public string SecretKey { get; set; } = string.Empty;
        public string BucketName { get; set; } = string.Empty;
        public string ServiceUrl { get; set; } = string.Empty; // Quan trọng nếu dùng Cloudflare R2 / MinIO
        public string PublicCdnUrl { get; set; } = string.Empty; // URL để client xem ảnh (VD: https://cdn.domain.com)
    }
}
