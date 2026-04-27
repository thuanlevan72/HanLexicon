using HanLexicon.Domain.Interfaces;
using HanLexicon.Domain.Entities;
using Infrastructure.Postgres.Persistence;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Postgres.Services
{
    public class LogService : ILogService
    {
        private readonly ILogger<LogService> _logger;

        public LogService(ILogger<LogService> logger)
        {
            _logger = logger;
        }

        public async Task LogInfoAsync(string message, string? userId = null, string? userName = null)
        {
            _logger.LogInformation("{Message} [User: {UserName} ({UserId})]", message, userName, userId);
            await Task.CompletedTask;
        }

        public async Task LogWarningAsync(string message, string? userId = null, string? userName = null)
        {
            _logger.LogWarning("{Message} [User: {UserName} ({UserId})]", message, userName, userId);
            await Task.CompletedTask;
        }

        public async Task LogErrorAsync(string message, Exception? ex = null, string? userId = null, string? userName = null)
        {
            _logger.LogError(ex, "{Message} [User: {UserName} ({UserId})]", message, userName, userId);
            await Task.CompletedTask;
        }
    }
}
