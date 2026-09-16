"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Hamburger from "hamburger-react";
import { ArrowCta } from "../ui/motion-kit";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaChevronDown } from "react-icons/fa6";

const links = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Large Format Printing",
        href: "/services/large-format-printing",
      },
      { label: "Textile/Fabric Printing", href: "/services/textile-printing" },
      { label: "Embroidery", href: "/services/embroidery" },
      { label: "Digital Printing", href: "/services/digital-printing" },
      { label: "Visual Production", href: "/services/visual-production" },
      { label: "Branding & Design", href: "/services/branding" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Booking", href: "/booking" },
];

type NavType = {
  href: string;
  children: string;
};

const NavLink = ({ href, children }: NavType) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-full px-4 py-2 text-base font-semibold font-manrope transition-colors duration-200 tracking-wide",
        isActive
          ? "bg-secondary/30 text-foreground"
          : "text-muted-foreground hover:bg-secondary/5 hover:text-foreground",
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
  );
};

type NavDropdownType = {
  label: string;
  href: string;
  items: { label: string; href: string }[];
};

const NavDropdown = ({ label, href, items }: NavDropdownType) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = pathname === href || items.some((c) => c.href === pathname);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className={cn(
          "relative flex items-center gap-1 rounded-full px-4 py-2 text-base font-semibold font-manrope transition-colors duration-200 tracking-wide",
          isActive
            ? "bg-secondary/30 text-foreground"
            : "text-muted-foreground hover:bg-secondary/5 hover:text-foreground",
        )}
      >
        {label}
        <FaChevronDown
          className={cn(
            "h-2.5 w-2.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
        {isActive && (
          <motion.div
            layoutId="undeline"
            className="absolute inset-x-4 -bottom-2.25 h-0.5 rounded-full bg-brand-tertiary"
          />
        )}
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded-2xl border border-brand-tertiary bg-popover p-2 shadow-lg"
          >
            <Link
              href={href}
              className="block rounded-xl bg-secondary/10 px-4 py-2.5 text-sm font-semibold font-manrope text-secondary transition-colors hover:bg-secondary/20"
            >
              Explore {label}
            </Link>
            <div className="my-1 h-px bg-brand-tertiary/60" />
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group/child flex items-baseline gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium font-manrope text-muted-foreground transition-colors hover:bg-secondary/10 hover:text-foreground"
              >
                <span className="text-xs font-semibold text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-100 w-full border-b border-brand-tertiary bg-popover backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-none items-center justify-between px-3">
        <Link href="/" className="group flex items-center">
          <Image
            src="/ggp-2-no-bg.png"
            alt="GGP Image Logo"
            priority
            width={150}
            height={0}
            className="relative top-0 -left-8"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) =>
            link.children ? (
              <NavDropdown
                key={link.label}
                label={link.label}
                href={link.href}
                items={link.children}
              />
            ) : (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <span className="hidden md:flex">
          <ArrowCta
            as="link"
            label="Get A Quote"
            href="/contact"
            className="bg-secondary hover:bg-secondary/80 shadow-[0_10px_30px_rgba(253,139,0,0.3)]"
          />
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
                {links.map((link) =>
                  link.children ? (
                    <div key={link.label}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSubmenu((prev) =>
                            prev === link.href ? null : link.href,
                          )
                        }
                        aria-expanded={openSubmenu === link.href}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium font-manrope text-muted-foreground transition-colors hover:bg-secondary/10 hover:text-secondary"
                      >
                        {link.label}
                        <FaChevronDown
                          className={cn(
                            "h-3 w-3 transition-transform duration-200",
                            openSubmenu === link.href && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openSubmenu === link.href && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pl-6 pt-1 pb-2">
                              <Link
                                href={link.href}
                                className="rounded-xl bg-transparent px-4 py-2.5 text-sm font-semibold font-manrope text-secondary transition-colors hover:bg-secondary/10"
                                onClick={() => setOpen(false)}
                              >
                                Explore {link.label}
                              </Link>
                              {link.children.map((child, i) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="flex items-baseline gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium font-manrope text-muted-foreground transition-colors hover:bg-secondary/10 hover:text-secondary"
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="text-xs font-semibold text-secondary">
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="rounded-xl px-4 py-3 font-medium font-manrope text-muted-foreground transition-colors hover:bg-secondary/10 hover:text-secondary"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ),
                )}

                <div className="w-fit">
                  <ArrowCta
                    onClick={() => setOpen(false)}
                    as="link"
                    label="Get A Quote"
                    href="/contact"
                    className="bg-secondary hover:bg-secondary/80"
                  />
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
