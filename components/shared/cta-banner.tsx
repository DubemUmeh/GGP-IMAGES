import { ArrowCta } from "../ui/motion-kit";

interface CtaBannerProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
}

export function CtaBanner({
  title = "Ready to bring your brand to life?",
  description = "Let's create something remarkable together.",
  buttonLabel = "Get Your Quote",
  href
}: CtaBannerProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[32px] bg-gradient-brand p-8 shadow-2xl md:flex-row md:p-16">
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/2 rounded-full bg-brand-purple-fixed/20 blur-3xl" />

        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h2 className="mb-4 text-3xl font-bold font-manrope text-primary-foreground md:text-4xl">{title}</h2>
          <p className="text-lg font-inter text-primary-foreground/80">{description}</p>
        </div>
        {/* <Button
          size="lg"
          className="relative z-10 whitespace-nowrap rounded-xl bg-card px-8 py-6 text-primary hover:translate-y-0 hover:scale-105 hover:bg-card/90"
        >
          {buttonLabel}
          <LuArrowRight className="ml-1 h-4 w-4" />
        </Button> */}
        <ArrowCta label={buttonLabel} className="bg-secondary hover:bg-secondary/80" href={href} />
      </div>
    </section>
  );
}
