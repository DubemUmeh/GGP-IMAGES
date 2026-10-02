import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { seoPages, getSeoPage } from "@/lib/programmatic-seo";
import { breadcrumbSchema, buildMetadata, faqSchema, JsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const revalidate = 86400;
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/printing/${page.slug}`,
    keywords: [page.service, page.audience, "printing Takoradi"],
  });
}

export default async function ProgrammaticSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Printing", path: "/services" },
    { name: page.heading, path: `/printing/${page.slug}` },
  ];

  return (
    <main className="bg-background">
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(page.faqs)]} />
      <Breadcrumbs items={crumbs} />
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <article className="rounded-[2rem] bg-card p-8 shadow-xl md:p-12">
          <p className="mb-4 inline-flex rounded-full bg-secondary/15 px-4 py-2 font-inter text-sm font-bold uppercase tracking-widest text-secondary">
            Printing guide
          </p>
          <h1 className="font-manrope text-4xl font-black tracking-tight text-primary md:text-6xl">{page.heading}</h1>
          <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-muted-foreground">{page.intro}</p>

          <h2 className="mt-12 font-manrope text-2xl font-bold text-brand-tertiary">What to consider</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {page.considerations.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-muted p-5 font-inter text-sm leading-7 text-foreground">{item}</div>
            ))}
          </div>

          <h2 className="mt-12 font-manrope text-2xl font-bold text-brand-tertiary">How GGP Images can help</h2>
          <p className="mt-4 font-inter leading-8 text-foreground/80">{page.description} Share your specifications through the booking form and the production team can assess the appropriate materials, finishing, artwork requirements, and turnaround.</p>

          <h2 className="mt-12 font-manrope text-2xl font-bold text-brand-tertiary">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="group p-5">
                <summary className="cursor-pointer font-manrope font-semibold text-primary">{faq.question}</summary>
                <p className="mt-3 font-inter leading-7 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </article>

        <aside className="h-fit rounded-[2rem] bg-brand-tertiary p-6 text-white shadow-xl">
          <h2 className="font-manrope text-xl font-bold">Related services</h2>
          <div className="mt-5 space-y-3 font-inter">
            {page.related.map((href) => (
              <Link key={href} href={href} className="block rounded-xl bg-white/10 p-4 capitalize hover:bg-secondary hover:text-primary">
                {href.split("/").pop()?.replaceAll("-", " ")}
              </Link>
            ))}
          </div>
          <Link href="/booking" className="mt-6 block rounded-xl bg-secondary px-5 py-3 text-center font-manrope font-bold text-primary">Request a quote</Link>
        </aside>
      </section>
    </main>
  );
}
