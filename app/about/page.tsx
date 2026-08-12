import { AboutHero } from "@/components/about/about-hero";
import { CompanyStory } from "@/components/about/company-story";
import { Philosophy } from "@/components/about/philosophy";
import { WhyChooseUs } from "@/components/about/why-choose-us";
import { Team } from "@/components/about/team";
import { CtaBanner } from "@/components/shared/cta-banner";

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
