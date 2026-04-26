using System;
using System.IO;
using System.Threading.Tasks;
using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using Infrastructure.BackgroundJobs.Jobs;
using Infrastructure.Postgres.Persistence;
using Infrastructure.Postgres.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using System.Linq;
using System.Collections.Generic;

namespace HanLexicon.Tests
{
    public class ImportExcelTest
    {
        private readonly string _connectionString = "Host=localhost;Port=5433;Database=hanlexicon_empty;Username=user;Password=password";

        [Fact]
        public async Task FinalRealIntegrationTest()
        {
            var optionsBuilder = new DbContextOptionsBuilder<HanLexiconDbContext>();
            optionsBuilder.UseNpgsql(_connectionString);

            using var context = new HanLexiconDbContext(optionsBuilder.Options);
            var uow = new UnitOfWork(context);
            var logger = new Mock<ILogger<VocabularyImportJob>>().Object;
            
            string excelPath = @"D:\Work\HanLexicon\HanLexicon.Api\New folder\testImportV.xlsx";
            
            var realUser = await context.Users.FirstOrDefaultAsync();
            if (realUser == null) throw new Exception("Database chưa có User nào.");
            var adminId = realUser.Id;
            
            var jobId = Guid.NewGuid();
            var jobRecord = new ImportJob
            {
                Id = jobId,
                UploadedBy = adminId,
                FileName = "testImportV.xlsx",
                Status = "pending",
                CreatedAt = DateTime.UtcNow
            };
            context.ImportJobs.Add(jobRecord);
            await context.SaveChangesAsync();

            var jobProcessor = new VocabularyImportJob(uow, logger);
            await jobProcessor.ProcessImportAsync(excelPath, null, adminId, jobId);

            var updatedJob = await context.ImportJobs.AsNoTracking().FirstOrDefaultAsync(j => j.Id == jobId);
            var vocabCount = await context.Vocabularies.CountAsync();

            Console.WriteLine($"--- KẾT QUẢ TEST THẬT ---");
            Console.WriteLine($"Trạng thái Job: {updatedJob?.Status}");
            Console.WriteLine($"Số dòng thành công: {updatedJob?.ProcessedRows}");
            Console.WriteLine($"Tổng số Vocabulary trong DB: {vocabCount}");

            if (updatedJob?.Status == "failed")
            {
                Console.WriteLine($"Log lỗi Job: {updatedJob.ErrorLog}");
            }

            Assert.Equal("finished", updatedJob?.Status);
            Assert.True(updatedJob?.ProcessedRows > 0);
        }
    }
}