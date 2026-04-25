using System;
using System.Net;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Postgres.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Baseline : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:pgcrypto", ",,")
                .Annotation("Npgsql:PostgresExtension:uuid-ossp", ",,");

            migrationBuilder.CreateTable(
                name: "lesson_categories",
                columns: table => new
                {
                    id = table.Column<short>(type: "smallint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    slug = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    name = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    sort_order = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("lesson_categories_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "permissions",
                columns: table => new
                {
                    id = table.Column<short>(type: "smallint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("permissions_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<short>(type: "smallint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("roles_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    username = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    password_hash = table.Column<string>(type: "text", nullable: false, comment: "bcrypt hash, cost=12"),
                    display_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    email = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    is_active = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    last_login_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("users_pkey", x => x.id);
                },
                comment: "T�i kho?n h?c vi�n v� qu?n tr? vi�n");

            migrationBuilder.CreateTable(
                name: "documents",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    category_id = table.Column<short>(type: "smallint", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    download_url = table.Column<string>(type: "text", nullable: false),
                    doc_type = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false, defaultValueSql: "'pdf'::character varying"),
                    sort_order = table.Column<short>(type: "smallint", nullable: false),
                    is_published = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("documents_pkey", x => x.id);
                    table.ForeignKey(
                        name: "documents_category_id_fkey",
                        column: x => x.category_id,
                        principalTable: "lesson_categories",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "lessons",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    category_id = table.Column<short>(type: "smallint", nullable: false),
                    lesson_number = table.Column<short>(type: "smallint", nullable: true),
                    filename = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false, comment: "T�n file HTML g?c, d�ng l�m game_id khi luu ti?n d?"),
                    title_cn = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    title_vn = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    icon = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false, defaultValueSql: "'??'::character varying"),
                    description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    badge = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    is_published = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    sort_order = table.Column<short>(type: "smallint", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("lessons_pkey", x => x.id);
                    table.ForeignKey(
                        name: "lessons_category_id_fkey",
                        column: x => x.category_id,
                        principalTable: "lesson_categories",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "role_permissions",
                columns: table => new
                {
                    role_id = table.Column<short>(type: "smallint", nullable: false),
                    permission_id = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("role_permissions_pkey", x => new { x.role_id, x.permission_id });
                    table.ForeignKey(
                        name: "role_permissions_permission_id_fkey",
                        column: x => x.permission_id,
                        principalTable: "permissions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "role_permissions_role_id_fkey",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "import_jobs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    uploaded_by = table.Column<Guid>(type: "uuid", nullable: false),
                    file_name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValueSql: "'pending'::character varying"),
                    total_rows = table.Column<int>(type: "integer", nullable: false),
                    processed_rows = table.Column<int>(type: "integer", nullable: false),
                    failed_rows = table.Column<int>(type: "integer", nullable: false),
                    error_log = table.Column<string>(type: "jsonb", nullable: true),
                    category_id = table.Column<short>(type: "smallint", nullable: true),
                    started_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    finished_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("import_jobs_pkey", x => x.id);
                    table.ForeignKey(
                        name: "import_jobs_category_id_fkey",
                        column: x => x.category_id,
                        principalTable: "lesson_categories",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "import_jobs_uploaded_by_fkey",
                        column: x => x.uploaded_by,
                        principalTable: "users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "media_files",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    owner_type = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    owner_id = table.Column<Guid>(type: "uuid", nullable: false),
                    media_type = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    file_name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    storage_key = table.Column<string>(type: "text", nullable: false),
                    cdn_url = table.Column<string>(type: "text", nullable: false),
                    mime_type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    file_size_kb = table.Column<int>(type: "integer", nullable: true),
                    uploaded_by = table.Column<Guid>(type: "uuid", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("media_files_pkey", x => x.id);
                    table.ForeignKey(
                        name: "media_files_uploaded_by_fkey",
                        column: x => x.uploaded_by,
                        principalTable: "users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "user_roles",
                columns: table => new
                {
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    role_id = table.Column<short>(type: "smallint", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("user_roles_pkey", x => new { x.user_id, x.role_id });
                    table.ForeignKey(
                        name: "user_roles_role_id_fkey",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "user_roles_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_sessions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    refresh_token = table.Column<string>(type: "text", nullable: false),
                    ip_address = table.Column<IPAddress>(type: "inet", nullable: true),
                    user_agent = table.Column<string>(type: "text", nullable: true),
                    expires_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("user_sessions_pkey", x => x.id);
                    table.ForeignKey(
                        name: "user_sessions_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "challenge_words",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    lesson_id = table.Column<Guid>(type: "uuid", nullable: false),
                    sort_order = table.Column<short>(type: "smallint", nullable: false),
                    hanzi = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    pinyin = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    meaning_vn = table.Column<string>(type: "text", nullable: false),
                    example_zh = table.Column<string>(type: "text", nullable: true),
                    example_vn = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("challenge_words_pkey", x => x.id);
                    table.ForeignKey(
                        name: "challenge_words_lesson_id_fkey",
                        column: x => x.lesson_id,
                        principalTable: "lessons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "hanzi_cards",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    lesson_id = table.Column<Guid>(type: "uuid", nullable: false),
                    sort_order = table.Column<short>(type: "smallint", nullable: false),
                    character = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    pinyin = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    meaning = table.Column<string>(type: "text", nullable: false),
                    mnemonic = table.Column<string>(type: "text", nullable: true),
                    stroke_count = table.Column<short>(type: "smallint", nullable: true),
                    radical = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("hanzi_cards_pkey", x => x.id);
                    table.ForeignKey(
                        name: "hanzi_cards_lesson_id_fkey",
                        column: x => x.lesson_id,
                        principalTable: "lessons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "quiz_questions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    lesson_id = table.Column<Guid>(type: "uuid", nullable: false),
                    sort_order = table.Column<short>(type: "smallint", nullable: false),
                    question = table.Column<string>(type: "text", nullable: false),
                    explanation = table.Column<string>(type: "text", nullable: false),
                    difficulty = table.Column<short>(type: "smallint", nullable: false, defaultValue: (short)1)
                },
                constraints: table =>
                {
                    table.PrimaryKey("quiz_questions_pkey", x => x.id);
                    table.ForeignKey(
                        name: "quiz_questions_lesson_id_fkey",
                        column: x => x.lesson_id,
                        principalTable: "lessons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "radical_sets",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    set_number = table.Column<short>(type: "smallint", nullable: false),
                    title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    icon = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false, defaultValueSql: "'??'::character varying"),
                    lesson_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("radical_sets_pkey", x => x.id);
                    table.ForeignKey(
                        name: "radical_sets_lesson_id_fkey",
                        column: x => x.lesson_id,
                        principalTable: "lessons",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "user_progress",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    lesson_id = table.Column<Guid>(type: "uuid", nullable: false),
                    score = table.Column<short>(type: "smallint", nullable: false),
                    completed = table.Column<bool>(type: "boolean", nullable: false),
                    attempts = table.Column<short>(type: "smallint", nullable: false, defaultValue: (short)1),
                    time_spent_s = table.Column<int>(type: "integer", nullable: false),
                    last_played = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("user_progress_pkey", x => x.id);
                    table.ForeignKey(
                        name: "user_progress_lesson_id_fkey",
                        column: x => x.lesson_id,
                        principalTable: "lessons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "user_progress_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "vocabulary",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    lesson_id = table.Column<Guid>(type: "uuid", nullable: false),
                    sort_order = table.Column<short>(type: "smallint", nullable: false),
                    word = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    pinyin = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    meaning = table.Column<string>(type: "text", nullable: false),
                    MeaningEn = table.Column<string>(type: "text", nullable: true),
                    AudioUrl = table.Column<string>(type: "text", nullable: true),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    ExampleCn = table.Column<string>(type: "text", nullable: true),
                    ExamplePy = table.Column<string>(type: "text", nullable: true),
                    ExampleVn = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("vocabulary_pkey", x => x.id);
                    table.ForeignKey(
                        name: "vocabulary_lesson_id_fkey",
                        column: x => x.lesson_id,
                        principalTable: "lessons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "quiz_options",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    question_id = table.Column<Guid>(type: "uuid", nullable: false),
                    sort_order = table.Column<short>(type: "smallint", nullable: false),
                    option_text = table.Column<string>(type: "text", nullable: false),
                    is_correct = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("quiz_options_pkey", x => x.id);
                    table.ForeignKey(
                        name: "quiz_options_question_id_fkey",
                        column: x => x.question_id,
                        principalTable: "quiz_questions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "radicals",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    set_id = table.Column<Guid>(type: "uuid", nullable: false),
                    sort_order = table.Column<short>(type: "smallint", nullable: false),
                    radical = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    meaning = table.Column<string>(type: "text", nullable: true),
                    example_chars = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("radicals_pkey", x => x.id);
                    table.ForeignKey(
                        name: "radicals_set_id_fkey",
                        column: x => x.set_id,
                        principalTable: "radical_sets",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "search_history",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    query = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    vocab_id = table.Column<Guid>(type: "uuid", nullable: true),
                    searched_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("search_history_pkey", x => x.id);
                    table.ForeignKey(
                        name: "search_history_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "search_history_vocab_id_fkey",
                        column: x => x.vocab_id,
                        principalTable: "vocabulary",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "user_word_progress",
                columns: table => new
                {
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    vocab_id = table.Column<Guid>(type: "uuid", nullable: false),
                    status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValueSql: "'learning'::character varying"),
                    review_count = table.Column<short>(type: "smallint", nullable: false),
                    last_reviewed = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("user_word_progress_pkey", x => new { x.user_id, x.vocab_id });
                    table.ForeignKey(
                        name: "user_word_progress_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "user_word_progress_vocab_id_fkey",
                        column: x => x.vocab_id,
                        principalTable: "vocabulary",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Luu l?ch s? h?c t?p/tra c?u c?a t?ng t? v?ng ri�ng bi?t");

            migrationBuilder.CreateIndex(
                name: "idx_challenge_words_lesson",
                table: "challenge_words",
                columns: new[] { "lesson_id", "sort_order" });

            migrationBuilder.CreateIndex(
                name: "idx_docs_category",
                table: "documents",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "idx_hanzi_lesson",
                table: "hanzi_cards",
                columns: new[] { "lesson_id", "sort_order" });

            migrationBuilder.CreateIndex(
                name: "IX_import_jobs_category_id",
                table: "import_jobs",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "IX_import_jobs_uploaded_by",
                table: "import_jobs",
                column: "uploaded_by");

            migrationBuilder.CreateIndex(
                name: "lesson_categories_slug_key",
                table: "lesson_categories",
                column: "slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_lessons_category",
                table: "lessons",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "idx_lessons_filename",
                table: "lessons",
                column: "filename");

            migrationBuilder.CreateIndex(
                name: "idx_media_owner",
                table: "media_files",
                columns: new[] { "owner_type", "owner_id" });

            migrationBuilder.CreateIndex(
                name: "IX_media_files_uploaded_by",
                table: "media_files",
                column: "uploaded_by");

            migrationBuilder.CreateIndex(
                name: "permissions_code_key",
                table: "permissions",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_quiz_options_question",
                table: "quiz_options",
                columns: new[] { "question_id", "sort_order" });

            migrationBuilder.CreateIndex(
                name: "idx_quiz_lesson",
                table: "quiz_questions",
                columns: new[] { "lesson_id", "sort_order" });

            migrationBuilder.CreateIndex(
                name: "IX_radical_sets_lesson_id",
                table: "radical_sets",
                column: "lesson_id");

            migrationBuilder.CreateIndex(
                name: "radical_sets_set_number_key",
                table: "radical_sets",
                column: "set_number",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_radicals_set_id",
                table: "radicals",
                column: "set_id");

            migrationBuilder.CreateIndex(
                name: "idx_role_permissions_role",
                table: "role_permissions",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "IX_role_permissions_permission_id",
                table: "role_permissions",
                column: "permission_id");

            migrationBuilder.CreateIndex(
                name: "roles_code_key",
                table: "roles",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_search_user",
                table: "search_history",
                columns: new[] { "user_id", "searched_at" },
                descending: new[] { false, true });

            migrationBuilder.CreateIndex(
                name: "IX_search_history_vocab_id",
                table: "search_history",
                column: "vocab_id");

            migrationBuilder.CreateIndex(
                name: "idx_progress_completed",
                table: "user_progress",
                columns: new[] { "user_id", "completed" });

            migrationBuilder.CreateIndex(
                name: "idx_progress_lesson",
                table: "user_progress",
                column: "lesson_id");

            migrationBuilder.CreateIndex(
                name: "idx_progress_user",
                table: "user_progress",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "user_progress_user_id_lesson_id_key",
                table: "user_progress",
                columns: new[] { "user_id", "lesson_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_user_roles_user",
                table: "user_roles",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_roles_role_id",
                table: "user_roles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "idx_sessions_expires",
                table: "user_sessions",
                column: "expires_at");

            migrationBuilder.CreateIndex(
                name: "idx_sessions_token",
                table: "user_sessions",
                column: "refresh_token");

            migrationBuilder.CreateIndex(
                name: "idx_sessions_user",
                table: "user_sessions",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "user_sessions_refresh_token_key",
                table: "user_sessions",
                column: "refresh_token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_word_progress_vocab_id",
                table: "user_word_progress",
                column: "vocab_id");

            migrationBuilder.CreateIndex(
                name: "users_email_key",
                table: "users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "users_username_key",
                table: "users",
                column: "username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_vocab_lesson",
                table: "vocabulary",
                columns: new[] { "lesson_id", "sort_order" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "challenge_words");

            migrationBuilder.DropTable(
                name: "documents");

            migrationBuilder.DropTable(
                name: "hanzi_cards");

            migrationBuilder.DropTable(
                name: "import_jobs");

            migrationBuilder.DropTable(
                name: "media_files");

            migrationBuilder.DropTable(
                name: "quiz_options");

            migrationBuilder.DropTable(
                name: "radicals");

            migrationBuilder.DropTable(
                name: "role_permissions");

            migrationBuilder.DropTable(
                name: "search_history");

            migrationBuilder.DropTable(
                name: "user_progress");

            migrationBuilder.DropTable(
                name: "user_roles");

            migrationBuilder.DropTable(
                name: "user_sessions");

            migrationBuilder.DropTable(
                name: "user_word_progress");

            migrationBuilder.DropTable(
                name: "quiz_questions");

            migrationBuilder.DropTable(
                name: "radical_sets");

            migrationBuilder.DropTable(
                name: "permissions");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "vocabulary");

            migrationBuilder.DropTable(
                name: "lessons");

            migrationBuilder.DropTable(
                name: "lesson_categories");
        }
    }
}
