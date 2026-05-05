using HanLexicon.Domain.Entities;
using HanLexicon.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Minio;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureMinio(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<MinioSettings>(configuration.GetSection("Minio"));
        services.AddScoped<IStorageService, MinioStorageService>();
        return services;
    }
}
