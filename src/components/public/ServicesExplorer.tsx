"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft, Check, Sparkles } from "lucide-react";
import type { Service } from "@/lib/data";
import { waLink } from "@/lib/utils";
import { dictionary } from "@/lib/dictionary";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { PriceTag } from "@/components/ui/PriceTag";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesExplorer({
  services,
  showPrices,
}: {
  services: Service[];
  showPrices: boolean;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = services[active] ?? services[0];

  if (!current) return null;

  return (
    <Section className="relative overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="texture-dots absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-accent-soft/40 blur-3xl" />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="التفاصيل"
          title="اختار الخدمة اللي تهمك"
          subtitle="بص على المحتوى بتاعك، ولقيت نفسك بتدوّر على إيه بظبط — هتلاقيه هنا."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] gap-7 lg:gap-9">
          {/* Selector rail */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 lg:grid-cols-1 lg:self-start lg:sticky lg:top-28">
            {services.map((service, i) => {
              const isActive = active === i;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex items-center gap-3.5 overflow-visible rounded-xl border text-right p-4 transition-colors",
                    isActive
                      ? "border-brand text-white shadow-warm"
                      : "border-line bg-white text-ink hover:border-brand-soft hover:bg-surface"
                  )}
                >
                  {/* animated active fill */}
                  {isActive && !reduce && (
                    <motion.span
                      layoutId="service-active-fill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-bl from-brand to-brand-deep"
                      transition={{ type: "spring", stiffness: 360, damping: 34 }}
                    />
                  )}
                  {isActive && reduce && (
                    <span className="absolute inset-0 rounded-xl bg-brand" />
                  )}

                  <span
                    className={cn(
                      "relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition",
                      isActive
                        ? "bg-white/15 text-accent-soft"
                        : "bg-accent-soft/60 text-brand"
                    )}
                  >
                    <Icon name={service.icon} size={22} tone={isActive ? "light" : "default"} />
                  </span>

                  <span className="relative min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-[11px] font-bold tracking-wide",
                        isActive ? "text-accent-soft/80" : "text-muted"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block truncate text-[15px] font-extrabold">
                      {service.title_ar}
                    </span>
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="service-active-dot"
                      className="relative ml-1 hidden h-2 w-2 shrink-0 rounded-full bg-accent lg:block"
                      transition={{ type: "spring", stiffness: 360, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: 30, scale: 0.985, filter: "blur(8px)" }
                }
                animate={
                  reduce
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                }
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: -20, scale: 0.99, filter: "blur(5px)" }
                }
                transition={{ duration: reduce ? 0.15 : 0.55, ease: EASE }}
                className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-warm"
              >
                {/* top color key */}
                <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-brand via-brand-soft to-accent" />

                <div className="border-b border-line bg-surface/70 p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-accent-soft shadow-md">
                        <Icon name={current.icon} size={28} tone="light" />
                      </span>
                      <div>
                        <h3 className="text-2xl font-black text-ink md:text-[28px]">
                          {current.title_ar}
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          الخدمة {String(active + 1).padStart(2, "0")} من{" "}
                          {String(services.length).padStart(2, "0")}
                        </p>
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      {current.price_from !== null && current.price_from > 100 && (
                        <motion.span
                          key={current.id + "-price"}
                          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: reduce ? 0.15 : 0.35 }}
                        >
                          <PriceTag
                            price={current.price_from}
                            show={showPrices}
                            message={`مرحبًا، عايز أطلب خدمة «${current.title_ar}» — مممكن تفاصيل الأسعار؟`}
                            tone="dark"
                            size="md"
                          />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {current.description && (
                    <motion.p
                      key={current.id + "-desc"}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: reduce ? 0.15 : 0.4, delay: reduce ? 0 : 0.05 }}
                      className="mt-4 text-body leading-relaxed"
                    >
                      {current.description}
                    </motion.p>
                  )}
                </div>

                <div className="p-6 md:p-8">
                  <p className="mb-4 flex items-center gap-2 text-sm font-extrabold text-brand">
                    <Sparkles size={16} />
                    اللي داخل في الخدمة
                  </p>
                  <motion.ul
                    key={current.id + "-features"}
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.06 } } }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {current.features.map((f) => (
                      <motion.li
                        key={f}
                        variants={{
                          hidden: reduce
                            ? { opacity: 0 }
                            : { opacity: 0, y: 14, filter: "blur(4px)" },
                          visible: {
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            transition: { duration: 0.4, ease: EASE },
                          },
                        }}
                        className="group flex items-start gap-3 rounded-lg border border-line bg-white px-4 py-3 transition-colors hover:border-brand-soft hover:bg-surface"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                          <Check size={12} strokeWidth={3.5} />
                        </span>
                        <span className="text-[15px] text-ink">{f}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                    <p className="text-sm text-muted">
                      {services.length - active - 1 > 0
                        ? `لسه في ${services.length - active - 1} خدمات غير دي`
                        : "دي آخر خدمة في اللستة 👈"}
                    </p>
                    <a
                      href={waLink(
                        dictionary.brand.whatsapp,
                        `مرحبًا، عايز أطلب خدمة «${current.title_ar}».`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-bold text-white shadow-md transition-all hover:bg-brand-deep hover:shadow-warm active:scale-[0.98]"
                    >
                      اطلب الخدمة
                      <ArrowUpLeft
                        size={18}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}