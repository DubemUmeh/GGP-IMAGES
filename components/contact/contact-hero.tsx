export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-brand-tertiary px-5 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-secondary shadow-sm">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          Get In Touch
        </div>
        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-card md:text-6xl">
          Let&apos;s Bring Your Brand to <span className="text-secondary">Life</span>.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-card/80">
          Ready to elevate your visual identity? We&apos;re here to help. Reach out with your
          project details, and our experts will craft a tailored solution.
        </p>
      </div>
    </section>
  );
}
