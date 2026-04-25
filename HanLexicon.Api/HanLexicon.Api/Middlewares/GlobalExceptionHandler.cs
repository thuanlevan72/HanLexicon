using HanLexicon.Domain.Entities;
using Microsoft.AspNetCore.Diagnostics;

namespace HanLexicon.Api.Middlewares
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            // 1. GHI LOG RA FILE (Ch? developer và sysadmin m?i th?y)
            // Log luôn c? Exception (Stack trace chi ti?t) d? d? debug
            _logger.LogError(exception, "L?I H? TH?NG: {Message}", exception.Message);

            // 2. TR? V? CHO NGU?I DÙNG (Gi?u t?t l?i th?t, ch? hi?n câu chung chung)
            httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            httpContext.Response.ContentType = "application/json";

            var response = new
            {
                StatusCode = 500,
                Message = "H? th?ng dang g?p s? c?. Vui lòng th? l?i sau!",
                // B?t bu?c KHÔNG CÓ StackTrace ? dây
            };

            await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

            // Tr? v? true d? báo cho .NET bi?t: "Tôi dã x? lý l?i này r?i, d?ng quang l?i g?c ra ngoài n?a"
            return true;
        }
    }
}
