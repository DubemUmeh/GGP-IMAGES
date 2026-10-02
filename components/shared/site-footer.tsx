import Link from "next/link";
import { LuMail, LuPhone, LuMapPin } from "react-icons/lu";
import { Reveal } from "@/components/ui/motion-kit";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import Image from "next/image";
import { siteConfig } from "@/lib/seo";
import { coreServices } from "@/lib/services";
import { formatGhPhone } from "@/lib/utils";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Booking", href: "/booking" },
];

// Derived from services.ts so footer links stay in sync with the service data.
// Subdivisions have no page of their own — every link in a column points back
// to that column's core service page.
const serviceColumns = coreServices.map((service) => ({
  heading: service.name,
  href: `/services/${service.slug}`,
  links: service.subdivisions.map((subdivision) => ({
    label: subdivision.name,
    href: `/services/${service.slug}`,
  })),
}));

const socials = [
  { label: "Instagram", href: `${siteConfig.instagram}`, icon: FaInstagram },
  { label: "FaceBook", href: `${siteConfig.facebook}`, icon: FaFacebook },
  { label: "Tiktok", href: `${siteConfig.tiktok}`, icon: FaTiktok },
];

export function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-popover py-10 border-2 border-brand-tertiary">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-secondary/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-purple-fixed-dim/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Top block: brand + quick links + contact on the first row, services as a full-width row beneath on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand + tagline + socials (untouched logo) */}
          <Reveal className="w-full md:col-span-4 space-y-0">
            <div className="w-full h-full">
              <Image
                src="/main-new-logo.png"
                alt="GGP Image Logo"
                priority
                width={250}
                height={50}
              />
            </div>
            <p className="max-w-xs md:relative md:left-0 -top-10 text-base leading-relaxed tracking-wider text-foreground">
              All your printing Solutions are right here.
            </p>
            <div className="flex items-center gap-3 md:relative md:left-0 md:-top-6">
              {socials.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-foreground/20 hover:border-white bg-foreground/10 text-foreground hover:text-white transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal delay={0.06} className="mt-16 sm:mt-0 md:col-span-3">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-foreground/70 font-manrope">
              Quick Links
            </h4>
            <ul className="space-y-3 font-inter">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-foreground/90 transition-colors duration-200 hover:text-secondary"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1 tracking-wide font-semibold">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Service columns with subdivisions — directly under socials on small screens,
              full-width row beneath the other blocks on md+ */}
          <div className="mt-4 sm:mt-0 grid grid-cols-2 gap-8 font-inter md:order-last md:col-span-12 md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] md:border-t md:border-white/10 md:pt-12">
            {serviceColumns.map((col, i) => (
              <Reveal
                key={col.heading}
                delay={0.04 * (i + 1)}
                className="flex flex-col gap-3"
              >
                <Link
                  href={col.href}
                  className="text-sm font-semibold text-secondary font-manrope hover:underline underline-offset-3"
                >
                  {col.heading}
                </Link>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={`${col.heading}-${link.label}-${j}`}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-start gap-2 text-sm text-foreground/90 transition-colors duration-200 hover:text-secondary"
                      >
                        <span className="text-brand-tertiary leading-5">•</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1 tracking-wide">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* Contact */}
          <Reveal delay={0.18} className="mt-4 sm:mt-0 md:col-span-5">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-foreground/70 font-manrope">
              Contact Us
            </h4>
            <ul className="space-y-4 text-base font-inter">
              <li className="flex items-start gap-3 text-foreground/90">
                <LuPhone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span>
                  <a
                    href={formatGhPhone(siteConfig.phone).href}
                    className="hover:underline underline-offset-3"
                  >
                    {formatGhPhone(siteConfig.phone).display}
                  </a>
                  {" / "}
                  <a
                    href={formatGhPhone(siteConfig.whatsapp).href}
                    className="hover:underline underline-offset-3"
                  >
                    {formatGhPhone(siteConfig.whatsapp).display}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3 text-foreground/70">
                <LuMail className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:underline underline-offset-3"
                >
                  {siteConfig.email}
                </a>
              </li>
              <Link
                href="https://maps.app.goo.gl/aKyiTKn95ta1YupU9"
                target="_blank"
                className="flex items-start gap-3 text-foreground/70 hover:underline underline-offset-3"
              >
                <LuMapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span>{siteConfig.address}</span>
              </Link>
            </ul>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="relative mt-8 flex flex-col items-center justify-between gap-4 pt-4 md:flex-row">
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} GGP Images. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-foreground/60 transition-colors hover:text-secondary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-foreground/60 transition-colors hover:text-secondary"
            >
              Terms &amp; Conditions
            </Link>
          </div>
          <Link
            href="https://umeh.vercel.app"
            className="text-foreground/70 text-sm transition-colors hover:text-secondary"
          >
            Built by DUBEM
          </Link>
        </div>
      </div>
    </footer>
  );
}
