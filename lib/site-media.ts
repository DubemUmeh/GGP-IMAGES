import "server-only";

import { coreServices } from "@/lib/services";
import { optimizedImage, optimizedVideo, poster } from "@/lib/admin/cloudinary";
import { query } from "@/lib/admin/db";

export type SiteMediaType = "image" | "video";

export type MediaSlot = {
  key: string;
  page: string;
  section: string;
  label: string;
  description: string;
  defaultUrl: string;
  defaultAlt: string;
};

export type ResolvedSiteMedia = {
  key: string;
  url: string;
  type: SiteMediaType;
  altText: string;
  publicId?: string;
  resourceType?: string;
  posterUrl?: string;
  width?: number;
  height?: number;
  duration?: number;
  isDefault: boolean;
  versionId?: string;
};

export const MEDIA_SLOTS: MediaSlot[] = [
  {
    key: "services.hero",
    page: "Services",
    section: "Hero",
    label: "Services Page Hero",
    description: "Main visual displayed behind the hero content on the Services page.",
    defaultUrl: "/hero-image.webp",
    defaultAlt: "Composition of premium printed materials",
  },
  ...coreServices.map((service) => ({
    key: `services.${service.slug}.hero`,
    page: "Services",
    section: service.name,
    label: `${service.name} Hero`,
    description: `Main visual displayed on the ${service.name} service page and service card.`,
    defaultUrl: service.image,
    defaultAlt: service.name,
  })),
];

export function getMediaSlot(key: string) {
  return MEDIA_SLOTS.find((slot) => slot.key === key);
}

type MediaRow = {
  id: string;
  slot_key: string;
  type: string;
  cloudinary_public_id: string;
  cloudinary_resource_type: string;
  cloudinary_url: string;
  alt_text: string | null;
  width: number | null;
  height: number | null;
  duration: string | number | null;
};

function rowToMedia(row: MediaRow): ResolvedSiteMedia {
  const type = row.type.toLowerCase() as SiteMediaType;
  return {
    key: row.slot_key,
    url: type === "video"
      ? optimizedVideo(row.cloudinary_public_id)
      : optimizedImage(row.cloudinary_public_id),
    type,
    altText: row.alt_text ?? getMediaSlot(row.slot_key)?.defaultAlt ?? "",
    publicId: row.cloudinary_public_id,
    resourceType: row.cloudinary_resource_type,
    posterUrl: type === "video" ? poster(row.cloudinary_public_id) : undefined,
    width: row.width ?? undefined,
    height: row.height ?? undefined,
    duration: row.duration ? Number(row.duration) : undefined,
    isDefault: false,
    versionId: row.id,
  };
}

export async function getSiteMedia(key: string): Promise<ResolvedSiteMedia> {
  const slot = getMediaSlot(key);
  if (!slot) throw new Error(`Unknown media slot: ${key}`);

  try {
    const result = await query<MediaRow>(
      "select id,slot_key,type,cloudinary_public_id,cloudinary_resource_type,cloudinary_url,alt_text,width,height,duration from site_media_versions where slot_key=$1 and is_current=true limit 1",
      [key],
    );

    const current = result.rows[0];
    if (current) return rowToMedia(current);
  } catch (error) {
    console.error("Unable to resolve managed site media; using default.", error);
  }

  return {
    key: slot.key,
    url: slot.defaultUrl,
    type: "image",
    altText: slot.defaultAlt,
    isDefault: true,
  };
}

export async function getSiteMediaSlots() {
  const result = await query<MediaRow>(
    "select id,slot_key,type,cloudinary_public_id,cloudinary_resource_type,cloudinary_url,alt_text,width,height,duration from site_media_versions where is_current=true",
  );

  const current = new Map(result.rows.map((row) => [row.slot_key, rowToMedia(row)]));

  return MEDIA_SLOTS.map((slot) => ({
    ...slot,
    media: current.get(slot.key) ?? {
      key: slot.key,
      url: slot.defaultUrl,
      type: "image" as const,
      altText: slot.defaultAlt,
      isDefault: true,
    },
  }));
}

export async function getSiteMediaHistory(key: string) {
  const result = await query<MediaRow & { created_at: string; created_by: string | null }>(
    "select id,slot_key,type,cloudinary_public_id,cloudinary_resource_type,cloudinary_url,alt_text,width,height,duration,created_at,created_by from site_media_versions where slot_key=$1 order by created_at desc",
    [key],
  );

  return result.rows.map((row) => ({
    ...rowToMedia(row),
    createdAt: row.created_at,
    createdBy: row.created_by,
  }));
}

export function getMediaPreviewUrl(media: ResolvedSiteMedia) {
  return media.type === "video" ? media.posterUrl ?? media.url : media.url;
}
