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

    public async Task ProcessImportAsync(string tempExcelPath, string? tempZipPath, Guid adminId, Guid jobId)
    {
        var importJob = await _uow.Repository<ImportJob>().GetByIdAsync(jobId);

        if (importJob == null) return;

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
            List<Vocabulary> list = new List<Vocabulary>();

            foreach (var row in rows)
            {
                try
                {
                    var word = row.Cell(1).GetValue<string>();
                    var pinyin = row.Cell(2).GetValue<string>();
                    var meaning = row.Cell(3).GetValue<string>();
                    var imageUrl = row.Cell(4).GetValue<string>();
                    var audioUrl = row.Cell(5).GetValue<string>();
                    var lessonIdStr = row.Cell(6).GetValue<string>();
                    var meaningEn = row.Cell(7).GetValue<string>();
                    var exampleCn = row.Cell(8).GetValue<string>();
                    var examplePy = row.Cell(9).GetValue<string>();
                    var exampleVn = row.Cell(10).GetValue<string>();

                    //if (string.IsNullOrEmpty(word) || !Guid.TryParse(lessonIdStr, out var lessonId))
                    //{
                    //    failedCount++;
                    //    errorLogs.Add($"Dòng {row.RowNumber()}: Thiếu Word hoặc LessonId sai");
                    //    continue;
                    //}

                    var vocabulary = new Vocabulary
                    {
                        Id = Guid.NewGuid(),
                        LessonId = Guid.Parse("29fa1a00-8be7-48ed-8f22-b3950fd0ed34"),
                        Word = word,
                        Pinyin = pinyin,
                        Meaning = meaning,
                        MeaningEn = meaningEn,
                        ExampleCn = exampleCn,
                        ExamplePy = examplePy,
                        ExampleVn = exampleVn,
                        ImageUrl = imageUrl,
                        AudioUrl = audioUrl,
                        SortOrder = (short)(successCount + 1)
                    };
                    list.Add(vocabulary);

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
