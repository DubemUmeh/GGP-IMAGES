import type { Metadata } from "next";
import { breadcrumbSchema, buildMetadata, faqSchema, JsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ArrowCta } from "@/components/ui/motion-kit";

const faqs = [
  {
    question: "What printing and photography services does GGP Images provide?",
    answer:
      "We provide comprehensive branding, photography, business stationery, large format printing, apparel printing, packaging, labels, invitations, certificates, promotional items, photocopying, and finishing services.",
  },
  {
    question: "Do you provide services outside your local area or internationally?",
    answer:
      "Yes. GGP Images delivers photography and printing services nationwide and works with clients across other countries internationally, subject to project requirements, location, availability, and logistics.",
  },
  {
    question: "Can you help if I do not have print-ready artwork?",
    answer:
      "Yes. Our creative team can review, adjust, or design artwork so files meet size, resolution, bleed, color, and readability requirements before production.",
  },
  {
    question: "How fast can you complete a printing or creative order?",
    answer:
      "Turnaround depends on project scope, quantity, material, finishing, and artwork readiness. Share your deadline with your quote or booking request and we will recommend the safest production path.",
  },
  {
    question: "What information should I include when requesting a quote?",
    answer:
      "Include product or service type, size, quantity, preferred material, finish, delivery or event location, deadline, and any artwork files or brand guidelines you already have.",
  },
  {
    question: "Do you serve schools, churches, events, and corporate teams?",
    answer:
      "Yes. We regularly support businesses and organizations with uniforms, banners, booklets, ID cards, signage, event coverage, branded gifts, and executive stationery.",
  },
  {
    question: "How do you protect print quality and color consistency?",
    answer:
      "We check artwork quality, choose appropriate materials, confirm production details, and align finishing recommendations with the intended use of each item.",
  },
  {
    question: "Can GGP Images deliver or ship completed work?",
    answer:
      "Delivery and shipping options are arranged based on order size, timeline, and destination. Confirm your location when requesting a quote or submitting a booking.",
  },
  {
    question: "Which file formats are best for printing?",
    answer:
      "PDF, AI, EPS, PSD, SVG, high-resolution PNG, and high-resolution JPEG files are accepted. Vector files are preferred for logos and sharp brand graphics.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Printing & Photography FAQs | GGP Images",
  description:
    "Answers to common questions regarding GGP Images' nationwide and international photography, commercial printing, artwork, quotes, and delivery services.",
  path: "/faq",
  keywords: ["printing FAQ", "GGP Images", "photography FAQ", "nationwide printing", "international printing"],
});

export default function FaqPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <main className="bg-popover min-h-screen">
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <Breadcrumbs items={crumbs} />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-[2rem] bg-brand-tertiary p-8 text-center text-white shadow-2xl md:p-12">
          <p className="mx-auto mb-4 w-fit rounded-full bg-secondary px-4 py-2 text-sm font-bold uppercase tracking-widest text-primary">
            Printing &amp; Photography Help Center
          </p>
          <h1 className="text-4xl font-black md:text-6xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/80">
            Straight answers about artwork, materials, turnaround, nationwide and international service, quotes, delivery, and professional creative solutions with GGP Images.
          </p>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-brand-tertiary/20 bg-card p-6 shadow-sm"
            >
              <summary className="cursor-pointer text-lg font-bold text-brand-tertiary marker:text-secondary">
                {faq.question}
              </summary>
              <p className="mt-4 leading-8 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 rounded-3xl bg-secondary p-8 text-center text-primary shadow-lg">
          <h2 className="text-2xl font-black">Still have questions?</h2>
          <p className="mt-2 text-primary/90">
            Send your project details and our team will guide you.
          </p>
          <ArrowCta label="Get in Touch" as="link" href="/contact" className="mt-5" />
        </div>
      </section>
    </main>
  );
}
