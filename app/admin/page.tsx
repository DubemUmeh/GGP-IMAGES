import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/admin/auth";
import { LoginPanel } from "@/components/admin/login-panel";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const admin = await currentAdmin();
  if (admin) redirect("/admin/dashboard");

  const { error } = await searchParams;
  return <LoginPanel error={error} />;
}
