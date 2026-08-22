import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AboutHero } from "@/components/about/about-hero";
import { CompanyStory } from "@/components/about/company-story";
import { Philosophy } from "@/components/about/philosophy";
import { WhyChooseUs } from "@/components/about/why-choose-us";
import { Team } from "@/components/about/team";
import { CtaBanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = buildMetadata({ title: "About GGP Images | Printing Team in Takoradi", description: "Learn about GGP Images, a Takoradi printing and branding partner for businesses, schools, churches, and events.", path: "/about" });

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyStory />
      <Philosophy />
      <WhyChooseUs />
      <Team />
      <div className="bg-secondary">
        <CtaBanner
          title="Ready to bring your brand to life?"
          description="Let's create something remarkable together."
          buttonLabel="Get In Touch"
          href="/contact"
        />
      </div>
    </>
  );
}
