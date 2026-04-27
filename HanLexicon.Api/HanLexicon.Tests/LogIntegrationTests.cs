using HanLexicon.Application.Features.Admin.LogsAdmin;
using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres.Persistence;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace HanLexicon.Tests
{
    public class LogIntegrationTests
    {
        [Fact]
        public async Task GetLogsHandler_ShouldExtractJsonProperties_WhenLogEventIsPresent()
        {
            // 1. Setup InMemory Database or Use a real test DB if available.
            // For logic testing, we can use a mock or in-memory.
            var options = new DbContextOptionsBuilder<HanLexiconDbContext>()
                .UseInMemoryDatabase(databaseName: "LogTestDb")
                .Options;

            using var context = new HanLexiconDbContext(options);
            
            // 2. Add a sample log record with JSON LogEvent
            var logEventJson = "{\"Timestamp\":\"2026-04-27T10:00:00\",\"Level\":\"Information\",\"MessageTemplate\":\"Test message\",\"Properties\":{\"RequestMethod\":\"GET\",\"RequestPath\":\"/api/test\",\"StatusCode\":200,\"UserName\":\"TestUser\",\"TraceId\":\"trace-123\"}}";
            
            var log = new SystemLog
            {
                Level = 2, // Information
                Message = "Test message",
                Timestamp = DateTime.UtcNow,
                LogEvent = logEventJson
            };
            
            context.Set<SystemLog>().Add(log);
            await context.SaveChangesAsync();

            // 3. Mock UnitOfWork
            var mockUow = new Mock<IUnitOfWork>();
            mockUow.Setup(x => x.Repository<SystemLog>().Query()).Returns(context.Set<SystemLog>().AsQueryable());

            var handler = new GetLogsHandler(mockUow.Object);

            // 4. Execute
            var result = await handler.Handle(new QueryGetLogs(), CancellationToken.None);

            // 5. Assert
            Assert.NotEmpty(result.Items);
            var item = result.Items.First();
            Assert.Equal("GET", item.RequestMethod);
            Assert.Equal("/api/test", item.RequestPath);
            Assert.Equal(200, item.StatusCode);
            Assert.Equal("TestUser", item.UserName);
            Assert.Equal("trace-123", item.TraceId);
            Assert.Equal("Information", item.LogLevel);
        }
    }
}
