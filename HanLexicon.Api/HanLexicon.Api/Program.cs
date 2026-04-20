using HanLexicon.Api.Extensions;
using HanLexicon.Application.DependencyInjections;
using Infrastructure.Postgres.DependencyInjections;
using Infrastructure.S3;
using Infrastructure.BackgroundJobs;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Lấy chuỗi kết nối từ appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi


// 1. Đăng ký Các services
builder.Services.AddApplicationDependencyInjection();

builder.Services.AddInfrastructurePostgres(builder.Configuration);
builder.Services.AddInfrastructureS3(builder.Configuration);
builder.Services.AddInfrastructureGoogleCloud(builder.Configuration);
builder.Services.AddInfrastructureBackgroundJobs(builder.Configuration);

// đăng ký service dùng cho api
builder.Services.AddApiServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
