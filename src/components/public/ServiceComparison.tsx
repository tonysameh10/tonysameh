"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X, Star, Sparkles } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Column = {
  title: string;
  subtitle?: string;
  good: boolean[];
  items: string[];
  highlighted?: boolean;
};

const columns: Column[] = [
  {
    title: "الشغل العادي",
    subtitle: "أي حد بيعمله",
    good: [true, true, false, false],
    items: [
      "نانسة وقابلة للتسليم",
      "أرقام تحت فوق",
      "جداول بتتكسر",
      "ملف المطبعة ممكن يرفضه",
    ],
  },
  {
    title: "الشغل الصح",
    subtitle: "ده اللي بقدّمه",
    highlighted: true,
    good: [true, true, true, true],
    items: [
      "نظام كامل متسق",
      "أرقام وترويسات مضبوطة",
      "جداول ومعادلات ما بتتكسرش",
      "فهرس أوتوماتيك بيحدّث لوحده",
    ],
  },
  {
    title: "بعد التسليم",
    subtitle: "بينتهي التسليم",
    good: [true, true, true, true],
    items: [
      "تعديلان مجانيان",
      "ملف PDF للطلبة",
      "دعم للتعديلات الجاية",
      "ملفات مطبعة سليمة",
    ],
  },
];

export function ServiceComparison() {
  const reduce = useReducedMotion();

  return (
    <Section className="relative overflow-hidden bg-surface">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-accent/40 to-transparent" />
      <Container>
        <SectionHeading
          eyebrow="مقارنة"
          title="الفرق اللي هتوحشه"
          subtitle="الموديلات والمطبعة هتلاقيهم من أول مرة — وانت مش هتلاقي زحمة."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch max-w-5xl mx-auto">
          {columns.map((col, ci) => {
            const highlighted = col.highlighted;
            return (
              <motion.div
                key={col.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: reduce ? 0.15 : 0.6, delay: reduce ? 0 : ci * 0.12, ease: EASE }}
                className={cn(
                  "relative flex flex-col rounded-2xl p-6 md:p-7",
                  highlighted
                    ? "border-2 border-brand bg-brand-deep text-white shadow-warm md:-my-4 md:py-10"
                    : "border border-line bg-white text-ink shadow-sm"
                )}
              >
                {highlighted && (
                  <span className="absolute -top-3.5 inset-x-0 mx-auto flex w-fit items-center gap-1.5 rounded-full bg-accent px-4 py-1 text-xs font-extrabold text-white shadow-md">
                    <Star size={12} className="fill-white/90" />
                    الأفضل
                  </span>
                )}

                <h3
                  className={cn(
                    "text-lg font-black",
                    highlighted ? "text-accent-soft" : "text-ink"
                  )}
                >
                  {col.title}
                </h3>
                {col.subtitle && (
                  <p
                    className={cn(
                      "mt-0.5 text-sm font-semibold",
                      highlighted ? "text-white/70" : "text-muted"
                    )}
                  >
                    {col.subtitle}
                  </p>
                )}

                <div
                  aria-hidden
                  className={cn(
                    "my-5 h-px w-full",
                    highlighted ? "bg-white/15" : "bg-line"
                  )}
                />

                <ul className="space-y-3.5">
                  {col.items.map((item, ri) => (
                    <motion.li
                      key={item}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: reduce ? 0.15 : 0.4,
                        delay: reduce ? 0 : 0.2 + ci * 0.05 + ri * 0.08,
                        ease: EASE,
                      }}
                      className="flex items-start gap-3"
                    >
                      {col.good[ri] ? (
                        <span
                          className={cn(
                            "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                            highlighted
                              ? "bg-accent text-white"
                              : "bg-success/15 text-success"
                          )}
                        >
                          <Check size={12} strokeWidth={3.5} />
                        </span>
                      ) : (
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-danger/15 text-danger">
                          <X size={12} strokeWidth={3.5} />
                        </span>
                      )}
                      <span
                        className={cn(
                          "text-[15px] leading-relaxed",
                          highlighted ? "text-white" : "text-ink"
                        )}
                      >
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <motion.div
                    initial={reduce ? {} : { scaleX: 0 }}
                    whileInView={reduce ? {} : { scaleX: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.3 + ci * 0.1, ease: EASE }}
                    className="origin-right"
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-4 py-2.5 font-bold",
                        highlighted
                          ? "bg-white/10 text-accent-soft"
                          : "bg-surface-2 text-brand"
                      )}
                    >
                      <Sparkles size={15} />
                      كفاءة {90 - ci * 38}%
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}