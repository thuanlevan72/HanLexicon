using ClosedXML.Excel;
using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.IO.Compression;

namespace Infrastructure.BackgroundJobs.Jobs;

public class VocabularyImportJob : IVocabularyImportJob
{
    private readonly IStorageService _storageService;
    private readonly IUnitOfWork _uow;
    private readonly ILogger<VocabularyImportJob> _logger;

    public VocabularyImportJob(
        IStorageService storageService,
        IUnitOfWork uow,
        ILogger<VocabularyImportJob> logger)
    {
        _storageService = storageService;
        _uow = uow;
        _logger = logger;
    }

    public async Task ProcessImportAsync(string tempExcelPath, string tempZipPath, Guid adminId)
    {
        // Ta sẽ tạo một Job record mới (hoặc đã có id từ lúc Admin call API)
        // Giả sử ta tìm ImportJob vừa tạo
        var importJob = await _uow.Repository<ImportJob>().Query()
            .OrderByDescending(x => x.CreatedAt)
            .FirstOrDefaultAsync(x => x.UploadedBy == adminId && x.Status == "pending");

        if (importJob == null)
        {
             _logger.LogError("Không tìm thấy bản ghi ImportJob 'pending' cho Admin " + adminId);
             return;
        }

        importJob.Status = "processing";
        importJob.StartedAt = DateTime.UtcNow;
        await _uow.SaveChangesAsync();

        var extractPath = Path.Combine(Path.GetTempPath(), $"HanLexicon_Extract_{importJob.Id}");

        try
        {
            _logger.LogInformation($"Bắt đầu giải nén file zip ra {extractPath}...");
            if (File.Exists(tempZipPath))
            {
                ZipFile.ExtractToDirectory(tempZipPath, extractPath);
            }

            _logger.LogInformation("Bắt đầu đọc file Excel...");
            using var workbook = new XLWorkbook(tempExcelPath);
            var worksheet = workbook.Worksheet(1);
            var rows = worksheet.RangeUsed().RowsUsed().Skip(1); // Bỏ qua Header

            importJob.TotalRows = rows.Count();
            int successCount = 0;
            int failedCount = 0;
            var errorLogs = new List<string>();

            foreach (var row in rows)
            {
                try
                {
                    var word = row.Cell(1).GetValue<string>();
                    var pinyin = row.Cell(2).GetValue<string>();
                    var meaning = row.Cell(3).GetValue<string>();
                    var imageFileName = row.Cell(4).GetValue<string>();
                    var audioFileName = row.Cell(5).GetValue<string>();
                    var lessonIdStr = row.Cell(6).GetValue<string>();

                    if (string.IsNullOrEmpty(word) || !Guid.TryParse(lessonIdStr, out var lessonId))
                    {
                        failedCount++;
                        errorLogs.Add($"Dòng {row.RowNumber()}: Dữ liệu không hợp lệ (Word trống hoặc LessonId sai format)");
                        continue;
                    }

                    string? imageUrl = null;
                    if (!string.IsNullOrEmpty(imageFileName) && Directory.Exists(extractPath))
                    {
                        imageUrl = await UploadMediaAsync(extractPath, imageFileName, "image/png");
                    }

                    string? audioUrl = null;
                    if (!string.IsNullOrEmpty(audioFileName) && Directory.Exists(extractPath))
                    {
                        audioUrl = await UploadMediaAsync(extractPath, audioFileName, "audio/mpeg");
                    }

                    var vocabulary = new Vocabulary
                    {
                        Id = Guid.NewGuid(),
                        LessonId = lessonId,
                        Word = word,
                        Pinyin = pinyin,
                        Meaning = meaning,
                        ImageUrl = imageUrl,
                        AudioUrl = audioUrl,
                        SortOrder = (short)(successCount + 1)
                    };

                    _uow.Repository<Vocabulary>().Add(vocabulary);
                    successCount++;
                }
                catch (Exception ex)
                {
                    failedCount++;
                    errorLogs.Add($"Dòng {row.RowNumber()}: {ex.Message}");
                }
            }

            importJob.ProcessedRows = successCount;
            importJob.FailedRows = failedCount;
            importJob.ErrorLog = errorLogs.Any() ? string.Join("\n", errorLogs) : null;
            importJob.Status = failedCount == 0 ? "finished" : (successCount > 0 ? "finished_with_errors" : "failed");
            importJob.FinishedAt = DateTime.UtcNow;

            await _uow.SaveChangesAsync();
            _logger.LogInformation($"Import thành công {successCount} từ vựng cho Admin {adminId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Lỗi nghiêm trọng trong quá trình import cho Admin {adminId}");
            importJob.Status = "failed";
            importJob.ErrorLog = ex.ToString();
            importJob.FinishedAt = DateTime.UtcNow;
            await _uow.SaveChangesAsync();
            throw;
        }
        finally
        {
            _logger.LogInformation("Đang dọn dẹp file tạm...");
            if (Directory.Exists(extractPath)) Directory.Delete(extractPath, true);
            if (File.Exists(tempExcelPath)) File.Delete(tempExcelPath);
            if (File.Exists(tempZipPath)) File.Delete(tempZipPath);
        }
    }

    private async Task<string> UploadMediaAsync(string extractDirectory, string fileName, string contentType)
    {
        var matchedFiles = Directory.GetFiles(extractDirectory, fileName, SearchOption.AllDirectories);
        if (matchedFiles.Length == 0) return null;

        var actualFilePath = matchedFiles[0];
        using var stream = new FileStream(actualFilePath, FileMode.Open, FileAccess.Read);
        return await _storageService.UploadFileAsync(stream, fileName, contentType);
    }
}
