import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ggpimages.com"),
  title: { default: "GGP Images", template: "%s | GGP Images" },
  description: "Professional printing, branding, packaging, signage, apparel, and marketing materials from GGP Images.",
  icons: { icon: "/favicon_io/favicon.ico", apple: "/favicon_io/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
