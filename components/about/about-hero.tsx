export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-brand-tertiary px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-secondary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            About GGP Images
          </div>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-card md:text-6xl">
            Our Story: Printing the <span className="text-secondary">Future</span> of Brands.
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-card/80">
            We bring your ideas to life with precision printing, exceptional quality, and branding
            that leaves a lasting impression. From concept to physical reality, we are your partners
            in visual excellence.
          </p>
        </div>
      </div>
    </section>
  );
}
