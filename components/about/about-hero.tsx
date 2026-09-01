export function AboutHero() {
  return (
    <header className="relative bg-brand-tertiary/90 overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-accent/20 via-background to-background" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-card/30 bg-secondary/10 px-4 py-2 text-sm font-semibold font-manrope text-card tracking-wide">
            <span className="h-2 w-2 animate-pulse rounded-full bg-card" />
            About GGP Images
          </div>
          <h1 className="mb-6 text-4xl font-extrabold font-manrope leading-tight tracking-tight text-card md:text-6xl">
            Our Story: Printing the <span className="gradient-text">Future</span> of Brands.
          </h1>
          <p className="mb-8 max-w-2xl text-lg font-inter leading-relaxed text-popover">
            We bring your ideas to life with precision printing, exceptional quality, and branding
            that leaves a lasting impression. From concept to physical reality, we are your partners
            in visual excellence.
          </p>
        </div>
      </div>
    </header>
  );
}
