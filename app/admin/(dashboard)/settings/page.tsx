import { query } from "@/lib/admin/db";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminSettingsManager, Admin } from "@/components/admin/admin-settings-manager";

export default async function AdminSettingsPage() {
  await requireAdmin();

  const [settingsRes, adminsRes] = await Promise.all([
    query<{ value: unknown }>("select value from site_settings where key='general'"),
    query<Admin>(
      "select id,email,name,avatar_url,is_active,last_login_at,created_at from admins order by created_at desc",
    ),
  ]);

  const raw = settingsRes.rows[0]?.value;
  const initialSettings =
    (typeof raw === "string" ? JSON.parse(raw) : raw) ?? {};

  return (
    <AdminSettingsManager
      initialSettings={initialSettings}
      initialAdmins={adminsRes.rows}
    />
  );
}