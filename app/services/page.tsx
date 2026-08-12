import { ServicesHero } from "@/components/services/services-hero";
import { ServicesGrid } from "@/components/services/services-grid";
import { QuoteCtaSection } from "@/components/services/quote-cta-section";

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
