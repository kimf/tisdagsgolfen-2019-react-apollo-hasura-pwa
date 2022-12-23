--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: courses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.courses (
    id bigint NOT NULL,
    club character varying,
    name character varying,
    holes_count integer,
    par integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    events_count integer DEFAULT 0
);


--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: event_teams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_teams (
    id integer NOT NULL,
    event_id integer,
    user_ids integer[],
    points numeric,
    event_points numeric,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: event_teams_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.event_teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: event_teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.event_teams_id_seq OWNED BY public.event_teams.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.events (
    id integer NOT NULL,
    starts_at timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    status integer DEFAULT 0,
    scoring_type integer DEFAULT 0,
    team_event boolean DEFAULT false,
    old_course_name character varying(255),
    season_id integer,
    course_id integer,
    club character varying,
    qualifier boolean DEFAULT false
);


--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: holes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.holes (
    id bigint NOT NULL,
    index integer,
    course_id integer,
    number integer,
    par integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: holes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.holes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: holes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.holes_id_seq OWNED BY public.holes.id;


--
-- Name: live_scores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.live_scores (
    id integer NOT NULL,
    user_id integer,
    event_id integer,
    points integer,
    data json,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    team_index character varying,
    scoring_session_id integer
);


--
-- Name: live_scores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.live_scores_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: live_scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.live_scores_id_seq OWNED BY public.live_scores.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: scores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scores (
    id integer NOT NULL,
    user_id integer,
    points integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    event_id integer,
    event_points numeric,
    season_id integer,
    kr integer DEFAULT 0,
    beers integer DEFAULT 0
);


--
-- Name: scores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.scores_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.scores_id_seq OWNED BY public.scores.id;


--
-- Name: scoring_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scoring_sessions (
    id bigint NOT NULL,
    user_id integer,
    course_id integer,
    team_event boolean,
    scoring_type character varying,
    current_hole integer,
    starts_at timestamp without time zone,
    scoring_items json
);


--
-- Name: scoring_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.scoring_sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: scoring_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.scoring_sessions_id_seq OWNED BY public.scoring_sessions.id;


--
-- Name: seasons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.seasons (
    id integer NOT NULL,
    aggregate_count integer,
    points character varying(255)[] DEFAULT '{}'::character varying[],
    use_reversed_points boolean DEFAULT false,
    closed_at timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    photo character varying,
    name character varying,
    events_count integer DEFAULT 0,
    winner character varying DEFAULT 'null'::character varying,
    final_info character varying DEFAULT 'null'::character varying
);


--
-- Name: seasons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.seasons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: seasons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.seasons_id_seq OWNED BY public.seasons.id;


--
-- Name: user_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_events (
    id integer NOT NULL,
    event_name character varying(255),
    data public.hstore,
    created_at timestamp without time zone
);


--
-- Name: user_events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_events_id_seq OWNED BY public.user_events.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) DEFAULT ''::character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    crypted_password character varying(255),
    salt character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    name character varying(255),
    session_token character varying,
    photo character varying
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: event_teams id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_teams ALTER COLUMN id SET DEFAULT nextval('public.event_teams_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: holes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.holes ALTER COLUMN id SET DEFAULT nextval('public.holes_id_seq'::regclass);


--
-- Name: live_scores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.live_scores ALTER COLUMN id SET DEFAULT nextval('public.live_scores_id_seq'::regclass);


--
-- Name: scores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scores ALTER COLUMN id SET DEFAULT nextval('public.scores_id_seq'::regclass);


--
-- Name: scoring_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_sessions ALTER COLUMN id SET DEFAULT nextval('public.scoring_sessions_id_seq'::regclass);


--
-- Name: seasons id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seasons ALTER COLUMN id SET DEFAULT nextval('public.seasons_id_seq'::regclass);


--
-- Name: user_events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_events ALTER COLUMN id SET DEFAULT nextval('public.user_events_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: event_teams event_teams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_teams
    ADD CONSTRAINT event_teams_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: holes holes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.holes
    ADD CONSTRAINT holes_pkey PRIMARY KEY (id);


--
-- Name: live_scores live_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.live_scores
    ADD CONSTRAINT live_scores_pkey PRIMARY KEY (id);


--
-- Name: users players_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- Name: scores scores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_pkey PRIMARY KEY (id);


--
-- Name: scoring_sessions scoring_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_sessions
    ADD CONSTRAINT scoring_sessions_pkey PRIMARY KEY (id);


--
-- Name: seasons seasons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seasons
    ADD CONSTRAINT seasons_pkey PRIMARY KEY (id);


--
-- Name: user_events user_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_events
    ADD CONSTRAINT user_events_pkey PRIMARY KEY (id);


--
-- Name: index_courses_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_courses_on_name ON public.courses USING btree (name);


--
-- Name: index_event_teams_on_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_event_teams_on_event_id ON public.event_teams USING btree (event_id);


--
-- Name: index_events_on_season_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_events_on_season_id ON public.events USING btree (season_id);


--
-- Name: index_holes_on_course_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_holes_on_course_id ON public.holes USING btree (course_id);


--
-- Name: index_holes_on_course_id_and_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_holes_on_course_id_and_number ON public.holes USING btree (course_id, number);


--
-- Name: index_holes_on_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_holes_on_number ON public.holes USING btree (number);


--
-- Name: index_live_scores_on_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_live_scores_on_event_id ON public.live_scores USING btree (event_id);


--
-- Name: index_live_scores_on_event_id_and_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_live_scores_on_event_id_and_user_id ON public.live_scores USING btree (event_id, user_id);


--
-- Name: index_live_scores_on_scoring_session_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_live_scores_on_scoring_session_id ON public.live_scores USING btree (scoring_session_id);


--
-- Name: index_live_scores_on_scoring_session_id_and_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_live_scores_on_scoring_session_id_and_user_id ON public.live_scores USING btree (scoring_session_id, user_id);


--
-- Name: index_live_scores_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_live_scores_on_user_id ON public.live_scores USING btree (user_id);


--
-- Name: index_scores_on_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_scores_on_event_id ON public.scores USING btree (event_id);


--
-- Name: index_scores_on_event_id_and_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_scores_on_event_id_and_user_id ON public.scores USING btree (event_id, user_id);


--
-- Name: index_scores_on_season_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_scores_on_season_id ON public.scores USING btree (season_id);


--
-- Name: index_scores_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_scores_on_user_id ON public.scores USING btree (user_id);


--
-- Name: index_scoring_sessions_on_course_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_scoring_sessions_on_course_id ON public.scoring_sessions USING btree (course_id);


--
-- Name: index_scoring_sessions_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_scoring_sessions_on_user_id ON public.scoring_sessions USING btree (user_id);


--
-- Name: index_seasons_on_closed_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_seasons_on_closed_at ON public.seasons USING btree (closed_at);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX unique_schema_migrations ON public.schema_migrations USING btree (version);


--
-- PostgreSQL database dump complete
--

