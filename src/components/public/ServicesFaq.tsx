"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { dictionary } from "@/lib/dictionary";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const items = dictionary.faq.items;

  return (
    <Section className="relative overflow-hidden bg-surface">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-accent/40 to-transparent" />
      <Container>
        <SectionHeading
          eyebrow={dictionary.faq.title}
          title="أي حاجة مش واضحة؟"
          subtitle={dictionary.faq.subtitle}
        />

        <div className="mx-auto max-w-3xl space-y-3">
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                  className={cn(
                    "group overflow-hidden rounded-xl border bg-white transition-colors",
                    isOpen
                      ? "border-brand shadow-warm"
                      : "border-line hover:border-brand-soft"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-extrabold text-ink md:text-lg">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                      className={cn(
                        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors",
                        isOpen
                          ? "bg-brand text-white"
                          : "bg-accent-soft text-brand"
                      )}
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={reduce ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { height: "auto", opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0.15 : 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-body leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}