import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Brush, Printer, Shirt, Package, Megaphone, Sparkles, Store, Box } from "lucide-react";

const services = [
  {
    key: "branding-design",
    span: "lg:col-span-2",
    badge: "Core Service",
    title: "Branding & Design",
    description:
      "Create a unique brand identity that tells your story and connects with your audience.",
    icon: Brush,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
    variant: "overlay-large" as const,
  },
  {
    key: "printing-services",
    title: "Printing Services",
    description: "High-quality printing for all your needs — fast, reliable, and affordable.",
    icon: Printer,
    image:
      "https://plus.unsplash.com/premium_photo-1682145497679-e9340895df09?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    variant: "card" as const,
  },
  {
    key: "uniforms-apparel",
    title: "Uniforms & Apparel",
    description: "Custom uniforms and apparel that promote your brand professionally.",
    icon: Shirt,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    variant: "card" as const,
  },
  {
    key: "packaging",
    title: "Packaging",
    description: "Creative packaging solutions that protect your products and elevate your brand.",
    icon: Package,
    image:
      "https://res.cloudinary.com/dcqwzsq26/image/upload/v1787494743/c50ea239-8102-4de8-a879-180e3fd857b6_ekppdc.png",
    variant: "card" as const,
  },
  {
    key: "promotional-items",
    title: "Promotional Items",
    description: "Branded giveaways and promotional products that keep your brand top of mind.",
    icon: Megaphone,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80",
    variant: "card" as const,
  },
  {
    key: "event-materials",
    title: "Event Materials",
    description: "Banners, backdrops, flyers and more to make your events unforgettable.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
    variant: "card" as const,
  },
  {
    key: "signage-displays",
    title: "Signage & Displays",
    description: "Eye-catching signage and displays that get your business noticed.",
    icon: Store,
    image:
      "https://images.unsplash.com/photo-1561070791-36c11767b26a?auto=format&fit=crop&w=900&q=80",
    variant: "card" as const,
  },
  {
    key: "marketing-materials",
    title: "Marketing Materials",
    description: "Brochures, flyers, business cards and more to power your marketing.",
    icon: Box,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80",
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
          const Icon = service.icon;

          if (service.variant === "overlay-large") {
            return (
              <div
                key={service.key}
                className={`card-shadow border-2 border-secondary group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-secondary p-8 transition-transform duration-300 hover:-translate-y-2 ${service.span ?? ""}`}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 66vw, (min-width: 768px) 100vw, 100vw"
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
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mb-2 text-2xl font-bold text-white">{service.title}</h3>
                  <p className="max-w-md text-white/80">{service.description}</p>
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
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-card text-secondary shadow-sm">
                  <Icon className="h-4 w-4" />
                </span>
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