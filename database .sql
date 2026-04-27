CREATE TABLE "__EFMigrationsHistory" (
  "MigrationId" varchar(150) PRIMARY KEY NOT NULL,
  "ProductVersion" varchar(32) NOT NULL
);

CREATE TABLE "challenge_words" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "lesson_id" uuid NOT NULL,
  "sort_order" int2 NOT NULL DEFAULT 0,
  "hanzi" varchar(50) NOT NULL,
  "pinyin" varchar(100) NOT NULL,
  "meaning_vn" text NOT NULL,
  "example_zh" text,
  "example_vn" text
);

CREATE TABLE "documents" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "category_id" int2 NOT NULL,
  "title" text NOT NULL,
  "description" text,
  "download_url" text NOT NULL,
  "doc_type" varchar(30) NOT NULL CHECK ((doc_type)::text = ANY (ARRAY[('pdf'::character varying)::text, ('ppt'::character varying)::text, ('drive_folder'::character varying)::text, ('audio'::character varying)::text, ('other'::character varying)::text])) DEFAULT 'pdf',
  "sort_order" int2 NOT NULL DEFAULT 0,
  "is_published" bool NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "hanzi_cards" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "lesson_id" uuid NOT NULL,
  "sort_order" int2 NOT NULL DEFAULT 0,
  "character" varchar(10) NOT NULL,
  "pinyin" varchar(50) NOT NULL,
  "meaning" text NOT NULL,
  "mnemonic" text,
  "stroke_count" int2,
  "radical" varchar(10)
);

CREATE TABLE "import_jobs" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "uploaded_by" uuid NOT NULL,
  "file_name" varchar(255) NOT NULL,
  "status" varchar(20) NOT NULL CHECK ((status)::text = ANY (ARRAY[('pending'::character varying)::text, ('processing'::character varying)::text, ('done'::character varying)::text, ('failed'::character varying)::text])) DEFAULT 'pending',
  "total_rows" int4 NOT NULL DEFAULT 0,
  "processed_rows" int4 NOT NULL DEFAULT 0,
  "failed_rows" int4 NOT NULL DEFAULT 0,
  "error_log" jsonb,
  "category_id" int2,
  "started_at" timestamptz,
  "finished_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "LessonId" uuid
);

CREATE TABLE "lesson_categories" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "slug" varchar(30) UNIQUE NOT NULL,
  "name" varchar(80) NOT NULL,
  "sort_order" int2 NOT NULL DEFAULT 0
);

CREATE TABLE "lessons" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "category_id" int2 NOT NULL,
  "lesson_number" int2,
  "filename" varchar(120) NOT NULL,
  "title_cn" varchar(200),
  "title_vn" varchar(500),
  "icon" varchar(10) NOT NULL DEFAULT '📚',
  "description" varchar(200),
  "badge" varchar(20),
  "is_published" bool NOT NULL DEFAULT true,
  "sort_order" int2 NOT NULL DEFAULT 0,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "media_files" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "owner_type" varchar(30) NOT NULL,
  "owner_id" uuid NOT NULL,
  "media_type" varchar(10) NOT NULL CHECK ((media_type)::text = ANY (ARRAY[('image'::character varying)::text, ('audio'::character varying)::text])),
  "file_name" varchar(255) NOT NULL,
  "storage_key" text NOT NULL,
  "cdn_url" text NOT NULL,
  "mime_type" varchar(50),
  "file_size_kb" int4,
  "uploaded_by" uuid,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "permissions" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "code" varchar(50) UNIQUE NOT NULL,
  "name" varchar(100) NOT NULL,
  "description" text
);

CREATE TABLE "quiz_options" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "question_id" uuid NOT NULL,
  "sort_order" int2 NOT NULL DEFAULT 0,
  "option_text" text NOT NULL,
  "is_correct" bool NOT NULL DEFAULT false
);

CREATE TABLE "quiz_questions" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "lesson_id" uuid NOT NULL,
  "sort_order" int2 NOT NULL DEFAULT 0,
  "question" text NOT NULL,
  "explanation" text NOT NULL,
  "difficulty" int2 NOT NULL CHECK ((difficulty >= 1) AND (difficulty <= 5)) DEFAULT 1
);

CREATE TABLE "radical_sets" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "set_number" int2 UNIQUE NOT NULL,
  "title" varchar(100) NOT NULL,
  "icon" varchar(10) NOT NULL DEFAULT '🌱',
  "lesson_id" uuid
);

CREATE TABLE "radicals" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "set_id" uuid NOT NULL,
  "sort_order" int2 NOT NULL DEFAULT 0,
  "radical" varchar(10) NOT NULL,
  "name" varchar(50) NOT NULL,
  "meaning" text,
  "example_chars" text
);

CREATE TABLE "role_permissions" (
  "role_id" int2 NOT NULL,
  "permission_id" int2 NOT NULL,
  PRIMARY KEY ("role_id", "permission_id")
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "code" varchar(50) UNIQUE NOT NULL,
  "name" varchar(100) NOT NULL,
  "description" text
);

CREATE TABLE "search_history" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "user_id" uuid NOT NULL,
  "query" varchar(200) NOT NULL,
  "vocab_id" uuid,
  "searched_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "user_progress" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "user_id" uuid NOT NULL,
  "lesson_id" uuid NOT NULL,
  "score" int2 NOT NULL CHECK ((score >= 0) AND (score <= 100)) DEFAULT 0,
  "completed" bool NOT NULL DEFAULT false,
  "attempts" int2 NOT NULL DEFAULT 1,
  "time_spent_s" int4 NOT NULL DEFAULT 0,
  "last_played" timestamptz NOT NULL DEFAULT (now()),
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "current_index" int4 DEFAULT 0
);

CREATE TABLE "user_roles" (
  "user_id" uuid NOT NULL,
  "role_id" int2 NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  PRIMARY KEY ("user_id", "role_id")
);

CREATE TABLE "user_sessions" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "user_id" uuid NOT NULL,
  "refresh_token" text UNIQUE NOT NULL,
  "ip_address" inet,
  "user_agent" text,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "user_word_progress" (
  "user_id" uuid NOT NULL,
  "vocab_id" uuid NOT NULL,
  "status" varchar(20) NOT NULL DEFAULT 'learning',
  "review_count" int2 NOT NULL DEFAULT 0,
  "last_reviewed" timestamptz NOT NULL DEFAULT (now()),
  PRIMARY KEY ("user_id", "vocab_id")
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "username" varchar(50) UNIQUE NOT NULL,
  "password_hash" text NOT NULL,
  "display_name" varchar(100),
  "email" varchar(150) UNIQUE,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "last_login_at" timestamptz
);

CREATE TABLE "vocabulary" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "lesson_id" uuid NOT NULL,
  "sort_order" int2 NOT NULL DEFAULT 0,
  "word" varchar(50) NOT NULL,
  "pinyin" varchar(100) NOT NULL,
  "meaning" text NOT NULL,
  "example_cn" text,
  "example_py" text,
  "example_vn" text,
  "audio_url" text,
  "meaning_en" varchar(255),
  "image_url" text,
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "system_logs" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "log_level" varchar(20),
  "message" text,
  "exception" text,
  "trace_id" varchar(100),
  "user_id" varchar(100),
  "user_name" varchar(100),
  "request_path" varchar(255),
  "request_method" varchar(10),
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "review_history" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
  "user_id" uuid NOT NULL,
  "lesson_id" uuid NOT NULL,
  "score" int2 NOT NULL,
  "total_questions" int2 NOT NULL,
  "correct_count" int2 NOT NULL,
  "details_json" jsonb,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "logs" (
  "message" text,
  "message_template" text,
  "level" int4,
  "timestamp" timestamp,
  "exception" text,
  "log_event" jsonb
);

CREATE INDEX "idx_challenge_words_lesson" ON "challenge_words" USING BTREE ("lesson_id", "sort_order");

CREATE INDEX "idx_docs_category" ON "documents" USING BTREE ("category_id");

CREATE INDEX "idx_hanzi_lesson" ON "hanzi_cards" USING BTREE ("lesson_id", "sort_order");

CREATE INDEX "idx_lessons_category" ON "lessons" USING BTREE ("category_id");

CREATE INDEX "idx_lessons_filename" ON "lessons" USING BTREE ("filename");

CREATE INDEX "idx_media_owner" ON "media_files" USING BTREE ("owner_type", "owner_id");

CREATE INDEX "idx_quiz_options_question" ON "quiz_options" USING BTREE ("question_id", "sort_order");

CREATE INDEX "idx_quiz_lesson" ON "quiz_questions" USING BTREE ("lesson_id", "sort_order");

CREATE INDEX "idx_role_permissions_role" ON "role_permissions" USING BTREE ("role_id");

CREATE INDEX "idx_search_user" ON "search_history" USING BTREE ("user_id", "searched_at");

CREATE UNIQUE INDEX "user_progress_user_id_lesson_id_key" ON "user_progress" USING BTREE ("user_id", "lesson_id");

CREATE INDEX "idx_progress_completed" ON "user_progress" USING BTREE ("user_id", "completed");

CREATE INDEX "idx_progress_lesson" ON "user_progress" USING BTREE ("lesson_id");

CREATE INDEX "idx_progress_user" ON "user_progress" USING BTREE ("user_id");

CREATE INDEX "idx_user_roles_user" ON "user_roles" USING BTREE ("user_id");

CREATE INDEX "idx_sessions_expires" ON "user_sessions" USING BTREE ("expires_at");

CREATE INDEX "idx_sessions_token" ON "user_sessions" USING BTREE ("refresh_token");

CREATE INDEX "idx_sessions_user" ON "user_sessions" USING BTREE ("user_id");

CREATE INDEX "idx_vocab_lesson" ON "vocabulary" USING BTREE ("lesson_id", "sort_order");

CREATE INDEX "idx_review_history_lesson" ON "review_history" USING BTREE ("lesson_id");

CREATE INDEX "idx_review_history_user" ON "review_history" USING BTREE ("user_id");

COMMENT ON COLUMN "lessons"."filename" IS 'Tên file HTML gốc, dùng làm game_id khi lưu tiến độ';

COMMENT ON TABLE "user_word_progress" IS 'Lưu lịch sử học tập/tra cứu của từng từ vựng riêng biệt';

COMMENT ON TABLE "users" IS 'Tài khoản học viên và quản trị viên';

COMMENT ON COLUMN "users"."password_hash" IS 'bcrypt hash, cost=12';

ALTER TABLE "challenge_words" ADD CONSTRAINT "challenge_words_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "documents" ADD CONSTRAINT "documents_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "lesson_categories" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "hanzi_cards" ADD CONSTRAINT "hanzi_cards_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "import_jobs" ADD CONSTRAINT "import_jobs_LessonId_fkey" FOREIGN KEY ("LessonId") REFERENCES "lessons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "import_jobs" ADD CONSTRAINT "import_jobs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "lesson_categories" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "import_jobs" ADD CONSTRAINT "import_jobs_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "lessons" ADD CONSTRAINT "lessons_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "lesson_categories" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "media_files" ADD CONSTRAINT "media_files_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "quiz_options" ADD CONSTRAINT "quiz_options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "quiz_questions" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "radical_sets" ADD CONSTRAINT "radical_sets_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "radicals" ADD CONSTRAINT "radicals_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "radical_sets" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "review_history" ADD CONSTRAINT "review_history_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "review_history" ADD CONSTRAINT "review_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "search_history" ADD CONSTRAINT "search_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "search_history" ADD CONSTRAINT "search_history_vocab_id_fkey" FOREIGN KEY ("vocab_id") REFERENCES "vocabulary" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_word_progress" ADD CONSTRAINT "user_word_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_word_progress" ADD CONSTRAINT "user_word_progress_vocab_id_fkey" FOREIGN KEY ("vocab_id") REFERENCES "vocabulary" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "vocabulary" ADD CONSTRAINT "vocabulary_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;
