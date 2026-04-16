--
-- PostgreSQL database dump
--

\restrict UgF1QKIVaTmtwN7tfY3KktNE8nLtwXHZotAdqa177LmX15JnpLGhEILcQkREYQ1

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
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
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
    orders_id integer
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
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.categories (id, title, slug, parent_id, short_description, hero_title, hero_description, sort_order, is_active, meta_title, meta_description, meta_image_id, updated_at, created_at) FROM stdin;
2	ICU Equipment	icu-equipment	\N	\N	\N	\N	\N	t	\N	\N	\N	2026-04-09 04:28:08.664+00	2026-04-09 04:28:08.664+00
3	Neonatal Care	neonatal-care	\N	\N	\N	\N	\N	t	\N	\N	\N	2026-04-09 04:28:08.674+00	2026-04-09 04:28:08.673+00
7	Operation Theater Equipments	ot-quipments	\N	\N	\N	\N	\N	t	Healing Technology — Operation Theater Equipments	\N	\N	2026-04-15 10:19:25.522+00	2026-04-09 04:28:08.735+00
1	Diagnostic 	diagnostic-equipments	1	\N	\N	\N	\N	t	Healing Technology — OT Solutions		\N	2026-04-15 10:20:09.701+00	2026-04-09 04:28:08.651+00
6	Diagnostic Equipments	diagnosticequipments	\N	\N	\N	\N	\N	t	Healing Technology — Diagnostic Equipments	\N	\N	2026-04-15 10:21:00.546+00	2026-04-09 04:28:08.72+00
5	Hospital Furniture	hospital-furniture	\N	\N	\N	\N	\N	t	Healing Technology — Operation Theater Equipments	\N	\N	2026-04-15 10:23:40.272+00	2026-04-09 04:28:08.701+00
4	Respiratory Devices	respiratory-devices	\N	\N	\N	\N	\N	t	\N	\N	\N	2026-04-15 10:24:34.928+00	2026-04-09 04:28:08.691+00
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
16	\N	2026-04-15 07:47:10.695+00	2026-04-15 07:47:10.695+00	/api/media/file/suxinlogo.webp	\N	suxinlogo.webp	image/webp	9332	756	247	50	50
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
33	\N	2026-04-15 10:53:32.2+00	2026-04-15 10:53:32.2+00	/api/media/file/HF-L60-L84C-LED.pdf	\N	HF-L60-L84C-LED.pdf	application/pdf	2559546	\N	\N	\N	\N
34	\N	2026-04-15 11:00:06.789+00	2026-04-15 11:00:06.788+00	/api/media/file/logo.webp	\N	logo.webp	image/webp	5210	400	97	50	50
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
\.


--
-- Data for Name: partner_logos; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.partner_logos (id, name, logo_id, website, sort_order, updated_at, created_at) FROM stdin;
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

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, brands_id, categories_id, certifications_id, products_id, legal_pages_id, testimonials_id, faqs_id, inquiries_id, media_id, partner_logos_id, orders_id) FROM stdin;
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
3	collection-certifications	{}	2026-04-09 04:20:38.332+00	2026-04-09 04:20:38.332+00
5	collection-users	{}	2026-04-09 04:21:06.379+00	2026-04-09 04:21:06.379+00
6	collection-legalPages	{}	2026-04-09 04:21:07.439+00	2026-04-09 04:21:07.439+00
10	collection-testimonials	{}	2026-04-09 04:21:11.46+00	2026-04-09 04:21:11.46+00
9	collection-media	{"limit": 10}	2026-04-09 04:29:53.427+00	2026-04-09 04:21:10.922+00
8	collection-inquiries	{"limit": 10}	2026-04-11 07:33:37.147+00	2026-04-09 04:21:08.4+00
12	collection-orders	{}	2026-04-14 10:18:23.415+00	2026-04-14 10:18:23.414+00
7	collection-faqs	{"limit": 10}	2026-04-14 10:18:32.518+00	2026-04-09 04:21:07.997+00
13	collection-partner-logos	{}	2026-04-15 06:02:14.066+00	2026-04-15 06:02:14.066+00
14	collection-products-25	{"fields": {"keyHighlights": {"collapsed": ["69df2e50b960ec5fbf6307a0"]}}}	2026-04-15 06:21:19.072+00	2026-04-15 06:21:19.073+00
1	collection-brands	{"sort": "name", "limit": 50}	2026-04-15 07:09:00.432+00	2026-04-09 04:20:36.711+00
11	nav	{"open": true}	2026-04-15 07:30:02.71+00	2026-04-11 06:40:57.781+00
4	collection-products	{"limit": 10, "editViewType": "default"}	2026-04-15 07:36:47.924+00	2026-04-09 04:20:39.04+00
2	collection-categories	{"sort": "title", "limit": 25}	2026-04-15 10:25:58.349+00	2026-04-09 04:20:37.616+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
3	\N	3	user	1
5	\N	5	user	1
6	\N	6	user	1
10	\N	10	user	1
12	\N	9	user	1
22	\N	8	user	1
33	\N	12	user	1
34	\N	7	user	1
39	\N	13	user	1
40	\N	14	user	1
49	\N	1	user	1
52	\N	11	user	1
54	\N	4	user	1
58	\N	2	user	1
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
11	AS100 Series CPAP / Auto CPAP	aeomed-as100-series	f	\N	2	3	\N	\N	Compact sleep apnea solution with 5-year data storage.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.206+00	2026-04-09 04:28:09.206+00	\N	\N
12	Heyer HK-100II Infusion Pump	heyer-hk-100ii-infusion	f	\N	2	2	\N	\N	Accurate and safe infusion with anti-bolus protection.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.238+00	2026-04-09 04:28:09.238+00	\N	\N
13	Heyer HK-400III Syringe Pump	heyer-hk-400iii-syringe	f	\N	2	2	\N	\N	Lightweight syringe pump identifying sizes from 2ml to 60ml.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.274+00	2026-04-09 04:28:09.274+00	\N	\N
14	BN300 LED Phototherapy Unit	bng-bn300-phototherapy	f	\N	3	5	\N	\N	16 Blue Super LED source for infant jaundice treatment.	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.308+00	2026-04-09 04:28:09.307+00	\N	\N
15	Bio-Chemistry Analyzer	ht-biochemistry-analyzer	f	\N	7	9	\N	\N	\N	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.341+00	2026-04-09 04:28:09.341+00	\N	\N
16	Hematology Analyzer	ht-hematology-analyzer	f	\N	7	9	\N	\N	\N	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.375+00	2026-04-09 04:28:09.375+00	\N	\N
17	Ultrasonogram (Portable/Trolley)	ht-ultrasonogram	f	\N	7	9	\N	\N	\N	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.41+00	2026-04-09 04:28:09.41+00	\N	\N
19	ICU Bed (Electric)	icu-bed-electric	f	\N	4	9	\N	\N	\N	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.465+00	2026-04-09 04:28:09.465+00	\N	\N
20	Ambulance Stretcher	ambulance-stretcher-auto	f	\N	5	9	\N	\N	\N	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.494+00	2026-04-09 04:28:09.494+00	\N	\N
21	Stretcher Trolley	stretcher-trolley-hydraulic	f	\N	5	9	\N	\N	\N	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.519+00	2026-04-09 04:28:09.519+00	\N	\N
22	Gynaecological Bed	gynaecological-bed-manual	f	\N	4	9	\N	\N	\N	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.549+00	2026-04-09 04:28:09.549+00	\N	\N
23	Wheelchair (Manual/Chrome)	manual-wheelchair	f	\N	5	9	\N	\N	\N	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-09 04:28:09.583+00	2026-04-09 04:28:09.583+00	\N	\N
18	Microscope (Binocular)	ht-microscope	f	\N	7	4	\N	\N	\N	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-15 05:58:23.756+00	2026-04-09 04:28:09.443+00	\N	\N
24	Autoclave (Vertical/Horizontal)	surgical-autoclave	t	\N	6	9	\N	\N	\N	\N	\N	\N	\N	\N	published	\N	\N	\N	2026-04-15 10:34:01.591+00	2026-04-09 04:28:09.626+00	500	200
25	Suxin Medical SX-700/700 LED Shadowless Operating Lamp	SuxinMedicalSX700700	t	SX-700/700	7	7	OT Light Double Dome 700/700	OT Light Double Dome 700/700	Suxin Medical SX-700/700 Color Dual Dome LED Shadowless Operating Lamp\nProduct Overview\nThe Suxin Medical SX-700/700 is a premium, ceiling-mounted dual-dome surgical light designed to meet the rigorous demands of modern operating theaters. Featuring a unique "lamp-flower" design, this high-performance lighting system provides exceptional shadow-free illumination, advanced color rendering, and unparalleled reliability for complex surgical procedures.\n\nEquipped with authentic, imported German Osram LEDs, the SX-700/700 ensures a stable, long-lasting light source that medical professionals can depend on.\nKey Features\n\nAdvanced Color LED Layout: Specifically engineered with red and green lights to relieve visual fatigue during lengthy procedures and provide superior clarity for precise vascular identification.\n\nPremium German Osram LEDs: Utilizes genuine, imported Osram LED beads to guarantee a highly stable light output and an extraordinary lifespan of up to 80,000 hours, significantly reducing maintenance costs.\n\nRedundant Double Control System: Features a high-tech, user-friendly central and side dual-control system. This built-in redundancy provides a 100% operational guarantee, ensuring uninterrupted lighting when it matters most.\n\nOptimal Comfort: Generates cold light with a minimal temperature rise of just 1°C at the surgeon's head area, maintaining a comfortable and safe environment for both the surgical team and the patient.\nTechnical Specifications:\n(Note: Specifications apply to both 700mm domes in the dual-head configuration)\nParameter Specification Dome Diameter 700 mm / 700 mm \nLED Beads Quantity 84 per dome\nIlluminance 40,000 - 180,000 Lux\nColor Temperature 4000 - 5700 K\nSpot Diameter 150 - 350 mm\nDepth of Irradiation 1200 mm\nColor Rendering Index (CRI)96%\nBrightness Adjustment 1 - 100% (Digital Display)\nTemperature Rise (Surgeon's Head)1°C\nLED Lifespan 80,000 hours	The Suxin Medical SX-700/700 is a dual-dome, ceiling-mounted LED shadowless surgical lamp powered by genuine German Osram LEDs. Delivering up to 180,000 Lux of adjustable illumination and an impressive 80,000-hour lifespan, it features a specialized color LED layout (red and green) to reduce visual fatigue and enhance vascular clarity. Complete with a fail-safe double control system, it provides highly reliable, premium lighting for complex operating environments.	\N	4	China	CE Mark (CE-MDR): Certified compliant with European Medical Device Regulations, ensuring the products meet rigorous health, safety, and environmental protection standards for the European Economic Area.\nISO 13485 (EN ISO 13485:2016): Certified under the international standard for quality management systems specifically for the design and manufacture of medical devices.\nISO 9001: Certified for overall quality management systems, demonstrating consistent manufacturing and strict quality control processes.\nIEC 60601-1 / EN 60601-1:2016: Fully compliant with the internationally recognized general standards for the basic safety and essential performance of medical electrical equipment.\nIEC 60601-2-41: Compliant with the specific international safety and performance standards tailored for surgical luminaires (operating lights) and luminaires for diagnosis.\nFree Sales Certificate (FSC): Approved for international export and commercial distribution.\nJiangsu Provincial FDA Approval: Fully licensed and approved by the regional Food and Drug Administration in their manufacturing jurisdiction (Jiangsu Province, China).	published			\N	2026-04-15 10:32:31.532+00	2026-04-15 06:17:33.443+00	\N	\N
30	Suxin Medical SX-II 700/700 LED Shadowless Operating Lamp	SuxinMedicalSX-II700700	f	SX-II 700/700	7	7	\N	OT Light Double Dome 700/700	\N	\N	\N	31	China	\N	published	Healing Technology — SX-II 700/700 LED Shadowless Operating Lamp	\N	\N	2026-04-15 10:35:04.696+00	2026-04-15 10:31:47.117+00	\N	\N
31	HF MED HF-L60 L84C LED shadowless operating lamp	HF-L60-L84C	f	HF-L60 L84C	7	27	\N	HF MED HF-L60 L84C LED shadowless operating lamp	Product Overview\nThe HF-L60 L84C LED is a shadowless operating lamp manufactured by SHANGHAI HUIFENG MEDICAL INSTRUMENT CO.,LTD (HFMED). It is designed as an ideal surgical light solution to meet the diverse requirements of general surgery.\nKey Features\nAdvanced Lighting Control: The lamp features precise dimming control to accommodate various lighting requests. It utilizes high-density light mixing technology to provide both high brightness and high-quality light.\nAdjustable Settings: Users can utilize 8 levels of brightness adjustment and 3 levels of color temperature adjustment (3800K to 5000K ±300K). It also features manual mechanical spot size adjustment ranging from 160mm to 200mm.\nENDO Mode: The lamp is equipped with a one-button dim light setting, specifically designed as an Endoscope Mode. This allows surgeons to quickly switch from general mode without interfering with their field of vision during tissue observation.\nSuperior Thermal Management: An original thermal management system is built in to effectively reduce the temperature of the chip core. It uses a cast high-heat-conducting aluminum alloy radiator to instantly derive heat, which effectively reduces the lamp's temperature and improves its service life.\nHygienic Design: The streamlined lamp body features a superior laminar flow design. This careful assembly increases airflow efficiency, helping to remove dust and bacteria from around the lamp.\nSterilizable Handle: The lamp includes a removable handle that can withstand high-temperature sterilization. This ensures doctors and nurses can safely and conveniently control the light's direction and depth.\n\nTechnical Specifications\nIlluminance:\t≥ 145,000 Lux < 160,000 Lux (Note: Also rated at ≥ 160,000 lux max)\nColor Temperature:\t 3800K ± 300K; 4400K ± 300K; 5000K ± 300K\nSpot Diameter\t:  160 - 200mm\nInput Power:   90VA\nNumber of LED Tubes:   60pcs + 84pcs\nLED Tube Power:   3.2V / 3W\nColor Rendering Index (Ra):   96 ≤ Ra ≤ 100\nTotal Irradiance:   ≤ 500W/m²\nIllumination Depth:   20%: Not less than 1070mm\nIllumination Depth (60%):   Not less than 560mm\nENDO Illuminance:   ≥ 10,000 Lux\nGL Illuminance:   ≥ 12,000 Lux	The HF-L60 L84C LED is a shadowless operating lamp manufactured by HFMED, designed to meet the diverse needs of general surgery.\nKey Highlights:\nHigh-Quality Lighting: Delivers an illuminance of up to roughly 160,000 Lux and features an excellent color rendering index (Ra) of 96 to 100.\nCustomizable Control: Offers 8 brightness levels, 3 color temperature settings ranging from 3800K to 5000K, and an adjustable spot diameter of 160-200mm.\nSpecialized Modes: Features a one-button "ENDO Mode" that dims the light for endoscopic procedures, allowing surgeons to observe tissue without visual interference.\nDurability & Hygiene: Built with a high-heat-conducting aluminum alloy radiator for efficient cooling, a streamlined laminar flow design to help remove bacteria and dust, and a removable handle that can be sterilized at high temperatures.	\N	32	China	CE Mark: Specifically indicated on the HF-L60 L84C LED product document.\n\nISO 9001 & ISO 13485: Certified for general and medical device quality management systems.\n\nFDA: Certified to meet United States Food and Drug Administration standards.\n\nSGS: Verified and inspected for product quality and safety compliance.\n\nMDR / MDA: Compliant with international Medical Device Regulations.\n\nCredit Rating: Recognized locally in Shanghai as a Quality Credit A-level enterprise for medical device manufacturing.	published	Healing Technology — HF MED HF-L60 L84C LED shadowless operating lamp	\N	\N	2026-04-15 10:59:27.228+00	2026-04-15 10:54:14.981+00	\N	\N
\.


--
-- Data for Name: products_applications; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_applications (_order, _parent_id, id, department) FROM stdin;
1	25	69df2e65b960ec5fbf6307a1	Major Operating Theaters (OTs)
2	25	69df2ebab960ec5fbf6307a3	Cardiothoracic & Neurosurgery
3	25	69df2ebfb960ec5fbf6307a4	Orthopedic Surgery
4	25	69df2ec8b960ec5fbf6307a5	Plastic & Reconstructive Surgery
5	25	69df2ed1b960ec5fbf6307a6	Emergency & Trauma Centers
6	25	69df2edbb960ec5fbf6307a7	Ambulatory Surgical Centers (ASCs)
7	25	69df2ee5b960ec5fbf6307a8	Advanced Veterinary Hospitals
\.


--
-- Data for Name: products_download_items; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_download_items (_order, _parent_id, id, title, type, file_id, external_url) FROM stdin;
1	31	69df6df2e9e9f373bb369927	HF MED HF-L60 L84C LED shadowless operating lamp	brochure	33	\N
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
1	25	69df33c9b960ec5fbf6307ab	7	\N
2	25	69df33bfb960ec5fbf6307aa	6	\N
3	25	69df338fb960ec5fbf6307a9	5	\N
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
22	1	25	relatedProducts	1
\.


--
-- Data for Name: products_spec_groups; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_spec_groups (_order, _parent_id, id, group_title) FROM stdin;
1	1	69d72ad886da9424464137fb	Technical Specs
\.


--
-- Data for Name: products_spec_groups_rows; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.products_spec_groups_rows (_order, _parent_id, id, label, value) FROM stdin;
1	69d72ad886da9424464137fb	69d72ad886da9424464137f8	Illuminance	50,000-160,000 Lux
2	69d72ad886da9424464137fb	69d72ad886da9424464137f9	LED Bulbs	84 pcs
3	69d72ad886da9424464137fb	69d72ad886da9424464137fa	Service Life	≥60,000 Hours
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
1	2026-04-11 09:23:52.53+00	2026-04-09 04:20:32.694+00	dibbodutta06@gmail.com	\N	\N	421dfdd008249f8a2ac9c114fae7586b57cd19e63d90df6f7a89467f97030b3e	ba33091b59304726a6d9496098f3debe002b61f5ec6d9713f7798848e373f54008053cad4f002a8781dda9818c1da53baad35bcb0b1a562decaaccab99ae6903b6861430a54dea5e3f695fd300d91dfa2f976707562f3a952204b72bb2aa2ec639abaf36788fa00405bb5e2df3fe63b05dda7bceab434ae85ba1ebaf73895071916dce2e80d0a3b9ada007754288dd9cc5cda51b982de18f7ee026d9b3fb7e2e4d1fab286b1bfdec92e7bcd9e19b879054a34eed0d5238a4d361bcc4149f4c5a14f948db1a4d9ee1e8df2c78d50c45bedc5ba2a487bf85f40b3f01c61600424d192ab56119f0b40017589ffb72e1b852467f426d0bdf20510ef90ceb0665a3eab012a65b05b6a2edfabeb42b83af412d62bb3d12a58b92762dbc2052eaf33559a62ea576a0394889ebd68873ece682b816274b2f0c4f97241f3f15d67bc70d43116af6640145de1385d24efa50e4223b338a5145cbad96d0674e18feb98a1bcab382b164cdfa3ca13a914afee0348b0c69c49ad619c760edf062ed81b5297a6d60767c410349c300c6dffc548d93d0b2485657a41193cd02ce8898f6344e022eedaf599b888caa99446886fa7d0a333907e245c9ee4f4885c217405ac69df913b66b34d262d151445491f01de3a2f5b18880c212c9597284b80555b88f5e92b6abdd7901c27cbb86cee2e8e82446e23d33e9aed387980b09a33012851d6c2e33	0	\N
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: healingtech
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	1	54471abd-9a8c-4749-a46a-fa252ab79ef1	2026-04-15 05:56:56.38+00	2026-04-15 11:54:02.826+00
\.


--
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.brands_id_seq', 27, true);


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

SELECT pg_catalog.setval('public.media_id_seq', 34, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.orders_id_seq', 10, true);


--
-- Name: partner_logos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.partner_logos_id_seq', 1, false);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_kv_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 78, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 156, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 15, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 58, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.products_id_seq', 31, true);


--
-- Name: products_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: healingtech
--

SELECT pg_catalog.setval('public.products_rels_id_seq', 22, true);


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

\unrestrict UgF1QKIVaTmtwN7tfY3KktNE8nLtwXHZotAdqa177LmX15JnpLGhEILcQkREYQ1

