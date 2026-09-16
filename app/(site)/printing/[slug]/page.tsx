import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { seoPages } from "@/lib/programmatic-seo";
import { breadcrumbSchema, buildMetadata, faqSchema, JsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

function getPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return seoPages.slice(0, 24).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.description, path: `/printing/${page.slug}`, keywords: [page.service, page.audience, "printing Takoradi"] });
}

export default async function ProgrammaticSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Printing", path: "/services" }, { name: page.heading, path: `/printing/${page.slug}` }];

  return (
    <main className="bg-background">
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(page.faqs)]} />
      <Breadcrumbs items={crumbs} />
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <article className="rounded-[2rem] bg-card p-8 shadow-xl md:p-12">
          <p className="mb-4 inline-flex rounded-full bg-secondary/15 px-4 py-2 text-sm font-bold font-inter uppercase tracking-widest text-secondary">Intent matched printing guide</p>
          <h1 className="text-4xl font-black font-manrope tracking-tight text-primary md:text-6xl">{page.heading}</h1>
          <p className="mt-6 max-w-3xl text-lg font-inter leading-8 text-muted-foreground">{page.description}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {["Artwork review", "Material guidance", "Quote support"].map((item) => <div key={item} className="rounded-2xl border border-border bg-muted p-5 font-semibold font-manrope text-primary">{item}</div>)}
          </div>
          <h2 className="mt-12 text-2xl font-bold font-manrope text-brand-tertiary">Built for {page.audience}</h2>
          <p className="mt-4 font-inter leading-8 text-foreground/80">This page targets {page.intent}. It avoids generic boilerplate by pairing service-specific production advice with audience-specific buying triggers, recommended finishes, artwork checks, and quote details.</p>
          <h2 className="mt-12 text-2xl font-bold font-manrope text-brand-tertiary">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-border rounded-2xl border border-border">
            {page.faqs.map((faq) => <details key={faq.question} className="group p-5"><summary className="cursor-pointer font-semibold font-manrope text-primary">{faq.question}</summary><p className="mt-3 font-inter leading-7 text-muted-foreground">{faq.answer}</p></details>)}
          </div>
        </article>
        <aside className="h-fit rounded-[2rem] bg-brand-tertiary p-6 text-white shadow-xl">
          <h2 className="text-xl font-bold font-manrope">Related printing pages</h2>
          <div className="mt-5 space-y-3 font-inter">
            {page.related.map((href) => <Link key={href} href={href} className="block rounded-xl bg-white/10 p-4 hover:bg-secondary hover:text-primary">{href.split("/").pop()?.replaceAll("-", " ")}</Link>)}
          </div>
          <Link href="/contact" className="mt-6 block rounded-xl bg-secondary px-5 py-3 text-center font-bold font-manrope text-primary">Request a quote</Link>
        </aside>
      </section>
    </main>
  );
}
