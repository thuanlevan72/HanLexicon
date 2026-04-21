using System;
using System.Collections.Generic;
using Infrastructure.Postgres;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Postgres.Persistence;

public partial class HanLexiconDbContext : DbContext
{
    public HanLexiconDbContext(DbContextOptions<HanLexiconDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ChallengeWord> ChallengeWords { get; set; }

    public virtual DbSet<Document> Documents { get; set; }

    public virtual DbSet<HanziCard> HanziCards { get; set; }

    public virtual DbSet<ImportJob> ImportJobs { get; set; }

    public virtual DbSet<Lesson> Lessons { get; set; }

    public virtual DbSet<LessonCategory> LessonCategories { get; set; }

    public virtual DbSet<MediaFile> MediaFiles { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<QuizOption> QuizOptions { get; set; }

    public virtual DbSet<QuizQuestion> QuizQuestions { get; set; }

    public virtual DbSet<Radical> Radicals { get; set; }

    public virtual DbSet<RadicalSet> RadicalSets { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SearchHistory> SearchHistories { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserProgress> UserProgresses { get; set; }

    public virtual DbSet<UserRole> UserRoles { get; set; }

    public virtual DbSet<UserSession> UserSessions { get; set; }

    public virtual DbSet<UserWordProgress> UserWordProgresses { get; set; }

    public virtual DbSet<VLessonsSummary> VLessonsSummaries { get; set; }

    public virtual DbSet<VUserStat> VUserStats { get; set; }

    public virtual DbSet<Vocabulary> Vocabularies { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresExtension("pgcrypto")
            .HasPostgresExtension("uuid-ossp");

        modelBuilder.Entity<ChallengeWord>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("challenge_words_pkey");

            entity.ToTable("challenge_words");

            entity.HasIndex(e => new { e.LessonId, e.SortOrder }, "idx_challenge_words_lesson");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.ExampleVn).HasColumnName("example_vn");
            entity.Property(e => e.ExampleZh).HasColumnName("example_zh");
            entity.Property(e => e.Hanzi)
                .HasMaxLength(50)
                .HasColumnName("hanzi");
            entity.Property(e => e.LessonId).HasColumnName("lesson_id");
            entity.Property(e => e.MeaningVn).HasColumnName("meaning_vn");
            entity.Property(e => e.Pinyin)
                .HasMaxLength(100)
                .HasColumnName("pinyin");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");

            entity.HasOne(d => d.Lesson).WithMany(p => p.ChallengeWords)
                .HasForeignKey(d => d.LessonId)
                .HasConstraintName("challenge_words_lesson_id_fkey");
        });

        modelBuilder.Entity<Document>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("documents_pkey");

            entity.ToTable("documents");

            entity.HasIndex(e => e.CategoryId, "idx_docs_category");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.DocType)
                .HasMaxLength(30)
                .HasDefaultValueSql("'pdf'::character varying")
                .HasColumnName("doc_type");
            entity.Property(e => e.DownloadUrl).HasColumnName("download_url");
            entity.Property(e => e.IsPublished)
                .HasDefaultValue(true)
                .HasColumnName("is_published");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");
            entity.Property(e => e.Title).HasColumnName("title");

            entity.HasOne(d => d.Category).WithMany(p => p.Documents)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("documents_category_id_fkey");
        });

        modelBuilder.Entity<HanziCard>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("hanzi_cards_pkey");

            entity.ToTable("hanzi_cards");

            entity.HasIndex(e => new { e.LessonId, e.SortOrder }, "idx_hanzi_lesson");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.Character)
                .HasMaxLength(10)
                .HasColumnName("character");
            entity.Property(e => e.LessonId).HasColumnName("lesson_id");
            entity.Property(e => e.Meaning).HasColumnName("meaning");
            entity.Property(e => e.Mnemonic).HasColumnName("mnemonic");
            entity.Property(e => e.Pinyin)
                .HasMaxLength(50)
                .HasColumnName("pinyin");
            entity.Property(e => e.Radical)
                .HasMaxLength(10)
                .HasColumnName("radical");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");
            entity.Property(e => e.StrokeCount).HasColumnName("stroke_count");

            entity.HasOne(d => d.Lesson).WithMany(p => p.HanziCards)
                .HasForeignKey(d => d.LessonId)
                .HasConstraintName("hanzi_cards_lesson_id_fkey");
        });

        modelBuilder.Entity<ImportJob>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("import_jobs_pkey");

            entity.ToTable("import_jobs");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.ErrorLog)
                .HasColumnType("jsonb")
                .HasColumnName("error_log");
            entity.Property(e => e.FailedRows).HasColumnName("failed_rows");
            entity.Property(e => e.FileName)
                .HasMaxLength(255)
                .HasColumnName("file_name");
            entity.Property(e => e.FinishedAt).HasColumnName("finished_at");
            entity.Property(e => e.ProcessedRows).HasColumnName("processed_rows");
            entity.Property(e => e.StartedAt).HasColumnName("started_at");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'pending'::character varying")
                .HasColumnName("status");
            entity.Property(e => e.TotalRows).HasColumnName("total_rows");
            entity.Property(e => e.UploadedBy).HasColumnName("uploaded_by");

            entity.HasOne(d => d.Category).WithMany(p => p.ImportJobs)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("import_jobs_category_id_fkey");

            entity.HasOne(d => d.UploadedByNavigation).WithMany(p => p.ImportJobs)
                .HasForeignKey(d => d.UploadedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("import_jobs_uploaded_by_fkey");
        });

        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("lessons_pkey");

            entity.ToTable("lessons");

            entity.HasIndex(e => e.CategoryId, "idx_lessons_category");

            entity.HasIndex(e => e.Filename, "idx_lessons_filename");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.Badge)
                .HasMaxLength(20)
                .HasColumnName("badge");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .HasColumnName("description");
            entity.Property(e => e.Filename)
                .HasMaxLength(120)
                .HasComment("Tên file HTML gốc, dùng làm game_id khi lưu tiến độ")
                .HasColumnName("filename");
            entity.Property(e => e.Icon)
                .HasMaxLength(10)
                .HasDefaultValueSql("'📚'::character varying")
                .HasColumnName("icon");
            entity.Property(e => e.IsPublished)
                .HasDefaultValue(true)
                .HasColumnName("is_published");
            entity.Property(e => e.LessonNumber).HasColumnName("lesson_number");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");
            entity.Property(e => e.TitleCn)
                .HasMaxLength(200)
                .HasColumnName("title_cn");
            entity.Property(e => e.TitleVn)
                .HasMaxLength(500)
                .HasColumnName("title_vn");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Category).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("lessons_category_id_fkey");
        });

        modelBuilder.Entity<LessonCategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("lesson_categories_pkey");

            entity.ToTable("lesson_categories");

            entity.HasIndex(e => e.Slug, "lesson_categories_slug_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(80)
                .HasColumnName("name");
            entity.Property(e => e.Slug)
                .HasMaxLength(30)
                .HasColumnName("slug");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");
        });

        modelBuilder.Entity<MediaFile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("media_files_pkey");

            entity.ToTable("media_files");

            entity.HasIndex(e => new { e.OwnerType, e.OwnerId }, "idx_media_owner");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.CdnUrl).HasColumnName("cdn_url");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.FileName)
                .HasMaxLength(255)
                .HasColumnName("file_name");
            entity.Property(e => e.FileSizeKb).HasColumnName("file_size_kb");
            entity.Property(e => e.MediaType)
                .HasMaxLength(10)
                .HasColumnName("media_type");
            entity.Property(e => e.MimeType)
                .HasMaxLength(50)
                .HasColumnName("mime_type");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.OwnerType)
                .HasMaxLength(30)
                .HasColumnName("owner_type");
            entity.Property(e => e.StorageKey).HasColumnName("storage_key");
            entity.Property(e => e.UploadedBy).HasColumnName("uploaded_by");

            entity.HasOne(d => d.UploadedByNavigation).WithMany(p => p.MediaFiles)
                .HasForeignKey(d => d.UploadedBy)
                .HasConstraintName("media_files_uploaded_by_fkey");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("permissions_pkey");

            entity.ToTable("permissions");

            entity.HasIndex(e => e.Code, "permissions_code_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(50)
                .HasColumnName("code");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<QuizOption>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("quiz_options_pkey");

            entity.ToTable("quiz_options");

            entity.HasIndex(e => new { e.QuestionId, e.SortOrder }, "idx_quiz_options_question");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.IsCorrect).HasColumnName("is_correct");
            entity.Property(e => e.OptionText).HasColumnName("option_text");
            entity.Property(e => e.QuestionId).HasColumnName("question_id");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");

            entity.HasOne(d => d.Question).WithMany(p => p.QuizOptions)
                .HasForeignKey(d => d.QuestionId)
                .HasConstraintName("quiz_options_question_id_fkey");
        });

        modelBuilder.Entity<QuizQuestion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("quiz_questions_pkey");

            entity.ToTable("quiz_questions");

            entity.HasIndex(e => new { e.LessonId, e.SortOrder }, "idx_quiz_lesson");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.Difficulty)
                .HasDefaultValue((short)1)
                .HasColumnName("difficulty");
            entity.Property(e => e.Explanation).HasColumnName("explanation");
            entity.Property(e => e.LessonId).HasColumnName("lesson_id");
            entity.Property(e => e.Question).HasColumnName("question");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");

            entity.HasOne(d => d.Lesson).WithMany(p => p.QuizQuestions)
                .HasForeignKey(d => d.LessonId)
                .HasConstraintName("quiz_questions_lesson_id_fkey");
        });

        modelBuilder.Entity<Radical>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("radicals_pkey");

            entity.ToTable("radicals");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.ExampleChars).HasColumnName("example_chars");
            entity.Property(e => e.Meaning).HasColumnName("meaning");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Radical1)
                .HasMaxLength(10)
                .HasColumnName("radical");
            entity.Property(e => e.SetId).HasColumnName("set_id");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");

            entity.HasOne(d => d.Set).WithMany(p => p.Radicals)
                .HasForeignKey(d => d.SetId)
                .HasConstraintName("radicals_set_id_fkey");
        });

        modelBuilder.Entity<RadicalSet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("radical_sets_pkey");

            entity.ToTable("radical_sets");

            entity.HasIndex(e => e.SetNumber, "radical_sets_set_number_key").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.Icon)
                .HasMaxLength(10)
                .HasDefaultValueSql("'🌱'::character varying")
                .HasColumnName("icon");
            entity.Property(e => e.LessonId).HasColumnName("lesson_id");
            entity.Property(e => e.SetNumber).HasColumnName("set_number");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");

            entity.HasOne(d => d.Lesson).WithMany(p => p.RadicalSets)
                .HasForeignKey(d => d.LessonId)
                .HasConstraintName("radical_sets_lesson_id_fkey");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("roles_pkey");

            entity.ToTable("roles");

            entity.HasIndex(e => e.Code, "roles_code_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(50)
                .HasColumnName("code");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");

            entity.HasMany(d => d.Permissions).WithMany(p => p.Roles)
                .UsingEntity<Dictionary<string, object>>(
                    "RolePermission",
                    r => r.HasOne<Permission>().WithMany()
                        .HasForeignKey("PermissionId")
                        .HasConstraintName("role_permissions_permission_id_fkey"),
                    l => l.HasOne<Role>().WithMany()
                        .HasForeignKey("RoleId")
                        .HasConstraintName("role_permissions_role_id_fkey"),
                    j =>
                    {
                        j.HasKey("RoleId", "PermissionId").HasName("role_permissions_pkey");
                        j.ToTable("role_permissions");
                        j.HasIndex(new[] { "RoleId" }, "idx_role_permissions_role");
                        j.IndexerProperty<short>("RoleId").HasColumnName("role_id");
                        j.IndexerProperty<short>("PermissionId").HasColumnName("permission_id");
                    });
        });

        modelBuilder.Entity<SearchHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("search_history_pkey");

            entity.ToTable("search_history");

            entity.HasIndex(e => new { e.UserId, e.SearchedAt }, "idx_search_user").IsDescending(false, true);

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.Query)
                .HasMaxLength(200)
                .HasColumnName("query");
            entity.Property(e => e.SearchedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("searched_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.VocabId).HasColumnName("vocab_id");

            entity.HasOne(d => d.User).WithMany(p => p.SearchHistories)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("search_history_user_id_fkey");

            entity.HasOne(d => d.Vocab).WithMany(p => p.SearchHistories)
                .HasForeignKey(d => d.VocabId)
                .HasConstraintName("search_history_vocab_id_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users", tb => tb.HasComment("Tài khoản học viên và quản trị viên"));

            entity.HasIndex(e => e.Email, "users_email_key").IsUnique();

            entity.HasIndex(e => e.Username, "users_username_key").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.DisplayName)
                .HasMaxLength(100)
                .HasColumnName("display_name");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .HasColumnName("email");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.LastLoginAt).HasColumnName("last_login_at");
            entity.Property(e => e.PasswordHash)
                .HasComment("bcrypt hash, cost=12")
                .HasColumnName("password_hash");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<UserProgress>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("user_progress_pkey");

            entity.ToTable("user_progress");

            entity.HasIndex(e => new { e.UserId, e.Completed }, "idx_progress_completed");

            entity.HasIndex(e => e.LessonId, "idx_progress_lesson");

            entity.HasIndex(e => e.UserId, "idx_progress_user");

            entity.HasIndex(e => new { e.UserId, e.LessonId }, "user_progress_user_id_lesson_id_key").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.Attempts)
                .HasDefaultValue((short)1)
                .HasColumnName("attempts");
            entity.Property(e => e.Completed).HasColumnName("completed");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.LastPlayed)
                .HasDefaultValueSql("now()")
                .HasColumnName("last_played");
            entity.Property(e => e.LessonId).HasColumnName("lesson_id");
            entity.Property(e => e.Score).HasColumnName("score");
            entity.Property(e => e.TimeSpentS).HasColumnName("time_spent_s");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Lesson).WithMany(p => p.UserProgresses)
                .HasForeignKey(d => d.LessonId)
                .HasConstraintName("user_progress_lesson_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.UserProgresses)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("user_progress_user_id_fkey");
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.RoleId }).HasName("user_roles_pkey");

            entity.ToTable("user_roles");

            entity.HasIndex(e => e.UserId, "idx_user_roles_user");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");

            entity.HasOne(d => d.Role).WithMany(p => p.UserRoles)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("user_roles_role_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.UserRoles)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("user_roles_user_id_fkey");
        });

        modelBuilder.Entity<UserSession>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("user_sessions_pkey");

            entity.ToTable("user_sessions");

            entity.HasIndex(e => e.ExpiresAt, "idx_sessions_expires");

            entity.HasIndex(e => e.RefreshToken, "idx_sessions_token");

            entity.HasIndex(e => e.UserId, "idx_sessions_user");

            entity.HasIndex(e => e.RefreshToken, "user_sessions_refresh_token_key").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.ExpiresAt).HasColumnName("expires_at");
            entity.Property(e => e.IpAddress).HasColumnName("ip_address");
            entity.Property(e => e.RefreshToken).HasColumnName("refresh_token");
            entity.Property(e => e.UserAgent).HasColumnName("user_agent");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.UserSessions)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("user_sessions_user_id_fkey");
        });

        modelBuilder.Entity<UserWordProgress>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.VocabId }).HasName("user_word_progress_pkey");

            entity.ToTable("user_word_progress", tb => tb.HasComment("Lưu lịch sử học tập/tra cứu của từng từ vựng riêng biệt"));

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.VocabId).HasColumnName("vocab_id");
            entity.Property(e => e.LastReviewed)
                .HasDefaultValueSql("now()")
                .HasColumnName("last_reviewed");
            entity.Property(e => e.ReviewCount).HasColumnName("review_count");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'learning'::character varying")
                .HasColumnName("status");

            entity.HasOne(d => d.User).WithMany(p => p.UserWordProgresses)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("user_word_progress_user_id_fkey");

            entity.HasOne(d => d.Vocab).WithMany(p => p.UserWordProgresses)
                .HasForeignKey(d => d.VocabId)
                .HasConstraintName("user_word_progress_vocab_id_fkey");
        });

        modelBuilder.Entity<VLessonsSummary>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("v_lessons_summary");

            entity.Property(e => e.Badge)
                .HasMaxLength(20)
                .HasColumnName("badge");
            entity.Property(e => e.Category)
                .HasMaxLength(30)
                .HasColumnName("category");
            entity.Property(e => e.Filename)
                .HasMaxLength(120)
                .HasColumnName("filename");
            entity.Property(e => e.HanziCount).HasColumnName("hanzi_count");
            entity.Property(e => e.Icon)
                .HasMaxLength(10)
                .HasColumnName("icon");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.LessonNumber).HasColumnName("lesson_number");
            entity.Property(e => e.QuizCount).HasColumnName("quiz_count");
            entity.Property(e => e.TitleCn)
                .HasMaxLength(200)
                .HasColumnName("title_cn");
            entity.Property(e => e.TitleVn)
                .HasMaxLength(500)
                .HasColumnName("title_vn");
            entity.Property(e => e.VocabCount).HasColumnName("vocab_count");
        });

        modelBuilder.Entity<VUserStat>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("v_user_stats");

            entity.Property(e => e.AvgScore).HasColumnName("avg_score");
            entity.Property(e => e.DisplayName)
                .HasMaxLength(100)
                .HasColumnName("display_name");
            entity.Property(e => e.LessonsCompleted).HasColumnName("lessons_completed");
            entity.Property(e => e.LessonsStarted).HasColumnName("lessons_started");
            entity.Property(e => e.TotalTimeSeconds).HasColumnName("total_time_seconds");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Vocabulary>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("vocabulary_pkey");

            entity.ToTable("vocabulary");

            entity.HasIndex(e => new { e.LessonId, e.SortOrder }, "idx_vocab_lesson");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("id");
            entity.Property(e => e.AudioUrl).HasColumnName("audio_url");
            entity.Property(e => e.ExampleCn).HasColumnName("example_cn");
            entity.Property(e => e.ExamplePy).HasColumnName("example_py");
            entity.Property(e => e.ExampleVn).HasColumnName("example_vn");
            entity.Property(e => e.ImageUrl).HasColumnName("image_url");
            entity.Property(e => e.LessonId).HasColumnName("lesson_id");
            entity.Property(e => e.Meaning).HasColumnName("meaning");
            entity.Property(e => e.MeaningEn)
                .HasMaxLength(255)
                .HasColumnName("meaning_en");
            entity.Property(e => e.Pinyin)
                .HasMaxLength(100)
                .HasColumnName("pinyin");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");
            entity.Property(e => e.Word)
                .HasMaxLength(50)
                .HasColumnName("word");

            entity.HasOne(d => d.Lesson).WithMany(p => p.Vocabularies)
                .HasForeignKey(d => d.LessonId)
                .HasConstraintName("vocabulary_lesson_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
