import { AdminShell } from '@/components/admin/admin-shell'; import { AdminGalleryManager } from '@/components/admin/admin-gallery-manager';
export default function AdminGalleryPage(){ return <AdminShell><h1 className="mb-6 text-3xl font-bold">Gallery</h1><AdminGalleryManager/></AdminShell>; }
