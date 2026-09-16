import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, buildMetadata, siteConfig, JsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ArrowCta } from "@/components/ui/motion-kit";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | GGP Images",
  description:
    "Learn how GGP Images collects, uses, and protects your personal information when you request quotes, submit bookings, or communicate with us.",
  path: "/privacy",
  keywords: ["Privacy Policy", "GGP Images", "data privacy", "terms and privacy"],
});

export default function PrivacyPolicyPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  const lastUpdated = "Sep 16, 2026";

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
          <h1 className="text-3xl font-black md:text-5xl">Privacy Policy</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Transparency regarding how GGP Images handles customer data, quote requests, service bookings, and site security.
          </p>
          <p className="mt-4 text-xs font-medium text-white/60">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Policy Content */}
        <div className="mt-10 space-y-8 rounded-3xl border border-brand-tertiary/10 bg-card p-6 shadow-sm md:p-10">
          {/* Overview */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">1. Overview</h2>
            <p className="leading-relaxed text-muted-foreground">
              At {siteConfig.legalName} (&quot;GGP Images&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we value your trust and are committed to respecting your privacy. This Privacy Policy explains what information we collect when you visit our website, submit enquiries, or place service booking requests, as well as how that information is used, stored, and protected.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Please note that GGP Images is a photography, creative, and commercial printing service provider. Our public website does not offer public user registration or customer accounts.
            </p>
          </section>

          {/* Information Collected */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-tertiary">2. Information We Collect</h2>
            <p className="leading-relaxed text-muted-foreground">
              We collect information that you directly provide to us when using our interactive forms or contacting us:
            </p>
            <div className="space-y-3 pl-4">
              <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
                <h3 className="font-semibold text-foreground">Contact & Quote Forms</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  When you submit a message or request a quote via our contact forms, we collect your <strong>full name</strong>, <strong>email address</strong>, selected <strong>services</strong> of interest, referral source, and any project <strong>details</strong> or specifications you voluntarily include in your message.
                </p>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
                <h3 className="font-semibold text-foreground">Booking Requests</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  When requesting a creative or printing service booking, we collect your <strong>full name</strong>, <strong>email address</strong>, <strong>phone number</strong>, selected <strong>service categories</strong> and subdivisions, <strong>project name</strong>, quantity requirements, preferred service <strong>date and time</strong>, project descriptions, and URLs of any <strong>uploaded design files or artwork</strong>.
                </p>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
                <h3 className="font-semibold text-foreground">Voluntary Communications</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  If you contact us via email, telephone, WhatsApp, or directly at our physical premises, we collect any personal contact information and project details you choose to share.
                </p>
              </div>
            </div>
          </section>

          {/* How Information is Used */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">3. How We Use Your Information</h2>
            <p className="leading-relaxed text-muted-foreground">
              The information you supply is used solely to deliver and support our photography and printing services. Specifically, we use your details to:
            </p>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
              <li>Process, review, and respond to your quote enquiries and consultation requests.</li>
              <li>Schedule, manage, and deliver agreed photography sessions and printing production orders.</li>
              <li>Communicate regarding artwork approvals, turnarounds, order status, logistics, and invoicing.</li>
              <li>Maintain internal records of completed customer jobs and booking histories.</li>
              <li>Protect the security, integrity, and performance of our website and services.</li>
            </ul>
          </section>

          {/* Third-Party Services & Data Sharing */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">4. Data Sharing & Third-Party Services</h2>
            <p className="leading-relaxed text-muted-foreground">
              We do not sell, rent, or trade customer personal information to third parties for marketing purposes. To operate our website and fulfill customer requests effectively, we rely on trusted infrastructure providers:
            </p>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
              <li>
                <strong>Email Dispatch Services:</strong> Transactional email notifications and quote requests are routed securely via configured SMTP mail transport services to deliver updates to our team and send order confirmations to your email.
              </li>
              <li>
                <strong>Cloud Storage & Media Hosting:</strong> Uploaded design files, reference artwork, and gallery media are hosted using Cloudinary cloud storage services.
              </li>
              <li>
                <strong>Database & Infrastructure:</strong> Booking records, administrator permissions, and published site settings are stored securely within PostgreSQL database infrastructure.
              </li>
            </ul>
          </section>

          {/* Administrator Authentication & Google OAuth */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">5. Administrator Authentication & Google OAuth</h2>
            <div className="rounded-2xl bg-brand-tertiary/5 p-5 border border-brand-tertiary/15">
              <p className="leading-relaxed text-foreground font-medium">
                Important Notice regarding Google OAuth:
              </p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                GGP Images utilizes Google OAuth 2.0 strictly for authenticating designated GGP Images staff and administrators accessing our internal administration area (<code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">/admin</code>).
              </p>
            </div>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
              <li>
                <strong>No Public Customer Sign-In:</strong> Google OAuth authentication is NOT available or required for public site visitors or general customers. The website does not provide public account registration.
              </li>
              <li>
                <strong>Data Requested from Google:</strong> During administrator authentication, our system requests basic identity parameters under standard Google OAuth scopes (<code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">openid</code>, <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">email</code>, <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">profile</code>), specifically receiving the administrator&apos;s Google ID, primary email address, full name, and avatar picture.
              </li>
              <li>
                <strong>Usage of OAuth Data:</strong> This authentication data is used exclusively to verify administrator authorization, enforce internal access controls, and maintain secure administrator sessions.
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">6. Data Security & Storage</h2>
            <p className="leading-relaxed text-muted-foreground">
              We employ reasonable technical, administrative, and physical safeguards to safeguard personal information collected through our website against unauthorized access, loss, alteration, or disclosure. These measures include encrypted connections (HTTPS), restricted database access, and secure session management for administrative features.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              While we take active measures to secure your data, no internet transmission or electronic storage solution can be guaranteed as 100% immune from security threats. Consequently, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">7. Data Retention</h2>
            <p className="leading-relaxed text-muted-foreground">
              We retain personal information submitted through contact and booking forms for as long as necessary to fulfill the requested services, maintain business records, resolve potential disputes, and satisfy legal or accounting obligations.
            </p>
          </section>

          {/* Your Rights */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">8. Your Rights & Choices</h2>
            <p className="leading-relaxed text-muted-foreground">
              Depending on applicable privacy laws, you may have the right to request access to, correction of, or deletion of the personal information you have provided to GGP Images. You may also contact us to update your contact details or inquire about stored information regarding your bookings.
            </p>
          </section>

          {/* Policy Updates */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-tertiary">9. Updates to This Policy</h2>
            <p className="leading-relaxed text-muted-foreground">
              We may update this Privacy Policy periodically to reflect changes in our services, technology, or legal requirements. Any revisions will be published on this page with an updated revision date.
            </p>
          </section>

          {/* Contact Us */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-2xl font-bold text-brand-tertiary">10. Contact Us</h2>
            <p className="leading-relaxed text-muted-foreground">
              If you have any questions, concerns, or requests concerning this Privacy Policy or how your personal information is handled, please reach out to us:
            </p>
            <div className="rounded-2xl bg-muted/50 p-6 text-sm space-y-2 text-foreground">
              <p><strong>Entity:</strong> {siteConfig.legalName}</p>
              <p><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`} className="text-secondary hover:underline">{siteConfig.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:+233548844321" className="text-secondary hover:underline">+233 (54) 884 4321</a> / <a href="tel:+233559956394" className="text-secondary hover:underline">+233 (55) 995 6394</a></p>
              <p><strong>Location:</strong> {siteConfig.address}</p>
            </div>
          </section>
        </div>

        {/* CTA Card */}
        <div className="mt-10 rounded-3xl bg-secondary p-8 text-center text-primary shadow-lg">
          <h2 className="text-2xl font-black">Have questions about a project?</h2>
          <p className="mt-2 text-primary/90">Contact our team directly to discuss your printing or creative needs.</p>
          <ArrowCta label="Get in Touch" as="link" href="/contact" className="mt-5" />
        </div>
      </section>
    </main>
  );
}
