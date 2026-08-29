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
    <section className="relative bg-brand-tertiary px-5 py-20 md:px-10 md:py-28">
      <div className={BG_GLOW_LIGHT} />
      <div className="mx-auto w-[min(100%,76rem)]">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-secondary shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            How It Works
          </div>
        </Reveal>
        <Reveal delay={0.08} className="mt-6 max-w-xl">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-card md:text-5xl">
            From idea to finished print, in four steps.
          </h2>
        </Reveal>

        <div className="relative mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="group relative flex h-full flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-secondary hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl font-black text-secondary/40 group-hover:text-secondary transition-colors">
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold tracking-wide text-card">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-card/75">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}