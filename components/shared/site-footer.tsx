import Link from "next/link";
import { LuMail, LuPhone, LuMapPin } from "react-icons/lu";
import { Reveal } from "@/components/ui/motion-kit";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import Image from "next/image";
import { siteConfig } from "@/lib/seo";

const serviceColumns = [
  {
    heading: "Large Format Printing",
    href: "/services/large-format-printing",
    links: [
      { label: "Banners", href: "/services/large-format-printing/banners" },
      { label: "Billboards", href: "/services/large-format-printing/billboards" },
      { label: "Backdrops", href: "/services/large-format-printing/backdrops" },
      { label: "Roll-up Banners", href: "/services/large-format-printing/roll-up-banners" },
    ],
  },
  {
    heading: "Textile Printing",
    href: "/services/textile-printing",
    links: [
      { label: "T-Shirt Printing", href: "/services/textile-printing/t-shirt-printing" },
      { label: "DTF Printing", href: "/services/textile-printing/dtf-printing" },
      { label: "UV DTF Printing", href: "/services/textile-printing/uv-dtf-printing" },
      { label: "School Uniform Printing", href: "/services/textile-printing/school-uniform-printing" },
    ],
  },
  {
    heading: "Embroidery",
    href: "/services/embroidery",
    links: [
      { label: "Polo Shirt Embroidery", href: "/services/embroidery/polo-shirt-embroidery" },
      { label: "Corporate Uniform Embroidery", href: "/services/embroidery/corporate-uniform-embroidery" },
      { label: "School Uniform Embroidery", href: "/services/embroidery/school-uniform-embroidery" },
      { label: "Jacket Embroidery", href: "/services/embroidery/jacket-embroidery" },
    ],
  },
  {
    heading: "Digital Printing",
    href: "/services/digital-printing",
    links: [
      { label: "ID Cards & Access Cards", href: "/services/digital-printing/id-cards-and-access-cards" },
      { label: "Invitation Cards", href: "/services/digital-printing/invitation-cards" },
      { label: "Certificate & Testimonials", href: "/services/digital-printing/certificate-and-testimonials" },
      { label: "Business Cards", href: "/services/digital-printing/business-cards" },
    ],
  },
  {
    heading: "Branding",
    href: "/services/branding",
    links: [
      { label: "Corporate Branding", href: "/services/branding/corporate-branding" },
      { label: "Logo Design & Brand Identity", href: "/services/branding/logo-design-and-brand-identity" },
      { label: "Business Rebranding", href: "/services/branding/business-rebranding" },
      { label: "Packaging Branding", href: "/services/branding/packaging-branding" },
    ],
  },
  {
    heading: "Visual Production",
    href: "/services/visual-production",
    links: [
      { label: "Graphic Design", href: "/services/visual-production/graphic-design" },
      { label: "Social Media Designs", href: "/services/visual-production/social-media-designs" },
      { label: "Website Design & Development", href: "/services/visual-production/website-design-and-development" },
      { label: "Digital Marketing", href: "/services/visual-production/digital-marketing" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: `${siteConfig.instagram}`, icon: FaInstagram },
  { label: "FaceBook", href: `${siteConfig.facebook}`, icon: FaFacebook },
  { label: "Tiktok", href: `${siteConfig.tiktok}`, icon: FaTiktok },
];

export function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-brand-tertiary py-20">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-secondary/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-purple-fixed-dim/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Top block: brand + service columns + contact, grid layout like Bechar footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand + tagline (untouched) */}
          <Reveal className="md:col-span-3 space-y-0">
            <div className="w-full h-full">
              <Image
                src="/ggp-no-bg.png"
                alt="GGP Image Logo"
                priority
                width={250}
                height={50}
                className="drop-shadow-2xl drop-shadow-card"
              />
            </div>
            <p className="max-w-xs md:relative md:left-0 md:-top-10 text-base leading-relaxed tracking-wider text-white/70">
              Premium printing and branding solutions that make your business
              unforgettable.
            </p>
            <div className="flex items-center gap-3 md:relative md:left-0 md:-top-6">
              {socials.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Service columns with subdivisions */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 font-inter">
            {serviceColumns.map((col, i) => (
              <Reveal key={col.heading} delay={0.04 * (i + 1)} className="flex flex-col gap-3">
                <Link
                  href={col.href}
                  className="text-sm font-semibold uppercase tracking-widest text-card/70 font-manrope hover:text-secondary transition-colors"
                >
                  {col.heading}
                </Link>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-sm text-card/90 transition-colors duration-200 hover:text-secondary"
                      >
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
          <Reveal delay={0.18} className="md:col-span-3">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-card/70 font-manrope">
              Contact Us
            </h4>
            <ul className="space-y-4 text-base font-inter">
              <li className="flex items-start gap-3 text-card/90">
                <LuPhone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:underline underline-offset-3"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-card/70">
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
                className="flex items-start gap-3 text-white/70 hover:underline underline-offset-3"
              >
                <LuMapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span>{siteConfig.address}</span>
              </Link>
            </ul>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="relative mt-8 flex flex-col items-center justify-between gap-4 pt-4 md:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} GGP Images. All rights reserved.
          </p>
          <Link
            href="https://umeh.vercel.app"
            className="text-card/70 text-sm transition-colors hover:text-card"
          >
            Built by <span className='font-semibold'>DUBEM</span>
          </Link>
          {/* <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-white/50 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/50 transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}