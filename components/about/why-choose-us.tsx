import Image from "next/image";
import { LuAward, LuTimer, LuPenTool } from "react-icons/lu";

const reasons = [
  {
    icon: LuAward,
    title: "Premium Quality",
    description: "High-end materials and precision printing for flawless results.",
  },
  {
    icon: LuTimer,
    title: "Fast Turnaround",
    description: "Quick production and on-time delivery, every time.",
  },
  {
    icon: LuPenTool,
    title: "Custom Solutions",
    description: "Tailored printing and branding solutions for your specific business needs.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="overflow-hidden bg-brand-tertiary py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 space-y-8 md:order-1">
            <div>
              <h2 className="mb-4 text-3xl font-bold font-manrope tracking-tight text-card md:text-4xl">
                Why Brands Choose Us
              </h2>
              <p className="text-popover text-base font-inter tracking-wide">
                We combine technical expertise with creative vision to deliver results that exceed
                expectations.
              </p>
            </div>
            <div className="space-y-6">
              {reasons.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-purple-container text-card">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xl font-semibold font-manrope text-card tracking-wide">{title}</h4>
                    <p className="text-popover font-inter tracking-wider text-base">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary opacity-70 blur-3xl" />
            <div className="relative z-10 aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkwji2Z_43q1f2fy_b-cIDLZHoH4vtv2SCW8WQTfK6DkhH6Ja_5JAzT3wlwHt_5kGkVCFtHJsinyNTBDJ8N1KliGT29Ftuft6Vgvw5ZiRR9Jb-gMLnR53fODeP6RwDrGEHAuxgUBgDWS668XJ_n7r_FgSnv3GFP68nfcG_5osjQm5WzSa8oPKgt5-va-1BQ1cn_KTZxEmidIvVUmoAZJRckIpS3JD0EuuL5B2Z6uIGrr7zxCBGLdrFkA"
                alt="Layers of premium paper and foils"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
