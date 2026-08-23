import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { query } from "@/lib/admin/db";
import { GalleryEditForm } from "@/components/admin/gallery-edit-form";

type GalleryRow = {
  id: string;
  title: string;
  description: string | null;
  alt_text: string | null;
  sort_order: number;
  is_published: boolean;
  type: string;
  cloudinary_url: string;
};

export default async function GalleryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const r = await query<GalleryRow>(
    "select id,title,description,alt_text,sort_order,is_published,type,cloudinary_url from gallery_items where id=$1",
    [id],
  );

  const item = r.rows[0];
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Edit gallery item
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Update details or replace the media file below.
        </p>
      </div>
      <GalleryEditForm item={item} />
    </div>
  );
}