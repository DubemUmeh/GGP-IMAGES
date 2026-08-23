import { query } from "@/lib/admin/db";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminGalleryManager, Item } from "@/components/admin/admin-gallery-manager";

export default async function AdminGalleryPage() {
  await requireAdmin();
  const r = await query(
    "select * from gallery_items order by sort_order, created_at desc",
  );
  return <AdminGalleryManager initialItems={r.rows as unknown as Item[]} />;
}