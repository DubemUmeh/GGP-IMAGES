import type { Metadata } from "next";
import { buildMetadata, JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { coreServices } from "@/lib/services";
import { HeroSection } from "@/components/home/hero-section";
import { CoreValues } from "@/components/home/core-values";
import { ServiceHighlights } from "@/components/home/service-highlight";
import { WorkProcess } from "@/components/home/work-process";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FeaturedProjectsGallery } from "@/components/home/featured-project-gallery";
import { FinalQuoteCta } from "@/components/home/final-quote-cta";

export const metadata: Metadata = buildMetadata({
  title: "Printing, Branding & Design in Takoradi | GGP Images",
  description:
    "GGP Images provides commercial printing, textile printing, embroidery, large format printing, branding, and visual production in Takoradi and across Ghana.",
  path: "/",
  keywords: ["printing in Takoradi", "printing services in Ghana", "branding in Takoradi", "graphic design Takoradi"],
});

export default function HomePage() {
  const crumbs = [{ name: "Home", path: "/" }];

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          ...coreServices.map((service) =>
            serviceSchema({
              name: service.name,
              description: service.description,
              image: service.image,
              path: `/services/${service.slug}`,
            }),
          ),
        ]}
      />
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
