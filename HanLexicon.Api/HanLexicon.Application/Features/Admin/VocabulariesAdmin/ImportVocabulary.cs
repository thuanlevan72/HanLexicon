using HanLexicon.Domain.Entities;
using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.DependencyInjection; // Bắt buộc thêm thư viện này
using Microsoft.Extensions.Logging;

namespace HanLexicon.Application.Features.Admin.VocabulariesAdmin;

public record ImportVocabularyCommand(
    string TempExcelPath,
    string? TempZipPath,
    Guid AdminId,
    string OriginalFileName,
    short? CategoryId,
    Guid? LessonId = null) : IRequest<Guid>;

public class ImportVocabularyHandler : IRequestHandler<ImportVocabularyCommand, Guid>
{
    private readonly IUnitOfWork _uow;
    private readonly IServiceScopeFactory _scopeFactory; // Đổi sang dùng ScopeFactory
    private readonly ILogger<ImportVocabularyHandler> _logger;

    public ImportVocabularyHandler(
        IUnitOfWork uow,
        IServiceScopeFactory scopeFactory,
        ILogger<ImportVocabularyHandler> logger)
    {
        _uow = uow;
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    public async Task<Guid> Handle(ImportVocabularyCommand request, CancellationToken cancellationToken)
    {
        // 1. Tạo record ImportJob trong DB
        var jobRecord = new ImportJob
        {
            Id = Guid.NewGuid(),
            UploadedBy = request.AdminId,
            FileName = request.OriginalFileName,
            Status = "pending",
            TotalRows = 0,
            ProcessedRows = 0,
            FailedRows = 0,
            CategoryId = request.CategoryId,
            LessonId = request.LessonId,
            CreatedAt = DateTime.UtcNow
        };

        _uow.Repository<ImportJob>().Add(jobRecord);
        await _uow.SaveChangesAsync(cancellationToken);

        // 2. CHẠY BACKGROUND JOB (Fire and Forget)
        _ = Task.Run(async () =>
        {
            try
            {
                // TẠO SCOPE MỚI: Đảm bảo DbContext sống độc lập với HTTP Request
                using var scope = _scopeFactory.CreateScope();

                // Lấy ra Job service từ cái scope mới này
                var backgroundJob = scope.ServiceProvider.GetRequiredService<IVocabularyImportJob>();

                // Tiến hành chạy ngầm
                await backgroundJob.ProcessImportAsync(
                    request.TempExcelPath,
                    request.TempZipPath ?? "",
                    request.AdminId,
                    jobRecord.Id,
                    request.LessonId);
            }
            catch (Exception ex)
            {
                // Ghi log nếu có lỗi không mong muốn lọt ra ngoài Job
                _logger.LogError(ex, "Lỗi hệ thống khi kích hoạt luồng import cho JobId: {JobId}", jobRecord.Id);
            }
        });

        // 3. Trả về JobId ngay lập tức cho client (Frontend có thể dùng ID này để polling tiến độ)
        return jobRecord.Id;
    }
}