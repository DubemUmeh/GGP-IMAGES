import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/site-navbar";
import { SiteFooter } from "@/components/shared/site-footer";
import { WhatsAppFab } from "@/components/shared/whatsapp-fab";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ggpimages.com"),
  title: { default: "GGP Images", template: "%s | GGP Images" },
  description: "Professional printing, branding, packaging, signage, apparel, and marketing materials from GGP Images.",
  icons: { icon: "/favicon_io/favicon.ico", apple: "/favicon_io/apple-touch-icon.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <WhatsAppFab />
        <SiteFooter />
      </body>
    </html>
  );
}
