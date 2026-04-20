using HanLexicon.Application.Interfaces;
using Infrastructure.GoogleCloud;
using Infrastructure.Postgres.Persistence;
using Infrastructure.Postgres.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.S3;

public static class DependencyInjectionS3
{
    public static IServiceCollection AddInfrastructureGoogleCloud(this IServiceCollection services, IConfiguration configuration)
    {// ---------- GOOGLE CLOUD MỚI ----------
        services.Configure<GoogleCloudSettings>(configuration.GetSection("GoogleCloudSettings"));
        services.AddScoped<IStorageService, GoogleCloudStorageService>();
        return services;
    }
}