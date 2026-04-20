using MediatR;
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
                /// Mục đích:
                /// - Đo thời gian execution của mỗi command/query
                /// - Log performance metrics (> 1s → warning)
                /// - Detect slow operations
                /// 
                /// Hoạt động:
                /// - Intercept mỗi request/response
                /// - Record start time
                /// - Execute handler
                /// - Calculate duration
                /// - Log: "CreateTodoHandler executed in 123ms"
                /// 
                /// Lợi ích:
                /// - Performance monitoring built-in
                /// - No need add logging to every handler
                /// - Identify bottlenecks
                /// 
                /// Note:
                /// - Behavior execute before handler (pre-processing)
                /// - Can add validation, caching, etc. behaviors similarly
                /// - Order matters: Validation → Performance → Caching → Handler
                /// </summary>
                //cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(PerformanceBehavior<,>));
            });

            /// <summary>
            
            services.AddAutoMapper(cfg => cfg.AddMaps(typeof(ApplicationDependencyInjection).Assembly));

            /// <summary>
            /// Return services collection
            /// 
            /// Fluent pattern:
            /// - Cho phép chaining multiple extensions
            /// - Ví dụ:
            ///   builder.Services
            ///     .AddApplication()
            ///     .AddInfrastructure()
            ///     .AddApiServices();
            /// </summary>
            return services;
        }
    }
}
