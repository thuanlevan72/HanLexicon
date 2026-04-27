using HanLexicon.Domain.Interfaces;
using Microsoft.AspNetCore.Diagnostics;
using System.Security.Claims;

namespace HanLexicon.Api.Middlewares
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;
        private readonly ILogService _dbLogger;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger, ILogService dbLogger)
        {
            _logger = logger;
            _dbLogger = dbLogger;
        }

        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            // 1. Lấy thông tin user hiện tại (nếu có)
            var userId = httpContext.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userName = httpContext.User?.Identity?.Name;

            // 2. Ghi log ra Console/File
            _logger.LogError(exception, "L?I H? TH?NG: {Message}", exception.Message);

            // 3. GHI LOG VÀO DATABASE
            await _dbLogger.LogErrorAsync($"Lỗi hệ thống: {exception.Message}", exception, userId, userName);

            // 4. TR? V? CHO NGU?I DNG
            httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            httpContext.Response.ContentType = "application/json";

            var response = new
            {
                StatusCode = 500,
                Message = "Hệ thống đang gặp sự cố, vui lòng thử lại sau.",
            };

            await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);
            return true;
        }
    }
}
