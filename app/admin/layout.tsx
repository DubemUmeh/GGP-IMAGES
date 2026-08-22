import type { Metadata } from "next";
import "../globals.css";
import { AdminShell } from "@/components/admin/admin-shell";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ggpimages.com"),
  title: `Admin | GGP Images`,
  description: "Professional Admin portal for printing, branding, packaging, signage, apparel, and marketing materials from GGP Images.",
  icons: { icon: "/favicon_io/favicon.ico", apple: "/favicon_io/apple-touch-icon.png" },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen w-full">
        <Toaster />
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}