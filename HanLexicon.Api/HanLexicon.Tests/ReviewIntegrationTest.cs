using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HanLexicon.Application.Features.LessonsUser;
using HanLexicon.Domain.Entities;
using Infrastructure.Postgres.Persistence;
using Microsoft.EntityFrameworkCore;
using HanLexicon.Domain.Interfaces;
using Moq;

namespace HanLexicon.Tests
{
    public class ReviewIntegrationTest
    {
        public static async Task RunTest()
        {
            var optionsBuilder = new DbContextOptionsBuilder<HanLexiconDbContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Port=5433;Database=hanlexicon_empty;Username=user;Password=password");

            using (var context = new HanLexiconDbContext(optionsBuilder.Options))
            {
                Console.WriteLine("--- TESTING REVIEW HISTORY FLOW ---");

                // 1. Lấy thông tin User và Lesson thực tế để test
                var user = await context.Users.FirstOrDefaultAsync();
                var lesson = await context.Lessons.FirstOrDefaultAsync();

                if (user == null || lesson == null)
                {
                    Console.WriteLine("Error: Need at least one user and one lesson in DB to test.");
                    return;
                }

                Console.WriteLine($"Using User: {user.Username}, Lesson: {lesson.TitleVn}");

                // 2. Giả lập UnitOfWork
                var mockUow = new Mock<IUnitOfWork>();
                
                // Cấu hình Mock cho Repositories
                var mockProgressRepo = new Mock<IGenericRepository<UserProgress>>();
                var mockHistoryRepo = new Mock<IGenericRepository<ReviewHistory>>();
                var mockVocabRepo = new Mock<IGenericRepository<Vocabulary>>();
                var mockWordProgressRepo = new Mock<IGenericRepository<UserWordProgress>>();

                mockUow.Setup(u => u.Repository<UserProgress>()).Returns(mockProgressRepo.Object);
                mockUow.Setup(u => u.Repository<ReviewHistory>()).Returns(mockHistoryRepo.Object);
                mockUow.Setup(u => u.Repository<Vocabulary>()).Returns(mockVocabRepo.Object);
                mockUow.Setup(u => u.Repository<UserWordProgress>()).Returns(mockWordProgressRepo.Object);

                // Giả lập Query() trả về IQueryable trống
                mockProgressRepo.Setup(r => r.Query()).Returns(new List<UserProgress>().AsQueryable());
                mockHistoryRepo.Setup(r => r.Query()).Returns(new List<ReviewHistory>().AsQueryable());
                mockVocabRepo.Setup(r => r.Query()).Returns(new List<Vocabulary>().AsQueryable());
                mockWordProgressRepo.Setup(r => r.Query()).Returns(new List<UserWordProgress>().AsQueryable());

                // 3. Tạo Command giả lập hoàn thành bài review
                var details = "[{\"vocabId\":\"" + Guid.NewGuid() + "\", \"isCorrect\": true}]";
                var command = new SaveUserProgressCommand(
                    lesson.Id, 
                    user.Id, 
                    90, // Score
                    true, // Completed
                    120, // TimeSpent
                    0,   // CurrentIndex
                    10,  // TotalQuestions
                    9,   // CorrectCount
                    details // DetailsJson
                );

                // 4. Chạy Handler
                var handler = new SaveUserProgressHandler(mockUow.Object);
                await handler.Handle(command, CancellationToken.None);

                // 5. Verify kết quả
                Console.WriteLine("Verifying calls to repository...");
                
                // Kiểm tra xem có lưu vào ReviewHistory không
                mockHistoryRepo.Verify(r => r.Add(It.Is<ReviewHistory>(h => 
                    h.UserId == user.Id && 
                    h.LessonId == lesson.Id && 
                    h.Score == 90 &&
                    h.CorrectCount == 9
                )), Times.Once);

                Console.WriteLine("Success: ReviewHistory was added to repository.");
                
                // Kiểm tra xem có cập nhật UserProgress không (Vì mock Query() trả về list trống nên handler sẽ gọi Add)
                mockProgressRepo.Verify(r => r.Add(It.IsAny<UserProgress>()), Times.Once);
                
                Console.WriteLine("--- INTEGRATION TEST LOGIC PASSED ---");
            }
        }
    }

    // Cần thêm Mocking library hoặc tự viết đơn giản
}
