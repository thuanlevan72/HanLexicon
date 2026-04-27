using System;
using System.Linq;
using System.Threading.Tasks;
using HanLexicon.Domain.Entities;
using HanLexicon.Domain.Interfaces;
using Infrastructure.Postgres.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace HanLexicon.Tests
{
    public class DbCheck
    {
        public static async Task Main()
        {
            var optionsBuilder = new DbContextOptionsBuilder<HanLexiconDbContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Port=5433;Database=hanlexicon_empty;Username=user;Password=password");

            using (var context = new HanLexiconDbContext(optionsBuilder.Options))
            {
                Console.WriteLine("--- CREATING LOGS TABLE ---");
                string createLogTableSql = @"
                    CREATE TABLE IF NOT EXISTS system_logs (
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        log_level VARCHAR(20),
                        message TEXT,
                        exception TEXT,
                        trace_id VARCHAR(100),
                        user_id VARCHAR(100),
                        user_name VARCHAR(100),
                        request_path VARCHAR(255),
                        request_method VARCHAR(10),
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
                    );";
                await context.Database.ExecuteSqlRawAsync(createLogTableSql);
                Console.WriteLine("Success: system_logs table ready.");

                Console.WriteLine("--- FINAL DATABASE CHECK ---");
                
                var lessons = await context.Lessons
                    .Take(5)
                    .Select(l => new { l.Id, l.TitleCn, l.TitleVn })
                    .ToListAsync();

                Console.WriteLine($"--- LESSONS ---");
                foreach (var l in lessons)
                {
                    Console.WriteLine($"- {l.Id}: {l.TitleCn} / {l.TitleVn}");
                }

                var users = await context.Users
                    .Select(u => new { u.Username, u.Email, u.DisplayName, u.IsActive })
                    .ToListAsync();

                Console.WriteLine($"\n--- USERS ---");
                foreach (var u in users)
                {
                    Console.WriteLine($"- Username: {u.Username} | Email: {u.Email} | Name: {u.DisplayName} | Active: {u.IsActive}");
                    
                    if (u.Username == "Admin") {
                        Console.WriteLine("  -> Resetting Admin password to 'admin123'...");
                        string newHash = BCrypt.Net.BCrypt.EnhancedHashPassword("admin123", 13);
                        await context.Database.ExecuteSqlRawAsync("UPDATE users SET password_hash = {0} WHERE username = 'Admin'", newHash);
                        Console.WriteLine("  -> Success: Admin password reset.");
                    }
                }

                var count = await context.Vocabularies.CountAsync();
                
                // KIỂM TRA LOGS
                Console.WriteLine($"\n--- LATEST SYSTEM LOGS ---");
                var logs = await context.Database.SqlQueryRaw<dynamic>("SELECT message, log_level FROM system_logs ORDER BY created_at DESC LIMIT 5").ToListAsync();
                foreach (var log in logs) {
                    Console.WriteLine($"- [{log.log_level}] {log.message}");
                }

                var lastFive = await context.Vocabularies.OrderByDescending(v => v.SortOrder).Take(10).ToListAsync();
            }
        }
    }
}