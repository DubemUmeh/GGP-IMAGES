import Image from "next/image";
import { ArrowCta } from "../ui/motion-kit";

export function ServicesHero() {
  return (
    <section className="relative w-full h-full py-5 bg-secondary overflow-hidden p-3">
      <div className="mx-auto max-w-7xl max-h-[85dvh] bg-brand-tertiary overflow-hidden rounded-b-[40px] bg-gradient-hero md:px-6 md:rounded-[80px]">
        <div className="relative w-full p-5 lg:p-0 h-full z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl lg:p-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm font-inter">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-sm tracking-wide font-semibold text-muted-foreground">Our Services</span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold font-manrope leading-tight tracking-tight text-card md:text-6xl">
              Creative Printing Solutions for Every Industry
            </h1>
            <p className="mb-8 max-w-lg text-lg font-inter text-popover">
              From high-end commercial prints to bespoke packaging and event branding, we deliver
              precision and quality that makes your brand stand out.
            </p>
            <ArrowCta as="link" label="Explore Our Services" href="#services" className="bg-secondary w-fit hover:bg-secondary/80" />
          </div>
          <div className="hidden h-full w-full lg:flex lg:items-start z-50!">
            <div className="w-full h-fit bg-secondary relative top-0 -right-10 border-l-6 border-b-6 rounded-bl-[50px] border-secondary">
              <Image
                src="/hero-image.webp"
                priority
                alt="Composition of premium printed materials"
                height={1000}
                width={1000}
                className="z-10 object-contain drop-shadow-2xl rounded-bl-[50px]"
              />
            </div>
            <div className="absolute right-10 top-1/2 h-64 w-64 animate-pulse rounded-full bg-brand-orange-fixed opacity-30 blur-3xl" />
            <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-brand-purple-fixed opacity-30 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
