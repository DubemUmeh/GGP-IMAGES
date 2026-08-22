import { query } from "@/lib/admin/db";
import { requirePermission } from "@/lib/admin/auth";
import { AdminGalleryManager, Item } from "@/components/admin/admin-gallery-manager";

export default async function AdminGalleryPage() {
  await requirePermission("GALLERY_VIEW");
  const r = await query(
    "select * from gallery_items order by sort_order, created_at desc",
  );
  return <AdminGalleryManager initialItems={r.rows as unknown as Item[]} />;
}