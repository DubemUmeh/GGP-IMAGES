import Image from "next/image";

const team = [
  {
    name: "Sarah Jenkins",
    role: "Creative Director",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDgHxf2UzG2lhRlSLk5Odv58IVc3sAllTacosteIEI9sSfFu7aa1Z03Gq2sUB34tPMAGt0gdLyCCSh4XFmHKKNtJVVne-M4dVDy5OIXaeUBxyBD_WSxlU2xSnk40WEpfDguSpXWZlUTG0ahY-jfRZ89kwsS6Z260Qh6I-6Jfnm0Rhm4plhrvcc1avk_J6qV36x9yMF7r4lfNmWD8sqsixWaVFO7hJBzVSlNz3vcDspF3T9Q7ewc0VZHQ",
  },
  {
    name: "Marcus Thorne",
    role: "Head of Production",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDE891fSg0XeT792K5KaE5DfF0MrlMHzdEk9z6mMrHmoyo61qmhD6JgaVz2aiSqziTNBOtHu9yf7SpzuinVNbzOq-kSSfB4ZY2jnA_fGCKLBtq5ksaFuYhh8WOEuVmWL9M27goPyeoQEoXRuTwSw8nkhlE1bIpS4Sxzr25fB-E0GPjQeA72oLwQnOUToX7OIfx1Y_Rb13UcYB8p0Rl6dlAWJHyjbA5DMy6jwNOcL7ZKW7d9_HRAsfBiCw",
  },
  {
    name: "Elena Rostova",
    role: "Client Relations",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5IZStOGr5M2Nmqaac9lcS6R644p5jgyFuKC-dk7EncnpBRAaJi3uUCHtCSKyZBKU0SeEZ1fc32lV-Ks-1SLtShD-GpDmkEe7rUWRGBcIGYSLBdr56YWof1l5Nm9moF6HUy8lC5rOBBfmAUgiL_nFtj-qxHjyv6oZGsoKEo86vr_cp3t19iKR-eUU4LOWC09cA5y2AJc0HIMcC45YsQsj9ZtivRDFGK_z0rSgLWI2bVnSLWg-VPOKEWw",
  },
  {
    name: "David Chen",
    role: "Print Technologist",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLqE1Pbqr3NfrTgI7LM1wGP5ZBdkGb10sLm-uxgwmBCKnXm7bzfP4SWhOHt70KslSEOLwnOBg8oNfQEUj5Ul3djpEUrnXs0awY3_E0y_eYuOeAHJgWBlaPq7S9zcVlxDtOVZsVP3lev4XA360kc36O1M5ADUG4mVdI3l9-khBi1wulKo-HDHIhuddXRDXHyLtH79IlpueqSxrCIc96Kb0ExLoLAtKUTexdmE18RTrEMwkvn0modykRSA",
  },
];

export function Team() {
  return (
    <section className="bg-popover py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            The Craftspeople
          </h2>
          <p className="text-brand-tertiary text-[20px] md:text-lg tracking-wide leading-8">
            Meet the dedicated team turning your concepts into tangible masterpieces.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="group relative cursor-pointer overflow-hidden rounded-2xl">
              <div className="relative aspect-3/4 w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-brand-tertiary/90 via-braterfrom-brand-tertiary/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="team-glass-panel absolute bottom-0 left-0 w-full translate-y-4 rounded-b-2xl p-6 transition-transform duration-300 group-hover:translate-y-0">
                <div className="mb-1 text-xl font-semibold text-card">{member.name}</div>
                <div className="text-xs uppercase tracking-widest text-card/70">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
