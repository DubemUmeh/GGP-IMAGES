import { z } from "zod";
import { PERMISSIONS } from "./types";

export const emailSchema = z
  .email()
  .max(254)
  .transform((v) => v.toLowerCase());
export const galleryMetaSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(1000).optional().nullable().default(null),
  altText: z.string().trim().max(200).optional().nullable().default(null),
  sortOrder: z.coerce.number().int().min(0).max(100000).default(0),
  isPublished: z
    .union([z.literal("true"), z.literal("on"), z.boolean()])
    .optional()
    .transform((v) => v === "true" || v === "on" || v === true)
    .default(false),
});

export const galleryPatchSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  description: z.string().trim().max(1000).optional(),
  altText: z.string().trim().max(200).optional(),
  sortOrder: z.coerce.number().int().min(0).max(100000).optional(),
  isPublished: z
    .union([z.literal("true"), z.literal("on"), z.boolean()])
    .transform((v) => v === "true" || v === "on" || v === true)
    .optional(),
});

export const adminCreateSchema = z.object({
  email: emailSchema,
  name: z.string().trim().max(120).optional(),
  roleId: z.uuid(),
});

export const adminPatchSchema = z.object({
  name: z.string().trim().max(120).optional(),
  roleId: z.uuid().optional(),
  isActive: z.boolean().optional(),
});

export const roleSchema = z.object({
  name: z.string().trim().min(2).max(60),
  description: z.string().trim().max(240).optional().nullable(),
  isSuperAdmin: z.boolean().default(false),
  permissions: z.array(z.enum(PERMISSIONS)).default([]),
});

export const settingsSchema = z.object({
  companyName: z.string().trim().min(1).max(120),
  companyDescription: z.string().trim().max(400),
  phone: z.string().trim().max(40),
  email: emailSchema,
  address: z.string().trim().max(240),
  instagram: z.url().optional().or(z.literal("")),
  facebook: z.url().optional().or(z.literal("")),
  tiktok: z.url().optional().or(z.literal("")),
});

export const bookingStatusSchema = z.object({
  status: z.enum(["new", "contacted", "confirmed", "cancelled"]),
});
