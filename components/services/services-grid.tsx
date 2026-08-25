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

      <div className="grid auto-rows-87.5 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coreServices.map((service, index) => {
          const Icon = [Brush, Printer, Shirt, Package, Megaphone, Sparkles][index];

          if (index === 0) {
            return (
              <Link
                href={`/services/${service.slug}`}
                key={service.slug}
                className="card-shadow border-2 border-secondary group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-secondary p-8 transition-transform duration-300 hover:-translate-y-2 lg:col-span-2"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(min-width: 1024px) 66vw, (min-width: 768px) 100vw, 100vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="relative z-10">
                  <Badge className="mb-4 rounded-full bg-brand-purple-fixed text-primary hover:bg-brand-purple-fixed">Core Service</Badge>
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mb-2 text-2xl font-bold text-white">{service.name}</h3>
                  <p className="max-w-md text-white/80">{service.shortDescription}</p>
                </div>
              </Link>
            );
          }

          return (
            <Link
              href={`/services/${service.slug}`}
              key={service.slug}
              className="card-shadow border-2 border-secondary group flex flex-col overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-2 bg-secondary/40"
            >
              <div className="relative mb-4 h-48 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-card text-secondary shadow-sm">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-auto">
                <h3 className="mb-2 text-xl font-semibold tracking-wide text-card">{service.name}</h3>
                <p className="text-sm text-popover">{service.shortDescription}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}