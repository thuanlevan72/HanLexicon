using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using HanLexicon.Infrastructure.S3;
using Infrastructure.Postgres.Persistence;
using Infrastructure.Postgres.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.S3;

public static class DependencyInjectionS3
{
    public static IServiceCollection AddInfrastructureS3(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<S3Settings>(configuration.GetSection("S3Settings"));
        services.AddScoped<IStorageService, S3StorageService>();
        return services;
    }
}