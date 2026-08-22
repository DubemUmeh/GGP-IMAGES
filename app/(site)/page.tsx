import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/hero-section";
import { CoreValues } from "@/components/home/core-values";
import { ServiceHighlights } from "@/components/home/service-highlight";
import { WorkProcess } from "@/components/home/work-process";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FeaturedProjectsGallery } from "@/components/home/featured-project-gallery";
import { FinalQuoteCta } from "@/components/home/final-quote-cta";

export const metadata: Metadata = buildMetadata({ title: "Printing and Branding in Takoradi | GGP Images", description: "Premium printing, branding, packaging, signage, apparel, and marketing materials from GGP Images in Takoradi.", path: "/" });

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="grow">
        <HeroSection />
        <CoreValues />
        <ServiceHighlights />
        <FeaturedProjectsGallery />
        <WorkProcess />
        <WhyChooseUs />
        <FinalQuoteCta />
      </main>
    </div>
  );
}
