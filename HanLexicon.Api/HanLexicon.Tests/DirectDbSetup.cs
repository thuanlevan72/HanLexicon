using System;
using System.Threading.Tasks;
using Infrastructure.Postgres.Persistence;
using Microsoft.EntityFrameworkCore;

namespace HanLexicon.Tests
{
    public class DirectDbSetup
    {
        public static async Task Main()
        {
            var optionsBuilder = new DbContextOptionsBuilder<HanLexiconDbContext>();
            // Sử dụng connection string từ DbCheck.cs
            optionsBuilder.UseNpgsql("Host=localhost;Port=5433;Database=hanlexicon_empty;Username=user;Password=password");

            using (var context = new HanLexiconDbContext(optionsBuilder.Options))
            {
                Console.WriteLine("--- STARTING DIRECT DATABASE SETUP ---");

                try {
                    // 1. Tạo bảng review_history bằng SQL thuần
                    Console.WriteLine("Step 1: Creating 'review_history' table...");
                    string createTableSql = @"
                        CREATE TABLE IF NOT EXISTS review_history (
                            id uuid DEFAULT uuid_generate_v4() NOT NULL,
                            user_id uuid NOT NULL,
                            lesson_id uuid NOT NULL,
                            score smallint NOT NULL,
                            total_questions smallint NOT NULL,
                            correct_count smallint NOT NULL,
                            details_json jsonb,
                            created_at timestamp with time zone DEFAULT now() NOT NULL,
                            CONSTRAINT review_history_pkey PRIMARY KEY (id),
                            CONSTRAINT review_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                            CONSTRAINT review_history_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE
                        );
                        CREATE INDEX IF NOT EXISTS idx_review_history_user ON review_history(user_id);
                        CREATE INDEX IF NOT EXISTS idx_review_history_lesson ON review_history(lesson_id);
                    ";
                    await context.Database.ExecuteSqlRawAsync(createTableSql);
                    Console.WriteLine("Success: 'review_history' table is now in the database.");

                    // 2. Thêm cột current_index vào user_progress nếu chưa có
                    Console.WriteLine("Step 2: Adding 'current_index' to 'user_progress'...");
                    try {
                        await context.Database.ExecuteSqlRawAsync("ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS current_index integer DEFAULT 0 NOT NULL;");
                        Console.WriteLine("Success: Column 'current_index' added.");
                    } catch (Exception ex) {
                        Console.WriteLine("Info: 'current_index' might already exist. " + ex.Message);
                    }

                    // 3. Đồng bộ EF Migrations History
                    Console.WriteLine("Step 3: Syncing EF Migration History...");
                    string syncSql = @"
                        INSERT INTO ""__EFMigrationsHistory"" (""MigrationId"", ""ProductVersion"")
                        VALUES ('20260425011229_Baseline', '10.0.5')
                        ON CONFLICT DO NOTHING;
                        
                        INSERT INTO ""__EFMigrationsHistory"" (""MigrationId"", ""ProductVersion"")
                        VALUES ('20260427050526_AddReviewHistory', '10.0.5')
                        ON CONFLICT DO NOTHING;
                    ";
                    await context.Database.ExecuteSqlRawAsync(syncSql);
                    Console.WriteLine("Success: Migration history synced.");

                    // 4. KIỂM TRA TÍCH HỢP THỰC TẾ
                    Console.WriteLine("Step 4: Final Verification (Count Records)...");
                    var count = await context.ReviewHistories.CountAsync();
                    Console.WriteLine($"Current total records in review_history: {count}");

                    Console.WriteLine("--- DATABASE SETUP COMPLETED SUCCESSFULLY ---");
                }
                catch (Exception ex) {
                    Console.WriteLine("FATAL ERROR: " + ex.Message);
                    if (ex.InnerException != null) Console.WriteLine("Inner: " + ex.InnerException.Message);
                }
            }
        }
    }
}
