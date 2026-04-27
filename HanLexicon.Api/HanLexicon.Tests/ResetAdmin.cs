using System;
using System.Threading.Tasks;
using Infrastructure.Postgres.Persistence;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace HanLexicon.Tests
{
    public class ResetAdminPassword
    {
        [Fact]
        public async Task ResetPassword()
        {
            var optionsBuilder = new DbContextOptionsBuilder<HanLexiconDbContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Port=5433;Database=hanlexicon_empty;Username=user;Password=password");

            using (var context = new HanLexiconDbContext(optionsBuilder.Options))
            {
                string newHash = BCrypt.Net.BCrypt.EnhancedHashPassword("admin123", 13);
                Console.WriteLine($"New Hash: {newHash}");

                // Cập nhật cho cả 'admin' và 'Admin' để chắc chắn
                int rows = await context.Database.ExecuteSqlRawAsync(
                    "UPDATE users SET password_hash = {0} WHERE LOWER(username) = 'admin'", 
                    newHash);
                
                Console.WriteLine($"Rows affected: {rows}");
                Assert.True(rows >= 0);
            }
        }
    }
}
