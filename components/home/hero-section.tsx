"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { LuStar } from "react-icons/lu";
import { ArrowCta } from "../ui/motion-kit";

// Headline is split per-word so each word can be masked and revealed
// individually — this recreates the GSAP `yPercent` reveal from
// MaybeHero using framer-motion instead, since that's what this repo
// already ships (see the "use client" + `motion` import above).
const HEADLINE: { text: string; gradient?: boolean }[] = [
  { text: "Print. Brand" }, 
  { text: "&" },
  { text: "Branding", gradient: true },
];

const badges = ["1,000+ Happy Clients", "500+ Brands Helped", "5-Star Rated Service"];

const wordContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.35 },
  },
};

const wordItem: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay } },
});

export function HeroSection() {
  return (
    // possible_hero's idea: the hero is a framed card, not an edge-to-edge
    // section — a slim 10-30px gutter of the page background shows around it.
    <section className="w-full bg-secondary p-2.5 sm:p-5">
      <div className="relative max-h-[85dvh] w-full overflow-hidden rounded-[2rem] border border-white/30 shadow-2xl">
        {/* MaybeHero's full-bleed background image, filling the card */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-image.webp"
            alt="Industrial printing press in operation"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          {/* HeroSection's primary/secondary color theme standing in for
              MaybeHero's foreground-based scrim */}
          <div className="absolute inset-0 bg-linear-to-r from-gray-900/90 via-gray-900/25 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/10 to-transparent" />
        </div>

        {/* Ambient brand glows, carried over from HeroSection */}
        <div className="pointer-events-none absolute right-0 top-0 h-150 w-150 -translate-y-1/3 translate-x-1/3 rounded-full bg-gray-900 opacity-30 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 -translate-x-1/4 translate-y-1/3 rounded-full bg-brand-purple-fixed-dim/10 opacity-10 blur-[20px]" />

        {/* Content, positioned like MaybeHero's left-aligned copy block */}
        <div className="relative z-10 flex h-full max-h-[85dvh] items-center px-6 py-16 md:px-10 lg:px-10">
          <div className="max-w-2xl">
            <motion.h1
              initial="hidden"
              animate="show"
              variants={wordContainer}
              className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-primary-foreground md:text-7xl"
            >
              {HEADLINE.map((word, i) => (
                <span key={i} className="mr-4 inline-block overflow-hidden align-top">
                  <motion.span
                    variants={wordItem}
                    className={
                      word.gradient
                        ? "inline-block bg-gradient-sunrise bg-clip-text text-transparent will-change-transform"
                        : "inline-block will-change-transform"
                    }
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp(0.9)}
              className="mb-8 max-w-lg text-lg leading-relaxed text-white/90"
            >
              Transforming brands and supporting startups from scratch with high-end, precise
              printing solutions.
              <br/>
              All your Printing Solution are right here.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp(1.05)}
              className="mb-10 flex flex-wrap items-center gap-4"
            >
              {/* <Button
                size="lg"
                className="orange-glow rounded-xl bg-secondary px-8 py-6 text-secondary-foreground transition-transform duration-300 hover:-translate-y-1 hover:bg-secondary/90"
              >
                <a href="#services" className="flex items-center gap-2">
                  Explore Services
                  <LuArrowRight className="h-4 w-4" />
                </a>
              </Button> */}
              <ArrowCta label="Explore Services" as="link" href="/services" className="bg-secondary hover:bg-secondary/90 hover:transition-colors hover:duration-150" />

              <div className="glass-panel flex cursor-pointer items-center gap-4 rounded-full border border-white/40 p-3 transition-colors hover:border-secondary">
                <div className="flex -space-x-2">
                  <div className="z-30 h-8 w-8 rounded-full border-2 border-primary bg-brand-purple-fixed" />
                  <div className="z-20 h-8 w-8 rounded-full border-2 border-primary bg-brand-orange-fixed" />
                  <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-brand-purple-fixed-dim text-xs font-bold text-primary">
                    +1k``
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-secondary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <LuStar key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-800 font-semibold mt-0.5">Happy Clients</span>
                </div>
              </div>
            </motion.div>

            {/* MaybeHero's small uppercase badge row */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp(1.2)}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {badges.map((b) => (
                <span
                  key={b}
                  className="text-[10px] font-semibold uppercase tracking-widest text-white/60"
                >
                  {b}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating stat card, from HeroSection's bottom-right card */}
        {/* <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }}
          className="card-shadow absolute bottom-10 right-6 z-20 hidden flex-col gap-1 rounded-xl bg-card p-4 text-card-foreground md:right-16 md:flex"
        >
          <p className="text-2xl font-bold text-primary">100k+</p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Brands Helped</p>
        </motion.div> */}

        {/* Floating badge, from HeroSection's top-left card, moved to
            top-right so it clears the copy block in this layout */}
        {/* <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.1 }}
          className="card-shadow absolute right-8 top-8 z-20 hidden items-center gap-3 rounded-xl bg-card p-4 text-card-foreground md:right-16 md:flex"
        >
          <div className="rounded-lg bg-brand-purple-fixed p-2 text-primary">
            <LuPenTool className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Top Tier</p>
            <p className="text-sm font-bold">Logo Design</p>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}