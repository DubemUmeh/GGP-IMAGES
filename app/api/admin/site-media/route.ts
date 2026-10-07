import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError, requireAdmin } from "@/lib/admin/auth";
import { uploadToCloudinary } from "@/lib/admin/cloudinary";
import { query, transaction } from "@/lib/admin/db";
import { getMediaSlot, getSiteMedia, getSiteMediaHistory } from "@/lib/site-media";

const uploadSchema = z.object({
  slotKey: z.string().min(1),
  altText: z.string().trim().max(300).optional(),
});

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const key = new URL(request.url).searchParams.get("slotKey");
    if (!key) return NextResponse.json({ message: "slotKey is required" }, { status: 400 });
    if (!getMediaSlot(key)) return NextResponse.json({ message: "Unknown media slot" }, { status: 404 });
    return NextResponse.json({ history: await getSiteMediaHistory(key) });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const form = await request.formData();
    const parsed = uploadSchema.safeParse({
      slotKey: form.get("slotKey"),
      altText: form.get("altText") || undefined,
    });

    if (!parsed.success) return NextResponse.json({ message: "Invalid input" }, { status: 400 });

    const slot = getMediaSlot(parsed.data.slotKey);
    if (!slot) return NextResponse.json({ message: "Unknown media slot" }, { status: 404 });

    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ message: "A media file is required" }, { status: 400 });

    const uploaded = await uploadToCloudinary(file, "GGP-IMAGES/site-media/" + parsed.data.slotKey);

    const result = await transaction(async (tx) => {
      await tx.query(
        "update site_media_versions set is_current=false where slot_key=$1 and is_current=true",
        [parsed.data.slotKey],
      );

      const inserted = await tx.query<{ id: string }>(
        "insert into site_media_versions (slot_key,type,cloudinary_public_id,cloudinary_resource_type,cloudinary_url,alt_text,width,height,duration,format,bytes,created_by,is_current) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,true) returning id",
        [
          parsed.data.slotKey,
          uploaded.type.toLowerCase(),
          uploaded.publicId,
          uploaded.resourceType,
          uploaded.secureUrl,
          parsed.data.altText ?? slot.defaultAlt,
          uploaded.width ?? null,
          uploaded.height ?? null,
          uploaded.duration ?? null,
          uploaded.format ?? null,
          uploaded.bytes ?? null,
          admin.id,
        ],
      );

      return inserted.rows[0];
    });

    return NextResponse.json({ id: result.id, media: await getSiteMedia(parsed.data.slotKey) });
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const versionId = z.string().uuid().safeParse(body.versionId);

    if (!versionId.success) return NextResponse.json({ message: "Invalid versionId" }, { status: 400 });

    const current = await query<{ id: string; slot_key: string }>(
      "select id,slot_key from site_media_versions where id=$1 limit 1",
      [versionId.data],
    );
    const version = current.rows[0];

    if (!version || !getMediaSlot(version.slot_key)) {
      return NextResponse.json({ message: "Media version not found" }, { status: 404 });
    }

    if (body.restore === true) {
      await transaction(async (tx) => {
        await tx.query("update site_media_versions set is_current=false where slot_key=$1", [version.slot_key]);
        await tx.query("update site_media_versions set is_current=true where id=$1", [version.id]);
      });
    } else if (typeof body.altText === "string") {
      const altText = z.string().trim().max(300).parse(body.altText);
      await query(
        "update site_media_versions set alt_text=$1 where id=$2 and is_current=true",
        [altText, version.id],
      );
    } else {
      return NextResponse.json({ message: "Nothing to update" }, { status: 400 });
    }

    return NextResponse.json({ media: await getSiteMedia(version.slot_key) });
  } catch (error) {
    return apiError(error);
  }
}
