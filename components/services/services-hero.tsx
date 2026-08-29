import Image from "next/image";
import { ArrowCta } from "../ui/motion-kit";

export function ServicesHero() {
  return (
    <section className="relative w-full bg-brand-tertiary px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-secondary shadow-sm">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Our Services
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-card md:text-6xl">
              Creative Printing Solutions for Every Industry
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-card/80">
              From high-end commercial prints to bespoke packaging and event branding, we deliver
              precision and quality that makes your brand stand out.
            </p>
            <ArrowCta as="link" label="Explore Our Services" href="#services" className="bg-secondary w-fit hover:bg-secondary/90 shadow-lg" />
          </div>
          <div className="relative hidden h-96 w-full lg:block">
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
              <Image
                src="/hero-image.webp"
                priority
                alt="Composition of premium printed materials"
                fill
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-tertiary/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
