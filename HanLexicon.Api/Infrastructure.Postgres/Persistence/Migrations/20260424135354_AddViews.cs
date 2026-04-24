using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Postgres.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddViews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                CREATE OR REPLACE VIEW v_lessons_summary AS
                SELECT 
                    l.id,
                    c.name AS category,
                    l.lesson_number,
                    l.filename,
                    l.title_cn,
                    l.title_vn,
                    l.icon,
                    l.badge,
                    (SELECT COUNT(*) FROM hanzi_cards h WHERE h.lesson_id = l.id) AS hanzi_count,
                    (SELECT COUNT(*) FROM vocabulary v WHERE v.lesson_id = l.id) AS vocab_count,
                    (SELECT COUNT(*) FROM quiz_questions q WHERE q.lesson_id = l.id) AS quiz_count
                FROM lessons l
                JOIN lesson_categories c ON l.category_id = c.id;
            ");

            migrationBuilder.Sql(@"
                CREATE OR REPLACE VIEW v_user_stats AS
                SELECT 
                    u.id AS user_id,
                    u.username,
                    u.display_name,
                    COUNT(p.lesson_id) AS lessons_started,
                    SUM(CASE WHEN p.completed THEN 1 ELSE 0 END) AS lessons_completed,
                    AVG(p.score) AS avg_score,
                    SUM(p.time_spent_s) AS total_time_seconds
                FROM users u
                LEFT JOIN user_progress p ON u.id = p.user_id
                GROUP BY u.id, u.username, u.display_name;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW IF EXISTS v_lessons_summary;");
            migrationBuilder.Sql("DROP VIEW IF EXISTS v_user_stats;");
        }
    }
}
