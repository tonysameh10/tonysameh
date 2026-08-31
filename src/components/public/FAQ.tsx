"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { dictionary } from "@/lib/dictionary";
import { Container, Section, SectionHeading } from "@/components/ui/container";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading title={dictionary.faq.title} subtitle={dictionary.faq.subtitle} />
        <div className="max-w-3xl mx-auto space-y-3">
          {dictionary.faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                className="rounded-lg bg-white border border-line overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
                  aria-expanded={open}
                >
                  <span className="font-semibold text-ink">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-brand shrink-0 transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-body">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
