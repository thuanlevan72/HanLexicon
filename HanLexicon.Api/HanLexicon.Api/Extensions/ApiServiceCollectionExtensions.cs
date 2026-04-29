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

            // 1. Cấu hình CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy => 
                {
                    // Cho phép các port local (React chạy port 8080, Vite port 3000, 5173 v.v...)
                    policy.WithOrigins(
                            "http://localhost:3000",
                            "http://localhost:5173",
                            "http://localhost:8080",
                            "https://localhost:3000"
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials(); // Hỗ trợ Cookies/SignalR sau này nếu cần
                });
            });

            services.AddControllers().AddJsonOptions(options =>
            {
                // B? qua c�c v�ng l?p tham chi?u khi parse JSON
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

            // 2. C?u h�nh JWT
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
                // TH�M M?I: �O?N CODE KI?M TRA TOKEN CH?T CH?
                // ==========================================
                //options.Events = new Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerEvents
                //{
                //    OnTokenValidated = async context =>
                //    {
                //        // 1. Resolve c�c service c?n thi?t
                //        //var cacheService = context.HttpContext.RequestServices.GetRequiredService<ICacheService>();
                //        var appContext = context.HttpContext.RequestServices.GetRequiredService<HanLexiconDbContext>();
                //        var userManager = context.HttpContext.RequestServices.GetRequiredService<UserManager<g>>();


                //        // 2. L?y UserId t? Token (Claim NameIdentifier)
                //        var userId = context.Principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                //        // 3. L?y deviceId T? clamis
                //        var deviceId = context.Principal?.FindFirst("deviceId")?.Value;


                //        if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(deviceId))
                //        {
                //            context.Fail("Token kh�ng ch?a th�ng tin User v� Claim h?p l?.");
                //            return;
                //        }
                //        /// c�ch n�y kh�ng t?t v� n� call qu� nhi?u l?n v�o database
                //        //// 4. Ki?m tra xem thi?t b? n�y d� t?ng login chua (c� token cu trong DB kh�ng)
                //        //var tokenInDb = await appContext.Set<ApplicationToken>()
                //        //    .FirstOrDefaultAsync(t => t.UserId == Guid.Parse(userId) &&
                //        //                              t.LoginProvider == deviceId &&
                //        //                              t.Name == "RefreshToken");

                //        //// N?U T�M KH�NG TH?Y -> C� nghia l� thi?t b? n�y d� b? �ang xu?t ho?c b? "��"
                //        //if (tokenInDb == null)
                //        //{
                //        //    context.Fail("Phi�n dang nh?p d� h?t h?n ho?c b? thu h?i tr�n thi?t b? n�y.");
                //        //    return;
                //        //}

                //        //// 3. T�m User trong Database
                //        //var user = await userManager.FindByIdAsync(userId);

                //        //// 4. Ki?m tra: User c� b? x�a, ho?c b? Admin kh�a (IsActive = false) kh�ng?
                //        //// (D?a v�o thu?c t�nh IsActive trong ApplicationUser c?a b?n)
                //        //if (user == null || !user.IsActive)
                //        //{
                //        //    // ��nh d?u Token n�y l� KH�NG H?P L? -> Tr? v? l?i 401 Unauthorized ngay l?p t?c
                //        //    context.Fail("T�i kho?n kh�ng t?n t?i ho?c d� b? kh�a.");
                //        //}
                //        // ====================================================
                //        // KI?M TRA 1: SESSION THI?T B? (B?c qua Redis)
                //        // ====================================================

                //        string sessionCacheKey = $"Session:{userId}:{deviceId}";

                //        // T? d?ng t�m trong Redis, n?u kh�ng c� m?i ch?y h�m query DB
                //        var isSessionValid = await cacheService.GetOrSetAsync(
                //            sessionCacheKey,
                //            factory: async (cToken) =>
                //            {
                //                var loginProvider = $"{deviceId}";
                //                var tokenInDb = await appContext.Set<ApplicationToken>()
                //                    .FirstOrDefaultAsync(t => t.UserId == Guid.Parse(userId) &&
                //                                              t.LoginProvider == loginProvider &&
                //                                              t.Name == "RefreshToken");
                //                return tokenInDb != null; // Tr? v? true n?u c�n trong DB
                //            },
                //            slidingExpiration: TimeSpan.FromMinutes(15) // Cache t?n t?i 15 ph�t (b?ng tu?i th? JWT)
                //        );

                //        if (!isSessionValid)
                //        {
                //            context.Fail("Phi�n dang nh?p d� h?t h?n ho?c b? thu h?i tr�n thi?t b? n�y.");
                //            return;
                //        }

                //        // ====================================================
                //        // KI?M TRA 2: TR?NG TH�I USER ACTIVE (B?c qua Redis)
                //        // ====================================================
                //        string userStatusCacheKey = $"UserActive:{userId}";

                //        var isUserActive = await cacheService.GetOrSetAsync(
                //            userStatusCacheKey,
                //            factory: async (cToken) =>
                //            {
                //                var user = await userManager.FindByIdAsync(userId);
                //                return user != null && user.IsActive;
                //            },
                //            absoluteExpiration: TimeSpan.FromMinutes(5) // Cache 5 ph�t d? check ban account nhanh nh?y
                //        );

                //        if (!isUserActive)
                //        {
                //            context.Fail("T�i kho?n kh�ng t?n t?i ho?c d� b? kh�a.");
                //            return;
                //        }
                //    }
                //};
            });

            // 3. C?u h�nh Swagger
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
