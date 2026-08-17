import { z } from 'zod';
import { PERMISSIONS } from './types';
export const emailSchema=z.string().email().max(254).transform(v=>v.toLowerCase());
export const galleryMetaSchema=z.object({title:z.string().trim().min(1).max(120),description:z.string().trim().max(1000).optional().nullable(),altText:z.string().trim().max(200).optional().nullable(),sortOrder:z.coerce.number().int().min(0).max(100000).default(0),isPublished:z.coerce.boolean().default(false)});
export const adminCreateSchema=z.object({email:emailSchema,name:z.string().trim().max(120).optional(),roleId:z.string().uuid()});
export const adminPatchSchema=z.object({name:z.string().trim().max(120).optional(),roleId:z.string().uuid().optional(),isActive:z.boolean().optional()});
export const roleSchema=z.object({name:z.string().trim().min(2).max(60),description:z.string().trim().max(240).optional().nullable(),isSuperAdmin:z.boolean().default(false),permissions:z.array(z.enum(PERMISSIONS)).default([])});
export const settingsSchema=z.object({companyName:z.string().trim().min(1).max(120),companyDescription:z.string().trim().max(400),phone:z.string().trim().max(40),email:emailSchema,address:z.string().trim().max(240),instagram:z.string().url().optional().or(z.literal('')),facebook:z.string().url().optional().or(z.literal('')),tiktok:z.string().url().optional().or(z.literal(''))});
