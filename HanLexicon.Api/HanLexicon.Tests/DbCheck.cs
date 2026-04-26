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
                var count = await context.Vocabularies.CountAsync();
                var lastFive = await context.Vocabularies
                    .OrderByDescending(v => v.Word)
                    .Take(5)
                    .Select(v => new { v.Word, v.Meaning, v.LessonId })
                    .ToListAsync();

                Console.WriteLine($"--- DATABASE CHECK ---");
                Console.WriteLine($"Tong so tu vung: {count}");
                Console.WriteLine($"5 tu vung moi nhat:");
                foreach (var v in lastFive)
                {
                    Console.WriteLine($"- {v.Word}: {v.Meaning} (Lesson: {v.LessonId})");
                }
            }
        }
    }
}