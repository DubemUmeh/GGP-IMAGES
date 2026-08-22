// app/not-found.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LuPrinter, LuGhost, LuArrowUpRight } from "react-icons/lu";
import { ArrowCta } from "@/components/ui/motion-kit";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative min-h-screen w-full bg-secondary p-3 py-5">
      <div className="relative mx-auto max-h-none w-full max-w-7xl overflow-hidden rounded-b-[40px] bg-brand-tertiary bg-gradient-hero md:rounded-[80px]">
        {/* halftone dot texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="pointer-events-none absolute right-10 top-1/4 h-64 w-64 animate-pulse rounded-full bg-brand-orange-fixed opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-72 w-72 rounded-full bg-brand-purple-fixed opacity-30 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center px-5 py-20 text-center lg:px-10 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: -10, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm"
          >
            <LuPrinter className="h-3.5 w-3.5 text-secondary" />
            <span className="text-sm font-semibold tracking-wide text-muted-foreground">
              Print Job Failed
            </span>
          </motion.div>

          {/* misregistered 404 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative select-none text-[6rem] font-black leading-none tracking-tight text-card sm:text-[9rem] md:text-[11rem]"
          >
            <span
              aria-hidden
              className="absolute inset-0 text-brand-orange-fixed mix-blend-screen"
              style={{ transform: "translate(5px, -4px)" }}
            >
              404
            </span>
            <span
              aria-hidden
              className="absolute inset-0 text-brand-purple-fixed mix-blend-screen"
              style={{ transform: "translate(-5px, 4px)" }}
            >
              404
            </span>
            <span className="relative">404</span>
          </motion.h1>

          <h2 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-card md:text-4xl">
            This page didn&apos;t come off the press.
          </h2>
          <p className="mb-8 mt-4 max-w-lg text-lg text-popover">
            The page you&apos;re looking for got lost somewhere between the design file
            and the final print. Let&apos;s get you back on track.
          </p>

          <ArrowCta
            as="link"
            label="Back to Home"
            href="/"
            className="w-fit bg-white/90 text-secondary hover:bg-white"
          />

          {/* quick links */}
          <div className="mt-16 w-full max-w-3xl rounded-[32px] bg-white/10 p-6 text-left backdrop-blur-sm md:p-8">
            <div className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-popover">
              <LuGhost className="h-4 w-4" />
              Where you might have meant to go
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {quickLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-card transition-colors hover:bg-secondary hover:text-primary"
                  >
                    {link.label}
                    <LuArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}