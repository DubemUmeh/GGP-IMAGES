/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, @next/next/no-img-element */
import { NextResponse } from "next/server";
import { query } from "@/lib/admin/db";
import { optimizedImage, optimizedVideo, poster } from "@/lib/admin/cloudinary";
export async function GET() {
  try {
    const r = await query<any>(
      "select id,title,description,type,cloudinary_public_id,width,height,alt_text,sort_order from gallery_items where is_published=true order by sort_order, created_at desc",
    );
    return NextResponse.json({
      items: r.rows.map((x: any) => ({
        id: x.id,
        title: x.title,
        description: x.description,
        type: x.type,
        width: x.width,
        height: x.height,
        altText: x.alt_text,
        url:
          x.type === "IMAGE"
            ? optimizedImage(x.cloudinary_public_id)
            : optimizedVideo(x.cloudinary_public_id),
        posterUrl:
          x.type === "VIDEO" ? poster(x.cloudinary_public_id) : undefined,
      })),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ items: [] });
  }
}
