using HanLexicon.Domain.Entities;
using HanLexicon.Api.Extensions;
using HanLexicon.Application.DependencyInjections;
using Infrastructure.Postgres.DependencyInjections;
using Infrastructure.Minio;
using Infrastructure.BackgroundJobs;
using HanLexicon.Api.Middlewares;
using Microsoft.EntityFrameworkCore;
using HanLexicon.Application.Features.Admin;
using Serilog;
using Serilog.Sinks.PostgreSQL;
using System.Collections.Generic;

var builder = WebApplication.CreateBuilder(args);

// --- CẤU HÌNH SERILOG TỐI GIẢN ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.EntityFrameworkCore.Database.Command", Serilog.Events.LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.PostgreSQL(connectionString, "logs", needAutoCreateTable: true)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddControllers();

// 1. Đăng ký Các services
builder.Services.AddApplicationDependencyInjection();
builder.Services.AddInfrastructurePostgres(builder.Configuration);
builder.Services.AddInfrastructureMinio(builder.Configuration);
builder.Services.AddInfrastructureBackgroundJobs(builder.Configuration);

// đăng ký service dùng cho api
builder.Services.AddApiServices(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSerilogRequestLogging(options =>
{
    options.MessageTemplate = "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000} ms";
});

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
