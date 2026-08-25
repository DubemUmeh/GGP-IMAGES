/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const admins = pgTable(
  "admins",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    googleId: text("google_id").unique(),
    email: text("email").notNull().unique(),
    name: text("name"),
    avatarUrl: text("avatar_url"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  },
  (table: any) => ({
    googleIdx: uniqueIndex("idx_admins_google_id").on(table.googleId),
    emailIdx: uniqueIndex("idx_admins_email").on(table.email),
    activeIdx: index("idx_admins_active").on(table.isActive),
  }),
);

export const adminSessions = pgTable("admin_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminId: uuid("admin_id")
    .notNull()
    .references(() => admins.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const galleryItems = pgTable(
  "gallery_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    type: text("type").notNull(),
    cloudinaryPublicId: text("cloudinary_public_id").notNull().unique(),
    cloudinaryResourceType: text("cloudinary_resource_type").notNull(),
    cloudinaryUrl: text("cloudinary_url").notNull(),
    width: integer("width"),
    height: integer("height"),
    duration: numeric("duration"),
    format: text("format"),
    bytes: integer("bytes"),
    altText: text("alt_text"),
    sortOrder: integer("sort_order").notNull().default(0),
    isPublished: boolean("is_published").notNull().default(false),
    createdBy: uuid("created_by").references(() => admins.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table: any) => ({
    publishedSortIdx: index("idx_gallery_published_sort").on(
      table.isPublished,
      table.sortOrder,
      table.createdAt,
    ),
  }),
);

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone").notNull(),
    services: jsonb("services").$type<string[]>().notNull(),
    service: text("service"),
    subdivision: text("subdivision"),
    project: text("project").notNull(),
    quantity: text("quantity"),
    description: text("description"),
    preferredDate: text("preferred_date"),
    preferredTime: text("preferred_time"),
    designUrls: jsonb("design_urls").$type<string[]>().notNull().default([]),
    status: text("status").notNull().default("new"),
    adminNotes: text("admin_notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table: any) => ({
    statusCreatedIdx: index("idx_bookings_status_created").on(
      table.status,
      table.createdAt,
    ),
    emailIdx: index("idx_bookings_email").on(table.customerEmail),
  }),
);