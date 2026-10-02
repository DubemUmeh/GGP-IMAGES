import type { Metadata } from "next";
import { Navbar } from "@/components/shared/site-navbar";
import { SiteFooter } from "@/components/shared/site-footer";
import { WhatsAppFab } from "@/components/shared/whatsapp-fab";

export const metadata: Metadata = {
  title: { default: "GGP Images | Printing & Branding in Takoradi", template: "%s | GGP Images" },
  description:
    "Professional printing, branding, packaging, signage, apparel, embroidery, and visual production from GGP Images in Takoradi, Ghana.",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <WhatsAppFab />
      <SiteFooter />
    </>
  );
}
