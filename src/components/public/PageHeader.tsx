"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("relative overflow-hidden bg-white", className)}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="texture-dots absolute inset-0 opacity-[0.3]"
          style={{
            WebkitMaskImage: "radial-gradient(ellipse at top center, black 0%, transparent 70%)",
            maskImage: "radial-gradient(ellipse at top center, black 0%, transparent 70%)",
          }}
        />
        <div className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-accent-soft/40 blur-3xl" />
      </div>

      <Container className="relative py-20 md:py-28 text-center">
        {eyebrow && (
          <motion.span
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft/50 px-4 py-1.5 text-sm font-semibold text-brand-deep"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-accent" />
            {eyebrow}
          </motion.span>
        )}

        <h1 className="mt-6 text-[clamp(32px,5vw,48px)] font-black leading-[1.2] text-ink">
          <span className="sr-only">{title}</span>
          <motion.span
            aria-hidden
            className="inline-block overflow-hidden"
            initial={reduce ? {} : { opacity: 0, y: 24 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            {title}
          </motion.span>
        </h1>

        {subtitle && (
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            className="mt-5 text-body text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
