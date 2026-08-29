import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Brush, Printer, Shirt, Package, Megaphone, Sparkles } from "lucide-react";

import Link from "next/link";
import { coreServices } from "@/lib/services";

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 scroll-smooth" id="services">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-wider text-card md:text-4xl">
          Comprehensive Branding &amp; Printing
        </h2>
        <p className="text-popover text-lg leading-8 tracking-wide">
          We combine cutting-edge technology with artisanal craftsmanship to offer a full spectrum
          of printing services tailored to your specific needs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {coreServices.map((service, index) => {
          const Icon = [Printer, Shirt, Brush, Package, Megaphone, Sparkles][index] || Printer;

          return (
            <Link
              href={`/services/${service.slug}`}
              key={service.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-secondary hover:bg-secondary/10 hover:shadow-2xl"
            >
              <div>
                <div className="relative mb-6 h-52 w-full overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground shadow-lg">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-bold tracking-wide text-card group-hover:text-secondary transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm leading-relaxed text-card/80 mb-4">
                  {service.shortDescription}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-secondary group-hover:translate-x-1 transition-transform">
                Explore Solutions &rarr;
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}