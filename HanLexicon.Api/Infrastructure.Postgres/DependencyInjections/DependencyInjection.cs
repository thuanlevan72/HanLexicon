using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres.Persistence;
using Infrastructure.Postgres.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Infrastructure.Postgres.Services;

namespace Infrastructure.Postgres.DependencyInjections
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructurePostgres(this IServiceCollection services, IConfiguration configuration)
        {
            // 1. Đăng ký AppDbContext
            services.AddDbContext<HanLexiconDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            
            services.AddHttpContextAccessor();
            services.AddScoped<ILogService, LogService>();

            return services;
        }
    }
}
