export function AboutHero() {
  return (
    <header className="relative bg-popover overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-accent/20 via-background to-background" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-card/30 bg-brand-tertiary px-4 py-2 text-sm font-semibold font-manrope text-card tracking-wide">
            <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
            About GGP Images
          </div>
          <h1 className="mb-6 text-4xl font-extrabold font-manrope leading-tight tracking-tight text-foreground md:text-6xl">
            Our Story: Printing the{" "}
            <span className="text-secondary">Future</span> of Brands.
          </h1>
          <p className="mb-8 max-w-2xl text-lg font-inter leading-relaxed text-foreground">
            We bring your ideas to life with precision printing, exceptional
            quality, and branding that leaves a lasting impression. From concept
            to physical reality, we are your partners in visual excellence.
          </p>
        </div>
      </div>
    </header>
  );
}
