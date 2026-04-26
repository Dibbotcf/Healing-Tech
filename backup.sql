--
-- PostgreSQL database dump
--

\restrict RQD7Z1IfAjTJhqZmowbBCWaDuYuljrVG4Xk1TtZ5BBUvtjdMOTVPdGusWn8maSu

-- Dumped from database version 14.22 (Ubuntu 14.22-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.22 (Ubuntu 14.22-0ubuntu0.22.04.1)

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

--
-- Name: enum_faqs_category; Type: TYPE; Schema: public; Owner: healingtech
--

CREATE TYPE public.enum_faqs_category AS ENUM (
    'general',
    'products',
    'order-delivery',
    'support-warranty',
    'technical'
);


ALTER TYPE public.enum_faqs_category OWNER TO healingtech;

--
-- Name: enum_inquiries_status; Type: TYPE; Schema: public; Owner: healingtech
--

CREATE TYPE public.enum_inquiries_status AS ENUM (
    'new',
    'in-progress',
    'resolved'
);


ALTER TYPE public.enum_inquiries_status OWNER TO healingtech;

--
-- Name: enum_legal_pages_page_type; Type: TYPE; Schema: public; Owner: healingtech
--

CREATE TYPE public.enum_legal_pages_page_type AS ENUM (
    'privacy-policy',
    'terms-and-conditions',
    'disclaimer',
    'warranty-refund-policy'
);


ALTER TYPE public.enum_legal_pages_page_type OWNER TO healingtech;

--
-- Name: enum_orders_payment_method; Type: TYPE; Schema: public; Owner: healingtech
--

CREATE TYPE public.enum_orders_payment_method AS ENUM (
    'bkash',
    'sslcommerz',
    'cod'
);


ALTER TYPE public.enum_orders_payment_method OWNER TO healingtech;

--
-- Name: enum_orders_payment_status; Type: TYPE; Schema: public; Owner: healingtech
--

CREATE TYPE public.enum_orders_payment_status AS ENUM (
    'unpaid',
    'paid',
    'failed'
);


ALTER TYPE public.enum_orders_payment_status OWNER TO healingtech;

--
-- Name: enum_orders_status; Type: TYPE; Schema: public; Owner: healingtech
--

CREATE TYPE public.enum_orders_status AS ENUM (
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
);


ALTER TYPE public.enum_orders_status OWNER TO healingtech;

--
-- Name: enum_products_download_items_type; Type: TYPE; Schema: public; Owner: healingtech
--

CREATE TYPE public.enum_products_download_items_type AS ENUM (
    'brochure',
    'datasheet',
    'manual',
    'certificate',
    'warranty-note'
);


ALTER TYPE public.enum_products_download_items_type OWNER TO healingtech;

--
-- Name: enum_products_status; Type: TYPE; Schema: public; Owner: healingtech
--

CREATE TYPE public.enum_products_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_products_status OWNER TO healingtech;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: brands; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.brands OWNER TO healingtech;

--
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brands_id_seq OWNER TO healingtech;

--
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.categories OWNER TO healingtech;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO healingtech;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: certifications; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.certifications OWNER TO healingtech;

--
-- Name: certifications_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.certifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.certifications_id_seq OWNER TO healingtech;

--
-- Name: certifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.certifications_id_seq OWNED BY public.certifications.id;


--
-- Name: certifications_rels; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.certifications_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    brands_id integer,
    products_id integer
);


ALTER TABLE public.certifications_rels OWNER TO healingtech;

--
-- Name: certifications_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.certifications_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.certifications_rels_id_seq OWNER TO healingtech;

--
-- Name: certifications_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.certifications_rels_id_seq OWNED BY public.certifications_rels.id;


--
-- Name: client_logos; Type: TABLE; Schema: public; Owner: healingtechnology.co_bgieab3zdtl
--

CREATE TABLE public.client_logos (
    id integer NOT NULL,
    name character varying NOT NULL,
    logo_id integer NOT NULL,
    website character varying,
    sort_order numeric DEFAULT 0,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.client_logos OWNER TO "healingtechnology.co_bgieab3zdtl";

--
-- Name: client_logos_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtechnology.co_bgieab3zdtl
--

CREATE SEQUENCE public.client_logos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.client_logos_id_seq OWNER TO "healingtechnology.co_bgieab3zdtl";

--
-- Name: client_logos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtechnology.co_bgieab3zdtl
--

ALTER SEQUENCE public.client_logos_id_seq OWNED BY public.client_logos.id;


--
-- Name: faqs; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.faqs OWNER TO healingtech;

--
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faqs_id_seq OWNER TO healingtech;

--
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.faqs_id_seq OWNED BY public.faqs.id;


--
-- Name: inquiries; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.inquiries OWNER TO healingtech;

--
-- Name: inquiries_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.inquiries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inquiries_id_seq OWNER TO healingtech;

--
-- Name: inquiries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.inquiries_id_seq OWNED BY public.inquiries.id;


--
-- Name: legal_pages; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.legal_pages OWNER TO healingtech;

--
-- Name: legal_pages_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.legal_pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.legal_pages_id_seq OWNER TO healingtech;

--
-- Name: legal_pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.legal_pages_id_seq OWNED BY public.legal_pages.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.media OWNER TO healingtech;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.media_id_seq OWNER TO healingtech;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.orders OWNER TO healingtech;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO healingtech;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: orders_items; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.orders_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    product_id integer NOT NULL,
    quantity numeric NOT NULL,
    price_at_purchase numeric NOT NULL
);


ALTER TABLE public.orders_items OWNER TO healingtech;

--
-- Name: partner_logos; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.partner_logos OWNER TO healingtech;

--
-- Name: partner_logos_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.partner_logos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.partner_logos_id_seq OWNER TO healingtech;

--
-- Name: partner_logos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.partner_logos_id_seq OWNED BY public.partner_logos.id;


--
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);


ALTER TABLE public.payload_kv OWNER TO healingtech;

--
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_kv_id_seq OWNER TO healingtech;

--
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_locked_documents OWNER TO healingtech;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_locked_documents_id_seq OWNER TO healingtech;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: healingtech
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
    client_logos_id integer
);


ALTER TABLE public.payload_locked_documents_rels OWNER TO healingtech;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_locked_documents_rels_id_seq OWNER TO healingtech;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_migrations OWNER TO healingtech;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_migrations_id_seq OWNER TO healingtech;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_preferences OWNER TO healingtech;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_preferences_id_seq OWNER TO healingtech;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


ALTER TABLE public.payload_preferences_rels OWNER TO healingtech;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_preferences_rels_id_seq OWNER TO healingtech;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.products OWNER TO healingtech;

--
-- Name: products_applications; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.products_applications (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    department character varying NOT NULL
);


ALTER TABLE public.products_applications OWNER TO healingtech;

--
-- Name: products_download_items; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.products_download_items OWNER TO healingtech;

--
-- Name: products_faq_items; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.products_faq_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    question character varying NOT NULL,
    answer character varying NOT NULL
);


ALTER TABLE public.products_faq_items OWNER TO healingtech;

--
-- Name: products_gallery; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.products_gallery (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL,
    alt character varying
);


ALTER TABLE public.products_gallery OWNER TO healingtech;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO healingtech;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: products_key_highlights; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.products_key_highlights (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    item character varying NOT NULL
);


ALTER TABLE public.products_key_highlights OWNER TO healingtech;

--
-- Name: products_rels; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.products_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    products_id integer
);


ALTER TABLE public.products_rels OWNER TO healingtech;

--
-- Name: products_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.products_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_rels_id_seq OWNER TO healingtech;

--
-- Name: products_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.products_rels_id_seq OWNED BY public.products_rels.id;


--
-- Name: products_spec_groups; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.products_spec_groups (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    group_title character varying NOT NULL
);


ALTER TABLE public.products_spec_groups OWNER TO healingtech;

--
-- Name: products_spec_groups_rows; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.products_spec_groups_rows (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    label character varying NOT NULL,
    value character varying NOT NULL
);


ALTER TABLE public.products_spec_groups_rows OWNER TO healingtech;

--
-- Name: products_support_blocks; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.products_support_blocks (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    title character varying NOT NULL,
    body character varying NOT NULL
);


ALTER TABLE public.products_support_blocks OWNER TO healingtech;

--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.site_settings OWNER TO healingtech;

--
-- Name: site_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.site_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.site_settings_id_seq OWNER TO healingtech;

--
-- Name: site_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.site_settings_id_seq OWNED BY public.site_settings.id;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.testimonials OWNER TO healingtech;

--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.testimonials_id_seq OWNER TO healingtech;

--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: healingtech
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


ALTER TABLE public.users OWNER TO healingtech;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: healingtech
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO healingtech;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: healingtech
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: healingtech
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


ALTER TABLE public.users_sessions OWNER TO healingtech;

--
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: certifications id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.certifications ALTER COLUMN id SET DEFAULT nextval('public.certifications_id_seq'::regclass);


--
-- Name: certifications_rels id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.certifications_rels ALTER COLUMN id SET DEFAULT nextval('public.certifications_rels_id_seq'::regclass);


--
-- Name: client_logos id; Type: DEFAULT; Schema: public; Owner: healingtechnology.co_bgieab3zdtl
--

ALTER TABLE ONLY public.client_logos ALTER COLUMN id SET DEFAULT nextval('public.client_logos_id_seq'::regclass);


--
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.faqs ALTER COLUMN id SET DEFAULT nextval('public.faqs_id_seq'::regclass);


--
-- Name: inquiries id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.inquiries ALTER COLUMN id SET DEFAULT nextval('public.inquiries_id_seq'::regclass);


--
-- Name: legal_pages id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.legal_pages ALTER COLUMN id SET DEFAULT nextval('public.legal_pages_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: partner_logos id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.partner_logos ALTER COLUMN id SET DEFAULT nextval('public.partner_logos_id_seq'::regclass);


--
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: products_rels id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_rels ALTER COLUMN id SET DEFAULT nextval('public.products_rels_id_seq'::regclass);


--
-- Name: site_settings id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.site_settings ALTER COLUMN id SET DEFAULT nextval('public.site_settings_id_seq'::regclass);


--
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: healingtech
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
24	Beyond	Beyond	UK	Beyond (Hunan Beyond Medical Technology) BiPAP and CPAP machines, such as the By-Dreamy B19 and ResPlus B-30P, are budget-friendly, Chinese-manufactured respiratory devices designed for OSAHS and respiratory failure. They feature 3.5” TFT displays, heated humidifiers, auto-adjusting pressures (4-30 cmH₂O), and quiet motors (<30dB) for home/clinic use.	\N	11	\N	t	2026-04-15 07:03:59.921+00	2026-04-13 05:10:30.345+00
21	Disonmed	Disonmed	China	Disonmed (Zhengzhou Dison Instrument and Meter Co., Ltd.) is a professional manufacturer and developer of neonatal intensive care medical devices established in 1997. With over 25 years of experience, the company focuses on designing and producing equipment to support newborn care and treatment.	\N	13	\N	t	2026-04-15 07:08:49.838+00	2026-04-12 04:54:56.01+00
20	Le Medical	Le Medical	China	Shenzhen Le Medical Technology Co., Ltd. is a professional manufacturer and R&D-focused company established in 2017, specializing in diagnostic ECG machines, multi-parameter patient monitors, syringe pumps, and infusion pumps. Located in Shenzhen, China, they offer OEM/ODM services, focusing on providing high-quality, portable monitoring and life support devices for clinical settings.	\N	19	\N	t	2026-04-15 09:55:28.838+00	2026-04-12 04:51:43.634+00
26	NOVEL	NOVEL	China	NOVEL microscopes, produced by Ningbo Yongxin Optics, are reliable, high-quality optical instruments designed for educational, clinical, and research applications. The popular NOVEL XSZ-107T series features 1000x magnification, LED illumination, and robust mechanical stages, widely used for histology and pathology.	\N	22	\N	t	2026-04-15 09:58:35.856+00	2026-04-13 05:18:48.459+00
23	National Electrocare	National Electrocare	Bangladesh	National Electrocare is a Bangladesh-based manufacturer and supplier specializing in physiotherapy, rehabilitation, and electrotherapy equipment. They focus on providing high-quality, locally produced, and affordable devices—such as ultrasound therapy machines, traction units, and TENS units—to clinics and hospitals for pain management.	\N	23	\N	t	2026-04-15 09:59:37.992+00	2026-04-13 05:07:05.579+00
10	Puao Medical	Nanjing Puao Medical Equipment	China	Nanjing Puao Medical Equipment Co.Ltd. is a prominent Chinese manufacturer specializing in anesthesia machines, ventilators, and patient monitors. Based in Nanjing and established in the 1970s, it is a high-tech enterprise that exports medical hardware to over 100 countries. The company holds CE and ISO certifications, supplying both domestic hospitals and international markets with critical care equipment.	\N	26	\N	t	2026-04-15 10:05:40.269+00	2026-04-11 09:38:11.606+00
27	HFMED	hfmed	China	Manufacturer: Shanghai Huifeng Medical Instrument Co., Ltd. is a high-tech enterprise with nearly 30 years of manufacturing experience.\nProduction Scale: Operates three dedicated factories with strict, in-house quality control and offers customized OEM services directly, eliminating third-party involvement.\nCore Products: Specializes in over 200 varieties of commercial medical equipment, focusing heavily on surgical lights, operating tables, and medical pendants.\nGlobal Supply: Distributes products to over 200 countries, with established sales bases in over 50 countries.\nCompliance: Fully certified for international commercial distribution with ISO 9001, ISO 13485, CE, SGS, and FDA certifications.	\N	34	\N	t	2026-04-15 11:00:07.772+00	2026-04-15 10:58:45.979+00
29	TRIUP	triup	China	Founded in 1997, TRIUP International Corp. is a globally recognized manufacturer and exporter of premium medical equipment. Based in Nanjing, China, TRIUP specializes in delivering high-quality, reliable medical solutions to healthcare facilities worldwide.	\N	60	\N	t	2026-04-19 07:52:04.616+00	2026-04-19 07:52:04.616+00
30	SOFT TOUCH	softtouch	China	SOFT TOUCH is a trusted medical equipment brand dedicated to combining high-performance technology with clinical precision. Specializing in advanced surgical and critical care solutions—including high-frequency electrosurgical units and anesthesia workstations—we empower healthcare professionals with reliable, user-centric equipment. Built to stringent international safety standards, SOFT TOUCH delivers uncompromising quality and intuitive design, ensuring precise, minimally invasive care for optimal patient outcomes.	\N	93	\N	t	2026-04-20 11:51:44.441+00	2026-04-20 11:51:44.441+00
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.categories (id, title, slug, parent_id, short_description, hero_title, hero_description, sort_order, is_active, meta_title, meta_description, meta_image_id, updated_at, created_at, hero_image_id) FROM stdin;
2	ICU Equipment	icu-equipment	\N	\N	\N	\N	\N	t	\N	\N	\N	2026-04-09 04:28:08.664+00	2026-04-09 04:28:08.664+00	\N
3	Neonatal Care	neonatal-care	\N	\N	\N	\N	\N	t	\N	\N	\N	2026-04-09 04:28:08.674+00	2026-04-09 04:28:08.673+00	\N
7	Operation Theater Equipments	ot-quipments	\N	\N	\N	\N	\N	t	Healing Technology — Operation Theater Equipments	\N	\N	2026-04-15 10:19:25.522+00	2026-04-09 04:28:08.735+00	\N
1	Diagnostic 	diagnostic-equipments	1	\N	\N	\N	\N	t	Healing Technology — OT Solutions		\N	2026-04-15 10:20:09.701+00	2026-04-09 04:28:08.651+00	\N
6	Diagnostic Equipments	diagnosticequipments	\N	\N	\N	\N	\N	t	Healing Technology — Diagnostic Equipments	\N	\N	2026-04-15 10:21:00.546+00	2026-04-09 04:28:08.72+00	\N
5	Hospital Furniture	hospital-furniture	\N	\N	\N	\N	\N	t	Healing Technology — Operation Theater Equipments	\N	\N	2026-04-15 10:23:40.272+00	2026-04-09 04:28:08.701+00	\N
4	Respiratory Devices	respiratory-devices	\N	\N	\N	\N	\N	t	\N	\N	\N	2026-04-15 10:24:34.928+00	2026-04-09 04:28:08.691+00	\N
\.


--
-- Data for Name: certifications; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.certifications (id, title, issuer_or_standard_body, description, badge_image_id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: certifications_rels; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.certifications_rels (id, "order", parent_id, path, brands_id, products_id) FROM stdin;
\.


--
-- Data for Name: client_logos; Type: TABLE DATA; Schema: public; Owner: healingtechnology.co_bgieab3zdtl
--

COPY public.client_logos (id, name, logo_id, website, sort_order, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.faqs (id, question, answer, category, sort_order, is_active, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: inquiries; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.inquiries (id, full_name, role, hospital, email, phone, requirements, status, updated_at, created_at) FROM stdin;
1	Dibbo Dutta	AD	RANG	dibbo@gmail.com	+880186024		new	2026-04-11 06:50:33.021+00	2026-04-11 06:50:33.021+00
2	Test	Director	Square	assae@gmail.com	+8801860242267		new	2026-04-11 07:33:27.827+00	2026-04-11 07:33:27.827+00
\.


--
-- Data for Name: legal_pages; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.legal_pages (id, title, slug, page_type, content, meta_title, meta_description, meta_image_id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: healingtech
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
81	\N	2026-04-20 10:55:13.134+00	2026-04-20 10:55:13.134+00	/api/media/file/anestghesia-1.jpg	\N	anestghesia-1.jpg	image/jpeg	500112	1500	1676	50	50
82	\N	2026-04-20 10:56:24.352+00	2026-04-20 10:56:24.352+00	/api/media/file/7200%20brochure-2.png	\N	7200 brochure-2.png	image/png	690060	1018	1526	50	50
83	\N	2026-04-20 11:02:05.752+00	2026-04-20 11:02:05.752+00	/api/media/file/imgi_79_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	\N	imgi_79_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	image/png	1849442	1500	1731	50	50
84	\N	2026-04-20 11:03:23.927+00	2026-04-20 11:03:23.927+00	/api/media/file/imgi_79_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-1.png	\N	imgi_79_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-1.png	image/png	1849442	1500	1731	50	50
86	\N	2026-04-20 11:04:39.188+00	2026-04-20 11:04:39.188+00	/api/media/file/imgi_80_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	\N	imgi_80_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	image/png	414138	739	643	50	50
87	\N	2026-04-20 11:05:04.928+00	2026-04-20 11:05:04.928+00	/api/media/file/imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	\N	imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	image/png	469716	741	645	50	50
88	\N	2026-04-20 11:05:34.228+00	2026-04-20 11:05:34.228+00	/api/media/file/imgi_81_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	\N	imgi_81_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	image/png	305309	741	641	50	50
89	\N	2026-04-20 11:06:05.295+00	2026-04-20 11:06:05.295+00	/api/media/file/imgi_83_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	\N	imgi_83_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical.png	image/png	611340	768	1003	50	50
85	\N	2026-04-20 11:07:00.217+00	2026-04-20 11:04:06.364+00	/api/media/file/imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-1.png	\N	imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-1.png	image/png	533362	768	768	50	50
90	\N	2026-04-20 11:07:45.862+00	2026-04-20 11:07:45.862+00	/api/media/file/imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-2.png	\N	imgi_21_ICU-Anesthesia-Machine-with-Factory-Price-Medical-Equipment-Medical-2.png	image/png	469689	741	640	50	50
64	\N	2026-04-22 12:56:29.415+00	2026-04-19 08:09:28.815+00	/api/media/file/dc240b4d-0393-4119-b82c-075d9696b069.png	\N	dc240b4d-0393-4119-b82c-075d9696b069.png	image/png	1720465	1841	1966	50	50
91	\N	2026-04-20 11:37:38.817+00	2026-04-20 11:37:38.817+00	/api/media/file/imgi_80_Mt-High-Frequency-Electrocautery-Diagnosis-Equipment-Gynecology-El.png	\N	imgi_80_Mt-High-Frequency-Electrocautery-Diagnosis-Equipment-Gynecology-El.png	image/png	362850	1080	749	50	50
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
131	\N	2026-04-25 05:12:59.072+00	2026-04-25 05:12:59.072+00	/api/media/file/Luvar%20Cpap-1.png	\N	Luvar Cpap-1.png	image/png	632230	1477	910	50	50
132	\N	2026-04-25 05:27:20.802+00	2026-04-25 05:27:20.802+00	/api/media/file/imgi_10_51c530c44ce224c82eacced3c70e17d8.png	\N	imgi_10_51c530c44ce224c82eacced3c70e17d8.png	image/png	168415	663	465	50	50
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.orders (id, order_number, customer_first_name, customer_last_name, customer_email, customer_phone, customer_address, customer_city, customer_name, total_amount, payment_method, payment_status, status, invoice_link, payment_evidence_id, updated_at, created_at) FROM stdin;
1	ORD-20260415-6643	Dibbo	Dutta	dibbo.tcfbd@gmail.com	01860242267	plot#GA-5/2,Road# Mohakhali	DHAKA	Dibbo Dutta	200	sslcommerz	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260415-6643	\N	2026-04-15 06:07:37.112+00	2026-04-15 06:07:37.112+00
2	ORD-20260415-3239	TCF	BD	tokyoconsultingfirmlimited@gmail.com	01788960043	20 Kemal Ataturk Avenue, Banani C/A	DHAKA	TCF BD	200	sslcommerz	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260415-3239	\N	2026-04-15 06:10:31.549+00	2026-04-15 06:10:31.548+00
3	ORD-20260415-2920	ROKIBUL	ISLAM	heal.tech36@gmail.com	01898876703	14/2 Ansari Bhaban ( Ground Floor ), Topkhana Road, Dhaka\n14/2	Dhaka, Bangladesh	ROKIBUL ISLAM	0	bkash	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260415-2920	\N	2026-04-15 07:51:52.363+00	2026-04-15 07:51:52.363+00
4	ORD-20260415-7649	ROKIBUL	ISLAM	heal.tech36@gmail.com	01898876703	14/2 Ansari Bhaban ( Ground Floor ), Topkhana Road, Dhaka\n14/2	Dhaka, Bangladesh	ROKIBUL ISLAM	0	sslcommerz	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260415-7649	\N	2026-04-15 07:52:56.49+00	2026-04-15 07:52:56.49+00
5	ORD-20260415-1161	ROKIBUL	ISLAM	heal.tech36@gmail.com	01898876703	14/2 Ansari Bhaban ( Ground Floor ), Topkhana Road, Dhaka\n14/2	Dhaka, Bangladesh	ROKIBUL ISLAM	0	bkash	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260415-1161	\N	2026-04-15 07:53:35.881+00	2026-04-15 07:53:35.881+00
6	ORD-20260415-4782	Abu	Abid	nirobislam36@gmail.com	01301844100	14/2 Topkhana Road Ansari Bhaban (Ground floor),Bangladesh Medical Association Bhaban West Side ,Polton Dhaka-1000\nOpposite Side Of Press Club	Dhaka, Bangladesh	Abu Abid	0	sslcommerz	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260415-4782	\N	2026-04-15 07:53:40.849+00	2026-04-15 07:53:40.849+00
7	ORD-20260415-4458	Abu	Abid	nirobislam36@gmail.com	01301844100	14/2 Topkhana Road Ansari Bhaban (Ground floor),Bangladesh Medical Association Bhaban West Side ,Polton Dhaka-1000\nOpposite Side Of Press Club	Dhaka, Bangladesh	Abu Abid	0	bkash	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260415-4458	\N	2026-04-15 08:15:27.671+00	2026-04-15 08:15:27.671+00
8	ORD-20260415-9109	Abu	Abid	nirobislam36@gmail.com	01301844100	14/2 Topkhana Road Ansari Bhaban (Ground floor),Bangladesh Medical Association Bhaban West Side ,Polton Dhaka-1000\nOpposite Side Of Press Club	Dhaka, Bangladesh	Abu Abid	0	bkash	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260415-9109	\N	2026-04-15 08:17:25.587+00	2026-04-15 08:17:25.587+00
9	ORD-20260415-5589	Abu	Abid	nirobislam36@gmail.com	01301844100	14/2 Topkhana Road Ansari Bhaban (Ground floor),Bangladesh Medical Association Bhaban West Side ,Polton Dhaka-1000\nOpposite Side Of Press Club	Dhaka, Bangladesh	Abu Abid	200	bkash	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260415-5589	\N	2026-04-15 08:27:47.66+00	2026-04-15 08:27:47.659+00
10	ORD-20260415-2679	Abu	Abid	nirobislam36@gmail.com	01301844100	14/2 Topkhana Road Ansari Bhaban (Ground floor),Bangladesh Medical Association Bhaban West Side ,Polton Dhaka-1000\nOpposite Side Of Press Club	Dhaka, Bangladesh	Abu Abid	0	sslcommerz	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260415-2679	\N	2026-04-15 11:04:51.706+00	2026-04-15 11:04:51.706+00
11	ORD-20260419-7264	Abu	Abid	nirobislam36@gmail.com	01301844100	14/2 Topkhana Road Ansari Bhaban (Ground floor),Bangladesh Medical Association Bhaban West Side ,Polton Dhaka-1000\nOpposite Side Of Press Club	Dhaka, Bangladesh	Abu Abid	0	sslcommerz	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260419-7264	\N	2026-04-19 07:35:26.236+00	2026-04-19 07:35:26.235+00
12	ORD-20260421-1822	Rokibul Islam	Nirob	nirobislam36@gmail.com	01675292991	Rawerbazar 	Dhaka	Rokibul Islam Nirob	0	bkash	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260421-1822	\N	2026-04-21 12:32:10.24+00	2026-04-21 12:32:10.238+00
13	ORD-20260421-6408	Rokibul Islam	Nirob	nirobislam36@gmail.com	01675292991	Polton	Dhaka	Rokibul Islam Nirob	0	bkash	unpaid	pending	https://healingtechnology.com.bd/invoice/ORD-20260421-6408	\N	2026-04-21 12:33:41.459+00	2026-04-21 12:33:41.459+00
\.


--
-- Data for Name: orders_items; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.orders_items (_order, _parent_id, id, product_id, quantity, price_at_purchase) FROM stdin;
1	1	69df2b296e3450bd0f0bf9c6	24	1	200
1	2	69df2bd76e3450bd0f0bf9c7	24	1	200
1	3	69df43986e3450bd0f0bf9c8	25	1	0
1	4	69df43d86e3450bd0f0bf9c9	25	1	0
1	5	69df43ff6e3450bd0f0bf9ca	25	1	0
1	6	69df44046e3450bd0f0bf9cb	25	1	0
1	7	69df491f6e3450bd0f0bf9cd	25	1	0
1	8	69df49956e3450bd0f0bf9ce	25	1	0
1	9	69df4c036e3450bd0f0bf9cf	24	1	200
1	10	69df70d36e3450bd0f0bf9d0	25	1	0
1	11	69e485beefdc0ce4e8001c53	25	2	0
1	12	69e76e4ad2fb692faf9669bd	31	2	0
1	13	69e76ea5d2fb692faf9669be	22	1	0
\.


--
-- Data for Name: partner_logos; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.partner_logos (id, name, logo_id, website, sort_order, updated_at, created_at) FROM stdin;
1	Perlong Medical	25	\N	0	2026-04-19 12:14:39.839+00	2026-04-19 12:14:39.839+00
2	Aeonmed	95	\N	0	2026-04-21 05:20:18.788+00	2026-04-21 05:20:18.788+00
3	HEYER	96	\N	0	2026-04-21 05:20:57.14+00	2026-04-21 05:20:57.14+00
4	Nanjing Puao Medical Equipment Co.Ltd	97	\N	0	2026-04-21 05:22:52.639+00	2026-04-21 05:22:52.639+00
5	ZERONE	98	\N	0	2026-04-21 05:24:05.543+00	2026-04-21 05:24:05.543+00
6	TRIUP	99	\N	0	2026-04-21 05:24:44.727+00	2026-04-21 05:24:44.727+00
\.


--
-- Data for Name: payload_kv; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.payload_kv (id, key, data) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, brands_id, categories_id, certifications_id, products_id, legal_pages_id, testimonials_id, faqs_id, inquiries_id, media_id, partner_logos_id, orders_id, client_logos_id) FROM stdin;
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	dev	-1	2026-04-13 11:51:09.762+00	2026-04-09 04:16:14.443+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
18	collection-products-21	{"fields": {"specGroups.0.rows": {"collapsed": ["69e4a0f89227f07265a2b781", "69e4a1089227f07265a2b782", "69e4a11c9227f07265a2b783", "69e4a12e9227f07265a2b784", "69e4a1449227f07265a2b785", "69e4a14d9227f07265a2b786", "69e4a1579227f07265a2b787", "69e4a1609227f07265a2b788"]}}}	2026-04-19 09:33:34.67+00	2026-04-19 09:33:34.672+00
3	collection-certifications	{}	2026-04-09 04:20:38.332+00	2026-04-09 04:20:38.332+00
19	collection-products-22	{"fields": {"gallery": {"collapsed": ["69e482339227f07265a2b74f", "69e4823f9227f07265a2b750", "69e482519227f07265a2b751"]}, "specGroups.0.rows": {"collapsed": ["69e4a1d89227f07265a2b78a", "69e4a1f89227f07265a2b78b", "69e4a20a9227f07265a2b78c", "69e4a2179227f07265a2b78d", "69e4a2269227f07265a2b78e", "69e4a2359227f07265a2b78f", "69e4a2439227f07265a2b790", "69e4a2519227f07265a2b791", "69e4a2629227f07265a2b792", "69e4a2729227f07265a2b793", "69e4a2819227f07265a2b794", "69e4a28f9227f07265a2b795", "69e4a2a59227f07265a2b796", "69e4a2b29227f07265a2b797", "69e4a2c09227f07265a2b798", "69e4a2cf9227f07265a2b799", "69e4a3db9227f07265a2b79c", "69e4a3ef9227f07265a2b79d", "69e4a4059227f07265a2b79e", "69e4a46b9227f07265a2b79f"]}}}	2026-04-19 09:46:35.896+00	2026-04-19 09:34:44.388+00
5	collection-users	{}	2026-04-09 04:21:06.379+00	2026-04-09 04:21:06.379+00
6	collection-legalPages	{}	2026-04-09 04:21:07.439+00	2026-04-09 04:21:07.439+00
10	collection-testimonials	{}	2026-04-09 04:21:11.46+00	2026-04-09 04:21:11.46+00
20	collection-products-19	{"fields": {"specGroups": {"collapsed": ["69e4c0096a8ee835e89d81de", "69e4c19a6a8ee835e89d81e6", "69e4c4e06a8ee835e89d81ec"]}, "specGroups.0.rows": {"collapsed": ["69e4c00d6a8ee835e89d81df", "69e4c0776a8ee835e89d81e0", "69e4c1276a8ee835e89d81e1", "69e4c1376a8ee835e89d81e2", "69e4c1466a8ee835e89d81e3", "69e4c1546a8ee835e89d81e4", "69e4c1616a8ee835e89d81e5"]}, "specGroups.1.rows": {"collapsed": ["69e4c1a46a8ee835e89d81e7", "69e4c1b36a8ee835e89d81e8", "69e4c1c26a8ee835e89d81e9", "69e4c1d06a8ee835e89d81ea", "69e4c1e16a8ee835e89d81eb"]}, "specGroups.2.rows": {"collapsed": ["69e4c4e46a8ee835e89d81ed", "69e4c4f36a8ee835e89d81ee", "69e4c5016a8ee835e89d81ef"]}}}	2026-04-19 12:05:45.631+00	2026-04-19 11:44:16.162+00
9	collection-media	{"limit": 100}	2026-04-19 12:12:20.685+00	2026-04-09 04:21:10.922+00
21	collection-products-18	{"fields": {"specGroups": {"collapsed": ["69e6041a1d522a8c2a7de9cf", "69e604b71d522a8c2a7de9da"]}, "specGroups.0.rows": {"collapsed": ["69e604261d522a8c2a7de9d0", "69e604341d522a8c2a7de9d1", "69e604421d522a8c2a7de9d2", "69e604531d522a8c2a7de9d3", "69e604611d522a8c2a7de9d4", "69e604711d522a8c2a7de9d5", "69e604811d522a8c2a7de9d6", "69e604901d522a8c2a7de9d7", "69e604a01d522a8c2a7de9d8"]}, "specGroups.1.rows": {"collapsed": ["69e604c01d522a8c2a7de9db", "69e604d01d522a8c2a7de9dc", "69e604de1d522a8c2a7de9dd", "69e604ed1d522a8c2a7de9de"]}}}	2026-04-20 10:50:48.726+00	2026-04-20 10:50:42.143+00
8	collection-inquiries	{"limit": 10}	2026-04-11 07:33:37.147+00	2026-04-09 04:21:08.4+00
22	collection-products-17	{"fields": {"specGroups": {"collapsed": ["69e609a11d522a8c2a7de9ea", "69e60a4b1d522a8c2a7de9f4"]}}}	2026-04-20 11:14:31.774+00	2026-04-20 11:14:31.776+00
23	collection-products-16	{"fields": {"specGroups": {"collapsed": ["69e6104e1d522a8c2a7dea06"]}}}	2026-04-20 11:44:53.258+00	2026-04-20 11:44:53.259+00
25	collection-products-14	{"fields": {"specGroups": {"collapsed": ["69e733cd3220efc4a063a40e"]}, "applications": {"collapsed": ["69e7352ea1dc14718977d686", "69e73539a1dc14718977d687", "69e73541a1dc14718977d688", "69e7354aa1dc14718977d689"]}}}	2026-04-21 08:30:31.718+00	2026-04-21 08:24:51.751+00
12	collection-orders	{}	2026-04-14 10:18:23.415+00	2026-04-14 10:18:23.414+00
7	collection-faqs	{"limit": 10}	2026-04-14 10:18:32.518+00	2026-04-09 04:21:07.997+00
26	collection-client-logos	{}	2026-04-22 12:46:48.862+00	2026-04-22 12:46:48.861+00
11	nav	{"open": true, "groups": {"Collections": {"open": true}}}	2026-04-22 12:47:36.692+00	2026-04-11 06:40:57.781+00
13	collection-partner-logos	{}	2026-04-15 06:02:14.066+00	2026-04-15 06:02:14.066+00
24	collection-products-15	{"fields": {"gallery": {"collapsed": []}, "specGroups": {"collapsed": ["69e72f2f3220efc4a063a405"]}, "applications": {"collapsed": ["69e72c423220efc4a063a3fc", "69e72c453220efc4a063a3fd", "69e72c4d3220efc4a063a3fe", "69e72c563220efc4a063a3ff"]}}}	2026-04-22 12:47:52.346+00	2026-04-21 08:02:18.307+00
27	collection-products-13	{"fields": {"specGroups": {"collapsed": ["69e9f70d57a33abd2212b677"]}, "applications": {"collapsed": ["69e9f8ee57a33abd2212b67d", "69e9f8f257a33abd2212b67e", "69e9f8f957a33abd2212b67f"]}}}	2026-04-23 10:48:36.164+00	2026-04-23 10:41:38.659+00
28	collection-products-12	{"fields": {"applications": {"collapsed": ["69e9fcf757a33abd2212b680", "69e9fcfa57a33abd2212b681", "69e9fd0057a33abd2212b682", "69e9fd0857a33abd2212b683"]}, "specGroups.0.rows": {"collapsed": ["69e9fd5457a33abd2212b686", "69e9fd6157a33abd2212b687", "69e9fd7057a33abd2212b688", "69e9fd7c57a33abd2212b689", "69e9fd8957a33abd2212b68a", "69e9fd9857a33abd2212b68b", "69e9fda357a33abd2212b68c", "69e9fdb057a33abd2212b68d", "69e9fdbb57a33abd2212b68e"]}}}	2026-04-23 11:09:17.059+00	2026-04-23 11:06:11.084+00
1	collection-brands	{"sort": "name", "limit": 50}	2026-04-15 07:09:00.432+00	2026-04-09 04:20:36.711+00
2	collection-categories	{"sort": "title", "limit": 25}	2026-04-15 10:25:58.349+00	2026-04-09 04:20:37.616+00
4	collection-products	{"limit": 25, "editViewType": "default"}	2026-04-19 07:24:06.374+00	2026-04-09 04:20:39.04+00
16	collection-products-31	{"fields": {"specGroups": {"collapsed": ["69e479dd34931c3b26d3a31f"]}}}	2026-04-19 08:23:04.427+00	2026-04-19 08:23:04.429+00
14	collection-products-25	{"fields": {"specGroups": {"collapsed": ["69e491749227f07265a2b764"]}, "keyHighlights": {"collapsed": ["69df2e50b960ec5fbf6307a0"]}, "specGroups.0.rows": {"collapsed": ["69e491c79227f07265a2b765", "69e4923f9227f07265a2b766", "69e492619227f07265a2b767", "69e492729227f07265a2b768", "69e4929a9227f07265a2b769", "69e493309227f07265a2b76a", "69e4933b9227f07265a2b76b", "69e4934f9227f07265a2b76c", "69e493a79227f07265a2b76d"]}}}	2026-04-19 08:35:57.923+00	2026-04-15 06:21:19.073+00
17	collection-products-20	{"fields": {"specGroups": {"collapsed": []}, "applications": {"collapsed": ["69e49f859227f07265a2b770", "69e49fa69227f07265a2b771", "69e49fa99227f07265a2b772", "69e49fb99227f07265a2b773", "69e49fc39227f07265a2b774"]}, "specGroups.0.rows": {"collapsed": ["69e49fe19227f07265a2b776", "69e49ff89227f07265a2b777", "69e4a00f9227f07265a2b778", "69e4a0219227f07265a2b779", "69e4a04c9227f07265a2b77a", "69e4a05c9227f07265a2b77b", "69e4a0699227f07265a2b77c", "69e4a0759227f07265a2b77d", "69e4a0809227f07265a2b77e", "69e4a08a9227f07265a2b77f"]}}}	2026-04-19 09:30:04.296+00	2026-04-19 09:26:39.178+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
70	\N	18	user	1
3	\N	3	user	1
72	\N	19	user	1
5	\N	5	user	1
6	\N	6	user	1
10	\N	10	user	1
80	\N	20	user	1
82	\N	9	user	1
85	\N	21	user	1
22	\N	8	user	1
86	\N	22	user	1
87	\N	23	user	1
94	\N	25	user	1
33	\N	12	user	1
34	\N	7	user	1
97	\N	26	user	1
99	\N	11	user	1
39	\N	13	user	1
101	\N	24	user	1
105	\N	27	user	1
107	\N	28	user	1
49	\N	1	user	1
58	\N	2	user	1
59	\N	4	user	1
60	\N	16	user	1
64	\N	14	user	1
69	\N	17	user	1
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products (id, name, slug, mark_as_new, sku, category_id, brand_id, brochure_page_ref, listing_title, listing_summary, short_summary, overview, hero_image_id, origin_country, certification_summary, status, meta_title, meta_description, meta_image_id, updated_at, created_at, price, discount_price) FROM stdin;
1	Luminex-Lumen H700 (Single Head)	luminex-lumen-h700-single	f	\N	1	1	\N	\N	Single head LED shadowless operating lamp with 84 Osram LED bulbs.	\N	\N	\N	China	\N	published	\N	\N	\N	2026-04-09 04:28:08.771+00	2026-04-09 04:28:08.77+00	\N	\N
2	Luminex-Lumen L700/L500	luminex-lumen-l700-l500	f	\N	1	1	\N	\N	Double head LED shadowless operating lamp with adjustable spot diameter.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:08.832+00	2026-04-09 04:28:08.832+00	\N	\N
3	HFMED-HF-L84	hfmed-hf-l84-led	f	\N	1	1	\N	\N	Double head LED shadowless lamp with secondary light-emitting tubes.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:08.873+00	2026-04-09 04:28:08.872+00	\N	\N
4	Heyer Purelit OL9570 / OL9550	heyer-purelit-ol9570-ol9550	f	\N	1	2	\N	\N	German-engineered surgical lights with antimicrobial coating.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:08.925+00	2026-04-09 04:28:08.925+00	\N	\N
5	Suxin Hydraulic Operation Table	suxin-hydraulic-table	f	\N	1	7	\N	\N	Supply for thoracic, abdominal, and orthopaedic surgery.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:08.963+00	2026-04-09 04:28:08.963+00	\N	\N
6	Hungustads Hydraulic Operation Table	hungustads-hydraulic-table	f	\N	1	8	\N	\N	Advanced hydraulic table with 120mm waist board lifting.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.012+00	2026-04-09 04:28:09.012+00	\N	\N
7	Zerone ZEUS-400	zerone-zeus-400	f	\N	1	6	\N	\N	Stable and powerful electrosurgical unit for general and plastic surgery.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.04+00	2026-04-09 04:28:09.04+00	\N	\N
8	HT-150S Anesthesia Machine (SS)	ht-150s-anesthesia-ss	f	\N	1	9	\N	\N	High-quality Stainless Steel anesthesia apparatus with Malaysian regulator.	\N	\N	\N	Bangladesh	\N	published	\N	\N	\N	2026-04-09 04:28:09.08+00	2026-04-09 04:28:09.079+00	\N	\N
9	Jinling-820 Anesthesia Machine	jinling-820-anesthesia	f	\N	1	4	\N	\N	Pneumatically driven & electronically controlled with 5.7 inch TFT display.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.113+00	2026-04-09 04:28:09.113+00	\N	\N
10	Luvar E Series Auto-CPAP (CPAP-20A Pro)	luvar-e-auto-cpap	f	\N	2	2	\N	\N	Medical-grade calibration standard with AS-Dry technology.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.165+00	2026-04-09 04:28:09.165+00	\N	\N
12	Heyer BiPAP BV30ST	BiPAP-BV30ST	f	BiPAP-BV30ST	4	2	\N	Heyer BiPAP BV30ST	The Heyer BiPAP BV30ST is a high-performance, non-invasive ventilator designed for patients requiring advanced pressure support. Developed in Germany with over 24 years of expertise in ventilator algorithms, it offers hospital-grade precision for home use.\n\nAdvanced Ventilation & Control\nMultiple Therapy Modes: Includes CPAP, S (Spontaneous), T (Timed), S/T (Spontaneous/Timed), PC (Pressure Control), and VAT (Volume Assured Technology).\n\nHigh Pressure Range: Provides an IPAP Max of 30 cmH2O and EPAP of 4–25 cmH2O.\n\nVT Target: Features a target volume function ranging from 200–1500 ml to ensure consistent ventilation.\n\nPrecision Calibration: Accurate to 0.1 cmH2O, providing treatment precision comparable to hospital ventilators.\n\nCustomizable Breathing: Offers 1–6 adjustable levels for Rise Time and Trigger/Cycle to match the patient’s natural breathing pattern.\n\nSafety & Monitoring\n12-Sensor Collaborative Monitoring: An interlinked sensing system provides real-time feedback on environmental changes and tracks the patient’s respiratory cycle.\n\nSafety Alarms: Includes a Leak Alert to ensure therapy efficacy and a Backup Vent function for periods of low respiratory activity.\n\nData Management: Supports smart interconnection through WiFi, Bluetooth, and SD card, allowing users to view therapy reports and trend analysis via a cloud platform.\n\nUser Comfort & Maintenance\nDual-core Humidification: Intelligently adjusts temperature and humidity levels to maintain optimal airflow comfort.\n\nQuiet Operation: Designed for a restful environment with noise levels at ≤ 28 dB.\n\nPreheat Function: A one-click preheat option warms the system 30 minutes before sleep to avoid cold condensation.\n\nAS-Dry Hygiene: Runs a 30-minute low-speed airflow post-treatment to reduce residual moisture by 80%.\n\nDesign: Features a rounded, "homestyle" body designed to soften the clinical feel of medical devices.	The Heyer BiPAP BV30ST is a German-engineered ventilator providing advanced pressure support up to 30 cmH2O. It features hospital-grade accuracy (0.1 cmH2O) and versatile modes including S/T and VAT. Designed with a quiet, homestyle aesthetic (≤ 28 dB), it includes Smart Interconnection for app-based data tracking and AS-Dry technology to ensure system hygiene.	\N	130	German	\N	published	\N	\N	\N	2026-04-25 05:13:48.051+00	2026-04-09 04:28:09.238+00	\N	\N
19	Aeonmed Aeon7200 Anesthesia Machine With Ventilator	Aeonmed-Aeon7200	f	Aeonmed-Aeon7200	7	3	\N	Aeonmed Aeon7200 Anesthesia Machine With Ventilator	Aeonmed Aeon7200 Anesthesia Machine With Ventilator\nThe Aeonmed Aeon7200 is an advanced, high-performance anesthesia delivery system designed to provide safe, reliable, and efficient care during surgical procedures. Engineered for both adult and pediatric patients, it combines precise gas delivery, dynamic ventilation modes, and a robust suite of real-time monitoring features.\n\nWith CE certification ensuring it meets stringent international safety standards, the Aeon7200 is an ideal solution for modern hospital operation theaters, surgical centers, and emergency units.\n\nKey Features & Innovations\nIntuitive Interface: Features an 8.4-inch color touchscreen display equipped with a navigation knob for quick, easy setup and parameter adjustments.\n\nVersatile Ventilation: Supports Volume, Pressure, and SIMV ventilation modes to accommodate a wide variety of anesthesia applications.\n\nAdvanced Moisture Control: Incorporates a built-in, maintenance-free patented sensor that prevents moisture condensation, ensuring accurate monitoring and protecting the internal circuitry.\n\nPrecision Low-Flow Delivery: Equipped with double tubes in series for each gas, making it highly responsive and easy to operate during low and mini-flow anesthesia.\n\nEnvironmental & Patient Safety: Features optional Anesthetic Gas Monitoring (AGM) to conveniently control gas concentration, and an optional Anesthetic Gas Scavenging System (AGSS) to reduce air pollution within the operating room.	The Aeonmed Aeon7200 is a highly versatile, CE-certified anesthesia delivery system featuring an integrated ventilator. Designed to seamlessly manage both adult and pediatric patients, it balances advanced technological precision with rigorous patient safety features for the modern operating room.\n\nCore Highlights:\n\nIntuitive Operation: Features an 8.4-inch color touchscreen with a navigation knob for quick, streamlined parameter adjustments.\n\nAdvanced Ventilation: Supports multiple ventilation modes (IPPV, PLV, SIMV, Spont) with a broad tidal volume range of 20 to 1500 ml.\n\nPrecision Low-Flow Delivery: Utilizes double-tube flowmeters specifically engineered for accurate, easy control during low and mini-flow anesthesia.\n\nEnhanced Safety & Reliability: Built with a patented maintenance-free moisture condensation sensor, comprehensive safety alarms, and a reliable 120-minute battery backup.	\N	82	China	The Aeonmed Aeon7200 Anesthesia Machine is manufactured to the highest global medical device standards, ensuring absolute safety, reliability, and precision in critical care environments:\n\nCE Certified: Fully compliant with European health, safety, and environmental protection directives. This certification guarantees that the machine meets stringent international clinical safety requirements for medical devices.\n\nISO 13485 Compliant: Manufactured by Aeonmed under a globally recognized Quality Management System specifically dedicated to the design and production of safe, high-quality medical equipment.\n\nBuilt-In Safety Standards: Engineered with hypoxic guard systems, automatic O2 deficiency alarms, and a patented NO WATER VAPOR COAGULATION sensor, fulfilling strict regulatory requirements for patient safety during anesthesia delivery.	published	Healing Technology — Aeonmed Aeon7200 Anesthesia Machine With Ventilator	The Aeonmed Aeon7200 is a highly versatile, CE-certified anesthesia delivery system featuring an integrated ventilator. Designed to seamlessly manage both adult and pediatric patients, it balances advanced technological precision with rigorous patient safety features for the modern operating room.\n\nCore Highlights:\n\nIntuitive Operation: Features an 8.4-inch color touchscreen with a navigation knob for quick, streamlined parameter adjustments.\n\nAdvanced Ventilation: Supports multiple ventilation modes (IPPV, PLV, SIMV, Spont) with a broad tidal volume range of 20 to 1500 ml.\n\nPrecision Low-Flow Delivery: Utilizes double-tube flowmeters specifically engineered for accurate, easy control during low and mini-flow anesthesia.\n\nEnhanced Safety & Reliability: Built with a patented maintenance-free moisture condensation sensor, comprehensive safety alarms, and a reliable 120-minute battery backup.	72	2026-04-20 10:56:27.252+00	2026-04-09 04:28:09.465+00	\N	\N
16	SOFT TOUCH ESU 400 Electrosurgical Unit	SOFTTOUCH-ESU400	f	SOFTTOUCH-ESU400	7	30	\N	SOFT TOUCH ESU 400 Electrosurgical Unit	SOFT TOUCH Advanced Electrosurgical Unit (High-Frequency Electrotome)\nProduct Overview\nThe SOFT TOUCH Electrosurgical Unit is a high-performance, multi-function high-frequency electrotome designed to meet the rigorous demands of general departments and diverse surgical needs. Featuring dual-way power output, exceptionally stable performance, and advanced safety mechanisms, the SOFT TOUCH unit delivers the precision and reliability surgeons require. With instantaneous switching between cutting and coagulation, and seamless compatibility with laparoscopic accessories, it is an essential and versatile tool for any modern surgical suite.\n\nKey Features & Benefits\nVersatile Operating Modes: Equipped with 7 distinct working modes to handle a wide variety of surgical procedures:\nPure Cutting, Mixed Cutting 1, Mixed Cutting 2, Standard Coagulation, Spraying Coagulation, Bipolar 1, Bipolar 2\n\nBroad Power Range: Offers unipolar power from 0–400W and bipolar power from 0–100W, ensuring the precise energy delivery needed for both delicate tissues and heavy-duty surgical tasks.\n\nAdvanced Safety Systems:\n\nNeutral Plate Monitoring: Automatically measures the contact quality between the patient's skin and the neutral plate. The system instantly triggers an alarm and halts output if contact resistance drops below 140 Ω.\n\nShort Circuit Protection: Features a fully suspended CF type design. The host computer actively protects itself to maintain normal, safe output in the rare event of an overload or short circuit during unipolar or bipolar use.\n\nIntelligent Double CPU Design: Built with dual CPUs for highly reliable core storage. The robust database seamlessly manages various impedance changes during use, guaranteeing a highly stable and consistent energy output.\n\nEfficient Workflow: Allows for instantaneous switching between cutting and coagulation output during manual operation, streamlining the surgical process and reducing operative time.	The SOFT TOUCH Advanced Electrosurgical Unit is a versatile, high-frequency surgical electrotome designed for precision and safety across diverse medical departments. Featuring advanced dual-CPU technology, it offers 7 distinct working modes—delivering up to 400W of unipolar power and 100W of bipolar power—for seamless cutting and rapid coagulation. Equipped with intelligent safety systems like real-time neutral plate monitoring and short-circuit protection, this unit provides surgeons with exceptionally stable and reliable performance for everything from delicate plastic surgery to heavy-duty general and laparoscopic procedures.	\N	94	China	The SOFT TOUCH Electrosurgical Unit is manufactured to meet stringent international medical and electrical safety standards:\n\nGB 9706.1-2007 / IEC 60601-1:1988: General requirements for safety of medical electrical equipment.\n\nGB 9706.4-2009 / IEC 60601-2-2:2006: Special requirements for the safety of high-frequency surgical equipment.\n\nYY 0505-2012 / IEC 60601-1-2:2004: Electromagnetic compatibility requirements and experiments.\n\nYY1057-2016: General specification for medical foot switches.	published	Healing Technology — SOFT TOUCH ESU 400 Electrosurgical Unit	The SOFT TOUCH Advanced Electrosurgical Unit is a versatile, high-frequency surgical electrotome designed for precision and safety across diverse medical departments. Featuring advanced dual-CPU technology, it offers 7 distinct working modes—delivering up to 400W of unipolar power and 100W of bipolar power—for seamless cutting and rapid coagulation. Equipped with intelligent safety systems like real-time neutral plate monitoring and short-circuit protection, this unit provides surgeons with exceptionally stable and reliable performance for everything from delicate plastic surgery to heavy-duty general and laparoscopic procedures.	\N	2026-04-20 11:57:01.166+00	2026-04-09 04:28:09.375+00	\N	\N
22	Heyer OP830 Electric Operating Table	Heyer-OP830	f	Heyer-OP830	7	2	\N	Heyer OP830 Electric Operating Table	Heyer OP830 Electric Operating Table\nThe OP830 electric operating table by Heyer is constructed from high-quality alloy steel, perfectly balancing a lightweight design with robust strength. It is engineered for stable, dynamic intraoperative positioning and maintains a dynamic load capacity of over 135 kg.\n\nKey Features\nRadiolucent Tabletop: Allows for clear intraoperative X-ray and C-arm imaging while maintaining a high load-bearing capacity.\n\nOptimal Patient Comfort: Features an easy-to-clean, 60mm detachable multi-layer memory foam mattress that conforms to the patient's body to evenly distribute pressure.\n\nAdjustable Headplate: The detachable headplate is firmly fixed to prevent movement during surgery and can be easily adjusted up or down with just one hand.\n\nBuilt-in Kidney Bridge: Provides a 136 mm lift utilizing a simple wrench for stable support, providing maximum convenience for abdominal or urinary system surgeries.\n\nElectric Hydraulic Braking: Equipped with four 5 cm diameter brake rods that provide strong, reliable locking on any surface with the push of a button.\n\nIntuitive Controls: Designed for single-handed operation with easy-to-understand icons and a battery indicator. An automatic standby mode activates after 60 seconds of inactivity to avoid accidental touches.\n\nDurable Side Rails: Built with equal-length 304 stainless steel side rails featuring a treated surface for safe handling and accessory mounting.	The Heyer OP830 \nElectric Operating Table is crafted from high-quality alloy steel, perfectly balancing a lightweight design with robust strength to support a dynamic load of over 135 kg. Designed for surgical precision and patient comfort, it is an essential asset for modern operating rooms.\n\nCore Highlights:\n\nImaging Ready: Features a radiolucent tabletop that allows for clear intraoperative X-ray and C-arm imaging without sacrificing load-bearing capacity.\n\nEnhanced Comfort: Equipped with an easy-to-clean, 60mm multi-layer memory foam mattress that evenly distributes pressure.\n\nSurgical Versatility: Includes a 136mm kidney bridge lift for abdominal/urinary procedures, a fully adjustable and securely fixed headplate, and 304 stainless steel side rails for accessories.\n\nPrecision & Safety: Boasts an electric hydraulic braking system for rock-solid stability, plus an intuitive, single-handed remote control with a 60-second auto-standby to prevent accidental adjustments.	\N	51	German	The Heyer OP830 Electric Operating Tables are manufactured to the highest international medical standards, ensuring absolute safety and reliability in the operating room.\n\nCE Mark Certified: Fully compliant with European health, safety, and environmental protection directives for medical devices.\n\nISO 13485 & ISO 9001: Manufactured under globally recognized, strict Quality Management Systems specifically designed for medical equipment.\n\nGlobal OR Standards: Backed by Heyer Medical’s 130+ year legacy of German engineering and rigorous quality control testing for structural integrity and dynamic load safety.	published	Healing Technology — Heyer OP830 Electric Operating Table	The Heyer OP830 \nElectric Operating Table is crafted from high-quality alloy steel, perfectly balancing a lightweight design with robust strength to support a dynamic load of over 135 kg. Designed for surgical precision and patient comfort, it is an essential asset for modern operating rooms.\n\nCore Highlights:\n\nImaging Ready: Features a radiolucent tabletop that allows for clear intraoperative X-ray and C-arm imaging without sacrificing load-bearing capacity.\n\nEnhanced Comfort: Equipped with an easy-to-clean, 60mm multi-layer memory foam mattress that evenly distributes pressure.\n\nSurgical Versatility: Includes a 136mm kidney bridge lift for abdominal/urinary procedures, a fully adjustable and securely fixed headplate, and 304 stainless steel side rails for accessories.\n\nPrecision & Safety: Boasts an electric hydraulic braking system for rock-solid stability, plus an intuitive, single-handed remote control with a 60-second auto-standby to prevent accidental adjustments.	55	2026-04-19 09:46:30.737+00	2026-04-09 04:28:09.549+00	\N	\N
18	JINLING-820 Anesthesia Machine With Ventilator	JINLING-820	f	JINLING-820	7	10	\N	JINLING-820 Anesthesia Machine With Ventilator	JINLING-820 Anesthesia Machine\nProduct Overview\nThe JINLING-820 is a highly advanced, pneumatically driven, and electronically controlled anesthesia workstation. Designed to meet the rigorous demands of modern operating rooms and intensive care units, it combines an elegant, ergonomic frame with precise clinical engineering. From low-flow anesthesia to complex ventilation requirements, the JINLING-820 delivers reliable performance, comprehensive safety features, and intuitive controls to support superior patient care.\n\nKey Features & Benefits\nVersatile Operating Modes: Fully supports closed, semi-closed, and semi-open operating modes, adapting seamlessly to diverse clinical requirements and patient profiles.\n\nClear, Real-Time Monitoring: Equipped with a high-visibility 5.7-inch TFT display (with optional upgrades available), allowing clinicians to simultaneously monitor Pressure-Time and Frequency-Time waveforms for rapid patient assessment.\n\nIntegrated Respiratory Circuit: Features a standard metallic modular respiratory circuit. This advanced, highly durable design resolves common gas-sealing issues during high-temperature disinfection, ensuring sterilization is both easy and highly effective.\n\nComprehensive Ventilation: Offers a wide spectrum of ventilation modes, including A/C, IPPV, SIPPV, VCV, IMV, SIMV, PEEP, and Manual, providing maximum flexibility during complex surgical procedures.\n\nPrecision Gas Delivery: Built with a high-precision four-tube flowmeter (O2 and N2O) featuring an interlocking system to prevent hypoxic mixtures. Coupled with a highly stable Adjustable Pressure Limiting (APL) valve, the unit is optimized for low and ultra-low flow anesthesia.\n\nIntelligent Safety Systems: Includes an automated self-checking function upon startup, automatic self-calibrating sensors, and a robust power failure support system that automatically switches to an internal battery during AC power outages.	The JINLING-820 Anesthesia Machine is an advanced, highly versatile workstation built for modern operating rooms. It features a 5.7-inch real-time display, an easy-to-sterilize metallic modular respiratory circuit, and comprehensive ventilation modes suitable for diverse clinical needs. Designed for precision and safety, it includes a high-accuracy four-tube flowmeter optimized for low-flow anesthesia, automated self-checks, robust alarm systems, and reliable battery backup. The unit is fully CE, ISO 13485, and RoHS certified, ensuring top-tier clinical performance and patient safety.	\N	81	China	Manufactured under strict quality control standards, the JINLING-820 is internationally recognized for safety and reliability:\n\nCE Mark: Compliant with European health and safety standards for medical devices.\n\nISO 13485: Certified under the quality management system standard for the medical device industry.\n\nRoHS: Compliant with environmental safety standards regarding electronic components.	published	Healing Technology — JINLING-820 Anesthesia Machine With Ventilator	The JINLING-820 Anesthesia Machine is an advanced, highly versatile workstation built for modern operating rooms. It features a 5.7-inch real-time display, an easy-to-sterilize metallic modular respiratory circuit, and comprehensive ventilation modes suitable for diverse clinical needs. Designed for precision and safety, it includes a high-accuracy four-tube flowmeter optimized for low-flow anesthesia, automated self-checks, robust alarm systems, and reliable battery backup. The unit is fully CE, ISO 13485, and RoHS certified, ensuring top-tier clinical performance and patient safety.	73	2026-04-20 11:22:13.031+00	2026-04-09 04:28:09.443+00	\N	\N
25	Suxin Medical SX-700/700 LED Shadowless Operating Lamp	SuxinMedicalSX700700	t	SX-700/700	7	7	OT Light Double Dome 700/700	OT Light Double Dome 700/700	Suxin Medical SX-700/700 Color Dual Dome LED Shadowless Operating Lamp\nProduct Overview\nThe Suxin Medical SX-700/700 is a premium, ceiling-mounted dual-dome surgical light designed to meet the rigorous demands of modern operating theaters. Featuring a unique "lamp-flower" design, this high-performance lighting system provides exceptional shadow-free illumination, advanced color rendering, and unparalleled reliability for complex surgical procedures.\n\nEquipped with authentic, imported German Osram LEDs, the SX-700/700 ensures a stable, long-lasting light source that medical professionals can depend on.\nKey Features\n\nAdvanced Color LED Layout: Specifically engineered with red and green lights to relieve visual fatigue during lengthy procedures and provide superior clarity for precise vascular identification.\n\nPremium German Osram LEDs: Utilizes genuine, imported Osram LED beads to guarantee a highly stable light output and an extraordinary lifespan of up to 80,000 hours, significantly reducing maintenance costs.\n\nRedundant Double Control System: Features a high-tech, user-friendly central and side dual-control system. This built-in redundancy provides a 100% operational guarantee, ensuring uninterrupted lighting when it matters most.\n\nOptimal Comfort: Generates cold light with a minimal temperature rise of just 1°C at the surgeon's head area, maintaining a comfortable and safe environment for both the surgical team and the patient.	The Suxin Medical SX-700/700 is a dual-dome, ceiling-mounted LED shadowless surgical lamp powered by genuine German Osram LEDs. Delivering up to 180,000 Lux of adjustable illumination and an impressive 80,000-hour lifespan, it features a specialized color LED layout (red and green) to reduce visual fatigue and enhance vascular clarity. Complete with a fail-safe double control system, it provides highly reliable, premium lighting for complex operating environments.	\N	4	China	CE Mark (CE-MDR): Certified compliant with European Medical Device Regulations, ensuring the products meet rigorous health, safety, and environmental protection standards for the European Economic Area.\nISO 13485 (EN ISO 13485:2016): Certified under the international standard for quality management systems specifically for the design and manufacture of medical devices.\nISO 9001: Certified for overall quality management systems, demonstrating consistent manufacturing and strict quality control processes.\nIEC 60601-1 / EN 60601-1:2016: Fully compliant with the internationally recognized general standards for the basic safety and essential performance of medical electrical equipment.\nIEC 60601-2-41: Compliant with the specific international safety and performance standards tailored for surgical luminaires (operating lights) and luminaires for diagnosis.\nFree Sales Certificate (FSC): Approved for international export and commercial distribution.\nJiangsu Provincial FDA Approval: Fully licensed and approved by the regional Food and Drug Administration in their manufacturing jurisdiction (Jiangsu Province, China).	published	Healing Technology — Suxin Medical SX-700/700 LED Shadowless Operating Lamp	The Suxin Medical SX-700/700 is a dual-dome, ceiling-mounted LED shadowless surgical lamp powered by genuine German Osram LEDs. Delivering up to 180,000 Lux of adjustable illumination and an impressive 80,000-hour lifespan, it features a specialized color LED layout (red and green) to reduce visual fatigue and enhance vascular clarity. Complete with a fail-safe double control system, it provides highly reliable, premium lighting for complex operating environments.	68	2026-04-21 06:34:56.485+00	2026-04-15 06:17:33.443+00	\N	\N
21	TRIUP 3008A Hydraulic Operation Table	TRIUP-3008A	f	TRIUP-3008A	7	16	\N	TRIUP 3008A Hydraulic Operation Table	TRIUP 3008A Hydraulic Operation Table\nThe 3008 and 3008A models by TRIUP International Corp. are head-operating universal hydraulic tables designed to support a wide variety of surgical disciplines. These highly adaptable tables are ideal for thoracic surgery, abdominal surgery, ophthalmology, otorhinolaryngology, obstetrics and gynecology, urinary surgery, and orthopedics.\n\nKey Features & Design:\nReliable Hydraulic Operation: The table's height (rise and drop) is effortlessly controlled using a pedal-operated oil pump, while all other multi-directional movements are precisely handled by a mechanical transmission head.\n\nModel Options: The 3008 is the standard configuration, while the upgraded 3008A features a premium stainless steel base shell, stand column, and bed surface for enhanced durability and hygiene.\n\nEnhanced Comfort: To ensure patient comfort and safety during procedures, the included shoulder supports, body supports, and armrests are finished with a leather wrap	The 3008A Hydraulic Operation Table by TRIUP International is a highly versatile, multi-discipline surgical table designed to accommodate everything from orthopedics and obstetrics to thoracic and ophthalmic procedures.\n\nCore Highlights:\n\nReliable Mechanics: Features a smooth, pedal-operated hydraulic oil pump for height adjustments, paired with a mechanical transmission head for precise, multi-directional tilt and section controls.\n\nDurable Construction: While the 3008 is a reliable standard model, the 3008A upgrade features a premium stainless steel base, column, and bed surface for superior hygiene and longevity.\n\nComprehensive Comfort: Comes fully equipped with standard positioning accessories—including shoulder, body, and arm supports—all finished with comfortable leather wraps to ensure optimal patient safety and stability.	\N	57	China	Manufactured by TRIUP International Corp., the 3008 and 3008A Hydraulic Operation Tables are backed by over 20 years of medical manufacturing expertise and adhere to strict international quality control standards:\n\nISO 13485 & ISO 9000 Certified: Manufactured under globally recognized, strict Quality Management Systems specifically dedicated to medical device production.\n\nCE Marked / TUV Certified: Meets the rigorous health, safety, and environmental protection directives required for international and European medical markets.\n\nGlobal Export Standards: Designed and tested to meet reliable operational and safety criteria for hospitals and surgical centers worldwide.	published	Healing Technology — TRIUP 3008A Hydraulic Operation Table	The 3008A Hydraulic Operation Table by TRIUP International is a highly versatile, multi-discipline surgical table designed to accommodate everything from orthopedics and obstetrics to thoracic and ophthalmic procedures.\n\nCore Highlights:\n\nReliable Mechanics: Features a smooth, pedal-operated hydraulic oil pump for height adjustments, paired with a mechanical transmission head for precise, multi-directional tilt and section controls.\n\nDurable Construction: While the 3008 is a reliable standard model, the 3008A upgrade features a premium stainless steel base, column, and bed surface for superior hygiene and longevity.\n\nComprehensive Comfort: Comes fully equipped with standard positioning accessories—including shoulder, body, and arm supports—all finished with comfortable leather wraps to ensure optimal patient safety and stability.	59	2026-04-19 09:33:45.249+00	2026-04-09 04:28:09.519+00	\N	\N
14	AEONMED BF30ST BiPAP	AEONMED-BF30STBiPAP	f	AEONMED-BF30STBiPAP	4	3	\N	AEONMED BF30ST BiPAP	AEONMED NeoBip BF30ST Non-Invasive Ventilator\nThe Aeonmed BF30ST from the NeoBip series is a high-performance non-invasive ventilator designed to deliver accurate, intelligent control for every comfortable breath. Engineered with over 20 years of technology accumulation, this device features a unique pressure control algorithm that rapidly adapts to a patient's breathing efforts to ensure perfect synchronization. It is intended specifically for the treatment of adult Obstructive Sleep Apnea (OSA) or for patients with pulmonary insufficiency requiring respiratory support.\n\nAdvanced Therapy Modes & VGPS Technology\nThe BF30ST supports a comprehensive suite of ventilation modes, including CPAP, S, T, S/T, and VGPS.\n\nVGPS (Volume Guarantee Pressure Support): This mode guarantees a pre-set tidal volume target.\n\nIf the system detects that a patient's inspiratory volume is falling short, it automatically raises the inspiratory pressure to achieve the target volume.\n\nThis ensures the patient's tidal volume is maintained, even if their airway resistance or compliance changes during the night.\n\nAdditionally, a low tidal volume alarm provides an extra layer of ventilation safety.\n\nKey Features\nUltra-Fast Synchronization: Features a 6-level adjustable pressure rise slope. The device responds to a patient's inspiratory trigger in as fast as 150ms, ensuring smooth breaths and easing the workload on respiratory muscles.\n\nHigh-Resolution Touchscreen: Built with a vibrant 4.3-inch colorful touchscreen display. It utilizes an exquisite UI design that displays multiple monitored parameters simultaneously, paired with a highly flexible navigator knob for effortless operation.\n\nWhisper-Quiet Operation: Operates at a remarkably low noise level of less than 30dB, ensuring uninterrupted sleep for both the patient and their partner.\n\nTravel-Friendly & Detachable Design: The main unit weighs only 0.82kg, scaling to a total of 1.26kg when the humidifier is attached. The detachable design between the main unit and humidifier makes it highly convenient for both home use and traveling.\n\nAS-Dry Technology: Includes automated AS-Dry technology to help reduce internal moisture, keeping the equipment hygienic.	AEONMED NeoBip BF30ST BiPAP: Quick Summary\n\nThe AEONMED NeoBip BF30ST is an advanced, non-invasive ventilator tailored for adults managing Obstructive Sleep Apnea (OSA) or pulmonary insufficiency. Its standout feature is VGPS (Volume Guarantee Pressure Support), an intelligent technology that automatically adjusts pressure to ensure your target tidal volume is always met.\n\nEngineered for exceptional comfort and synchronization, it responds to breathing triggers in just 150 milliseconds. A vibrant 4.3-inch touchscreen allows for effortless navigation, while the whisper-quiet motor (under 30dB) guarantees a peaceful night. With its lightweight, detachable humidifier design, the BF30ST is the perfect, versatile solution for both reliable home therapy and travel.	\N	124	German	The AEONMED NeoBip BF30ST BiPAP is manufactured under stringent global quality control protocols to ensure premium safety and performance. The device meets or exceeds the following international medical and safety standards:\n\nCE Mark: Certified to meet the European Union's health, safety, and environmental protection requirements for medical devices.\n\nISO 13485: Manufactured in a facility certified for Quality Management Systems specific to medical devices.\n\nISO 80601-2-70:2015: Compliant with specific requirements for the basic safety and essential performance of sleep apnea breathing therapy equipment.\n\nISO 80601-2-74:2017: Compliant with standards for respiratory humidifying equipment.\n\nEN 60601-1 / EN 60601-1-2 / EN 60601-1-11: Meets rigorous international electrical safety and electromagnetic compatibility standards for medical electrical equipment, including specific certifications for home healthcare environments.	published	Healing Technology — AEONMED BF30ST BiPAP	AEONMED NeoBip BF30ST BiPAP: Quick Summary\n\nThe AEONMED NeoBip BF30ST is an advanced, non-invasive ventilator tailored for adults managing Obstructive Sleep Apnea (OSA) or pulmonary insufficiency. Its standout feature is VGPS (Volume Guarantee Pressure Support), an intelligent technology that automatically adjusts pressure to ensure your target tidal volume is always met.\n\nEngineered for exceptional comfort and synchronization, it responds to breathing triggers in just 150 milliseconds. A vibrant 4.3-inch touchscreen allows for effortless navigation, while the whisper-quiet motor (under 30dB) guarantees a peaceful night. With its lightweight, detachable humidifier design, the BF30ST is the perfect, versatile solution for both reliable home therapy and travel.	120	2026-04-23 10:34:58.954+00	2026-04-09 04:28:09.307+00	\N	\N
30	Suxin Medical SX-II 700/700 LED Shadowless Operating Lamp	SuxinMedicalSX-II700700	f	SX-II 700/700	7	7	\N	OT Light Double Dome 700/700	\N	\N	\N	31	China	\N	published	Healing Technology — SX-II 700/700 LED Shadowless Operating Lamp	\N	\N	2026-04-15 10:35:04.696+00	2026-04-15 10:31:47.117+00	\N	\N
20	Suxin SXS3008 Head-Operated Comprehensive Operating Table	Suxin-SXS3008	f	Suxin-SXS3008	7	7	\N	Suxin SXS3008 Head-Operated Comprehensive Operating Table	Suxin SXS3008 Head-Operated Comprehensive Operating Table\nThe Suxin SXS3008 Series (including the SXS3008-II and SXS3008-III models) by Jiangsu Suxin Medical Equipment is a highly versatile, head-controlled hydraulic operating table. Engineered for precision and stability, it is an ideal, multi-functional solution for a wide range of surgical disciplines, including general surgery (thorax, abdomen, perineum), neurosurgery, ophthalmology, ENT, gynecology, and orthopedics.\n\nKey Features\nHead-Controlled Hydraulics: Features a reliable, smooth oil-pump hydraulic lifting mechanism. All multi-directional positional adjustments (tilt, back, and leg plates) are safely and efficiently controlled from the head side of the table by the anesthesiologist or surgical staff.\n\nExceptional Stability: The central hydraulic column is purposefully designed to prevent overturning, safely supporting a maximum dynamic load capacity of over 250 kg. Select models feature a T-base design for enhanced floor stability during rigorous procedures.\n\nPremium Construction: Built for the demanding operating room environment, the base seat and column are available in high-quality stainless steel (providing superior rust resistance and hygiene) or durable carbon steel with powder coating.\n\nFlexible Patient Positioning: Equipped with a split-type leg plate to accommodate complex lower limb positioning and an integrated kidney bridge elevator for optimized access during abdominal and kidney surgeries.\n\nC-Arm & X-Ray Ready: The advanced SXS3008-III model features a double tabletop design with a radiolucent upper surface, ensuring clear, unobstructed intraoperative X-ray and imaging capabilities.	The Suxin SXS3008 Series is a highly versatile, head-controlled hydraulic operating table designed to support a wide variety of surgical disciplines. Built for rigorous operating room environments, it provides exceptional stability with a safe load capacity of over 250 kg.\n\nCore Highlights:\n\nHead-Controlled Precision: Features smooth hydraulic lifting, with all multi-directional positioning (tilt, back, and leg adjustments) safely operated from the head of the table.\n\nSurgical Versatility: Equipped with a split-type leg plate for complex lower limb positioning and a built-in kidney bridge providing up to 120mm of elevation.\n\nImaging Ready: The premium SXS3008-III model features a dual-layer radiolucent tabletop, perfectly accommodating intraoperative X-ray and C-arm imaging.\n\nDurable Construction: Built with an anti-overturn central column and available in premium stainless steel for maximum hygiene and rust resistance.	\N	61	China	Manufactured by Jiangsu Suxin Medical Equipment Co., Ltd., the SXS3008 Series is built to strict international safety and quality standards, ensuring absolute reliability in demanding surgical environments:\n\nCE Marked: Fully certified to meet European health, safety, and environmental protection standards for medical devices.\n\nISO 13485 & ISO 9001 Certified: Produced under globally recognized Quality Management Systems specifically mandated for medical equipment manufacturing and operational excellence.\n\nProvincial Regulatory Approval: Officially authorized and recognized by the Jiangsu Provincial Food and Drug Administration as a high-quality medical device.	published	Healing Technology — Suxin SXS3008 Head-Operated Comprehensive Operating Table	The Suxin SXS3008 Series is a highly versatile, head-controlled hydraulic operating table designed to support a wide variety of surgical disciplines. Built for rigorous operating room environments, it provides exceptional stability with a safe load capacity of over 250 kg.\n\nCore Highlights:\n\nHead-Controlled Precision: Features smooth hydraulic lifting, with all multi-directional positioning (tilt, back, and leg adjustments) safely operated from the head of the table.\n\nSurgical Versatility: Equipped with a split-type leg plate for complex lower limb positioning and a built-in kidney bridge providing up to 120mm of elevation.\n\nImaging Ready: The premium SXS3008-III model features a dual-layer radiolucent tabletop, perfectly accommodating intraoperative X-ray and C-arm imaging.\n\nDurable Construction: Built with an anti-overturn central column and available in premium stainless steel for maximum hygiene and rust resistance.	62	2026-04-19 09:29:54.648+00	2026-04-09 04:28:09.494+00	\N	\N
11	ZERONE ZEUS-400	ZEUS-400	f	ZEUS-400	7	6	\N	ZERONE ZEUS-400	The Zerone ZEUS-400 is a high-performance electrosurgical unit (ESU) designed for universal surgical applications, offering powerful and stable microprocessor-controlled output. It is a versatile diathermy system used in various specialties, including general surgery, dermatology, and endoscopy.\n\nKey Performance Features\n\nOperating Modes: Includes four cutting modes (Pure Cut and three Blend modes), as well as both monopolar and bipolar coagulation.\n\nBipolar Capabilities: Features bipolar cut and bipolar coagulation modes, which can be operated via hand or foot controls.\n\nMemory & Presets: Equipped with a user storage function capable of saving up to 10 different settings. It also automatically recalls the last used settings upon being turned back on.\n\nCompatibility: The ZEUS-400 is compatible with Argon-Z for Argon Plasma Coagulation.\n\nSafety and Interface\nREM (Return Electrode Monitoring): Continuously monitors the contact area between the patient and the pad; it automatically blocks current if the contact is insufficient to prevent accidental burns.\n\nFeedback System: Ensures a stable and straight power output even during varying tissue resistance.\n\nVisual & Audio Indicators: Features a digital display for easy output value checks, supplemented by distinct audio sounds and LED lamps to signal different working conditions.\n\nProtection: Rated as Class 1, Type CF, with a fully grounded case to prevent leakage current.	\nThe Zerone ZEUS-400 is a high-performance electrosurgical unit (ESU) designed for universal surgical applications, offering powerful and stable microprocessor-controlled output. It is a versatile diathermy system used in various specialties, including general surgery, dermatology, and endoscopy.	\N	132	Korea	\N	published	\N	\N	\N	2026-04-25 05:33:41.673+00	2026-04-09 04:28:09.206+00	\N	\N
24	Suxin Medical SX-700 Shadowless Operating Light	SuxinmedicalSX-700	t	SX-700	7	7	\N	Suxin Medical SX-700 Shadowless Operating Light	Product Overview\nProduct Name: Color Led Two Controls System Ceiling Shadowless Lamp Operating Light\n\nModel: SX-700\n\nBrand: Suxin Medical\n\nManufacturer: Jiangsu Suxin Medical Equipment Co., Ltd.\n\nKey Features\nSanitary Design: Features a fully enclosed, streamlined structure designed to meet the laminar flow purification and hygiene requirements of modern operating rooms.\n\nFlexible Positioning: Utilizes a professionally designed six-joint suspension system with a 340° rotating arm. This ensures flexible, portable, and natural positioning without any drifting.\n\nAdvanced Cold Lighting: Employs novel German cold lighting technology. It produces no infrared or ultraviolet radiation and prevents temperature rise on the surgical team's heads.\n\nLong Lifespan: The LED cold lighting source has a remarkably long service life of up to 80,000 hours, eliminating the need for bulb replacements and providing an eco-friendly and economical solution.\n\nAdjustable Lighting: The color temperature is adjustable from 3700K to 5000K, which helps in making more accurate diagnoses and reduces visual fatigue for doctors. It also features a specific endoscope control mode for different surgical lighting needs.\n\nOptical Precision: Each LED is equipped with a lens refracting and luminous system. The overall design creates a uniform light column with high brightness, ensuring a soft, deep-gathering effect for both high-brightness and high-depth surgical needs.\n\nControls: Features an easy-to-use button-type control panel.	The SX-700 is an advanced, ceiling-mounted surgical light designed to meet the strict hygiene and illumination standards of modern operating rooms. Powered by German cold LED technology, it delivers high-depth, uniform lighting with zero heat, infrared, or UV radiation.\n\nKey Highlights:\n\nUltra-Long Lifespan: Up to 80,000 hours of continuous use with zero bulb replacements.\n\nPrecision Lighting: Adjustable color temperature (3700K–5000K) to reduce eye strain, plus a dedicated endoscope mode.\n\nSeamless Mobility: A 6-joint suspension system with a 340° rotating arm ensures smooth, drift-free positioning.\n\nSanitary Design: Fully enclosed and streamlined to support laminar flow purification in surgical environments.	\N	35	China	CE Mark (CE-MDR): Certified compliant with European Medical Device Regulations, ensuring the products meet rigorous health, safety, and environmental protection standards for the European Economic Area.\nISO 13485 (EN ISO 13485:2016): Certified under the international standard for quality management systems specifically for the design and manufacture of medical devices.\nISO 9001: Certified for overall quality management systems, demonstrating consistent manufacturing and strict quality control processes.\nIEC 60601-1 / EN 60601-1:2016: Fully compliant with the internationally recognized general standards for the basic safety and essential performance of medical electrical equipment.\nIEC 60601-2-41: Compliant with the specific international safety and performance standards tailored for surgical luminaires (operating lights) and luminaires for diagnosis.\nFree Sales Certificate (FSC): Approved for international export and commercial distribution.\nJiangsu Provincial FDA Approval: Fully licensed and approved by the regional Food and Drug Administration in their manufacturing jurisdiction (Jiangsu Province, China).	published	Healing Technology — Suxin Medical SX-700 Shadowless Operating Light	The SX-700 is an advanced, ceiling-mounted surgical light designed to meet the strict hygiene and illumination standards of modern operating rooms. Powered by German cold LED technology, it delivers high-depth, uniform lighting with zero heat, infrared, or UV radiation.\n\nKey Highlights:\n\nUltra-Long Lifespan: Up to 80,000 hours of continuous use with zero bulb replacements.\n\nPrecision Lighting: Adjustable color temperature (3700K–5000K) to reduce eye strain, plus a dedicated endoscope mode.\n\nSeamless Mobility: A 6-joint suspension system with a 340° rotating arm ensures smooth, drift-free positioning.\n\nSanitary Design: Fully enclosed and streamlined to support laminar flow purification in surgical environments.	40	2026-04-21 06:38:05.514+00	2026-04-09 04:28:09.626+00	\N	\N
31	HF MED HF-L60 L84C LED shadowless operating lamp	HF-L60-L84C	f	HF-L60 L84C	7	27	\N	HF MED HF-L60 L84C LED shadowless operating lamp	Product Overview\nThe HF-L60 L84C LED is a shadowless operating lamp manufactured by SHANGHAI HUIFENG MEDICAL INSTRUMENT CO.,LTD (HFMED). It is designed as an ideal surgical light solution to meet the diverse requirements of general surgery.\nKey Features\nAdvanced Lighting Control: The lamp features precise dimming control to accommodate various lighting requests. It utilizes high-density light mixing technology to provide both high brightness and high-quality light.\n\nAdjustable Settings: Users can utilize 8 levels of brightness adjustment and 3 levels of color temperature adjustment (3800K to 5000K ±300K). It also features manual mechanical spot size adjustment ranging from 160mm to 200mm.\n\nENDO Mode: The lamp is equipped with a one-button dim light setting, specifically designed as an Endoscope Mode. This allows surgeons to quickly switch from general mode without interfering with their field of vision during tissue observation.\n\nSuperior Thermal Management: An original thermal management system is built in to effectively reduce the temperature of the chip core. It uses a cast high-heat-conducting aluminum alloy radiator to instantly derive heat, which effectively reduces the lamp's temperature and improves its service life.\n\nHygienic Design: The streamlined lamp body features a superior laminar flow design. This careful assembly increases airflow efficiency, helping to remove dust and bacteria from around the lamp.\n\nSterilizable Handle: The lamp includes a removable handle that can withstand high-temperature sterilization. This ensures doctors and nurses can safely and conveniently control the light's direction and depth.	The HF-L60 L84C LED is a shadowless operating lamp manufactured by HFMED, designed to meet the diverse needs of general surgery.\n\nKey Highlights:\nHigh-Quality Lighting: Delivers an illuminance of up to roughly 160,000 Lux and features an excellent color rendering index (Ra) of 96 to 100.\n\nCustomizable Control: Offers 8 brightness levels, 3 color temperature settings ranging from 3800K to 5000K, and an adjustable spot diameter of 160-200mm.\n\nSpecialized Modes: Features a one-button "ENDO Mode" that dims the light for endoscopic procedures, allowing surgeons to observe tissue without visual interference.\n\nDurability & Hygiene: Built with a high-heat-conducting aluminum alloy radiator for efficient cooling, a streamlined laminar flow design to help remove bacteria and dust, and a removable handle that can be sterilized at high temperatures.	\N	32	China	CE Mark: Specifically indicated on the HF-L60 L84C LED product document.\n\nISO 9001 & ISO 13485: Certified for general and medical device quality management systems.\n\nFDA: Certified to meet United States Food and Drug Administration standards.\n\nSGS: Verified and inspected for product quality and safety compliance.\n\nMDR / MDA: Compliant with international Medical Device Regulations.\n\nCredit Rating: Recognized locally in Shanghai as a Quality Credit A-level enterprise for medical device manufacturing.	published	Healing Technology — HF MED HF-L60 L84C LED shadowless operating lamp	\N	\N	2026-04-19 08:23:49.139+00	2026-04-15 10:54:14.981+00	\N	\N
13	Heyer CPAP 20A Pro	CPAP-20A-Pro	f	CPAP-20A-Pro	4	2	\N	Heyer CPAP 20A Pro	The Heyer CPAP 20A Pro is a medical-grade respiratory health manager developed in Germany. It features a modern, homestyle design that blends into the bedroom like a smart speaker, moving away from the clinical look of traditional medical equipment.\n\nIntelligent Therapy Features\nPrecision Control: Features medical-grade calibration standards accurate to 0.1 cmH2O, providing hospital-level treatment precision.\n\n12-Sensor Collaborative Monitoring: An interlinked sensing system provides real-time feedback on environmental changes and captures accurate respiratory waveforms.\n\nCareRamp: The device starts at a low pressure and increases intelligently only after detecting that the user has fallen asleep to avoid a suffocating sensation.\n\nAS-Elex: Automatically decreases expiratory pressure to make every exhalation more comfortable.\n\nComfort and Maintenance\nDual-Core Humidification: Intelligently adjusts temperature and humidity levels for optimal comfort.\n\nPreheat Function: One-click heating 30 minutes before sleep helps avoid cold condensation.\n\nAS-Dry: Following treatment, a 30-minute low-speed airflow circulation reduces residual moisture by 80%.\n\nAuto On/Off: Sensors detect airflow and pressure to start treatment immediately upon wearing the mask and stop upon removal.\n\nWide-Opening Water Tank: Designed for easy cleaning and filling with a fool-proof installation.	The Heyer CPAP 20A Pro is a German-engineered respiratory health manager designed to blend into the home like a smart speaker. It features hospital-grade precision accurate to 0.1 cmH2O and an intelligent CareRamp system that only increases pressure once it detects you have fallen asleep. With its ultra-quiet operation (≤ 28 dB), dual-core humidification, and automatic expiratory pressure relief, it provides a seamless and comfortable sleep therapy experience.	\N	131	German	The Heyer CPAP 20A Pro and the broader Luvar E Series are developed and manufactured according to rigorous international and European medical standards.\n\nKey Certifications and Quality Standards\n\nCE Marking (CE 0123): The Luvar E Series carries the CE 0123 mark, indicating compliance with European Union health, safety, and environmental protection standards for medical devices.\n\nEU MDR Compliance: These devices are designed and produced by Heyer Medical AG to meet the latest European Medical Device Regulation (MDR) standards.\n\nGerman Engineering Standards: All Luvar devices are developed in Germany by highly qualified engineers using the latest development standards.\n\nStrict Quality Control: Production adheres to stringent German quality standards to ensure high reliability and performance.	published	Healing Technology — Heyer CPAP 20A Pro	The Heyer CPAP 20A Pro is a German-engineered respiratory health manager designed to blend into the home like a smart speaker. It features hospital-grade precision accurate to 0.1 cmH2O and an intelligent CareRamp system that only increases pressure once it detects you have fallen asleep. With its ultra-quiet operation (≤ 28 dB), dual-core humidification, and automatic expiratory pressure relief, it provides a seamless and comfortable sleep therapy experience.	128	2026-04-26 04:34:26.623+00	2026-04-09 04:28:09.274+00	\N	\N
15	Aeonmed AS100A Auto CPAP	AS100A-AutoCPAP	f	AS100A-AutoCPAP	4	3	\N	Aeonmed AS100A Auto CPAP	AS100A Auto CPAP: Choose a Better Product for a Higher Quality Sleep\nBacked by AEONMED’s more than 20 years of expertise in respiratory research, the AS100A Auto CPAP is engineered to deliver a superior, high-precision treatment experience. This advanced device is designed to automatically adjust treatment pressure according to the patient's breathing airflow and airway conditions, ensuring maximum effectiveness and comfort throughout the night.\n\nKey Features & Benefits\nIntelligent CSA Identification: The AS100A effectively identifies Central Sleep Apnea (CSA) and Obstructive Sleep Apnea (OSA) to reduce improper pressure rises that could negatively affect the patient.\n\nAS-Dry Technology: Following humidified treatment, the turbine blows at a lower speed for 30 minutes to cool down and dry the airway and water tank. This maintains a dry environment, protects the machine against moisture, reduces bacterial breeding, and ensures a healthy treatment experience.\n\nAS-Elex Expiration Pressure Release: To increase patient compliance and reduce discomfort, this feature provides 3 different grades of pressure release during expiration.\n\nSmooth Breathing Shifts: The unique tracking system follows every breath closely, guaranteeing super smooth shifts between inspiration and expiration.\n\nReal-Time Manual Titration: This function allows doctors to complete the clinical titration process without having to stop the patient's treatment.\n\nIntuitive Touch Screen: A 3.5-inch touch screen ensures a fashionable, high-tech view while simplifying operation and report reviews.\n\nComprehensive Data Storage: An included SD card stores up to 5 years of therapy data. Users can easily read their P90 pressure, AHI, SNI, CAI, AI, Average pressure, and Leak data directly on the screen or through PC software.\n\nSuperior Air Filtration: An optional folded PM2.5/Pollen filter (unfolding up to 20cm2) ensures efficient dust and pollen filtering to provide clean air, protect the inner airway of the device, and prolong its working life.\n\nCompact and Travel-Ready: With a light and compact design, the whole device weighs just 1.3 kg, making it a great choice for both home and travel use.	AEONMED AS100A Auto CPAP\nThe AEONMED AS100A Auto CPAP is a premium, travel-friendly respiratory device engineered for superior sleep therapy. It automatically adjusts pressure to match your breathing patterns, featuring advanced CSA identification and AS-Elex expiration relief for maximum comfort. Complete with an intuitive 3.5-inch touch screen, ultra-quiet operation (≤ 30dB), and innovative AS-Dry technology to maintain a clean, moisture-free system, the AS100A delivers high-precision, comfortable treatment both at home and on the go.	\N	123	China	Aeonmed AS100A Auto CPAP indicate that the device carries the following major medical and quality certifications:\n\nCE Mark (EU): Certified to meet European health, safety, and environmental protection standards for medical devices.\n\nFDA Approval (U.S.): Approved/cleared by the U.S. Food and Drug Administration for medical use.\n\nISO Certifications: Aeonmed manufactures its devices under strict quality control standards, holding certificates such as ISO 13485:2016 (Quality Management Systems for Medical Devices) and ISO 9001:2015.	published	Healing Technology — Aeonmed AS100A Auto CPAP	AEONMED AS100A Auto CPAP\nThe AEONMED AS100A Auto CPAP is a premium, travel-friendly respiratory device engineered for superior sleep therapy. It automatically adjusts pressure to match your breathing patterns, featuring advanced CSA identification and AS-Elex expiration relief for maximum comfort. Complete with an intuitive 3.5-inch touch screen, ultra-quiet operation (≤ 30dB), and innovative AS-Dry technology to maintain a clean, moisture-free system, the AS100A delivers high-precision, comfortable treatment both at home and on the go.	117	2026-04-22 12:50:42.494+00	2026-04-09 04:28:09.341+00	\N	\N
23	Heyer Purelit OL9500	Purelit-OL9500	f	Purelit-OL9500	7	2	\N	Heyer Purelit OL9500	The Purelit OL9500 series by Heyer is an advanced surgical lighting system designed to meet the needs of high-end medical users. The product holds 15 patents and has been recognized with the 2010 Red Star Design Award and the 2013 High-tech Produce Star by the Beijing Government.\n\nKey Features:\nDesign & Hygiene:\nThe light head features an ultra-thin, streamlined aluminum alloy shell that provides low wind resistance, allowing stable laminar airflow to reach the surgical wound and prevent cross-infection.\nThe aluminum shell also offers outstanding heat dissipation to extend the life of the LEDs.\nIt includes a detachable and sterilizable PSU Polysulfone handle that can withstand heating up to 135°C.\n\nLighting Quality & Precision:\nThe system delivers an all-dimensional, shadowless lighting experience with a white LED light that eliminates colored cast shadows.\nA multi-lens structure with patented focus technology can deliver a light spot diameter of up to 250mm and an illumination depth of up to 1,400mm.\nIt includes two independent LED bulbs specifically to provide basic illumination for endoscopic surgeries.\nThe synthetic resin light screen features anti-infrared coating (to prevent tissue desiccation), 2H hardness scratch-proofing, and an anti-static coating (to prevent floating particle absorption).\n\nControl & Safety:\nA microprocessor control panel allows surgeons to easily adjust lighting intensity in 10 levels, from 30% to 100%.\nThe multi-lens matrix structure is designed to prevent a total blackout if a single light module fails, ensuring patient safety during operations.\nIt uses a German-imported spring arm that maintains its position without drifting.\n\nEfficiency & Adaptability:\nThe LED bulbs have a long life expectancy of up to 70,000 hours, making them reliable and cost-effective with low power consumption.\nThe system is HD camera compatible and supports low-height ceiling mounting.\n\nTechnical Specifications\nThe series includes two main models: the larger OLSS70 (featuring 20 matrix lens modules and 160 LEDs) and the smaller OL9550 (featuring 10 matrix lens modules and 80 LEDs).\nHere is a comparison of their technical specifications:\nSpecification\t  OLSS70\t    OL9550\nDiameter of lights\t700 mm\t500 mm\nIllumination\t160,000 Lux\t160,000 Lux\nColor temperature\t4,300 K\t4,300 K\nColor rendering Index (Ra)\t95%\t95%\nDiameter of light spot\t250 mm\t200 mm\nLED power\t160 W\t80 W\nIllumination depth (60%)\t2600 mm\t2400 mm\nLED service life\t70,000 hours\t70,000 hours\nBackground light illumination\t230 Lux\t230 Lux\nQuantity of LED bulbs\t160\t80\nMinimum installation height\t2,800 mm\t2,800 mm\nIllumination adjustment\t30% to 100%\t30% to 100%\nTemp rise (surgical area surface)\t15±0.5 °C\t15±0.5 °C\nTemp rise (surgeon's head)\t1±0.5 °C\t1±0.5 °C	The Purelit OL9500 Series by Heyer is a premium LED surgical lighting system that delivers up to 160,000 Lux of shadowless, true-color illumination. Designed for the rigorous demands of modern operating rooms, it combines exceptional optical clarity with advanced safety and hygiene features.\n\nCore Highlights:\n\nPrecision Optics: Delivers a 95% Color Rendering Index (CRI) for accurate tissue visualization, with a fail-safe multi-lens matrix that prevents complete blackouts if a single LED fails.\n\nEnhanced Hygiene & Safety: Features an ultra-thin, aerodynamic profile that supports sterile laminar airflow. Its specialized light screen repels dust, resists scratches, and blocks infrared heat to prevent patient tissue desiccation.\n\nErgonomic & Durable: Equipped with a drift-free German spring arm, a sterilizable handle, and energy-efficient LEDs that boast a 70,000-hour lifespan.	\N	44	German	Certifications & Awards\nBacked by world-class manufacturing standards and recognized for innovation, the Purelit OL9500 Series meets the strictest regulatory requirements for modern surgical environments:\n\nGlobal Compliance: CE Marked and manufactured under ISO 13485 & ISO 9001 certified quality management systems.\n\nOR Safety Standard: Class I medical electrical safety rating with IPX2 protection against fluid ingress.\n\nPatented Innovation: Protected by 15 advanced technology patents.\n\nAward-Winning Design: Winner of the Red Star Design Award and recognized as a "High-Tech Produce Star" for its advanced aerodynamic and optical engineering.	published	Healing Technology — Heyer Purelit OL9500	The Purelit OL9500 Series by Heyer is a premium LED surgical lighting system that delivers up to 160,000 Lux of shadowless, true-color illumination. Designed for the rigorous demands of modern operating rooms, it combines exceptional optical clarity with advanced safety and hygiene features.\n\nCore Highlights:\n\nPrecision Optics: Delivers a 95% Color Rendering Index (CRI) for accurate tissue visualization, with a fail-safe multi-lens matrix that prevents complete blackouts if a single LED fails.\n\nEnhanced Hygiene & Safety: Features an ultra-thin, aerodynamic profile that supports sterile laminar airflow. Its specialized light screen repels dust, resists scratches, and blocks infrared heat to prevent patient tissue desiccation.\n\nErgonomic & Durable: Equipped with a drift-free German spring arm, a sterilizable handle, and energy-efficient LEDs that boast a 70,000-hour lifespan.	\N	2026-04-19 06:54:46.571+00	2026-04-09 04:28:09.583+00	\N	\N
17	JINLING-850 Advance ICU Anesthesia Machine With Ventilator	JINLING-850Advance	f	JINLING-850Advance	7	10	\N	JINLING-850 Advance ICU Anesthesia Machine With Ventilator	JINLING-850 Anesthesia Machine\nProduct Overview\nThe JINLING-850 Anesthesia Machine is a state-of-the-art, pneumatically driven, and electronically controlled workstation engineered for precision and reliability in modern operating rooms and intensive care units. Designed to support closed, semi-closed, and semi-open operating modes, this highly versatile machine delivers comprehensive respiratory control. With its elegant, environmentally friendly frame and advanced interface, the JINLING-850 provides anesthesiologists with the confidence and flexibility needed for both routine surgeries and complex, low-flow anesthesia procedures.\n\nKey Features & Benefits\nAdvanced Real-Time Display: Available with an 8.4-inch (Standard Model) or 10.4-inch (Advanced Model) high-definition color TFT screen. It allows clinicians to easily monitor Pressure-Time, Flow-Time, Pressure-Volume, and Flow-Volume waveforms, enabling instant cycle switching at the touch of a button.\n\nHigh-Precision Gas Delivery: Features a sophisticated five-tube flowmeter (O2, N2O, and Air) fitted with an interlocking oxygen-nitrous oxide supply system, guaranteeing oxygen output never drops below a safe 21%.\n\nSuperior Modular Circuit: Built with a standard integrated metallic modular respiratory circuit. This premium design eliminates gas sealing issues during high-temperature disinfection, ensuring highly effective cleaning and sterilization.\n\nInnovative Na-Lime Tank: Equipped with an international rotating Sodium-lime canister made from imported PPSU material. It is resistant to temperatures up to 134°C and features an easy, one-handed operation system.\n\nLow-Flow Anesthesia Ready: Integrates an advanced, highly stable Adjustable Pressure Limiting (APL) valve, optimized for minimizing anesthetic gas use during low and ultra-low flow procedures.\n\nIntelligent Safety & Backup:\n\nFeatures an automated self-checking function during startup and self-calibrating sensors.\n\nAutomatically switches to a built-in backup battery (minimum 4-hour capacity) during AC power outages.\n\nIncludes comprehensive audible and visual alarms for tidal volume, airway pressure, oxygen concentration, asphyxia, and gas/power failures.	The JINLING-850 Anesthesia Machine is an advanced, highly versatile workstation designed for precision in both operating rooms and ICUs. Capable of supporting pediatric to adult patients, it features a vibrant color TFT display, comprehensive ventilation modes, and a precise five-tube flowmeter with interlocking safety mechanisms to prevent hypoxia.\n\nDesigned for ease of maintenance and infection control, it includes an easily sterilizable metallic modular respiratory circuit and a high-temperature-resistant sodium-lime canister. Fully optimized for low-flow anesthesia, the unit ensures maximum clinical safety with automated self-checks, robust alarm systems, and an automatic 4-hour battery backup.	\N	83	China	JINLING-850 Anesthesia Machine holds the following primary international certifications:\n\nCE Mark: Certified to meet European health, safety, and environmental protection standards for medical devices.\n\nISO 13485: Certified under the internationally recognized quality management system standard specific to the design and manufacture of medical devices.\n\nISO 9001: Compliant with general international quality management system standards.\n\nRoHS: Compliant with the Restriction of Hazardous Substances directive, ensuring the electronic components and manufacturing materials are environmentally safe.	published	Healing Technology — JINLING-850 Advance Anesthesia Machine With Ventilator	The JINLING-850 Anesthesia Machine is an advanced, highly versatile workstation designed for precision in both operating rooms and ICUs. Capable of supporting pediatric to adult patients, it features a vibrant color TFT display, comprehensive ventilation modes, and a precise five-tube flowmeter with interlocking safety mechanisms to prevent hypoxia.\n\nDesigned for ease of maintenance and infection control, it includes an easily sterilizable metallic modular respiratory circuit and a high-temperature-resistant sodium-lime canister. Fully optimized for low-flow anesthesia, the unit ensures maximum clinical safety with automated self-checks, robust alarm systems, and an automatic 4-hour battery backup.	84	2026-04-20 11:20:54.668+00	2026-04-09 04:28:09.41+00	\N	\N
\.


--
-- Data for Name: products_applications; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_applications (_order, _parent_id, id, department) FROM stdin;
1	15	69e72c423220efc4a063a3fc	Obstructive Sleep Apnea (OSA) Treatment: Delivers a continuous, automatically adjusting flow of positive airway pressure to keep the user's airway open during sleep, effectively preventing apnea and hypopnea events.
2	15	69e72c453220efc4a063a3fd	Central Sleep Apnea (CSA) Identification: Intelligently monitors breathing patterns to distinguish between OSA and CSA, preventing improper pressure increases that could negatively impact the patient during central apnea events.
3	15	69e72c4d3220efc4a063a3fe	Home & Travel Care: Its ultra-lightweight (1.3 kg) and compact profile make it ideal for nightly domestic use, as well as a highly convenient solution for patients who travel frequently.
1	25	69df2e65b960ec5fbf6307a1	Major Operating Theaters (OTs)
2	25	69df2ebab960ec5fbf6307a3	Cardiothoracic & Neurosurgery
3	25	69df2ebfb960ec5fbf6307a4	Orthopedic Surgery
4	25	69df2ec8b960ec5fbf6307a5	Plastic & Reconstructive Surgery
5	25	69df2ed1b960ec5fbf6307a6	Emergency & Trauma Centers
6	25	69df2edbb960ec5fbf6307a7	Ambulatory Surgical Centers (ASCs)
7	25	69df2ee5b960ec5fbf6307a8	Advanced Veterinary Hospitals
4	15	69e72c563220efc4a063a3ff	Clinical Therapy & Titration: Features real-time manual titration, allowing healthcare providers and respiratory therapists to safely adjust clinical pressure settings without stopping the patient's ongoing treatment.
1	14	69e7352ea1dc14718977d686	Complex Obstructive Sleep Apnea (OSA): Provides robust, dual-level positive airway pressure for adult patients who require higher pressure settings, or those who have difficulty tolerating standard single-pressure CPAP therapy.
2	14	69e73539a1dc14718977d687	Pulmonary Insufficiency: Delivers essential, life-enhancing respiratory support for patients managing chronic conditions that compromise breathing capacity, such as Chronic Obstructive Pulmonary Disease (COPD) or restrictive lung disorders.
3	14	69e73541a1dc14718977d688	Targeted Volume Ventilation: Utilizing the advanced VGPS mode, this device is ideal for patients who require a guaranteed tidal volume to maintain safe, stable ventilation throughout the night, adapting seamlessly to any changes in airway resistance.
4	14	69e7354aa1dc14718977d689	Spontaneous and Timed Support: Through its comprehensive S/T modes, it provides automatic backup breaths for patients lacking complete spontaneous respiratory capacity, ensuring continuous and secure ventilation.
1	20	69e49f859227f07265a2b770	General Surgery
2	20	69e49fa69227f07265a2b771	Orthopedics
3	20	69e49fa99227f07265a2b772	Gynecology & Urology
4	20	69e49fb99227f07265a2b773	Head & Neck (ENT / Ophthalmology / Neurosurgery)
5	20	69e49fc39227f07265a2b774	Trauma & Emergency
1	17	69e60b601d522a8c2a7de9f9	Operating Rooms (OR): Ideal for delivering and maintaining general inhalation anesthesia during both routine and complex, prolonged surgical procedures.
2	17	69e60bae1d522a8c2a7de9fa	Intensive Care Units (ICU): Capable of providing advanced, reliable respiratory support and mechanical ventilation for critically ill patients.
3	17	69e60bb81d522a8c2a7de9fb	Pediatric and Adult Care: With an expansive and precise tidal volume range (adjustable from 20 to 1500 ml) and versatile ventilation modes, it safely accommodates a broad spectrum of patient demographics, from small children to adults.
4	17	69e60bc01d522a8c2a7de9fc	Low-Flow Anesthesia: Highly optimized for low and ultra-low flow anesthesia techniques. This allows clinics to reduce the consumption of costly anesthetic agents while minimizing environmental exposure in the operating theater.
5	17	69e60bc81d522a8c2a7de9fd	Ambulatory Surgery Centers: Perfectly suited for outpatient surgical settings that demand hospital-grade precision, rapid response times, and comprehensive patient monitoring without compromising on space or efficiency.
1	18	69e60c2f1d522a8c2a7de9fe	Operating Rooms (OR) / Operation Theaters: The primary setting for administering and maintaining general inhalation anesthesia during routine, complex, or prolonged surgical procedures.
2	18	69e60c3e1d522a8c2a7de9ff	Intensive Care Units (ICU): Can be utilized for advanced respiratory support and mechanical ventilation when necessary.
3	18	69e60c461d522a8c2a7dea00	Ambulatory Surgery Centers: Suitable for outpatient surgical clinics that require reliable, high-precision anesthesia delivery and patient monitoring.
4	18	69e60c4e1d522a8c2a7dea01	Diverse Patient Demographics: With a highly adjustable tidal volume (50 to 1500 ml) and versatile ventilation modes, the machine is fully capable of accommodating both adult and pediatric patients.
5	18	69e60c561d522a8c2a7dea02	Low-Flow Anesthesia: Specifically optimized for low and ultra-low flow anesthesia techniques, which helps reduce anesthetic gas consumption and lowers the risk of environmental contamination in the surgical suite.
1	16	69e611c91d522a8c2a7dea0e	General Surgery: Ideal for routine and complex open surgeries, providing precise tissue dissection (pure and mixed cutting) and rapid hemostasis (standard and spraying coagulation) for a variety of tissue types.
2	16	69e611de1d522a8c2a7dea0f	Laparoscopic & Endoscopic Surgery: Fully compatible with suitable endoscopic accessories, allowing surgeons to perform minimally invasive procedures with instantaneous switching between cutting and coagulation.
3	16	69e611e61d522a8c2a7dea10	Gynecology & Obstetrics: Used for procedures requiring careful thermal control and precision, such as hysterectomies, loop electrosurgical excision procedures (LEEP), and other pelvic surgeries.
4	16	69e611ee1d522a8c2a7dea11	Urology: Highly effective for transurethral resections (when using appropriate bipolar/monopolar settings) and other urological interventions involving fluid-filled environments.
5	16	69e611f61d522a8c2a7dea12	Orthopedics: Provides the heavy-duty power required for cutting through dense, highly resistive tissues and managing bleeding during joint and bone surgeries.
6	16	69e611fd1d522a8c2a7dea13	Plastic & Reconstructive Surgery: The precise bipolar modes (up to 100W) allow for delicate tissue coagulation with minimal lateral thermal damage, ensuring better cosmetic outcomes.
7	16	69e612091d522a8c2a7dea14	ENT (Ear, Nose, and Throat): Suitable for delicate dissections and controlling bleeding in confined spaces where precise energy delivery is critical.
1	12	69e9fcf757a33abd2212b680	Complex Respiratory Conditions: It is used to treat patients with conditions such as Chronic Obstructive Pulmonary Disease (COPD), obesity hypoventilation syndrome, or central sleep apnea where advanced pressure support is required.
2	12	69e9fcfa57a33abd2212b681	Variable Pressure Needs: The device is utilized in scenarios where patients need different pressures for inhalation (IPAP up to 30 cmH2O) and exhalation (EPAP) to maintain open airways.
3	12	69e9fd0057a33abd2212b682	Volume Assurance: Through VAT (Volume Assured Technology), it is used to ensure a target tidal volume (200–1500 ml) is met for every breath, providing consistent ventilation regardless of changes in the patient's effort.
4	12	69e9fd0857a33abd2212b683	Apnea Backup: The Backup Vent function is used as a safety measure to initiate breaths automatically if the user's spontaneous breathing rate drops too low.
1	13	69e9f8ee57a33abd2212b67d	Obstructive Sleep Apnea Management: It provides high-precision pressure (accurate to 0.1 cmH2O) to prevent the collapse of the upper airway, reducing snoring and breathing interruptions.
2	13	69e9f8f257a33abd2212b67e	Hospital-to-Home Transition: Due to its medical-grade calibration standards and advanced ventilator algorithms, it offers a level of treatment precision comparable to hospital-grade ventilators, making it ideal for patients requiring consistent, reliable therapy at home.
3	13	69e9f8f957a33abd2212b67f	Respiratory Waveform Tracking: The device captures and monitors respiratory cycles, allowing healthcare providers or users to review obstructive event trends and treatment efficacy.
\.


--
-- Data for Name: products_download_items; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_download_items (_order, _parent_id, id, title, type, file_id, external_url) FROM stdin;
\.


--
-- Data for Name: products_faq_items; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_faq_items (_order, _parent_id, id, question, answer) FROM stdin;
\.


--
-- Data for Name: products_gallery; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_gallery (_order, _parent_id, id, image_id, alt) FROM stdin;
1	31	69e48ebc9227f07265a2b755	65	\N
2	31	69e48ed19227f07265a2b756	66	\N
3	31	69e48f289227f07265a2b757	67	\N
1	17	69e608031d522a8c2a7de9e6	90	\N
2	17	69e608281d522a8c2a7de9e7	86	\N
3	17	69e608471d522a8c2a7de9e8	88	\N
4	17	69e608821d522a8c2a7de9e9	89	\N
1	18	69e605df1d522a8c2a7de9e5	80	\N
2	18	69e6055f1d522a8c2a7de9e1	76	\N
3	18	69e6054f1d522a8c2a7de9e0	75	\N
1	20	69e48c659227f07265a2b753	63	\N
2	20	69e48d469227f07265a2b754	64	\N
1	21	69e486a49227f07265a2b752	58	\N
4	18	69e605671d522a8c2a7de9e2	77	\N
5	18	69e605751d522a8c2a7de9e3	78	\N
6	18	69e6057d1d522a8c2a7de9e4	79	\N
1	22	69e482339227f07265a2b74f	52	\N
2	22	69e4823f9227f07265a2b750	53	\N
3	22	69e482519227f07265a2b751	56	\N
7	18	69e605301d522a8c2a7de9df	74	\N
1	23	69e477359227f07265a2b748	45	\N
2	23	69e479839227f07265a2b74a	46	\N
3	23	69e47b319227f07265a2b74b	47	\N
4	23	69e47b5c9227f07265a2b74c	48	\N
5	23	69e47b6a9227f07265a2b74d	49	\N
6	23	69e47be19227f07265a2b74e	50	\N
1	15	69e72eb03220efc4a063a404	116	\N
2	15	69e72e3f3220efc4a063a400	112	\N
3	15	69e72e533220efc4a063a401	113	\N
4	15	69e72e643220efc4a063a402	114	\N
1	16	69e60fea1d522a8c2a7dea04	91	\N
2	16	69e610031d522a8c2a7dea05	92	\N
5	15	69e72e753220efc4a063a403	115	\N
1	14	69e73613a1dc14718977d68a	127	\N
2	14	69e735043220efc4a063a417	119	\N
1	25	69df33bfb960ec5fbf6307aa	102	\N
2	25	69df33c9b960ec5fbf6307ab	103	\N
3	25	69e4943e9227f07265a2b76e	69	\N
4	25	69e4945c9227f07265a2b76f	104	\N
5	25	69e71a773220efc4a063a3f8	107	\N
6	25	69e7164d3220efc4a063a3f6	105	\N
7	25	69e718a83220efc4a063a3f7	106	\N
1	24	69e71afb3220efc4a063a3fb	109	\N
2	24	69e0c81a57af051018456dc4	108	\N
3	24	69e71ad43220efc4a063a3fa	103	\N
4	24	69e71ac43220efc4a063a3f9	107	\N
5	24	69e0c6ed57af051018456dbe	36	\N
6	24	69e0c7ad57af051018456dc2	39	\N
7	24	69e0c6f757af051018456dbf	42	\N
\.


--
-- Data for Name: products_key_highlights; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_key_highlights (_order, _parent_id, id, item) FROM stdin;
\.


--
-- Data for Name: products_rels; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_rels (id, "order", parent_id, path, products_id) FROM stdin;
51	1	24	relatedProducts	25
\.


--
-- Data for Name: products_spec_groups; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_spec_groups (_order, _parent_id, id, group_title) FROM stdin;
1	1	69d72ad886da9424464137fb	Technical Specs
1	14	69e733cd3220efc4a063a40e	Technical Specifications
1	31	69e479dd34931c3b26d3a31f	Main Parameters
1	12	69e9fd2957a33abd2212b685	Technical specification
1	20	69e49fd49227f07265a2b775	Technical Specifications
1	21	69e4a0f49227f07265a2b780	Technical Specifications
1	13	69e9f70d57a33abd2212b677	Technical Specifications
1	22	69e4a1aa9227f07265a2b789	Technical Specifcations
1	19	69e4c0096a8ee835e89d81de	Ventilator Specifications
2	19	69e4c19a6a8ee835e89d81e6	Pneumatic & Vaporizer Specifications
3	19	69e4c4e06a8ee835e89d81ec	Electrical & Monitoring
1	17	69e609a11d522a8c2a7de9ea	Ventilation Capabilities
2	17	69e60a4b1d522a8c2a7de9f4	Flowmeter & Vaporizer Specs:
1	18	69e6041a1d522a8c2a7de9cf	Technical Specifications
2	18	69e604b71d522a8c2a7de9da	Hardware & Alarms:
1	16	69e6104e1d522a8c2a7dea06	Technical Specifications
1	25	69e491749227f07265a2b764	Technical perameters
1	15	69e72f2f3220efc4a063a405	Technical Specifications
\.


--
-- Data for Name: products_spec_groups_rows; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_spec_groups_rows (_order, _parent_id, id, label, value) FROM stdin;
1	69d72ad886da9424464137fb	69d72ad886da9424464137f8	Illuminance	50,000-160,000 Lux
2	69d72ad886da9424464137fb	69d72ad886da9424464137f9	LED Bulbs	84 pcs
3	69d72ad886da9424464137fb	69d72ad886da9424464137fa	Service Life	≥60,000 Hours
1	69e4c0096a8ee835e89d81de	69e4c00d6a8ee835e89d81df	Patient Type	Adult, Pediatric
2	69e4c0096a8ee835e89d81de	69e4c0776a8ee835e89d81e0	Ventilation Modes	IPPV, PLV, SIMV, Manual, Standby, Spont (with apnea backup)
3	69e4c0096a8ee835e89d81de	69e4c1276a8ee835e89d81e1	Tidal Volume (TV)	20 ~ 1500 ml
4	69e4c0096a8ee835e89d81de	69e4c1376a8ee835e89d81e2	Frequency	4 ~ 100 bpm
5	69e4c0096a8ee835e89d81de	69e4c1466a8ee835e89d81e3	I:E Ratio	4:1 ~ 1:8
6	69e4c0096a8ee835e89d81de	69e4c1546a8ee835e89d81e4	PEEP	0 ~ 30 cmH₂O (Optional)
7	69e4c0096a8ee835e89d81de	69e4c1616a8ee835e89d81e5	Inspiration Pause	OFF, 5% ~ 60%
1	69e4c19a6a8ee835e89d81e6	69e4c1a46a8ee835e89d81e7	Gas Supply	280 ~ 600 kPa
2	69e4c19a6a8ee835e89d81e6	69e4c1b36a8ee835e89d81e8	Flowmeters	Double tube in series (O2: 0~1L/min, 1~10L/min; N2O: 0~1L/min, 1~10L/min)
1	69e6104e1d522a8c2a7dea06	69e610511d522a8c2a7dea07	Pure Cutting - Sine wave	500KHz - 400W
2	69e6104e1d522a8c2a7dea06	69e610fa1d522a8c2a7dea08	Mixed Cutting 1 - Modulated sine wave	500KHz - 250W
3	69e6104e1d522a8c2a7dea06	69e611361d522a8c2a7dea09	Mixed Cutting 2 - Modulated sine wave	500KHz - 200W
4	69e6104e1d522a8c2a7dea06	69e611511d522a8c2a7dea0a	Standard Coagulation - Modulated sine wave	500KHz - 100W
5	69e6104e1d522a8c2a7dea06	69e6116d1d522a8c2a7dea0b	Spraying Coagulation - Modulated sine wave	500KHz - 70W
6	69e6104e1d522a8c2a7dea06	69e611821d522a8c2a7dea0c	Bipolar 1 - Sine wave	500KHz - 100W
7	69e6104e1d522a8c2a7dea06	69e611961d522a8c2a7dea0d	Bipolar 2\tModulated - sine wave	500KHz - 70W
1	69e9fd2957a33abd2212b685	69e9fd5457a33abd2212b686	Therapy Modes:	CPAP, S, T, S/T, PC, and VAT (Volume Assured Technology).
1	69e479dd34931c3b26d3a31f	69e479e934931c3b26d3a320	Illuminance	≥145.000 Lux <160.000 Lux
2	69e479dd34931c3b26d3a31f	69e48ff19227f07265a2b758	Colour temperature	3800K+300K;4400K+300K;5000K+300OK
3	69e479dd34931c3b26d3a31f	69e4901f9227f07265a2b759	Spot diameter	160-200mm
4	69e479dd34931c3b26d3a31f	69e4902a9227f07265a2b75a	Input Power	90VA
5	69e479dd34931c3b26d3a31f	69e490389227f07265a2b75b	LED secondarylight-emitting tube power	3.2V/3W
6	69e479dd34931c3b26d3a31f	69e4904b9227f07265a2b75c	Number of LED secondarylight-emitting tubes	60pcs + 84pcs
7	69e479dd34931c3b26d3a31f	69e4905b9227f07265a2b75d	ENDO	≥10000 Lux
8	69e479dd34931c3b26d3a31f	69e490699227f07265a2b75e	GL	≥12000 Lux
9	69e479dd34931c3b26d3a31f	69e4907f9227f07265a2b75f	Color rendering index(Ra)	96≤Ra≤100
10	69e479dd34931c3b26d3a31f	69e4908c9227f07265a2b760	Color rendering index(Ra)	96≤Ra≤100
11	69e479dd34931c3b26d3a31f	69e4909d9227f07265a2b761	Total irradiance	≤500W/m²
12	69e479dd34931c3b26d3a31f	69e490ab9227f07265a2b762	Illumination depth	20%:Notless than 1070mm. 60%:Not less than 560mm
2	69e9fd2957a33abd2212b685	69e9fd6157a33abd2212b687	IPAP Pressure Range:	6.0 – 30.0 cmH2O.
3	69e9fd2957a33abd2212b685	69e9fd7057a33abd2212b688	EPAP Pressure Range:	4.0 – 25.0 cmH2O.
4	69e9fd2957a33abd2212b685	69e9fd7c57a33abd2212b689	Pressure Accuracy:	Precise control accurate to 0.1 cmH2O.
5	69e9fd2957a33abd2212b685	69e9fd8957a33abd2212b68a	Target Volume (VT):	Adjustable from 200 to 1500 ml.
1	69e733cd3220efc4a063a40e	69e733d13220efc4a063a40f	IPAP Range:	6 – 30 hPa.
2	69e733cd3220efc4a063a40e	69e733de3220efc4a063a410	EPAP Range:	4 – 25 hPa.
3	69e733cd3220efc4a063a40e	69e733f43220efc4a063a411	Target Tidal Volume:	200ml – 1500ml.
4	69e733cd3220efc4a063a40e	69e734013220efc4a063a412	Respiratory Rate:	10BPM / 5-40BPM.
5	69e733cd3220efc4a063a40e	69e7340f3220efc4a063a413	Ramp Time:	0 – 60 minutes
6	69e733cd3220efc4a063a40e	69e734213220efc4a063a414	Monitoring Parameters:	Tracks Pressure, Tidal volume, Minute ventilation, Respiratory rate, and Leakage.
7	69e733cd3220efc4a063a40e	69e7342a3220efc4a063a415	Data Storage:	Equipped with an SD card for long-term therapy data tracking.
1	69e49fd49227f07265a2b775	69e49fe19227f07265a2b776	Overall Dimensions   (L x W)	2100 mm x 500 mm (±20 mm)
2	69e49fd49227f07265a2b775	69e49ff89227f07265a2b777	Working Table Height	750 mm (±50 mm)
3	69e49fd49227f07265a2b775	69e4a00f9227f07265a2b778	Height Adjustment Range	Up to 250 mm
4	69e49fd49227f07265a2b775	69e4a0219227f07265a2b779	Lateral Tilt (Left / Right)	   ≥ 20°
5	69e49fd49227f07265a2b775	69e4a04c9227f07265a2b77a	 Trendelenburg / Reverse   	≥ 20° to 25° 
6	69e49fd49227f07265a2b775	69e4a05c9227f07265a2b77b	Back Plate Adjustment   	+70° to -15° (Up to +80° upward)
7	69e49fd49227f07265a2b775	69e4a0699227f07265a2b77c	 Head Plate Adjustment   	±30° to 90° 
8	69e49fd49227f07265a2b775	69e4a0759227f07265a2b77d	Leg Plate (Downwards)   	≥ 90° 
9	69e49fd49227f07265a2b775	69e4a0809227f07265a2b77e	Kidney Bridge Lift   	≥ 100 mm to 120 mm 
10	69e49fd49227f07265a2b775	69e4a08a9227f07265a2b77f	Maximum Load Capacity  	 > 250 kg
1	69e4a0f49227f07265a2b780	69e4a0f89227f07265a2b781	Height Range  	760mm to 1010mm
2	69e4a0f49227f07265a2b780	69e4a1089227f07265a2b782	Dimensions (Length x Width)  	 2010mm x 480mm
3	69e4a0f49227f07265a2b780	69e4a11c9227f07265a2b783	Lateral Tilt (Left / Right)  	 ≥20° / ≥20°
4	69e4a0f49227f07265a2b780	69e4a12e9227f07265a2b784	Trendelenburg / Reverse  	 ≥25° / ≥25° 
5	69e4a0f49227f07265a2b780	69e4a1449227f07265a2b785	Back Section (Up / Down)   	≥80° / ≥10° 
6	69e4a0f49227f07265a2b780	69e4a14d9227f07265a2b786	Head Section (Up / Down)  	 ≥60° / ≥90° 
7	69e4a0f49227f07265a2b780	69e4a1579227f07265a2b787	Leg Section (Down)   	≥90° 
8	69e4a0f49227f07265a2b780	69e4a1609227f07265a2b788	Waist Board Lifting  	 120 mm
3	69e4c19a6a8ee835e89d81e6	69e4c1c26a8ee835e89d81e9	Breathing Circuit	Closed, Semi-closed, Semi-open
4	69e4c19a6a8ee835e89d81e6	69e4c1d06a8ee835e89d81ea	Vaporizer Support	Supports 2 vaporizers simultaneously.
5	69e4c19a6a8ee835e89d81e6	69e4c1e16a8ee835e89d81eb	Supported Agents	Halothane, Enflurane, Isoflurane, Sevoflurane (Pour-fill, Key-fill, Quik-fil® compatible).
1	69e4a1aa9227f07265a2b789	69e4a1d89227f07265a2b78a	Table length (mm)	2040
2	69e4a1aa9227f07265a2b789	69e4a1f89227f07265a2b78b	Table width (w/o side rails, mm)	520
3	69e4a1aa9227f07265a2b789	69e4a20a9227f07265a2b78c	Table top height adjustment (mm)	680 to 950
4	69e4a1aa9227f07265a2b789	69e4a2179227f07265a2b78d	Trendelenburg/reverse-Trendelenburg	30°
5	69e4a1aa9227f07265a2b789	69e4a2269227f07265a2b78e	Lateral tilting left/right	20°
6	69e4a1aa9227f07265a2b789	69e4a2359227f07265a2b78f	Head plate up/down (detachable)	30°/45°
7	69e4a1aa9227f07265a2b789	69e4a2439227f07265a2b790	Back plate up/down	75°/30°
8	69e4a1aa9227f07265a2b789	69e4a2519227f07265a2b791	Leg plates up/down (detachable)	5°/90°
9	69e4a1aa9227f07265a2b789	69e4a2629227f07265a2b792	Leg plates separation angle	5°/90°
10	69e4a1aa9227f07265a2b789	69e4a2729227f07265a2b793	Leg plates separation angle	180°
11	69e4a1aa9227f07265a2b789	69e4a2819227f07265a2b794	Flex/reflex	210°/105°
12	69e4a1aa9227f07265a2b789	69e4a28f9227f07265a2b795	Kidney bridge elevation (mm)	136
13	69e4a1aa9227f07265a2b789	69e4a2a59227f07265a2b796	Longitudinal displacement (mm)	300 
14	69e4a1aa9227f07265a2b789	69e4a2b29227f07265a2b797	Safe load capacity (kg)	135
15	69e4a1aa9227f07265a2b789	69e4a2c09227f07265a2b798	Maximum static load (kg)	297
16	69e4a1aa9227f07265a2b789	69e4a2cf9227f07265a2b799	Table padding	60mm detachable multi-layer memory foam
17	69e4a1aa9227f07265a2b789	69e4a3db9227f07265a2b79c	Brake	4 sets of electric hydraulic systems
18	69e4a1aa9227f07265a2b789	69e4a3ef9227f07265a2b79d	Head-leg plate interchangeable	Optional
19	69e4a1aa9227f07265a2b789	69e4a4059227f07265a2b79e	Column control panel	Optional
20	69e4a1aa9227f07265a2b789	69e4a46b9227f07265a2b79f	1-key level	Optional
1	69e4c4e06a8ee835e89d81ec	69e4c4e46a8ee835e89d81ed	Battery Backup	DC 24V, providing $\\ge$ 120 minutes of continuous power during outages.
2	69e4c4e06a8ee835e89d81ec	69e4c4f36a8ee835e89d81ee	Display Metrics	Pressure (Ppeak, Pplat, Pmean, PEEP), Volumes (MV, Vt), and optional Gas (O2, CO2, Agent). Displays P-t and F-t waveforms.
3	69e4c4e06a8ee835e89d81ec	69e4c5016a8ee835e89d81ef	Comprehensive Alarms	Visual and audio alarms (triggered within $\\le$ 120 seconds) for High/Low Airway Pressure, Minute Volume, FiO2, Apnea, Power Failure, and O2 Supply Failure.
6	69e9fd2957a33abd2212b685	69e9fd9857a33abd2212b68b	Rise Time:	1 – 6 levels of adjustment.
7	69e9fd2957a33abd2212b685	69e9fda357a33abd2212b68c	Trigger and Cycle:	1 – 6 levels of sensitivity.
8	69e9fd2957a33abd2212b685	69e9fdb057a33abd2212b68d	Respiratory Rate (RR):	5 – 40 BPM.
9	69e9fd2957a33abd2212b685	69e9fdbb57a33abd2212b68e	Inspiratory Time (Ti):	Minimum 0.5s to Maximum 3.0s.
1	69e72f2f3220efc4a063a405	69e72fe33220efc4a063a406	Device Type:	Auto CPAP (Continuous Positive Airway Pressure)
2	69e72f2f3220efc4a063a405	69e72ff43220efc4a063a407	Pressure Range:	4-20 cmH2O
3	69e72f2f3220efc4a063a405	69e7300b3220efc4a063a408	Ramp Time:	0-60 minutes
4	69e72f2f3220efc4a063a405	69e730193220efc4a063a409	Noise Level:	≤ 30dB
5	69e72f2f3220efc4a063a405	69e730273220efc4a063a40a	Humidification System:	Heated humidifier with 5 adjustable levels and a 300ml volume
6	69e72f2f3220efc4a063a405	69e730373220efc4a063a40b	Weight:	Main device is 0.88 kg; 1.26 kg with the humidifier included
7	69e72f2f3220efc4a063a405	69e730453220efc4a063a40c	Alerts:	Features alerts for power down, leaks, filter changes, an alarm clock, and customized notifications
8	69e72f2f3220efc4a063a405	69e730543220efc4a063a40d	Design Options:	Available in four color choices to suit your personal preference
1	69e9f70d57a33abd2212b677	69e9f71957a33abd2212b678	Mode:	Auto CPAP.
2	69e9f70d57a33abd2212b677	69e9f72957a33abd2212b679	Pressure Range:	4–20 cmH2O.
3	69e9f70d57a33abd2212b677	69e9f73757a33abd2212b67a	Noise Level:	Quiet operation at ≤ 28 dB.
4	69e9f70d57a33abd2212b677	69e9f74457a33abd2212b67b	Data Transmission:	Supports SD Card, Bluetooth, and WiFi for data tracking.
5	69e9f70d57a33abd2212b677	69e9f75257a33abd2212b67c	Interface:	Ergonomically designed knob with validated damping for smooth operation.
1	69e491749227f07265a2b764	69e491c79227f07265a2b765	Dome diameter(mm)	700 / 700
2	69e491749227f07265a2b764	69e4923f9227f07265a2b766	Illuminance (lux)	40000-180000
3	69e491749227f07265a2b764	69e492619227f07265a2b767	Color temperature(K)	4000-5700
4	69e491749227f07265a2b764	69e492729227f07265a2b768	Spot diameter(mm)	150-350
5	69e491749227f07265a2b764	69e4929a9227f07265a2b769	Depth of irradiation(mm)	1200
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
1	69e6041a1d522a8c2a7de9cf	69e604261d522a8c2a7de9d0	Tidal Volume:	Adjustable from 50 to 1500 ml (Display range: 0 ~ 2000 ml)
2	69e6041a1d522a8c2a7de9cf	69e604341d522a8c2a7de9d1	Ventilation Frequency:	1 ~ 100 bpm
3	69e6041a1d522a8c2a7de9cf	69e604421d522a8c2a7de9d2	I:E Ratio:	8:1 ~ 1:10 (Capable of inverse ratio ventilation)
4	69e6041a1d522a8c2a7de9cf	69e604531d522a8c2a7de9d3	PEEP:	Electronically controlled, 0 ~ 20 cmH2O
5	69e6041a1d522a8c2a7de9cf	69e604611d522a8c2a7de9d4	Inspiratory Trigger Pressure:	Electronically controlled, -10 ~ 20 cmH2O
6	69e6041a1d522a8c2a7de9cf	69e604711d522a8c2a7de9d5	Sigh Function:	Adjustable, 80 ~ 150 times
7	69e6041a1d522a8c2a7de9cf	69e604811d522a8c2a7de9d6	SIMV Frequency:	1 ~ 20 bpm
8	69e6041a1d522a8c2a7de9cf	69e604901d522a8c2a7de9d7	Flowmeter Range:	O2: 0.1 ~ 10 L/min | N2O: 0.1 ~ 10 L/min
9	69e6041a1d522a8c2a7de9cf	69e604a01d522a8c2a7de9d8	Vaporizer Concentration Range:	0 ~ 5% (Compatible with Enflurane, Isoflurane, Sevoflurane, and optional Halothane)
1	69e604b71d522a8c2a7de9da	69e604c01d522a8c2a7de9db	Gas Requirement:	O2 and N2O (0.32–0.6 MPa)
2	69e604b71d522a8c2a7de9da	69e604d01d522a8c2a7de9dc	Physical Dimensions:	930 mm x 1354 mm x 620 mm
3	69e604b71d522a8c2a7de9da	69e604de1d522a8c2a7de9dd	Weight:	Approximately 86 kg
4	69e604b71d522a8c2a7de9da	69e604ed1d522a8c2a7de9de	Alarm Indicators:	Comprehensive audible and visual alarms for tidal volume deviations, airway pressure, asphyxia, power failure, and oxygen supply failure, complete with a built-in alarm query function.
6	69e491749227f07265a2b764	69e493309227f07265a2b76a	Color rendering index(%)	96
7	69e491749227f07265a2b764	69e4933b9227f07265a2b76b	Brightness adjustment digital display	1-100%
8	69e491749227f07265a2b764	69e4934f9227f07265a2b76c	Temperature rise of surgeon's head	1°C
9	69e491749227f07265a2b764	69e493a79227f07265a2b76d	Led lifespan(h)	80000
\.


--
-- Data for Name: products_support_blocks; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_support_blocks (_order, _parent_id, id, title, body) FROM stdin;
\.


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.site_settings (id, company_name, tagline, address, main_phone, secondary_phone, marketing_phone, service_phone, email, about_summary, trust_summary, global_support_text, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.testimonials (id, client_name, designation, hospital, quote, avatar_id, rating, sort_order, is_active, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.users (id, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	2026-04-19 12:10:05.213+00	2026-04-09 04:20:32.694+00	dibbodutta06@gmail.com	\N	\N	421dfdd008249f8a2ac9c114fae7586b57cd19e63d90df6f7a89467f97030b3e	ba33091b59304726a6d9496098f3debe002b61f5ec6d9713f7798848e373f54008053cad4f002a8781dda9818c1da53baad35bcb0b1a562decaaccab99ae6903b6861430a54dea5e3f695fd300d91dfa2f976707562f3a952204b72bb2aa2ec639abaf36788fa00405bb5e2df3fe63b05dda7bceab434ae85ba1ebaf73895071916dce2e80d0a3b9ada007754288dd9cc5cda51b982de18f7ee026d9b3fb7e2e4d1fab286b1bfdec92e7bcd9e19b879054a34eed0d5238a4d361bcc4149f4c5a14f948db1a4d9ee1e8df2c78d50c45bedc5ba2a487bf85f40b3f01c61600424d192ab56119f0b40017589ffb72e1b852467f426d0bdf20510ef90ceb0665a3eab012a65b05b6a2edfabeb42b83af412d62bb3d12a58b92762dbc2052eaf33559a62ea576a0394889ebd68873ece682b816274b2f0c4f97241f3f15d67bc70d43116af6640145de1385d24efa50e4223b338a5145cbad96d0674e18feb98a1bcab382b164cdfa3ca13a914afee0348b0c69c49ad619c760edf062ed81b5297a6d60767c410349c300c6dffc548d93d0b2485657a41193cd02ce8898f6344e022eedaf599b888caa99446886fa7d0a333907e245c9ee4f4885c217405ac69df913b66b34d262d151445491f01de3a2f5b18880c212c9597284b80555b88f5e92b6abdd7901c27cbb86cee2e8e82446e23d33e9aed387980b09a33012851d6c2e33	0	\N
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	1	89d9b2b1-1405-498c-965c-f783ff05a2c6	2026-04-26 04:34:07.371+00	2026-04-26 06:34:07.371+00
\.


--
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.brands_id_seq', 30, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.categories_id_seq', 7, true);


--
-- Name: certifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.certifications_id_seq', 1, false);


--
-- Name: certifications_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.certifications_rels_id_seq', 1, false);


--
-- Name: client_logos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtechnology.co_bgieab3zdtl
--

SELECT pg_catalog.setval('public.client_logos_id_seq', 1, false);


--
-- Name: faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.faqs_id_seq', 1, false);


--
-- Name: inquiries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.inquiries_id_seq', 2, true);


--
-- Name: legal_pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.legal_pages_id_seq', 1, false);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.media_id_seq', 132, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.orders_id_seq', 13, true);


--
-- Name: partner_logos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.partner_logos_id_seq', 6, true);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_kv_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 204, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 408, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 28, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 107, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.products_id_seq', 32, true);


--
-- Name: products_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.products_rels_id_seq', 51, true);


--
-- Name: site_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.site_settings_id_seq', 1, false);


--
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: certifications certifications_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.certifications
    ADD CONSTRAINT certifications_pkey PRIMARY KEY (id);


--
-- Name: certifications_rels certifications_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.certifications_rels
    ADD CONSTRAINT certifications_rels_pkey PRIMARY KEY (id);


--
-- Name: client_logos client_logos_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtechnology.co_bgieab3zdtl
--

ALTER TABLE ONLY public.client_logos
    ADD CONSTRAINT client_logos_pkey PRIMARY KEY (id);


--
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- Name: inquiries inquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_pkey PRIMARY KEY (id);


--
-- Name: legal_pages legal_pages_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.legal_pages
    ADD CONSTRAINT legal_pages_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: orders_items orders_items_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT orders_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: partner_logos partner_logos_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.partner_logos
    ADD CONSTRAINT partner_logos_pkey PRIMARY KEY (id);


--
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: products_applications products_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_applications
    ADD CONSTRAINT products_applications_pkey PRIMARY KEY (id);


--
-- Name: products_download_items products_download_items_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_download_items
    ADD CONSTRAINT products_download_items_pkey PRIMARY KEY (id);


--
-- Name: products_faq_items products_faq_items_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_faq_items
    ADD CONSTRAINT products_faq_items_pkey PRIMARY KEY (id);


--
-- Name: products_gallery products_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_gallery
    ADD CONSTRAINT products_gallery_pkey PRIMARY KEY (id);


--
-- Name: products_key_highlights products_key_highlights_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_key_highlights
    ADD CONSTRAINT products_key_highlights_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products_rels products_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_rels
    ADD CONSTRAINT products_rels_pkey PRIMARY KEY (id);


--
-- Name: products_spec_groups products_spec_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_spec_groups
    ADD CONSTRAINT products_spec_groups_pkey PRIMARY KEY (id);


--
-- Name: products_spec_groups_rows products_spec_groups_rows_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_spec_groups_rows
    ADD CONSTRAINT products_spec_groups_rows_pkey PRIMARY KEY (id);


--
-- Name: products_support_blocks products_support_blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_support_blocks
    ADD CONSTRAINT products_support_blocks_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- Name: brands_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX brands_created_at_idx ON public.brands USING btree (created_at);


--
-- Name: brands_logo_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX brands_logo_idx ON public.brands USING btree (logo_id);


--
-- Name: brands_name_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE UNIQUE INDEX brands_name_idx ON public.brands USING btree (name);


--
-- Name: brands_slug_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE UNIQUE INDEX brands_slug_idx ON public.brands USING btree (slug);


--
-- Name: brands_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX brands_updated_at_idx ON public.brands USING btree (updated_at);


--
-- Name: categories_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX categories_created_at_idx ON public.categories USING btree (created_at);


--
-- Name: categories_hero_image_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX categories_hero_image_idx ON public.categories USING btree (hero_image_id);


--
-- Name: categories_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX categories_meta_meta_image_idx ON public.categories USING btree (meta_image_id);


--
-- Name: categories_parent_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX categories_parent_idx ON public.categories USING btree (parent_id);


--
-- Name: categories_slug_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE UNIQUE INDEX categories_slug_idx ON public.categories USING btree (slug);


--
-- Name: categories_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX categories_updated_at_idx ON public.categories USING btree (updated_at);


--
-- Name: certifications_badge_image_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX certifications_badge_image_idx ON public.certifications USING btree (badge_image_id);


--
-- Name: certifications_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX certifications_created_at_idx ON public.certifications USING btree (created_at);


--
-- Name: certifications_rels_brands_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX certifications_rels_brands_id_idx ON public.certifications_rels USING btree (brands_id);


--
-- Name: certifications_rels_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX certifications_rels_order_idx ON public.certifications_rels USING btree ("order");


--
-- Name: certifications_rels_parent_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX certifications_rels_parent_idx ON public.certifications_rels USING btree (parent_id);


--
-- Name: certifications_rels_path_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX certifications_rels_path_idx ON public.certifications_rels USING btree (path);


--
-- Name: certifications_rels_products_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX certifications_rels_products_id_idx ON public.certifications_rels USING btree (products_id);


--
-- Name: certifications_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX certifications_updated_at_idx ON public.certifications USING btree (updated_at);


--
-- Name: client_logos_created_at_idx; Type: INDEX; Schema: public; Owner: healingtechnology.co_bgieab3zdtl
--

CREATE INDEX client_logos_created_at_idx ON public.client_logos USING btree (created_at);


--
-- Name: client_logos_logo_idx; Type: INDEX; Schema: public; Owner: healingtechnology.co_bgieab3zdtl
--

CREATE INDEX client_logos_logo_idx ON public.client_logos USING btree (logo_id);


--
-- Name: client_logos_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtechnology.co_bgieab3zdtl
--

CREATE INDEX client_logos_updated_at_idx ON public.client_logos USING btree (updated_at);


--
-- Name: faqs_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX faqs_created_at_idx ON public.faqs USING btree (created_at);


--
-- Name: faqs_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX faqs_updated_at_idx ON public.faqs USING btree (updated_at);


--
-- Name: inquiries_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX inquiries_created_at_idx ON public.inquiries USING btree (created_at);


--
-- Name: inquiries_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX inquiries_updated_at_idx ON public.inquiries USING btree (updated_at);


--
-- Name: legal_pages_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX legal_pages_created_at_idx ON public.legal_pages USING btree (created_at);


--
-- Name: legal_pages_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX legal_pages_meta_meta_image_idx ON public.legal_pages USING btree (meta_image_id);


--
-- Name: legal_pages_slug_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE UNIQUE INDEX legal_pages_slug_idx ON public.legal_pages USING btree (slug);


--
-- Name: legal_pages_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX legal_pages_updated_at_idx ON public.legal_pages USING btree (updated_at);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: orders_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX orders_created_at_idx ON public.orders USING btree (created_at);


--
-- Name: orders_items_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX orders_items_order_idx ON public.orders_items USING btree (_order);


--
-- Name: orders_items_parent_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX orders_items_parent_id_idx ON public.orders_items USING btree (_parent_id);


--
-- Name: orders_items_product_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX orders_items_product_idx ON public.orders_items USING btree (product_id);


--
-- Name: orders_order_number_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE UNIQUE INDEX orders_order_number_idx ON public.orders USING btree (order_number);


--
-- Name: orders_payment_evidence_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX orders_payment_evidence_idx ON public.orders USING btree (payment_evidence_id);


--
-- Name: orders_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX orders_updated_at_idx ON public.orders USING btree (updated_at);


--
-- Name: partner_logos_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX partner_logos_created_at_idx ON public.partner_logos USING btree (created_at);


--
-- Name: partner_logos_logo_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX partner_logos_logo_idx ON public.partner_logos USING btree (logo_id);


--
-- Name: partner_logos_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX partner_logos_updated_at_idx ON public.partner_logos USING btree (updated_at);


--
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_brands_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_brands_id_idx ON public.payload_locked_documents_rels USING btree (brands_id);


--
-- Name: payload_locked_documents_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_categories_id_idx ON public.payload_locked_documents_rels USING btree (categories_id);


--
-- Name: payload_locked_documents_rels_certifications_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_certifications_id_idx ON public.payload_locked_documents_rels USING btree (certifications_id);


--
-- Name: payload_locked_documents_rels_client_logos_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_client_logos_id_idx ON public.payload_locked_documents_rels USING btree (client_logos_id);


--
-- Name: payload_locked_documents_rels_faqs_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_faqs_id_idx ON public.payload_locked_documents_rels USING btree (faqs_id);


--
-- Name: payload_locked_documents_rels_inquiries_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_inquiries_id_idx ON public.payload_locked_documents_rels USING btree (inquiries_id);


--
-- Name: payload_locked_documents_rels_legal_pages_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_legal_pages_id_idx ON public.payload_locked_documents_rels USING btree (legal_pages_id);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_orders_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_orders_id_idx ON public.payload_locked_documents_rels USING btree (orders_id);


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_partner_logos_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_partner_logos_id_idx ON public.payload_locked_documents_rels USING btree (partner_logos_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_products_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_products_id_idx ON public.payload_locked_documents_rels USING btree (products_id);


--
-- Name: payload_locked_documents_rels_testimonials_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_testimonials_id_idx ON public.payload_locked_documents_rels USING btree (testimonials_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: products_applications_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_applications_order_idx ON public.products_applications USING btree (_order);


--
-- Name: products_applications_parent_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_applications_parent_id_idx ON public.products_applications USING btree (_parent_id);


--
-- Name: products_brand_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_brand_idx ON public.products USING btree (brand_id);


--
-- Name: products_category_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_category_idx ON public.products USING btree (category_id);


--
-- Name: products_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_created_at_idx ON public.products USING btree (created_at);


--
-- Name: products_download_items_file_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_download_items_file_idx ON public.products_download_items USING btree (file_id);


--
-- Name: products_download_items_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_download_items_order_idx ON public.products_download_items USING btree (_order);


--
-- Name: products_download_items_parent_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_download_items_parent_id_idx ON public.products_download_items USING btree (_parent_id);


--
-- Name: products_faq_items_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_faq_items_order_idx ON public.products_faq_items USING btree (_order);


--
-- Name: products_faq_items_parent_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_faq_items_parent_id_idx ON public.products_faq_items USING btree (_parent_id);


--
-- Name: products_gallery_image_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_gallery_image_idx ON public.products_gallery USING btree (image_id);


--
-- Name: products_gallery_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_gallery_order_idx ON public.products_gallery USING btree (_order);


--
-- Name: products_gallery_parent_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_gallery_parent_id_idx ON public.products_gallery USING btree (_parent_id);


--
-- Name: products_hero_image_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_hero_image_idx ON public.products USING btree (hero_image_id);


--
-- Name: products_key_highlights_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_key_highlights_order_idx ON public.products_key_highlights USING btree (_order);


--
-- Name: products_key_highlights_parent_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_key_highlights_parent_id_idx ON public.products_key_highlights USING btree (_parent_id);


--
-- Name: products_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_meta_meta_image_idx ON public.products USING btree (meta_image_id);


--
-- Name: products_rels_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_rels_order_idx ON public.products_rels USING btree ("order");


--
-- Name: products_rels_parent_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_rels_parent_idx ON public.products_rels USING btree (parent_id);


--
-- Name: products_rels_path_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_rels_path_idx ON public.products_rels USING btree (path);


--
-- Name: products_rels_products_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_rels_products_id_idx ON public.products_rels USING btree (products_id);


--
-- Name: products_slug_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE UNIQUE INDEX products_slug_idx ON public.products USING btree (slug);


--
-- Name: products_spec_groups_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_spec_groups_order_idx ON public.products_spec_groups USING btree (_order);


--
-- Name: products_spec_groups_parent_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_spec_groups_parent_id_idx ON public.products_spec_groups USING btree (_parent_id);


--
-- Name: products_spec_groups_rows_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_spec_groups_rows_order_idx ON public.products_spec_groups_rows USING btree (_order);


--
-- Name: products_spec_groups_rows_parent_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_spec_groups_rows_parent_id_idx ON public.products_spec_groups_rows USING btree (_parent_id);


--
-- Name: products_support_blocks_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_support_blocks_order_idx ON public.products_support_blocks USING btree (_order);


--
-- Name: products_support_blocks_parent_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_support_blocks_parent_id_idx ON public.products_support_blocks USING btree (_parent_id);


--
-- Name: products_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX products_updated_at_idx ON public.products USING btree (updated_at);


--
-- Name: testimonials_avatar_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX testimonials_avatar_idx ON public.testimonials USING btree (avatar_id);


--
-- Name: testimonials_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX testimonials_created_at_idx ON public.testimonials USING btree (created_at);


--
-- Name: testimonials_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX testimonials_updated_at_idx ON public.testimonials USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: healingtech
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: brands brands_logo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_logo_id_media_id_fk FOREIGN KEY (logo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: categories categories_hero_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_hero_image_id_fkey FOREIGN KEY (hero_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: categories categories_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: categories categories_parent_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_categories_id_fk FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: certifications certifications_badge_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.certifications
    ADD CONSTRAINT certifications_badge_image_id_media_id_fk FOREIGN KEY (badge_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: certifications_rels certifications_rels_brands_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.certifications_rels
    ADD CONSTRAINT certifications_rels_brands_fk FOREIGN KEY (brands_id) REFERENCES public.brands(id) ON DELETE CASCADE;


--
-- Name: certifications_rels certifications_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.certifications_rels
    ADD CONSTRAINT certifications_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.certifications(id) ON DELETE CASCADE;


--
-- Name: certifications_rels certifications_rels_products_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.certifications_rels
    ADD CONSTRAINT certifications_rels_products_fk FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: client_logos client_logos_logo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtechnology.co_bgieab3zdtl
--

ALTER TABLE ONLY public.client_logos
    ADD CONSTRAINT client_logos_logo_id_media_id_fk FOREIGN KEY (logo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: legal_pages legal_pages_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.legal_pages
    ADD CONSTRAINT legal_pages_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: orders_items orders_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT orders_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: orders_items orders_items_product_id_products_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT orders_items_product_id_products_id_fk FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;


--
-- Name: orders orders_payment_evidence_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_payment_evidence_id_media_id_fk FOREIGN KEY (payment_evidence_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: partner_logos partner_logos_logo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.partner_logos
    ADD CONSTRAINT partner_logos_logo_id_media_id_fk FOREIGN KEY (logo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_brands_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_brands_fk FOREIGN KEY (brands_id) REFERENCES public.brands(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_certifications_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_certifications_fk FOREIGN KEY (certifications_id) REFERENCES public.certifications(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_client_logos_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_client_logos_fk FOREIGN KEY (client_logos_id) REFERENCES public.client_logos(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_faqs_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_faqs_fk FOREIGN KEY (faqs_id) REFERENCES public.faqs(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_inquiries_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_inquiries_fk FOREIGN KEY (inquiries_id) REFERENCES public.inquiries(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_legal_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_legal_pages_fk FOREIGN KEY (legal_pages_id) REFERENCES public.legal_pages(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_orders_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_orders_fk FOREIGN KEY (orders_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_partner_logos_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_partner_logos_fk FOREIGN KEY (partner_logos_id) REFERENCES public.partner_logos(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_products_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_products_fk FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_testimonials_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_testimonials_fk FOREIGN KEY (testimonials_id) REFERENCES public.testimonials(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: products_applications products_applications_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_applications
    ADD CONSTRAINT products_applications_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_brand_id_brands_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_brand_id_brands_id_fk FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE SET NULL;


--
-- Name: products products_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: products_download_items products_download_items_file_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_download_items
    ADD CONSTRAINT products_download_items_file_id_media_id_fk FOREIGN KEY (file_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_download_items products_download_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_download_items
    ADD CONSTRAINT products_download_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_faq_items products_faq_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_faq_items
    ADD CONSTRAINT products_faq_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_gallery products_gallery_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_gallery
    ADD CONSTRAINT products_gallery_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_gallery products_gallery_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_gallery
    ADD CONSTRAINT products_gallery_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_hero_image_id_media_id_fk FOREIGN KEY (hero_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_key_highlights products_key_highlights_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_key_highlights
    ADD CONSTRAINT products_key_highlights_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_rels products_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_rels
    ADD CONSTRAINT products_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_rels products_rels_products_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_rels
    ADD CONSTRAINT products_rels_products_fk FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_spec_groups products_spec_groups_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_spec_groups
    ADD CONSTRAINT products_spec_groups_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_spec_groups_rows products_spec_groups_rows_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_spec_groups_rows
    ADD CONSTRAINT products_spec_groups_rows_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products_spec_groups(id) ON DELETE CASCADE;


--
-- Name: products_support_blocks products_support_blocks_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.products_support_blocks
    ADD CONSTRAINT products_support_blocks_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: testimonials testimonials_avatar_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_avatar_id_media_id_fk FOREIGN KEY (avatar_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: healingtech
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict RQD7Z1IfAjTJhqZmowbBCWaDuYuljrVG4Xk1TtZ5BBUvtjdMOTVPdGusWn8maSu

