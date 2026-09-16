export function ContactHero() {
  return (
    <header className="relative overflow-hidden bg-brand-tertiary py-15">
      <div className="absolute right-0 top-0 -z-10 h-200 w-200 -translate-y-1/2 translate-x-1/3 rounded-full bg-accent opacity-40 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-150 w-150 translate-y-1/3 -translate-x-1/4 rounded-full bg-brand-orange-fixed opacity-30 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <span className="mb-6 inline-block rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-inter text-primary shadow-sm">
          Get In Touch
        </span>
        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold font-manrope leading-tight tracking-tight text-card md:text-6xl">
          Let&apos;s Bring Your Brand to <span className="gradient-text">Life</span>.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg font-inter text-popover">
          Ready to elevate your visual identity? We&apos;re here to help. Reach out with your
          project details, and our experts will craft a tailored solution.
        </p>
      </div>
    </header>
  );
}
