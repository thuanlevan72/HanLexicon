using System.Net;
using System.Text.Json;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            // Cho phép Request đi tiếp vào hệ thống
            await _next(context);
        }
        catch (Exception ex)
        {
            // Bắt mọi lỗi văng ra và xử lý ở đây
            _logger.LogError(ex, "Đã xảy ra lỗi hệ thống không mong muốn.");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        // Luôn trả về 500 cho các lỗi không lường trước
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        // Trả về JSON sạch sẽ, KHÔNG chứa StackTrace
        var response = new
        {
            StatusCode = context.Response.StatusCode,
            Message = "Hệ thống đang gặp sự cố, vui lòng thử lại sau.",
            // Detail = exception.Message // Bật lên nếu chỉ debug ở môi trường local
        };

        var json = JsonSerializer.Serialize(response);
        return context.Response.WriteAsync(json);
    }
}