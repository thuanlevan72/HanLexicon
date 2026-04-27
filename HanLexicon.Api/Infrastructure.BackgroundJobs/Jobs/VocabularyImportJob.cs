using HanLexicon.Domain.Entities;
using ClosedXML.Excel;
using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Infrastructure.BackgroundJobs.Jobs;

public class VocabularyImportJob : IVocabularyImportJob
{
    private readonly IUnitOfWork _uow;
    private readonly ILogger<VocabularyImportJob> _logger;

    public VocabularyImportJob(IUnitOfWork uow, ILogger<VocabularyImportJob> logger)
    {
        _uow = uow;
        _logger = logger;
    }

    public async Task ProcessImportAsync(string tempExcelPath, string? tempZipPath, Guid adminId, Guid jobId, Guid? lessonId = null)
    {
        var importJob = await _uow.Repository<ImportJob>().GetByIdAsync(jobId);
        if (importJob == null) return;

        // 1. KIỂM TRA BÀI HỌC BẮT BUỘC
        if (!lessonId.HasValue)
        {
            importJob.Status = "failed";
            importJob.ErrorLog = JsonSerializer.Serialize(new { error = "Chưa chọn Bài học đích. Đây là trường bắt buộc." });
            await _uow.SaveChangesAsync();
            return;
        }

        var lessonExists = await _uow.Repository<Lesson>().Query().AnyAsync(l => l.Id == lessonId.Value);
        if (!lessonExists)
        {
            importJob.Status = "failed";
            importJob.ErrorLog = JsonSerializer.Serialize(new { error = $"Bài học với ID {lessonId.Value} không tồn tại." });
            await _uow.SaveChangesAsync();
            return;
        }

        // 2. LẤY SORT ORDER HIỆN TẠI CAO NHẤT ĐỂ ĐÁNH SỐ TIẾP THEO
        short maxSortOrder = await _uow.Repository<Vocabulary>().Query()
            .Where(v => v.LessonId == lessonId.Value)
            .OrderByDescending(v => v.SortOrder)
            .Select(v => v.SortOrder)
            .FirstOrDefaultAsync();

        importJob.Status = "processing";
        importJob.StartedAt = DateTime.UtcNow;
        await _uow.SaveChangesAsync();

        try
        {
            using var stream = new FileStream(tempExcelPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            using var workbook = new XLWorkbook(stream);
            var worksheet = workbook.Worksheet(1);
            var rows = worksheet.RangeUsed().RowsUsed().Skip(1);

            importJob.TotalRows = rows.Count();
            int successCount = 0;
            int failedCount = 0;
            var errorLogs = new List<string>();

            foreach (var row in rows)
            {
                try
                {
                    var word = row.Cell(1).GetValue<string>()?.Trim();
                    var pinyin = row.Cell(2).GetValue<string>()?.Trim();
                    var meaning = row.Cell(3).GetValue<string>()?.Trim();
                    var imageUrl = row.Cell(4).GetValue<string>()?.Trim();
                    var audioUrl = row.Cell(5).GetValue<string>()?.Trim();
                    var meaningEn = row.Cell(6).GetValue<string>()?.Trim();
                    var exampleCn = row.Cell(7).GetValue<string>()?.Trim();
                    var examplePy = row.Cell(8).GetValue<string>()?.Trim();
                    var exampleVn = row.Cell(9).GetValue<string>()?.Trim();

                    if (string.IsNullOrEmpty(word))
                    {
                        _logger.LogWarning("Dòng {Row}: Bỏ qua vì thiếu Word", row.RowNumber());
                        continue; 
                    }

                    maxSortOrder++;
                    var vocabulary = new Vocabulary
                    {
                        Id = Guid.NewGuid(),
                        LessonId = lessonId.Value,
                        Word = word,
                        Pinyin = pinyin ?? "",
                        Meaning = meaning ?? "",
                        MeaningEn = meaningEn,
                        ExampleCn = exampleCn,
                        ExamplePy = examplePy,
                        ExampleVn = exampleVn,
                        ImageUrl = imageUrl,
                        AudioUrl = audioUrl,
                        SortOrder = maxSortOrder,
                        CreatedAt = DateTime.UtcNow
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
            
            // SỬA LỖI JSON TẠI ĐÂY: Serialize danh sách lỗi sang chuỗi JSON
            importJob.ErrorLog = errorLogs.Any() ? JsonSerializer.Serialize(errorLogs) : null;
            
            importJob.Status = "done";
            importJob.FinishedAt = DateTime.UtcNow;

            await _uow.SaveChangesAsync();
            Console.WriteLine($"IMPORT_DONE: {successCount} rows inserted.");
        }
        catch (Exception ex)
        {
            importJob.Status = "failed";
            importJob.ErrorLog = JsonSerializer.Serialize(new { error = ex.Message });
            importJob.FinishedAt = DateTime.UtcNow;
            await _uow.SaveChangesAsync();
        }
    }
}
