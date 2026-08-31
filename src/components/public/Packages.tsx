"use client";

import { Check } from "lucide-react";
import { formatPrice, waLink } from "@/lib/utils";
import { dictionary } from "@/lib/dictionary";
import type { Package } from "@/lib/data";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/motion/FadeUp";

export function Packages({ packages }: { packages: Package[] }) {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="الباقات"
          title="اسعار واضحة — من غير مفاجآت"
          subtitle="اختار الباقة اللي تناسب حجم شغلك"
        />
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 items-stretch">
          {packages.map((pkg) => (
            <StaggerItem
              key={pkg.id}
              className={
                pkg.is_featured
                  ? "relative rounded-lg bg-brand-deep text-white p-8 shadow-warm flex flex-col"
                  : "rounded-lg bg-white border border-line p-8 shadow-sm flex flex-col"
              }
            >
              {pkg.is_featured && (
                <span className="absolute -top-3 right-6 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white">
                  الأكثر طلبًا
                </span>
              )}
              <h3 className="text-xl font-extrabold">{pkg.name_ar}</h3>
              <p
                className={
                  pkg.is_featured ? "text-accent-soft mt-1" : "text-muted mt-1"
                }
              >
                {pkg.description}
              </p>
              <div className="mt-6 flex items-end gap-3">
                <span className="text-[clamp(28px,3vw,36px)] font-black" dir="ltr">
                  {formatPrice(pkg.price)}
                </span>
                <span className={pkg.is_featured ? "text-white/80" : "text-muted mb-1"}>
                  ج.م
                </span>
                {pkg.old_price && (
                  <span className="text-sm line-through mb-1 opacity-60" dir="ltr">
                    {formatPrice(pkg.old_price)}
                  </span>
                )}
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      className={
                        pkg.is_featured ? "text-accent mt-1" : "text-brand mt-1"
                      }
                      size={18}
                    />
                    <span className="text-[15px]">{f}</span>
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
                className={
                  pkg.is_featured
                    ? "mt-8 inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 font-semibold text-white transition hover:brightness-105"
                    : "mt-8 inline-flex items-center justify-center rounded-md border-2 border-brand px-6 py-3 font-semibold text-brand transition hover:bg-brand/5"
                }
              >
                اطلب الباقة
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
