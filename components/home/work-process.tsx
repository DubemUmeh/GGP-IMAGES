"use client";

import { LuMessageSquare, LuPencilRuler, LuPrinter, LuTruck } from "react-icons/lu";
import { Reveal, BG_GLOW_LIGHT } from "@/components/ui/motion-kit";

const steps = [
  {
    icon: LuMessageSquare,
    title: "Tell Us What You Need",
    desc: "Send your idea, quantity and deadline — by call, WhatsApp or the quote form.",
  },
  {
    icon: LuPencilRuler,
    title: "Design & Proof",
    desc: "We mock up the design (or refine yours) and send a proof before anything is printed.",
  },
  {
    icon: LuPrinter,
    title: "Production",
    desc: "Once approved, your job goes into production using the right technique for the material.",
  },
  {
    icon: LuTruck,
    title: "Delivery & Support",
    desc: "Pick up in-house or have it delivered — with support after the job is done.",
  },
];

export function WorkProcess() {
  return (
    <section className="relative bg-secondary px-5 py-20 md:px-10 md:py-28">
      <div className={BG_GLOW_LIGHT} />
      <div className="mx-auto w-[min(100%,76rem)]">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
            How It Works
          </div>
        </Reveal>
        <Reveal delay={0.08} className="mt-6 max-w-xl">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
            From idea to finished print, in four steps.
          </h2>
        </Reveal>

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-border lg:block" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.08} className="relative flex flex-col gap-4 border border-white/50 rounded-2xl bg-brand-tertiary z-50! p-4">
                <div className="orange-glow relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-secondary font-bold">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-popover">0{i + 1}.</span>
                  <h3 className="font-semibold text-card tracking-wide">{s.title}</h3>
                </div>
                <p className="text-sm tracking-wide leading-relaxed text-card/80">{s.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}