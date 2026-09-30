import { ArrowCta } from "../ui/motion-kit";

interface CtaBannerProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
  variant?: "secondary" | "tertiary";
}

export function CtaBanner({
  title = "Ready to bring your brand to life?",
  description = "Let's create something remarkable together.",
  buttonLabel = "Get Your Quote",
  href,
  variant,
}: CtaBannerProps) {
  const bgClass =
    variant === "secondary"
      ? "bg-secondary"
      : variant === "tertiary"
      ? "bg-brand-tertiary"
      : "bg-gradient-brand";

  const textTitleClass =
    variant === "tertiary"
      ? "text-brand-tertiary-foreground"
      : "text-primary-foreground";

  const textDescClass =
    variant === "tertiary"
      ? "text-brand-tertiary-foreground/80"
      : "text-primary-foreground/80";

  const buttonClass =
    variant === "secondary"
      ? "bg-secondary hover:bg-secondary/80 border-2 border-white"
      : "bg-secondary hover:bg-secondary/80";

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className={`relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[32px] ${bgClass} p-8 shadow-2xl md:flex-row md:p-16`}>
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/2 rounded-full bg-brand-purple-fixed/20 blur-3xl" />

        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h2 className={`mb-4 text-3xl font-bold font-manrope ${textTitleClass} md:text-4xl`}>{title}</h2>
          <p className={`text-lg font-inter ${textDescClass}`}>{description}</p>
        </div>
        <ArrowCta label={buttonLabel} className={buttonClass} href={href} />
      </div>
    </section>
  );
}
