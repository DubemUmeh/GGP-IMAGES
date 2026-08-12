import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LuArrowRight } from "react-icons/lu";

const services = [
  {
    key: "brand-identity",
    span: "lg:col-span-2",
    badge: "Core Service",
    title: "Brand Identity & Stationery",
    description:
      "Elevate your professional image with premium business cards, letterheads, envelopes, and complete brand kits crafted with precision.",
    image: "/hero-image.webp",
    variant: "overlay-large" as const,
  },
  {
    key: "commercial-printing",
    title: "Commercial Printing",
    description:
      "High-volume brochures, flyers, posters, and catalogs with fast turnaround and consistent color accuracy.",
    image: "/hero-image.webp",
    variant: "card" as const,
  },
  {
    key: "custom-packaging",
    title: "Custom Packaging",
    description:
      "Bespoke boxes, labels, and packaging solutions that protect your products and delight your customers.",
    image: "/hero-image.webp",
    variant: "card" as const,
  },
  {
    key: "large-format",
    span: "lg:row-span-2 lg:h-full h-[350px]",
    title: "Large Format Printing",
    description:
      "Make a massive impact. We produce high-resolution banners, rigid signage, stunning backdrops, and exhibition graphics designed to command attention from any distance.",
    image: "/hero-image.webp",
    variant: "overlay-tall" as const,
    cta: "View Specs",
  },
  {
    key: "apparel",
    title: "Apparel & Textiles",
    description: "Custom t-shirts, uniforms, and tote bags using advanced screen printing and DTG technologies.",
    image: "/hero-image.webp",
    variant: "card" as const,
  },
  {
    key: "corporate-gifting",
    title: "Corporate Gifting",
    description: "Branded merchandise and premium gifts that leave a lasting impression on clients and employees.",
    image: '/hero-image.webp',
    variant: "card" as const,
  },
];

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
        {services.map((service) => {
          if (service.variant === "overlay-large" || service.variant === "overlay-tall") {
            return (
              <div
                key={service.key}
                className={`card-shadow border-2 border-secondary group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-secondary p-8 transition-transform duration-300 hover:-translate-y-2  ${service.span ?? ""}`}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="relative z-10">
                  {service.badge && (
                    <Badge className="mb-4 rounded-full bg-brand-purple-fixed text-primary hover:bg-brand-purple-fixed">
                      {service.badge}
                    </Badge>
                  )}
                  <h3 className="mb-2 text-2xl font-bold text-white">{service.title}</h3>
                  <p className="max-w-md text-white/80">{service.description}</p>
                  {service.cta && (
                    <Button
                      variant="link"
                      className="mt-6 h-auto p-0 text-brand-orange-fixed-dim hover:text-white"
                    >
                      {service.cta}
                      <LuArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div
              key={service.key}
              className="card-shadow border-2 border-secondary group flex flex-col overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-2 bg-secondary/40"
            >
              <div className="relative mb-4 h-48 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-150"
                />
              </div>
              <div className="mt-auto">
                <h3 className="mb-2 text-xl font-semibold tracking-wide text-card">{service.title}</h3>
                <p className="text-sm text-popover">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
