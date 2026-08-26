"use client";

import { LuInfo } from "react-icons/lu";
import { Reveal, BG_GLOW_DARK } from "@/components/ui/motion-kit";
import { ArrowCta } from "@/components/ui/motion-kit";

export function FinalQuoteCta() {
  return (
    <section className="px-5 pb-24 pt-4 md:px-10 bg-secondary">
      <Reveal className="mx-auto w-[min(100%,76rem)]">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-tertiary px-8 py-14 text-center md:px-16 md:py-20">
          <div className={BG_GLOW_DARK} />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-4xl">
              What will your job cost? Honestly — it depends.
            </h2>
            <p className="text-base leading-relaxed text-white/70">
              Material, quantity, finishing and turnaround all move the
              price, so we don&apos;t quote off a price list — we quote off
              your actual job. Tell us what you need and we&apos;ll come
              back with a number you can trust.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              <ArrowCta
                label="Request a Free Quote"
                as="link"
                href="/contact"
                className="bg-secondary hover:bg-secondary/90 tracking-wide"
              />
              <div className="glass-panel flex items-center gap-2 rounded-full tracking-wide border border-white/20 px-5 py-3 text-xs text-white">
                <LuInfo className="h-3.5 w-3.5" />
                No obligation, ever.
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}