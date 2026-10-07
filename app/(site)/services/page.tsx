import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getMediaPreviewUrl, getSiteMedia } from "@/lib/site-media";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesGrid } from "@/components/services/services-grid";
import { QuoteCtaSection } from "@/components/services/quote-cta-section";

export async function generateMetadata(): Promise<Metadata> {
  const media = await getSiteMedia("services.hero");

  return buildMetadata({
    title: "Core Services | GGP Images",
    description:
      "Explore Digital Printing, Textile Printing, Embroidery, Large Format Printing, Branding, and Visual Production from GGP Images.",
    path: "/services",
    ogImage: getMediaPreviewUrl(media),
  });
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <div className="w-full h-full bg-popover">
        <ServicesGrid />
      </div>
      <div className="w-full h-full bg-inherit">
        <QuoteCtaSection />
      </div>
    </>
  );
}
