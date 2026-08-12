"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["All Projects", "Commercial", "Packaging", "Textiles", "Large Format"];

interface GalleryHeroProps {
  onFilterChange?: (category: string) => void;
}

export function GalleryHero({ onFilterChange }: GalleryHeroProps) {
  const [active, setActive] = useState(categories[0]);

  const handleClick = (category: string) => {
    setActive(category);
    onFilterChange?.(category);
  };

  return (
    <section className="relative w-full h-full py-5 bg-secondary overflow-hidden p-3">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-b-[40px] bg-brand-tertiary bg-gradient-hero px-5 py-16 text-center md:rounded-[80px] md:px-10 md:py-24">
        <div className="relative z-10 mx-auto max-w-4xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <span className="text-sm font-semibold tracking-wide text-muted-foreground">
              Our Portfolio
            </span>
          </span>

          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-card md:text-6xl">
            Showcasing <span className="text-secondary">Excellence</span> in Print &amp; Branding
          </h1>

          <p className="mx-auto mb-0 max-w-2xl text-lg text-popover">
            Explore our curated gallery of premium printing, high-end packaging, and tactile
            branding solutions crafted for industry leaders.
          </p>

          {/* <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleClick(category)}
                className={cn(
                  "rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1",
                  active === category
                    ? "bg-secondary text-secondary-foreground shadow-[0_10px_30px_rgba(253,139,0,0.3)]"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div> */}
        </div>

        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-orange-fixed opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-purple-fixed opacity-20 blur-3xl" />
      </div>
    </section>
  );
}