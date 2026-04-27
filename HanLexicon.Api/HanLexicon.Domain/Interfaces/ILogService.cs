using System;
using System.Threading.Tasks;

namespace HanLexicon.Domain.Interfaces
{
    public interface ILogService
    {
        Task LogInfoAsync(string message, string? userId = null, string? userName = null);
        Task LogWarningAsync(string message, string? userId = null, string? userName = null);
        Task LogErrorAsync(string message, Exception? ex = null, string? userId = null, string? userName = null);
    }
}
