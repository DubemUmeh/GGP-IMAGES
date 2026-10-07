CREATE TABLE "site_media_versions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slot_key" text NOT NULL,
  "type" text NOT NULL,
  "cloudinary_public_id" text NOT NULL UNIQUE,
  "cloudinary_resource_type" text NOT NULL,
  "cloudinary_url" text NOT NULL,
  "alt_text" text,
  "width" integer,
  "height" integer,
  "duration" numeric,
  "format" text,
  "bytes" integer,
  "created_by" uuid REFERENCES "admins"("id") ON DELETE SET NULL,
  "is_current" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX "idx_site_media_versions_slot_created"
  ON "site_media_versions" ("slot_key", "created_at" DESC);

CREATE UNIQUE INDEX "idx_site_media_versions_current"
  ON "site_media_versions" ("slot_key")
  WHERE "is_current" = true;
