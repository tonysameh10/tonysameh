"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { dictionary } from "@/lib/dictionary";
import {Container } from "@/components/ui/container";
import { waLink } from "@/lib/utils";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: dictionary.nav.home },
  { href: "/work", label: dictionary.nav.work },
  { href: "/services", label: dictionary.nav.services },
  { href: "/contact", label: dictionary.nav.contact },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-white/80 border-b border-line shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2" aria-label="Tony Sameh">
          <span className="relative w-9 h-6">
            <Image
              src="/images/logo.png"
              alt="Tony Sameh logo"
              fill
              sizes="36px"
              className="object-contain"
            />
          </span>
          <span className="text-xl font-bold text-ink">
            {dictionary.brand.name}
            <span className="text-accent">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-base font-semibold transition-colors hover:text-brand",
                  active ? "text-brand" : "text-body"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href={waLink(dictionary.brand.whatsapp, dictionary.whatsapp.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-wa px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
            {dictionary.nav.whatsapp}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="md:hidden p-2 text-ink"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.3 }}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute inset-y-0 right-0 w-[82%] max-w-sm bg-white shadow-lg flex flex-col"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between p-4 border-b border-line">
                <span className="text-lg font-bold text-ink">
                  {dictionary.brand.name}
                  <span className="text-accent">.</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 text-ink"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block py-3 px-3 rounded-md text-lg font-semibold",
                        pathname === link.href
                          ? "bg-accent-soft text-brand-deep"
                          : "text-ink hover:bg-surface-2"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto p-4">
                <a
                  href={waLink(dictionary.brand.whatsapp, dictionary.whatsapp.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full rounded-full bg-wa px-5 py-3 text-base font-semibold text-white"
                >
                  {dictionary.nav.whatsapp}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
