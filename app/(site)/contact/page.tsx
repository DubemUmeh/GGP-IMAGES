import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export const metadata: Metadata = buildMetadata({ title: "Contact GGP Images | Request a Printing Quote", description: "Contact GGP Images for printing, branding, packaging, signage, apparel, and marketing material quotes.", path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="relative z-20 -mt-10 py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
