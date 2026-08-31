"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { dictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { waLink } from "@/lib/utils";

function TiltCover() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      className="relative max-w-sm mx-auto w-full [perspective:1200px]"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        onMouseMove={handleMouse}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={
          reduce
            ? undefined
            : { rotateX: rotateX as MotionValue<number>, rotateY: rotateY as MotionValue<number> }
        }
        className="relative"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-warm"
        >
          <Image
            src="/images/tony.png"
            alt="Tony Sameh — تصميم وإخراج المطبوعات"
            fill
            sizes="(max-width:768px) 90vw, 400px"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/40 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
        </motion.div>

        <div className="absolute -bottom-4 right-6 rounded-full bg-white/90 backdrop-blur px-4 py-2 shadow-sm text-sm font-semibold text-ink">
          {dictionary.brand.tagline}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero({ isAvailable = true }: { isAvailable?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-full pointer-events-none">
        <div className="texture-dots absolute inset-0 opacity-[0.35]" style={{ WebkitMaskImage: "radial-gradient(ellipse at bottom right, black 0%, transparent 65%)", maskImage: "radial-gradient(ellipse at bottom right, black 0%, transparent 65%)" }} />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent-soft/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-surface-2/60 blur-3xl" />
      </div>

      <Container className="relative py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft/50 px-4 py-1.5 text-sm font-semibold text-brand-deep">
                <span className="inline-block w-2 h-2 rounded-full bg-accent" />
                {isAvailable
                  ? dictionary.hero.badgeAvailable
                  : dictionary.hero.badgeBusy}
              </span>
            </motion.div>

            <motion.h1
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-[clamp(32px,5vw,56px)] font-black leading-[1.25] text-ink"
            >
              {dictionary.hero.headline}
            </motion.h1>

            <motion.p
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-[18px] leading-[1.9] text-body max-w-xl"
            >
              {dictionary.hero.lead}
            </motion.p>

            <motion.p
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4 text-muted font-medium"
            >
              {dictionary.hero.sub}
            </motion.p>

            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <a
                href={waLink(
                  dictionary.brand.whatsapp,
                  dictionary.whatsapp.general
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand px-8 py-4 text-lg font-semibold text-white shadow-md transition-all hover:bg-brand-deep hover:scale-[1.02] active:scale-[0.98]"
              >
                {dictionary.hero.cta1}
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              </a>
              <Link
                href="/work"
                className="group inline-flex items-center justify-center rounded-md border-2 border-brand px-8 py-4 text-lg font-semibold text-brand transition-all hover:bg-brand/5 hover:scale-[1.02] active:scale-[0.98]"
              >
                {dictionary.hero.cta2}
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="order-first lg:order-last">
            <TiltCover />
          </div>
        </div>
      </Container>
    </section>
  );
}
