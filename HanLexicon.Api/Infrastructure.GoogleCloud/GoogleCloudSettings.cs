namespace Infrastructure.GoogleCloud
{
    public class GoogleCloudSettings
    {
        public string BucketName { get; set; } = string.Empty;

        // Đường dẫn trỏ tới file JSON chứa Key của Service Account trên máy chủ
        public string JsonKeyFilePath { get; set; } = string.Empty;

        // Domain gốc để ghép ra link ảnh trả về cho Client
        public string PublicCdnUrl { get; set; } = string.Empty;
    }
}
