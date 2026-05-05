using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Postgres.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMediaFolders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "system_logs_pkey",
                table: "system_logs");

            migrationBuilder.DropColumn(
                name: "current_index",
                table: "user_progress");

            migrationBuilder.DropColumn(
                name: "id",
                table: "system_logs");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "system_logs");

            migrationBuilder.DropColumn(
                name: "log_level",
                table: "system_logs");

            migrationBuilder.DropColumn(
                name: "request_method",
                table: "system_logs");

            migrationBuilder.DropColumn(
                name: "request_path",
                table: "system_logs");

            migrationBuilder.DropColumn(
                name: "trace_id",
                table: "system_logs");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "system_logs");

            migrationBuilder.DropColumn(
                name: "user_name",
                table: "system_logs");

            migrationBuilder.RenameTable(
                name: "system_logs",
                newName: "logs");

            migrationBuilder.AddColumn<int>(
                name: "level",
                table: "logs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "log_event",
                table: "logs",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "message_template",
                table: "logs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "timestamp",
                table: "logs",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "media_folders",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("media_folders_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user_study_progress",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    lesson_id = table.Column<Guid>(type: "uuid", nullable: false),
                    current_index = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    is_completed = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    last_studied_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("user_study_progress_pkey", x => x.id);
                    table.ForeignKey(
                        name: "user_study_progress_lesson_id_fkey",
                        column: x => x.lesson_id,
                        principalTable: "lessons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "user_study_progress_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_user_study_progress_lesson_id",
                table: "user_study_progress",
                column: "lesson_id");

            migrationBuilder.CreateIndex(
                name: "user_study_progress_user_id_lesson_id_key",
                table: "user_study_progress",
                columns: new[] { "user_id", "lesson_id" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "media_folders");

            migrationBuilder.DropTable(
                name: "user_study_progress");

            migrationBuilder.DropColumn(
                name: "level",
                table: "logs");

            migrationBuilder.DropColumn(
                name: "log_event",
                table: "logs");

            migrationBuilder.DropColumn(
                name: "message_template",
                table: "logs");

            migrationBuilder.DropColumn(
                name: "timestamp",
                table: "logs");

            migrationBuilder.RenameTable(
                name: "logs",
                newName: "system_logs");

            migrationBuilder.AddColumn<int>(
                name: "current_index",
                table: "user_progress",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "id",
                table: "system_logs",
                type: "uuid",
                nullable: false,
                defaultValueSql: "uuid_generate_v4()");

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "system_logs",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "now()");

            migrationBuilder.AddColumn<string>(
                name: "log_level",
                table: "system_logs",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "request_method",
                table: "system_logs",
                type: "character varying(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "request_path",
                table: "system_logs",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "trace_id",
                table: "system_logs",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "user_id",
                table: "system_logs",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "user_name",
                table: "system_logs",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "system_logs_pkey",
                table: "system_logs",
                column: "id");
        }
    }
}
