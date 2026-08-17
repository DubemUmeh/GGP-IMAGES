import { AdminShell } from '@/components/admin/admin-shell'; import { AdminSettingsManager } from '@/components/admin/admin-settings-manager';
export default function AdminSettingsPage(){ return <AdminShell><h1 className="mb-6 text-3xl font-bold">Settings</h1><AdminSettingsManager/></AdminShell>; }
