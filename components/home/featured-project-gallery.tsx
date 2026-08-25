"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/motion-kit";

// Swap these src paths for real project photos dropped into
// /public/gallery/. `w` is each card's fixed pixel width in the row —
// vary it for visual rhythm since height is now uniform per row.
const projects = [
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC2rDcBo73fufWUC-RSnadH99KydVMA1USymiYU-2ei53SHBQB7hN06sicsV_1cjyGYpaucanM2MvDbS9mbKRGnmAX0FFndYKo_46f92_9-cgI1nYxVnKtjT44LVhvSPQrueU8ilCayEsfkmF49h0ayOoMdDn7D8TwNdEW-Nm1lIIQ--5Wud1fQfZCYS86eFzZlsKY9kYrvPYz6qGMHD3WDiDNZCPkeNqCTKIDLBGn6EbxjO2ih5V0Ew", title: "Church Anniversary Cloth", tag: "Textile Printing", w: 320 },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC2rDcBo73fufWUC-RSnadH99KydVMA1USymiYU-2ei53SHBQB7hN06sicsV_1cjyGYpaucanM2MvDbS9mbKRGnmAX0FFndYKo_46f92_9-cgI1nYxVnKtjT44LVhvSPQrueU8ilCayEsfkmF49h0ayOoMdDn7D8TwNdEW-Nm1lIIQ--5Wud1fQfZCYS86eFzZlsKY9kYrvPYz6qGMHD3WDiDNZCPkeNqCTKIDLBGn6EbxjO2ih5V0Ew", title: "Site Scaffold Wrap", tag: "Scaffold Wraps for Construction", w: 380 },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNPJCybz6G9KmRvcl9pMTKxnPQmURCDugwWv43NlVzbInJgNCtqMwfH-0fRMxHWyDJCrx9YuJUyVe_jhEn6qB40aoWwogFgAJ1Dx48xgUiZQRxtn36BMUc_j7JVo8MPC4gK0r74TC2fE6HlUDvsvOksBrw-UweDN_L0k4u7pl9K9Rys0voTWxo6uOpa9Cjhs-axoo_hUp8o8pfkrIll864KnXxEEyPDA6HWzI5lGdMng19CpzGY7So6Q", title: "Event T-Shirts", tag: "T-Shirt Printing", w: 280 },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAvHD8pq0Y6eo-MtrvV9f5xoPRwQ0R8GWTf2FhVh-6zze_D-sL8I8VtGqoxkq_bxWmEB3CTo4-nH0vz5nu3ga9Trmd3_XPgkytQ6gjQYE3qNUdn4sivIYpY-ZUf96kdiIAL3OyQbkpAAUmllnYBKXJcjJmWXjAGsrXR-9ePAig1zZzGX5nKmqaqrnVhCWRP_asfi7DlcurGdvNt5fmHz5aasNbdoSiRvkWq-vEXZHazwxBBNnoJTISng", title: "Billboard Campaign", tag: "Large Format", w: 360 },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC2rDcBo73fufWUC-RSnadH99KydVMA1USymiYU-2ei53SHBQB7hN06sicsV_1cjyGYpaucanM2MvDbS9mbKRGnmAX0FFndYKo_46f92_9-cgI1nYxVnKtjT44LVhvSPQrueU8ilCayEsfkmF49h0ayOoMdDn7D8TwNdEW-Nm1lIIQ--5Wud1fQfZCYS86eFzZlsKY9kYrvPYz6qGMHD3WDiDNZCPkeNqCTKIDLBGn6EbxjO2ih5V0Ew", title: "Staff ID Cards", tag: "ID Cards", w: 260 },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAvHD8pq0Y6eo-MtrvV9f5xoPRwQ0R8GWTf2FhVh-6zze_D-sL8I8VtGqoxkq_bxWmEB3CTo4-nH0vz5nu3ga9Trmd3_XPgkytQ6gjQYE3qNUdn4sivIYpY-ZUf96kdiIAL3OyQbkpAAUmllnYBKXJcjJmWXjAGsrXR-9ePAig1zZzGX5nKmqaqrnVhCWRP_asfi7DlcurGdvNt5fmHz5aasNbdoSiRvkWq-vEXZHazwxBBNnoJTISng", title: "Wedding Invitations", tag: "Invitations", w: 340 },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeHy3BHxmYyLFFuy2d6Kj_O1Fg1VvUynPb4v00lCZ8nsiXhkthXcxa0NI4_eURfhhgItfdjui7oCjECXDsS0bDE-vv3BcYXwPk0Ir6eshwt-ejKwQZ4HYtR4JOj4VP5BOhzM5D-4vCzcUtNwWqNPPk-dWFggCza_yhwEZNEiy86lj9Q8hiHZVpxarbFiXSKacESqTpbgaP85VXJEZm9ypilGVgiPSSLW-B9Cn79E6acn3PBOwQPR04LA", title: "Corporate Branding", tag: "Logo & Branding", w: 300 },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQssnGCPoH-A85bNVnHldMUKJyQNFkWStNsMcXuNPZZuXdH9wh6oCvURzACi35xzkMIGsQ50B040jcaMGGjHYxt9hfQrHxM8f5lQ_9JW_F7ajSzTRpoC13OQ1vBSxHOSEZF7YfiVWXX1h0SXREmmsTOy3igLmIVsMvX0GcbK62QdUzfIrC9r_jZRx0J5HTqS1IMU1Hbba5FMOW551SZBN1nP585Ev2UgTsXFiFGwMpJQn7GrcKC65HxA", title: "Custom Packaging", tag: "Packaging & Labels", w: 360 },
];

// Two independent rows so each can scroll its own direction and pause
// on its own hover, without affecting the other row.
const rowTop = projects.slice(0, 4);
const rowBottom = projects.slice(4, 8);

function MarqueeCard({ p }: { p: (typeof projects)[number] }) {
  return (
    <div
      className="group/card relative h-56 flex-none overflow-hidden border-2 border-white/30 rounded-2xl sm:h-64"

      style={{ width: p.w }}
    >
      <Image
        src={p.src}
        alt={p.title}
        fill
        sizes="400px"
        className="object-cover transition-transform duration-500 group-hover/card:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/40 transition-opacity duration-300 opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-4 transition-all duration-300 translate-y-0 opacity-100">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
          {p.tag}
        </p>
        <p className="mt-1 text-sm font-semibold tracking-wide text-white">{p.title}</p>
      </div>
    </div>
  );
}

export function FeaturedProjectsGallery() {
  return (
    // bg-foreground is the token that actually resolves to #191c1d in
    // globals.css (bg-muted-foreground was #4a454f) — every text/border
    // color below is flipped to the `background` token so it reads on
    // top of it, instead of the light-section colors the section
    // originally had.
    <section className="relative overflow-hidden bg-brand-tertiary py-20 md:py-28">
      {/* Scoped keyframes for the two marquee rows. Kept local to this
          component (rather than added to globals.css) so no shared
          tokens/config files need to change. */}
      <style>{`
        @keyframes ggp-marquee-ltr {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @keyframes ggp-marquee-rtl {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ggp-marquee-ltr { animation: ggp-marquee-ltr 36s linear infinite; }
        .ggp-marquee-rtl { animation: ggp-marquee-rtl 42s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ggp-marquee-ltr, .ggp-marquee-rtl { animation: none; }
        }
      `}</style>

      <div className="mx-auto w-[min(100%,85rem)]">
        <div className="flex flex-wrap px-3 md:px-10 items-end justify-between gap-6 pl-3">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-background/15 bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-background/70">
                Our Work
              </div>
            </Reveal>
            <Reveal delay={0.08} className="mt-6 max-w-xl">
              <h2 className="text-3xl font-extrabold leading-tight tracking-wide text-background md:text-5xl">
                A few things we&apos;ve printed lately.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-sm md:max-w-md 2xl:max-w-lg text-sm lg:text-lg tracking-wider leading-relaxed text-background/80">
              A small slice of recent work across textile, large format and
              branding jobs — every job below started as a quote request.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mt-12 flex flex-col gap-6 bg-secondary p-5">
          {/* Row 1 — scrolls left to right, pauses only when this row is hovered */}
          <div className="group/row-a relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_1%,black_99%,transparent)]">
            <div className="ggp-marquee-ltr flex w-max gap-6 group-hover/row-a:paused">
              {[...rowTop, ...rowTop].map((p, i) => (
                <MarqueeCard key={`${p.title}-a-${i}`} p={p} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right to left, pauses independently on its own hover */}
          <div className="group/row-b relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_1%,black_99%,transparent)]">
            <div className="ggp-marquee-rtl flex w-max gap-6 group-hover/row-b:paused">
              {[...rowBottom, ...rowBottom].map((p, i) => (
                <MarqueeCard key={`${p.title}-b-${i}`} p={p} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}