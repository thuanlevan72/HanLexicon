using HanLexicon.Domain.Entities;
using Application.Interfaces;
using HanLexicon.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json.Serialization;

namespace HanLexicon.Api.Extensions
{
    public static class ApiServiceCollectionExtensions
    {
        public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpContextAccessor();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddControllers();
            services.AddEndpointsApiExplorer();

            // 1. C?u hình CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            services.AddControllers().AddJsonOptions(options =>
            {
                // B? qua các vòng l?p tham chi?u khi parse JSON
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

            // 2. C?u hình JWT
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"]!)),
                    ValidateIssuer = true,
                    ValidIssuer = configuration["JWT:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = configuration["JWT:Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                // ==========================================
                // THÊM M?I: ÐO?N CODE KI?M TRA TOKEN CH?T CH?
                // ==========================================
                //options.Events = new Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerEvents
                //{
                //    OnTokenValidated = async context =>
                //    {
                //        // 1. Resolve các service c?n thi?t
                //        //var cacheService = context.HttpContext.RequestServices.GetRequiredService<ICacheService>();
                //        var appContext = context.HttpContext.RequestServices.GetRequiredService<HanLexiconDbContext>();
                //        var userManager = context.HttpContext.RequestServices.GetRequiredService<UserManager<g>>();


                //        // 2. L?y UserId t? Token (Claim NameIdentifier)
                //        var userId = context.Principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                //        // 3. L?y deviceId T? clamis
                //        var deviceId = context.Principal?.FindFirst("deviceId")?.Value;


                //        if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(deviceId))
                //        {
                //            context.Fail("Token không ch?a thông tin User và Claim h?p l?.");
                //            return;
                //        }
                //        /// cách này không t?t vì nó call quá nhi?u l?n vào database
                //        //// 4. Ki?m tra xem thi?t b? này dã t?ng login chua (có token cu trong DB không)
                //        //var tokenInDb = await appContext.Set<ApplicationToken>()
                //        //    .FirstOrDefaultAsync(t => t.UserId == Guid.Parse(userId) &&
                //        //                              t.LoginProvider == deviceId &&
                //        //                              t.Name == "RefreshToken");

                //        //// N?U TÌM KHÔNG TH?Y -> Có nghia là thi?t b? này dã b? Ðang xu?t ho?c b? "Ðá"
                //        //if (tokenInDb == null)
                //        //{
                //        //    context.Fail("Phiên dang nh?p dã h?t h?n ho?c b? thu h?i trên thi?t b? này.");
                //        //    return;
                //        //}

                //        //// 3. Tìm User trong Database
                //        //var user = await userManager.FindByIdAsync(userId);

                //        //// 4. Ki?m tra: User có b? xóa, ho?c b? Admin khóa (IsActive = false) không?
                //        //// (D?a vào thu?c tính IsActive trong ApplicationUser c?a b?n)
                //        //if (user == null || !user.IsActive)
                //        //{
                //        //    // Ðánh d?u Token này là KHÔNG H?P L? -> Tr? v? l?i 401 Unauthorized ngay l?p t?c
                //        //    context.Fail("Tài kho?n không t?n t?i ho?c dã b? khóa.");
                //        //}
                //        // ====================================================
                //        // KI?M TRA 1: SESSION THI?T B? (B?c qua Redis)
                //        // ====================================================

                //        string sessionCacheKey = $"Session:{userId}:{deviceId}";

                //        // T? d?ng tìm trong Redis, n?u không có m?i ch?y hàm query DB
                //        var isSessionValid = await cacheService.GetOrSetAsync(
                //            sessionCacheKey,
                //            factory: async (cToken) =>
                //            {
                //                var loginProvider = $"{deviceId}";
                //                var tokenInDb = await appContext.Set<ApplicationToken>()
                //                    .FirstOrDefaultAsync(t => t.UserId == Guid.Parse(userId) &&
                //                                              t.LoginProvider == loginProvider &&
                //                                              t.Name == "RefreshToken");
                //                return tokenInDb != null; // Tr? v? true n?u còn trong DB
                //            },
                //            slidingExpiration: TimeSpan.FromMinutes(15) // Cache t?n t?i 15 phút (b?ng tu?i th? JWT)
                //        );

                //        if (!isSessionValid)
                //        {
                //            context.Fail("Phiên dang nh?p dã h?t h?n ho?c b? thu h?i trên thi?t b? này.");
                //            return;
                //        }

                //        // ====================================================
                //        // KI?M TRA 2: TR?NG THÁI USER ACTIVE (B?c qua Redis)
                //        // ====================================================
                //        string userStatusCacheKey = $"UserActive:{userId}";

                //        var isUserActive = await cacheService.GetOrSetAsync(
                //            userStatusCacheKey,
                //            factory: async (cToken) =>
                //            {
                //                var user = await userManager.FindByIdAsync(userId);
                //                return user != null && user.IsActive;
                //            },
                //            absoluteExpiration: TimeSpan.FromMinutes(5) // Cache 5 phút d? check ban account nhanh nh?y
                //        );

                //        if (!isUserActive)
                //        {
                //            context.Fail("Tài kho?n không t?n t?i ho?c dã b? khóa.");
                //            return;
                //        }
                //    }
                //};
            });

            // 3. C?u hình Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "Nh?p 'Bearer [kho?ng tr?ng] [token c?a b?n]'.",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme { Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" } },
                        Array.Empty<string>()
                    }
                });
            });

            return services;
        }
    }
}
