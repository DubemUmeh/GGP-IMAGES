"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LuShirt,
  LuBuilding2,
  LuLayers,
  LuImage,
  LuPenTool,
} from "react-icons/lu";
import { Reveal, BG_GLOW_LIGHT } from "@/components/ui/motion-kit";
import { coreServices } from "@/lib/services";

const serviceIcons = [LuLayers, LuShirt, LuPenTool, LuImage, LuBuilding2, LuPenTool];


export function ServiceHighlights() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length || !stageRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          pin: true,
          pinSpacing: true,
          start: "top 20%",
          end: `+=${cards.length * 450}`,
          scrub: 1,
        },
      });

      // first card is simply present
      tl.set(cards[0], { yPercent: 0, opacity: 1, scale: 1 });

      for (let i = 1; i < cards.length; i++) {
        // settle the card that's about to be covered — scale/lift only, stays fully opaque
        tl.to(
          cards[i - 1],
          { scale: 0.94, yPercent: -3, duration: 1 },
          i === 1 ? undefined : "<"
        );
        // bring the next card in
        tl.from(cards[i], { yPercent: 70, opacity: 0, duration: 1 }, "<");
        tl.to(cards[i], { yPercent: 0, opacity: 1, duration: 1 });
      }
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-[linear-gradient(40deg,#6b004d_0%,#6b004d_67%,#6b004d_100%)] px-5 py-15 md:px-10 md:py-20 lg:py-28">
      <div className={BG_GLOW_LIGHT} />
      <div className="mx-auto w-[min(100%,76rem)]">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-2 text-xs font-semibold font-manrope uppercase tracking-widest text-secondary shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            What We Do
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-6 max-w-2xl">
          <h2 className="text-3xl font-extrabold font-manrope leading-tight tracking-tight text-brand-tertiary-foreground md:text-5xl">
            Every printing need, handled{" "}
            <span className="text-secondary">under one roof.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14} className="mt-4 max-w-xl">
          <p className="text-base font-inter leading-relaxed text-brand-tertiary-foreground/70">
            From a single business card to a full site of scaffold wraps —
            our workshop covers textile, large format, digital and
            finishing work end to end.
          </p>
        </Reveal>
      </div>

      {/* Pinned stacking-card stage */}
      <div
        ref={stageRef}
        className="relative mt-14 mx-auto my-auto flex h-[50dvh] w-full items-center justify-center"
      >
        {coreServices.map((s, i) => {
          const Icon = serviceIcons[i] ?? LuLayers;
          return (
            <div
              key={s.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{ top: `${i * 10}px`, zIndex: i + 1, opacity: 10 }}
              className="absolute inset-x-0 mx-auto w-full flex max-w-[80vw] flex-col items-start justify-center gap-6 rounded-[2.5rem] bg-secondary p-10 shadow-[0_0_50px_rgba(0,0,0,0.3)] md:p-16"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-secondary">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="text-2xl tracking-widest font-bold font-manrope text-card md:text-4xl">
                {s.name}
              </h3>
              <p className="max-w-md text-sm lg:text-lg font-inter tracking-wide leading-relaxed text-card/80 md:text-base">
                {s.shortDescription}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}