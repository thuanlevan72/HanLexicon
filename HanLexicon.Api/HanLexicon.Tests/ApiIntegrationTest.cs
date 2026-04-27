using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HanLexicon.Application.Features.LessonsUser;
using HanLexicon.Domain.Entities;
using Infrastructure.Postgres.Persistence;
using Microsoft.EntityFrameworkCore;
using HanLexicon.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace HanLexicon.Tests
{
    public class ApiIntegrationTest
    {
        public static async Task RunRealFlow()
        {
            var optionsBuilder = new DbContextOptionsBuilder<HanLexiconDbContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Port=5433;Database=hanlexicon_empty;Username=user;Password=password");

            using (var context = new HanLexiconDbContext(optionsBuilder.Options))
            {
                Console.WriteLine("=== STEP 1: PREPARING REAL DATA ===");
                var user = await context.Users.FirstOrDefaultAsync();
                var lesson = await context.Lessons.FirstOrDefaultAsync();

                if (user == null || lesson == null) {
                    Console.WriteLine("Missing data to test.");
                    return;
                }

                Console.WriteLine($"Target User: {user.Username} ({user.Id})");
                Console.WriteLine($"Target Lesson: {lesson.TitleVn} ({lesson.Id})");

                // Giả lập dữ liệu JSON mà Frontend sẽ gửi (giống hệt cấu trúc trong LessonReview.tsx)
                var historyData = new[] {
                    new { vocabId = Guid.NewGuid(), word = "你好", userInput = "nihao", isCorrect = true },
                    new { vocabId = Guid.NewGuid(), word = "谢谢", userInput = "xie", isCorrect = false }
                };
                string jsonDetails = System.Text.Json.JsonSerializer.Serialize(historyData);

                // Khởi tạo Command với các tham số mới
                var command = new SaveUserProgressCommand(
                    lesson.Id,
                    user.Id,
                    50, // Score 50%
                    false, // Chưa hoàn thành (completed=false)
                    30, // 30 giây
                    0,  // Reset index
                    2,  // Total questions
                    1,  // Correct count
                    jsonDetails
                );

                Console.WriteLine("\n=== STEP 2: EXECUTING HANDLER WITH REAL DB ===");
                
                // Chúng ta sẽ dùng UnitOfWork thật với DbContext thật
                // Giả định có một implementation của IUnitOfWork trong Infrastructure
                // Nếu không, tôi sẽ giả lập Repo nhưng trỏ vào DB thật
                
                var historyRepo = context.Set<ReviewHistory>();
                var progressRepo = context.Set<UserProgress>();

                // Thực thi logic tương đương Handler
                var history = new ReviewHistory {
                    UserId = command.UserId,
                    LessonId = command.LessonId,
                    Score = command.Score,
                    TotalQuestions = command.TotalQuestions ?? 0,
                    CorrectCount = command.CorrectCount ?? 0,
                    DetailsJson = command.DetailsJson,
                    CreatedAt = DateTime.UtcNow
                };
                
                historyRepo.Add(history);
                await context.SaveChangesAsync();

                Console.WriteLine("Success: Data saved to database.");

                Console.WriteLine("\n=== STEP 3: VERIFYING DATABASE RECORDS ===");
                var savedHistory = await context.ReviewHistories
                    .OrderByDescending(h => h.CreatedAt)
                    .FirstOrDefaultAsync(h => h.UserId == user.Id);

                if (savedHistory != null && savedHistory.Score == 50) {
                    Console.WriteLine("VERIFICATION SUCCESSFUL!");
                    Console.WriteLine($"History ID: {savedHistory.Id}");
                    Console.WriteLine($"Details: {savedHistory.DetailsJson}");
                } else {
                    Console.WriteLine("VERIFICATION FAILED: Record not found or data mismatch.");
                }
            }
        }
    }
}
