import type { Metadata } from "next";
import { breadcrumbSchema, buildMetadata, siteConfig, JsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ArrowCta } from "@/components/ui/motion-kit";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | GGP Images",
  description:
    "Review the Terms of Service governing website use, photography and printing enquiries, booking requests, and creative services with GGP Images.",
  path: "/terms",
  keywords: ["Terms of Service", "Terms and Conditions", "GGP Images", "printing terms"],
});

export default function TermsOfServicePage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ];

  const lastUpdated = "May 20, 2024";

  return (
    <main className="bg-popover min-h-screen">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        {/* Hero Banner */}
        <div className="rounded-[2rem] bg-brand-tertiary p-8 text-center text-white shadow-2xl md:p-12">
          <p className="mx-auto mb-4 w-fit rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            Legal Information
          </p>
          <h1 className="text-3xl font-black md:text-5xl">Terms of Service</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Terms and conditions governing the use of our website, service quotes, project bookings, and creative solutions.
          </p>
          <p className="mt-4 text-xs font-medium text-white/60">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Terms Content */}
        <div className="mt-10 space-y-8 rounded-3xl border border-brand-tertiary/10 bg-card p-6 shadow-sm md:p-10">
          {/* Agreement */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">1. Acceptance of Terms</h2>
            <p className="leading-relaxed text-muted-foreground">
              By accessing or using the website of {siteConfig.legalName} (&quot;GGP Images&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) at <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">{siteConfig.url}</code> or by submitting quote requests and booking orders, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services.
            </p>
          </section>

          {/* Website Use & Access */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">2. Website Use & Content</h2>
            <p className="leading-relaxed text-muted-foreground">
              Our website provides information about our photography, commercial printing, corporate branding, and creative production services. You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of or restrict the use of this website by any third party.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              All text, graphics, logos, photos, videos, site designs, and software on this website are the intellectual property of GGP Images or its content suppliers and are protected by applicable copyright and intellectual property laws. You may not copy, reproduce, or redistribute site content without explicit written consent.
            </p>
          </section>

          {/* Photography & Creative Services */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">3. Services & Quotations</h2>
            <p className="leading-relaxed text-muted-foreground">
              GGP Images provides custom photography, branding, large format printing, apparel printing, packaging, and related graphic finishing solutions.
            </p>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
              <li>
                <strong>Informational Content:</strong> Service descriptions, sample imagery, portfolio displays, and turnaround estimates on the website are provided for reference and do not constitute a binding contract until a specific quote is issued and agreed upon.
              </li>
              <li>
                <strong>Custom Quotations:</strong> Quotes are calculated based on job specifications, quantity, paper or print stock, artwork complexity, finishing requirements, and delivery destination. Official quotes are valid for the duration specified on the quotation document.
              </li>
            </ul>
          </section>

          {/* Enquiries & Booking Requests */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">4. Enquiries vs. Confirmed Bookings</h2>
            <p className="leading-relaxed text-muted-foreground">
              Submitting an enquiry or booking request form on our website does not automatically guarantee or constitute a confirmed order or booking.
            </p>
            <div className="rounded-2xl border border-border/60 bg-muted/40 p-5 space-y-2">
              <p className="text-sm font-semibold text-foreground">Booking Confirmation Process:</p>
              <ol className="list-decimal list-inside text-sm space-y-1.5 text-muted-foreground leading-relaxed">
                <li>You submit project parameters, dates, quantity, or design uploads via our booking forms.</li>
                <li>Our team reviews your specifications, checks schedule availability, and verifies artwork readiness.</li>
                <li>A booking or production order is formally confirmed only when GGP Images provides explicit written confirmation (via email or direct contact) and any required deposit or agreement terms are fulfilled.</li>
              </ol>
            </div>
          </section>

          {/* Customer Responsibilities & Artwork */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">5. Customer Responsibilities & Artwork Uploads</h2>
            <p className="leading-relaxed text-muted-foreground">
              When supplying artwork, photographs, brand logos, or project specifications to GGP Images:
            </p>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
              <li>
                <strong>Accuracy:</strong> You are responsible for ensuring that all supplied information, text copy, dimension choices, color specifications, and file uploads are accurate and final prior to production approval.
              </li>
              <li>
                <strong>Intellectual Property Compliance:</strong> You warrant that you own or possess all necessary rights, licenses, and permissions for any artwork, photos, graphics, or trademarks you upload or instruct us to reproduce. You agree not to submit material that infringes upon third-party rights.
              </li>
              <li>
                <strong>Proof Approval:</strong> Where artwork proofs are supplied for review, production will proceed based on the approved proof. GGP Images is not liable for errors present in customer-approved proofs.
              </li>
            </ul>
          </section>

          {/* Payments, Deposits & Cancellations */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">6. Payment, Deposits & Cancellations</h2>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
              <li>
                <strong>Payment Terms:</strong> Payment schedules, accepted payment methods, and required deposits (if applicable) are specified on individual project invoices or quote agreements.
              </li>
              <li>
                <strong>Rescheduling & Cancellations:</strong> Cancellation or rescheduling requests for photography shoots or custom print jobs must be communicated as early as possible. Refunds or adjustments for cancelled orders are evaluated based on materials purchased, work already performed, and studio scheduling impact.
              </li>
            </ul>
          </section>

          {/* Third-Party Integrations */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">7. Third-Party Services & Links</h2>
            <p className="leading-relaxed text-muted-foreground">
              Our website and workflows incorporate third-party services for essential operations, including Cloudinary for file hosting, Google OAuth for restricted administrator authentication, and external communication links (such as WhatsApp, social channels, or Google Maps). We do not control and are not responsible for the independent practices or availability of external third-party services.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">8. Limitation of Liability</h2>
            <p className="leading-relaxed text-muted-foreground">
              To the maximum extent permitted by applicable law, GGP Images and its personnel shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of your use of the website, temporary website downtime, or reliance on information provided on the site.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Our total aggregate liability for any claims relating to ordered products or services shall not exceed the total amount actually paid by the customer for the specific order giving rise to the claim.
            </p>
          </section>

          {/* Modifications & Updates */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">9. Changes to Terms</h2>
            <p className="leading-relaxed text-muted-foreground">
              We reserve the right to revise or update these Terms of Service at any time without prior individual notice. Any changes will be published on this page with a revised date. Continued use of our website or services following such changes constitutes your acceptance of the updated terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-2xl font-bold text-brand-tertiary">10. Contact Information</h2>
            <p className="leading-relaxed text-muted-foreground">
              If you have questions or require clarification regarding these Terms of Service, please contact us:
            </p>
            <div className="rounded-2xl bg-muted/50 p-6 text-sm space-y-2 text-foreground">
              <p><strong>Entity:</strong> {siteConfig.legalName}</p>
              <p><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`} className="text-secondary hover:underline">{siteConfig.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:+233548844321" className="text-secondary hover:underline">+233 (54) 884 4321</a> / <a href="tel:+233559956394" className="text-secondary hover:underline">+233 (55) 995 6394</a></p>
              <p><strong>Location:</strong> {siteConfig.address}</p>
            </div>
          </section>
        </div>

        {/* CTA Banner */}
        <div className="mt-10 rounded-3xl bg-secondary p-8 text-center text-primary shadow-lg">
          <h2 className="text-2xl font-black">Ready to discuss your project?</h2>
          <p className="mt-2 text-primary/90">Get a custom quote or talk directly with our production specialists.</p>
          <ArrowCta label="Contact GGP Images" as="link" href="/contact" className="mt-5" />
        </div>
      </section>
    </main>
  );
}
