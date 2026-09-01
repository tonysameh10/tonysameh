"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate, motion, useReducedMotion } from "framer-motion";
import { Check, Crown, ArrowLeft } from "lucide-react";
import { formatPrice, waLink } from "@/lib/utils";
import { dictionary } from "@/lib/dictionary";
import type { Package } from "@/lib/data";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { PriceTag } from "@/components/ui/PriceTag";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function CountPrice({
  value,
  className,
  dark = false,
}: {
  value: number;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(() => (reduce ? value : 0));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} dir="ltr" className={cn("tabular-nums", dark && "text-white", className)}>
      {formatPrice(display)}
    </span>
  );
}

export function PackagesShowcase({
  packages,
  showPrices,
}: {
  packages: Package[];
  showPrices: boolean;
}) {
  const reduce = useReducedMotion();
  const featured = packages.find((p) => p.is_featured);
  const rest = packages.filter((p) => !p.is_featured);

  return (
    <Section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="texture-dots absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-accent-soft/40 blur-3xl" />
        <div className="absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-brand-soft/20 blur-3xl" />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="الباقات"
          title="باقات جاهزة — من غير مفاجآت"
          subtitle="لو مش عارف تبدأ منين، اللستة دي بتغطي أغلب الاحتياجات."
        />

        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-6 items-stretch">
          {/* Non-featured packages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {rest.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: reduce ? 0.15 : 0.55, delay: reduce ? 0 : i * 0.1, ease: EASE }}
                className="group relative flex flex-col rounded-2xl border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-soft hover:shadow-warm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-ink">{pkg.name_ar}</h3>
                  <span
                    aria-hidden
                    className="text-xs font-bold tracking-wider text-muted"
                  >
                    باقة
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-muted">{pkg.description}</p>

                <div className="mt-5">
                  {showPrices ? (
                    <div className="flex items-end gap-2">
                      <CountPrice value={pkg.price} className="text-[clamp(26px,3vw,34px)] font-black text-brand" />
                      <span className="mb-1 text-body">ج.م</span>
                      {pkg.old_price && (
                        <span className="mb-1 text-sm line-through opacity-50" dir="ltr">
                          {formatPrice(pkg.old_price)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <PriceTag
                      price={pkg.price}
                      show={false}
                      message={`مرحبًا، عايز أعرف سعر باقة «${pkg.name_ar}».`}
                    />
                  )}
                </div>

                <span aria-hidden className="my-5 block h-px w-full bg-line" />

                <ul className="flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <Check size={12} strokeWidth={3.5} />
                      </span>
                      <span className="text-[15px] text-ink">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(
                    dictionary.brand.whatsapp,
                    `مرحبًا، عايز أستفسر عن باقة «${pkg.name_ar}».`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand px-6 py-3 font-bold text-brand transition-colors hover:bg-brand hover:text-white"
                >
                  اطلب الباقة
                  <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Featured package */}
          {featured && (
            <motion.div
              layout
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduce ? 0.15 : 0.6, ease: EASE }}
              className="relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-bl from-brand-deep to-brand p-8 text-white shadow-warm md:p-10"
            >
              {/* decorative ring + dots */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[14px] border-white/5" />
                <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full border-[10px] border-white/5" />
                <div className="texture-dots absolute inset-0 opacity-10" />
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-black text-white shadow-md">
                <Crown size={14} className="fill-white/90" />
                الأكثر طلبًا
              </span>

              <div className="relative mt-6">
                <h3 className="text-3xl font-black md:text-4xl">{featured.name_ar}</h3>
                <p className="mt-2 text-lg text-accent-soft">{featured.description}</p>
              </div>

              <div className="relative mt-7">
                {showPrices ? (
                  <div className="flex items-end gap-3">
                    <CountPrice
                      value={featured.price}
                      dark
                      className="text-[clamp(42px,5vw,56px)] font-black leading-none"
                    />
                    <span className="mb-1 text-lg text-white/80">ج.م</span>
                    {featured.old_price && (
                      <span className="mb-1 text-base text-white/50 line-through" dir="ltr">
                        {formatPrice(featured.old_price)}
                      </span>
                    )}
                    <span className="mb-1 ml-auto inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-accent-soft">
                      التوفير {featured.old_price ? 100 - Math.round((featured.price / featured.old_price) * 100) : 0}%
                    </span>
                  </div>
                ) : (
                  <PriceTag
                    price={featured.price}
                    show={false}
                    message={`مرحبًا، عايز أعرف سعر باقة «${featured.name_ar}».`}
                    tone="light"
                    size="lg"
                  />
                )}
              </div>

              <div
                aria-hidden
                className="relative my-7 h-px w-full bg-white/15 [mask-image:linear-gradient(to_left,black,transparent)]"
              />

              <ul className="relative flex-1 space-y-3.5">
                {featured.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
                    whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: reduce ? 0.15 : 0.4, delay: reduce ? 0 : i * 0.07, ease: EASE }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <Check size={12} strokeWidth={3.5} />
                    </span>
                    <span className="text-[15px] text-white/95">{f}</span>
                  </motion.li>
                ))}
              </ul>

              <a
                href={waLink(
                  dictionary.brand.whatsapp,
                  `مرحبًا، عايز أطلب باقة «${featured.name_ar}».`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-black text-white shadow-lg transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
              >
                اطلب الباقة دي
                <ArrowLeft size={19} />
              </a>
            </motion.div>
          )}
        </div>
      </Container>
    </Section>
  );
}