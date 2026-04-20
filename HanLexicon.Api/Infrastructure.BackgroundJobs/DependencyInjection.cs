using HanLexicon.Application.Interfaces;
using HanLexicon.Domain.Interfaces;
using Infrastructure.BackgroundJobs.Jobs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.BackgroundJobs;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureBackgroundJobs(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IVocabularyImportJob, VocabularyImportJob>();
        return services;
    }
}
