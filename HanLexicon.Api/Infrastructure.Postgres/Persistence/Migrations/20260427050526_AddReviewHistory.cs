using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Postgres.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddReviewHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MeaningEn",
                table: "vocabulary",
                newName: "meaning_en");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "vocabulary",
                newName: "image_url");

            migrationBuilder.RenameColumn(
                name: "ExampleVn",
                table: "vocabulary",
                newName: "example_vn");

            migrationBuilder.RenameColumn(
                name: "ExamplePy",
                table: "vocabulary",
                newName: "example_py");

            migrationBuilder.RenameColumn(
                name: "ExampleCn",
                table: "vocabulary",
                newName: "example_cn");

            migrationBuilder.RenameColumn(
                name: "AudioUrl",
                table: "vocabulary",
                newName: "audio_url");

            migrationBuilder.AlterColumn<string>(
                name: "meaning_en",
                table: "vocabulary",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "vocabulary",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "now()");

            migrationBuilder.AddColumn<int>(
                name: "current_index",
                table: "user_progress",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "LessonId",
                table: "import_jobs",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "review_history",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    lesson_id = table.Column<Guid>(type: "uuid", nullable: false),
                    score = table.Column<short>(type: "smallint", nullable: false),
                    total_questions = table.Column<short>(type: "smallint", nullable: false),
                    correct_count = table.Column<short>(type: "smallint", nullable: false),
                    details_json = table.Column<string>(type: "jsonb", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("review_history_pkey", x => x.id);
                    table.ForeignKey(
                        name: "review_history_lesson_id_fkey",
                        column: x => x.lesson_id,
                        principalTable: "lessons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "review_history_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "system_logs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    log_level = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    message = table.Column<string>(type: "text", nullable: true),
                    exception = table.Column<string>(type: "text", nullable: true),
                    trace_id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    user_id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    user_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    request_path = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    request_method = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("system_logs_pkey", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_import_jobs_LessonId",
                table: "import_jobs",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_review_history_lesson_id",
                table: "review_history",
                column: "lesson_id");

            migrationBuilder.CreateIndex(
                name: "IX_review_history_user_id",
                table: "review_history",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_import_jobs_lessons_LessonId",
                table: "import_jobs",
                column: "LessonId",
                principalTable: "lessons",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_import_jobs_lessons_LessonId",
                table: "import_jobs");

            migrationBuilder.DropTable(
                name: "review_history");

            migrationBuilder.DropTable(
                name: "system_logs");

            migrationBuilder.DropIndex(
                name: "IX_import_jobs_LessonId",
                table: "import_jobs");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "vocabulary");

            migrationBuilder.DropColumn(
                name: "current_index",
                table: "user_progress");

            migrationBuilder.DropColumn(
                name: "LessonId",
                table: "import_jobs");

            migrationBuilder.RenameColumn(
                name: "meaning_en",
                table: "vocabulary",
                newName: "MeaningEn");

            migrationBuilder.RenameColumn(
                name: "image_url",
                table: "vocabulary",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "example_vn",
                table: "vocabulary",
                newName: "ExampleVn");

            migrationBuilder.RenameColumn(
                name: "example_py",
                table: "vocabulary",
                newName: "ExamplePy");

            migrationBuilder.RenameColumn(
                name: "example_cn",
                table: "vocabulary",
                newName: "ExampleCn");

            migrationBuilder.RenameColumn(
                name: "audio_url",
                table: "vocabulary",
                newName: "AudioUrl");

            migrationBuilder.AlterColumn<string>(
                name: "MeaningEn",
                table: "vocabulary",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255,
                oldNullable: true);
        }
    }
}
