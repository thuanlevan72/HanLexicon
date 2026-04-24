using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres;
using MediatR;

namespace HanLexicon.Application.Features.Admin.Vocabulary;

public record ImportVocabularyCommand(
    string TempExcelPath,
    string? TempZipPath,
    Guid AdminId,
    string OriginalFileName,
    short? CategoryId
) : IRequest<Guid>;

public class ImportVocabularyHandler : IRequestHandler<ImportVocabularyCommand, Guid>
{
    private readonly IUnitOfWork _uow;
    private readonly IVocabularyImportJob _importJob;

    public ImportVocabularyHandler(IUnitOfWork uow, IVocabularyImportJob importJob)
    {
        _uow = uow;
        _importJob = importJob;
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
            CreatedAt = DateTime.UtcNow
        };

        _uow.Repository<ImportJob>().Add(jobRecord);
        await _uow.SaveChangesAsync(cancellationToken);

        // 2. Chạy Background Job
        // Trong dự án thực tế nên dùng Hangfire: BackgroundJob.Enqueue(() => _importJob.ProcessImportAsync(...))
        // Ở đây ta dùng Task.Run để demo luồng xử lý bất đồng bộ cơ bản
        _ = Task.Run(async () => {
            try 
            {
                await _importJob.ProcessImportAsync(request.TempExcelPath, request.TempZipPath ?? "", request.AdminId);
            }
            catch (Exception)
            {
                // Xử lý lỗi trong job đã có log ở Job class
            }
        });

        return jobRecord.Id;
    }
}
