import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

import { VideoGallery } from "@/components/gallery/gallery-grid";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { CtaBanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = buildMetadata({ title: "Printing Gallery | GGP Images", description: "See print, branding, signage, apparel, and production work examples from GGP Images.", path: "/gallery" });

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <VideoGallery />
      <div className="w-full h-full bg-popover">
        <CtaBanner
          title="Ready to bring your brand to life?"
          description="Let's create something remarkable together. Get a custom quote for your next big project."
          href="/contact"
        />
      </div>
    </>
  );
}
