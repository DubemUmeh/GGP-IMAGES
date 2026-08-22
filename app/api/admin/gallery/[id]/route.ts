/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { apiError, requirePermission } from "@/lib/admin/auth";
import { query } from "@/lib/admin/db";
import { galleryPatchSchema } from "@/lib/admin/validators";
import { destroyCloudinary, uploadToCloudinary } from "@/lib/admin/cloudinary";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requirePermission("GALLERY_VIEW");
    const { id } = await params;
    const r = await query<any>("select * from gallery_items where id=$1", [id]);
    if (!r.rows[0])
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ item: r.rows[0] });
  } catch (e) {
    return apiError(e);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requirePermission("GALLERY_EDIT");
    const { id } = await params;

    const contentType = req.headers.get("content-type") || "";
    let file: File | null = null;
    let rawMeta: Record<string, unknown>;

    if (contentType.includes("application/json")) {
      rawMeta = await req.json();
    } else {
      const form = await req.formData();
      const f = form.get("file");
      if (f instanceof File && f.size > 0) file = f;
      rawMeta = Object.fromEntries(form);
    }

    const meta = galleryPatchSchema.parse(rawMeta);

    let up: Awaited<ReturnType<typeof uploadToCloudinary>> | null = null;

    if (file) {
      const current = await query<any>(
        "select cloudinary_public_id, cloudinary_resource_type from gallery_items where id=$1",
        [id],
      );
      if (!current.rows[0])
        return NextResponse.json({ message: "Not found" }, { status: 404 });

      up = await uploadToCloudinary(file);

      // Best-effort cleanup of the old asset — don't fail the request if this errors
      await destroyCloudinary(
        current.rows[0].cloudinary_public_id,
        current.rows[0].cloudinary_resource_type,
      ).catch((err) => {
        console.error("Failed to delete old Cloudinary asset", err);
      });
    }

    const r = await query(
      `update gallery_items set
        title=coalesce($1,title),
        description=coalesce($2,description),
        alt_text=coalesce($3,alt_text),
        sort_order=coalesce($4,sort_order),
        is_published=coalesce($5,is_published),
        type=coalesce($6,type),
        cloudinary_public_id=coalesce($7,cloudinary_public_id),
        cloudinary_resource_type=coalesce($8,cloudinary_resource_type),
        cloudinary_url=coalesce($9,cloudinary_url),
        width=coalesce($10,width),
        height=coalesce($11,height),
        duration=coalesce($12,duration),
        format=coalesce($13,format),
        bytes=coalesce($14,bytes),
        updated_at=now()
      where id=$15 returning *`,
      [
        meta.title ?? null,
        meta.description ?? null,
        meta.altText ?? null,
        meta.sortOrder ?? null,
        meta.isPublished ?? null,
        up?.type ?? null,
        up?.publicId ?? null,
        up?.resourceType ?? null,
        up?.secureUrl ?? null,
        up?.width ?? null,
        up?.height ?? null,
        up?.duration ?? null,
        up?.format ?? null,
        up?.bytes ?? null,
        id,
      ],
    );

    if (!r.rows[0])
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ item: r.rows[0] });
  } catch (e: any) {
    if (e?.status)
      return NextResponse.json({ message: e.message }, { status: e.status });
    return apiError(e);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requirePermission("GALLERY_DELETE");
    const { id } = await params;
    const found = await query<any>(
      "select cloudinary_public_id,cloudinary_resource_type from gallery_items where id=$1",
      [id],
    );

    if (!found.rows[0])
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    await destroyCloudinary(
      found.rows[0].cloudinary_public_id,
      found.rows[0].cloudinary_resource_type,
    );

    await query("delete from gallery_items where id=$1", [id]);

    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    return apiError(e);
  }
}

// /* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, @next/next/no-img-element */
// import { NextResponse } from "next/server";
// import { apiError, requirePermission } from "@/lib/admin/auth";
// import { query } from "@/lib/admin/db";
// import { galleryMetaSchema } from "@/lib/admin/validators";
// import { destroyCloudinary } from "@/lib/admin/cloudinary";

// export async function PATCH(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     await requirePermission("GALLERY_EDIT");
//     const { id } = await params;
//     const meta = galleryMetaSchema.partial().parse(await req.json());
//     const r = await query(
//       "update gallery_items set title=coalesce($1,title),description=coalesce($2,description),alt_text=coalesce($3,alt_text),sort_order=coalesce($4,sort_order),is_published=coalesce($5,is_published),updated_at=now() where id=$6 returning *",
//       [
//         meta.title ?? null,
//         meta.description ?? null,
//         meta.altText ?? null,
//         meta.sortOrder ?? null,
//         meta.isPublished ?? null,
//         id,
//       ],
//     );
//     if (!r.rows[0])
//       return NextResponse.json({ message: "Not found" }, { status: 404 });
//     return NextResponse.json({ item: r.rows[0] });
//   } catch (e) {
//     return apiError(e);
//   }
// }

// export async function DELETE(
//   _req: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     await requirePermission("GALLERY_DELETE");
//     const { id } = await params;
//     const found = await query<any>(
//       "select cloudinary_public_id,cloudinary_resource_type from gallery_items where id=$1",
//       [id],
//     );

//     if (!found.rows[0])
//       return NextResponse.json({ message: "Not found" }, { status: 404 });

//     await destroyCloudinary(
//       found.rows[0].cloudinary_public_id,
//       found.rows[0].cloudinary_resource_type,
//     );

//     await query("delete from gallery_items where id=$1", [id]);

//     return NextResponse.json({ message: "Deleted" });
//   } catch (e) {
//     return apiError(e);
//   }
// }
