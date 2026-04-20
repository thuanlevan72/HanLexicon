using HanLexicon.Api.Extensions;
using HanLexicon.Application.DependencyInjections;
using Infrastructure.Postgres.DependencyInjections;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Lấy chuỗi kết nối từ appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi


// 1. Đăng ký AppDbContext
builder.Services.AddApplicationDependencyInjection();

builder.Services.AddInfrastructurePostgres(builder.Configuration);

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
