--
-- PostgreSQL database dump
--

\restrict aJgd4qOhvhZYVnVtNjUfiaGzTWqYe1AFRrc9lRifQyx823YOkuos4jefHTSG6g2

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg13+1)
-- Dumped by pg_dump version 18.3 (Debian 18.3-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.users_sessions DROP CONSTRAINT IF EXISTS users_sessions_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.testimonials DROP CONSTRAINT IF EXISTS testimonials_avatar_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.products_support_blocks DROP CONSTRAINT IF EXISTS products_support_blocks_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.products_spec_groups_rows DROP CONSTRAINT IF EXISTS products_spec_groups_rows_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.products_spec_groups DROP CONSTRAINT IF EXISTS products_spec_groups_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.products_rels DROP CONSTRAINT IF EXISTS products_rels_products_fk;
ALTER TABLE IF EXISTS ONLY public.products_rels DROP CONSTRAINT IF EXISTS products_rels_parent_fk;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_meta_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.products_key_highlights DROP CONSTRAINT IF EXISTS products_key_highlights_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_hero_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.products_gallery DROP CONSTRAINT IF EXISTS products_gallery_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.products_gallery DROP CONSTRAINT IF EXISTS products_gallery_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.products_faq_items DROP CONSTRAINT IF EXISTS products_faq_items_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.products_download_items DROP CONSTRAINT IF EXISTS products_download_items_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.products_download_items DROP CONSTRAINT IF EXISTS products_download_items_file_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_category_id_categories_id_fk;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_brand_id_brands_id_fk;
ALTER TABLE IF EXISTS ONLY public.products_applications DROP CONSTRAINT IF EXISTS products_applications_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.payload_preferences_rels DROP CONSTRAINT IF EXISTS payload_preferences_rels_users_fk;
ALTER TABLE IF EXISTS ONLY public.payload_preferences_rels DROP CONSTRAINT IF EXISTS payload_preferences_rels_parent_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_users_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_testimonials_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_products_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_partner_logos_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_parent_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_orders_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_media_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_legal_pages_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_inquiries_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_gallery_videos_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_gallery_posts_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_faqs_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_client_logos_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_certifications_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_categories_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_brands_fk;
ALTER TABLE IF EXISTS ONLY public.partner_logos DROP CONSTRAINT IF EXISTS partner_logos_logo_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_payment_evidence_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.orders_items DROP CONSTRAINT IF EXISTS orders_items_product_id_products_id_fk;
ALTER TABLE IF EXISTS ONLY public.orders_items DROP CONSTRAINT IF EXISTS orders_items_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.legal_pages DROP CONSTRAINT IF EXISTS legal_pages_meta_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.gallery_videos DROP CONSTRAINT IF EXISTS gallery_videos_video_file_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.gallery_videos DROP CONSTRAINT IF EXISTS gallery_videos_thumbnail_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.gallery_posts DROP CONSTRAINT IF EXISTS gallery_posts_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.client_logos DROP CONSTRAINT IF EXISTS client_logos_logo_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.certifications_rels DROP CONSTRAINT IF EXISTS certifications_rels_products_fk;
ALTER TABLE IF EXISTS ONLY public.certifications_rels DROP CONSTRAINT IF EXISTS certifications_rels_parent_fk;
ALTER TABLE IF EXISTS ONLY public.certifications_rels DROP CONSTRAINT IF EXISTS certifications_rels_brands_fk;
ALTER TABLE IF EXISTS ONLY public.certifications DROP CONSTRAINT IF EXISTS certifications_badge_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_parent_id_categories_id_fk;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_meta_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_hero_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.brands DROP CONSTRAINT IF EXISTS brands_logo_id_media_id_fk;
DROP INDEX IF EXISTS public.users_updated_at_idx;
DROP INDEX IF EXISTS public.users_sessions_parent_id_idx;
DROP INDEX IF EXISTS public.users_sessions_order_idx;
DROP INDEX IF EXISTS public.users_email_idx;
DROP INDEX IF EXISTS public.users_created_at_idx;
DROP INDEX IF EXISTS public.testimonials_updated_at_idx;
DROP INDEX IF EXISTS public.testimonials_created_at_idx;
DROP INDEX IF EXISTS public.testimonials_avatar_idx;
DROP INDEX IF EXISTS public.products_updated_at_idx;
DROP INDEX IF EXISTS public.products_support_blocks_parent_id_idx;
DROP INDEX IF EXISTS public.products_support_blocks_order_idx;
DROP INDEX IF EXISTS public.products_spec_groups_rows_parent_id_idx;
DROP INDEX IF EXISTS public.products_spec_groups_rows_order_idx;
DROP INDEX IF EXISTS public.products_spec_groups_parent_id_idx;
DROP INDEX IF EXISTS public.products_spec_groups_order_idx;
DROP INDEX IF EXISTS public.products_slug_idx;
DROP INDEX IF EXISTS public.products_rels_products_id_idx;
DROP INDEX IF EXISTS public.products_rels_path_idx;
DROP INDEX IF EXISTS public.products_rels_parent_idx;
DROP INDEX IF EXISTS public.products_rels_order_idx;
DROP INDEX IF EXISTS public.products_meta_meta_image_idx;
DROP INDEX IF EXISTS public.products_key_highlights_parent_id_idx;
DROP INDEX IF EXISTS public.products_key_highlights_order_idx;
DROP INDEX IF EXISTS public.products_hero_image_idx;
DROP INDEX IF EXISTS public.products_gallery_parent_id_idx;
DROP INDEX IF EXISTS public.products_gallery_order_idx;
DROP INDEX IF EXISTS public.products_gallery_image_idx;
DROP INDEX IF EXISTS public.products_faq_items_parent_id_idx;
DROP INDEX IF EXISTS public.products_faq_items_order_idx;
DROP INDEX IF EXISTS public.products_download_items_parent_id_idx;
DROP INDEX IF EXISTS public.products_download_items_order_idx;
DROP INDEX IF EXISTS public.products_download_items_file_idx;
DROP INDEX IF EXISTS public.products_created_at_idx;
DROP INDEX IF EXISTS public.products_category_idx;
DROP INDEX IF EXISTS public.products_brand_idx;
DROP INDEX IF EXISTS public.products_applications_parent_id_idx;
DROP INDEX IF EXISTS public.products_applications_order_idx;
DROP INDEX IF EXISTS public.payload_preferences_updated_at_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_users_id_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_path_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_parent_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_order_idx;
DROP INDEX IF EXISTS public.payload_preferences_key_idx;
DROP INDEX IF EXISTS public.payload_preferences_created_at_idx;
DROP INDEX IF EXISTS public.payload_migrations_updated_at_idx;
DROP INDEX IF EXISTS public.payload_migrations_created_at_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_updated_at_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_users_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_testimonials_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_products_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_path_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_partner_logos_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_parent_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_orders_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_order_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_media_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_legal_pages_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_inquiries_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_gallery_videos_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_gallery_posts_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_faqs_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_client_logos_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_certifications_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_categories_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_brands_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_global_slug_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_created_at_idx;
DROP INDEX IF EXISTS public.payload_kv_key_idx;
DROP INDEX IF EXISTS public.partner_logos_updated_at_idx;
DROP INDEX IF EXISTS public.partner_logos_logo_idx;
DROP INDEX IF EXISTS public.partner_logos_created_at_idx;
DROP INDEX IF EXISTS public.orders_updated_at_idx;
DROP INDEX IF EXISTS public.orders_payment_evidence_idx;
DROP INDEX IF EXISTS public.orders_order_number_idx;
DROP INDEX IF EXISTS public.orders_items_product_idx;
DROP INDEX IF EXISTS public.orders_items_parent_id_idx;
DROP INDEX IF EXISTS public.orders_items_order_idx;
DROP INDEX IF EXISTS public.orders_created_at_idx;
DROP INDEX IF EXISTS public.media_updated_at_idx;
DROP INDEX IF EXISTS public.media_filename_idx;
DROP INDEX IF EXISTS public.media_created_at_idx;
DROP INDEX IF EXISTS public.legal_pages_updated_at_idx;
DROP INDEX IF EXISTS public.legal_pages_slug_idx;
DROP INDEX IF EXISTS public.legal_pages_meta_meta_image_idx;
DROP INDEX IF EXISTS public.legal_pages_created_at_idx;
DROP INDEX IF EXISTS public.inquiries_updated_at_idx;
DROP INDEX IF EXISTS public.inquiries_created_at_idx;
DROP INDEX IF EXISTS public.gallery_videos_video_file_idx;
DROP INDEX IF EXISTS public.gallery_videos_updated_at_idx;
DROP INDEX IF EXISTS public.gallery_videos_thumbnail_idx;
DROP INDEX IF EXISTS public.gallery_videos_created_at_idx;
DROP INDEX IF EXISTS public.gallery_posts_updated_at_idx;
DROP INDEX IF EXISTS public.gallery_posts_image_idx;
DROP INDEX IF EXISTS public.gallery_posts_created_at_idx;
DROP INDEX IF EXISTS public.faqs_updated_at_idx;
DROP INDEX IF EXISTS public.faqs_created_at_idx;
DROP INDEX IF EXISTS public.client_logos_updated_at_idx;
DROP INDEX IF EXISTS public.client_logos_logo_idx;
DROP INDEX IF EXISTS public.client_logos_created_at_idx;
DROP INDEX IF EXISTS public.certifications_updated_at_idx;
DROP INDEX IF EXISTS public.certifications_rels_products_id_idx;
DROP INDEX IF EXISTS public.certifications_rels_path_idx;
DROP INDEX IF EXISTS public.certifications_rels_parent_idx;
DROP INDEX IF EXISTS public.certifications_rels_order_idx;
DROP INDEX IF EXISTS public.certifications_rels_brands_id_idx;
DROP INDEX IF EXISTS public.certifications_created_at_idx;
DROP INDEX IF EXISTS public.certifications_badge_image_idx;
DROP INDEX IF EXISTS public.categories_updated_at_idx;
DROP INDEX IF EXISTS public.categories_slug_idx;
DROP INDEX IF EXISTS public.categories_parent_idx;
DROP INDEX IF EXISTS public.categories_meta_meta_image_idx;
DROP INDEX IF EXISTS public.categories_hero_image_idx;
DROP INDEX IF EXISTS public.categories_created_at_idx;
DROP INDEX IF EXISTS public.brands_updated_at_idx;
DROP INDEX IF EXISTS public.brands_slug_idx;
DROP INDEX IF EXISTS public.brands_name_idx;
DROP INDEX IF EXISTS public.brands_logo_idx;
DROP INDEX IF EXISTS public.brands_created_at_idx;
ALTER TABLE IF EXISTS ONLY public.users_sessions DROP CONSTRAINT IF EXISTS users_sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.testimonials DROP CONSTRAINT IF EXISTS testimonials_pkey;
ALTER TABLE IF EXISTS ONLY public.site_settings DROP CONSTRAINT IF EXISTS site_settings_pkey;
ALTER TABLE IF EXISTS ONLY public.products_support_blocks DROP CONSTRAINT IF EXISTS products_support_blocks_pkey;
ALTER TABLE IF EXISTS ONLY public.products_spec_groups_rows DROP CONSTRAINT IF EXISTS products_spec_groups_rows_pkey;
ALTER TABLE IF EXISTS ONLY public.products_spec_groups DROP CONSTRAINT IF EXISTS products_spec_groups_pkey;
ALTER TABLE IF EXISTS ONLY public.products_rels DROP CONSTRAINT IF EXISTS products_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.products_key_highlights DROP CONSTRAINT IF EXISTS products_key_highlights_pkey;
ALTER TABLE IF EXISTS ONLY public.products_gallery DROP CONSTRAINT IF EXISTS products_gallery_pkey;
ALTER TABLE IF EXISTS ONLY public.products_faq_items DROP CONSTRAINT IF EXISTS products_faq_items_pkey;
ALTER TABLE IF EXISTS ONLY public.products_download_items DROP CONSTRAINT IF EXISTS products_download_items_pkey;
ALTER TABLE IF EXISTS ONLY public.products_applications DROP CONSTRAINT IF EXISTS products_applications_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_preferences_rels DROP CONSTRAINT IF EXISTS payload_preferences_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_preferences DROP CONSTRAINT IF EXISTS payload_preferences_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_migrations DROP CONSTRAINT IF EXISTS payload_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents DROP CONSTRAINT IF EXISTS payload_locked_documents_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_kv DROP CONSTRAINT IF EXISTS payload_kv_pkey;
ALTER TABLE IF EXISTS ONLY public.partner_logos DROP CONSTRAINT IF EXISTS partner_logos_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.orders_items DROP CONSTRAINT IF EXISTS orders_items_pkey;
ALTER TABLE IF EXISTS ONLY public.media DROP CONSTRAINT IF EXISTS media_pkey;
ALTER TABLE IF EXISTS ONLY public.legal_pages DROP CONSTRAINT IF EXISTS legal_pages_pkey;
ALTER TABLE IF EXISTS ONLY public.inquiries DROP CONSTRAINT IF EXISTS inquiries_pkey;
ALTER TABLE IF EXISTS ONLY public.gallery_videos DROP CONSTRAINT IF EXISTS gallery_videos_pkey;
ALTER TABLE IF EXISTS ONLY public.gallery_posts DROP CONSTRAINT IF EXISTS gallery_posts_pkey;
ALTER TABLE IF EXISTS ONLY public.faqs DROP CONSTRAINT IF EXISTS faqs_pkey;
ALTER TABLE IF EXISTS ONLY public.client_logos DROP CONSTRAINT IF EXISTS client_logos_pkey;
ALTER TABLE IF EXISTS ONLY public.certifications_rels DROP CONSTRAINT IF EXISTS certifications_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.certifications DROP CONSTRAINT IF EXISTS certifications_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.brands DROP CONSTRAINT IF EXISTS brands_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.testimonials ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.site_settings ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.products_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.products ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_preferences_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_preferences ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_locked_documents_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_locked_documents ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_kv ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.partner_logos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.legal_pages ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.inquiries ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.gallery_videos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.gallery_posts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.faqs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.client_logos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.certifications_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.certifications ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.brands ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.users_sessions;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.testimonials_id_seq;
DROP TABLE IF EXISTS public.testimonials;
DROP SEQUENCE IF EXISTS public.site_settings_id_seq;
DROP TABLE IF EXISTS public.site_settings;
DROP TABLE IF EXISTS public.products_support_blocks;
DROP TABLE IF EXISTS public.products_spec_groups_rows;
DROP TABLE IF EXISTS public.products_spec_groups;
DROP SEQUENCE IF EXISTS public.products_rels_id_seq;
DROP TABLE IF EXISTS public.products_rels;
DROP TABLE IF EXISTS public.products_key_highlights;
DROP SEQUENCE IF EXISTS public.products_id_seq;
DROP TABLE IF EXISTS public.products_gallery;
DROP TABLE IF EXISTS public.products_faq_items;
DROP TABLE IF EXISTS public.products_download_items;
DROP TABLE IF EXISTS public.products_applications;
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public.payload_preferences_rels_id_seq;
DROP TABLE IF EXISTS public.payload_preferences_rels;
DROP SEQUENCE IF EXISTS public.payload_preferences_id_seq;
DROP TABLE IF EXISTS public.payload_preferences;
DROP SEQUENCE IF EXISTS public.payload_migrations_id_seq;
DROP TABLE IF EXISTS public.payload_migrations;
DROP SEQUENCE IF EXISTS public.payload_locked_documents_rels_id_seq;
DROP TABLE IF EXISTS public.payload_locked_documents_rels;
DROP SEQUENCE IF EXISTS public.payload_locked_documents_id_seq;
DROP TABLE IF EXISTS public.payload_locked_documents;
DROP SEQUENCE IF EXISTS public.payload_kv_id_seq;
DROP TABLE IF EXISTS public.payload_kv;
DROP SEQUENCE IF EXISTS public.partner_logos_id_seq;
DROP TABLE IF EXISTS public.partner_logos;
DROP TABLE IF EXISTS public.orders_items;
DROP SEQUENCE IF EXISTS public.orders_id_seq;
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public.media_id_seq;
DROP TABLE IF EXISTS public.media;
DROP SEQUENCE IF EXISTS public.legal_pages_id_seq;
DROP TABLE IF EXISTS public.legal_pages;
DROP SEQUENCE IF EXISTS public.inquiries_id_seq;
DROP TABLE IF EXISTS public.inquiries;
DROP SEQUENCE IF EXISTS public.gallery_videos_id_seq;
DROP TABLE IF EXISTS public.gallery_videos;
DROP SEQUENCE IF EXISTS public.gallery_posts_id_seq;
DROP TABLE IF EXISTS public.gallery_posts;
DROP SEQUENCE IF EXISTS public.faqs_id_seq;
DROP TABLE IF EXISTS public.faqs;
DROP SEQUENCE IF EXISTS public.client_logos_id_seq;
DROP TABLE IF EXISTS public.client_logos;
DROP SEQUENCE IF EXISTS public.certifications_rels_id_seq;
DROP TABLE IF EXISTS public.certifications_rels;
DROP SEQUENCE IF EXISTS public.certifications_id_seq;
DROP TABLE IF EXISTS public.certifications;
DROP SEQUENCE IF EXISTS public.categories_id_seq;
DROP TABLE IF EXISTS public.categories;
DROP SEQUENCE IF EXISTS public.brands_id_seq;
DROP TABLE IF EXISTS public.brands;
DROP TYPE IF EXISTS public.enum_products_status;
DROP TYPE IF EXISTS public.enum_products_download_items_type;
DROP TYPE IF EXISTS public.enum_orders_status;
DROP TYPE IF EXISTS public.enum_orders_payment_status;
DROP TYPE IF EXISTS public.enum_orders_payment_method;
DROP TYPE IF EXISTS public.enum_legal_pages_page_type;
DROP TYPE IF EXISTS public.enum_inquiries_status;
DROP TYPE IF EXISTS public.enum_faqs_category;
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: enum_faqs_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_faqs_category AS ENUM (
    'general',
    'products',
    'order-delivery',
    'support-warranty',
    'technical'
);


ALTER TYPE public.enum_faqs_category OWNER TO postgres;

--
-- Name: enum_inquiries_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_inquiries_status AS ENUM (
    'new',
    'in-progress',
    'resolved'
);


ALTER TYPE public.enum_inquiries_status OWNER TO postgres;

--
-- Name: enum_legal_pages_page_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_legal_pages_page_type AS ENUM (
    'privacy-policy',
    'terms-and-conditions',
    'disclaimer',
    'warranty-refund-policy'
);


ALTER TYPE public.enum_legal_pages_page_type OWNER TO postgres;

--
-- Name: enum_orders_payment_method; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_orders_payment_method AS ENUM (
    'bkash',
    'sslcommerz',
    'cod'
);


ALTER TYPE public.enum_orders_payment_method OWNER TO postgres;

--
-- Name: enum_orders_payment_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_orders_payment_status AS ENUM (
    'unpaid',
    'paid',
    'failed'
);


ALTER TYPE public.enum_orders_payment_status OWNER TO postgres;

--
-- Name: enum_orders_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_orders_status AS ENUM (
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
);


ALTER TYPE public.enum_orders_status OWNER TO postgres;

--
-- Name: enum_products_download_items_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_products_download_items_type AS ENUM (
    'brochure',
    'datasheet',
    'manual',
    'certificate',
    'warranty-note'
);


ALTER TYPE public.enum_products_download_items_type OWNER TO postgres;

--
-- Name: enum_products_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_products_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_products_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL,
    country_of_origin character varying,
    summary character varying,
    certifications_text jsonb,
    logo_id integer,
    website character varying,
    is_featured boolean DEFAULT true,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brands_id_seq OWNER TO postgres;

--
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    parent_id integer,
    short_description character varying,
    hero_title character varying,
    hero_description jsonb,
    sort_order numeric,
    is_active boolean DEFAULT true,
    meta_title character varying,
    meta_description character varying,
    meta_image_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    hero_image_id integer
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: certifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certifications (
    id integer NOT NULL,
    title character varying NOT NULL,
    issuer_or_standard_body character varying,
    description character varying,
    badge_image_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.certifications OWNER TO postgres;

--
-- Name: certifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.certifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.certifications_id_seq OWNER TO postgres;

--
-- Name: certifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.certifications_id_seq OWNED BY public.certifications.id;


--
-- Name: certifications_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certifications_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    brands_id integer,
    products_id integer
);


ALTER TABLE public.certifications_rels OWNER TO postgres;

--
-- Name: certifications_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.certifications_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.certifications_rels_id_seq OWNER TO postgres;

--
-- Name: certifications_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.certifications_rels_id_seq OWNED BY public.certifications_rels.id;


--
-- Name: client_logos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client_logos (
    id integer NOT NULL,
    name character varying NOT NULL,
    logo_id integer NOT NULL,
    website character varying,
    sort_order numeric DEFAULT 0,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.client_logos OWNER TO postgres;

--
-- Name: client_logos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.client_logos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.client_logos_id_seq OWNER TO postgres;

--
-- Name: client_logos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.client_logos_id_seq OWNED BY public.client_logos.id;


--
-- Name: faqs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faqs (
    id integer NOT NULL,
    question character varying NOT NULL,
    answer character varying NOT NULL,
    category public.enum_faqs_category DEFAULT 'general'::public.enum_faqs_category,
    sort_order numeric DEFAULT 0,
    is_active boolean DEFAULT true,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.faqs OWNER TO postgres;

--
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faqs_id_seq OWNER TO postgres;

--
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faqs_id_seq OWNED BY public.faqs.id;


--
-- Name: gallery_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gallery_posts (
    id integer NOT NULL,
    title character varying NOT NULL,
    caption character varying,
    image_id integer NOT NULL,
    is_featured boolean DEFAULT false,
    sort_order numeric DEFAULT 0,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.gallery_posts OWNER TO postgres;

--
-- Name: gallery_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gallery_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gallery_posts_id_seq OWNER TO postgres;

--
-- Name: gallery_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gallery_posts_id_seq OWNED BY public.gallery_posts.id;


--
-- Name: gallery_videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gallery_videos (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying,
    embed_url character varying,
    video_file_id integer,
    thumbnail_id integer,
    sort_order numeric DEFAULT 0,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.gallery_videos OWNER TO postgres;

--
-- Name: gallery_videos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gallery_videos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gallery_videos_id_seq OWNER TO postgres;

--
-- Name: gallery_videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gallery_videos_id_seq OWNED BY public.gallery_videos.id;


--
-- Name: inquiries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inquiries (
    id integer NOT NULL,
    full_name character varying NOT NULL,
    role character varying NOT NULL,
    hospital character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying NOT NULL,
    requirements character varying,
    status public.enum_inquiries_status DEFAULT 'new'::public.enum_inquiries_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.inquiries OWNER TO postgres;

--
-- Name: inquiries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inquiries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inquiries_id_seq OWNER TO postgres;

--
-- Name: inquiries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inquiries_id_seq OWNED BY public.inquiries.id;


--
-- Name: legal_pages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.legal_pages (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    page_type public.enum_legal_pages_page_type NOT NULL,
    content jsonb NOT NULL,
    meta_title character varying,
    meta_description character varying,
    meta_image_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.legal_pages OWNER TO postgres;

--
-- Name: legal_pages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.legal_pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.legal_pages_id_seq OWNER TO postgres;

--
-- Name: legal_pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.legal_pages_id_seq OWNED BY public.legal_pages.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media (
    id integer NOT NULL,
    alt character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


ALTER TABLE public.media OWNER TO postgres;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.media_id_seq OWNER TO postgres;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    order_number character varying NOT NULL,
    customer_first_name character varying NOT NULL,
    customer_last_name character varying NOT NULL,
    customer_email character varying NOT NULL,
    customer_phone character varying NOT NULL,
    customer_address character varying NOT NULL,
    customer_city character varying NOT NULL,
    customer_name character varying,
    total_amount numeric NOT NULL,
    payment_method public.enum_orders_payment_method NOT NULL,
    payment_status public.enum_orders_payment_status DEFAULT 'unpaid'::public.enum_orders_payment_status,
    status public.enum_orders_status DEFAULT 'pending'::public.enum_orders_status,
    invoice_link character varying,
    payment_evidence_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: orders_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    product_id integer NOT NULL,
    quantity numeric NOT NULL,
    price_at_purchase numeric NOT NULL
);


ALTER TABLE public.orders_items OWNER TO postgres;

--
-- Name: partner_logos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partner_logos (
    id integer NOT NULL,
    name character varying NOT NULL,
    logo_id integer NOT NULL,
    website character varying,
    sort_order numeric DEFAULT 0,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.partner_logos OWNER TO postgres;

--
-- Name: partner_logos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.partner_logos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.partner_logos_id_seq OWNER TO postgres;

--
-- Name: partner_logos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.partner_logos_id_seq OWNED BY public.partner_logos.id;


--
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);


ALTER TABLE public.payload_kv OWNER TO postgres;

--
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_kv_id_seq OWNER TO postgres;

--
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_locked_documents OWNER TO postgres;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_locked_documents_id_seq OWNER TO postgres;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer,
    brands_id integer,
    categories_id integer,
    certifications_id integer,
    products_id integer,
    legal_pages_id integer,
    testimonials_id integer,
    faqs_id integer,
    inquiries_id integer,
    media_id integer,
    partner_logos_id integer,
    orders_id integer,
    client_logos_id integer,
    gallery_posts_id integer,
    gallery_videos_id integer
);


ALTER TABLE public.payload_locked_documents_rels OWNER TO postgres;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNER TO postgres;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_migrations OWNER TO postgres;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_migrations_id_seq OWNER TO postgres;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_preferences OWNER TO postgres;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_id_seq OWNER TO postgres;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


ALTER TABLE public.payload_preferences_rels OWNER TO postgres;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNER TO postgres;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL,
    mark_as_new boolean DEFAULT false,
    sku character varying,
    category_id integer NOT NULL,
    brand_id integer NOT NULL,
    brochure_page_ref character varying,
    listing_title character varying,
    listing_summary character varying,
    short_summary character varying,
    overview jsonb,
    hero_image_id integer,
    origin_country character varying,
    certification_summary character varying,
    status public.enum_products_status DEFAULT 'published'::public.enum_products_status,
    meta_title character varying,
    meta_description character varying,
    meta_image_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    price numeric,
    discount_price numeric
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_applications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_applications (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    department character varying NOT NULL
);


ALTER TABLE public.products_applications OWNER TO postgres;

--
-- Name: products_download_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_download_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    title character varying NOT NULL,
    type public.enum_products_download_items_type NOT NULL,
    file_id integer,
    external_url character varying
);


ALTER TABLE public.products_download_items OWNER TO postgres;

--
-- Name: products_faq_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_faq_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    question character varying NOT NULL,
    answer character varying NOT NULL
);


ALTER TABLE public.products_faq_items OWNER TO postgres;

--
-- Name: products_gallery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_gallery (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL,
    alt character varying
);


ALTER TABLE public.products_gallery OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: products_key_highlights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_key_highlights (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    item character varying NOT NULL
);


ALTER TABLE public.products_key_highlights OWNER TO postgres;

--
-- Name: products_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    products_id integer
);


ALTER TABLE public.products_rels OWNER TO postgres;

--
-- Name: products_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_rels_id_seq OWNER TO postgres;

--
-- Name: products_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_rels_id_seq OWNED BY public.products_rels.id;


--
-- Name: products_spec_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_spec_groups (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    group_title character varying NOT NULL
);


ALTER TABLE public.products_spec_groups OWNER TO postgres;

--
-- Name: products_spec_groups_rows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_spec_groups_rows (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    label character varying NOT NULL,
    value character varying NOT NULL
);


ALTER TABLE public.products_spec_groups_rows OWNER TO postgres;

--
-- Name: products_support_blocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_support_blocks (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    title character varying NOT NULL,
    body character varying NOT NULL
);


ALTER TABLE public.products_support_blocks OWNER TO postgres;

--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.site_settings (
    id integer NOT NULL,
    company_name character varying DEFAULT 'Healing Technology'::character varying NOT NULL,
    tagline character varying,
    address character varying,
    main_phone character varying,
    secondary_phone character varying,
    marketing_phone character varying,
    service_phone character varying,
    email character varying,
    about_summary character varying,
    trust_summary character varying,
    global_support_text character varying,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


ALTER TABLE public.site_settings OWNER TO postgres;

--
-- Name: site_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.site_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.site_settings_id_seq OWNER TO postgres;

--
-- Name: site_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.site_settings_id_seq OWNED BY public.site_settings.id;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testimonials (
    id integer NOT NULL,
    client_name character varying NOT NULL,
    designation character varying,
    hospital character varying,
    quote character varying NOT NULL,
    avatar_id integer,
    rating numeric DEFAULT 5,
    sort_order numeric DEFAULT 0,
    is_active boolean DEFAULT true,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.testimonials OWNER TO postgres;

--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.testimonials_id_seq OWNER TO postgres;

--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


ALTER TABLE public.users_sessions OWNER TO postgres;

--
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: certifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certifications ALTER COLUMN id SET DEFAULT nextval('public.certifications_id_seq'::regclass);


--
-- Name: certifications_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certifications_rels ALTER COLUMN id SET DEFAULT nextval('public.certifications_rels_id_seq'::regclass);


--
-- Name: client_logos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_logos ALTER COLUMN id SET DEFAULT nextval('public.client_logos_id_seq'::regclass);


--
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs ALTER COLUMN id SET DEFAULT nextval('public.faqs_id_seq'::regclass);


--
-- Name: gallery_posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_posts ALTER COLUMN id SET DEFAULT nextval('public.gallery_posts_id_seq'::regclass);


--
-- Name: gallery_videos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_videos ALTER COLUMN id SET DEFAULT nextval('public.gallery_videos_id_seq'::regclass);


--
-- Name: inquiries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inquiries ALTER COLUMN id SET DEFAULT nextval('public.inquiries_id_seq'::regclass);


--
-- Name: legal_pages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.legal_pages ALTER COLUMN id SET DEFAULT nextval('public.legal_pages_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: partner_logos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_logos ALTER COLUMN id SET DEFAULT nextval('public.partner_logos_id_seq'::regclass);


--
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: products_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_rels ALTER COLUMN id SET DEFAULT nextval('public.products_rels_id_seq'::regclass);


--
-- Name: site_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_settings ALTER COLUMN id SET DEFAULT nextval('public.site_settings_id_seq'::regclass);


--
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (id, name, slug, country_of_origin, summary, certifications_text, logo_id, website, is_featured, updated_at, created_at) FROM stdin;
1	Luminex-Lumen	luminex-lumen	China	\N	\N	\N	\N	t	2026-04-12 04:52:18.954+00	2026-04-09 04:28:08.518+00
18	ALPK2	ALPK2	Japan	ALPK2 (pronounced ALP-K-Two) is a globally recognized Japanese brand specializing in medical diagnostic equipment, particularly renowned for high-quality manual blood pressure monitors (sphygmomanometers) and stethoscopes. Founded in 1969, the brand is owned by Tanaka Sangyo Co. Ltd. and is dedicated to improving healthcare through accurate and reliable medical instruments. 	\N	8	\N	t	2026-04-15 06:59:47.935+00	2026-04-11 12:12:09.322+00
3	Aeonmed	Aeonmed	China	Beijing Aeonmed Co., Ltd. (Aeonmed) is a leading Chinese medical device manufacturer and OR/ICU system solution provider founded in 2001. Specializing in anesthesia machines, ventilators, and surgical equipment, Aeonmed focuses on R&D to deliver high-quality, reliable medical products to over 160 countries, holding over 600 patents.	\N	9	\N	t	2026-04-15 07:00:51.071+00	2026-04-09 04:28:08.564+00
5	BNG Medical	BNG Medical	China	BNG Medical Instruments Co., Ltd. is a specialized Shenzhen-based manufacturer (est. 2015) focusing on high-standard neonatal care equipment, including infant incubators, radiant warmers, and LED phototherapy units. They provide specialized screening, diagnostic, and treatment solutions to hospitals in over 100 countries, combining direct sales with international partnerships.	\N	10	\N	t	2026-04-15 07:02:29.893+00	2026-04-09 04:28:08.59+00
12	Contec	Contec	China	Contec Medical Systems Co., Ltd., founded in 1996 in Qinhuangdao, China, is a high-tech company specializing in the R&D, manufacture, and distribution of medical devices. Listed on the Shenzhen Stock Exchange (300869) in 2020, it is a major producer of equipment like patient monitors, fetal dopplers, and electrocardiographs, distributing to over 140 countries.	\N	12	\N	t	2026-04-15 07:05:26.126+00	2026-04-11 10:57:32.738+00
9	Healing Technology	healing-technology	Bangladesh	\N	\N	14	\N	t	2026-04-15 07:29:59.462+00	2026-04-09 04:28:08.637+00
2	Heyer	Heyer	Germany	Heyer Medical AG, founded in 1883 in Germany, is a leading manufacturer specializing in high-quality anesthesia workstations, ventilators, and respiratory care equipment. Renowned for German engineering, the company provides comprehensive solutions for intensive care, emergency medicine, and home care, with a global footprint across 160 countries.	\N	15	\N	t	2026-04-15 07:31:39.585+00	2026-04-09 04:28:08.549+00
7	Suxin Medical	Jiangsu Suxin Medical	China	Jiangsu Suxin Medical is a Chinese manufacturer specializing in hospital operating room equipment. Founded in 2008, they focus on producing surgical tables, shadowless operating lights, and medical pendants. Their products are known for using high-grade stainless steel and meeting international standards like CE and ISO for global medical use.	\N	16	\N	t	2026-04-15 07:47:12.194+00	2026-04-09 04:28:08.615+00
19	Hilbro	Hilbro	Pakistan	Hilbro is a long-established, family-owned Pakistani brand specializing in the manufacture and export of high-quality surgical, dental, and medical instruments. Founded in 1916, the company has grown from a hand-forging workshop into a global supplier with multiple manufacturing units.	\N	17	\N	t	2026-04-15 09:53:31.943+00	2026-04-11 12:13:05.974+00
8	Hindustan	Hindustan	India	Hindustan Surgicals (Mumbai-based) is a manufacturer and exporter of surgical instruments, including blades and stitch cutters, with nearly a decade of experience supplying hospitals. Established around 1999, it produces, supplies, and exports specialized medical equipment.	\N	18	\N	t	2026-04-15 09:54:25.971+00	2026-04-09 04:28:08.626+00
15	Linde	Linde	Bangladesh	Linde Bangladesh Limited (formerly BOC Bangladesh) is the leading industrial and medical gases company in Bangladesh, with over 70 years of presence. As part of the global Linde Plc, it specializes in producing, supplying, and distributing industrial gases (oxygen, nitrogen, argon), medical gases, and welding products, operating two air separation units and two CO2 plants.	\N	20	\N	t	2026-04-15 09:56:37.235+00	2026-04-11 12:06:42.196+00
11	MIndray	Mindray	China	Founded in 1991, Mindray is a leading global provider of medical devices and solutions, dedicated to innovating patient monitoring, in-vitro diagnostics, and medical imaging. Headquartered in Shenzhen, China, the company provides comprehensive healthcare technologies, including anesthesia machines, ventilators, and surgical systems to improve global access to quality healthcare.	\N	21	\N	t	2026-04-15 09:57:28.099+00	2026-04-11 10:54:36.731+00
17	Olympus	Olympus	Japan	Olympus is a global medical technology leader, renowned for pioneering diagnostic and therapeutic solutions in endoscopy, laparoscopy, and gastroenterology. Founded in 1919 in Japan, the brand is dedicated to enhancing patient care through innovation, leveraging its deep history in optics to become a leader in minimally invasive treatments.	\N	24	\N	t	2026-04-15 10:00:33.861+00	2026-04-11 12:10:48.097+00
4	Perlong Medical	Perlong Medical	China	Perlong Medical founded in 2003 and based in Nanjing China, is a major integrated manufacturer and exporter specializing in comprehensive medical equipment solutions. They offer a wide range of products including surgical equipment, imaging systems, lab devices, and hospital furniture, serving over 140 nations with CE and ISO-certified technology.	\N	25	\N	t	2026-04-15 10:01:36.461+00	2026-04-09 04:28:08.578+00
16	Triup	Triup	China	Triup International Corp. is a professional Chinese manufacturer and exporter specializing in medical equipment, with over 20 years of experience in the industry. Established in the late 1990s/early 2000s and based in Nanjing, Jiangsu, the company focuses on producing and exporting hospital, diagnostic, and household medical appliances.	\N	27	\N	t	2026-04-15 10:06:37.29+00	2026-04-11 12:07:25.217+00
13	Yonker	Yonker	China	Yonker Electronic Science Technology Co., Ltd. (founded 2005) is a renowned Chinese manufacturer specializing in medical monitoring equipment, including oximeters, patient monitors, and oxygen concentrators. With R&D centers in Shenzhen and Xuzhou, they produce over 12 million units annually, exporting to 140+ countries.	\N	28	\N	t	2026-04-15 10:07:33.782+00	2026-04-11 11:00:51.251+00
14	Yuwell	Yuwell	China	Founded in 1998, Yuwell is a leading Chinese medical equipment company specializing in homecare, hospital, and clinical devices, focusing on respiratory, cardiovascular, and diabetes care. Known for innovation, it manufactures products like oxygen concentrators, nebulizers, blood pressure monitors, and CGMs using advanced, intelligent technology.	\N	29	\N	t	2026-04-15 10:08:51.332+00	2026-04-11 11:04:07.317+00
6	ZERONE	Zerone	South Korea	ZERONE Co.Ltd. is a South Korea-based medical equipment manufacturer established in March 2001, specializing in the development and production of electrosurgical units, ultrasonic surgical units, and patient monitoring systems. The company focuses on R&D to create high-frequency surgical tools and exports its products to over 90 countries, holding certifications such as ISO 13485, GMP, and CE. 	\N	30	\N	t	2026-04-15 10:10:37.534+00	2026-04-09 04:28:08.603+00
22	GS	GenSurg	Pakistan	GenSurg (GS) is a mid-grade, affordable line of general surgical instruments, often sourced from high-quality manufacturing hubs like Sialkot, Pakistan, or international alternatives designed for budget-conscious users. These instruments are designed to offer reliable performance for general practice and operating rooms without compromising on essential quality.	\N	\N	\N	t	2026-04-13 04:54:49.187+00	2026-04-13 04:54:49.187+00
25	Groups Power Solutions	Groups Power Solutions	Italy	Groups Power Solutions is an Italian-based manufacturer specializing in high-performance uninterruptible power supplies (UPS), founded in 1968. The company offers a wide range of products including online UPS, rackmount systems, single-phase, and three-phase units designed for industrial applications, data centers, and telecommunications. 	\N	\N	\N	t	2026-04-13 05:12:04.371+00	2026-04-13 05:12:04.37+00
24	Beyond	Beyond	UK	Beyond (Hunan Beyond Medical Technology) BiPAP and CPAP machines, such as the By-Dreamy B19 and ResPlus B-30P, are budget-friendly, Chinese-manufactured respiratory devices designed for OSAHS and respiratory failure. They feature 3.5ΓÇ¥ TFT displays, heated humidifiers, auto-adjusting pressures (4-30 cmHΓééO), and quiet motors (<30dB) for home/clinic use.	\N	11	\N	t	2026-04-15 07:03:59.921+00	2026-04-13 05:10:30.345+00
21	Disonmed	Disonmed	China	Disonmed (Zhengzhou Dison Instrument and Meter Co., Ltd.) is a professional manufacturer and developer of neonatal intensive care medical devices established in 1997. With over 25 years of experience, the company focuses on designing and producing equipment to support newborn care and treatment.	\N	13	\N	t	2026-04-15 07:08:49.838+00	2026-04-12 04:54:56.01+00
20	Le Medical	Le Medical	China	Shenzhen Le Medical Technology Co., Ltd. is a professional manufacturer and R&D-focused company established in 2017, specializing in diagnostic ECG machines, multi-parameter patient monitors, syringe pumps, and infusion pumps. Located in Shenzhen, China, they offer OEM/ODM services, focusing on providing high-quality, portable monitoring and life support devices for clinical settings.	\N	19	\N	t	2026-04-15 09:55:28.838+00	2026-04-12 04:51:43.634+00
26	NOVEL	NOVEL	China	NOVEL microscopes, produced by Ningbo Yongxin Optics, are reliable, high-quality optical instruments designed for educational, clinical, and research applications. The popular NOVEL XSZ-107T series features 1000x magnification, LED illumination, and robust mechanical stages, widely used for histology and pathology.	\N	22	\N	t	2026-04-15 09:58:35.856+00	2026-04-13 05:18:48.459+00
23	National Electrocare	National Electrocare	Bangladesh	National Electrocare is a Bangladesh-based manufacturer and supplier specializing in physiotherapy, rehabilitation, and electrotherapy equipment. They focus on providing high-quality, locally produced, and affordable devicesΓÇösuch as ultrasound therapy machines, traction units, and TENS unitsΓÇöto clinics and hospitals for pain management.	\N	23	\N	t	2026-04-15 09:59:37.992+00	2026-04-13 05:07:05.579+00
10	Puao Medical	Nanjing Puao Medical Equipment	China	Nanjing Puao Medical Equipment Co.Ltd. is a prominent Chinese manufacturer specializing in anesthesia machines, ventilators, and patient monitors. Based in Nanjing and established in the 1970s, it is a high-tech enterprise that exports medical hardware to over 100 countries. The company holds CE and ISO certifications, supplying both domestic hospitals and international markets with critical care equipment.	\N	26	\N	t	2026-04-15 10:05:40.269+00	2026-04-11 09:38:11.606+00
27	HFMED	hfmed	China	Manufacturer: Shanghai Huifeng Medical Instrument Co., Ltd. is a high-tech enterprise with nearly 30 years of manufacturing experience.\nProduction Scale: Operates three dedicated factories with strict, in-house quality control and offers customized OEM services directly, eliminating third-party involvement.\nCore Products: Specializes in over 200 varieties of commercial medical equipment, focusing heavily on surgical lights, operating tables, and medical pendants.\nGlobal Supply: Distributes products to over 200 countries, with established sales bases in over 50 countries.\nCompliance: Fully certified for international commercial distribution with ISO 9001, ISO 13485, CE, SGS, and FDA certifications.	\N	34	\N	t	2026-04-15 11:00:07.772+00	2026-04-15 10:58:45.979+00
29	TRIUP	triup	China	Founded in 1997, TRIUP International Corp. is a globally recognized manufacturer and exporter of premium medical equipment. Based in Nanjing, China, TRIUP specializes in delivering high-quality, reliable medical solutions to healthcare facilities worldwide.	\N	60	\N	t	2026-04-19 07:52:04.616+00	2026-04-19 07:52:04.616+00
30	SOFT TOUCH	softtouch	China	SOFT TOUCH is a trusted medical equipment brand dedicated to combining high-performance technology with clinical precision. Specializing in advanced surgical and critical care solutionsΓÇöincluding high-frequency electrosurgical units and anesthesia workstationsΓÇöwe empower healthcare professionals with reliable, user-centric equipment. Built to stringent international safety standards, SOFT TOUCH delivers uncompromising quality and intuitive design, ensuring precise, minimally invasive care for optimal patient outcomes.	\N	93	\N	t	2026-04-20 11:51:44.441+00	2026-04-20 11:51:44.441+00
31	Ucare	Ucare	China	Ucare is a high-accuracy medical device brand manufactured in China and exclusively imported and distributed in Bangladesh by Healing Technology.\n\nThe brand specializes in professional-grade diagnostic and respiratory tools for home and clinical use, including Digital BP Monitors, Nebulizers, Fetal Dopplers, and Infrared Thermometers. Combining global manufacturing standards with localized support, Ucare ensures that Bangladeshi consumers have access to reliable, CE-certified health monitoring technology with a dependable local warranty.\n\nKey Highlights:\n\nManufacturer: Precision-engineered in China (ISO/CE certified).\n\nImporter: Healing Technology (Dhaka, Bangladesh).\n\nCore Range: BP machines, nebulizers, dopplers, and digital thermometers.\n\nValue: Accurate, user-friendly, and supported by local after-sales service.	\N	141	\N	t	2026-04-27 04:59:56.113+00	2026-04-27 04:59:56.112+00
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, title, slug, parent_id, short_description, hero_title, hero_description, sort_order, is_active, meta_title, meta_description, meta_image_id, updated_at, created_at, hero_image_id) FROM stdin;
7	Operation Theater Equipments	ot-quipments	\N	\N	Operation Theater Equipments	\N	0	t	Healing Technology ΓÇö Operation Theater Equipments		\N	2026-04-28 05:00:41.492+00	2026-04-09 04:28:08.735+00	\N
6	Diagnostic Equipments	diagnosticequipments	\N	\N	\N	\N	1	t	Healing Technology ΓÇö Diagnostic Equipments	\N	\N	2026-04-28 05:01:05.256+00	2026-04-09 04:28:08.72+00	\N
5	Hospital Furniture	hospital-furniture	\N	\N	\N	\N	2	t	Healing Technology ΓÇö Operation Theater Equipments	\N	\N	2026-04-28 05:01:15.669+00	2026-04-09 04:28:08.701+00	\N
4	Respiratory Devices	respiratory-devices	\N	\N	\N	\N	5	t	\N	\N	\N	2026-04-28 05:02:17.223+00	2026-04-09 04:28:08.691+00	\N
1	Medical Devices	Medical-Devices	1	Ucare is a high-accuracy medical device brand manufactured in China and exclusively imported and distributed in Bangladesh by Healing Technology.\n\nThe brand specializes in professional-grade diagnostic and respiratory tools for home and clinical use, including Digital BP Monitors, Nebulizers, Fetal Dopplers, and Infrared Thermometers. Combining global manufacturing standards with localized support, Ucare ensures that Bangladeshi consumers have access to reliable, CE-certified health monitoring technology with a dependable local warranty.\n\nKey Highlights:\n\nManufacturer: Precision-engineered in China (ISO/CE certified).\n\nImporter: Healing Technology (Dhaka, Bangladesh).\n\nCore Range: BP machines, nebulizers, dopplers, and digital thermometers.\n\nValue: Accurate, user-friendly, and supported by local after-sales service.	Medical Devices	\N	6	t	Healing Technology ΓÇö Medical Devices	Ucare is a high-accuracy medical device brand manufactured in China and exclusively imported and distributed in Bangladesh by Healing Technology.\n\nThe brand specializes in professional-grade diagnostic and respiratory tools for home and clinical use, including Digital BP Monitors, Nebulizers, Fetal Dopplers, and Infrared Thermometers. Combining global manufacturing standards with localized support, Ucare ensures that Bangladeshi consumers have access to reliable, CE-certified health monitoring technology with a dependable local warranty.\n\nKey Highlights:\n\nManufacturer: Precision-engineered in China (ISO/CE certified).\n\nImporter: Healing Technology (Dhaka, Bangladesh).\n\nCore Range: BP machines, nebulizers, dopplers, and digital thermometers.\n\nValue: Accurate, user-friendly, and supported by local after-sales service.	141	2026-04-28 05:02:35.706+00	2026-04-09 04:28:08.651+00	140
9	Medical Accessories	Medical-Accessories	\N	\N	Medical Accessories	\N	7	t	Healing Technology ΓÇö Medical Accessories	\N	\N	2026-04-28 05:03:29.329+00	2026-04-28 05:03:29.329+00	\N
2	ICU & NICU Equipment	icu-equipment	\N	\N	\N	\N	3	t	\N	\N	\N	2026-04-28 05:04:58.668+00	2026-04-09 04:28:08.664+00	\N
\.


--
-- Data for Name: certifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certifications (id, title, issuer_or_standard_body, description, badge_image_id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: certifications_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certifications_rels (id, "order", parent_id, path, brands_id, products_id) FROM stdin;
\.


--
-- Data for Name: client_logos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client_logos (id, name, logo_id, website, sort_order, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faqs (id, question, answer, category, sort_order, is_active, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: gallery_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gallery_posts (id, title, caption, image_id, is_featured, sort_order, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: gallery_videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gallery_videos (id, title, description, embed_url, video_file_id, thumbnail_id, sort_order, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: inquiries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inquiries (id, full_name, role, hospital, email, phone, requirements, status, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: legal_pages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.legal_pages (id, title, slug, page_type, content, meta_title, meta_description, meta_image_id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
4	\N	2026-04-15 06:02:30.415+00	2026-04-15 06:02:30.415+00	/api/media/file/OT%20Light%20Double%20dome.png	\N	OT Light Double dome.png	image/png	2181105	2734	1636	50	50
5	\N	2026-04-15 06:44:09.365+00	2026-04-15 06:44:09.365+00	/api/media/file/imgi_22_SX-700700-color_01.jpg	\N	imgi_22_SX-700700-color_01.jpg	image/jpeg	1690067	4762	6735	50	50
6	\N	2026-04-15 06:44:21.795+00	2026-04-15 06:44:21.795+00	/api/media/file/imgi_9_weixintupian_20251028155952_363_39.png	\N	imgi_9_weixintupian_20251028155952_363_39.png	image/png	1247674	987	979	50	50
7	\N	2026-04-15 06:44:33.642+00	2026-04-15 06:44:33.642+00	/api/media/file/imgi_7_weixintupian_20251028142828_54_139.png	\N	imgi_7_weixintupian_20251028142828_54_139.png	image/png	939752	1440	810	50	50
8	\N	2026-04-15 06:59:36.147+00	2026-04-15 06:59:36.147+00	/api/media/file/imgi_1_logo.png	\N	imgi_1_logo.png	image/png	10847	366	102	50	50
12	\N	2026-04-15 07:05:24.181+00	2026-04-15 07:05:24.181+00	/api/media/file/imgi_30_588364243_1417875910341898_5650522944322631711_n.png	\N	imgi_30_588364243_1417875910341898_5650522944322631711_n.png	image/png	145964	952	200	50	50
9	\N	2026-04-15 07:05:58.31+00	2026-04-15 07:00:46.981+00	/api/media/file/Aeonmed%20%20LOgo.png	\N	Aeonmed  LOgo.png	image/png	24383	581	175	50	50
10	\N	2026-04-15 07:06:20.691+00	2026-04-15 07:02:25.347+00	/api/media/file/imgi_3_1631307609693.jpg	\N	imgi_3_1631307609693.jpg	image/jpeg	4884	171	157	50	50
11	\N	2026-04-15 07:06:49.096+00	2026-04-15 07:03:57.67+00	/api/media/file/imgi_219_hq720.png	\N	imgi_219_hq720.png	image/png	73992	390	100	50	50
13	\N	2026-04-15 07:08:42.045+00	2026-04-15 07:08:42.045+00	/api/media/file/fff84c20-7177-44c2-9318-93de2ca0f473.png_290xaf.png	\N	fff84c20-7177-44c2-9318-93de2ca0f473.png_290xaf.png	image/png	14395	283	35	50	50
14	\N	2026-04-15 07:29:57.337+00	2026-04-15 07:29:57.337+00	/api/media/file/logo%20bd.jpg	\N	logo bd.jpg	image/jpeg	70913	1091	1123	50	50
15	\N	2026-04-15 07:31:37.808+00	2026-04-15 07:31:37.808+00	/api/media/file/imgi_11_default.png	\N	imgi_11_default.png	image/png	4863	223	72	50	50
17	\N	2026-04-15 09:53:30.907+00	2026-04-15 09:53:30.907+00	/api/media/file/newupdatedlogo-1304x424.png	\N	newupdatedlogo-1304x424.png	image/png	54597	1304	424	50	50
18	\N	2026-04-15 09:54:25.091+00	2026-04-15 09:54:25.091+00	/api/media/file/2-90x90.webp	\N	2-90x90.webp	image/webp	5656	90	68	50	50
19	\N	2026-04-15 09:55:27.857+00	2026-04-15 09:55:27.857+00	/api/media/file/Shenzhen-Le-Medical-Technology-Co-Ltd-.webp	\N	Shenzhen-Le-Medical-Technology-Co-Ltd-.webp	image/webp	1992	119	45	50	50
20	\N	2026-04-15 09:56:32.674+00	2026-04-15 09:56:32.674+00	/api/media/file/imgi_82_Linde_plc_logo.png	\N	imgi_82_Linde_plc_logo.png	image/png	1507154	2560	1280	50	50
21	\N	2026-04-15 09:57:26.887+00	2026-04-15 09:57:26.887+00	/api/media/file/imgi_89_Mindray-Logo.jpg	\N	imgi_89_Mindray-Logo.jpg	image/jpeg	62027	2000	736	50	50
22	\N	2026-04-15 09:58:35.147+00	2026-04-15 09:58:35.147+00	/api/media/file/Novel_Logo.png	\N	Novel_Logo.png	image/png	7826	696	202	50	50
23	\N	2026-04-15 09:59:35.805+00	2026-04-15 09:59:35.805+00	/api/media/file/imgi_2_Capture-removebg-preview-1.png	\N	imgi_2_Capture-removebg-preview-1.png	image/png	35684	550	97	50	50
24	\N	2026-04-15 10:00:32.388+00	2026-04-15 10:00:32.388+00	/api/media/file/imgi_65_Olympus-Logo.png	\N	imgi_65_Olympus-Logo.png	image/png	69095	3840	872	50	50
25	\N	2026-04-15 10:01:35.054+00	2026-04-15 10:01:35.054+00	/api/media/file/imgi_52_logo-2016-06-23-08-32-16-small.png	\N	imgi_52_logo-2016-06-23-08-32-16-small.png	image/png	41697	259	94	50	50
26	\N	2026-04-15 10:05:39.464+00	2026-04-15 10:05:39.464+00	/api/media/file/imgi_1_Nanjing-Puao-Medical-Equipment-Co-Ltd-.png	\N	imgi_1_Nanjing-Puao-Medical-Equipment-Co-Ltd-.png	image/png	10690	120	33	50	50
27	\N	2026-04-15 10:06:36.4+00	2026-04-15 10:06:36.4+00	/api/media/file/imgi_1_684a93b221356.png	\N	imgi_1_684a93b221356.png	image/png	23320	283	74	50	50
28	\N	2026-04-15 10:07:32.692+00	2026-04-15 10:07:32.692+00	/api/media/file/imgi_1_logo-300X831.png	\N	imgi_1_logo-300X831.png	image/png	10619	300	83	50	50
29	\N	2026-04-15 10:08:50.653+00	2026-04-15 10:08:50.653+00	/api/media/file/imgi_3_default.png	\N	imgi_3_default.png	image/png	18465	180	65	50	50
30	\N	2026-04-15 10:10:36.814+00	2026-04-15 10:10:36.814+00	/api/media/file/imgi_8_235.png	\N	imgi_8_235.png	image/png	7485	250	61	50	50
31	\N	2026-04-15 10:31:03.842+00	2026-04-15 10:31:03.841+00	/api/media/file/ot%20double.png	\N	ot double.png	image/png	174630	818	415	50	50
32	\N	2026-04-15 10:51:26.93+00	2026-04-15 10:51:26.93+00	/api/media/file/imgi_6_hf-l60-l84c-led219d6.png	\N	imgi_6_hf-l60-l84c-led219d6.png	image/png	341636	750	750	50	50
34	\N	2026-04-15 11:00:06.789+00	2026-04-15 11:00:06.788+00	/api/media/file/logo.webp	\N	logo.webp	image/webp	5210	400	97	50	50
16	\N	2026-04-16 10:33:07.903+00	2026-04-15 07:47:10.695+00	/api/media/file/Asset%203.png	\N	Asset 3.png	image/png	8753	523	119	50	50
35	\N	2026-04-16 11:24:23.554+00	2026-04-16 11:24:23.553+00	/api/media/file/imgi_9_baidizhutuzhaopian.png	\N	imgi_9_baidizhutuzhaopian.png	image/png	325573	800	800	50	50
36	\N	2026-04-16 11:24:34.299+00	2026-04-16 11:24:34.299+00	/api/media/file/imgi_10_weixintupian_20251028142828_54_139.png	\N	imgi_10_weixintupian_20251028142828_54_139.png	image/png	939752	1440	810	50	50
38	\N	2026-04-16 11:26:07.436+00	2026-04-16 11:26:07.436+00	/api/media/file/imgi_12_96a47b0f3e090c713949d1fb9e1540f-1.png	\N	imgi_12_96a47b0f3e090c713949d1fb9e1540f-1.png	image/png	2625708	1702	1276	50	50
39	\N	2026-04-16 11:27:47.706+00	2026-04-16 11:27:47.706+00	/api/media/file/imgi_13_IMG_2166.png	\N	imgi_13_IMG_2166.png	image/png	8731208	4032	3024	50	50
40	\N	2026-04-16 11:29:19.476+00	2026-04-16 11:29:19.476+00	/api/media/file/imgi_9_baidizhutuzhaopian-1.png	\N	imgi_9_baidizhutuzhaopian-1.png	image/png	325573	800	800	50	50
41	\N	2026-04-16 11:33:38.803+00	2026-04-16 11:33:38.802+00	/api/media/file/000.png	\N	000.png	image/png	8868954	3194	2305	50	50
37	\N	2026-04-16 11:36:25.957+00	2026-04-16 11:24:43.915+00	/api/media/file/imgi_12_96a47b0f3e090c713949d1fb9e1540f.png	\N	imgi_12_96a47b0f3e090c713949d1fb9e1540f.png	image/png	2444747	1520	1099	50	50
42	\N	2026-04-16 12:11:52.409+00	2026-04-16 12:11:52.409+00	/api/media/file/Healing%20Technology.jpg	\N	Healing Technology.jpg	image/jpeg	2770387	4096	2954	50	50
43	\N	2026-04-16 12:17:24.948+00	2026-04-16 12:17:24.948+00	/api/media/file/Healing%20Technology%202.jpg	\N	Healing Technology 2.jpg	image/jpeg	1159799	4096	2954	50	50
44	\N	2026-04-19 06:33:20.938+00	2026-04-19 06:33:20.937+00	/api/media/file/1.%20Brochure%20OL9500-%20cfv.png	\N	1. Brochure OL9500- cfv.png	image/png	960987	1724	1035	50	50
45	\N	2026-04-19 06:36:21.061+00	2026-04-19 06:36:21.061+00	/api/media/file/1.%20Brochure%20OL9500-2024V1gregre.png	\N	1. Brochure OL9500-2024V1gregre.png	image/png	567890	810	607	50	50
46	\N	2026-04-19 06:43:34.917+00	2026-04-19 06:43:34.917+00	/api/media/file/1.%20Brochure%20OL9500.jpg	\N	1. Brochure OL9500.jpg	image/jpeg	1624699	4031	3023	50	50
47	\N	2026-04-19 06:51:06.373+00	2026-04-19 06:51:06.372+00	/api/media/file/Heyer%20OT%20Light-7.png	\N	Heyer OT Light-7.png	image/png	4874756	3110	1867	50	50
48	\N	2026-04-19 06:51:19.674+00	2026-04-19 06:51:19.674+00	/api/media/file/Heyer%20OT%20Light-3.png	\N	Heyer OT Light-3.png	image/png	1324674	1399	933	50	50
49	\N	2026-04-19 06:53:14.612+00	2026-04-19 06:53:14.612+00	/api/media/file/Heyer%20OT%20Light-2.jpg	\N	Heyer OT Light-2.jpg	image/jpeg	1622050	5616	3744	50	50
50	\N	2026-04-19 06:53:40.38+00	2026-04-19 06:53:40.38+00	/api/media/file/Heyer%20OT%20Light-1.png	\N	Heyer OT Light-1.png	image/png	12845774	3744	4898	50	50
51	\N	2026-04-19 07:20:16.861+00	2026-04-19 07:20:16.861+00	/api/media/file/Heyer%20OT%20Table-8.png	\N	Heyer OT Table-8.png	image/png	963026	2434	1623	50	50
52	\N	2026-04-19 07:20:29.136+00	2026-04-19 07:20:29.136+00	/api/media/file/Heyer%20OT%20Table.png	\N	Heyer OT Table.png	image/png	975331	1991	2655	50	50
53	\N	2026-04-19 07:20:47.476+00	2026-04-19 07:20:47.476+00	/api/media/file/Heyer%20OT%20Table-2.png	\N	Heyer OT Table-2.png	image/png	3634636	4961	3484	50	50
54	\N	2026-04-19 07:21:16.105+00	2026-04-19 07:21:16.105+00	/api/media/file/Heyer%20OT%20Table%20Spec.png	\N	Heyer OT Table Spec.png	image/png	661337	2552	3299	50	50
55	\N	2026-04-19 07:21:39.064+00	2026-04-19 07:21:39.064+00	/api/media/file/Heyer%20OT%20Table-9.png	\N	Heyer OT Table-9.png	image/png	963026	2434	1623	50	50
56	\N	2026-04-19 07:23:17.886+00	2026-04-19 07:23:17.886+00	/api/media/file/Heyer%20OT%20Table%20Spec-1.png	\N	Heyer OT Table Spec-1.png	image/png	657060	2552	3299	50	50
57	\N	2026-04-19 07:39:13.737+00	2026-04-19 07:39:13.737+00	/api/media/file/imgi_5_big_69323bdb75c8c.png	\N	imgi_5_big_69323bdb75c8c.png	image/png	82240	542	356	50	50
58	\N	2026-04-19 07:39:46.363+00	2026-04-19 07:39:46.363+00	/api/media/file/3008A-catalog.png	\N	3008A-catalog.png	image/png	294653	934	494	50	50
59	\N	2026-04-19 07:42:42.43+00	2026-04-19 07:42:42.43+00	/api/media/file/imgi_5_big_69323bdb75c8c-1.png	\N	imgi_5_big_69323bdb75c8c-1.png	image/png	82240	542	356	50	50
60	\N	2026-04-19 07:50:12.406+00	2026-04-19 07:50:12.406+00	/api/media/file/Triup%20logo.png	\N	Triup logo.png	image/png	19143	170	71	50	50
61	\N	2026-04-19 08:02:51.174+00	2026-04-19 08:02:51.174+00	/api/media/file/imgi_36_SXS3008-800-800.png	\N	imgi_36_SXS3008-800-800.png	image/png	167622	747	475	50	50
62	\N	2026-04-19 08:03:43.178+00	2026-04-19 08:03:43.178+00	/api/media/file/imgi_36_SXS3008-800-801.png	\N	imgi_36_SXS3008-800-801.png	image/png	209001	800	800	50	50
63	\N	2026-04-19 08:04:04.112+00	2026-04-19 08:04:04.112+00	/api/media/file/imgi_9_1.png	\N	imgi_9_1.png	image/png	238325	844	614	50	50
65	\N	2026-04-19 08:14:04.74+00	2026-04-19 08:14:04.739+00	/api/media/file/HF%20Med%20OT%20LIght-3.png	\N	HF Med OT LIght-3.png	image/png	4383256	2480	3148	50	50
66	\N	2026-04-19 08:14:23.253+00	2026-04-19 08:14:23.253+00	/api/media/file/HF%20Med%20OT%20LIght-4.png	\N	HF Med OT LIght-4.png	image/png	2083595	2480	1540	50	50
67	\N	2026-04-19 08:15:48.317+00	2026-04-19 08:15:48.317+00	/api/media/file/HF%20Med%20OT%20LIght.png	\N	HF Med OT LIght.png	image/png	2162152	2480	2996	50	50
68	\N	2026-04-19 08:36:26.323+00	2026-04-19 08:36:26.322+00	/api/media/file/OT%20Light%20Double%20dome-1.png	\N	OT Light Double dome-1.png	image/png	2181105	2734	1636	50	50
69	\N	2026-04-19 08:37:45.371+00	2026-04-19 08:37:45.37+00	/api/media/file/imgi_13_IMG_2166-1.png	\N	imgi_13_IMG_2166-1.png	image/png	8731208	4032	3024	50	50
70	\N	2026-04-19 08:38:19.377+00	2026-04-19 08:38:19.377+00	/api/media/file/Untitled%20design.png	\N	Untitled design.png	image/png	6829829	4096	2954	50	50
71	\N	2026-04-19 11:42:29.177+00	2026-04-19 11:42:29.177+00	/api/media/file/7200%20brochure.png	\N	7200 brochure.png	image/png	690060	1018	1526	50	50
72	\N	2026-04-19 11:44:33.864+00	2026-04-19 11:44:33.864+00	/api/media/file/7200%20brochure-1.png	\N	7200 brochure-1.png	image/png	690060	1018	1526	50	50
73	\N	2026-04-20 10:51:22.552+00	2026-04-20 10:51:22.552+00	/api/media/file/Anesteshia.png	\N	Anesteshia.png	image/png	968881	936	1046	50	50
74	\N	2026-04-20 10:51:58.888+00	2026-04-20 10:51:58.888+00	/api/media/file/imgi_71_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	\N	imgi_71_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	image/png	880277	945	1000	50	50
75	\N	2026-04-20 10:52:15.373+00	2026-04-20 10:52:15.373+00	/api/media/file/imgi_74_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	\N	imgi_74_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	image/png	627546	768	513	50	50
76	\N	2026-04-20 10:52:23.457+00	2026-04-20 10:52:23.457+00	/api/media/file/imgi_72_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	\N	imgi_72_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	image/png	432159	768	513	50	50
77	\N	2026-04-20 10:52:36.829+00	2026-04-20 10:52:36.829+00	/api/media/file/imgi_76_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	\N	imgi_76_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	image/png	449245	500	374	50	50
78	\N	2026-04-20 10:52:45.181+00	2026-04-20 10:52:45.181+00	/api/media/file/imgi_75_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	\N	imgi_75_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	image/png	281638	500	315	50	50
79	\N	2026-04-20 10:52:53.103+00	2026-04-20 10:52:53.103+00	/api/media/file/imgi_73_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	\N	imgi_73_Anaesthesia-Machine-with-2-Gas-Source-Jinling-820-.png	image/png	291254	768	513	50	50
80	\N	2026-04-20 10:54:43.407+00	2026-04-20 10:54:43.407+00	/api/media/file/anestghesia.jpg	\N	anestghesia.jpg	image/jpeg	500112	1500	1676	50	50
82	\N	2026-04-20 10:56:24.352+00	2026-04-20 10:56:24.352+00	/api/media/file/7200%20brochure-2.png	\N	7200 brochure-2.png	image/png	690060	1018	1526	50	50
84	\N	2026-04-20 11:03:23.927+00	2026-04-20 11:03:23.927+00	/api/media/file/imgi_79_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-1.png	\N	imgi_79_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-1.png	image/png	1849442	1500	1731	50	50
86	\N	2026-04-20 11:04:39.188+00	2026-04-20 11:04:39.188+00	/api/media/file/imgi_80_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	\N	imgi_80_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	image/png	414138	739	643	50	50
87	\N	2026-04-20 11:05:04.928+00	2026-04-20 11:05:04.928+00	/api/media/file/imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	\N	imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	image/png	469716	741	645	50	50
88	\N	2026-04-20 11:05:34.228+00	2026-04-20 11:05:34.228+00	/api/media/file/imgi_81_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	\N	imgi_81_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	image/png	305309	741	641	50	50
89	\N	2026-04-20 11:06:05.295+00	2026-04-20 11:06:05.295+00	/api/media/file/imgi_83_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	\N	imgi_83_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	image/png	611340	768	1003	50	50
85	\N	2026-04-20 11:07:00.217+00	2026-04-20 11:04:06.364+00	/api/media/file/imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-1.png	\N	imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-1.png	image/png	533362	768	768	50	50
64	\N	2026-04-22 12:56:29.415+00	2026-04-19 08:09:28.815+00	/api/media/file/dc240b4d-0393-4119-b82c-075d9696b069.png	\N	dc240b4d-0393-4119-b82c-075d9696b069.png	image/png	1720465	1841	1966	50	50
145	\N	2026-04-28 06:14:00.986+00	2026-04-28 06:14:00.986+00	/api/media/file/Untitled%20design%207.png	\N	Untitled design 7.png	image/png	2082077	2048	1907	50	50
83	\N	2026-04-29 06:59:00.966+00	2026-04-20 11:02:05.752+00	/api/media/file/Zingling%20850.png	\N	Zingling 850.png	image/png	2807223	1500	1731	50	50
90	\N	2026-04-29 07:05:31.563+00	2026-04-20 11:07:45.862+00	/api/media/file/imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-2.png	\N	imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-2.png	image/png	469689	741	640	50	50
92	\N	2026-04-20 11:38:00.011+00	2026-04-20 11:38:00.011+00	/api/media/file/imgi_81_Mt-High-Frequency-Electrocautery-Diagnosis-Equipment-Gynecology-El.png	\N	imgi_81_Mt-High-Frequency-Electrocautery-Diagnosis-Equipment-Gynecology-El.png	image/png	323584	1047	615	50	50
93	\N	2026-04-20 11:51:41.033+00	2026-04-20 11:51:41.033+00	/api/media/file/Soft%20Touch.png	\N	Soft Touch.png	image/png	27690	1544	642	50	50
94	\N	2026-04-20 11:56:59.805+00	2026-04-20 11:56:59.805+00	/api/media/file/Soft%20Touch%20dia.png	\N	Soft Touch dia.png	image/png	7337198	6922	4400	50	50
95	\N	2026-04-21 05:20:07.348+00	2026-04-21 05:20:07.348+00	/api/media/file/Aeonmed%20%20LOgo-1.png	\N	Aeonmed  LOgo-1.png	image/png	36068	641	258	50	50
96	\N	2026-04-21 05:20:55.657+00	2026-04-21 05:20:55.657+00	/api/media/file/imgi_7_default.png	\N	imgi_7_default.png	image/png	12002	425	119	50	50
97	\N	2026-04-21 05:22:50.908+00	2026-04-21 05:22:50.908+00	/api/media/file/HTB1daP0OpXXXXbAXVXXq6xXFXXXQ.avif	\N	HTB1daP0OpXXXXbAXVXXq6xXFXXXQ.avif	image/avif	8601	680	500	50	50
98	\N	2026-04-21 05:23:57.983+00	2026-04-21 05:23:57.983+00	/api/media/file/imgi_8_235-1.png	\N	imgi_8_235-1.png	image/png	7654	250	88	50	50
99	\N	2026-04-21 05:24:34.187+00	2026-04-21 05:24:34.187+00	/api/media/file/imgi_1_684a93b221356-1.png	\N	imgi_1_684a93b221356-1.png	image/png	23320	283	74	50	50
100	\N	2026-04-21 06:16:44.027+00	2026-04-21 06:16:44.027+00	/api/media/file/Healing%20Technology-1.jpg	\N	Healing Technology-1.jpg	image/jpeg	2770387	4096	2954	50	50
101	\N	2026-04-21 06:20:41.435+00	2026-04-21 06:20:41.435+00	/api/media/file/Double%20Dome-2.png	\N	Double Dome-2.png	image/png	5224513	2371	3352	50	50
102	\N	2026-04-21 06:25:06.67+00	2026-04-21 06:25:06.67+00	/api/media/file/Double%20Dome-1.jpg	\N	Double Dome-1.jpg	image/jpeg	1831745	2549	3363	50	50
103	\N	2026-04-21 06:25:24.98+00	2026-04-21 06:25:24.98+00	/api/media/file/Double%20Dome-3.jpg	\N	Double Dome-3.jpg	image/jpeg	1577722	2463	3508	50	50
104	\N	2026-04-21 06:25:40.554+00	2026-04-21 06:25:40.553+00	/api/media/file/Double%20Do.jpg	\N	Double Do.jpg	image/jpeg	972485	2371	3352	50	50
105	\N	2026-04-21 06:26:05.514+00	2026-04-21 06:26:05.514+00	/api/media/file/Healing%20Technology-2.jpg	\N	Healing Technology-2.jpg	image/jpeg	2770387	4096	2954	50	50
106	\N	2026-04-21 06:28:06.435+00	2026-04-21 06:28:06.435+00	/api/media/file/imgi_10_weixintupian_20251028142828_54_139-1.png	\N	imgi_10_weixintupian_20251028142828_54_139-1.png	image/png	939752	1440	810	50	50
107	\N	2026-04-21 06:34:46.392+00	2026-04-21 06:34:46.392+00	/api/media/file/Double%20Dom.jpg	\N	Double Dom.jpg	image/jpeg	275724	2344	1265	50	50
108	\N	2026-04-21 06:35:33.738+00	2026-04-21 06:35:33.738+00	/api/media/file/Double%20Dome-2.jpg	\N	Double Dome-2.jpg	image/jpeg	1831745	2549	3363	50	50
109	\N	2026-04-21 06:37:55.913+00	2026-04-21 06:37:55.913+00	/api/media/file/Double%20Dome-1hjgcv.jpg	\N	Double Dome-1hjgcv.jpg	image/jpeg	246096	1995	1149	50	50
110	\N	2026-04-21 07:51:39.057+00	2026-04-21 07:51:39.057+00	/api/media/file/AEONMED-AS100A-CPAP.png	\N	AEONMED-AS100A-CPAP.png	image/png	1623240	2784	1802	50	50
111	\N	2026-04-21 07:58:37.479+00	2026-04-21 07:58:37.479+00	/api/media/file/imgi_7_20201027124042_43551.png	\N	imgi_7_20201027124042_43551.png	image/png	266229	865	464	50	50
112	\N	2026-04-21 07:59:14.328+00	2026-04-21 07:59:14.328+00	/api/media/file/imgi_12_20201028150634_9236.png	\N	imgi_12_20201028150634_9236.png	image/png	432384	1069	684	50	50
113	\N	2026-04-21 07:59:31.179+00	2026-04-21 07:59:31.178+00	/api/media/file/imgi_9_20201027124147_67408.png	\N	imgi_9_20201027124147_67408.png	image/png	740873	1046	840	50	50
114	\N	2026-04-21 07:59:48.756+00	2026-04-21 07:59:48.756+00	/api/media/file/imgi_8_20201028150620_47359.png	\N	imgi_8_20201028150620_47359.png	image/png	625316	1040	665	50	50
115	\N	2026-04-21 08:00:06.858+00	2026-04-21 08:00:06.858+00	/api/media/file/imgi_10_20201027124207_42746.png	\N	imgi_10_20201027124207_42746.png	image/png	312971	889	770	50	50
116	\N	2026-04-21 08:01:27.759+00	2026-04-21 08:01:27.759+00	/api/media/file/aeonmed-as100A-cpap-auto-2.png	\N	aeonmed-as100A-cpap-auto-2.png	image/png	350430	1050	700	50	50
117	\N	2026-04-21 08:09:19.91+00	2026-04-21 08:09:19.91+00	/api/media/file/imgi_12_20201028150634_9236-1.png	\N	imgi_12_20201028150634_9236-1.png	image/png	431989	1034	690	50	50
118	\N	2026-04-21 08:26:18.681+00	2026-04-21 08:26:18.681+00	/api/media/file/Aeonmed%20Bipap%201.png	\N	Aeonmed Bipap 1.png	image/png	1884384	2177	1276	50	50
120	\N	2026-04-21 08:30:07.319+00	2026-04-21 08:30:07.319+00	/api/media/file/Aeonmed%20Bipap.png	\N	Aeonmed Bipap.png	image/png	1883037	2221	1200	50	50
121	\N	2026-04-21 08:33:17.413+00	2026-04-21 08:33:17.413+00	/api/media/file/BiPAP-brochure-1.jpg	\N	BiPAP-brochure-1.jpg	image/jpeg	1033517	2207	1598	50	50
122	\N	2026-04-21 08:35:24.812+00	2026-04-21 08:35:24.812+00	/api/media/file/BiPAP-brochure-2.jpg	\N	BiPAP-brochure-2.jpg	image/jpeg	1033517	3575	2384	50	50
123	\N	2026-04-22 12:50:39.578+00	2026-04-22 12:50:39.577+00	/api/media/file/imgi_7_20201027124042_43551-1.png	\N	imgi_7_20201027124042_43551-1.png	image/png	277787	871	672	50	50
124	\N	2026-04-22 12:51:47.033+00	2026-04-22 12:51:47.032+00	/api/media/file/BiPAP-brochure-3.jpg	\N	BiPAP-brochure-3.jpg	image/jpeg	1033517	3575	2384	50	50
125	\N	2026-04-23 05:45:24.81+00	2026-04-23 05:45:24.81+00	/api/media/file/aeonmed-as100A-cpap-auto-3.png	\N	aeonmed-as100A-cpap-auto-3.png	image/png	350430	1050	700	50	50
126	\N	2026-04-23 05:48:07.162+00	2026-04-23 05:48:07.161+00	/api/media/file/AEONMED-AS100A-CPAP-1.png	\N	AEONMED-AS100A-CPAP-1.png	image/png	1623240	2784	1802	50	50
127	\N	2026-04-23 10:34:11.93+00	2026-04-23 10:34:11.929+00	/api/media/file/Aeonmed%20Bipap-1.png	\N	Aeonmed Bipap-1.png	image/png	1909136	2468	1675	50	50
119	\N	2026-04-23 10:34:50.103+00	2026-04-21 08:28:09.743+00	/api/media/file/Aeonmed%20Bipap%202.png	\N	Aeonmed Bipap 2.png	image/png	1277055	2427	1427	50	50
128	\N	2026-04-23 10:43:39.52+00	2026-04-23 10:43:39.52+00	/api/media/file/Luvar%20Cpap.png	\N	Luvar Cpap.png	image/png	632230	1477	910	50	50
130	\N	2026-04-23 11:04:12.943+00	2026-04-23 11:04:12.943+00	/api/media/file/Luvar%20BiPAP%202.png	\N	Luvar BiPAP 2.png	image/png	421913	1132	581	50	50
129	\N	2026-04-23 11:05:08.845+00	2026-04-23 11:02:20.68+00	/api/media/file/image%20(3).png	\N	image (3).png	image/png	91906	782	432	50	50
132	\N	2026-04-25 05:27:20.802+00	2026-04-25 05:27:20.802+00	/api/media/file/imgi_10_51c530c44ce224c82eacced3c70e17d8.png	\N	imgi_10_51c530c44ce224c82eacced3c70e17d8.png	image/png	168415	663	465	50	50
140	\N	2026-04-27 04:57:21.092+00	2026-04-27 04:57:21.092+00	/api/media/file/Designer%20(3).png	\N	Designer (3).png	image/png	1380025	1024	1024	50	50
141	\N	2026-04-27 04:57:50.273+00	2026-04-27 04:57:50.273+00	/api/media/file/Designer%20(3)-1.png	\N	Designer (3)-1.png	image/png	830800	873	589	50	50
142	\N	2026-04-27 10:07:03.901+00	2026-04-27 10:07:03.901+00	/api/media/file/0427.mp4	\N	0427.mp4	video/mp4	19392547	\N	\N	\N	\N
131	\N	2026-04-28 05:06:06.648+00	2026-04-25 05:12:59.072+00	/api/media/file/Luvar%20Cpap-1.png	\N	Luvar Cpap-1.png	image/png	820811	1384	722	50	50
143	\N	2026-04-28 06:13:32.312+00	2026-04-28 06:13:32.311+00	/api/media/file/Untitled%20design%208.png	\N	Untitled design 8.png	image/png	2298806	2048	2010	50	50
144	\N	2026-04-28 06:13:45.232+00	2026-04-28 06:13:45.232+00	/api/media/file/Untitled%20design%206.png	\N	Untitled design 6.png	image/png	2758128	2304	1289	50	50
146	\N	2026-04-28 06:14:22.881+00	2026-04-28 06:14:22.88+00	/api/media/file/Untitled%20design%204.png	\N	Untitled design 4.png	image/png	1881053	2016	2015	50	50
147	\N	2026-04-28 06:14:34.371+00	2026-04-28 06:14:34.371+00	/api/media/file/Untitled%20design%203.png	\N	Untitled design 3.png	image/png	3976679	2048	2047	50	50
148	\N	2026-04-28 06:14:46.102+00	2026-04-28 06:14:46.102+00	/api/media/file/Untitled%20design%202.png	\N	Untitled design 2.png	image/png	3430029	2048	2048	50	50
149	\N	2026-04-28 06:15:00.268+00	2026-04-28 06:15:00.268+00	/api/media/file/Untitled%20design%201.png	\N	Untitled design 1.png	image/png	1900157	2048	2048	50	50
150	\N	2026-04-28 06:15:13.094+00	2026-04-28 06:15:13.094+00	/api/media/file/Untitled%20design-1.png	\N	Untitled design-1.png	image/png	2005303	2048	2048	50	50
151	\N	2026-04-28 07:17:00.692+00	2026-04-28 07:17:00.692+00	/api/media/file/Fochef%20Cable.png	\N	Fochef Cable.png	image/png	2593083	2300	2300	50	50
152	\N	2026-04-28 07:22:50.563+00	2026-04-28 07:22:50.563+00	/api/media/file/Reusable%20Handpice%201%20Pin.png	\N	Reusable Handpice 1 Pin.png	image/png	1506805	2048	2048	50	50
153	\N	2026-04-28 07:25:08.684+00	2026-04-28 07:25:08.683+00	/api/media/file/Reusable%20Handpice%201%20Pin-1.png	\N	Reusable Handpice 1 Pin-1.png	image/png	1506805	2048	2048	50	50
154	\N	2026-04-28 07:27:07.887+00	2026-04-28 07:27:07.887+00	/api/media/file/Fochef%20Cable-1.png	\N	Fochef Cable-1.png	image/png	2593083	2300	2300	50	50
155	\N	2026-04-28 08:05:40.887+00	2026-04-28 08:05:40.887+00	/api/media/file/HFmed.png	\N	HFmed.png	image/png	2171757	2063	2063	50	50
156	\N	2026-04-28 08:12:19.277+00	2026-04-28 08:12:19.277+00	/api/media/file/Fochef%20Cable-2.png	\N	Fochef Cable-2.png	image/png	2283218	2044	2044	50	50
157	\N	2026-04-28 08:14:24.611+00	2026-04-28 08:14:24.611+00	/api/media/file/Reusable%20Handpice%201%20Pin-2.png	\N	Reusable Handpice 1 Pin-2.png	image/png	2712284	2661	2661	50	50
158	\N	2026-04-28 08:16:57.311+00	2026-04-28 08:16:57.311+00	/api/media/file/Reusable%20Handpice%203%20Pin.png	\N	Reusable Handpice 3 Pin.png	image/png	2157439	1974	1974	50	50
159	\N	2026-04-29 06:29:04.057+00	2026-04-29 06:29:04.057+00	/api/media/file/single%20ot.png	\N	single ot.png	image/png	442972	1006	936	50	50
160	\N	2026-04-29 06:30:59.696+00	2026-04-29 06:30:59.696+00	/api/media/file/Brochure%20OP830330-2024V1.png	\N	Brochure OP830330-2024V1.png	image/png	149619	800	518	50	50
161	\N	2026-04-29 06:32:47.824+00	2026-04-29 06:32:47.824+00	/api/media/file/OT%20Table%203008a.png	\N	OT Table 3008a.png	image/png	217686	800	580	50	50
162	\N	2026-04-29 06:34:45.031+00	2026-04-29 06:34:45.031+00	/api/media/file/OT%20Table%203008a-1.png	\N	OT Table 3008a-1.png	image/png	217686	800	580	50	50
163	\N	2026-04-29 06:35:21.055+00	2026-04-29 06:35:21.054+00	/api/media/file/ot%20table%20new.png	\N	ot table new.png	image/png	398804	1050	723	50	50
164	\N	2026-04-29 06:37:16.674+00	2026-04-29 06:37:16.674+00	/api/media/file/Untitled%20design-2.png	\N	Untitled design-2.png	image/png	307676	821	821	50	50
165	\N	2026-04-29 06:39:56.058+00	2026-04-29 06:39:56.058+00	/api/media/file/Brochure%20OP830330-2024V1-1.png	\N	Brochure OP830330-2024V1-1.png	image/png	149619	800	518	50	50
166	\N	2026-04-29 06:42:50.169+00	2026-04-29 06:42:50.169+00	/api/media/file/uftu.png	\N	uftu.png	image/png	1665852	1710	1709	50	50
167	\N	2026-04-29 06:45:31.165+00	2026-04-29 06:45:31.165+00	/api/media/file/jyhfj.png	\N	jyhfj.png	image/png	1106291	2048	1365	50	50
81	\N	2026-04-29 06:50:13.413+00	2026-04-20 10:55:13.134+00	/api/media/file/Zingling%20820-1.png	\N	Zingling 820-1.png	image/png	2946529	1500	1676	50	50
168	\N	2026-04-29 06:53:35.65+00	2026-04-29 06:53:35.65+00	/api/media/file/Zingling%20820%201.png	\N	Zingling 820 1.png	image/png	463275	768	513	50	50
169	\N	2026-04-29 06:54:11.26+00	2026-04-29 06:54:11.26+00	/api/media/file/Zingling%20820%201-1.png	\N	Zingling 820 1-1.png	image/png	463275	768	513	50	50
170	\N	2026-04-29 06:56:04.805+00	2026-04-29 06:56:04.805+00	/api/media/file/Zingling%20820%202.png	\N	Zingling 820 2.png	image/png	290833	768	513	50	50
171	\N	2026-04-29 07:06:08.602+00	2026-04-29 07:06:08.602+00	/api/media/file/Zingling%20850%201.png	\N	Zingling 850 1.png	image/png	438835	746	641	50	50
172	\N	2026-04-29 07:06:23.051+00	2026-04-29 07:06:23.051+00	/api/media/file/Zingling%20850%202.png	\N	Zingling 850 2.png	image/png	434608	734	656	50	50
173	\N	2026-04-29 07:06:36.889+00	2026-04-29 07:06:36.889+00	/api/media/file/Zingling%20850%203.png	\N	Zingling 850 3.png	image/png	265690	736	638	50	50
174	\N	2026-04-29 07:10:05.854+00	2026-04-29 07:10:05.854+00	/api/media/file/Zinling%20850%204.png	\N	Zinling 850 4.png	image/png	689958	768	1029	50	50
175	\N	2026-04-29 07:11:05.174+00	2026-04-29 07:11:05.174+00	/api/media/file/Zingling%20850-1.png	\N	Zingling 850-1.png	image/png	2807223	1500	1731	50	50
176	\N	2026-04-29 07:17:08.491+00	2026-04-29 07:17:08.491+00	/api/media/file/ESU%20400.png	\N	ESU 400.png	image/png	703290	1040	735	50	50
91	\N	2026-04-29 07:19:21.631+00	2026-04-20 11:37:38.817+00	/api/media/file/Soft%20Touch-1.png	\N	Soft Touch-1.png	image/png	560724	1023	1023	50	50
177	\N	2026-04-29 07:19:53.858+00	2026-04-29 07:19:53.858+00	/api/media/file/Soft%20Touch%202.png	\N	Soft Touch 2.png	image/png	703232	1040	1015	50	50
178	\N	2026-04-29 07:40:58.615+00	2026-04-29 07:40:58.614+00	/api/media/file/Infant%20Warmer.png	\N	Infant Warmer.png	image/png	1709656	2271	2366	50	50
179	\N	2026-04-29 07:48:07.925+00	2026-04-29 07:48:07.925+00	/api/media/file/imgi_3_1-250HQ54032Q4.png	\N	imgi_3_1-250HQ54032Q4.png	image/png	280752	1356	757	50	50
180	\N	2026-04-29 07:48:16.811+00	2026-04-29 07:48:16.81+00	/api/media/file/imgi_4_1-250HQ5360Vc.png	\N	imgi_4_1-250HQ5360Vc.png	image/png	235405	1355	732	50	50
181	\N	2026-04-29 08:01:17.322+00	2026-04-29 08:01:17.322+00	/api/media/file/Bn%20300.png	\N	Bn 300.png	image/png	93386	362	995	50	50
182	\N	2026-04-29 08:02:00.103+00	2026-04-29 08:02:00.103+00	/api/media/file/imgi_16_bn300-led-phototherapy-unit-277765_1b.png	\N	imgi_16_bn300-led-phototherapy-unit-277765_1b.png	image/png	217970	728	885	50	50
183	\N	2026-04-29 08:02:32.876+00	2026-04-29 08:02:32.875+00	/api/media/file/imgi_17_bn300-led-phototherapy-unit-277765_2b.png	\N	imgi_17_bn300-led-phototherapy-unit-277765_2b.png	image/png	334448	712	944	50	50
184	\N	2026-04-29 08:03:02.327+00	2026-04-29 08:03:02.327+00	/api/media/file/imgi_17_bn300-led-phototherapy-unit-277765_2b-1.png	\N	imgi_17_bn300-led-phototherapy-unit-277765_2b-1.png	image/png	115123	717	583	50	50
185	\N	2026-04-29 09:50:34.078+00	2026-04-29 09:50:34.078+00	/api/media/file/Surgical%20Diathermy.png	\N	Surgical Diathermy.png	image/png	14275153	4864	3090	50	50
186	\N	2026-04-29 09:57:50.148+00	2026-04-29 09:57:50.148+00	/api/media/file/BDSSSS.png	\N	BDSSSS.png	image/png	6194404	2480	3508	50	50
187	\N	2026-04-29 09:58:52.469+00	2026-04-29 09:58:52.469+00	/api/media/file/Anesthesia%20Machine%20BD%20SS.png	\N	Anesthesia Machine BD SS.png	image/png	6194404	2480	3508	50	50
188	\N	2026-04-29 09:59:42.887+00	2026-04-29 09:59:42.887+00	/api/media/file/Anesthesia%20Machine%20BD%20SS%201.png	\N	Anesthesia Machine BD SS 1.png	image/png	7485917	2069	4332	50	50
189	\N	2026-04-29 10:08:55.772+00	2026-04-29 10:08:55.771+00	/api/media/file/Anesthesia%20Machine%20BD.png	\N	Anesthesia Machine BD.png	image/png	9532850	2480	3508	50	50
190	\N	2026-04-29 10:34:19.399+00	2026-04-29 10:34:19.399+00	/api/media/file/Infusion%20Pump-2.png	\N	Infusion Pump-2.png	image/png	396563	573	515	50	50
191	\N	2026-04-29 10:50:10.787+00	2026-04-29 10:50:10.787+00	/api/media/file/Hayer%20Syringe%20Pump-3.png	\N	Hayer Syringe Pump-3.png	image/png	321370	843	572	50	50
192	\N	2026-04-29 11:02:16.949+00	2026-04-29 11:02:16.949+00	/api/media/file/5%20Funtion%20Hospital%20Bed.png	\N	5 Funtion Hospital Bed.png	image/png	5592924	3105	2174	50	50
193	\N	2026-04-29 11:32:51.475+00	2026-04-29 11:32:51.475+00	/api/media/file/2%20Funtion%20Hospital%20Bed.png	\N	2 Funtion Hospital Bed.png	image/png	3103126	2880	2046	50	50
194	\N	2026-04-29 11:33:02.318+00	2026-04-29 11:33:02.318+00	/api/media/file/2%20Funtion%20Hospital%20Bed%201.png	\N	2 Funtion Hospital Bed 1.png	image/png	4804460	3600	2558	50	50
195	\N	2026-04-29 11:57:08.612+00	2026-04-29 11:57:08.612+00	/api/media/file/HS40.png	\N	HS40.png	image/png	1785433	2200	2200	50	50
196	\N	2026-04-29 11:57:20.996+00	2026-04-29 11:57:20.996+00	/api/media/file/HS40%201.png	\N	HS40 1.png	image/png	2925302	3000	2250	50	50
197	\N	2026-04-30 05:35:58.84+00	2026-04-30 05:35:58.84+00	/api/media/file/Anesthesia%20Face%20Masks.png	\N	Anesthesia Face Masks.png	image/png	402917	770	770	50	50
198	\N	2026-04-30 05:36:08.653+00	2026-04-30 05:36:08.653+00	/api/media/file/Anesthesia%20Face%20Masks%201.png	\N	Anesthesia Face Masks 1.png	image/png	2197298	2048	1364	50	50
199	\N	2026-04-30 05:36:18.237+00	2026-04-30 05:36:18.237+00	/api/media/file/Anesthesia%20Face%20Masks%202.png	\N	Anesthesia Face Masks 2.png	image/png	345404	600	600	50	50
200	\N	2026-04-30 05:42:52.569+00	2026-04-30 05:42:52.569+00	/api/media/file/Anesthesia%20Face%20Masks.jpg	\N	Anesthesia Face Masks.jpg	image/jpeg	42992	800	800	50	50
201	\N	2026-04-30 06:05:07.328+00	2026-04-30 06:05:07.328+00	/api/media/file/Electrosurgical%20Grounding%20Pad.png	\N	Electrosurgical Grounding Pad.png	image/png	2078316	2019	2019	50	50
202	\N	2026-04-30 06:05:18.624+00	2026-04-30 06:05:18.624+00	/api/media/file/Electrosurgical%20Grounding%20Pad%202.png	\N	Electrosurgical Grounding Pad 2.png	image/png	1307006	1469	1469	50	50
203	\N	2026-04-30 06:05:31.639+00	2026-04-30 06:05:31.639+00	/api/media/file/Electrosurgical%20Grounding%20Pad%204.png	\N	Electrosurgical Grounding Pad 4.png	image/png	261845	596	596	50	50
204	\N	2026-04-30 06:05:42.761+00	2026-04-30 06:05:42.761+00	/api/media/file/Electrosurgical%20Grounding%20Pad%203.png	\N	Electrosurgical Grounding Pad 3.png	image/png	1242747	1500	1500	50	50
205	\N	2026-04-30 06:21:21.748+00	2026-04-30 06:21:21.748+00	/api/media/file/CPAP%20Machine.png	\N	CPAP Machine.png	image/png	1541145	2020	1680	50	50
206	\N	2026-04-30 06:21:29.886+00	2026-04-30 06:21:29.886+00	/api/media/file/CPAP%20Machine%202.png	\N	CPAP Machine 2.png	image/png	1393143	1680	1680	50	50
207	\N	2026-04-30 06:21:38.609+00	2026-04-30 06:21:38.609+00	/api/media/file/CPAP%20Machine%203.png	\N	CPAP Machine 3.png	image/png	2067952	2000	1680	50	50
208	\N	2026-04-30 06:21:48.669+00	2026-04-30 06:21:48.669+00	/api/media/file/CPAP%20Machine%204.png	\N	CPAP Machine 4.png	image/png	2343435	2192	1995	50	50
209	\N	2026-04-30 06:21:58.216+00	2026-04-30 06:21:58.216+00	/api/media/file/CPAP%20Machine%205.png	\N	CPAP Machine 5.png	image/png	1094468	2100	2100	50	50
210	\N	2026-04-30 06:22:09.271+00	2026-04-30 06:22:09.271+00	/api/media/file/CPAP%20Machine%206.png	\N	CPAP Machine 6.png	image/png	1229584	1528	1528	50	50
212	\N	2026-04-30 06:53:14.56+00	2026-04-30 06:53:14.56+00	/api/media/file/Breathing%20Bag%201.png	\N	Breathing Bag 1.png	image/png	1849662	1600	1600	50	50
213	\N	2026-04-30 06:55:55.199+00	2026-04-30 06:55:55.199+00	/api/media/file/Breathing%20Bag-1.png	\N	Breathing Bag-1.png	image/png	1489774	1600	1600	50	50
214	\N	2026-04-30 06:56:04.235+00	2026-04-30 06:56:04.235+00	/api/media/file/Breathing%20Bag%201-1.png	\N	Breathing Bag 1-1.png	image/png	1849662	1600	1600	50	50
215	\N	2026-05-02 05:42:48.224+00	2026-05-02 05:42:48.224+00	/api/media/file/ECG%20Cable.png	\N	ECG Cable.png	image/png	3680594	2381	1395	50	50
216	\N	2026-05-02 05:57:00.512+00	2026-05-02 05:57:00.512+00	/api/media/file/ECG%20Limb%20Clamp.png	\N	ECG Limb Clamp.png	image/png	1313075	1344	1322	50	50
217	\N	2026-05-02 05:57:12.07+00	2026-05-02 05:57:12.07+00	/api/media/file/ECG%20Limb%20Clamp%201.png	\N	ECG Limb Clamp 1.png	image/png	1548314	1653	1653	50	50
218	\N	2026-05-02 06:16:56.95+00	2026-05-02 06:16:56.95+00	/api/media/file/Suction-Chest.png	\N	Suction-Chest.png	image/png	4060803	2250	2250	50	50
219	\N	2026-05-03 06:22:04.834+00	2026-05-03 06:22:04.834+00	/api/media/file/BP%20Cuff.png	\N	BP Cuff.png	image/png	775371	1200	1200	50	50
220	\N	2026-05-03 06:23:09.847+00	2026-05-03 06:23:09.847+00	/api/media/file/BP%20Cuff%202.png	\N	BP Cuff 2.png	image/png	1666672	1449	1090	50	50
221	\N	2026-05-03 06:23:22.282+00	2026-05-03 06:23:22.282+00	/api/media/file/BP%20Cuff%203.png	\N	BP Cuff 3.png	image/png	880800	1600	1200	50	50
222	\N	2026-05-03 06:23:31.822+00	2026-05-03 06:23:31.822+00	/api/media/file/BP%20Cuff%204.png	\N	BP Cuff 4.png	image/png	2289798	1081	1548	50	50
223	\N	2026-05-03 08:51:54.643+00	2026-05-03 08:51:54.643+00	/api/media/file/Breathing%20Circuit.png	\N	Breathing Circuit.png	image/png	521814	1462	1494	50	50
224	\N	2026-05-03 09:30:03.07+00	2026-05-03 09:30:03.07+00	/api/media/file/imgi_75_Factory-Medical-Anesthesia-Corrugated-Breathing-Circuit-Ventilator.png	\N	imgi_75_Factory-Medical-Anesthesia-Corrugated-Breathing-Circuit-Ventilator.png	image/png	453053	802	802	50	50
225	\N	2026-05-04 06:03:23.953+00	2026-05-04 06:03:23.953+00	/api/media/file/Ambu%20Bag.png	\N	Ambu Bag.png	image/png	1485221	2000	2000	50	50
226	\N	2026-05-05 07:05:25.677+00	2026-05-05 07:05:25.677+00	/api/media/file/Surgical%20Diathermy%205.png	\N	Surgical Diathermy 5.png	image/png	4069359	3060	1774	50	50
227	\N	2026-05-05 07:05:44.108+00	2026-05-05 07:05:44.108+00	/api/media/file/Surgical%20Diathermy-1.png	\N	Surgical Diathermy-1.png	image/png	14275153	4864	3090	50	50
228	\N	2026-05-05 07:06:23.332+00	2026-05-05 07:06:23.332+00	/api/media/file/Surgical%20Diathermy%203.png	\N	Surgical Diathermy 3.png	image/png	3543774	3325	2111	50	50
229	\N	2026-05-05 07:06:42.401+00	2026-05-05 07:06:42.401+00	/api/media/file/Surgical%20Diathermy%204.png	\N	Surgical Diathermy 4.png	image/png	2936173	2738	2738	50	50
230	\N	2026-05-05 07:06:57.631+00	2026-05-05 07:06:57.631+00	/api/media/file/Surgical%20Diathermy%202.png	\N	Surgical Diathermy 2.png	image/png	3737809	2941	2273	50	50
231	\N	2026-05-05 07:07:14.588+00	2026-05-05 07:07:14.588+00	/api/media/file/Surgical%20Diathermy%206.png	\N	Surgical Diathermy 6.png	image/png	2698030	2328	1905	50	50
232	\N	2026-05-06 06:46:00.004+00	2026-05-06 06:46:00.004+00	/api/media/file/imgi_66_S6b6363a4b71c4fafa34dca1d811f7b3ew.png	\N	imgi_66_S6b6363a4b71c4fafa34dca1d811f7b3ew.png	image/png	2163765	1500	1500	50	50
233	\N	2026-05-06 06:46:51.554+00	2026-05-06 06:46:51.554+00	/api/media/file/imgi_67_Sc680e2cd01c04e8d9d7307ccf312df453.png	\N	imgi_67_Sc680e2cd01c04e8d9d7307ccf312df453.png	image/png	1585733	1500	1500	50	50
234	\N	2026-05-06 06:47:00.561+00	2026-05-06 06:47:00.561+00	/api/media/file/imgi_65_S0f46ad3494af4330a6626dfce5de73feQ.png	\N	imgi_65_S0f46ad3494af4330a6626dfce5de73feQ.png	image/png	1879119	1500	1500	50	50
235	\N	2026-05-06 06:47:22.466+00	2026-05-06 06:47:22.466+00	/api/media/file/Breast%20Pump.png	\N	Breast Pump.png	image/png	1585733	1500	1500	50	50
236	\N	2026-05-06 06:47:35.602+00	2026-05-06 06:47:35.602+00	/api/media/file/Breast%20Pump%201.png	\N	Breast Pump 1.png	image/png	1879119	1500	1500	50	50
237	\N	2026-05-06 06:47:52.021+00	2026-05-06 06:47:52.021+00	/api/media/file/Breast%20Pump%202.png	\N	Breast Pump 2.png	image/png	1573781	1500	1500	50	50
238	\N	2026-05-06 06:48:10.906+00	2026-05-06 06:48:10.906+00	/api/media/file/Breast%20Pump%203.png	\N	Breast Pump 3.png	image/png	2007420	1500	1500	50	50
239	\N	2026-05-06 06:48:27.41+00	2026-05-06 06:48:27.41+00	/api/media/file/Breast%20Pump%204.png	\N	Breast Pump 4.png	image/png	2364446	1500	1500	50	50
240	\N	2026-05-06 06:48:48.531+00	2026-05-06 06:48:48.531+00	/api/media/file/Breast%20Pump%205.png	\N	Breast Pump 5.png	image/png	1924738	1500	1500	50	50
241	\N	2026-05-06 06:49:02.869+00	2026-05-06 06:49:02.869+00	/api/media/file/Breast%20Pump%206.png	\N	Breast Pump 6.png	image/png	2082624	1500	1500	50	50
242	\N	2026-05-06 06:49:21.736+00	2026-05-06 06:49:21.736+00	/api/media/file/Breast%20Pump%207.png	\N	Breast Pump 7.png	image/png	2163765	1500	1500	50	50
243	\N	2026-05-06 06:49:56.093+00	2026-05-06 06:49:56.093+00	/api/media/file/Breast%20Pump%208.png	\N	Breast Pump 8.png	image/png	1389920	1500	1500	50	50
244	\N	2026-05-06 07:20:26.056+00	2026-05-06 07:18:23.993+00	/api/media/file/Breast%20Pump%2001.png	\N	Breast Pump 01.png	image/png	1659405	1500	1500	50	50
245	\N	2026-05-06 07:25:40.289+00	2026-05-06 07:25:40.289+00	/api/media/file/Breast%20Pump.mp4	\N	Breast Pump.mp4	video/mp4	4432748	\N	\N	\N	\N
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, order_number, customer_first_name, customer_last_name, customer_email, customer_phone, customer_address, customer_city, customer_name, total_amount, payment_method, payment_status, status, invoice_link, payment_evidence_id, updated_at, created_at) FROM stdin;
14	ORD-20260427-8513	Abu	Abid	nirobislam36@gmail.com	01301844100	14/2 Topkhana Road Ansari Bhaban (Ground floor),Bangladesh Medical Association Bhaban West Side ,Polton Dhaka-1000\nOpposite Side Of Press Club	Dhaka, Bangladesh	Abu Abid	0	sslcommerz	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260427-8513	\N	2026-04-27 10:27:09.929+00	2026-04-27 10:27:09.929+00
15	ORD-20260428-8466	Rokibul Islam	Nirob	nirobislam36@gmail.com	01675292991	Rayerbazar 	Dhaka	Rokibul Islam Nirob	2500	cod	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260428-8466	\N	2026-04-28 14:55:28.903+00	2026-04-28 14:55:28.902+00
16	ORD-20260429-6230	ROKIBUL	ISLAM	heal.tech36@gmail.com	01898876703	14/2 Ansari Bhaban ( Ground Floor ), Topkhana Road, Dhaka\n14/2	Dhaka, Bangladesh	ROKIBUL ISLAM	1500	bkash	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260429-6230	\N	2026-04-29 10:24:14.117+00	2026-04-29 10:24:14.117+00
\.


--
-- Data for Name: orders_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_items (_order, _parent_id, id, product_id, quantity, price_at_purchase) FROM stdin;
1	14	69ef39fdedeee059cf529854	10	1	0
1	15	69f0ca608470765aecfe03ab	7	1	2500
1	16	69f1dc4e8470765aecfe03ac	9	1	1500
\.


--
-- Data for Name: partner_logos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partner_logos (id, name, logo_id, website, sort_order, updated_at, created_at) FROM stdin;
1	Perlong Medical	25	\N	0	2026-04-19 12:14:39.839+00	2026-04-19 12:14:39.839+00
2	Aeonmed	95	\N	0	2026-04-21 05:20:18.788+00	2026-04-21 05:20:18.788+00
3	HEYER	96	\N	0	2026-04-21 05:20:57.14+00	2026-04-21 05:20:57.14+00
4	Nanjing Puao Medical Equipment Co.Ltd	97	\N	0	2026-04-21 05:22:52.639+00	2026-04-21 05:22:52.639+00
5	ZERONE	98	\N	0	2026-04-21 05:24:05.543+00	2026-04-21 05:24:05.543+00
6	TRIUP	99	\N	0	2026-04-21 05:24:44.727+00	2026-04-21 05:24:44.727+00
8	Ucare	141	\N	0	2026-04-27 05:53:59.347+00	2026-04-27 05:53:59.347+00
\.


--
-- Data for Name: payload_kv; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_kv (id, key, data) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, brands_id, categories_id, certifications_id, products_id, legal_pages_id, testimonials_id, faqs_id, inquiries_id, media_id, partner_logos_id, orders_id, client_logos_id, gallery_posts_id, gallery_videos_id) FROM stdin;
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	dev	-1	2026-05-21 09:22:44.65+00	2026-04-09 04:16:14.443+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
18	collection-products-21	{"fields": {"specGroups.0.rows": {"collapsed": ["69e4a0f89227f07265a2b781", "69e4a1089227f07265a2b782", "69e4a11c9227f07265a2b783", "69e4a12e9227f07265a2b784", "69e4a1449227f07265a2b785", "69e4a14d9227f07265a2b786", "69e4a1579227f07265a2b787", "69e4a1609227f07265a2b788"]}}}	2026-04-19 09:33:34.67+00	2026-04-19 09:33:34.672+00
3	collection-certifications	{}	2026-04-09 04:20:38.332+00	2026-04-09 04:20:38.332+00
5	collection-users	{}	2026-04-09 04:21:06.379+00	2026-04-09 04:21:06.379+00
6	collection-legalPages	{}	2026-04-09 04:21:07.439+00	2026-04-09 04:21:07.439+00
10	collection-testimonials	{}	2026-04-09 04:21:11.46+00	2026-04-09 04:21:11.46+00
20	collection-products-19	{"fields": {"specGroups": {"collapsed": ["69e4c0096a8ee835e89d81de", "69e4c19a6a8ee835e89d81e6", "69e4c4e06a8ee835e89d81ec"]}, "specGroups.0.rows": {"collapsed": ["69e4c00d6a8ee835e89d81df", "69e4c0776a8ee835e89d81e0", "69e4c1276a8ee835e89d81e1", "69e4c1376a8ee835e89d81e2", "69e4c1466a8ee835e89d81e3", "69e4c1546a8ee835e89d81e4", "69e4c1616a8ee835e89d81e5"]}, "specGroups.1.rows": {"collapsed": ["69e4c1a46a8ee835e89d81e7", "69e4c1b36a8ee835e89d81e8", "69e4c1c26a8ee835e89d81e9", "69e4c1d06a8ee835e89d81ea", "69e4c1e16a8ee835e89d81eb"]}, "specGroups.2.rows": {"collapsed": ["69e4c4e46a8ee835e89d81ed", "69e4c4f36a8ee835e89d81ee", "69e4c5016a8ee835e89d81ef"]}}}	2026-04-19 12:05:45.631+00	2026-04-19 11:44:16.162+00
9	collection-media	{"limit": 100}	2026-04-19 12:12:20.685+00	2026-04-09 04:21:10.922+00
21	collection-products-18	{"fields": {"specGroups": {"collapsed": ["69e6041a1d522a8c2a7de9cf", "69e604b71d522a8c2a7de9da"]}, "specGroups.0.rows": {"collapsed": ["69e604261d522a8c2a7de9d0", "69e604341d522a8c2a7de9d1", "69e604421d522a8c2a7de9d2", "69e604531d522a8c2a7de9d3", "69e604611d522a8c2a7de9d4", "69e604711d522a8c2a7de9d5", "69e604811d522a8c2a7de9d6", "69e604901d522a8c2a7de9d7", "69e604a01d522a8c2a7de9d8"]}, "specGroups.1.rows": {"collapsed": ["69e604c01d522a8c2a7de9db", "69e604d01d522a8c2a7de9dc", "69e604de1d522a8c2a7de9dd", "69e604ed1d522a8c2a7de9de"]}}}	2026-04-20 10:50:48.726+00	2026-04-20 10:50:42.143+00
8	collection-inquiries	{"limit": 10}	2026-04-11 07:33:37.147+00	2026-04-09 04:21:08.4+00
23	collection-products-16	{"fields": {"specGroups": {"collapsed": ["69e6104e1d522a8c2a7dea06"]}}}	2026-04-20 11:44:53.258+00	2026-04-20 11:44:53.259+00
25	collection-products-14	{"fields": {"specGroups": {"collapsed": ["69e733cd3220efc4a063a40e"]}, "applications": {"collapsed": ["69e7352ea1dc14718977d686", "69e73539a1dc14718977d687", "69e73541a1dc14718977d688", "69e7354aa1dc14718977d689"]}}}	2026-04-21 08:30:31.718+00	2026-04-21 08:24:51.751+00
7	collection-faqs	{"limit": 10}	2026-04-14 10:18:32.518+00	2026-04-09 04:21:07.997+00
26	collection-client-logos	{}	2026-04-22 12:46:48.862+00	2026-04-22 12:46:48.861+00
24	collection-products-15	{"fields": {"gallery": {"collapsed": []}, "specGroups": {"collapsed": ["69e72f2f3220efc4a063a405"]}, "applications": {"collapsed": ["69e72c423220efc4a063a3fc", "69e72c453220efc4a063a3fd", "69e72c4d3220efc4a063a3fe", "69e72c563220efc4a063a3ff"]}}}	2026-04-22 12:47:52.346+00	2026-04-21 08:02:18.307+00
27	collection-products-13	{"fields": {"specGroups": {"collapsed": ["69e9f70d57a33abd2212b677"]}, "applications": {"collapsed": ["69e9f8ee57a33abd2212b67d", "69e9f8f257a33abd2212b67e", "69e9f8f957a33abd2212b67f"]}}}	2026-04-23 10:48:36.164+00	2026-04-23 10:41:38.659+00
28	collection-products-12	{"fields": {"applications": {"collapsed": ["69e9fcf757a33abd2212b680", "69e9fcfa57a33abd2212b681", "69e9fd0057a33abd2212b682", "69e9fd0857a33abd2212b683"]}, "specGroups.0.rows": {"collapsed": ["69e9fd5457a33abd2212b686", "69e9fd6157a33abd2212b687", "69e9fd7057a33abd2212b688", "69e9fd7c57a33abd2212b689", "69e9fd8957a33abd2212b68a", "69e9fd9857a33abd2212b68b", "69e9fda357a33abd2212b68c", "69e9fdb057a33abd2212b68d", "69e9fdbb57a33abd2212b68e"]}}}	2026-04-23 11:09:17.059+00	2026-04-23 11:06:11.084+00
1	collection-brands	{"sort": "name", "limit": 50}	2026-04-15 07:09:00.432+00	2026-04-09 04:20:36.711+00
29	collection-products-10	{"fields": {"specGroups": {"collapsed": ["69eef15c5ce4f93fc179fdc2"]}}}	2026-04-27 05:43:00.894+00	2026-04-27 05:19:38.509+00
12	collection-orders	{"limit": 10}	2026-04-27 05:52:29.651+00	2026-04-14 10:18:23.414+00
2	collection-categories	{"sort": "title", "limit": 25}	2026-04-15 10:25:58.349+00	2026-04-09 04:20:37.616+00
16	collection-products-31	{"fields": {"specGroups": {"collapsed": ["69e479dd34931c3b26d3a31f"]}}}	2026-04-19 08:23:04.427+00	2026-04-19 08:23:04.429+00
14	collection-products-25	{"fields": {"specGroups": {"collapsed": ["69e491749227f07265a2b764"]}, "keyHighlights": {"collapsed": ["69df2e50b960ec5fbf6307a0"]}, "specGroups.0.rows": {"collapsed": ["69e491c79227f07265a2b765", "69e4923f9227f07265a2b766", "69e492619227f07265a2b767", "69e492729227f07265a2b768", "69e4929a9227f07265a2b769", "69e493309227f07265a2b76a", "69e4933b9227f07265a2b76b", "69e4934f9227f07265a2b76c", "69e493a79227f07265a2b76d"]}}}	2026-04-19 08:35:57.923+00	2026-04-15 06:21:19.073+00
17	collection-products-20	{"fields": {"specGroups": {"collapsed": []}, "applications": {"collapsed": ["69e49f859227f07265a2b770", "69e49fa69227f07265a2b771", "69e49fa99227f07265a2b772", "69e49fb99227f07265a2b773", "69e49fc39227f07265a2b774"]}, "specGroups.0.rows": {"collapsed": ["69e49fe19227f07265a2b776", "69e49ff89227f07265a2b777", "69e4a00f9227f07265a2b778", "69e4a0219227f07265a2b779", "69e4a04c9227f07265a2b77a", "69e4a05c9227f07265a2b77b", "69e4a0699227f07265a2b77c", "69e4a0759227f07265a2b77d", "69e4a0809227f07265a2b77e", "69e4a08a9227f07265a2b77f"]}}}	2026-04-19 09:30:04.296+00	2026-04-19 09:26:39.178+00
22	collection-products-17	{"fields": {"specGroups": {"collapsed": ["69e609a11d522a8c2a7de9ea", "69e60a4b1d522a8c2a7de9f4"]}, "applications": {"collapsed": ["69e60b601d522a8c2a7de9f9", "69e60bae1d522a8c2a7de9fa", "69e60bb81d522a8c2a7de9fb", "69e60bc01d522a8c2a7de9fc", "69e60bc81d522a8c2a7de9fd"]}}}	2026-04-29 07:10:15.921+00	2026-04-20 11:14:31.776+00
4	collection-products	{"limit": 50, "editViewType": "default"}	2026-04-29 10:15:12.17+00	2026-04-09 04:20:39.04+00
13	collection-partner-logos	{"limit": 10}	2026-04-30 08:16:52.037+00	2026-04-15 06:02:14.066+00
11	nav	{"open": true, "groups": {"Globals": {"open": true}}}	2026-04-30 08:18:29.038+00	2026-04-11 06:40:57.781+00
30	collection-products-9	{"fields": {"specGroups": {"collapsed": ["69f05f25b0a65f057ad2fa9b"]}, "applications": {"collapsed": ["69f05ef0b0a65f057ad2fa97", "69f05effb0a65f057ad2fa98", "69f05f06b0a65f057ad2fa99", "69f05f13b0a65f057ad2fa9a"]}}}	2026-04-28 07:19:32.041+00	2026-04-28 07:17:44.853+00
31	collection-products-8	{"fields": {"specGroups": {"collapsed": ["69f06057b0a65f057ad2faa2"]}, "applications": {"collapsed": ["69f060d9b0a65f057ad2faaa", "69f060e7b0a65f057ad2faab", "69f060eeb0a65f057ad2faac", "69f060f4b0a65f057ad2faad", "69f060f9b0a65f057ad2faae", "69f060feb0a65f057ad2faaf"]}}}	2026-04-28 07:25:57.596+00	2026-04-28 07:24:55.507+00
32	collection-products-7	{"fields": {"specGroups": {"collapsed": ["69f074b7c55743eb5a765a41"]}}}	2026-04-28 08:51:52.729+00	2026-04-28 08:51:52.73+00
19	collection-products-22	{"fields": {"gallery": {"collapsed": []}, "specGroups.0.rows": {"collapsed": ["69e4a1d89227f07265a2b78a", "69e4a1f89227f07265a2b78b", "69e4a20a9227f07265a2b78c", "69e4a2179227f07265a2b78d", "69e4a2269227f07265a2b78e", "69e4a2359227f07265a2b78f", "69e4a2439227f07265a2b790", "69e4a2519227f07265a2b791", "69e4a2629227f07265a2b792", "69e4a2729227f07265a2b793", "69e4a2819227f07265a2b794", "69e4a28f9227f07265a2b795", "69e4a2a59227f07265a2b796", "69e4a2b29227f07265a2b797", "69e4a2c09227f07265a2b798", "69e4a2cf9227f07265a2b799", "69e4a3db9227f07265a2b79c", "69e4a3ef9227f07265a2b79d", "69e4a4059227f07265a2b79e", "69e4a46b9227f07265a2b79f"]}}}	2026-04-29 06:31:07.843+00	2026-04-19 09:34:44.388+00
33	collection-products-6	{"fields": {"specGroups": {"collapsed": ["69f1b62eaa062f45ef636bf7"]}}}	2026-04-29 07:45:27.304+00	2026-04-29 07:45:27.306+00
34	collection-products-5	{"fields": {"gallery": {"collapsed": ["69f1baceaa062f45ef636c04", "69f1baf9aa062f45ef636c05", "69f1bb19aa062f45ef636c06"]}, "specGroups": {"collapsed": ["69f1bb86aa062f45ef636c07", "69f1bc53aa062f45ef636c0f"]}}}	2026-04-29 08:09:01.766+00	2026-04-29 08:04:02.888+00
35	collection-products-4	{"fields": {"specGroups": {"collapsed": ["69f1d6beaa062f45ef636c19"]}, "applications": {"collapsed": ["69f1d739aa062f45ef636c21", "69f1d78daa062f45ef636c23", "69f1d79caa062f45ef636c24", "69f1d7a6aa062f45ef636c25"]}}}	2026-04-29 10:04:55.925+00	2026-04-29 10:02:31.654+00
36	collection-products-3	{"fields": {"specGroups": {"collapsed": ["69f1d979aa062f45ef636c26"]}}}	2026-04-29 10:14:03.362+00	2026-04-29 10:14:03.364+00
37	collection-products-1	{"fields": {"specGroups": {"collapsed": ["69d72ad886da9424464137fb"]}}}	2026-04-29 10:50:19.13+00	2026-04-29 10:50:19.131+00
38	collection-products-40	{"fields": {"specGroups": {"collapsed": ["69f58f7f4b30a8ecdb2fbd23"]}}}	2026-05-02 05:48:13.67+00	2026-05-02 05:48:13.671+00
39	collection-products-42	{"fields": {"specGroups.0.rows": {"collapsed": ["69f5970d4b30a8ecdb2fbd38"]}}}	2026-05-02 06:17:59.232+00	2026-05-02 06:17:59.233+00
40	collection-gallery-videos	{"editViewType": "default"}	2026-05-20 10:28:23.641+00	2026-05-20 10:28:20.252+00
41	global-siteSettings	{"editViewType": "default"}	2026-05-21 09:26:25.418+00	2026-05-21 09:25:55.315+00
42	collection-gallery-posts	{}	2026-05-21 09:26:27.683+00	2026-05-21 09:26:27.683+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
70	\N	18	user	1
3	\N	3	user	1
5	\N	5	user	1
6	\N	6	user	1
10	\N	10	user	1
80	\N	20	user	1
82	\N	9	user	1
85	\N	21	user	1
22	\N	8	user	1
87	\N	23	user	1
94	\N	25	user	1
34	\N	7	user	1
97	\N	26	user	1
101	\N	24	user	1
105	\N	27	user	1
107	\N	28	user	1
49	\N	1	user	1
111	\N	29	user	1
112	\N	12	user	1
58	\N	2	user	1
60	\N	16	user	1
64	\N	14	user	1
122	\N	30	user	1
69	\N	17	user	1
124	\N	31	user	1
125	\N	32	user	1
127	\N	19	user	1
130	\N	22	user	1
131	\N	33	user	1
134	\N	34	user	1
136	\N	35	user	1
137	\N	36	user	1
138	\N	4	user	1
139	\N	37	user	1
142	\N	13	user	1
143	\N	11	user	1
144	\N	38	user	1
145	\N	39	user	1
147	\N	40	user	1
148	\N	41	user	1
149	\N	42	user	1
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) FROM stdin;
10	Compressor Nebulizer	Compressor-Nebulizer	f	Compressor-Nebulizer	1	31	\N	Medical Compressor Nebulizer	The Ucare HY-Q01 is a high-performance medical compressor nebulizer designed for the efficient treatment of respiratory conditions such as asthma, COPD, and bronchitis. By utilizing advanced aerosol technology, it ensures that liquid medication is converted into an ultra-fine mist for direct delivery to the lungs.Top Reasons to Choose UcareOptimal Absorption: Delivers a small particle size ($1\\mu m \\sim 5\\mu m$) to ensure medication reaches deep into the respiratory tract for maximum efficacy.Built to Last: Features pure copper motor parts, ensuring high durability and a longer lifespan compared to standard models.User-Friendly Design: Simple one-button operation makes it accessible for patients of all ages, including children and the elderly.Quiet Operation: Engineered for low noise, providing a comfortable and stress-free environment during treatment sessions.Safety First: Designed as a safe and durable medical-grade device with a stable output.	The Ucare HY-Q01 is a high-performance medical compressor nebulizer designed for the efficient treatment of respiratory conditions such as asthma, COPD, and bronchitis. By utilizing advanced aerosol technology, it ensures that liquid medication is converted into an ultra-fine mist for direct delivery to the lungs.Top Reasons to Choose UcareOptimal Absorption: Delivers a small particle size ($1\\mu m \\sim 5\\mu m$) to ensure medication reaches deep into the respiratory tract for maximum efficacy.Built to Last: Features pure copper motor parts, ensuring high durability and a longer lifespan compared to standard models.User-Friendly Design: Simple one-button operation makes it accessible for patients of all ages, including children and the elderly.Quiet Operation: Engineered for low noise, providing a comfortable and stress-free environment during treatment sessions.Safety First: Designed as a safe and durable medical-grade device with a stable output.	\N	143	China	Medical Device Registration (NMPA): The HY-Q01 is a registered medical device with the certificate number τ▓ñµó░µ│¿σçå20222082075. This confirms the device has been evaluated for safety and performance according to national medical standards.\n\nCertificate for Exportation of Medical Products: The device is authorized for international sale under Certificate No. τ▓ñΘúƒΦì»τ¢æµó░σç║20241096 σÅ╖. This certificate is issued by the People's Republic of China, verifying that the product is permitted to be manufactured and sold both domestically and exported globally.\n\nManufacturing License: The manufacturer holds a valid Medical Device Manufacturing License (License No. τ▓ñΘúƒΦì»τ¢æµó░τöƒΣ║ºΦ«╕20193399 σÅ╖).\n\nISO 13485 Compliance: As a medical device produced for the international market, the manufacturing process follows ISO 13485:2016 standards, which is the global gold standard for Medical Device Quality Management Systems (QMS).	published	Healing Technology ΓÇö Compressor Nebulizer	The Ucare HY-Q01 is a high-performance medical compressor nebulizer designed for the efficient treatment of respiratory conditions such as asthma, COPD, and bronchitis. By utilizing advanced aerosol technology, it ensures that liquid medication is converted into an ultra-fine mist for direct delivery to the lungs.Top Reasons to Choose UcareOptimal Absorption: Delivers a small particle size ($1\\mu m \\sim 5\\mu m$) to ensure medication reaches deep into the respiratory tract for maximum efficacy.Built to Last: Features pure copper motor parts, ensuring high durability and a longer lifespan compared to standard models.User-Friendly Design: Simple one-button operation makes it accessible for patients of all ages, including children and the elderly.Quiet Operation: Engineered for low noise, providing a comfortable and stress-free environment during treatment sessions.Safety First: Designed as a safe and durable medical-grade device with a stable output.	\N	2026-04-28 06:15:15.674+00	2026-04-09 04:28:09.165+00	\N	\N
8	Premium Reusable Monopolar Electrosurgical Handpiece (Single-Pin)	Electrosurgical-Handpiece	f	Electrosurgical-Handpiece	9	9	\N	Premium Reusable Monopolar Electrosurgical Handpiece (Single-Pin)	Premium Reusable Monopolar Electrosurgical Handpiece (Single-Pin)\nElevate your surgical efficiency with our Professional Reusable Monopolar Handpiece. This high-performance electrosurgical pencil is designed for precision cutting and coagulation in a variety of surgical disciplines. Built for durability and repeated use, it offers a cost-effective and environmentally friendly alternative to disposable options without compromising on safety or performance.\n\nProduct Highlights\nPrecision Control: Ergonomically designed lightweight handle provides superior grip and comfort, reducing hand fatigue during long procedures.\n\nSingle-Pin Universal Connector: Features a standard 8mm (approx.) single-pin banana plug, ensuring compatibility with a wide range of Monopolar Electrosurgical Units (ESUs).\n\nMedical-Grade Insulation: The handpiece and cable are encased in high-quality, heat-resistant silicone insulation, providing maximum protection against accidental burns and current leakage.\n\nAutoclavable Design: Fully reusable and engineered to withstand standard steam sterilization cycles, ensuring a long clinical life and excellent ROI.\n\nTangle-Free Cable: Includes a high-flexibility, 3-meter cable with an integrated silicone management strap for easy storage and organized setup in the OR.	Premium Reusable Monopolar Electrosurgical Handpiece (Single-Pin)\nElevate your surgical efficiency with our Professional Reusable Monopolar Handpiece. This high-performance electrosurgical pencil is designed for precision cutting and coagulation in a variety of surgical disciplines. Built for durability and repeated use, it offers a cost-effective and environmentally friendly alternative to disposable options without compromising on safety or performance.	\N	157	China	\N	published	Healing Technology ΓÇö Premium Reusable Monopolar Electrosurgical Handpiece (Single-Pin)	Premium Reusable Monopolar Electrosurgical Handpiece (Single-Pin)\nElevate your surgical efficiency with our Professional Reusable Monopolar Handpiece. This high-performance electrosurgical pencil is designed for precision cutting and coagulation in a variety of surgical disciplines. Built for durability and repeated use, it offers a cost-effective and environmentally friendly alternative to disposable options without compromising on safety or performance.	157	2026-04-28 08:14:37.477+00	2026-04-09 04:28:09.079+00	2000	\N
17	JINLING-850 Advance ICU Anesthesia Machine With Ventilator	JINLING-850Advance	f	JINLING-850Advance	7	10	\N	JINLING-850 Advance ICU Anesthesia Machine With Ventilator	JINLING-850 Advance Anesthesia Machine\nProduct Overview\nThe JINLING-850 Anesthesia Machine is a state-of-the-art, pneumatically driven, and electronically controlled workstation engineered for precision and reliability in modern operating rooms and intensive care units. Designed to support closed, semi-closed, and semi-open operating modes, this highly versatile machine delivers comprehensive respiratory control. With its elegant, environmentally friendly frame and advanced interface, the JINLING-850 provides anesthesiologists with the confidence and flexibility needed for both routine surgeries and complex, low-flow anesthesia procedures.\n\nKey Features & Benefits\nAdvanced Real-Time Display: Available with an 8.4-inch (Standard Model) or 10.4-inch (Advanced Model) high-definition color TFT screen. It allows clinicians to easily monitor Pressure-Time, Flow-Time, Pressure-Volume, and Flow-Volume waveforms, enabling instant cycle switching at the touch of a button.\n\nHigh-Precision Gas Delivery: Features a sophisticated five-tube flowmeter (O2, N2O, and Air) fitted with an interlocking oxygen-nitrous oxide supply system, guaranteeing oxygen output never drops below a safe 21%.\n\nSuperior Modular Circuit: Built with a standard integrated metallic modular respiratory circuit. This premium design eliminates gas sealing issues during high-temperature disinfection, ensuring highly effective cleaning and sterilization.\n\nInnovative Na-Lime Tank: Equipped with an international rotating Sodium-lime canister made from imported PPSU material. It is resistant to temperatures up to 134┬░C and features an easy, one-handed operation system.\n\nLow-Flow Anesthesia Ready: Integrates an advanced, highly stable Adjustable Pressure Limiting (APL) valve, optimized for minimizing anesthetic gas use during low and ultra-low flow procedures.\n\nIntelligent Safety & Backup:\n\nFeatures an automated self-checking function during startup and self-calibrating sensors.\n\nAutomatically switches to a built-in backup battery (minimum 4-hour capacity) during AC power outages.\n\nIncludes comprehensive audible and visual alarms for tidal volume, airway pressure, oxygen concentration, asphyxia, and gas/power failures.	The JINLING-850 Advance Anesthesia Machine is an advanced, highly versatile workstation designed for precision in both operating rooms and ICUs. Capable of supporting pediatric to adult patients, it features a vibrant color TFT display, comprehensive ventilation modes, and a precise five-tube flowmeter with interlocking safety mechanisms to prevent hypoxia.\n\nDesigned for ease of maintenance and infection control, it includes an easily sterilizable metallic modular respiratory circuit and a high-temperature-resistant sodium-lime canister. Fully optimized for low-flow anesthesia, the unit ensures maximum clinical safety with automated self-checks, robust alarm systems, and an automatic 4-hour battery backup.	\N	83	China	JINLING-850 Anesthesia Machine holds the following primary international certifications:\n\nCE Mark: Certified to meet European health, safety, and environmental protection standards for medical devices.\n\nISO 13485: Certified under the internationally recognized quality management system standard specific to the design and manufacture of medical devices.\n\nISO 9001: Compliant with general international quality management system standards.\n\nRoHS: Compliant with the Restriction of Hazardous Substances directive, ensuring the electronic components and manufacturing materials are environmentally safe.	published	Healing Technology ΓÇö JINLING-850 Advance Anesthesia Machine With Ventilator	The JINLING-850 Anesthesia Machine is an advanced, highly versatile workstation designed for precision in both operating rooms and ICUs. Capable of supporting pediatric to adult patients, it features a vibrant color TFT display, comprehensive ventilation modes, and a precise five-tube flowmeter with interlocking safety mechanisms to prevent hypoxia.\n\nDesigned for ease of maintenance and infection control, it includes an easily sterilizable metallic modular respiratory circuit and a high-temperature-resistant sodium-lime canister. Fully optimized for low-flow anesthesia, the unit ensures maximum clinical safety with automated self-checks, robust alarm systems, and an automatic 4-hour battery backup.	175	2026-04-29 07:11:07.417+00	2026-04-09 04:28:09.41+00	\N	\N
12	Heyer BiPAP BV30ST	BiPAP-BV30ST	f	BiPAP-BV30ST	4	2	\N	Heyer BiPAP BV30ST	The Heyer BiPAP BV30ST is a high-performance, non-invasive ventilator designed for patients requiring advanced pressure support. Developed in Germany with over 24 years of expertise in ventilator algorithms, it offers hospital-grade precision for home use.\n\nAdvanced Ventilation & Control\nMultiple Therapy Modes: Includes CPAP, S (Spontaneous), T (Timed), S/T (Spontaneous/Timed), PC (Pressure Control), and VAT (Volume Assured Technology).\n\nHigh Pressure Range: Provides an IPAP Max of 30 cmH2O and EPAP of 4ΓÇô25 cmH2O.\n\nVT Target: Features a target volume function ranging from 200ΓÇô1500 ml to ensure consistent ventilation.\n\nPrecision Calibration: Accurate to 0.1 cmH2O, providing treatment precision comparable to hospital ventilators.\n\nCustomizable Breathing: Offers 1ΓÇô6 adjustable levels for Rise Time and Trigger/Cycle to match the patientΓÇÖs natural breathing pattern.\n\nSafety & Monitoring\n12-Sensor Collaborative Monitoring: An interlinked sensing system provides real-time feedback on environmental changes and tracks the patientΓÇÖs respiratory cycle.\n\nSafety Alarms: Includes a Leak Alert to ensure therapy efficacy and a Backup Vent function for periods of low respiratory activity.\n\nData Management: Supports smart interconnection through WiFi, Bluetooth, and SD card, allowing users to view therapy reports and trend analysis via a cloud platform.\n\nUser Comfort & Maintenance\nDual-core Humidification: Intelligently adjusts temperature and humidity levels to maintain optimal airflow comfort.\n\nQuiet Operation: Designed for a restful environment with noise levels at Γëñ 28 dB.\n\nPreheat Function: A one-click preheat option warms the system 30 minutes before sleep to avoid cold condensation.\n\nAS-Dry Hygiene: Runs a 30-minute low-speed airflow post-treatment to reduce residual moisture by 80%.\n\nDesign: Features a rounded, "homestyle" body designed to soften the clinical feel of medical devices.	The Heyer BiPAP BV30ST is a German-engineered ventilator providing advanced pressure support up to 30 cmH2O. It features hospital-grade accuracy (0.1 cmH2O) and versatile modes including S/T and VAT. Designed with a quiet, homestyle aesthetic (Γëñ 28 dB), it includes Smart Interconnection for app-based data tracking and AS-Dry technology to ensure system hygiene.	\N	130	German	\N	published	\N	\N	\N	2026-04-25 05:13:48.051+00	2026-04-09 04:28:09.238+00	\N	\N
19	Aeonmed Aeon7200 Anesthesia Machine With Ventilator	Aeonmed-Aeon7200	f	Aeonmed-Aeon7200	7	3	\N	Aeonmed Aeon7200 Anesthesia Machine With Ventilator	Aeonmed Aeon7200 Anesthesia Machine With Ventilator\nThe Aeonmed Aeon7200 is an advanced, high-performance anesthesia delivery system designed to provide safe, reliable, and efficient care during surgical procedures. Engineered for both adult and pediatric patients, it combines precise gas delivery, dynamic ventilation modes, and a robust suite of real-time monitoring features.\n\nWith CE certification ensuring it meets stringent international safety standards, the Aeon7200 is an ideal solution for modern hospital operation theaters, surgical centers, and emergency units.\n\nKey Features & Innovations\nIntuitive Interface: Features an 8.4-inch color touchscreen display equipped with a navigation knob for quick, easy setup and parameter adjustments.\n\nVersatile Ventilation: Supports Volume, Pressure, and SIMV ventilation modes to accommodate a wide variety of anesthesia applications.\n\nAdvanced Moisture Control: Incorporates a built-in, maintenance-free patented sensor that prevents moisture condensation, ensuring accurate monitoring and protecting the internal circuitry.\n\nPrecision Low-Flow Delivery: Equipped with double tubes in series for each gas, making it highly responsive and easy to operate during low and mini-flow anesthesia.\n\nEnvironmental & Patient Safety: Features optional Anesthetic Gas Monitoring (AGM) to conveniently control gas concentration, and an optional Anesthetic Gas Scavenging System (AGSS) to reduce air pollution within the operating room.	The Aeonmed Aeon7200 is a highly versatile, CE-certified anesthesia delivery system featuring an integrated ventilator. Designed to seamlessly manage both adult and pediatric patients, it balances advanced technological precision with rigorous patient safety features for the modern operating room.\n\nCore Highlights:\n\nIntuitive Operation: Features an 8.4-inch color touchscreen with a navigation knob for quick, streamlined parameter adjustments.\n\nAdvanced Ventilation: Supports multiple ventilation modes (IPPV, PLV, SIMV, Spont) with a broad tidal volume range of 20 to 1500 ml.\n\nPrecision Low-Flow Delivery: Utilizes double-tube flowmeters specifically engineered for accurate, easy control during low and mini-flow anesthesia.\n\nEnhanced Safety & Reliability: Built with a patented maintenance-free moisture condensation sensor, comprehensive safety alarms, and a reliable 120-minute battery backup.	\N	82	China	The Aeonmed Aeon7200 Anesthesia Machine is manufactured to the highest global medical device standards, ensuring absolute safety, reliability, and precision in critical care environments:\n\nCE Certified: Fully compliant with European health, safety, and environmental protection directives. This certification guarantees that the machine meets stringent international clinical safety requirements for medical devices.\n\nISO 13485 Compliant: Manufactured by Aeonmed under a globally recognized Quality Management System specifically dedicated to the design and production of safe, high-quality medical equipment.\n\nBuilt-In Safety Standards: Engineered with hypoxic guard systems, automatic O2 deficiency alarms, and a patented NO WATER VAPOR COAGULATION sensor, fulfilling strict regulatory requirements for patient safety during anesthesia delivery.	published	Healing Technology ΓÇö Aeonmed Aeon7200 Anesthesia Machine With Ventilator	The Aeonmed Aeon7200 is a highly versatile, CE-certified anesthesia delivery system featuring an integrated ventilator. Designed to seamlessly manage both adult and pediatric patients, it balances advanced technological precision with rigorous patient safety features for the modern operating room.\n\nCore Highlights:\n\nIntuitive Operation: Features an 8.4-inch color touchscreen with a navigation knob for quick, streamlined parameter adjustments.\n\nAdvanced Ventilation: Supports multiple ventilation modes (IPPV, PLV, SIMV, Spont) with a broad tidal volume range of 20 to 1500 ml.\n\nPrecision Low-Flow Delivery: Utilizes double-tube flowmeters specifically engineered for accurate, easy control during low and mini-flow anesthesia.\n\nEnhanced Safety & Reliability: Built with a patented maintenance-free moisture condensation sensor, comprehensive safety alarms, and a reliable 120-minute battery backup.	72	2026-04-20 10:56:27.252+00	2026-04-09 04:28:09.465+00	\N	\N
22	Heyer OP830 Electric Operating Table	Heyer-OP830	f	Heyer-OP830	7	2	\N	Heyer OP830 Electric Operating Table	Heyer OP830 Electric Operating Table\nThe OP830 electric operating table by Heyer is constructed from high-quality alloy steel, perfectly balancing a lightweight design with robust strength. It is engineered for stable, dynamic intraoperative positioning and maintains a dynamic load capacity of over 135 kg.\n\nKey Features\nRadiolucent Tabletop: Allows for clear intraoperative X-ray and C-arm imaging while maintaining a high load-bearing capacity.\n\nOptimal Patient Comfort: Features an easy-to-clean, 60mm detachable multi-layer memory foam mattress that conforms to the patient's body to evenly distribute pressure.\n\nAdjustable Headplate: The detachable headplate is firmly fixed to prevent movement during surgery and can be easily adjusted up or down with just one hand.\n\nBuilt-in Kidney Bridge: Provides a 136 mm lift utilizing a simple wrench for stable support, providing maximum convenience for abdominal or urinary system surgeries.\n\nElectric Hydraulic Braking: Equipped with four 5 cm diameter brake rods that provide strong, reliable locking on any surface with the push of a button.\n\nIntuitive Controls: Designed for single-handed operation with easy-to-understand icons and a battery indicator. An automatic standby mode activates after 60 seconds of inactivity to avoid accidental touches.\n\nDurable Side Rails: Built with equal-length 304 stainless steel side rails featuring a treated surface for safe handling and accessory mounting.	The Heyer OP830 \nElectric Operating Table is crafted from high-quality alloy steel, perfectly balancing a lightweight design with robust strength to support a dynamic load of over 135 kg. Designed for surgical precision and patient comfort, it is an essential asset for modern operating rooms.\n\nCore Highlights:\n\nImaging Ready: Features a radiolucent tabletop that allows for clear intraoperative X-ray and C-arm imaging without sacrificing load-bearing capacity.\n\nEnhanced Comfort: Equipped with an easy-to-clean, 60mm multi-layer memory foam mattress that evenly distributes pressure.\n\nSurgical Versatility: Includes a 136mm kidney bridge lift for abdominal/urinary procedures, a fully adjustable and securely fixed headplate, and 304 stainless steel side rails for accessories.\n\nPrecision & Safety: Boasts an electric hydraulic braking system for rock-solid stability, plus an intuitive, single-handed remote control with a 60-second auto-standby to prevent accidental adjustments.	\N	167	German	The Heyer OP830 Electric Operating Tables are manufactured to the highest international medical standards, ensuring absolute safety and reliability in the operating room.\n\nCE Mark Certified: Fully compliant with European health, safety, and environmental protection directives for medical devices.\n\nISO 13485 & ISO 9001: Manufactured under globally recognized, strict Quality Management Systems specifically designed for medical equipment.\n\nGlobal OR Standards: Backed by Heyer MedicalΓÇÖs 130+ year legacy of German engineering and rigorous quality control testing for structural integrity and dynamic load safety.	published	Healing Technology ΓÇö Heyer OP830 Electric Operating Table	The Heyer OP830 \nElectric Operating Table is crafted from high-quality alloy steel, perfectly balancing a lightweight design with robust strength to support a dynamic load of over 135 kg. Designed for surgical precision and patient comfort, it is an essential asset for modern operating rooms.\n\nCore Highlights:\n\nImaging Ready: Features a radiolucent tabletop that allows for clear intraoperative X-ray and C-arm imaging without sacrificing load-bearing capacity.\n\nEnhanced Comfort: Equipped with an easy-to-clean, 60mm multi-layer memory foam mattress that evenly distributes pressure.\n\nSurgical Versatility: Includes a 136mm kidney bridge lift for abdominal/urinary procedures, a fully adjustable and securely fixed headplate, and 304 stainless steel side rails for accessories.\n\nPrecision & Safety: Boasts an electric hydraulic braking system for rock-solid stability, plus an intuitive, single-handed remote control with a 60-second auto-standby to prevent accidental adjustments.	55	2026-04-29 06:46:00.495+00	2026-04-09 04:28:09.549+00	\N	\N
2	Heyer Infusion Pump ΓÇô HK-100 Series	Infusion-Pump	f	Infusion-Pump	2	2	\N	Heyer Infusion Pump ΓÇô HK-100 Series	Heyer Infusion Pump ΓÇô HK-100 Series\nThe Heyer HK-100 Series Infusion Pump is a compact, high-precision medical device engineered to provide accurate and safe infusion therapy. Designed with an intuitive interface and advanced safety mechanisms, it ensures reliable medication delivery for critical care and general clinical environments.\n\nKey Features\n\nIntuitive User Interface: Features a colorful screen that provides an all-in-one glance at critical infusion information.\n\nAdvanced Safety (Anti-Free Flow): Includes an Anti-free-flow (AFF) design that automatically closes the tube with a clip when the pump door is opened to prevent inadvertent excess infusion.\n\nIntelligent Occlusion Management: The high-sensitivity sensor assists in detecting air bubbles and occlusions , while the Anti-bolus feature prevents overdose risks upon the release of an occlusion.\n\nLong-Lasting Performance: The internal battery provides more than 5 hours of continuous operation (at $25\\text{ ml/h}$). \n\nClinical Ergonomics: Designed with a rotatable pole clamp for easy installation and a detachable body for simplified cleaning.\n\nRobust Construction: Built with separate plastic covers for enhanced waterproof protection, achieving an IP24 rating.\n\nComprehensive Alarm System: Utilizes audible and visual alarms to help caregivers quickly identify issues such as air bubbles, low battery, and occlusion.	Heyer Infusion Pump ΓÇô HK-100 Series\nThe Heyer HK-100 Series Infusion Pump is a compact, high-precision medical device engineered to provide accurate and safe infusion therapy. Designed with an intuitive interface and advanced safety mechanisms, it ensures reliable medication delivery for critical care and general clinical environments.	\N	190	German	\N	published	Healing Technology ΓÇö Heyer Infusion Pump ΓÇô HK-100 Series	Heyer Infusion Pump ΓÇô HK-100 Series\nThe Heyer HK-100 Series Infusion Pump is a compact, high-precision medical device engineered to provide accurate and safe infusion therapy. Designed with an intuitive interface and advanced safety mechanisms, it ensures reliable medication delivery for critical care and general clinical environments.	190	2026-04-29 10:47:37.044+00	2026-04-09 04:28:08.832+00	\N	\N
18	JINLING-820 Anesthesia Machine With Ventilator	JINLING-820	f	JINLING-820	7	10	\N	JINLING-820 Anesthesia Machine With Ventilator	JINLING-820 Anesthesia Machine\nProduct Overview\nThe JINLING-820 is a highly advanced, pneumatically driven, and electronically controlled anesthesia workstation. Designed to meet the rigorous demands of modern operating rooms and intensive care units, it combines an elegant, ergonomic frame with precise clinical engineering. From low-flow anesthesia to complex ventilation requirements, the JINLING-820 delivers reliable performance, comprehensive safety features, and intuitive controls to support superior patient care.\n\nKey Features & Benefits\nVersatile Operating Modes: Fully supports closed, semi-closed, and semi-open operating modes, adapting seamlessly to diverse clinical requirements and patient profiles.\n\nClear, Real-Time Monitoring: Equipped with a high-visibility 5.7-inch TFT display (with optional upgrades available), allowing clinicians to simultaneously monitor Pressure-Time and Frequency-Time waveforms for rapid patient assessment.\n\nIntegrated Respiratory Circuit: Features a standard metallic modular respiratory circuit. This advanced, highly durable design resolves common gas-sealing issues during high-temperature disinfection, ensuring sterilization is both easy and highly effective.\n\nComprehensive Ventilation: Offers a wide spectrum of ventilation modes, including A/C, IPPV, SIPPV, VCV, IMV, SIMV, PEEP, and Manual, providing maximum flexibility during complex surgical procedures.\n\nPrecision Gas Delivery: Built with a high-precision four-tube flowmeter (O2 and N2O) featuring an interlocking system to prevent hypoxic mixtures. Coupled with a highly stable Adjustable Pressure Limiting (APL) valve, the unit is optimized for low and ultra-low flow anesthesia.\n\nIntelligent Safety Systems: Includes an automated self-checking function upon startup, automatic self-calibrating sensors, and a robust power failure support system that automatically switches to an internal battery during AC power outages.	The JINLING-820 Anesthesia Machine is an advanced, highly versatile workstation built for modern operating rooms. It features a 5.7-inch real-time display, an easy-to-sterilize metallic modular respiratory circuit, and comprehensive ventilation modes suitable for diverse clinical needs. Designed for precision and safety, it includes a high-accuracy four-tube flowmeter optimized for low-flow anesthesia, automated self-checks, robust alarm systems, and reliable battery backup. The unit is fully CE, ISO 13485, and RoHS certified, ensuring top-tier clinical performance and patient safety.	\N	81	China	Manufactured under strict quality control standards, the JINLING-820 is internationally recognized for safety and reliability:\n\nCE Mark: Compliant with European health and safety standards for medical devices.\n\nISO 13485: Certified under the quality management system standard for the medical device industry.\n\nRoHS: Compliant with environmental safety standards regarding electronic components.	published	Healing Technology ΓÇö JINLING-820 Anesthesia Machine With Ventilator	The JINLING-820 Anesthesia Machine is an advanced, highly versatile workstation built for modern operating rooms. It features a 5.7-inch real-time display, an easy-to-sterilize metallic modular respiratory circuit, and comprehensive ventilation modes suitable for diverse clinical needs. Designed for precision and safety, it includes a high-accuracy four-tube flowmeter optimized for low-flow anesthesia, automated self-checks, robust alarm systems, and reliable battery backup. The unit is fully CE, ISO 13485, and RoHS certified, ensuring top-tier clinical performance and patient safety.	73	2026-04-29 06:56:27.612+00	2026-04-09 04:28:09.443+00	\N	\N
30	SX-II 700/700 LED Shadowless Operating Lamp	SuxinMedicalSX-II700700	f	SX-II 700/700	7	7	\N	OT Light Double Dome 700/700	\N	\N	\N	31	China	\N	published	Healing Technology ΓÇö SX-II 700/700 LED Shadowless Operating Lamp	\N	\N	2026-04-28 05:08:33.121+00	2026-04-15 10:31:47.117+00	\N	\N
25	SX-700/700 LED Shadowless Operating Lamp	SuxinMedicalSX700700	t	SX-700/700	7	7	OT Light Double Dome 700/700	OT Light Double Dome 700/700	Suxin Medical SX-700/700 Color Dual Dome LED Shadowless Operating Lamp\nProduct Overview\nThe Suxin Medical SX-700/700 is a premium, ceiling-mounted dual-dome surgical light designed to meet the rigorous demands of modern operating theaters. Featuring a unique "lamp-flower" design, this high-performance lighting system provides exceptional shadow-free illumination, advanced color rendering, and unparalleled reliability for complex surgical procedures.\n\nEquipped with authentic, imported German Osram LEDs, the SX-700/700 ensures a stable, long-lasting light source that medical professionals can depend on.\nKey Features\n\nAdvanced Color LED Layout: Specifically engineered with red and green lights to relieve visual fatigue during lengthy procedures and provide superior clarity for precise vascular identification.\n\nPremium German Osram LEDs: Utilizes genuine, imported Osram LED beads to guarantee a highly stable light output and an extraordinary lifespan of up to 80,000 hours, significantly reducing maintenance costs.\n\nRedundant Double Control System: Features a high-tech, user-friendly central and side dual-control system. This built-in redundancy provides a 100% operational guarantee, ensuring uninterrupted lighting when it matters most.\n\nOptimal Comfort: Generates cold light with a minimal temperature rise of just 1┬░C at the surgeon's head area, maintaining a comfortable and safe environment for both the surgical team and the patient.	The Suxin Medical SX-700/700 is a dual-dome, ceiling-mounted LED shadowless surgical lamp powered by genuine German Osram LEDs. Delivering up to 180,000 Lux of adjustable illumination and an impressive 80,000-hour lifespan, it features a specialized color LED layout (red and green) to reduce visual fatigue and enhance vascular clarity. Complete with a fail-safe double control system, it provides highly reliable, premium lighting for complex operating environments.	\N	4	China	CE Mark (CE-MDR): Certified compliant with European Medical Device Regulations, ensuring the products meet rigorous health, safety, and environmental protection standards for the European Economic Area.\nISO 13485 (EN ISO 13485:2016): Certified under the international standard for quality management systems specifically for the design and manufacture of medical devices.\nISO 9001: Certified for overall quality management systems, demonstrating consistent manufacturing and strict quality control processes.\nIEC 60601-1 / EN 60601-1:2016: Fully compliant with the internationally recognized general standards for the basic safety and essential performance of medical electrical equipment.\nIEC 60601-2-41: Compliant with the specific international safety and performance standards tailored for surgical luminaires (operating lights) and luminaires for diagnosis.\nFree Sales Certificate (FSC): Approved for international export and commercial distribution.\nJiangsu Provincial FDA Approval: Fully licensed and approved by the regional Food and Drug Administration in their manufacturing jurisdiction (Jiangsu Province, China).	published	Healing Technology ΓÇö Suxin Medical SX-700/700 LED Shadowless Operating Lamp	The Suxin Medical SX-700/700 is a dual-dome, ceiling-mounted LED shadowless surgical lamp powered by genuine German Osram LEDs. Delivering up to 180,000 Lux of adjustable illumination and an impressive 80,000-hour lifespan, it features a specialized color LED layout (red and green) to reduce visual fatigue and enhance vascular clarity. Complete with a fail-safe double control system, it provides highly reliable, premium lighting for complex operating environments.	68	2026-04-28 05:08:41.588+00	2026-04-15 06:17:33.443+00	\N	\N
9	Fochef Reusable Bipolar Forceps Cable ΓÇô Universal Fit	Forcep-Cable	f	Forceps-Cable	9	31	\N	Fochef Reusable Bipolar Forceps Cable ΓÇô Universal Fit	Optimize your surgical precision with the Fochef Bipolar Forceps Cable. Engineered for high-performance electrosurgery, this premium diathermy cable provides a stable and secure connection between your Electrosurgical Unit (ESU) and bipolar forceps. Its heavy-duty construction is designed to withstand the rigorous demands of the modern operating theater.\n\nProduct Highlights\nUniversal Compatibility: Equipped with standard dual-pin (banana) connectors on the machine end, making it compatible with most major ESU brands (Valleylab, Erbe, Martin, etc.).\n\nEuropean Standard Connector: Features a high-quality molded female socket designed to fit all standard European-style bipolar forceps.\n\nSuperior Insulation: Coated in high-grade, medical-grade silicone insulation that ensures maximum safety against current leakage and provides a flexible, tangle-free experience for the surgeon.\n\nAutoclavable & Reusable: Built for longevity, this cable is fully steam-sterilizable, maintaining its integrity and conductivity even after multiple autoclave cycles.\n\nErgonomic Design: Includes reinforced strain relief to prevent internal wire breakage and a built-in silicone organizer strap for neat storage.	Optimize your surgical precision with the Fochef Bipolar Forceps Cable. Engineered for high-performance electrosurgery, this premium diathermy cable provides a stable and secure connection between your Electrosurgical Unit (ESU) and bipolar forceps. Its heavy-duty construction is designed to withstand the rigorous demands of the modern operating theater.	\N	156	China	\N	published	Healing Technology ΓÇö Fochef Reusable Bipolar Forceps Cable ΓÇô Universal Fit	Optimize your surgical precision with the Fochef Bipolar Forceps Cable. Engineered for high-performance electrosurgery, this premium diathermy cable provides a stable and secure connection between your Electrosurgical Unit (ESU) and bipolar forceps. Its heavy-duty construction is designed to withstand the rigorous demands of the modern operating theater.	156	2026-04-28 08:13:39.091+00	2026-04-09 04:28:09.113+00	1500	\N
21	TRIUP 3008A Hydraulic Operation Table	TRIUP-3008A	f	TRIUP-3008A	7	16	\N	TRIUP 3008A Hydraulic Operation Table	TRIUP 3008A Hydraulic Operation Table\nThe 3008 and 3008A models by TRIUP International Corp. are head-operating universal hydraulic tables designed to support a wide variety of surgical disciplines. These highly adaptable tables are ideal for thoracic surgery, abdominal surgery, ophthalmology, otorhinolaryngology, obstetrics and gynecology, urinary surgery, and orthopedics.\n\nKey Features & Design:\nReliable Hydraulic Operation: The table's height (rise and drop) is effortlessly controlled using a pedal-operated oil pump, while all other multi-directional movements are precisely handled by a mechanical transmission head.\n\nModel Options: The 3008 is the standard configuration, while the upgraded 3008A features a premium stainless steel base shell, stand column, and bed surface for enhanced durability and hygiene.\n\nEnhanced Comfort: To ensure patient comfort and safety during procedures, the included shoulder supports, body supports, and armrests are finished with a leather wrap	The 3008A Hydraulic Operation Table by TRIUP International is a highly versatile, multi-discipline surgical table designed to accommodate everything from orthopedics and obstetrics to thoracic and ophthalmic procedures.\n\nCore Highlights:\n\nReliable Mechanics: Features a smooth, pedal-operated hydraulic oil pump for height adjustments, paired with a mechanical transmission head for precise, multi-directional tilt and section controls.\n\nDurable Construction: While the 3008 is a reliable standard model, the 3008A upgrade features a premium stainless steel base, column, and bed surface for superior hygiene and longevity.\n\nComprehensive Comfort: Comes fully equipped with standard positioning accessoriesΓÇöincluding shoulder, body, and arm supportsΓÇöall finished with comfortable leather wraps to ensure optimal patient safety and stability.	\N	57	China	Manufactured by TRIUP International Corp., the 3008 and 3008A Hydraulic Operation Tables are backed by over 20 years of medical manufacturing expertise and adhere to strict international quality control standards:\n\nISO 13485 & ISO 9000 Certified: Manufactured under globally recognized, strict Quality Management Systems specifically dedicated to medical device production.\n\nCE Marked / TUV Certified: Meets the rigorous health, safety, and environmental protection directives required for international and European medical markets.\n\nGlobal Export Standards: Designed and tested to meet reliable operational and safety criteria for hospitals and surgical centers worldwide.	published	Healing Technology ΓÇö TRIUP 3008A Hydraulic Operation Table	The 3008A Hydraulic Operation Table by TRIUP International is a highly versatile, multi-discipline surgical table designed to accommodate everything from orthopedics and obstetrics to thoracic and ophthalmic procedures.\n\nCore Highlights:\n\nReliable Mechanics: Features a smooth, pedal-operated hydraulic oil pump for height adjustments, paired with a mechanical transmission head for precise, multi-directional tilt and section controls.\n\nDurable Construction: While the 3008 is a reliable standard model, the 3008A upgrade features a premium stainless steel base, column, and bed surface for superior hygiene and longevity.\n\nComprehensive Comfort: Comes fully equipped with standard positioning accessoriesΓÇöincluding shoulder, body, and arm supportsΓÇöall finished with comfortable leather wraps to ensure optimal patient safety and stability.	59	2026-04-19 09:33:45.249+00	2026-04-09 04:28:09.519+00	\N	\N
35	Manual 2 functions bed 	2functions-bed 	f	2functions-bed 	5	31	\N	Manual 2 functions bed 	Two-Crank Manual Hospital Bed\nThe Two-Crank Manual Hospital Bed (Model: BII-06a) is a high-quality clinical recovery platform designed for durability and ease of use in medical facilities and home care settings. Manufactured by Boxin, this bed offers essential manual adjustments to ensure patient comfort and clinical efficiency.\n\nDual-Crank Manual Control: Features a two-crank system that allows for precise manual adjustments of the bed's functions to meet patient needs.\n\nDurable Guardrail System: Equipped with a 6-gear aluminum alloy guardrail for enhanced patient safety and ease of access.\n\nHigh-Quality Components: Includes removable ABS headboards and footboards for durability and easy cleaning.\n\nSmooth Mobility: Mounted on silent wheels to ensure quiet and easy movement within clinical wards.\n\nClinical Support: Comes standard with an I.V. pole for integrated medical care.	Two-Crank Manual Hospital Bed\nThe Two-Crank Manual Hospital Bed (Model: BII-06a) is a high-quality clinical recovery platform designed for durability and ease of use in medical facilities and home care settings. Manufactured by Boxin, this bed offers essential manual adjustments to ensure patient comfort and clinical efficiency.	\N	193	China	\N	published	Healing Technology ΓÇö Manual 2 functions bed 	Two-Crank Manual Hospital Bed\nThe Two-Crank Manual Hospital Bed (Model: BII-06a) is a high-quality clinical recovery platform designed for durability and ease of use in medical facilities and home care settings. Manufactured by Boxin, this bed offers essential manual adjustments to ensure patient comfort and clinical efficiency.	193	2026-04-29 11:33:24.447+00	2026-04-29 11:33:24.446+00	\N	\N
4	Anesthesia Machine BD SS (Model HT-150S)	Anesthesia-Machine-BD	f	Anesthesia-Machine-BD	7	2	\N	Anesthesia Machine BD SS (Model HT-150S)	Anesthesia Machine BD SS (Model HT-150S)\nThe Anesthesia Machine BD SS is a robust and reliable medical apparatus specifically designed for delivering precise anesthesia in surgical environments. Constructed with a high-quality stainless steel (SS) body, this model combines durability with essential safety mechanisms for patient care.\n\nKey Features\n\nPrecision Gas Control: Equipped with a four-tube rotameter for Oxygen and Nitrous Oxide, allowing for accurate flow management.\n\nVersatile Vaporizer Options: Supports the use of Isoflurane and Sevoflurane to suit various clinical requirements.\n\nEnhanced Safety Systems: Features an automatic $N_2O$ lock system and an oxygen failure alarm to ensure patient safety during gas administration.\n\nEmergency Readiness: Includes an oxygen emergency flush valve on the front panel and an extra flowmeter dedicated to emergency oxygen supply.\n\nHigh-Quality Components: Utilizes high-pressure regulators for Oxygen and Nitrogen and includes a non-return pressure relief valve to eliminate the risk of gas back-flow.\n\nMobility and Stability: Mounted on four rubber-caster wheels, all of which are lockable to ensure the unit remains secure during procedures.	Anesthesia Machine BD SS (Model HT-150S)\nThe Anesthesia Machine BD SS is a robust and reliable medical apparatus specifically designed for delivering precise anesthesia in surgical environments. Constructed with a high-quality stainless steel (SS) body, this model combines durability with essential safety mechanisms for patient care.	\N	187	Bangladesh	\N	published	Healing Technology ΓÇö Anesthesia Machine BD SS (Model HT-150S)	Anesthesia Machine BD SS (Model HT-150S)\nThe Anesthesia Machine BD SS is a robust and reliable medical apparatus specifically designed for delivering precise anesthesia in surgical environments. Constructed with a high-quality stainless steel (SS) body, this model combines durability with essential safety mechanisms for patient care.	187	2026-04-29 10:05:07.954+00	2026-04-09 04:28:08.925+00	\N	\N
7	Premium Reusable 3-Pin Monopolar Electrosurgical Pencil	Electrosurgical-Pencil	f	Electrosurgical-Pencil	9	31	\N	Premium Reusable 3-Pin Monopolar Electrosurgical Pencil	Premium Reusable 3-Pin Monopolar Electrosurgical Pencil\nMaximize surgical efficiency with our Reusable 3-Pin Monopolar Handpiece. This industry-standard electrosurgical pencil features integrated finger-switch controls, allowing the surgeon to toggle between cutting and coagulation modes directly from the handpiece. Designed for high-frequency use, it combines ergonomic comfort with long-lasting clinical durability.\n\nProduct Highlights\nDual-Button Finger Control: Features tactile, color-coded buttonsΓÇöYellow for Cut and Blue for CoagulationΓÇöproviding the surgeon with immediate, intuitive control during procedures.\n\nUniversal 3-Pin Connector: Equipped with a standard three-prong (Valleylab style) plug, ensuring seamless compatibility with almost all modern Electrosurgical Units (ESUs) and generators.\n\nErgonomic Design: The slender, lightweight handle is textured for a non-slip grip, ensuring precision even during moisture-heavy or lengthy surgical cases.\n\nHigh-Grade Silicone Insulation: The premium grey silicone cable is engineered for maximum flexibility in the sterile field and provides robust electrical insulation to prevent RF leakage.\n\nFully Autoclavable: Built to withstand repeated high-temperature steam sterilization cycles, offering a sustainable and cost-effective solution for busy operating theaters.	Premium Reusable 3-Pin Monopolar Electrosurgical Pencil\nMaximize surgical efficiency with our Reusable 3-Pin Monopolar Handpiece. This industry-standard electrosurgical pencil features integrated finger-switch controls, allowing the surgeon to toggle between cutting and coagulation modes directly from the handpiece. Designed for high-frequency use, it combines ergonomic comfort with long-lasting clinical durability.	\N	158	China	\N	published	Healing Technology ΓÇö Premium Reusable 3-Pin Monopolar Electrosurgical Pencil	Premium Reusable 3-Pin Monopolar Electrosurgical Pencil\nMaximize surgical efficiency with our Reusable 3-Pin Monopolar Handpiece. This industry-standard electrosurgical pencil features integrated finger-switch controls, allowing the surgeon to toggle between cutting and coagulation modes directly from the handpiece. Designed for high-frequency use, it combines ergonomic comfort with long-lasting clinical durability.	158	2026-04-28 08:53:21.128+00	2026-04-09 04:28:09.04+00	2500	\N
20	Suxin SXS3008 Head-Operated Comprehensive Operating Table	Suxin-SXS3008	f	Suxin-SXS3008	7	7	\N	Suxin SXS3008 Head-Operated Comprehensive Operating Table	Suxin SXS3008 Head-Operated Comprehensive Operating Table\nThe Suxin SXS3008 Series (including the SXS3008-II and SXS3008-III models) by Jiangsu Suxin Medical Equipment is a highly versatile, head-controlled hydraulic operating table. Engineered for precision and stability, it is an ideal, multi-functional solution for a wide range of surgical disciplines, including general surgery (thorax, abdomen, perineum), neurosurgery, ophthalmology, ENT, gynecology, and orthopedics.\n\nKey Features\nHead-Controlled Hydraulics: Features a reliable, smooth oil-pump hydraulic lifting mechanism. All multi-directional positional adjustments (tilt, back, and leg plates) are safely and efficiently controlled from the head side of the table by the anesthesiologist or surgical staff.\n\nExceptional Stability: The central hydraulic column is purposefully designed to prevent overturning, safely supporting a maximum dynamic load capacity of over 250 kg. Select models feature a T-base design for enhanced floor stability during rigorous procedures.\n\nPremium Construction: Built for the demanding operating room environment, the base seat and column are available in high-quality stainless steel (providing superior rust resistance and hygiene) or durable carbon steel with powder coating.\n\nFlexible Patient Positioning: Equipped with a split-type leg plate to accommodate complex lower limb positioning and an integrated kidney bridge elevator for optimized access during abdominal and kidney surgeries.\n\nC-Arm & X-Ray Ready: The advanced SXS3008-III model features a double tabletop design with a radiolucent upper surface, ensuring clear, unobstructed intraoperative X-ray and imaging capabilities.	The Suxin SXS3008 Series is a highly versatile, head-controlled hydraulic operating table designed to support a wide variety of surgical disciplines. Built for rigorous operating room environments, it provides exceptional stability with a safe load capacity of over 250 kg.\n\nCore Highlights:\n\nHead-Controlled Precision: Features smooth hydraulic lifting, with all multi-directional positioning (tilt, back, and leg adjustments) safely operated from the head of the table.\n\nSurgical Versatility: Equipped with a split-type leg plate for complex lower limb positioning and a built-in kidney bridge providing up to 120mm of elevation.\n\nImaging Ready: The premium SXS3008-III model features a dual-layer radiolucent tabletop, perfectly accommodating intraoperative X-ray and C-arm imaging.\n\nDurable Construction: Built with an anti-overturn central column and available in premium stainless steel for maximum hygiene and rust resistance.	\N	162	China	Manufactured by Jiangsu Suxin Medical Equipment Co., Ltd., the SXS3008 Series is built to strict international safety and quality standards, ensuring absolute reliability in demanding surgical environments:\n\nCE Marked: Fully certified to meet European health, safety, and environmental protection standards for medical devices.\n\nISO 13485 & ISO 9001 Certified: Produced under globally recognized Quality Management Systems specifically mandated for medical equipment manufacturing and operational excellence.\n\nProvincial Regulatory Approval: Officially authorized and recognized by the Jiangsu Provincial Food and Drug Administration as a high-quality medical device.	published	Healing Technology ΓÇö Suxin SXS3008 Head-Operated Comprehensive Operating Table	The Suxin SXS3008 Series is a highly versatile, head-controlled hydraulic operating table designed to support a wide variety of surgical disciplines. Built for rigorous operating room environments, it provides exceptional stability with a safe load capacity of over 250 kg.\n\nCore Highlights:\n\nHead-Controlled Precision: Features smooth hydraulic lifting, with all multi-directional positioning (tilt, back, and leg adjustments) safely operated from the head of the table.\n\nSurgical Versatility: Equipped with a split-type leg plate for complex lower limb positioning and a built-in kidney bridge providing up to 120mm of elevation.\n\nImaging Ready: The premium SXS3008-III model features a dual-layer radiolucent tabletop, perfectly accommodating intraoperative X-ray and C-arm imaging.\n\nDurable Construction: Built with an anti-overturn central column and available in premium stainless steel for maximum hygiene and rust resistance.	62	2026-04-29 06:37:18.264+00	2026-04-09 04:28:09.494+00	\N	\N
1	Heyer Syringe Pump ΓÇô HK-400 Series	HK-400	f	HK-400	2	2	\N	Heyer Syringe Pump ΓÇô HK-400 Series	Heyer Syringe Pump ΓÇô HK-400 Series\nThe Heyer HK-400 Series Syringe Pump is a compact and high-precision medical device designed to deliver clinical excellence through simplicity and accuracy. Its lightweight design and advanced automation make it an essential tool for efficient patient transferring and diverse clinical applications.\n\nKey Features\n\nUniversal Syringe Compatibility: Automatically identifies various syringe brands and sizes, including 2 ml, 5 ml, 10 ml, 20 ml, 30 ml, and 50/60 ml.\n\nAdvanced Infusion Modes: Offers 12 distinct infusion modesΓÇösuch as TIVA, Loading Dose, Drug Library, and Weight modeΓÇöto meet the specialized needs of various clinical departments.\n\nEnhanced Safety Monitoring: Features a combined numeric and graphic pressure indicator with 13 occlusion levels to help caregivers identify risks in advance.\n\nSmart Design & Programming: Utilizes a numeric keypad for fast programming and a hidden handle design to save valuable space.\n\nPatient-Centric Night Mode: Provides a better rest environment for patients by muting key sounds and reducing screen brightness.\n\nExpandable Workstation: Pumps can stack and lock together, allowing for expansion from 2 up to 12 modules as patient needs increase.\n\nDurable Construction: Features an IP44 ingress protection rating and an integrated handle for easy installation or removal using a rotatable pole clamp.	Heyer Syringe Pump ΓÇô HK-400 Series\nThe Heyer HK-400 Series Syringe Pump is a compact and high-precision medical device designed to deliver clinical excellence through simplicity and accuracy. Its lightweight design and advanced automation make it an essential tool for efficient patient transferring and diverse clinical applications.\n	\N	191	China	\N	published	Healing Technology ΓÇö Heyer Syringe Pump ΓÇô HK-400 Series	Heyer Syringe Pump ΓÇô HK-400 Series\nThe Heyer HK-400 Series Syringe Pump is a compact and high-precision medical device designed to deliver clinical excellence through simplicity and accuracy. Its lightweight design and advanced automation make it an essential tool for efficient patient transferring and diverse clinical applications.\n	191	2026-04-29 10:51:02.591+00	2026-04-09 04:28:08.77+00	\N	\N
11	ZERONE ZEUS-400	ZEUS-400	f	ZEUS-400	7	6	\N	ZERONE ZEUS-400	The Zerone ZEUS-400 is a high-performance electrosurgical unit (ESU) designed for universal surgical applications, offering powerful and stable microprocessor-controlled output. It is a versatile diathermy system used in various specialties, including general surgery, dermatology, and endoscopy.\n\nKey Performance Features\n\nOperating Modes: Includes four cutting modes (Pure Cut and three Blend modes), as well as both monopolar and bipolar coagulation.\n\nBipolar Capabilities: Features bipolar cut and bipolar coagulation modes, which can be operated via hand or foot controls.\n\nMemory & Presets: Equipped with a user storage function capable of saving up to 10 different settings. It also automatically recalls the last used settings upon being turned back on.\n\nCompatibility: The ZEUS-400 is compatible with Argon-Z for Argon Plasma Coagulation.\n\nSafety and Interface\nREM (Return Electrode Monitoring): Continuously monitors the contact area between the patient and the pad; it automatically blocks current if the contact is insufficient to prevent accidental burns.\n\nFeedback System: Ensures a stable and straight power output even during varying tissue resistance.\n\nVisual & Audio Indicators: Features a digital display for easy output value checks, supplemented by distinct audio sounds and LED lamps to signal different working conditions.\n\nProtection: Rated as Class 1, Type CF, with a fully grounded case to prevent leakage current.	\nThe Zerone ZEUS-400 is a high-performance electrosurgical unit (ESU) designed for universal surgical applications, offering powerful and stable microprocessor-controlled output. It is a versatile diathermy system used in various specialties, including general surgery, dermatology, and endoscopy.	\N	132	Korea	\N	published	\N	\N	\N	2026-04-25 05:33:41.673+00	2026-04-09 04:28:09.206+00	\N	\N
36	Samsung HS40 Ultrasound system	Samsung-HS40	f	Samsung-HS40	6	31	\N	Samsung HS40 Ultrasound system	Samsung HS40: Extraordinary Efficiency for Women's Health\nProduct Overview\nThe Samsung HS40 is a premium-performance ultrasound system engineered to meet the diverse needs of modern women's healthcare. Built on SamsungΓÇÖs core imaging architecture, the HS40 delivers crystal-clear image quality and streamlined diagnostic tools. Whether used for routine OB/GYN exams or complex fetal monitoring, the HS40 provides the reliability and efficiency clinicians need to provide superior patient care.\n\nKey Features\n1. Exquisite Image Quality\nCrystal ArchitectureΓäó: SamsungΓÇÖs advanced imaging engine provides high-resolution images with reduced noise and enhanced clarity.\n\nS-Vue TransducersΓäó: Experience wider bandwidth and higher sensitivity, ensuring excellent penetration and high-quality resolution even on technically challenging patients.\n\nClearVision: This noise reduction filter improves edge enhancement and creates sharper 2D images for optimal diagnostic confidence.\n\n2. Specialized Women's Health Solutions\nFetal Diagnosis: Advanced tools for monitoring fetal growth and status with precision. Features like BiometryAssistΓäó enable one-click fetal measurements (HC, BPD, AC, FL) to improve consistency and reduce exam time.\n\n5D NTΓäó: Simplifies Nuchal Translucency measurements by automatically finding the mid-sagittal plane and measuring the thickness.\n\nLaborAssistΓäó: Provides objective data during the second stage of labor to help clinicians determine the progress of delivery.\n\n3. Advanced Visualization\nRealistic VueΓäó: Displays high-resolution 3D anatomy with exceptional detail and realistic depth perception, helping patients connect with their unborn child.\n\nCrystalVueΓäó: An advanced volume rendering technology that enhances the visualization of internal and external structures in a single rendered image.\n\nMV-FlowΓäó: A sophisticated alternative to Power Doppler for visualizing microcirculatory and slow blood flow, crucial for detailed vascular exams.\n\n4. Intelligent Workflow & Ergonomics\nUser-Centric Design: Featuring a 21.5-inch LED monitor and a 10.1-inch touch screen for intuitive navigation.\n\nSolid State Drive (SSD): Ensures fast boot times and rapid data processing.\n\nBattery AssistΓäó: Allows the system to be moved while on standby, reducing downtime between exams.\n\nGel Warmer: Enhances patient comfort during the examination.	Samsung HS40: Extraordinary Efficiency for Women's Health\nThe Samsung HS40 is a premium-performance ultrasound system engineered to meet the diverse needs of modern women's healthcare. Built on SamsungΓÇÖs core imaging architecture, the HS40 delivers crystal-clear image quality and streamlined diagnostic tools. Whether used for routine OB/GYN exams or complex fetal monitoring, the HS40 provides the reliability and efficiency clinicians need to provide superior patient care.	\N	195	Korea	\N	published	\N	\N	\N	2026-04-29 11:58:13.061+00	2026-04-29 11:58:13.06+00	\N	\N
14	AEONMED BF30ST BiPAP	AEONMED-BF30STBiPAP	f	AEONMED-BF30STBiPAP	4	3	\N	AEONMED BF30ST BiPAP	AEONMED NeoBip BF30ST Non-Invasive Ventilator\nThe Aeonmed BF30ST from the NeoBip series is a high-performance non-invasive ventilator designed to deliver accurate, intelligent control for every comfortable breath. Engineered with over 20 years of technology accumulation, this device features a unique pressure control algorithm that rapidly adapts to a patient's breathing efforts to ensure perfect synchronization. It is intended specifically for the treatment of adult Obstructive Sleep Apnea (OSA) or for patients with pulmonary insufficiency requiring respiratory support.\n\nAdvanced Therapy Modes & VGPS Technology\nThe BF30ST supports a comprehensive suite of ventilation modes, including CPAP, S, T, S/T, and VGPS.\n\nVGPS (Volume Guarantee Pressure Support): This mode guarantees a pre-set tidal volume target.\n\nIf the system detects that a patient's inspiratory volume is falling short, it automatically raises the inspiratory pressure to achieve the target volume.\n\nThis ensures the patient's tidal volume is maintained, even if their airway resistance or compliance changes during the night.\n\nAdditionally, a low tidal volume alarm provides an extra layer of ventilation safety.\n\nKey Features\nUltra-Fast Synchronization: Features a 6-level adjustable pressure rise slope. The device responds to a patient's inspiratory trigger in as fast as 150ms, ensuring smooth breaths and easing the workload on respiratory muscles.\n\nHigh-Resolution Touchscreen: Built with a vibrant 4.3-inch colorful touchscreen display. It utilizes an exquisite UI design that displays multiple monitored parameters simultaneously, paired with a highly flexible navigator knob for effortless operation.\n\nWhisper-Quiet Operation: Operates at a remarkably low noise level of less than 30dB, ensuring uninterrupted sleep for both the patient and their partner.\n\nTravel-Friendly & Detachable Design: The main unit weighs only 0.82kg, scaling to a total of 1.26kg when the humidifier is attached. The detachable design between the main unit and humidifier makes it highly convenient for both home use and traveling.\n\nAS-Dry Technology: Includes automated AS-Dry technology to help reduce internal moisture, keeping the equipment hygienic.	AEONMED NeoBip BF30ST BiPAP: Quick Summary\n\nThe AEONMED NeoBip BF30ST is an advanced, non-invasive ventilator tailored for adults managing Obstructive Sleep Apnea (OSA) or pulmonary insufficiency. Its standout feature is VGPS (Volume Guarantee Pressure Support), an intelligent technology that automatically adjusts pressure to ensure your target tidal volume is always met.\n\nEngineered for exceptional comfort and synchronization, it responds to breathing triggers in just 150 milliseconds. A vibrant 4.3-inch touchscreen allows for effortless navigation, while the whisper-quiet motor (under 30dB) guarantees a peaceful night. With its lightweight, detachable humidifier design, the BF30ST is the perfect, versatile solution for both reliable home therapy and travel.	\N	118	German	The AEONMED NeoBip BF30ST BiPAP is manufactured under stringent global quality control protocols to ensure premium safety and performance. The device meets or exceeds the following international medical and safety standards:\n\nCE Mark: Certified to meet the European Union's health, safety, and environmental protection requirements for medical devices.\n\nISO 13485: Manufactured in a facility certified for Quality Management Systems specific to medical devices.\n\nISO 80601-2-70:2015: Compliant with specific requirements for the basic safety and essential performance of sleep apnea breathing therapy equipment.\n\nISO 80601-2-74:2017: Compliant with standards for respiratory humidifying equipment.\n\nEN 60601-1 / EN 60601-1-2 / EN 60601-1-11: Meets rigorous international electrical safety and electromagnetic compatibility standards for medical electrical equipment, including specific certifications for home healthcare environments.	published	Healing Technology ΓÇö AEONMED BF30ST BiPAP	AEONMED NeoBip BF30ST BiPAP: Quick Summary\n\nThe AEONMED NeoBip BF30ST is an advanced, non-invasive ventilator tailored for adults managing Obstructive Sleep Apnea (OSA) or pulmonary insufficiency. Its standout feature is VGPS (Volume Guarantee Pressure Support), an intelligent technology that automatically adjusts pressure to ensure your target tidal volume is always met.\n\nEngineered for exceptional comfort and synchronization, it responds to breathing triggers in just 150 milliseconds. A vibrant 4.3-inch touchscreen allows for effortless navigation, while the whisper-quiet motor (under 30dB) guarantees a peaceful night. With its lightweight, detachable humidifier design, the BF30ST is the perfect, versatile solution for both reliable home therapy and travel.	120	2026-04-30 06:10:17.106+00	2026-04-09 04:28:09.307+00	\N	\N
13	Heyer CPAP 20A Pro	CPAP-20A-Pro	f	CPAP-20A-Pro	4	2	\N	Heyer CPAP 20A Pro	The Heyer CPAP 20A Pro is a medical-grade respiratory health manager developed in Germany. It features a modern, homestyle design that blends into the bedroom like a smart speaker, moving away from the clinical look of traditional medical equipment.\n\nIntelligent Therapy Features\nPrecision Control: Features medical-grade calibration standards accurate to 0.1 cmH2O, providing hospital-level treatment precision.\n\n12-Sensor Collaborative Monitoring: An interlinked sensing system provides real-time feedback on environmental changes and captures accurate respiratory waveforms.\n\nCareRamp: The device starts at a low pressure and increases intelligently only after detecting that the user has fallen asleep to avoid a suffocating sensation.\n\nAS-Elex: Automatically decreases expiratory pressure to make every exhalation more comfortable.\n\nComfort and Maintenance\nDual-Core Humidification: Intelligently adjusts temperature and humidity levels for optimal comfort.\n\nPreheat Function: One-click heating 30 minutes before sleep helps avoid cold condensation.\n\nAS-Dry: Following treatment, a 30-minute low-speed airflow circulation reduces residual moisture by 80%.\n\nAuto On/Off: Sensors detect airflow and pressure to start treatment immediately upon wearing the mask and stop upon removal.\n\nWide-Opening Water Tank: Designed for easy cleaning and filling with a fool-proof installation.	The Heyer CPAP 20A Pro is a German-engineered respiratory health manager designed to blend into the home like a smart speaker. It features hospital-grade precision accurate to 0.1 cmH2O and an intelligent CareRamp system that only increases pressure once it detects you have fallen asleep. With its ultra-quiet operation (Γëñ 28 dB), dual-core humidification, and automatic expiratory pressure relief, it provides a seamless and comfortable sleep therapy experience.	\N	131	German	The Heyer CPAP 20A Pro and the broader Luvar E Series are developed and manufactured according to rigorous international and European medical standards.\n\nKey Certifications and Quality Standards\n\nCE Marking (CE 0123): The Luvar E Series carries the CE 0123 mark, indicating compliance with European Union health, safety, and environmental protection standards for medical devices.\n\nEU MDR Compliance: These devices are designed and produced by Heyer Medical AG to meet the latest European Medical Device Regulation (MDR) standards.\n\nGerman Engineering Standards: All Luvar devices are developed in Germany by highly qualified engineers using the latest development standards.\n\nStrict Quality Control: Production adheres to stringent German quality standards to ensure high reliability and performance.	published	Healing Technology ΓÇö Heyer CPAP 20A Pro	The Heyer CPAP 20A Pro is a German-engineered respiratory health manager designed to blend into the home like a smart speaker. It features hospital-grade precision accurate to 0.1 cmH2O and an intelligent CareRamp system that only increases pressure once it detects you have fallen asleep. With its ultra-quiet operation (Γëñ 28 dB), dual-core humidification, and automatic expiratory pressure relief, it provides a seamless and comfortable sleep therapy experience.	128	2026-04-26 04:34:26.623+00	2026-04-09 04:28:09.274+00	\N	\N
31	HF MED HF-L60 L84C LED shadowless operating lamp	HF-L60-L84C	f	HF-L60 L84C	7	27	\N	HF MED HF-L60 L84C LED shadowless operating lamp	Product Overview\nThe HF-L60 L84C LED is a shadowless operating lamp manufactured by SHANGHAI HUIFENG MEDICAL INSTRUMENT CO.,LTD (HFMED). It is designed as an ideal surgical light solution to meet the diverse requirements of general surgery.\nKey Features\nAdvanced Lighting Control: The lamp features precise dimming control to accommodate various lighting requests. It utilizes high-density light mixing technology to provide both high brightness and high-quality light.\n\nAdjustable Settings: Users can utilize 8 levels of brightness adjustment and 3 levels of color temperature adjustment (3800K to 5000K ┬▒300K). It also features manual mechanical spot size adjustment ranging from 160mm to 200mm.\n\nENDO Mode: The lamp is equipped with a one-button dim light setting, specifically designed as an Endoscope Mode. This allows surgeons to quickly switch from general mode without interfering with their field of vision during tissue observation.\n\nSuperior Thermal Management: An original thermal management system is built in to effectively reduce the temperature of the chip core. It uses a cast high-heat-conducting aluminum alloy radiator to instantly derive heat, which effectively reduces the lamp's temperature and improves its service life.\n\nHygienic Design: The streamlined lamp body features a superior laminar flow design. This careful assembly increases airflow efficiency, helping to remove dust and bacteria from around the lamp.\n\nSterilizable Handle: The lamp includes a removable handle that can withstand high-temperature sterilization. This ensures doctors and nurses can safely and conveniently control the light's direction and depth.	The HF-L60 L84C LED is a shadowless operating lamp manufactured by HFMED, designed to meet the diverse needs of general surgery.\n\nKey Highlights:\nHigh-Quality Lighting: Delivers an illuminance of up to roughly 160,000 Lux and features an excellent color rendering index (Ra) of 96 to 100.\n\nCustomizable Control: Offers 8 brightness levels, 3 color temperature settings ranging from 3800K to 5000K, and an adjustable spot diameter of 160-200mm.\n\nSpecialized Modes: Features a one-button "ENDO Mode" that dims the light for endoscopic procedures, allowing surgeons to observe tissue without visual interference.\n\nDurability & Hygiene: Built with a high-heat-conducting aluminum alloy radiator for efficient cooling, a streamlined laminar flow design to help remove bacteria and dust, and a removable handle that can be sterilized at high temperatures.	\N	155	China	CE Mark: Specifically indicated on the HF-L60 L84C LED product document.\n\nISO 9001 & ISO 13485: Certified for general and medical device quality management systems.\n\nFDA: Certified to meet United States Food and Drug Administration standards.\n\nSGS: Verified and inspected for product quality and safety compliance.\n\nMDR / MDA: Compliant with international Medical Device Regulations.\n\nCredit Rating: Recognized locally in Shanghai as a Quality Credit A-level enterprise for medical device manufacturing.	published	Healing Technology ΓÇö HF MED HF-L60 L84C LED shadowless operating lamp	The HF-L60 L84C LED is a shadowless operating lamp manufactured by HFMED, designed to meet the diverse needs of general surgery.\n\nKey Highlights:\nHigh-Quality Lighting: Delivers an illuminance of up to roughly 160,000 Lux and features an excellent color rendering index (Ra) of 96 to 100.\n\nCustomizable Control: Offers 8 brightness levels, 3 color temperature settings ranging from 3800K to 5000K, and an adjustable spot diameter of 160-200mm.\n\nSpecialized Modes: Features a one-button "ENDO Mode" that dims the light for endoscopic procedures, allowing surgeons to observe tissue without visual interference.\n\nDurability & Hygiene: Built with a high-heat-conducting aluminum alloy radiator for efficient cooling, a streamlined laminar flow design to help remove bacteria and dust, and a removable handle that can be sterilized at high temperatures.	155	2026-04-28 08:07:58.403+00	2026-04-15 10:54:14.981+00	\N	\N
24	SX-700 LED Shadowless Operating Light	SuxinmedicalSX-700	t	SX-700	7	7	\N	Suxin Medical SX-700 Shadowless Operating Light	Product Overview\nProduct Name: Color Led Two Controls System Ceiling Shadowless Lamp Operating Light\n\nModel: SX-700\n\nBrand: Suxin Medical\n\nManufacturer: Jiangsu Suxin Medical Equipment Co., Ltd.\n\nKey Features\nSanitary Design: Features a fully enclosed, streamlined structure designed to meet the laminar flow purification and hygiene requirements of modern operating rooms.\n\nFlexible Positioning: Utilizes a professionally designed six-joint suspension system with a 340┬░ rotating arm. This ensures flexible, portable, and natural positioning without any drifting.\n\nAdvanced Cold Lighting: Employs novel German cold lighting technology. It produces no infrared or ultraviolet radiation and prevents temperature rise on the surgical team's heads.\n\nLong Lifespan: The LED cold lighting source has a remarkably long service life of up to 80,000 hours, eliminating the need for bulb replacements and providing an eco-friendly and economical solution.\n\nAdjustable Lighting: The color temperature is adjustable from 3700K to 5000K, which helps in making more accurate diagnoses and reduces visual fatigue for doctors. It also features a specific endoscope control mode for different surgical lighting needs.\n\nOptical Precision: Each LED is equipped with a lens refracting and luminous system. The overall design creates a uniform light column with high brightness, ensuring a soft, deep-gathering effect for both high-brightness and high-depth surgical needs.\n\nControls: Features an easy-to-use button-type control panel.	The SX-700 is an advanced, ceiling-mounted surgical light designed to meet the strict hygiene and illumination standards of modern operating rooms. Powered by German cold LED technology, it delivers high-depth, uniform lighting with zero heat, infrared, or UV radiation.\n\nKey Highlights:\n\nUltra-Long Lifespan: Up to 80,000 hours of continuous use with zero bulb replacements.\n\nPrecision Lighting: Adjustable color temperature (3700KΓÇô5000K) to reduce eye strain, plus a dedicated endoscope mode.\n\nSeamless Mobility: A 6-joint suspension system with a 340┬░ rotating arm ensures smooth, drift-free positioning.\n\nSanitary Design: Fully enclosed and streamlined to support laminar flow purification in surgical environments.	\N	159	China	CE Mark (CE-MDR): Certified compliant with European Medical Device Regulations, ensuring the products meet rigorous health, safety, and environmental protection standards for the European Economic Area.\nISO 13485 (EN ISO 13485:2016): Certified under the international standard for quality management systems specifically for the design and manufacture of medical devices.\nISO 9001: Certified for overall quality management systems, demonstrating consistent manufacturing and strict quality control processes.\nIEC 60601-1 / EN 60601-1:2016: Fully compliant with the internationally recognized general standards for the basic safety and essential performance of medical electrical equipment.\nIEC 60601-2-41: Compliant with the specific international safety and performance standards tailored for surgical luminaires (operating lights) and luminaires for diagnosis.\nFree Sales Certificate (FSC): Approved for international export and commercial distribution.\nJiangsu Provincial FDA Approval: Fully licensed and approved by the regional Food and Drug Administration in their manufacturing jurisdiction (Jiangsu Province, China).	published	Healing Technology ΓÇö Suxin Medical SX-700 Shadowless Operating Light	The SX-700 is an advanced, ceiling-mounted surgical light designed to meet the strict hygiene and illumination standards of modern operating rooms. Powered by German cold LED technology, it delivers high-depth, uniform lighting with zero heat, infrared, or UV radiation.\n\nKey Highlights:\n\nUltra-Long Lifespan: Up to 80,000 hours of continuous use with zero bulb replacements.\n\nPrecision Lighting: Adjustable color temperature (3700KΓÇô5000K) to reduce eye strain, plus a dedicated endoscope mode.\n\nSeamless Mobility: A 6-joint suspension system with a 340┬░ rotating arm ensures smooth, drift-free positioning.\n\nSanitary Design: Fully enclosed and streamlined to support laminar flow purification in surgical environments.	40	2026-04-29 06:29:06.523+00	2026-04-09 04:28:09.626+00	\N	\N
6	Infant Radiant Warmer Ecosy630 	Ecosy630Warmer	f	Ecosy630Warmer	2	5	\N	Infant Radiant Warmer Ecosy630 	Ecosy 630 Infant Radiant Warmer\nThe Ecosy 630 is a sophisticated infant radiant warmer designed to provide a stable and controlled thermal environment for newborns. Combining precise temperature management with a user-friendly interface, it ensures clinical efficiency while maintaining the highest standards of safety for neonatal care.\n\nKey Features\nPrecision Thermal Control: Equipped with a far-infrared quartz heating tube, the Ecosy630 offers three operating modes: Baby (Servo), Manual, and Pre-heating, allowing for flexible temperature management tailored to the infantΓÇÖs needs.\n\nFlexible Heating Module: The heating head is highly adjustable, featuring a ┬▒120┬░ horizontal rotation and a ┬▒30┬░ vertical tilt. This allows medical staff to move the heater out of the way for X-rays or procedures without losing the thermal environment.\n\nAdvanced Safety Alarms: Includes comprehensive audible and visual alarms for temperature deviations, sensor failure, and power interruptions. The Hand-Free Alarm Silence sensor allows clinicians to mute alarms with a simple wave, maintaining a sterile environment.\n\nIntegrated Clinical Timers: Features built-in APGAR and CPR timers with audible signals at 1, 5, and 10 minutes to assist medical teams during critical resuscitation moments.\n\nErgonomic Design: The bed features a tilting mechanism (┬▒13┬░) and transparent guard doors on four sides with dampers for silent operation, minimizing noise disturbance for the infant.	Ecosy630 Infant Radiant Warmer\nThe Ecosy 630 is a sophisticated infant radiant warmer designed to provide a stable and controlled thermal environment for newborns. Combining precise temperature management with a user-friendly interface, it ensures clinical efficiency while maintaining the highest standards of safety for neonatal care.	\N	178	China	Certification Focus Areas ISO 13485\n\nMedical Device Quality Management \n\nCE Mark Safety and Performance (EU Standards)\n\nIEC 60601-Electrical Safety for Medical Devices\n\nIEC 60601-2-21 Specific Safety for Infant Radiant Warmers	published	Healing Technology ΓÇö Infant Radiant Warmer Ecosy630 	Ecosy630 Infant Radiant Warmer\nThe Ecosy 630 is a sophisticated infant radiant warmer designed to provide a stable and controlled thermal environment for newborns. Combining precise temperature management with a user-friendly interface, it ensures clinical efficiency while maintaining the highest standards of safety for neonatal care.	178	2026-04-29 07:48:18.483+00	2026-04-09 04:28:09.012+00	\N	\N
23	Heyer Purelit OL9500	Purelit-OL9500	f	Purelit-OL9500	7	2	\N	Heyer Purelit OL9500	The Purelit OL9500 series by Heyer is an advanced surgical lighting system designed to meet the needs of high-end medical users. The product holds 15 patents and has been recognized with the 2010 Red Star Design Award and the 2013 High-tech Produce Star by the Beijing Government.\n\nKey Features:\nDesign & Hygiene:\nThe light head features an ultra-thin, streamlined aluminum alloy shell that provides low wind resistance, allowing stable laminar airflow to reach the surgical wound and prevent cross-infection.\nThe aluminum shell also offers outstanding heat dissipation to extend the life of the LEDs.\nIt includes a detachable and sterilizable PSU Polysulfone handle that can withstand heating up to 135┬░C.\n\nLighting Quality & Precision:\nThe system delivers an all-dimensional, shadowless lighting experience with a white LED light that eliminates colored cast shadows.\nA multi-lens structure with patented focus technology can deliver a light spot diameter of up to 250mm and an illumination depth of up to 1,400mm.\nIt includes two independent LED bulbs specifically to provide basic illumination for endoscopic surgeries.\nThe synthetic resin light screen features anti-infrared coating (to prevent tissue desiccation), 2H hardness scratch-proofing, and an anti-static coating (to prevent floating particle absorption).\n\nControl & Safety:\nA microprocessor control panel allows surgeons to easily adjust lighting intensity in 10 levels, from 30% to 100%.\nThe multi-lens matrix structure is designed to prevent a total blackout if a single light module fails, ensuring patient safety during operations.\nIt uses a German-imported spring arm that maintains its position without drifting.\n\nEfficiency & Adaptability:\nThe LED bulbs have a long life expectancy of up to 70,000 hours, making them reliable and cost-effective with low power consumption.\nThe system is HD camera compatible and supports low-height ceiling mounting.\n\nTechnical Specifications\nThe series includes two main models: the larger OLSS70 (featuring 20 matrix lens modules and 160 LEDs) and the smaller OL9550 (featuring 10 matrix lens modules and 80 LEDs).\nHere is a comparison of their technical specifications:\nSpecification\t  OLSS70\t    OL9550\nDiameter of lights\t700 mm\t500 mm\nIllumination\t160,000 Lux\t160,000 Lux\nColor temperature\t4,300 K\t4,300 K\nColor rendering Index (Ra)\t95%\t95%\nDiameter of light spot\t250 mm\t200 mm\nLED power\t160 W\t80 W\nIllumination depth (60%)\t2600 mm\t2400 mm\nLED service life\t70,000 hours\t70,000 hours\nBackground light illumination\t230 Lux\t230 Lux\nQuantity of LED bulbs\t160\t80\nMinimum installation height\t2,800 mm\t2,800 mm\nIllumination adjustment\t30% to 100%\t30% to 100%\nTemp rise (surgical area surface)\t15┬▒0.5 ┬░C\t15┬▒0.5 ┬░C\nTemp rise (surgeon's head)\t1┬▒0.5 ┬░C\t1┬▒0.5 ┬░C	The Purelit OL9500 Series by Heyer is a premium LED surgical lighting system that delivers up to 160,000 Lux of shadowless, true-color illumination. Designed for the rigorous demands of modern operating rooms, it combines exceptional optical clarity with advanced safety and hygiene features.\n\nCore Highlights:\n\nPrecision Optics: Delivers a 95% Color Rendering Index (CRI) for accurate tissue visualization, with a fail-safe multi-lens matrix that prevents complete blackouts if a single LED fails.\n\nEnhanced Hygiene & Safety: Features an ultra-thin, aerodynamic profile that supports sterile laminar airflow. Its specialized light screen repels dust, resists scratches, and blocks infrared heat to prevent patient tissue desiccation.\n\nErgonomic & Durable: Equipped with a drift-free German spring arm, a sterilizable handle, and energy-efficient LEDs that boast a 70,000-hour lifespan.	\N	44	German	Certifications & Awards\nBacked by world-class manufacturing standards and recognized for innovation, the Purelit OL9500 Series meets the strictest regulatory requirements for modern surgical environments:\n\nGlobal Compliance: CE Marked and manufactured under ISO 13485 & ISO 9001 certified quality management systems.\n\nOR Safety Standard: Class I medical electrical safety rating with IPX2 protection against fluid ingress.\n\nPatented Innovation: Protected by 15 advanced technology patents.\n\nAward-Winning Design: Winner of the Red Star Design Award and recognized as a "High-Tech Produce Star" for its advanced aerodynamic and optical engineering.	published	Healing Technology ΓÇö Heyer Purelit OL9500	The Purelit OL9500 Series by Heyer is a premium LED surgical lighting system that delivers up to 160,000 Lux of shadowless, true-color illumination. Designed for the rigorous demands of modern operating rooms, it combines exceptional optical clarity with advanced safety and hygiene features.\n\nCore Highlights:\n\nPrecision Optics: Delivers a 95% Color Rendering Index (CRI) for accurate tissue visualization, with a fail-safe multi-lens matrix that prevents complete blackouts if a single LED fails.\n\nEnhanced Hygiene & Safety: Features an ultra-thin, aerodynamic profile that supports sterile laminar airflow. Its specialized light screen repels dust, resists scratches, and blocks infrared heat to prevent patient tissue desiccation.\n\nErgonomic & Durable: Equipped with a drift-free German spring arm, a sterilizable handle, and energy-efficient LEDs that boast a 70,000-hour lifespan.	\N	2026-04-19 06:54:46.571+00	2026-04-09 04:28:09.583+00	\N	\N
3	Anesthesia Machine BD SS (Model HT-145S)	AnesthesiaMachine-BD	f	Anesthesia-Machine-BD	7	31	\N	Anesthesia Machine BD SS (Model HT-145S)	Anesthesia Machine BD SS (Model HT-145S)\nThe Anesthesia Machine BD SS is a high-performance surgical solution featuring a premium stainless steel (SS) body designed for durability and hygiene in clinical environments. This model provides precise control over gas administration while incorporating essential safety protocols to ensure patient well-being during anesthesia.\n\nKey Features\nPrecise Gas Monitoring: Includes a four-tube rotameter system dedicated to Oxygen and Nitrous Oxide for accurate flow adjustment.\n\nAdvanced Vaporizer Compatibility: Supports both Isoflurane and Sevoflurane vaporizers to meet diverse surgical requirements.\n\nCritical Safety Alarms: Features an automatic $N_2O$ lock system and an integrated oxygen failure alarm system.\n\nEmergency Oxygen Access: Equipped with a front-panel emergency oxygen flush valve and a dedicated secondary flowmeter for emergency oxygen supply.\n\nHigh-Quality Pressure Regulation: Features high-pressure regulators for Oxygen and Nitrogen manufactured in Korea.\n\nBackflow Prevention: Utilizes a non-return pressure relief valve to minimize the risk of gas back-flow.\n\nStability & Mobility: Mounted on four lockable caster rubber wheels for smooth transport and secure stationary use.	Anesthesia Machine BD SS (Model HT-145S)\nThe Anesthesia Machine BD SS is a high-performance surgical solution featuring a premium stainless steel (SS) body designed for durability and hygiene in clinical environments. This model provides precise control over gas administration while incorporating essential safety protocols to ensure patient well-being during anesthesia.	\N	189	Bangladesh	\N	published	Healing Technology ΓÇö Anesthesia Machine BD SS (Model HT-145S)	Anesthesia Machine BD SS (Model HT-145S)\nThe Anesthesia Machine BD SS is a high-performance surgical solution featuring a premium stainless steel (SS) body designed for durability and hygiene in clinical environments. This model provides precise control over gas administration while incorporating essential safety protocols to ensure patient well-being during anesthesia.	189	2026-04-29 10:14:48.02+00	2026-04-09 04:28:08.872+00	\N	\N
45	Silicone Manual Resuscitator	Ambu-Bag	f	Ambu-Bag	9	31	\N	Silicone Manual Resuscitator	Silicone Manual Resuscitator (Ambu Bag) - Adult & Child Sizes\nThe Silicone Manual Resuscitator is an essential medical device designed for manual ventilation in emergency situations or clinical environments. These kits are engineered for durability, safety, and precision, catering to both adult and pediatric patient needs.\n\nCommon Features\nPremium Silicone Material: Manufactured from high-quality, medical-grade silicone for superior elasticity and longevity.\n\nAutoclavable & Reusable: Unlike PVC models, these silicone bags and masks are typically designed to withstand sterilization for repeated use.\n\nSuperior Control: The soft-touch bulb provides excellent tactile feedback, allowing clinicians to monitor lung compliance and resistance during ventilation.\n\nIntegrated Safety Valve: Equipped with a pressure-limiting valve to prevent over-inflation and ensure patient safety.\n\nUniversal Compatibility: Features standard connectors for oxygen tubing, reservoir bags, and PEEP valves.	Silicone Manual Resuscitator (Ambu Bag) - Adult & Child Sizes\nThe Silicone Manual Resuscitator is an essential medical device designed for manual ventilation in emergency situations or clinical environments. These kits are engineered for durability, safety, and precision, catering to both adult and pediatric patient needs.	\N	225	China	\N	published	Healing Technology ΓÇö Silicone Manual Resuscitator	Silicone Manual Resuscitator (Ambu Bag) - Adult & Child Sizes\nThe Silicone Manual Resuscitator is an essential medical device designed for manual ventilation in emergency situations or clinical environments. These kits are engineered for durability, safety, and precision, catering to both adult and pediatric patient needs.	225	2026-05-04 06:27:11.805+00	2026-05-04 05:59:47.99+00	2200	\N
46	Breast Pump	Breast-Pump	f	Breast-Pump	1	31	\N	Breast Pump	Electric Breast Pump\nThe Ucare Electric Breast Pump is designed to provide a comfortable, efficient, and personalized experience for breastfeeding mothers. This advanced, rechargeable device combines medical-grade technology with a user-friendly design to support a seamless nursing journey.\n\nFour Intelligent Operating Modes\nThe Ucare breast pump features four distinct modes to mimic a babyΓÇÖs natural nursing rhythm and maximize comfort:\n\nMassage Mode: Gently stimulates the breast to encourage milk let-down.\n\nBreast-Feeding Mode: Provides a natural rhythm for steady milk expression.\n\nBreast Pumping Mode: A standard efficient mode for routine milk collection.\n\nDeep Breast Pumping: Delivers powerful yet gentle suction for more thorough expression.\n\nKey Features & Benefits\nSmart LED Display: A clear digital interface allows you to monitor your current mode and suction level at a glance.\n\nOne-Touch Controls: Easily switch between modes using the dedicated "M" key and customize intensity with intuitive "+" and "ΓÇô" buttons.\n\nHigh-Capacity Bottle: Includes a 180 ml (6 oz) feeding bottle with clear measurement markings for easy tracking of milk volume.\n\nPortable & Rechargeable: The compact, integrated motor unit allows for hands-on mobility, making it ideal for use at home, work, or while traveling.\n\nSafe & Certified: Built to meet international standards, the device is FDA, CE, and RoHS certified, ensuring it is made from safe, BPA-free materials for both mother and baby.	Electric Breast Pump\nThe Ucare Electric Breast Pump is designed to provide a comfortable, efficient, and personalized experience for breastfeeding mothers. This advanced, rechargeable device combines medical-grade technology with a user-friendly design to support a seamless nursing journey.	\N	244	China	FDA, CE, FC, RoHS	published	Healing Technology ΓÇö Breast Pump	Electric Breast Pump\nThe Ucare Electric Breast Pump is designed to provide a comfortable, efficient, and personalized experience for breastfeeding mothers. This advanced, rechargeable device combines medical-grade technology with a user-friendly design to support a seamless nursing journey.	232	2026-05-06 07:25:45.184+00	2026-05-06 06:46:09.146+00	1400	\N
34	Five-Function Hospital Bed Electric 	Hospital-Bed	f	Hospital-Bed	5	31	\N	Five-Function Hospital Bed Electric 	Electric Five-Function Hospital Bed\nThe Electric Five-Function Hospital Bed (Model: A01/EIV-10) is a world-class clinical solution designed to provide optimal comfort, versatility, and safety for patients in healthcare facilities. Manufactured by Boxin, this high-performance bed features a robust design tailored for ease of use by both caregivers and patients.\n\nKey Features\n\nFive Integrated Functions: Provides advanced electrical adjustments to support patient positioning, recovery, and clinical accessibility.\n\nDurable Construction: Features high-quality ABS headboards and footboards that are both durable and easy to sanitize.\n\nAdvanced Safety Rails: Equipped with PP (Polypropylene) guardrails to ensure patient security and prevent accidental falls.\n\nSilent & Secure Mobility: Mounted on silent wheels with a central brake system, allowing for smooth, quiet transport and reliable stability when stationary.\n\nIncluded Accessories: Comes standard with an I.V. pole for essential medical support.	Electric Five-Function Hospital Bed\nThe Electric Five-Function Hospital Bed (Model: A01/EIV-10) is a world-class clinical solution designed to provide optimal comfort, versatility, and safety for patients in healthcare facilities. Manufactured by Boxin, this high-performance bed features a robust design tailored for ease of use by both caregivers and patients.	\N	192	China	\N	published	Healing Technology ΓÇö Five-Function Hospital Bed Electric 	Electric Five-Function Hospital Bed\nThe Electric Five-Function Hospital Bed (Model: A01/EIV-10) is a world-class clinical solution designed to provide optimal comfort, versatility, and safety for patients in healthcare facilities. Manufactured by Boxin, this high-performance bed features a robust design tailored for ease of use by both caregivers and patients.	192	2026-04-29 11:02:41.536+00	2026-04-29 11:02:22.449+00	\N	\N
5	LED Phototherapy BN300	LED-Phototherapy	f	LED-Phototherapy	2	5	\N	LED Phototherapy BN300	BN300 LED Phototherapy Unit\nThe BN300 is an intensive neonatal phototherapy solution designed to provide highly effective treatment for newborn jaundice. Engineered for versatility, the unit features a height-adjustable trolley that allows it to be used seamlessly with infant incubators, radiant warmers, and baby cribs.\n\nKey Features\nAdvanced Light Source: Utilizes 16 super blue LED bulbs for high-intensity treatment and 4 white LED bulbs for patient examination.\n\nLong Service Life: The light source is rated for 50,000 hours of operation.\n\nTouch Interface: Equipped with a 3.5-inch LCD TFT touch screen for intuitive control.\n\nPrecise Monitoring: Displays a real-time clock and date, and includes a 0ΓÇô999h treatment timer with a 48h down-counter.\n\nSafety First: Provides a light source that is heat, UV, and IR emission-free to protect sensitive neonatal skin.\n\nOptimal Positioning: Features a 360┬░ rotatable head module and an adjustable trolley for flexible clinical application.\n\nClinical Convenience: Includes an ergonomic handle for easy mobility, a dedicated storage basket for accessories, and a tailored holder for the power adapter.	BN300 LED Phototherapy Unit\nThe BN300 is an intensive neonatal phototherapy solution designed to provide highly effective treatment for newborn jaundice. Engineered for versatility, the unit features a height-adjustable trolley that allows it to be used seamlessly with infant incubators, radiant warmers, and baby cribs.	\N	181	China	ISO 13485 Medical Device Quality Management\n\nCE Mark Safety and Performance (EU Standards)\n\nIEC 60601-1 Electrical Safety for Medical Devices\n\nIEC 60601-2-21 Specific Safety for Infant Radiant Warmers	published	Healing Technology ΓÇö LED Phototherapy BN300	LED Phototherapy Unit BN300 \nThe BN300 is an intensive neonatal phototherapy solution designed to provide highly effective treatment for newborn jaundice. Engineered for versatility, the unit features a height-adjustable trolley that allows it to be used seamlessly with infant incubators, radiant warmers, and baby cribs.	181	2026-04-29 08:10:12.726+00	2026-04-09 04:28:08.963+00	\N	\N
37	Anesthesia Face Masks	Face-Masks	f	Face-Masks	9	31	\N	Anesthesia Face Masks	Premium Transparent Anesthesia Face Masks\nEnsure a secure, comfortable fit for every patient with our comprehensive range of high-quality anesthesia face masks. Designed with clinical precision, these masks feature a transparent shell for continuous visual monitoring and a soft, contoured cushion to provide an airtight seal with minimal pressure.\n\nKey Features\nUniversal Sizing: A complete range of seven sizes (0# to 6#) to accommodate neonates through extra-large adults.\n\nClear Visibility: The crystal-clear dome allows medical professionals to monitor the patientΓÇÖs lip color and breathing status at a glance.\n\nColor-Coded Hooks: Integrated color-coded rings for quick and easy size identification during fast-paced clinical procedures.\n\nPatient Comfort: Ergonomic design with a soft, inflatable cushion that conforms to various facial structures for a leak-free fit.\n\nStandard Connections: Features a 22mm/15mm connector to ensure compatibility with standard breathing circuits and manual resuscitators.	Premium Transparent Anesthesia Face Masks\nEnsure a secure, comfortable fit for every patient with our comprehensive range of high-quality anesthesia face masks. Designed with clinical precision, these masks feature a transparent shell for continuous visual monitoring and a soft, contoured cushion to provide an airtight seal with minimal pressure.	\N	197	China	\N	published	Healing Technology ΓÇö Anesthesia Face Masks	Premium Transparent Anesthesia Face Masks\nEnsure a secure, comfortable fit for every patient with our comprehensive range of high-quality anesthesia face masks. Designed with clinical precision, these masks feature a transparent shell for continuous visual monitoring and a soft, contoured cushion to provide an airtight seal with minimal pressure.	197	2026-04-30 05:45:32.388+00	2026-04-30 05:31:02.685+00	200	\N
38	Reusable Electrosurgical Grounding Pad (Neutral Electrode)	Patient-Plate	f	Patient-Plate	9	31	\N	Reusable Electrosurgical Grounding Pad (Neutral Electrode)	Reusable Electrosurgical Grounding Pad (Neutral Electrode)\nEnsure patient safety and optimal surgical performance with our high-quality Reusable Electrosurgical Grounding Pad. Specifically designed for use with electrosurgical units (ESU), this silicone-based neutral electrode provides a reliable return path for high-frequency electrical currents, minimizing the risk of accidental burns during monopolar surgery.\n\nKey Features\nDurable Silicone Construction: Crafted from medical-grade, conductive silicone that is flexible and easy to clean for repeated clinical use.\n\nUniversal Compatibility: Equipped with a standard connector compatible with most major electrosurgical generators and workstations.\n\nIntegrated Long-Reach Cable: Features a generous, high-insulation cable to allow for flexible positioning and movement within the operating theater.\n\nSafety First: Engineered to provide a large surface area for uniform current distribution, ensuring patient safety throughout the procedure.\n\nEco-Friendly & Cost-Effective: A sustainable alternative to disposable pads, reducing medical waste and long-term operating costs.	Reusable Electrosurgical Grounding Pad (Neutral Electrode)\nEnsure patient safety and optimal surgical performance with our high-quality Reusable Electrosurgical Grounding Pad. Specifically designed for use with electrosurgical units (ESU), this silicone-based neutral electrode provides a reliable return path for high-frequency electrical currents, minimizing the risk of accidental burns during monopolar surgery.\n	\N	202	China	\N	published	Healing Technology ΓÇö Reusable Electrosurgical Grounding Pad (Neutral Electrode)	Reusable Electrosurgical Grounding Pad (Neutral Electrode)\nEnsure patient safety and optimal surgical performance with our high-quality Reusable Electrosurgical Grounding Pad. Specifically designed for use with electrosurgical units (ESU), this silicone-based neutral electrode provides a reliable return path for high-frequency electrical currents, minimizing the risk of accidental burns during monopolar surgery.\n	202	2026-04-30 06:08:34.492+00	2026-04-30 05:48:15.712+00	4000	\N
15	Aeonmed AS100A Auto CPAP	AS100A-AutoCPAP	f	AS100A-AutoCPAP	4	3	\N	Aeonmed AS100A Auto CPAP	AS100A Auto CPAP: Choose a Better Product for a Higher Quality Sleep\nBacked by AEONMEDΓÇÖs more than 20 years of expertise in respiratory research, the AS100A Auto CPAP is engineered to deliver a superior, high-precision treatment experience. This advanced device is designed to automatically adjust treatment pressure according to the patient's breathing airflow and airway conditions, ensuring maximum effectiveness and comfort throughout the night.\n\nKey Features & Benefits\nIntelligent CSA Identification: The AS100A effectively identifies Central Sleep Apnea (CSA) and Obstructive Sleep Apnea (OSA) to reduce improper pressure rises that could negatively affect the patient.\n\nAS-Dry Technology: Following humidified treatment, the turbine blows at a lower speed for 30 minutes to cool down and dry the airway and water tank. This maintains a dry environment, protects the machine against moisture, reduces bacterial breeding, and ensures a healthy treatment experience.\n\nAS-Elex Expiration Pressure Release: To increase patient compliance and reduce discomfort, this feature provides 3 different grades of pressure release during expiration.\n\nSmooth Breathing Shifts: The unique tracking system follows every breath closely, guaranteeing super smooth shifts between inspiration and expiration.\n\nReal-Time Manual Titration: This function allows doctors to complete the clinical titration process without having to stop the patient's treatment.\n\nIntuitive Touch Screen: A 3.5-inch touch screen ensures a fashionable, high-tech view while simplifying operation and report reviews.\n\nComprehensive Data Storage: An included SD card stores up to 5 years of therapy data. Users can easily read their P90 pressure, AHI, SNI, CAI, AI, Average pressure, and Leak data directly on the screen or through PC software.\n\nSuperior Air Filtration: An optional folded PM2.5/Pollen filter (unfolding up to 20cm2) ensures efficient dust and pollen filtering to provide clean air, protect the inner airway of the device, and prolong its working life.\n\nCompact and Travel-Ready: With a light and compact design, the whole device weighs just 1.3 kg, making it a great choice for both home and travel use.	AEONMED AS100A Auto CPAP\nThe AEONMED AS100A Auto CPAP is a premium, travel-friendly respiratory device engineered for superior sleep therapy. It automatically adjusts pressure to match your breathing patterns, featuring advanced CSA identification and AS-Elex expiration relief for maximum comfort. Complete with an intuitive 3.5-inch touch screen, ultra-quiet operation (Γëñ 30dB), and innovative AS-Dry technology to maintain a clean, moisture-free system, the AS100A delivers high-precision, comfortable treatment both at home and on the go.	\N	205	China	Aeonmed AS100A Auto CPAP indicate that the device carries the following major medical and quality certifications:\n\nCE Mark (EU): Certified to meet European health, safety, and environmental protection standards for medical devices.\n\nFDA Approval (U.S.): Approved/cleared by the U.S. Food and Drug Administration for medical use.\n\nISO Certifications: Aeonmed manufactures its devices under strict quality control standards, holding certificates such as ISO 13485:2016 (Quality Management Systems for Medical Devices) and ISO 9001:2015.	published	Healing Technology ΓÇö Aeonmed AS100A Auto CPAP	AEONMED AS100A Auto CPAP\nThe AEONMED AS100A Auto CPAP is a premium, travel-friendly respiratory device engineered for superior sleep therapy. It automatically adjusts pressure to match your breathing patterns, featuring advanced CSA identification and AS-Elex expiration relief for maximum comfort. Complete with an intuitive 3.5-inch touch screen, ultra-quiet operation (Γëñ 30dB), and innovative AS-Dry technology to maintain a clean, moisture-free system, the AS100A delivers high-precision, comfortable treatment both at home and on the go.	117	2026-04-30 06:22:12.024+00	2026-04-09 04:28:09.341+00	\N	\N
39	Breathing Bag	Breathing-Bag	f	Breathing-Bag	9	31	\N	Breathing Bag	Premium Latex-Free Breathing Bags\nOur high-quality breathing bags are an essential component for anesthesia delivery and manual ventilation. Designed for reliability and clinical precision, these bags provide excellent tactile feedback, allowing healthcare professionals to accurately monitor patient lung compliance and spontaneous respiration.\n\nKey Features\nLatex-Free Construction: Manufactured from high-quality, medical-grade materials to prevent allergic reactions in sensitive patients and staff.\n\nStandard Connector: Features a universal 22mm bushing to ensure a secure and leak-free fit with standard anesthesia circuits and manual resuscitators.\n\nEnhanced Tactile Feel: The supple material provides superior "hand feel," essential for clinicians to gauge pressure and volume during manual ventilation.\n\nUniform Expansion: Designed for consistent inflation and deflation, providing a steady and predictable performance during use.\n\nDurable Design: Reinforced at the neck and tail to withstand the rigors of clinical environments.	Premium Latex-Free Breathing Bags\nOur high-quality breathing bags are an essential component for anesthesia delivery and manual ventilation. Designed for reliability and clinical precision, these bags provide excellent tactile feedback, allowing healthcare professionals to accurately monitor patient lung compliance and spontaneous respiration.	\N	213	China	\N	published	Healing Technology ΓÇö Breathing Bag	Premium Latex-Free Breathing Bags\nOur high-quality breathing bags are an essential component for anesthesia delivery and manual ventilation. Designed for reliability and clinical precision, these bags provide excellent tactile feedback, allowing healthcare professionals to accurately monitor patient lung compliance and spontaneous respiration.	214	2026-04-30 06:57:49.648+00	2026-04-30 06:54:19.121+00	200	\N
40	ECG Cable	ECG-Cable	f	ECG-Cable	9	31	\N	ECG Patient Cable	Professional 10-Lead ECG Patient Cable\nThis high-quality 10-lead ECG patient cable is engineered for precision and reliability in clinical diagnostic environments. Designed to provide clear, interference-free signals, it ensures accurate cardiac monitoring and data acquisition for professional healthcare settings.\n\nKey Features\n10-Lead Comprehensive Monitoring: Features a full set of 10 leads (6 chest leads and 4 limb leads) to provide a complete 12-lead ECG view for thorough diagnostic analysis.\n\nUniversal Banana Plug Connectors: Equipped with standard 4.0mm banana plug terminations, ensuring compatibility with a wide range of ECG electrodes and adapters.\n\nColor-Coded & Numbered Leads: Each lead is clearly labeled (e.g., C1-C6, R, L, F, N) and color-coded according to international standards for quick, error-free placement.\n\nIntegrated Shielding: Built with advanced shielding technology to minimize electromagnetic interference (EMI) and noise, delivering a stable and clean waveform.\n\nDurable, Medical-Grade Construction: The cable is jacketed in high-flexibility, medical-grade TPU that is easy to clean, resistant to common clinical disinfectants, and built to withstand frequent use.\n\nSecure Connection: Features a robust 15-pin D-sub main connector with thumb screws for a stable, secure attachment to the ECG machine.	Professional 10-Lead ECG Patient Cable\nThis high-quality 10-lead ECG patient cable is engineered for precision and reliability in clinical diagnostic environments. Designed to provide clear, interference-free signals, it ensures accurate cardiac monitoring and data acquisition for professional healthcare settings.\n	\N	215	China	CE Certified	published	Healing Technology ΓÇö ECG Cable	Professional 10-Lead ECG Patient Cable\nThis high-quality 10-lead ECG patient cable is engineered for precision and reliability in clinical diagnostic environments. Designed to provide clear, interference-free signals, it ensures accurate cardiac monitoring and data acquisition for professional healthcare settings.\n	215	2026-05-02 05:48:47.167+00	2026-05-02 05:38:02.407+00	3000	\N
41	ECG Limb Clamp Electrodes	ECG-Clamp	f	ECG-Clamp	9	31	\N	ECG Limb Clamp Electrodes	Universal ECG Limb Clamp Electrodes (Set of 4)\nThese professional-grade limb clamp electrodes are designed for reliable and accurate ECG/EKG monitoring. Engineered for durability and ease of use, they provide a secure connection for limb lead placement during cardiac diagnostics.\n\nKey Features\nUniversal Compatibility: Designed with high-quality metal studs that are compatible with both snap and "banana" type lead wire connectors.\n\nColor-Coded for Precision: The set includes four distinct colors (Black, Yellow, Red, and Green) to ensure quick and accurate placement according to international clinical standards.\n\nErgonomic Clamp Design: Features a spring-loaded clamp mechanism that provides a firm yet comfortable grip on the patient's limbs, ensuring consistent skin contact without excessive pressure.\n\nHigh-Conductivity Surface: Equipped with wide metal contact plates to maximize signal acquisition and reduce impedance for clear, stable ECG tracings.\n\nDurable Construction: Made from high-impact medical-grade plastic, these clamps are built for longevity in high-volume clinical environments and are easy to clean and disinfect.\n\nReusable System: An economical and eco-friendly alternative to disposable electrodes, suitable for routine diagnostic use in clinics and hospitals.	Universal ECG Limb Clamp Electrodes (Set of 4)\nThese professional-grade limb clamp electrodes are designed for reliable and accurate ECG/EKG monitoring. Engineered for durability and ease of use, they provide a secure connection for limb lead placement during cardiac diagnostics.	\N	216	China	\N	published	\N	\N	\N	2026-05-02 05:59:56.958+00	2026-05-02 05:58:24.483+00	1200	\N
42	Suction Chest ECG Electrodes	Suction-Chest	f	Suction-Chest	9	31	\N	Suction Chest ECG Electrodes	Professional Multi-Color Suction Chest ECG Electrodes (Set of 6)\nThese reusable suction chest electrodes are designed for high-precision cardiac monitoring and diagnostic ECG applications. Built with medical-grade materials, they provide a secure and reliable connection for precordial lead placement.\n\nKey Features\nSet of 6 Diagnostic Leads: A complete set of six chest electrodes, essential for comprehensive 12-lead ECG recording.\n\nColor-Coded for Efficiency: Features standard color coding (Red, Yellow, Green, Black, Brown/Orange, and Violet) to facilitate rapid and accurate placement during clinical procedures.\n\nHigh-Quality Suction Bulbs: Equipped with soft, durable silicone bulbs that provide consistent suction for stable skin contact, ensuring clear signal acquisition with minimal artifact interference.\n\nAg/AgCl Conductive Surface: Features a high-conductivity metal cup designed to reduce impedance and deliver superior trace quality for accurate diagnostics.\n\nUniversal Connection: Designed with a standard metal stud that is compatible with most 4.0mm banana plug or snap-type ECG lead wires.\n\nReusable and Durable: Engineered for long-term use in high-traffic medical environments. The electrodes are easy to clean and maintain, offering a cost-effective alternative to disposable options.	Professional Multi-Color Suction Chest ECG Electrodes (Set of 6)\nThese reusable suction chest electrodes are designed for high-precision cardiac monitoring and diagnostic ECG applications. Built with medical-grade materials, they provide a secure and reliable connection for precordial lead placement.	\N	218	China	\N	published	Healing Technology ΓÇö Suction Chest ECG Electrodes	Professional Multi-Color Suction Chest ECG Electrodes (Set of 6)\nThese reusable suction chest electrodes are designed for high-precision cardiac monitoring and diagnostic ECG applications. Built with medical-grade materials, they provide a secure and reliable connection for precordial lead placement.	218	2026-05-02 06:19:12.207+00	2026-05-02 06:15:16.544+00	1200	\N
43	Blood Pressure Cuff	BP-Cuff	f	BP-Cuff	9	31	\N	Blood Pressure Cuff	Universal Replacement Blood Pressure Cuff (27-35cm)\nEnsure accurate health monitoring with this high-quality replacement blood pressure cuff. Designed for durability and precision, this cuff serves as a reliable spare or replacement for your existing digital blood pressure monitor.\n\nKey Features\nPrecision Fit: Designed for arm circumferences ranging from 27cm to 35cm, providing a snug and accurate fit for most adults.\n\nCertified Quality: Features the CE marking, ensuring the product meets high safety, health, and environmental protection requirements.\n\nDurable Construction: Made from comfortable, wipe-clean fabric with reinforced stitching for long-term daily use.\n\nEasy Application: Clear white iconography on the cuff guides correct positioning to ensure consistent and accurate readings every time.\n\nUniversal Compatibility: Equipped with a standard flexible air tube, making it compatible with most major brands of digital upper-arm blood pressure monitors.	Universal Replacement Blood Pressure Cuff (27-35cm)\nEnsure accurate health monitoring with this high-quality replacement blood pressure cuff. Designed for durability and precision, this cuff serves as a reliable spare or replacement for your existing digital blood pressure monitor.\n	\N	219	China	CE Certified	published	Healing Technology ΓÇö Blood Pressure Cuff	Universal Replacement Blood Pressure Cuff (27-35cm)\nEnsure accurate health monitoring with this high-quality replacement blood pressure cuff. Designed for durability and precision, this cuff serves as a reliable spare or replacement for your existing digital blood pressure monitor.\n	219	2026-05-03 06:24:50.288+00	2026-05-03 06:22:49.995+00	500	\N
44	Ventilator Breathing Circuit	Breathing-Circuit	f	Breathing-Circuit	9	31	\N	Ventilator Breathing Circuit	Ventilator Breathing Circuit (Reusable/Disposable)\nThis high-quality ventilator breathing circuit is engineered to provide a safe and effective interface between the patient and the ventilator. Designed for optimal airflow and patient comfort, it is an essential component for anesthesia and respiratory care in clinical settings.\n\nKey Features\n\nOptimized Airflow: The corrugated design ensures maximum flexibility while preventing kinking or occlusion, maintaining a steady flow of respiratory gases.Dual-Limb \n\nConfiguration: Features separate inspiratory and expiratory pathways to manage gas exchange efficiently.Standardized \n\nConnectors: Equipped with universal 22mm/15mm connectors to ensure a secure, leak-free fit with standard ventilators, anesthesia machines, and patient interfaces.\n\nLightweight & Flexible: Minimal weight reduces the pull on the patient's airway, enhancing comfort and stability during ventilation.\n\nIntegrated Y-Piece: Includes a standard Y-connector with a sampling port for easy monitoring of $EtCO_2$ or pressure levels.	Ventilator Breathing Circuit (Reusable/Disposable)\nThis high-quality ventilator breathing circuit is engineered to provide a safe and effective interface between the patient and the ventilator. Designed for optimal airflow and patient comfort, it is an essential component for anesthesia and respiratory care in clinical settings.	\N	223	China	ISO 13485 Quality Standard	published	Healing Technology ΓÇö Ventilator Breathing Circuit	Ventilator Breathing Circuit (Reusable/Disposable)\nThis high-quality ventilator breathing circuit is engineered to provide a safe and effective interface between the patient and the ventilator. Designed for optimal airflow and patient comfort, it is an essential component for anesthesia and respiratory care in clinical settings.	\N	2026-05-03 09:30:04.542+00	2026-05-03 06:36:45.182+00	300	\N
16	SOFT TOUCH ESU 400 Electrosurgical Unit	SOFTTOUCH-ESU400	f	SOFTTOUCH-ESU400	7	30	\N	SOFT TOUCH ESU 400 Electrosurgical Unit	SOFT TOUCH Advanced Electrosurgical Unit (High-Frequency Electrotome)\nProduct Overview\nThe SOFT TOUCH Electrosurgical Unit is a high-performance, multi-function high-frequency electrotome designed to meet the rigorous demands of general departments and diverse surgical needs. Featuring dual-way power output, exceptionally stable performance, and advanced safety mechanisms, the SOFT TOUCH unit delivers the precision and reliability surgeons require. With instantaneous switching between cutting and coagulation, and seamless compatibility with laparoscopic accessories, it is an essential and versatile tool for any modern surgical suite.\n\nKey Features & Benefits\nVersatile Operating Modes: Equipped with 7 distinct working modes to handle a wide variety of surgical procedures:\nPure Cutting, Mixed Cutting 1, Mixed Cutting 2, Standard Coagulation, Spraying Coagulation, Bipolar 1, Bipolar 2\n\nBroad Power Range: Offers unipolar power from 0ΓÇô400W and bipolar power from 0ΓÇô100W, ensuring the precise energy delivery needed for both delicate tissues and heavy-duty surgical tasks.\n\nAdvanced Safety Systems:\n\nNeutral Plate Monitoring: Automatically measures the contact quality between the patient's skin and the neutral plate. The system instantly triggers an alarm and halts output if contact resistance drops below 140 ╬⌐.\n\nShort Circuit Protection: Features a fully suspended CF type design. The host computer actively protects itself to maintain normal, safe output in the rare event of an overload or short circuit during unipolar or bipolar use.\n\nIntelligent Double CPU Design: Built with dual CPUs for highly reliable core storage. The robust database seamlessly manages various impedance changes during use, guaranteeing a highly stable and consistent energy output.\n\nEfficient Workflow: Allows for instantaneous switching between cutting and coagulation output during manual operation, streamlining the surgical process and reducing operative time.	The SOFT TOUCH Advanced Electrosurgical Unit is a versatile, high-frequency surgical electrotome designed for precision and safety across diverse medical departments. Featuring advanced dual-CPU technology, it offers 7 distinct working modesΓÇödelivering up to 400W of unipolar power and 100W of bipolar powerΓÇöfor seamless cutting and rapid coagulation. Equipped with intelligent safety systems like real-time neutral plate monitoring and short-circuit protection, this unit provides surgeons with exceptionally stable and reliable performance for everything from delicate plastic surgery to heavy-duty general and laparoscopic procedures.	\N	185	China	The SOFT TOUCH Electrosurgical Unit is manufactured to meet stringent international medical and electrical safety standards:\n\nGB 9706.1-2007 / IEC 60601-1:1988: General requirements for safety of medical electrical equipment.\n\nGB 9706.4-2009 / IEC 60601-2-2:2006: Special requirements for the safety of high-frequency surgical equipment.\n\nYY 0505-2012 / IEC 60601-1-2:2004: Electromagnetic compatibility requirements and experiments.\n\nYY1057-2016: General specification for medical foot switches.	published	Healing Technology ΓÇö SOFT TOUCH ESU 400 Electrosurgical Unit	The SOFT TOUCH Advanced Electrosurgical Unit is a versatile, high-frequency surgical electrotome designed for precision and safety across diverse medical departments. Featuring advanced dual-CPU technology, it offers 7 distinct working modesΓÇödelivering up to 400W of unipolar power and 100W of bipolar powerΓÇöfor seamless cutting and rapid coagulation. Equipped with intelligent safety systems like real-time neutral plate monitoring and short-circuit protection, this unit provides surgeons with exceptionally stable and reliable performance for everything from delicate plastic surgery to heavy-duty general and laparoscopic procedures.	\N	2026-05-05 07:07:21.61+00	2026-04-09 04:28:09.375+00	\N	\N
\.


--
-- Data for Name: products_applications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_applications (_order, _parent_id, id, department) FROM stdin;
1	17	69e60b601d522a8c2a7de9f9	Operating Rooms (OR): Ideal for delivering and maintaining general inhalation anesthesia during both routine and complex, prolonged surgical procedures.
2	17	69e60bae1d522a8c2a7de9fa	Intensive Care Units (ICU): Capable of providing advanced, reliable respiratory support and mechanical ventilation for critically ill patients.
3	17	69e60bb81d522a8c2a7de9fb	Pediatric and Adult Care: With an expansive and precise tidal volume range (adjustable from 20 to 1500 ml) and versatile ventilation modes, it safely accommodates a broad spectrum of patient demographics, from small children to adults.
4	17	69e60bc01d522a8c2a7de9fc	Low-Flow Anesthesia: Highly optimized for low and ultra-low flow anesthesia techniques. This allows clinics to reduce the consumption of costly anesthetic agents while minimizing environmental exposure in the operating theater.
1	8	69f060d9b0a65f057ad2faaa	General Surgery
2	8	69f060e7b0a65f057ad2faab	  Orthopedics
3	8	69f060eeb0a65f057ad2faac	  Dermatology
4	8	69f060f4b0a65f057ad2faad	  Gynecology
5	8	69f060f9b0a65f057ad2faae	  Cardiovascular
6	8	69f060feb0a65f057ad2faaf	 Surgery
5	17	69e60bc81d522a8c2a7de9fd	Ambulatory Surgery Centers: Perfectly suited for outpatient surgical settings that demand hospital-grade precision, rapid response times, and comprehensive patient monitoring without compromising on space or efficiency.
1	20	69e49f859227f07265a2b770	General Surgery
2	20	69e49fa69227f07265a2b771	Orthopedics
3	20	69e49fa99227f07265a2b772	Gynecology & Urology
4	20	69e49fb99227f07265a2b773	Head & Neck (ENT / Ophthalmology / Neurosurgery)
5	20	69e49fc39227f07265a2b774	Trauma & Emergency
1	5	69f1bcbeaa062f45ef636c14	Neonatal Jaundice Treatment: Provides intensive phototherapy to reduce excessive unconjugated bilirubin levels in newborns.
2	5	69f1bcd3aa062f45ef636c15	Hyperbilirubinemia Management: Uses targeted blue LEDs (400ΓÇô550 nm range) to transform bilirubin molecules into less toxic photoisomers for easier elimination.
3	5	69f1bcdbaa062f45ef636c16	Infant Examination: Features 4 dedicated white LEDs to allow clinicians to perform visual assessments of the infant without interrupting the clinical environment.
1	3	69f1d9ffaa062f45ef636c2e	Surgical Suites: Ideal for operating theaters requiring reliable manual ventilation capabilities.
2	3	69f1da02aa062f45ef636c2f	Intensive Care: Suitable for anesthesia delivery where stainless steel durability is a priority.
3	3	69f1da0eaa062f45ef636c30	Manual Ventilation: Designed specifically for clinical setups utilizing Bain Circuits.
1	14	69e7352ea1dc14718977d686	Complex Obstructive Sleep Apnea (OSA): Provides robust, dual-level positive airway pressure for adult patients who require higher pressure settings, or those who have difficulty tolerating standard single-pressure CPAP therapy.
2	14	69e73539a1dc14718977d687	Pulmonary Insufficiency: Delivers essential, life-enhancing respiratory support for patients managing chronic conditions that compromise breathing capacity, such as Chronic Obstructive Pulmonary Disease (COPD) or restrictive lung disorders.
3	14	69e73541a1dc14718977d688	Targeted Volume Ventilation: Utilizing the advanced VGPS mode, this device is ideal for patients who require a guaranteed tidal volume to maintain safe, stable ventilation throughout the night, adapting seamlessly to any changes in airway resistance.
4	14	69e7354aa1dc14718977d689	Spontaneous and Timed Support: Through its comprehensive S/T modes, it provides automatic backup breaths for patients lacking complete spontaneous respiratory capacity, ensuring continuous and secure ventilation.
3	15	69e72c4d3220efc4a063a3fe	Home & Travel Care: Its ultra-lightweight (1.3 kg) and compact profile make it ideal for nightly domestic use, as well as a highly convenient solution for patients who travel frequently.
4	15	69e72c563220efc4a063a3ff	Clinical Therapy & Titration: Features real-time manual titration, allowing healthcare providers and respiratory therapists to safely adjust clinical pressure settings without stopping the patient's ongoing treatment.
2	41	69f592cf4b30a8ecdb2fbd32	General Practice Clinics  
3	41	69f592d44b30a8ecdb2fbd33	Stress Testing Labs  
4	41	69f592d94b30a8ecdb2fbd34	Emergency Rooms
1	42	69f5974d4b30a8ecdb2fbd3d	Clinical ECG/EKG Diagnostics
1	9	69f05ef0b0a65f057ad2fa97	Neurosurgery
2	9	69f05effb0a65f057ad2fa98	ENT
3	9	69f05f06b0a65f057ad2fa99	Plastic Surgery
4	9	69f05f13b0a65f057ad2fa9a	General Coagulation
1	7	69f0753fc55743eb5a765a49	General Surgery: Efficient for large-area dissection.
2	7	69f07565c55743eb5a765a4a	Orthopedics: Durable enough for heavy-duty cautery.
3	7	69f07576c55743eb5a765a4b	Specialty Use: Precise enough for ENT and Gynecological procedures.
1	18	69e60c2f1d522a8c2a7de9fe	Operating Rooms (OR) / Operation Theaters: The primary setting for administering and maintaining general inhalation anesthesia during routine, complex, or prolonged surgical procedures.
2	18	69e60c3e1d522a8c2a7de9ff	Intensive Care Units (ICU): Can be utilized for advanced respiratory support and mechanical ventilation when necessary.
1	12	69e9fcf757a33abd2212b680	Complex Respiratory Conditions: It is used to treat patients with conditions such as Chronic Obstructive Pulmonary Disease (COPD), obesity hypoventilation syndrome, or central sleep apnea where advanced pressure support is required.
2	12	69e9fcfa57a33abd2212b681	Variable Pressure Needs: The device is utilized in scenarios where patients need different pressures for inhalation (IPAP up to 30 cmH2O) and exhalation (EPAP) to maintain open airways.
3	12	69e9fd0057a33abd2212b682	Volume Assurance: Through VAT (Volume Assured Technology), it is used to ensure a target tidal volume (200ΓÇô1500 ml) is met for every breath, providing consistent ventilation regardless of changes in the patient's effort.
4	12	69e9fd0857a33abd2212b683	Apnea Backup: The Backup Vent function is used as a safety measure to initiate breaths automatically if the user's spontaneous breathing rate drops too low.
1	13	69e9f8ee57a33abd2212b67d	Obstructive Sleep Apnea Management: It provides high-precision pressure (accurate to 0.1 cmH2O) to prevent the collapse of the upper airway, reducing snoring and breathing interruptions.
2	13	69e9f8f257a33abd2212b67e	Hospital-to-Home Transition: Due to its medical-grade calibration standards and advanced ventilator algorithms, it offers a level of treatment precision comparable to hospital-grade ventilators, making it ideal for patients requiring consistent, reliable therapy at home.
3	13	69e9f8f957a33abd2212b67f	Respiratory Waveform Tracking: The device captures and monitors respiratory cycles, allowing healthcare providers or users to review obstructive event trends and treatment efficacy.
1	25	69df2e65b960ec5fbf6307a1	Major Operating Theaters (OTs)
2	25	69df2ebab960ec5fbf6307a3	Cardiothoracic & Neurosurgery
3	25	69df2ebfb960ec5fbf6307a4	Orthopedic Surgery
4	25	69df2ec8b960ec5fbf6307a5	Plastic & Reconstructive Surgery
5	25	69df2ed1b960ec5fbf6307a6	Emergency & Trauma Centers
6	25	69df2edbb960ec5fbf6307a7	Ambulatory Surgical Centers (ASCs)
7	25	69df2ee5b960ec5fbf6307a8	Advanced Veterinary Hospitals
3	18	69e60c461d522a8c2a7dea00	Ambulatory Surgery Centers: Suitable for outpatient surgical clinics that require reliable, high-precision anesthesia delivery and patient monitoring.
4	18	69e60c4e1d522a8c2a7dea01	Diverse Patient Demographics: With a highly adjustable tidal volume (50 to 1500 ml) and versatile ventilation modes, the machine is fully capable of accommodating both adult and pediatric patients.
5	18	69e60c561d522a8c2a7dea02	Low-Flow Anesthesia: Specifically optimized for low and ultra-low flow anesthesia techniques, which helps reduce anesthetic gas consumption and lowers the risk of environmental contamination in the surgical suite.
1	6	69f1b718aa062f45ef636bfe	Neonatal Intensive Care Units (NICU)  
2	6	69f1b72faa062f45ef636c00	Delivery Rooms and Labor Wards  
3	6	69f1b738aa062f45ef636c01	Post-Operative Recovery for Newborns
1	4	69f1d739aa062f45ef636c21	Operating Rooms and Surgical Centers.  
2	4	69f1d78daa062f45ef636c23	Facilities requiring durable
3	4	69f1d79caa062f45ef636c24	stainless-steel medical equipment
4	4	69f1d7a6aa062f45ef636c25	Clinical settings utilizing manual ventilation with Bain circuits
1	37	69f2ec62c111651d811a4291	Hospital Operating Rooms 
2	37	69f2ec6cc111651d811a4292	 Emergency Response & EMS  
3	37	69f2ec73c111651d811a4293	Anesthesia Departments  
4	37	69f2ec78c111651d811a4294	Critical Care Units
1	15	69e72c423220efc4a063a3fc	Obstructive Sleep Apnea (OSA) Treatment: Delivers a continuous, automatically adjusting flow of positive airway pressure to keep the user's airway open during sleep, effectively preventing apnea and hypopnea events.
2	15	69e72c453220efc4a063a3fd	Central Sleep Apnea (CSA) Identification: Intelligently monitors breathing patterns to distinguish between OSA and CSA, preventing improper pressure increases that could negatively impact the patient during central apnea events.
1	41	69f592ca4b30a8ecdb2fbd31	Diagnostic Cardiology  
1	16	69e611c91d522a8c2a7dea0e	General Surgery: Ideal for routine and complex open surgeries, providing precise tissue dissection (pure and mixed cutting) and rapid hemostasis (standard and spraying coagulation) for a variety of tissue types.
2	16	69e611de1d522a8c2a7dea0f	Laparoscopic & Endoscopic Surgery: Fully compatible with suitable endoscopic accessories, allowing surgeons to perform minimally invasive procedures with instantaneous switching between cutting and coagulation.
3	16	69e611e61d522a8c2a7dea10	Gynecology & Obstetrics: Used for procedures requiring careful thermal control and precision, such as hysterectomies, loop electrosurgical excision procedures (LEEP), and other pelvic surgeries.
4	16	69e611ee1d522a8c2a7dea11	Urology: Highly effective for transurethral resections (when using appropriate bipolar/monopolar settings) and other urological interventions involving fluid-filled environments.
5	16	69e611f61d522a8c2a7dea12	Orthopedics: Provides the heavy-duty power required for cutting through dense, highly resistive tissues and managing bleeding during joint and bone surgeries.
6	16	69e611fd1d522a8c2a7dea13	Plastic & Reconstructive Surgery: The precise bipolar modes (up to 100W) allow for delicate tissue coagulation with minimal lateral thermal damage, ensuring better cosmetic outcomes.
7	16	69e612091d522a8c2a7dea14	ENT (Ear, Nose, and Throat): Suitable for delicate dissections and controlling bleeding in confined spaces where precise energy delivery is critical.
\.


--
-- Data for Name: products_download_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_download_items (_order, _parent_id, id, title, type, file_id, external_url) FROM stdin;
\.


--
-- Data for Name: products_faq_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_faq_items (_order, _parent_id, id, question, answer) FROM stdin;
\.


--
-- Data for Name: products_gallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_gallery (_order, _parent_id, id, image_id, alt) FROM stdin;
1	5	69f1baceaa062f45ef636c04	182	\N
2	5	69f1baf9aa062f45ef636c05	183	\N
3	5	69f1bb19aa062f45ef636c06	184	\N
1	20	69e48c659227f07265a2b753	164	\N
2	20	69e48d469227f07265a2b754	64	\N
3	20	69f1a68baa062f45ef636bf5	163	\N
1	4	69f1d662aa062f45ef636c17	188	\N
1	35	69f1ec6422231c7f4290e8a4	194	\N
1	36	69f1f21522231c7f4290e8a5	196	\N
1	22	69e482339227f07265a2b74f	166	\N
2	22	69f1a77aaa062f45ef636bf6	165	\N
3	22	69e4823f9227f07265a2b750	53	\N
1	21	69e486a49227f07265a2b752	58	\N
4	22	69e482519227f07265a2b751	56	\N
1	37	69f2ea49c111651d811a428f	199	\N
2	37	69f2ea40c111651d811a428e	198	\N
3	37	69f2ebc5c111651d811a4290	200	\N
1	38	69f2f115c111651d811a429b	202	\N
2	38	69f2f120c111651d811a429c	203	\N
3	38	69f2f141c111651d811a429e	201	\N
4	38	69f2f12ec111651d811a429d	204	\N
1	23	69e477359227f07265a2b748	45	\N
2	23	69e479839227f07265a2b74a	46	\N
3	23	69e47b319227f07265a2b74b	47	\N
4	23	69e47b5c9227f07265a2b74c	48	\N
5	23	69e47b6a9227f07265a2b74d	49	\N
6	23	69e47be19227f07265a2b74e	50	\N
1	14	69e73613a1dc14718977d68a	127	\N
2	14	69e735043220efc4a063a417	119	\N
1	15	69e72eb03220efc4a063a404	206	\N
2	15	69e72e3f3220efc4a063a400	207	\N
3	15	69e72e533220efc4a063a401	208	\N
4	15	69e72e643220efc4a063a402	209	\N
1	18	69e6055f1d522a8c2a7de9e1	169	\N
2	18	69e6054f1d522a8c2a7de9e0	75	\N
3	18	69e605671d522a8c2a7de9e2	77	\N
1	25	69df33bfb960ec5fbf6307aa	102	\N
2	25	69df33c9b960ec5fbf6307ab	103	\N
3	25	69e4943e9227f07265a2b76e	69	\N
4	25	69e4945c9227f07265a2b76f	104	\N
5	25	69e71a773220efc4a063a3f8	107	\N
6	25	69e7164d3220efc4a063a3f6	105	\N
7	25	69e718a83220efc4a063a3f7	106	\N
4	18	69e605751d522a8c2a7de9e3	78	\N
5	18	69e6057d1d522a8c2a7de9e4	170	\N
5	15	69e72e753220efc4a063a403	210	\N
1	39	69f2fcfcc111651d811a42a0	214	\N
1	41	69f592304b30a8ecdb2fbd2a	217	\N
1	43	69f6e9c9e765d7cd64ec2572	220	\N
2	43	69f6e9d2e765d7cd64ec2573	221	\N
3	43	69f6e9dfe765d7cd64ec2574	222	\N
1	44	69f7158f8a4af0c46cac5ab6	224	\N
1	17	69e608031d522a8c2a7de9e6	171	\N
2	17	69e608281d522a8c2a7de9e7	172	\N
3	17	69e608471d522a8c2a7de9e8	173	\N
1	10	69f0500db0a65f057ad2fa90	144	\N
4	17	69e608821d522a8c2a7de9e9	174	\N
1	16	69e60fea1d522a8c2a7dea04	226	\N
1	6	69f1b7acaa062f45ef636c02	179	\N
2	6	69f1b7b9aa062f45ef636c03	180	\N
2	10	69f0501ab0a65f057ad2fa91	145	\N
3	10	69f0502ab0a65f057ad2fa92	146	\N
4	10	69f05040b0a65f057ad2fa93	147	\N
5	10	69f0504bb0a65f057ad2fa94	148	\N
2	16	69f996b79eae5fa737221dc4	227	\N
3	16	69f996dd9eae5fa737221dc6	228	\N
4	16	69f996f59eae5fa737221dc7	229	\N
5	16	69f997039eae5fa737221dc8	230	\N
6	16	69f997159eae5fa737221dc9	231	\N
6	10	69f05058b0a65f057ad2fa95	149	\N
7	10	69f05065b0a65f057ad2fa96	150	\N
1	31	69e48ebc9227f07265a2b755	65	\N
2	31	69e48ed19227f07265a2b756	66	\N
3	31	69e48f289227f07265a2b757	67	\N
1	24	69e71afb3220efc4a063a3fb	109	\N
2	24	69e0c81a57af051018456dc4	108	\N
3	24	69e71ad43220efc4a063a3fa	103	\N
4	24	69e71ac43220efc4a063a3f9	107	\N
5	24	69e0c6ed57af051018456dbe	36	\N
6	24	69e0c7ad57af051018456dc2	39	\N
7	24	69e0c6f757af051018456dbf	42	\N
1	46	69fae3c8308ccf4f00a968f1	235	\N
2	46	69fae3dc308ccf4f00a968f2	236	\N
3	46	69fae409308ccf4f00a968f3	237	\N
4	46	69fae419308ccf4f00a968f4	238	\N
5	46	69fae42c308ccf4f00a968f5	239	\N
6	46	69fae43c308ccf4f00a968f6	240	\N
7	46	69fae452308ccf4f00a968f7	241	\N
8	46	69fae460308ccf4f00a968f8	242	\N
9	46	69fae479308ccf4f00a968f9	243	\N
10	46	69faecb5308ccf4f00a96900	245	\N
\.


--
-- Data for Name: products_key_highlights; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_key_highlights (_order, _parent_id, id, item) FROM stdin;
\.


--
-- Data for Name: products_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_rels (id, "order", parent_id, path, products_id) FROM stdin;
54	1	24	relatedProducts	25
\.


--
-- Data for Name: products_spec_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_spec_groups (_order, _parent_id, id, group_title) FROM stdin;
1	4	69f1d6beaa062f45ef636c19	Technical Specifications
1	3	69f1d979aa062f45ef636c26	Technical Specifications
1	2	69f1e084aa062f45ef636c31	Technical Specifications
1	12	69e9fd2957a33abd2212b685	Technical specification
1	1	69d72ad886da9424464137fb	Technical Specs
1	21	69e4a0f49227f07265a2b780	Technical Specifications
1	13	69e9f70d57a33abd2212b677	Technical Specifications
1	38	69f2ed0ac111651d811a4295	Technical Specifications
1	14	69e733cd3220efc4a063a40e	Technical Specifications
1	25	69e491749227f07265a2b764	Technical perameters
1	10	69eef15c5ce4f93fc179fdc2	Detailed Specifications
1	15	69e72f2f3220efc4a063a405	Technical Specifications
1	40	69f58f7f4b30a8ecdb2fbd23	Technical Specifications
1	41	69f5923e4b30a8ecdb2fbd2b	Technical Specifications
1	31	69e479dd34931c3b26d3a31f	Main Parameters
1	9	69f05f25b0a65f057ad2fa9b	Technical Specifications
1	8	69f06057b0a65f057ad2faa2	Technical Specifications
1	7	69f074b7c55743eb5a765a41	Technical Specifications
1	19	69e4c0096a8ee835e89d81de	Ventilator Specifications
2	19	69e4c19a6a8ee835e89d81e6	Pneumatic & Vaporizer Specifications
3	19	69e4c4e06a8ee835e89d81ec	Electrical & Monitoring
1	42	69f596f54b30a8ecdb2fbd35	Technical Specifications
1	43	69f6e9ede765d7cd64ec2575	Technical Specifications
1	20	69e49fd49227f07265a2b775	Technical Specifications
1	16	69e6104e1d522a8c2a7dea06	Technical Specifications
1	46	69faec41308ccf4f00a968fa	Technical Specifications
1	22	69e4a1aa9227f07265a2b789	Technical Specifcations
1	18	69e6041a1d522a8c2a7de9cf	Technical Specifications
2	18	69e604b71d522a8c2a7de9da	Hardware & Alarms:
1	17	69e609a11d522a8c2a7de9ea	Ventilation Capabilities
2	17	69e60a4b1d522a8c2a7de9f4	Flowmeter & Vaporizer Specs:
1	6	69f1b62eaa062f45ef636bf7	Technical Specifications
1	5	69f1bb86aa062f45ef636c07	Technical Specifications
2	5	69f1bc53aa062f45ef636c0f	Operational & Environmental Limits
\.


--
-- Data for Name: products_spec_groups_rows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_spec_groups_rows (_order, _parent_id, id, label, value) FROM stdin;
1	69f2ed0ac111651d811a4295	69f2ed24c111651d811a4296	Material\t	Conductive Medical Silicone
2	69f2ed0ac111651d811a4295	69f2ed31c111651d811a4297	Type\t	Reusable / Non-Adhesive
3	69f2ed0ac111651d811a4295	69f2ed40c111651d811a4298	Application\t	Monopolar Electrosurgery
1	69e4c0096a8ee835e89d81de	69e4c00d6a8ee835e89d81df	Patient Type	Adult, Pediatric
2	69e4c0096a8ee835e89d81de	69e4c0776a8ee835e89d81e0	Ventilation Modes	IPPV, PLV, SIMV, Manual, Standby, Spont (with apnea backup)
3	69e4c0096a8ee835e89d81de	69e4c1276a8ee835e89d81e1	Tidal Volume (TV)	20 ~ 1500 ml
4	69e4c0096a8ee835e89d81de	69e4c1376a8ee835e89d81e2	Frequency	4 ~ 100 bpm
5	69e4c0096a8ee835e89d81de	69e4c1466a8ee835e89d81e3	I:E Ratio	4:1 ~ 1:8
6	69e4c0096a8ee835e89d81de	69e4c1546a8ee835e89d81e4	PEEP	0 ~ 30 cmHΓééO (Optional)
7	69e4c0096a8ee835e89d81de	69e4c1616a8ee835e89d81e5	Inspiration Pause	OFF, 5% ~ 60%
1	69e4c19a6a8ee835e89d81e6	69e4c1a46a8ee835e89d81e7	Gas Supply	280 ~ 600 kPa
2	69e4c19a6a8ee835e89d81e6	69e4c1b36a8ee835e89d81e8	Flowmeters	Double tube in series (O2: 0~1L/min, 1~10L/min; N2O: 0~1L/min, 1~10L/min)
1	69f1bb86aa062f45ef636c07	69f1bbd9aa062f45ef636c08	Light Source\t	16pcs blue super LED / 4pcs white LED
2	69f1bb86aa062f45ef636c07	69f1bbecaa062f45ef636c09	Wavelength Range	\t400ΓÇô550nm (Peak: 440ΓÇô460nm)
1	69e9fd2957a33abd2212b685	69e9fd5457a33abd2212b686	Therapy Modes:	CPAP, S, T, S/T, PC, and VAT (Volume Assured Technology).
1	69e49fd49227f07265a2b775	69e49fe19227f07265a2b776	Overall Dimensions   (L x W)	2100 mm x 500 mm (┬▒20 mm)
2	69e49fd49227f07265a2b775	69e49ff89227f07265a2b777	Working Table Height	750 mm (┬▒50 mm)
3	69e49fd49227f07265a2b775	69e4a00f9227f07265a2b778	Height Adjustment Range	Up to 250 mm
4	69e49fd49227f07265a2b775	69e4a0219227f07265a2b779	Lateral Tilt (Left / Right)	   ΓëÑ 20┬░
5	69e49fd49227f07265a2b775	69e4a04c9227f07265a2b77a	 Trendelenburg / Reverse   	ΓëÑ 20┬░ to 25┬░ 
6	69e49fd49227f07265a2b775	69e4a05c9227f07265a2b77b	Back Plate Adjustment   	+70┬░ to -15┬░ (Up to +80┬░ upward)
7	69e49fd49227f07265a2b775	69e4a0699227f07265a2b77c	 Head Plate Adjustment   	┬▒30┬░ to 90┬░ 
8	69e49fd49227f07265a2b775	69e4a0759227f07265a2b77d	Leg Plate (Downwards)   	ΓëÑ 90┬░ 
9	69e49fd49227f07265a2b775	69e4a0809227f07265a2b77e	Kidney Bridge Lift   	ΓëÑ 100 mm to 120 mm 
10	69e49fd49227f07265a2b775	69e4a08a9227f07265a2b77f	Maximum Load Capacity  	 > 250 kg
3	69f1bb86aa062f45ef636c07	69f1bbfbaa062f45ef636c0a	Light Intensity (Level I)$57\\text{ ╬╝w/cm}^2/\\text{nm}$ at 35cm / $36\\text{ ╬╝w/cm}^2/\\text{nm}$ at 50cm	(Level I)$57\\text{ ╬╝w/cm}^2/\\text{nm}$ at 35cm / $36\\text{ ╬╝w/cm}^2/\\text{nm}$ at 50cm
4	69f1bb86aa062f45ef636c07	69f1bc11aa062f45ef636c0b	Irradiance Intensity\t	Adjustable levels: I, II, III
2	69e9fd2957a33abd2212b685	69e9fd6157a33abd2212b687	IPAP Pressure Range:	6.0 ΓÇô 30.0 cmH2O.
3	69e9fd2957a33abd2212b685	69e9fd7057a33abd2212b688	EPAP Pressure Range:	4.0 ΓÇô 25.0 cmH2O.
4	69e9fd2957a33abd2212b685	69e9fd7c57a33abd2212b689	Pressure Accuracy:	Precise control accurate to 0.1 cmH2O.
5	69e9fd2957a33abd2212b685	69e9fd8957a33abd2212b68a	Target Volume (VT):	Adjustable from 200 to 1500 ml.
5	69f1bb86aa062f45ef636c07	69f1bc27aa062f45ef636c0c	Cooling System	Fanless (Noise level $<30\\text{ dB}$)
6	69f1bb86aa062f45ef636c07	69f1bc35aa062f45ef636c0d	Screen Type\t	3.5-inch LCD touch screen
7	69f1bb86aa062f45ef636c07	69f1bc45aa062f45ef636c0e	Voltage & Frequency	220\\text{--}240\\text{ VAC}$, $50/60\\text{ Hz}$
1	69f1bc53aa062f45ef636c0f	69f1bc5daa062f45ef636c10	Working Temperature: 	$15\\text{ to }30\\text{┬░C}$.
2	69f1bc53aa062f45ef636c0f	69f1bc6faa062f45ef636c11	Working Humidity: 	$5\\text{ to }\\leq 99\\%\\text{ RH}$.
3	69f1bc53aa062f45ef636c0f	69f1bc7daa062f45ef636c12	Storage Temperature: 	$-10\\text{ to }+40\\text{┬░C}$.
4	69f1bc53aa062f45ef636c0f	69f1bc88aa062f45ef636c13	Storage Humidity: 	$0\\text{ to }90\\%\\text{ RH}$.
1	69f1d979aa062f45ef636c26	69f1d98caa062f45ef636c27	Model\t	HT-145S
2	69f1d979aa062f45ef636c26	69f1d997aa062f45ef636c28	Construction\t	High-Quality Stainless Steel (SS)
3	69f1d979aa062f45ef636c26	69f1d9aaaa062f45ef636c29	Flowmeter Range\t	Oxygen: 0.1ΓÇô10L/min; Nitrous: 0.1ΓÇô10L/min
4	69f1d979aa062f45ef636c26	69f1d9b6aa062f45ef636c2a	Ventilation Mode\t	Manual (Optimized for use with Bain Circuit)
5	69f1d979aa062f45ef636c26	69f1d9c1aa062f45ef636c2b	Pressure Meters\t	Korean-made Oxygen and Nitrogen high-pressure regulators
6	69f1d979aa062f45ef636c26	69f1d9cdaa062f45ef636c2c	Safety Features	Auto $N_2O$ Lock and Oxygen Failure Alarm
7	69f1d979aa062f45ef636c26	69f1d9dbaa062f45ef636c2d	Oxygen Flush\t	Emergency valve connected directly to incoming supply
1	69e4a0f49227f07265a2b780	69e4a0f89227f07265a2b781	Height Range  	760mm to 1010mm
2	69e4a0f49227f07265a2b780	69e4a1089227f07265a2b782	Dimensions (Length x Width)  	 2010mm x 480mm
3	69e4a0f49227f07265a2b780	69e4a11c9227f07265a2b783	Lateral Tilt (Left / Right)  	 ΓëÑ20┬░ / ΓëÑ20┬░
4	69e4a0f49227f07265a2b780	69e4a12e9227f07265a2b784	Trendelenburg / Reverse  	 ΓëÑ25┬░ / ΓëÑ25┬░ 
5	69e4a0f49227f07265a2b780	69e4a1449227f07265a2b785	Back Section (Up / Down)   	ΓëÑ80┬░ / ΓëÑ10┬░ 
6	69e4a0f49227f07265a2b780	69e4a14d9227f07265a2b786	Head Section (Up / Down)  	 ΓëÑ60┬░ / ΓëÑ90┬░ 
7	69e4a0f49227f07265a2b780	69e4a1579227f07265a2b787	Leg Section (Down)   	ΓëÑ90┬░ 
8	69e4a0f49227f07265a2b780	69e4a1609227f07265a2b788	Waist Board Lifting  	 120 mm
3	69e4c19a6a8ee835e89d81e6	69e4c1c26a8ee835e89d81e9	Breathing Circuit	Closed, Semi-closed, Semi-open
4	69e4c19a6a8ee835e89d81e6	69e4c1d06a8ee835e89d81ea	Vaporizer Support	Supports 2 vaporizers simultaneously.
5	69e4c19a6a8ee835e89d81e6	69e4c1e16a8ee835e89d81eb	Supported Agents	Halothane, Enflurane, Isoflurane, Sevoflurane (Pour-fill, Key-fill, Quik-fil┬« compatible).
1	69f1b62eaa062f45ef636bf7	69f1b6a9aa062f45ef636bf8	Display:	High-visibility LED digital display for clear monitoring of set and actual skin temperatures.
2	69f1b62eaa062f45ef636bf7	69f1b6baaa062f45ef636bf9	Heating Element:	550W Far-infrared ceramic/quartz tube for efficient heat distribution.
3	69f1b62eaa062f45ef636bf7	69f1b6c8aa062f45ef636bfa	Temperature Range: 	Skin temperature setting range: 34.0┬░C ΓÇô 38.0┬░C.
4	69f1b62eaa062f45ef636bf7	69f1b6d6aa062f45ef636bfb	Examination Lamp: 	Integrated LED observation light with adjustable intensity (0ΓÇô1200 lux).
5	69f1b62eaa062f45ef636bf7	69f1b6e6aa062f45ef636bfc	Optional Configurations: 	Can be equipped with a storage drawer, X-ray cassette tray, integrated weight scale, and oxygen/suction modules for a complete nursing platform.
1	69f1e084aa062f45ef636c31	69f1e087aa062f45ef636c32	Infusion Accuracy	+/_ 5%
2	69f1e084aa062f45ef636c31	69f1e0adaa062f45ef636c33	Infusion Rate	$0.10 \\text{--} 1200\\text{ ml/h}$ (increments of $0.01\\text{ ml/h}$)
3	69f1e084aa062f45ef636c31	69f1e0c9aa062f45ef636c34	Infusion Modes\t	 Rate, Drip, Time, Weight, Dose, TPN, Program, Intermittent, Micro, Sequential, and Drug Library
4	69f1e084aa062f45ef636c31	69f1e0d9aa062f45ef636c35	VTBI Range	0-9999.99ml
5	69f1e084aa062f45ef636c31	69f1e0fdaa062f45ef636c36	KVO Rate	0.10-10.0ml/h
6	69f1e084aa062f45ef636c31	69f1e11daa062f45ef636c37	Occlusion Pressure\t	 13 adjustable levels
7	69f1e084aa062f45ef636c31	69f1e129aa062f45ef636c38	Bubble Detection	Ultrasound sensor with 4 levels ($50\\mu l \\text{--} 300\\mu l$)
8	69f1e084aa062f45ef636c31	69f1e137aa062f45ef636c39	History Record\t	 Stores up to 1,300 entries
1	69e4c4e06a8ee835e89d81ec	69e4c4e46a8ee835e89d81ed	Battery Backup	DC 24V, providing $\\ge$ 120 minutes of continuous power during outages.
2	69e4c4e06a8ee835e89d81ec	69e4c4f36a8ee835e89d81ee	Display Metrics	Pressure (Ppeak, Pplat, Pmean, PEEP), Volumes (MV, Vt), and optional Gas (O2, CO2, Agent). Displays P-t and F-t waveforms.
3	69e4c4e06a8ee835e89d81ec	69e4c5016a8ee835e89d81ef	Comprehensive Alarms	Visual and audio alarms (triggered within $\\le$ 120 seconds) for High/Low Airway Pressure, Minute Volume, FiO2, Apnea, Power Failure, and O2 Supply Failure.
6	69e9fd2957a33abd2212b685	69e9fd9857a33abd2212b68b	Rise Time:	1 ΓÇô 6 levels of adjustment.
7	69e9fd2957a33abd2212b685	69e9fda357a33abd2212b68c	Trigger and Cycle:	1 ΓÇô 6 levels of sensitivity.
8	69e9fd2957a33abd2212b685	69e9fdb057a33abd2212b68d	Respiratory Rate (RR):	5 ΓÇô 40 BPM.
9	69e9fd2957a33abd2212b685	69e9fdbb57a33abd2212b68e	Inspiratory Time (Ti):	Minimum 0.5s to Maximum 3.0s.
9	69f1e084aa062f45ef636c31	69f1e140aa062f45ef636c3a	Weight & Size	1.4  kg 145X120X100 mm
10	69f1e084aa062f45ef636c31	69f1e184aa062f45ef636c3b	Power Supply	AC 100-240V 50/60Hz or DC-12V
1	69e479dd34931c3b26d3a31f	69e479e934931c3b26d3a320	Illuminance	ΓëÑ145.000 Lux <160.000 Lux
2	69e479dd34931c3b26d3a31f	69e48ff19227f07265a2b758	Colour temperature	3800K+300K;4400K+300K;5000K+300OK
3	69e479dd34931c3b26d3a31f	69e4901f9227f07265a2b759	Spot diameter	160-200mm
4	69e479dd34931c3b26d3a31f	69e4902a9227f07265a2b75a	Input Power	90VA
5	69e479dd34931c3b26d3a31f	69e490389227f07265a2b75b	LED secondarylight-emitting tube power	3.2V/3W
6	69e479dd34931c3b26d3a31f	69e4904b9227f07265a2b75c	Number of LED secondarylight-emitting tubes	60pcs + 84pcs
7	69e479dd34931c3b26d3a31f	69e4905b9227f07265a2b75d	ENDO	ΓëÑ10000 Lux
8	69e479dd34931c3b26d3a31f	69e490699227f07265a2b75e	GL	ΓëÑ12000 Lux
1	69e491749227f07265a2b764	69e491c79227f07265a2b765	Dome diameter(mm)	700 / 700
2	69e491749227f07265a2b764	69e4923f9227f07265a2b766	Illuminance (lux)	40000-180000
3	69e491749227f07265a2b764	69e492619227f07265a2b767	Color temperature(K)	4000-5700
4	69e491749227f07265a2b764	69e492729227f07265a2b768	Spot diameter(mm)	150-350
5	69e491749227f07265a2b764	69e4929a9227f07265a2b769	Depth of irradiation(mm)	1200
6	69e491749227f07265a2b764	69e493309227f07265a2b76a	Color rendering index(%)	96
7	69e491749227f07265a2b764	69e4933b9227f07265a2b76b	Brightness adjustment digital display	1-100%
8	69e491749227f07265a2b764	69e4934f9227f07265a2b76c	Temperature rise of surgeon's head	1┬░C
9	69e491749227f07265a2b764	69e493a79227f07265a2b76d	Led lifespan(h)	80000
1	69e9f70d57a33abd2212b677	69e9f71957a33abd2212b678	Mode:	Auto CPAP.
2	69e9f70d57a33abd2212b677	69e9f72957a33abd2212b679	Pressure Range:	4ΓÇô20 cmH2O.
3	69e9f70d57a33abd2212b677	69e9f73757a33abd2212b67a	Noise Level:	Quiet operation at Γëñ 28 dB.
4	69e9f70d57a33abd2212b677	69e9f74457a33abd2212b67b	Data Transmission:	Supports SD Card, Bluetooth, and WiFi for data tracking.
5	69e9f70d57a33abd2212b677	69e9f75257a33abd2212b67c	Interface:	Ergonomically designed knob with validated damping for smooth operation.
4	69f2ed0ac111651d811a4295	69f2ed49c111651d811a4299	Cable Length\t	Approximately 3 Meters
5	69f2ed0ac111651d811a4295	69f2ed54c111651d811a429a	Connector\t	Standard ESU Plug
1	69f5923e4b30a8ecdb2fbd2b	69f5924b4b30a8ecdb2fbd2c	Quantity\t	Set of 4 Clamps
2	69f5923e4b30a8ecdb2fbd2b	69f592564b30a8ecdb2fbd2d	Colors\t	Red, Yellow, Green, Black
3	69f5923e4b30a8ecdb2fbd2b	69f592614b30a8ecdb2fbd2e	Connector Type\t	Universal Stud (Snap/Banana compatible)
4	69f5923e4b30a8ecdb2fbd2b	69f5926c4b30a8ecdb2fbd2f	Application\t	Adult Limb Monitoring
5	69f5923e4b30a8ecdb2fbd2b	69f592754b30a8ecdb2fbd30	Material	Medical-grade ABS and Nickel-plated Metal
1	69f596f54b30a8ecdb2fbd35	69f596f94b30a8ecdb2fbd36	Product Type\t	Suction Chest Electrodes (Precordial)
2	69f596f54b30a8ecdb2fbd35	69f597034b30a8ecdb2fbd37	Quantity\t	Set of 6
3	69f596f54b30a8ecdb2fbd35	69f597204b30a8ecdb2fbd39	Materials\t	Medical-grade Silicone and Nickel-plated Metal
4	69f596f54b30a8ecdb2fbd35	69f5972e4b30a8ecdb2fbd3a	Electrode Type\t	Adult / Universal
5	69f596f54b30a8ecdb2fbd35	69f597354b30a8ecdb2fbd3b	Compatibility\t	4.0mm Banana Plug / Snap Leads
1	69e6104e1d522a8c2a7dea06	69e610511d522a8c2a7dea07	Pure Cutting - Sine wave	500KHz - 400W
2	69e6104e1d522a8c2a7dea06	69e610fa1d522a8c2a7dea08	Mixed Cutting 1 - Modulated sine wave	500KHz - 250W
3	69e6104e1d522a8c2a7dea06	69e611361d522a8c2a7dea09	Mixed Cutting 2 - Modulated sine wave	500KHz - 200W
4	69e6104e1d522a8c2a7dea06	69e611511d522a8c2a7dea0a	Standard Coagulation - Modulated sine wave	500KHz - 100W
5	69e6104e1d522a8c2a7dea06	69e6116d1d522a8c2a7dea0b	Spraying Coagulation - Modulated sine wave	500KHz - 70W
6	69e6104e1d522a8c2a7dea06	69e611821d522a8c2a7dea0c	Bipolar 1 - Sine wave	500KHz - 100W
7	69e6104e1d522a8c2a7dea06	69e611961d522a8c2a7dea0d	Bipolar 2\tModulated - sine wave	500KHz - 70W
9	69e479dd34931c3b26d3a31f	69e4907f9227f07265a2b75f	Color rendering index(Ra)	96ΓëñRaΓëñ100
10	69e479dd34931c3b26d3a31f	69e4908c9227f07265a2b760	Color rendering index(Ra)	96ΓëñRaΓëñ100
1	69e6041a1d522a8c2a7de9cf	69e604261d522a8c2a7de9d0	Tidal Volume:	Adjustable from 50 to 1500 ml (Display range: 0 ~ 2000 ml)
2	69e6041a1d522a8c2a7de9cf	69e604341d522a8c2a7de9d1	Ventilation Frequency:	1 ~ 100 bpm
3	69e6041a1d522a8c2a7de9cf	69e604421d522a8c2a7de9d2	I:E Ratio:	8:1 ~ 1:10 (Capable of inverse ratio ventilation)
4	69e6041a1d522a8c2a7de9cf	69e604531d522a8c2a7de9d3	PEEP:	Electronically controlled, 0 ~ 20 cmH2O
5	69e6041a1d522a8c2a7de9cf	69e604611d522a8c2a7de9d4	Inspiratory Trigger Pressure:	Electronically controlled, -10 ~ 20 cmH2O
6	69e6041a1d522a8c2a7de9cf	69e604711d522a8c2a7de9d5	Sigh Function:	Adjustable, 80 ~ 150 times
1	69eef15c5ce4f93fc179fdc2	69eef1635ce4f93fc179fdc3	Brand	Ucare
2	69eef15c5ce4f93fc179fdc2	69eef1745ce4f93fc179fdc4	Model Number	HY-Q01
3	69eef15c5ce4f93fc179fdc2	69eef1845ce4f93fc179fdc5	Power Supply	AC 220V, 50Hz
7	69e6041a1d522a8c2a7de9cf	69e604811d522a8c2a7de9d6	SIMV Frequency:	1 ~ 20 bpm
8	69e6041a1d522a8c2a7de9cf	69e604901d522a8c2a7de9d7	Flowmeter Range:	O2: 0.1 ~ 10 L/min | N2O: 0.1 ~ 10 L/min
9	69e6041a1d522a8c2a7de9cf	69e604a01d522a8c2a7de9d8	Vaporizer Concentration Range:	0 ~ 5% (Compatible with Enflurane, Isoflurane, Sevoflurane, and optional Halothane)
1	69e604b71d522a8c2a7de9da	69e604c01d522a8c2a7de9db	Gas Requirement:	O2 and N2O (0.32ΓÇô0.6 MPa)
1	69faec41308ccf4f00a968fa	69faec44308ccf4f00a968fb	Modes\t	4 (Massage, Feeding, Pumping, Deep Pumping)
2	69faec41308ccf4f00a968fa	69faec53308ccf4f00a968fc	Bottle Capacity\t	180 ml / 6 oz
4	69eef15c5ce4f93fc179fdc2	69eef1985ce4f93fc179fdc6	Power Consumption	160VA
5	69eef15c5ce4f93fc179fdc2	69eef1a65ce4f93fc179fdc7	MMAD (Particle Size)	$1\\mu m \\sim 5\\mu m$
6	69eef15c5ce4f93fc179fdc2	69eef1b55ce4f93fc179fdc8	Average Spray Rate	0.2ml/min
7	69eef15c5ce4f93fc179fdc2	69eef1cd5ce4f93fc179fdc9	Noise Level	65dB
8	69eef15c5ce4f93fc179fdc2	69eef1d95ce4f93fc179fdca	Net Weight	Approx. 1.25kg
3	69faec41308ccf4f00a968fa	69faec65308ccf4f00a968fd	Control Type\t	Digital Touch Interface
4	69faec41308ccf4f00a968fa	69faec70308ccf4f00a968fe	Certifications\t	FDA, CE, FC, RoHS
5	69faec41308ccf4f00a968fa	69faec78308ccf4f00a968ff	Material\t	BPA-Free Silicone and Plastic
11	69e479dd34931c3b26d3a31f	69e4909d9227f07265a2b761	Total irradiance	Γëñ500W/m┬▓
12	69e479dd34931c3b26d3a31f	69e490ab9227f07265a2b762	Illumination depth	20%:Notless than 1070mm. 60%:Not less than 560mm
1	69e4a1aa9227f07265a2b789	69e4a1d89227f07265a2b78a	Table length (mm)	2040
2	69e4a1aa9227f07265a2b789	69e4a1f89227f07265a2b78b	Table width (w/o side rails, mm)	520
3	69e4a1aa9227f07265a2b789	69e4a20a9227f07265a2b78c	Table top height adjustment (mm)	680 to 950
4	69e4a1aa9227f07265a2b789	69e4a2179227f07265a2b78d	Trendelenburg/reverse-Trendelenburg	30┬░
5	69e4a1aa9227f07265a2b789	69e4a2269227f07265a2b78e	Lateral tilting left/right	20┬░
6	69e4a1aa9227f07265a2b789	69e4a2359227f07265a2b78f	Head plate up/down (detachable)	30┬░/45┬░
1	69f05f25b0a65f057ad2fa9b	69f05f30b0a65f057ad2fa9c	Product Type	Surgical Diathermy Accessory
2	69f05f25b0a65f057ad2fa9b	69f05f3db0a65f057ad2fa9d	Material	Medical-grade Silicone / Copper Core
3	69f05f25b0a65f057ad2fa9b	69f05f4bb0a65f057ad2fa9e	Color	Industrial Dark Grey
4	69f05f25b0a65f057ad2fa9b	69f05f58b0a65f057ad2fa9f	Length	Standard 3-meter (approx. 10ft) length
5	69f05f25b0a65f057ad2fa9b	69f05f63b0a65f057ad2faa0	Sterilization	Autoclavable up to 134┬░C (273┬░F)
6	69f05f25b0a65f057ad2fa9b	69f05f71b0a65f057ad2faa1	Application	Neurosurgery, ENT, Plastic Surgery, General Coagulation
1	69f06057b0a65f057ad2faa2	69f0605eb0a65f057ad2faa3	Type	Monopolar Electrosurgical Handpiece
2	69f06057b0a65f057ad2faa2	69f0606cb0a65f057ad2faa4	Connector	1-Pin (Single Banana Plug)
3	69f06057b0a65f057ad2faa2	69f0607eb0a65f057ad2faa5	Operation	Foot-control compatible (Non-Switching Handpiece)
4	69f06057b0a65f057ad2faa2	69f0608bb0a65f057ad2faa6	Electrode Compatibility	Standard 2.4mm (3/32") diameter electrodes
5	69f06057b0a65f057ad2faa2	69f06099b0a65f057ad2faa7	Material	High-temp Medical Grade Silicone & Polymer
6	69f06057b0a65f057ad2faa2	69f060a9b0a65f057ad2faa8	Sterilization	Fully Autoclavable (134┬░C / 273┬░F)
7	69f06057b0a65f057ad2faa2	69f060b7b0a65f057ad2faa9	Cable Length	3 Meters (approx. 10 feet)
7	69e4a1aa9227f07265a2b789	69e4a2439227f07265a2b790	Back plate up/down	75┬░/30┬░
8	69e4a1aa9227f07265a2b789	69e4a2519227f07265a2b791	Leg plates up/down (detachable)	5┬░/90┬░
9	69e4a1aa9227f07265a2b789	69e4a2629227f07265a2b792	Leg plates separation angle	5┬░/90┬░
10	69e4a1aa9227f07265a2b789	69e4a2729227f07265a2b793	Leg plates separation angle	180┬░
11	69e4a1aa9227f07265a2b789	69e4a2819227f07265a2b794	Flex/reflex	210┬░/105┬░
12	69e4a1aa9227f07265a2b789	69e4a28f9227f07265a2b795	Kidney bridge elevation (mm)	136
13	69e4a1aa9227f07265a2b789	69e4a2a59227f07265a2b796	Longitudinal displacement (mm)	300 
1	69f074b7c55743eb5a765a41	69f074c0c55743eb5a765a42	Product Type\t	Monopolar Electrosurgical Pencil
2	69f074b7c55743eb5a765a41	69f074d4c55743eb5a765a43	Control Type\t	Integrated Finger Switch (Cut/Coag)
3	69f074b7c55743eb5a765a41	69f074dfc55743eb5a765a44	Connector\t	Standard 3-Prong Universal Plug
4	69f074b7c55743eb5a765a41	69f074ebc55743eb5a765a45	Electrode Compatibility\t	Accepts standard 2.4mm (3/32") hex-locked electrodes
5	69f074b7c55743eb5a765a41	69f074fbc55743eb5a765a46	Sterilization\t	Autoclavable up to 134┬░C (273┬░F)
6	69f074b7c55743eb5a765a41	69f07508c55743eb5a765a47	Cable Length\t	3 Meters (approx. 10 feet)
7	69f074b7c55743eb5a765a41	69f07516c55743eb5a765a48	Material\t	Medical-grade heat-resistant polymer and silicone
14	69e4a1aa9227f07265a2b789	69e4a2b29227f07265a2b797	Safe load capacity (kg)	135
15	69e4a1aa9227f07265a2b789	69e4a2c09227f07265a2b798	Maximum static load (kg)	297
16	69e4a1aa9227f07265a2b789	69e4a2cf9227f07265a2b799	Table padding	60mm detachable multi-layer memory foam
17	69e4a1aa9227f07265a2b789	69e4a3db9227f07265a2b79c	Brake	4 sets of electric hydraulic systems
18	69e4a1aa9227f07265a2b789	69e4a3ef9227f07265a2b79d	Head-leg plate interchangeable	Optional
19	69e4a1aa9227f07265a2b789	69e4a4059227f07265a2b79e	Column control panel	Optional
20	69e4a1aa9227f07265a2b789	69e4a46b9227f07265a2b79f	1-key level	Optional
1	69e733cd3220efc4a063a40e	69e733d13220efc4a063a40f	IPAP Range:	6 ΓÇô 30 hPa.
2	69e733cd3220efc4a063a40e	69e733de3220efc4a063a410	EPAP Range:	4 ΓÇô 25 hPa.
3	69e733cd3220efc4a063a40e	69e733f43220efc4a063a411	Target Tidal Volume:	200ml ΓÇô 1500ml.
4	69e733cd3220efc4a063a40e	69e734013220efc4a063a412	Respiratory Rate:	10BPM / 5-40BPM.
5	69e733cd3220efc4a063a40e	69e7340f3220efc4a063a413	Ramp Time:	0 ΓÇô 60 minutes
6	69e733cd3220efc4a063a40e	69e734213220efc4a063a414	Monitoring Parameters:	Tracks Pressure, Tidal volume, Minute ventilation, Respiratory rate, and Leakage.
7	69e733cd3220efc4a063a40e	69e7342a3220efc4a063a415	Data Storage:	Equipped with an SD card for long-term therapy data tracking.
1	69f1d6beaa062f45ef636c19	69f1d6c8aa062f45ef636c1a	Model\t	HT-150S
2	69f1d6beaa062f45ef636c19	69f1d6d4aa062f45ef636c1b	Body Material\t	High-Quality Stainless Steel (SS)
3	69f1d6beaa062f45ef636c19	69f1d6dfaa062f45ef636c1c	Flowmeter Range\t	Oxygen: 0.1ΓÇô10L/min; Nitrous: 0.1ΓÇô10L/min
4	69f1d6beaa062f45ef636c19	69f1d6ecaa062f45ef636c1d	Ventilation Mode\t	Manual (Designed for use with Bain Circuit)
5	69f1d6beaa062f45ef636c19	69f1d6f7aa062f45ef636c1e	Pressure Regulation\t	Malaysian-made high-pressure regulators
6	69f1d6beaa062f45ef636c19	69f1d708aa062f45ef636c1f	Vaporizers\t	Compatible with Isoflurane / Sevoflurane
7	69f1d6beaa062f45ef636c19	69f1d70eaa062f45ef636c20	Oxygen Flush\t	Emergency flush valve connected to incoming supply
2	69e604b71d522a8c2a7de9da	69e604d01d522a8c2a7de9dc	Physical Dimensions:	930 mm x 1354 mm x 620 mm
3	69e604b71d522a8c2a7de9da	69e604de1d522a8c2a7de9dd	Weight:	Approximately 86 kg
4	69e604b71d522a8c2a7de9da	69e604ed1d522a8c2a7de9de	Alarm Indicators:	Comprehensive audible and visual alarms for tidal volume deviations, airway pressure, asphyxia, power failure, and oxygen supply failure, complete with a built-in alarm query function.
1	69e609a11d522a8c2a7de9ea	69e609b71d522a8c2a7de9eb	Ventilation Modes:	IPPV, SIPPV, VCV, IMV, SIMV, MANUAL, Standby (Advanced Model includes PCV)
2	69e609a11d522a8c2a7de9ea	69e609c91d522a8c2a7de9ec	Tidal Volume:	Adjustable from 20 to 1500 ml (Display range: 0 ~ 2000 ml)
3	69e609a11d522a8c2a7de9ea	69e609d71d522a8c2a7de9ed	Respiratory Rate:	1 ~ 100 bpm
4	69e609a11d522a8c2a7de9ea	69e609e71d522a8c2a7de9ee	Inspiratory/Expiratory (I:E) Ratio:	8:1 ~ 1:10 (Capable of inverse ratio ventilation)
5	69e609a11d522a8c2a7de9ea	69e609f81d522a8c2a7de9ef	PEEP Range:	0 ~ 20 cmH2O (Electronically controlled)
6	69e609a11d522a8c2a7de9ea	69e60a061d522a8c2a7de9f0	Inspiratory Pressure Trigger:	-10 ~ 10 cmH2O (Electronically controlled)
7	69e609a11d522a8c2a7de9ea	69e60a131d522a8c2a7de9f1	Sigh Function:	1 sigh breath in every 80 ~ 120 breaths
8	69e609a11d522a8c2a7de9ea	69e60a2d1d522a8c2a7de9f2	SIMV Rate:	1 ~ 20 bpm
9	69e609a11d522a8c2a7de9ea	69e60a391d522a8c2a7de9f3	Inspiratory Plateau:	0 ~ 1 second
1	69e60a4b1d522a8c2a7de9f4	69e60a541d522a8c2a7de9f5	Flowmeter Range:	O2 (0.1 ~ 10 L/min), N2O (0.1 ~ 10 L/min), Air (0.1 ~ 10 L/min)
2	69e60a4b1d522a8c2a7de9f4	69e60a621d522a8c2a7de9f6	Vaporizer Slots:	Double PA-I type slots (Accommodates Enflurane, Isoflurane, or Sevoflurane)
3	69e60a4b1d522a8c2a7de9f4	69e60a6f1d522a8c2a7de9f7	Vaporizer Concentration Range:	0 ~ 5% (Includes built-in self-compensating functionality)
4	69e60a4b1d522a8c2a7de9f4	69e60a7c1d522a8c2a7de9f8	Inhaled Oxygen Concentration Monitor:	21 ~ 100%
1	69e72f2f3220efc4a063a405	69e72fe33220efc4a063a406	Device Type:	Auto CPAP (Continuous Positive Airway Pressure)
2	69e72f2f3220efc4a063a405	69e72ff43220efc4a063a407	Pressure Range:	4-20 cmH2O
3	69e72f2f3220efc4a063a405	69e7300b3220efc4a063a408	Ramp Time:	0-60 minutes
4	69e72f2f3220efc4a063a405	69e730193220efc4a063a409	Noise Level:	Γëñ 30dB
5	69e72f2f3220efc4a063a405	69e730273220efc4a063a40a	Humidification System:	Heated humidifier with 5 adjustable levels and a 300ml volume
6	69e72f2f3220efc4a063a405	69e730373220efc4a063a40b	Weight:	Main device is 0.88 kg; 1.26 kg with the humidifier included
7	69e72f2f3220efc4a063a405	69e730453220efc4a063a40c	Alerts:	Features alerts for power down, leaks, filter changes, an alarm clock, and customized notifications
8	69e72f2f3220efc4a063a405	69e730543220efc4a063a40d	Design Options:	Available in four color choices to suit your personal preference
1	69f58f7f4b30a8ecdb2fbd23	69f58f814b30a8ecdb2fbd24	Lead Configuration	10-Lead (AHA/IEC compatible)
2	69f58f7f4b30a8ecdb2fbd23	69f58f8b4b30a8ecdb2fbd25	Patient Side Connector	4.0mm Banana Plug
3	69f58f7f4b30a8ecdb2fbd23	69f58fa94b30a8ecdb2fbd26	Machine Side Connector	15-Pin D-Sub
4	69f58f7f4b30a8ecdb2fbd23	69f58fb74b30a8ecdb2fbd27	Material	Medical-grade TPU (Latex-free)
5	69f58f7f4b30a8ecdb2fbd23	69f58fc44b30a8ecdb2fbd28	Cable Length	Standard clinical length (approx. 3 meters)
6	69f58f7f4b30a8ecdb2fbd23	69f58fd54b30a8ecdb2fbd29	Compliance	CE Certified
1	69f6e9ede765d7cd64ec2575	69f6e9f1e765d7cd64ec2576	Cuff Size\t	27cm ΓÇô 35cm (Standard Adult)
2	69f6e9ede765d7cd64ec2575	69f6ea01e765d7cd64ec2577	Material\t	Nylon / TPU
1	69d72ad886da9424464137fb	69d72ad886da9424464137f8	Illuminance	50,000-160,000 Lux
2	69d72ad886da9424464137fb	69d72ad886da9424464137f9	LED Bulbs	84 pcs
3	69d72ad886da9424464137fb	69d72ad886da9424464137fa	Service Life	ΓëÑ60,000 Hours
3	69f6e9ede765d7cd64ec2575	69f6ea0fe765d7cd64ec2578	Color\t	Slate Grey / Brown
\.


--
-- Data for Name: products_support_blocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_support_blocks (_order, _parent_id, id, title, body) FROM stdin;
\.


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.site_settings (id, company_name, tagline, address, main_phone, secondary_phone, marketing_phone, service_phone, email, about_summary, trust_summary, global_support_text, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testimonials (id, client_name, designation, hospital, quote, avatar_id, rating, sort_order, is_active, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	2026-04-26 12:37:29.927+00	2026-04-09 04:20:32.694+00	dibbodutta06@gmail.com	\N	\N	421dfdd008249f8a2ac9c114fae7586b57cd19e63d90df6f7a89467f97030b3e	ba33091b59304726a6d9496098f3debe002b61f5ec6d9713f7798848e373f54008053cad4f002a8781dda9818c1da53baad35bcb0b1a562decaaccab99ae6903b6861430a54dea5e3f695fd300d91dfa2f976707562f3a952204b72bb2aa2ec639abaf36788fa00405bb5e2df3fe63b05dda7bceab434ae85ba1ebaf73895071916dce2e80d0a3b9ada007754288dd9cc5cda51b982de18f7ee026d9b3fb7e2e4d1fab286b1bfdec92e7bcd9e19b879054a34eed0d5238a4d361bcc4149f4c5a14f948db1a4d9ee1e8df2c78d50c45bedc5ba2a487bf85f40b3f01c61600424d192ab56119f0b40017589ffb72e1b852467f426d0bdf20510ef90ceb0665a3eab012a65b05b6a2edfabeb42b83af412d62bb3d12a58b92762dbc2052eaf33559a62ea576a0394889ebd68873ece682b816274b2f0c4f97241f3f15d67bc70d43116af6640145de1385d24efa50e4223b338a5145cbad96d0674e18feb98a1bcab382b164cdfa3ca13a914afee0348b0c69c49ad619c760edf062ed81b5297a6d60767c410349c300c6dffc548d93d0b2485657a41193cd02ce8898f6344e022eedaf599b888caa99446886fa7d0a333907e245c9ee4f4885c217405ac69df913b66b34d262d151445491f01de3a2f5b18880c212c9597284b80555b88f5e92b6abdd7901c27cbb86cee2e8e82446e23d33e9aed387980b09a33012851d6c2e33	0	\N
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
\.


--
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_id_seq', 31, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 9, true);


--
-- Name: certifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.certifications_id_seq', 1, false);


--
-- Name: certifications_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.certifications_rels_id_seq', 1, false);


--
-- Name: client_logos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_logos_id_seq', 1, false);


--
-- Name: faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faqs_id_seq', 1, false);


--
-- Name: gallery_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gallery_posts_id_seq', 1, false);


--
-- Name: gallery_videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gallery_videos_id_seq', 1, false);


--
-- Name: inquiries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inquiries_id_seq', 2, true);


--
-- Name: legal_pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.legal_pages_id_seq', 1, false);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_id_seq', 245, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 16, true);


--
-- Name: partner_logos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.partner_logos_id_seq', 8, true);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_kv_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 359, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 718, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 42, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 149, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 46, true);


--
-- Name: products_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_rels_id_seq', 54, true);


--
-- Name: site_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.site_settings_id_seq', 1, false);


--
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: certifications certifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certifications
    ADD CONSTRAINT certifications_pkey PRIMARY KEY (id);


--
-- Name: certifications_rels certifications_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certifications_rels
    ADD CONSTRAINT certifications_rels_pkey PRIMARY KEY (id);


--
-- Name: client_logos client_logos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_logos
    ADD CONSTRAINT client_logos_pkey PRIMARY KEY (id);


--
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- Name: gallery_posts gallery_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_posts
    ADD CONSTRAINT gallery_posts_pkey PRIMARY KEY (id);


--
-- Name: gallery_videos gallery_videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_videos
    ADD CONSTRAINT gallery_videos_pkey PRIMARY KEY (id);


--
-- Name: inquiries inquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_pkey PRIMARY KEY (id);


--
-- Name: legal_pages legal_pages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.legal_pages
    ADD CONSTRAINT legal_pages_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: orders_items orders_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT orders_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: partner_logos partner_logos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_logos
    ADD CONSTRAINT partner_logos_pkey PRIMARY KEY (id);


--
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: products_applications products_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_applications
    ADD CONSTRAINT products_applications_pkey PRIMARY KEY (id);


--
-- Name: products_download_items products_download_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_download_items
    ADD CONSTRAINT products_download_items_pkey PRIMARY KEY (id);


--
-- Name: products_faq_items products_faq_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_faq_items
    ADD CONSTRAINT products_faq_items_pkey PRIMARY KEY (id);


--
-- Name: products_gallery products_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_gallery
    ADD CONSTRAINT products_gallery_pkey PRIMARY KEY (id);


--
-- Name: products_key_highlights products_key_highlights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_key_highlights
    ADD CONSTRAINT products_key_highlights_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products_rels products_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_rels
    ADD CONSTRAINT products_rels_pkey PRIMARY KEY (id);


--
-- Name: products_spec_groups products_spec_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_spec_groups
    ADD CONSTRAINT products_spec_groups_pkey PRIMARY KEY (id);


--
-- Name: products_spec_groups_rows products_spec_groups_rows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_spec_groups_rows
    ADD CONSTRAINT products_spec_groups_rows_pkey PRIMARY KEY (id);


--
-- Name: products_support_blocks products_support_blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_support_blocks
    ADD CONSTRAINT products_support_blocks_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- Name: brands_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX brands_created_at_idx ON public.brands USING btree (created_at);


--
-- Name: brands_logo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX brands_logo_idx ON public.brands USING btree (logo_id);


--
-- Name: brands_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX brands_name_idx ON public.brands USING btree (name);


--
-- Name: brands_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX brands_slug_idx ON public.brands USING btree (slug);


--
-- Name: brands_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX brands_updated_at_idx ON public.brands USING btree (updated_at);


--
-- Name: categories_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_created_at_idx ON public.categories USING btree (created_at);


--
-- Name: categories_hero_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_hero_image_idx ON public.categories USING btree (hero_image_id);


--
-- Name: categories_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_meta_meta_image_idx ON public.categories USING btree (meta_image_id);


--
-- Name: categories_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_parent_idx ON public.categories USING btree (parent_id);


--
-- Name: categories_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX categories_slug_idx ON public.categories USING btree (slug);


--
-- Name: categories_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_updated_at_idx ON public.categories USING btree (updated_at);


--
-- Name: certifications_badge_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX certifications_badge_image_idx ON public.certifications USING btree (badge_image_id);


--
-- Name: certifications_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX certifications_created_at_idx ON public.certifications USING btree (created_at);


--
-- Name: certifications_rels_brands_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX certifications_rels_brands_id_idx ON public.certifications_rels USING btree (brands_id);


--
-- Name: certifications_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX certifications_rels_order_idx ON public.certifications_rels USING btree ("order");


--
-- Name: certifications_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX certifications_rels_parent_idx ON public.certifications_rels USING btree (parent_id);


--
-- Name: certifications_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX certifications_rels_path_idx ON public.certifications_rels USING btree (path);


--
-- Name: certifications_rels_products_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX certifications_rels_products_id_idx ON public.certifications_rels USING btree (products_id);


--
-- Name: certifications_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX certifications_updated_at_idx ON public.certifications USING btree (updated_at);


--
-- Name: client_logos_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX client_logos_created_at_idx ON public.client_logos USING btree (created_at);


--
-- Name: client_logos_logo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX client_logos_logo_idx ON public.client_logos USING btree (logo_id);


--
-- Name: client_logos_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX client_logos_updated_at_idx ON public.client_logos USING btree (updated_at);


--
-- Name: faqs_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX faqs_created_at_idx ON public.faqs USING btree (created_at);


--
-- Name: faqs_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX faqs_updated_at_idx ON public.faqs USING btree (updated_at);


--
-- Name: gallery_posts_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gallery_posts_created_at_idx ON public.gallery_posts USING btree (created_at);


--
-- Name: gallery_posts_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gallery_posts_image_idx ON public.gallery_posts USING btree (image_id);


--
-- Name: gallery_posts_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gallery_posts_updated_at_idx ON public.gallery_posts USING btree (updated_at);


--
-- Name: gallery_videos_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gallery_videos_created_at_idx ON public.gallery_videos USING btree (created_at);


--
-- Name: gallery_videos_thumbnail_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gallery_videos_thumbnail_idx ON public.gallery_videos USING btree (thumbnail_id);


--
-- Name: gallery_videos_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gallery_videos_updated_at_idx ON public.gallery_videos USING btree (updated_at);


--
-- Name: gallery_videos_video_file_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX gallery_videos_video_file_idx ON public.gallery_videos USING btree (video_file_id);


--
-- Name: inquiries_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX inquiries_created_at_idx ON public.inquiries USING btree (created_at);


--
-- Name: inquiries_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX inquiries_updated_at_idx ON public.inquiries USING btree (updated_at);


--
-- Name: legal_pages_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX legal_pages_created_at_idx ON public.legal_pages USING btree (created_at);


--
-- Name: legal_pages_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX legal_pages_meta_meta_image_idx ON public.legal_pages USING btree (meta_image_id);


--
-- Name: legal_pages_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX legal_pages_slug_idx ON public.legal_pages USING btree (slug);


--
-- Name: legal_pages_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX legal_pages_updated_at_idx ON public.legal_pages USING btree (updated_at);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: orders_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_created_at_idx ON public.orders USING btree (created_at);


--
-- Name: orders_items_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_items_order_idx ON public.orders_items USING btree (_order);


--
-- Name: orders_items_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_items_parent_id_idx ON public.orders_items USING btree (_parent_id);


--
-- Name: orders_items_product_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_items_product_idx ON public.orders_items USING btree (product_id);


--
-- Name: orders_order_number_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX orders_order_number_idx ON public.orders USING btree (order_number);


--
-- Name: orders_payment_evidence_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_payment_evidence_idx ON public.orders USING btree (payment_evidence_id);


--
-- Name: orders_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_updated_at_idx ON public.orders USING btree (updated_at);


--
-- Name: partner_logos_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX partner_logos_created_at_idx ON public.partner_logos USING btree (created_at);


--
-- Name: partner_logos_logo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX partner_logos_logo_idx ON public.partner_logos USING btree (logo_id);


--
-- Name: partner_logos_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX partner_logos_updated_at_idx ON public.partner_logos USING btree (updated_at);


--
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_brands_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_brands_id_idx ON public.payload_locked_documents_rels USING btree (brands_id);


--
-- Name: payload_locked_documents_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_categories_id_idx ON public.payload_locked_documents_rels USING btree (categories_id);


--
-- Name: payload_locked_documents_rels_certifications_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_certifications_id_idx ON public.payload_locked_documents_rels USING btree (certifications_id);


--
-- Name: payload_locked_documents_rels_client_logos_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_client_logos_id_idx ON public.payload_locked_documents_rels USING btree (client_logos_id);


--
-- Name: payload_locked_documents_rels_faqs_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_faqs_id_idx ON public.payload_locked_documents_rels USING btree (faqs_id);


--
-- Name: payload_locked_documents_rels_gallery_posts_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_gallery_posts_id_idx ON public.payload_locked_documents_rels USING btree (gallery_posts_id);


--
-- Name: payload_locked_documents_rels_gallery_videos_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_gallery_videos_id_idx ON public.payload_locked_documents_rels USING btree (gallery_videos_id);


--
-- Name: payload_locked_documents_rels_inquiries_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_inquiries_id_idx ON public.payload_locked_documents_rels USING btree (inquiries_id);


--
-- Name: payload_locked_documents_rels_legal_pages_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_legal_pages_id_idx ON public.payload_locked_documents_rels USING btree (legal_pages_id);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_orders_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_orders_id_idx ON public.payload_locked_documents_rels USING btree (orders_id);


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_partner_logos_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_partner_logos_id_idx ON public.payload_locked_documents_rels USING btree (partner_logos_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_products_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_products_id_idx ON public.payload_locked_documents_rels USING btree (products_id);


--
-- Name: payload_locked_documents_rels_testimonials_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_testimonials_id_idx ON public.payload_locked_documents_rels USING btree (testimonials_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: products_applications_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_applications_order_idx ON public.products_applications USING btree (_order);


--
-- Name: products_applications_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_applications_parent_id_idx ON public.products_applications USING btree (_parent_id);


--
-- Name: products_brand_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_brand_idx ON public.products USING btree (brand_id);


--
-- Name: products_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_category_idx ON public.products USING btree (category_id);


--
-- Name: products_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_created_at_idx ON public.products USING btree (created_at);


--
-- Name: products_download_items_file_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_download_items_file_idx ON public.products_download_items USING btree (file_id);


--
-- Name: products_download_items_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_download_items_order_idx ON public.products_download_items USING btree (_order);


--
-- Name: products_download_items_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_download_items_parent_id_idx ON public.products_download_items USING btree (_parent_id);


--
-- Name: products_faq_items_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_faq_items_order_idx ON public.products_faq_items USING btree (_order);


--
-- Name: products_faq_items_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_faq_items_parent_id_idx ON public.products_faq_items USING btree (_parent_id);


--
-- Name: products_gallery_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_gallery_image_idx ON public.products_gallery USING btree (image_id);


--
-- Name: products_gallery_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_gallery_order_idx ON public.products_gallery USING btree (_order);


--
-- Name: products_gallery_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_gallery_parent_id_idx ON public.products_gallery USING btree (_parent_id);


--
-- Name: products_hero_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_hero_image_idx ON public.products USING btree (hero_image_id);


--
-- Name: products_key_highlights_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_key_highlights_order_idx ON public.products_key_highlights USING btree (_order);


--
-- Name: products_key_highlights_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_key_highlights_parent_id_idx ON public.products_key_highlights USING btree (_parent_id);


--
-- Name: products_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_meta_meta_image_idx ON public.products USING btree (meta_image_id);


--
-- Name: products_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_rels_order_idx ON public.products_rels USING btree ("order");


--
-- Name: products_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_rels_parent_idx ON public.products_rels USING btree (parent_id);


--
-- Name: products_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_rels_path_idx ON public.products_rels USING btree (path);


--
-- Name: products_rels_products_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_rels_products_id_idx ON public.products_rels USING btree (products_id);


--
-- Name: products_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX products_slug_idx ON public.products USING btree (slug);


--
-- Name: products_spec_groups_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_spec_groups_order_idx ON public.products_spec_groups USING btree (_order);


--
-- Name: products_spec_groups_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_spec_groups_parent_id_idx ON public.products_spec_groups USING btree (_parent_id);


--
-- Name: products_spec_groups_rows_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_spec_groups_rows_order_idx ON public.products_spec_groups_rows USING btree (_order);


--
-- Name: products_spec_groups_rows_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_spec_groups_rows_parent_id_idx ON public.products_spec_groups_rows USING btree (_parent_id);


--
-- Name: products_support_blocks_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_support_blocks_order_idx ON public.products_support_blocks USING btree (_order);


--
-- Name: products_support_blocks_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_support_blocks_parent_id_idx ON public.products_support_blocks USING btree (_parent_id);


--
-- Name: products_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_updated_at_idx ON public.products USING btree (updated_at);


--
-- Name: testimonials_avatar_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX testimonials_avatar_idx ON public.testimonials USING btree (avatar_id);


--
-- Name: testimonials_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX testimonials_created_at_idx ON public.testimonials USING btree (created_at);


--
-- Name: testimonials_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX testimonials_updated_at_idx ON public.testimonials USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: brands brands_logo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_logo_id_media_id_fk FOREIGN KEY (logo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: categories categories_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_hero_image_id_media_id_fk FOREIGN KEY (hero_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: categories categories_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: categories categories_parent_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_categories_id_fk FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: certifications certifications_badge_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certifications
    ADD CONSTRAINT certifications_badge_image_id_media_id_fk FOREIGN KEY (badge_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: certifications_rels certifications_rels_brands_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certifications_rels
    ADD CONSTRAINT certifications_rels_brands_fk FOREIGN KEY (brands_id) REFERENCES public.brands(id) ON DELETE CASCADE;


--
-- Name: certifications_rels certifications_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certifications_rels
    ADD CONSTRAINT certifications_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.certifications(id) ON DELETE CASCADE;


--
-- Name: certifications_rels certifications_rels_products_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certifications_rels
    ADD CONSTRAINT certifications_rels_products_fk FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: client_logos client_logos_logo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_logos
    ADD CONSTRAINT client_logos_logo_id_media_id_fk FOREIGN KEY (logo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: gallery_posts gallery_posts_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_posts
    ADD CONSTRAINT gallery_posts_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: gallery_videos gallery_videos_thumbnail_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_videos
    ADD CONSTRAINT gallery_videos_thumbnail_id_media_id_fk FOREIGN KEY (thumbnail_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: gallery_videos gallery_videos_video_file_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_videos
    ADD CONSTRAINT gallery_videos_video_file_id_media_id_fk FOREIGN KEY (video_file_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: legal_pages legal_pages_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.legal_pages
    ADD CONSTRAINT legal_pages_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: orders_items orders_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT orders_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: orders_items orders_items_product_id_products_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT orders_items_product_id_products_id_fk FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;


--
-- Name: orders orders_payment_evidence_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_payment_evidence_id_media_id_fk FOREIGN KEY (payment_evidence_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: partner_logos partner_logos_logo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partner_logos
    ADD CONSTRAINT partner_logos_logo_id_media_id_fk FOREIGN KEY (logo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_brands_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_brands_fk FOREIGN KEY (brands_id) REFERENCES public.brands(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_certifications_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_certifications_fk FOREIGN KEY (certifications_id) REFERENCES public.certifications(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_client_logos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_client_logos_fk FOREIGN KEY (client_logos_id) REFERENCES public.client_logos(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_faqs_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_faqs_fk FOREIGN KEY (faqs_id) REFERENCES public.faqs(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_gallery_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_gallery_posts_fk FOREIGN KEY (gallery_posts_id) REFERENCES public.gallery_posts(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_gallery_videos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_gallery_videos_fk FOREIGN KEY (gallery_videos_id) REFERENCES public.gallery_videos(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_inquiries_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_inquiries_fk FOREIGN KEY (inquiries_id) REFERENCES public.inquiries(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_legal_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_legal_pages_fk FOREIGN KEY (legal_pages_id) REFERENCES public.legal_pages(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_orders_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_orders_fk FOREIGN KEY (orders_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_partner_logos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_partner_logos_fk FOREIGN KEY (partner_logos_id) REFERENCES public.partner_logos(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_products_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_products_fk FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_testimonials_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_testimonials_fk FOREIGN KEY (testimonials_id) REFERENCES public.testimonials(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: products_applications products_applications_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_applications
    ADD CONSTRAINT products_applications_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_brand_id_brands_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_brand_id_brands_id_fk FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE SET NULL;


--
-- Name: products products_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: products_download_items products_download_items_file_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_download_items
    ADD CONSTRAINT products_download_items_file_id_media_id_fk FOREIGN KEY (file_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_download_items products_download_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_download_items
    ADD CONSTRAINT products_download_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_faq_items products_faq_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_faq_items
    ADD CONSTRAINT products_faq_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_gallery products_gallery_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_gallery
    ADD CONSTRAINT products_gallery_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_gallery products_gallery_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_gallery
    ADD CONSTRAINT products_gallery_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_hero_image_id_media_id_fk FOREIGN KEY (hero_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_key_highlights products_key_highlights_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_key_highlights
    ADD CONSTRAINT products_key_highlights_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_rels products_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_rels
    ADD CONSTRAINT products_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_rels products_rels_products_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_rels
    ADD CONSTRAINT products_rels_products_fk FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_spec_groups products_spec_groups_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_spec_groups
    ADD CONSTRAINT products_spec_groups_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_spec_groups_rows products_spec_groups_rows_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_spec_groups_rows
    ADD CONSTRAINT products_spec_groups_rows_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products_spec_groups(id) ON DELETE CASCADE;


--
-- Name: products_support_blocks products_support_blocks_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_support_blocks
    ADD CONSTRAINT products_support_blocks_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: testimonials testimonials_avatar_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_avatar_id_media_id_fk FOREIGN KEY (avatar_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict aJgd4qOhvhZYVnVtNjUfiaGzTWqYe1AFRrc9lRifQyx823YOkuos4jefHTSG6g2

