import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesGrid } from "@/components/services/services-grid";
import { QuoteCtaSection } from "@/components/services/quote-cta-section";


export const metadata: Metadata = buildMetadata({ title: "Core Services | GGP Images", description: "Explore Digital Printing, Textile Printing, Embroidery, Large Format Printing, Branding, and Visual Production from GGP Images.", path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <div className="w-full h-full bg-brand-tertiary">
        <ServicesGrid />
      </div>
      <div className="w-full h-full bg-secondary">
        <QuoteCtaSection />
      </div>
    </>
  );
}
