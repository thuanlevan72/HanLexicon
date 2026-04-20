using ClosedXML.Excel;
using HanLexicon.Application.Interfaces;
using Microsoft.Extensions.Logging;
using System.IO.Compression;

namespace Infrastructure.BackgroundJobs.Jobs;

public class VocabularyImportJob : IVocabularyImportJob
{
    private readonly IStorageService _storageService;
    // Giả sử bạn có IAppDbContext ở tầng Application
    // private readonly IAppDbContext _dbContext; 
    private readonly ILogger<VocabularyImportJob> _logger;

    public VocabularyImportJob(
        IStorageService storageService,
        // IAppDbContext dbContext,
        ILogger<VocabularyImportJob> logger)
    {
        _storageService = storageService;
        // _dbContext = dbContext;
        _logger = logger;
    }

    public async Task ProcessImportAsync(string tempExcelPath, string tempZipPath, Guid adminId)
    {
        // Tạo một thư mục tạm duy nhất cho luồng này để giải nén
        var extractPath = Path.Combine(Path.GetTempPath(), $"HanLexicon_Extract_{Guid.NewGuid()}");

        try
        {
            _logger.LogInformation($"Bắt đầu giải nén file zip ra {extractPath}...");
            ZipFile.ExtractToDirectory(tempZipPath, extractPath);

            var vocabulariesToInsert = new List<dynamic>(); // Thay 'dynamic' bằng Entity Vocabulary của bạn

            _logger.LogInformation("Bắt đầu đọc file Excel...");
            using var workbook = new XLWorkbook(tempExcelPath);
            var worksheet = workbook.Worksheet(1);
            var rows = worksheet.RangeUsed().RowsUsed().Skip(1); // Bỏ qua dòng Header

            foreach (var row in rows)
            {
                // 1. Đọc Text từ Excel
                var word = row.Cell(1).GetValue<string>();
                var pinyin = row.Cell(2).GetValue<string>();
                var meaning = row.Cell(3).GetValue<string>();
                var imageFileName = row.Cell(4).GetValue<string>(); // VD: "apple.png"
                var audioFileName = row.Cell(5).GetValue<string>(); // VD: "apple.mp3"

                // 2. Xử lý Upload Hình ảnh (Nếu có)
                string imageUrl = null;
                if (!string.IsNullOrEmpty(imageFileName))
                {
                    imageUrl = await UploadMediaAsync(extractPath, imageFileName, "image/png"); // Hàm phụ trợ bên dưới
                }

                // 3. Xử lý Upload Audio (Nếu có)
                string audioUrl = null;
                if (!string.IsNullOrEmpty(audioFileName))
                {
                    audioUrl = await UploadMediaAsync(extractPath, audioFileName, "audio/mpeg");
                }

                // 4. Map vào Entity
                /*
                vocabulariesToInsert.Add(new Vocabulary
                {
                    Word = word,
                    Pinyin = pinyin,
                    Meaning = meaning,
                    ImageUrl = imageUrl,
                    AudioUrl = audioUrl,
                    CreatedAt = DateTime.UtcNow
                });
                */
            }

            // 5. Lưu vào Database (Bulk Insert)
            /*
            await _dbContext.Vocabularies.AddRangeAsync(vocabulariesToInsert);
            await _dbContext.SaveChangesAsync();
            */

            _logger.LogInformation($"Import thành công {rows.Count()} từ vựng cho Admin {adminId}");

            // TODO: (Tùy chọn) Gọi SignalR Hub bắn thông báo về cho Admin báo done.
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Lỗi xảy ra trong quá trình import cho Admin {adminId}");
            throw; // Quăng lỗi để Hangfire ghi nhận thất bại và có thể Retry
        }
        finally
        {
            // BẮT BUỘC: Dọn dẹp rác (Clean up) để server không bị đầy ổ cứng
            _logger.LogInformation("Đang dọn dẹp file tạm...");
            if (Directory.Exists(extractPath)) Directory.Delete(extractPath, true);
            if (File.Exists(tempExcelPath)) File.Delete(tempExcelPath);
            if (File.Exists(tempZipPath)) File.Delete(tempZipPath);
        }
    }

    // Hàm phụ trợ tìm file trong thư mục giải nén và đẩy lên S3
    private async Task<string> UploadMediaAsync(string extractDirectory, string fileName, string contentType)
    {
        // Tìm file trong thư mục giải nén (bao gồm cả thư mục con nếu zip có cấu trúc)
        var matchedFiles = Directory.GetFiles(extractDirectory, fileName, SearchOption.AllDirectories);

        if (matchedFiles.Length == 0)
        {
            _logger.LogWarning($"Không tìm thấy file {fileName} trong file Zip.");
            return null;
        }

        var actualFilePath = matchedFiles[0]; // Lấy file đầu tiên tìm thấy

        using var stream = new FileStream(actualFilePath, FileMode.Open, FileAccess.Read);
        return await _storageService.UploadFileAsync(stream, fileName, contentType);
    }
}