"use client";

import {
  LuLayoutGrid,
  LuTimer,
  LuTruck,
  LuBadgeCheck,
  LuWallet,
  LuHeadset,
} from "react-icons/lu";
import { Reveal } from "@/components/ui/motion-kit";

const reasons = [
  {
    icon: LuLayoutGrid,
    title: "One-Stop Shop",
    desc: "Textile, large format, digital and finishing — no juggling multiple vendors.",
  },
  {
    icon: LuTimer,
    title: "Fast Turnaround",
    desc: "Clear timelines from the first proof, with rush options for urgent jobs.",
  },
  {
    icon: LuTruck,
    title: "Ghana-Wide Delivery",
    desc: "Pick up in-house or have your job delivered wherever you're based.",
  },
  {
    icon: LuBadgeCheck,
    title: "Quality You Can Trust",
    desc: "Every job is proofed and checked before it leaves the shop.",
  },
  {
    icon: LuWallet,
    title: "Fair, Transparent Pricing",
    desc: "You'll always know what a job costs before we start it.",
  },
  {
    icon: LuHeadset,
    title: "Support After The Sale",
    desc: "Questions or reprints — we're a call or WhatsApp message away.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative bg-popover px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-[min(100%,76rem)]">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold font-manrope uppercase tracking-widest text-muted-foreground shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
            Why GGP
          </div>
        </Reveal>
        <Reveal delay={0.08} className="mt-6 max-w-xl">
          <h2 className="text-3xl font-extrabold font-manrope leading-tight tracking-tight text-foreground md:text-5xl">
            Why businesses keep coming back.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={(i % 3) * 0.06}>
                <div className="card-shadow flex h-full flex-col gap-3 rounded-2xl bg-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-brand-purple-fixed/60 text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-semibold font-manrope text-card-foreground">{r.title}</h3>
                  <p className="text-sm font-inter leading-relaxed text-muted-foreground">{r.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}