--
-- PostgreSQL database dump
--

\restrict dIortJraa11Wxpy6fp3N7ppRC27uslebxNrbIbSTWdS7Fzl0Th64eSRoUE2rH9p

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
-- Data for Name: challenge_words; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.challenge_words (id, lesson_id, sort_order, hanzi, pinyin, meaning_vn, example_zh, example_vn) FROM stdin;
932d2434-caac-4c18-a666-bf9a8b5510e7	28b41a5e-3a47-437b-bc5c-ee0789222a97	0	爱	ài	Yêu	我爱妈妈。	Tôi yêu mẹ tôi.
7913a5b3-9900-4d05-ac8e-4e8c726bae83	28b41a5e-3a47-437b-bc5c-ee0789222a97	1	八	bā	Số 8	我买八个苹果。	Tôi mua 8 quả táo.
bd67b993-ae6b-4b8a-aa0a-268ee3e48462	28b41a5e-3a47-437b-bc5c-ee0789222a97	2	爸爸	bàba	Bố, ba	我爸爸是医生。	Bố tôi là bác sĩ.
81b93046-8d2e-4772-b4ca-ce2befa763cb	28b41a5e-3a47-437b-bc5c-ee0789222a97	3	杯子	bēizi	Cái cốc	这个杯子是谁的？	Cái cốc này là của ai?
8bd9279a-4cf3-4db7-adb0-7ba40cdf16da	28b41a5e-3a47-437b-bc5c-ee0789222a97	4	北京	Běijīng	Bắc Kinh	他去北京。	Anh ấy đi Bắc Kinh.
b1f4f332-efcb-442d-97e9-a58546db2e68	28b41a5e-3a47-437b-bc5c-ee0789222a97	5	本	běn	Quyển, cuốn	我有三本书。	Tôi có ba quyển sách.
2b5cc14c-6531-4e25-94bc-67793a168a63	28b41a5e-3a47-437b-bc5c-ee0789222a97	6	不客气	bú kèqi	Đừng khách sáo	谢谢。不客气。	Cảm ơn. Không có gì.
9fdc8f70-e98a-466e-a24a-9041bd56bff7	28b41a5e-3a47-437b-bc5c-ee0789222a97	7	不	bù	Không	我不是老师。	Tôi không phải là giáo viên.
a17aba17-a176-4780-8815-f3f2b055dbc6	28b41a5e-3a47-437b-bc5c-ee0789222a97	8	菜	cài	Món ăn	我喜欢吃中国菜。	Tôi thích ăn món Trung Quốc.
951597f6-1af7-4bf7-9d45-e55f4a5d2bde	28b41a5e-3a47-437b-bc5c-ee0789222a97	9	茶	chá	Trà	请喝茶。	Mời uống trà.
e6ced150-ba5b-4889-ae1b-5b961382052f	28b41a5e-3a47-437b-bc5c-ee0789222a97	10	吃	chī	Ăn	你想吃什么？	Bạn muốn ăn gì?
899aa2b2-387d-4f0d-8cf5-2786d3a0a512	28b41a5e-3a47-437b-bc5c-ee0789222a97	11	出租车	chūzūchē	Xe taxi	我们坐出租车去。	Chúng tôi ngồi taxi đi.
ec5bfdff-6b36-4136-b051-9b8b7aea3389	28b41a5e-3a47-437b-bc5c-ee0789222a97	12	打电话	dǎ diànhuà	Gọi điện thoại	他在打电话。	Anh ấy đang gọi điện thoại.
e37a011f-d166-453b-ab95-7dcb5de5c1ba	28b41a5e-3a47-437b-bc5c-ee0789222a97	13	大	dà	To, lớn	这个苹果很大。	Quả táo này rất to.
4afc25a5-170d-4021-8808-c6d7e9fbacb4	28b41a5e-3a47-437b-bc5c-ee0789222a97	14	的	de	Của (trợ từ)	我的书。	Sách của tôi.
0ad9fce6-da13-42e9-87cb-6de581261190	28b41a5e-3a47-437b-bc5c-ee0789222a97	15	点	diǎn	Giờ	现在几点？	Bây giờ là mấy giờ?
9c4fa5b0-951b-4caf-900b-f386222a9853	28b41a5e-3a47-437b-bc5c-ee0789222a97	16	电脑	diànnǎo	Máy tính	我的电脑在哪儿？	Máy tính của tôi ở đâu?
4128a1be-29d7-4d28-84da-a82750ac9b48	28b41a5e-3a47-437b-bc5c-ee0789222a97	17	电视	diànshì	Ti vi	我喜欢看电视。	Tôi thích xem tivi.
9b8d9981-64bd-4f42-adc2-a6e62fc6c517	28b41a5e-3a47-437b-bc5c-ee0789222a97	18	电影	diànyǐng	Phim	我想去看电影。	Tôi muốn đi xem phim.
a062b4d1-b77f-4262-8f00-ff479bfa43e3	28b41a5e-3a47-437b-bc5c-ee0789222a97	19	东西	dōngxi	Đồ vật	我去买东西。	Tôi đi mua đồ.
4e8fefcc-41f0-4ec8-a327-b99a0ff8bc48	28b41a5e-3a47-437b-bc5c-ee0789222a97	20	都	dōu	Đều	我们都是学生。	Chúng tôi đều là học sinh.
b99c7e9c-39ad-4c84-ae12-97cb229c035a	28b41a5e-3a47-437b-bc5c-ee0789222a97	21	读	dú	Đọc	他喜欢读书。	Anh ấy thích đọc sách.
9540823b-0b4e-4253-a7c0-df12a0bc90a7	28b41a5e-3a47-437b-bc5c-ee0789222a97	22	对不起	duìbuqǐ	Xin lỗi	对不起。没关系。	Xin lỗi. Không sao đâu.
c68f5498-fa77-4502-8f18-297d8386dece	28b41a5e-3a47-437b-bc5c-ee0789222a97	23	多	duō	Nhiều	这里有很多人。	Ở đây có rất nhiều người.
0f2f35bc-76e6-40b9-926c-ac57ec17b743	28b41a5e-3a47-437b-bc5c-ee0789222a97	24	多少	duōshao	Bao nhiêu	这个多少钱？	Cái này bao nhiêu tiền?
18248d3f-8085-4653-9b65-87ce62ae0a0f	28b41a5e-3a47-437b-bc5c-ee0789222a97	25	儿子	érzi	Con trai	这是我的儿子。	Đây là con trai của tôi.
57b9c014-f122-4898-8b1e-e75e83b392bc	28b41a5e-3a47-437b-bc5c-ee0789222a97	26	二	èr	Số 2	今天是二月二号。	Hôm nay là ngày 2 tháng 2.
c4152f74-a617-4c79-82bb-fabe386bce55	28b41a5e-3a47-437b-bc5c-ee0789222a97	27	饭馆	fànguǎn	Quán ăn	我们去饭馆。	Chúng tôi đi quán ăn.
185d636d-2f06-41fa-8537-4b2bca2eb1a5	28b41a5e-3a47-437b-bc5c-ee0789222a97	28	飞机	fēijī	Máy bay	我坐飞机去北京。	Tôi ngồi máy bay đi Bắc Kinh.
cc25407b-fd6e-4477-8b3b-c29056937f2a	28b41a5e-3a47-437b-bc5c-ee0789222a97	29	分钟	fēnzhōng	Phút	请等我五分钟。	Xin đợi tôi 5 phút.
5920b884-4d44-4235-b840-f0d1861ff091	28b41a5e-3a47-437b-bc5c-ee0789222a97	30	高兴	gāoxìng	Vui vẻ	认识你很高兴。	Rất vui được gặp bạn.
eb484cb2-b10b-46dc-934c-7fe844a42bfe	28b41a5e-3a47-437b-bc5c-ee0789222a97	31	个	gè	Cái, con, người	我有一个中国朋友。	Tôi có một người bạn Trung Quốc.
6e07e649-7eca-40b5-9c82-bb241c0a08fa	28b41a5e-3a47-437b-bc5c-ee0789222a97	32	工作	gōngzuò	Công việc/Làm việc	你在哪儿工作？	Bạn làm việc ở đâu?
a44ed823-074f-403c-8283-0266756a459c	28b41a5e-3a47-437b-bc5c-ee0789222a97	33	狗	gǒu	Con chó	我家有一只狗。	Nhà tôi có một con chó.
beba40fc-a5e8-4676-98ba-d9a8fb685b66	28b41a5e-3a47-437b-bc5c-ee0789222a97	34	汉语	Hànyǔ	Tiếng Hán	他会说汉语。	Anh ấy biết nói tiếng Hán.
bbdbffd6-f5da-44df-beb7-d68b7baa9980	28b41a5e-3a47-437b-bc5c-ee0789222a97	35	好	hǎo	Tốt, khỏe	今天天气很好。	Hôm nay thời tiết rất đẹp.
9692cb82-9dde-4aa6-8609-639c9b236c55	28b41a5e-3a47-437b-bc5c-ee0789222a97	36	喝	hē	Uống	我想喝水。	Tôi muốn uống nước.
f4990311-c819-4f44-ad14-01b1d130046c	28b41a5e-3a47-437b-bc5c-ee0789222a97	37	和	hé	Và	我和爸爸。	Tôi và bố.
4acb1127-8c53-4d75-90c2-af3ddc6b5d52	28b41a5e-3a47-437b-bc5c-ee0789222a97	38	很	hěn	Rất	今天很冷。	Hôm nay rất lạnh.
dc78837e-cd60-4467-bcc0-0ac76fc00a1f	28b41a5e-3a47-437b-bc5c-ee0789222a97	39	后面	hòumiàn	Phía sau	我家在学校后面。	Nhà tôi ở phía sau trường học.
4995e759-0e0d-4e75-a6ad-516da414fa65	28b41a5e-3a47-437b-bc5c-ee0789222a97	40	回	huí	Về	我想回家。	Tôi muốn về nhà.
f69663de-181a-44be-b547-c849a62f7e08	28b41a5e-3a47-437b-bc5c-ee0789222a97	41	会	huì	Biết (kỹ năng)	我会说汉语。	Tôi biết nói tiếng Hán.
4c3778f0-636f-43b2-b5af-9e0bf02e8338	28b41a5e-3a47-437b-bc5c-ee0789222a97	42	火车站	huǒchēzhàn	Ga tàu hỏa	我去火车站。	Tôi đi ga tàu hỏa.
a0b9a842-9afe-4392-a1db-2015aa2e9748	28b41a5e-3a47-437b-bc5c-ee0789222a97	43	几	jǐ	Mấy, vài	你家有几口人？	Nhà bạn có mấy người?
3815c1db-caae-4558-b5e2-6f764b8ae22a	28b41a5e-3a47-437b-bc5c-ee0789222a97	44	家	jiā	Nhà	我家有四口人。	Nhà tôi có 4 người.
3a63a839-34c1-4b82-b166-5be25e604663	28b41a5e-3a47-437b-bc5c-ee0789222a97	45	叫	jiào	Gọi, tên là	你叫什么名字？	Bạn tên là gì?
263db7d3-1a29-482f-9f09-4b8b8be3da65	28b41a5e-3a47-437b-bc5c-ee0789222a97	46	今天	jīntiān	Hôm nay	今天你去哪儿？	Hôm nay bạn đi đâu?
7babce0d-28c2-45f6-9d20-71524ce0fd5d	28b41a5e-3a47-437b-bc5c-ee0789222a97	47	九	jiǔ	Số 9	上午九点上课。	Sáng nay 9 giờ lên lớp.
92c2bbb7-dbf3-4ad5-bd2c-4f37ced2d287	28b41a5e-3a47-437b-bc5c-ee0789222a97	48	开	kāi	Mở, lái	他会开车。	Anh ấy biết lái xe.
4d718918-7538-4297-897f-78b6b1ef433f	28b41a5e-3a47-437b-bc5c-ee0789222a97	49	看	kàn	Nhìn, xem	我喜欢看书。	Tôi thích đọc sách.
75917931-e53d-40d2-b778-b56f9af504ad	28b41a5e-3a47-437b-bc5c-ee0789222a97	50	看见	kànjiàn	Nhìn thấy	我没看见他。	Tôi không nhìn thấy anh ấy.
a24d1c4e-03c5-4360-8908-f98f15975d2f	28b41a5e-3a47-437b-bc5c-ee0789222a97	51	块	kuài	Đồng (tiền)	这个三块钱。	Cái này ba đồng.
1ac5791f-036f-4f90-9333-2e76a2517064	28b41a5e-3a47-437b-bc5c-ee0789222a97	52	来	lái	Đến	他明天来我家。	Ngày mai anh ấy đến nhà tôi.
e57dc693-ca96-4a85-b944-8dabb2062e60	28b41a5e-3a47-437b-bc5c-ee0789222a97	53	老师	lǎoshī	Giáo viên	她是汉语老师。	Cô ấy là giáo viên tiếng Hán.
1ecebabb-07b8-4a31-8614-757ac72f3c68	28b41a5e-3a47-437b-bc5c-ee0789222a97	54	了	le	Rồi	他去医院了。	Anh ấy đi bệnh viện rồi.
e8027f5d-dc12-4e84-ba41-55fca3185f4e	28b41a5e-3a47-437b-bc5c-ee0789222a97	55	冷	lěng	Lạnh	今天天气很冷。	Thời tiết hôm nay rất lạnh.
de87a7f9-4a4a-4382-a495-d96acb1c0d12	28b41a5e-3a47-437b-bc5c-ee0789222a97	56	里	lǐ	Bên trong	家里有很多人。	Trong nhà có rất nhiều người.
84dbd600-c1dd-41b4-a9f3-52c33181508d	28b41a5e-3a47-437b-bc5c-ee0789222a97	57	零	líng	Số 0	零这个字很难写。	Chữ số 0 này rất khó viết.
04e2d63f-3def-43b4-9c15-8cd5f597d3fa	28b41a5e-3a47-437b-bc5c-ee0789222a97	58	六	liù	Số 6	今天是星期六。	Hôm nay là thứ 7.
b831d5d4-0fff-405d-b95a-2568d61bb69a	28b41a5e-3a47-437b-bc5c-ee0789222a97	59	妈妈	māma	Mẹ	我爱妈妈。	Tôi yêu mẹ tôi.
a056b3eb-4ff9-4a32-b2a3-ee4c698fcc0d	28b41a5e-3a47-437b-bc5c-ee0789222a97	60	吗	ma	Không (câu hỏi)	你喜欢我吗？	Bạn có thích tôi không?
e3a1dd27-bc71-40d3-bf7e-3a6055eaff7e	28b41a5e-3a47-437b-bc5c-ee0789222a97	61	买	mǎi	Mua	我想买一个杯子。	Tôi muốn mua một cái cốc.
e8ebada2-7b67-47bb-9c3c-9d4f942f4e51	28b41a5e-3a47-437b-bc5c-ee0789222a97	62	猫	māo	Con mèo	我有一只猫。	Tôi có một con mèo.
c8850190-6acc-4539-933e-e2169dd42079	28b41a5e-3a47-437b-bc5c-ee0789222a97	63	没	méi	Không, chưa	我没有钱。	Tôi không có tiền.
32ea826a-2e6e-4f84-a9d9-d8b0d050b57c	28b41a5e-3a47-437b-bc5c-ee0789222a97	64	没关系	méi guānxi	Không sao đâu	对不起。没关系。	Xin lỗi. Không sao đâu.
0a4fb95c-17bb-4f34-bc70-0db6481d8c99	28b41a5e-3a47-437b-bc5c-ee0789222a97	65	米饭	mǐfàn	Cơm	我想吃米饭。	Tôi muốn ăn cơm.
c0e3dbc1-6d76-41b2-b0d0-d73fc0b7b9b9	28b41a5e-3a47-437b-bc5c-ee0789222a97	66	明天	míngtiān	Ngày mai	明天去看电影吧。	Ngày mai đi xem phim nhé.
ed114074-948a-4732-b59f-97c6724ddf7d	28b41a5e-3a47-437b-bc5c-ee0789222a97	67	名字	míngzi	Tên	你叫什么名字？	Bạn tên là gì?
c5598043-dda3-45a2-86c7-1ebf068bed1f	28b41a5e-3a47-437b-bc5c-ee0789222a97	68	哪	nǎ / nǎr	Đâu, ở đâu	你家在哪儿？	Nhà bạn ở đâu?
8597c9c1-c4f2-4d0f-a208-55753835a7b9	28b41a5e-3a47-437b-bc5c-ee0789222a97	69	那	nà / nàr	Kia, ở kia	他在那儿。	Anh ấy ở bên kia.
d03906d3-aaaf-43d3-8f03-860dd3e78faa	28b41a5e-3a47-437b-bc5c-ee0789222a97	70	呢	ne	Nhỉ, vậy, còn... thì sao	你呢？	Bạn thì sao?
cf7ca7e3-8974-4656-bef0-e4799ac00e5d	28b41a5e-3a47-437b-bc5c-ee0789222a97	71	能	néng	Có thể	我明天能来。	Ngày mai tôi có thể đến.
5532e273-4385-4435-bf7a-f3f0e4568bb0	28b41a5e-3a47-437b-bc5c-ee0789222a97	72	你	nǐ	Bạn, anh, chị	我爱你。	Tôi yêu bạn.
86cb7067-e815-4260-9cf0-bc501d6a7947	28b41a5e-3a47-437b-bc5c-ee0789222a97	73	年	nián	Năm	我在中国住了三年。	Tôi ở Trung Quốc 3 năm rồi.
c5690dc1-5cc5-43aa-ada9-f25f985e23b4	28b41a5e-3a47-437b-bc5c-ee0789222a97	74	女儿	nǚ'ér	Con gái	她女儿十岁了。	Con gái cô ấy 10 tuổi rồi.
2e04a570-b08a-4424-b6e3-83cb765384fd	28b41a5e-3a47-437b-bc5c-ee0789222a97	75	朋友	péngyou	Bạn bè	他是我的好朋友。	Anh ấy là bạn tốt của tôi.
f3988490-e85d-442f-854b-79dfb1b1767a	28b41a5e-3a47-437b-bc5c-ee0789222a97	76	漂亮	piàoliang	Xinh đẹp	她很漂亮。	Cô ấy rất xinh đẹp.
21506ebc-be33-4733-b0d6-7de08b6da978	28b41a5e-3a47-437b-bc5c-ee0789222a97	77	苹果	píngguǒ	Quả táo	我想买苹果。	Tôi muốn mua quả táo.
99c13c2f-332f-4e09-9fb9-297e9dc5ce62	28b41a5e-3a47-437b-bc5c-ee0789222a97	78	七	qī	Số 7	现在七点。	Bây giờ là 7 giờ.
f3d849aa-8dc1-4c14-9ee1-a7f50ea679c4	28b41a5e-3a47-437b-bc5c-ee0789222a97	79	钱	qián	Tiền	这个多少钱？	Cái này bao nhiêu tiền?
56399a4a-22c1-401b-9893-9285c0be721e	28b41a5e-3a47-437b-bc5c-ee0789222a97	80	前面	qiánmiàn	Phía trước	前面是我的学校。	Phía trước là trường của tôi.
d50641e3-35bd-4e5f-a252-2cbd08ec8f79	28b41a5e-3a47-437b-bc5c-ee0789222a97	81	请	qǐng	Mời, xin	请坐。	Mời ngồi.
61c4351f-f508-4af4-b1eb-7190b9169445	28b41a5e-3a47-437b-bc5c-ee0789222a97	82	去	qù	Đi	你去哪儿呀？	Bạn đi đâu đấy?
8bb48c9b-8fc8-4188-9a60-4759bb3c10c8	28b41a5e-3a47-437b-bc5c-ee0789222a97	83	热	rè	Nóng	今天天气很热。	Hôm nay thời tiết rất nóng.
27f372a1-c717-45c4-a9f2-735ea3cabafd	28b41a5e-3a47-437b-bc5c-ee0789222a97	84	人	rén	Người	这个人是谁？	Người này là ai?
0088f30f-7ae2-4943-b826-bdc625bf21e5	28b41a5e-3a47-437b-bc5c-ee0789222a97	85	认识	rènshi	Quen biết	我不认识她。	Tôi không quen cô ấy.
444b2e83-53a2-443a-876e-37fa107ca6a7	28b41a5e-3a47-437b-bc5c-ee0789222a97	86	日	rì	Ngày	今天是二月二日。	Hôm nay là ngày 2 tháng 2.
fd1396b9-ac60-4285-819d-2093b5664e76	28b41a5e-3a47-437b-bc5c-ee0789222a97	87	三	sān	Số 3	我有三本书。	Tôi có ba quyển sách.
661773a1-a62f-47b4-8ba0-37956d9b9269	28b41a5e-3a47-437b-bc5c-ee0789222a97	88	商店	shāngdiàn	Cửa hàng	她去商店买东西。	Cô ấy đi cửa hàng mua đồ.
46406fb9-2fbe-40d9-8976-91699b264ee3	28b41a5e-3a47-437b-bc5c-ee0789222a97	89	上	shàng	Bên trên	书在桌子上。	Sách ở trên bàn.
773206bf-d1e5-4737-b054-2c6a65b9d0f9	28b41a5e-3a47-437b-bc5c-ee0789222a97	90	上午	shàngwǔ	Buổi sáng	今天上午我不在家。	Sáng nay tôi không có ở nhà.
20ef1ea8-1d9a-4a29-9414-2581f7baed21	28b41a5e-3a47-437b-bc5c-ee0789222a97	91	少	shǎo	Ít	你的钱太少了。	Tiền của bạn quá ít.
fc035551-4dee-41bf-a096-74afca70c336	28b41a5e-3a47-437b-bc5c-ee0789222a97	92	谁	shéi	Ai	你是谁？	Bạn là ai?
6405b428-db91-496c-a250-04f1e9d3bd58	28b41a5e-3a47-437b-bc5c-ee0789222a97	93	什么	shénme	Cái gì	这是什么？	Đây là cái gì?
35ef61b2-82c7-4794-ac38-67d5f4c1cb72	28b41a5e-3a47-437b-bc5c-ee0789222a97	94	十	shí	Số 10	今天是十号。	Hôm nay là mùng 10.
39f2d623-1aab-4c30-8351-419c1bba26dd	28b41a5e-3a47-437b-bc5c-ee0789222a97	95	时候	shíhou	Lúc, khi	你什么时候去北京？	Khi nào bạn đi Bắc Kinh?
a05a552e-4368-49a0-80c6-8312b8439786	28b41a5e-3a47-437b-bc5c-ee0789222a97	96	是	shì	Là, đúng	他是我的老师。	Anh ấy là giáo viên của tôi.
b7e033e1-d797-4dce-9383-e11f2c964233	28b41a5e-3a47-437b-bc5c-ee0789222a97	97	书	shū	Sách	我喜欢看书。	Tôi thích đọc sách.
ac0a8d6b-c0b2-4758-8d9c-87b9ca7f4d15	28b41a5e-3a47-437b-bc5c-ee0789222a97	98	水	shuǐ	Nước	我想喝水。	Tôi muốn uống nước.
3e7796b7-7e40-43c0-abdc-0bbcfbd93d4c	28b41a5e-3a47-437b-bc5c-ee0789222a97	99	水果	shuǐguǒ	Hoa quả	我去买水果。	Tôi đi mua hoa quả.
8424ceb1-73fe-4421-9bc0-b72590a31341	28b41a5e-3a47-437b-bc5c-ee0789222a97	100	睡觉	shuìjiào	Ngủ	他在睡觉。	Anh ấy đang ngủ.
a4d2dcfd-57eb-4aa6-9965-1bfe167464ec	28b41a5e-3a47-437b-bc5c-ee0789222a97	101	说话	shuōhuà	Nói chuyện	他在跟老师说话。	Anh ấy đang nói chuyện với thầy giáo.
dc46dd7f-8b0e-4138-aec3-c421d8550ab6	28b41a5e-3a47-437b-bc5c-ee0789222a97	102	四	sì	Số 4	我们有四个人。	Chúng tôi có 4 người.
d8209bee-dc2e-465f-9f01-df0c37c8b483	28b41a5e-3a47-437b-bc5c-ee0789222a97	103	岁	suì	Tuổi	你儿子几岁了？	Con trai bạn mấy tuổi rồi?
7202e2ea-b228-4cd5-9083-c4b9aab29acf	28b41a5e-3a47-437b-bc5c-ee0789222a97	104	他	tā	Anh ấy	他是谁？	Anh ấy là ai?
dc5044c5-692a-45ec-b5d6-f75063959075	28b41a5e-3a47-437b-bc5c-ee0789222a97	105	她	tā	Cô ấy	她是我妈妈。	Cô ấy là mẹ tôi.
76b3a030-9b3c-4dea-a5fd-664bc405f5da	28b41a5e-3a47-437b-bc5c-ee0789222a97	106	太	tài	Quá, lắm	太好了！	Tốt quá rồi!
4ba1ef00-922e-459f-8397-73776fde64d1	28b41a5e-3a47-437b-bc5c-ee0789222a97	107	天气	tiānqi	Thời tiết	今天天气怎么样？	Hôm nay thời tiết thế nào?
51b9e7ec-e66b-4909-a5f3-8384a2e2a467	28b41a5e-3a47-437b-bc5c-ee0789222a97	108	听	tīng	Nghe	请听我说。	Xin hãy nghe tôi nói.
5235d439-c5d0-4c68-80f0-1ce1a5399493	28b41a5e-3a47-437b-bc5c-ee0789222a97	109	同学	tóngxué	Bạn học	我们是同学。	Chúng tôi là bạn học.
09ebecce-96de-4717-a5e8-cedd8f3d5ed2	28b41a5e-3a47-437b-bc5c-ee0789222a97	110	喂	wèi	Alo	喂，请问王老师在吗？	Alo, xin hỏi thầy Vương có đó không?
c3592f1b-0f9d-487b-aa8d-2614d6460cb5	28b41a5e-3a47-437b-bc5c-ee0789222a97	111	我	wǒ	Tôi	我是中国人。	Tôi là người Trung Quốc.
ef9a43c4-f27d-4ea2-b68a-987a00c91e46	28b41a5e-3a47-437b-bc5c-ee0789222a97	112	我们	wǒmen	Chúng tôi	我们是好朋友。	Chúng tôi là bạn tốt.
45d04a38-cf64-4962-a1c6-a329c5087de8	28b41a5e-3a47-437b-bc5c-ee0789222a97	113	五	wǔ	Số 5	今天是星期五。	Hôm nay là thứ sáu.
e41a25a8-0433-4ca5-b04f-0ca9a6156d3e	28b41a5e-3a47-437b-bc5c-ee0789222a97	114	喜欢	xǐhuan	Thích	我喜欢吃苹果。	Tôi thích ăn quả táo.
9b006b96-013c-4e28-88f3-6ac941b5c4b7	28b41a5e-3a47-437b-bc5c-ee0789222a97	115	下	xià	Bên dưới	小猫在桌子下面。	Con mèo ở dưới bàn.
bb94cc34-571f-499b-ba6b-cd189804fd55	28b41a5e-3a47-437b-bc5c-ee0789222a97	116	下午	xiàwǔ	Buổi chiều	我下午去商店。	Buổi chiều tôi đi cửa hàng.
fba5c658-aa52-4525-a3e8-1b9a4e1320e5	28b41a5e-3a47-437b-bc5c-ee0789222a97	117	下雨	xià yǔ	Trời mưa	昨天没下雨。	Hôm qua không có mưa.
71e44edc-2189-4a26-8aff-3179c0342a9f	28b41a5e-3a47-437b-bc5c-ee0789222a97	118	先生	xiānsheng	Ngài, tiên sinh	你好，王先生。	Xin chào, ngài Vương.
45ff4927-d30d-4f68-84ff-4861d87d1e4f	28b41a5e-3a47-437b-bc5c-ee0789222a97	119	现在	xiànzài	Bây giờ	现在几点了？	Bây giờ là mấy giờ rồi?
0500b54b-4d46-4c1e-a715-4c7dfc3715bc	28b41a5e-3a47-437b-bc5c-ee0789222a97	120	想	xiǎng	Muốn, nghĩ	我想去中国。	Tôi muốn đi Trung Quốc.
ff22eae3-292d-4627-8858-d3a496d3f6a2	28b41a5e-3a47-437b-bc5c-ee0789222a97	121	小	xiǎo	Nhỏ, bé	这个杯子太小了。	Cái cốc này nhỏ quá.
2d0c51e0-1aa6-40b7-b5cb-536b068edf8a	28b41a5e-3a47-437b-bc5c-ee0789222a97	122	小姐	xiǎojiě	Tiểu thư, chị	王小姐在吗？	Cô Vương có ở đây không?
49e80ef0-0784-4453-9deb-038dcff91f1a	28b41a5e-3a47-437b-bc5c-ee0789222a97	123	些	xiē	Một vài, những	我买了一些苹果。	Tôi đã mua một vài quả táo.
c59db11a-b865-4924-837a-cb1335eb7506	28b41a5e-3a47-437b-bc5c-ee0789222a97	124	写	xiě	Viết	他在写字。	Anh ấy đang viết chữ.
7ee45c88-3219-4ca7-9f12-61d16f6bf307	28b41a5e-3a47-437b-bc5c-ee0789222a97	125	谢谢	xièxie	Cảm ơn	谢谢你。	Cảm ơn bạn.
c0bca029-8176-4c61-9346-57e49cd94ce6	28b41a5e-3a47-437b-bc5c-ee0789222a97	126	星期	xīngqī	Tuần, thứ	今天星期二。	Hôm nay là thứ ba.
b2f969d8-d47b-4065-ad36-20f631e52d00	28b41a5e-3a47-437b-bc5c-ee0789222a97	127	学生	xuésheng	Học sinh	这是我的学生。	Đây là học sinh của tôi.
2f9d086d-f35e-4c15-bcff-86f05f5e7ff2	28b41a5e-3a47-437b-bc5c-ee0789222a97	128	学习	xuéxí	Học tập	我学习汉语。	Tôi học tiếng Hán.
f96dcbc3-495f-4d5d-8a80-6d299800e6b4	28b41a5e-3a47-437b-bc5c-ee0789222a97	129	学校	xuéxiào	Trường học	这是我的学校。	Đây là trường của tôi.
d633aa49-fc85-4230-ab44-1683f7c72a27	28b41a5e-3a47-437b-bc5c-ee0789222a97	130	一	yī	Số 1	一个杯子。	Một cái cốc.
cf2eab12-e96d-429f-b70b-85f9523844c9	28b41a5e-3a47-437b-bc5c-ee0789222a97	131	衣服	yīfu	Quần áo	我去买衣服。	Tôi đi mua quần áo.
81124605-33d6-4119-80ee-0658b977ea2f	28b41a5e-3a47-437b-bc5c-ee0789222a97	132	医生	yīshēng	Bác sĩ	我爸爸是医生。	Bố tôi là bác sĩ.
ef71a422-f65f-4de3-9888-f5b4e212a6f4	28b41a5e-3a47-437b-bc5c-ee0789222a97	133	医院	yīyuàn	Bệnh viện	我去医院看医生。	Tôi đến bệnh viện khám bác sĩ.
11dcb4e0-ab5b-40ae-b467-3e93d95c349d	28b41a5e-3a47-437b-bc5c-ee0789222a97	134	椅子	yǐzi	Cái ghế	这把椅子多少钱？	Chiếc ghế này bao nhiêu tiền?
fe294777-9d91-4bcb-96de-cd53fc2db7e8	28b41a5e-3a47-437b-bc5c-ee0789222a97	135	有	yǒu	Có	我有一个中国朋友。	Tôi có một người bạn Trung Quốc.
9137c87c-d09f-4c59-b3a3-0161182f7d77	28b41a5e-3a47-437b-bc5c-ee0789222a97	136	月	yuè	Tháng	今天是八月一号。	Hôm nay là ngày mùng 1 tháng 8.
1991fd5e-b3c4-411f-a79b-e7a1ecff8f22	28b41a5e-3a47-437b-bc5c-ee0789222a97	137	在	zài	Ở, tại	我在家。	Tôi đang ở nhà.
987e6793-379d-426d-9ea0-ee438411e314	28b41a5e-3a47-437b-bc5c-ee0789222a97	138	再见	zàijiàn	Tạm biệt	老师再见。	Tạm biệt thầy cô.
b097d108-22f5-4288-af8b-05b5c107c77d	28b41a5e-3a47-437b-bc5c-ee0789222a97	139	怎么	zěnme	Thế nào, làm sao	这个汉字怎么读？	Chữ Hán này đọc như thế nào?
a3e5b1d7-fdeb-4e29-8a51-09869a97b19b	28b41a5e-3a47-437b-bc5c-ee0789222a97	140	怎么样	zěnmeyàng	Như thế nào	今天天气怎么样？	Hôm nay thời tiết thế nào?
851df182-3a8d-4199-ac51-0ebb35d3fa0f	28b41a5e-3a47-437b-bc5c-ee0789222a97	141	这	zhè / zhèr	Đây / Ở đây	这是一个杯子。	Đây là một cái cốc.
12d32357-ab9d-493c-aa2e-c2937f2d5483	28b41a5e-3a47-437b-bc5c-ee0789222a97	142	中国	Zhōngguó	Trung Quốc	我想去中国。	Tôi muốn đi Trung Quốc.
ca3372a8-9d43-48dc-9247-0ac2d0b55090	28b41a5e-3a47-437b-bc5c-ee0789222a97	143	中午	zhōngwǔ	Buổi trưa	我中午去商店。	Buổi trưa tôi đi cửa hàng.
35735094-6ed1-4f5d-b992-9451991a1a91	28b41a5e-3a47-437b-bc5c-ee0789222a97	144	住	zhù	Sống, ở	你住在哪儿？	Bạn sống ở đâu?
ba4588ac-2a76-4965-bc3c-85f66d866e33	28b41a5e-3a47-437b-bc5c-ee0789222a97	145	桌子	zhuōzi	Cái bàn	电脑在桌子上。	Máy tính ở trên bàn.
7e7ef660-b31f-4b90-9e85-5816a898a163	28b41a5e-3a47-437b-bc5c-ee0789222a97	146	字	zì	Chữ	这个字怎么写？	Chữ này viết thế nào?
8c79f730-e00f-4ffb-a030-ae85abe57be5	28b41a5e-3a47-437b-bc5c-ee0789222a97	147	昨天	zuótiān	Hôm qua	昨天是星期天。	Hôm qua là chủ nhật.
0459ab9a-5cb3-41a6-abfd-00966c064f65	28b41a5e-3a47-437b-bc5c-ee0789222a97	148	坐	zuò	Ngồi	请坐。	Mời ngồi.
4c2941e8-db2f-49fd-b877-af0b1816ff56	28b41a5e-3a47-437b-bc5c-ee0789222a97	149	做	zuò	Làm	你妈妈做什么工作？	Mẹ bạn làm công việc gì?
\.


--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.documents (id, category_id, title, description, download_url, doc_type, sort_order, is_published, created_at) FROM stdin;
a26adb06-04b6-4284-b600-bd1e51a9e345	2	Giáo trình chuẩn HSK 1 (Full bộ)	Sách bài học, Bài tập và Audio	https://drive.google.com/drive/folders/1NsBSkqHFmWaBs3fFbnY0NS7N4qx9ziOz	drive_folder	1	t	2026-04-20 09:33:00.869228+00
4967dc10-3def-4032-bd45-c7f8ff423a66	2	Bảng 150 từ vựng HSK 1	Từ vựng kèm phiên âm, nghĩa và ví dụ	#	pdf	2	t	2026-04-20 09:33:00.872237+00
3f947cbd-1af0-46ba-b7cc-14e6de405f7f	3	Giáo trình chuẩn HSK 2	Sách bài học và Audio	#	pdf	1	t	2026-04-20 09:33:00.875199+00
d6b88f18-865a-484f-89fb-ba5cad39a3d9	4	Giáo trình chuẩn HSK 3	Sách bài học và Audio	#	pdf	1	t	2026-04-20 09:33:00.879378+00
b5dd0765-318b-4668-a0bb-98d37151dc9f	5	Giáo trình chuẩn HSK 4	Sách bài học, tập 1 và 2	#	pdf	1	t	2026-04-20 09:33:00.881698+00
c9d5ad0c-4441-4024-bf0e-cfa74f71b6bc	6	Giáo trình chuẩn HSK 5	Sách bài học, tập 1 và 2	#	pdf	1	t	2026-04-20 09:33:00.883636+00
faea965c-0e4f-4dc4-8a9a-4fde0bc43a2f	7	Giáo trình chuẩn HSK 6	Tài liệu cao cấp nhất	#	pdf	1	t	2026-04-20 09:33:00.885632+00
ec3c9cc8-8f33-4d95-aff3-dd3b02ed358e	11	Trọn bộ Slide PPT HSK 3.0	Bài giảng PPT chi tiết Bài 1-15	https://drive.google.com/drive/folders/1yjy6g10i9a0lBfKMFH3vlYuM0H-nXrTG?usp=sharing	drive_folder	1	t	2026-04-20 09:33:00.887571+00
247edee0-7566-4400-ac6a-c08087d153b0	11	Giáo trình HSK 1 - 3.0	Sách giáo khoa chuẩn HSK 3.0 cấp độ 1	https://drive.google.com/file/d/1-tT5z7cXE8k8b87siTms_A6d3leBFU3Q/view?usp=drive_link	pdf	2	t	2026-04-20 09:33:00.889724+00
66d0b328-dfcc-4ebc-a746-99a7d5a2369e	11	Giáo trình HSK 2 - 3.0	Sách giáo khoa chuẩn HSK 3.0 cấp độ 2	https://drive.google.com/file/d/1PTa1CgZ4RncTIQIpScLo1I0xObSCczBS/view?usp=drive_link	pdf	3	t	2026-04-20 09:33:00.891567+00
03c1b4fb-3bfb-4ceb-ba22-89007ae1d83d	11	Giáo trình HSK 3 - 3.0	Sách giáo khoa chuẩn HSK 3.0 cấp độ 3	https://drive.google.com/file/d/1TTDW7UUVKajsw78W7otiGWit-y8ur-qj/view?usp=drive_link	pdf	4	t	2026-04-20 09:33:00.893384+00
\.


--
-- Data for Name: hanzi_cards; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.hanzi_cards (id, lesson_id, sort_order, "character", pinyin, meaning, mnemonic, stroke_count, radical) FROM stdin;
\.


--
-- Data for Name: import_jobs; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.import_jobs (id, uploaded_by, file_name, status, total_rows, processed_rows, failed_rows, error_log, category_id, started_at, finished_at, created_at) FROM stdin;
\.


--
-- Data for Name: lesson_categories; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.lesson_categories (id, slug, name, sort_order) FROM stdin;
1	intro	Nhập Môn	1
2	hsk1	HSK 1	2
3	hsk2	HSK 2	3
4	hsk3	HSK 3	4
5	hsk4	HSK 4	5
6	hsk5	HSK 5	6
7	hsk6	HSK 6	7
8	hsk79	HSK 7-9	8
9	english	Tiếng Anh	9
10	challenge	Thử Thách	10
11	hsk30	HSK 3.0 Mới	11
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.lessons (id, category_id, lesson_number, filename, title_cn, title_vn, icon, description, badge, is_published, sort_order, created_at, updated_at) FROM stdin;
29fa1a00-8be7-48ed-8f22-b3950fd0ed34	2	1	HSK1-LESSON1.html	你好	Xin chào	🌱	HSK 1 - Bài 1	\N	t	1	2026-04-20 09:26:14.46291+00	2026-04-20 09:26:14.46291+00
f52656ab-a7ea-472d-9f3a-d0454a24f551	5	1	HSK4-LESSON1.html	简单的爱情	Tình yêu giản đơn	🌱	\N	\N	t	1	2026-04-20 09:32:58.824955+00	2026-04-20 09:32:58.824955+00
95fea087-1e92-491e-8649-501903f17e9f	5	10	HSK4-LESSON10.html	幸福的标准	Tiêu chuẩn của hạnh phúc	🌻	\N	\N	t	10	2026-04-20 09:32:58.887688+00	2026-04-20 09:32:58.887688+00
ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	5	11	HSK4-LESSON11.html	读书好读好书好读书	Đọc sách tốt, đọc sách hay	🍎	\N	\N	t	11	2026-04-20 09:32:58.935753+00	2026-04-20 09:32:58.935753+00
378bae3e-44a5-4401-b0ea-ab060bad4208	5	17	HSK4-LESSON17.html	人与自然	Con người và thiên nhiên	🍊	\N	\N	t	17	2026-04-20 09:32:58.985722+00	2026-04-20 09:32:58.985722+00
2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	5	18	HSK4-LESSON18.html	科技与世界	Công nghệ và thế giới	🍓	\N	\N	t	18	2026-04-20 09:32:59.034391+00	2026-04-20 09:32:59.034391+00
5ba83c44-43e7-426f-ada6-fff00d1f58b5	5	19	HSK4-LESSON19.html	生活的味道	Hương vị cuộc sống	🍉	\N	\N	t	19	2026-04-20 09:32:59.086616+00	2026-04-20 09:32:59.086616+00
5730cd1e-2542-4e76-963c-e486be58a3d6	5	2	HSK4-LESSON2.html	真正的朋友	Người bạn chân chính	🌿	\N	\N	t	2	2026-04-20 09:32:59.136326+00	2026-04-20 09:32:59.136326+00
6ed7322c-6788-4c2f-8968-7e0c90647545	5	20	HSK4-LESSON20.html	路上的风景	Phong cảnh trên đường	🍇	\N	\N	t	20	2026-04-20 09:32:59.143668+00	2026-04-20 09:32:59.143668+00
454c76c6-81bf-436a-b7a5-655013dcc01f	5	3	HSK4-LESSON3.html	经理对我印象不错	Giám đốc ấn tượng tốt với tôi	☘️	\N	\N	t	3	2026-04-20 09:32:59.196626+00	2026-04-20 09:32:59.196626+00
9f05f51e-de7a-4ac4-9dba-99058e2213dd	5	4	HSK4-LESSON4.html	不要太着急赚钱	Đừng vội kiếm tiền	🍀	\N	\N	t	4	2026-04-20 09:32:59.202718+00	2026-04-20 09:32:59.202718+00
71ed0a29-0eb1-4002-aa88-6ec8004274f1	5	5	HSK4-LESSON5.html	只买对的不买贵的	Chỉ mua đúng không mua đắt	🍃	\N	\N	t	5	2026-04-20 09:32:59.256476+00	2026-04-20 09:32:59.256476+00
9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	5	6	HSK4-LESSON6.html	一分钱一分货	Tiền nào của nấy	🌳	\N	\N	t	6	2026-04-20 09:32:59.305532+00	2026-04-20 09:32:59.305532+00
98997a9b-854c-44b5-8ac5-b8b93bb173bc	5	7	HSK4-LESSON7.html	最好的医生是自己	Bác sĩ tốt nhất là chính mình	🍄	\N	\N	t	7	2026-04-20 09:32:59.35537+00	2026-04-20 09:32:59.35537+00
ccabd9d3-e17b-4f42-b129-5353e8ce5393	5	8	HSK4-LESSON8.html	生活中不缺少美	Cuộc sống không thiếu cái đẹp	🌸	\N	\N	t	8	2026-04-20 09:32:59.363558+00	2026-04-20 09:32:59.363558+00
47f278a6-c022-48e0-902e-b3e6f9eaae2c	5	9	HSK4-LESSON9.html	阳光总在风雨后	Sau mưa trời lại sáng	🌺	\N	\N	t	9	2026-04-20 09:32:59.416482+00	2026-04-20 09:32:59.416482+00
c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	6	1	HSK5-LESSON1.html	爱情的细节	Chi tiết trong tình yêu	🌱	\N	\N	t	1	2026-04-20 09:32:59.465226+00	2026-04-20 09:32:59.465226+00
901364ad-86ec-439b-9437-b0e37a5ec2a1	6	2	HSK5-LESSON2.html	留串钥匙给父母	Để lại chìa khóa cho bố mẹ	🌿	\N	\N	t	2	2026-04-20 09:32:59.593467+00	2026-04-20 09:32:59.593467+00
d740cadb-f179-44c5-94c2-b4765f846130	6	3	HSK5-LESSON3.html	人生有选择一切可改变	Cuộc đời có lựa chọn mọi thứ thay đổi	☘️	\N	\N	t	3	2026-04-20 09:32:59.734592+00	2026-04-20 09:32:59.734592+00
c4678e54-fba2-4dd8-99a5-772157e1962b	6	4	HSK5-LESSON4.html	子路背米	Tử Lộ vác gạo	🍀	\N	\N	t	4	2026-04-20 09:32:59.851861+00	2026-04-20 09:32:59.851861+00
c56dc1fc-104f-4f7e-b54e-a82981b5dec2	6	5	HSK5-LESSON5.html	济国的泉水	Suối nước Tế Nam	🍃	\N	\N	t	5	2026-04-20 09:32:59.967366+00	2026-04-20 09:32:59.967366+00
b9cc4d39-b092-42de-9a9c-c1341741f85d	7	1	HSK6-LESSON1.html	孩子给我们的启示	Điều trẻ em dạy chúng ta	🌱	\N	\N	t	1	2026-04-20 09:33:00.115059+00	2026-04-20 09:33:00.115059+00
0a6cda04-9de8-4c14-8c7c-0898e1044a4e	7	2	HSK6-LESSON2.html	父母之爱	Tình yêu cha mẹ	🌿	\N	\N	t	2	2026-04-20 09:33:00.244314+00	2026-04-20 09:33:00.244314+00
7e95c23b-0171-4f96-9541-36eb895ce6a8	7	3	HSK6-LESSON3.html	一盒月饼	Một hộp bánh trung thu	☘️	\N	\N	t	3	2026-04-20 09:33:00.407511+00	2026-04-20 09:33:00.407511+00
c529d5ca-454b-4f5a-b6d3-0965aad5304f	7	4	HSK6-LESSON4.html	完美的胜利	Chiến thắng hoàn hảo	🍀	\N	\N	t	4	2026-04-20 09:33:00.537218+00	2026-04-20 09:33:00.537218+00
2c45fed9-5798-4042-a668-09d8231443df	7	5	HSK6-LESSON5.html	学一门外语需要理由吗	Học ngoại ngữ cần lý do không?	🍃	\N	\N	t	5	2026-04-20 09:33:00.675878+00	2026-04-20 09:33:00.675878+00
28b41a5e-3a47-437b-bc5c-ee0789222a97	10	1	challenge-hsk1.html	挑战HSK1	Thử Thách HSK 1	🔥	\N	HOT	t	1	2026-04-20 09:33:00.809375+00	2026-04-20 09:33:00.809375+00
\.


--
-- Data for Name: media_files; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.media_files (id, owner_type, owner_id, media_type, file_name, storage_key, cdn_url, mime_type, file_size_kb, uploaded_by, created_at) FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.permissions (id, code, name, description) FROM stdin;
1	users:manage	Quản lý người dùng	Thêm, sửa, xóa người dùng
2	lessons:manage	Quản lý bài học	Đăng, sửa, xóa bài học
\.


--
-- Data for Name: quiz_options; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.quiz_options (id, question_id, sort_order, option_text, is_correct) FROM stdin;
d4aa1686-146a-44b0-a2c5-e3d27dd0738e	754a85c5-de7b-48fa-b6df-bb0966c385ec	0	最漂亮的夫妻	f
54a79c7b-6b63-42d3-8146-3df2a58312c4	754a85c5-de7b-48fa-b6df-bb0966c385ec	1	最恩爱的夫妻	t
f3be0c87-05da-4a7b-bdea-31646f5c22a0	754a85c5-de7b-48fa-b6df-bb0966c385ec	2	最富有的夫妻	f
e2a2904b-cf15-41ca-942f-535e9f97feb1	754a85c5-de7b-48fa-b6df-bb0966c385ec	3	最聪明的夫妻	f
d990b924-71ee-41f2-a3d5-23e113f6ceab	b956b53c-b56f-4fe9-8fd4-0f3fbb6b85bd	0	两对	f
78550290-8dfd-4e27-a708-623cd6811223	b956b53c-b56f-4fe9-8fd4-0f3fbb6b85bd	1	三对	t
2a544ef2-032d-472c-a112-690ff178bfd4	b956b53c-b56f-4fe9-8fd4-0f3fbb6b85bd	2	四对	f
c8c34fec-03ed-48e3-bcd4-3cccf4ca8106	b956b53c-b56f-4fe9-8fd4-0f3fbb6b85bd	3	五对	f
d8892ef9-b9cd-41df-ab97-6c48084560ee	5630da5f-17ac-4d1d-826c-47daae15352d	0	丈夫瘫痪了	f
57ed9004-228e-4551-9985-c67ec3724b25	5630da5f-17ac-4d1d-826c-47daae15352d	1	妻子瘫痪了	t
0e08ef83-dcf0-42e0-81df-f431c47dfdc0	5630da5f-17ac-4d1d-826c-47daae15352d	2	丈夫有心脏病	f
5f9bae74-1ef8-4d61-880e-e53f3a227658	5630da5f-17ac-4d1d-826c-47daae15352d	3	妻子有心脏病	f
730b4c75-eda1-441c-8716-4de8b7285059	087e4ed7-ddd5-42f3-9bc8-b3a46959c58f	0	很大	f
2973f27c-32e3-43f6-a10d-2bad9ef9f5cd	087e4ed7-ddd5-42f3-9bc8-b3a46959c58f	1	一定能站起来	f
0fa57689-f000-4dc2-8248-f662f3908b3c	087e4ed7-ddd5-42f3-9bc8-b3a46959c58f	2	很小	t
5e9b7371-e368-4370-b2e6-9893c1425aa9	087e4ed7-ddd5-42f3-9bc8-b3a46959c58f	3	完全不可能	f
fe9ad21b-7c17-444d-9ba6-9b49351b5570	4b342670-dfa1-4423-91bc-924730b74455	0	会跟她离婚	t
70668671-db62-4da4-b4fc-44c281ffd542	4b342670-dfa1-4423-91bc-924730b74455	1	会和她一起自杀	f
8f36f206-7454-454c-bf78-301a6afef66c	4b342670-dfa1-4423-91bc-924730b74455	2	会去外地工作	f
917b3f17-0967-41bf-a2e7-d29f94c64e60	4b342670-dfa1-4423-91bc-924730b74455	3	会找护工照顾她	f
24627f40-3177-4d60-8aa0-caff534d3400	f9a138b4-4fde-42c0-82a5-5dc50bcecbb5	0	离家出走	f
37b742b6-c5aa-4228-9be8-2c80159c4110	f9a138b4-4fde-42c0-82a5-5dc50bcecbb5	1	跟丈夫离婚	f
7dfd3c8d-cbe3-4727-a704-ad33e0d8d48b	f9a138b4-4fde-42c0-82a5-5dc50bcecbb5	2	想过自杀	t
900fcd56-caa3-4120-b4de-de7f7bd76ce5	f9a138b4-4fde-42c0-82a5-5dc50bcecbb5	3	再也不去医院	f
beae8b2c-6ccb-400c-b84b-9ee2334e2661	ae9953ba-6a64-4c46-b6c8-a1d02a3a83bd	0	偶尔照顾，经常抱怨	f
5c2de94a-cf80-432c-9358-d53642c95704	ae9953ba-6a64-4c46-b6c8-a1d02a3a83bd	1	几年如一日地照顾，从不抱怨	t
850d1857-6a1a-412e-8390-327828f6f958	ae9953ba-6a64-4c46-b6c8-a1d02a3a83bd	2	花钱请护士照顾	f
d63ecb1b-8548-43df-bddc-2fd73f15e2f2	ae9953ba-6a64-4c46-b6c8-a1d02a3a83bd	3	只找了一家医院治疗	f
f9763077-337e-4fa4-9dad-7fec13f15824	f58fdeaf-95dd-49cb-8f94-77488c83c6f0	0	感动得流下了眼泪	t
707ef3f5-def7-4df6-ac6d-be3322600b2c	f58fdeaf-95dd-49cb-8f94-77488c83c6f0	1	暗暗点头	f
39ec116e-c653-4a0a-bafe-07dfc655738c	f58fdeaf-95dd-49cb-8f94-77488c83c6f0	2	一时语塞	f
db72ad25-83df-43b2-ac6e-1d24678fc2e8	f58fdeaf-95dd-49cb-8f94-77488c83c6f0	3	觉得很普通	f
697078de-a077-4e7c-8ef9-844b26ff2cf6	585f8248-1f4d-49f2-acca-8173a6b08365	0	经常浪漫地旅行	f
46b67b9b-efb1-41a2-8abe-15f062cfc6ee	585f8248-1f4d-49f2-acca-8173a6b08365	1	一起经历了生死	f
f2e3ffaa-074b-4560-b361-e36bc79748ef	585f8248-1f4d-49f2-acca-8173a6b08365	2	从来没红过脸、吵过架	t
f4476a10-b4f0-4be0-8f3a-b0ddfdb22975	585f8248-1f4d-49f2-acca-8173a6b08365	3	妻子照顾生病的丈夫	f
fd0c76f1-f68e-4011-81d3-a5934d915355	3776146c-c0b9-4b01-8a8c-f3531595ed10	0	白头偕老	f
4085ae02-d76e-47e5-9a99-d20bf8ca1bad	3776146c-c0b9-4b01-8a8c-f3531595ed10	1	相敬如宾	t
2a8038ab-9a93-4cac-8a27-9bad5542a7ab	3776146c-c0b9-4b01-8a8c-f3531595ed10	2	恩重如山	f
a71eb454-10ee-4b4a-a165-d98dd754eddf	3776146c-c0b9-4b01-8a8c-f3531595ed10	3	马马虎虎	f
4d529e89-f92e-4ae5-b325-c08b6759b757	893d9863-a586-4dff-b8bb-2bd251ea47a8	0	他们迟到了	f
b32063ae-1da8-42fd-b56c-8c6317c80515	893d9863-a586-4dff-b8bb-2bd251ea47a8	1	他们走错房间了	f
8e56cfc6-15ec-484a-9cc2-86c57445c8ce	893d9863-a586-4dff-b8bb-2bd251ea47a8	2	丈夫睡着了	t
1f53af0e-0186-43d4-8427-7db1e7bc1586	893d9863-a586-4dff-b8bb-2bd251ea47a8	3	妻子生病了	f
f28c4720-01a3-4aa0-bf23-5515173b8a47	3d6f1c08-19c4-4d9a-98a8-85d8db115d30	0	两人在热烈地聊天	f
286c10d8-0eed-4fc3-a889-377945db3e98	3d6f1c08-19c4-4d9a-98a8-85d8db115d30	1	两人在吃东西	f
46900818-37bd-41ba-b662-6f3732ee0c56	3d6f1c08-19c4-4d9a-98a8-85d8db115d30	2	男人的头靠在女人的肩膀上	t
f6858c08-cf23-412a-bf27-591ba0d81dc2	3d6f1c08-19c4-4d9a-98a8-85d8db115d30	3	两人在吵架	f
67ee260e-0bbe-4daf-b7d9-f49a7a99eac4	7121a156-ce85-4c9e-bbc0-80418e48150c	0	大声叫醒丈夫	f
6378d716-e3bc-4fe2-b81f-63e691bddabd	7121a156-ce85-4c9e-bbc0-80418e48150c	1	伸出手指，做了个小声的动作	t
87048354-1a2b-4b60-8076-3e91ae7d0c53	7121a156-ce85-4c9e-bbc0-80418e48150c	2	马上站起来	f
928cb034-48a8-497d-9c77-d6eb0576587e	7121a156-ce85-4c9e-bbc0-80418e48150c	3	向评委招手	f
98ad88dc-3c1a-49fb-a69f-b3a3527e086a	6c3f586f-d3f0-4f80-954d-f6a67f8a3ca0	0	因为她是左撇子	f
7439ac22-c218-4fd7-acdd-407476a2da09	6c3f586f-d3f0-4f80-954d-f6a67f8a3ca0	1	因为右肩让丈夫的脑袋靠着	t
5fff1815-f9b7-4ab7-bf5c-2754d70b8c9f	6c3f586f-d3f0-4f80-954d-f6a67f8a3ca0	2	因为右手受伤了	f
3d081c95-fb3d-45dd-9726-9fff3b08d293	6c3f586f-d3f0-4f80-954d-f6a67f8a3ca0	3	因为左手写字好看	f
d10b06a5-dc6d-4a96-b97f-2bd9c71dfdaa	ac9b1e96-af78-4b31-b572-19cbf0a7e515	0	我们弃权了	f
cdf91ade-d6b5-4031-93b4-3857114d3c5f	ac9b1e96-af78-4b31-b572-19cbf0a7e515	1	别出声，他昨晚没睡好	t
365e9287-d751-49d9-b384-1b5aae4933cb	ac9b1e96-af78-4b31-b572-19cbf0a7e515	2	请再等我们十分钟	f
030f2fec-547a-492d-98b7-09909f76b3b0	ac9b1e96-af78-4b31-b572-19cbf0a7e515	3	他生病了，需要休息	f
abcdc62b-1ab9-4027-a8b9-1a792ec7cf6e	65ccc44a-f337-4b9b-bd71-66eecc259eea	0	因为他看电视看晚了	f
4638de01-19ae-43bf-944a-bb4e6d70c873	65ccc44a-f337-4b9b-bd71-66eecc259eea	1	因为他一直在工作	f
e7d7b294-5c9a-4cd3-a75a-eebc4e75bbe6	65ccc44a-f337-4b9b-bd71-66eecc259eea	2	因为他在为妻子赶蚊子	t
e4be089b-4d91-4166-8118-39f630c158f5	65ccc44a-f337-4b9b-bd71-66eecc259eea	3	因为他有失眠症	f
8f04f07c-885c-4709-ae9d-23e9c3067ecd	272ed9bf-63b6-4963-bad9-442a8683e68e	0	要求叫醒丈夫	f
ab0ee41d-300e-43f6-96e7-65f952fe701b	272ed9bf-63b6-4963-bad9-442a8683e68e	1	要求他们退出比赛	f
edde5a6d-bc43-42dd-94ff-5ca72d2d5a0e	272ed9bf-63b6-4963-bad9-442a8683e68e	2	要求听他们叙述如何恩爱	t
46727d3e-0640-4ea4-8762-8d5beb38dfd2	272ed9bf-63b6-4963-bad9-442a8683e68e	3	要求他们回家睡觉	f
0a93aa44-b7e9-4c23-9993-e9c34c44f870	a5eba8e6-c5df-4b59-977a-097f30a5376e	0	等他醒了再说	f
d9c917e4-e6d4-4d98-82d3-ca4cce39b3a8	a5eba8e6-c5df-4b59-977a-097f30a5376e	1	难道这还不够吗？	f
a5ff1a89-2c00-45ba-8690-41e4085c68a1	a5eba8e6-c5df-4b59-977a-097f30a5376e	2	我们没什么好说的	f
77ec4a47-061e-4207-abec-3c4df04a0cff	a5eba8e6-c5df-4b59-977a-097f30a5376e	3	那我们就不参加了	t
fc2f0247-ced0-4fd4-8476-ff17d343f420	5ead471f-c166-4c08-8997-c96d330b9381	0	哈哈大笑	f
71b7fdd0-a197-486a-86ae-d4cf34320ef8	5ead471f-c166-4c08-8997-c96d330b9381	1	非常生气	f
f1092f80-f563-4c7e-8fb1-24283a3d470c	5ead471f-c166-4c08-8997-c96d330b9381	2	居然一时语塞	t
d159506f-ffe9-450e-a2ad-87b991ce1ce0	5ead471f-c166-4c08-8997-c96d330b9381	3	继续追问	f
0fa85fe0-6b4a-44d2-8aaa-b5cff2a6f48c	940ffd5f-a53e-4174-a71d-7473c2311526	0	第一对	f
cb4797fd-6b90-4349-9732-e842a60cbb30	940ffd5f-a53e-4174-a71d-7473c2311526	1	第二对	f
97f366d6-8576-45b7-9f73-6950ae033014	940ffd5f-a53e-4174-a71d-7473c2311526	2	第三对	t
7bc5019c-c8e7-4569-8475-687cef834170	940ffd5f-a53e-4174-a71d-7473c2311526	3	没有选出	f
34cedacb-4db4-4106-b415-dc4b7243881b	98460a3d-31ff-4c9d-b9ba-d4c463455fa8	0	县里	f
a6755b62-afe1-4107-b044-d3dea3f98b09	98460a3d-31ff-4c9d-b9ba-d4c463455fa8	1	城里的新房	f
81295e65-b806-47f0-881f-eedb16da02a7	98460a3d-31ff-4c9d-b9ba-d4c463455fa8	2	农村老家	t
492e212b-db12-450d-b67e-aca7118ea5c5	98460a3d-31ff-4c9d-b9ba-d4c463455fa8	3	大城市	f
e0730e17-6617-4785-8704-cbe730f5be0a	13432c5f-77f5-4d29-8f54-c35a4f1ab291	0	恋人之间的感情	f
cb87d2e4-95d0-4d61-b71e-1e2c41cca337	13432c5f-77f5-4d29-8f54-c35a4f1ab291	1	没断奶的孩子对母亲一样	t
f24ab762-1146-4000-b002-92893ec97c95	13432c5f-77f5-4d29-8f54-c35a4f1ab291	2	鱼和水的关系	f
708bf99b-9da2-4341-9899-16c7a566a554	13432c5f-77f5-4d29-8f54-c35a4f1ab291	3	学生对老师的感情	f
e6daf999-1333-473c-91e2-9e0f6d523040	5cf5d887-0a08-4645-a479-5e9edcdbb85b	0	儿子和媳妇	f
c08ed9f9-eb8d-4ab4-bd19-68705630402d	5cf5d887-0a08-4645-a479-5e9edcdbb85b	1	姥姥、舅舅和姑姑	t
651229a7-df5b-4d96-b9a9-59757bbd3e2f	5cf5d887-0a08-4645-a479-5e9edcdbb85b	2	爷爷和奶奶	f
53c9e77d-5c08-4f61-8e8a-90c354986d27	5cf5d887-0a08-4645-a479-5e9edcdbb85b	3	邻居朋友	f
49335926-9139-435a-bf01-f23164a81b45	7ab68acb-6b45-46e5-b7b9-8a49b357a981	0	父母给的	f
ddca07b1-c8a8-482d-8d20-ffb2fba6b7f2	7ab68acb-6b45-46e5-b7b9-8a49b357a981	1	借朋友的	f
bb6d2bca-8a81-4601-ac93-548bbce60a8b	7ab68acb-6b45-46e5-b7b9-8a49b357a981	2	中彩票的	f
50fad52b-87f8-43bc-8406-8a0e74b6bd3f	7ab68acb-6b45-46e5-b7b9-8a49b357a981	3	打工挣的钱	t
b25085c5-18b7-428e-bc85-cd8cffa805de	ae4f42e7-9430-4f48-929f-8118b21f4d23	0	农村	f
7c9a4827-032d-4a99-9450-6a7c205a69c7	ae4f42e7-9430-4f48-929f-8118b21f4d23	1	省城	f
9ae1dcac-ba1a-4e5a-8449-52a38716fd1c	ae4f42e7-9430-4f48-929f-8118b21f4d23	2	县里	t
142e9c1e-a3f0-46eb-8d39-934a8b4398b6	ae4f42e7-9430-4f48-929f-8118b21f4d23	3	市中心	f
5dfbad99-412b-46c1-88c9-b2f490fcaa76	9320d210-e47a-42c7-90cc-a95cf9983da7	0	很不习惯	f
2a430701-f2b2-4dc7-90cf-e1e36692478b	9320d210-e47a-42c7-90cc-a95cf9983da7	1	觉得太小	f
5cdd1b2d-5f38-49fe-bf68-fa6a63b4d141	9320d210-e47a-42c7-90cc-a95cf9983da7	2	高兴得不得了	t
682168e2-54b9-448d-9fa3-5b9b8f2eb051	9320d210-e47a-42c7-90cc-a95cf9983da7	3	非常伤心	f
934fd1a1-430f-4501-a8a8-df7438eadb6d	50448f25-9ec2-423c-a2bf-5376fcc23a5f	0	高兴地接受了	f
d45696ae-72d0-4870-839c-2eadabd8ba3f	50448f25-9ec2-423c-a2bf-5376fcc23a5f	1	他们拒绝了	t
22153fb3-2f52-45b2-8eda-d3555c8049f5	50448f25-9ec2-423c-a2bf-5376fcc23a5f	2	要了两串	f
5e15be41-f296-47fd-b044-774234c7f0bc	50448f25-9ec2-423c-a2bf-5376fcc23a5f	3	说以后再说	f
38d24d2b-42e7-42dc-b6e6-ffe7b554af79	37db3942-b103-4765-997e-97a1b95b2bbd	0	父亲生病了	f
a8a0cbfb-9409-4fe0-9e25-0d5422edbc70	37db3942-b103-4765-997e-97a1b95b2bbd	1	父亲喝醉了	t
34264ac4-2bf3-4993-8c27-df7279cea02f	37db3942-b103-4765-997e-97a1b95b2bbd	2	父亲迷路了	f
45de65ad-be78-49d9-ac0a-339a790f5460	37db3942-b103-4765-997e-97a1b95b2bbd	3	父亲很早就睡了	f
240b2432-3895-4410-9f1b-727a791fc57a	12e3d734-d93f-4d17-af25-dd8d5da490dd	0	要点生活费	f
25fa1d83-d248-4274-a0a6-a90a37aa63ce	12e3d734-d93f-4d17-af25-dd8d5da490dd	1	想去城里住	f
dc4303a7-0684-4dd2-917a-6513435a258d	12e3d734-d93f-4d17-af25-dd8d5da490dd	2	要一串新房的钥匙	t
98aa6f1a-c263-4f12-9e64-6c04f46781a1	12e3d734-d93f-4d17-af25-dd8d5da490dd	3	想和他们一起走	f
e71ad821-85f2-446f-b3c7-a2324c3711aa	ecb32de1-fedd-4804-b902-3a9668460282	0	想把老屋卖了	f
73309071-ecf4-4130-941f-6069e4c7208e	ecb32de1-fedd-4804-b902-3a9668460282	1	顺便晒被子、打扫卫生	t
3c2e9ef3-1ca6-4dac-85af-a7d335ba8646	ecb32de1-fedd-4804-b902-3a9668460282	2	想把房子租出去	f
22e15c02-e9ad-4585-a6b6-a17ebe087665	ecb32de1-fedd-4804-b902-3a9668460282	3	想每天去住	f
76fe06ca-5867-4f7d-a647-9c6595b2f786	67de830a-2260-4945-aa6e-2cd969a8973a	0	像个严厉的老师	f
8a648249-fc7b-4a77-8969-6868b81ea062	67de830a-2260-4945-aa6e-2cd969a8973a	1	像个害羞的孩子	t
e94ff477-3407-4fd1-9ac5-cbb50c6ca5a2	67de830a-2260-4945-aa6e-2cd969a8973a	2	像个生气的长辈	f
f811afd3-fa36-40c4-86ed-adb684502ecb	67de830a-2260-4945-aa6e-2cd969a8973a	3	像个自豪的英雄	f
4ee0b2e5-06a5-40cb-8874-8950ffc6c4b4	5044140b-68dc-40e7-b23f-afb1fb9dd0ec	0	一个初夏的早晨	f
1a8d06aa-b81b-4729-92d1-25b7428f0dd0	5044140b-68dc-40e7-b23f-afb1fb9dd0ec	1	一个深冬的夜里	t
2e1b7c40-e3a1-40ad-88f1-361b98129a2b	5044140b-68dc-40e7-b23f-afb1fb9dd0ec	2	一个秋天的下午	f
e367b819-36aa-4f4b-bc8f-da9cc2590673	5044140b-68dc-40e7-b23f-afb1fb9dd0ec	3	一个春天的中午	f
4faf74fa-7da5-40fa-ba16-f46cf0e69fe3	ec9ba858-d095-4e88-8cdb-2920fe54f911	0	肚子饿了	f
2d019615-48ea-4a07-ae19-c30e94986cf8	ec9ba858-d095-4e88-8cdb-2920fe54f911	1	想念爷爷奶奶	f
591f0935-0544-49a6-b2ff-4c3f7a252b88	ec9ba858-d095-4e88-8cdb-2920fe54f911	2	被冻得大哭	t
b3781f58-b96d-4099-892b-b64c55aff2c8	ec9ba858-d095-4e88-8cdb-2920fe54f911	3	找不到玩具	f
de414395-e5fd-45c9-a0c2-e4b34ef3f9d6	4c0f0053-27cf-48c5-8765-e7c4197d8408	0	温暖明亮	f
79d13c08-fc47-4cc9-9716-40e44be9df67	4c0f0053-27cf-48c5-8765-e7c4197d8408	1	满是灰尘、冷冷清清	t
dafefcc8-907f-44ec-bcb2-0831e546727f	4c0f0053-27cf-48c5-8765-e7c4197d8408	2	热热闹闹的	f
bd6317fd-0c18-49f6-a98d-7f0845896b36	4c0f0053-27cf-48c5-8765-e7c4197d8408	3	被小偷偷了	f
9ac2477e-8f5a-4ac6-a6cb-4f885c20dcc2	aef45c9f-9f5e-4367-8437-ea0e2ab954e9	0	门没锁	f
3bac08b5-c959-4e20-bfe3-1afa75f0df5a	aef45c9f-9f5e-4367-8437-ea0e2ab954e9	1	邻居家很吵	f
7eb83501-0da3-41c4-ac41-e79551c82675	aef45c9f-9f5e-4367-8437-ea0e2ab954e9	2	自家亮着灯光	t
d1355783-f2bf-49d3-9468-5c59e4225a8a	aef45c9f-9f5e-4367-8437-ea0e2ab954e9	3	楼下有只流浪狗	f
343d5784-89e6-4c1e-9a5a-2c9c938c593a	1e0c2d0a-f2bd-4d09-b980-2f9f952bcdad	0	微笑着的父母	t
adcba179-3485-42b0-93a1-22b338f46424	1e0c2d0a-f2bd-4d09-b980-2f9f952bcdad	1	亲戚朋友	f
012e7897-c4d3-47c9-ab90-fa9772036b0b	1e0c2d0a-f2bd-4d09-b980-2f9f952bcdad	2	房东	f
c4df09b0-f606-46a7-9efe-9fd32d3b0b04	1e0c2d0a-f2bd-4d09-b980-2f9f952bcdad	3	小偷	f
c8199c3f-32ae-4c01-b45b-49664912e1ea	c2ad1b94-b516-4158-839b-b0bdfc04a1cc	0	暖气开着	f
5f7de2c6-4932-4f95-83f4-6faaa5c293c6	c2ad1b94-b516-4158-839b-b0bdfc04a1cc	1	水已温热	f
e7b8f1fc-cd5d-438a-8484-0db86302b0a4	c2ad1b94-b516-4158-839b-b0bdfc04a1cc	2	被子铺好	f
67b20022-1385-4807-9327-577498e80a8e	c2ad1b94-b516-4158-839b-b0bdfc04a1cc	3	地上满是灰尘	t
8917c44c-5c65-4cd1-9d3a-e6e5b777549c	a7c2196f-9f3f-474f-998c-a2cfd35c1b55	0	邻居说的	f
7b229e3e-404d-41d6-8e2b-2ab1478ac3d3	a7c2196f-9f3f-474f-998c-a2cfd35c1b55	1	前天写的信	f
a032c941-bc22-41d0-bf2e-bf740b9b1954	a7c2196f-9f3f-474f-998c-a2cfd35c1b55	2	昨天接到电话知道的	t
6203f7ea-1d7b-4cae-83dc-e22e0bed56dc	a7c2196f-9f3f-474f-998c-a2cfd35c1b55	3	猜到的	f
c9f006c0-f705-4c13-95b1-9b7cb3a86949	99b3d095-c400-4022-985d-5f1a15323e8c	0	为了省自己家的电费	f
df6bf7b1-a459-48cb-ac96-accc37efc951	99b3d095-c400-4022-985d-5f1a15323e8c	1	想检查房子	f
16aa048a-c4ea-4d36-925f-3ccc353f907b	99b3d095-c400-4022-985d-5f1a15323e8c	2	想在城里享受生活	f
bd60b1d1-55e1-4e47-82ca-917791aa8c5c	99b3d095-c400-4022-985d-5f1a15323e8c	3	为了让孩子们回来时能立刻感受到家的温暖	t
5c268d63-0c69-4373-9179-2b4999525562	df9207e7-85c1-4969-8244-214d3229c350	0	高兴地笑了	f
5707ff44-b860-4bf3-81d6-345ae283ddda	df9207e7-85c1-4969-8244-214d3229c350	1	鼻子一酸，流下了热泪	t
e7017163-7fd0-4e0d-9a0a-39e187cd9cc9	df9207e7-85c1-4969-8244-214d3229c350	2	马上跑去厨房	f
1f40561d-931e-407e-93c6-c43d2959cc18	df9207e7-85c1-4969-8244-214d3229c350	3	打电话给朋友炫耀	f
c4455ca5-f3fd-4768-b447-077cf28a60b7	d35f8840-cc57-4e59-b16a-acec9be6624a	0	医生	f
9b4ac31f-5953-4ff6-96fd-d288a9272a81	d35f8840-cc57-4e59-b16a-acec9be6624a	1	铁路工人	t
f9a0849e-1494-4f0a-b94d-7f82d113f756	d35f8840-cc57-4e59-b16a-acec9be6624a	2	老师	f
914971d4-b246-4695-9f08-146cb5b6d162	d35f8840-cc57-4e59-b16a-acec9be6624a	3	司机	f
e1c5cf95-9918-49c3-be60-37719a671af9	3a5bdea8-e3bb-4a0d-a579-3199c493c4fc	0	很贫穷	f
83600661-2179-4191-9754-ae915d9fa3be	3a5bdea8-e3bb-4a0d-a579-3199c493c4fc	1	工作稳定、有房有车	t
32d1cae3-54e1-40e5-ba09-1cefda12edd0	3a5bdea8-e3bb-4a0d-a579-3199c493c4fc	2	经常搬家	f
a49435f1-728d-46c5-b99e-60438ee0ead5	3a5bdea8-e3bb-4a0d-a579-3199c493c4fc	3	每天都很忙	f
5ebfab60-e9f4-4a9a-b527-6cccb0fa4d56	15441acc-f463-4152-b60d-fe8ce06cc7e5	0	因为没钱	f
1fba8b67-111f-405a-9875-10e8b08c65d5	15441acc-f463-4152-b60d-fe8ce06cc7e5	1	因为生病了	f
21a012b4-5b59-47a4-982a-66d00b10a67d	15441acc-f463-4152-b60d-fe8ce06cc7e5	2	不想一辈子过平静的生活	t
1dd80949-44ac-40f6-adb3-b96f7581e5d2	15441acc-f463-4152-b60d-fe8ce06cc7e5	3	因为被辞退了	f
122fbc3f-7fea-495a-ab4e-18486e966275	ee2c517d-cbd5-41b3-b907-3ff965650dd2	0	朋友介绍	f
2038c965-2fe3-4e64-a887-922e6d8c7bb4	ee2c517d-cbd5-41b3-b907-3ff965650dd2	1	在海边玩时	f
dba496b0-ada9-4b8d-ad0d-55c5cf17cb3e	ee2c517d-cbd5-41b3-b907-3ff965650dd2	2	看书知道的	f
ce509919-ff40-4bce-ac53-6e85fefb0c1a	ee2c517d-cbd5-41b3-b907-3ff965650dd2	3	通过电视	t
1231bc19-6158-4123-a720-353400746a4b	ec1c0d9a-5161-4bbe-9bd4-1820457fecf4	0	成功之门	f
57d483fc-3518-4c7e-b340-2aff710268a1	ec1c0d9a-5161-4bbe-9bd4-1820457fecf4	1	财富之门	f
055dd65f-e91f-46b5-afaa-980d308f4a7d	ec1c0d9a-5161-4bbe-9bd4-1820457fecf4	2	"世界之门"	t
579047ff-2e28-4bac-b028-3b5485234aa3	ec1c0d9a-5161-4bbe-9bd4-1820457fecf4	3	幸福之门	f
f765ad64-eafd-4e46-9b97-10a08481365d	48b23027-c89f-42f3-939c-356e7d859190	0	卖房卖车买了一艘二手船	t
450cfca2-0624-442e-94c2-124b7375cfc9	48b23027-c89f-42f3-939c-356e7d859190	1	借钱买的	f
fb388301-c5d6-4448-9461-1cf22a8d767e	48b23027-c89f-42f3-939c-356e7d859190	2	父母给钱买的	f
a8fdc1fa-235e-44de-b71f-76ac44e91fc7	48b23027-c89f-42f3-939c-356e7d859190	3	分期付款买的	f
1a2f32d6-a0e1-4ad5-b6f2-bbda3d460d31	423c1619-d500-484d-82e0-1a19c1987adb	0	非常支持	f
9dd1d5f8-211e-47c3-95fd-77f755282ff6	423c1619-d500-484d-82e0-1a19c1987adb	1	觉得他"疯了"	t
33d3a42d-36d0-439c-911f-975df06dae04	423c1619-d500-484d-82e0-1a19c1987adb	2	很羡慕	f
d6d1bf30-671a-4bc4-87c0-5ed31305f904	423c1619-d500-484d-82e0-1a19c1987adb	3	想和他一起去	f
90b09f17-bd07-4c1a-abea-1d581dfc71e2	e5cf35a7-783a-4a93-8c4d-ca6fde3cc0c2	0	开船	f
8ed6dc8e-8358-48a1-bf65-5d21941940d3	e5cf35a7-783a-4a93-8c4d-ca6fde3cc0c2	1	看书、学习、画画儿	t
7a8e322c-47ed-4eba-bc48-c9acf991e05d	e5cf35a7-783a-4a93-8c4d-ca6fde3cc0c2	2	钓鱼	f
de9ccc7c-2621-4ea8-b1aa-b171d865ac09	e5cf35a7-783a-4a93-8c4d-ca6fde3cc0c2	3	睡觉	f
2350df0f-af7b-4c31-acce-a4fb536559ea	22353adc-0d37-49ad-8904-522d29f103c6	0	清晨	f
f8cea51d-1087-4a99-b0e7-bf050f0aded1	22353adc-0d37-49ad-8904-522d29f103c6	1	中午	f
4d0df801-0333-4c0e-9433-76da4587586f	22353adc-0d37-49ad-8904-522d29f103c6	2	下午	f
63628251-e226-49bd-a1c3-00461aadb4b2	22353adc-0d37-49ad-8904-522d29f103c6	3	傍晚	t
267c2571-f508-4fe4-80a3-0d2b4873c0ef	5432396b-7234-4df5-a8ae-6f4c4bda52ef	0	天下无难事	f
29163863-5116-45ae-84b9-b658c857b3b3	5432396b-7234-4df5-a8ae-6f4c4bda52ef	1	可上山，勿下海	t
55ae997d-9c6a-486c-a336-bc7ad83c5581	5432396b-7234-4df5-a8ae-6f4c4bda52ef	2	早去早回	f
12d6fd0b-ffc2-4144-8082-4b0db7c5b78d	5432396b-7234-4df5-a8ae-6f4c4bda52ef	3	不到长城非好汉	f
f3948049-9760-4c29-8741-a394791181fe	829d10bf-67d6-4d1d-a48b-25a6c00d3965	0	没有食物的时候	f
c61ab9c4-e96a-4b9e-9283-8b3465b74a7b	829d10bf-67d6-4d1d-a48b-25a6c00d3965	1	遇到海盗	f
60b28a41-84a6-4686-99fb-1c5d28bed833	829d10bf-67d6-4d1d-a48b-25a6c00d3965	2	雷电交加的时刻	t
c48d780f-3d80-4daa-bb1e-fc733ab7fd1f	829d10bf-67d6-4d1d-a48b-25a6c00d3965	3	生病的时候	f
18006d63-207a-4540-8be0-ee4e47e13039	01f3da5b-66fe-4df6-af70-3606ef555296	0	立刻跳入海中	f
1db7893f-8ce1-435f-a394-60f9e014f2ef	01f3da5b-66fe-4df6-af70-3606ef555296	1	赶紧打电话求救	f
4eaf77f4-09c4-4efb-abfe-6ffd03d95aa2	01f3da5b-66fe-4df6-af70-3606ef555296	2	躲在床下	f
6c4ece8f-0c92-4c14-880c-8278a08764b8	01f3da5b-66fe-4df6-af70-3606ef555296	3	紧紧拥抱在一起	t
15a6f68a-2108-480b-90dd-eaf53e7552f9	89f113d9-ca8d-423b-9603-0d9b6e0e58b1	0	一个月	f
e7b3e193-f009-4845-be47-43b23e9f5596	89f113d9-ca8d-423b-9603-0d9b6e0e58b1	1	三个月	f
c2b8515e-257c-4d7c-8841-c392d3c03c38	89f113d9-ca8d-423b-9603-0d9b6e0e58b1	2	半年	f
c0f7947f-30cd-4afc-a09f-d32bbc88108d	89f113d9-ca8d-423b-9603-0d9b6e0e58b1	3	八个月	t
fc777bc7-d9b6-4289-b0f6-e15bfebbd129	4b4741c7-cc9c-486c-aad0-d3d31e97c4d7	0	一次度假	f
c680a3a5-ee85-4a53-84b1-0c36c3e821ae	4b4741c7-cc9c-486c-aad0-d3d31e97c4d7	1	人生道路上一段长长的台阶	t
f06a0fa1-7bf4-4436-8bc3-20ec9ee99751	4b4741c7-cc9c-486c-aad0-d3d31e97c4d7	2	一次赚钱的机会	f
15e3f15c-7b7b-4087-a2d1-a604edec2cac	4b4741c7-cc9c-486c-aad0-d3d31e97c4d7	3	一个错误	f
6a4adaea-888f-4a46-ae54-a207761f32fb	664237cb-0279-4c8a-9484-0cc14beb0d52	0	欧洲	f
befea305-824b-4feb-95fc-a735e938df62	664237cb-0279-4c8a-9484-0cc14beb0d52	1	美国	f
6de6ab05-aaa1-4887-a424-399cb0f6c0ac	664237cb-0279-4c8a-9484-0cc14beb0d52	2	澳洲和新西兰	t
d18ea23e-4619-41a3-b39c-d31c18538650	664237cb-0279-4c8a-9484-0cc14beb0d52	3	非洲	f
d70ec888-c19e-451a-832d-16760fba221f	d5b19d2c-3c16-4f58-b967-20945bf44ab1	0	唐朝	f
f7526282-b65c-47e1-bcce-12c3a861b646	d5b19d2c-3c16-4f58-b967-20945bf44ab1	1	春秋时期	t
fe80dbbb-dc66-4628-bff3-7b55e8077f44	d5b19d2c-3c16-4f58-b967-20945bf44ab1	2	清朝	f
21ea7a73-e136-49e1-bbf4-7119e585bad8	d5b19d2c-3c16-4f58-b967-20945bf44ab1	3	战国时期	f
cae36a6d-8e0e-4949-b06a-29923c2edac9	667438c7-6529-4e0f-aa3b-69965b39bb3f	0	孟子	f
ec5e1628-88d9-41c9-bd75-244e2326851c	667438c7-6529-4e0f-aa3b-69965b39bb3f	1	老子	f
e29acd00-c775-4a80-b36c-ded814e154e9	667438c7-6529-4e0f-aa3b-69965b39bb3f	2	孔子	t
1d435cc9-191e-416e-8330-f15fb512da60	667438c7-6529-4e0f-aa3b-69965b39bb3f	3	庄子	f
be7a62f9-9b8d-4f4b-87a2-e559c9ba6cc3	2f7f6fc0-190a-415f-b08e-fea73da736f0	0	因为连年的战争	t
30f42177-8e0d-493d-ab2a-79b0f154b28d	2f7f6fc0-190a-415f-b08e-fea73da736f0	1	因为父母生病	f
d042b6ea-0c26-4235-86eb-823c4f78819e	2f7f6fc0-190a-415f-b08e-fea73da736f0	2	因为没有土地	f
bd13c015-189b-4574-be0b-17ce9b9cdf28	2f7f6fc0-190a-415f-b08e-fea73da736f0	3	因为收成不好	f
5cbb35a9-e5ac-4a0f-89a4-7d4054f64d3a	9f987899-e242-4d8e-a05d-0bfd41cc203f	0	能住上大房子	f
be1f8e85-9bae-4dec-bd43-7a9c9eddf597	9f987899-e242-4d8e-a05d-0bfd41cc203f	1	能饱饱地吃上一顿米饭	t
20e2bee4-5ee0-4b89-8a65-3b036c1d22e2	9f987899-e242-4d8e-a05d-0bfd41cc203f	2	能吃鱼和肉	f
618664b5-62a1-4509-884c-f0f3129745ed	9f987899-e242-4d8e-a05d-0bfd41cc203f	3	能赚很多钱	f
3d8150c8-d46d-4ee4-bdde-0af7ae052866	9580f452-ba61-49f1-a14c-9e766bab5619	0	非常生气	f
6fcfabfd-c5a5-4acb-97b1-7a7dad15d271	9580f452-ba61-49f1-a14c-9e766bab5619	1	十分惭愧	t
048b9108-ee85-4f21-8e24-1da74dadd8ea	9580f452-ba61-49f1-a14c-9e766bab5619	2	觉得无所谓	f
f0a19b1f-f917-4dcb-8f22-cf0786350ae5	9580f452-ba61-49f1-a14c-9e766bab5619	3	很开心	f
5a3a0a99-0d50-4f66-b498-ef03c3bdad3e	3932919a-5a55-42d1-95b4-f70092cac5c7	0	去亲戚家借钱	f
908e6d2f-121f-42cf-bdc4-d8c82436306d	3932919a-5a55-42d1-95b4-f70092cac5c7	1	去当兵	f
f841e85b-5b9f-4ee3-a995-05f8540d3fe6	3932919a-5a55-42d1-95b4-f70092cac5c7	2	去百里之外有钱人家试着找活干	t
c52fbe3b-3a32-42c9-a7e8-4935572b1418	3932919a-5a55-42d1-95b4-f70092cac5c7	3	去集市卖东西	f
a87e8cd2-0696-4deb-844d-46678bb6f5f4	58e25f5f-e16b-4d15-8127-aca3d210b12c	0	见他很聪明	f
beb86f7b-f12f-4363-b56b-7557ee11b970	58e25f5f-e16b-4d15-8127-aca3d210b12c	1	见他身体结实	t
7a8327db-8f2b-4809-86b4-7c829b65d9b8	58e25f5f-e16b-4d15-8127-aca3d210b12c	2	见他很可怜	f
8fa73514-a78b-4040-b226-64d4975b9b14	58e25f5f-e16b-4d15-8127-aca3d210b12c	3	见他老实	f
22b4e863-1df9-4e2c-a13e-4c6c3e437fd7	9c267cb7-c041-4cfb-8906-e0d7f44757e2	0	钱被偷了	f
8a369782-6aa5-4305-a428-c4df0a4fc230	9c267cb7-c041-4cfb-8906-e0d7f44757e2	1	找不到回家的路	f
0b2effa3-f46a-4955-a1b7-2ea12beb5866	9c267cb7-c041-4cfb-8906-e0d7f44757e2	2	主人给的银子比应该得到的多	t
9a101a86-02f5-43cc-be1c-61bf7a8d4e01	9c267cb7-c041-4cfb-8906-e0d7f44757e2	3	主人不想给他钱	f
6b0592fe-0a17-4789-80dc-586e0cd316f5	87764b74-80b9-4f3f-a640-89474139fea1	0	算错钱了	f
0b764650-8a91-4e82-8f72-7de3d9ccae21	87764b74-80b9-4f3f-a640-89474139fea1	1	因为他家里穷	f
09e3a1f8-152d-4673-bbe8-73d63e5206eb	87764b74-80b9-4f3f-a640-89474139fea1	2	作为送给父母的礼物	f
2e88f605-cc5c-4c42-bd4c-c66a14863dd0	87764b74-80b9-4f3f-a640-89474139fea1	3	因为他做事勤快，是给他的奖金	t
b08e5000-9fbb-4b1e-9b86-b513ba7263fd	0a6be5b0-bb70-4708-a9d7-83656a425d08	0	只有一袋米	f
0b2c5491-2634-42f7-ac87-b7d73756ffb5	0a6be5b0-bb70-4708-a9d7-83656a425d08	1	一袋米、一块肉、两条鱼	t
4fa3becd-d4d4-47d6-a470-e1e9b3c663fb	0a6be5b0-bb70-4708-a9d7-83656a425d08	2	很多衣服	f
89925239-6787-4509-8ea8-73192cdced70	0a6be5b0-bb70-4708-a9d7-83656a425d08	3	很多书	f
c82c2ba3-50dc-4624-a224-86b4557a9785	4a7e00f9-c738-4ce2-bc9c-d930e1498d0c	0	遇到了老虎	f
ad22bd32-734f-4daf-821c-5e82973c6677	4a7e00f9-c738-4ce2-bc9c-d930e1498d0c	1	迷路了	f
04d65a2d-42cd-4e10-af63-0ceb5adce692	4a7e00f9-c738-4ce2-bc9c-d930e1498d0c	2	天气寒冷，大雪路滑，差点把米袋甩出去	t
796a2f01-3726-4890-b0af-eefed72175da	4a7e00f9-c738-4ce2-bc9c-d930e1498d0c	3	遇到了强盗	f
6455a4d3-db55-4b5c-9470-00464838ad40	545faea1-0f44-49c9-b07f-1348970378cc	0	把他赶走了	f
90afa526-40c7-4ace-83a2-1ccbb732c0e6	545faea1-0f44-49c9-b07f-1348970378cc	1	觉得他有本领，留他做官并给优厚待遇	t
e3a42e94-c8fc-4737-977e-eee4c5ec7724	545faea1-0f44-49c9-b07f-1348970378cc	2	让他继续种地	f
456a00e4-cf24-42e8-a1df-6b2d4d91f9e5	545faea1-0f44-49c9-b07f-1348970378cc	3	把他关了起来	f
a0b457ae-be3f-4b5a-8595-7c84dfa4db17	06e99ceb-61e0-4e11-8717-d62ed901b102	0	非常高兴，忘了父母	f
41487344-c810-4762-9e03-d6fb6e349f94	06e99ceb-61e0-4e11-8717-d62ed901b102	1	觉得自己很了不起	f
6c5ac38b-c44d-4f8b-b766-d79a893c0691	06e99ceb-61e0-4e11-8717-d62ed901b102	2	常常遗憾父母不在了，不能和自己过好日子	t
a83b8bc4-4120-40ff-bad5-a0e052e477e1	06e99ceb-61e0-4e11-8717-d62ed901b102	3	想马上回老家炫耀	f
019f58bb-0da4-4003-bd59-43bcfd287b44	1e7237f0-649e-419a-ac28-7b42e4aa2e27	0	孝顺父母是各种美德中占第一位的	t
98e53cbc-f82d-49a6-bee1-543d3227aac8	1e7237f0-649e-419a-ac28-7b42e4aa2e27	1	要做一百件好事	f
a113b464-25fa-4eb4-b260-1ba603d255a6	1e7237f0-649e-419a-ac28-7b42e4aa2e27	2	孝顺很容易	f
a4ef13fb-1c8f-4413-bf74-5e1a9e7c4981	1e7237f0-649e-419a-ac28-7b42e4aa2e27	3	好人一定会有好报	f
f89af66c-e6b6-49c0-9c7d-d69e450c6d86	3552c7f5-05b5-4ea0-9235-2aee4735d8c8	0	赚钱很重要	f
3d67be8f-693a-4b79-af2c-97c4ffc6e716	3552c7f5-05b5-4ea0-9235-2aee4735d8c8	1	子路的做法（孝顺父母，不怕辛苦）确实值得我们学习	t
767bb06f-039a-4415-beba-de851339fbef	3552c7f5-05b5-4ea0-9235-2aee4735d8c8	2	不要在雪天走路	f
6a69c9ce-0c77-49fb-856b-a722a932fe38	3552c7f5-05b5-4ea0-9235-2aee4735d8c8	3	打工一定要找有钱人	f
402c2ba6-f431-4601-b74b-7eef8a3dcb1d	d120d7bb-c11b-47b4-b439-97355c855ab7	0	1000多年前	f
69ecaf47-3e52-4028-8dbd-a1ffd9edd8ee	d120d7bb-c11b-47b4-b439-97355c855ab7	1	2000多年前	f
7cb023ee-479d-40a4-aa30-a30351ac8bae	d120d7bb-c11b-47b4-b439-97355c855ab7	2	3000多年前	t
cd64df18-2f02-4101-8f34-70007617578b	d120d7bb-c11b-47b4-b439-97355c855ab7	3	4000多年前	f
08d13b34-5c7f-428d-98ad-1a326a1851bf	1dd17027-033b-4c63-8220-a2fe3040c368	0	只描写了颜色	f
e94227b0-3f4e-4141-9371-550468095c4f	1dd17027-033b-4c63-8220-a2fe3040c368	1	声音、颜色、形状、味道	t
74e1128f-b7a2-4f64-842f-a0e66c57173f	1dd17027-033b-4c63-8220-a2fe3040c368	2	只描写了声音和形状	f
1bf2e49d-2629-4644-bfde-32c7f1ffc833	1dd17027-033b-4c63-8220-a2fe3040c368	3	深度、温度、颜色	f
9afb8612-8322-4604-b426-c082ba091db7	e6b719bb-86c7-43ad-9711-f3ea15347c26	0	抱怨之情	f
e82a8a56-3824-48a6-8cab-46f3a7889428	e6b719bb-86c7-43ad-9711-f3ea15347c26	1	害怕之情	f
c398ff21-65b4-45bf-bc7f-64fe7e21e5e2	e6b719bb-86c7-43ad-9711-f3ea15347c26	2	感激之情	t
4e2200fa-cf64-4a10-bf23-9bea3adf9c48	e6b719bb-86c7-43ad-9711-f3ea15347c26	3	好奇之情	f
0cf7b46e-8f97-43c7-a3e0-815f10a89ae7	2e3877d7-3eed-4a60-b963-f98ca7e501a8	0	许多美丽的传说	t
3783f364-b4fe-4e92-b71f-ddb9220eec20	2e3877d7-3eed-4a60-b963-f98ca7e501a8	1	很多诗歌	f
2a8b8408-6272-4ab5-928b-60df84f7e16e	2e3877d7-3eed-4a60-b963-f98ca7e501a8	2	很多历史书	f
c6e07ef6-1a11-4d07-8133-3efb6dbfdd21	2e3877d7-3eed-4a60-b963-f98ca7e501a8	3	很多神话动物	f
2ff7a93c-f677-4eb1-b5d3-9daadfa9bc1c	e0516714-87c2-474e-9953-185f9bb06bb3	0	鲍全	t
6ec164e8-ad7f-4ce4-b272-6db811ad72c1	e0516714-87c2-474e-9953-185f9bb06bb3	1	李白	f
6d27b0d8-f701-4e75-8058-e5512f833efd	e0516714-87c2-474e-9953-185f9bb06bb3	2	孔子	f
4cd5764a-766a-4741-a7d1-5d3b47be5931	e0516714-87c2-474e-9953-185f9bb06bb3	3	舜	f
1d46964f-13be-476e-bb00-1fdc983711f3	aab6d6ad-6fc4-40b3-b188-3d5cdff2fb2f	0	种地的	f
205c2fe5-84bf-41f9-b935-bc4a9aa7d521	aab6d6ad-6fc4-40b3-b188-3d5cdff2fb2f	1	做生意的	f
58857ddf-d329-4369-993e-0b317de37fde	aab6d6ad-6fc4-40b3-b188-3d5cdff2fb2f	2	学习医术，救了很多人的	t
9a6f06c9-2a66-47e1-aeb8-c9c4b16cb346	aab6d6ad-6fc4-40b3-b188-3d5cdff2fb2f	3	当官的	f
c87f955a-b562-464e-a087-311ba2a80230	4de063be-3019-42ea-a15e-d7c93db3c6a1	0	一个普通的农民	f
e97dd612-1c4a-4c4f-8d0a-31092bdf5503	4de063be-3019-42ea-a15e-d7c93db3c6a1	1	皇帝	f
5b7fede8-1279-4be4-83d4-6bf21fbffa9a	4de063be-3019-42ea-a15e-d7c93db3c6a1	2	东海龙王的哥哥	t
d09b4d56-ce7f-4881-8065-20c698699e2c	4de063be-3019-42ea-a15e-d7c93db3c6a1	3	神仙	f
18e41c67-c970-4742-a47b-5f7c249340d5	e3b07768-1a44-43b3-8c0f-43317ebaefd1	0	很多金银财宝	f
452b069c-cc12-47ea-8d5b-167858b7bded	e3b07768-1a44-43b3-8c0f-43317ebaefd1	1	治病救人的白玉壶	t
e0c8e71f-7236-4bac-87fb-dfc129284872	e3b07768-1a44-43b3-8c0f-43317ebaefd1	2	一把宝剑	f
baa0a21f-d63b-4b0e-9ac5-c4a5977fac24	e3b07768-1a44-43b3-8c0f-43317ebaefd1	3	长生不老的药	f
15566e3e-70fd-4c11-9b0b-6279406fdf45	e03746e1-cc77-40da-94a1-15a1c4142228	0	为了好玩	f
fc61d154-b62a-46e5-8524-22baa1161c1c	e03746e1-cc77-40da-94a1-15a1c4142228	1	为了不被坏人抢走	t
8b10f12b-7bca-4e0b-8f62-87922250d357	e03746e1-cc77-40da-94a1-15a1c4142228	2	因为他不想要了	f
6752ee7f-7e93-4d04-b82a-458aafcc8361	e03746e1-cc77-40da-94a1-15a1c4142228	3	因为壶坏了	f
8819971b-e826-43fe-9607-9065a91c5dde	355ce1e7-e627-46d3-8452-7345ac90d79e	0	黑虎泉	f
26e4421c-0d25-47ea-a1f6-1f8d07cdb2f5	355ce1e7-e627-46d3-8452-7345ac90d79e	1	舜泉	f
25a46035-123d-4780-b14d-4b4f71e34b8a	355ce1e7-e627-46d3-8452-7345ac90d79e	2	趵突泉	t
9a63bf76-dbaf-49e7-816d-a9653c03be2f	355ce1e7-e627-46d3-8452-7345ac90d79e	3	珍珠泉	f
b634fd04-a2a7-4b73-a1f5-e1d13951f2a0	a210e50d-3107-4064-9cc2-1fc13d0f130b	0	七百多个	t
b75939a5-c7fa-4b59-8b08-6a670a381af4	a210e50d-3107-4064-9cc2-1fc13d0f130b	1	一百多个	f
2bf507ff-b65f-4b0f-bb53-a05d35050358	a210e50d-3107-4064-9cc2-1fc13d0f130b	2	一千多个	f
553f8a66-15f9-475d-a99b-6944087aeba6	a210e50d-3107-4064-9cc2-1fc13d0f130b	3	五十多个	f
76d3c368-8716-4e7d-9769-557b39b1e643	7f559e3a-55bf-4a48-bf52-f288cd292234	0	很常见	f
0cf0694b-6eec-448f-a1b9-c8a60b65e9a6	7f559e3a-55bf-4a48-bf52-f288cd292234	1	极为少有	t
6e4d446a-62b7-430b-ae17-daf49d99658f	7f559e3a-55bf-4a48-bf52-f288cd292234	2	每个城市都有	f
1edef250-ee0b-4685-8aa3-9d72691d8039	7f559e3a-55bf-4a48-bf52-f288cd292234	3	不奇怪	f
abd40874-5d2c-424f-b3fb-0b07f2d2cc64	eaabda30-3487-4dec-8506-fcdf11c30c1c	0	人名	f
0773a992-4cc9-4a6f-b8a2-c75c75d96948	eaabda30-3487-4dec-8506-fcdf11c30c1c	1	动物	t
dce78f70-208a-4aeb-8642-a1fca88fb1f9	eaabda30-3487-4dec-8506-fcdf11c30c1c	2	形状	f
a9b3d0c9-d65b-4d59-86b3-7d1040af3166	eaabda30-3487-4dec-8506-fcdf11c30c1c	3	颜色	f
dfe426a4-2445-413b-a8b9-3a0a3a277efc	8784fe49-2be8-4620-af80-7812513377eb	0	人名和形状	t
b1e17196-3968-44c7-a5e7-be1638320823	8784fe49-2be8-4620-af80-7812513377eb	1	动物和颜色	f
1f933628-2f3c-4917-b87e-bc6843eedcf3	8784fe49-2be8-4620-af80-7812513377eb	2	植物和人名	f
d8983549-c39d-4a9b-bdd1-9f9f7e492219	8784fe49-2be8-4620-af80-7812513377eb	3	形状和动物	f
c30cd72b-d709-45b5-9f53-85581b2928a1	d2dcbadb-82c9-46e4-8257-723de6839c60	0	黄河	f
f4e582da-19bc-4a4b-9348-ec897a23c9a0	d2dcbadb-82c9-46e4-8257-723de6839c60	1	济南市以北的平原	f
980940e9-e6e7-4721-87b4-f8f36ac380c2	d2dcbadb-82c9-46e4-8257-723de6839c60	2	济南市以南的广大山区	t
3b2a557b-bee1-4198-9edf-eeebdd216e78	d2dcbadb-82c9-46e4-8257-723de6839c60	3	地下河	f
eafe0a68-26f0-447b-bc25-4b836fffc024	16d8b2f3-6038-4968-9ed3-09a43fc856bc	0	火成岩	f
d15316a3-3cb1-4af6-9096-36c71b22f608	16d8b2f3-6038-4968-9ed3-09a43fc856bc	1	大理岩	f
9b6b6305-b9d7-4043-ac58-12c2709fe193	16d8b2f3-6038-4968-9ed3-09a43fc856bc	2	花岗岩	f
e356d9ae-e02d-472b-a321-68c33567beb8	16d8b2f3-6038-4968-9ed3-09a43fc856bc	3	石灰岩	t
b3c9dfe8-c89b-401f-b695-0dac80aaf63c	33e7d193-c8d8-46fb-ade7-16ec1387ac47	0	水很难进入	f
8083f3c4-8f24-4b43-914e-136c9184a26a	33e7d193-c8d8-46fb-ade7-16ec1387ac47	1	陆地表面的水很容易进入地下	t
8bfbb30e-17aa-437a-9c5a-b2cb733575a4	33e7d193-c8d8-46fb-ade7-16ec1387ac47	2	没有水	f
de3bc5c0-4d9c-455c-8936-7141306ec7fb	33e7d193-c8d8-46fb-ade7-16ec1387ac47	3	水会蒸发	f
32dc85b9-bd24-457d-8a96-565827949ff1	5b04204c-b238-4034-b566-af3877f95f6f	0	因为水往低处流	f
c2431c0c-a2eb-45af-a6d6-015f25b1f76a	5b04204c-b238-4034-b566-af3877f95f6f	1	因为有人工水渠	f
e35c2df1-9602-4129-a50a-73e8ef8611a5	5b04204c-b238-4034-b566-af3877f95f6f	2	因为山区的石灰岩层由南向北斜	t
b5155069-d786-4f1c-8c83-ec77717701b8	5b04204c-b238-4034-b566-af3877f95f6f	3	因为有风力推动	f
e90fd8e7-10a5-4643-b3cd-8f38609f41ad	8abf781f-15bb-4b0d-86c6-b7b64797d458	0	大石头	f
1d30013e-2104-4f9b-b68e-0a613d03c9bb	8abf781f-15bb-4b0d-86c6-b7b64797d458	1	火成岩	t
0b62699f-265c-4bad-a204-9fec5b471fc1	8abf781f-15bb-4b0d-86c6-b7b64797d458	2	很厚的泥土	f
093238c6-90a6-4f84-ba69-5a7b886d5e8f	8abf781f-15bb-4b0d-86c6-b7b64797d458	3	高楼大厦	f
a9875557-a037-4f2c-bfd9-5a1a79203231	d757cf9e-985e-4526-80a1-6744adf05105	0	因为地震	f
f5d3a53d-2363-488d-bae4-f6da672a9b27	d757cf9e-985e-4526-80a1-6744adf05105	1	因为人类挖掘	f
3b768881-b27b-4327-a036-f9cc9dda7aa2	d757cf9e-985e-4526-80a1-6744adf05105	2	因为无处可流且旧城地势低	t
52678e41-902d-4d56-8276-e66e89818883	d757cf9e-985e-4526-80a1-6744adf05105	3	因为温度太高	f
7e4e1514-ebf2-4bcd-8296-b30cec519186	cbc12bea-9ec8-433d-b067-53a80929d5f3	0	邻居	f
f4c0a925-8fad-4150-b68a-3aadcf8962a5	cbc12bea-9ec8-433d-b067-53a80929d5f3	1	亲戚	f
f8fea4e5-33e7-466c-aec5-3920dc2645c1	cbc12bea-9ec8-433d-b067-53a80929d5f3	2	同学	t
5478091f-7da9-4a1d-b737-2805aec2ef1b	cbc12bea-9ec8-433d-b067-53a80929d5f3	3	朋友的朋友	f
4576e8fe-cb39-467a-ba1b-41548178d1ef	83b06fad-9342-4aee-a6ba-3c54ff420d17	0	天天家里装修	f
212c30cd-6921-4da0-825f-79275251183c	83b06fad-9342-4aee-a6ba-3c54ff420d17	1	天天的父母要出差	t
8faf5aef-0de2-4646-88d1-6288b054fd22	83b06fad-9342-4aee-a6ba-3c54ff420d17	2	天天想找林林玩	f
61e2f2ed-030f-4671-afe2-82015a78e6c0	83b06fad-9342-4aee-a6ba-3c54ff420d17	3	天天生病了	f
30fc5273-28d2-427c-8f76-68b3678ed9f2	71e36d80-f26e-4fc6-88bd-8837341e0d00	0	有些为难	f
4e325cf9-c952-4f5b-bb5b-90bbd640e505	71e36d80-f26e-4fc6-88bd-8837341e0d00	1	极力反对	f
502cadb3-f074-4c04-b9af-81fd076dd403	71e36d80-f26e-4fc6-88bd-8837341e0d00	2	爽快地答应下来	t
73543d82-b5fa-4f22-8040-18da3d0ec242	71e36d80-f26e-4fc6-88bd-8837341e0d00	3	勉强同意	f
b2c3db9b-55c4-4af0-abc8-a17a28bc63a8	2499ed8b-e2b5-4459-94eb-a042cec572c3	0	很平淡	f
27f659dc-e970-4baa-ba04-c3f6141b7e1b	2499ed8b-e2b5-4459-94eb-a042cec572c3	1	最兴奋	t
abf70d9d-18ea-4c51-b4a6-9f77237eb6c2	2499ed8b-e2b5-4459-94eb-a042cec572c3	2	有点不情愿	f
e093a9a9-2473-4e3a-b35d-60618625ca27	2499ed8b-e2b5-4459-94eb-a042cec572c3	3	很紧张	f
a2fdf3c3-273f-44ae-983b-76e78a925fd8	d2b0d7b1-fabe-4a62-99ac-8b0719cd3bf0	0	床铺	f
1a2359f6-566a-4cd5-b78b-2bb77acabf88	d2b0d7b1-fabe-4a62-99ac-8b0719cd3bf0	1	衣柜	f
d5746910-1719-44a8-a15c-693063ec9206	d2b0d7b1-fabe-4a62-99ac-8b0719cd3bf0	2	书桌	t
6d8e6539-f1ee-4b94-a098-f2a467a22963	d2b0d7b1-fabe-4a62-99ac-8b0719cd3bf0	3	玩具	f
c6f6e790-6ade-40dd-a8dc-c59d33a7c5f5	36a15c41-c837-4448-a76e-87483fda9123	0	一直睡觉	f
942d6411-fcee-4cd4-ba3f-26d80ccc9c04	36a15c41-c837-4448-a76e-87483fda9123	1	变得异常勤劳	t
843b59f0-07ba-4859-8603-9db19768f4f0	36a15c41-c837-4448-a76e-87483fda9123	2	出去买好吃的	f
af42ff36-5e5f-4af1-b9ac-b44c0334a77e	36a15c41-c837-4448-a76e-87483fda9123	3	做很多作业	f
6e246c8b-7f2b-467d-92d5-b18be6c41453	1c526362-77ad-4af9-87b8-4f195106d616	0	更忙碌了	f
55be45e0-d5d4-4cd6-9a91-4f8609818043	1c526362-77ad-4af9-87b8-4f195106d616	1	异常省心	t
8be0707b-5f3e-4c59-bc8e-867eec83533f	1c526362-77ad-4af9-87b8-4f195106d616	2	很烦恼	f
4bea3f5d-38a2-4a82-b80b-824a5371b8af	1c526362-77ad-4af9-87b8-4f195106d616	3	没有什么变化	f
18a5f8cf-1823-4fb0-a506-dcec89316dc5	be51c0b9-a07a-4fd2-992b-da69a688aca4	0	需要父母大声叫醒	f
7ad69926-3bc5-462b-8979-af2780db847a	be51c0b9-a07a-4fd2-992b-da69a688aca4	1	不想起床上学	f
68141862-cda4-4b3b-b870-bb4ec95fd5d8	be51c0b9-a07a-4fd2-992b-da69a688aca4	2	不用叫就醒了	t
2c0bd594-db29-4357-8de7-c848da9b1973	be51c0b9-a07a-4fd2-992b-da69a688aca4	3	醒得很晚	f
cb6f082c-e926-4f47-ae68-8f23a08e993e	eea76c80-8002-46bd-a6ba-d15afaf9b9b0	0	因为孩子比他们聪明	f
75da0fe6-1f1b-4a5a-9342-11c8742d92a3	eea76c80-8002-46bd-a6ba-d15afaf9b9b0	1	因为孩子大有忽略父母的趋势	t
86c8d779-a482-46fe-a910-a3554d5e8191	eea76c80-8002-46bd-a6ba-d15afaf9b9b0	2	因为孩子不想吃饭	f
9c4cd19b-c5b1-4521-90df-848146cdd382	eea76c80-8002-46bd-a6ba-d15afaf9b9b0	3	因为孩子不愿意学习	f
9387e15e-adcd-4b38-a374-e8c984a32856	dc15504b-e540-4a6d-b4c7-798eebc953b4	0	电影内容	f
95c79c3e-4587-418c-9ec6-44ed73fda411	dc15504b-e540-4a6d-b4c7-798eebc953b4	1	学习方法	f
e16e8b84-2d9a-4dae-adb2-14e2c3a3ace6	dc15504b-e540-4a6d-b4c7-798eebc953b4	2	背后的议论同学	t
399513a8-3dfa-4349-9346-4ec29b627026	dc15504b-e540-4a6d-b4c7-798eebc953b4	3	老师的讲课	f
1b64a167-0474-44b8-a4a1-c202ca60fc51	e3c34c9c-e221-4b82-9030-42644117e546	0	她不爱学习	f
5ca1ef41-4904-4574-a928-735d8d284b3d	e3c34c9c-e221-4b82-9030-42644117e546	1	她老嘲笑别人	t
57319f63-599a-45ef-9b45-7d807b486b28	e3c34c9c-e221-4b82-9030-42644117e546	2	她长得不漂亮	f
b9a118a2-cefd-4728-b32c-6c2a06502153	e3c34c9c-e221-4b82-9030-42644117e546	3	她很小气	f
f48e409b-54e4-4167-9414-06fb9a55705f	ec91f3e9-0a03-4e92-b847-66fc328982f3	0	他最会讨好老师了	t
71608be0-347f-4cda-8835-8d7a8aeda709	ec91f3e9-0a03-4e92-b847-66fc328982f3	1	他经常打架	f
ee2bee1e-ce91-4a30-96df-32355ecaa248	ec91f3e9-0a03-4e92-b847-66fc328982f3	2	他不做作业	f
6c1cd798-8e91-47fb-882f-600bddceb45b	ec91f3e9-0a03-4e92-b847-66fc328982f3	3	他老欺负同学	f
a07d1cfd-6544-4d45-b2ef-9fd16fccb382	2cf71441-e38e-423d-a211-5d0869eb7fc1	0	一笑而过	f
dfcecd07-0d6d-4d9a-9698-e8e6b21975ad	2cf71441-e38e-423d-a211-5d0869eb7fc1	1	加入讨论	f
3e9463f1-8015-403d-96b2-9702fc1f8800	2cf71441-e38e-423d-a211-5d0869eb7fc1	2	郑重、严肃地指出来	t
07e6882f-bd19-4c27-b651-d2888e6ef6ee	2cf71441-e38e-423d-a211-5d0869eb7fc1	3	装作没听见	f
d80b7b18-7954-49fd-b0ef-b9db171a49db	8c1c66f3-ffc4-4f8d-91c3-482dc0a78d62	0	不理他们	f
66f770f2-a981-4a1f-b4fe-339816eb9349	8c1c66f3-ffc4-4f8d-91c3-482dc0a78d62	1	当面说	t
35226b76-55aa-481b-b562-d941ca8530ba	8c1c66f3-ffc4-4f8d-91c3-482dc0a78d62	2	告诉老师	f
62abe4fb-6a81-4f1e-a011-4187914c4ae6	8c1c66f3-ffc4-4f8d-91c3-482dc0a78d62	3	写在日记里	f
ec81c123-0729-4f76-806a-2139de75a59d	8abe0184-490e-489c-85f3-5d6e86f0757e	0	朋友要互相帮助	f
5c74b57a-b6de-4a46-bb48-59eb24322e36	8abe0184-490e-489c-85f3-5d6e86f0757e	1	大家要和睦相处，对人要宽容	t
698a9212-2384-4b19-912f-6f6ca4fb7866	8abe0184-490e-489c-85f3-5d6e86f0757e	2	学习更重要	f
1a1030f2-64b9-4a55-9a83-d9458e4ba8f9	8abe0184-490e-489c-85f3-5d6e86f0757e	3	不要总是聊天	f
fe184d92-6cd1-4146-9aa3-2928324953b0	3a220182-ea24-420d-b8c2-4c09dab532a9	0	非常惭愧	f
59da9b0e-4abb-44e5-b4bd-b3f81705c463	3a220182-ea24-420d-b8c2-4c09dab532a9	1	一脸的疑惑	t
b69e2c8c-0b29-4ce9-91cd-e2f1e35e3e82	3a220182-ea24-420d-b8c2-4c09dab532a9	2	很生气	f
d73d507d-f315-4333-977d-f0fe9775739f	3a220182-ea24-420d-b8c2-4c09dab532a9	3	大声哭泣	f
f407c643-f747-4eff-84a3-2bd712d51750	a1fc9879-3a07-4bc2-a365-adb5d1f3eb2f	0	为什么不能讨厌同学	f
5b1e51e2-7dda-4bb7-8b71-710e0a6637ce	a1fc9879-3a07-4bc2-a365-adb5d1f3eb2f	1	父母是不是也经常说别人坏话	t
99011c27-8767-4797-a01e-74c824ce3b39	a1fc9879-3a07-4bc2-a365-adb5d1f3eb2f	2	为什么老师喜欢高春来	f
7cde596c-fe73-43c3-b440-d0c57a2b0a2f	a1fc9879-3a07-4bc2-a365-adb5d1f3eb2f	3	父母有没有撒过谎	f
1fbce880-9da4-4eaf-8d1f-00731a824e89	72b53537-467e-44e2-8aa3-d4f3a80bccec	0	大声反驳	f
2d67b69d-7abf-4dae-871c-1a42395d776b	72b53537-467e-44e2-8aa3-d4f3a80bccec	1	把女儿打了一顿	f
4a996920-a214-49b0-bfa2-db57e8e6891d	72b53537-467e-44e2-8aa3-d4f3a80bccec	2	瞬间被问得说不出话来	t
39bfe86f-7adb-48b2-b3d8-8db9165b461f	72b53537-467e-44e2-8aa3-d4f3a80bccec	3	马上承认错误	f
cd8695f7-f4e2-4011-a3f6-a9e9a9b51e6c	09a7fb3d-4ed7-4743-9310-e5abdc1790be	0	太纵容孩子了	f
e5ce8eb7-025d-4952-891f-2c0aeb3cadc8	09a7fb3d-4ed7-4743-9310-e5abdc1790be	1	实行的是两套标准	t
de4fb88c-3ac6-4c4e-adae-68f316a6166a	09a7fb3d-4ed7-4743-9310-e5abdc1790be	2	陪伴孩子太少	f
af974e50-8f42-4bfd-a436-b74b508fecb1	09a7fb3d-4ed7-4743-9310-e5abdc1790be	3	没有了解孩子的朋友	f
4b09db46-4328-4935-a39d-575ea8bac84b	a7b6d3b0-5176-480c-9291-132801aee4fc	0	约束好自己的言行	t
bdb3648a-24a7-4a66-99d9-f1aba0574e4d	a7b6d3b0-5176-480c-9291-132801aee4fc	1	给孩子找个好伙伴	f
a333ad80-9fb6-42d7-8d7f-8087f3850455	a7b6d3b0-5176-480c-9291-132801aee4fc	2	严格管教孩子	f
151d20e1-9639-427c-8c9f-8d48f89b6bf6	a7b6d3b0-5176-480c-9291-132801aee4fc	3	多跟老师沟通	f
95a9e360-5f37-4ac3-8c64-18348be166c9	0e6bc6c3-2d42-4183-b3ab-b9fc8cdace0b	0	经常吵架的家庭	f
38c32743-0e6a-4956-ab64-1f63398822de	0e6bc6c3-2d42-4183-b3ab-b9fc8cdace0b	1	有爱的家庭	t
57992e98-ee17-44dd-ba21-4d5e377a05a4	0e6bc6c3-2d42-4183-b3ab-b9fc8cdace0b	2	十分贫穷的家庭	f
63be7766-2329-4d29-a7a2-71ae0b5c82c1	0e6bc6c3-2d42-4183-b3ab-b9fc8cdace0b	3	单亲家庭	f
292655b6-c4c1-42bd-bf7a-68d871db5a4a	3567d013-b7b1-4e77-9aec-57074b2c9b84	0	感情和睦，很少吵架	t
6581a384-e2f4-4c6a-8afe-2f67f63a9348	3567d013-b7b1-4e77-9aec-57074b2c9b84	1	总是互相埋怨	f
86fbc9e1-71de-40a8-8d37-1751fe6119d2	3567d013-b7b1-4e77-9aec-57074b2c9b84	2	感情一般	f
d8209e8b-fe07-42d7-b62c-243e971be353	3567d013-b7b1-4e77-9aec-57074b2c9b84	3	经常闹别扭	f
effc9ead-a99e-479f-a934-92d7672bc478	6bfab40d-a6c2-4fd1-ad2b-4245effe8e43	0	严厉	f
d789f198-c222-495a-bca4-2eb020070226	6bfab40d-a6c2-4fd1-ad2b-4245effe8e43	1	疑惑	f
5718acca-970b-42cb-a771-b6559e26ab57	6bfab40d-a6c2-4fd1-ad2b-4245effe8e43	2	慈祥	t
ab85046c-9548-4d87-8e61-8eadeed6a678	6bfab40d-a6c2-4fd1-ad2b-4245effe8e43	3	嫉妒	f
9603a681-044b-46b5-b911-14353cdf3a01	96f66b48-4fee-491f-bd07-cda2d7b48dcd	0	经常去外地旅游	f
bb9c85a9-ac6d-4ffb-9769-b1ee842e50e8	96f66b48-4fee-491f-bd07-cda2d7b48dcd	1	已经能够独立生活	f
90084e94-bd2d-443f-83c0-babd4929e9b0	96f66b48-4fee-491f-bd07-cda2d7b48dcd	2	从没有离开过家	t
9dd67aa5-b26c-46d6-8a51-42bb6728ba1b	96f66b48-4fee-491f-bd07-cda2d7b48dcd	3	在亲戚家长大	f
bb37c952-3deb-4233-847d-dc86d45ee422	d10fff1f-5019-4b13-a851-0f66c1c6a30b	0	因为父母太唠叨	f
d6eff7f9-3ae6-4c5b-afe2-1f776a4b0c13	d10fff1f-5019-4b13-a851-0f66c1c6a30b	1	因为想摆脱繁重的学业	f
bc696893-ca73-449f-a119-5127ce5e0913	d10fff1f-5019-4b13-a851-0f66c1c6a30b	2	脱离父母对"我"有巨大的诱惑	t
0ba705ef-bb57-4c38-810f-a96427f202ed	d10fff1f-5019-4b13-a851-0f66c1c6a30b	3	因为想去大城市赚大钱	f
a7c17bb0-2d80-411b-811d-477dec92557b	66791f39-11b4-47ae-ac91-958187d353c5	0	充满了新鲜感	f
19ecb32e-343c-4e37-96fc-4321118f576f	66791f39-11b4-47ae-ac91-958187d353c5	1	心里的孤独感跑了出来	t
c48cbc35-b125-406b-99b8-6f269adc8373	66791f39-11b4-47ae-ac91-958187d353c5	2	感到异常兴奋	f
f8a3fb16-d963-408d-8b04-392aa2d55d99	66791f39-11b4-47ae-ac91-958187d353c5	3	马上就适应了	f
939b0dc5-c080-4fc4-a4c5-2fe4cfc2d252	8edba1a7-4fcc-442e-84a2-acfe3b30c04c	0	抱怨食堂难吃	f
1dbe8a10-391c-49f3-ad10-1d329e20b323	8edba1a7-4fcc-442e-84a2-acfe3b30c04c	1	要很多生活费	f
7aa3b5b4-efd3-425c-9801-4a568a3e68a9	8edba1a7-4fcc-442e-84a2-acfe3b30c04c	2	就会哭鼻子	t
bee0b694-5170-41c4-9aec-261fedc25a5b	8edba1a7-4fcc-442e-84a2-acfe3b30c04c	3	滔滔不绝聊大学生活	f
9663f02d-f6ca-4b70-9309-4e69203c6e6f	72dd0696-fab8-4a29-a077-b8641210c6a0	0	片刻不停地往家赶	t
dcacf9f8-9cef-4ef3-b2a6-1e836fcafcd6	72dd0696-fab8-4a29-a077-b8641210c6a0	1	都去外面打工	f
fa1a723e-60bf-4001-abb0-d08d2c6f95ee	72dd0696-fab8-4a29-a077-b8641210c6a0	2	呆在宿舍睡觉	f
8c2f890f-4953-43b4-a010-4dac48500b23	72dd0696-fab8-4a29-a077-b8641210c6a0	3	结伴去旅游	f
84b8003e-b4f7-4b4f-84c6-2107ad8ad898	2d653f8d-4323-4f67-babf-1cee1dffbd11	0	坐飞机的头等舱	f
644cae74-0989-4f67-8bcb-6ce27d0ffa4d	2d653f8d-4323-4f67-babf-1cee1dffbd11	1	坐一夜的火车	t
801198e7-bfdb-42fc-9b34-d8057ee33a43	2d653f8d-4323-4f67-babf-1cee1dffbd11	2	连续走几天的路	f
18ec8e22-e2b7-41a4-a3b3-48bbe2ae3710	2d653f8d-4323-4f67-babf-1cee1dffbd11	3	花光所有积蓄	f
e5d8b678-14b9-4c8e-aa7c-a93c0fdaa075	24a98e0e-3a4f-4d9c-8a11-024a9ca6dc92	0	让"我"多带点特产回去	f
aacf63b9-1b8a-48a8-a130-0833de50ff4d	24a98e0e-3a4f-4d9c-8a11-024a9ca6dc92	1	问"我"需要多少生活费	f
23095cf1-143d-4698-b14d-12e4265d6695	24a98e0e-3a4f-4d9c-8a11-024a9ca6dc92	2	近来比较忙，没啥事甭回来了	t
d49e472b-02e2-4c28-a5ae-3967b70f858c	24a98e0e-3a4f-4d9c-8a11-024a9ca6dc92	3	让"我"马上回家团圆	f
a92af75d-552f-4ee6-a09c-9a467ac3b3dd	b7d6fb17-6a1b-47b2-84e6-ab5590026a0a	0	跟同学多去旅游	f
483d6c0e-0c6c-4cf7-872f-406e44201972	b7d6fb17-6a1b-47b2-84e6-ab5590026a0a	1	看看书，或找份兼职做做	t
e5911f4a-54a8-4746-ad6f-3f13602f3a75	b7d6fb17-6a1b-47b2-84e6-ab5590026a0a	2	参加学校的社团	f
ba9df3cc-5165-4094-b0d2-7b7ee56be15d	b7d6fb17-6a1b-47b2-84e6-ab5590026a0a	3	好好谈一场恋爱	f
ff6c5189-3337-49d9-a8a3-1483a07d73b5	7c368174-6ae8-431e-86be-f77b1cd23ac4	0	觉得松了一口气	f
ce3ed337-9f9f-4567-8acc-2165a4c8617c	7c368174-6ae8-431e-86be-f77b1cd23ac4	1	感到十分兴奋	f
ee8dc617-66f1-4bdb-bb5f-0c3810372900	7c368174-6ae8-431e-86be-f77b1cd23ac4	2	酝酿已久的恋家情绪刹那间没有了	t
111f80b3-63c7-4bcf-ab50-73afe9a2255b	7c368174-6ae8-431e-86be-f77b1cd23ac4	3	立刻哭了起来	f
cff37fd9-9586-4f21-bfb3-6356aa4133bc	9c4d11db-d4d8-4489-9087-a2e172cab088	0	觉得母亲是在锻炼我	f
83126247-57d9-4f71-af18-cdb29191c9ba	9c4d11db-d4d8-4489-9087-a2e172cab088	1	无法理解反常，暗暗埋怨父母不体谅我	t
978f568a-8d40-46c2-9337-64e116440256	9c4d11db-d4d8-4489-9087-a2e172cab088	2	认为这是理所当然的	f
ddafeee0-c308-428a-89ab-30ec51084192	9c4d11db-d4d8-4489-9087-a2e172cab088	3	感到非常欣慰	f
89770ce6-17a3-4345-bf52-b2845a7c0f7c	eae4305d-4591-4c76-8cf9-999158896677	0	直接买票跑回家	f
2a9e349f-c987-4303-aacf-10e187d7ba6b	eae4305d-4591-4c76-8cf9-999158896677	1	天天在宿舍里睡觉	f
c565d56d-4be4-4f7b-b9a3-bf1a30c103a2	eae4305d-4591-4c76-8cf9-999158896677	2	开始规划怎样熬过漫长的假期	t
29b87999-6cfd-4bc4-985d-d713a65c71aa	eae4305d-4591-4c76-8cf9-999158896677	3	打电话跟父母大吵一架	f
3fd0a02c-075d-40cf-935a-975a01bb3426	3a035098-7283-4ed6-954e-03c0ef0d6e46	0	人山人海，非常热闹	f
f629db00-d98f-44cf-9c4e-5566c4889fe6	3a035098-7283-4ed6-954e-03c0ef0d6e46	1	寂静得很	t
bd29799e-2ca0-4cd0-9ceb-7d53114fc1af	3a035098-7283-4ed6-954e-03c0ef0d6e46	2	和往常一样	f
9b813f84-6e62-4227-aee7-f4dc367f6053	3a035098-7283-4ed6-954e-03c0ef0d6e46	3	都在准备考试	f
58ed06e4-5fbe-4b2b-9bf5-a207c7f243c9	c3b876b1-40b4-44fc-a521-c2c74d339d09	0	在图书馆看书，给杂志社写稿件	t
3aa59698-e408-4740-8955-fbbc543c7e0a	c3b876b1-40b4-44fc-a521-c2c74d339d09	1	找了一份非常辛苦的兼职	f
db78783b-150f-4e8a-86d5-deadf1010fcb	c3b876b1-40b4-44fc-a521-c2c74d339d09	2	学会了做拿手的佳肴	f
d9b13141-ef21-40bf-a426-bc7d640cd9b1	c3b876b1-40b4-44fc-a521-c2c74d339d09	3	到处旅游开阔眼界	f
94e74145-7858-4b6f-b127-5eef080560de	4d3e9940-8429-46a4-aa20-5c32646e0512	0	满是心疼	t
c2e93810-f874-4039-80a7-6dd81af7d82a	4d3e9940-8429-46a4-aa20-5c32646e0512	1	充满了自豪	f
bf08536a-3ab9-47ce-b602-a2e9510680a1	4d3e9940-8429-46a4-aa20-5c32646e0512	2	异常严厉	f
f5b9cf86-8fee-4be1-9695-f6e9e29c1b70	4d3e9940-8429-46a4-aa20-5c32646e0512	3	十分冷漠	f
3426c89c-cf82-44fe-a6f0-34eda8715097	476ea274-921b-4d79-9562-588ef5578a6a	0	外面下大雨的声音	f
b4237184-0c20-4fdc-98fa-c572bc220bdd	476ea274-921b-4d79-9562-588ef5578a6a	1	母亲还在跟父亲唠叨	t
4bb8a5e5-cbfb-4d9a-8fa1-ed4405bc3e33	476ea274-921b-4d79-9562-588ef5578a6a	2	同学打来的电话	f
d41b4001-ba68-4b17-b78c-de4ba4033f7b	476ea274-921b-4d79-9562-588ef5578a6a	3	电视机里的声音	f
da7e06a0-4e8b-46d0-999c-4b24583f0723	8c1f5020-83f2-4fcc-bc63-bed1672f5703	0	必须多看书	f
c3385554-2c01-429f-aeff-1227baaf9a97	8c1f5020-83f2-4fcc-bc63-bed1672f5703	1	需要多结交朋友	f
2d44331a-375c-46d2-bd50-ae52e9ac6b7e	8c1f5020-83f2-4fcc-bc63-bed1672f5703	2	不吃苦，怎么长本事？	t
af162cde-cff7-4d4a-aeed-070e179f6ab7	8c1f5020-83f2-4fcc-bc63-bed1672f5703	3	必须有人帮忙	f
dddc49f6-03b4-43be-b5a6-c5d1266c4e38	3d2401cc-408f-4694-8006-fc851720c312	0	走上前去大声反驳	f
53826d4a-30e2-4b8b-8446-8c33648c50b8	3d2401cc-408f-4694-8006-fc851720c312	1	顿时什么都明白了，不由得热泪盈眶	t
431965ab-bbaf-41a2-9af3-41806f2b10a3	3d2401cc-408f-4694-8006-fc851720c312	2	假装没看见回房间睡觉了	f
f61d4703-abef-4f0f-8050-91c7ee36bc61	3d2401cc-408f-4694-8006-fc851720c312	3	感到非常生气	f
9d2230a2-0b01-4139-96b2-22ea80107ce7	e9ee5fc9-f6d7-4a1a-b374-4d17cc48a8ea	0	中午	f
98cd1970-cf0c-4b33-b499-c698cd075f64	e9ee5fc9-f6d7-4a1a-b374-4d17cc48a8ea	1	晚上	f
16158271-db59-41dc-8227-ccf347501648	e9ee5fc9-f6d7-4a1a-b374-4d17cc48a8ea	2	清晨	t
d361f453-f37c-4301-9291-074e8cf8ba8d	e9ee5fc9-f6d7-4a1a-b374-4d17cc48a8ea	3	下午	f
60a92854-bdab-4d9a-8feb-6f42c8591565	bcbe840f-1eff-4d4b-a7f3-3d8b4bb66071	0	一个西装革履的白领	f
b1f478ed-9612-4e06-8fa8-95dd4a6cbf47	bcbe840f-1eff-4d4b-a7f3-3d8b4bb66071	1	一位农民工模样的男人	t
f42dc6da-51ca-4230-87e0-1a1741d72939	bcbe840f-1eff-4d4b-a7f3-3d8b4bb66071	2	一个年轻的大学生	f
c6f4575c-9280-4fea-84a9-ff7c25cf1b19	bcbe840f-1eff-4d4b-a7f3-3d8b4bb66071	3	公司的老板	f
f4038861-00e4-4217-accf-ed74a8ee19e4	78605aee-d73a-4301-9287-3a68bb83a2e9	0	大声喊叫求助	f
1966b0a8-dfeb-44c5-aee1-dea28d5ceb9e	78605aee-d73a-4301-9287-3a68bb83a2e9	1	直接递给我一个月饼	f
7d25d0a9-3edb-4e3c-851c-619ca228fdc1	78605aee-d73a-4301-9287-3a68bb83a2e9	2	打量了我一番，到嘴边的话又不说了	t
df1421ca-0a76-41df-8dd5-25f50f24c524	78605aee-d73a-4301-9287-3a68bb83a2e9	3	转身就走开了	f
682df488-e47b-4c51-86ea-3aef18e9f768	daffc090-cac1-4629-9403-7e403afb1596	0	借钱买车票回家	f
96f77b7e-7290-4cd0-bb26-c8f62fd763a6	daffc090-cac1-4629-9403-7e403afb1596	1	帮忙介绍一份工作	f
ec7ae183-ee16-4f6f-86b3-43c3b633d089	daffc090-cac1-4629-9403-7e403afb1596	2	想请我帮他代收一下寄来的月饼	t
4ee47315-121b-44df-aebe-ef2f9eb3488a	daffc090-cac1-4629-9403-7e403afb1596	3	问怎么去火车站	f
cebc16a8-a44a-4654-8d76-a7a578e1ddc2	00669a86-2095-4ce8-9b96-091331be66de	0	饱经沧桑，胡须起码一星期没刮，南方口音	t
1600f24d-129a-46dc-ae76-26d0dd293aab	00669a86-2095-4ce8-9b96-091331be66de	1	戴着眼镜，斯斯文文的	f
116bd868-f8d9-4ce4-b9df-1b7962342c65	00669a86-2095-4ce8-9b96-091331be66de	2	穿着名牌，非常有钱	f
a0324853-2c6f-4561-8351-e5b49e44627f	00669a86-2095-4ce8-9b96-091331be66de	3	满脸都是油污的年轻人	f
80f8d324-4dad-4814-8da5-d78e53575fd7	f45e0eaa-47a0-40c4-b4c4-d3393c4994f1	0	建筑工人	f
b6dd5c6e-f870-4264-8710-fa325ea345fe	f45e0eaa-47a0-40c4-b4c4-d3393c4994f1	1	厨师	f
64feda30-e2b2-4ebe-b884-c6791215bf7a	f45e0eaa-47a0-40c4-b4c4-d3393c4994f1	2	保安	f
e9d3722c-e51d-4bef-ae43-67848529664a	f45e0eaa-47a0-40c4-b4c4-d3393c4994f1	3	裁缝	t
db351a44-cdad-4444-8581-4d3676f9421b	8a4fe821-7846-4120-ac06-9cc6958705d4	0	北京	f
dec70b90-e2fe-41f9-8899-79a669660ffd	8a4fe821-7846-4120-ac06-9cc6958705d4	1	广州	f
cf1df687-11e0-4bab-a8ba-6d9b4a714a83	8a4fe821-7846-4120-ac06-9cc6958705d4	2	深圳	f
ff328b31-c8d0-4b99-8597-20529e290ac8	8a4fe821-7846-4120-ac06-9cc6958705d4	3	上海	t
324f2160-eba3-4fbf-a1e3-0e20fc2a16a5	3bbb9b12-9c8e-4ae2-b4ac-2332d27524d7	0	他不会写字	f
b18b9a9d-a073-451d-8015-51637f0029df	3bbb9b12-9c8e-4ae2-b4ac-2332d27524d7	1	白天在工地干活，地址没法写	t
125c996f-fded-4057-ae51-554623e6bf7e	3bbb9b12-9c8e-4ae2-b4ac-2332d27524d7	2	他不想让别人知道	f
326da469-8bf2-4cbb-89e4-9479495ef91b	3bbb9b12-9c8e-4ae2-b4ac-2332d27524d7	3	他没有手机接听电话	f
deb2fdd8-2ac9-49b9-b1aa-8d4c18cdb45a	2b87ddc8-13dd-45f2-a9c6-750c9758fdd6	0	您不怕我把收到的月饼给吃了？	t
cfca1daf-2860-427f-ba8e-ec4b9275ed5f	2b87ddc8-13dd-45f2-a9c6-750c9758fdd6	1	您不怕我弄丢了？	f
b287ef80-ddf8-4438-a184-76e10d691846	2b87ddc8-13dd-45f2-a9c6-750c9758fdd6	2	里面是什么馅的月饼？	f
f884b10b-bbf5-4fd9-91b9-db6b4bd07ce3	2b87ddc8-13dd-45f2-a9c6-750c9758fdd6	3	月饼贵不贵？	f
45cf007f-e4cf-48ae-b546-8f2fdd63f628	c0e26504-8f6b-499e-8e5b-0c1525070850	0	因为这里有监控摄像头	f
25321243-fe43-4279-988b-c0c439411561	c0e26504-8f6b-499e-8e5b-0c1525070850	1	因为他以前见过我	f
b37141c4-f99b-4771-80d1-a8a38ba3dff9	c0e26504-8f6b-499e-8e5b-0c1525070850	2	因为我长得像他女儿，斯文，一看就读过书	t
9a75f431-6039-472c-bc9a-dfc01ed70b34	c0e26504-8f6b-499e-8e5b-0c1525070850	3	因为他知道我是老板	f
ee4ac00a-a476-4068-894b-c5beb8acddd0	be810269-240b-4714-a02c-e39e6e46e214	0	博士	f
32079961-71c3-4a9e-865f-4a67d399b69e	be810269-240b-4714-a02c-e39e6e46e214	1	本科	f
2bad5ccb-18ed-4c6f-a44c-588b80383ad0	be810269-240b-4714-a02c-e39e6e46e214	2	大专	f
e7d4f9bd-cb71-4bc7-a8dc-ffb72da4e262	be810269-240b-4714-a02c-e39e6e46e214	3	硕士	t
391b6c31-af2f-4918-a643-f5bbeb84a57f	5abd90f6-5f87-480d-8509-763c3d3ffdf4	0	满脸的骄傲	t
b6c54218-5d93-4518-b71c-c916c5ef07f8	5abd90f6-5f87-480d-8509-763c3d3ffdf4	1	非常惭愧	f
6a010105-42df-4856-99de-736ed0d3b84a	5abd90f6-5f87-480d-8509-763c3d3ffdf4	2	有些难过	f
d6b86e8f-3bb1-4ea4-ab65-af6c0d16d9a8	5abd90f6-5f87-480d-8509-763c3d3ffdf4	3	面无表情	f
8807ffac-2efb-4da6-9b6e-6bab82b85012	79e0f5c1-4ae6-4996-8f9e-61fc0e6f8d19	0	第一天	f
a3c52ffd-f13a-41cd-b9b6-686877c74f42	79e0f5c1-4ae6-4996-8f9e-61fc0e6f8d19	1	第二天	f
b0345a03-08ba-41b1-aa81-beaa114cffe2	79e0f5c1-4ae6-4996-8f9e-61fc0e6f8d19	2	第三天	t
1bf8ca45-64ef-4521-8264-3f464ee36543	79e0f5c1-4ae6-4996-8f9e-61fc0e6f8d19	3	第四天	f
fed9f3da-2860-497a-9dab-8a2b834adc15	fedaaa38-86f1-4598-b25a-5c4b384dc2c3	0	张心悦	t
4710df4c-3fcf-409d-af33-8612a9ba9e19	fedaaa38-86f1-4598-b25a-5c4b384dc2c3	1	张师傅	f
3092accb-2577-4246-9bc6-658111d35c7a	fedaaa38-86f1-4598-b25a-5c4b384dc2c3	2	张心心	f
7d976f15-ea3c-4dcb-a835-77a0a26b329e	fedaaa38-86f1-4598-b25a-5c4b384dc2c3	3	张明	f
e6395859-0fd4-4052-84fb-5ba71605bb4f	0b0b52a9-3991-4121-8c48-16c5e7bdcb5c	0	马上就接通了	f
4a3ebf3a-4647-47f5-92ba-97f27a16d51b	0b0b52a9-3991-4121-8c48-16c5e7bdcb5c	1	他马上回了短信	f
652eda57-7c8a-4ebe-91a1-c5df191d040d	0b0b52a9-3991-4121-8c48-16c5e7bdcb5c	2	无人接听，发短信也不回，直到下班没有音信	t
651338b5-3e33-4594-a54e-c174f9b26fec	0b0b52a9-3991-4121-8c48-16c5e7bdcb5c	3	他直接来到了公司楼下	f
840fc9f6-e3c5-4207-b2c9-7666b7fea7eb	b8cd9d7b-2693-4516-898c-ce5a398c56fd	0	打他的备用电话	f
8e596707-199a-4616-b7cc-e20ccd2ee2dc	b8cd9d7b-2693-4516-898c-ce5a398c56fd	1	抱着包裹往工地跑，请工人帮忙找	t
2dc6ee50-bdb2-4dac-a939-829128b2ff6a	b8cd9d7b-2693-4516-898c-ce5a398c56fd	2	在公司门口一直等他	f
50dfc6d7-6b4c-4b5b-b3ef-9b59bcfb0107	b8cd9d7b-2693-4516-898c-ce5a398c56fd	3	把月饼交给门卫让他转交	f
86cbd5ca-d2ec-45be-b4bc-425cbc15ad7f	0a2a114b-53ef-4f42-a0c9-448a7c6baea3	0	手机被偷了	f
7ecb196b-bb38-4fb8-9905-9f537dfe09c7	0a2a114b-53ef-4f42-a0c9-448a7c6baea3	1	故意不接陌生号码	f
124dd769-3711-4ff9-ba48-6bf453a5b0ca	0a2a114b-53ef-4f42-a0c9-448a7c6baea3	2	特别忙，手机没电了都不知道	t
1485d124-6bfc-44a6-b758-d60aa6ecc6bb	0a2a114b-53ef-4f42-a0c9-448a7c6baea3	3	手机没带在身上	f
3e8fe83a-0ed7-435c-8055-bfe6d114ce48	7b24d8d1-378b-44d6-a9da-b7da28c464a3	0	给我一百块钱当跑腿费	f
01ed06a0-09f5-49b9-a2a0-f90de565b621	7b24d8d1-378b-44d6-a9da-b7da28c464a3	1	立刻回家打电话	f
966a61fd-82cd-40e6-884a-9c97ff1156fd	7b24d8d1-378b-44d6-a9da-b7da28c464a3	2	把月饼退回去	f
c6aa7017-61c0-4d6f-adf7-8f1688923f4c	7b24d8d1-378b-44d6-a9da-b7da28c464a3	3	拆包裹，非要请我吃月饼不可	t
5a256ade-f029-45e5-9eb0-ee9e4e09c365	7cde7c4d-bf32-4ff7-8d79-0226bdd903b4	0	多寄点钱回家	f
a604a2f9-7333-4447-bac6-de23a998bffe	7cde7c4d-bf32-4ff7-8d79-0226bdd903b4	1	别惦记，好好工作，别给爸爸丢人	t
a0d5d1e3-a752-472d-b702-f6b0028da8b2	7cde7c4d-bf32-4ff7-8d79-0226bdd903b4	2	注意身体，早点休息	f
73522e8e-9fd0-4a9f-8e29-fd69e3b08ada	7cde7c4d-bf32-4ff7-8d79-0226bdd903b4	3	赶紧回家看看	f
4a9bb53f-77f4-4438-bce3-85eb331a5320	48ff7465-5fa6-48fd-bef6-8296e3a1db3d	0	女儿长得很漂亮	f
4d5d3578-96da-4bbb-92e5-d1c5d9af90b9	48ff7465-5fa6-48fd-bef6-8296e3a1db3d	1	女儿工资很高	f
47eb9a6d-c97e-4d29-a7f1-1615fd76afc2	48ff7465-5fa6-48fd-bef6-8296e3a1db3d	2	父亲对女儿深厚的爱和骄傲，女儿是他生活的精神支柱	t
0ee1d39f-84a8-48ba-be0f-465c2d0793c8	48ff7465-5fa6-48fd-bef6-8296e3a1db3d	3	父亲觉得养女儿很划算	f
7131502f-dffc-4430-91ed-617255a4a788	1e3674e2-1cb6-4b73-9b34-aa6d4c78b9a4	0	国王	f
fe84874c-9b17-4b27-9145-d2292492cffa	1e3674e2-1cb6-4b73-9b34-aa6d4c78b9a4	1	打猎者	f
4831b394-0b3f-46c0-8832-2ef6201d8b49	1e3674e2-1cb6-4b73-9b34-aa6d4c78b9a4	2	山神	t
9e3a27aa-b318-453f-8010-84212e65c75c	1e3674e2-1cb6-4b73-9b34-aa6d4c78b9a4	3	大象	f
1ab741c3-1933-47e3-879e-6e430236aa11	05c25c64-3457-4a1b-ba19-fefcff9f989d	0	它想找朋友玩	f
6f415fb5-a8a7-494e-aaf4-b006e299f959	05c25c64-3457-4a1b-ba19-fefcff9f989d	1	它厌倦了宠物的生活和角色	t
2724bd03-2fe1-4c01-a910-996e9eacf59f	05c25c64-3457-4a1b-ba19-fefcff9f989d	2	它想去打猎	f
1053a80f-9b97-4f78-bef2-552a6b30912b	05c25c64-3457-4a1b-ba19-fefcff9f989d	3	山神对它不好	f
5732a18e-9469-44f6-8158-28e5e26fa38b	05e880f0-e52e-49ca-8e27-d085a183821b	0	必须找到食物	f
ac096510-bc53-4a7b-84db-d0eedf6aae35	05e880f0-e52e-49ca-8e27-d085a183821b	1	必须躲开猎人的网	f
60889ee9-bf81-4d2b-8455-e9d3a03da6de	05e880f0-e52e-49ca-8e27-d085a183821b	2	必须战胜大象	t
c1131a4f-72b2-4736-9808-30a5b624a12d	05e880f0-e52e-49ca-8e27-d085a183821b	3	必须交到好朋友	f
09040d65-2ae0-444a-9f23-7eb1e191b28c	1a082bf2-a924-4dee-9f4a-495557a37125	0	动物界很好玩	f
2c3ea1ca-ef95-4364-9c6f-ee8bf26d0133	1a082bf2-a924-4dee-9f4a-495557a37125	1	大象其实很弱小	f
98755d98-c963-4ac9-a28a-2417b4b35e87	1a082bf2-a924-4dee-9f4a-495557a37125	2	自己对山神的承诺太草率，自己太弱小	t
9bd4fa1d-e93f-4eb4-835f-e385a89c4de0	1a082bf2-a924-4dee-9f4a-495557a37125	3	山神骗了它	f
786e9d8d-02c4-44d4-a990-a640aae8054a	65b0eb28-aa21-423d-b401-5587d0996f6d	0	逃跑回山神那里	f
0a8c6982-25a5-4463-89c2-ccaa35ce1bde	65b0eb28-aa21-423d-b401-5587d0996f6d	1	盲目行动去咬大象	f
d0b73afd-d4b2-4f56-b0a8-d87457916610	65b0eb28-aa21-423d-b401-5587d0996f6d	2	放弃挑战	f
00119ba5-3b58-48b5-b105-7de80f2c1493	65b0eb28-aa21-423d-b401-5587d0996f6d	3	决定尝试一下	t
222df165-444b-4508-8a78-603d77b2598f	7de42bd3-7bee-4e4b-9b9d-71be77a7c230	0	咬断大象的腿	f
649841b1-7b0f-4b43-9077-6e18cc414fde	7de42bd3-7bee-4e4b-9b9d-71be77a7c230	1	趁大象睡觉时偷袭	f
9d6d3fac-6295-4509-952c-f73988cfec1f	7de42bd3-7bee-4e4b-9b9d-71be77a7c230	2	进到大象鼻子里让大象不能喘气，强迫它认输	t
0cb9f0a3-3d29-43ca-bbbe-bec1752c4476	7de42bd3-7bee-4e4b-9b9d-71be77a7c230	3	找猎人帮忙	f
cbc79c0b-797e-4680-8627-c0af9a6f42cc	106d297c-e481-45e2-9ec6-50cd8af0be27	0	正在睡觉	f
2dcef574-eacb-46fb-9afd-3367628602be	106d297c-e481-45e2-9ec6-50cd8af0be27	1	正在喝水	f
d40254a3-36a5-4c77-a5cd-95b44e71e807	106d297c-e481-45e2-9ec6-50cd8af0be27	2	正在吃树叶	t
a778351a-2cf4-45ef-b21c-c23268ffaacf	106d297c-e481-45e2-9ec6-50cd8af0be27	3	正在打猎	f
d0391c0e-eae7-49ec-a720-437db90ea796	fdacde50-b411-4e3e-97db-2d2a52ca03b6	0	大象认输了	f
d8d27c7e-f1f0-4982-ac97-de9271f64905	fdacde50-b411-4e3e-97db-2d2a52ca03b6	1	大象痒得难受，打喷嚏把老鼠像子弹一样射了出来	t
890fed04-a20a-4086-86ac-76a8355909bb	fdacde50-b411-4e3e-97db-2d2a52ca03b6	2	大象被憋死了	f
fab8f725-a51f-4080-9844-cda90c68ed1e	fdacde50-b411-4e3e-97db-2d2a52ca03b6	3	老鼠在里面睡着了	f
35e78bc7-82f5-411a-ad1a-e5c3f1317b8d	b97d45e4-ebf0-462c-ad80-5730488f54b7	0	非常害怕	f
5cdfdafc-24cb-44cb-8c57-dae65c956223	b97d45e4-ebf0-462c-ad80-5730488f54b7	1	感到好笑	f
12e38667-8aee-4fd5-b15d-d81046f0b740	b97d45e4-ebf0-462c-ad80-5730488f54b7	2	蔑视、愤怒	t
cec24760-09ce-4ad9-a99f-f6b9ac63f8b4	b97d45e4-ebf0-462c-ad80-5730488f54b7	3	觉得无所谓	f
e538686c-6bac-40e9-92a0-448605286613	c93aec17-1718-459d-9fce-b3b2ad6bc182	0	用鼻子甩飞它	f
58655790-aeb7-4674-88b8-fc6da835e185	c93aec17-1718-459d-9fce-b3b2ad6bc182	1	踩扁了它	t
f3a4d554-0a62-4440-83f7-a72bbcfe5d41	c93aec17-1718-459d-9fce-b3b2ad6bc182	2	用水喷死它	f
1ff01279-77cb-483e-8a09-0ea6346ecd41	c93aec17-1718-459d-9fce-b3b2ad6bc182	3	叫猎人抓它	f
a25f1197-a541-42a3-87ed-1e984fb8e2de	2397af92-8b21-4b30-b6eb-2f6363af0572	0	生了重病	f
d4eb389b-38b0-4a91-afe3-55be38f7d67a	2397af92-8b21-4b30-b6eb-2f6363af0572	1	掉下了悬崖	f
a72c7f02-94a6-4039-89bf-cb3db7586a15	2397af92-8b21-4b30-b6eb-2f6363af0572	2	找不到食物	f
6e480fb5-21a5-493e-abb6-45eb3d1c865c	2397af92-8b21-4b30-b6eb-2f6363af0572	3	落入了打猎者设下的巨网中	t
d3fbae54-4ec8-4748-af47-64ca3fda5845	cf69e18f-8f32-479a-a825-e859b1201ce7	0	清晨	f
a4ec8a57-85fe-433c-8bb5-e0d1536c5df8	cf69e18f-8f32-479a-a825-e859b1201ce7	1	夕阳将落的傍晚	t
43da0238-8f07-4603-a1ac-d50d22621837	cf69e18f-8f32-479a-a825-e859b1201ce7	2	深夜	f
0986073c-f739-4a57-8393-02e380a9335f	cf69e18f-8f32-479a-a825-e859b1201ce7	3	正午	f
c09244fd-d152-4db5-983b-907fc02bacaa	612cf2fa-712b-4c65-bdd0-547352e7a9c8	0	安静地等死	f
894bd8cf-21e3-4adc-8f87-f2efc32d9b7e	612cf2fa-712b-4c65-bdd0-547352e7a9c8	1	大声呼救	f
efa02801-7692-49dc-9989-bc685c501ca9	612cf2fa-712b-4c65-bdd0-547352e7a9c8	2	不顾一切地用力挣扎，往外乱窜	t
cc299612-f9cc-412e-a092-53a9f54ab621	612cf2fa-712b-4c65-bdd0-547352e7a9c8	3	马上认输	f
9e0be188-b79a-4c10-a933-dbde776e386c	62bbd506-fb9f-4aa8-8125-e1fa781e7381	0	只要在大象重要部位咬几个洞，大象死了，自己就胜利了	t
003b235d-0a0c-4522-97f6-52e4ca63b510	62bbd506-fb9f-4aa8-8125-e1fa781e7381	1	赶紧跑去叫山神	f
ed33c9b2-87d9-4038-a22d-c7f21494495b	62bbd506-fb9f-4aa8-8125-e1fa781e7381	2	嘲笑大象很愚蠢	f
daf33d79-1615-4d84-bf8e-b5fd061f12bf	62bbd506-fb9f-4aa8-8125-e1fa781e7381	3	觉得大象罪有应得	f
fa3d870d-e4ea-4aec-a8be-45664fd75573	5b3b340d-a2df-4f3b-9fd7-dad3bfac0473	0	因为老鼠牙齿不够锋利	f
75c38098-9613-43ee-85e6-571c22289d5b	5b3b340d-a2df-4f3b-9fd7-dad3bfac0473	1	看到大象悲惨的样子觉得太残忍，良心发现	t
1dd61df2-8f08-4137-99be-57c80b5637ec	5b3b340d-a2df-4f3b-9fd7-dad3bfac0473	2	老鼠害怕猎人回来	f
a84a7522-b7b6-4675-8351-d6ed49c93e8f	5b3b340d-a2df-4f3b-9fd7-dad3bfac0473	3	老鼠觉得大象肉不好吃	f
853c49ac-d45a-477f-97c7-cbb3c70afeb1	2f34c07d-aa79-429f-b245-4edaabdd299d	0	用锋利的牙齿咬缠绕着大象的网和绳子	t
22f1b606-b5f0-4884-a43d-7cf1ae9d5598	2f34c07d-aa79-429f-b245-4edaabdd299d	1	找其他动物来帮忙	f
03fb4d17-5bdb-4272-8cd1-5e9c04ec7b28	2f34c07d-aa79-429f-b245-4edaabdd299d	2	吓跑了猎人	f
f5f3d780-d0fc-489b-8b4b-32bc48017d07	2f34c07d-aa79-429f-b245-4edaabdd299d	3	解开了网的绳结	f
a76c8530-518b-4c80-940e-19613f79da12	cb7b9353-873d-4428-aeb0-1e2d13ac5165	0	失去了一颗牙齿	f
561ae6be-52a1-4abd-ab45-20264269e7c5	cb7b9353-873d-4428-aeb0-1e2d13ac5165	1	受了重伤	f
96571907-2cf9-4c3a-b8a9-332dd53881f8	cb7b9353-873d-4428-aeb0-1e2d13ac5165	2	几乎耗费了全部力气	t
a310a7a0-8c00-4a4d-8d9b-8cbf8d504ea6	cb7b9353-873d-4428-aeb0-1e2d13ac5165	3	被猎人抓住了	f
3dfd8b70-046f-40fc-b5f3-24de311a408b	529d5601-88e4-4c3d-b498-b35d2a9a760a	0	老鼠成为了大象的主人	f
ec9155a7-a438-4323-b8f7-2baed6c47f14	529d5601-88e4-4c3d-b498-b35d2a9a760a	1	大象依旧蔑视老鼠	f
8f6dab57-d7ca-43b7-9207-0c5ea1323534	529d5601-88e4-4c3d-b498-b35d2a9a760a	2	成了好朋友	t
98f0b1be-219c-4e9b-b403-ad9a72a6e3ec	529d5601-88e4-4c3d-b498-b35d2a9a760a	3	各自离开再没见面	f
335f5502-bf02-47d2-bfdb-90267ea88da3	b1fddfaa-fb03-4347-b802-cdc1837c07d5	0	我已经战胜大象了，马上回去	f
5177bb76-89a2-4364-bcc4-1c17fd718864	b1fddfaa-fb03-4347-b802-cdc1837c07d5	1	大概不可能了，我无法战胜大象	t
14c359cc-7943-4b66-949c-8eb829ede830	b1fddfaa-fb03-4347-b802-cdc1837c07d5	2	大象是我的朋友，我不回去了	f
184b43c5-18d6-48d3-a5eb-01e87deb498a	b1fddfaa-fb03-4347-b802-cdc1837c07d5	3	我还想在外面多玩几天	f
81b28f7d-5915-4b95-a6fe-b96a4ff0405e	75037fab-3acd-4c2b-89d0-c978effb2cca	0	老鼠把大象打败了	f
cc403657-8450-45af-adc8-e486cd2f808f	75037fab-3acd-4c2b-89d0-c978effb2cca	1	大象终于死掉了	f
6309fe6b-ee80-4c01-b23f-f4aaafcb5ee9	75037fab-3acd-4c2b-89d0-c978effb2cca	2	老鼠化敌为友，创造了举世瞩目的成就	t
1c50d8d0-5887-42dd-99c1-b98d159481fe	75037fab-3acd-4c2b-89d0-c978effb2cca	3	老鼠成功逃出了动物界	f
b390e803-3297-45c6-94ec-f55c53e00918	0b970af5-21ee-44ee-8b7c-dd5069293f59	0	为了出国旅游	f
e86ec176-5590-4a98-9ee7-be9d2799f00c	0b970af5-21ee-44ee-8b7c-dd5069293f59	1	不想再依靠翻译，独自阅读原文	t
9502fb38-9756-4baf-b373-dec11331ddfc	0b970af5-21ee-44ee-8b7c-dd5069293f59	2	为了找到一份薪水更高的工作	f
e8708bfe-ebbf-4444-b18a-df693046c41f	0b970af5-21ee-44ee-8b7c-dd5069293f59	3	为了和外国朋友交流	f
17c45a2d-4eee-4b0d-95fa-33c81e8e2a27	d2a2dfc7-2992-4531-ba45-3a1d66437bf5	0	在网上	f
23c28cce-b297-4da2-b794-cd313075b046	d2a2dfc7-2992-4531-ba45-3a1d66437bf5	1	在另一座城市	f
99bc18f8-7597-4fa2-ad58-2fd71de28e01	d2a2dfc7-2992-4531-ba45-3a1d66437bf5	2	在离家不远的一栋办公楼上	t
51e5a5b9-a467-415e-aba5-3a7b633cd197	d2a2dfc7-2992-4531-ba45-3a1d66437bf5	3	在大学校园里	f
e938614b-f2a2-47b0-9e8d-b5a2181caad6	aabb34c5-be07-4ce9-b541-9eb6dff7cadd	0	非常紧张	f
7f88191f-fb91-4e2a-a436-c81e21aac578	aabb34c5-be07-4ce9-b541-9eb6dff7cadd	1	兴致勃勃	t
48a5510c-40e1-4559-b8c0-7d65dfa14c33	aabb34c5-be07-4ce9-b541-9eb6dff7cadd	2	感到反感	f
47a2f24a-36e8-41f9-8eb3-391bfad0444c	aabb34c5-be07-4ce9-b541-9eb6dff7cadd	3	犹豫不决	f
5b9f26b6-5716-4aa1-a696-a87eb6b471ea	6a31bca7-128c-4a77-8ca5-75d4da15ba02	0	学费怎么交	f
1b7a0240-3c77-4a97-b249-5d1b723ca361	6a31bca7-128c-4a77-8ca5-75d4da15ba02	1	有没有带身份证	f
4a04bf69-0777-487f-bc47-8bb1d9cee1ca	6a31bca7-128c-4a77-8ca5-75d4da15ba02	2	为什么要学外语？有出国计划吗？职业是什么？	t
f952fc6e-0ae2-44b7-82a6-8e9c17a32841	6a31bca7-128c-4a77-8ca5-75d4da15ba02	3	喜欢什么语言	f
a7ced8d4-053c-4f37-b476-03fbb694b31b	9f478f4b-38e8-40c4-9b67-271f8b124707	0	觉得很反感，话也变得火药味十足	t
bf951cfe-e275-4ac7-8e17-e9d6f9f0678c	9f478f4b-38e8-40c4-9b67-271f8b124707	1	觉得很专业，认真回答了	f
4a4f20d1-a9cd-4b79-b27b-0ae5046d8893	9f478f4b-38e8-40c4-9b67-271f8b124707	2	立刻交了学费	f
4eeae281-b744-4b10-bab9-0d664343959e	9f478f4b-38e8-40c4-9b67-271f8b124707	3	转身就走了	f
ff2d26e9-854e-474b-b5b3-0c5a73ee64fd	9530f2c3-0298-4cf8-8653-237be4bbaa94	0	为了推销更贵的课程	f
fcedd271-aa8f-480a-97f2-9352b47afabb	9530f2c3-0298-4cf8-8653-237be4bbaa94	1	这是公司规定的流程	f
ad87b086-4537-464f-85e0-bb5c6f932938	9530f2c3-0298-4cf8-8653-237be4bbaa94	2	必须了解学员，为学员着想，帮他策划学习方案	t
3d06fa32-12c0-4896-af4a-929058c5e450	9530f2c3-0298-4cf8-8653-237be4bbaa94	3	她对作者的隐私感兴趣	f
32ad1fba-4e16-4159-ad33-631fc5b4b262	78935b5e-f50c-4bc3-ae97-0ab40bc4a9ea	0	想考级拿到证书	f
72d6d457-d3f2-4cb6-b30a-a39543c443f4	78935b5e-f50c-4bc3-ae97-0ab40bc4a9ea	1	想出国留学	f
a1f76eb3-0253-4c64-9951-dd94a1239802	78935b5e-f50c-4bc3-ae97-0ab40bc4a9ea	2	没有具体目标，随意学学而已	t
275e6408-20a5-41bc-b4a3-b2bdbc931c51	78935b5e-f50c-4bc3-ae97-0ab40bc4a9ea	3	想进外企工作	f
102d945d-09d6-4b2f-b7cb-2dec3ba82a97	69bf2fe8-ec94-4ba7-bde6-83631f166b4c	0	也能轻松学好	f
3a1c40fc-6b19-44e2-ba4a-f652d334052b	69bf2fe8-ec94-4ba7-bde6-83631f166b4c	1	是学不好一种语言的	t
c43e89c6-f4cb-4926-aad4-79cd59b64fe2	69bf2fe8-ec94-4ba7-bde6-83631f166b4c	2	需要交更多的钱	f
70bc677e-6cb4-42c6-add2-d44f366d3ebe	69bf2fe8-ec94-4ba7-bde6-83631f166b4c	3	只能上基础班	f
8ecc0257-47a6-439e-b194-f17758335759	17e087e4-b2c5-4dcc-a2f7-f9e1af3b5681	0	很严厉	f
3a7ee662-1708-4df2-8399-54395380b738	17e087e4-b2c5-4dcc-a2f7-f9e1af3b5681	1	不耐烦	f
b1c4a048-21df-4a90-a830-04c67d795af7	17e087e4-b2c5-4dcc-a2f7-f9e1af3b5681	2	态度和蔼，真诚恳切	t
c829f0e5-146f-4b65-a26e-080f6718031a	17e087e4-b2c5-4dcc-a2f7-f9e1af3b5681	3	很冷漠	f
4d4ad965-f62f-40e0-980b-adf463c83da6	f4eba87c-d2d0-4761-bf71-83999361a676	0	被别人逼迫的	f
2447bfd8-5a71-4a07-951a-cb1858e203bc	f4eba87c-d2d0-4761-bf71-83999361a676	1	喜欢这个国家的文化，为了看原文电影、读文学作品	t
fda602d4-1c47-4ac2-93a7-0fc39ff1c8b9	f4eba87c-d2d0-4761-bf71-83999361a676	2	为了炫耀自己	f
349bd15d-25af-4164-9e5f-765ab14f198e	f4eba87c-d2d0-4761-bf71-83999361a676	3	为了出国做生意	f
9db5897b-315f-4780-81c0-509501fdc9e2	fc4fd37b-e274-46a5-b1c3-c67dfca5c0d7	0	不想通过翻译，直接进入原文的世界？	t
464c299e-db7f-4141-b20d-6bda2d17cdf4	fc4fd37b-e274-46a5-b1c3-c67dfca5c0d7	1	这个想法太不切实际了	f
8d58ef8a-061e-482f-a647-1a873bea664d	fc4fd37b-e274-46a5-b1c3-c67dfca5c0d7	2	那你应该报名我们的高级班	f
a4af9001-11db-4d9b-a154-9a6737b2ca2f	fc4fd37b-e274-46a5-b1c3-c67dfca5c0d7	3	这样学起来会很慢	f
8fd6c096-1ca0-454b-a29b-d971b96b4c27	0d9f0292-1b5d-4245-b15d-959cbf351e1d	0	这个课程很贵	f
4604b16d-a334-481c-87b1-dc7c7e209b87	0d9f0292-1b5d-4245-b15d-959cbf351e1d	1	光凭兴趣，恐怕难以持久	t
aa198ae4-5959-47db-9d4f-dcd6d507fc82	0d9f0292-1b5d-4245-b15d-959cbf351e1d	2	我们这里不适合你	f
6c06437b-271d-47a5-8e62-89947335735f	0d9f0292-1b5d-4245-b15d-959cbf351e1d	3	你需要买很多教材	f
e771150a-39d7-450f-b82b-2a270911665d	79290197-9728-43e5-a3ae-63e6d35b80f8	0	马上交钱报名	f
d827de41-b25b-4c3a-8ab7-907a0a44d71a	79290197-9728-43e5-a3ae-63e6d35b80f8	1	回家再想想	f
b9adfaf2-2281-4371-ac12-4a317e3e6a58	79290197-9728-43e5-a3ae-63e6d35b80f8	2	果断地站起来，斩钉截铁地表明要走	t
b2932cc8-cfe5-4e86-8a90-f5fdb5b49196	79290197-9728-43e5-a3ae-63e6d35b80f8	3	跟男士大吵一架	f
656648c2-ff32-468f-b2d1-c43eb0e3312e	c2f2fa0f-af08-4aac-ba58-cae9449eace1	0	请了私人外教	f
c0603016-7573-4839-af27-6348265a843a	c2f2fa0f-af08-4aac-ba58-cae9449eace1	1	买书自学	f
c18f0448-db92-4fd8-8a5d-c3673d605ea6	c2f2fa0f-af08-4aac-ba58-cae9449eace1	2	在网上找了一家在线学习	t
f7f42be0-0082-44ba-9148-56cda645f2d0	c2f2fa0f-af08-4aac-ba58-cae9449eace1	3	放弃了学习	f
551597b6-38d5-44c9-9971-1dc9c6c7f231	8288e6cb-9f24-4b47-88ff-b382ed994565	0	因为便宜	f
32d683e5-96e2-4214-860b-c4f0b907cb03	8288e6cb-9f24-4b47-88ff-b382ed994565	1	从基础教起，语法详细讲解，不留死角	t
595e95d0-d597-4d5a-a6af-4560690bd346	8288e6cb-9f24-4b47-88ff-b382ed994565	2	因为老师很漂亮	f
33547a62-a471-40d9-bd05-a0aa97ab2951	8288e6cb-9f24-4b47-88ff-b382ed994565	3	因为不需要考试	f
d0f17200-5b55-49f7-891b-6b79ca880b34	10b4d229-69f8-42ce-ad65-8d50183626f5	0	没有人硬逼着执行计划，也没人问隐私（为啥学、单位、薪水）	t
a149a738-4c1a-457e-ba3b-869b0ee99389	10b4d229-69f8-42ce-ad65-8d50183626f5	1	可以随时退费	f
16d16a7f-5dea-427d-9d56-118fd5d9ca9d	10b4d229-69f8-42ce-ad65-8d50183626f5	2	有很多人一起聊天	f
a89cdd40-872d-4d7a-beec-430d6a5a5914	10b4d229-69f8-42ce-ad65-8d50183626f5	3	学完有证书	f
936496d2-a1fe-4876-bc6b-b2df7a1e7e6b	f5739e59-8601-42eb-b67a-0a64b265564c	0	学不到真东西	f
75fe512e-3598-429a-a266-115b0312b57f	f5739e59-8601-42eb-b67a-0a64b265564c	1	高兴了拼命学，不高兴就搁在一边	t
d5f88380-ae12-45ab-9c1c-fbf85fbbe79a	f5739e59-8601-42eb-b67a-0a64b265564c	2	容易伤害眼睛	f
289b55dd-9c69-4b62-9d68-aab23aa87187	f5739e59-8601-42eb-b67a-0a64b265564c	3	太浪费钱	f
2925c264-3366-4272-b7b9-c54e51f6d449	a3a1bd42-e514-42e7-bd14-9fad25f37181	0	因为教材编得不好	f
9f9e4eff-63db-4531-b342-56532d338732	a3a1bd42-e514-42e7-bd14-9fad25f37181	1	因为后面那课的话题太诱惑我了	t
5dc1614c-3593-4278-ad3a-7b16fe12c475	a3a1bd42-e514-42e7-bd14-9fad25f37181	2	因为他不小心点错了	f
9aecd8de-cd59-4f90-b75a-bdef1c9100e3	a3a1bd42-e514-42e7-bd14-9fad25f37181	3	因为老师要求这么做	f
114fe60f-fbae-46a0-9696-de63bfa1b975	cd79b874-0205-474c-9c36-859dd0f46c31	0	弊大于利	f
59bfdfa9-29c6-4d07-ade3-39e9c043648a	cd79b874-0205-474c-9c36-859dd0f46c31	1	利还是大于弊	t
ecc10015-c3d7-49a9-b40b-c44da0604f1a	cd79b874-0205-474c-9c36-859dd0f46c31	2	完全没有好处	f
7adf0807-52c4-495a-adc2-d837c88b4897	cd79b874-0205-474c-9c36-859dd0f46c31	3	需要立刻改变	f
fdff8836-d5f6-462b-bead-ea9c7d706d19	c79e3ec6-446f-40a3-a1ed-e04756f1ce42	0	拿到高薪	f
f0cf8cb5-b172-4b07-8227-0e8790545e0f	c79e3ec6-446f-40a3-a1ed-e04756f1ce42	1	能在忘我的快乐中，津津有味地享受学习	t
55ec11c7-298e-43b7-9c67-963d9ee8b582	c79e3ec6-446f-40a3-a1ed-e04756f1ce42	2	能考取高级证书	f
0455ca1e-210f-49b2-9de7-5ccddf9724c7	c79e3ec6-446f-40a3-a1ed-e04756f1ce42	3	能和外国人流利对话	f
\.


--
-- Data for Name: quiz_questions; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.quiz_questions (id, lesson_id, sort_order, question, explanation, difficulty) FROM stdin;
754a85c5-de7b-48fa-b6df-bb0966c385ec	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	0	电台举办活动是为了选出什么？	Đoạn 1 có ghi: '电台要选出一对最恩爱的夫妻' (Đài phát thanh muốn chọn ra một cặp vợ chồng ân ái nhất).	1
b956b53c-b56f-4fe9-8fd4-0f3fbb6b85bd	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	1	经过对比后，共有几对夫妻入围？	Bài khóa nhắc đến: '对比后，有三对夫妻入围' (Sau khi đối chiếu, có 3 cặp lọt vào vòng trong).	1
5630da5f-17ac-4d1d-826c-47daae15352d	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	2	第一对夫妻中，谁的身体出了严重问题？	Vợ của cặp đầu tiên nói: '前几年她全身瘫痪了' (Mấy năm trước cô ấy bị liệt toàn thân).	1
087e4ed7-ddd5-42f3-9bc8-b3a46959c58f	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	3	医生认为第一对夫妻中的妻子能重新站起来的可能性大吗？	Chi tiết: '医生说她站起来的可能性很小' (Bác sĩ nói khả năng cô ấy đứng lên được là rất nhỏ).	1
4b342670-dfa1-4423-91bc-924730b74455	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	4	在妻子瘫痪时，别人以为丈夫会怎么做？	Chi tiết: '别人都觉得她的丈夫会跟她离婚' (Người khác đều cảm thấy chồng cô sẽ ly hôn với cô).	1
f9a138b4-4fde-42c0-82a5-5dc50bcecbb5	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	5	瘫痪的妻子曾经有过什么极端的想法？	Chi tiết: '她也想过自杀' (Cô ấy cũng từng nghĩ đến việc tự sát).	1
ae9953ba-6a64-4c46-b6c8-a1d02a3a83bd	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	6	第一对夫妻的丈夫是如何照顾妻子的？	Chi tiết: '几年如一日地照顾她，从不抱怨' (Chăm sóc cô vài năm như một ngày, không hề oán than).	1
f58fdeaf-95dd-49cb-8f94-77488c83c6f0	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	7	听到第一对夫妻的故事后，评委有什么反应？	Chi tiết: Câu chuyện rất cảm động, giám khảo nghe đều rất cảm động.	1
585f8248-1f4d-49f2-acca-8173a6b08365	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	8	第二对夫妻的婚姻生活最大的特点是什么？	Cặp thứ 2 chia sẻ: '从来没为任何事红过脸、吵过架' (Chưa từng vì chuyện gì mà đỏ mặt, cãi vã).	1
3776146c-c0b9-4b01-8a8c-f3531595ed10	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	9	课文用哪个成语来形容第二对夫妻的关系？	Họ luôn '相敬如宾' (Tương kính như tân - Tôn trọng nhau như khách).	1
893d9863-a586-4dff-b8bb-2bd251ea47a8	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	10	为什么第三对夫妻很长时间没有进门接受采访？	Khi giám khảo ra ngoài xem, thấy '男人的头靠在女人的肩膀上，睡着了' (Đầu người đàn ông tựa vào vai vợ ngủ thiếp đi).	1
3d6f1c08-19c4-4d9a-98a8-85d8db115d30	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	11	评委走出来时，看到了什么场景？	Chi tiết: '男人的头靠在女人的肩膀上，睡着了' (Người đàn ông tựa đầu lên vai người phụ nữ ngủ).	1
7121a156-ce85-4c9e-bbc0-80418e48150c	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	12	评委想喊他们时，女人做了什么动作？	Chi tiết: '女的却伸出手指，做了个小声的动作' (Người phụ nữ đưa ngón tay ra, làm động tác ra hiệu nhỏ tiếng).	1
6c3f586f-d3f0-4f80-954d-f6a67f8a3ca0	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	13	女人为什么用左手写字？	Vì vai phải đang để cho chồng tựa vào ngủ: '而右肩一直让丈夫的脑袋靠着'.	1
ac9b1e96-af78-4b31-b572-19cbf0a7e515	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	14	女人递给评委的纸条上面写了什么？	Trên giấy viết: '别出声，他昨晚没睡好' (Đừng lên tiếng, tối qua ông ấy ngủ không ngon).	1
65ccc44a-f337-4b9b-bd71-66eecc259eea	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	15	为什么第三对夫妻中的丈夫昨晚没睡好？	Chồng kể lại lý do: '半夜蚊子叮我，他一直为我赶蚊子' (Nửa đêm muỗi đốt tôi, ông ấy cứ thức đuổi muỗi cho tôi).	1
272ed9bf-63b6-4963-bad9-442a8683e68e	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	16	一个评委开玩笑地提出了什么要求？	Giám khảo viết: '但是女士，我们得听你们夫妻俩的叙述啊!' (Nhưng thưa bà, chúng tôi phải nghe hai người kể chuyện ân ái chứ).	1
a5eba8e6-c5df-4b59-977a-097f30a5376e	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	17	女人对评委的玩笑是怎么回答的？	Lần này người phụ nữ lại viết: '那我们就不参加了' (Vậy chúng tôi không tham gia nữa).	1
5ead471f-c166-4c08-8997-c96d330b9381	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	18	听到女人的回答后，评委们的反应是什么？	Trong bài gốc: '评委们听了，居然一时语塞' (Giám khảo nghe xong, lại bất ngờ cạn lời/không biết nói gì thêm).	1
940ffd5f-a53e-4174-a71d-7473c2311526	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	19	最终哪对夫妻获得了"最恩爱夫妻"奖？	Chi tiết cuối bài: '真正的最恩爱夫妻奖却给了第三对夫妻' (Trao giải 'Vợ chồng ân ái nhất' cho cặp thứ 3).	1
98460a3d-31ff-4c9d-b9ba-d4c463455fa8	901364ad-86ec-439b-9437-b0e37a5ec2a1	0	父母一辈子住在哪里？	Bài khóa mở đầu bằng câu: 父母一辈子住在农村老家 (Bố mẹ cả đời sống ở quê nông thôn).	1
13432c5f-77f5-4d29-8f54-c35a4f1ab291	901364ad-86ec-439b-9437-b0e37a5ec2a1	1	父母对老屋的感情被比作什么？	Bài khóa viết: 对老屋的感情，就像没断奶的孩子对母亲一样 (Tình cảm với ngôi nhà cũ giống như đứa trẻ chưa cai sữa với mẹ).	1
5cf5d887-0a08-4645-a479-5e9edcdbb85b	901364ad-86ec-439b-9437-b0e37a5ec2a1	2	谁在城里住，但父母仍坚决不去？	Bài khóa nhắc đến: 尽管姥姥、舅舅和姑姑都在城里，父母也坚决不在城里住。	1
7ab68acb-6b45-46e5-b7b9-8a49b357a981	901364ad-86ec-439b-9437-b0e37a5ec2a1	3	"我"和妻子买新房的钱是怎么来的？	Chi tiết: 终于用打工挣的钱，在县里买了一套新房。	1
ae4f42e7-9430-4f48-929f-8118b21f4d23	901364ad-86ec-439b-9437-b0e37a5ec2a1	4	新房在哪儿买的？	Chi tiết: 在县里买了一套新房 (Mua một căn nhà ở huyện).	1
9320d210-e47a-42c7-90cc-a95cf9983da7	901364ad-86ec-439b-9437-b0e37a5ec2a1	5	父母第一次走进新房时心情怎样？	Chi tiết: 父母第一次走进新房时，高兴得不得了 (Bố mẹ vui sướng vô cùng).	1
50448f25-9ec2-423c-a2bf-5376fcc23a5f	901364ad-86ec-439b-9437-b0e37a5ec2a1	6	妻子第一次提出留钥匙给父母时，父母怎么做？	Chi tiết: 妻子提出留一串钥匙给父母，可他们拒绝了 (Họ đã từ chối).	1
37db3942-b103-4765-997e-97a1b95b2bbd	901364ad-86ec-439b-9437-b0e37a5ec2a1	7	第一次去新房的那天晚上，父亲怎么了？	Chi tiết: 那天，父亲喝醉了，等他醒时，天色已晚 (Hôm đó bố uống say).	1
12e3d734-d93f-4d17-af25-dd8d5da490dd	901364ad-86ec-439b-9437-b0e37a5ec2a1	8	临走去外地打工那天，父亲来送行并提出了什么要求？	Bố kéo ra một góc và bảo: 你还是留一串新房的钥匙给我们 (Con vẫn nên để lại cho bố mẹ một chùm chìa khóa).	1
ecb32de1-fedd-4804-b902-3a9668460282	901364ad-86ec-439b-9437-b0e37a5ec2a1	9	父亲要钥匙时表面上的理由是什么？	Lý do bố nói: 就来住上几天，顺便给你们晒晒被子，打扫打扫卫生。	1
67de830a-2260-4945-aa6e-2cd969a8973a	901364ad-86ec-439b-9437-b0e37a5ec2a1	10	父亲要钥匙时的神态像什么？	Chi tiết: 轻声细语，还红着脸，像个害羞的孩子 (Nói nhỏ nhẹ, mặt còn đỏ lên như đứa trẻ xấu hổ).	1
5044140b-68dc-40e7-b23f-afb1fb9dd0ec	901364ad-86ec-439b-9437-b0e37a5ec2a1	11	半年后"我"们回家时是什么时候？	Chi tiết: 我们回家时是一个深冬的夜里 (Một đêm giữa mùa đông).	1
ec9ba858-d095-4e88-8cdb-2920fe54f911	901364ad-86ec-439b-9437-b0e37a5ec2a1	12	下长途车后，儿子为什么大哭？	Chi tiết: 儿子被冻得大哭 (Con trai bị rét khóc to).	1
4c0f0053-27cf-48c5-8765-e7c4197d8408	901364ad-86ec-439b-9437-b0e37a5ec2a1	13	到家楼下前，"我"和妻子想象中的家是什么样的？	Chi tiết: 想象着打开家门满是灰尘、冷冷清清的景象 (Tưởng tượng cảnh mở cửa ra đầy bụi và lạnh lẽo).	1
aef45c9f-9f5e-4367-8437-ea0e2ab954e9	901364ad-86ec-439b-9437-b0e37a5ec2a1	14	来到楼下他们发现了什么异常？	Chi tiết: 来到楼下，抬头一看，却发现自家亮着灯光 (Phát hiện nhà mình đang sáng đèn).	1
1e0c2d0a-f2bd-4d09-b980-2f9f952bcdad	901364ad-86ec-439b-9437-b0e37a5ec2a1	15	打开门迎接他们的是谁？	Chi tiết: 开门的竟是微笑着的父母 (Người mở cửa lại là bố mẹ đang mỉm cười).	1
c2ad1b94-b516-4158-839b-b0bdfc04a1cc	901364ad-86ec-439b-9437-b0e37a5ec2a1	16	进入房间后，他们没有感受到下列哪项？	Cảnh tượng thực tế: 室内打扫得干干净净 (Nhà cửa quét dọn sạch sẽ, không hề có bụi).	1
a7c2196f-9f3f-474f-998c-a2cfd35c1b55	901364ad-86ec-439b-9437-b0e37a5ec2a1	17	父母怎么知道他们那天晚上回来？	Bố nói: 你妈昨天接到电话，知道你们今晚回来 (Hôm qua mẹ nhận được điện thoại...).	1
99b3d095-c400-4022-985d-5f1a15323e8c	901364ad-86ec-439b-9437-b0e37a5ec2a1	18	父母要钥匙的真正原因是什么？	Chi tiết: 只是为了让我们回来时，能立刻感受到家的温暖 (Chỉ để khi các con về có thể lập tức cảm nhận được sự ấm áp).	1
df9207e7-85c1-4969-8244-214d3229c350	901364ad-86ec-439b-9437-b0e37a5ec2a1	19	文章最后"我"的反应是什么？	Câu cuối: 我鼻子一酸，流下了热泪 (Mũi tôi cay cay, rơi những giọt nước mắt nóng hổi).	1
d35f8840-cc57-4e59-b16a-acec9be6624a	d740cadb-f179-44c5-94c2-b4765f846130	0	翟峰和妻子以前的工作是什么？	Đoạn 1: 翟峰和妻子都是铁路工人 (Trác Phong và vợ đều là công nhân đường sắt).	1
3a5bdea8-e3bb-4a0d-a579-3199c493c4fc	d740cadb-f179-44c5-94c2-b4765f846130	1	翟峰以前的生活状态是怎样的？	Đoạn 1: 工作稳定、待遇不错。他们有房有车，从不用为生活发愁。	1
15441acc-f463-4152-b60d-fe8ce06cc7e5	d740cadb-f179-44c5-94c2-b4765f846130	2	翟峰为什么想改变生活？	Đoạn 1: 可是翟峰却不想一辈子过这样平静的生活。	1
ee2c517d-cbd5-41b3-b907-3ff965650dd2	d740cadb-f179-44c5-94c2-b4765f846130	3	翟峰是怎么迷上帆船的？	Đoạn 1: 通过电视，翟峰迷上了帆船 (Qua TV, Trác Phong đam mê thuyền buồm).	1
ec1c0d9a-5161-4bbe-9bd4-1820457fecf4	d740cadb-f179-44c5-94c2-b4765f846130	4	翟峰觉得帆船能带他撞开什么？	Đoạn 1: 他觉得帆船能带他撞开"世界之门"。	1
48b23027-c89f-42f3-939c-356e7d859190	d740cadb-f179-44c5-94c2-b4765f846130	5	因为没有积蓄，翟峰是怎么买船的？	Đoạn 2: 由于翟峰和妻子没有积蓄，于是卖房卖车，买下了一艘二手船。	1
423c1619-d500-484d-82e0-1a19c1987adb	d740cadb-f179-44c5-94c2-b4765f846130	6	出发前周围的人对翟峰的决定有什么看法？	Đoạn 2: 包括翟峰的父母，所有人都觉得，翟峰"疯了"。	1
e5cf35a7-783a-4a93-8c4d-ca6fde3cc0c2	d740cadb-f179-44c5-94c2-b4765f846130	7	白天在船上，女儿主要做什么？	Đoạn 3: 女儿在船上看书、学习、画画儿。	1
22353adc-0d37-49ad-8904-522d29f103c6	d740cadb-f179-44c5-94c2-b4765f846130	8	一家人觉得一天中最舒适的时候是什么时候？	Đoạn 4: 傍晚是一家人最舒适的时候。	1
5432396b-7234-4df5-a8ae-6f4c4bda52ef	d740cadb-f179-44c5-94c2-b4765f846130	9	中国有句关于下海的老话叫什么？	Đoạn 5: 中国有句老话，可上山，勿下海 (Có thể lên núi, đừng xuống biển).	1
829d10bf-67d6-4d1d-a48b-25a6c00d3965	d740cadb-f179-44c5-94c2-b4765f846130	10	航行中他们最怕什么时刻？	Đoạn 5: 他们最怕雷电交加的时刻 (Khoảnh khắc sợ nhất là khi sấm chớp đan xen).	1
01f3da5b-66fe-4df6-af70-3606ef555296	d740cadb-f179-44c5-94c2-b4765f846130	11	遇到雷电时，他们一家人是怎么做的？	Đoạn 5: 一家三口只能紧紧拥抱在一起，希望闪电快快过去。	1
89f113d9-ca8d-423b-9603-0d9b6e0e58b1	d740cadb-f179-44c5-94c2-b4765f846130	12	翟峰一家航行了多久才回到家？	Đoạn 6: 在经历了八个月、航行了4000多海里之后，翟峰一家终于回到了家。	1
4b4741c7-cc9c-486c-aad0-d3d31e97c4d7	d740cadb-f179-44c5-94c2-b4765f846130	13	翟峰觉得航海对他来说是什么？	Đoạn 7: 航海就是他人生道路上一段长长的台阶，通向他想要的未来。	1
664237cb-0279-4c8a-9484-0cc14beb0d52	d740cadb-f179-44c5-94c2-b4765f846130	14	翟峰一家下一站想去哪里？	Đoạn 7: 下一站，他们想去澳洲和新西兰。	1
d5b19d2c-3c16-4f58-b967-20945bf44ab1	c4678e54-fba2-4dd8-99a5-772157e1962b	0	子路生活在什么时期？	Đoạn 1: 大概在距今两千五百多年前的春秋时期 (Khoảng hơn 2500 năm trước vào thời Xuân Thu).	1
667438c7-6529-4e0f-aa3b-69965b39bb3f	c4678e54-fba2-4dd8-99a5-772157e1962b	1	子路是谁的学生？	Đoạn 1: 他是孔子最年长的学生 (Ông là học trò lớn tuổi nhất của Khổng Tử).	1
2f7f6fc0-190a-415f-b08e-fea73da736f0	c4678e54-fba2-4dd8-99a5-772157e1962b	2	子路小时候家里的生活为什么非常困难？	Đoạn 2: 由于连年的战争，家里生活非常困难 (Do chiến tranh liên miên, gia đình rất khó khăn).	1
9f987899-e242-4d8e-a05d-0bfd41cc203f	c4678e54-fba2-4dd8-99a5-772157e1962b	3	子路的父母最大的愿望是什么？	Đoạn 2: 只要能饱饱地吃上一顿米饭，也就满足啦 (Chỉ cần được ăn một bữa cơm trắng là mãn nguyện).	1
9580f452-ba61-49f1-a14c-9e766bab5619	c4678e54-fba2-4dd8-99a5-772157e1962b	4	听到父母的话后，子路感觉怎样？	Đoạn 2: 子路听了，心里觉得十分惭愧 (Tử Lộ nghe xong, trong lòng vô cùng hổ thẹn).	1
3932919a-5a55-42d1-95b4-f70092cac5c7	c4678e54-fba2-4dd8-99a5-772157e1962b	5	为了让父母吃上米饭，子路决定去哪里？	Đoạn 3: 子路打听到百里之外有个有钱人...决定去试一试。	1
58e25f5f-e16b-4d15-8127-aca3d210b12c	c4678e54-fba2-4dd8-99a5-772157e1962b	6	主人为什么留下了子路？	Đoạn 3: 那家主人见他身体结实，就留下了他 (Chủ nhà thấy thân hình cậu cường tráng nên giữ lại).	1
9c267cb7-c041-4cfb-8906-e0d7f44757e2	c4678e54-fba2-4dd8-99a5-772157e1962b	7	半年后子路回家时，发现了什么？	Đoạn 3: 发现主人给的银子比他应该得到的多许多。	1
87764b74-80b9-4f3f-a640-89474139fea1	c4678e54-fba2-4dd8-99a5-772157e1962b	8	主人为什么多给子路钱？	Đoạn 3: 主人笑着说："...你做事勤快，这是我给你加的奖金。"	1
0a6be5b0-bb70-4708-a9d7-83656a425d08	c4678e54-fba2-4dd8-99a5-772157e1962b	9	子路回家途中买了什么东西？	Đoạn 4: 他买了一袋米、一块肉、两条鱼，背在后背上。	1
4a7e00f9-c738-4ce2-bc9c-d930e1498d0c	c4678e54-fba2-4dd8-99a5-772157e1962b	10	在回家的路上，子路遇到了什么困难？	Đoạn 4: 天气非常寒冷，雪地很滑，子路不小心滑了一下，背上的米袋差点儿被甩出去。	1
545faea1-0f44-49c9-b07f-1348970378cc	c4678e54-fba2-4dd8-99a5-772157e1962b	11	后来子路到了楚国，楚国国君怎么对待他？	Đoạn 5: 楚国国君觉得他很有本领...留他做了官，并给他很优厚的待遇。	1
06e99ceb-61e0-4e11-8717-d62ed901b102	c4678e54-fba2-4dd8-99a5-772157e1962b	12	在楚国有了好条件后，子路的心情是怎样的？	Đoạn 5: 他并没有因为物质条件好而感到欢喜，反而常常诚恳地说："多么希望父母能和我一起过好日子！...	1
1e7237f0-649e-419a-ac28-7b42e4aa2e27	c4678e54-fba2-4dd8-99a5-772157e1962b	13	俗话"百善孝为先"的意思是什么？	Đoạn 6: 意思是说，孝顺父母是各种美德中占第一位的。	1
3552c7f5-05b5-4ea0-9235-2aee4735d8c8	c4678e54-fba2-4dd8-99a5-772157e1962b	14	这个故事主要想告诉我们什么？	Đoạn 6: 子路为了让父母吃到较好的食物，不怕辛苦，这种做法确实值得我们学习。	1
d120d7bb-c11b-47b4-b439-97355c855ab7	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	0	关于济南的泉水，最早的文字记载是在什么时候？	Dựa vào câu đầu tiên trong đoạn 1: "最早的文字记载可以推到3000多年前。" (Những ghi chép bằng văn tự sớm nhất có thể lùi về hơn 3000 năm trước).	1
2cf71441-e38e-423d-a211-5d0869eb7fc1	b9cc4d39-b092-42de-9a9c-c1341741f85d	12	听到孩子们背后议论人，母亲的态度是怎样的？	母亲的反应是："我郑重地走到她们跟前，严肃地说..."	1
1dd17027-033b-4c63-8220-a2fe3040c368	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	1	许多文人对济南的泉水进行过哪些方面的描写？	Trong đoạn 1 tác giả có viết: "许多文人都对它的声音、颜色、形状、味道进行过描写。" (Nhiều văn nhân từng miêu tả về âm thanh, màu sắc, hình dáng và hương vị của nó).	1
e6b719bb-86c7-43ad-9711-f3ea15347c26	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	2	济南的老百姓住在泉边，喝着泉水，自然对它充满什么？	Đoạn 1 nêu rõ: "喝着这甜美的泉水，自然对它充满感激之情。" (Uống dòng nước suối ngọt ngào này, tự nhiên sẽ tràn đầy tình cảm biết ơn đối với nó).	1
2e3877d7-3eed-4a60-b963-f98ca7e501a8	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	3	老百姓对泉水充满感激，从而产生了什么？	Cuối đoạn 1: "从而也产生了许多关于泉水的美丽传说。" (Từ đó cũng nảy sinh ra rất nhiều truyền thuyết tươi đẹp về nước suối).	1
e0516714-87c2-474e-9953-185f9bb06bb3	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	4	传说中的青年叫什么名字？	Mở đầu đoạn 2 nhắc đến nhân vật: "有个善良的青年，名叫鲍全。" (Có một thanh niên lương thiện, tên là Bào Toàn).	1
aab6d6ad-6fc4-40b3-b188-3d5cdff2fb2f	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	5	鲍全是做什么的？	Đoạn 2 miêu tả: "他学习医术，救了很多人。" (Anh ấy học y thuật, đã cứu rất nhiều người).	1
4de063be-3019-42ea-a15e-d7c93db3c6a1	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	6	鲍全在路边救的那位老人其实是谁？	Theo truyền thuyết đoạn 2: "这老人其实是东海龙王的哥哥。" (Ông lão này thực chất là anh trai của Đông Hải Long Vương).	1
e3b07768-1a44-43b3-8c0f-43317ebaefd1	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	7	鲍全从龙王那里求到了什么？	Đoạn 2: "鲍全从龙王那儿求到了治病救人的白玉壶。" (Bào Toàn từ chỗ Long Vương đã xin được chiếc bình bạch ngọc chữa bệnh cứu người).	1
e03746e1-cc77-40da-94a1-15a1c4142228	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	8	鲍全为什么把白玉壶埋入地下？	Đoạn 2 nêu lý do chôn bình: "为了不被坏人抢走，他把壶埋入地下藏了起来。" (Để không bị kẻ xấu cướp đi, anh đem chôn xuống đất giấu đi).	1
355ce1e7-e627-46d3-8452-7345ac90d79e	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	9	"天下第一泉"指的是哪一个泉？	Cuối đoạn 2: "变成了今天有'天下第一泉'美名的趵突泉。" (Thế là biến thành suối Bào Đột mang mỹ danh Đệ nhất thiên hạ ngày nay).	1
a210e50d-3107-4064-9cc2-1fc13d0f130b	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	10	如今的济南市区内大约分布着多少个天然泉？	Đoạn 3 có số liệu rõ ràng: "分布着大大小小七百多个天然泉。" (Phân bố lớn nhỏ hơn 700 con suối tự nhiên).	1
7f559e3a-55bf-4a48-bf52-f288cd292234	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	11	这种情况在国内外城市中是怎样的？	Ngay sau câu trên đoạn 3 nhận xét: "这在国内外城市中是极为少有的。" (Điều này ở các thành phố trong và ngoài nước là cực kỳ hiếm có).	1
eaabda30-3487-4dec-8506-fcdf11c30c1c	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	12	"黑虎泉"是以什么命名的？	Đoạn 3 lấy ví dụ đặt tên: "以动物命名的黑虎泉。" (Suối Hắc Hổ được đặt tên theo động vật).	1
8784fe49-2be8-4620-af80-7812513377eb	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	13	"舜泉"和"珍珠泉"分别是以什么命名的？	Đoạn 3: "以人名命名的舜泉...以形状命名的珍珠泉。" (Suối Thuấn lấy theo tên người, suối Trân Châu lấy theo hình dáng).	1
d2dcbadb-82c9-46e4-8257-723de6839c60	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	14	济南泉水的水源来自于哪里？	Đầu đoạn 4: "济南的泉水，来自于济南市以南的广大山区。" (Nước suối Tế Nam bắt nguồn từ vùng núi rộng lớn phía nam thành phố).	1
16d8b2f3-6038-4968-9ed3-09a43fc856bc	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	15	济南南部山区的岩石主要是哪种岩石？	Đoạn 4 nhắc đến: "这些山区的岩石是大约四亿年前形成的一层厚厚的石灰岩。" (Đá của khu vực này là lớp đá vôi dày).	1
33e7d193-c8d8-46fb-ade7-16ec1387ac47	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	16	这种石灰岩有什么特点？	Đoạn 4 miêu tả đặc điểm đá vôi: "在这种石灰岩地区，陆地表面的水很容易进入地下。" (Nước trên bề mặt rất dễ ngấm xuống đất).	1
5b04204c-b238-4034-b566-af3877f95f6f	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	17	山区地下水为什么会向济南市区运动？	Đoạn 4 giải thích địa hình: "石灰岩层，以大约三十度的角度，由南向北斜，因此大量的地下水向济南运动。" (Tầng đá vôi nghiêng từ Nam sang Bắc... nên nước ngầm di chuyển về Tế Nam).	1
8abf781f-15bb-4b0d-86c6-b7b64797d458	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	18	地下水流到济南市区后，遇到了什么挡住了路？	Đoạn 4 nói về vật cản: "地下水流到这里，碰到火成岩挡住了路。" (Nước ngầm đến đây đụng phải đá magma chặn đường).	1
d757cf9e-985e-4526-80a1-6744adf05105	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	19	地下水最后为什么会冲出地表形成泉水？	Cuối đoạn 4: "它无处可流...济南旧城一带地势低...地下水就冲出地表。" (Nước không có chỗ chảy, vùng nội thành lại có địa thế thấp nên trào lên mặt đất).	1
cbc12bea-9ec8-433d-b067-53a80929d5f3	b9cc4d39-b092-42de-9a9c-c1341741f85d	0	林林和天天是什么关系？	文中第一句："林林和天天是同学。"	1
83b06fad-9342-4aee-a6ba-3c54ff420d17	b9cc4d39-b092-42de-9a9c-c1341741f85d	1	天天为什么来林林家住？	文中提到："天天的父母要出差，想请我们帮忙照看几天女儿。"	1
71e36d80-f26e-4fc6-88bd-8837341e0d00	b9cc4d39-b092-42de-9a9c-c1341741f85d	2	林林父母对于天天来家里住是什么态度？	文中明确写道："我和老公爽快地答应下来...我们巴不得呢！"	1
2499ed8b-e2b5-4459-94eb-a042cec572c3	b9cc4d39-b092-42de-9a9c-c1341741f85d	3	得知天天要来，林林的态度是怎样的？	文中说："最兴奋的是林林，嚷着要用爸爸最拿手的美味佳肴欢迎天天来我家。"	1
d2b0d7b1-fabe-4a62-99ac-8b0719cd3bf0	b9cc4d39-b092-42de-9a9c-c1341741f85d	4	林林准备和天天共用什么？	文中提到："还提出，她的书桌可以和天天共用。"	1
36a15c41-c837-4448-a76e-87483fda9123	b9cc4d39-b092-42de-9a9c-c1341741f85d	5	天天还没来的时候，林林有什么表现？	文中第二段开头："天天还没来，林林就变得异常勤劳，将屋子收拾得干干净净。"	1
1c526362-77ad-4af9-87b8-4f195106d616	b9cc4d39-b092-42de-9a9c-c1341741f85d	6	父母觉得有了天天的陪伴，大人们的日子过得怎么样？	第三段提到："天天的到来，使我和老公的日子过得异常省心。"	1
be51c0b9-a07a-4fd2-992b-da69a688aca4	b9cc4d39-b092-42de-9a9c-c1341741f85d	7	两个孩子每天早上的表现怎样？	文中写道："两个孩子每天早上不用叫就醒了。"	1
eea76c80-8002-46bd-a6ba-d15afaf9b9b0	b9cc4d39-b092-42de-9a9c-c1341741f85d	8	看到两个孩子关系那么融洽，父母心里为什么有点儿"嫉妒"？	文中说："看到女儿和天天这么亲密，大有忽略我们的趋势，我和老公都有点儿嫉妒了。"	1
dc15504b-e540-4a6d-b4c7-798eebc953b4	b9cc4d39-b092-42de-9a9c-c1341741f85d	9	一天晚上，两个孩子做完作业后聊起了什么？	第四段描述两个孩子开始滔滔不绝地聊同学的缺点，也就是在背后议论人。	1
e3c34c9c-e221-4b82-9030-42644117e546	b9cc4d39-b092-42de-9a9c-c1341741f85d	10	一个孩子不喜欢王朵朵的原因是什么？	文中提到不喜欢王朵朵是因为："她就喜欢跟穿得漂亮的同学一起玩儿，还老嘲笑别人。"	1
ec91f3e9-0a03-4e92-b847-66fc328982f3	b9cc4d39-b092-42de-9a9c-c1341741f85d	11	另一个孩子为什么讨厌高春来？	文中写道："另一个说我讨厌高春来，他最会讨好老师了……"	1
8c1c66f3-ffc4-4f8d-91c3-482dc0a78d62	b9cc4d39-b092-42de-9a9c-c1341741f85d	13	母亲教育孩子，看到别人有缺点应该怎么做？	母亲说："看到别人有缺点，应该当面说，背后说人家的坏话不好。"	1
8abe0184-490e-489c-85f3-5d6e86f0757e	b9cc4d39-b092-42de-9a9c-c1341741f85d	14	老公在旁边附和了什么观点？	老公附和道："大伙儿要和睦相处，对人要宽容。"	1
3a220182-ea24-420d-b8c2-4c09dab532a9	b9cc4d39-b092-42de-9a9c-c1341741f85d	15	听了父母的话，女儿的表情是怎样的？	文中描述："女儿却是一脸的疑惑，反问道..."	1
a1fc9879-3a07-4bc2-a365-adb5d1f3eb2f	b9cc4d39-b092-42de-9a9c-c1341741f85d	16	女儿反问了父母什么事情？	女儿反问："你们不是也有时候说，哪个朋友好相处，哪个朋友很自私吗？"	1
72b53537-467e-44e2-8aa3-d4f3a80bccec	b9cc4d39-b092-42de-9a9c-c1341741f85d	17	听到女儿的反问，父母的反应是什么？	文中写："瞬间我和老公被问得说不出话来，屋子里鸦雀无声。"	1
09a7fb3d-4ed7-4743-9310-e5abdc1790be	b9cc4d39-b092-42de-9a9c-c1341741f85d	18	作者意识到自己在教育孩子时犯了什么错误？	作者反思："我们自己的做法和对孩子的要求实行的是两套标准。"	1
a7b6d3b0-5176-480c-9291-132801aee4fc	b9cc4d39-b092-42de-9a9c-c1341741f85d	19	文章最后，作者认为想当好父母，首先应该做什么？	最后一句明确点题："想当好父母，首先要约束好自己的言行。"	1
0e6bc6c3-2d42-4183-b3ab-b9fc8cdace0b	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	0	"我"从小生活在什么样的家庭？	文章第一句："我从小生活在一个有爱的家庭……"	1
3567d013-b7b1-4e77-9aec-57074b2c9b84	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	1	父母的感情怎么样？	文中提到："父母感情和睦，很少吵架……"	1
6bfab40d-a6c2-4fd1-ad2b-4245effe8e43	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	2	父母看"我"的目光充满着什么？	文中说："态度和蔼，说话和气，目光中都充满着慈祥。"	1
96f66b48-4fee-491f-bd07-cda2d7b48dcd	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	3	"我"上大学之前有什么样的经历？	文中明确写道："在跨进大学校门之前，从没有离开过家……"	1
d10fff1f-5019-4b13-a851-0f66c1c6a30b	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	4	"我"为什么向往独立生活？	文中提到："脱离父母，独立生活对我具有巨大的诱惑，让我无比向往。"	1
66791f39-11b4-47ae-ac91-958187d353c5	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	5	第一次离开家时，"我"的心情是怎样的？	文中说："第一次离开家，心里的孤独感一下子跑了出来。"	1
8edba1a7-4fcc-442e-84a2-acfe3b30c04c	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	6	刚开学时，宿舍里的同学一给家里打电话就会怎样？	文中回忆道："宿舍里的同学一给家里打电话就哭鼻子……"	1
72dd0696-fab8-4a29-a077-b8641210c6a0	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	7	每到节假日，大家有什么样的表现？	文中说："每到节假日，大家更是片刻不停地往家赶。"	1
2d653f8d-4323-4f67-babf-1cee1dffbd11	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	8	有同学为了回家愿意做什么事情？	文中提到："有同学回趟家要坐一夜的火车，这也阻挡不了大家回家的步伐。"	1
24a98e0e-3a4f-4d9c-8a11-024a9ca6dc92	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	9	假期快到时，母亲在电话里跟"我"说了什么？	母亲却说："近来他们比较忙，要没什么事，就甭回来了……"	1
b7d6fb17-6a1b-47b2-84e6-ab5590026a0a	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	10	电话里母亲建议"我"留在学校做什么？	母亲建议："在学校看看书，或找份兼职做做。"	1
7c368174-6ae8-431e-86be-f77b1cd23ac4	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	11	听到母亲的话后，"我"的情绪发生了什么变化？	文中写道："母亲的话使我酝酿已久的恋家情绪刹那间就没有了……"	1
9c4d11db-d4d8-4489-9087-a2e172cab088	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	12	当时的"我"是怎么看待母亲的建议的？	"我"当时的想法是："我无法理解父母的反常，心中暗暗埋怨父母不体谅我。"	1
eae4305d-4591-4c76-8cf9-999158896677	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	13	无精打采了几天之后，"我"决定怎么做？	文中说："我不得不开始规划怎样熬过漫长的假期。"	1
3a035098-7283-4ed6-954e-03c0ef0d6e46	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	14	假期的校园环境是怎样的？	文中提到："假期的校园寂静得很……"	1
c3b876b1-40b4-44fc-a521-c2c74d339d09	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	15	在漫长的假期里，"我"主要做了什么？	"我"在假期："在图书馆看书，给杂志社写稿件……"	1
4d3e9940-8429-46a4-aa20-5c32646e0512	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	16	大学三年级回趟家时，母亲第一眼看到"我"脸上的表情是？	文中写道："母亲第一眼看到我时，脸上满是心疼，但瞬间那情绪就被她掩饰起来……"	1
476ea274-921b-4d79-9562-588ef5578a6a	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	17	晚上睡不着时，"我"半夜听到了什么？	文中描述："半夜听到母亲还在跟父亲唠叨……"	1
8c1f5020-83f2-4fcc-bc63-bed1672f5703	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	18	父亲认为怎样才能长本事？	父亲的声音说："总有一天她会明白的，不吃苦，怎么长本事？"	1
3d2401cc-408f-4694-8006-fc851720c312	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	19	走出卧室看到父母的样子后，"我"最终的反应是什么？	最后一句："顿时什么都明白了，不由得热泪盈眶。"	1
e9ee5fc9-f6d7-4a1a-b374-4d17cc48a8ea	7e95c23b-0171-4f96-9541-36eb895ce6a8	0	故事发生的时间是什么时候？	文中第一句写道："清晨上班，走到公司楼下……"	1
bcbe840f-1eff-4d4b-a7f3-3d8b4bb66071	7e95c23b-0171-4f96-9541-36eb895ce6a8	1	"我"在公司楼下遇到了一个什么样的人？	文中提到："迎面站着一位农民工模样的男人"。	1
78605aee-d73a-4301-9287-3a68bb83a2e9	7e95c23b-0171-4f96-9541-36eb895ce6a8	2	那个男人刚看到"我"时，表现是怎样的？	文中写道："他打量了我一番，到嘴边的话又不说了。"	1
daffc090-cac1-4629-9403-7e403afb1596	7e95c23b-0171-4f96-9541-36eb895ce6a8	3	那个男人叫住"我"是有什么事想拜托？	文中张师傅说："中秋节快到了，要给他寄盒月饼，可他白天在工地，地址没法写，想请我帮他代收一下。"	1
00669a86-2095-4ce8-9b96-091331be66de	7e95c23b-0171-4f96-9541-36eb895ce6a8	4	从外表特征来看，张师傅是个怎样的人？	文中"我"打量他时的描写："饱经沧桑的脸上流露出朴实；一双过于操劳的大手；胡须起码一个星期没刮了；南方口音。"	1
f45e0eaa-47a0-40c4-b4c4-d3393c4994f1	7e95c23b-0171-4f96-9541-36eb895ce6a8	5	张师傅原先在家乡是做什么工作的？	文中提到："果然，他来自南方的一个乡镇，原先是裁缝……"	1
8a4fe821-7846-4120-ac06-9cc6958705d4	7e95c23b-0171-4f96-9541-36eb895ce6a8	6	张师傅的女儿现在在哪个城市？	文中明确提到："他女儿在上海"。	1
3bbb9b12-9c8e-4ae2-b4ac-2332d27524d7	7e95c23b-0171-4f96-9541-36eb895ce6a8	7	张师傅为什么不能自己收包裹？	文中解释："可他白天在工地，地址没法写，想请我帮他代收一下。"	1
2b87ddc8-13dd-45f2-a9c6-750c9758fdd6	7e95c23b-0171-4f96-9541-36eb895ce6a8	8	"我"半开玩笑地对张师傅说了什么？	文中"我"半开玩笑地说："这个忙好帮，您不怕我把收到的月饼给吃了？"	1
c0e26504-8f6b-499e-8e5b-0c1525070850	7e95c23b-0171-4f96-9541-36eb895ce6a8	9	张师傅为什么觉得"我"不会欺骗他？	张师傅回答："你和我女儿一样，斯斯文文的，一看就读过书，心眼儿好，守信誉，怎么会欺骗我呢？"	1
be810269-240b-4714-a02c-e39e6e46e214	7e95c23b-0171-4f96-9541-36eb895ce6a8	10	张师傅的女儿是什么学历？	张师傅说："他说女儿念了硕士，有学位……"	1
5abd90f6-5f87-480d-8509-763c3d3ffdf4	7e95c23b-0171-4f96-9541-36eb895ce6a8	11	提起女儿时，张师傅的面部表情是怎样的？	文中写道："说起女儿，他满脸的骄傲。"	1
79e0f5c1-4ae6-4996-8f9e-61fc0e6f8d19	7e95c23b-0171-4f96-9541-36eb895ce6a8	12	第几天中午，"我"收到了包裹？	文中提到："第三天中午，我收到了一个重重的包裹"。	1
fedaaa38-86f1-4598-b25a-5c4b384dc2c3	7e95c23b-0171-4f96-9541-36eb895ce6a8	13	包裹上的发件人名字叫什么？	文中写道："发件人叫'张心悦'"。	1
0b0b52a9-3991-4121-8c48-16c5e7bdcb5c	7e95c23b-0171-4f96-9541-36eb895ce6a8	14	收到包裹后，"我"联系张师傅的结果如何？	文中描述："我马上拨打张师傅的电话，却无人接听，给他发短信，他也不回，直到下班，仍旧没有音信。"	1
b8cd9d7b-2693-4516-898c-ce5a398c56fd	7e95c23b-0171-4f96-9541-36eb895ce6a8	15	下班后，"我"是怎么找到张师傅的？	文中说："我心里隐约有些不安，抱着包裹就往工地跑，找了一位工人，请他帮忙找张师傅。"	1
0a2a114b-53ef-4f42-a0c9-448a7c6baea3	7e95c23b-0171-4f96-9541-36eb895ce6a8	16	张师傅为什么一直没接电话没回信息？	张师傅解释说："说今天特别忙，手机没电了都不知道。"	1
7b24d8d1-378b-44d6-a9da-b7da28c464a3	7e95c23b-0171-4f96-9541-36eb895ce6a8	17	见到"我"后，张师傅坚持要做什么事？	文中写道："说着就要拆包裹，非要请我吃月饼不可。"	1
7cde7c4d-bf32-4ff7-8d79-0226bdd903b4	7e95c23b-0171-4f96-9541-36eb895ce6a8	18	在电话里，张师傅主要嘱咐了女儿什么？	张师傅对女儿说："我身体好着呢，别惦记，好好工作，别给爸爸丢人啊…"	1
48ff7465-5fa6-48fd-bef6-8296e3a1db3d	7e95c23b-0171-4f96-9541-36eb895ce6a8	19	文章最后一句"看得出，女儿是他的幸福"表达了什么核心思想？	整篇文章通过买月饼的小事，体现了父亲的无私、为了女儿在外干苦力依然自豪的伟大父爱。	1
1e3674e2-1cb6-4b73-9b34-aa6d4c78b9a4	c529d5ca-454b-4f5a-b6d3-0965aad5304f	0	老鼠原本是谁的宠物？	文中第一句："老鼠是山神的宠物……"	1
05c25c64-3457-4a1b-ba19-fefcff9f989d	c529d5ca-454b-4f5a-b6d3-0965aad5304f	1	老鼠为什么向山神请假？	文中提到："它厌倦了宠物的生活，也很厌恶宠物这个角色，于是向山神请假……"	1
05e880f0-e52e-49ca-8e27-d085a183821b	c529d5ca-454b-4f5a-b6d3-0965aad5304f	2	山神让老鼠回到自己身边的条件是什么？	山神说："倘若你还想回来，必须战胜大象……"	1
1a082bf2-a924-4dee-9f4a-495557a37125	c529d5ca-454b-4f5a-b6d3-0965aad5304f	3	老鼠来到动物界后发觉了什么？	文中写道："老鼠一来到动物界，便发觉它对山神的承诺是多么草率，它是那么弱小……"	1
65b0eb28-aa21-423d-b401-5587d0996f6d	c529d5ca-454b-4f5a-b6d3-0965aad5304f	4	尽管力量悬殊，老鼠还是决定怎么做？	文中说："但老鼠还是决定尝试一下。"	1
7de42bd3-7bee-4e4b-9b9d-71be77a7c230	c529d5ca-454b-4f5a-b6d3-0965aad5304f	5	老鼠最初计划怎么战胜大象？	它想："我可以乘大象不注意，进到大象鼻子里去，大象不能喘气了，就得请求我饶恕……"	1
106d297c-e481-45e2-9ec6-50cd8af0be27	c529d5ca-454b-4f5a-b6d3-0965aad5304f	6	老鼠实施计划时，大象正在干什么？	文中说："这天，大象正在吃树叶，老鼠乘机跑进大象的鼻子中……"	1
fdacde50-b411-4e3e-97db-2d2a52ca03b6	c529d5ca-454b-4f5a-b6d3-0965aad5304f	7	老鼠刚进大象鼻子后发生了什么？	文中描述："刚进去，大象痒得难受，猛烈地打起了喷嚏，老鼠像子弹一样被射了出来。"	1
b97d45e4-ebf0-462c-ad80-5730488f54b7	c529d5ca-454b-4f5a-b6d3-0965aad5304f	8	被老鼠钻进鼻子后，大象的态度是怎样的？	文中写道："大象用蔑视的眼光盯着它，愤怒地说……"	1
c93aec17-1718-459d-9fce-b3b2ad6bc182	c529d5ca-454b-4f5a-b6d3-0965aad5304f	9	大象警告老鼠，下次再耍流氓会怎么做？	大象说："下次再耍流氓，我一定踩扁了你。"	1
2397af92-8b21-4b30-b6eb-2f6363af0572	c529d5ca-454b-4f5a-b6d3-0965aad5304f	10	后来，大象遭遇了什么不幸？	文中说："大象不留神落入了打猎者设下的巨网中。"	1
cf69e18f-8f32-479a-a825-e859b1201ce7	c529d5ca-454b-4f5a-b6d3-0965aad5304f	11	大象落网时的天气或时间是怎样的？	文中写道："那是一个夕阳将落的傍晚……"	1
612cf2fa-712b-4c65-bdd0-547352e7a9c8	c529d5ca-454b-4f5a-b6d3-0965aad5304f	12	大象落入巨网后有什么反应？	文中提到："它不顾一切地用力挣扎，往外乱窜，想摆脱巨网……"	1
62bbd506-fb9f-4aa8-8125-e1fa781e7381	c529d5ca-454b-4f5a-b6d3-0965aad5304f	13	老鼠看到大象落网，最初心里是怎么想的？	它想："只要我在它身体的重要部位咬几个洞，它就没命了，我不就战胜大象了吗？"	1
5b3b340d-a2df-4f3b-9fd7-dad3bfac0473	c529d5ca-454b-4f5a-b6d3-0965aad5304f	14	为什么老鼠最终没有趁机咬死大象？	文中解释："然而，看到大象悲惨的样子，老鼠不忍下手，它觉得那样未免太过残忍，良心告诉它，应该救大象……"	1
2f34c07d-aa79-429f-b245-4edaabdd299d	c529d5ca-454b-4f5a-b6d3-0965aad5304f	15	老鼠是怎么救出大象的？	文中说："于是，它开始用锋利的牙齿咬缠绕着大象的网和绳子。"	1
cb7b9353-873d-4428-aeb0-1e2d13ac5165	c529d5ca-454b-4f5a-b6d3-0965aad5304f	16	为了救出大象，老鼠付出了什么？	文中提到："老鼠几乎耗费了全部力气，绳子终于被咬断了……"	1
529d5601-88e4-4c3d-b498-b35d2a9a760a	c529d5ca-454b-4f5a-b6d3-0965aad5304f	17	获救之后，老鼠和大象的关系变得怎样了？	文中明言："从此，老鼠和大象成了好朋友。"	1
b1fddfaa-fb03-4347-b802-cdc1837c07d5	c529d5ca-454b-4f5a-b6d3-0965aad5304f	18	当山神要老鼠回去时，老鼠怎么回答的？	老鼠说："这大概不可能了，我无法战胜大象。"	1
75037fab-3acd-4c2b-89d0-c978effb2cca	c529d5ca-454b-4f5a-b6d3-0965aad5304f	19	山神认为这场"完美的胜利"指的是什么？	山神最后说："你化敌为友，创造了举世瞩目的成就，世界上还有比这更完美的胜利吗？"	1
0b970af5-21ee-44ee-8b7c-dd5069293f59	2c45fed9-5798-4042-a668-09d8231443df	0	作者想学一门外语的初衷是什么？	文中第一句："迫不及待地想不再依靠翻译，独自阅读原文……"	1
d2a2dfc7-2992-4531-ba45-3a1d66437bf5	2c45fed9-5798-4042-a668-09d8231443df	1	作者找到的语言学习机构在哪里？	文中提到："它在离我家不远的一栋办公楼上。"	1
aabb34c5-be07-4ce9-b541-9eb6dff7cadd	2c45fed9-5798-4042-a668-09d8231443df	2	作者第一天去咨询时，心情是怎样的？	文中写道："这天我兴致勃勃地专程前去咨询。"	1
6a31bca7-128c-4a77-8ca5-75d4da15ba02	2c45fed9-5798-4042-a668-09d8231443df	3	接待作者的那位女士一见面就问了什么？	文中说："不料首先面对的是她接连不断的发问：'为什么要学外语？最近有出国计划吗？职业是什么？'"	1
9f478f4b-38e8-40c4-9b67-271f8b124707	2c45fed9-5798-4042-a668-09d8231443df	4	听到女士的连串发问后，作者有什么反应？	作者心里想："她的问题涉及了我的隐私，我很反感，话也变得火药味十足。"	1
9530f2c3-0298-4cf8-8653-237be4bbaa94	2c45fed9-5798-4042-a668-09d8231443df	5	女士解释她为什么要问这些问题的原因是？	女士说："我必须了解学员，为学员着想，帮他策划学习方案……"	1
78935b5e-f50c-4bc3-ae97-0ab40bc4a9ea	2c45fed9-5798-4042-a668-09d8231443df	6	作者告诉女士自己的具体目标是什么？	作者说："我没什么具体目标。就是找一个班插班听课，随意学学而已。"	1
69bf2fe8-ec94-4ba7-bde6-83631f166b4c	2c45fed9-5798-4042-a668-09d8231443df	7	女士认为如果没有具体目标会怎样？	女士回答："如果您没有具体目标，是学不好一种语言的。"	1
17e087e4-b2c5-4dcc-a2f7-f9e1af3b5681	2c45fed9-5798-4042-a668-09d8231443df	8	后来换了一位男士接待作者，他的态度如何？	文中描述："他态度和蔼，真诚恳切，我被打动了……"	1
f4eba87c-d2d0-4761-bf71-83999361a676	2c45fed9-5798-4042-a668-09d8231443df	9	作者向男士吐露的真实学习原因是什么？	作者说："我喜欢这个国家的文化，学习语言无非是为了看原文电影、读文学作品……"	1
fc4fd37b-e274-46a5-b1c3-c67dfca5c0d7	2c45fed9-5798-4042-a668-09d8231443df	10	男士听到作者的回答后说了什么，让作者觉得碰上了"知音"？	男士说："明白了。不想通过翻译，直接进入原文的世界？"这让作者欢天喜地。	1
0d9f0292-1b5d-4245-b15d-959cbf351e1d	2c45fed9-5798-4042-a668-09d8231443df	11	男士接下来的哪句话让作者"顿时崩溃了"？	男士说："光凭兴趣，恐怕难以持久。"作者觉得怎么说着又绕回来了。	1
79290197-9728-43e5-a3ae-63e6d35b80f8	2c45fed9-5798-4042-a668-09d8231443df	12	作者听完男士的话后，做了什么决定？	文中写道："我果断地站起来，斩钉截铁地表明要走。"	1
c2f2fa0f-af08-4aac-ba58-cae9449eace1	2c45fed9-5798-4042-a668-09d8231443df	13	回家后，作者找到了怎样的学习方式？	文中提到："回家后，我不死心，开始在网上找在线学习。"	1
8288e6cb-9f24-4b47-88ff-b382ed994565	2c45fed9-5798-4042-a668-09d8231443df	14	作者为什么觉得网上的这家机构"和我的思维很搭"？	文中说："从基础教起，每个句子的语法都详细讲解，不留死角，和我的思维很搭。"	1
10b4d229-69f8-42ce-ad65-8d50183626f5	2c45fed9-5798-4042-a668-09d8231443df	15	在这家在线机构学习，让作者觉得"心里舒服"的最重要原因是什么？	作者说："更重要的是心里舒服……没有人硬逼着我执行学习计划，也没人问我为啥要学它，以及我的单位、身份，包括薪水……"	1
f5739e59-8601-42eb-b67a-0a64b265564c	2c45fed9-5798-4042-a668-09d8231443df	16	作者认为自己这种学习方式有什么"弊端"？	文中提到："弊端在于高兴了拼命学一阵子，不高兴了就搁在一边。"	1
a3a1bd42-e514-42e7-bd14-9fad25f37181	2c45fed9-5798-4042-a668-09d8231443df	17	为什么作者有时候学习会"前后颠倒"？	作者解释："有时还前后颠倒，因为后面那课的话题太诱惑我了。"	1
cd79b874-0205-474c-9c36-859dd0f46c31	2c45fed9-5798-4042-a668-09d8231443df	18	经过利弊权衡，作者认为这种学习方式怎么样？	文中明确写出："但是，利弊权衡，利还是大于弊。"	1
c79e3ec6-446f-40a3-a1ed-e04756f1ce42	2c45fed9-5798-4042-a668-09d8231443df	19	文章最后，作者认为学习最大的享受是什么？	最后一句："因为我总能在忘我的快乐中，津津有味地享受学习。"	1
\.


--
-- Data for Name: radical_sets; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.radical_sets (id, set_number, title, icon, lesson_id) FROM stdin;
\.


--
-- Data for Name: radicals; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.radicals (id, set_id, sort_order, radical, name, meaning, example_chars) FROM stdin;
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.role_permissions (role_id, permission_id) FROM stdin;
1	1
1	2
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.roles (id, code, name, description) FROM stdin;
1	admin	Quản trị viên	Có toàn quyền truy cập hệ thống
2	student	Học viên	Có khả năng đăng nhập vào phần học tập của mình
\.


--
-- Data for Name: search_history; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.search_history (id, user_id, query, vocab_id, searched_at) FROM stdin;
\.


--
-- Data for Name: user_progress; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_progress (id, user_id, lesson_id, score, completed, attempts, time_spent_s, last_played, created_at) FROM stdin;
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_roles (user_id, role_id, created_at) FROM stdin;
0298aa47-9c1a-4fe0-bd03-2c2044fa18e1	1	2026-04-20 09:40:33.651845+00
4dd6a792-773b-41e4-bed3-13ecb824b188	2	2026-04-20 15:55:03.997586+00
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_sessions (id, user_id, refresh_token, ip_address, user_agent, expires_at, created_at) FROM stdin;
\.


--
-- Data for Name: user_word_progress; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_word_progress (user_id, vocab_id, status, review_count, last_reviewed) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.users (id, username, password_hash, display_name, email, is_active, created_at, last_login_at) FROM stdin;
0298aa47-9c1a-4fe0-bd03-2c2044fa18e1	admin	$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J.1kqV2/i	Nga Hoc HSK	\N	t	2026-04-20 09:33:00.895135+00	\N
4dd6a792-773b-41e4-bed3-13ecb824b188	thuanlevan72	$2a$13$ntD3A.N8MzC7yVLcqh3D4uV9pXn.yJsmUEUYP1nBfm/ziVd5CkOce	Lê Văn Thuận	thuanlevan72@gmail.com	t	2026-04-20 15:55:03.997273+00	2026-04-20 16:34:27.748495+00
\.


--
-- Data for Name: vocabulary; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.vocabulary (id, lesson_id, sort_order, word, pinyin, meaning, example_cn, example_py, example_vn, audio_url, meaning_en, image_url) FROM stdin;
1dd74a60-5338-40dd-9603-bfaea39a6d63	f52656ab-a7ea-472d-9f3a-d0454a24f551	0	律师	lǜshī	Luật sư	他是一名很有经验的律师。	Tā shì yī míng hěn yǒu jīngyàn de lǜshī.	Anh ấy là một luật sư rất có kinh nghiệm.	\N	\N	\N
f8b4faf5-0d58-44a9-8633-e642c337ecbb	f52656ab-a7ea-472d-9f3a-d0454a24f551	1	法律	fǎlǜ	Pháp luật	我们每个人都应该遵守法律。	Wǒmen měi gè rén dōu yīnggāi zūnshǒu fǎlǜ.	Mỗi người chúng ta đều nên tuân thủ pháp luật.	\N	\N	\N
0e56233e-ea46-4b42-8055-9d5d24c946be	f52656ab-a7ea-472d-9f3a-d0454a24f551	2	俩	liǎ	Hai (người/vật)	我们俩一起去吃饭吧.	Wǒmen liǎ yìqǐ qù chīfàn ba.	Hai chúng ta cùng đi ăn nhé.	\N	\N	\N
c5ab3a12-4758-4b55-9573-f724d59d60f6	f52656ab-a7ea-472d-9f3a-d0454a24f551	3	印象	yìnxiàng	Ấn tượng	他给我的印象很好。	Tā gěi wǒ de yìnxiàng hěn hǎo.	Anh ấy để lại cho tôi ấn tượng rất tốt.	\N	\N	\N
d6ec35dd-bc70-4c7a-82b1-3b68200d0615	f52656ab-a7ea-472d-9f3a-d0454a24f551	4	深	shēn	Sâu, sâu sắc	我对这部电影的印象很深。	Wǒ duì zhè bù diànyǐng de yìnxiàng hěn shēn.	Tôi có ấn tượng rất sâu về bộ phim này.	\N	\N	\N
75c479f0-68b7-4eaa-9201-33121bc2238e	f52656ab-a7ea-472d-9f3a-d0454a24f551	5	熟悉	shúxī	Quen thuộc	我对这个地方很熟悉。	Wǒ duì zhè ge dìfang hěn shúxī.	Tôi rất quen thuộc với nơi này.	\N	\N	\N
c341827d-57df-417a-a414-7a0eee5fc6db	f52656ab-a7ea-472d-9f3a-d0454a24f551	6	不仅…也…	bùjǐn... yě...	Không những... mà còn...	他不仅聪明，也很努力。	Tā bùjǐn cōngmíng, yě hěn nǔlì.	Anh ấy không chỉ thông minh mà còn rất chăm chỉ.	\N	\N	\N
7de1fe32-5c0a-4a81-ac9f-8f18a5998050	f52656ab-a7ea-472d-9f3a-d0454a24f551	7	就要…了	jiù yào... le	Sắp... rồi	我们就要考试了。	Wǒmen jiù yào kǎoshì le.	Chúng tôi sắp thi rồi.	\N	\N	\N
96f1fc01-1cc4-44c8-8d40-02dc90f02239	f52656ab-a7ea-472d-9f3a-d0454a24f551	8	性格	xìnggé	Tính cách	她的性格很开朗。	Tā de xìnggé hěn kāilǎng.	Tính cách của cô ấy rất vui vẻ.	\N	\N	\N
dc5722f3-fc17-4aca-8653-66dbb9549ac4	f52656ab-a7ea-472d-9f3a-d0454a24f551	9	脾气	píqi	Tính khí	他的脾气不太好。	Tā de píqi bú tài hǎo.	Tính khí của anh ấy không được tốt lắm.	\N	\N	\N
e8e22868-88c4-44ef-9374-bffd3bd0dcfd	f52656ab-a7ea-472d-9f3a-d0454a24f551	10	开玩笑	kāi wánxiào	Nói đùa	我只是开玩笑，你别生气。	Wǒ zhǐshì kāi wánxiào, nǐ bié shēngqì.	Tôi chỉ đùa thôi, bạn đừng giận.	\N	\N	\N
b5023d23-fe23-4670-9261-6d26e913c93b	f52656ab-a7ea-472d-9f3a-d0454a24f551	11	从来	cónglái	Từ trước tới nay	我从来不喝咖啡。	Wǒ cónglái bù hē kāfēi.	Tôi từ trước đến nay không uống cà phê.	\N	\N	\N
5ab4e477-05fc-401f-bdf7-1227ca1ff948	f52656ab-a7ea-472d-9f3a-d0454a24f551	12	最好	zuìhǎo	Tốt nhất	你最好早点休息。	Nǐ zuìhǎo zǎo diǎn xiūxi.	Bạn tốt nhất nên nghỉ sớm.	\N	\N	\N
dbed056e-1fb1-4a68-aefc-da0ed34879e4	f52656ab-a7ea-472d-9f3a-d0454a24f551	13	共同	gòngtóng	Chung, cùng nhau	我们有很多共同的兴趣。	Wǒmen yǒu hěn duō gòngtóng de xìngqù.	Chúng tôi có nhiều sở thích chung.	\N	\N	\N
0de214af-7d47-409f-90f8-df59d7b1da83	f52656ab-a7ea-472d-9f3a-d0454a24f551	14	适合	shìhé	Phù hợp (động từ)	这份工作很适合 tu。	Zhè fèn gōngzuò hěn shìhé nǐ.	Công việc này rất phù hợp với bạn.	\N	\N	\N
c0f73cec-3a87-4e5d-9536-8f04c2bd0a65	f52656ab-a7ea-472d-9f3a-d0454a24f551	15	合适	héshì	Thích hợp (tính từ)	这个时间不太合适见面。	Zhè ge shíjiān bú tài héshì jiànmiàn.	Thời gian này không thích hợp để gặp mặt.	\N	\N	\N
7e38b681-26bb-4285-bfe1-86d302a6a674	f52656ab-a7ea-472d-9f3a-d0454a24f551	16	幸福	xìngfú	Hạnh phúc	他们過着幸福的生活。	Tāmen guò zhe xìngfú de shēnghuó.	Họ sống một cuộc sống hạnh phúc.	\N	\N	\N
5fb33a29-5ccb-4dc0-ab7b-0926e840dded	f52656ab-a7ea-472d-9f3a-d0454a24f551	17	快…了	kuài... le	Sắp... rồi	天快黑了，我们回去吧。	Tiān kuài hēi le, wǒmen huíqù ba.	Trời sắp tối rồi, chúng ta về thôi.	\N	\N	\N
86491f61-02b9-4524-9aa0-d8b3538a6389	f52656ab-a7ea-472d-9f3a-d0454a24f551	18	浪漫	làngmàn	Lãng mạn	他是一个很浪漫的人。	Tā shì yí ge hěn làngmàn de rén.	Anh ấy là một người rất lãng mạn.	\N	\N	\N
a4f7f797-e436-4eb8-b349-fe679ac66a16	f52656ab-a7ea-472d-9f3a-d0454a24f551	19	爱情	àiqíng	Tình yêu	他们的爱情很美好。	Tāmen de àiqíng hěn měihǎo.	Tình yêu của họ rất đẹp.	\N	\N	\N
2226102c-c10d-4d42-8185-7e18ee754aaf	f52656ab-a7ea-472d-9f3a-d0454a24f551	20	够	gòu	Đủ	这些钱够用了。	Zhèxiē qián gòu yòng le.	Số tiền này đủ dùng rồi.	\N	\N	\N
78ced971-873e-4df1-93e7-cab635276219	f52656ab-a7ea-472d-9f3a-d0454a24f551	21	缺点	quēdiǎn	Khuyết điểm	每个人都有缺点和优点。	Měi ge rén dōu yǒu quēdiǎn hé yōudiǎn.	Mỗi người đều có khuyết điểm và ưu điểm.	\N	\N	\N
d54c0a8d-dbea-43e6-9a6b-6fdd30d0d809	f52656ab-a7ea-472d-9f3a-d0454a24f551	22	优点	yōudiǎn	Ưu điểm	每个人都有缺点和优点。	Měi ge rén dōu yǒu quēdiǎn hé yōudiǎn.	Mỗi người đều có khuyết điểm và ưu điểm.	\N	\N	\N
19747f18-6819-4b8c-8678-eda1e52e4a0b	f52656ab-a7ea-472d-9f3a-d0454a24f551	23	接受	jiēshòu	Chấp nhận	我不能接受这个结果。	Wǒ bù néng jiēshòu zhè ge jiéguǒ.	Tôi không thể chấp nhận kết quả này.	\N	\N	\N
376f0e45-fda4-40ea-b7ff-7686f8cd21bc	f52656ab-a7ea-472d-9f3a-d0454a24f551	24	羡慕	xiànmù	Ngưỡng mộ, ghen tị	我很羡慕他们的生活。	Wǒ hěn xiànmù tāmen de shēnghuó.	Tôi rất ngưỡng mộ cuộc sống của họ.	\N	\N	\N
06d8884e-f45d-4df3-9572-5512f230f8cd	f52656ab-a7ea-472d-9f3a-d0454a24f551	25	星星	xīngxing	Ngôi sao	晚上可以看到很多星星。	Wǎnshang kěyǐ kàndào hěn duō xīngxing.	Buổi tối có thể nhìn thấy rất nhiều ngôi sao.	\N	\N	\N
dfbc24ca-1b5a-41ca-a26f-f1801e53b277	f52656ab-a7ea-472d-9f3a-d0454a24f551	26	即使…也…	jíshǐ... yě...	Cho dù... cũng...	即使很忙，他也会陪家人。	Jíshǐ hěn máng, tā yě huì péi jiārén.	Dù rất bận, anh ấy cũng sẽ ở bên gia đình.	\N	\N	\N
1b246d3d-4156-4c47-88e6-26699da95bc4	f52656ab-a7ea-472d-9f3a-d0454a24f551	27	加班	jiābān	Tăng ca	他昨天加班到很晚。	Tā zuótiān jiābān dào hěn wǎn.	Hôm qua anh ấy tăng ca rất muộn.	\N	\N	\N
dbccf36b-9ea4-4563-933f-dda920e45a91	f52656ab-a7ea-472d-9f3a-d0454a24f551	28	亮	liàng	Sáng	今天的月亮很亮。	Jīntiān de yuèliang hěn liàng.	Mặt trăng hôm nay rất sáng.	\N	\N	\N
593e0a70-d856-40dd-8664-75b329b078eb	f52656ab-a7ea-472d-9f3a-d0454a24f551	29	其实	qíshí	Thực ra	其实我早就知道了。	Qíshí wǒ zǎo jiù zhīdào le.	Thực ra tôi đã biết từ lâu rồi.	\N	\N	\N
a729ce47-5d2a-4689-9118-6776fba2b9dc	f52656ab-a7ea-472d-9f3a-d0454a24f551	30	感动	gǎndòng	Cảm động	他的故事让我很感动。	Tā de gùshi ràng wǒ hěn gǎndòng.	Câu chuyện của anh ấy khiến tôi rất cảm động.	\N	\N	\N
62760870-6aba-4c03-8af5-18271bba39d8	f52656ab-a7ea-472d-9f3a-d0454a24f551	31	自然	zìrán	Tự nhiên	他说话很自然。	Tā shuōhuà hěn zìrán.	Anh ấy nói chuyện rất tự nhiên.	\N	\N	\N
2e4fe3a7-fd18-41b3-8749-953cc1a9f773	f52656ab-a7ea-472d-9f3a-d0454a24f551	32	原因	yuányīn	Nguyên nhân	你知道这个问题的原因吗？	Nǐ zhīdào zhè ge wèntí de yuányīn ma?	Bạn có biết nguyên nhân của vấn đề này không?	\N	\N	\N
0c7afcae-4a1d-444e-86cb-72f7037ab58f	f52656ab-a7ea-472d-9f3a-d0454a24f551	33	互相	hùxiāng	Lẫn nhau	他们互相帮助。	Tāmen hùxiāng bāngzhù.	Họ giúp đỡ lẫn nhau.	\N	\N	\N
c2dcc78e-0c60-4930-84c1-94cd3f7c95ab	f52656ab-a7ea-472d-9f3a-d0454a24f551	34	吸引	xīyǐn	Thu hút	这本书很吸引人。	Zhè běn shū hěn xīyǐn rén.	Cuốn sách này rất thu hút.	\N	\N	\N
cc29c42f-ce94-4027-a5bd-89c7b62d9ac1	f52656ab-a7ea-472d-9f3a-d0454a24f551	35	幽默	yōumò	Hài hước	他很幽默，大家都喜欢他。	Tā hěn yōumò, dàjiā dōu xǐhuan tā.	Anh ấy rất hài hước, ai cũng thích.	\N	\N	\N
26517c71-8176-4d73-8041-b964a13e5f40	f52656ab-a7ea-472d-9f3a-d0454a24f551	36	红脸	hóngliǎn	Đỏ mặt, cãi nhau	他们因为一点小事就红脸了。	Tāmen yīnwèi yì diǎn xiǎoshì jiù hóngliǎn le.	Họ chỉ vì một chuyện nhỏ mà cãi nhau.	\N	\N	\N
0d5af91a-99bc-4de6-9ada-e354d702b7c3	95fea087-1e92-491e-8649-501903f17e9f	0	礼拜天	lǐbàitiān	Chủ nhật	礼拜天我一般在家休息，不太喜欢出门。	Lǐbàitiān wǒ yìbān zài jiā xiūxi, bú tài xǐhuan chūmén.	Chủ nhật tôi thường ở nhà nghỉ, không thích ra ngoài.	\N	\N	\N
e922d746-272a-4063-bad1-1d974c284397	95fea087-1e92-491e-8649-501903f17e9f	1	空儿	kòngr	Thời gian rảnh	等我有空儿的时候，再联系你吧。	Děng wǒ yǒu kòngr de shíhou, zài liánxì nǐ ba.	Đợi khi tôi rảnh rồi hãy liên lạc nhé.	\N	\N	\N
a3f1c95c-8da4-4706-9308-71b6fa91c1c3	95fea087-1e92-491e-8649-501903f17e9f	2	母亲	mǔqīn	Mẹ	母亲一直很关心我的学习和生活。	Mǔqīn yìzhí hěn guānxīn wǒ de xuéxí hé shēnghuó.	Mẹ luôn quan tâm đến việc học và cuộc sống của tôi.	\N	\N	\N
72239291-91e0-402f-904d-067ccc9dcdf8	95fea087-1e92-491e-8649-501903f17e9f	3	上有老，下有小	shàng yǒu lǎo, xià yǒu xiǎo	Trên có cha mẹ già, dưới có con nhỏ	他上有老，下有小，不敢轻易辞职。	Tā shàng yǒu lǎo, xià yǒu xiǎo, bù gǎn qīngyì cízhí.	Anh ấy có gia đình phải lo nên không dám nghỉ việc.	\N	\N	\N
d1290322-709d-4664-bc42-c102a5e69c9a	95fea087-1e92-491e-8649-501903f17e9f	4	不过	búguò	Nhưng, tuy nhiên / Chỉ là	我很想去，不过今天没有时间。我不过是开个玩笑，你别当真。	Wǒ hěn xiǎng qù, búguò jīntiān méiyǒu shíjiān. Wǒ búguò shì kāi gè wánxiào, nǐ bié dàngzhēn.	Tôi rất muốn đi, nhưng hôm nay không có thời gian. Tôi chỉ đùa thôi, bạn đừng coi là thật.	\N	\N	\N
41546151-eb94-4b7f-8649-e067e14df99e	95fea087-1e92-491e-8649-501903f17e9f	5	永远	yǒngyuǎn	Mãi mãi	我会永远记得你的帮助。	Wǒ huì yǒngyuǎn jìde nǐ de bāngzhù.	Tôi sẽ mãi nhớ sự giúp đỡ của bạn.	\N	\N	\N
6105ad58-7f9a-4bc7-9974-bf3c6478f112	95fea087-1e92-491e-8649-501903f17e9f	6	方向	fāngxiàng	Phương hướng	做事情之前，一定要有明确的方向。	Zuò shìqing zhīqián, yídìng yào yǒu míngquè de fāngxiàng.	Làm việc gì cũng cần có phương hướng rõ ràng.	\N	\N	\N
939328af-bf82-4f81-9d7d-c9db9fa64602	95fea087-1e92-491e-8649-501903f17e9f	7	优秀	yōuxiù	Xuất sắc	她是一名非常优秀的教师。	Tā shì yì míng fēicháng yōuxiù de jiàoshī.	Cô ấy là một giáo viên rất xuất sắc.	\N	\N	\N
4d5e3a6d-34e9-4812-a966-a6bfe6cf3d35	95fea087-1e92-491e-8649-501903f17e9f	8	硕士	shuòshì	Thạc sĩ	他打算毕业以后去读硕士。	Tā dǎsuàn bìyè yǐhòu qù dú shuòshì.	Anh ấy dự định học thạc sĩ sau khi tốt nghiệp.	\N	\N	\N
b0ff9f95-5028-44c6-af83-e6aecf5729b0	95fea087-1e92-491e-8649-501903f17e9f	9	翻译	fānyì	Phiên dịch	她毕业后当了一名翻译。	Tā bìyè hòu dāng le yì míng fānyì.	Cô ấy trở thành phiên dịch sau khi tốt nghiệp.	\N	\N	\N
619d8df9-3b67-41da-8efc-6fb15b4ed478	95fea087-1e92-491e-8649-501903f17e9f	10	确实	quèshí	Thực sự	他说的话确实很有道理。	Tā shuō de huà quèshí hěn yǒu dàolǐ.	Điều anh ấy nói thực sự có lý.	\N	\N	\N
605e57c2-dd9b-4fa5-b553-565150eef10c	95fea087-1e92-491e-8649-501903f17e9f	11	兴奋	xìngfèn	Phấn khởi	听到这个消息，他兴奋地跳了起来。	Tīngdào zhège xiāoxi, tā xìngfèn de tiào le qǐlái.	Nghe tin đó, anh ấy vui đến nhảy lên.	\N	\N	\N
476726e9-740d-4685-a74b-bdde9c23a42d	95fea087-1e92-491e-8649-501903f17e9f	12	别提多	biétí duō	Rất… (không tả nổi)	拿到奖学金的时候，我别提多高兴了。	Ná dào jiǎngxuéjīn de shíhou, wǒ biétí duō gāoxìng le.	Nhận học bổng xong, tôi vui không tả nổi.	\N	\N	\N
05a2cdc1-ec11-4024-9ea4-6c3cd37080ae	95fea087-1e92-491e-8649-501903f17e9f	13	拉	lā	Kéo, dắt	小女孩拉着妈妈的手不肯放开。	Xiǎo nǚhái lā zhe māma de shǒu bù kěn fàngkāi.	Cô bé nắm tay mẹ không chịu buông.	\N	\N	\N
12164397-3407-4b0f-b19b-6605a2a5a7a8	95fea087-1e92-491e-8649-501903f17e9f	14	建议	jiànyì	Đề nghị, góp ý	老师给了我很多有用的建议。	Lǎoshī gěi le wǒ hěn duō yǒuyòng de jiànyì.	Giáo viên cho tôi nhiều lời khuyên hữu ích.	\N	\N	\N
851762c5-3bea-4891-9700-8b213cbbf2bc	95fea087-1e92-491e-8649-501903f17e9f	15	职业	zhíyè	Nghề nghiệp	选择职业时要考虑自己的兴趣。	Xuǎnzé zhíyè shí yào kǎolǜ zìjǐ de xìngqù.	Chọn nghề cần cân nhắc sở thích.	\N	\N	\N
2cfa1eb2-ba81-445a-a8f4-688ab5573144	95fea087-1e92-491e-8649-501903f17e9f	16	关键	guānjiàn	Mấu chốt	坚持是成功的关键。	Jiānchí shì chénggōng de guānjiàn.	Kiên trì là chìa khóa của thành công.	\N	\N	\N
54c0077c-8614-486d-a9f5-1033bd7a1fab	95fea087-1e92-491e-8649-501903f17e9f	17	将来	jiānglái	Tương lai	将来我想去国外工作。	Jiānglái wǒ xiǎng qù guówài gōngzuò.	Tương lai tôi muốn làm việc ở nước ngoài.	\N	\N	\N
e8e8f103-372e-46c6-84b5-2ba8b9830f6f	95fea087-1e92-491e-8649-501903f17e9f	18	发展	fāzhǎn	Phát triển	这个城市发展得越来越快。	Zhège chéngshì fāzhǎn de yuèláiyuè kuài.	Thành phố phát triển ngày càng nhanh.	\N	\N	\N
6eeb3eac-65b0-4fb5-b2bf-75f2e5f4d67a	95fea087-1e92-491e-8649-501903f17e9f	19	发达	fādá	Phát triển, thịnh vượng	这是一个非常发达的国家。	Zhè shì yí gè fēicháng fādá de guójiā.	Đây là một quốc gia rất phát triển.	\N	\N	\N
f423c744-8a89-4b94-9a11-6e16b09f6a80	95fea087-1e92-491e-8649-501903f17e9f	20	躺	tǎng	Nằm	他累了，就躺在床上休息。	Tā lèi le, jiù tǎng zài chuáng shang xiūxi.	Anh ấy mệt nên nằm nghỉ.	\N	\N	\N
66941672-1c05-48ac-841e-0d5fe92fa716	95fea087-1e92-491e-8649-501903f17e9f	21	在…看来	zài…kàn lái	Theo quan điểm	在我看来，这个问题并不难。	Zài wǒ kàn lái, zhège wèntí bìng bù nán.	Theo tôi, vấn đề này không khó.	\N	\N	\N
d9b351d4-dad6-43a9-a7b2-f631f68f010e	95fea087-1e92-491e-8649-501903f17e9f	22	困	kùn	Buồn ngủ	我昨晚没睡好，现在很困。	Wǒ zuówǎn méi shuì hǎo, xiànzài hěn kùn.	Tôi rất buồn ngủ vì ngủ không ngon.	\N	\N	\N
81859af7-5631-4ba9-9f4a-e2357dd20172	95fea087-1e92-491e-8649-501903f17e9f	23	经济	jīngjì	Kinh tế	他的家庭经济条件不错。	Tā de jiātíng jīngjì tiáojiàn búcuò.	Kinh tế gia đình anh ấy khá tốt.	\N	\N	\N
99843a6c-89c0-4b2a-bf5d-e9e984bd0178	95fea087-1e92-491e-8649-501903f17e9f	24	条件	tiáojiàn	Điều kiện	公司为员工提供了很好的工作条件。	Gōngsī wèi yuángōng tígōng le hěn hǎo de gōngzuò tiáojiàn.	Công ty cung cấp điều kiện làm việc tốt.	\N	\N	\N
43b732fd-fe78-4def-b4a9-eff1b30a1ece	95fea087-1e92-491e-8649-501903f17e9f	25	富	fù	Giàu	他家很富，但他一点也不骄傲。	Tā jiā hěn fù, dàn tā yìdiǎn yě bù jiāo'ào.	Anh ấy giàu nhưng không kiêu ngạo.	\N	\N	\N
d7d76872-b611-4a8d-9f7a-b2d997ce779a	95fea087-1e92-491e-8649-501903f17e9f	26	穷	qióng	Nghèo	他小时候很穷，现在却很成功。	Tā xiǎoshíhou hěn qióng, xiànzài què hěn chénggōng.	Anh ấy từng nghèo nhưng giờ rất thành công.	\N	\N	\N
deb00924-498e-4206-9b6c-d606d84cb989	95fea087-1e92-491e-8649-501903f17e9f	27	等	děng	v.v.	我买了苹果、香蕉等水果。	Wǒ mǎi le píngguǒ, xiāngjiāo děng shuǐguǒ.	Tôi mua các loại trái cây như táo, chuối,…	\N	\N	\N
ece8fece-640a-4d49-8e48-95024a9dd368	95fea087-1e92-491e-8649-501903f17e9f	28	由于…所以…	yóuyú… suǒyǐ…	Do… nên…	由于下雨，所以比赛取消了。	Yóuyú xiàyǔ, suǒyǐ bǐsài qǔxiāo le.	Vì trời mưa nên trận đấu bị hủy.	\N	\N	\N
74cfed83-856e-4424-85db-0cdcbf22b042	95fea087-1e92-491e-8649-501903f17e9f	29	比如	bǐrú	Ví dụ	我喜欢很多运动，比如游泳和跑步。	Wǒ xǐhuan hěn duō yùndòng, bǐrú yóuyǒng hé pǎobù.	Tôi thích nhiều môn thể thao như bơi, chạy.	\N	\N	\N
f175c095-6c41-4049-9fd3-8b6b600f67cc	95fea087-1e92-491e-8649-501903f17e9f	30	橡皮	xiàngpí	Tẩy	写错字的时候可以用橡皮擦掉。	Xiě cuò zì de shíhou kěyǐ yòng xiàngpí cā diào.	Viết sai có thể dùng tẩy xóa.	\N	\N	\N
f801000a-7273-4269-9e20-f9d8f27a920b	95fea087-1e92-491e-8649-501903f17e9f	31	糖	táng	Đường	医生建议他少吃糖。	Yīshēng jiànyì tā shǎo chī táng.	Bác sĩ khuyên ăn ít đường.	\N	\N	\N
e55f56bf-9b3d-4989-a645-9b31540d3bc7	95fea087-1e92-491e-8649-501903f17e9f	32	低	dī	Thấp / Cúi xuống / Nhỏ (giọng)	今天的气温很低。他低着头，一句话也不说。他说话的声音很低。	Jīntiān de qìwēn hěn dī. Tā dī zhe tóu, yí jù huà yě bù shuō. Tā shuōhuà de shēngyīn hěn dī.	Nhiệt độ hôm nay thấp. Anh ấy cúi đầu, không nói gì. Anh ấy nói rất nhỏ.	\N	\N	\N
225c7623-08f3-479a-bc06-5b2582eb62bb	95fea087-1e92-491e-8649-501903f17e9f	33	答案	dá'àn	Đáp án	这道题的答案是什么？	Zhè dào tí de dá'àn shì shénme?	Đáp án của câu này là gì?	\N	\N	\N
66020e1c-4c24-4c06-9c8e-926943f03a0b	95fea087-1e92-491e-8649-501903f17e9f	34	回答	huídá	Trả lời	请你回答这个问题。	Qǐng nǐ huídá zhège wèntí.	Hãy trả lời câu hỏi này.	\N	\N	\N
69768d4d-7db4-493e-b95c-5cf527ccbb8b	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	0	流利	liúlì	Lưu loát (Tính từ)	她汉语说得很流利。	Tā Hànyǔ shuō de hěn liúlì.	Cô ấy nói tiếng Trung rất lưu loát.	\N	\N	\N
8519dcca-3c40-406a-b9de-3b407b9c7352	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	1	厉害	lìhai	Giỏi, lợi hại (Tính từ)	他真厉害啊！	Tā zhēn lìhai a!	Anh ấy giỏi thật!	\N	\N	\N
38fba896-a183-45e6-8d03-065a059f70ae	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	2	厉害	lìhai	Dữ dội, mạnh (Tính từ)	这个孩子哭得很厉害。	Zhège háizi kū de hěn lìhai.	Đứa trẻ này khóc rất dữ dội.	\N	\N	\N
1810f2f4-d3e1-488e-a2c9-e040f823cea9	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	3	生词	shēngcí	Từ mới (Danh từ)	今天有很多生词。	Jīntiān yǒu hěn duō shēngcí.	Hôm nay có rất nhiều từ mới.	\N	\N	\N
ef434954-e787-4743-b039-06f6e49ced4a	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	4	语法	yǔfǎ	Ngữ pháp (Danh từ)	他在学习汉语语法。	Tā zài xuéxí Hànyǔ yǔfǎ.	Anh ấy đang học ngữ pháp tiếng Trung.	\N	\N	\N
40fb7ac1-f82b-4842-ac81-8173252dcf6c	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	5	词语	cíyǔ	Từ ngữ (Danh từ)	遇到不认识的词语要查字典。	Yùdào bù rènshi de cíyǔ yào chá zìdiǎn.	Gặp từ không biết thì phải tra từ điển.	\N	\N	\N
e344da94-09da-4d7f-ae40-0b2c12f264b4	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	6	准确	zhǔnquè	Chính xác (Tính từ)	他说得不太准确。	Tā shuō de bú tài zhǔnquè.	Anh ấy nói không chính xác lắm.	\N	\N	\N
2f228661-6189-4607-a2ec-c087636d48f5	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	7	连	lián	Ngay cả (Giới từ)	连小孩子都知道这个问题。	Lián xiǎoháizi dōu zhīdào zhège wèntí.	Ngay cả trẻ con cũng biết vấn đề này.	\N	\N	\N
46ccddc6-9015-4823-81b1-c88caf125dae	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	8	否则	fǒuzé	Nếu không thì (Liên từ)	你要早点睡觉，否则明天会很累。	Nǐ yào zǎodiǎn shuìjiào, fǒuzé míngtiān huì hěn lèi.	Bạn phải ngủ sớm, nếu không ngày mai sẽ rất mệt.	\N	\N	\N
207b5e07-ce94-4fb8-8720-47bb6d4caffc	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	9	客厅	kètīng	Phòng khách (Danh từ)	客厅里很干净。	Kètīng lǐ hěn gānjìng.	Phòng khách rất sạch.	\N	\N	\N
3f132088-5125-4e6c-a0da-53ddc33c4ed2	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	10	普通	pǔtōng	Bình thường (Tính từ)	他只是一个普通人。	Tā zhǐshì yí gè pǔtōng rén.	Anh ấy chỉ là một người bình thường.	\N	\N	\N
0d64f302-808e-47c1-b03f-3c341fb44fb5	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	11	杂志	zázhì	Tạp chí (Danh từ)	我喜欢看杂志。	Wǒ xǐhuan kàn zázhì.	Tôi thích đọc tạp chí.	\N	\N	\N
9078c6f3-4c28-4185-9fec-d253f87cdcde	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	12	著名	zhùmíng	Nổi tiếng (Tính từ)	他是一位著名的作家。	Tā shì yí wèi zhùmíng de zuòjiā.	Ông ấy là một nhà văn nổi tiếng.	\N	\N	\N
3ae18d87-f001-44df-906f-e2764819949c	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	13	页	yè	Trang (Lượng từ)	我每天看几页书。	Wǒ měitiān kàn jǐ yè shū.	Mỗi ngày tôi đọc vài trang sách.	\N	\N	\N
96c139e8-741f-45ef-a676-1d1cb5f813b4	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	14	增加	zēngjiā	Tăng (Động từ)	收入增加了。	Shōurù zēngjiā le.	Thu nhập đã tăng lên.	\N	\N	\N
c8c6a8af-4274-4d9d-8818-807a44373e78	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	15	减轻	jiǎnqīng	Giảm nhẹ (Động từ)	运动可以减轻压力。	Yùndòng kěyǐ jiǎnqīng yālì.	Vận động có thể giảm áp lực.	\N	\N	\N
e860eb6d-33eb-4c0a-82af-68ca86c4831f	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	16	无论	wúlùn	Bất kể (Liên từ)	无论做什么都要认真。	Wúlùn zuò shénme dōu yào rènzhēn.	Bất kể làm gì cũng phải nghiêm túc.	\N	\N	\N
914fdca4-826a-4b94-9563-cf0b4da5c544	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	17	然而	rán'ér	Tuy nhiên (Liên từ)	他很努力，然而结果不好。	Tā hěn nǔlì, rán'ér jiéguǒ bù hǎo.	Anh ấy rất cố gắng, tuy nhiên kết quả không tốt.	\N	\N	\N
feb29a57-fa09-4ad3-91f5-7c3e9f230382	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	18	之一	zhī yī	Một trong số (Danh từ)	他是我们班最优秀的学生之一。	Tā shì wǒmen bān zuì yōuxiù de xuéshēng zhī yī.	Anh ấy là một trong những học sinh xuất sắc nhất lớp.	\N	\N	\N
717bb5e8-2467-4aec-a734-08390bb119df	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	19	同时	tóngshí	Đồng thời (Liên từ)	学习的同时要注意休息。	Xuéxí de tóngshí yào zhùyì xiūxi.	Trong khi học cũng phải chú ý nghỉ ngơi.	\N	\N	\N
895d9ea0-f88f-46af-b4f0-cd325bab24cf	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	20	阅读	yuèdú	Đọc (Động từ)	我每天坚持阅读。	Wǒ měitiān jiānchí yuèdú.	Tôi kiên trì đọc mỗi ngày.	\N	\N	\N
b0e5901c-b457-4f83-9a48-6214f161283e	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	21	来得及	láidejí	Kịp (Động từ)	现在走还来得及。	Xiànzài zǒu hái láidejí.	Bây giờ đi vẫn còn kịp.	\N	\N	\N
4b9462f0-ed84-4bf5-b235-69e77a1f3bde	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	22	复杂	fùzá	Phức tạp (Tính từ)	这个问题很复杂。	Zhège wèntí hěn fùzá.	Vấn đề này rất phức tạp.	\N	\N	\N
6e5667a6-b756-4c07-9b77-0bd07490f6c6	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	23	只好	zhǐhǎo	Đành phải (Phó từ)	下雨了，我们只好回家。	Xiàyǔ le, wǒmen zhǐhǎo huíjiā.	Trời mưa nên chúng tôi đành về nhà.	\N	\N	\N
612355d3-17d4-4b6e-b037-bcc16547f9eb	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	24	填空	tiánkòng	Điền vào chỗ trống (Động từ)	请完成填空练习。	Qǐng wánchéng tiánkòng liànxí.	Hãy hoàn thành bài tập điền chỗ trống.	\N	\N	\N
7976e3a9-2fa3-40d8-9386-83251e6c9073	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	25	猜	cāi	Đoán (Động từ)	你猜他是谁？	Nǐ cāi tā shì shéi?	Bạn đoán xem anh ấy là ai?	\N	\N	\N
8d332e91-3059-42f2-88e7-625aec63f35f	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	26	看法	kànfǎ	Quan điểm (Danh từ)	每个人都有不同的看法。	Měi gè rén dōu yǒu bùtóng de kànfǎ.	Mỗi người đều có quan điểm khác nhau.	\N	\N	\N
d6b3d642-bf34-4a17-b0ce-9892001dac49	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	27	相同	xiāngtóng	Giống nhau (Tính từ)	这两个答案是相同的。	Zhè liǎng gè dá'àn shì xiāngtóng de.	Hai đáp án này giống nhau.	\N	\N	\N
35f9c0bc-91c1-4911-8e75-c80a881d5690	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	28	顺序	shùnxù	Thứ tự (Danh từ)	请按顺序做题。	Qǐng àn shùnxù zuò tí.	Hãy làm bài theo thứ tự.	\N	\N	\N
be900694-05f7-475b-b5f7-23ba96f4c052	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	29	表示	biǎoshì	Biểu thị (Động từ)	他向老师表示感谢。	Tā xiàng lǎoshī biǎoshì gǎnxiè.	Anh ấy bày tỏ sự cảm ơn với giáo viên.	\N	\N	\N
dc9e925d-de8c-4ffc-b38f-4495eb7340be	378bae3e-44a5-4401-b0ea-ab060bad4208	29	细	xì	Nhỏ, mảnh	她的腰很细。	Tā de yāo hěn xì.	Eo của cô ấy rất nhỏ.	\N	\N	\N
bd26560f-e9e8-4f61-9993-ab5657c4a2cb	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	30	养成	yǎngchéng	Hình thành (Động từ)	要养成好习惯。	Yào yǎngchéng hǎo xíguàn.	Phải hình thành thói quen tốt.	\N	\N	\N
7f4d23e5-a7ce-4185-bb1f-b0b47d40030b	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	31	精彩	jīngcǎi	Tuyệt vời (Tính từ)	这个节目很精彩。	Zhège jiémù hěn jīngcǎi.	Chương trình này rất hấp dẫn.	\N	\N	\N
b28d0830-a083-412e-b20e-3648e861ad83	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	32	内容	nèiróng	Nội dung (Danh từ)	这本书的内容很有意思。	Zhè běn shū de nèiróng hěn yǒu yìsi.	Nội dung cuốn sách này rất thú vị.	\N	\N	\N
0083f8d1-6529-44cb-8b8b-f204ecca3a6d	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	33	文章	wénzhāng	Bài văn (Danh từ)	他写了一篇文章。	Tā xiě le yì piān wénzhāng.	Anh ấy đã viết một bài văn.	\N	\N	\N
36f457ee-e1cd-46b3-aaf8-e429045ee85c	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	34	有限	yǒuxiàn	Có hạn (Tính từ)	时间是有限的。	Shíjiān shì yǒuxiàn de.	Thời gian là có hạn.	\N	\N	\N
78b50208-f76d-492e-8445-66defbc3b42d	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	35	无限	wúxiàn	Vô hạn (Tính từ)	他对学习有无限热情。	Tā duì xuéxí yǒu wúxiàn rèqíng.	Anh ấy có nhiệt huyết vô hạn với việc học.	\N	\N	\N
09d1669e-03e2-41f1-a249-844bd541c222	ba9f3076-e5d8-4f49-8612-c0226a5dc9e1	36	笔记	bǐjì	Ghi chép (Danh/Động từ)	上课要认真做笔记。	Shàngkè yào rènzhēn zuò bǐjì.	Khi học phải ghi chép cẩn thận.	\N	\N	\N
a36ef208-c29d-4609-bb96-d30c3ca5f379	378bae3e-44a5-4401-b0ea-ab060bad4208	0	凉快	liángkuai	Mát mẻ	今天晚上很凉快，我们出去走走吧。	Jīntiān wǎnshang hěn liángkuai, wǒmen chūqù zǒuzou ba.	Tối nay rất mát, chúng ta ra ngoài đi dạo nhé.	\N	\N	\N
fea476f7-3856-40cb-ba74-5106f1ddff56	378bae3e-44a5-4401-b0ea-ab060bad4208	1	气温	qìwēn	Nhiệt độ không khí	今天天气这么热，气温肯定超过了35度。	Jīntiān tiānqì zhème rè, qìwēn kěndìng chāoguò le sānshíwǔ dù.	Hôm nay trời nóng như vậy, nhiệt độ chắc chắn đã vượt 35 độ.	\N	\N	\N
6e710881-2215-4a3c-8f41-bb04970cbd45	378bae3e-44a5-4401-b0ea-ab060bad4208	2	热闹	rènao	Náo nhiệt	春节的时候，大家坐在一起聊天儿，非常热闹。	Chūnjié de shíhou, dàjiā zuò zài yìqǐ liáotiānr, fēicháng rènao.	Vào Tết, mọi người ngồi cùng nhau trò chuyện, rất náo nhiệt.	\N	\N	\N
d14ec6c0-3d9e-4b58-b89b-0df8c24032de	378bae3e-44a5-4401-b0ea-ab060bad4208	3	香山	Xiāng Shān	Hương Sơn	秋天我们去香山。	Qiūtiān wǒmen qù Xiāng Shān.	Mùa thu chúng tôi đi Hương Sơn.	\N	\N	\N
8a7c5c2e-95dc-4bf1-a553-ee3356ad8a16	378bae3e-44a5-4401-b0ea-ab060bad4208	4	长城	Chángchéng	Vạn Lý Trường Thành	我们参观了长城。	Wǒmen cānguān le Chángchéng.	Chúng tôi đã tham quan Vạn Lý Trường Thành.	\N	\N	\N
2288b629-5a0a-4096-8e11-0a95744c7c9d	378bae3e-44a5-4401-b0ea-ab060bad4208	5	云	yún	Mây	天上有很多白云。	Tiān shang yǒu hěn duō báiyún.	Trên trời có rất nhiều mây trắng.	\N	\N	\N
e2cc8f28-f15e-4dec-9b05-2200c3b625df	378bae3e-44a5-4401-b0ea-ab060bad4208	6	广播	guǎngbō	Phát thanh	今天的广播节目很有趣。	Jīntiān de guǎngbō jiémù hěn yǒuqù.	Chương trình phát thanh hôm nay rất thú vị.	\N	\N	\N
e310ee6c-b732-459a-baa4-0bfdd8b3e39d	378bae3e-44a5-4401-b0ea-ab060bad4208	7	照	zhào	Chụp ảnh	我给你照一张照片吧。	Wǒ gěi nǐ zhào yì zhāng zhàopiàn ba.	Tôi chụp cho bạn một tấm ảnh nhé.	\N	\N	\N
58a3b3aa-ef2e-4c4d-8aaa-f651e91aa662	378bae3e-44a5-4401-b0ea-ab060bad4208	8	倒	dào	Lại, nhưng lại	这个地方不大，倒很安静。	Zhège dìfang bú dà, dào hěn ānjìng.	Nơi này không lớn, nhưng lại rất yên tĩnh.	\N	\N	\N
a02c6071-79a4-4482-84b4-f289b41e8668	378bae3e-44a5-4401-b0ea-ab060bad4208	9	约	yuē	Hẹn; khoảng	我们约好明天见面。	Wǒmen yuē hǎo míngtiān jiànmiàn.	Chúng tôi hẹn gặp nhau vào ngày mai.	\N	\N	\N
2a5c6919-33ba-4b03-8639-c179c9856873	378bae3e-44a5-4401-b0ea-ab060bad4208	10	毛	máo	Lông	这只猫的毛很长。	Zhè zhī māo de máo hěn cháng.	Lông của con mèo này rất dài.	\N	\N	\N
f39ca92f-4565-477a-b65d-a1f2962d2189	378bae3e-44a5-4401-b0ea-ab060bad4208	11	抱	bào	Ôm, bế	小孩子看到妈妈就想抱一抱。	Xiǎoháizi kàndào māma jiù xiǎng bào yí bào.	Đứa trẻ thấy mẹ là muốn ôm ngay.	\N	\N	\N
a66a2902-cc8f-41ac-8836-b1a22c5b1a9d	378bae3e-44a5-4401-b0ea-ab060bad4208	12	干	gàn	Làm	你在干什么？	Nǐ zài gàn shénme?	Bạn đang làm gì?	\N	\N	\N
b619732b-e16e-43fa-9c5c-9d1a58f36708	378bae3e-44a5-4401-b0ea-ab060bad4208	13	严格	yángé	Nghiêm khắc	老师对我们要求很严格。	Lǎoshī duì wǒmen yāoqiú hěn yángé.	Giáo viên yêu cầu chúng tôi rất nghiêm khắc.	\N	\N	\N
521f80a6-a559-44d6-8fbc-db667f6a830d	378bae3e-44a5-4401-b0ea-ab060bad4208	14	难受	nánshòu	Khó chịu	我今天有点难受。	Wǒ jīntiān yǒudiǎn nánshòu.	Hôm nay tôi hơi khó chịu.	\N	\N	\N
b10de882-8dbe-4f5c-b029-1dbbe0293af9	378bae3e-44a5-4401-b0ea-ab060bad4208	15	六一儿童节	Liùyī Értóngjié	Ngày thiếu nhi	孩子们过儿童节。	Háizimen guò Értóngjié.	Trẻ em đón ngày thiếu nhi.	\N	\N	\N
e7317746-da14-41d1-860d-d1b8afb4420f	378bae3e-44a5-4401-b0ea-ab060bad4208	16	亚洲	Yàzhōu	Châu Á	中国在亚洲。	Zhōngguó zài Yàzhōu.	Trung Quốc ở châu Á.	\N	\N	\N
e3fd2374-1f07-47bb-a4fa-fe4a381fc1d2	378bae3e-44a5-4401-b0ea-ab060bad4208	17	趟	tàng	Chuyến/lần	我去一趟商店。	Wǒ qù yí tàng shāngdiàn.	Tôi đi một chuyến đến cửa hàng.	\N	\N	\N
fd22efdd-71fd-4927-bc83-3658b04a4515	378bae3e-44a5-4401-b0ea-ab060bad4208	18	放暑假	fàng shǔjià	Nghỉ hè	学校下周放暑假。	Xuéxiào xià zhōu fàng shǔjià.	Tuần sau trường nghỉ hè.	\N	\N	\N
2d343119-0373-4290-8903-e8c76d1dd9b0	378bae3e-44a5-4401-b0ea-ab060bad4208	19	老虎	lǎohǔ	Hổ	动物园里有很多老虎。	Dòngwùyuán lǐ yǒu hěn duō lǎohǔ.	Trong sở thú có nhiều con hổ.	\N	\N	\N
aa241e97-6384-4697-b3c0-375de885a961	378bae3e-44a5-4401-b0ea-ab060bad4208	20	入口	rùkǒu	Lối vào	学校的入口在那边。	Xuéxiào de rùkǒu zài nàbiān.	Lối vào trường ở bên kia.	\N	\N	\N
b9278e19-3b86-49be-b9c4-ad78f41ef05d	378bae3e-44a5-4401-b0ea-ab060bad4208	21	出口	chūkǒu	Lối ra	地铁的出口就在前面。	Dìtiě de chūkǒu jiù zài qiánmiàn.	Lối ra tàu điện ngầm ở ngay phía trước.	\N	\N	\N
7b1042b5-97fc-4501-867f-e84faa5eb884	378bae3e-44a5-4401-b0ea-ab060bad4208	22	排队	páiduì	Xếp hàng	请大家按顺序排队。	Qǐng dàjiā àn shùnxù páiduì.	Mọi người hãy xếp hàng theo thứ tự.	\N	\N	\N
3ee55b4e-0be2-4241-ad43-1195f1426063	378bae3e-44a5-4401-b0ea-ab060bad4208	23	活泼	huópō	Hoạt bát	她是一个很活泼的女孩。	Tā shì yí gè hěn huópō de nǚhái.	Cô ấy là một cô gái rất hoạt bát.	\N	\N	\N
a66c2fec-7a24-4dae-860f-1c9af5b95a77	378bae3e-44a5-4401-b0ea-ab060bad4208	24	社会	shèhuì	Xã hội	手机为社会带来很多方便。	Shǒujī wèi shèhuì dàilái hěn duō fāngbiàn.	Điện thoại mang lại nhiều tiện lợi cho xã hội.	\N	\N	\N
b536541f-759a-4ac1-9fe1-b2fbbaf70c6a	378bae3e-44a5-4401-b0ea-ab060bad4208	25	竞争	jìngzhēng	Cạnh tranh	植物会为了阳光和水而竞争。	Zhíwù huì wèile yángguāng hé shuǐ ér jìngzhēng.	Thực vật cạnh tranh vì ánh sáng và nước.	\N	\N	\N
0b91a69e-65fb-48f8-8960-24ecc0d573a3	378bae3e-44a5-4401-b0ea-ab060bad4208	26	森林	sēnlín	Rừng	我们要保护森林。	Wǒmen yào bǎohù sēnlín.	Chúng ta phải bảo vệ rừng.	\N	\N	\N
c59366d5-72c5-4c72-8769-63b475d4c591	378bae3e-44a5-4401-b0ea-ab060bad4208	27	剩	shèng	Còn lại	我吃了两个包子，剩下一个给你。	Wǒ chī le liǎng gè bāozi, shèngxià yí gè gěi nǐ.	Tôi ăn 2 cái bánh, còn lại 1 cái cho bạn.	\N	\N	\N
9e932052-94e3-46c8-a355-ebceb6f6f823	378bae3e-44a5-4401-b0ea-ab060bad4208	28	暖和	nuǎnhuo	Ấm áp	今天的天气很暖和。	Jīntiān de tiānqì hěn nuǎnhuo.	Hôm nay thời tiết rất ấm.	\N	\N	\N
5c9f8b1a-9edc-4756-88aa-c2164dcf8abd	378bae3e-44a5-4401-b0ea-ab060bad4208	30	海洋	hǎiyáng	Đại dương	海洋里有很多动物。	Hǎiyáng lǐ yǒu hěn duō dòngwù.	Trong đại dương có nhiều động vật.	\N	\N	\N
bd787239-9d03-4a87-9ad9-7924d1f1e75b	378bae3e-44a5-4401-b0ea-ab060bad4208	31	底	dǐ	Đáy	海底非常安静。	Hǎidǐ fēicháng ānjìng.	Đáy biển rất yên tĩnh.	\N	\N	\N
a54f8b54-dddf-421e-9335-141f1bdc3b3b	378bae3e-44a5-4401-b0ea-ab060bad4208	32	各种各样	gè zhǒng gè yàng	Đủ loại	这里有各种各样的水果。	Zhèlǐ yǒu gè zhǒng gè yàng de shuǐguǒ.	Ở đây có đủ loại trái cây.	\N	\N	\N
614882be-aff6-4b6a-a440-0b5323397d7c	378bae3e-44a5-4401-b0ea-ab060bad4208	33	美人鱼	Měirényú	Nàng tiên cá	小孩子喜欢美人鱼。	Xiǎoháizi xǐhuan Měirényú.	Trẻ con thích nàng tiên cá.	\N	\N	\N
1716fa9b-91fd-4a32-abe9-93d72dfbe263	378bae3e-44a5-4401-b0ea-ab060bad4208	34	公里	gōnglǐ	Km	学校离我家三公里。	Xuéxiào lí wǒ jiā sān gōnglǐ.	Trường cách nhà tôi 3 km.	\N	\N	\N
c37defae-7195-45e0-abfa-5bc82d56e82f	378bae3e-44a5-4401-b0ea-ab060bad4208	35	亮光	liàngguāng	Ánh sáng	房间里只有一点亮光。	Fángjiān lǐ zhǐyǒu yìdiǎn liàngguāng.	Trong phòng chỉ có một chút ánh sáng.	\N	\N	\N
c45d1709-7ec4-4d3c-b880-d6a155818255	378bae3e-44a5-4401-b0ea-ab060bad4208	36	仍然	réngrán	Vẫn	下雨了，他仍然去上班。	Xiàyǔ le, tā réngrán qù shàngbān.	Trời mưa nhưng anh ấy vẫn đi làm.	\N	\N	\N
bedafc2f-2332-4e5c-b753-139b2ef25dba	378bae3e-44a5-4401-b0ea-ab060bad4208	37	排列	páiliè	Sắp xếp	请把这些书按大小排列好。	Qǐng bǎ zhèxiē shū àn dàxiǎo páiliè hǎo.	Hãy sắp xếp sách theo kích thước.	\N	\N	\N
686533d1-c620-4250-ab5b-c5f4c2a8e50c	378bae3e-44a5-4401-b0ea-ab060bad4208	38	梦	mèng	Giấc mơ	昨天晚上我做了一个梦。	Zuótiān wǎnshang wǒ zuò le yí gè mèng.	Tối qua tôi đã mơ một giấc mơ.	\N	\N	\N
11e22163-ca06-4061-a376-e8724949c8ad	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	0	降落	jiàngluò	Hạ cánh	上次女儿问我飞机是怎么起飞和降落的，我真不知道该怎么回答她。	Shàng cì nǚ'ér wèn wǒ fēijī shì zěnme qǐfēi hé jiàngluò de, wǒ zhēn bù zhīdào gāi zěnme huídá tā.	Lần trước con gái hỏi tôi máy bay cất cánh và hạ cánh như thế nào, tôi thật sự không biết trả lời ra sao.	\N	\N	\N
b39bb7b3-20c1-467c-b4f4-f022ae41b300	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	1	火	huǒ	Rất hot, rất được ưa chuộng	这本书现在卖得非常火。	Zhè běn shū xiànzài mài de fēicháng huǒ.	Cuốn sách này hiện bán rất chạy.	\N	\N	\N
374af085-97e6-4830-8486-b9dc8501ea5e	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	2	作者	zuòzhě	Tác giả	《新十万个为什么》的作者我没记住。	"Xīn Shíwàn Gè Wèishénme" de zuòzhě wǒ méi jìzhù.	Tôi không nhớ tác giả của cuốn "Mười vạn câu hỏi vì sao" mới.	\N	\N	\N
c6827ed2-84c0-473d-8007-126bc316dbb1	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	3	交通	jiāotōng	Giao thông	这本书的内容包括交通和科学技术。	Zhè běn shū de nèiróng bāokuò jiāotōng hé kēxué jìshù.	Nội dung cuốn sách bao gồm giao thông và khoa học kỹ thuật.	\N	\N	\N
5d572198-b6ae-4f90-8086-8c03a97124e7	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	4	技术	jìshù	Kỹ thuật, công nghệ	现代科学技术发展得很快。	Xiàndài kēxué jìshù fāzhǎn de hěn kuài.	Khoa học kỹ thuật hiện đại phát triển rất nhanh.	\N	\N	\N
ef8585e2-6595-4371-a3bc-cb5a5b45ba70	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	5	技术	jìshù	Tay nghề	这位师傅的技术很好。	Zhè wèi shīfu de jìshù hěn hǎo.	Tay nghề của người thợ này rất tốt.	\N	\N	\N
75929523-2aa9-45b6-9198-81bbdc21b087	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	6	是否	shìfǒu	Có… hay không	我不知道她是否能读懂这本书。	Wǒ bù zhīdào tā shìfǒu néng dú dǒng zhè běn shū.	Tôi không biết cô ấy có đọc hiểu cuốn sách này hay không.	\N	\N	\N
64d737de-d3b2-4a38-8a34-d348075b8d25	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	7	各种各样	gè zhǒng gè yàng	Đủ loại	女儿现在总是有各种各样的问题。	Nǚ'ér xiànzài zǒngshì yǒu gè zhǒng gè yàng de wèntí.	Con gái bây giờ luôn có đủ loại câu hỏi.	\N	\N	\N
3485b1a0-6c13-4302-806b-467f9feed8fd	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	8	奇特	qítè	Kỳ lạ, đặc biệt	孩子眼中的世界是美丽和奇特的。	Háizi yǎn zhōng de shìjiè shì měilì hé qítè de.	Thế giới trong mắt trẻ con rất đẹp và kỳ lạ.	\N	\N	\N
d99ebe07-6cf5-4b27-ae75-c686b4b91c2e	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	9	易懂	yìdǒng	Dễ hiểu	这本书的内容简单易懂。	Zhè běn shū de nèiróng jiǎndān yìdǒng.	Nội dung cuốn sách này đơn giản, dễ hiểu.	\N	\N	\N
7ad78125-18fc-409e-8a08-26cb7016784c	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	10	秒	miǎo	Giây	几秒钟就能找到答案。	Jǐ miǎo zhōng jiù néng zhǎodào dá'àn.	Chỉ vài giây là có thể tìm được đáp án.	\N	\N	\N
1605b39e-d4e2-4a4c-b9d4-0e12031a2acd	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	11	方式	fāngshì	Phương thức	学习方式发生了很多变化。	Xuéxí fāngshì fāshēng le hěn duō biànhuà.	Phương thức học tập đã thay đổi rất nhiều.	\N	\N	\N
6bc8d05d-1e17-43db-9f66-8dafba539973	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	12	受不了	shòubuliǎo	Không chịu nổi	天天看电脑，眼睛受不了。	Tiāntiān kàn diànnǎo, yǎnjing shòubuliǎo.	Ngày nào cũng nhìn máy tính, mắt không chịu nổi.	\N	\N	\N
c919829e-17ed-4b08-abf3-9bbb1dec5d53	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	13	日记	rìjì	Nhật ký	现在很多人喜欢在网上写日记。	Xiànzài hěn duō rén xǐhuan zài wǎngshàng xiě rìjì.	Hiện nay nhiều người thích viết nhật ký trên mạng.	\N	\N	\N
8e31b210-d749-4bb7-83b6-9d7757c833d4	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	14	安全	ānquán	An toàn	这样做不太安全。	Zhèyàng zuò bú tài ānquán.	Làm như vậy không an toàn lắm.	\N	\N	\N
809e038e-2529-4f19-b06d-e3314b6d60d0	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	15	密码	mìmǎ	Mật khẩu	请不要告诉别人你的密码。	Qǐng búyào gàosu biérén nǐ de mìmǎ.	Đừng nói mật khẩu của bạn cho người khác.	\N	\N	\N
02ec1571-0680-41a7-bad3-a3b4d44fffc5	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	16	允许	yǔnxǔ	Cho phép (Động từ)	老师不允许我们迟到。	Lǎoshī bù yǔnxǔ wǒmen chídào.	Giáo viên không cho phép chúng tôi đi muộn.	\N	\N	\N
0f4cb27f-3a48-4c5b-9afa-ec8037c339cf	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	17	允许	yǔnxǔ	Sự cho phép (Danh từ)	没有老师的允许不能离开教室。	Méiyǒu lǎoshī de yǔnxǔ bù néng líkāi jiàoshì.	Không có sự cho phép của giáo viên thì không được rời lớp.	\N	\N	\N
6abef74d-b8f3-4eac-abc2-94e284183a63	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	18	之所以	zhīsuǒyǐ	Sở dĩ	你之所以失败，是因为没有努力。	Nǐ zhīsuǒyǐ shībài, shì yīnwèi méiyǒu nǔlì.	Sở dĩ bạn thất bại là vì không cố gắng.	\N	\N	\N
411237aa-dbf8-4fd8-a784-10a3130f8226	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	19	说法	shuōfǎ	Cách nói, quan điểm	这种说法不太正确。	Zhè zhǒng shuōfǎ bú tài zhèngquè.	Quan điểm này không chính xác lắm.	\N	\N	\N
4f2cd7be-25d3-4f7a-9c31-afc1d777ff80	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	20	座	zuò	Lượng từ (công trình, núi...)	河内是一座热闹的城市。	Hénèi shì yí zuò rènao de chéngshì.	Hà Nội là một thành phố náo nhiệt.	\N	\N	\N
30517b2c-5152-4062-819f-be02f9297072	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	21	桥	qiáo	Cầu	他正在桥上走。	Tā zhèngzài qiáo shang zǒu.	Anh ấy đang đi trên cầu.	\N	\N	\N
d7e617d4-06db-4577-b960-8a2c7f0361e1	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	22	危险	wēixiǎn	Nguy hiểm	这样做很危险。	Zhèyàng zuò hěn wēixiǎn.	Làm như vậy rất nguy hiểm.	\N	\N	\N
7f24653f-dbd3-498c-8838-d5cd78334f47	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	23	接着	jiēzhe	Tiếp theo	你先休息一下，然后接着做。	Nǐ xiān xiūxi yíxià, ránhòu jiēzhe zuò.	Bạn nghỉ một chút rồi làm tiếp.	\N	\N	\N
9897c38b-51b2-4aeb-80a2-0bad5907acde	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	24	警察	jǐngchá	Cảnh sát	警察帮助了他。	Jǐngchá bāngzhù le tā.	Cảnh sát đã giúp anh ấy.	\N	\N	\N
863c99b7-efae-4028-9b50-2704864f6adb	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	25	抓	zhuā	Bắt	警察抓住了小偷。	Jǐngchá zhuāzhù le xiǎotōu.	Cảnh sát đã bắt được tên trộm.	\N	\N	\N
8743499d-af6e-4061-b46a-c607672fde1a	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	26	咸	xián	Mặn	今天的菜有点咸。	Jīntiān de cài yǒudiǎn xián.	Món ăn hôm nay hơi mặn.	\N	\N	\N
0cb9dda5-45e3-4030-bb9f-4bf123f26555	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	27	矿泉水	kuàngquánshuǐ	Nước suối	我买了一瓶矿泉水。	Wǒ mǎi le yì píng kuàngquánshuǐ.	Tôi mua một chai nước suối.	\N	\N	\N
415285aa-18b7-4549-873c-8731751c9292	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	28	付款	fùkuǎn	Thanh toán	现在可以用手机付款。	Xiànzài kěyǐ yòng shǒujī fùkuǎn.	Bây giờ có thể thanh toán bằng điện thoại.	\N	\N	\N
cd00e9a7-9820-4d99-ac09-3db428f92f04	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	29	举	jǔ	Nêu ra / Đưa lên	我给你举一个例子。	Wǒ gěi nǐ jǔ yí gè lìzi.	Tôi đưa cho bạn một ví dụ.	\N	\N	\N
d8269fc0-f836-49ae-a5b2-6e686cda6431	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	30	迷路	mílù	Lạc đường	这个孩子迷路了。	Zhège háizi mílù le.	Đứa trẻ này bị lạc đường.	\N	\N	\N
22a74c10-b2e7-46b8-bf69-75370dc7867c	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	31	地址	dìzhǐ	Địa chỉ	你的地址是多少？	Nǐ de dìzhǐ shì duōshao?	Địa chỉ của bạn là gì?	\N	\N	\N
461281b1-6dc0-44cd-ac74-7552a3014d28	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	32	地点	dìdiǎn	Địa điểm	我们换一个地点吧。	Wǒmen huàn yí gè dìdiǎn ba.	Chúng ta đổi địa điểm đi.	\N	\N	\N
913a2359-b9cb-49aa-ad64-85ccb19364eb	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	33	除此以外	chúcǐ yǐwài	Ngoài ra	我喜欢打篮球，除此以外也喜欢游泳。	Wǒ xǐhuan dǎ lánqiú, chúcǐ yǐwài yě xǐhuan yóuyǒng.	Tôi thích chơi bóng rổ, ngoài ra còn thích bơi.	\N	\N	\N
f3238df7-b3ab-4f1f-a351-b9ebad818ae0	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	34	大大	dàdà	Rất nhiều	这大大提高了效率。	Zhè dàdà tígāo le xiàolǜ.	Điều này nâng cao hiệu suất rất nhiều.	\N	\N	\N
5f5cee7d-e167-410c-aad1-0c75a819ec76	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	35	巨大	jùdà	To lớn	生活发生了巨大变化。	Shēnghuó fāshēng le jùdà biànhuà.	Cuộc sống đã thay đổi rất lớn.	\N	\N	\N
ffcb8e8b-29b4-46db-bfea-c330b2d9358f	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	36	世纪	shìjì	Thế kỷ	现在是21世纪。	Xiànzài shì èrshíyī shìjì.	Hiện nay là thế kỷ 21.	\N	\N	\N
1babf28d-83dd-4db0-bae6-7c48353b1316	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	37	邮局	yóujú	Bưu điện	最近的邮局在哪里？	Zuìjìn de yóujú zài nǎlǐ?	Bưu điện gần nhất ở đâu?	\N	\N	\N
15849211-74fa-48cb-bc6f-336780c53df1	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	38	收	shōu	Nhận	你收到我的信息了吗？	Nǐ shōudào wǒ de xìnxī le ma?	Bạn đã nhận được tin nhắn của tôi chưa?	\N	\N	\N
7d4c7b4a-2852-43bd-a082-3491e1fe12ff	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	39	信封	xìnfēng	Phong bì	写信需要信封。	Xiě xìn xūyào xìnfēng.	Viết thư cần có phong bì.	\N	\N	\N
865dd459-f02d-489d-b899-0c7c154780a1	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	40	网站	wǎngzhàn	Trang web	打开网站就可以看到新闻。	Dǎkāi wǎngzhàn jiù kěyǐ kàn dào xīnwén.	Mở website là có thể xem tin tức.	\N	\N	\N
5cb83fd3-9a71-49e7-b6ed-ff5622140012	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	41	信息	xìnxī	Thông tin / Tin nhắn	他没有回我的信息。	Tā méiyǒu huí wǒ de xìnxī.	Anh ấy không trả lời tin nhắn của tôi.	\N	\N	\N
b0362293-a250-4f51-9c4d-ee52e2add63f	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	42	第一时间	dì-yī shíjiān	Ngay lập tức	他在第一时间告诉了我。	Tā zài dì-yī shíjiān gàosu le wǒ.	Anh ấy đã báo cho tôi ngay lập tức.	\N	\N	\N
8b84ccd0-dec6-40cd-9a67-4c041955fa2d	2f35d8c8-e70e-43b3-aebc-96d1b5e9cd72	43	村	cūn	Làng	他们住在一个小山村。	Tāmen zhù zài yí gè xiǎo shāncūn.	Họ sống ở một ngôi làng nhỏ trên núi.	\N	\N	\N
d6e5861d-c0c8-4a6b-ba72-13592dd5fede	5ba83c44-43e7-426f-ada6-fff00d1f58b5	0	学期	xuéqī	Học kỳ (Danh từ)	马克申请下个学期继续在学校学习。	Mǎkè shēnqǐng xià gè xuéqī jìxù zài xuéxiào xuéxí.	Mark đăng ký học tiếp học kỳ sau tại trường.	\N	\N	\N
29a392e9-2b64-44d6-8ecc-abe73ad4cad5	5ba83c44-43e7-426f-ada6-fff00d1f58b5	1	出生	chūshēng	Sinh ra (Động từ)	表格上要填写出生年月等信息。	Biǎogé shàng yào tiánxiě chūshēng niányuè děng xìnxī.	Trên biểu mẫu cần điền thông tin như ngày tháng năm sinh.	\N	\N	\N
9e9946bf-e789-4757-ab89-c6177fc2b532	5ba83c44-43e7-426f-ada6-fff00d1f58b5	2	性别	xìngbié	Giới tính (Danh từ)	请填写你的姓名和性别。	Qǐng tiánxiě nǐ de xìngmíng hé xìngbié.	Hãy điền họ tên và giới tính của bạn.	\N	\N	\N
65c4ad7c-4913-4e0d-b0b7-457bc826479b	5ba83c44-43e7-426f-ada6-fff00d1f58b5	3	道歉	dàoqiàn	Xin lỗi (Động từ)	这件事是我不对，我向你道歉。	Zhè jiàn shì shì wǒ bù duì, wǒ xiàng nǐ dàoqiàn.	Việc này là lỗi của tôi, tôi xin lỗi bạn.	\N	\N	\N
4f7c0db2-3475-44e9-ac68-019a1b86eb16	5ba83c44-43e7-426f-ada6-fff00d1f58b5	4	打印	dǎyìn	In (Động từ)	我给你重新打印一份。	Wǒ gěi nǐ chóngxīn dǎyìn yí fèn.	Tôi in lại cho bạn một bản.	\N	\N	\N
77aff519-bfb3-4286-b4a6-26229a68aab5	5ba83c44-43e7-426f-ada6-fff00d1f58b5	5	复印	fùyìn	Photo (Động từ)	请帮我复印这份文件。	Qǐng bāng wǒ fùyìn zhè fèn wénjiàn.	Hãy giúp tôi photo tài liệu này.	\N	\N	\N
5c48c4ec-ff2a-4796-a64e-9638b1fd4bf6	5ba83c44-43e7-426f-ada6-fff00d1f58b5	6	饺子	jiǎozi	Sủi cảo (Danh từ)	我很喜欢吃饺子。	Wǒ hěn xǐhuan chī jiǎozi.	Tôi rất thích ăn sủi cảo.	\N	\N	\N
0e9207d5-de57-4293-a06a-fff45dcb2788	5ba83c44-43e7-426f-ada6-fff00d1f58b5	7	刀	dāo	Con dao (Danh từ)	他用刀切水果。	Tā yòng dāo qiē shuǐguǒ.	Anh ấy dùng dao cắt trái cây.	\N	\N	\N
8a91af01-a2f9-4cb7-997c-6d9488990f84	5ba83c44-43e7-426f-ada6-fff00d1f58b5	8	切	qiē	Cắt (Động từ)	妈妈在厨房切菜。	Māma zài chúfáng qiē cài.	Mẹ đang cắt rau trong bếp.	\N	\N	\N
00378e1d-363d-4a8c-9bab-8eaac27746a0	5ba83c44-43e7-426f-ada6-fff00d1f58b5	9	破	pò	Rách, hỏng (Động/Tính từ)	他的衣服破了。	Tā de yīfu pò le.	Quần áo của anh ấy bị rách.	\N	\N	\N
c57d29b8-ecd2-47e2-a4a0-2d4b169b9d57	5ba83c44-43e7-426f-ada6-fff00d1f58b5	10	脱	tuō	Cởi (Động từ)	进屋要脱鞋。	Jìn wū yào tuō xié.	Vào nhà phải cởi giày.	\N	\N	\N
8a0156a0-adb3-477d-8634-766512506390	5ba83c44-43e7-426f-ada6-fff00d1f58b5	11	理发	lǐfà	Cắt tóc (Động từ)	我想去理发。	Wǒ xiǎng qù lǐfà.	Tôi muốn đi cắt tóc.	\N	\N	\N
bc505a6b-0387-4c92-b694-b65da4566c8c	5ba83c44-43e7-426f-ada6-fff00d1f58b5	12	包子	bāozi	Bánh bao (Danh từ)	我买了两个包子。	Wǒ mǎi le liǎng gè bāozi.	Tôi mua hai cái bánh bao.	\N	\N	\N
cd1fc804-b070-4948-a6aa-db39783e3050	5ba83c44-43e7-426f-ada6-fff00d1f58b5	13	口袋	kǒudài	Túi (quần áo) (Danh từ)	手机在我的口袋里。	Shǒujī zài wǒ de kǒudài lǐ.	Điện thoại ở trong túi của tôi.	\N	\N	\N
cd9f0c34-aa31-49ed-b49c-393742a88cdd	5ba83c44-43e7-426f-ada6-fff00d1f58b5	14	零钱	língqián	Tiền lẻ (Danh từ)	我没有零钱。	Wǒ méiyǒu língqián.	Tôi không có tiền lẻ.	\N	\N	\N
6806f331-7130-4921-bed4-e894b58882fe	5ba83c44-43e7-426f-ada6-fff00d1f58b5	15	打招呼	dǎ zhāohu	Chào hỏi (Động từ)	见面要先打招呼。	Jiànmiàn yào xiān dǎ zhāohu.	Gặp nhau phải chào trước.	\N	\N	\N
59852476-2e9b-4628-bbba-d31cc2c10e04	5ba83c44-43e7-426f-ada6-fff00d1f58b5	16	戴	dài	Đeo (Động từ)	他戴着一副眼镜。	Tā dài zhe yí fù yǎnjìng.	Anh ấy đeo một cặp kính.	\N	\N	\N
3fe58225-4bdf-490f-8428-b45c8bd5db4b	5ba83c44-43e7-426f-ada6-fff00d1f58b5	17	眼镜	yǎnjìng	Kính (Danh từ)	我的眼镜不见了。	Wǒ de yǎnjìng bú jiàn le.	Kính của tôi bị mất rồi.	\N	\N	\N
3919ae55-11a7-4b17-85cd-06bafab71456	5ba83c44-43e7-426f-ada6-fff00d1f58b5	18	舞蹈	wǔdǎo	Múa (Danh từ)	她喜欢学习舞蹈。	Tā xǐhuan xuéxí wǔdǎo.	Cô ấy thích học múa.	\N	\N	\N
81a394e7-d186-431b-9205-f6d60c9dc934	5ba83c44-43e7-426f-ada6-fff00d1f58b5	19	国籍	guójí	Quốc tịch (Danh từ)	他的国籍是中国。	Tā de guójí shì Zhōngguó.	Quốc tịch của anh ấy là Trung Quốc.	\N	\N	\N
cbc05b7d-5d22-443b-9d7b-ce4e767c4433	5ba83c44-43e7-426f-ada6-fff00d1f58b5	20	抬	tái	Nhấc lên (Động từ)	请抬起头。	Qǐng tái qǐ tóu.	Hãy ngẩng đầu lên.	\N	\N	\N
82385193-4a71-4946-a4ae-ecfa275679c3	5ba83c44-43e7-426f-ada6-fff00d1f58b5	21	胳膊	gēbo	Cánh tay (Danh từ)	我的胳膊很痛。	Wǒ de gēbo hěn tòng.	Tay tôi rất đau.	\N	\N	\N
735784fb-8afb-43e5-886a-446310929747	5ba83c44-43e7-426f-ada6-fff00d1f58b5	22	转	zhuǎn	Quay (Động từ)	请向右转。	Qǐng xiàng yòu zhuǎn.	Hãy rẽ phải.	\N	\N	\N
89be96f9-8661-492b-8aca-faf01d1f88e8	5ba83c44-43e7-426f-ada6-fff00d1f58b5	23	租	zū	Thuê (Động từ)	我想租一套房子。	Wǒ xiǎng zū yí tào fángzi.	Tôi muốn thuê một căn nhà.	\N	\N	\N
8d401655-d0f0-4df0-ad7b-0d9de307e139	5ba83c44-43e7-426f-ada6-fff00d1f58b5	24	吵	chǎo	Ồn (Tính từ)	这里太吵了。	Zhèlǐ tài chǎo le.	Ở đây quá ồn.	\N	\N	\N
914922ef-cfb6-45c5-923f-d9966f62ab1d	5ba83c44-43e7-426f-ada6-fff00d1f58b5	25	厨房	chúfáng	Nhà bếp (Danh từ)	厨房很干净。	Chúfáng hěn gānjìng.	Nhà bếp rất sạch.	\N	\N	\N
c8044605-bba5-47bc-97cb-6909c0befedc	5ba83c44-43e7-426f-ada6-fff00d1f58b5	26	房东	fángdōng	Chủ nhà (Danh từ)	房东人很好。	Fángdōng rén hěn hǎo.	Chủ nhà rất tốt.	\N	\N	\N
ef30e2e7-c3fb-4c39-9f93-fe5da43c3726	5ba83c44-43e7-426f-ada6-fff00d1f58b5	27	占线	zhànxiàn	Máy bận (Động từ)	电话一直占线。	Diànhuà yìzhí zhànxiàn.	Điện thoại luôn bận.	\N	\N	\N
c2c3763a-ddc5-4997-bcc0-c6e3d8e7bec9	5ba83c44-43e7-426f-ada6-fff00d1f58b5	28	第二天	dì-èr tiān	Ngày hôm sau (Danh từ)	第二天我很晚才起床。	Dì-èr tiān wǒ hěn wǎn cái qǐchuáng.	Ngày hôm sau tôi dậy rất muộn.	\N	\N	\N
417f9de9-07f3-4b26-931f-484eb9d23ddb	5ba83c44-43e7-426f-ada6-fff00d1f58b5	29	小区	xiǎoqū	Khu dân cư (Danh từ)	这个小区很安静。	Zhège xiǎoqū hěn ānjìng.	Khu dân cư này rất yên tĩnh.	\N	\N	\N
02d131d0-7806-4b5d-afd2-c07397774e91	5ba83c44-43e7-426f-ada6-fff00d1f58b5	30	功夫	gōngfu	Võ thuật (Danh từ)	他会中国功夫。	Tā huì Zhōngguó gōngfu.	Anh ấy biết võ Trung Quốc.	\N	\N	\N
c9214371-8209-4c1a-ac1c-223ed7732d4b	5ba83c44-43e7-426f-ada6-fff00d1f58b5	31	乒乓球	pīngpāngqiú	Bóng bàn (Danh từ)	我喜欢打乒乓球。	Wǒ xǐhuan dǎ pīngpāngqiú.	Tôi thích chơi bóng bàn.	\N	\N	\N
7b66abfc-6bc7-4f9b-82b0-a5c060217140	5ba83c44-43e7-426f-ada6-fff00d1f58b5	32	羽毛球	yǔmáoqiú	Cầu lông (Danh từ)	我们一起打羽毛球吧。	Wǒmen yìqǐ dǎ yǔmáoqiú ba.	Chúng ta cùng chơi cầu lông nhé.	\N	\N	\N
fe577936-85f2-41fb-aaed-277ecdd5ee40	5ba83c44-43e7-426f-ada6-fff00d1f58b5	33	场	chǎng	Trận/buổi (Lượng từ)	我们打了一场球。	Wǒmen dǎ le yì chǎng qiú.	Chúng tôi đã chơi một trận bóng.	\N	\N	\N
5d7be17d-9210-42f3-a087-a2b704ef35c2	5ba83c44-43e7-426f-ada6-fff00d1f58b5	34	禁止	jìnzhǐ	Cấm (Động từ)	这里禁止吸烟。	Zhèlǐ jìnzhǐ xīyān.	Ở đây cấm hút thuốc.	\N	\N	\N
cc286b18-6de1-483a-9eec-f0911f1d7afa	5ba83c44-43e7-426f-ada6-fff00d1f58b5	35	座位	zuòwèi	Chỗ ngồi (Danh từ)	请坐在你的座位上。	Qǐng zuò zài nǐ de zuòwèi shang.	Hãy ngồi vào chỗ của bạn.	\N	\N	\N
8528f7a9-4a14-4ded-ab86-4a7490270fb5	5ba83c44-43e7-426f-ada6-fff00d1f58b5	36	走动	zǒudòng	Đi lại (Động từ)	上课的时候不要随便走动。	Shàngkè de shíhou búyào suíbiàn zǒudòng.	Khi học không được đi lại tùy tiện.	\N	\N	\N
8af32c61-2a5a-46ac-8d8e-255e12fa3504	5730cd1e-2542-4e76-963c-e486be58a3d6	0	适应	shìyìng	thích nghi	来中国快一年了，我已经适应这儿的生活了。	\N	Đến Trung Quốc gần một năm rồi, tôi đã thích nghi với cuộc sống ở đây.	\N	\N	\N
c9284d50-83cc-4734-89dd-a65d93871112	5730cd1e-2542-4e76-963c-e486be58a3d6	1	交	jiāo	kết giao / nộp	他喜欢交不同国家的朋友。	\N	Anh ấy thích kết bạn với người từ nhiều quốc gia.	\N	\N	\N
750b00be-8990-4b02-85ee-674422d5f188	5730cd1e-2542-4e76-963c-e486be58a3d6	2	平时	píngshí	bình thường	他平时很少看电视。	\N	Bình thường anh ấy ít xem TV.	\N	\N	\N
d23ca192-09b6-4840-a990-81d15c5d4476	5730cd1e-2542-4e76-963c-e486be58a3d6	3	逛	guàng	đi dạo	我周末喜欢跟朋友逛街。	\N	Cuối tuần tôi thích đi dạo phố với bạn.	\N	\N	\N
6e6f4336-62ca-4f94-b7de-280ad07bb0a8	5730cd1e-2542-4e76-963c-e486be58a3d6	4	短信	duǎnxìn	tin nhắn	我给他发了一条短信。	\N	Tôi đã gửi cho anh ấy một tin nhắn.	\N	\N	\N
6ad180cd-bc6e-4dc4-b870-471c3a8eea02	5730cd1e-2542-4e76-963c-e486be58a3d6	5	正好	zhènghǎo	đúng lúc	他打电话来时我正好在吃饭。	\N	Lúc anh ấy gọi điện thì tôi đang ăn.	\N	\N	\N
d3642274-bd86-4ad3-ac89-6db88bdcb65f	5730cd1e-2542-4e76-963c-e486be58a3d6	6	聚会	jùhuì	tụ họp	我们每年都有一次同学聚会。	\N	Mỗi năm chúng tôi đều có một buổi họp lớp.	\N	\N	\N
be500db6-ad34-4da6-9b0f-9ffda856a0e6	5730cd1e-2542-4e76-963c-e486be58a3d6	7	联系	liánxì	liên hệ	我们一直保持联系。	\N	Chúng tôi luôn giữ liên lạc.	\N	\N	\N
90b2a23d-af36-4f20-8efe-c9853fc58e81	5730cd1e-2542-4e76-963c-e486be58a3d6	8	校园	xiàoyuán	khuôn viên trường	这个校园很漂亮，我很喜欢在这里学习。	\N	Khuôn viên này rất đẹp, tôi rất thích học ở đây.	\N	\N	\N
76b881c6-a152-4893-8ad5-c8969deeb18f	5730cd1e-2542-4e76-963c-e486be58a3d6	9	差不多	chàbuduō	gần như	我们俩年龄差不多。	\N	Hai chúng tôi gần bằng tuổi nhau.	\N	\N	\N
5de7859a-8a93-4257-8b16-8f61e9157791	5730cd1e-2542-4e76-963c-e486be58a3d6	10	专门	zhuānmén	đặc biệt	我专门来找你。	\N	Tôi đặc biệt đến tìm bạn.	\N	\N	\N
dfb43cda-232c-4e37-82ba-ef7eab424fa0	5730cd1e-2542-4e76-963c-e486be58a3d6	11	毕业	bìyè	tốt nghiệp	我明年大学毕业。	\N	Năm sau tôi tốt nghiệp đại học.	\N	\N	\N
2fd91b82-3ea3-40ab-9b63-1104ac4871bc	5730cd1e-2542-4e76-963c-e486be58a3d6	12	麻烦	máfan	làm phiền	麻烦你帮我一下。	\N	Làm phiền bạn giúp tôi một chút.	\N	\N	\N
7f6e773c-b5a1-46fc-a481-1bcb26c5ded0	5730cd1e-2542-4e76-963c-e486be58a3d6	13	好像	hǎoxiàng	hình như	他好像有点累。	\N	Anh ấy hình như hơi mệt.	\N	\N	\N
1f88adef-9a24-4288-9bb1-85842f71ace2	5730cd1e-2542-4e76-963c-e486be58a3d6	14	重新	chóngxīn	lại, lại lần nữa	我想重新开始学习汉语。	\N	Tôi muốn bắt đầu học tiếng Trung lại từ đầu.	\N	\N	\N
7c7c1b30-2c56-48ea-ba13-b845ce5af157	5730cd1e-2542-4e76-963c-e486be58a3d6	15	尽管	jǐnguǎn	mặc dù	尽管下雨，我们还是去上课。	\N	Mặc dù trời mưa, chúng tôi vẫn đi học.	\N	\N	\N
b5a978c9-0d4b-41f3-b866-471388544751	5730cd1e-2542-4e76-963c-e486be58a3d6	16	真正	zhēnzhèng	thật sự	他是真正的朋友。	\N	Anh ấy là một người bạn thật sự.	\N	\N	\N
482891a2-200c-4ba2-a773-62098030d906	5730cd1e-2542-4e76-963c-e486be58a3d6	17	友谊	yǒuyì	tình bạn	我们的友谊很深。	\N	Tình bạn của chúng tôi rất sâu sắc.	\N	\N	\N
725cf40c-1ce7-42a0-a9cf-b08da85fe471	5730cd1e-2542-4e76-963c-e486be58a3d6	18	丰富	fēngfù	làm phong phú	读书可以丰富知识。	\N	Đọc sách có thể làm phong phú kiến thức.	\N	\N	\N
6ebda021-a547-416c-b215-05f84ed27358	5730cd1e-2542-4e76-963c-e486be58a3d6	19	无聊	wúliáo	chán	今天在家太无聊了。	\N	Hôm nay ở nhà quá chán.	\N	\N	\N
45b2df19-614e-4620-830d-84a7f93e2f96	5730cd1e-2542-4e76-963c-e486be58a3d6	20	讨厌	tǎoyàn	ghét	我讨厌下雨天。	\N	Tôi ghét những ngày mưa.	\N	\N	\N
86390547-bb63-44e4-8408-8822b78c1cd4	5730cd1e-2542-4e76-963c-e486be58a3d6	21	却	què	nhưng mà	我想去，他却不想去。	\N	Tôi muốn đi nhưng anh ấy lại không muốn.	\N	\N	\N
4a551abd-a73d-455b-bf23-86dbdcc5fbaf	5730cd1e-2542-4e76-963c-e486be58a3d6	22	周围	zhōuwéi	xung quanh	学校周围有很多商店。	\N	Xung quanh trường có rất nhiều cửa hàng.	\N	\N	\N
18199cc0-1d43-4418-aa0b-f361bad0a60a	5730cd1e-2542-4e76-963c-e486be58a3d6	23	交流	jiāoliú	giao lưu	我们常常在网上交流。	\N	Chúng tôi thường xuyên giao lưu trên mạng.	\N	\N	\N
39bdb41f-e950-44a3-b193-ab583024651f	5730cd1e-2542-4e76-963c-e486be58a3d6	24	理解	lǐjiě	hiểu	我能理解你的想法。	\N	Tôi có thể hiểu suy nghĩ của bạn.	\N	\N	\N
1c1cbf11-2f05-4ac6-bf78-91c2ff099731	5730cd1e-2542-4e76-963c-e486be58a3d6	25	镜子	jìngzi	gương	她在镜子前整理头发。	\N	Cô ấy chỉnh lại tóc trước gương.	\N	\N	\N
a35d9ddd-1a25-4ba1-8e2b-2242649a62d2	5730cd1e-2542-4e76-963c-e486be58a3d6	26	而	ér	mà	他聪明而努力。	\N	Anh ấy thông minh mà chăm chỉ.	\N	\N	\N
62332cbb-d47a-484f-b959-0cafbb1b298e	5730cd1e-2542-4e76-963c-e486be58a3d6	27	当	dāng	khi	当我到家时，天已经黑了。	\N	Khi tôi về đến nhà thì trời đã tối.	\N	\N	\N
69790b85-fc17-49fc-9913-86eb07ee00c9	5730cd1e-2542-4e76-963c-e486be58a3d6	28	困难	kùnnan	khó khăn	我们一起面对困难。	\N	Chúng tôi cùng nhau đối mặt với khó khăn.	\N	\N	\N
1eaa6c13-495c-452c-be4e-1d98b3fbaac5	5730cd1e-2542-4e76-963c-e486be58a3d6	29	及时	jíshí	kịp thời	医生及时救了他。	\N	Bác sĩ đã kịp thời cứu anh ấy.	\N	\N	\N
0aade548-36af-400d-9dd2-501701770343	5730cd1e-2542-4e76-963c-e486be58a3d6	30	陪	péi	ở bên	他陪我去看电影。	\N	Anh ấy ở bên tôi cùng đi xem phim.	\N	\N	\N
5c91481d-3695-4d70-8804-43e9e3979719	6ed7322c-6788-4c2f-8968-7e0c90647545	0	加油站	jiāyóuzhàn	Trạm xăng (Danh từ)	去机场的路上有加油站吗？	Qù jīchǎng de lù shang yǒu jiāyóuzhàn ma?	Trên đường đi sân bay có trạm xăng không?	\N	\N	\N
374c4b37-9221-4e8a-86cd-62326c4b4135	6ed7322c-6788-4c2f-8968-7e0c90647545	1	航班	hángbān	Chuyến bay (Danh từ)	你去北京的航班是几点的？	Nǐ qù Běijīng de hángbān shì jǐ diǎn de?	Chuyến bay của bạn đi Bắc Kinh lúc mấy giờ?	\N	\N	\N
fb57b704-be76-420e-bd29-2278d9d23d16	6ed7322c-6788-4c2f-8968-7e0c90647545	2	推迟	tuīchí	Hoãn lại (Động từ)	我的航班推迟了一个小时。	Wǒ de hángbān tuīchí le yí gè xiǎoshí.	Chuyến bay của tôi bị hoãn 1 tiếng.	\N	\N	\N
bbf8b1db-762e-4424-abf3-a795fd2f059d	6ed7322c-6788-4c2f-8968-7e0c90647545	3	高速公路	gāosù gōnglù	Đường cao tốc (Danh từ)	我们马上就能上高速公路。	Wǒmen mǎshàng jiù néng shàng gāosù gōnglù.	Chúng tôi sắp lên đường cao tốc rồi.	\N	\N	\N
0fad9409-e239-4210-b252-8e125b07f2a2	6ed7322c-6788-4c2f-8968-7e0c90647545	4	登机牌	dēngjīpái	Thẻ lên máy bay (Danh từ)	请问在哪里可以换登机牌？	Qǐngwèn zài nǎlǐ kěyǐ huàn dēngjīpái?	Xin hỏi đổi thẻ lên máy bay ở đâu?	\N	\N	\N
f9978964-a79f-4dba-be82-0f79f8a85229	6ed7322c-6788-4c2f-8968-7e0c90647545	5	首都	shǒudū	Thủ đô (Danh từ)	我到了首都再联系你。	Wǒ dào le shǒudū zài liánxì nǐ.	Tôi đến thủ đô rồi sẽ liên lạc với bạn.	\N	\N	\N
fa37cea5-b645-49a6-a844-1d2d196ea2bf	6ed7322c-6788-4c2f-8968-7e0c90647545	6	长江	Chángjiāng	Sông Trường Giang (Danh từ)	我们开车经过长江大桥。	Wǒmen kāichē jīngguò Chángjiāng dàqiáo.	Chúng tôi lái xe qua cầu Trường Giang.	\N	\N	\N
db3e1b33-aa8e-44ea-a3a4-bdff9ff5b957	6ed7322c-6788-4c2f-8968-7e0c90647545	7	拐	guǎi	Rẽ (Động từ)	过了桥往右拐就到了。	Guò le qiáo wǎng yòu guǎi jiù dào le.	Qua cầu rẽ phải là tới.	\N	\N	\N
b3d4aae1-b998-4b60-8595-d505249b8ab1	6ed7322c-6788-4c2f-8968-7e0c90647545	8	旅行	lǚxíng	Du lịch (Động/Danh từ)	我们打算周末去旅行。	Wǒmen dǎsuàn zhōumò qù lǚxíng.	Chúng tôi dự định cuối tuần đi du lịch.	\N	\N	\N
0e3fc014-0cfc-46ab-8d6d-d60a21a93aac	6ed7322c-6788-4c2f-8968-7e0c90647545	9	怪	guài	Rất (Phó từ)	这件衣服怪漂亮的。	Zhè jiàn yīfu guài piàoliang de.	Bộ đồ này đẹp thật đấy.	\N	\N	\N
1695ef51-9ed6-41e7-8977-e6f9b81deb70	6ed7322c-6788-4c2f-8968-7e0c90647545	10	可怜	kělián	Đáng thương (Tính từ)	他没有时间休息，真可怜。	Tā méiyǒu shíjiān xiūxi, zhēn kělián.	Anh ấy không có thời gian nghỉ ngơi, thật đáng thương.	\N	\N	\N
c77072e9-9fcf-498a-9626-72c3b3e8575e	6ed7322c-6788-4c2f-8968-7e0c90647545	11	斜	xié	Nghiêng (Tính từ)	他斜着坐在椅子上。	Tā xié zhe zuò zài yǐzi shang.	Anh ấy ngồi nghiêng trên ghế.	\N	\N	\N
f13136d3-98c4-4f0c-a794-348a96ab309f	6ed7322c-6788-4c2f-8968-7e0c90647545	12	对面	duìmiàn	Đối diện (Danh từ)	银行就在学校对面。	Yínháng jiù zài xuéxiào duìmiàn.	Ngân hàng ở ngay đối diện trường.	\N	\N	\N
a453dea9-a45d-4253-880c-bf1ace4f1415	6ed7322c-6788-4c2f-8968-7e0c90647545	13	烤鸭	kǎoyā	Vịt quay (Danh từ)	我想吃北京烤鸭。	Wǒ xiǎng chī Běijīng kǎoyā.	Tôi muốn ăn vịt quay Bắc Kinh.	\N	\N	\N
4669235e-5ea1-4180-8992-858dd655782f	6ed7322c-6788-4c2f-8968-7e0c90647545	14	祝贺	zhùhè	Chúc mừng (Động từ)	祝贺你通过考试。	Zhùhè nǐ tōngguò kǎoshì.	Chúc mừng bạn đã vượt qua kỳ thi.	\N	\N	\N
d5066436-dcfb-4dfd-901b-07169c3b5415	6ed7322c-6788-4c2f-8968-7e0c90647545	15	合格	hégé	Đạt tiêu chuẩn (Động/Tính từ)	他的成绩都合格。	Tā de chéngjì dōu hégé.	Thành tích của anh ấy đều đạt yêu cầu.	\N	\N	\N
0060c4ab-6310-4f8a-8495-20c13c9be17a	6ed7322c-6788-4c2f-8968-7e0c90647545	16	成千上万	chéng qiān shàng wàn	Hàng ngàn hàng vạn (Thành ngữ)	这里有成千上万的人。	Zhèlǐ yǒu chéng qiān shàng wàn de rén.	Ở đây có hàng ngàn hàng vạn người.	\N	\N	\N
c1571480-c218-434e-b461-4490229eb19c	6ed7322c-6788-4c2f-8968-7e0c90647545	17	干杯	gān bēi	Cạn ly (Động từ)	我们一起干杯吧！	Wǒmen yìqǐ gān bēi ba!	Chúng ta cùng cạn ly nhé!	\N	\N	\N
ee42ad41-da3a-4ee8-9db2-bbf1c3f1b276	6ed7322c-6788-4c2f-8968-7e0c90647545	18	民族	mínzú	Dân tộc (Danh từ)	越南有很多民族。	Yuènán yǒu hěn duō mínzú.	Việt Nam có nhiều dân tộc.	\N	\N	\N
bf5229bd-bdfb-4f5c-a87f-620acab902d3	6ed7322c-6788-4c2f-8968-7e0c90647545	19	打扮	dǎban	Trang điểm, ăn mặc (Động từ)	她今天打扮得很漂亮。	Tā jīntiān dǎban de hěn piàoliang.	Hôm nay cô ấy ăn mặc rất đẹp.	\N	\N	\N
bb5bcf22-60ac-47d4-b4b0-95f2cf596fcf	6ed7322c-6788-4c2f-8968-7e0c90647545	20	笑话	xiàohua	Truyện cười (Danh từ)	他讲了一个很好笑的笑话。	Tā jiǎng le yí gè hěn hǎoxiào de xiàohua.	Anh ấy kể một câu chuyện cười rất hay.	\N	\N	\N
55447cdd-4828-47a0-b003-37a36f35da1d	6ed7322c-6788-4c2f-8968-7e0c90647545	21	存	cún	Gửi, cất (Động từ)	我想存一点钱。	Wǒ xiǎng cún yìdiǎn qián.	Tôi muốn tiết kiệm một ít tiền.	\N	\N	\N
6b66d585-c3bf-4757-a400-1400de678aa3	6ed7322c-6788-4c2f-8968-7e0c90647545	22	钥匙	yàoshi	Chìa khóa (Danh từ)	我找不到钥匙了。	Wǒ zhǎo bú dào yàoshi le.	Tôi không tìm thấy chìa khóa.	\N	\N	\N
f29d5f0a-f834-4dd8-87e5-5034cf394862	6ed7322c-6788-4c2f-8968-7e0c90647545	23	究竟	jiūjìng	Rốt cuộc (Phó từ)	你究竟想说什么？	Nǐ jiūjìng xiǎng shuō shénme?	Rốt cuộc bạn muốn nói gì?	\N	\N	\N
bdae7f17-4dff-46b2-a964-b4812150718f	6ed7322c-6788-4c2f-8968-7e0c90647545	24	棵	kē	Cây (Lượng từ)	院子里有一棵树。	Yuànzi lǐ yǒu yì kē shù.	Trong sân có một cây.	\N	\N	\N
a00e0d76-5ad7-40e5-930f-fe8379d4cbdb	6ed7322c-6788-4c2f-8968-7e0c90647545	25	月份	yuèfèn	Tháng (Danh từ)	三月份天气很好。	Sān yuèfèn tiānqì hěn hǎo.	Thời tiết tháng 3 rất đẹp.	\N	\N	\N
195124e0-6dc5-4681-8e1a-79729dd5a165	6ed7322c-6788-4c2f-8968-7e0c90647545	26	汤	tāng	Canh (Danh từ)	我先喝点汤。	Wǒ xiān hē diǎn tāng.	Tôi uống chút canh trước.	\N	\N	\N
8897ddc0-0794-4274-a4da-bb2645caee07	6ed7322c-6788-4c2f-8968-7e0c90647545	27	鲜美	xiānměi	Tươi ngon (Tính từ)	这道菜味道很鲜美。	Zhè dào cài wèidào hěn xiānměi.	Món ăn này rất ngon.	\N	\N	\N
941a047d-e9e6-4bd0-b3ad-1269b445533f	6ed7322c-6788-4c2f-8968-7e0c90647545	28	对话	duìhuà	Hội thoại (Danh/Động từ)	我们用中文对话吧。	Wǒmen yòng Zhōngwén duìhuà ba.	Chúng ta hãy nói chuyện bằng tiếng Trung nhé.	\N	\N	\N
28aac55e-6578-419f-acd1-9f5c1870ef4c	6ed7322c-6788-4c2f-8968-7e0c90647545	29	普通话	pǔtōnghuà	Tiếng phổ thông (Danh từ)	他普通话说得很好。	Tā pǔtōnghuà shuō de hěn hǎo.	Anh ấy nói tiếng phổ thông rất tốt.	\N	\N	\N
b2e51b4b-f15e-4169-a4a9-bdc6964a6636	6ed7322c-6788-4c2f-8968-7e0c90647545	30	味儿	wèir	Giọng/đặc trưng (Danh từ)	他说话有北京味儿。	Tā shuōhuà yǒu Běijīng wèir.	Cách nói của anh ấy có giọng Bắc Kinh.	\N	\N	\N
35f7a077-d809-433d-9362-ff7c5af37101	6ed7322c-6788-4c2f-8968-7e0c90647545	31	小吃	xiǎochī	Đồ ăn vặt (Danh từ)	我喜欢吃路边小吃。	Wǒ xǐhuan chī lùbiān xiǎochī.	Tôi thích ăn đồ ăn vặt ven đường.	\N	\N	\N
89da497f-e417-4bbb-82aa-a1feda855212	6ed7322c-6788-4c2f-8968-7e0c90647545	32	收拾	shōushi	Dọn dẹp (Động từ)	我正在收拾房间。	Wǒ zhèngzài shōushi fángjiān.	Tôi đang dọn phòng.	\N	\N	\N
d9b3a3ab-8e2d-4713-aade-7130c1a6f5d1	6ed7322c-6788-4c2f-8968-7e0c90647545	33	目的地	mùdìdì	Điểm đến (Danh từ)	我们快到目的地了。	Wǒmen kuài dào mùdìdì le.	Chúng tôi sắp đến nơi rồi.	\N	\N	\N
bc66b274-0526-4962-b293-816c79066251	6ed7322c-6788-4c2f-8968-7e0c90647545	34	出发	chūfā	Xuất phát (Động từ)	我们明天早上出发。	Wǒmen míngtiān zǎoshang chūfā.	Chúng tôi xuất phát vào sáng mai.	\N	\N	\N
dae7fc1b-f775-4463-9c24-facadb7d46fe	6ed7322c-6788-4c2f-8968-7e0c90647545	35	辣	là	Cay (Tính từ)	这道菜很辣。	Zhè dào cài hěn là.	Món này rất cay.	\N	\N	\N
6fde88c7-92e7-45f6-8796-1d8bb600ec42	6ed7322c-6788-4c2f-8968-7e0c90647545	36	香	xiāng	Thơm (Tính từ)	这个面包很香。	Zhège miànbāo hěn xiāng.	Bánh mì này rất thơm.	\N	\N	\N
414658cc-8826-4b36-878a-80df576e98aa	6ed7322c-6788-4c2f-8968-7e0c90647545	37	酸	suān	Chua (Tính từ)	这个水果有点酸。	Zhège shuǐguǒ yǒudiǎn suān.	Trái cây này hơi chua.	\N	\N	\N
e43898dd-93cf-4764-902c-f510c521b3bb	6ed7322c-6788-4c2f-8968-7e0c90647545	38	精神百倍	jīngshén bǎibèi	Tràn đầy năng lượng (Thành ngữ)	今天我精神百倍。	Jīntiān wǒ jīngshén bǎibèi.	Hôm nay tôi tràn đầy năng lượng.	\N	\N	\N
b038f397-076c-434d-a75b-c8bfd744f32e	454c76c6-81bf-436a-b7a5-655013dcc01f	0	挺	tǐng	Khá, rất	她挺聪明的，同事们都喜欢她。	Tā tǐng cōngmíng de, tóngshìmen dōu xǐhuan tā.	Cô ấy khá thông minh, đồng nghiệp đều thích cô ấy.	\N	\N	\N
300de36c-41cd-4d20-84fc-80d56971f1ec	454c76c6-81bf-436a-b7a5-655013dcc01f	1	紧张	jǐnzhāng	Căng thẳng	第一次面试，他有点紧张。	Dì yī cì miànshì, tā yǒudiǎn jǐnzhāng.	Lần đầu phỏng vấn, anh ấy hơi căng thẳng.	\N	\N	\N
19c6056d-c83b-4c18-b60d-53dd2775c09b	454c76c6-81bf-436a-b7a5-655013dcc01f	2	信心	xìnxīn	Sự tự tin	我对自己的能力很有信心。	Wǒ duì zìjǐ de nénglì hěn yǒu xìnxīn.	Tôi rất tự tin vào năng lực của mình.	\N	\N	\N
75524f56-bd31-4767-80fa-870ecdac2131	454c76c6-81bf-436a-b7a5-655013dcc01f	3	能力	nénglì	Năng lực	她的组织能力很强。	Tā de zǔzhī nénglì hěn qiáng.	Khả năng tổ chức của cô ấy rất tốt.	\N	\N	\N
0a5320d6-c6da-4dae-a458-bd04d8f92ec4	454c76c6-81bf-436a-b7a5-655013dcc01f	4	招聘	zhāopìn	Tuyển dụng	我们公司正在招聘新员工。	Wǒmen gōngsī zhèngzài zhāopìn xīn yuángōng.	Công ty chúng tôi đang tuyển nhân viên mới.	\N	\N	\N
d9bc14bf-eb36-4da7-ae97-311f9f29e049	454c76c6-81bf-436a-b7a5-655013dcc01f	5	提供	tígōng	Cung cấp	公司为员工提供午餐。	Gōngsī wèi yuángōng tígōng wǔcān.	Công ty cung cấp bữa trưa cho nhân viên.	\N	\N	\N
d32884ef-ea28-4894-80f6-9b7061d07a53	454c76c6-81bf-436a-b7a5-655013dcc01f	6	负责	fùzé	Phụ trách	他负责公司的 market 工作。	Tā fùzé gōngsī de shìchǎng gōngzuò.	Anh ấy phụ trách công việc marketing của công ty.	\N	\N	\N
e42d44eb-cee2-433d-80fa-300f3d789e76	454c76c6-81bf-436a-b7a5-655013dcc01f	7	本来	běnlái	Vốn dĩ	我本来想去旅游，可是生病了。	Wǒ běnlái xiǎng qù lǚyóu, kěshì shēngbìng le.	Tôi vốn định đi du lịch nhưng lại bị ốm.	\N	\N	\N
0fbf89a6-a39d-4b7c-bffa-4820b2824104	454c76c6-81bf-436a-b7a5-655013dcc01f	8	应聘	yìngpìn	Ứng tuyển	他应聘了那家外企的经理职位。	Tā yìngpìn le nà jiā wàiqǐ de jīnglǐ zhíwèi.	Anh ấy ứng tuyển vị trí quản lý của công ty nước ngoài đó.	\N	\N	\N
785714df-5c7a-447b-aae8-fe5e45a2d1e8	454c76c6-81bf-436a-b7a5-655013dcc01f	9	材料	cáiliào	Tài liệu	请把报名材料交到办公室。	Qǐng bǎ bàomíng cáiliào jiāo dào bàngōngshì.	Hãy nộp tài liệu đăng ký đến văn phòng.	\N	\N	\N
a28352ae-a4c0-42e8-8005-b3179314758f	454c76c6-81bf-436a-b7a5-655013dcc01f	10	符合	fúhé	Phù hợp	你的经验很符合公司的要求。	Nǐ de jīngyàn hěn fúhé gōngsī de yāoqiú.	Kinh nghiệm của bạn rất phù hợp với yêu cầu công ty.	\N	\N	\N
3272f1a6-fd9c-48d1-924e-131794f89a03	454c76c6-81bf-436a-b7a5-655013dcc01f	11	通知	tōngzhī	Thông báo	公司明天会通知你结果。	Gōngsī míngtiān huì tōngzhī nǐ jiéguǒ.	Công ty sẽ thông báo kết quả cho bạn vào ngày mai.	\N	\N	\N
c604f29f-a239-4432-96af-dbfa9c3d92ea	454c76c6-81bf-436a-b7a5-655013dcc01f	12	律师	lǜshī	Luật sư	他是一名经验丰富的律师。	Tā shì yī míng jīngyàn fēngfù de lǜshī.	Anh ấy là một luật sư giàu kinh nghiệm.	\N	\N	\N
615ea0de-1a93-4378-8331-a5870b25ddc3	454c76c6-81bf-436a-b7a5-655013dcc01f	13	专业	zhuānyè	Chuyên ngành	我的专业是法律。	Wǒ de zhuānyè shì fǎlǜ.	Chuyên ngành của tôi là luật.	\N	\N	\N
03593dca-8c73-472d-a58d-eba5851891c8	454c76c6-81bf-436a-b7a5-655013dcc01f	14	另外	lìngwài	Ngoài ra	我买了一件衣服，另外还买了双鞋。	Wǒ mǎile yī jiàn yīfu, lìngwài hái mǎile shuāng xié.	Tôi mua một chiếc áo, ngoài ra còn mua thêm một đôi giày.	\N	\N	\N
9d8856b7-5fa0-45f8-99d5-d842077a8f36	454c76c6-81bf-436a-b7a5-655013dcc01f	15	收入	shōurù	Thu nhập	他的月收入很高。	Tā de yuè shōurù hěn gāo.	Thu nhập hàng tháng của anh ấy rất cao.	\N	\N	\N
581450a4-653a-4eec-83fd-20b02a28733a	454c76c6-81bf-436a-b7a5-655013dcc01f	16	咱们	zánmen	Chúng ta	咱们明天去看电影吧。	Zánmen míngtiān qù kàn diànyǐng ba.	Chúng ta ngày mai đi xem phim nhé.	\N	\N	\N
8391895e-b16a-42ce-a8cf-c21b7c12c136	454c76c6-81bf-436a-b7a5-655013dcc01f	17	安排	ānpái	Sắp xếp	老师安排我负责接待客人。	Lǎoshī ānpái wǒ fùzé jiēdài kèrén.	Giáo viên sắp xếp tôi phụ trách đón tiếp khách.	\N	\N	\N
57517bc1-df67-4d0c-b88d-bc7c35fd034a	454c76c6-81bf-436a-b7a5-655013dcc01f	18	首先	shǒuxiān	Trước hết	首先，我想感谢大家的帮助。	Shǒuxiān, wǒ xiǎng gǎnxiè dàjiā de bāngzhù.	Trước hết, tôi muốn cảm ơn sự giúp đỡ của mọi người.	\N	\N	\N
2fdfdbb6-0d20-4765-9618-9e2482fc91e1	454c76c6-81bf-436a-b7a5-655013dcc01f	19	正式	zhèngshì	Chính thức	今天是正式上班的第一天。	Jīntiān shì zhèngshì shàngbān de dì yī tiān.	Hôm nay là ngày đầu tiên đi làm chính thức.	\N	\N	\N
5b6f7526-c097-4ab7-82d7-565a260315e7	454c76c6-81bf-436a-b7a5-655013dcc01f	20	留	liú	Để lại	他给我留了一张纸条。	Tā gěi wǒ liúle yī zhāng zhǐtiáo.	Anh ấy để lại cho tôi một mẩu giấy.	\N	\N	\N
9c80b9c2-8318-4e46-bb29-21eba03eb545	454c76c6-81bf-436a-b7a5-655013dcc01f	21	其次	qícì	Thứ hai, tiếp theo	首先要努力学习，其次要注意身体。	Shǒuxiān yào nǔlì xuéxí, qícì yào zhùyì shēntǐ.	Trước hết phải học chăm, thứ hai là chú ý sức khỏe.	\N	\N	\N
fefb4e73-89b5-4620-8a4f-707ff3639eb3	454c76c6-81bf-436a-b7a5-655013dcc01f	22	诚实	chéngshí	Trung thực	他是一个很诚实的员工。	Tā shì yí ge hěn chéngshí de yuángōng.	Anh ấy là một nhân viên rất trung thực.	\N	\N	\N
34b6dc1e-de25-47e3-ab5c-0753ebb99afe	454c76c6-81bf-436a-b7a5-655013dcc01f	23	改变	gǎibiàn	Thay đổi	他的态度完全改变了。	Tā de tàidù wánquán gǎibiàn le.	Thái độ của anh ấy đã hoàn toàn thay đổi.	\N	\N	\N
e994e1d9-5a3f-4cd3-98cb-18fa8da34932	454c76c6-81bf-436a-b7a5-655013dcc01f	24	感觉	gǎnjué	Cảm thấy / Cảm giác	我感觉今天比昨天冷。	Wǒ gǎnjué jīntiān bǐ zuótiān lěng.	Tôi cảm thấy hôm nay lạnh hơn hôm qua.	\N	\N	\N
842a451d-9968-4f7d-847d-7148835d09e9	454c76c6-81bf-436a-b7a5-655013dcc01f	25	判断	pànduàn	Phán đoán	你不能只看外表来判断一个人。	Nǐ bùnéng zhǐ kàn wàibiǎo lái pànduàn yí ge rén.	Bạn không thể chỉ nhìn bề ngoài để đánh giá một người.	\N	\N	\N
599dda3d-c26e-48f1-a6f3-b22e2ed0b88c	454c76c6-81bf-436a-b7a5-655013dcc01f	26	顾客	gùkè	Khách hàng	这家店的顾客很多。	Zhè jiā diàn de gùkè hěn duō.	Cửa hàng này có rất nhiều khách.	\N	\N	\N
fdda70ca-4636-4f6f-adbb-a5f329adb59f	454c76c6-81bf-436a-b7a5-655013dcc01f	27	准时	zhǔnshí	Đúng giờ	他每天都准时上班。	Tā měitiān dōu zhǔnshí shàngbān.	Anh ấy mỗi ngày đều đi làm đúng giờ.	\N	\N	\N
d19d6d65-636e-4fdf-99cc-96294263a0ea	454c76c6-81bf-436a-b7a5-655013dcc01f	28	不管	bùguǎn	Bất kể	不管结果如何，我都支持你。	Bùguǎn jiéguǒ rúhé, wǒ dōu zhīchí nǐ.	Dù kết quả thế nào tôi cũng ủng hộ bạn.	\N	\N	\N
ea076a05-1d79-4843-b485-86b78559dd4e	454c76c6-81bf-436a-b7a5-655013dcc01f	29	与	yǔ	Với (giống 和)	他与老师关系很好。	Tā yǔ lǎoshī guānxì hěn hǎo.	Anh ấy có quan hệ rất tốt với giáo viên.	\N	\N	\N
d9b86529-ce47-48e2-83b1-31d4ad7a3f3e	9f05f51e-de7a-4ac4-9dba-99058e2213dd	0	提	tí	Nhắc đến, đề cập	一提起这件事，他就笑了。	Yī tíqǐ zhè jiàn shì, tā jiù xiào le.	Hễ nhắc đến chuyện này là anh ấy cười.	\N	\N	\N
528a062d-c23f-424a-8f8f-833a9c83645c	9f05f51e-de7a-4ac4-9dba-99058e2213dd	1	提	tí	Xách, cầm	他手里提着一个黑色的包。	Tā shǒu lǐ tízhe yí gè hēisè de bāo.	Anh ấy đang xách một chiếc túi màu đen.	\N	\N	\N
449f3338-249f-427c-b602-5b8579c71aa3	9f05f51e-de7a-4ac4-9dba-99058e2213dd	2	提	tí	Đưa ra, nêu ra	老师请大家提出问题。	Lǎoshī qǐng dàjiā tí chū wèntí.	Giáo viên yêu cầu mọi người đưa ra câu hỏi.	\N	\N	\N
3c4a4297-d430-4184-8b78-811f0b44e9de	9f05f51e-de7a-4ac4-9dba-99058e2213dd	3	别提了	bié tí le	Đừng nhắc nữa	别提了，这件事太麻烦了。	Bié tí le, zhè jiàn shì tài máfan le.	Đừng nhắc nữa, chuyện này phiền phức quá.	\N	\N	\N
e1f0194d-2418-4205-a269-4118cec1d3bb	9f05f51e-de7a-4ac4-9dba-99058e2213dd	4	以为	yǐwéi	Tưởng là	我以为他会来，结果他没来。	Wǒ yǐwéi tā huì lái, jiéguǒ tā méi lái.	Tôi tưởng anh ấy sẽ đến, nhưng cuối cùng lại không.	\N	\N	\N
0af4af91-5a52-4695-984e-8e0276d068d2	9f05f51e-de7a-4ac4-9dba-99058e2213dd	5	份	fèn	Lượng từ (cho công việc, tài liệu...)	我找到了一份新工作。	Wǒ zhǎodàole yí fèn xīn gōngzuò.	Tôi đã tìm được một công việc mới.	\N	\N	\N
6084f379-4dd0-4d50-9d72-7e760202b1d5	9f05f51e-de7a-4ac4-9dba-99058e2213dd	6	完全	wánquán	Hoàn toàn	我完全同意你的看法。	Wǒ wánquán tóngyì nǐ de kànfǎ.	Tôi hoàn toàn đồng ý với quan điểm của bạn.	\N	\N	\N
1ae1c454-d84f-4450-a1c0-b22516ca22fe	9f05f51e-de7a-4ac4-9dba-99058e2213dd	7	赚	zhuàn	Kiếm tiền	他努力工作，所以赚了很多钱。	Tā nǔlì gōngzuò, suǒyǐ zhuànle hěn duō qián.	Anh ấy làm việc chăm chỉ nên kiếm được rất nhiều tiền.	\N	\N	\N
c60a2633-5cd5-461e-91e7-70652e56fee7	9f05f51e-de7a-4ac4-9dba-99058e2213dd	8	调查	diàochá	Điều tra	根据调查结果，大多数人喜欢在城市工作。	Gēnjù diàochá jiéguǒ, dà duōshù rén xǐhuan zài chéngshì gōngzuò.	Theo kết quả khảo sát, đa số mọi người thích làm việc ở thành phố.	\N	\N	\N
94199ec8-6b09-4208-b0cd-2878fc234971	9f05f51e-de7a-4ac4-9dba-99058e2213dd	9	原来	yuánlái	Hóa ra	原来他已经知道这件事了。	Yuánlái tā yǐjīng zhīdào zhè jiàn shì le.	Hóa ra anh ấy đã biết chuyện này rồi.	\N	\N	\N
04f82273-bc62-46c6-8831-86ed7c6c1bbd	9f05f51e-de7a-4ac4-9dba-99058e2213dd	10	原来	yuánlái	Trước đây	现在的生活比原来好多了。	Xiànzài de shēnghuó bǐ yuánlái hǎo duō le.	Cuộc sống bây giờ tốt hơn trước đây nhiều.	\N	\N	\N
a1714935-7d7d-4307-ad00-0288d553b5c0	9f05f51e-de7a-4ac4-9dba-99058e2213dd	11	计划	jìhuà	Kế hoạch	我做了一份学习计划。	Wǒ zuòle yí fèn xuéxí jìhuà.	Tôi đã lập một kế hoạch học tập.	\N	\N	\N
4ee72ccb-0de6-4049-adfa-06301a191530	9f05f51e-de7a-4ac4-9dba-99058e2213dd	12	计划	jìhuà	Lên kế hoạch	我们先计划一下再开始。	Wǒmen xiān jìhuà yíxià zài kāishǐ.	Chúng ta lên kế hoạch trước rồi bắt đầu.	\N	\N	\N
f82e2646-6dd5-4f7b-b236-e059551bbb45	9f05f51e-de7a-4ac4-9dba-99058e2213dd	13	提前	tíqián	Làm sớm	我们要提前完成任务。	Wǒmen yào tíqián wánchéng rènwu.	Chúng ta phải hoàn thành nhiệm vụ sớm.	\N	\N	\N
3bcb300a-a4ed-4907-b762-b20d1b6f05ec	9f05f51e-de7a-4ac4-9dba-99058e2213dd	14	提醒	tíxǐng	Nhắc nhở	妈妈提醒我别忘了带雨伞。	Māma tíxǐng wǒ bié wàngle dài yǔsǎn.	Mẹ nhắc tôi đừng quên mang ô.	\N	\N	\N
bf7d51de-e2b6-4389-ade6-741ed096fe27	9f05f51e-de7a-4ac4-9dba-99058e2213dd	15	保证	bǎozhèng	Đảm bảo	我保证不会再迟到了。	Wǒ bǎozhèng bú huì zài chídào le.	Tôi đảm bảo sẽ không đến muộn nữa.	\N	\N	\N
630777ea-9eeb-4b70-ba39-16546f52fd29	9f05f51e-de7a-4ac4-9dba-99058e2213dd	16	乱	luàn	Lộn xộn	他的房间总是很乱。	Tā de fángjiān zǒngshì hěn luàn.	Phòng của anh ấy lúc nào cũng bừa bộn.	\N	\N	\N
6a526bc6-2b3e-49f3-b601-8bc1830db839	9f05f51e-de7a-4ac4-9dba-99058e2213dd	17	生意	shēngyì	Kinh doanh	他在做服装生意。	Tā zài zuò fúzhuāng shēngyì.	Anh ấy đang kinh doanh quần áo.	\N	\N	\N
f246d047-7734-4996-8364-38d179fdd280	9f05f51e-de7a-4ac4-9dba-99058e2213dd	18	谈	tán	Nói chuyện, thảo luận	我们正在谈工作。	Wǒmen zhèngzài tán gōngzuò.	Chúng tôi đang bàn về công việc.	\N	\N	\N
fdb112be-0a4b-4c68-992e-21d01aed0973	9f05f51e-de7a-4ac4-9dba-99058e2213dd	19	并	bìng	Phó từ (nhấn mạnh phủ định)	这件事并不容易。	Zhè jiàn shì bìng bù róngyì.	Việc này không hề dễ.	\N	\N	\N
69cbb1b4-451a-41b5-bacd-faa03346c656	9f05f51e-de7a-4ac4-9dba-99058e2213dd	20	积累	jīlěi	Tích lũy	他在工作中积累了很多经验。	Tā zài gōngzuò zhōng jīlěile hěn duō jīngyàn.	Anh ấy đã tích lũy nhiều kinh nghiệm trong công việc.	\N	\N	\N
66fc9d74-4883-412b-ab57-fbd6dc9e410a	9f05f51e-de7a-4ac4-9dba-99058e2213dd	21	经验	jīngyàn	Kinh nghiệm	他有丰富的工作经验。	Tā yǒu fēngfù de gōngzuò jīngyàn.	Anh ấy có nhiều kinh nghiệm làm việc.	\N	\N	\N
a9e57376-8f5b-4bb5-b8cf-3e5d34af978e	9f05f51e-de7a-4ac4-9dba-99058e2213dd	22	一切	yíqiè	Tất cả	我相信一切都会好起来。	Wǒ xiāngxìn yíqiè dōu huì hǎo qǐlái.	Tôi tin mọi thứ sẽ tốt lên.	\N	\N	\N
a8dd0e46-8bcb-493f-a5aa-0e48769dcb7c	9f05f51e-de7a-4ac4-9dba-99058e2213dd	23	按照	ànzhào	Theo	我们要按照计划进行。	Wǒmen yào ànzhào jìhuà jìnxíng.	Chúng ta phải tiến hành theo kế hoạch.	\N	\N	\N
93ae018e-821c-4225-88c6-47b7e00e9c91	9f05f51e-de7a-4ac4-9dba-99058e2213dd	24	成功	chénggōng	Thành công	他终于成功了。	Tā zhōngyú chénggōng le.	Cuối cùng anh ấy đã thành công.	\N	\N	\N
b7c2661e-7104-43aa-a0c2-967de0d85a96	9f05f51e-de7a-4ac4-9dba-99058e2213dd	25	顺利	shùnlì	Thuận lợi	希望你考试顺利。	Xīwàng nǐ kǎoshì shùnlì.	Chúc bạn thi thuận lợi.	\N	\N	\N
c6c0d603-bf56-476b-a369-74c662362adf	9f05f51e-de7a-4ac4-9dba-99058e2213dd	26	感谢	gǎnxiè	Cảm ơn	非常感谢你的帮助。	Fēicháng gǎnxiè nǐ de bāngzhù.	Rất cảm ơn sự giúp đỡ của bạn.	\N	\N	\N
8aea6374-a5ab-46cf-aef8-7b8c292c4e85	9f05f51e-de7a-4ac4-9dba-99058e2213dd	27	消息	xiāoxi	Tin tức	我听到一个好消息。	Wǒ tīngdào yí gè hǎo xiāoxi.	Tôi nghe được một tin tốt.	\N	\N	\N
8b7c9c35-3e9d-490f-b0bb-48f7c7e7c031	9f05f51e-de7a-4ac4-9dba-99058e2213dd	28	按时	ànshí	Đúng hạn	我们必须按时完成作业。	Wǒmen bìxū ànshí wánchéng zuòyè.	Chúng ta phải hoàn thành bài tập đúng hạn.	\N	\N	\N
c7033002-f8dd-484d-9f39-38dfd53b8fbb	9f05f51e-de7a-4ac4-9dba-99058e2213dd	29	奖金	jiǎngjīn	Tiền thưởng	公司年底会发奖金。	Gōngsī niándǐ huì fā jiǎngjīn.	Công ty sẽ phát thưởng vào cuối năm.	\N	\N	\N
00f05d26-9170-42be-bc6e-2b27a12713d5	9f05f51e-de7a-4ac4-9dba-99058e2213dd	30	工资	gōngzī	Tiền lương	他每个月的工资很高。	Tā měi gè yuè de gōngzī hěn gāo.	Lương hàng tháng của anh ấy rất cao.	\N	\N	\N
0b705e98-87d2-44f5-a6b2-830a112314e6	9f05f51e-de7a-4ac4-9dba-99058e2213dd	31	方法	fāngfǎ	Phương pháp	我正在找更好的学习方法。	Wǒ zhèngzài zhǎo gèng hǎo de xuéxí fāngfǎ.	Tôi đang tìm phương pháp học tốt hơn.	\N	\N	\N
1a7689c2-2df9-4e41-abc2-39d1da6619a5	9f05f51e-de7a-4ac4-9dba-99058e2213dd	32	知识	zhīshi	Kiến thức	阅读能丰富我们的知识。	Yuèdú néng fēngfù wǒmen de zhīshi.	Đọc sách giúp làm phong phú kiến thức.	\N	\N	\N
118d7ae2-e65e-453d-b1d6-897dcba79d2f	9f05f51e-de7a-4ac4-9dba-99058e2213dd	33	不得不	bù dé bù	Buộc phải	我生病了，不得不请假。	Wǒ shēngbìng le, bù dé bù qǐngjià.	Tôi bị ốm nên buộc phải xin nghỉ.	\N	\N	\N
6b58f6ea-3a04-4b9a-bd0b-1a70b72ccf21	9f05f51e-de7a-4ac4-9dba-99058e2213dd	34	甚至	shènzhì	Thậm chí	他很忙，甚至没有时间吃饭。	Tā hěn máng, shènzhì méiyǒu shíjiān chīfàn.	Anh ấy rất bận, thậm chí không có thời gian ăn.	\N	\N	\N
2bacbf28-3913-4ce6-a138-eef5417d57cd	9f05f51e-de7a-4ac4-9dba-99058e2213dd	35	责任	zérèn	Trách nhiệm	这是他的责任。	Zhè shì tā de zérèn.	Đây là trách nhiệm của anh ấy.	\N	\N	\N
eb576f32-3efc-4ddb-8720-a6250e64ca26	9f05f51e-de7a-4ac4-9dba-99058e2213dd	36	责任心	zérèn xīn	Tinh thần trách nhiệm	他工作很认真，很有责任心。	Tā gōngzuò hěn rènzhēn, hěn yǒu zérèn xīn.	Anh ấy làm việc rất nghiêm túc và có trách nhiệm.	\N	\N	\N
5f59a424-5ad7-4379-94ef-632c99416be7	71ed0a29-0eb1-4002-aa88-6ec8004274f1	0	家具	jiājù	Đồ nội thất	我想买一些新家具。	Wǒ xiǎng mǎi yìxiē xīn jiājù.	Tôi muốn mua một số đồ nội thất mới.	\N	\N	\N
8596fbf3-1602-4c90-8961-461c718deb80	71ed0a29-0eb1-4002-aa88-6ec8004274f1	1	沙发	shāfā	Ghế sofa	他一回家就躺在沙发上。	Tā yì huíjiā jiù tǎng zài shāfā shàng.	Anh ấy vừa về nhà là nằm lên sofa.	\N	\N	\N
5bb936ab-9057-4bad-abfb-859f1c122da3	71ed0a29-0eb1-4002-aa88-6ec8004274f1	2	价格 / 价钱	jiàgé / jiàqián	Giá cả	这件衣服的价格是多少？	Zhè jiàn yīfu de jiàgé shì duōshao?	Giá của chiếc áo này là bao nhiêu?	\N	\N	\N
83dd96dc-6df5-434c-932b-d708f4789984	71ed0a29-0eb1-4002-aa88-6ec8004274f1	3	打折	dǎ zhé	Giảm giá	这件衣服正在打折。	Zhè jiàn yīfu zhèngzài dǎzhé.	Chiếc áo này đang được giảm giá.	\N	\N	\N
460e66ba-5d96-4feb-87c2-eab9d75b84de	71ed0a29-0eb1-4002-aa88-6ec8004274f1	4	看上去	kàn shàngqù	Trông có vẻ	这件衣服看上去很漂亮。	Zhè jiàn yīfu kàn shàngqù hěn piàoliang.	Chiếc áo này trông rất đẹp.	\N	\N	\N
7b325411-f0b9-4f70-afd2-a8c8d7b7c6e7	71ed0a29-0eb1-4002-aa88-6ec8004274f1	5	质量	zhìliàng	Chất lượng	这套沙发的质量很好。	Zhè tào shāfā de zhìliàng hěn hǎo.	Bộ sofa này có chất lượng rất tốt.	\N	\N	\N
8040c523-dca9-4732-b894-1956226503e0	71ed0a29-0eb1-4002-aa88-6ec8004274f1	6	肯定	kěndìng	Chắc chắn	他今天没来上课，肯定生病了。	Tā jīntiān méi lái shàngkè, kěndìng shēngbìng le.	Hôm nay anh ấy không đến lớp, chắc chắn là bị ốm rồi.	\N	\N	\N
e8f07637-0d8c-4ac6-b6e3-91989e143f17	71ed0a29-0eb1-4002-aa88-6ec8004274f1	7	流行	liúxíng	Thịnh hành	这种颜色今年很流行。	Zhè zhǒng yánsè jīnnián hěn liúxíng.	Màu này năm nay rất thịnh hành.	\N	\N	\N
564f2492-b9db-4393-ac0c-fcdbbbb4833a	71ed0a29-0eb1-4002-aa88-6ec8004274f1	8	顺便	shùnbiàn	Tiện thể	我去超市，顺便帮你买点东西。	Wǒ qù chāoshì, shùnbiàn bāng nǐ mǎidiǎn dōngxi.	Tôi đi siêu thị, tiện thể mua giúp bạn ít đồ.	\N	\N	\N
3639b37f-fd8f-4789-9020-6c3a546df0bb	71ed0a29-0eb1-4002-aa88-6ec8004274f1	9	台	tái	Cái (máy móc)	我买了一台新电脑。	Wǒ mǎile yì tái xīn diànnǎo.	Tôi đã mua một chiếc máy tính mới.	\N	\N	\N
73a18b90-dd31-4aa2-bf7d-f60ea6b16689	71ed0a29-0eb1-4002-aa88-6ec8004274f1	10	光	guāng	Chỉ	你不能光看电视，不写作业。	Nǐ bù néng guāng kàn diànshì, bù xiě zuòyè.	Bạn không thể chỉ xem TV mà không làm bài tập.	\N	\N	\N
ab96ac6f-676b-40a7-8b86-c8fadd32ad4d	71ed0a29-0eb1-4002-aa88-6ec8004274f1	11	实在	shízài	Thật sự	他实在太累了，想休息一下。	Tā shízài tài lèi le, xiǎng xiūxi yíxià.	Anh ấy thật sự quá mệt, muốn nghỉ một chút.	\N	\N	\N
47abec6d-a9cb-4c63-82c3-5193ab8839c1	71ed0a29-0eb1-4002-aa88-6ec8004274f1	12	制冷	zhìlěng	Làm lạnh	空调可以制冷，让房间更舒服。	Kōngtiáo kěyǐ zhìlěng, ràng fángjiān gèng shūfu.	Điều hòa có thể làm mát, khiến phòng dễ chịu hơn.	\N	\N	\N
ce3fdb54-c778-4041-b33c-f847e39e14c3	71ed0a29-0eb1-4002-aa88-6ec8004274f1	13	效果	xiàoguǒ	Hiệu quả	这台空调的制冷效果很好。	Zhè tái kōngtiáo de zhìlěng xiàoguǒ hěn hǎo.	Hiệu quả làm lạnh của chiếc điều hòa này rất tốt.	\N	\N	\N
f971d008-637f-49fd-b787-f41cd51a3a2d	71ed0a29-0eb1-4002-aa88-6ec8004274f1	14	现金	xiànjīn	Tiền mặt	我没带现金，可以刷卡吗？	Wǒ méi dài xiànjīn, kěyǐ shuākǎ ma?	Tôi không mang tiền mặt, có thể quẹt thẻ không?	\N	\N	\N
236ff4db-ff2a-43d5-b021-f46a64da5b4a	71ed0a29-0eb1-4002-aa88-6ec8004274f1	15	邀请	yāoqǐng	Mời	他邀请我参加生日聚会。	Tā yāoqǐng wǒ cānjiā shēngrì jùhuì.	Anh ấy mời tôi tham gia tiệc sinh nhật.	\N	\N	\N
b3a85321-fe5c-4820-a6a3-3e17f3d8cdda	71ed0a29-0eb1-4002-aa88-6ec8004274f1	16	葡萄	pútao	Nho	我买了一串葡萄。	Wǒ mǎile yí chuàn pútao.	Tôi đã mua một chùm nho.	\N	\N	\N
a1c6306e-5f06-4e7e-ac73-7a0fbb93b9db	71ed0a29-0eb1-4002-aa88-6ec8004274f1	17	艺术	yìshù	Nghệ thuật	她对艺术非常感兴趣。	Tā duì yìshù fēicháng gǎn xìngqù.	Cô ấy rất hứng thú với nghệ thuật.	\N	\N	\N
00ba4038-b49a-4acc-83cc-415a6f3775d8	71ed0a29-0eb1-4002-aa88-6ec8004274f1	18	广告	guǎnggào	Quảng cáo	最近电视上的广告太多了。	Zuìjìn diànshì shang de guǎnggào tài duō le.	Gần đây quảng cáo trên TV quá nhiều.	\N	\N	\N
9f406779-9820-4903-9506-c59fcfce432f	71ed0a29-0eb1-4002-aa88-6ec8004274f1	19	味道	wèidào	Mùi vị	妈妈做的菜味道真香。	Māma zuò de cài wèidào zhēn xiāng.	Món mẹ nấu rất thơm.	\N	\N	\N
49820d6d-bbfb-4662-a386-62eb69220c34	71ed0a29-0eb1-4002-aa88-6ec8004274f1	20	优点	yōudiǎn	Ưu điểm	每个人都有自己的优点。	Měi gè rén dōu yǒu zìjǐ de yōudiǎn.	Mỗi người đều có ưu điểm riêng.	\N	\N	\N
29f5c9dd-d99b-4cc2-8ff8-3c2d17c715ff	71ed0a29-0eb1-4002-aa88-6ec8004274f1	21	实际	shíjì	Thực tế	我们要根据实际情况做决定。	Wǒmen yào gēnjù shíjì qíngkuàng zuò juédìng.	Chúng ta phải đưa ra quyết định dựa trên tình hình thực tế.	\N	\N	\N
c604e53b-32aa-457b-a267-2a15b257b0a2	71ed0a29-0eb1-4002-aa88-6ec8004274f1	22	实际上	shíjì shang	Thực tế là	实际上，这个问题很简单。	Shíjì shang, zhèige wèntí hěn jiǎndān.	Thực tế thì vấn đề này rất đơn giản.	\N	\N	\N
6a9c145f-13fc-4e00-a35c-564e675afdf9	71ed0a29-0eb1-4002-aa88-6ec8004274f1	23	再说	zàishuō	Hơn nữa	今天太晚了，明天再说吧。	Jīntiān tài wǎn le, míngtiān zàishuō ba.	Hôm nay muộn rồi, để mai nói tiếp.	\N	\N	\N
ca350985-14b0-49ee-b980-ef5a9baca874	71ed0a29-0eb1-4002-aa88-6ec8004274f1	24	考虑	kǎolǜ	Cân nhắc	我会认真考虑你的建议。	Wǒ huì rènzhēn kǎolǜ nǐ de jiànyì.	Tôi sẽ cân nhắc nghiêm túc đề xuất của bạn.	\N	\N	\N
fb2a5a1f-0c16-4f5c-97a1-5dcf4ce4d4cb	71ed0a29-0eb1-4002-aa88-6ec8004274f1	25	标准	biāozhǔn	Tiêu chuẩn	这家饭店的服务标准很高。	Zhè jiā fàndiàn de fúwù biāozhǔn hěn gāo.	Tiêu chuẩn phục vụ của nhà hàng này rất cao.	\N	\N	\N
ce63c358-b5a7-48dd-8145-f750854d86ce	71ed0a29-0eb1-4002-aa88-6ec8004274f1	26	样子	yàngzi	Dáng vẻ	她的样子看起来很高兴。	Tā de yàngzi kàn qǐlái hěn gāoxìng.	Cô ấy trông rất vui.	\N	\N	\N
296e019f-56c8-4cc1-a307-2aedf79c2af3	71ed0a29-0eb1-4002-aa88-6ec8004274f1	27	年龄	niánlíng	Tuổi	他的年龄是20岁。	Tā de niánlíng shì 20 suì.	Anh ấy 20 tuổi.	\N	\N	\N
4e7c851f-c4d0-45d5-8966-a8cfc09f8d3c	71ed0a29-0eb1-4002-aa88-6ec8004274f1	28	浪费	làngfèi	Lãng phí	不好好学习就是浪费时间。	Bù hǎohǎo xuéxí jiùshì làngfèi shíjiān.	Không học hành chăm chỉ là lãng phí thời gian.	\N	\N	\N
4d508cf3-3e9f-4984-bfb9-a9b08a976d82	71ed0a29-0eb1-4002-aa88-6ec8004274f1	29	对……来说	duì… lái shuō	Đối với… mà nói	对我来说，健康最重要。	Duì wǒ lái shuō, jiànkāng zuì zhòngyào.	Đối với tôi mà nói, sức khỏe là quan trọng nhất.	\N	\N	\N
a51392e2-cbd6-42c5-bab7-577eea7f629d	71ed0a29-0eb1-4002-aa88-6ec8004274f1	30	购物	gòuwù	Mua sắm	周末我和朋友去购物。	Zhōumò wǒ hé péngyou qù gòuwù.	Cuối tuần tôi đi mua sắm với bạn.	\N	\N	\N
b72ac239-bf4b-48e7-931a-3ff16e459440	71ed0a29-0eb1-4002-aa88-6ec8004274f1	31	尤其	yóuqí	Đặc biệt là	我喜欢中国文化，尤其是书法。	Wǒ xǐhuan Zhōngguó wénhuà, yóuqí shì shūfǎ.	Tôi thích văn hóa Trung Quốc, đặc biệt là thư pháp.	\N	\N	\N
32c1b8dc-206d-4731-a282-0310f3c607c4	71ed0a29-0eb1-4002-aa88-6ec8004274f1	32	受到	shòudào	Nhận được	他受到了老师的帮助。	Tā shòudào le lǎoshī de bāngzhù.	Anh ấy đã nhận được sự giúp đỡ của giáo viên.	\N	\N	\N
a24adb25-4ced-4239-aa6f-55c58311a50b	71ed0a29-0eb1-4002-aa88-6ec8004274f1	33	任何	rènhé	Bất kỳ	任何人都可以参加这个活动。	Rènhé rén dōu kěyǐ cānjiā zhège huódòng.	Bất kỳ ai cũng có thể tham gia hoạt động này.	\N	\N	\N
dbb94e9e-2845-4aaf-99df-590e4dd2edbc	71ed0a29-0eb1-4002-aa88-6ec8004274f1	34	寄	jì	Gửi	我给朋友寄了一封信。	Wǒ gěi péngyou jìle yì fēng xìn.	Tôi đã gửi một bức thư cho bạn.	\N	\N	\N
cb9741da-1de0-411d-bdd7-6c19da3cdf08	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	0	果汁	guǒzhī	Nước trái cây	我喜欢喝苹果汁。	Wǒ xǐhuan hē píngguǒzhī.	Tôi thích uống nước ép táo.	\N	\N	\N
84638cd8-9948-4a80-a8da-72e8d4f8fb5b	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	1	货	huò	Hàng hóa	这家店的货很好。	Zhè jiā diàn de huò hěn hǎo.	Hàng ở cửa hàng này rất tốt.	\N	\N	\N
cc898e31-4add-473f-bca7-be2b2ee75259	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	2	售货员	shòuhuòyuán	Nhân viên bán hàng	售货员热情地欢迎我。	Shòuhuòyuán rèqíng de huānyíng wǒ.	Nhân viên bán hàng nhiệt tình chào đón tôi.	\N	\N	\N
53b065af-5416-403a-b354-7131e0430a78	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	3	袜子	wàzi	Tất	我买了三双新袜子。	Wǒ mǎile sān shuāng xīn wàzi.	Tôi đã mua ba đôi tất mới.	\N	\N	\N
99eb0547-f6cd-4d39-9b7d-fbab8e5a0e69	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	4	打扰	dǎrǎo	Làm phiền	打扰你一下，可以吗？	Dǎrǎo nǐ yíxià, kěyǐ ma?	Làm phiền bạn một chút được không?	\N	\N	\N
9afab1fa-0ee3-42a9-8f64-5ad901dac032	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	5	不了	bùliǎo	Không thể / không làm được	这个行李箱太重了，我拿不了。	Zhège xínglǐxiāng tài zhòng le, wǒ ná bùliǎo.	Chiếc vali này quá nặng, tôi không thể xách được.	\N	\N	\N
66d2f901-7aab-4ece-aa11-f33493e16406	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	6	竟然	jìngrán	Vậy mà, không ngờ	这么远的路，你竟然骑自行车来的。	Zhème yuǎn de lù, nǐ jìngrán qí zìxíngchē lái de.	Quãng đường xa như vậy mà bạn lại đi bằng xe đạp.	\N	\N	\N
5752dd0c-48bc-48c7-a73f-157043e08d69	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	7	西红柿	xīhóngshì	Cà chua	我买了一些西红柿。	Wǒ mǎile yìxiē xīhóngshì.	Tôi đã mua một ít cà chua.	\N	\N	\N
7a9fb11f-5683-4a9b-b071-4a7be1fb8cc9	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	8	百分之	bǎifēnzhī	Phần trăm	这个产品便宜了百分之二十。	Zhège chǎnpǐn piányi le bǎifēnzhī èrshí.	Sản phẩm này rẻ hơn 20%.	\N	\N	\N
5cc8eb84-7c93-475c-9fdc-03f645c7da99	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	9	倍	bèi	Lần	今天的价格是昨天的两倍。	Jīntiān de jiàgé shì zuótiān de liǎng bèi.	Giá hôm nay gấp đôi hôm qua.	\N	\N	\N
3ef6501d-b93f-457b-b10d-dc6e03ce9d9c	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	10	皮肤	pífū	Da	她的皮肤很好。	Tā de pífū hěn hǎo.	Da của cô ấy rất đẹp.	\N	\N	\N
b52f0e36-e11c-46a9-bb7e-92dd57eed1ec	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	11	好处	hǎochù	Lợi ích	早睡对身体有很多好处。	Zǎo shuì duì shēntǐ yǒu hěn duō hǎochù.	Ngủ sớm có rất nhiều lợi ích cho cơ thể.	\N	\N	\N
68d186b5-c561-4004-aad7-6d3dad2f9772	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	12	坏处	huàichu	Tác hại	吃太多糖有坏处。	Chī tài duō táng yǒu huàichu.	Ăn quá nhiều đường có hại.	\N	\N	\N
a621c19b-765d-4bc8-8c94-d8e9856d61a1	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	13	尝	cháng	Nếm	你尝一尝这个菜。	Nǐ cháng yì cháng zhège cài.	Bạn thử nếm món này xem.	\N	\N	\N
7f283819-7608-4471-aede-b62012a421c3	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	14	轻	qīng	Nhẹ	这个包很轻。	Zhège bāo hěn qīng.	Cái túi này rất nhẹ.	\N	\N	\N
aceac95f-36c4-4273-a2b2-bd069d3adda3	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	15	方面	fāngmiàn	Phương diện	在学习方面她很努力。	Zài xuéxí fāngmiàn tā hěn nǔlì.	Trong việc học cô ấy rất chăm chỉ.	\N	\N	\N
d7c99333-25a6-49d3-a525-4c8438191f5b	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	16	从……方面看	cóng… fāngmiàn kàn	Xét từ phương diện	从价格方面看，这个房子不便宜。	Cóng jiàgé fāngmiàn kàn, zhège fángzi bù piányi.	Xét về giá cả, căn nhà này không rẻ.	\N	\N	\N
72b078ce-1c46-45a2-9c83-9eb750087812	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	17	值得	zhídé	Đáng	这本书值得看。	Zhè běn shū zhídé kàn.	Cuốn sách này đáng đọc.	\N	\N	\N
d2c41ad5-d438-4cc0-a926-86e1ae0d911d	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	18	值	zhí	Đáng giá	这部手机值五十块。	Zhè bù shǒujī zhí wǔshí kuài.	Chiếc điện thoại này đáng giá 50 tệ.	\N	\N	\N
88baf6dc-6e5a-49a1-b4d2-7510dcee1248	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	19	活动	huódòng	Hoạt động	学校今天举行活动。	Xuéxiào jīntiān jǔxíng huódòng.	Hôm nay trường tổ chức hoạt động.	\N	\N	\N
db8b0867-cdd3-4204-8542-1e39ff2e63c6	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	20	内	nèi	Bên trong / trong khoảng	三天内必须完成作业。	Sān tiān nèi bìxū wánchéng zuòyè.	Phải hoàn thành bài tập trong 3 ngày.	\N	\N	\N
c4446f89-4f8b-483f-87b3-3598f079bc80	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	21	免费	miǎnfèi	Miễn phí	这个服务是免费的。	Zhège fúwù shì miǎnfèi de.	Dịch vụ này là miễn phí.	\N	\N	\N
d11e5335-46c1-44c9-8fe1-fd939fce064a	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	22	修理	xiūlǐ	Sửa chữa	我去修理手机。	Wǒ qù xiūlǐ shǒujī.	Tôi đi sửa điện thoại.	\N	\N	\N
751da839-1ba7-40cc-b935-7161812ddcf3	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	23	支持	zhīchí	Ủng hộ	不管怎么样，我都会支持你。	Bùguǎn zěnmeyàng, wǒ dōu huì zhīchí nǐ.	Dù thế nào tôi cũng sẽ ủng hộ bạn.	\N	\N	\N
e609ae3d-d8c2-4397-bf2a-896f0f7398be	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	24	举行	jǔxíng	Tổ chức	学校举行了一场比赛。	Xuéxiào jǔxíngle yì chǎng bǐsài.	Trường đã tổ chức một cuộc thi.	\N	\N	\N
3656b5ca-8042-48b1-9300-d27f174b342f	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	25	举办	jǔbàn	Tổ chức	公司举办了一个活动。	Gōngsī jǔbànle yí gè huódòng.	Công ty tổ chức một sự kiện.	\N	\N	\N
2543fbda-f252-4afc-a629-4a949087a9f6	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	26	满	mǎn	Đầy	杯子满了。	Bēizi mǎn le.	Cốc đầy rồi.	\N	\N	\N
0dd60fe3-1432-443a-ae81-f65d65c1e82a	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	27	满	mǎn	Đạt đủ	满100元可以打折。	Mǎn yìbǎi yuán kěyǐ dǎzhé.	Đủ 100 tệ thì được giảm giá.	\N	\N	\N
6629beef-3281-4a6d-8cd3-c641ea09fa6b	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	28	其中	qízhōng	Trong đó	我喜欢运动，其中最喜欢跑步。	Wǒ xǐhuan yùndòng, qízhōng zuì xǐhuan pǎobù.	Tôi thích vận động, trong đó thích nhất là chạy bộ.	\N	\N	\N
5e9eda9f-2107-445c-a3c5-60003147212e	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	29	在……下	zài… xià	Trong điều kiện	在这种情况下，我们只能等待。	Zài zhè zhǒng qíngkuàng xià, wǒmen zhǐ néng děngdài.	Trong tình huống này, chúng ta chỉ có thể chờ đợi.	\N	\N	\N
90baa39f-0581-4edc-9b5a-4061664528d9	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	30	小说	xiǎoshuō	Tiểu thuyết	我喜欢看小说。	Wǒ xǐhuan kàn xiǎoshuō.	Tôi thích đọc tiểu thuyết.	\N	\N	\N
713317e0-4b00-4942-a997-339fbef7db2d	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	31	会员卡	huìyuánkǎ	Thẻ hội viên	我办了一张会员卡。	Wǒ bànle yì zhāng huìyuánkǎ.	Tôi đã làm một thẻ hội viên.	\N	\N	\N
68cce6fd-d049-4f8a-b26b-60e9573d86c5	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	32	所有	suǒyǒu	Tất cả	所有人都来了。	Suǒyǒu rén dōu lái le.	Tất cả mọi người đều đã đến.	\N	\N	\N
394a0e03-66e9-4df3-b97b-6abbd2d9fbd7	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	33	获得	huòdé	Đạt được	他终于获得了成功。	Tā zhōngyú huòdéle chénggōng.	Cuối cùng anh ấy đã đạt được thành công.	\N	\N	\N
21b67f9d-c127-438b-a5ce-cc14c37db6dc	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	34	情况	qíngkuàng	Tình hình	请告诉我具体情况。	Qǐng gàosu wǒ jùtǐ qíngkuàng.	Hãy nói cho tôi tình hình cụ thể.	\N	\N	\N
89053397-4bbb-49d0-83cc-f3e45baedc4c	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	35	例如	lìrú	Ví dụ	我喜欢水果，例如苹果和香蕉。	Wǒ xǐhuan shuǐguǒ, lìrú píngguǒ hé xiāngjiāo.	Tôi thích trái cây, ví dụ như táo và chuối.	\N	\N	\N
03b73d95-aed8-481b-800e-a36bdbfde134	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	36	各	gè	Các	各国家有不同文化。	Gè guójiā yǒu bùtóng wénhuà.	Các quốc gia có văn hóa khác nhau.	\N	\N	\N
68aa83e8-421b-4b60-a8c0-2cde250d02bc	9946945d-d2d5-4fc1-b6a9-1c4f5cfc7ab5	37	降低	jiàngdī	Giảm	公司需要降低成本。	Gōngsī xūyào jiàngdī chéngběn.	Công ty cần giảm chi phí.	\N	\N	\N
517e579d-c78f-4d0d-86e9-1b507ab8f19a	98997a9b-854c-44b5-8ac5-b8b93bb173bc	0	流血	liúxiě	Chảy máu	你快看看，他的鼻子在流血！	Nǐ kuài kànkan, tā de bízi zài liúxiě!	Mau xem đi, mũi của anh ấy đang chảy máu!	\N	\N	\N
6dc44910-53aa-4dc0-9dd8-d40e32136185	98997a9b-854c-44b5-8ac5-b8b93bb173bc	1	窗户	chuānghu	Cửa sổ	请把窗户打开。	Qǐng bǎ chuānghu dǎkāi.	Hãy mở cửa sổ ra.	\N	\N	\N
1b509352-f879-4981-b9e9-544b115c1422	98997a9b-854c-44b5-8ac5-b8b93bb173bc	2	擦	cā	Lau, chùi	妈妈在擦桌子。	Māma zài cā zhuōzi.	Mẹ đang lau bàn.	\N	\N	\N
7f953a3d-734f-4616-b192-b64b132912a9	98997a9b-854c-44b5-8ac5-b8b93bb173bc	3	气候	qìhòu	Khí hậu	这里的气候很热。	Zhèlǐ de qìhòu hěn rè.	Khí hậu ở đây rất nóng.	\N	\N	\N
397a595a-c8eb-43df-922b-5f3d5298ed30	98997a9b-854c-44b5-8ac5-b8b93bb173bc	4	估计	gūjì	Dự đoán	我估计他明天会来。	Wǒ gūjì tā míngtiān huì lái.	Tôi đoán ngày mai anh ấy sẽ đến.	\N	\N	\N
143483ba-a803-45e9-8eee-1d0a34868e92	98997a9b-854c-44b5-8ac5-b8b93bb173bc	5	咳嗽	késou	Ho	他感冒了，咳嗽得说不了话。	Tā gǎnmào le, késou de shuō bùliǎo huà.	Anh ấy bị cảm, ho đến mức không nói được.	\N	\N	\N
a373a91e-a0fd-4616-9a98-214acc534902	98997a9b-854c-44b5-8ac5-b8b93bb173bc	6	严重	yánzhòng	Nghiêm trọng	他的病情非常严重。	Tā de bìngqíng fēicháng yánzhòng.	Tình trạng bệnh của anh ấy rất nghiêm trọng.	\N	\N	\N
567a4c1b-6ae5-4328-936a-9927a8b92348	98997a9b-854c-44b5-8ac5-b8b93bb173bc	7	空气	kōngqì	Không khí	公园里的空气很新鲜。	Gōngyuán lǐ de kōngqì hěn xīnxiān.	Không khí trong công viên rất trong lành.	\N	\N	\N
b6205bb9-8f1c-4af8-8a43-971e484d699e	98997a9b-854c-44b5-8ac5-b8b93bb173bc	8	抽烟	chōu yān	Hút thuốc	抽烟是个不好的习惯。	Chōuyān shì gè bù hǎo de xíguàn.	Hút thuốc là một thói quen không tốt.	\N	\N	\N
7858a116-e3d7-4fff-bf4b-67044b0a6c9b	98997a9b-854c-44b5-8ac5-b8b93bb173bc	9	动作	dòngzuò	Động tác	他的动作很慢。	Tā de dòngzuò hěn màn.	Động tác của anh ấy rất chậm.	\N	\N	\N
45935f57-9a6f-4d77-b515-e0dc36334911	98997a9b-854c-44b5-8ac5-b8b93bb173bc	10	帅	shuài	Đẹp trai	他长得很帅。	Tā zhǎng de hěn shuài.	Anh ấy rất đẹp trai.	\N	\N	\N
05c32978-05e8-49cb-9534-5de9b5980faf	98997a9b-854c-44b5-8ac5-b8b93bb173bc	11	出现	chūxiàn	Xuất hiện	他终于出现了。	Tā zhōngyú chūxiàn le.	Cuối cùng anh ấy cũng xuất hiện.	\N	\N	\N
a6698656-2832-4009-b51d-8df7df6a7e52	98997a9b-854c-44b5-8ac5-b8b93bb173bc	12	后悔	hòuhuǐ	Hối hận	我很后悔当时没有努力学习。	Wǒ hěn hòuhuǐ dāngshí méiyǒu nǔlì xuéxí.	Tôi rất hối hận vì lúc đó không học chăm chỉ.	\N	\N	\N
76d50142-cb88-401a-80b4-3421cd77b009	98997a9b-854c-44b5-8ac5-b8b93bb173bc	13	来不及	láibují	Không kịp	火车马上开了，我来不及了。	Huǒchē mǎshàng kāi le, wǒ láibují le.	Tàu sắp chạy rồi, tôi không kịp nữa.	\N	\N	\N
787366f4-1c3b-4333-aae3-f2302ef10ad1	98997a9b-854c-44b5-8ac5-b8b93bb173bc	14	来得及	láidejí	Kịp	现在出发还来得及。	Xiànzài chūfā hái láidejí.	Bây giờ xuất phát vẫn còn kịp.	\N	\N	\N
69854516-759d-4626-a4f7-8cf2d2ad11a3	98997a9b-854c-44b5-8ac5-b8b93bb173bc	15	反对	fǎnduì	Phản đối	没有人反对这个决定。	Méiyǒu rén fǎnduì zhège juédìng.	Không ai phản đối quyết định này.	\N	\N	\N
f709ee89-f377-4ae1-967b-bfdff6fe8d53	98997a9b-854c-44b5-8ac5-b8b93bb173bc	16	大夫	dàifu	Bác sĩ	我去医院看大夫。	Wǒ qù yīyuàn kàn dàifu.	Tôi đến bệnh viện khám bác sĩ.	\N	\N	\N
6ecaf8d2-c98b-4391-a23b-b5c20eb01d13	98997a9b-854c-44b5-8ac5-b8b93bb173bc	17	植物	zhíwù	Thực vật	公园里有很多植物。	Gōngyuán lǐ yǒu hěn duō zhíwù.	Trong công viên có rất nhiều thực vật.	\N	\N	\N
147fd41e-72d3-4e85-b04e-a6b6f744bacb	98997a9b-854c-44b5-8ac5-b8b93bb173bc	18	研究	yánjiū	Nghiên cứu	他在研究中国历史。	Tā zài yánjiū Zhōngguó lìshǐ.	Anh ấy đang nghiên cứu lịch sử Trung Quốc.	\N	\N	\N
42a5b64d-0fae-4c43-bf75-675a745aba1a	98997a9b-854c-44b5-8ac5-b8b93bb173bc	19	超过	chāoguò	Vượt quá	这个速度已经超过规定了。	Zhège sùdù yǐjīng chāoguò guīdìng le.	Tốc độ này đã vượt quá quy định.	\N	\N	\N
d0da16bc-7636-4bc9-8c6c-c7e52d6b9bf1	98997a9b-854c-44b5-8ac5-b8b93bb173bc	20	散步	sàn bù	Đi dạo	我喜欢晚上散步。	Wǒ xǐhuan wǎnshang sànbù.	Tôi thích đi dạo buổi tối.	\N	\N	\N
61bc54e7-e097-4abe-b2be-bb979c25d63e	98997a9b-854c-44b5-8ac5-b8b93bb173bc	21	指	zhǐ	Chỉ, nói đến	我不是指你说的。	Wǒ bú shì zhǐ nǐ shuō de.	Tôi không phải đang nói đến bạn.	\N	\N	\N
4c157b3b-322f-46a3-8ede-ebcf7dcddbd2	98997a9b-854c-44b5-8ac5-b8b93bb173bc	22	精神	jīngshén	Tinh thần	他今天看起来很有精神。	Tā jīntiān kàn qǐlái hěn yǒu jīngshén.	Hôm nay trông anh ấy rất có tinh thần.	\N	\N	\N
82ac13a5-da73-4546-ab93-d4007c4beaf7	98997a9b-854c-44b5-8ac5-b8b93bb173bc	23	教授	jiàoshòu	Giáo sư	他是一位著名的教授。	Tā shì yí wèi zhùmíng de jiàoshòu.	Ông ấy là một giáo sư nổi tiếng.	\N	\N	\N
dbcdc382-abc6-462d-b184-41f86b80b061	98997a9b-854c-44b5-8ac5-b8b93bb173bc	24	数字	shùzì	Con số	我一看到数字就头疼。	Wǒ yí kàndào shùzì jiù tóuténg.	Hễ nhìn thấy con số là tôi đau đầu.	\N	\N	\N
d09d2678-28d4-4bfc-aae3-8bc9209b40fd	98997a9b-854c-44b5-8ac5-b8b93bb173bc	25	说明	shuōmíng	Giải thích, cho thấy	这说明他很努力。	Zhè shuōmíng tā hěn nǔlì.	Điều này cho thấy anh ấy rất cố gắng.	\N	\N	\N
b961bd10-1322-4df2-a85b-e71b2b9eb226	98997a9b-854c-44b5-8ac5-b8b93bb173bc	26	要是	yàoshi	Nếu	要是下雨，我们就不去。	Yàoshi xiàyǔ, wǒmen jiù bú qù.	Nếu trời mưa, chúng ta sẽ không đi.	\N	\N	\N
56a423da-8fb3-44b0-8d6f-7c5893e79a15	98997a9b-854c-44b5-8ac5-b8b93bb173bc	27	既	jì	Vừa... vừa...	他既聪明又勤奋。	Tā jì cōngmíng yòu qínfèn.	Anh ấy vừa thông minh vừa chăm chỉ.	\N	\N	\N
3ea33ee5-30ae-42fc-bf51-5c1496544316	98997a9b-854c-44b5-8ac5-b8b93bb173bc	28	减肥	jiǎn féi	Giảm cân	她正在减肥。	Tā zhèngzài jiǎnféi.	Cô ấy đang giảm cân.	\N	\N	\N
521b0808-a6e1-45e5-88fd-7040d989be0e	98997a9b-854c-44b5-8ac5-b8b93bb173bc	29	辛苦	xīnkǔ	Vất vả	他工作很辛苦。	Tā gōngzuò hěn xīnkǔ.	Anh ấy làm việc rất vất vả.	\N	\N	\N
33281a27-1bec-4b05-aa11-c328d12c5827	98997a9b-854c-44b5-8ac5-b8b93bb173bc	30	肚子	dùzi	Bụng	我肚子有点儿疼。	Wǒ dùzi yǒudiǎnr téng.	Tôi hơi đau bụng.	\N	\N	\N
1218cb09-19fe-4bc2-81de-cec2c062db9c	98997a9b-854c-44b5-8ac5-b8b93bb173bc	31	感情	gǎnqíng	Tình cảm	他们的感情很好。	Tāmen de gǎnqíng hěn hǎo.	Tình cảm của họ rất tốt.	\N	\N	\N
d416dfad-7ace-48b9-a33b-22d4b9deece2	98997a9b-854c-44b5-8ac5-b8b93bb173bc	32	烦恼	fánnǎo	Buồn phiền	他最近很烦恼。	Tā zuìjìn hěn fánnǎo.	Gần đây anh ấy rất phiền muộn.	\N	\N	\N
9235f240-a9f0-4ef6-a7f5-efa1aef874ca	98997a9b-854c-44b5-8ac5-b8b93bb173bc	33	掉	diào	Mất, rơi, hết	他把水都喝掉了。	Tā bǎ shuǐ dōu hēdiào le.	Anh ấy đã uống hết nước rồi.	\N	\N	\N
ce083142-d7c7-4b17-8d9c-d8b0dbdb945f	ccabd9d3-e17b-4f42-b129-5353e8ce5393	0	巧克力	qiǎokèlì	Sô-cô-la	我给朋友买了一盒巧克力。	Wǒ gěi péngyou mǎile yì hé qiǎokèlì.	Tôi đã mua một hộp sô-cô-la cho bạn.	\N	\N	\N
0cf81b0a-8cd2-4c84-a513-8649381bb056	ccabd9d3-e17b-4f42-b129-5353e8ce5393	1	亲戚	qīnqi	Họ hàng	春节很多亲戚来我们家。	Chūnjié hěn duō qīnqi lái wǒmen jiā.	Tết có rất nhiều họ hàng đến nhà chúng tôi.	\N	\N	\N
7c4c5bbb-5279-4a51-a9de-67f014edc9ac	ccabd9d3-e17b-4f42-b129-5353e8ce5393	2	走亲戚	zǒu qīnqi	Thăm họ hàng	春节我们去走亲戚。	Chūnjié wǒmen qù zǒu qīnqi.	Tết chúng tôi đi thăm họ hàng.	\N	\N	\N
edc3ed61-5441-43b0-adfd-0e8f4a3f7a19	ccabd9d3-e17b-4f42-b129-5353e8ce5393	3	伤心	shāngxīn	Đau lòng	听到这个消息，她非常伤心。	Tīngdào zhège xiāoxi, tā fēicháng shāngxīn.	Nghe tin này, cô ấy rất buồn.	\N	\N	\N
bb62ae68-6eec-4ff8-8dc9-9eac6099039a	ccabd9d3-e17b-4f42-b129-5353e8ce5393	4	愉快	yúkuài	Vui vẻ	听音乐让我感到很愉快。	Tīng yīnyuè ràng wǒ gǎndào hěn yúkuài.	Nghe nhạc khiến tôi cảm thấy rất vui.	\N	\N	\N
f9d586e5-817f-42a8-a391-516970cee83c	ccabd9d3-e17b-4f42-b129-5353e8ce5393	5	心情	xīnqíng	Tâm trạng	今天我的心情不错。	Jīntiān wǒ de xīnqíng búcuò.	Hôm nay tâm trạng của tôi khá tốt.	\N	\N	\N
439036e3-d8fc-44cb-bfd0-5a3ce8ea2bfc	ccabd9d3-e17b-4f42-b129-5353e8ce5393	6	使	shǐ	Khiến	音乐使我放松。	Yīnyuè shǐ wǒ fàngsōng.	Âm nhạc khiến tôi thư giãn.	\N	\N	\N
76a67c8b-2c25-4a2d-8d39-c3b6822e839d	ccabd9d3-e17b-4f42-b129-5353e8ce5393	7	景色	jǐngsè	Phong cảnh	山上的景色很漂亮。	Shānshàng de jǐngsè hěn piàoliang.	Phong cảnh trên núi rất đẹp.	\N	\N	\N
fcbf6ae6-a8f9-4460-8b4f-89cff5f16fc5	ccabd9d3-e17b-4f42-b129-5353e8ce5393	8	压力	yālì	Áp lực	我最近工作很忙，压力很大。	Wǒ zuìjìn gōngzuò hěn máng, yālì hěn dà.	Gần đây tôi rất bận, áp lực rất lớn.	\N	\N	\N
2f338df8-4a08-46f4-9b5a-12f7847ae4c8	ccabd9d3-e17b-4f42-b129-5353e8ce5393	9	放松	fàngsōng	Thư giãn	周末我想在家放松。	Zhōumò wǒ xiǎng zài jiā fàngsōng.	Cuối tuần tôi muốn thư giãn ở nhà.	\N	\N	\N
fe7b4d30-16a5-4d89-8ddf-cd979cc23bcb	ccabd9d3-e17b-4f42-b129-5353e8ce5393	10	回忆	huíyì	Kỷ niệm / Hồi tưởng	这是我美好的回忆。我常回忆起小时候的事情。	Zhè shì wǒ měihǎo de huíyì. Wǒ cháng huíyì qǐ xiǎoshíhou de shìqíng.	Đây là ký ức đẹp của tôi. Tôi thường nhớ lại chuyện hồi nhỏ.	\N	\N	\N
de868fd9-ff0a-4dcc-b245-d24212a4473a	ccabd9d3-e17b-4f42-b129-5353e8ce5393	11	发生	fāshēng	Xảy ra	这件事发生得太突然了。	Zhè jiàn shì fāshēng de tài tūrán le.	Chuyện này xảy ra quá đột ngột.	\N	\N	\N
bd4655d2-3619-4d67-a539-178a3bd9a958	ccabd9d3-e17b-4f42-b129-5353e8ce5393	12	成为	chéngwéi	Trở thành	他成为了一名老师。	Tā chéngwéi le yì míng lǎoshī.	Anh ấy đã trở thành một giáo viên.	\N	\N	\N
ab18eddb-d08a-47c3-afac-f8b2241bdeb4	ccabd9d3-e17b-4f42-b129-5353e8ce5393	13	只要	zhǐyào	Chỉ cần	只要努力，就会成功。	Zhǐyào nǔlì, jiù huì chénggōng.	Chỉ cần cố gắng thì sẽ thành công.	\N	\N	\N
5b6cb26f-3750-4cbe-a242-da8fda9490d2	ccabd9d3-e17b-4f42-b129-5353e8ce5393	14	师傅 / 师父	shīfu	Thợ / sư phụ	师傅，请问这车多少钱修？	Shīfu, qǐngwèn zhè chē duōshao qián xiū?	Bác thợ ơi, sửa xe này bao nhiêu tiền?	\N	\N	\N
e7d5f8be-4ec1-4e3d-be7f-ad8bd4d19fbe	ccabd9d3-e17b-4f42-b129-5353e8ce5393	15	大使馆	dàshǐguǎn	Đại sứ quán	我要去大使馆办签证。	Wǒ yào qù dàshǐguǎn bàn qiānzhèng.	Tôi muốn đến đại sứ quán làm visa.	\N	\N	\N
6dcd03e3-3ded-4b3a-8e61-0429b7ab0de1	ccabd9d3-e17b-4f42-b129-5353e8ce5393	16	堵车	dǔchē	Tắc đường	今天上班路上堵车了。	Jīntiān shàngbān lùshang dǔchē le.	Hôm nay đi làm bị tắc đường.	\N	\N	\N
5f318135-bce0-4f00-a994-0dcea59b1685	ccabd9d3-e17b-4f42-b129-5353e8ce5393	17	距离	jùlí	Khoảng cách	我家和公司距离很近。	Wǒ jiā hé gōngsī jùlí hěn jìn.	Nhà tôi và công ty rất gần.	\N	\N	\N
f8a22cc7-0ddf-4c75-afb5-f7452ccb9c38	ccabd9d3-e17b-4f42-b129-5353e8ce5393	18	耐心	nàixīn	Kiên nhẫn / Sự kiên nhẫn	他对孩子很有耐心。他耐心地回答了问题。	Tā duì háizi hěn yǒu nàixīn. Tā nàixīn de huídá le wèntí.	Anh ấy rất kiên nhẫn với trẻ em. Anh ấy kiên nhẫn trả lời câu hỏi.	\N	\N	\N
fc4fa179-52c8-4a45-a8c6-fb61e104bc49	ccabd9d3-e17b-4f42-b129-5353e8ce5393	19	生命	shēngmìng	Sinh mạng	生命比金钱更重要。	Shēngmìng bǐ jīnqián gèng zhòngyào.	Sinh mạng quan trọng hơn tiền bạc.	\N	\N	\N
cddb30eb-7bcd-4223-af94-8f0130cd44ac	ccabd9d3-e17b-4f42-b129-5353e8ce5393	20	缺少	quēshǎo	Thiếu	他缺少经验。	Tā quēshǎo jīngyàn.	Anh ấy thiếu kinh nghiệm.	\N	\N	\N
4620ea44-1940-4b79-af7d-307ff2a5f021	ccabd9d3-e17b-4f42-b129-5353e8ce5393	21	到处	dàochù	Khắp nơi	公园里到处都是花。	Gōngyuán lǐ dàochù dōu shì huā.	Trong công viên đâu đâu cũng có hoa.	\N	\N	\N
77058518-8af2-4f4c-90a3-0925fca26f53	ccabd9d3-e17b-4f42-b129-5353e8ce5393	22	态度	tàidù	Thái độ	我喜欢她的工作态度。	Wǒ xǐhuan tā de gōngzuò tàidù.	Tôi thích thái độ làm việc của cô ấy.	\N	\N	\N
bfc27a1d-db45-4cea-81f3-2f8d6ca09d23	ccabd9d3-e17b-4f42-b129-5353e8ce5393	23	无法	wúfǎ	Không thể	我们无法解决这个问题。	Wǒmen wúfǎ jiějué zhège wèntí.	Chúng tôi không thể giải quyết vấn đề này.	\N	\N	\N
5baa01c4-6914-441d-a125-83eab1bdc36e	ccabd9d3-e17b-4f42-b129-5353e8ce5393	24	由于……因此	yóuyú… yīncǐ…	Bởi vì… nên…	由于天气不好，因此我们取消了活动。	Yóuyú tiānqì bù hǎo, yīncǐ wǒmen qǔxiāo le huódòng.	Vì thời tiết xấu nên chúng tôi hủy hoạt động.	\N	\N	\N
b59f2820-3317-48ed-9ba9-ff7572a36f89	ccabd9d3-e17b-4f42-b129-5353e8ce5393	25	科学	kēxué	Khoa học	他喜欢研究科学。	Tā xǐhuan yánjiū kēxué.	Anh ấy thích nghiên cứu khoa học.	\N	\N	\N
439a6766-1656-4c52-a26d-551c9b0352cf	ccabd9d3-e17b-4f42-b129-5353e8ce5393	26	证明	zhèngmíng	Chứng minh	他证明了自己的能力。	Tā zhèngmíng le zìjǐ de nénglì.	Anh ấy đã chứng minh năng lực của mình.	\N	\N	\N
7a939a91-8d9a-4bc6-886d-c58167367b95	ccabd9d3-e17b-4f42-b129-5353e8ce5393	27	往往	wǎngwǎng	Thường thường	有经验的人往往更容易成功。	Yǒu jīngyàn de rén wǎngwǎng gèng róngyì chénggōng.	Người có kinh nghiệm thường dễ thành công hơn.	\N	\N	\N
6fa6988b-94a6-4c64-9831-b01b02d07d35	ccabd9d3-e17b-4f42-b129-5353e8ce5393	28	阳光	yángguāng	Ánh nắng / tích cực	他是一个很阳光的人。	Tā shì yí gè hěn yángguāng de rén.	Anh ấy là một người rất tích cực.	\N	\N	\N
38a5eb1d-5496-40d8-b633-a57457ab767d	ccabd9d3-e17b-4f42-b129-5353e8ce5393	29	积极	jījí	Tích cực	他对生活很积极。	Tā duì shēnghuó hěn jījí.	Anh ấy rất tích cực với cuộc sống.	\N	\N	\N
f3e5d5c7-7ec9-4d89-adb5-0aafc2677f24	ccabd9d3-e17b-4f42-b129-5353e8ce5393	30	特点	tèdiǎn	Đặc điểm	他的最大特点是很开朗。	Tā de zuìdà tèdiǎn shì hěn kāilǎng.	Đặc điểm lớn nhất của anh ấy là rất cởi mở.	\N	\N	\N
fe780b2b-488f-442d-84f3-54e334012e2c	ccabd9d3-e17b-4f42-b129-5353e8ce5393	31	得到	dédào	Nhận được	他得到了大家的帮助。	Tā dédào le dàjiā de bāngzhù.	Anh ấy nhận được sự giúp đỡ của mọi người.	\N	\N	\N
ac9381fc-1cda-4e6e-bb1b-2ff70d483dea	47f278a6-c022-48e0-902e-b3e6f9eaae2c	0	饼干	bǐnggān	Bánh quy	学习累了的时候，我会吃一点饼干休息一下。	Xuéxí lèi le de shíhou, wǒ huì chī yìdiǎn bǐnggān xiūxi yíxià.	Khi học mệt, tôi sẽ ăn một ít bánh quy để nghỉ ngơi.	\N	\N	\N
be881c23-b62f-49c1-8d88-dcc7bc5057e6	47f278a6-c022-48e0-902e-b3e6f9eaae2c	1	难道	nándào	(Câu hỏi tu từ) chẳng lẽ	难道你已经忘了我们昨天说的话吗？	Nándào nǐ yǐjīng wàngle wǒmen zuótiān shuō de huà ma?	Chẳng lẽ bạn đã quên những gì chúng ta nói hôm qua rồi sao?	\N	\N	\N
9fdd87cb-2569-4a15-8a2f-339a3ee8c93a	47f278a6-c022-48e0-902e-b3e6f9eaae2c	2	得	děi	Phải	如果想通过考试，就得每天复习。	Rúguǒ xiǎng tōngguò kǎoshì, jiù děi měitiān fùxí.	Nếu muốn thi đỗ thì phải ôn tập mỗi ngày.	\N	\N	\N
2901bd0a-461e-47fb-9c39-22aec817b478	47f278a6-c022-48e0-902e-b3e6f9eaae2c	3	得奖	déjiǎng	Đoạt giải	他在比赛中得奖了。	Tā zài bǐsài zhōng déjiǎng le.	Anh ấy đã đoạt giải trong cuộc thi.	\N	\N	\N
c9f146fa-ff11-4f22-aa6f-2b7f5fb8ed52	47f278a6-c022-48e0-902e-b3e6f9eaae2c	4	坚持	jiānchí	Kiên trì	他坚持下来，终于成功了。	Tā jiānchí xiàlái, zhōngyú chénggōng le.	Anh ấy kiên trì và cuối cùng đã thành công.	\N	\N	\N
5e4f9d20-c0b3-49be-8645-2b32a7b83449	47f278a6-c022-48e0-902e-b3e6f9eaae2c	5	放弃	fàngqì	Từ bỏ	你不要放弃这么好的机会。	Nǐ búyào fàngqì zhème hǎo de jīhuì.	Bạn đừng từ bỏ cơ hội tốt như vậy.	\N	\N	\N
aef5878b-efa8-4823-9178-43e686092aa9	47f278a6-c022-48e0-902e-b3e6f9eaae2c	6	主意	zhǔyì	Ý kiến, ý tưởng	这个主意很好。	Zhège zhǔyì hěn hǎo.	Ý tưởng này rất hay.	\N	\N	\N
6ecf40dc-f0d9-4aa1-b52f-18d30a295dc5	47f278a6-c022-48e0-902e-b3e6f9eaae2c	7	网球	wǎngqiú	Quần vợt	周末我常跟朋友一起打网球。	Zhōumò wǒ cháng gēn péngyou yìqǐ dǎ wǎngqiú.	Cuối tuần tôi thường chơi tennis với bạn.	\N	\N	\N
f9862afd-4ce6-43c8-b7c2-bc5008cb2308	47f278a6-c022-48e0-902e-b3e6f9eaae2c	8	国际	guójì	Quốc tế	她将来想参加国际比赛。	Tā jiānglái xiǎng cānjiā guójì bǐsài.	Cô ấy muốn tham gia thi đấu quốc tế trong tương lai.	\N	\N	\N
46dbd99e-e8d8-4cfe-8a17-839340aad026	47f278a6-c022-48e0-902e-b3e6f9eaae2c	9	轻松	qīngsōng	Thoải mái	考试结束后，我感觉轻松多了。	Kǎoshì jiésh束 hòu, wǒ gǎnjué qīngsōng duō le.	Sau khi thi xong, tôi cảm thấy nhẹ nhõm hơn nhiều.	\N	\N	\N
d67e9a7c-7a35-4e8f-b1e5-5404985ba4c3	47f278a6-c022-48e0-902e-b3e6f9eaae2c	10	赢	yíng	Thắng	我们队赢了比赛。	Wǒmen duì yíngle bǐsài.	Đội chúng tôi đã thắng trận.	\N	\N	\N
13a4c4f9-2cf0-4fd6-b05f-3d0019fa569a	47f278a6-c022-48e0-902e-b3e6f9eaae2c	11	输	shū	Thua	他们输了比赛。	Tāmen shūle bǐsài.	Họ đã thua trận.	\N	\N	\N
9c0927c5-0c76-4157-94cf-5d6a2b468881	47f278a6-c022-48e0-902e-b3e6f9eaae2c	12	随便	suíbiàn	Tùy ý	这件事你随便决定就行。	Zhè jiàn shì nǐ suíbiàn juédìng jiù xíng.	Việc này bạn quyết định tùy ý là được.	\N	\N	\N
4d226fab-55b3-4615-93ec-bbc3c40731ca	47f278a6-c022-48e0-902e-b3e6f9eaae2c	13	汗	hàn	Mồ hôi	夏天运动的时候，很容易出汗。	Xiàtiān yùndòng de shíhou, hěn róngyì chū hàn.	Khi vận động vào mùa hè rất dễ ra mồ hôi.	\N	\N	\N
2312973c-3c1f-4876-b00c-f64c182fb05d	47f278a6-c022-48e0-902e-b3e6f9eaae2c	14	通过	tōngguò	Thông qua / vượt qua	他通过努力实现了自己的理想。	Tā tōngguò nǔlì shíxiànle zìjǐ de lǐxiǎng.	Anh ấy đã đạt được lý tưởng nhờ nỗ lực.	\N	\N	\N
12cdd127-5f19-401e-9f92-b0c58d112303	47f278a6-c022-48e0-902e-b3e6f9eaae2c	15	篇	piān	Bài (lượng từ)	老师让我们写一篇作文。	Lǎoshī ràng wǒmen xiě yì piān zuòwén.	Giáo viên yêu cầu chúng tôi viết một bài văn.	\N	\N	\N
fe926e82-4e2d-4447-b578-a7f350e73fe9	47f278a6-c022-48e0-902e-b3e6f9eaae2c	16	作家	zuòjiā	Nhà văn	他从小就想成为一名作家。	Tā cóngxiǎo jiù xiǎng chéngwéi yì míng zuòjiā.	Anh ấy từ nhỏ đã muốn trở thành nhà văn.	\N	\N	\N
d2facaac-92dc-4428-84ce-64402bd23a54	47f278a6-c022-48e0-902e-b3e6f9eaae2c	17	当时	dāngshí	Lúc đó	当时我太紧张了，说不出话来。	Dāngshí wǒ tài jǐnzhāng le, shuō bu chū huà lái.	Lúc đó tôi quá căng thẳng nên không nói được.	\N	\N	\N
35500345-4de0-4018-8908-fcbe90e248c0	47f278a6-c022-48e0-902e-b3e6f9eaae2c	18	可是	kěshì	Nhưng	我很想去旅行，可是没有时间。	Wǒ hěn xiǎng qù lǚxíng, kěshì méiyǒu shíjiān.	Tôi rất muốn đi du lịch nhưng không có thời gian.	\N	\N	\N
1911fbf7-ba85-4930-bc68-df7d15ed648e	47f278a6-c022-48e0-902e-b3e6f9eaae2c	19	正确	zhèngquè	Đúng đắn	只要方法正确，就能解决问题。	Zhǐyào fāngfǎ zhèngquè, jiù néng jiějué wèntí.	Chỉ cần phương pháp đúng thì có thể giải quyết vấn đề.	\N	\N	\N
c4294114-c953-450c-9b79-2685b88bfd35	47f278a6-c022-48e0-902e-b3e6f9eaae2c	20	理想	lǐxiǎng	Lý tưởng (Danh từ / Tính từ)	我的理想是当一名医生。我找到了一份理想的工作。	Wǒ de lǐxiǎng shì dāng yì míng yīshēng. Wǒ zhǎodàole yí fèn lǐxiǎng de gōngzuò.	Lý tưởng của tôi là trở thành bác sĩ. Tôi đã tìm được một công việc lý tưởng.	\N	\N	\N
3153be60-d685-4109-aa01-962604438bd2	47f278a6-c022-48e0-902e-b3e6f9eaae2c	21	勇敢	yǒnggǎn	Dũng cảm	如果你想做什么，就勇敢地去做。	Rúguǒ nǐ xiǎng zuò shénme, jiù yǒnggǎn de qù zuò.	Nếu bạn muốn làm gì thì hãy dũng cảm làm.	\N	\N	\N
77c9585a-c92b-4287-ac8e-c823bffcddbc	47f278a6-c022-48e0-902e-b3e6f9eaae2c	22	结果	jiéguǒ	Kết quả	考试结果很好。	Kǎoshì jiéguǒ hěn hǎo.	Kết quả thi rất tốt.	\N	\N	\N
5160f5ab-b73a-4961-9507-fed825f76d65	47f278a6-c022-48e0-902e-b3e6f9eaae2c	23	失败	shībài	Thất bại	即使失败了，也不要放弃。	Jíshǐ shībài le, yě búyào fàngqì.	Dù thất bại cũng đừng bỏ cuộc.	\N	\N	\N
90c77c9f-1bb6-48fb-93b8-1c696b00e19a	47f278a6-c022-48e0-902e-b3e6f9eaae2c	24	过程	guòchéng	Quá trình	学习语言是一个长期的过程。	Xuéxí yǔyán shì yí gè chángqī de guòchéng.	Học ngôn ngữ là một quá trình lâu dài.	\N	\N	\N
2322a163-0f75-4efe-842d-b4dcdef2561d	47f278a6-c022-48e0-902e-b3e6f9eaae2c	25	至少	zhìshǎo	Ít nhất	每天至少要学习一个小时。	Měitiān zhìshǎo yào xuéxí yì xiǎoshí.	Mỗi ngày ít nhất phải học một tiếng.	\N	\N	\N
2e3c05c7-eae5-456c-a635-a75aadaad6bf	47f278a6-c022-48e0-902e-b3e6f9eaae2c	26	总结	zǒngjié	Tổng kết	考试后要认真总结经验。	Kǎoshì hòu yào rènzhēn zǒngjié jīngyàn.	Sau khi thi phải nghiêm túc tổng kết kinh nghiệm.	\N	\N	\N
a49511b2-7d91-4c43-ab36-114765756128	47f278a6-c022-48e0-902e-b3e6f9eaae2c	27	取	qǔ	Đạt được / lấy	他取得了好成绩。	Tā qǔdé le hǎo chéngjì.	Anh ấy đã đạt được thành tích tốt.	\N	\N	\N
36c4380f-5b89-4105-b6e1-68b11f499ac5	47f278a6-c022-48e0-902e-b3e6f9eaae2c	28	经历	jīnglì	Trải qua / Trải nghiệm	这次经历让他成长了很多。	Zhè cì jīnglì ràng tā chéngzhǎng le hěn duō.	Trải nghiệm này giúp anh ấy trưởng thành hơn nhiều.	\N	\N	\N
d277ded8-2681-49f2-91a0-b24cfbbcfa3c	47f278a6-c022-48e0-902e-b3e6f9eaae2c	29	许多	xǔduō	Nhiều	生活中会遇到许多问题。	Shēnghuó zhōng huì yùdào xǔduō wèntí.	Trong cuộc sống sẽ gặp nhiều vấn đề.	\N	\N	\N
8eac6ace-4597-4b6e-83e2-1a2c3d6990c8	47f278a6-c022-48e0-902e-b3e6f9eaae2c	30	区别	qūbié	Sự khác biệt	这两个词在用法上有区别。	Zhè liǎng gè cí zài yòngfǎ shang yǒu qūbié.	Hai từ này có sự khác nhau về cách dùng.	\N	\N	\N
fb3c0928-85c0-4949-93f0-73a7d40d8552	47f278a6-c022-48e0-902e-b3e6f9eaae2c	31	暂时	zànshí	Tạm thời	我暂时不打算换工作。	Wǒ zànshí bù dǎsuàn huàn gōngzuò.	Tôi tạm thời chưa định đổi việc.	\N	\N	\N
c585ed6e-b7d6-4da0-8b12-ca78cc994bbc	47f278a6-c022-48e0-902e-b3e6f9eaae2c	32	面对	miànduì	Đối mặt	面对困难时，我们要冷静。	Miànduì kùnnan shí, wǒmen yào lěngjìng.	Khi đối mặt khó khăn, chúng ta phải bình tĩnh.	\N	\N	\N
a92734ac-687a-4d04-8e57-0e5ce2f2c0b8	47f278a6-c022-48e0-902e-b3e6f9eaae2c	33	之前	zhīqián	Trước	我们之前见过面。	Wǒmen zhīqián jiàn guò miàn.	Chúng ta đã gặp nhau trước đây.	\N	\N	\N
a71f9b32-b4cb-4b3f-98b9-9810d29f813c	47f278a6-c022-48e0-902e-b3e6f9eaae2c	34	之后	zhīhòu	Sau	下课之后我们去吃饭。	Xiàkè zhīhòu wǒmen qù chīfàn.	Sau giờ học chúng ta đi ăn.	\N	\N	\N
fad1c0c8-4af8-49f7-bf1f-664c043a4fe0	47f278a6-c022-48e0-902e-b3e6f9eaae2c	35	之间	zhījiān	Giữa	我们之间没有问题。	Wǒmen zhījiān méiyǒu wèntí.	Giữa chúng ta không có vấn đề gì.	\N	\N	\N
5beaccee-6773-4be9-8686-4aca4a2ba5f2	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	0	细节	xìjié	Chi tiết	这本书描写了很多爱的细节。	Zhè běn shū miáoxiě le hěn duō ài de xìjié.	Cuốn sách này miêu tả rất nhiều chi tiết của tình yêu.	\N	\N	\N
39ede549-5495-4a02-9f1a-8b1353edf8dc	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	1	电台	diàntái	Đài phát thanh	电台正在举办一个活动。	Diàntái zhèngzài jǔbàn yí gè huódòng.	Đài phát thanh đang tổ chức một sự kiện.	\N	\N	\N
f0b0c758-73f8-42c4-9986-3e1b5a9c86c0	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	2	恩爱	ēn'ài	Ân ái, đằm thắm	他们是一对恩爱夫妻。	Tāmen shì yí duì ēn'ài fūqī.	Họ là một cặp vợ chồng ân ái.	\N	\N	\N
18e46be9-a998-4616-bf18-013abdcea640	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	3	对比	duìbǐ	So sánh	对比之后，我们做出了决定。	Duìbǐ zhīhòu, wǒmen zuò chū le juédìng.	Sau khi so sánh, chúng tôi đã đưa ra quyết định.	\N	\N	\N
8361ab60-a71d-4208-95fe-91cd71c15a09	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	4	入围	rùwéi	Vượt qua vòng sơ tuyển	有三对夫妻入围了决赛。	Yǒu sān duì fūqī rùwéi le juésài.	Có ba cặp vợ chồng đã lọt vào chung kết.	\N	\N	\N
121b971a-b7ad-40f6-bd31-5ba93a5e7a62	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	5	评委	píngwěi	Ban giám khảo	评委被他们的故事感动了。	Píngwěi bèi tāmen de gùshi gǎndòng le.	Giám khảo đã bị câu chuyện của họ làm cảm động.	\N	\N	\N
cc6f6905-a901-455e-b907-530aa7d3688e	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	6	如何	rúhé	Như thế nào	评委问他们是如何恩爱的。	Píngwěi wèn tāmen shì rúhé ēn'ài de.	Giám khảo hỏi họ đã yêu thương nhau như thế nào.	\N	\N	\N
55fdf44f-af54-4dc0-b265-5bffb48b5e60	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	7	如	rú	Giống như	他几年如一日地照顾她。	Tā jǐ nián rú yī rì de zhàogù tā.	Anh ấy chăm sóc cô ấy mấy năm như một ngày.	\N	\N	\N
df4cbaeb-093b-42fe-a844-048e44c94a74	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	8	瘫痪	tānhuàn	Bị liệt	前几年她全身瘫痪了。	Qián jǐ nián tā quánshēn tānhuàn le.	Mấy năm trước cô ấy bị liệt toàn thân.	\N	\N	\N
48fef575-4766-4355-b365-51bf767102cd	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	9	离婚	líhūn	Ly hôn	别人以为丈夫会跟她离婚。	Biérén yǐwéi zhàngfu huì gēn tā líhūn.	Người khác tưởng rằng chồng sẽ ly hôn với cô ấy.	\N	\N	\N
3a9bf7c1-dbb0-4440-9f52-768f178a61af	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	10	自杀	zìshā	Tự tử	她曾经想过自杀。	Tā céngjīng xiǎng guò zìshā.	Cô ấy từng nghĩ đến việc tự sát.	\N	\N	\N
a4d234fe-c1ec-4a22-af5e-26a64c090c01	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	11	抱怨	bàoyuàn	Oán trách, phàn nàn	丈夫照顾她，从不抱怨。	Zhàngfu zhàogù tā, cóng bù bàoyuàn.	Chồng chăm sóc cô ấy, chưa từng phàn nàn.	\N	\N	\N
659e8b57-8c56-4519-83bf-b0ac297a3537	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	12	爱护	àihù	Yêu quý, quý trọng	在丈夫的爱护下她站了起来。	Zài zhàngfu de àihù xià tā zhàn le qǐlái.	Dưới sự yêu thương chăm sóc của chồng, cô ấy đã đứng lên được.	\N	\N	\N
3de60309-b4ca-48e9-87f9-334afe5552c0	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	13	婚姻	hūnyīn	Hôn nhân	他们的婚姻很幸福。	Tāmen de hūnyīn hěn xìngfú.	Hôn nhân của họ rất hạnh phúc.	\N	\N	\N
ac795a78-e79b-4fb5-ad5f-d9c130439936	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	14	吵架	chǎojià	Cãi nhau	他们从来不吵架。	Tāmen cónglái bù chǎojià.	Họ chưa bao giờ cãi nhau.	\N	\N	\N
486e1aae-e6e4-4723-ba7b-8f32dd24a233	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	15	相敬如宾	xiāngjìng rúbīn	Tôn trọng nhau như khách	他们结婚多年，一直相敬如宾。	Tāmen jiéhūn duōnián, yìzhí xiāngjìng rúbīn.	Họ kết hôn nhiều năm, luôn tôn trọng nhau như khách.	\N	\N	\N
d4679674-4811-442b-b579-7fb42a874bb4	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	16	暗暗	àn'àn	Thầm, ngầm	评委听了暗暗点头。	Píngwěi tīng le àn'àn diǎntóu.	Giám khảo nghe xong âm thầm gật đầu.	\N	\N	\N
dfea3f41-b3aa-4598-8e14-232ea684ddb1	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	17	轮	lún	Luân phiên, thay phiên	现在轮到第三对夫妻了。	Xiànzài lún dào dì sān duì fūqī le.	Bây giờ đến lượt cặp vợ chồng thứ ba rồi.	\N	\N	\N
35a69242-89d6-4947-9b60-75bd95aa232a	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	18	不耐烦	bù nàifán	Sốt ruột, bực mình	评委们等得有些不耐烦。	Píngwěi men děng de yǒuxiē bù nàifán.	Các giám khảo chờ đến có chút mất kiên nhẫn.	\N	\N	\N
8b1f3832-eef0-4782-9bad-d1eceee36fc7	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	19	看个究竟	kàn gè jiūjìng	Xem cho rõ ràng, xem thực hư	评委走出来看个究竟。	Píngwěi zǒuchūlái kàn gè jiūjìng.	Giám khảo bước ra ngoài để xem thực hư ra sao.	\N	\N	\N
b4696cc0-fdf2-4474-a75b-8ff15079599f	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	20	靠	kào	Dựa, tựa	他靠在椅子上睡着了。	Tā kào zài yǐzi shàng shuì zháo le.	Anh ấy dựa vào ghế ngủ thiếp đi.	\N	\N	\N
7f2b8ab9-7ad5-4918-b33e-b6e8bce47559	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	21	肩膀	jiānbǎng	Bờ vai	男人的头靠在女人的肩膀上。	Nánrén de tóu kào zài nǚrén de jiānbǎng shàng.	Đầu của người đàn ông tựa lên vai người phụ nữ.	\N	\N	\N
0c01a716-5257-46f6-aae5-0e7832bbc2b1	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	22	喊	hǎn	Gọi, hét lên	评委正要开口喊他们。	Píngwěi zhèng yào kāikǒu hǎn tāmen.	Giám khảo đang định mở miệng gọi họ.	\N	\N	\N
983ca22c-3702-4715-bcbe-84231d006746	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	23	伸	shēn	Duỗi, chìa	她伸出手指，做了个小声的动作。	Tā shēnchū shǒuzhǐ, zuò le gè xiǎoshēng de dòngzuò.	Cô ấy đưa ngón tay ra, làm động tác giữ im lặng.	\N	\N	\N
f3f5ae43-942c-4b3d-b51f-3751efc91b6f	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	24	手指	shǒuzhǐ	Ngón tay	他不小心弄伤了手指。	Tā bù xiǎoxīn nòng shāng le shǒuzhǐ.	Anh ấy không cẩn thận làm thương ngón tay.	\N	\N	\N
38755221-3d21-41dd-a588-d6bf32aa3183	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	25	歪歪扭扭	wāiwāiniǔniǔ	Xiêu vẹo, nguệch ngoạc	字写得歪歪扭扭的。	Zì xiě de wāiwāiniǔniǔ de.	Chữ viết ngoằn ngoèo xiêu vẹo.	\N	\N	\N
4237eb40-000d-479f-8f17-d0a72eb98acb	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	26	递	dì	Đưa, chuyền	她写下一行字递给评委。	Tā xiě xià yì háng zì dì gěi píngwěi.	Cô ấy viết một dòng chữ rồi đưa cho giám khảo.	\N	\N	\N
9e5e3582-f70a-4cc3-8c16-476433ed4fd0	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	27	脑袋	nǎodai	Cái đầu	丈夫的脑袋一直靠在她的肩上。	Zhàngfu de nǎodai yìzhí kào zài tā de jiān shàng.	Đầu của chồng vẫn luôn tựa lên vai cô ấy.	\N	\N	\N
ea2c4ffc-4f45-42a1-a752-f9aa36255aea	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	28	女士	nǚshì	Bà (lịch sự)	女士，请这边走。	Nǚshì, qǐng zhèbiān zǒu.	Thưa bà, mời đi lối này.	\N	\N	\N
07cee687-09d0-4aa0-bd2c-8b05df88ce20	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	29	叙述	xùshù	Thuật lại	请叙述一下事情的经过。	Qǐng xùshù yíxià shìqíng de jīngguò.	Vui lòng thuật lại quá trình sự việc.	\N	\N	\N
743bc8af-bdf0-4b5f-929b-82f8cec083da	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	30	居然	jūrán	Lại có thể (bất ngờ)	评委们听了居然一时语塞。	Píngwěimen tīng le jūrán yìshí yǔsè.	Giám khảo nghe xong lại bất ngờ cạn lời.	\N	\N	\N
81b4b426-a0c4-4272-a076-66f0c3a11135	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	31	催	cuī	Thúc giục	你别一直催我。	Nǐ bié yìzhí cuī wǒ.	Bạn đừng liên tục giục tôi.	\N	\N	\N
42a94801-c4db-43ab-91b1-3bd4a9a9cfbf	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	32	等待	děngdài	Đợi, chờ	大家都在等待结果。	Dàjiā dōu zài děngdài jiéguǒ.	Mọi người đều đang chờ đợi kết quả.	\N	\N	\N
0d73dbbe-a204-413e-917b-ae197bafed1a	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	33	蚊子	wénzi	Con muỗi	夏天蚊子很多。	Xiàtiān wénzi hěn duō.	Mùa hè có rất nhiều muỗi.	\N	\N	\N
1935d2c5-8883-492a-9138-1322e9da2b87	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	34	半夜	bànyè	Nửa đêm	昨晚半夜我被吵醒了。	Zuówǎn bànyè wǒ bèi chǎoxǐng le.	Nửa đêm qua tôi bị đánh thức.	\N	\N	\N
9b915461-0873-46b7-ab53-f290f6fbab4f	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	35	叮	dīng	Đốt, chích	我被蚊子叮了一下。	Wǒ bèi wénzi dīng le yí xià.	Tôi bị muỗi đốt một phát.	\N	\N	\N
bc848465-f65b-4dd1-9bdd-0c8b1b639a30	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	36	老婆	lǎopo	Vợ	我老婆对我很好。	Wǒ lǎopo duì wǒ hěn hǎo.	Vợ tôi đối xử với tôi rất tốt.	\N	\N	\N
7d2ce0b6-c84f-4796-a5fb-08af51dd855e	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	37	吵	chǎo	Làm ồn, ồn ào	别吵，他昨晚没睡好。	Bié chǎo, tā zuówǎn méi shuì hǎo.	Đừng làm ồn, tối qua anh ấy ngủ không ngon.	\N	\N	\N
8e0b526e-3ea6-4d8e-bcf8-3b09e2e036a7	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	38	项	xiàng	Hạng mục (Lượng từ)	电台增加了一项奖项。	Diàntái zēngjiā le yí xiàng jiǎngxiàng.	Đài phát thanh đã thêm một hạng mục giải thưởng.	\N	\N	\N
be29988c-f5fb-48a3-b0a5-b068210e30b3	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	39	将	jiāng	Đem, lấy (giới từ)	将第一对夫妻评为患难与共。	Jiāng dì yī duì fūqī píng wéi huànnàn yǔgòng.	Bình chọn cặp vợ chồng thứ nhất là hoạn nạn có nhau.	\N	\N	\N
a53e6aa2-49a2-47c0-be9d-eeef4eddf861	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	40	患难与共	huànnàn yǔgòng	Hoạn nạn có nhau	他们是一对患难与共的夫妻。	Tāmen shì yí duì huànnàn yǔgòng de fūqī.	Họ là một cặp vợ chồng hoạn nạn có nhau.	\N	\N	\N
a77d0aa7-ef2b-4f8c-9da5-58613b776b3c	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	41	眼泪	yǎnlèi	Nước mắt	她感动得流下了眼泪。	Tā gǎndòng de liúxià le yǎnlèi.	Cô ấy cảm động đến rơi nước mắt.	\N	\N	\N
89200369-8789-407f-ae25-08f2583d82cf	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	42	脖子	bózi	Cổ	我的脖子有点疼。	Wǒ de bózi yǒudiǎn téng.	Cổ của tôi hơi đau.	\N	\N	\N
2da88c11-9ca9-40f2-9b12-e9407c6ac6a4	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	43	胸	xiōng	Ngực	他觉得胸口闷。	Tā juéde xiōngkǒu mèn.	Anh ấy cảm thấy tức ngực.	\N	\N	\N
4620bd99-fd8c-496b-ae31-5744bf139986	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	44	腰	yāo	Eo, thắt lưng	我弯下腰捡东西。	Wǒ wānxià yāo jiǎn dōngxi.	Tôi cúi eo xuống nhặt đồ.	\N	\N	\N
e9b6e797-e2c2-4c08-bf89-71dd32e39653	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	45	后背	hòubèi	Lưng	他的后背受了伤。	Tā de hòubèi shòu le shāng.	Lưng của anh ấy bị thương.	\N	\N	\N
eb12c681-6200-4da8-9f70-dfe0f323832b	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	46	眉毛	méimao	Lông mày	她的眉毛很浓。	Tā de méimao hěn nóng.	Lông mày của cô ấy rất đậm.	\N	\N	\N
66537618-c09a-4e24-8d5a-6206bb01d8ec	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	47	嗓子	sǎngzi	Cổ họng, giọng	我感冒了，嗓子疼。	Wǒ gǎnmào le, sǎngzi téng.	Tôi bị cảm rồi, đau họng.	\N	\N	\N
8adbdd0c-8eb1-4f90-968a-50cefcbb5fbd	c03a68e5-eb31-4793-aa8a-ca0c9d1f584d	48	牙齿	yáchǐ	Răng	每天都要刷牙齿。	Měitiān dōu yào shuā yáchǐ.	Mỗi ngày đều phải đánh răng.	\N	\N	\N
5c4b10c3-f95b-4b2d-9386-a21e9eb56de4	901364ad-86ec-439b-9437-b0e37a5ec2a1	0	串	chuàn	Xâu, chuỗi (lượng từ)	请给我留一串钥匙。	Qǐng gěi wǒ liú yí chuàn yàoshi.	Vui lòng để lại cho tôi một chùm chìa khóa.	\N	\N	\N
1da6f012-4b10-43f6-9c3d-6770b0a3f65f	901364ad-86ec-439b-9437-b0e37a5ec2a1	1	一辈子	yí bèizi	Suốt đời, cả đời	父母一辈子住在农村。	Fùmǔ yí bèizi zhù zài nóngcūn.	Bố mẹ cả đời sống ở nông thôn.	\N	\N	\N
61232c2d-c9a6-41c5-8d8e-d53ec68b4337	901364ad-86ec-439b-9437-b0e37a5ec2a1	2	农村	nóngcūn	Nông thôn	农村的空气很好。	Nóngcūn de kōngqì hěn hǎo.	Không khí ở nông thôn rất tốt.	\N	\N	\N
b6d55827-5795-43a4-b14b-320ee3575136	901364ad-86ec-439b-9437-b0e37a5ec2a1	3	屋子	wūzi	Nhà, căn phòng	父母很少离开老屋。	Fùmǔ hěn shǎo líkāi lǎo wū.	Bố mẹ rất ít khi rời khỏi căn nhà cũ.	\N	\N	\N
f22388ab-4743-462b-b511-7eb5f95ff289	901364ad-86ec-439b-9437-b0e37a5ec2a1	4	断	duàn	Cắt, đứt	就像没断奶的孩子一样。	Jiù xiàng méi duànnǎi de háizi yíyàng.	Giống như đứa trẻ chưa cai sữa.	\N	\N	\N
a38d2801-072d-4dde-93ee-e9fab7f9e322	901364ad-86ec-439b-9437-b0e37a5ec2a1	5	以来	yǐlái	Đến nay, từ...đến nay	长年以来，他们都不愿搬家。	Chángnián yǐlái, tāmen dōu bú yuàn bānjiā.	Từ nhiều năm nay, họ đều không muốn chuyển nhà.	\N	\N	\N
60b73cb5-54c9-4e41-a811-057bad899dec	901364ad-86ec-439b-9437-b0e37a5ec2a1	6	姥姥	lǎolao	Bà ngoại	姥姥在城里住。	Lǎolao zài chéng lǐ zhù.	Bà ngoại sống ở thành phố.	\N	\N	\N
dfcffd46-602a-46f5-8f52-612ad51c2af8	901364ad-86ec-439b-9437-b0e37a5ec2a1	7	舅舅	jiùjiu	Cậu	我舅舅是医生。	Wǒ jiùjiu shì yīshēng.	Cậu tôi là bác sĩ.	\N	\N	\N
ab21140a-438d-4a41-aa16-e93bdaeccf5b	901364ad-86ec-439b-9437-b0e37a5ec2a1	8	姑姑	gūgu	Cô (chị em gái của bố)	姑姑对我很好。	Gūgu duì wǒ hěn hǎo.	Cô đối xử với tôi rất tốt.	\N	\N	\N
3e6dd808-89a7-4570-bc19-0e5dad937659	901364ad-86ec-439b-9437-b0e37a5ec2a1	9	坚决	jiānjué	Kiên quyết	父母坚决不住在城里。	Fùmǔ jiānjué bú zhù zài chéng lǐ.	Bố mẹ kiên quyết không sống ở thành phố.	\N	\N	\N
b4af9979-9bea-49bb-9812-b77a39f20fc3	901364ad-86ec-439b-9437-b0e37a5ec2a1	10	打工	dǎ gōng	Làm thuê, làm công	我们在外地打工。	Wǒmen zài wàidì dǎgōng.	Chúng tôi làm thuê ở nơi khác.	\N	\N	\N
04b1403a-5d47-4d0b-82c5-415455b3c812	901364ad-86ec-439b-9437-b0e37a5ec2a1	11	挣	zhèng	Kiếm (tiền)	他挣了很多钱。	Tā zhèng le hěn duō qián.	Anh ấy kiếm được rất nhiều tiền.	\N	\N	\N
7bd0a6d2-0ad3-4fd3-8f71-e1f29122b178	901364ad-86ec-439b-9437-b0e37a5ec2a1	12	县	xiàn	Huyện	我们在县里买了一套新房。	Wǒmen zài xiàn lǐ mǎi le yí tào xīnfáng.	Chúng tôi mua một căn nhà mới ở huyện.	\N	\N	\N
bbfbff5a-1b34-4c17-a879-826594d4e83f	901364ad-86ec-439b-9437-b0e37a5ec2a1	13	套	tào	Bộ, căn, cái (lượng từ)	这套房子很大。	Zhè tào fángzi hěn dà.	Căn nhà này rất lớn.	\N	\N	\N
1fe85b9d-3941-4427-9bff-214f09262b5b	901364ad-86ec-439b-9437-b0e37a5ec2a1	14	装修	zhuāngxiū	Sửa sang, trang hoàng	新房已经装修完了。	Xīnfáng yǐjīng zhuāngxiū wán le.	Nhà mới đã sửa sang xong.	\N	\N	\N
4fce386f-4b6a-4521-b3e8-ffa74b31cb5b	901364ad-86ec-439b-9437-b0e37a5ec2a1	15	不得了	bùdéliǎo	Cực kỳ, vô cùng	父母高兴得不得了。	Fùmǔ gāoxìng de bùdéliǎo.	Bố mẹ vui mừng cực kỳ.	\N	\N	\N
9dca52e8-8abc-4466-a53d-01aea65c528a	901364ad-86ec-439b-9437-b0e37a5ec2a1	16	醉	zuì	Say (rượu)	那天父亲喝醉了。	Nà tiān fùqīn hē zuì le.	Hôm đó bố uống say rồi.	\N	\N	\N
f5bf8691-9417-4e36-aa53-fbf7a3a6057c	901364ad-86ec-439b-9437-b0e37a5ec2a1	17	强烈	qiángliè	Mãnh liệt, kịch liệt	我们强烈要求他留下。	Wǒmen qiángliè yāoqiú tā liú xià.	Chúng tôi khẩn thiết yêu cầu anh ấy ở lại.	\N	\N	\N
090e4ee8-759a-4390-8a97-9735f396215a	901364ad-86ec-439b-9437-b0e37a5ec2a1	18	夜	yè	Ban đêm	这是一个深冬的夜里。	Zhè shì yí gè shēndōng de yèlǐ.	Đây là một đêm mùa đông tĩnh mịch.	\N	\N	\N
98cbe705-f987-4f62-b62e-62462d6d3d46	901364ad-86ec-439b-9437-b0e37a5ec2a1	19	锁	suǒ	Cái khóa, khóa lại	新房只能上锁空着。	Xīnfáng zhǐ néng shàng suǒ kōng zhe.	Nhà mới đành phải khóa lại để trống.	\N	\N	\N
c4a0513e-cd7f-4e51-ae1f-bde824afd3e6	901364ad-86ec-439b-9437-b0e37a5ec2a1	20	临	lín	Sắp, gần	临走那天，父亲赶来送我们。	Lín zǒu nà tiān, fùqīn gǎn lái sòng wǒmen.	Hôm sắp đi, bố vội đến tiễn chúng tôi.	\N	\N	\N
104c6bbd-4da9-4db6-a71d-a8e731483cfd	901364ad-86ec-439b-9437-b0e37a5ec2a1	21	悄悄	qiāoqiāo	Lặng lẽ, nhẹ nhàng	父亲悄悄把我拉到一边。	Fùqīn qiāoqiāo bǎ wǒ lā dào yìbiān.	Bố lặng lẽ kéo tôi sang một bên.	\N	\N	\N
d5f58c78-4bad-4973-9936-6f6a91e0a245	901364ad-86ec-439b-9437-b0e37a5ec2a1	22	晒	shài	Phơi (nắng)	顺便给你们晒晒被子。	Shùnbiàn gěi nǐmen shàishai bèizi.	Nhân tiện phơi chăn cho các con.	\N	\N	\N
53134799-13da-453b-ad8c-e41c33b20dd8	901364ad-86ec-439b-9437-b0e37a5ec2a1	23	被子	bèizi	Cái mền, cái chăn	床上的被子已铺好。	Chuáng shàng de bèizi yǐ pū hǎo.	Chăn trên giường đã được trải gọn gàng.	\N	\N	\N
faf396dd-2c0c-489e-a095-c7d16048e251	901364ad-86ec-439b-9437-b0e37a5ec2a1	24	长途	chángtú	Đường dài	下了长途车，儿子大哭。	Xià le chángtú chē, érzi dà kū.	Xuống xe đường dài, con trai khóc lớn.	\N	\N	\N
7040b3ae-ac7a-4b07-b05b-4a05c3580a12	901364ad-86ec-439b-9437-b0e37a5ec2a1	25	冻	dòng	Bị cóng, rét	儿子被冻得大哭。	Érzi bèi dòng de dà kū.	Con trai bị lạnh khóc lớn.	\N	\N	\N
c99a7e34-bb5f-47a9-9ccd-20d5b020486b	901364ad-86ec-439b-9437-b0e37a5ec2a1	26	想象	xiǎngxiàng	Tưởng tượng	想象着打开家门的景象。	Xiǎngxiàng zhe dǎkāi jiāmén de jǐngxiàng.	Tưởng tượng ra cảnh tượng khi mở cửa nhà.	\N	\N	\N
d90bd43c-702f-471e-8230-7cdd7afe1e70	901364ad-86ec-439b-9437-b0e37a5ec2a1	27	灰尘	huīchén	Bụi bặm	屋里满是灰尘。	Wū lǐ mǎn shì huīchén.	Trong nhà đầy bụi bặm.	\N	\N	\N
d6cb850a-d8eb-4bf5-b5a8-e752bf96c747	901364ad-86ec-439b-9437-b0e37a5ec2a1	28	亮	liàng	Sáng, tỏa sáng	自家亮着灯光。	Zìjiā liàng zhe dēngguāng.	Nhà mình đèn đang sáng.	\N	\N	\N
f9692800-fc94-4b1e-824f-1c97fe3309b4	901364ad-86ec-439b-9437-b0e37a5ec2a1	29	微笑	wēixiào	Mỉm cười	开门的是微笑着的父母。	Kāimén de shì wēixiào zhe de fùmǔ.	Người mở cửa là bố mẹ đang mỉm cười.	\N	\N	\N
763f6e75-175b-407e-8e5a-8745b4180240	901364ad-86ec-439b-9437-b0e37a5ec2a1	30	温暖	wēnnuǎn	Ấm áp, sưởi ấm	温暖的气息立刻扑面而来。	Wēnnuǎn de qìxī lìkè pūmiàn ér lái.	Hơi thở ấm áp lập tức phả vào mặt.	\N	\N	\N
00bdac35-f157-4236-8e70-ac2b7835d264	901364ad-86ec-439b-9437-b0e37a5ec2a1	31	立刻	lìkè	Lập tức	他立刻跑了出去。	Tā lìkè pǎo le chūqù.	Anh ấy lập tức chạy ra ngoài.	\N	\N	\N
8724caf9-5092-45ea-abd2-98edde5c1901	901364ad-86ec-439b-9437-b0e37a5ec2a1	32	扑	pū	Bổ nhào, phả vào	饭菜的香味扑面而来。	Fàncài de xiāngwèi pūmiàn ér lái.	Hương vị đồ ăn phả vào mặt.	\N	\N	\N
e00541e9-5b00-4884-a248-5513eebcf8af	901364ad-86ec-439b-9437-b0e37a5ec2a1	33	卧室	wòshì	Phòng ngủ	卧室在二楼。	Wòshì zài èr lóu.	Phòng ngủ ở tầng hai.	\N	\N	\N
52a59f16-6062-4497-92f4-7a15eebe3cf8	901364ad-86ec-439b-9437-b0e37a5ec2a1	34	铺	pū	Trải	被子已经铺好了。	Bèizi yǐjīng pū hǎo le.	Chăn đã được trải ra rồi.	\N	\N	\N
ea92368d-759d-489b-b2e3-d2ae8fa15de9	901364ad-86ec-439b-9437-b0e37a5ec2a1	35	飘	piāo	Thoảng đưa, bay lơ lửng	厨房飘来饭菜香。	Chúfáng piāo lái fàncài xiāng.	Mùi thơm thức ăn thoang thoảng từ bếp.	\N	\N	\N
814e142e-2c01-4947-8668-83a11a34887a	901364ad-86ec-439b-9437-b0e37a5ec2a1	36	阵	zhèn	Trận, cơn (lượng từ)	飘来阵阵饭菜香。	Piāo lái zhènzhèn fàncài xiāng.	Từng đợt mùi thức ăn thơm thoang thoảng bay tới.	\N	\N	\N
e1e22940-48ca-4368-bc51-3e21386bbac8	901364ad-86ec-439b-9437-b0e37a5ec2a1	37	感受	gǎnshòu	Cảm nhận	感受到了家的温暖。	Gǎnshòu dào le jiā de wēnnuǎn.	Cảm nhận được sự ấm áp của gia đình.	\N	\N	\N
740ed546-2153-4ee8-b54a-dab7a0829d91	901364ad-86ec-439b-9437-b0e37a5ec2a1	38	流泪	liúlèi	Chảy nước mắt	我感动得流泪了。	Wǒ gǎndòng de liúlèi le.	Tôi cảm động rơi nước mắt.	\N	\N	\N
6ea084c6-2823-4ab1-adef-ff269dc99def	901364ad-86ec-439b-9437-b0e37a5ec2a1	39	外公	wàigōng	Ông ngoại	我的外公很慈祥。	Wǒ de wàigōng hěn cíxiáng.	Ông ngoại tôi rất hiền từ.	\N	\N	\N
c80ab440-879b-4dcd-8bd6-86b56f87f780	901364ad-86ec-439b-9437-b0e37a5ec2a1	40	兄弟	xiōngdì	Anh em	我们是好兄弟。	Wǒmen shì hǎo xiōngdì.	Chúng tôi là anh em tốt.	\N	\N	\N
4ed40aca-8395-46a4-a3a8-b0b7aacf26be	901364ad-86ec-439b-9437-b0e37a5ec2a1	41	小气	xiǎoqi	Keo kiệt, hẹp hòi	他这个人很小气。	Tā zhè ge rén hěn xiǎoqi.	Con người anh ấy rất keo kiệt.	\N	\N	\N
3bd4cda4-a6db-481b-915c-cd6b981f3602	901364ad-86ec-439b-9437-b0e37a5ec2a1	42	周到	zhōudào	Chu đáo	招待得很周到。	Zhāodài de hěn zhōudào.	Tiếp đón rất chu đáo.	\N	\N	\N
b1f3a9f3-f2e3-40bf-94cd-c3a23406b141	901364ad-86ec-439b-9437-b0e37a5ec2a1	43	坦率	tǎnshuài	Thẳng thắn	他说话很坦率。	Tā shuōhuà hěn tǎnshuài.	Anh ấy nói chuyện rất thẳng thắn.	\N	\N	\N
988167e8-fe12-44be-a515-2e92d4664b34	d740cadb-f179-44c5-94c2-b4765f846130	0	人生	rénshēng	Đời người	人生有选择，一切可改变。	Rénshēng yǒu xuǎnzé, yíqiè kě gǎibiàn.	Đời người có lựa chọn, mọi thứ có thể đổi thay.	\N	\N	\N
edf30901-dc1f-4e47-8367-de173f36e5ba	d740cadb-f179-44c5-94c2-b4765f846130	1	工人	gōngrén	Công nhân	翟峰和妻子都是铁路工人。	Zhái Fēng hé qīzi dōu shì tiělù gōngrén.	Trác Phong và vợ đều là công nhân đường sắt.	\N	\N	\N
a71e0d85-77b2-43f1-bed3-5edcaca22f7f	d740cadb-f179-44c5-94c2-b4765f846130	2	稳定	wěndìng	Ổn định	他们的工作很稳定。	Tāmen de gōngzuò hěn wěndìng.	Công việc của họ rất ổn định.	\N	\N	\N
fdb7e166-38a0-4db6-952f-d61921991ab7	d740cadb-f179-44c5-94c2-b4765f846130	3	待遇	dàiyù	Sự đãi ngộ	这份工作的待遇不错。	Zhè fèn gōngzuò de dàiyù búcuò.	Đãi ngộ của công việc này rất tốt.	\N	\N	\N
f3858673-6121-4181-94b7-dc6238c7c5c9	d740cadb-f179-44c5-94c2-b4765f846130	4	发愁	fā chóu	Lo âu, buồn rầu	他们从不用为生活发愁。	Tāmen cóng bú yòng wèi shēnghuó fāchóu.	Họ chưa bao giờ phải lo lắng về cuộc sống.	\N	\N	\N
d3274b2a-6dc0-48ac-a56e-977771438af5	d740cadb-f179-44c5-94c2-b4765f846130	5	平静	píngjìng	Yên ổn, yên ả	翟峰不想一辈子过平静的生活。	Zhái Fēng bù xiǎng yíbèizi guò píngjìng de shēnghuó.	Trác Phong không muốn cả đời sống một cuộc sống yên ả.	\N	\N	\N
035f73bb-acd4-4def-85f3-638a3bef3d2b	d740cadb-f179-44c5-94c2-b4765f846130	6	帆船	fānchuán	Thuyền buồm	翟峰迷上了帆船。	Zhái Fēng mí shàng le fānchuán.	Trác Phong đã đam mê thuyền buồm.	\N	\N	\N
bcea645e-6a35-46f3-81f9-7503a9bd74b0	d740cadb-f179-44c5-94c2-b4765f846130	41	翟峰	Zhái Fēng	Trác Phong (Tên người)	翟峰是一个有梦想的人。	Zhái Fēng shì yí gè yǒu mèngxiǎng de rén.	Trác Phong là một người có ước mơ.	\N	\N	\N
058b1623-f310-418d-828f-a14eee611c47	d740cadb-f179-44c5-94c2-b4765f846130	7	撞	zhuàng	Đụng, đâm vào	他觉得帆船能带他撞开"世界之门"。	Tā juéde fānchuán néng dài tā zhuàng kāi "shìjiè zhī mén".	Anh ấy cảm thấy thuyền buồm có thể đưa anh ấy tông mở 'cánh cửa thế giới'.	\N	\N	\N
ef97d9c4-4e2a-4583-afd8-36d2e2e892d5	d740cadb-f179-44c5-94c2-b4765f846130	8	艘	sōu	Chiếc, con (lượng từ cho tàu thuyền)	只要有一艘船。	Zhǐyào yǒu yì sōu chuán.	Chỉ cần có một con thuyền.	\N	\N	\N
df56a3a5-c026-4987-be7c-0b604c822f6f	d740cadb-f179-44c5-94c2-b4765f846130	9	航行	hángxíng	Đi tàu thủy, gióng thuyền	就能航行在无边无际的海上。	Jiù néng hángxíng zài wúbiānwújì de hǎi shàng.	Liền có thể đi thuyền trên biển khơi vô tận.	\N	\N	\N
346c88ef-4733-4416-8fc1-52967f1432fd	d740cadb-f179-44c5-94c2-b4765f846130	10	积蓄	jīxù	Tiền để dành, dành dụm	翟峰和妻子没有积蓄。	Zhái Fēng hé qīzi méiyǒu jīxù.	Trác Phong và vợ không có tiền tiết kiệm.	\N	\N	\N
7e721629-25f3-4e9f-a451-daea0b379ae0	d740cadb-f179-44c5-94c2-b4765f846130	11	二手	èrshǒu	Đã qua sử dụng, second-hand	他们买下了一艘二手船。	Tāmen mǎi xià le yì sōu èrshǒu chuán.	Họ đã mua một chiếc thuyền cũ.	\N	\N	\N
4576c9b9-6691-44e7-b4a5-45bb4264eb81	d740cadb-f179-44c5-94c2-b4765f846130	12	彩虹	cǎihóng	Cầu vồng	翟峰叫它"彩虹号"。	Zhái Fēng jiào tā "cǎihóng hào".	Trác Phong gọi nó là 'tàu Cầu Vồng'.	\N	\N	\N
db919daa-d5bc-48d2-8d22-9111e3ae58e8	d740cadb-f179-44c5-94c2-b4765f846130	13	包括	bāokuò	Bao gồm	包括翟峰的父母。	Bāokuò Zhái Fēng de fùmǔ.	Bao gồm cả bố mẹ của Trác Phong.	\N	\N	\N
542fff0e-72ec-4f28-bdc9-14219118b004	d740cadb-f179-44c5-94c2-b4765f846130	14	疯	fēng	Phát điên, hóa điên	所有人都觉得翟峰"疯了"。	Suǒyǒu rén dōu juéde Zhái Fēng "fēng le".	Tất cả mọi người đều cảm thấy Trác Phong 'điên rồi'.	\N	\N	\N
9ddcdf07-7711-4527-9331-06f96fac34eb	d740cadb-f179-44c5-94c2-b4765f846130	15	辞职	cí zhí	Từ chức	辞了职的翟峰和妻子。	Cí le zhí de Zhái Fēng hé qīzi.	Trác Phong đã từ chức cùng người vợ.	\N	\N	\N
7adb79ce-24b7-4b03-a2e3-0eb1671dd3b6	d740cadb-f179-44c5-94c2-b4765f846130	16	驾驶	jiàshǐ	Điều khiển, lái	第一次驾驶帆船出海了。	Dì yí cì jiàshǐ fānchuán chū hǎi le.	Lần đầu tiên lái thuyền buồm ra biển.	\N	\N	\N
8e24cc75-2330-42ae-a743-d52c59f36baf	d740cadb-f179-44c5-94c2-b4765f846130	17	轮流	lúnliú	Luân phiên	白天，翟峰和妻子轮流驾船。	Báitiān, Zhái Fēng hé qīzi lúnliú jià chuán.	Ban ngày, Trác Phong và vợ luân phiên lái thuyền.	\N	\N	\N
eacb0b1f-abcf-4c66-ad36-40b7e40abe97	d740cadb-f179-44c5-94c2-b4765f846130	18	钓	diào	Câu (cá)	翟峰会和妻子下海游泳或者钓鱼。	Zhái Fēng huì hé qīzi xià hǎi yóuyǒng huòzhě diàoyú.	Trác Phong sẽ cùng vợ xuống biển bơi hoặc câu cá.	\N	\N	\N
469ffc95-293f-47d8-844b-6193046bf2be	d740cadb-f179-44c5-94c2-b4765f846130	19	顿	dùn	Bữa (lượng từ)	做一顿美味的海鲜。	Zuò yí dùn měiwèi de hǎixiān.	Làm một bữa hải sản ngon lành.	\N	\N	\N
9e03757c-1178-4398-9c57-db168a460071	d740cadb-f179-44c5-94c2-b4765f846130	20	海鲜	hǎixiān	Hải sản	全家人吃海鲜。	Quán jiārén chī hǎixiān.	Cả nhà ăn hải sản.	\N	\N	\N
b48f5682-910b-4923-ac6e-9e19ce9f4544	d740cadb-f179-44c5-94c2-b4765f846130	21	傍晚	bàngwǎn	Hoàng hôn, lúc chạng vạng	傍晚是一家人最舒适的时候。	Bàngwǎn shì yì jiā rén zuì shūshì de shíhou.	Hoàng hôn là lúc cả nhà thoải mái nhất.	\N	\N	\N
0f575a0b-c76a-4382-a433-c700386d8895	d740cadb-f179-44c5-94c2-b4765f846130	22	舒适	shūshì	Dễ chịu, thoải mái	感觉很舒适。	Gǎnjué hěn shūshì.	Cảm giác rất thoải mái.	\N	\N	\N
11e4d247-52e8-40ad-8887-ce99f93955ad	d740cadb-f179-44c5-94c2-b4765f846130	23	干活儿	gàn huór	Làm việc	干完活儿，一家人坐在一起。	Gàn wán huór, yì jiā rén zuò zài yìqǐ.	Làm xong việc, cả nhà ngồi lại cùng nhau.	\N	\N	\N
83f4759d-2717-498c-9b8f-1f1a9abd7c26	d740cadb-f179-44c5-94c2-b4765f846130	24	盼望	pànwàng	Trông mong, mong mỏi	这样的生活，是翟峰盼望已久的。	Zhèyàng de shēnghuó, shì Zhái Fēng pànwàng yǐ jiǔ de.	Cuộc sống như thế này, là điều Trác Phong mong mỏi từ lâu.	\N	\N	\N
47fc393e-e6be-4101-8c22-05771a741113	d740cadb-f179-44c5-94c2-b4765f846130	25	陆地	lùdì	Đất liền	以前陆地上的夜晚。	Yǐqián lùdì shàng de yèwǎn.	Những đêm trên đất liền trước kia.	\N	\N	\N
30be229e-af23-4673-98ca-6846455cfaca	d740cadb-f179-44c5-94c2-b4765f846130	26	各自	gèzì	Từng người, riêng mình	他们在各自的房间。	Tāmen zài gèzì de fángjiān.	Họ ở trong căn phòng của riêng mình.	\N	\N	\N
7708acca-36f4-4275-9fa1-978f83c6977f	d740cadb-f179-44c5-94c2-b4765f846130	27	勿	wù	Chớ, đừng	可上山，勿下海。	Kě shàng shān, wù xià hǎi.	Có thể lên núi, đừng xuống biển.	\N	\N	\N
215fb327-5dfe-4134-ba7c-cc82a95ec2ea	d740cadb-f179-44c5-94c2-b4765f846130	28	时刻	shíkè	Thời khắc	美好的时刻过去后。	Měihǎo de shíkè guòqù hòu.	Sau khi những thời khắc tươi đẹp qua đi.	\N	\N	\N
247cb33e-2df9-4da1-8667-a976af16740d	d740cadb-f179-44c5-94c2-b4765f846130	29	着火	zháo huǒ	Bốc cháy	经历了船身着火、漏水等险情。	Jīnglì le chuánshēn zháohuǒ, lòushuǐ děng xiǎnqíng.	Trải qua những hiểm nguy như cháy thân thuyền, rò rỉ nước.	\N	\N	\N
911de878-e126-4fc3-83ea-515b95b26493	d740cadb-f179-44c5-94c2-b4765f846130	30	漏	lòu	Chảy, rỉ	水管漏水了。	Shuǐguǎn lòu shuǐ le.	Ống nước bị rỉ nước rồi.	\N	\N	\N
b3a3c92f-5aa5-4ce4-a454-84f52b421840	d740cadb-f179-44c5-94c2-b4765f846130	31	雷	léi	Sấm	他们最怕雷电交加的时刻。	Tāmen zuì pà léidiàn jiāojiā de shíkè.	Họ sợ nhất khoảnh khắc sấm chớp đan xen.	\N	\N	\N
cd03f818-0430-4f53-90d8-14fe95c33718	d740cadb-f179-44c5-94c2-b4765f846130	32	随时	suíshí	Bất cứ lúc nào	小船随时有可能被击到。	Xiǎochuán suíshí yǒu kěnéng bèi jī dào.	Con thuyền nhỏ có thể bị đánh trúng bất cứ lúc nào.	\N	\N	\N
388ddfe3-68ad-4e40-b18f-6c67b40f203c	d740cadb-f179-44c5-94c2-b4765f846130	33	闪电	shǎndiàn	Chớp, tia chớp	希望闪电快快过去。	Xīwàng shǎndiàn kuàikuài guòqù.	Hy vọng tia chớp mau chóng qua đi.	\N	\N	\N
9e3a8332-ca2d-4707-b590-df458685e33a	d740cadb-f179-44c5-94c2-b4765f846130	34	击	jī	Đánh, đập	被下一道闪电击到。	Bèi xià yí dào shǎndiàn jī dào.	Bị tia chớp tiếp theo đánh trúng.	\N	\N	\N
47f7fb49-c11a-4c46-8b5c-7fe0a97eb5af	d740cadb-f179-44c5-94c2-b4765f846130	35	拥抱	yōngbào	Ôm chặt	一家三口只能紧紧拥抱在一起。	Yì jiā sān kǒu zhǐ néng jǐnjǐn yōngbào zài yìqǐ.	Cả nhà ba người chỉ có thể ôm chặt lấy nhau.	\N	\N	\N
d885af19-7181-4afb-a8fd-43e4d4113a5b	d740cadb-f179-44c5-94c2-b4765f846130	36	海里	hǎilǐ	Hải lý	航行了4000多海里。	Hángxíng le sìqiān duō hǎilǐ.	Đã đi thuyền được hơn 4000 hải lý.	\N	\N	\N
f117c775-251d-4312-bee1-9d317ca1ecf6	d740cadb-f179-44c5-94c2-b4765f846130	37	台阶	táijiē	Bậc thềm	航海就是一段长长的台阶。	Hánghǎi jiù shì yí duàn chángcháng de táijiē.	Đi biển chính là một bậc thềm dài.	\N	\N	\N
a76c496a-a8d5-4b6d-aff0-4ecabb922429	d740cadb-f179-44c5-94c2-b4765f846130	38	未来	wèilái	Tương lai	通向他想要的未来。	Tōng xiàng tā xiǎng yào de wèilái.	Dẫn tới tương lai mà anh ấy mong muốn.	\N	\N	\N
97bdb8ff-71e3-4fbe-8490-dfd8f27ddf33	d740cadb-f179-44c5-94c2-b4765f846130	39	太太	tàitai	Vợ, bà nhà	我和太太想要看看这个时代。	Wǒ hé tàitai xiǎng yào kànkan zhège shídài.	Tôi và vợ muốn nhìn ngắm thời đại này.	\N	\N	\N
824a1cc7-17f8-40a2-92c1-ad375c3602fa	d740cadb-f179-44c5-94c2-b4765f846130	40	时代	shídài	Thời đại	看看这个时代到底是什么样子。	Kànkan zhège shídài dàodǐ shì shénme yàngzi.	Xem thử thời đại này rốt cuộc trông như thế nào.	\N	\N	\N
64d5fbe4-3267-4341-b196-3af8c2dbb995	d740cadb-f179-44c5-94c2-b4765f846130	42	澳洲	Àozhōu	Úc (Châu Úc)	他们想去澳洲和新西兰。	Tāmen xiǎng qù Àozhōu hé Xīnxīlán.	Họ muốn đi Úc và New Zealand.	\N	\N	\N
fb3b76c0-aafe-4ba9-9f01-41c83f132092	d740cadb-f179-44c5-94c2-b4765f846130	43	新西兰	Xīnxīlán	New Zealand	下一站，他们想去新西兰。	Xià yí zhàn, tāmen xiǎng qù Xīnxīlán.	Trạm tiếp theo, họ muốn đi New Zealand.	\N	\N	\N
93750a89-5763-4780-83c0-fa80b0685162	d740cadb-f179-44c5-94c2-b4765f846130	44	预报	yùbào	Dự báo	天气预报说今天有雨。	Tiānqì yùbào shuō jīntiān yǒu yǔ.	Dự báo thời tiết nói hôm nay có mưa.	\N	\N	\N
376bccf0-8400-49f7-9003-93d1faeb6b5e	d740cadb-f179-44c5-94c2-b4765f846130	45	雾	wù	Sương mù	海面上起雾了。	Hǎimiàn shàng qǐ wù le.	Trên mặt biển đã nổi sương mù.	\N	\N	\N
f5072012-6366-4741-bd28-ad5ab18121d2	d740cadb-f179-44c5-94c2-b4765f846130	46	零件	língjiàn	Linh kiện	船上的零件坏了。	Chuán shàng de língjiàn huài le.	Linh kiện trên tàu hỏng rồi.	\N	\N	\N
95011811-6e98-429b-89d2-2cd0b9a66cdf	d740cadb-f179-44c5-94c2-b4765f846130	47	手工	shǒugōng	Thủ công	这是手工制作的。	Zhè shì shǒugōng zhìzuò de.	Đây là đồ làm thủ công.	\N	\N	\N
55158aee-de58-42ec-824f-eaa5d4e08a4b	d740cadb-f179-44c5-94c2-b4765f846130	48	维修	wéixiū	Duy tu, sửa chữa	他正在维修机器。	Tā zhèngzài wéixiū jīqì.	Anh ấy đang sửa chữa máy móc.	\N	\N	\N
4f06e71e-7b43-4385-b112-b73e8058f9bb	d740cadb-f179-44c5-94c2-b4765f846130	49	机器	jīqì	Máy móc	这台机器很旧了。	Zhè tái jīqì hěn jiù le.	Cái máy này rất cũ rồi.	\N	\N	\N
8e6c2a93-ebdb-4594-8df0-a14baad33153	d740cadb-f179-44c5-94c2-b4765f846130	50	产品	chǎnpǐn	Sản phẩm	我们的产品很好。	Wǒmen de chǎnpǐn hěn hǎo.	Sản phẩm của chúng tôi rất tốt.	\N	\N	\N
76fa92e9-4c0e-4853-b836-5a627c8c1999	d740cadb-f179-44c5-94c2-b4765f846130	51	设备	shèbèi	Thiết bị	船上的设备很先进。	Chuán shàng de shèbèi hěn xiānjìn.	Thiết bị trên tàu rất tiên tiến.	\N	\N	\N
2544fd69-bfc0-4231-a837-581c672656bf	d740cadb-f179-44c5-94c2-b4765f846130	52	设施	shèshī	Cơ sở vật chất	港口的设施很完善。	Gǎngkǒu de shèshī hěn wánshàn.	Cơ sở vật chất của bến cảng rất hoàn thiện.	\N	\N	\N
206dc6b1-30ca-4d0f-b3fc-58e739a24546	d740cadb-f179-44c5-94c2-b4765f846130	53	工具	gōngjù	Công cụ	他拿出了维修工具。	Tā ná chū le wéixiū gōngjù.	Anh ấy lấy ra công cụ sửa chữa.	\N	\N	\N
cb551db6-4931-4a9a-95d3-e6fda5621f27	c4678e54-fba2-4dd8-99a5-772157e1962b	0	背	bēi	Vác, cõng	百里背米。	Bǎilǐ bēi mǐ.	Vác gạo (đi xa) trăm dặm.	\N	\N	\N
a6e1b020-66ef-433f-8514-d9c61e83cdd7	c4678e54-fba2-4dd8-99a5-772157e1962b	1	从前	cóngqián	Trước đây, ngày xưa	从前有一个人叫子路。	Cóngqián yǒu yí gè rén jiào Zǐlù.	Ngày xưa có một người tên là Tử Lộ.	\N	\N	\N
d5eb94dd-4492-47a4-83c5-21180069079e	c4678e54-fba2-4dd8-99a5-772157e1962b	2	时期	shíqī	Thời kỳ	他生活在春秋时期。	Tā shēnghuó zài Chūnqiū shíqī.	Ông ấy sống ở thời kỳ Xuân Thu.	\N	\N	\N
11c91496-9cf5-4442-b5f7-a09bca316455	c4678e54-fba2-4dd8-99a5-772157e1962b	3	流传	liúchuán	Lưu truyền	这个故事流传至今。	Zhège gùshi liúchuán zhìjīn.	Câu chuyện này lưu truyền đến nay.	\N	\N	\N
e3df80ee-cb3b-4df9-993b-2b6918df0d57	c4678e54-fba2-4dd8-99a5-772157e1962b	4	至今	zhìjīn	Đến nay, đến bây giờ	流传至今的故事。	Liúchuán zhìjīn de gùshi.	Câu chuyện được lưu truyền đến ngày nay.	\N	\N	\N
7c086d18-9884-40ae-a81d-27e51fd583cb	c4678e54-fba2-4dd8-99a5-772157e1962b	5	孝敬	xiàojìng	Hiếu kính	他非常孝敬父母。	Tā fēicháng xiàojìng fùmǔ.	Anh ấy rất hiếu kính bố mẹ.	\N	\N	\N
26d73ef0-29cf-4abf-a952-f1e75fe5a78d	c4678e54-fba2-4dd8-99a5-772157e1962b	6	农民	nóngmín	Nông dân	子路的父母都是农民。	Zǐlù de fùmǔ dōu shì nóngmín.	Bố mẹ Tử Lộ đều là nông dân.	\N	\N	\N
ab5d23f0-ffd9-4929-abb1-7d1bd2b4ea7e	c4678e54-fba2-4dd8-99a5-772157e1962b	7	战争	zhànzhēng	Chiến tranh	由于连年的战争。	Yóuyú liánnián de zhànzhēng.	Do chiến tranh liên miên.	\N	\N	\N
92fb3c57-67ce-4766-8c23-1fcbf869817d	c4678e54-fba2-4dd8-99a5-772157e1962b	8	满足	mǎnzú	Thỏa mãn, hài lòng	能吃上米饭就满足啦。	Néng chī shàng mǐfàn jiù mǎnzú la.	Có thể ăn được cơm trắng là mãn nguyện rồi.	\N	\N	\N
d194bf77-e8bf-4f5f-a760-9dcd7b3a13c6	c4678e54-fba2-4dd8-99a5-772157e1962b	9	惭愧	cánkuì	Hổ thẹn	子路听了心里十分惭愧。	Zǐlù tīng le xīnli shífēn cánkuì.	Tử Lộ nghe xong trong lòng vô cùng hổ thẹn.	\N	\N	\N
cfa00634-4ce6-4f25-91a4-87052ba7a34f	c4678e54-fba2-4dd8-99a5-772157e1962b	10	决心	juéxīn	Quyết tâm (động từ/danh từ)	他暗下决心。	Tā àn xià juéxīn.	Anh ấy thầm hạ quyết tâm.	\N	\N	\N
a91fee8d-4f5b-4f10-8f40-176cf7b171e7	c4678e54-fba2-4dd8-99a5-772157e1962b	11	委屈	wěiqu	Tủi thân, để ai chịu thiệt	不能再委屈父母了。	Bù néng zài wěiqu fùmǔ le.	Không thể để bố mẹ chịu thiệt thòi thêm nữa.	\N	\N	\N
d2199ee6-72d9-4ef7-8cf1-8ba0fa4fe106	c4678e54-fba2-4dd8-99a5-772157e1962b	12	打听	dǎting	Hỏi thăm, nghe ngóng	子路打听到一个有钱人。	Zǐlù dǎting dào yí gè yǒuqián rén.	Tử Lộ dò hỏi được một người có tiền.	\N	\N	\N
b4ec0558-ca7d-4867-a23d-6c669ceef9ae	c4678e54-fba2-4dd8-99a5-772157e1962b	13	主人	zhǔrén	Người chủ	主人很喜欢这个小伙子。	Zhǔrén hěn xǐhuan zhège xiǎohuǒzi.	Người chủ rất thích chàng trai này.	\N	\N	\N
e1baf572-17a2-4ad8-9ac8-5e2f7b77ac4d	c4678e54-fba2-4dd8-99a5-772157e1962b	14	结实	jiēshi	Cường tráng, khỏe mạnh	主人见他身体结实。	Zhǔrén jiàn tā shēntǐ jiēshi.	Người chủ thấy cơ thể cậu khỏe mạnh.	\N	\N	\N
71850a67-769a-4c4b-b88a-2b6d735b9a8b	c4678e54-fba2-4dd8-99a5-772157e1962b	15	勤奋	qínfèn	Siêng năng, cần cù	子路干起活来十分勤奋。	Zǐlù gàn qǐ huó lái shífēn qínfèn.	Tử Lộ làm việc vô cùng siêng năng.	\N	\N	\N
5f7e884f-b2c3-4581-9e67-6e6cb801c49b	c4678e54-fba2-4dd8-99a5-772157e1962b	16	银子	yínzi	Bạc	发现主人给的银子多了。	Fāxiàn zhǔrén gěi de yínzi duō le.	Phát hiện bạc người chủ đưa đã nhiều hơn.	\N	\N	\N
17484efa-b693-4746-9b7f-02288ba627bf	c4678e54-fba2-4dd8-99a5-772157e1962b	17	老实	lǎoshi	Trung thực, thật thà	子路老老实实地告诉了主人。	Zǐlù lǎolǎoshíshí de gàosu le zhǔrén.	Tử Lộ thành thật nói với người chủ.	\N	\N	\N
6beacbb1-e02d-477a-acce-5e7d9c9913de	c4678e54-fba2-4dd8-99a5-772157e1962b	18	镇	zhèn	Thị trấn	路过镇上，他买了一袋米。	Lùguò zhèn shàng, tā mǎi le yí dài mǐ.	Đi ngang qua thị trấn, anh mua một túi gạo.	\N	\N	\N
f86a26ac-73d7-4161-a596-a111eebf1fdf	c4678e54-fba2-4dd8-99a5-772157e1962b	19	后背	hòubèi	Lưng (người)	把米背在后背上。	Bǎ mǐ bēi zài hòubèi shàng.	Vác gạo trên lưng.	\N	\N	\N
af2324f6-46bb-4d71-9e00-6d853358c017	c4678e54-fba2-4dd8-99a5-772157e1962b	20	滑	huá	Trơn, trượt	雪地很滑，他不小心滑了一下。	Xuědì hěn huá, tā bù xiǎoxīn huá le yí xià.	Đường tuyết rất trơn, anh ấy bất cẩn trượt một cái.	\N	\N	\N
baee7002-cb32-4997-b97e-7b649c4cc7e4	c4678e54-fba2-4dd8-99a5-772157e1962b	21	甩	shuǎi	Vung, quăng, ném	背上的米袋差点儿被甩出去。	Bēi shàng de mǐdài chàdiǎnr bèi shuǎi chūqù.	Túi gạo trên lưng suýt bị văng ra.	\N	\N	\N
825c84ed-199c-4e9a-97e6-92382e0d50c6	c4678e54-fba2-4dd8-99a5-772157e1962b	22	顶	dǐng	Đi ngược (đội, chống lại)	他顶着大雪往前走。	Tā dǐng zhe dàxuě wǎng qián zǒu.	Anh ấy đội tuyết lớn đi về phía trước.	\N	\N	\N
62ac09be-b1fb-4dda-8bfe-e6c24ced90ce	c4678e54-fba2-4dd8-99a5-772157e1962b	23	扶	fú	Đỡ, vịn	扶着米袋的双手。	Fú zhe mǐdài de shuāngshǒu.	Đôi tay đỡ lấy túi gạo.	\N	\N	\N
9057504a-5edd-424a-95f9-a8a83c5859de	c4678e54-fba2-4dd8-99a5-772157e1962b	24	不行	bùxíng	Ghê gớm, kinh khủng, cực kỳ	双手冻得不行。	Shuāngshǒu dòng de bùxíng.	Đôi tay lạnh cõng đến cực điểm.	\N	\N	\N
08bf4ec3-ab7a-4d65-9765-9f8966e8d335	c4678e54-fba2-4dd8-99a5-772157e1962b	25	团圆	tuányuán	Sum họp, đoàn tụ	饱饱地吃了顿团圆饭。	Bǎobǎo de chī le dùn tuányuán fàn.	Được ăn một bữa cơm đoàn viên no nê.	\N	\N	\N
8ee3d9ae-99c2-4bc6-8824-ecb86a90c203	c4678e54-fba2-4dd8-99a5-772157e1962b	26	去世	qùshì	Qua đời, từ trần	后来子路的父母去世了。	Hòulái Zǐlù de fùmǔ qùshì le.	Sau này bố mẹ Tử Lộ qua đời.	\N	\N	\N
93de14ae-d17e-4e4b-8157-990c2bcad5e7	c4678e54-fba2-4dd8-99a5-772157e1962b	27	国君	guójūn	Vua	楚国国君觉得他很有本领。	Chǔguó guójūn juéde tā hěn yǒu běnlǐng.	Vua nước Sở cảm thấy anh ấy rất có bản lĩnh.	\N	\N	\N
b790deb3-51d9-4ab0-819e-544caba4bae1	c4678e54-fba2-4dd8-99a5-772157e1962b	28	本领	běnlǐng	Bản lĩnh, năng lực	他是一个有本领的人才。	Tā shì yí gè yǒu běnlǐng de réncái.	Ông ấy là một nhân tài có năng lực.	\N	\N	\N
9b42b1c5-d3cd-412f-967c-3a0541238a7d	c4678e54-fba2-4dd8-99a5-772157e1962b	29	人才	réncái	Người có tài, nhân tài	国君觉得他是个不可多得的人才。	Guójūn juéde tā shì gè bùkěduōdé de réncái.	Vua cho rằng ông là một nhân tài hiếm có.	\N	\N	\N
2350a5d7-88e6-452c-9318-217a82af280c	c4678e54-fba2-4dd8-99a5-772157e1962b	30	官	guān	Quan	留他做了官。	Liú tā zuò le guān.	Giữ anh lại làm quan.	\N	\N	\N
119bfd9e-9264-4403-ad7f-593af8f756b1	c4678e54-fba2-4dd8-99a5-772157e1962b	31	物质	wùzhì	Vật chất	物质条件好。	Wùzhì tiáojiàn hǎo.	Điều kiện vật chất tốt.	\N	\N	\N
55bcc2c2-fb6c-4305-aa5f-35c898d855d9	c4678e54-fba2-4dd8-99a5-772157e1962b	32	反而	fǎn'ér	Trái lại, ngược lại	他没感到欢喜，反而很遗憾。	Tā méi gǎndào huānxǐ, fǎn'ér hěn yíhàn.	Anh ấy không thấy vui vẻ, ngược lại còn tiếc nuối.	\N	\N	\N
0fc215a5-8a2a-4bac-bf35-53fef5428537	c4678e54-fba2-4dd8-99a5-772157e1962b	33	诚恳	chéngkèn	Thành khẩn	他诚恳地说。	Tā chéngkèn de shuō.	Anh ấy thành khẩn nói.	\N	\N	\N
f3ffe1dd-cec2-45c0-9e4f-ceffff31f1de	c4678e54-fba2-4dd8-99a5-772157e1962b	34	成就	chéngjiù	Thành tựu, thành quả	我现在有了一点儿成就。	Wǒ xiànzài yǒu le yìdiǎnr chéngjiù.	Bây giờ tôi đã có chút thành tựu.	\N	\N	\N
0850cf33-d1ed-4d67-af12-173f6f2535c9	c4678e54-fba2-4dd8-99a5-772157e1962b	35	古代	gǔdài	Ngày xưa, thời cổ đại	中国古代有句俗话。	Zhōngguó gǔdài yǒu jù súhuà.	Thời cổ đại Trung Quốc có câu tục ngữ.	\N	\N	\N
bd9ca47e-588b-4d1d-98dc-47a6b74bb289	c4678e54-fba2-4dd8-99a5-772157e1962b	36	孝顺	xiàoshùn	Hiếu thảo	孝顺父母是各种美德中占第一位的。	Xiàoshùn fùmǔ shì gèzhǒng měidé zhōng zhàn dì yī wèi de.	Hiếu thảo bố mẹ là đứng đầu trong các loại mỹ đức.	\N	\N	\N
f4f4cdc4-69aa-42c3-98e5-c4f368b4dc84	c4678e54-fba2-4dd8-99a5-772157e1962b	37	美德	měidé	Phẩm chất tốt, mỹ đức	孝顺是一种美德。	Xiàoshùn shì yì zhǒng měidé.	Hiếu thảo là một loại đức tính tốt.	\N	\N	\N
52aac737-c058-4c68-9b2a-998ff260993b	c4678e54-fba2-4dd8-99a5-772157e1962b	38	占	zhàn	Chiếm, giữ	在美德中占第一位。	Zài měidé zhōng zhàn dì yī wèi.	Chiếm vị trí đầu tiên trong các đức tính.	\N	\N	\N
e6fd86a2-6e1a-4820-a5e7-870df5d8258c	c4678e54-fba2-4dd8-99a5-772157e1962b	39	食物	shíwù	Thức ăn	为了让父母吃到较好的食物。	Wèile ràng fùmǔ chī dào jiàohǎo de shíwù.	Để bố mẹ được ăn thức ăn tốt hơn.	\N	\N	\N
27423894-e61d-4c3b-bffa-eb1e2380760a	c4678e54-fba2-4dd8-99a5-772157e1962b	40	子路	Zǐlù	Tử Lộ (Học trò Khổng Tử)	子路是孔子的学生。	Zǐlù shì Kǒngzǐ de xuésheng.	Tử Lộ là học trò của Khổng Tử.	\N	\N	\N
cbc3c758-89e0-4f73-8524-cbe639477727	c4678e54-fba2-4dd8-99a5-772157e1962b	41	春秋	Chūnqiū	Thời Xuân Thu	事情发生在春秋时期。	Shìqíng fāshēng zài Chūnqiū shíqī.	Sự việc xảy ra vào thời Xuân Thu.	\N	\N	\N
4123b5ea-d65e-4852-8aef-1b992e90d512	c4678e54-fba2-4dd8-99a5-772157e1962b	42	孔子	Kǒngzǐ	Khổng Tử	孔子是中国伟大的思想家。	Kǒngzǐ shì Zhōngguó wěidà de sīxiǎngjiā.	Khổng Tử là nhà tư tưởng vĩ đại của Trung Quốc.	\N	\N	\N
d738ff94-3de5-4aa2-ad3e-378838a42255	c4678e54-fba2-4dd8-99a5-772157e1962b	43	楚国	Chǔguó	Nước Sở	他南下到了楚国。	Tā nánxià dào le Chǔguó.	Anh ấy đi về phương Nam đến nước Sở.	\N	\N	\N
3e07737f-1fb7-4963-89d1-a2d5724625fe	c4678e54-fba2-4dd8-99a5-772157e1962b	44	国王	guówáng	Quốc vương	国王统治着国家。	Guówáng tǒngzhì zhe guójiā.	Quốc vương cai trị đất nước.	\N	\N	\N
09caae1d-95f6-467a-bfa7-ab1ea6c6542c	c4678e54-fba2-4dd8-99a5-772157e1962b	45	王子	wángzǐ	Hoàng tử	王子很勇敢。	Wángzǐ hěn yǒnggǎn.	Hoàng tử rất dũng cảm.	\N	\N	\N
8ae0c62a-cf9a-4e5d-9f8b-fdd52e621eb8	c4678e54-fba2-4dd8-99a5-772157e1962b	46	公主	gōngzhǔ	Công chúa	美丽的公主。	Měilì de gōngzhǔ.	Nàng công chúa xinh đẹp.	\N	\N	\N
ec918a70-f971-46d0-9fbb-4780c54d581e	c4678e54-fba2-4dd8-99a5-772157e1962b	47	总理	zǒnglǐ	Thủ tướng	总理在会议上发言。	Zǒnglǐ zài huìyì shàng fāyán.	Thủ tướng phát biểu tại hội nghị.	\N	\N	\N
fa2998fa-1e61-4aab-b6d6-5363e16518cf	c4678e54-fba2-4dd8-99a5-772157e1962b	48	总统	zǒngtǒng	Tổng thống	新当选的总统。	Xīn dāngxuǎn de zǒngtǒng.	Tổng thống mới đắc cử.	\N	\N	\N
f9613b1e-8306-480d-a178-6309e240346f	c4678e54-fba2-4dd8-99a5-772157e1962b	49	主席	zhǔxí	Chủ tịch	他是公司的主席。	Tā shì gōngsī de zhǔxí.	Ông ấy là chủ tịch của công ty.	\N	\N	\N
9c06eed3-8b9b-40d6-a218-871acfc8581b	c4678e54-fba2-4dd8-99a5-772157e1962b	50	总裁	zǒngcái	Tổng giám đốc	公司的总裁很年轻。	Gōngsī de zǒngcái hěn niánqīng.	Tổng giám đốc công ty rất trẻ.	\N	\N	\N
8433c8a4-64e9-4667-b0a9-74f2573461cf	c4678e54-fba2-4dd8-99a5-772157e1962b	51	主任	zhǔrèn	Chủ nhiệm	班主任对学生很好。	Bānzhǔrèn duì xuésheng hěn hǎo.	Giáo viên chủ nhiệm rất tốt với học sinh.	\N	\N	\N
81f68f8e-6604-4254-81b9-afe5d6ad0e5e	c4678e54-fba2-4dd8-99a5-772157e1962b	52	老板	lǎobǎn	Ông chủ	老板给了他一笔奖金。	Lǎobǎn gěi le tā yì bǐ jiǎngjīn.	Ông chủ thưởng cho anh ấy một khoản tiền.	\N	\N	\N
ba8369bb-340f-4bc8-9d72-f9f0be0c27f1	c4678e54-fba2-4dd8-99a5-772157e1962b	53	领导	lǐngdǎo	Lãnh đạo	我们需要好的领导。	Wǒmen xūyào hǎo de lǐngdǎo.	Chúng ta cần sự lãnh đạo tốt.	\N	\N	\N
0a4dd5f8-bd6e-4678-8a4d-a3b0f0c11f63	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	0	悠久	yōujiǔ	Lâu đời	济南的泉水，历史悠久。	Jǐnán de quánshuǐ, lìshǐ yōujiǔ.	Nước suối Tế Nam có lịch sử lâu đời.	\N	\N	\N
a96ac654-e4f9-4f11-9f13-a925765556f8	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	1	文字	wénzì	Văn tự, chữ viết	最早的文字记载。	Zuìzǎo de wénzì jìzǎi.	Ghi chép bằng văn tự sớm nhất.	\N	\N	\N
ac90a5f1-036e-4f18-8b04-42da814e5a73	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	2	记载	jìzǎi	Ghi chép (Đt/Dt)	这段历史有文字记载。	Zhè duàn lìshǐ yǒu wénzì jìzǎi.	Giai đoạn lịch sử này có ghi chép bằng văn tự.	\N	\N	\N
d587eb8f-9ff4-42fe-b878-0fd620973d61	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	3	形状	xíngzhuàng	Hình dạng	描写泉水的形状。	Miáoxiě quánshuǐ de xíngzhuàng.	Miêu tả hình dạng của nước suối.	\N	\N	\N
89db2e06-0cd9-4174-b44e-3ec3098c9635	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	4	描写	miáoxiě	Miêu tả	许多文人都对它进行过描写。	Xǔduō wénrén dōu duì tā jìnxíng guò miáoxiě.	Rất nhiều văn nhân đều từng tiến hành miêu tả về nó.	\N	\N	\N
4424178c-f82e-41ac-b5ea-56acf0b2cae5	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	5	赞美	zànměi	Ca ngợi, tán dương	留下了许多赞美泉水的诗文。	Liúxià le xǔduō zànměi quánshuǐ de shīwén.	Để lại rất nhiều bài thơ ca ngợi nước suối.	\N	\N	\N
5f508a7d-4131-4786-b010-04c10ce1981e	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	6	诗	shī	Thơ	他写了一首诗。	Tā xiě le yì shǒu shī.	Anh ấy đã viết một bài thơ.	\N	\N	\N
74b4d6dc-411c-4af8-8165-61fe46dc2857	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	7	老百姓	lǎobǎixìng	Thường dân, người dân	济南的老百姓住在泉边。	Jǐnán de lǎobǎixìng zhù zài quán biān.	Người dân Tế Nam sống bên cạnh bờ suối.	\N	\N	\N
00633c24-5813-4152-ba76-fb5e094a64c8	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	8	充满	chōngmǎn	Tràn đầy, chan chứa	自然对它充满感激之情。	Zìrán duì tā chōngmǎn gǎnjī zhī qíng.	Tự nhiên sẽ tràn đầy tình cảm biết ơn đối với nó.	\N	\N	\N
9724c3cb-e2af-4683-a2a0-1327d0dccb00	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	9	感激	gǎnjī	Cảm kích, biết ơn	非常感激您的帮助。	Fēicháng gǎnjī nín de bāngzhù.	Vô cùng biết ơn sự giúp đỡ của ngài.	\N	\N	\N
e16e2776-c336-4f8a-8ecf-ac26fe4e9d0f	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	10	从而	cóng'ér	Từ đó, do đó (Liên từ)	从而也产生了许多传说。	Cóng'ér yě chǎnshēng le xǔduō chuánshuō.	Từ đó cũng nảy sinh ra rất nhiều truyền thuyết.	\N	\N	\N
ce64f908-1a8a-48e6-9987-b5027398e925	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	11	产生	chǎnshēng	Sản sinh, nảy sinh	产生了一个美丽的传说。	Chǎnshēng le yí gè měilì de chuánshuō.	Nảy sinh một truyền thuyết tươi đẹp.	\N	\N	\N
789bcd5a-e482-4899-aa83-df80751a377b	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	12	传说	chuánshuō	Truyền thuyết	这是一个古老的传说。	Zhè shì yí gè gǔlǎo de chuánshuō.	Đây là một truyền thuyết cổ xưa.	\N	\N	\N
a2380071-122b-4abf-bb8a-0dd9dcbf00a4	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	13	善良	shànliáng	Lương thiện, tốt bụng	有个善良的青年。	Yǒu gè shànliáng de qīngnián.	Có một thanh niên lương thiện.	\N	\N	\N
4b4422a6-f9f5-48ad-837e-7c6cc81c590c	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	14	救	jiù	Cứu	他学习医术，救了很多人。	Tā xuéxí yīshù, jiù le hěn duō rén.	Anh ấy học y thuật, đã cứu rất nhiều người.	\N	\N	\N
efc4b153-19b6-4eba-a9c9-9d153c955a99	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	15	晕	yūn	Hôn mê, ngất xỉu	救了一位晕倒的老人。	Jiù le yí wèi yūndǎo de lǎorén.	Đã cứu một ông lão bị ngất xỉu.	\N	\N	\N
9de6dd30-815d-4004-bd3f-7f5f4ff8a3a2	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	16	龙	lóng	Rồng	他是东海龙王的哥哥。	Tā shì Dōnghǎi lóngwáng de gēge.	Ông ấy là anh trai của Đông Hải Long Vương.	\N	\N	\N
f004c154-35fd-41f4-9629-98ba15b70733	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	17	治疗	zhìliáo	Điều trị, chữa trị	求到了治病救人的白玉壶。	Qiú dào le zhìbìng jiùrén de báiyùhú.	Đã xin được chiếc bình bạch ngọc chữa bệnh cứu người.	\N	\N	\N
df8e8bbb-8158-49fb-9f1a-8daa6000cd9c	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	18	玉	yù	Ngọc	这是一块好玉。	Zhè shì yí kuài hǎo yù.	Đây là một miếng ngọc tốt.	\N	\N	\N
5d50685d-be66-457e-818b-1a0aa52de18a	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	19	壶	hú	Ấm, bình	把壶埋入地下。	Bǎ hú mái rù dìxià.	Đem chiếc ấm chôn xuống dưới đất.	\N	\N	\N
07d600a8-52aa-474d-bd85-22172058151a	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	20	抢	qiǎng	Cướp, giành	为了不被坏人抢走。	Wèile bú bèi huàirén qiǎng zǒu.	Để không bị người xấu cướp đi.	\N	\N	\N
1b13cecd-13e7-485d-9f76-7e6944c735f6	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	21	埋	mái	Chôn, vùi	他把东西埋了起来。	Tā bǎ dōngxi mái le qǐlai.	Anh ấy đã đem đồ chôn giấu đi.	\N	\N	\N
4d1536a9-13ad-4564-ab8a-b8cf39247f3e	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	22	藏	cáng	Giấu, ẩn nấp	藏了起来。	Cáng le qǐlai.	Đã giấu đi rồi.	\N	\N	\N
3139e3b7-805d-4f23-a6e8-e12a7cb45444	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	23	如今	rújīn	Ngày nay, hiện nay	如今的济南市区内。	Rújīn de Jǐnán shìqū nèi.	Trong khu vực nội thành Tế Nam ngày nay.	\N	\N	\N
747d7efb-39a4-4e2f-90e6-cb86c8510cf5	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	24	分布	fēnbù	Phân bố	分布着七百多个天然泉。	Fēnbù zhe qībǎi duō gè tiānrán quán.	Phân bố hơn bảy trăm con suối tự nhiên.	\N	\N	\N
b79d3604-8836-4279-a39a-feb47b395333	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	25	天然	tiānrán	Tự nhiên, thiên nhiên	天然泉水非常甜美。	Tiānrán quánshuǐ fēicháng tiánměi.	Nước suối tự nhiên vô cùng ngọt ngào.	\N	\N	\N
b7af4c78-ba35-4c84-88d2-281e05c925d2	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	26	优美	yōuměi	Đẹp đẽ, ưu mỹ	济南泉水的优美。	Jǐnán quánshuǐ de yōuměi.	Vẻ đẹp của nước suối Tế Nam.	\N	\N	\N
4badd9a3-5c75-42f7-a1b9-05b00d372509	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	27	独特	dútè	Độc đáo, đặc biệt	从那独特的名字上反映出来。	Cóng nà dútè de míngzi shàng fǎnyìng chūlái.	Được phản ánh ra từ những cái tên độc đáo đó.	\N	\N	\N
e0a4e085-bb57-447b-ab31-47e147398930	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	28	反映	fǎnyìng	Phản ánh, thể hiện	这反映了一个问题。	Zhè fǎnyìng le yí gè wèntí.	Điều này đã phản ánh một vấn đề.	\N	\N	\N
0e22619b-6153-4514-ade8-99c73a07aa91	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	29	珍珠	zhēnzhū	Trân châu, ngọc trai	以形状命名的珍珠泉。	Yǐ xíngzhuàng mìngmíng de Zhēnzhūquán.	Suối Trân Châu được đặt tên theo hình dáng.	\N	\N	\N
167d1e4f-bd25-425b-b365-991b8ba11346	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	30	形成	xíngchéng	Hình thành	这么好的泉水是如何形成的呢？	Zhème hǎo de quánshuǐ shì rúhé xíngchéng de ne?	Nước suối tốt như vậy được hình thành như thế nào?	\N	\N	\N
eb49fc7b-8793-4efd-9c91-ccbf120a4a41	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	31	于	yú	Ở, tại, từ (Giới từ)	济南的泉水来自于山区。	Jǐnán de quánshuǐ láizì yú shānqū.	Nước suối Tế Nam bắt nguồn từ vùng núi.	\N	\N	\N
aaad1fd4-4d16-402f-9452-bd9f2c78aefa	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	32	广大	guǎngdà	Rộng lớn, bao la	广大山区。	Guǎngdà shānqū.	Vùng núi rộng lớn.	\N	\N	\N
082039a1-17fd-4bf3-9168-9e21dd839e50	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	33	岩石	yánshí	Nham thạch, đá	山区的岩石。	Shānqū de yánshí.	Nham thạch (đá) của vùng núi.	\N	\N	\N
24dd0a6d-4a49-4464-864e-3867b395498f	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	34	亿	yì	Trăm triệu	大约四亿年前。	Dàyuē sì yì nián qián.	Khoảng bốn trăm triệu năm trước.	\N	\N	\N
9dc6d30b-ddf9-4a11-9bd9-439adee9b23a	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	35	石灰岩	shíhuīyán	Đá vôi	一层厚厚的石灰岩。	Yì céng hòuhòu de shíhuīyán.	Một lớp đá vôi dày.	\N	\N	\N
16f77565-d942-4514-addf-db858fb88167	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	36	地区	dìqū	Khu vực, vùng	在这种石灰岩地区。	Zài zhè zhǒng shíhuīyán dìqū.	Ở trong khu vực đá vôi này.	\N	\N	\N
f1eb85ca-fcad-4f09-be38-aed9fe909fdd	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	37	表面	biǎomiàn	Bề mặt	陆地表面的水。	Lùdì biǎomiàn de shuǐ.	Nước trên bề mặt đất liền.	\N	\N	\N
44c5038c-fac8-4ab4-969a-1ebd02652dcc	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	38	角度	jiǎodù	Góc độ	以大约三十度的角度。	Yǐ dàyuē sānshí dù de jiǎodù.	Với một góc khoảng ba mươi độ.	\N	\N	\N
70b1932f-47ca-4c9a-8f7d-545f71fb51e5	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	39	斜	xié	Nghiêng, xiên	由南向北斜。	Yóu nán xiàng běi xié.	Nghiêng từ Nam sang Bắc.	\N	\N	\N
f69cfce4-ea43-4da3-bcaa-4db4d752e77a	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	40	为	wéi	Trở thành, làm	地下岩石变为火成岩。	Dìxià yánshí biàn wéi huǒchéngyán.	Đá dưới lòng đất biến thành đá magma.	\N	\N	\N
14c155d1-40fc-4055-bf49-0c5ff56a1bf8	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	41	火成岩	huǒchéngyán	Đá phún xuất, đá magma	碰到了火成岩。	Pèngdào le huǒchéngyán.	Đã chạm phải đá magma.	\N	\N	\N
b0c7dbdf-36b4-4ac1-b7e1-218661daaf86	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	42	碰	pèng	Đụng, chạm, gặp phải	碰到火成岩挡住了路。	Pèngdào huǒchéngyán dǎngzhù le lù.	Gặp phải đá magma chặn mất đường.	\N	\N	\N
806bd85b-02ac-42c4-94a7-474330fcda25	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	43	挡	dǎng	Chặn, cản	挡住了水流。	Dǎngzhù le shuǐliú.	Đã chặn lại dòng nước.	\N	\N	\N
8096105d-99e2-4ef7-b871-56beae713027	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	44	地势	dìshì	Địa thế	旧城一带地势低。	Jiùchéng yídài dìshì dī.	Khu vực thành cổ địa thế thấp.	\N	\N	\N
f3b6d1ac-e07c-4e2c-97d6-bcf6693170b9	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	45	冲	chōng	Xông thẳng, phun, vọt	地下水就冲出地表。	Dìxiàshuǐ jiù chōng chū dìbiǎo.	Nước ngầm liền phun trào lên khỏi mặt đất.	\N	\N	\N
5cbb3ac8-e6ed-4909-82da-1cc7e8f7eff4	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	46	济南	Jǐ'nán	Tế Nam	济南是山东的省会。	Jǐ'nán shì Shāndōng de shěnghuì.	Tế Nam là tỉnh lỵ của Sơn Đông.	\N	\N	\N
a9242f0b-2fbc-4ba0-8425-d26229c20b67	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	47	鲍全	Bào Quán	Bào Toàn	名叫鲍全。	Míng jiào Bào Quán.	Tên là Bào Toàn.	\N	\N	\N
a4f65043-4bbc-441c-8bca-8057544efb1f	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	48	东海龙王	Dōnghǎi Lóngwáng	Đông Hải Long Vương	东海龙王在海里。	Dōnghǎi lóngwáng zài hǎilǐ.	Đông Hải Long vương ở biển.	\N	\N	\N
7dbb887e-db41-4de5-98d6-9bb8747d2b0b	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	49	趵突泉	Bàotūquán	Suối Bào Đột	天下第一泉趵突泉。	Tiānxià dì yī quán Bàotūquán.	Đệ nhất thiên hạ suối Bào Đột.	\N	\N	\N
23cb95eb-f86f-43a3-8659-5c9078c62111	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	50	舜	Shùn	Vua Thuấn	以人名命名的舜泉。	Yǐ rénmíng mìngmíng de Shùnquán.	Suối Thuấn đặt theo tên người.	\N	\N	\N
c43281d6-9ed9-4320-ae39-e99f6b4df66a	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	51	作品	zuòpǐn	Tác phẩm	优秀的文学作品。	Yōuxiù de wénxué zuòpǐn.	Tác phẩm văn học xuất sắc.	\N	\N	\N
771ec2ff-efac-4d29-84b2-fc51866b4fae	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	52	神话	shénhuà	Thần thoại	中国神话故事。	Zhōngguó shénhuà gùshi.	Câu chuyện thần thoại Trung Quốc.	\N	\N	\N
5eff0939-f2aa-4d10-844c-661346e5e154	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	53	戏剧	xìjù	Hí kịch, kịch	他喜欢看戏剧。	Tā xǐhuan kàn xìjù.	Ông ấy thích xem kịch.	\N	\N	\N
d3bef71f-5893-4908-b57a-82a55c68120f	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	54	风格	fēnggé	Phong cách	独特的艺术风格。	Dútè de yìshù fēnggé.	Phong cách nghệ thuật độc đáo.	\N	\N	\N
d08a90b2-ee5a-46c4-99a5-1bb3630cf9c2	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	55	形象	xíngxiàng	Hình tượng	生动的人物形象。	Shēngdòng de rénwù xíngxiàng.	Hình tượng nhân vật sinh động.	\N	\N	\N
aa264666-cd47-4302-89ef-5d1dffe56a32	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	56	魅力	mèilì	Sức hấp dẫn, mị lực	充满魅力的城市。	Chōngmǎn mèilì de chéngshì.	Thành phố tràn đầy sức hấp dẫn.	\N	\N	\N
5bf31e56-9be9-4868-b1f3-1af1ebddc11e	c56dc1fc-104f-4f7e-b54e-a82981b5dec2	57	生动	shēngdòng	Sinh động	描写得很生动。	Miáoxiě de hěn shēngdòng.	Miêu tả rất sinh động.	\N	\N	\N
aa9532bb-d80f-4f91-ae9a-2991b5b40f47	b9cc4d39-b092-42de-9a9c-c1341741f85d	0	爽快	shuǎngkuai	(adj) sảng khoái, vui vẻ	我和老公爽快地答应下来。	Wǒ hé lǎogōng shuǎngkuai de dāying xiàlái.	Tôi và chồng vui vẻ đồng ý.	\N	\N	\N
1e7f0546-1528-4540-9e32-b67e9af2b890	b9cc4d39-b092-42de-9a9c-c1341741f85d	1	启示	qǐshì	(n/v) bài học, mặc khải, khơi gợi	这件事给了我很多启示。	Zhè jiàn shì gěi le wǒ hěn duō qǐshì.	Chuyện này đã cho tôi rất nhiều bài học.	\N	\N	\N
2ea92763-19b4-44eb-bc35-4093e0dfd0f8	b9cc4d39-b092-42de-9a9c-c1341741f85d	2	老公	lǎogōng	(n) chồng (khẩu ngữ)	我和老公爽快地答应下来。	Wǒ hé lǎogōng shuǎngkuai de dāying xiàlái.	Tôi và chồng vui vẻ đồng ý.	\N	\N	\N
80520575-0b83-4d70-890a-4e9b64dec5b5	b9cc4d39-b092-42de-9a9c-c1341741f85d	3	朝夕相处	zhāoxīxiāngchǔ	(idiom) sớm chiều ở bên	有个孩子和我们的独生女朝夕相处。	Yǒu gè háizi hé wǒmen de dúshēngnǚ zhāoxīxiāngchǔ.	Có một đứa trẻ sớm chiều ở bên con gái một của chúng tôi.	\N	\N	\N
bf8df10b-9625-494b-b19c-ca95eb9b3587	b9cc4d39-b092-42de-9a9c-c1341741f85d	4	巴不得	bābudé	(v) chỉ mong sao, mong vô cùng	我们巴不得呢！	Wǒmen bābudé ne!	Chúng tôi chỉ mong thế!	\N	\N	\N
42d9a9e1-fd65-4a1f-9b4e-5f0829b7dddb	b9cc4d39-b092-42de-9a9c-c1341741f85d	5	嚷	rǎng	(v) kêu gào	最兴奋的是林林，嚷着要欢迎天天。	Zuì xīngfèn de shì Línlín, rǎng zhe yào huānyíng Tiāntiān.	Phấn khích nhất là Lâm Lâm, cứ kêu gào đòi chào đón Thiên Thiên.	\N	\N	\N
4f932d1c-5c91-4186-aa5f-ff76fa62ddcd	b9cc4d39-b092-42de-9a9c-c1341741f85d	6	佳肴	jiāyáo	(n) món ngon	爸爸最拿手的美味佳肴。	Bàba zuì náshǒu de měiwèi jiāyáo.	Món ngon sở trường của bố.	\N	\N	\N
459d8b4b-165d-4bf2-96a8-2392c5fae93e	b9cc4d39-b092-42de-9a9c-c1341741f85d	7	拿手	náshǒu	(adj) sở trường	这是他最拿手的菜。	Zhè shì tā zuì náshǒu de cài.	Đây là món tủ của anh ấy.	\N	\N	\N
cbefbe63-619f-42f7-abf9-61de0661323d	b9cc4d39-b092-42de-9a9c-c1341741f85d	8	别提多…了	biétí duō...le	(phrase) vô cùng...	我和老公别提多高兴了。	Wǒ hé lǎogōng biétí duō gāoxìng le.	Vợ chồng tôi vui vô cùng.	\N	\N	\N
19cb6e19-c92e-4fba-acf8-1853b07e603a	b9cc4d39-b092-42de-9a9c-c1341741f85d	9	异常	yìcháng	(adv) khác thường, đặc biệt	林林就变得异常勤劳。	Línlín jiù biàn de yìcháng qínláo.	Lâm Lâm liền trở nên đặc biệt chăm chỉ.	\N	\N	\N
61b13d4d-7bff-441b-b60b-29331808573f	b9cc4d39-b092-42de-9a9c-c1341741f85d	10	勤劳	qínláo	(adj) cần cù	她是一个勤劳的女孩。	Tā shì yí gè qínláo de nǚhái.	Cô ấy là một cô gái cần cù.	\N	\N	\N
d08bb4d4-d587-4919-b424-629329fed7d8	b9cc4d39-b092-42de-9a9c-c1341741f85d	11	绅士	shēnshì	(n) người lịch thiệp	却也绅士风度十足。	Què yě shēnshì fēngdù shízú.	Nhưng cũng tràn đầy phong độ lịch thiệp.	\N	\N	\N
81a1b113-5657-4cba-82f9-77ff765e2f67	b9cc4d39-b092-42de-9a9c-c1341741f85d	12	风度	fēngdù	(n) phong độ	他很有风度。	Tā hěn yǒu fēngdù.	Anh ấy rất có phong độ.	\N	\N	\N
312a20f4-48bf-4a6c-94c0-396f81ba8310	b9cc4d39-b092-42de-9a9c-c1341741f85d	13	十足	shízú	(adj) tràn đầy	信心十足。	Xìnxīn shízú.	Tràn đầy tự tin.	\N	\N	\N
a9491952-7c89-4776-88eb-48aaa5663687	b9cc4d39-b092-42de-9a9c-c1341741f85d	14	督促	dūcù	(v) đốc thúc	做作业不用督促。	Zuò zuòyè búyòng dūcù.	Làm bài tập không cần đốc thúc.	\N	\N	\N
1fb84051-2469-47c4-b549-b67a5fecf02d	b9cc4d39-b092-42de-9a9c-c1341741f85d	15	打架	dǎ jià	(v) đánh nhau, cãi lộn	她们不打架，不闹别扭。	Tāmen bù dǎjià, bú nào bièniu.	Chúng không đánh nhau, không giận dỗi.	\N	\N	\N
d9b702b5-3a91-4113-b9c7-8a8e010cacde	b9cc4d39-b092-42de-9a9c-c1341741f85d	16	别扭	bièniu	(adj) khó chịu, không tự nhiên, lục đục	两人闹别扭，关系变得很别扭。	Liǎng rén nào bièniu, guānxi biàn de hěn bièniu.	Hai người lục đục, mối quan hệ trở nên rất gượng gạo.	\N	\N	\N
b05407d8-906b-49d3-a94b-cc802b97af00	b9cc4d39-b092-42de-9a9c-c1341741f85d	17	闹别扭	nào bièniu	(v) giận dỗi	她们不打架，不闹别扭。	Tāmen bù dǎjià, bú nào bièniu.	Chúng không đánh nhau, không giận dỗi.	\N	\N	\N
a53781e9-4ecb-438b-bec4-3c2bfb0f43d6	b9cc4d39-b092-42de-9a9c-c1341741f85d	18	融洽	róngqià	(adj) hòa hợp	关系别提多融洽了。	Guānxi biétí duō róngqià le.	Mối quan hệ vô cùng hòa hợp.	\N	\N	\N
4fef1117-fb45-45c3-a620-16787d4bd165	b9cc4d39-b092-42de-9a9c-c1341741f85d	19	亲密	qīnmì	(adj) thân mật, mật thiết	看到女儿和天天这么亲密。	Kàn dào nǚér hé Tiāntiān zhème qīnmì.	Nhìn thấy con gái và Thiên Thiên thân thiết như vậy.	\N	\N	\N
232f9b34-1f4f-4dd7-8f85-b35f4c898dcc	b9cc4d39-b092-42de-9a9c-c1341741f85d	20	忽略	hūlüè	(v) xem nhẹ, phớt lờ	大有忽略我们的趋势。	Dà yǒu hūlüè wǒmen de qūshì.	Có xu hướng phớt lờ chúng tôi.	\N	\N	\N
418210d2-b670-4678-b89b-0c5bec5c4629	b9cc4d39-b092-42de-9a9c-c1341741f85d	21	嫉妒	jídù	(v) đố kỵ	我和老公都有点儿嫉妒了。	Wǒ hé lǎogōng dōu yǒudiǎnr jídù le.	Vợ chồng tôi đều có chút đố kỵ.	\N	\N	\N
b6a843c0-820b-468c-810d-f73cbcc24dc1	b9cc4d39-b092-42de-9a9c-c1341741f85d	22	滔滔不绝	tāotāo bù jué	(idiom) thao thao bất tuyệt	她滔滔不绝地讲了一个小时。	Tā tāotāo bù jué de jiǎng le yí gè xiǎoshí.	Cô ấy thao thao bất tuyệt kể suốt một tiếng đồng hồ.	\N	\N	\N
72f47a75-fc9a-409b-b80a-f7721e7a7627	b9cc4d39-b092-42de-9a9c-c1341741f85d	23	嘲笑	cháoxiào	(v) chế cười, chế nhạo	我们不应该嘲笑别人的缺点。	Wǒmen bù yīnggāi cháoxiào biérén de quēdiǎn.	Chúng ta không nên chế nhạo khuyết điểm của người khác.	\N	\N	\N
2c7a08de-b917-47e4-a4d2-3ffb3d3ec46e	b9cc4d39-b092-42de-9a9c-c1341741f85d	24	讨好	tǎohǎo	(v) lấy lòng, nịnh hót	他为了讨好老板，每天都加班。	Tā wèile tǎohǎo lǎobǎn, měitiān dōu jiābān.	Anh ta vì lấy lòng sếp mà ngày nào cũng tăng ca.	\N	\N	\N
51490cc6-bd09-4a36-99c7-5833ba9cac97	b9cc4d39-b092-42de-9a9c-c1341741f85d	25	郑重	zhèngzhòng	(adj) trịnh trọng, nghiêm túc	我郑重地向大家宣布一件事。	Wǒ zhèngzhòng de xiàng dàjiā xuānbù yí jiàn shì.	Tôi trịnh trọng tuyên bố với mọi người một chuyện.	\N	\N	\N
572a9151-952d-43e0-a844-2c273d02d5ad	b9cc4d39-b092-42de-9a9c-c1341741f85d	26	当面	dāngmiàn	(adv) trực tiếp, trước mặt	有什么意见，请当面告诉我。	Yǒu shénme yìjiàn, qǐng dāngmiàn gàosu wǒ.	Có ý kiến gì, xin hãy nói trực tiếp trước mặt tôi.	\N	\N	\N
de64cc7a-7331-4fa1-99c5-bbaa170e2887	b9cc4d39-b092-42de-9a9c-c1341741f85d	27	人家	rénjia	(pron) người ta, người khác	不要随便拿人家的东西。	Búyào suíbiàn ná rénjia de dōngxi.	Đừng tùy tiện lấy đồ của người khác.	\N	\N	\N
98721910-174c-4348-ab99-edd7e86d783f	b9cc4d39-b092-42de-9a9c-c1341741f85d	28	附和	fùhè	(v) phụ họa, hùa theo	别人说什么，他就随声附和。	Biérén shuō shénme, tā jiù suíshēng fùhè.	Người khác nói gì, cậu ta liền hùa theo.	\N	\N	\N
da1ef052-a804-454e-8840-6c82cd800e24	b9cc4d39-b092-42de-9a9c-c1341741f85d	29	大伙儿	dàhuǒr	(pron) mọi người	大伙儿一起努力，把工作做完了。	Dàhuǒr yìqǐ nǔlì, bǎ gōngzuò zuò wán le.	Mọi người cùng nhau nỗ lực làm xong công việc.	\N	\N	\N
5827f0f2-0872-48b4-9b3b-f9c51be9edd6	b9cc4d39-b092-42de-9a9c-c1341741f85d	30	和睦	hémù	(adj) hòa thuận, hòa hợp	邻居之间应该和睦相处。	Línjū zhī jiān yīnggāi hémù xiāngchǔ.	Hàng xóm láng giềng nên sống hòa thuận với nhau.	\N	\N	\N
88efdd82-e114-4a16-b766-cc479c79569d	b9cc4d39-b092-42de-9a9c-c1341741f85d	31	宽容	kuānróng	(v/adj) khoan dung	父母对孩子的错误总是很宽容。	Fùmǔ duì háizi de cuòwù zǒngshì hěn kuānróng.	Cha mẹ luôn rất khoan dung với lỗi lầm của con cái.	\N	\N	\N
5d1e3de6-14e2-4680-a155-2621ef2b81a8	b9cc4d39-b092-42de-9a9c-c1341741f85d	32	疑惑	yíhuò	(n) sự nghi ngờ, nghi hoặc	女儿一脸的疑惑，不知道怎么回事。	Nǚér yì liǎn de yíhuò, bù zhīdào zěnme huí shì.	Con gái vẻ mặt đầy nghi hoặc, không biết có chuyện gì.	\N	\N	\N
eba9d81a-df11-46e5-b340-9d14a21014cb	b9cc4d39-b092-42de-9a9c-c1341741f85d	33	反问	fǎnwèn	(v) hỏi ngược lại	面对我的问题，他反问了一句。	Miànduì wǒ de wèntí, tā fǎnwèn le yí jù.	Đối diện với câu hỏi của tôi, anh ấy hỏi ngược lại một câu.	\N	\N	\N
46fce72d-db90-4460-b89e-f39f79d9a3d7	b9cc4d39-b092-42de-9a9c-c1341741f85d	34	瞬间	shùnjiān	(n) phút chốc, chốc lát	那个美丽的画面瞬间消失了。	Nà gè měilì de huàmiàn shùnjiān xiāoshī le.	Bức tranh tuyệt đẹp đó trong phút chốc đã biến mất.	\N	\N	\N
fd40a4dc-442c-4ae8-ab48-549f5211c195	b9cc4d39-b092-42de-9a9c-c1341741f85d	35	鸦雀无声	yāquè-wúshēng	(idiom) im phăng phắc	屋子里鸦雀无声，非常安静。	Wūzi lǐ yāquè-wúshēng, fēicháng ānjìng.	Trong phòng im phăng phắc, vô cùng yên tĩnh.	\N	\N	\N
7f4fde37-0776-4431-b27c-ca5d921310cf	b9cc4d39-b092-42de-9a9c-c1341741f85d	36	启蒙	qǐméng	(v) vỡ lòng, nhập môn	父母是孩子的第一任启蒙老师。	Fùmǔ shì háizi de dì yī rèn qǐméng lǎoshī.	Cha mẹ là giáo viên vỡ lòng đầu tiên của con cái.	\N	\N	\N
671a3d4f-d3b5-4f53-b7c2-740c09644103	b9cc4d39-b092-42de-9a9c-c1341741f85d	37	任	rèn	(q) lượng từ (nhiệm kỳ, chức vụ)	这是他担任校长的第一任。	Zhè shì tā dānrèn xiàozhǎng de dì yī rèn.	Đây là nhiệm kỳ đầu tiên ông ấy làm hiệu trưởng.	\N	\N	\N
4d4b4b9e-b889-4d5f-916b-a408a9ee2ec5	b9cc4d39-b092-42de-9a9c-c1341741f85d	38	反驳	fǎnbó	(v) phản bác, bắt bẻ	我不同意他的观点，于是反驳了他。	Wǒ bù tóngyì tā de guāndiǎn, yúshì fǎnbó le tā.	Tôi không đồng ý quan điểm của anh ấy, thế là phản bác lại.	\N	\N	\N
8b4b1a42-921e-4f00-9822-08383f7b47f6	b9cc4d39-b092-42de-9a9c-c1341741f85d	39	意识	yìshí	(v) ý thức được, nhận thức	我突然意识到自己犯了一个错误。	Wǒ tūrán yìshí dào zìjǐ fàn le yí gè cuòwù.	Tôi bỗng nhận thức được mình đã phạm một sai lầm.	\N	\N	\N
fb08eef3-36dc-42d2-9394-2c83b6c8a766	b9cc4d39-b092-42de-9a9c-c1341741f85d	40	实行	shíxíng	(v) thực hiện, thi hành	公司从明天起实行新的规定。	Gōngsī cóng míngtiān qǐ shíxíng xīn de guīdìng.	Công ty bắt đầu thi hành quy định mới từ ngày mai.	\N	\N	\N
e22b2a60-5d8a-459a-b17b-7289d4a66e10	b9cc4d39-b092-42de-9a9c-c1341741f85d	41	严厉	yánlì	(adj) nghiêm khắc, khắt khe	父亲对我总是非常严厉。	Fùqīn duì wǒ zǒngshì fēicháng yánlì.	Bố đối với tôi luôn vô cùng nghiêm khắc.	\N	\N	\N
99e2cd23-0e44-4215-9fea-664659f840b9	b9cc4d39-b092-42de-9a9c-c1341741f85d	42	约束	yuēshù	(v) ràng buộc, kiềm chế	我们要学会约束自己的言行。	Wǒmen yào xuéhuì yuēshù zìjǐ de yánxíng.	Chúng ta phải học cách kiềm chế ngôn từ và hành động của mình.	\N	\N	\N
cc659d2c-83e3-44e9-942f-5d5b4454519c	b9cc4d39-b092-42de-9a9c-c1341741f85d	43	留恋	liúliàn	(v) lưu luyến	毕业了，大家都很留恋校园生活。	Bìyè le, dàjiā dōu hěn liúliàn xiàoyuán shēnghuó.	Tốt nghiệp rồi, mọi người đều rất lưu luyến cuộc sống vườn trường.	\N	\N	\N
86222b25-62ad-4807-889d-c1cde4d6709d	b9cc4d39-b092-42de-9a9c-c1341741f85d	44	开朗	kāilǎng	(adj) cởi mở, vui vẻ	她的性格很开朗，朋友很多。	Tā de xìnggé hěn kāilǎng, péngyǒu hěn duō.	Tính cách cô ấy rất cởi mở, bạn bè rất nhiều.	\N	\N	\N
e347bc55-4b09-4cfa-a9c1-53a145bbb68e	b9cc4d39-b092-42de-9a9c-c1341741f85d	45	闲话	xiánhuà	(n) chuyện phiếm, lời đồn	不要总在背后说别人的闲话。	Búyào zǒng zài bèihòu shuō biérén de xiánhuà.	Đừng luôn nói chuyện phiếm nói xấu người khác sau lưng.	\N	\N	\N
2010d8e7-69a5-43fa-ab39-486a6b46feb0	b9cc4d39-b092-42de-9a9c-c1341741f85d	46	风趣	fēngqù	(adj) hóm hỉnh, hài hước	他说话很风趣，经常逗得大家笑。	Tā shuōhuà hěn fēngqù, jīngcháng dòu de dàjiā xiào.	Anh ấy nói chuyện rất hóm hỉnh, thường xuyên chọc cười mọi người.	\N	\N	\N
a38dd9c0-aca5-46af-b03f-23d90a977c3f	b9cc4d39-b092-42de-9a9c-c1341741f85d	47	恩怨	ēnyuàn	(n) ân oán	他们之间的恩怨终于解开了。	Tāmen zhī jiān de ēnyuàn zhōngyú jiěkāi le.	Ân oán giữa bọn họ cuối cùng cũng được gỡ bỏ.	\N	\N	\N
f64a4f15-5179-4f08-8415-090f4f365c0a	b9cc4d39-b092-42de-9a9c-c1341741f85d	48	娇气	jiāoqi	(adj) ủy mị, hay nũng nịu	这个小女孩有点儿娇气，怕吃苦。	Zhè gè xiǎo nǚhái yǒudiǎnr jiāoqi, pà chīkǔ.	Cô bé này hơi tiểu thư nũng nịu, sợ chịu khổ.	\N	\N	\N
292e8933-a88e-4f59-8209-78e1f62f2039	b9cc4d39-b092-42de-9a9c-c1341741f85d	49	伶俐	línglì	(adj) lanh lợi, thông minh	她是一个聪明伶俐的好孩子。	Tā shì yí gè cōngmíng línglì de hǎo háizi.	Cô bé là một đứa trẻ thông minh lanh lợi.	\N	\N	\N
4c80d247-af9e-4333-8b63-3d397070f72d	b9cc4d39-b092-42de-9a9c-c1341741f85d	50	挑剔	tiāoti	(v/adj) kén chọn, hay soi mói	他对吃的东西非常挑剔。	Tā duì chī de dōngxi fēicháng tiāoti.	Anh ấy vô cùng kén chọn đối với đồ ăn.	\N	\N	\N
e4950f60-ea62-4d40-8089-98e7945f9e3b	b9cc4d39-b092-42de-9a9c-c1341741f85d	51	挑拨	tiǎobō	(v) ly gián, xúi giục	有人在他们之间挑拨离间。	Yǒurén zài tāmen zhī jiān tiǎobō líjiàn.	Có người xúi giục chia rẽ ở giữa bọn họ.	\N	\N	\N
96f579c4-78b0-4248-a4f8-39ee6478a725	b9cc4d39-b092-42de-9a9c-c1341741f85d	52	气质	qìzhì	(n) khí chất	这位艺术家有一种独特的气质。	Zhè wèi yìshùjiā yǒu yì zhǒng dútè de qìzhì.	Vị nghệ sĩ này có một khí chất rất độc đáo.	\N	\N	\N
0b921275-78c5-46e9-87b0-14089d6f5ced	b9cc4d39-b092-42de-9a9c-c1341741f85d	53	容貌	róngmào	(n) dung mạo	她的容貌非常出众，很吸引人。	Tā de róngmào fēicháng chūzhòng, hěn xīyǐn rén.	Dung mạo của cô ấy rất xuất chúng, rất thu hút người khác.	\N	\N	\N
31e4a646-46d1-4499-99c4-4366794943bc	b9cc4d39-b092-42de-9a9c-c1341741f85d	54	福气	fúqì	(n) phúc khí, may mắn	孩子们都很孝顺，她真有福气。	Háizimen dōu hěn xiàoshùn, tā zhēn yǒu fúqì.	Các con đều rất hiếu thảo, bà ấy thật có phúc.	\N	\N	\N
77b59eab-89f5-481d-8719-79e436c7216e	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	0	和蔼	hé'ǎi	(tt) Hòa nhã, ôn hòa	他们对我态度和蔼。	Tāmen duì wǒ tàidù hé'ǎi.	Họ đối với tôi thái độ rất ôn hòa.	\N	\N	\N
9b9b68be-173f-452c-a381-11a810690aec	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	1	和气	héqi	(tt) Điềm đạm, nhã nhặn, hòa thuận	父母说话很和气。	Fùmǔ shuōhuà hěn héqi.	Bố mẹ nói chuyện rất nhã nhặn.	\N	\N	\N
9008c04f-b271-4a7f-92d7-9a06df6027a4	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	2	目光	mùguāng	(dt) Ánh mắt	目光中充满着慈祥。	Mùguāng zhōng chōngmǎn zhe cíxiáng.	Trong ánh mắt tràn ngập vẻ hiền từ.	\N	\N	\N
e7dddfa1-9a0e-4370-84dd-6121a62550de	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	3	慈祥	cíxiáng	(tt) Hiền từ, hiền hậu	爷爷的笑容很慈祥。	Yéye de xiàoróng hěn cíxiáng.	Nụ cười của ông nội rất hiền từ.	\N	\N	\N
3c615f24-b57e-4ca3-8e8f-2fb6c396a018	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	4	跨	kuà	(đgt) Bước	在跨进大学校门之前。	Zài kuà jìn dàxué xiàomén zhīqián.	Trước khi bước vào cổng trường đại học.	\N	\N	\N
722dd49c-b718-4422-b292-bfa7161131a4	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	5	自主	zìzhǔ	(đgt) Tự chủ	独立自主的能力。	Dúlì zìzhǔ de nénglì.	Năng lực độc lập tự chủ.	\N	\N	\N
062e8554-664f-40b3-98ab-594fdb77ddbb	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	6	甭	béng	(phó) Không cần, khỏi phải	就甭提了。	Jiù béng tí le.	Thì khỏi phải nhắc tới luôn.	\N	\N	\N
cb96a2ae-f2e6-42bd-9a6f-4e9c269c2747	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	7	脱离	tuōlí	(đgt) Thoát khỏi, rời khỏi	脱离父母，独立生活。	Tuōlí fùmǔ, dúlì shēnghuó.	Rời khỏi bố mẹ, sống tự lập.	\N	\N	\N
0b5b7a7b-1b36-4a32-8183-6928ca141abc	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	8	诱惑	yòuhuò	(đgt) Mê hoặc, cám dỗ, hấp dẫn	独立生活对我具有巨大的诱惑。	Dúlì shēnghuó duì wǒ jùyǒu jùdà de yòuhuò.	Cuộc sống tự lập có sức cám dỗ to lớn đối với tôi.	\N	\N	\N
5e83a682-9d7e-499c-9277-22bda8cff642	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	9	无比	wúbǐ	(đgt) Không thể sánh được, vô cùng	让我无比向往。	Ràng wǒ wúbǐ xiàngwǎng.	Làm tôi vô cùng khao khát.	\N	\N	\N
e3ed33a4-a031-40fa-ae01-f5325fecdaab	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	10	向往	xiàngwǎng	(đgt) Mong mỏi, khao khát	我向往自由的生活。	Wǒ xiàngwǎng zìyóu de shēnghuó.	Tôi khao khát một cuộc sống tự do.	\N	\N	\N
2de60770-ea59-4822-9745-1ed064998dc9	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	11	孤独	gūdú	(tt) Cô độc, cô đơn	心里的孤独感一下子跑了出来。	Xīnlǐ de gūdú gǎn yíxiàzi pǎo le chūlái.	Cảm giác cô đơn trong lòng bỗng chốc ùa ra.	\N	\N	\N
a1f677d3-c8fa-4eb0-85af-24044bb06dd1	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	12	哭鼻子	kū bízi	(cụm từ) Khóc (khóc nhè mếu máo)	同学一给家里打电话就哭鼻子。	Tóngxué yì gěi jiālǐ dǎ diànhuà jiù kū bízi.	Bạn học hễ gọi điện về nhà là khóc nhè.	\N	\N	\N
f203dfe6-3322-4b0e-baa0-2a5ea4f90666	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	13	片刻	piànkè	(dt) Phút chốc, giây phút	片刻不停地往家赶。	Piànkè bù tíng de wǎng jiā gǎn.	Vội vã chạy về nhà không ngừng nghỉ giây phút nào.	\N	\N	\N
5b611511-d00f-467a-b568-a5fd560d000a	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	14	步伐	bùfá	(dt) Bước đi, nhịp bước	阻挡不了大家回家的步伐。	Zǔdǎng bù liǎo dàjiā huíjiā de bùfá.	Không thể ngăn cản bước chân về nhà của mọi người.	\N	\N	\N
1caf2e4e-b39a-4244-8993-48c87dbcd96e	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	15	包围	bāowéi	(đgt) Bao quanh, vây quanh	被亲情包围的幸福。	Bèi qīnqíng bāowéi de xìngfú.	Sự hạnh phúc khi được tình thân bao bọc.	\N	\N	\N
57fec5f2-25fc-44e5-95d3-8e87c865fb5a	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	16	感染	gǎnrǎn	(đgt) Lây, lan truyền sang, lây nhiễm	这种快乐感染了我。	Zhè zhǒng kuàilè gǎnrǎn le wǒ.	Sự vui vẻ này đã lây truyền sang tôi.	\N	\N	\N
ea4eec88-2b5f-44f4-b0fe-6651e3ed552e	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	17	恨不得	hènbude	(đgt) Nóng lòng muốn, rất mong muốn	我也恨不得马上飞到父母跟前。	Wǒ yě hènbude mǎshàng fēi dào fùmǔ gēnqián.	Tôi cũng nóng lòng muốn bay ngay đến bên cạnh bố mẹ.	\N	\N	\N
cafbcc21-476c-426a-9aa5-f5be7b4c43ae	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	18	跟前	gēnqián	(dt) Bên cạnh, gần	我想回到父母跟前。	Wǒ xiǎng huídào fùmǔ gēnqián.	Tôi muốn trở về bên cạnh bố mẹ.	\N	\N	\N
fabd2be9-6666-4e38-aa39-a01e4cbae526	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	19	团圆	tuányuán	(đgt) Đoàn tụ, sum họp	与他们团圆。	Yǔ tāmen tuányuán.	Sum họp cùng với họ.	\N	\N	\N
eb9d272a-4ed5-45b0-813b-a2d8b6bd30c6	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	20	近来	jìnlái	(dt) Dạo này, gần đây	近来他们比较忙。	Jìnlái tāmen bǐjiào máng.	Dạo gần đây họ khá bận.	\N	\N	\N
fc170a0a-30d5-451c-bbad-9471d28b3a86	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	21	酝酿	yùnniàng	(đgt) Ấp ủ, chuẩn备	酝酿已久的恋家情绪。	Yùnniàng yǐ jiǔ de liàn jiā qíngxù.	Cảm xúc nhớ nhà đã ấp ủ từ lâu.	\N	\N	\N
c6bf4634-0bd6-4709-a55e-502af93ecbc6	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	22	刹那	chànà	(dt) Giây lát, chốc lát	刹那间就没有了。	Chànà jiān jiù méiyǒu le.	Trong giây lát đã không còn nữa.	\N	\N	\N
45714853-64f2-4f5d-a82b-e3e6a6c10991	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	23	反常	fǎncháng	(tt) Khác thường, lạ	我无法理解父母的反常。	Wǒ wúfǎ lǐjiě fùmǔ de fǎncháng.	Tôi không cách nào hiểu được sự khác thường của bố mẹ.	\N	\N	\N
40d101f0-cf38-44f4-bb7b-454fb5e6cc8c	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	24	埋怨	mányuàn	(đgt) Oán trách	心中暗暗埋怨父母。	Xīnzhōng àn'àn mányuàn fùmǔ.	Trong lòng thầm oán trách bố mẹ.	\N	\N	\N
897e26fa-0c5e-44c5-8859-3143559a5280	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	25	体谅	tǐliàng	(đgt) Thông cảm, thấu hiểu	埋怨他们不体谅我。	Mányuàn tāmen bù tǐliàng wǒ.	Trách họ không thấu hiểu tôi.	\N	\N	\N
096895f6-9bea-41d5-b722-9b31e74a47be	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	26	无精打采	wújīng-dǎcǎi	(cụm từ) Buồn bã, phờ phạc, thẫn thờ	无精打采了几天之后。	Wújīng-dǎcǎi le jǐ tiān zhīhòu.	Sau vài ngày thẫn thờ buồn bã.	\N	\N	\N
0ab062b4-be74-4deb-8e41-8765a0dc0250	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	27	规划	guīhuà	(đgt) Lập kế hoạch	我不得不开始规划怎样度过假期。	Wǒ bùdébù kāishǐ guīhuà zěnyàng dùguò jiàqī.	Tôi không thể không bắt đầu lập kế hoạch làm sao để trải qua kỳ nghỉ.	\N	\N	\N
5257b100-268b-42a7-af45-f011c106754d	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	28	熬	áo	(đgt) Chịu đựng, thức đêm	熬过漫长的假期。	Áo guò màncháng de jiàqī.	Chịu đựng cho qua kỳ nghỉ dài đằng đẵng.	\N	\N	\N
b3bd1316-384f-48f6-854c-7fb59da2f909	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	29	漫长	màncháng	(tt) Dài dằng dặc	熬过漫长的假期。	Áo guò màncháng de jiàqī.	Chịu đựng cho qua kỳ nghỉ dài đằng đẵng.	\N	\N	\N
76902c1e-30ac-4cd5-ad2a-47d2ba7a17e7	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	30	寂静	jìjìng	(tt) Vắng vẻ, yên tĩnh	假期的校园寂静得很。	Jiàqī de xiàoyuán jìjìng de hěn.	Khuôn viên trường kỳ nghỉ rất vắng vẻ yên tĩnh.	\N	\N	\N
41a0cf4d-18a7-4e26-bc6e-e17aacd59bee	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	31	稿件	gǎojiàn	(dt) Bài viết, bản thảo	给杂志社写稿件。	Gěi zázhìshè xiě gǎojiàn.	Viết bản thảo cho tòa soạn tạp chí.	\N	\N	\N
395376d8-7ccb-4eb4-8d9e-6beefeaa003c	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	32	难得	nándé	(tt) Hiếm có, khó có được	发现在难得的寂静中工作很美好。	Fāxiàn zài nándé de jìjìng zhōng gōngzuò hěn měihǎo.	Phát hiện làm việc trong sự yên tĩnh hiếm có rất tuyệt vời.	\N	\N	\N
94b262c6-f95a-4a1b-b95b-ca9f340d9f98	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	33	心疼	xīnténg	(đgt) Đau lòng, thương xót	母亲脸上满是心疼。	Mǔqīn liǎn shàng mǎn shì xīnténg.	Trên mặt mẹ tràn đầy sự xót xa.	\N	\N	\N
f67b3073-e68b-417d-8892-3067d2744160	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	34	掩饰	yǎnshì	(đgt) Che đậy, che giấu	那情绪瞬间就被她掩饰起来。	Nà qíngxù shùnjiān jiù bèi tā yǎnshì qǐlái.	Cảm xúc đó bỗng chốc bị bà ấy che giấu đi.	\N	\N	\N
047f59da-dcd9-484d-b411-35b8a1f17d88	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	35	隐瞒	yǐnmán	(đgt) Giấu giếm, giấu kín	他们在隐瞒什么呢？	Tāmen zài yǐnmán shénme ne?	Bọn họ đang giấu giếm điều gì thế?	\N	\N	\N
37714127-9aa1-413b-afb6-169e43e15541	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	36	唠叨	láodao	(đgt) Lải nhải, huyên thuyên	母亲还在跟父亲唠叨。	Mǔqīn hái zài gēn fùqīn láodao.	Mẹ vẫn còn đang lải nhải với bố.	\N	\N	\N
c6482a55-e01a-42dc-839c-0a363d84aaf1	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	37	吃苦	chī kǔ	(đgt) Chịu khổ	肯定是吃苦了。	Kěndìng shì chī kǔ le.	Chắc chắn là đã chịu khổ rồi.	\N	\N	\N
cd502729-9618-45a4-819c-a35385a2934f	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	38	欣慰	xīnwèi	(tt) Vui mừng và yên tâm	她的变化还是挺让咱们欣慰的。	Tā de biànhuà háishì tǐng ràng zánmen xīnwèi de.	Sự thay đổi của con bé vẫn khá làm chúng ta thấy an ủi.	\N	\N	\N
19f3adc2-21f4-4b52-b710-de6747083b0c	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	39	本事	běnshi	(dt) Bản lĩnh, khả năng	不吃苦，怎么长本事？	Bù chī kǔ, zěnme zhǎng běnshi?	Không chịu khổ, làm sao nâng cao được bản lĩnh?	\N	\N	\N
74a5f38b-52f5-445b-875b-49a7e55439ce	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	40	皱纹	zhòuwén	(dt) Nếp nhăn	眼角越来越深的皱纹。	Yǎnjiǎo yuèláiyuè shēn de zhòuwén.	Nếp nhăn nơi khóe mắt ngày càng sâu.	\N	\N	\N
0785177e-5de3-41a3-b35d-60c44e8e9998	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	41	顿时	dùnshí	(phó) Ngay tức khắc	顿时什么都明白了。	Dùnshí shénme dōu míngbái le.	Ngay tức khắc đã hiểu ra tất cả.	\N	\N	\N
deda2437-5d7e-48bc-857b-0ddcca639def	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	42	不由得	bùyóude	(phó) Không kìm được, không nhịn được	不由得热泪盈眶。	Bùyóude rèlèi yíng kuàng.	Không kìm được nước mắt lưng tròng.	\N	\N	\N
6f9f5e61-7144-461d-9a54-b203c5bc3b27	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	43	热泪盈眶	rèlèi yíng kuàng	(cụm từ) Rơm rớm nước mắt, nước mắt lưng tròng	感动得不由得热泪盈眶。	Gǎndòng de bùyóude rèlèi yíng kuàng.	Cảm động đến mức không kìm được rơm rớm nước mắt.	\N	\N	\N
b1ea23b5-6b76-4a4d-819c-eb8dc08ffe13	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	44	掰	bāi	(đgt) Tẽ; tách; cạy; bẻ	把玉米掰下来。	Bǎ yùmǐ bāi xiàlái.	Bẻ bắp ngô xuống.	\N	\N	\N
a322e942-4263-4623-9477-235f13477d17	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	45	鞠躬	jūgōng	(đgt) Cúi chào; cúi đầu; cúi mình	他向观众深鞠躬。	Tā xiàng guānzhòng shēn jūgōng.	Anh ấy cúi chào khán giả thật sâu.	\N	\N	\N
022c629e-c277-4a80-9155-1aadafa201f5	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	46	扛	gāng / káng	(đgt) Giơ lên / Vác; khiêng (dùng vai, lưng)	把这袋米扛回去。	Bǎ zhè dài mǐ káng huíqù.	Vác bao gạo này về.	\N	\N	\N
f84cb637-6ece-49ed-ab20-64596686907b	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	47	搀扶	chānfú	(đgt) Dìu dắt, đỡ, dìu (người già hoặc người bất tiện)	搀扶老人过马路。	Chānfú lǎorén guò mǎlù.	Dìu người già qua đường.	\N	\N	\N
2c60c57f-2419-4f41-8c65-e99acef2f39a	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	48	挎	kuà	(đgt) Cắp; xách; khoác; mang	她挎着一个名牌包。	Tā kuà zhe yí gè míngpái bāo.	Cô ấy khoác một chiếc túi hàng hiệu.	\N	\N	\N
466d7849-eaae-4839-8d65-0a478ef0614c	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	49	飞翔	fēixiáng	(đgt) Bay lượn	鸟儿在空中自由飞翔。	Niǎo'er zài kōngzhōng zìyóu fēixiáng.	Những chú chim tự do bay lượn trên không trung.	\N	\N	\N
16724f94-493a-4447-9018-66e3c479c821	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	50	啃	kěn	(đgt) Gặm; rỉa; nghiến	小狗在啃骨头。	Xiǎo gǒu zài kěn gǔtou.	Chú cún đang gặm xương.	\N	\N	\N
20605b51-86b0-43d1-a86d-08f69f61d37b	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	51	晾	liàng	(đgt) Phơi nắng, hong khô	把衣服晾在外面。	Bǎ yīfu liàng zài wàimiàn.	Phơi quần áo ra bên ngoài.	\N	\N	\N
a8083f8f-c325-4283-9ebe-f861a738535a	0a6cda04-9de8-4c14-8c7c-0898e1044a4e	52	敬礼	jìnglǐ	(đgt) Chào, nghiêm chào	少先队员向国旗敬礼。	Shàoxiānduìyuán xiàng guóqí jìnglǐ.	Đội viên thiếu niên tiền phong nghiêm chào quốc kỳ.	\N	\N	\N
b2c4a053-66b2-4bf1-9783-244a3b27d85d	7e95c23b-0171-4f96-9541-36eb895ce6a8	0	月饼	yuèbǐng	(dt) Bánh Trung thu	中秋节吃月饼。	Zhōngqiū jié chī yuèbǐng.	Tết Trung thu ăn bánh trung thu.	\N	\N	\N
e953d6ee-0c67-4957-b5bb-08cfceb8f354	7e95c23b-0171-4f96-9541-36eb895ce6a8	1	清晨	qīngchén	(dt) Sáng sớm	清晨的空气很新鲜。	Qīngchén de kōngqì hěn xīnxiān.	Không khí buổi sáng sớm rất trong lành.	\N	\N	\N
25d77e6b-a4c3-4e86-9638-64f90033135b	7e95c23b-0171-4f96-9541-36eb895ce6a8	2	迎面	yíngmiàn	(phó) Trước mặt, đối diện	一阵冷风迎面吹来。	Yí zhèn lěng fēng yíngmiàn chuī lái.	Một trận gió lạnh thổi thẳng vào mặt.	\N	\N	\N
e5877b93-083b-47c2-a44c-3792ffabb784	7e95c23b-0171-4f96-9541-36eb895ce6a8	3	模样	múyàng	(dt) Vẻ bề外, diện mạo	他一副学生模样。	Tā yí fù xuéshēng múyàng.	Cậu ấy mang vẻ ngoài của một học sinh.	\N	\N	\N
88ca63ac-b389-459a-a723-54c13e43f47a	7e95c23b-0171-4f96-9541-36eb895ce6a8	4	打量	dǎliang	(đgt) Quan sát, nhìn kỹ (diện mạo, quần áo)	他上下打量了我一番。	Tā shàngxià dǎliang le wǒ yì fān.	Anh ta nhìn tôi chăm chú từ trên xuống dưới một lượt.	\N	\N	\N
bfb78a21-c6fb-4ef2-ab9a-073683479304	7e95c23b-0171-4f96-9541-36eb895ce6a8	5	番	fān	(lượng) Lượt, hồi, lần	他把事情解释了一番。	Tā bǎ shìqíng jiěshì le yì fān.	Anh ấy đã giải thích sự việc một lượt.	\N	\N	\N
a678c9a1-77d0-4f01-ac3f-295830c9410d	7e95c23b-0171-4f96-9541-36eb895ce6a8	6	搓	cuō	(đgt) Xoa, vò	他冷得直搓手。	Tā lěng de zhí cuō shǒu.	Anh ấy lạnh đến mức cứ xoa tay vào nhau.	\N	\N	\N
ca327d21-5d61-4e5e-8787-2b097102a4a4	7e95c23b-0171-4f96-9541-36eb895ce6a8	7	迟疑	chíyí	(tt) Chần chừ, ngập ngừng	他迟疑了一下，没有说话。	Tā chíyí le yíxià, méiyǒu shuōhuà.	Anh ấy ngập ngừng một lát rồi không nói gì.	\N	\N	\N
66339823-2ff8-458d-9e8e-b476be72c7e9	7e95c23b-0171-4f96-9541-36eb895ce6a8	8	拜托	bàituō	(đgt) Xin nhờ	这件事就拜托你了。	Zhè jiàn shì jiù bàituō nǐ le.	Chuyện này xin nhờ bạn rồi.	\N	\N	\N
21381670-57ec-4871-8181-4e5ed7f6a10f	7e95c23b-0171-4f96-9541-36eb895ce6a8	9	饱经沧桑	bǎojīng-cāngsāng	(thành ngữ) Nếm đủ mùi đời, từng trải vất vả	老人饱经沧桑的脸上刻满了皱纹。	Lǎorén bǎojīng-cāngsāng de liǎn shàng kè mǎn le zhòuwén.	Trên khuôn mặt sương gió nếm đủ mùi đời của cụ già hằn đầy nếp nhăn.	\N	\N	\N
b2de1105-cb78-4983-a8d7-7694726bb5bf	7e95c23b-0171-4f96-9541-36eb895ce6a8	10	流露	liúlù	(đgt) Bộc lộ, để lộ ra	她的眼中流露出喜悦之情。	Tā de yǎn zhōng liúlù chū xǐyuè zhī qíng.	Trong ánh mắt cô ấy bộc lộ ra vẻ vui sướng.	\N	\N	\N
2b683591-e6ef-4926-8a52-317a1ce184a0	7e95c23b-0171-4f96-9541-36eb895ce6a8	11	朴实	pǔshí	(tt) Thật thà, chất phác	他是一个朴实的农民。	Tā shì yí gè pǔshí de nóngmín.	Ông ấy là một người nông dân chất phác.	\N	\N	\N
8d1bff9e-1bc7-43df-864e-834fed91de1b	7e95c23b-0171-4f96-9541-36eb895ce6a8	12	过于	guòyú	(phó) Quá	你过于小心了。	Nǐ guòyú xiǎoxīn le.	Bạn quá cẩn thận rồi.	\N	\N	\N
93d7cc2e-33e7-4e49-9818-dc3a8034ca92	7e95c23b-0171-4f96-9541-36eb895ce6a8	13	操劳	cāoláo	(đgt) Làm việc vất vả	父母为我们操劳了一辈子。	Fùmǔ wèi wǒmen cāoláo le yíbèizi.	Bố mẹ đã làm việc vất vả vì chúng ta cả một đời.	\N	\N	\N
49e44cc1-424f-4caa-baa2-0fe84e60c510	7e95c23b-0171-4f96-9541-36eb895ce6a8	14	胡须	húxū	(dt) Râu	他的胡须很长。	Tā de húxū hěn cháng.	Râu của ông ấy rất dài.	\N	\N	\N
8ca09775-cc59-4661-abaa-79463b4a5325	7e95c23b-0171-4f96-9541-36eb895ce6a8	15	起码	qǐmǎ	(phó) Ít nhất, tối thiểu	这件衣服起码要两百块。	Zhè jiàn yīfu qǐmǎ yào liǎng bǎi kuài.	Bộ quần áo này ít nhất cũng phải hai trăm tệ.	\N	\N	\N
5caf6b89-6a55-4966-86ee-73e6779243ac	7e95c23b-0171-4f96-9541-36eb895ce6a8	16	口音	kǒuyīn	(dt) Giọng (nói)	他说话带有南方口音。	Tā shuōhuà dàiyǒu nánfāng kǒuyīn.	Anh ấy nói chuyện mang giọng miền Nam.	\N	\N	\N
4a1755c4-3d91-41e2-9710-89f436e45103	7e95c23b-0171-4f96-9541-36eb895ce6a8	17	乡镇	xiāngzhèn	(dt) Thị trấn nhỏ	他来自偏远乡镇。	Tā láizì piānyuǎn xiāngzhèn.	Cậu ấy đến từ một thị trấn xa xôi.	\N	\N	\N
5de82961-ea59-459c-b0b6-165808221dd7	7e95c23b-0171-4f96-9541-36eb895ce6a8	18	原先	yuánxiān	(dt) Ban đầu, trước kia	事情跟原先计划的不同。	Shìqíng gēn yuánxiān jìhuà de bùtóng.	Sự việc không giống với kế hoạch ban đầu.	\N	\N	\N
0c929475-8304-4640-a7ef-0d11b73babed	7e95c23b-0171-4f96-9541-36eb895ce6a8	19	裁缝	cáifeng	(dt) Thợ may	他原先是个裁缝。	Tā yuánxiān shì gè cáifeng.	Ông ấy trước kia là một thợ may.	\N	\N	\N
d74498ba-36e0-413d-a464-4910d1d925ae	7e95c23b-0171-4f96-9541-36eb895ce6a8	20	港口	gǎngkǒu	(dt) Bến cảng	这艘船停在港口。	Zhè sōu chuán tíng zài gǎngkǒu.	Con tàu này đang đỗ ở bến cảng.	\N	\N	\N
7ca6c3c1-a1d2-4682-821e-ee94f3f6b6cb	7e95c23b-0171-4f96-9541-36eb895ce6a8	21	斯文	sīwen	(tt) Lịch sự, nhã nhặn	他戴着眼镜，看起来很斯文。	Tā dài zhe yǎnjìng, kàn qǐlái hěn sīwen.	Anh ấy đeo kính, trông rất thư sinh nhã nhặn.	\N	\N	\N
205ec9df-8da8-4c8a-8d07-4a882c6f687e	7e95c23b-0171-4f96-9541-36eb895ce6a8	22	心眼儿	xīnyǎnr	(dt) Bụng dạ, lòng	他心眼儿好，乐于助人。	Tā xīnyǎnr hǎo, lèyú zhùrén.	Anh ấy tốt bụng, thích giúp đỡ người khác.	\N	\N	\N
88a06578-80ca-4b34-a1f3-08b32723234e	7e95c23b-0171-4f96-9541-36eb895ce6a8	23	信誉	xìnyù	(dt) Uy tín, danh dự	这家店信誉很好。	Zhè jiā diàn xìnyù hěn hǎo.	Cửa hàng này uy tín rất tốt.	\N	\N	\N
17331077-441b-40a6-ba09-a0ca889ab03f	7e95c23b-0171-4f96-9541-36eb895ce6a8	24	欺骗	qīpiàn	(đgt) Lừa gạt	不要欺骗你的朋友。	Búyào qīpiàn nǐ de péngyǒu.	Đừng lừa gạt bạn bè của bạn.	\N	\N	\N
626acb1e-857a-40e0-bbcd-c2a9c03db25c	7e95c23b-0171-4f96-9541-36eb895ce6a8	25	学位	xuéwèi	(dt) Học vị	她拿到了硕士学位。	Tā nádào le shuòshì xuéwèi.	Cô ấy đã lấy được học vị thạc sĩ.	\N	\N	\N
f74d0e07-2f2e-49fa-8020-e715f389e39f	7e95c23b-0171-4f96-9541-36eb895ce6a8	26	一流	yīliú	(tt) Hạng nhất	这是一家一流的公司。	Zhè shì yì jiā yīliú de gōngsī.	Đây là một công ty hạng nhất.	\N	\N	\N
ff0e3c37-a313-47aa-a66f-90e61515996b	7e95c23b-0171-4f96-9541-36eb895ce6a8	27	主管	zhǔguǎn	(dt/đgt) Người quản lý	他是我们部门的主管。	Tā shì wǒmen bùmén de zhǔguǎn.	Anh ấy là người quản lý của bộ phận chúng tôi.	\N	\N	\N
96101232-e049-44b7-b8fa-328a1cfd2744	7e95c23b-0171-4f96-9541-36eb895ce6a8	28	助手	zhùshǒu	(dt) Trợ lý	她是一位得力的助手。	Tā shì yí wèi délì de zhùshǒu.	Cô ấy là một người trợ lý đắc lực.	\N	\N	\N
f10de87f-cb23-43bc-b90c-944282651a06	7e95c23b-0171-4f96-9541-36eb895ce6a8	29	骨干	gǔgàn	(dt) Trụ cột, rường cột	他是公司的技术骨干。	Tā shì gōngsī de jìshù gǔgàn.	Anh ấy là nhân viên nòng cốt về kỹ thuật của công ty.	\N	\N	\N
9e755ff6-d0db-4d90-b03b-60b02805e353	7e95c23b-0171-4f96-9541-36eb895ce6a8	30	小心翼翼	xiǎoxīn-yìyì	(thành ngữ) Thận trọng, dè dặt	他小心翼翼地把包裹收起来。	Tā xiǎoxīn-yìyì de bǎ bāoguǒ shōu qǐlái.	Ông ấy cẩn thận dè dặt cất cái bưu kiện đi.	\N	\N	\N
3ab635f2-db9c-47ce-abf9-e81fcb1a98ba	7e95c23b-0171-4f96-9541-36eb895ce6a8	31	喜悦	xǐyuè	(tt) Vui sướng	满怀喜悦地走了。	Mǎnhuái xǐyuè de zǒu le.	Chứa chan niềm vui sướng rời đi.	\N	\N	\N
1f31fa32-0ae5-438c-93db-4aa062b6bb4c	7e95c23b-0171-4f96-9541-36eb895ce6a8	32	拨	bō	(đgt) Gọi (điện thoại)	我拨打了他的电话。	Wǒ bōdǎ le tā de diànhuà.	Tôi đã gọi điện thoại cho anh ấy.	\N	\N	\N
e8e519bd-f05c-4226-8f81-95d66b8421fe	7e95c23b-0171-4f96-9541-36eb895ce6a8	33	仍旧	réngjiù	(phó) Vẫn	下班了，他仍旧在加班。	Xiàbān le, tā réngjiù zài jiābān.	Tan làm rồi, anh ấy vẫn đang tăng ca.	\N	\N	\N
aa8cf92a-09da-4fc4-a767-4cb683e4db78	7e95c23b-0171-4f96-9541-36eb895ce6a8	34	隐约	yǐnyuē	(tt) Lờ mờ, mang máng, mập mờ	心里隐约有些不安。	Xīnlǐ yǐnyuē yǒuxiē bù'ān.	Trong lòng mang máng có chút bất an.	\N	\N	\N
122b0782-8455-4daf-a1ae-d2219bd8bd41	7e95c23b-0171-4f96-9541-36eb895ce6a8	35	浑身	húnshēn	(dt) Toàn thân, khắp người	他干活累得浑身是汗。	Tā gànhuó lèi de húnshēn shì hàn.	Anh ấy làm việc mệt đến mức toàn thân đầy mồ hôi.	\N	\N	\N
9b757f53-2d0b-4d4d-a51a-3d6316ce9520	7e95c23b-0171-4f96-9541-36eb895ce6a8	36	馅儿	xiànr	(dt) Nhân (bánh)	这是豆沙馅儿的月饼。	Zhè shì dòushā xiànr de yuèbǐng.	Đây là bánh trung thu nhân đậu đỏ.	\N	\N	\N
67399a01-6922-4f45-bb45-6f55de0744f5	7e95c23b-0171-4f96-9541-36eb895ce6a8	37	灿烂	cànlàn	(tt) Rực rỡ, rạng rỡ	他笑得很灿烂。	Tā xiào de hěn cànlàn.	Anh ấy cười rất rạng rỡ.	\N	\N	\N
576d9e8a-71b4-4994-adb6-412b4a434792	7e95c23b-0171-4f96-9541-36eb895ce6a8	38	惦记	diànjì	(đgt) Nhớ đến, lo lắng	别惦记家里，好好工作。	Bié diànjì jiālǐ, hǎohǎo gōngzuò.	Đừng lo lắng việc nhà, hãy làm việc thật tốt.	\N	\N	\N
21e6e6c5-25f8-464f-ae20-780df9cab6cf	7e95c23b-0171-4f96-9541-36eb895ce6a8	39	丢人	diū rén	(đgt) Mất mặt, mất thể diện	别给爸爸丢人。	Bié gěi bàba diū rén.	Đừng làm mất mặt bố.	\N	\N	\N
ad32f168-08d3-4381-939c-996b0931699a	7e95c23b-0171-4f96-9541-36eb895ce6a8	40	炫耀	xuànyào	(đgt) Khoe khoang	他总喜欢向别人炫耀自己的财富。	Tā zǒng xǐhuan xiàng biérén xuànyào zìjǐ de cáifù.	Anh ta luôn thích khoe khoang sự giàu có của mình với người khác.	\N	\N	\N
f29904a2-d5a5-4ae6-b384-125da3de6a34	7e95c23b-0171-4f96-9541-36eb895ce6a8	41	面子	miànzi	(dt) Thể diện, sĩ diện	他是个很要面子的人。	Tā shì gè hěn yào miànzi de rén.	Anh ta là một người rất coi trọng thể diện.	\N	\N	\N
cdf94e02-115b-4b57-bcaa-90e7c77a54b7	7e95c23b-0171-4f96-9541-36eb895ce6a8	42	辜负	gūfù	(đgt) Phụ lòng	绝不辜负大家的期望。	Jué bù gūfù dàjiā de qīwàng.	Tuyệt đối không phụ lòng mong mỏi của mọi người.	\N	\N	\N
775395fc-6909-4e66-98e9-a2489a71f059	7e95c23b-0171-4f96-9541-36eb895ce6a8	43	期望	qīwàng	(dt/đgt) Kỳ vọng, mong đợi	父母对孩子有很高的期望。	Fùmǔ duì háizi yǒu hěn gāo de qīwàng.	Bố mẹ có kỳ vọng rất cao đối với con cái.	\N	\N	\N
0e130396-f93a-4c8f-92d2-53d7d695b9bf	7e95c23b-0171-4f96-9541-36eb895ce6a8	44	拧	níng	(đgt) Vắt, xoắn	把毛巾拧干。	Bǎ máojīn níng gān.	Vắt khô khăn mặt.	\N	\N	\N
6e7ef2e8-0cbd-42a5-adbc-68d57674946b	7e95c23b-0171-4f96-9541-36eb895ce6a8	45	投掷	tóuzhì	(đgt) Quăng, ném	投掷标枪。	Tóuzhì biāoqiāng.	Ném lao.	\N	\N	\N
574e61ef-5f2b-4cf8-879e-8122dfd3d421	7e95c23b-0171-4f96-9541-36eb895ce6a8	46	飘扬	piāoyáng	(đgt) Tung bay	红旗在风中飘扬。	Hóngqí zài fēng zhōng piāoyáng.	Cờ đỏ tung bay trong gió.	\N	\N	\N
6bb30e6c-aecb-4b12-b275-9770c96b1d11	7e95c23b-0171-4f96-9541-36eb895ce6a8	47	绣	xiù	(đgt) Thêu	衣服上绣着花。	Yīfu shàng xiù zhe huā.	Trên quần áo có thêu hoa.	\N	\N	\N
e01de350-e20c-4a94-9c52-2281e645172d	7e95c23b-0171-4f96-9541-36eb895ce6a8	48	泼	pō	(đgt) Dội, hắt	一盆冷水泼在地上。	Yì pén lěngshuǐ pō zài dìshang.	Một chậu nước lạnh dội xuống đất.	\N	\N	\N
0454d1e4-647f-4960-88d8-0c2141c58512	7e95c23b-0171-4f96-9541-36eb895ce6a8	49	牵	qiān	(đgt) Dắt, cầm	妈妈牵着孩子的手。	Māma qiān zhe háizi de shǒu.	Mẹ dắt tay đứa bé.	\N	\N	\N
b21436c3-044a-43ea-933c-c5bbf5d1217d	7e95c23b-0171-4f96-9541-36eb895ce6a8	50	掐	qiā	(đgt) Ngắt, hái, bấm	不要在公园里掐花。	Búyào zài gōngyuán lǐ qiā huā.	Đừng ngắt hoa trong công viên.	\N	\N	\N
927ed901-9651-4e4c-85b1-e11e29c06bf6	7e95c23b-0171-4f96-9541-36eb895ce6a8	51	削	xuē / xiāo	(đgt) Gọt	他在削苹果皮。	Tā zài xiāo píngguǒ pí.	Anh ấy đang gọt vỏ táo.	\N	\N	\N
a295bd29-cb23-4cc4-ac47-1ca2519f4c24	c529d5ca-454b-4f5a-b6d3-0965aad5304f	0	厌倦	yànjuàn	(đgt) Chán ngán	他厌倦了这种生活。	Tā yànjuàn le zhè zhǒng shēnghuó.	Anh ấy chán ngán cuộc sống này rồi.	\N	\N	\N
1261b5b7-0c7f-4592-bf03-ff92362ddb43	c529d5ca-454b-4f5a-b6d3-0965aad5304f	1	厌恶	yànwù	(đgt) Chán ghét	我很厌恶这种行为。	Wǒ hěn yànwù zhè zhǒng xíngwéi.	Tôi rất chán ghét hành vi này.	\N	\N	\N
d2da49a8-3cd0-4a7d-97e5-26579d1bd5b3	c529d5ca-454b-4f5a-b6d3-0965aad5304f	2	倘若	tǎngruò	(liên) Nếu như	倘若明天下雨，我们就不去了。	Tǎngruò míngtiān xiàyǔ, wǒmen jiù bú qù le.	Nếu như ngày mai trời mưa, chúng ta sẽ không đi nữa.	\N	\N	\N
473ba21a-62dc-437b-8ca4-d2befe9df803	c529d5ca-454b-4f5a-b6d3-0965aad5304f	3	发觉	fājué	(đgt) Phát hiện	我发觉他今天有点不对劲。	Wǒ fājué tā jīntiān yǒudiǎn bú duìjìn.	Tôi phát hiện anh ấy hôm nay có chút không bình thường.	\N	\N	\N
b78f069e-b1a3-4a57-bb38-1fffa3ceef72	c529d5ca-454b-4f5a-b6d3-0965aad5304f	4	承诺	chéngnuò	(đgt/dt) Hứa, đồng ý	他兑现了自己的承诺。	Tā duìxiàn le zìjǐ de chéngnuò.	Anh ấy đã thực hiện lời hứa của mình.	\N	\N	\N
5de3b411-0184-4f1b-a3a8-5b26422bf9be	c529d5ca-454b-4f5a-b6d3-0965aad5304f	5	草率	cǎoshuài	(tt) Qua loa, cẩu thả	做决定不能太草率。	Zuò juédìng bùnéng tài cǎoshuài.	Ra quyết định không thể quá qua loa.	\N	\N	\N
cbba0495-0023-4af6-896b-6751cc481bb3	c529d5ca-454b-4f5a-b6d3-0965aad5304f	6	对抗	duìkàng	(đgt) Đối chọi, chống lại	两国之间发生了激烈的对抗。	Liǎng guó zhī jiān fāshēng le jīliè de duìkàng.	Giữa hai nước đã xảy ra sự đối chọi gay gắt.	\N	\N	\N
ccb7cb5f-c4df-4292-a51e-e2774688a4da	c529d5ca-454b-4f5a-b6d3-0965aad5304f	7	尝试	chángshì	(đgt) Thử	我决定尝试一下新方法。	Wǒ juédìng chángshì yíxià xīn fāngfǎ.	Tôi quyết định thử một chút phương pháp mới.	\N	\N	\N
0d6175cf-7178-491f-9061-78134871d510	c529d5ca-454b-4f5a-b6d3-0965aad5304f	8	盲目	mángmù	(tt) Mù quáng	我们不能盲目跟风。	Wǒmen bùnéng mángmù gēnfēng.	Chúng ta không thể chạy theo phong trào một cách mù quáng.	\N	\N	\N
38f09f0c-4024-4733-a6df-fe6374ddf47e	c529d5ca-454b-4f5a-b6d3-0965aad5304f	9	乘	chéng	(giới) Thừa cơ, nhân (dịp)	乘大象不注意。	Chéng dàxiàng bú zhùyì.	Nhân lúc voi không chú ý.	\N	\N	\N
999f4e3c-b94f-430e-86a6-358d2d35a133	c529d5ca-454b-4f5a-b6d3-0965aad5304f	10	喘气	chuǎn qì	(đgt) Thở dốc, thở hổn hển	他跑得直喘气。	Tā pǎo de zhí chuǎn qì.	Anh ấy chạy đến mức thở hổn hển.	\N	\N	\N
11082695-047a-4091-9c67-e235805b29d4	c529d5ca-454b-4f5a-b6d3-0965aad5304f	11	饶恕	ráoshù	(đgt) Tha thứ, bỏ qua	请饶恕我的过错。	Qǐng ráoshù wǒ de guòcuò.	Xin hãy tha thứ cho lỗi lầm của tôi.	\N	\N	\N
7b0c1c24-a735-47ee-b46d-34f933d73760	c529d5ca-454b-4f5a-b6d3-0965aad5304f	12	强迫	qiǎngpò	(đgt) Bắt buộc, ép buộc	不要强迫别人做不喜欢的事。	Búyào qiǎngpò biérén zuò bù xǐhuan de shì.	Đừng ép buộc người khác làm việc họ không thích.	\N	\N	\N
1626b376-e2fb-49b9-867c-b75dd9bbe433	c529d5ca-454b-4f5a-b6d3-0965aad5304f	13	实施	shíshī	(đgt) Thực hiện, thi thi	计划已经开始实施。	Jìhuà yǐjīng kāishǐ shíshī.	Kế hoạch đã bắt đầu được thực thi.	\N	\N	\N
bdf6b7c3-ec58-449e-891f-222c986ff69a	c529d5ca-454b-4f5a-b6d3-0965aad5304f	14	不料	búliào	(liên) Không ngờ, chẳng dè	本以为会顺利，不料出了意外。	Běn yǐwéi huì shùnlì, búliào chū le yìwài.	Vốn tưởng sẽ thuận lợi, không ngờ lại xảy ra sự cố.	\N	\N	\N
8f8e9205-5861-4eae-8d89-7b71a592363a	c529d5ca-454b-4f5a-b6d3-0965aad5304f	15	猛烈	měngliè	(tt) Mãnh liệt, mạnh	风势非常猛烈。	Fēngshì fēicháng měngliè.	Thế gió vô cùng mãnh liệt.	\N	\N	\N
27d60bc6-3c46-451a-944c-59fa66e70db6	c529d5ca-454b-4f5a-b6d3-0965aad5304f	16	子弹	zǐdàn	(dt) Đạn	枪里没有子弹了。	Qiāng lǐ méiyǒu zǐdàn le.	Trong súng không còn đạn nữa.	\N	\N	\N
6d6b06ea-313a-4f67-9949-3258e01cb166	c529d5ca-454b-4f5a-b6d3-0965aad5304f	17	蔑视	mièshì	(đgt) Miệt thị, coi thường	他用蔑视的眼光看着对手。	Tā yòng mièshì de yǎnguāng kàn zhe duìshǒu.	Anh ta dùng ánh mắt coi thường nhìn đối thủ.	\N	\N	\N
958cb52a-5524-485e-8131-e147443b546d	c529d5ca-454b-4f5a-b6d3-0965aad5304f	18	眼光	yǎnguāng	(dt) Ánh mắt	大家的眼光都集中在他身上。	Dàjiā de yǎnguāng dōu jízhōng zài tā shēnshang.	Ánh mắt của mọi người đều tập trung vào anh ấy.	\N	\N	\N
4909a2b0-e4bb-45c2-8db9-11fc318169f5	c529d5ca-454b-4f5a-b6d3-0965aad5304f	19	盯	dīng	(đgt) Nhìn chằm chằm	他紧紧盯着屏幕。	Tā jǐnjǐn dīng zhe píngmù.	Anh ấy nhìn chằm chằm vào màn hình.	\N	\N	\N
e41b5be6-f533-47ea-9949-a1b0dff0e144	c529d5ca-454b-4f5a-b6d3-0965aad5304f	20	愤怒	fènnù	(tt) Phẫn nộ, tức giận	听到这个消息，他感到十分愤怒。	Tīngdào zhè gè xiāoxi, tā gǎndào shífēn fènnù.	Nghe thấy tin này, anh ấy cảm thấy vô cùng tức giận.	\N	\N	\N
2d58c950-787f-4737-8ef7-86cef04dbfe9	c529d5ca-454b-4f5a-b6d3-0965aad5304f	21	愚蠢	yúchǔn	(tt) Ngu đần, ngu xuẩn	这是一个愚蠢的错误。	Zhè shì yí gè yúchǔn de cuòwù.	Đây là một sai lầm ngu ngốc.	\N	\N	\N
0c8611a5-530e-4707-8709-c6f3113f52ce	c529d5ca-454b-4f5a-b6d3-0965aad5304f	22	家伙	jiāhuo	(dt) Thằng, gã, thằng cha	你这个愚蠢的家伙。	Nǐ zhè gè yúchǔn de jiāhuo.	Cái gã ngu ngốc nhà ngươi.	\N	\N	\N
cb5a1f8f-c107-41a8-9bfd-05a40a00ffa1	c529d5ca-454b-4f5a-b6d3-0965aad5304f	23	可恶	kěwù	(tt) Đáng ghét	这种骗人的行为太可恶了。	Zhè zhǒng piàn rén de xíngwéi tài kěwù le.	Hành vi lừa đảo này quá đáng ghét.	\N	\N	\N
e1480d46-0c4c-4043-838e-e6dba47be1f6	c529d5ca-454b-4f5a-b6d3-0965aad5304f	24	耍	shuǎ	(đgt) Giở trò, đùa giỡn	不要在这里耍小聪明。	Búyào zài zhèlǐ shuǎ xiǎo cōngmíng.	Đừng có giở trò khôn vặt ở đây.	\N	\N	\N
a0ba2fd8-076b-46be-bc2b-09213dcd1603	c529d5ca-454b-4f5a-b6d3-0965aad5304f	25	流氓	liúmáng	(dt) Lưu manh	他被几个流氓打伤了。	Tā bèi jǐ gè liúmáng dǎ shāng le.	Anh ta bị mấy tên lưu manh đánh bị thương.	\N	\N	\N
667020e3-7645-48e3-88ea-4bd175474106	c529d5ca-454b-4f5a-b6d3-0965aad5304f	26	扁	biǎn	(tt) Dẹt, bẹp	把这个盒子压扁。	Bǎ zhè gè hézi yā biǎn.	Ép bẹp cái hộp này đi.	\N	\N	\N
1d1ac123-bd0c-4c75-80d1-e834cba549c9	c529d5ca-454b-4f5a-b6d3-0965aad5304f	27	夕阳	xīyáng	(dt) Mặt trời chiều	夕阳无限好，只是近黄昏。	Xīyáng wúxiàn hǎo, zhǐ shì jìn huánghūn.	Mặt trời chiều rực rỡ vô vàn, chỉ tiếc hoàng hôn đã kề cận.	\N	\N	\N
ea8e031b-643e-4d35-9740-02b5793ebfbb	c529d5ca-454b-4f5a-b6d3-0965aad5304f	28	留神	liú shén	(đgt) Chú ý, coi chừng	走路要留神。	Zǒulù yào liú shén.	Đi đường phải chú ý.	\N	\N	\N
e2ec1c55-943b-432d-85fb-3ebac9066727	c529d5ca-454b-4f5a-b6d3-0965aad5304f	29	打猎	dǎ liè	(đgt) Đi săn	他们去森林里打猎了。	Tāmen qù sēnlín lǐ dǎ liè le.	Họ đi vào rừng săn bắn rồi.	\N	\N	\N
5e96df0b-f3f5-4817-b074-73d481689229	c529d5ca-454b-4f5a-b6d3-0965aad5304f	30	不顾	búgù	(đgt) Bất chấp, không đếm xỉa tới	他不顾一切地冲了出去。	Tā búgù yíqiè de chōng le chūqù.	Anh ấy bất chấp tất cả lao ra ngoài.	\N	\N	\N
d72d1013-b6dd-45a7-9b63-e4b99477639c	c529d5ca-454b-4f5a-b6d3-0965aad5304f	31	挣扎	zhèngzhá	(đgt) Vùng vẫy	猎物在网里拼命挣扎。	Lièwù zài wǎng lǐ pīnmìng zhèngzhá.	Con mồi vùng vẫy liều mạng trong lưới.	\N	\N	\N
50b4b520-a9dd-4983-b8c8-22a75a5c8f35	c529d5ca-454b-4f5a-b6d3-0965aad5304f	32	窜	cuàn	(đgt) Tháo chạy, chạy trốn	老鼠四处乱窜。	Lǎoshǔ sìchù luàn cuàn.	Chuột chạy trốn toán loạn khắp nơi.	\N	\N	\N
4605a632-d32e-4c90-bbfb-29159cd42c5b	c529d5ca-454b-4f5a-b6d3-0965aad5304f	33	摆脱	bǎituō	(đgt) Thoát khỏi	他终于摆脱了困境。	Tā zhōngyú bǎituō le kùnjìng.	Cuối cùng anh ấy cũng thoát khỏi tình cảnh khó khăn.	\N	\N	\N
0703a4b1-1020-4b32-aab0-fc8d93a3ddb0	c529d5ca-454b-4f5a-b6d3-0965aad5304f	34	死亡	sǐwáng	(đgt) Chết, tử vong	意外事故导致两人死亡。	Yìwài shìgù dǎozhì liǎng rén sǐwáng.	Sự cố ngoài ý muốn khiến hai người tử vong.	\N	\N	\N
ab8468b6-fd06-47d5-ab18-d050ca55c173	c529d5ca-454b-4f5a-b6d3-0965aad5304f	35	恰巧	qiàqiǎo	(phó) Đúng lúc, vừa vặn	我正要找他，恰巧他来了。	Wǒ zhèng yào zhǎo tā, qiàqiǎo tā lái le.	Tôi đang định tìm anh ấy, vừa vặn anh ấy đến.	\N	\N	\N
496d036c-1bcc-4978-8308-b1c900bdae93	c529d5ca-454b-4f5a-b6d3-0965aad5304f	36	毫无	háo wú	(phó) Không một chút	他对这件事毫无兴趣。	Tā duì zhè jiàn shì háo wú xìngqù.	Anh ấy không có một chút hứng thú nào với chuyện này.	\N	\N	\N
0067e5f6-5ead-47fa-80a6-4057f936aa71	c529d5ca-454b-4f5a-b6d3-0965aad5304f	37	抵抗	dǐkàng	(đgt) Chống cự	毫无抵抗能力。	Háo wú dǐkàng nénglì.	Không có chút năng lực chống cự nào.	\N	\N	\N
02f53217-e09b-4227-bb95-cb3f632b0b5f	c529d5ca-454b-4f5a-b6d3-0965aad5304f	38	部位	bùwèi	(dt) Bộ phận (cơ thể)	身体的重要部位。	Shēntǐ de zhòngyào bùwèi.	Bộ phận quan trọng của cơ thể.	\N	\N	\N
a7c089be-8a5c-4d0d-97d5-0f9ecb50737b	c529d5ca-454b-4f5a-b6d3-0965aad5304f	39	悲惨	bēicǎn	(tt) Bi thảm, thảm thương	那个故事的结局很悲惨。	Nà gè gùshi de jiéjú hěn bēicǎn.	Kết cục của câu chuyện đó rất bi thảm.	\N	\N	\N
3f52fedd-5da8-470b-bb23-fe33a030fc25	c529d5ca-454b-4f5a-b6d3-0965aad5304f	40	未免	wèimiǎn	(phó) Có hơi, có phần	你这样做未免太过分了。	Nǐ zhèyàng zuò wèimiǎn tài guòfèn le.	Cậu làm như vậy có phần hơi quá đáng rồi.	\N	\N	\N
f7c52b20-6207-48c1-b688-d8935b9903ad	c529d5ca-454b-4f5a-b6d3-0965aad5304f	41	残忍	cánrěn	(tt) Tàn nhẫn	这是一种残忍的行为。	Zhè shì yì zhǒng cánrěn de xíngwéi.	Đây là một hành vi tàn nhẫn.	\N	\N	\N
db6e6a7f-c8e5-4421-bab8-17819273fd20	c529d5ca-454b-4f5a-b6d3-0965aad5304f	42	良心	liángxīn	(dt) Lương tâm	良心告诉它应该救大象。	Liángxīn gàosu tā yīnggāi jiù dàxiàng.	Lương tâm bảo nó nên cứu voi con.	\N	\N	\N
16d83aec-c4c6-4b99-b5c8-94cc676f95da	c529d5ca-454b-4f5a-b6d3-0965aad5304f	43	锋利	fēnglì	(tt) Sắc bén	这把刀非常锋利。	Zhè bǎ dāo fēicháng fēnglì.	Con dao này vô cùng sắc bén.	\N	\N	\N
78f2bf69-d4b3-434c-b10c-70f3e13b7af0	c529d5ca-454b-4f5a-b6d3-0965aad5304f	44	缠绕	chánrào	(đgt) Quấn quanh	藤蔓缠绕在树干上。	Téngmàn chánrào zài shùgàn shàng.	Dây leo quấn quanh thân cây.	\N	\N	\N
fcbb8f88-1bf7-48eb-a811-f92867c08eb3	c529d5ca-454b-4f5a-b6d3-0965aad5304f	45	耗费	hàofèi	(đgt) Hao tốn	耗费了大量的时间和精力。	Hàofèi le dàliàng de shíjiān hé jīnglì.	Hao tốn rất nhiều thời gian và công sức.	\N	\N	\N
eae04081-20a4-4bb6-8a6f-ec671be0259e	c529d5ca-454b-4f5a-b6d3-0965aad5304f	46	缺口	quēkǒu	(dt) Lỗ hổng, chỗ hở	巨网出现了一个大缺口。	Jù wǎng chūxiàn le yí gè dà quēkǒu.	Tấm lưới khổng lồ xuất hiện một lỗ hổng lớn.	\N	\N	\N
5418cfd6-7c2e-4226-a6f7-23ca4928c3f9	c529d5ca-454b-4f5a-b6d3-0965aad5304f	47	举世瞩目	jǔshì zhǔmù	(thành ngữ) Thu hút sự chú ý của cả thế giới	取得了举世瞩目的成就。	Qǔdé le jǔshì zhǔmù de chéngjiù.	Giành được thành tựu khiến cả thế giới chú mục.	\N	\N	\N
2b7b88b0-25ee-45db-925a-5520011f860a	c529d5ca-454b-4f5a-b6d3-0965aad5304f	48	俯视	fǔshì	(đgt) Nhìn xuống (Từ mở rộng)	从山顶俯视山谷。	Cóng shāndǐng fǔshì shāngǔ.	Từ trên đỉnh núi nhìn xuống thung lũng.	\N	\N	\N
f47da5a0-9402-41a2-b72f-205ed7c90c4e	c529d5ca-454b-4f5a-b6d3-0965aad5304f	49	偿还	chánghuán	(đgt) Bồi thường, hoàn trả	他终于偿还了所有的债务。	Tā zhōngyú chánghuán le suǒyǒu de zhàiwù.	Anh ta cuối cùng cũng hoàn trả hết mọi nợ nần.	\N	\N	\N
cdaa5512-8554-4a53-b4e2-8045b4bbbaf0	c529d5ca-454b-4f5a-b6d3-0965aad5304f	50	敌视	díshì	(đgt) Coi như kẻ thù, thù địch	不要敌视有不同意见的人。	Búyào díshì yǒu bùtóng yìjiàn de rén.	Đừng thù địch với những người có ý kiến khác biệt.	\N	\N	\N
a6b96c8d-a4a3-491c-8915-7241bfe66f41	c529d5ca-454b-4f5a-b6d3-0965aad5304f	51	孤立	gūlì	(tt/đgt) Đơn độc, bị cô lập	他因为脾气不好，被大家孤立了。	Tā yīnwèi píqi bù hǎo, bèi dàjiā gūlì le.	Vì tính khí không tốt, anh ta bị mọi người cô lập.	\N	\N	\N
f0aa3d9f-ba3a-4257-904d-2e08e1d55c82	c529d5ca-454b-4f5a-b6d3-0965aad5304f	52	过奖	guòjiǎng	(đgt) Quá khen	您过奖了，我还差得远呢。	Nín guòjiǎng le, wǒ hái chà de yuǎn ne.	Ngài quá khen rồi, tôi còn kém xa lắm.	\N	\N	\N
e896af95-a221-4cf3-9493-f33021c6da8b	c529d5ca-454b-4f5a-b6d3-0965aad5304f	53	捍卫	hànwèi	(đgt) Bảo vệ, canh giữ	我们要捍卫祖国的尊严。	Wǒmen yào hànwèi zǔguó de zūnyán.	Chúng ta phải bảo vệ tôn nghiêm của Tổ quốc.	\N	\N	\N
2cf62b04-47e9-4f18-856e-92bc62f37d50	c529d5ca-454b-4f5a-b6d3-0965aad5304f	54	草案	cǎo'àn	(dt) Bản thảo, dự thảo	这是新规定的草案。	Zhè shì xīn guīdìng de cǎo'àn.	Đây là dự thảo của quy định mới.	\N	\N	\N
35f0c800-dd4c-4e7c-bff4-efbe0205cb01	c529d5ca-454b-4f5a-b6d3-0965aad5304f	55	畅通	chàngtōng	(tt) Thông suốt	道路畅通无阻。	Dàolù chàngtōng wú zǔ.	Đường sá thông suốt không bị cản trở.	\N	\N	\N
3f034a8d-7bea-4526-9cff-7cd9fa73dab5	c529d5ca-454b-4f5a-b6d3-0965aad5304f	56	巩固	gǒnggù	(đgt) Củng cố	我们需要巩固基础知识。	Wǒmen xūyào gǒnggù jīchǔ zhīshi.	Chúng ta cần củng cố kiến thức nền tảng.	\N	\N	\N
0b54ebfe-d268-47c2-8144-309f8e10c6e7	c529d5ca-454b-4f5a-b6d3-0965aad5304f	57	雇佣	gùyōng	(đgt) Thuê mướn	公司雇佣了五十名新员工。	Gōngsī gùyōng le wǔshí míng xīn yuángōng.	Công ty đã thuê 50 nhân viên mới.	\N	\N	\N
290c2569-89ad-4d05-964e-5197f6f0f04a	c529d5ca-454b-4f5a-b6d3-0965aad5304f	58	解雇	jiěgù	(đgt) Sa thải, cho thôi việc	他因为工作失误被解雇了。	Tā yīnwèi gōngzuò shīwù bèi jiěgù le.	Anh ấy bị sa thải do sai sót trong công việc.	\N	\N	\N
7e3c675e-9236-4a7f-bb50-ec49e60319d8	c529d5ca-454b-4f5a-b6d3-0965aad5304f	59	表态	biǎotài	(đgt) Bày tỏ thái độ	这件事你需要明确表态。	Zhè jiàn shì nǐ xūyào míngquè biǎotài.	Chuyện này bạn cần bày tỏ thái độ rõ ràng.	\N	\N	\N
ffb48cef-9a48-4159-92c8-dff00af6346f	c529d5ca-454b-4f5a-b6d3-0965aad5304f	60	磅	bàng	(lượng) Một cân Anh (pound)	一磅黄油。	Yì bàng huángyóu.	Một cân bơ (pound).	\N	\N	\N
3e7e54ca-51c6-400b-a018-c28b710fc4f0	c529d5ca-454b-4f5a-b6d3-0965aad5304f	61	筐	kuāng	(lượng) Một giỏ, một sọt	一筐蔬菜。	Yì kuāng shūcài.	Một sọt rau.	\N	\N	\N
7c301765-f6bf-49f8-9daf-b0f6a3fdb213	c529d5ca-454b-4f5a-b6d3-0965aad5304f	62	艘	sōu	(lượng) Chiếc (tàu, thuyền lớn)	一艘轮船。	Yì sōu lúnchuán.	Một chiếc tàu thủy.	\N	\N	\N
67d06347-d32b-4467-87d1-dd9432def0fe	c529d5ca-454b-4f5a-b6d3-0965aad5304f	63	丸	wán	(lượng) Viên (thuốc)	一丸药。	Yì wán yào.	Một viên thuốc.	\N	\N	\N
e035e8bb-be8d-4e9c-a0df-7f65db76f0f6	c529d5ca-454b-4f5a-b6d3-0965aad5304f	64	宠物	chǒngwù	(dt) Thú cưng	很多人喜欢养宠物。	Hěn duō rén xǐhuan yǎng chǒngwù.	Rất nhiều người thích nuôi thú cưng.	\N	\N	\N
e30dfacd-43f5-45ae-b698-aaff5a04dd9e	c529d5ca-454b-4f5a-b6d3-0965aad5304f	65	弱小	ruòxiǎo	(tt) Nhỏ yếu	它是那么弱小。	Tā shì nàme ruòxiǎo.	Nó nhỏ bé và yếu ớt như thế.	\N	\N	\N
33fa96c5-0b69-442d-b06a-02cf6af169e1	c529d5ca-454b-4f5a-b6d3-0965aad5304f	66	悲痛	bēitòng	(tt) Đau buồn	听到这消息，他感到十分悲痛。	Tīngdào zhè xiāoxi, tā gǎndào shífēn bēitòng.	Nghe tin này, anh ấy cảm thấy vô cùng đau buồn.	\N	\N	\N
04de12e6-0b5d-45f9-accb-51ac9bd9417c	c529d5ca-454b-4f5a-b6d3-0965aad5304f	67	费时	fèi shí	(đgt) Tốn thời gian	这个工作很费时。	Zhè gè gōngzuò hěn fèi shí.	Công việc này rất tốn thời gian.	\N	\N	\N
fe826be9-000d-459a-83a9-052f2fb39dfc	2c45fed9-5798-4042-a668-09d8231443df	0	迫不及待	pòbùjídài	(thành ngữ) Nóng lòng, không thể chờ đợi được	他迫不及待地想试试。	Tā pòbùjídài de xiǎng shìshi.	Anh ấy nóng lòng muốn thử.	\N	\N	\N
5a0bcff1-f69e-4fe0-acf1-d0c6c51cb896	2c45fed9-5798-4042-a668-09d8231443df	1	依靠	yīkào	(đgt) Dựa vào, phụ thuộc vào	孩子需要依靠父母。	Háizi xūyào yīkào fùmǔ.	Trẻ em cần dựa vào bố mẹ.	\N	\N	\N
e135588c-e8ec-41cb-a235-b75aaab73711	2c45fed9-5798-4042-a668-09d8231443df	2	借助	jièzhù	(đgt) Nhờ vào, nhờ sự giúp đỡ của	借助字典查阅原文。	Jièzhù zìdiǎn cháyuè yuánwén.	Nhờ vào từ điển để tra cứu nguyên tác.	\N	\N	\N
2fe3552a-3dac-4cd6-82bc-3a7058b473c8	2c45fed9-5798-4042-a668-09d8231443df	3	勉强	miǎnqiǎng	(tt/đgt) Gắng gượng, cố gượng	他勉强笑了笑。	Tā miǎnqiǎng xiào le xiào.	Anh ấy cố gượng cười một cái.	\N	\N	\N
d901f659-8593-4e2e-a46a-ac80cb017fee	2c45fed9-5798-4042-a668-09d8231443df	4	机构	jīgòu	(dt) Đơn vị, cơ quan, tổ chức	语言学习机构。	Yǔyán xuéxí jīgòu.	Cơ quan/Tổ chức học ngôn ngữ.	\N	\N	\N
0494b6b1-756a-4893-885b-9ae319750d84	2c45fed9-5798-4042-a668-09d8231443df	5	栋	dòng	(lượng) Tòa (nhà)	一栋办公楼。	Yí dòng bàngōnglóu.	Một tòa nhà văn phòng.	\N	\N	\N
8d411826-2a67-47bb-a087-f905bb6ed915	2c45fed9-5798-4042-a668-09d8231443df	6	兴致勃勃	xìngzhì bóbó	(thành ngữ) Vô cùng hào hứng	他兴致勃勃地去参加比赛。	Tā xìngzhì bóbó de qù cānjiā bǐsài.	Anh ấy vô cùng hào hứng đi tham gia cuộc thi.	\N	\N	\N
51e803ad-5ff5-4c32-b965-288a0c84a5ff	2c45fed9-5798-4042-a668-09d8231443df	7	专程	zhuānchéng	(phó) Đặc biệt đi	我专程来看你。	Wǒ zhuānchéng lái kàn nǐ.	Tôi đặc biệt cất công đến thăm bạn.	\N	\N	\N
6350ec0c-0aaa-4689-b7de-50a616d9efd6	2c45fed9-5798-4042-a668-09d8231443df	8	修养	xiūyǎng	(dt) Trình độ, thái độ xử sự đúng mực	她是一位很有修养的女士。	Tā shì yí wèi hěn yǒu xiūyǎng de nǚshì.	Cô ấy là một người phụ nữ rất có giáo dưỡng/xử sự đúng mực.	\N	\N	\N
cf6a00f2-a6ad-4f14-9261-0746d86531b0	2c45fed9-5798-4042-a668-09d8231443df	9	接连	jiēlián	(phó) Liên tiếp, liên tục	接连不断地发问。	Jiēlián búduàn de fāwèn.	Liên tục đặt câu hỏi không ngừng.	\N	\N	\N
4459feff-b974-4336-959e-cafd2af85ee1	2c45fed9-5798-4042-a668-09d8231443df	10	涉及	shèjí	(đgt) Liên quan đến, đề cập đến	这涉及了我的隐私。	Zhè shèjí le wǒ de yǐnsī.	Điều này liên quan đến sự riêng tư của tôi.	\N	\N	\N
42134191-f65e-486f-b3b6-af2edefe7d68	2c45fed9-5798-4042-a668-09d8231443df	11	隐私	yǐnsī	(dt) Sự riêng tư, đời tư	每个人都有自己的隐私。	Měi gè rén dōu yǒu zìjǐ de yǐnsī.	Mỗi người đều có sự riêng tư của chính mình.	\N	\N	\N
37799937-834a-4a5b-8296-eb12ae834d68	2c45fed9-5798-4042-a668-09d8231443df	12	反感	fǎngǎn	(tt/dt) Có ác cảm, bực mình	我很反感这种行为。	Wǒ hěn fǎngǎn zhè zhǒng xíngwéi.	Tôi rất có ác cảm với hành vi này.	\N	\N	\N
1df820b7-504e-42a3-8f69-b247970fd3a0	2c45fed9-5798-4042-a668-09d8231443df	13	火药	huǒyào	(dt) Thuốc nổ	话里火药味十足。	Huà lǐ huǒyào wèi shízú.	Trong lời nói sặc mùi thuốc súng.	\N	\N	\N
c4a27516-dca9-483b-ba2a-b5b09805fde0	2c45fed9-5798-4042-a668-09d8231443df	14	忍耐	rěnnài	(đgt) Nhẫn nại, kiềm chế	她极力忍耐着。	Tā jílì rěnnài zhe.	Cô ấy cực lực kiềm chế.	\N	\N	\N
ca72d377-dfe6-41d1-a58f-fe3e2fd3110a	2c45fed9-5798-4042-a668-09d8231443df	15	着想	zhuóxiǎng	(đgt) Nghĩ cho, lo cho	处处为学员着想。	Chùchù wèi xuéyuán zhuóxiǎng.	Khắp nơi đều nghĩ cho học viên.	\N	\N	\N
6712afab-5b45-4a4c-982f-47ef6a65a4ae	2c45fed9-5798-4042-a668-09d8231443df	16	策划	cèhuà	(đgt) Đặt kế hoạch, trù tính	帮他策划学习方案。	Bāng tā cèhuà xuéxí fāng'àn.	Giúp anh ấy trù tính phương án học tập.	\N	\N	\N
ade4bcaf-cbcf-413b-8d1a-40dfd7433272	2c45fed9-5798-4042-a668-09d8231443df	17	达成	dáchéng	(đgt) Đạt được	达成他的目标。	Dáchéng tā de mùbiāo.	Đạt được mục tiêu của anh ấy.	\N	\N	\N
2bdf8ad6-055c-48ea-83c6-680568c3a777	2c45fed9-5798-4042-a668-09d8231443df	18	口气	kǒuqì	(dt) Giọng điệu	使自己的口气缓和下来。	Shǐ zìjǐ de kǒuqì huǎnhé xiàlái.	Làm cho giọng điệu của bản thân dịu xuống.	\N	\N	\N
50151a24-6b76-4181-ba3d-fdf10f257cb9	2c45fed9-5798-4042-a668-09d8231443df	19	缓和	huǎnhé	(đgt/tt) Dịu đi, hòa hoãn	局势有所缓和。	Júshì yǒu suǒ huǎnhé.	Tình thế đã có phần dịu đi.	\N	\N	\N
fe5546f3-b797-4131-b71b-b8c9bf20f20a	2c45fed9-5798-4042-a668-09d8231443df	20	随意	suíyì	(tt/phó) Tùy ý	随意学学而已。	Suíyì xuéxué éryǐ.	Chỉ là học tùy ý mà thôi.	\N	\N	\N
01a90e01-6192-43da-b5c9-001a79870767	2c45fed9-5798-4042-a668-09d8231443df	21	而已	éryǐ	(trợ) Mà thôi	我只是开玩笑而已。	Wǒ zhǐshì kāiwánxiào éryǐ.	Tôi chỉ là đùa giỡn mà thôi.	\N	\N	\N
e52478a2-09c2-4ff7-8cd1-f2335c86ab72	2c45fed9-5798-4042-a668-09d8231443df	22	设置	shèzhì	(đgt) Thiết lập, cài đặt	班级是根据情况设置的。	Bānjí shì gēnjù qíngkuàng shèzhì de.	Lớp học được thiết lập dựa theo tình hình.	\N	\N	\N
e70daefa-7122-4137-803a-fda78609353b	2c45fed9-5798-4042-a668-09d8231443df	23	动力	dònglì	(dt) Động lực	没有目标就缺乏动力。	Méiyǒu mùbiāo jiù quēfá dònglì.	Không có mục tiêu thì sẽ thiếu động lực.	\N	\N	\N
f150981d-13d8-443d-83ad-aaf7279c7a3b	2c45fed9-5798-4042-a668-09d8231443df	24	固然	gùrán	(liên) Tất nhiên, dĩ nhiên, tuy	这道理我固然懂。	Zhè dàolǐ wǒ gùrán dǒng.	Đạo lý này tôi đương nhiên hiểu.	\N	\N	\N
4dd6b9ea-4ffb-45ea-8f97-d2da3587c7b5	2c45fed9-5798-4042-a668-09d8231443df	25	恳切	kěnqiè	(tt) Tha thiết, ân cần	态度真诚恳切。	Tàidù zhēnchéng kěnqiè.	Thái độ chân thành tha thiết.	\N	\N	\N
f3ebb3be-6b80-49e5-96be-0ae68382a2f2	2c45fed9-5798-4042-a668-09d8231443df	26	无非	wúfēi	(phó) Chẳng qua, chỉ	无非是为了看原文电影。	Wúfēi shì wèile kàn yuánwén diànyǐng.	Chẳng qua là để xem phim bản gốc.	\N	\N	\N
ab5c932e-a478-4719-8558-167d231718ac	2c45fed9-5798-4042-a668-09d8231443df	27	知音	zhīyīn	(dt) Bạn tri âm	终于碰上了知音。	Zhōngyú pèng shàng le zhīyīn.	Cuối cùng cũng gặp được người tri âm.	\N	\N	\N
cef00003-0a86-4704-85e5-72dee2797ab9	2c45fed9-5798-4042-a668-09d8231443df	28	客户	kèhù	(dt) Khách hàng	满足客户的需求。	Mǎnzú kèhù de xūqiú.	Đáp ứng nhu cầu của khách hàng.	\N	\N	\N
1a8f06ec-f9f6-40be-b318-e160093bd0f6	2c45fed9-5798-4042-a668-09d8231443df	29	持久	chíjiǔ	(tt) Lâu dài, bền vững	光凭兴趣难以持久。	Guāng píng xìngqù nányǐ chíjiǔ.	Chỉ dựa vào hứng thú thì khó mà duy trì lâu dài.	\N	\N	\N
c95a16f3-e4ab-432a-af70-a572d181399a	2c45fed9-5798-4042-a668-09d8231443df	30	崩溃	bēngkuì	(đgt) Sụp đổ, suy sụp	我顿时崩溃了。	Wǒ dùnshí bēngkuì le.	Tôi ngay tức khắc sụp đổ.	\N	\N	\N
a5c2ceff-5e20-4ce6-93e9-a9554d3b36e1	2c45fed9-5798-4042-a668-09d8231443df	31	果断	guǒduàn	(tt) Quả quyết, kiên quyết	我果断地站起来。	Wǒ guǒduàn de zhàn qǐlái.	Tôi dứt khoát đứng dậy.	\N	\N	\N
7d3be2d6-c006-499a-a72c-5cbd12b3f9ae	2c45fed9-5798-4042-a668-09d8231443df	32	斩钉截铁	zhǎndīng-jiétiě	(thành ngữ) Như đinh đóng cột, cương quyết	他斩钉截铁地表明要走。	Tā zhǎndīng-jiétiě de biǎomíng yào zǒu.	Anh ấy dứt khoát tỏ rõ ý muốn rời đi.	\N	\N	\N
dcae1c5a-07f2-4883-a790-d0fba6c61bf3	2c45fed9-5798-4042-a668-09d8231443df	33	思维	sīwéi	(dt) Tư duy, suy nghĩ	和我的思维很搭。	Hé wǒ de sīwéi hěn dā.	Rất hợp với tư duy của tôi.	\N	\N	\N
a518754c-b6b3-4aa9-888a-2523631ac01e	2c45fed9-5798-4042-a668-09d8231443df	34	搭	dā	(đgt) Ăn khớp, phù hợp	这件衣服和裙子很搭。	Zhè jiàn yīfu hé qúnzi hěn dā.	Cái áo này và cái váy rất hợp nhau.	\N	\N	\N
9356f383-3a22-4f32-bd8d-317a92fdb10a	2c45fed9-5798-4042-a668-09d8231443df	35	执行	zhíxíng	(đgt) Chấp hành, thực hiện	执行学习计划。	Zhíxíng xuéxí jìhuà.	Thực hiện kế hoạch học tập.	\N	\N	\N
1e02c234-7a76-47e7-8efa-db99e25e275a	2c45fed9-5798-4042-a668-09d8231443df	36	啥	shá	(đại) Cái gì	你管我为啥要学它。	Nǐ guǎn wǒ wèi shá yào xué tā.	Anh quản tôi vì sao muốn học làm gì.	\N	\N	\N
300ca11d-ee98-4eb4-8856-9585c392f549	2c45fed9-5798-4042-a668-09d8231443df	37	薪水	xīnshui	(dt) Tiền lương	问我的单位和薪水。	Wèn wǒ de dānwèi hé xīnshui.	Hỏi cơ quan và tiền lương của tôi.	\N	\N	\N
eb1b006f-ebf5-4902-9bb3-c57c24162067	2c45fed9-5798-4042-a668-09d8231443df	38	弊端	bìduān	(dt) Mặt hạn chế, tai hại	弊端也不少。	Bìduān yě bù shǎo.	Mặt hạn chế cũng không ít.	\N	\N	\N
9e08a24c-e191-4547-bc8f-4ca0c70e7e35	2c45fed9-5798-4042-a668-09d8231443df	39	拼命	pīnmìng	(đgt) Dốc sức, liều mạng	高兴了拼命学一阵子。	Gāoxìng le pīnmìng xué yí zhènzi.	Vui thì dốc sức học một trận.	\N	\N	\N
63bc6b75-baa3-4167-a8fe-cbc09db84af1	2c45fed9-5798-4042-a668-09d8231443df	40	搁	gē	(đgt) Đặt, gác lại	不高兴了就搁在一边。	Bù gāoxìng le jiù gē zài yì biān.	Không vui thì lại gác sang một bên.	\N	\N	\N
9ca182cd-f24e-4159-9321-c51c77617fbc	2c45fed9-5798-4042-a668-09d8231443df	41	颠倒	diāndǎo	(đgt) Đảo ngược, lộn ngược	有时还前后颠倒。	Yǒushí hái qiánhòu diāndǎo.	Có lúc còn đảo ngược trước sau.	\N	\N	\N
eb0f1c5b-dc9e-43be-b810-d59c2ea347bb	2c45fed9-5798-4042-a668-09d8231443df	42	权衡	quánhéng	(đgt) Cân nhắc, suy tính	利弊权衡，利大于弊。	Lì bì quánhéng, lì dà yú bì.	Cân nhắc lợi hại, lợi lớn hơn hại.	\N	\N	\N
979f64c5-68e9-475d-bc64-c10a53e900a7	2c45fed9-5798-4042-a668-09d8231443df	43	津津有味	jīnjīn yǒu wèi	(thành ngữ) Thích thú, say mê	津津有味地享受学习。	Jīnjīn yǒu wèi de xiǎngshòu xuéxí.	Say sưa thích thú tận hưởng việc học.	\N	\N	\N
e35908cc-9059-4377-83bd-bba92c68e244	2c45fed9-5798-4042-a668-09d8231443df	44	安详 — 祥和	ānxiáng — xiánghé	Điềm tĩnh — Hòa nhã	安详：老人面容十分安详。 祥和：节日的气氛祥和而温馨。	ānxiáng: lǎorén miànróng shífēn ānxiáng. xiánghé: jiérì de qìfēn xiánghé ér wēnxīn.	安详: Khuôn mặt ông cụ vô cùng điềm tĩnh. 祥和: Bầu không khí ngày lễ hòa nhã và ấm áp.	\N	\N	\N
fe4ea6dc-2494-486a-b052-a3d1059cab6a	2c45fed9-5798-4042-a668-09d8231443df	45	代理 — 代办	dàilǐ — dàibàn	Đại lý — Đại diện giải quyết	代理：他是这家公司的产品代理。 代办：签证手续可以请旅行社代办。	dàilǐ: tā shì zhè jiā gōngsī de chǎnpǐn dàilǐ. dàibàn: qiānzhèng shǒuxù kěyǐ qǐng lǚxíngshè dàibàn.	代理: Anh ấy là đại lý sản phẩm của công ty này. 代办: Thủ tục visa có thể nhờ công ty du lịch đại diện làm.	\N	\N	\N
f3f57faa-405d-4bce-934e-59c874513199	2c45fed9-5798-4042-a668-09d8231443df	46	报仇 — 复仇	bàochóu — fùchóu	Báo thù — Phục thù	报仇：他发誓要为父亲报仇。 复仇：电影讲述了一个英雄复仇的故事。	bàochóu: tā fāshì yào wèi fùqīn bàochóu. fùchóu: diànyǐng jiǎngshù le yí gè yīngxióng fùchóu de gùshi.	报仇: Cậu ấy thề phải báo thù cho cha. 复仇: Bộ phim kể về câu chuyện phục thù của một người anh hùng.	\N	\N	\N
109aa110-e2bb-4aed-9c80-2d51dff9259f	2c45fed9-5798-4042-a668-09d8231443df	47	丰盛 — 丰富	fēngshèng — fēngfù	Thịnh soạn — Phong phú	丰盛：晚宴准备得非常丰盛。 丰富：图书馆里有丰富的藏书。	fēngshèng: wǎnyàn zhǔnbèi de fēicháng fēngshèng. fēngfù: túshūguǎn lǐ yǒu fēngfù de cángshū.	丰盛: Bữa tiệc tối được chuẩn bị vô cùng thịnh soạn. 丰富: Trong thư viện có lượng sách lưu trữ rất phong phú.	\N	\N	\N
eff90905-7ccd-41a3-b987-49329b1b9168	2c45fed9-5798-4042-a668-09d8231443df	48	报答 — 回报	bàodá — huíbào	Báo đáp — Đền đáp	报答：努力学习是为了报答父母的养育之恩。 回报：他不仅不回报，反而背叛了朋友。	bàodá: nǔlì xuéxí shì wèile bàodá fùmǔ de yǎngyù zhī ēn. huíbào: tā bùjǐn bù huíbào, fǎn'ér bèipàn le péngyǒu.	报答: Chăm chỉ học tập là để báo đáp công ơn nuôi dưỡng của bố mẹ. 回报: Anh ta không những không đền đáp, ngược lại còn phản bội bạn bè.	\N	\N	\N
252e3ce7-6d13-4e3c-b1e0-a63da8176ffa	2c45fed9-5798-4042-a668-09d8231443df	49	抚养 — 养活	fǔyǎng — yǎnghuó	Nuôi dưỡng — Nuôi sống	抚养：奶奶一个人把孙子抚养长大。 养活：这份工作很难养活一家人。	fǔyǎng: nǎinai yí gè rén bǎ sūnzi fǔyǎng zhǎngdà. yǎnghuó: zhè fèn gōngzuò hěn nán yǎnghuó yì jiā rén.	抚养: Bà nội một mình nuôi dưỡng cháu trai khôn lớn. 养活: Công việc này rất khó nuôi sống được cả gia đình.	\N	\N	\N
4bc4d277-5fd3-4a04-90dd-539eca1b5e69	2c45fed9-5798-4042-a668-09d8231443df	50	弊病 — 弊端	bìbìng — bìduān	Tệ hại (Bệnh tật) — Mặt hạn chế	弊病：这种制度存在很多弊病。 弊端：我们要想办法消除这些弊端。	bìbìng: zhè zhǒng zhìdù cúnzài hěn duō bìbìng. bìduān: wǒmen yào xiǎng fāngfǎ xiāochú zhèxiē bìduān.	弊病: Chế độ này tồn tại rất nhiều điều tệ hại. 弊端: Chúng ta phải tìm cách xóa bỏ những mặt hạn chế này.	\N	\N	\N
8cdf9bd3-c8b7-4a29-9cf6-7f063ce6843f	2c45fed9-5798-4042-a668-09d8231443df	51	更正 — 改正	gēngzhèng — gǎizhèng	Hiệu đính (đính chính) — Sửa chữa lỗi sai	更正：报纸上登出了更正声明。 改正：我们必须改正自己的缺点。	gēngzhèng: bàozhǐ shàng dēng chū le gēngzhèng shēngmíng. gǎizhèng: wǒmen bìxū gǎizhèng zìjǐ de quēdiǎn.	更正: Trên báo đã đăng thông báo đính chính. 改正: Chúng ta bắt buộc phải sửa chữa khuyết điểm của bản thân.	\N	\N	\N
b8a5a902-a43b-4523-b449-34eec6f7ce9a	2c45fed9-5798-4042-a668-09d8231443df	52	采纳 — 采用	cǎinà — cǎiyòng	Tiếp nhận (chấp nhận) — Áp dụng	采纳：经理采纳了我的合理建议。 采用：这项工程采用了最新的技术。	cǎinà: jīnglǐ cǎinà le wǒ de hélǐ jiànyì. cǎiyòng: zhè xiàng gōngchéng cǎiyòng le zuì xīn de jìshù.	采纳: Giám đốc đã chấp nhận lời đề nghị hợp lý của tôi. 采用: Công trình này đã áp dụng kỹ thuật mới nhất.	\N	\N	\N
f802e2dd-2557-4c84-810f-4dd59976840f	2c45fed9-5798-4042-a668-09d8231443df	53	供给 — 供应	gōngjǐ — gōngyìng	Cung cấp — Cung ứng	供给：水库保证了全市的用水供给。 供应：市场上的蔬菜供应非常充足。	gōngjǐ: shuǐkù bǎozhèng le quán shì de yòngshuǐ gōngjǐ. gōngyìng: shìchǎng shàng de shūcài gōngyìng fēicháng chōngzú.	供给: Hồ chứa nước đã đảm bảo việc cung cấp nước cho toàn thành phố. 供应: Nguồn cung ứng rau củ trên thị trường vô cùng đầy đủ.	\N	\N	\N
5492af76-bc0f-4172-9d73-37a391ea26ed	2c45fed9-5798-4042-a668-09d8231443df	54	参照 — 参考	cānzhào — cānkǎo	Chiếu theo — Tham khảo	参照：请参照说明书进行安装。 参考：这些资料仅供参考。	cānzhào: qǐng cānzhào shuōmíngshū jìnxíng ānzhuāng. cānkǎo: zhèxiē zīliào jǐn gòng cānkǎo.	参照: Vui lòng chiếu theo sách hướng dẫn để tiến hành lắp đặt. 参考: Những tài liệu này chỉ để cung cấp tham khảo.	\N	\N	\N
eefe9c00-6e48-404d-8dc6-d0f119c176f8	2c45fed9-5798-4042-a668-09d8231443df	55	宏伟 — 雄伟	hóngwěi — xióngwěi	Hoành tráng — Hùng vĩ	宏伟：这是一项宏伟的建筑工程。 雄伟：雄伟的长城令人惊叹。	hóngwěi: zhè shì yí xiàng hóngwěi de jiànzhù gōngchéng. xióngwěi: xióngwěi de Chángchéng lìng rén jīngtàn.	宏伟: Đây là một công trình kiến trúc hoành tráng. 雄伟: Vạn Lý Trường Thành hùng vĩ khiến người ta phải thán phục.	\N	\N	\N
666d1de7-f10b-4639-a2ce-18a2b5136fa2	2c45fed9-5798-4042-a668-09d8231443df	56	操练 — 训练	cāoliàn — xùnliàn	Thao diễn — Huấn luyện	操练：士兵们正在操场上操练。 训练：运动员需要每天接受严格的训练。	cāoliàn: shìbīngmen zhèngzài cāochǎng shàng cāoliàn. xùnliàn: yùndòngyuán xūyào měitiān jiēshòu yángé de xùnliàn.	操练: Các binh sĩ đang thao diễn trên thao trường. 训练: Vận động viên cần tiếp nhận huấn luyện nghiêm khắc mỗi ngày.	\N	\N	\N
40ca2983-89f8-4f90-9fbe-2c04d8f6db45	2c45fed9-5798-4042-a668-09d8231443df	57	混合 — 掺杂	hùnhé — chānzá	Hỗn hợp — Pha trộn	混合：把两种液体混合在一起。 掺杂：大米里掺杂了一些沙子。	hùnhé: bǎ liǎng zhǒng yètǐ hùnhé zài yìqǐ. chānzá: dàmǐ lǐ chānzá le yìxiē shāzi.	混合: Đem hai loại chất lỏng trộn hỗn hợp vào nhau. 掺杂: Trong gạo có pha trộn một ít cát.	\N	\N	\N
97cf1e7f-f63a-4fe9-90b7-540bb71dec56	2c45fed9-5798-4042-a668-09d8231443df	58	充沛 — 充足	chōngpèi — chōngzú	Dồi dào — Đầy đủ	充沛：年轻人精力充沛。 充足：旅行前要准备充足的水和食物。	chōngpèi: niánqīngrén jīnglì chōngpèi. chōngzú: lǚxíng qián yào zhǔnbèi chōngzú de shuǐ hé shíwù.	充沛: Người trẻ tuổi tinh thần dồi dào. 充足: Trước khi đi du lịch phải chuẩn bị đầy đủ nước và thức ăn.	\N	\N	\N
1c080437-43c1-4188-9d42-c84844f7e446	2c45fed9-5798-4042-a668-09d8231443df	59	加剧 — 加重	jiājù — jiāzhòng	Trở nên trầm trọng — Gia tăng mức độ	加剧：国际社会的冲突进一步加剧。 加重：病人的病情突然加重了。	jiājù: guójì shèhuì de chōngtū jìnyíbù jiājù. jiāzhòng: bìngrén de bìngqíng tūrán jiāzhòng le.	加剧: Xung đột của xã hội quốc tế tiến thêm một bước trầm trọng. 加重: Bệnh tình của người bệnh đột nhiên tăng nặng rồi.	\N	\N	\N
\.


--
-- Name: lesson_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.lesson_categories_id_seq', 1, false);


--
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.permissions_id_seq', 2, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


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

\unrestrict dIortJraa11Wxpy6fp3N7ppRC27uslebxNrbIbSTWdS7Fzl0Th64eSRoUE2rH9p

