--
-- PostgreSQL database dump
--

\restrict HQzudgo9NuVPFYd8MurX3Q3Eh3lsG1oKq2Cph9zdvGlr53feRh0o3u0FckiQIKB

-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP POLICY "Users see own progress" ON public.user_progress;
DROP POLICY "Admins see all progress" ON public.user_progress;
ALTER TABLE ONLY public.vocabulary DROP CONSTRAINT vocabulary_lesson_id_fkey;
ALTER TABLE ONLY public.user_word_progress DROP CONSTRAINT user_word_progress_vocab_id_fkey;
ALTER TABLE ONLY public.user_word_progress DROP CONSTRAINT user_word_progress_user_id_fkey;
ALTER TABLE ONLY public.user_sessions DROP CONSTRAINT user_sessions_user_id_fkey;
ALTER TABLE ONLY public.user_roles DROP CONSTRAINT user_roles_user_id_fkey;
ALTER TABLE ONLY public.user_roles DROP CONSTRAINT user_roles_role_id_fkey;
ALTER TABLE ONLY public.user_progress DROP CONSTRAINT user_progress_user_id_fkey;
ALTER TABLE ONLY public.user_progress DROP CONSTRAINT user_progress_lesson_id_fkey;
ALTER TABLE ONLY public.search_history DROP CONSTRAINT search_history_vocab_id_fkey;
ALTER TABLE ONLY public.search_history DROP CONSTRAINT search_history_user_id_fkey;
ALTER TABLE ONLY public.role_permissions DROP CONSTRAINT role_permissions_role_id_fkey;
ALTER TABLE ONLY public.role_permissions DROP CONSTRAINT role_permissions_permission_id_fkey;
ALTER TABLE ONLY public.radicals DROP CONSTRAINT radicals_set_id_fkey;
ALTER TABLE ONLY public.radical_sets DROP CONSTRAINT radical_sets_lesson_id_fkey;
ALTER TABLE ONLY public.quiz_questions DROP CONSTRAINT quiz_questions_lesson_id_fkey;
ALTER TABLE ONLY public.quiz_options DROP CONSTRAINT quiz_options_question_id_fkey;
ALTER TABLE ONLY public.media_files DROP CONSTRAINT media_files_uploaded_by_fkey;
ALTER TABLE ONLY public.lessons DROP CONSTRAINT lessons_category_id_fkey;
ALTER TABLE ONLY public.import_jobs DROP CONSTRAINT import_jobs_uploaded_by_fkey;
ALTER TABLE ONLY public.import_jobs DROP CONSTRAINT import_jobs_category_id_fkey;
ALTER TABLE ONLY public.hanzi_cards DROP CONSTRAINT hanzi_cards_lesson_id_fkey;
ALTER TABLE ONLY public.documents DROP CONSTRAINT documents_category_id_fkey;
ALTER TABLE ONLY public.challenge_words DROP CONSTRAINT challenge_words_lesson_id_fkey;
DROP TRIGGER trg_lessons_updated_at ON public.lessons;
CREATE OR REPLACE VIEW public.v_lessons_summary AS
SELECT
    NULL::uuid AS id,
    NULL::character varying(30) AS category,
    NULL::smallint AS lesson_number,
    NULL::character varying(120) AS filename,
    NULL::character varying(200) AS title_cn,
    NULL::character varying(500) AS title_vn,
    NULL::character varying(10) AS icon,
    NULL::character varying(20) AS badge,
    NULL::bigint AS hanzi_count,
    NULL::bigint AS vocab_count,
    NULL::bigint AS quiz_count;
DROP INDEX public.idx_vocab_lesson;
DROP INDEX public.idx_user_roles_user;
DROP INDEX public.idx_sessions_user;
DROP INDEX public.idx_sessions_token;
DROP INDEX public.idx_sessions_expires;
DROP INDEX public.idx_search_user;
DROP INDEX public.idx_role_permissions_role;
DROP INDEX public.idx_quiz_options_question;
DROP INDEX public.idx_quiz_lesson;
DROP INDEX public.idx_progress_user;
DROP INDEX public.idx_progress_lesson;
DROP INDEX public.idx_progress_completed;
DROP INDEX public.idx_media_owner;
DROP INDEX public.idx_lessons_filename;
DROP INDEX public.idx_lessons_category;
DROP INDEX public.idx_hanzi_lesson;
DROP INDEX public.idx_docs_category;
DROP INDEX public.idx_challenge_words_lesson;
ALTER TABLE ONLY public.vocabulary DROP CONSTRAINT vocabulary_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.user_word_progress DROP CONSTRAINT user_word_progress_pkey;
ALTER TABLE ONLY public.user_sessions DROP CONSTRAINT user_sessions_refresh_token_key;
ALTER TABLE ONLY public.user_sessions DROP CONSTRAINT user_sessions_pkey;
ALTER TABLE ONLY public.user_roles DROP CONSTRAINT user_roles_pkey;
ALTER TABLE ONLY public.user_progress DROP CONSTRAINT user_progress_user_id_lesson_id_key;
ALTER TABLE ONLY public.user_progress DROP CONSTRAINT user_progress_pkey;
ALTER TABLE ONLY public.search_history DROP CONSTRAINT search_history_pkey;
ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_code_key;
ALTER TABLE ONLY public.role_permissions DROP CONSTRAINT role_permissions_pkey;
ALTER TABLE ONLY public.radicals DROP CONSTRAINT radicals_pkey;
ALTER TABLE ONLY public.radical_sets DROP CONSTRAINT radical_sets_set_number_key;
ALTER TABLE ONLY public.radical_sets DROP CONSTRAINT radical_sets_pkey;
ALTER TABLE ONLY public.quiz_questions DROP CONSTRAINT quiz_questions_pkey;
ALTER TABLE ONLY public.quiz_options DROP CONSTRAINT quiz_options_pkey;
ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_pkey;
ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_code_key;
ALTER TABLE ONLY public.media_files DROP CONSTRAINT media_files_pkey;
ALTER TABLE ONLY public.lessons DROP CONSTRAINT lessons_pkey;
ALTER TABLE ONLY public.lesson_categories DROP CONSTRAINT lesson_categories_slug_key;
ALTER TABLE ONLY public.lesson_categories DROP CONSTRAINT lesson_categories_pkey;
ALTER TABLE ONLY public.import_jobs DROP CONSTRAINT import_jobs_pkey;
ALTER TABLE ONLY public.hanzi_cards DROP CONSTRAINT hanzi_cards_pkey;
ALTER TABLE ONLY public.documents DROP CONSTRAINT documents_pkey;
ALTER TABLE ONLY public.challenge_words DROP CONSTRAINT challenge_words_pkey;
ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.permissions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.lesson_categories ALTER COLUMN id DROP DEFAULT;
DROP TABLE public.vocabulary;
DROP VIEW public.v_user_stats;
DROP VIEW public.v_lessons_summary;
DROP TABLE public.users;
DROP TABLE public.user_word_progress;
DROP TABLE public.user_sessions;
DROP TABLE public.user_roles;
DROP TABLE public.user_progress;
DROP TABLE public.search_history;
DROP SEQUENCE public.roles_id_seq;
DROP TABLE public.roles;
DROP TABLE public.role_permissions;
DROP TABLE public.radicals;
DROP TABLE public.radical_sets;
DROP TABLE public.quiz_questions;
DROP TABLE public.quiz_options;
DROP SEQUENCE public.permissions_id_seq;
DROP TABLE public.permissions;
DROP TABLE public.media_files;
DROP TABLE public.lessons;
DROP SEQUENCE public.lesson_categories_id_seq;
DROP TABLE public.lesson_categories;
DROP TABLE public.import_jobs;
DROP TABLE public.hanzi_cards;
DROP TABLE public.documents;
DROP TABLE public.challenge_words;
DROP FUNCTION public.update_updated_at();
DROP EXTENSION "uuid-ossp";
DROP EXTENSION pgcrypto;
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO "user";

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: user
--

COMMENT ON SCHEMA public IS '';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: update_updated_at(); Type: FUNCTION; Schema: public; Owner: user
--

CREATE FUNCTION public.update_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at() OWNER TO "user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: challenge_words; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.challenge_words (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    lesson_id uuid NOT NULL,
    sort_order smallint DEFAULT 0 NOT NULL,
    hanzi character varying(50) NOT NULL,
    pinyin character varying(100) NOT NULL,
    meaning_vn text NOT NULL,
    example_zh text,
    example_vn text
);


ALTER TABLE public.challenge_words OWNER TO "user";

--
-- Name: documents; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.documents (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_id smallint NOT NULL,
    title text NOT NULL,
    description text,
    download_url text NOT NULL,
    doc_type character varying(30) DEFAULT 'pdf'::character varying NOT NULL,
    sort_order smallint DEFAULT 0 NOT NULL,
    is_published boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT documents_doc_type_check CHECK (((doc_type)::text = ANY ((ARRAY['pdf'::character varying, 'ppt'::character varying, 'drive_folder'::character varying, 'audio'::character varying, 'other'::character varying])::text[])))
);


ALTER TABLE public.documents OWNER TO "user";

--
-- Name: hanzi_cards; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.hanzi_cards (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    lesson_id uuid NOT NULL,
    sort_order smallint DEFAULT 0 NOT NULL,
    "character" character varying(10) NOT NULL,
    pinyin character varying(50) NOT NULL,
    meaning text NOT NULL,
    mnemonic text,
    stroke_count smallint,
    radical character varying(10)
);


ALTER TABLE public.hanzi_cards OWNER TO "user";

--
-- Name: import_jobs; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.import_jobs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    uploaded_by uuid NOT NULL,
    file_name character varying(255) NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    total_rows integer DEFAULT 0 NOT NULL,
    processed_rows integer DEFAULT 0 NOT NULL,
    failed_rows integer DEFAULT 0 NOT NULL,
    error_log jsonb,
    category_id smallint,
    started_at timestamp with time zone,
    finished_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT import_jobs_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'processing'::character varying, 'done'::character varying, 'failed'::character varying])::text[])))
);


ALTER TABLE public.import_jobs OWNER TO "user";

--
-- Name: lesson_categories; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.lesson_categories (
    id smallint NOT NULL,
    slug character varying(30) NOT NULL,
    name character varying(80) NOT NULL,
    sort_order smallint DEFAULT 0 NOT NULL
);


ALTER TABLE public.lesson_categories OWNER TO "user";

--
-- Name: lesson_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.lesson_categories_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lesson_categories_id_seq OWNER TO "user";

--
-- Name: lesson_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.lesson_categories_id_seq OWNED BY public.lesson_categories.id;


--
-- Name: lessons; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.lessons (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_id smallint NOT NULL,
    lesson_number smallint,
    filename character varying(120) NOT NULL,
    title_cn character varying(200),
    title_vn character varying(500),
    icon character varying(10) DEFAULT '📚'::character varying NOT NULL,
    description character varying(200),
    badge character varying(20),
    is_published boolean DEFAULT true NOT NULL,
    sort_order smallint DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.lessons OWNER TO "user";

--
-- Name: COLUMN lessons.filename; Type: COMMENT; Schema: public; Owner: user
--

COMMENT ON COLUMN public.lessons.filename IS 'Tên file HTML gốc, dùng làm game_id khi lưu tiến độ';


--
-- Name: media_files; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.media_files (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    owner_type character varying(30) NOT NULL,
    owner_id uuid NOT NULL,
    media_type character varying(10) NOT NULL,
    file_name character varying(255) NOT NULL,
    storage_key text NOT NULL,
    cdn_url text NOT NULL,
    mime_type character varying(50),
    file_size_kb integer,
    uploaded_by uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT media_files_media_type_check CHECK (((media_type)::text = ANY ((ARRAY['image'::character varying, 'audio'::character varying])::text[])))
);


ALTER TABLE public.media_files OWNER TO "user";

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.permissions (
    id smallint NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.permissions OWNER TO "user";

--
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.permissions_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissions_id_seq OWNER TO "user";

--
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- Name: quiz_options; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.quiz_options (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    question_id uuid NOT NULL,
    sort_order smallint DEFAULT 0 NOT NULL,
    option_text text NOT NULL,
    is_correct boolean DEFAULT false NOT NULL
);


ALTER TABLE public.quiz_options OWNER TO "user";

--
-- Name: quiz_questions; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.quiz_questions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    lesson_id uuid NOT NULL,
    sort_order smallint DEFAULT 0 NOT NULL,
    question text NOT NULL,
    explanation text NOT NULL,
    difficulty smallint DEFAULT 1 NOT NULL,
    CONSTRAINT quiz_questions_difficulty_check CHECK (((difficulty >= 1) AND (difficulty <= 5)))
);


ALTER TABLE public.quiz_questions OWNER TO "user";

--
-- Name: radical_sets; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.radical_sets (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    set_number smallint NOT NULL,
    title character varying(100) NOT NULL,
    icon character varying(10) DEFAULT '🌱'::character varying NOT NULL,
    lesson_id uuid
);


ALTER TABLE public.radical_sets OWNER TO "user";

--
-- Name: radicals; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.radicals (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    set_id uuid NOT NULL,
    sort_order smallint DEFAULT 0 NOT NULL,
    radical character varying(10) NOT NULL,
    name character varying(50) NOT NULL,
    meaning text,
    example_chars text
);


ALTER TABLE public.radicals OWNER TO "user";

--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.role_permissions (
    role_id smallint NOT NULL,
    permission_id smallint NOT NULL
);


ALTER TABLE public.role_permissions OWNER TO "user";

--
-- Name: roles; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.roles (
    id smallint NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.roles OWNER TO "user";

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.roles_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO "user";

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: search_history; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.search_history (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    query character varying(200) NOT NULL,
    vocab_id uuid,
    searched_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.search_history OWNER TO "user";

--
-- Name: user_progress; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.user_progress (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    lesson_id uuid NOT NULL,
    score smallint DEFAULT 0 NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    attempts smallint DEFAULT 1 NOT NULL,
    time_spent_s integer DEFAULT 0 NOT NULL,
    last_played timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT user_progress_score_check CHECK (((score >= 0) AND (score <= 100)))
);


ALTER TABLE public.user_progress OWNER TO "user";

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.user_roles (
    user_id uuid NOT NULL,
    role_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_roles OWNER TO "user";

--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.user_sessions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    refresh_token text NOT NULL,
    ip_address inet,
    user_agent text,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_sessions OWNER TO "user";

--
-- Name: user_word_progress; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.user_word_progress (
    user_id uuid NOT NULL,
    vocab_id uuid NOT NULL,
    status character varying(20) DEFAULT 'learning'::character varying NOT NULL,
    review_count smallint DEFAULT 0 NOT NULL,
    last_reviewed timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_word_progress OWNER TO "user";

--
-- Name: TABLE user_word_progress; Type: COMMENT; Schema: public; Owner: user
--

COMMENT ON TABLE public.user_word_progress IS 'Lưu lịch sử học tập/tra cứu của từng từ vựng riêng biệt';


--
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50) NOT NULL,
    password_hash text NOT NULL,
    display_name character varying(100),
    email character varying(150),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_login_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO "user";

--
-- Name: TABLE users; Type: COMMENT; Schema: public; Owner: user
--

COMMENT ON TABLE public.users IS 'Tài khoản học viên và quản trị viên';


--
-- Name: COLUMN users.password_hash; Type: COMMENT; Schema: public; Owner: user
--

COMMENT ON COLUMN public.users.password_hash IS 'bcrypt hash, cost=12';


--
-- Name: v_lessons_summary; Type: VIEW; Schema: public; Owner: user
--

CREATE VIEW public.v_lessons_summary AS
SELECT
    NULL::uuid AS id,
    NULL::character varying(30) AS category,
    NULL::smallint AS lesson_number,
    NULL::character varying(120) AS filename,
    NULL::character varying(200) AS title_cn,
    NULL::character varying(500) AS title_vn,
    NULL::character varying(10) AS icon,
    NULL::character varying(20) AS badge,
    NULL::bigint AS hanzi_count,
    NULL::bigint AS vocab_count,
    NULL::bigint AS quiz_count;


ALTER VIEW public.v_lessons_summary OWNER TO "user";

--
-- Name: v_user_stats; Type: VIEW; Schema: public; Owner: user
--

CREATE VIEW public.v_user_stats AS
 SELECT u.id AS user_id,
    u.username,
    u.display_name,
    count(up.id) AS lessons_started,
    sum(
        CASE
            WHEN up.completed THEN 1
            ELSE 0
        END) AS lessons_completed,
    round(avg(up.score), 1) AS avg_score,
    sum(up.time_spent_s) AS total_time_seconds
   FROM (public.users u
     LEFT JOIN public.user_progress up ON ((up.user_id = u.id)))
  GROUP BY u.id, u.username, u.display_name;


ALTER VIEW public.v_user_stats OWNER TO "user";

--
-- Name: vocabulary; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.vocabulary (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    lesson_id uuid NOT NULL,
    sort_order smallint DEFAULT 0 NOT NULL,
    word character varying(50) NOT NULL,
    pinyin character varying(100) NOT NULL,
    meaning text NOT NULL,
    example_cn text,
    example_py text,
    example_vn text,
    audio_url text,
    meaning_en character varying(255),
    image_url text
);


ALTER TABLE public.vocabulary OWNER TO "user";

--
-- Name: lesson_categories id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.lesson_categories ALTER COLUMN id SET DEFAULT nextval('public.lesson_categories_id_seq'::regclass);


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: challenge_words challenge_words_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.challenge_words
    ADD CONSTRAINT challenge_words_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: hanzi_cards hanzi_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.hanzi_cards
    ADD CONSTRAINT hanzi_cards_pkey PRIMARY KEY (id);


--
-- Name: import_jobs import_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.import_jobs
    ADD CONSTRAINT import_jobs_pkey PRIMARY KEY (id);


--
-- Name: lesson_categories lesson_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.lesson_categories
    ADD CONSTRAINT lesson_categories_pkey PRIMARY KEY (id);


--
-- Name: lesson_categories lesson_categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.lesson_categories
    ADD CONSTRAINT lesson_categories_slug_key UNIQUE (slug);


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: media_files media_files_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.media_files
    ADD CONSTRAINT media_files_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_code_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_code_key UNIQUE (code);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: quiz_options quiz_options_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.quiz_options
    ADD CONSTRAINT quiz_options_pkey PRIMARY KEY (id);


--
-- Name: quiz_questions quiz_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT quiz_questions_pkey PRIMARY KEY (id);


--
-- Name: radical_sets radical_sets_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.radical_sets
    ADD CONSTRAINT radical_sets_pkey PRIMARY KEY (id);


--
-- Name: radical_sets radical_sets_set_number_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.radical_sets
    ADD CONSTRAINT radical_sets_set_number_key UNIQUE (set_number);


--
-- Name: radicals radicals_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.radicals
    ADD CONSTRAINT radicals_pkey PRIMARY KEY (id);


--
-- Name: role_permissions role_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);


--
-- Name: roles roles_code_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_code_key UNIQUE (code);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: search_history search_history_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.search_history
    ADD CONSTRAINT search_history_pkey PRIMARY KEY (id);


--
-- Name: user_progress user_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_pkey PRIMARY KEY (id);


--
-- Name: user_progress user_progress_user_id_lesson_id_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_user_id_lesson_id_key UNIQUE (user_id, lesson_id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: user_sessions user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- Name: user_sessions user_sessions_refresh_token_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_refresh_token_key UNIQUE (refresh_token);


--
-- Name: user_word_progress user_word_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_word_progress
    ADD CONSTRAINT user_word_progress_pkey PRIMARY KEY (user_id, vocab_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: vocabulary vocabulary_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.vocabulary
    ADD CONSTRAINT vocabulary_pkey PRIMARY KEY (id);


--
-- Name: idx_challenge_words_lesson; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_challenge_words_lesson ON public.challenge_words USING btree (lesson_id, sort_order);


--
-- Name: idx_docs_category; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_docs_category ON public.documents USING btree (category_id);


--
-- Name: idx_hanzi_lesson; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_hanzi_lesson ON public.hanzi_cards USING btree (lesson_id, sort_order);


--
-- Name: idx_lessons_category; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_lessons_category ON public.lessons USING btree (category_id);


--
-- Name: idx_lessons_filename; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_lessons_filename ON public.lessons USING btree (filename);


--
-- Name: idx_media_owner; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_media_owner ON public.media_files USING btree (owner_type, owner_id);


--
-- Name: idx_progress_completed; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_progress_completed ON public.user_progress USING btree (user_id, completed);


--
-- Name: idx_progress_lesson; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_progress_lesson ON public.user_progress USING btree (lesson_id);


--
-- Name: idx_progress_user; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_progress_user ON public.user_progress USING btree (user_id);


--
-- Name: idx_quiz_lesson; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_quiz_lesson ON public.quiz_questions USING btree (lesson_id, sort_order);


--
-- Name: idx_quiz_options_question; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_quiz_options_question ON public.quiz_options USING btree (question_id, sort_order);


--
-- Name: idx_role_permissions_role; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_role_permissions_role ON public.role_permissions USING btree (role_id);


--
-- Name: idx_search_user; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_search_user ON public.search_history USING btree (user_id, searched_at DESC);


--
-- Name: idx_sessions_expires; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_sessions_expires ON public.user_sessions USING btree (expires_at);


--
-- Name: idx_sessions_token; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_sessions_token ON public.user_sessions USING btree (refresh_token);


--
-- Name: idx_sessions_user; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_sessions_user ON public.user_sessions USING btree (user_id);


--
-- Name: idx_user_roles_user; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_user_roles_user ON public.user_roles USING btree (user_id);


--
-- Name: idx_vocab_lesson; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_vocab_lesson ON public.vocabulary USING btree (lesson_id, sort_order);


--
-- Name: v_lessons_summary _RETURN; Type: RULE; Schema: public; Owner: user
--

CREATE OR REPLACE VIEW public.v_lessons_summary AS
 SELECT l.id,
    lc.slug AS category,
    l.lesson_number,
    l.filename,
    l.title_cn,
    l.title_vn,
    l.icon,
    l.badge,
    count(DISTINCT hc.id) AS hanzi_count,
    count(DISTINCT v.id) AS vocab_count,
    count(DISTINCT qq.id) AS quiz_count
   FROM ((((public.lessons l
     JOIN public.lesson_categories lc ON ((lc.id = l.category_id)))
     LEFT JOIN public.hanzi_cards hc ON ((hc.lesson_id = l.id)))
     LEFT JOIN public.vocabulary v ON ((v.lesson_id = l.id)))
     LEFT JOIN public.quiz_questions qq ON ((qq.lesson_id = l.id)))
  WHERE (l.is_published = true)
  GROUP BY l.id, lc.slug;


--
-- Name: lessons trg_lessons_updated_at; Type: TRIGGER; Schema: public; Owner: user
--

CREATE TRIGGER trg_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: challenge_words challenge_words_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.challenge_words
    ADD CONSTRAINT challenge_words_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: documents documents_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.lesson_categories(id);


--
-- Name: hanzi_cards hanzi_cards_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.hanzi_cards
    ADD CONSTRAINT hanzi_cards_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: import_jobs import_jobs_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.import_jobs
    ADD CONSTRAINT import_jobs_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.lesson_categories(id);


--
-- Name: import_jobs import_jobs_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.import_jobs
    ADD CONSTRAINT import_jobs_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id);


--
-- Name: lessons lessons_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.lesson_categories(id);


--
-- Name: media_files media_files_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.media_files
    ADD CONSTRAINT media_files_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id);


--
-- Name: quiz_options quiz_options_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.quiz_options
    ADD CONSTRAINT quiz_options_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.quiz_questions(id) ON DELETE CASCADE;


--
-- Name: quiz_questions quiz_questions_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT quiz_questions_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: radical_sets radical_sets_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.radical_sets
    ADD CONSTRAINT radical_sets_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id);


--
-- Name: radicals radicals_set_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.radicals
    ADD CONSTRAINT radicals_set_id_fkey FOREIGN KEY (set_id) REFERENCES public.radical_sets(id) ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: search_history search_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.search_history
    ADD CONSTRAINT search_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: search_history search_history_vocab_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.search_history
    ADD CONSTRAINT search_history_vocab_id_fkey FOREIGN KEY (vocab_id) REFERENCES public.vocabulary(id);


--
-- Name: user_progress user_progress_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: user_progress user_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_sessions user_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_word_progress user_word_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_word_progress
    ADD CONSTRAINT user_word_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_word_progress user_word_progress_vocab_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_word_progress
    ADD CONSTRAINT user_word_progress_vocab_id_fkey FOREIGN KEY (vocab_id) REFERENCES public.vocabulary(id) ON DELETE CASCADE;


--
-- Name: vocabulary vocabulary_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.vocabulary
    ADD CONSTRAINT vocabulary_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: user_progress Admins see all progress; Type: POLICY; Schema: public; Owner: user
--

CREATE POLICY "Admins see all progress" ON public.user_progress USING ((EXISTS ( SELECT 1
   FROM (public.user_roles ur
     JOIN public.roles r ON ((ur.role_id = r.id)))
  WHERE ((ur.user_id = (current_setting('app.current_user_id'::text, true))::uuid) AND ((r.code)::text = 'admin'::text)))));


--
-- Name: user_progress Users see own progress; Type: POLICY; Schema: public; Owner: user
--

CREATE POLICY "Users see own progress" ON public.user_progress USING ((user_id = (current_setting('app.current_user_id'::text))::uuid));


--
-- Name: user_progress; Type: ROW SECURITY; Schema: public; Owner: user
--

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: user
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict HQzudgo9NuVPFYd8MurX3Q3Eh3lsG1oKq2Cph9zdvGlr53feRh0o3u0FckiQIKB

