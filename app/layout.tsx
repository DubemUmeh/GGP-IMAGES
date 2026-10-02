import type { Metadata } from "next";
import "./globals.css";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ggpimages.com",
  ),
  title: { default: "GGP Images | Printing & Branding in Takoradi", template: "%s | GGP Images" },
  description:
    "GGP Images provides commercial printing, branding, packaging, signage, apparel, embroidery, and visual production services in Takoradi and across Ghana.",
  icons: {
    icon: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GH" className="h-full antialiased">
      <body className="min-h-screen flex flex-col bg-popover">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
