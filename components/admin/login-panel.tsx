"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";

const STATS = [
  { value: "10+", label: "Years in print & branding" },
  { value: "500+", label: "Projects delivered" },
  { value: "Takoradi", label: "Ghana, Western Region" },
];

export function LoginPanel() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-card md:flex-row">
      {/* Branding panel */}
      <div className="relative hidden overflow-hidden bg-brand-tertiary md:flex md:w-1/2 lg:w-3/5">
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            color: "#fff",
          }}
        />
        {/* Radial glow accents */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex w-full flex-col justify-between p-10 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center"
          >
            <Image
              src="/favicon_io/android-chrome-192x192.png"
              alt="GGP Images"
              width={150}
              height={0}
              className="relative -left-3 border-5 rounded-full border-secondary"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="max-w-lg"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
              Admin Portal
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-card lg:text-5xl">
              Where every project gets a{" "}
              <span className="text-secondary">craftsman&apos;s finish.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/60">
              Manage the gallery, bookings, and site settings that keep GGP
              Images running, built for the team behind the work.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-card">{s.value}</p>
                <p className="mt-1 text-base leading-snug text-white/50">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Login card panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Mobile-only compact logo */}
          <div className="mb-10 flex justify-center md:hidden">
            <Image
              src="/favicon_io/android-chrome-192x192.png"
              alt="GGP Images"
              width={130}
              height={0}
              className="border-5 rounded-full border-secondary"
            />
          </div>

          <div className="mb-8 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-base font-semibold uppercase tracking-widest text-secondary">
              <Lock className="h-3 w-3" />
              Restricted access
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-card-foreground">
              Welcome back
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Sign in with an approved Google administrator account to
              continue.
            </p>
          </div>

          <a
            href="/api/auth/google"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white px-5 py-3.5 text-sm font-semibold text-neutral-800 shadow-sm transition-all hover:border-neutral-300 hover:shadow-md active:scale-[0.99]"
          >
            <GoogleMark className="h-5 w-5" />
            Continue with Google
          </a>

          <div className="mt-8 flex items-center gap-2 rounded-lg bg-muted px-4 py-3 text-base text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-secondary" />
            Access is limited to accounts approved by GGP Images
            administrators.
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}