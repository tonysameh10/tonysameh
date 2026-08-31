"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { dictionary } from "@/lib/dictionary";
import { waLink } from "@/lib/utils";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

function RotatingStamp() {
  const reduce = useReducedMotion();
  return (
    <div
      className={`spin-slow relative flex items-center justify-center w-32 h-32 ${reduce ? "" : ""}`}
      aria-hidden
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <defs>
          <path
            id="stamp-circle"
            d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
            fill="none"
          />
        </defs>
        <text className="text-accent-soft" fontSize="15.5" fontWeight="800" fill="currentColor" letterSpacing="3">
          <textPath href="#stamp-circle">مطبوعات • تصميم • إخراج •</textPath>
        </text>
      </svg>
      <ArrowLeft className="text-accent-soft" size={34} strokeWidth={1.5} />
    </div>
  );
}

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-brand-deep text-white">
      <div className="texture-dots absolute inset-0 opacity-10" aria-hidden />
      <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-accent/15 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full bg-accent/10 blur-3xl" aria-hidden />

      <Container className="relative py-20 md:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.h2
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[clamp(30px,5vw,52px)] font-black leading-[1.25]"
          >
            {dictionary.finalCta.title}
          </motion.h2>

          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="mt-5 max-w-xl text-lg text-white/85"
          >
            {dictionary.finalCta.desc}
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            className="relative mt-10"
          >
            <a
              href={waLink(dictionary.brand.whatsapp, dictionary.whatsapp.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-9 py-4 text-lg font-bold text-white transition-all hover:brightness-110 hover:scale-[1.04] active:scale-[0.98] shadow-warm"
            >
              {dictionary.finalCta.cta}
              <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1.5" />
            </a>
            <div className="pointer-events-none absolute -top-6 -left-16 hidden sm:block">
              <RotatingStamp />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
