"use client";

import { LuPencilRuler, LuLightbulb, LuUsers, LuAward } from "react-icons/lu";
import { Reveal } from "@/components/ui/motion-kit";

const values = [
  {
    icon: LuPencilRuler,
    title: "Design",
    description: "Creative innovation and design that drives brand solutions.",
    chipBg: "bg-brand-purple-fixed group-hover:bg-primary",
    chipFg: "text-primary group-hover:text-primary-foreground",
  },
  {
    icon: LuLightbulb,
    title: "Innovation",
    description: "Forward-thinking methods to improve customer front branding.",
    chipBg: "bg-brand-purple-fixed group-hover:bg-primary",
    chipFg: "text-primary group-hover:text-primary-foreground",
  },
  {
    icon: LuUsers,
    title: "Customer Focus",
    description: "Customized solutions tailored entirely with customer focus.",
    chipBg: "bg-brand-purple-fixed group-hover:bg-primary",
    chipFg: "text-primary group-hover:text-primary-foreground",
  },
  {
    icon: LuAward,
    title: "Excellence",
    description: "Unmatched dedication to print excellence and execution.",
    chipBg: "bg-brand-purple-fixed group-hover:bg-primary",
    chipFg: "text-primary group-hover:text-primary-foreground",
  },
];

export function CoreValues() {
  return (
    <section className="relative w-full bg-brand-tertiary py-10">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-card">
            What Drives Us
          </div>
          <h2 className="text-3xl font-bold text-card tracking-wider md:text-4xl">Our Core Values</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description, chipBg, chipFg }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="card-shadow group flex h-full flex-col items-center gap-4 rounded-3xl bg-secondary p-8 text-center transition-transform duration-300 hover:-translate-y-1.5">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300 ${chipBg} ${chipFg}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-card tracking-wide">{title}</h3>
                  <p className="text-sm leading-relaxed text-popover tracking-card/80">{description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}