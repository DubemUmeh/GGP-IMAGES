import Link from "next/link";
import { LuMail, LuPhone, LuMapPin } from "react-icons/lu";
import { Reveal } from "@/components/ui/motion-kit";
import { FaInstagram, FaTiktok, FaFacebook, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Booking", href: "/booking" },
];

const socials = [
  { label: "Instagram", href: "#", icon: FaInstagram },
  { label: "FaceBook", href: "#", icon: FaFacebook },
  { label: "LinkedIn", href: "#", icon: FaLinkedin },
  { label: "Tiktok", href: "#", icon: FaTiktok },
];

export function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-brand-tertiary py-20">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-secondary/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-purple-fixed-dim/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 px-6">
        <Reveal className="space-y-0">
          <div className="w-full h-full">
            <Image src='/ggp-no-bg.png' alt="GGP Image Logo" priority width={250} height={50} className="drop-shadow-2xl drop-shadow-card" />
          </div>
          <p className="max-w-xs md:relative md:left-0 md:-top-10 text-base leading-relaxed tracking-wider text-white/70">
            Premium printing and branding solutions that make your business unforgettable.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h4 className="my-10 md:my-0 md:mb-5 text-sm font-semibold uppercase tracking-widest text-card/70 font-manrope">
            Quick Links
          </h4>
          <ul className="space-y-3 font-inter">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center text-card/90 transition-colors duration-200 hover:text-secondary"
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-1 tracking-wide font-semibold">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-card/70 font-manrope">
            Contact Us
          </h4>
          <ul className="space-y-4 text-base font-inter">
            <li className="flex items-start gap-3 text-card/90">
              <LuPhone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <a href="tel:+233548844321" className="hover:underline underline-offset-3">+233 (54) 884 4321</a>
            </li>
            <li className="flex items-start gap-3 text-card/70">
              <LuMail className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <a href="mailto:hello@ggpimages.com" className="hover:underline underline-offset-3">hello@ggpimages.com</a>
            </li>
            <Link href='https://maps.app.goo.gl/aKyiTKn95ta1YupU9' target="_blank" className="flex items-start gap-3 text-white/70 hover:underline underline-offset-3">
              <LuMapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <span>
                ZEN Filling Station via Apremdo New Market, off Apllo,
                <br />
                Anaji Rd, Takoradi
              </span>
            </Link>
          </ul>
        </Reveal>

        <Reveal delay={0.18}>
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-card/70 font-manrope">
            Socials
          </h4>
          <div className="flex gap-3">
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
      </div>

      <div className="relative mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 px-6 pt-8 md:flex-row">
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} GGP Images. All rights reserved.
        </p>
        <Link href='https://umeh.vercel.app' className="text-card/70 text-sm transition-colors hover:text-card">Built by DUBEM</Link>
        {/* <div className="flex gap-6 text-sm">
          <Link href="/privacy" className="text-white/50 transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-white/50 transition-colors hover:text-white">
            Terms &amp; Conditions
          </Link>
        </div> */}
      </div>
    </footer>
  );
}