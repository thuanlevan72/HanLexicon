using HanLexicon.Domain.Entities;
using HanLexicon.Application.Interfaces;
using HanLexicon.Application.Services;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace HanLexicon.Application.DependencyInjections
{
    public static class ApplicationDependencyInjection
    {
        public static IServiceCollection AddApplicationDependencyInjection(this IServiceCollection services)
        {
      
            services.AddMediatR(cfg => {
             
                cfg.RegisterServicesFromAssembly(typeof(ApplicationDependencyInjection).Assembly);

                /// <summary>
                /// Thêm performance monitoring behavior
                /// 
                /// </summary>
                //cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(PerformanceBehavior<,>));
            });

            /// <summary>
            
            services.AddAutoMapper(cfg => cfg.AddMaps(typeof(ApplicationDependencyInjection).Assembly));
            services.AddValidatorsFromAssembly(typeof(ApplicationDependencyInjection).Assembly);
            // ÐANG KÝ CÁCH SERVICES
            services.AddScoped<IAuthService, AuthService>();
            /// <summary>
            /// Return services collection
            /// 
            /// Fluent pattern:
            /// - Cho phép chaining multiple extensions
            /// - Ví d?:
            ///   builder.Services
            ///     .AddApplication()
            ///     .AddInfrastructure()
            ///     .AddApiServices();
            /// </summary>
            return services;
        }
    }
}
