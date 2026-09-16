import { Card, CardContent } from "@/components/ui/card";
import { LuFlag, LuEye, LuHeart, LuCircleCheck } from "react-icons/lu";

const values = [
  "Uncompromising Quality",
  "Sustainable Practices",
  "Client-Centric Innovation",
];

export function Philosophy() {
  return (
    <section className="bg-popover py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold font-manrope tracking-tight text-primary md:text-4xl">
            Our Core Philosophy
          </h2>
          <p className="text-muted-foreground text-lg font-inter font-semibold tracking-wider">The principles that guide every cut, fold, and print.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="bg-secondary rounded-2xl border-brand-surface-container-low shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple-fixed text-primary">
                <LuFlag className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold font-manrope tracking-wide text-primary">Our Mission</h3>
              <p className="text-foreground text-base font-inter tracking-wide">
                To empower businesses by translating their unique identity into flawless physical
                materials that leave a lasting, premium impression.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 bg-gradient-brand text-primary-foreground shadow-lg md:-translate-y-4">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <LuEye className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold font-manrope">Our Vision</h3>
              <p className="text-primary-foreground/80 font-inter">
                To be the global benchmark for creative printing and branding solutions, setting the
                standard for quality, sustainability, and innovation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-brand-tertiary rounded-2xl border-brand-surface-container-low shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange-fixed text-secondary-foreground">
                <LuHeart className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold font-manrope text-card">Our Values</h3>
              <ul className="space-y-2 text-popover tracking-wide text-base font-inter">
                {values.map((value) => (
                  <li key={value} className="flex items-center gap-2">
                    <LuCircleCheck className="h-4 w-4 text-secondary" />
                    {value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
