import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Request a Printing & Branding Quote | GGP Images",
  description:
    "Submit your printing, branding, apparel, signage, or visual production requirements to GGP Images in Takoradi.",
  path: "/booking",
});

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
