# Payload CMS Migration Troubleshooting on VPS

This document explains the root cause of the "500 Server Error" and "Page couldn't load" issue encountered on the production `/admin` panel after upgrading Payload CMS to `3.83.0`, and details the manual PostgreSQL fix that was applied.

## The Issue

After upgrading Payload CMS and deploying to the VPS, the site homepage loaded correctly, but attempting to access the `/admin` panel resulted in a crash with the following message on the screen:

> ⚠️ This page couldn't load. A server error occurred. Reload to try again.

### Error Logs

Checking the server logs (`app.log`) revealed the following PostgreSQL errors:

```
[cause]: error: relation "client_logos" does not exist (Error code 42P01)
```

And subsequently, after fixing the above:

```
[cause]: error: column payload_locked_documents__rels.client_logos_id does not exist (Error code 42703)
```

## Root Cause

1. **Missing Database Table**: A new collection (`client-logos`) was added to the `payload.config.ts` codebase. While this works perfectly on the local development environment (where Payload can auto-migrate), the production VPS database never received the instruction to create the physical `client_logos` table.
2. **Migration Tool Failure**: Payload CMS includes a CLI command to run migrations (`npx payload migrate`). However, because the production configuration uses ESM imports with "top-level await", running the CLI directly on the VPS crashed with `ERR_REQUIRE_ASYNC_MODULE`.
3. **Admin Panel Crash**: In Payload `3.83.0`, the admin UI makes eager relational queries when calculating locked documents and user preferences. Because the `client_logos` table was entirely missing, these internal Payload queries crashed instantly, taking the entire admin panel down with it.

## The Fix: Manual PostgreSQL Queries

Because the automated migration tools failed due to ESM configuration limits on the VPS, we bypassed Payload's ORM and manually wrote native SQL queries directly to the PostgreSQL database. **This did not change the database engine—it is still 100% PostgreSQL.** We simply "spoke" directly to the database.

The following SQL was executed to recreate what Payload *would* have done automatically:

### 1. Creating the Missing Table

We created the `client_logos` table mimicking the exact schema Payload generated for the identical `partner_logos` table:

```sql
-- 1. Create the sequence for auto-incrementing IDs
CREATE SEQUENCE IF NOT EXISTS client_logos_id_seq;

-- 2. Create the main table with correct foreign key to media
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

-- 3. Link sequence ownership
ALTER SEQUENCE client_logos_id_seq OWNED BY client_logos.id;

-- 4. Create performance indexes
CREATE INDEX IF NOT EXISTS client_logos_created_at_idx ON client_logos(created_at);
CREATE INDEX IF NOT EXISTS client_logos_logo_idx ON client_logos(logo_id);
CREATE INDEX IF NOT EXISTS client_logos_updated_at_idx ON client_logos(updated_at);
```

### 2. Updating Payload Internal Relation Tables

Because Payload tracks document locks and user preferences globally, it dynamically links them to every collection. We had to manually add the missing foreign key column for the new `client_logos` table to Payload's internal `_rels` tables.

```sql
-- 1. Add the column
ALTER TABLE payload_locked_documents_rels ADD COLUMN client_logos_id integer;

-- 2. Add foreign key constraint
ALTER TABLE payload_locked_documents_rels 
  ADD CONSTRAINT payload_locked_documents_rels_client_logos_fk 
  FOREIGN KEY (client_logos_id) REFERENCES client_logos(id) ON DELETE CASCADE;

-- 3. Add index
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_client_logos_id_idx 
  ON payload_locked_documents_rels (client_logos_id);
```

## Summary for Future Reference

If you create a **brand new collection** in `payload.config.ts` and push to production, you must ensure the production database creates the corresponding table. 

If the server crashes immediately after deployment with a `relation does not exist` or `errorMissingColumn` error:
1. Verify the table exists in PostgreSQL (`\dt` command).
2. If the `npx payload migrate` script fails due to ESM errors, you will need to manually execute the `CREATE TABLE` and `ALTER TABLE payload_locked_documents_rels ADD COLUMN...` SQL commands on the production database.
3. **Always restart the Next.js/Payload server** (`setsid node server.js`) after altering the database schema manually, as Payload aggressively caches database schema definitions in memory.
