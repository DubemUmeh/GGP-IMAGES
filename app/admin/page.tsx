import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/admin/auth";
import { LoginPanel } from "@/components/admin/login-panel";

export default async function AdminPage() {
  const admin = await currentAdmin();

  if (admin) redirect("/admin/dashboard");

  return <LoginPanel />;
}