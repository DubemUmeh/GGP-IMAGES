export function GalleryHero() {
  return (
    <section className="relative w-full bg-brand-tertiary px-5 py-16 text-center md:px-10 md:py-24">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-secondary shadow-sm">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          Our Portfolio
        </div>

        <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-card md:text-6xl">
          Showcasing <span className="text-secondary">Excellence</span> in Print &amp; Branding
        </h1>

        <p className="mx-auto mb-0 max-w-2xl text-lg leading-relaxed text-card/80">
          Explore our curated gallery of premium printing, high-end packaging, and tactile
          branding solutions crafted for industry leaders.
        </p>
      </div>
    </section>
  );
}