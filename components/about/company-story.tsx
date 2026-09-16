import Image from "next/image";
import { ArrowCta } from "../ui/motion-kit";

export function CompanyStory() {
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="group relative h-125 w-full overflow-hidden rounded-2xl border border-card/20 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl7ZT8Ir52GOAkBUW5tdKiDxoIXApKQhm995RuWupMjrm7_ty_lYuc0LZcaGu5RrHfB1rMMVPkZhzUyvWnVsyoIY15pxE1j1tDcBf61qXzZFJKTVzYgWTjNtSC49e-WTQ2HPIx5tVFJAqqaMwO9zN4RnDlP2uaZuVk_QceWxF0eE27aXxme2FAA0PNSw_IubrUy06s0kSpf1M3nrPEmxynAXjUW3RS2ERUVSyGtyVwsA3pje4u7XZ_Ug"
              alt="Modern industrial printing facility"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 p-2 rounded-2xl bg-brand-tertiary"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="mb-2 text-2xl font-semibold font-manrope">Innovation meets Tradition</div>
              <div className="text-white/90 font-inter">Crafting visual identities since 2010.</div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-manrope tracking-wide text-brand-tertiary md:text-4xl">
              A Decade of Visual Excellence
            </h2>
            <div className="space-y-6 bg-brand-tertiary/80 p-4 rounded-2xl font-inter">
              <p className="text-card tracking-wider font-normal leading-8">
                Founded on the belief that physical touchpoints matter more than ever in a digital
                world, GGP Images started as a small boutique print shop. Today, we stand as a
                comprehensive branding powerhouse, seamlessly blending high-end creative agency
                aesthetics with industrial precision.
              </p>
              <p className="text-card tracking-wider font-normal leading-8">
                Our state-of-the-art facility is equipped with the latest in print technology,
                allowing us to deliver everything from intricate business stationery to massive
                environmental graphics. We don&apos;t just print; we engineer tangible brand
                experiences that command attention and drive connection.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
              <div>
                <div className="mb-1 text-3xl font-bold font-manrope text-brand-tertiary">500+</div>
                <div className="text-sm font-inter text-card tracking-widest font-semibold">Brands Trusted</div>
              </div>
              <div>
                <div className="mb-1 text-3xl font-bold font-manrope text-brand-tertiary">1M+</div>
                <div className="text-sm font-inter text-card tracking-widest font-semibold">Prints Delivered</div>
              </div>
            </div>
            <ArrowCta as="link" label="View Our Work" href="/gallery" className="tracking-wide bg-brand-tertiary hover:bg-brand-tertiary/80" />
          </div>
        </div>
      </div>
    </section>
  );
}
