CREATE SEQUENCE IF NOT EXISTS client_logos_id_seq;

CREATE TABLE IF NOT EXISTS client_logos (
  id integer NOT NULL DEFAULT nextval('client_logos_id_seq'),
  name character varying NOT NULL,
  logo_id integer NOT NULL,
  website character varying,
  sort_order numeric DEFAULT 0,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT client_logos_pkey PRIMARY KEY (id),
  CONSTRAINT client_logos_logo_id_media_id_fk FOREIGN KEY (logo_id) REFERENCES media(id) ON DELETE SET NULL
);

ALTER SEQUENCE client_logos_id_seq OWNED BY client_logos.id;

CREATE INDEX IF NOT EXISTS client_logos_created_at_idx ON client_logos(created_at);
CREATE INDEX IF NOT EXISTS client_logos_logo_idx ON client_logos(logo_id);
CREATE INDEX IF NOT EXISTS client_logos_updated_at_idx ON client_logos(updated_at);
