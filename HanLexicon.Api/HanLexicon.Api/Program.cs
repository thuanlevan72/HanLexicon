using HanLexicon.Domain.Entities;
using HanLexicon.Api.Extensions;
using HanLexicon.Application.DependencyInjections;
using Infrastructure.Postgres.DependencyInjections;
using Infrastructure.Minio;
using Infrastructure.BackgroundJobs;
using Microsoft.EntityFrameworkCore;
using HanLexicon.Application.Features.Admin;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Lấy chuỗi kết nối từ appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi


// 1. Đăng ký Các services
builder.Services.AddApplicationDependencyInjection();

builder.Services.AddInfrastructurePostgres(builder.Configuration);

builder.Services.AddInfrastructureMinio(builder.Configuration);
builder.Services.AddInfrastructureBackgroundJobs(builder.Configuration);

// đăng ký service dùng cho api
builder.Services.AddApiServices(builder.Configuration);

var app = builder.Build();
app.UseCors("AllowAll");

//// Tự động Migrate Database khi khởi động
//using (var scope = app.Services.CreateScope())
//{
//    var dbContext = scope.ServiceProvider.GetRequiredService<Infrastructure.Postgres.Persistence.HanLexiconDbContext>();
//    await dbContext.Database.MigrateAsync();

//    // Seed Data
//    var mediator = scope.ServiceProvider.GetRequiredService<MediatR.IMediator>();
//    await mediator.Send(new SeedInitialDataCommand());
//}

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
