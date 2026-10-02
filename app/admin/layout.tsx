import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Admin | GGP Images",
  description: "GGP Images administration portal.",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
