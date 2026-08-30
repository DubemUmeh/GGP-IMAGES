import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JsonLd, absoluteUrl, breadcrumbSchema, buildMetadata, siteConfig } from "@/lib/seo";
import { coreServices, flattenSubdivisions, getServiceBySlug } from "@/lib/services";
import { ServiceBookingForm } from "@/components/services/service-booking-form";
import { ArrowCta } from "@/components/ui/motion-kit";

export function generateStaticParams() {
  return coreServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.name} in Takoradi | GGP Images`,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
    keywords: [service.name, ...flattenSubdivisions(service).map((item) => item.name), "GGP Images"],
    ogImage: service.image,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const related = coreServices.filter((item) => item.slug !== service.slug).slice(0, 3);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.name, path: `/services/${service.slug}` }];

  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), { "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.description, provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url }, areaServed: "Ghana", url: absoluteUrl(`/services/${service.slug}`), serviceType: service.name }]} />
      <section className="relative overflow-hidden bg-black/80 px-3 md:px-6 py-20 text-white lg:py-28">
        <div className="absolute inset-0 opacity-25"><Image src={service.image} alt={`${service.name} service examples`} fill priority sizes="100vw" className="object-cover" /></div>
        {/* <div className="absolute inset-0 bg-linear-to-r from-black/80 via-brand-tertiary/80 to-brand-tertiary/50" /> */}
        <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/20 to-black/10" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge className="rounded-full p-3 bg-secondary text-sm md:text-base text-card hover:bg-secondary font-bold font-manrope">Core service</Badge>
            <h1 className="mt-6 text-4xl font-black font-manrope tracking-tight md:text-6xl">{service.name}</h1>
            <p className="mt-6 max-w-2xl text-lg font-inter leading-8 text-white/80">{service.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#book" className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 font-semibold font-manrope text-white hover:bg-white/20 hover:transition-colors hover:ease-in-out duration-200">Request this service</a>
              <ArrowCta label="Contact Sales" as="link" href="/contact" className="bg-secondary hover:bg-secondary/80" />
            </div>
          </div>
          <ServiceBookingForm service={service} />
        </div>
      </section>

      <section className="bg-secondary px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="text-sm font-bold font-manrope uppercase tracking-widest text-primary">What is included</p><h2 className="mt-3 text-3xl font-black font-manrope text-card">Everything under {service.name}</h2><p className="mt-4 text-sm md:text-base lg:text-lg font-inter leading-8 text-card/75">Choose the exact request type during booking so our team can recommend the right materials, production method, turnaround, and finishing path.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.subdivisions.map((item) => <div key={item.slug} className="rounded-2xl border border-primary/10 bg-card p-3 md:p-4 shadow-sm"><h3 className="font-bold font-manrope text-card-foreground">{item.name}</h3>{item.children && <ul className="mt-3 space-y-1 text-sm font-inter text-muted-foreground">{item.children.map((child) => <li key={child.slug}>• {child.name}</li>)}</ul>}</div>)}
          </div>
        </div>
      </section>

      <section className="bg-popover px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] bg-brand-tertiary p-8 text-white"><h2 className="text-3xl font-black font-manrope">Why choose this service?</h2><div className="mt-6 space-y-4 font-inter">{service.benefits.map((benefit) => <p key={benefit} className="flex gap-3 text-white/85"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-secondary" />{benefit}</p>)}</div></div>
          <div className="rounded-[28px] border bg-secondary p-8"><h2 className="text-3xl font-black font-manrope text-card">How it works</h2><ol className="mt-6 space-y-4 font-inter">{service.process.map((step, index) => <li key={step} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold font-manrope text-primary-foreground">{index + 1}</span><span className="leading-7 text-card/80">{step}</span></li>)}</ol></div>
        </div>
      </section>

      <section className="bg-secondary px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl"><h2 className="text-3xl font-black font-manrope">Related services</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className="group rounded-2xl border border-white/10 bg-brand-tertiary p-6 transition hover:-translate-y-1 hover:bg-brand-tertiary/80"><h3 className="text-xl font-bold font-manrope">{item.name}</h3><p className="mt-3 text-sm font-inter leading-6 text-white/70">{item.shortDescription}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold font-manrope text-secondary">View service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</div></div>
      </section>
    </main>
  );
}
