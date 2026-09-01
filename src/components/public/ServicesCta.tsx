"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { dictionary } from "@/lib/dictionary";
import { waLink } from "@/lib/utils";
import { Container, Section } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesCta() {
  const reduce = useReducedMotion();

  return (
    <Section className="relative overflow-hidden">
      <Container>
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 34, scale: 0.99 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduce ? 0.15 : 0.7, ease: EASE }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-bl from-brand-deep to-brand px-8 py-14 text-center text-white shadow-warm md:px-16"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="texture-dots absolute inset-0 opacity-20" />
            <div className="absolute -left-10 -top-14 h-44 w-44 rounded-full border-[14px] border-white/5" />
            <div className="absolute -bottom-14 -right-10 h-48 w-48 rounded-full border-[14px] border-white/5" />
            <div
              className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
            />
          </div>

          <div className="relative">
            <h2 className="text-[clamp(26px,4vw,40px)] font-black leading-tight">
              {dictionary.finalCta.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-white/85">
              {dictionary.finalCta.desc}
            </p>

            <motion.a
              href={waLink(dictionary.brand.whatsapp, dictionary.whatsapp.general)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-9 py-4 text-lg font-black text-white shadow-lg"
            >
              <MessageCircle size={22} />
              {dictionary.finalCta.cta}
            </motion.a>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}