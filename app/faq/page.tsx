import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, buildMetadata, faqSchema, JsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

const faqs = [
  { question: "What printing services does GGP Images provide?", answer: "We provide branding, business stationery, large format printing, apparel printing, packaging, labels, invitations, certificates, promotional items, photocopying, and finishing services." },
  { question: "Can you help if I do not have print-ready artwork?", answer: "Yes. Our team can review, adjust, or design artwork so files meet size, resolution, bleed, color, and readability requirements before production." },
  { question: "How fast can you complete a printing order?", answer: "Turnaround depends on quantity, material, finishing, and artwork readiness. Share your deadline with your quote request and we will recommend the safest production path." },
  { question: "What information should I include when requesting a quote?", answer: "Include product type, size, quantity, preferred material, finish, delivery location, deadline, and any artwork files or brand guidelines you already have." },
  { question: "Do you print for schools, churches, events, and corporate teams?", answer: "Yes. We regularly support organizations with uniforms, banners, booklets, ID cards, signage, event materials, branded gifts, and stationery." },
  { question: "How do you protect print quality and color consistency?", answer: "We check artwork quality, choose appropriate materials, confirm production details, and align finishing recommendations with the intended use of each printed item." },
  { question: "Can GGP Images deliver or ship completed work?", answer: "Delivery and shipping options can be arranged based on order size, timeline, and destination. Confirm your location when requesting a quote." },
  { question: "Which file formats are best for printing?", answer: "PDF, AI, EPS, PSD, SVG, high-resolution PNG, and high-resolution JPEG files are commonly accepted. Vector files are preferred for logos and sharp brand graphics." },
];

export const metadata: Metadata = buildMetadata({ title: "Printing FAQs | GGP Images", description: "Answers to common printing, branding, artwork, quote, delivery, and production questions for GGP Images customers.", path: "/faq", keywords: ["printing FAQ", "GGP Images", "print quote"] });

export default function FaqPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }];
  return (
    <main className="bg-popover">
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <Breadcrumbs items={crumbs} />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-[2rem] bg-brand-tertiary p-8 text-center text-white shadow-2xl md:p-12">
          <p className="mx-auto mb-4 w-fit rounded-full bg-secondary px-4 py-2 text-sm font-bold uppercase tracking-widest text-primary">Printing help center</p>
          <h1 className="text-4xl font-black md:text-6xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/80">Straight answers about artwork, materials, turnaround, quotes, delivery, and professional printing with GGP Images.</p>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-brand-tertiary/20 bg-card p-6 shadow-sm open:border-secondary">
              <summary className="cursor-pointer text-lg font-bold text-brand-tertiary marker:text-secondary">{faq.question}</summary>
              <p className="mt-4 leading-8 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 rounded-3xl bg-secondary p-8 text-center text-primary">
          <h2 className="text-2xl font-black">Still have questions?</h2>
          <p className="mt-2">Send your project details and our team will guide you.</p>
          <Link href="/contact" className="mt-5 inline-flex rounded-full bg-brand-tertiary px-6 py-3 font-bold text-white">Contact GGP Images</Link>
        </div>
      </section>
    </main>
  );
}
