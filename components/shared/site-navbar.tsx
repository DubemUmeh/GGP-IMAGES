"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Hamburger from "hamburger-react";
import { ArrowCta } from "../ui/motion-kit";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

type NavType = {
  href: string;
  children: string;
}

const NavLink = ({ href, children }: NavType) => {
  const pathname= usePathname();
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'relative rounded-full px-4 py-2 text-base font-semibold transition-colors duration-200 tracking-wide',
        isActive
        ? 'bg-secondary/30 text-foreground'
        : 'text-muted-foreground hover:bg-secondary/5 hover:text-foreground'
      )}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="undeline"
          className="absolute inset-x-4 -bottom-2.25 h-0.5 rounded-full bg-brand-tertiary"
        />
      )}
    </Link>
  )
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-100 w-full border-b border-brand-tertiary bg-popover backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-none items-center justify-between px-3">
        <Link
          href="/"
          className="group flex items-center"
        >
          <Image 
            src='/ggp-2-no-bg.png' 
            alt="GGP Image Logo" 
            priority 
            width={150} 
            height={0}
            className="relative top-0 -left-8"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link, i) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        
        <span className="hidden md:flex">
          <ArrowCta as="link" label="Get A Quote" href="/contact" className="bg-secondary hover:bg-secondary/80 shadow-[0_10px_30px_rgba(253,139,0,0.3)]" />
        </span>

        <div className="text-foreground md:hidden">
          <Hamburger
            toggled={open}
            toggle={setOpen}
            size={22}
            color="var(--foreground)"
            rounded
            label="Toggle menu"
          />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-x-0 top-16 bottom-0 z-40 bg-black/30 md:hidden"
            />
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-full z-50 border-t border-border bg-background shadow-lg md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-6">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition-colors hover:bg-secondary/10 hover:text-secondary"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="w-fit">
                  <ArrowCta as='link' label="Get A Quote" href="/contact" className="bg-secondary hover:bg-secondary/80" />
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}