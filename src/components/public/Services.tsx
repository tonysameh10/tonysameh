"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Service } from "@/lib/data";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon";
import { Stagger, StaggerItem } from "@/components/motion/FadeUp";

export function Services({ services }: { services: Service[] }) {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="الخدمات"
          title="إيه اللي بعمله؟"
          subtitle="أربع خدمات أساسية — كل واحدة بتاخد من الفوضى لملف جاهز للمطبعة"
        />
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {services.map((service) => (
            <StaggerItem
              key={service.id}
              className="group rounded-lg bg-white border border-line p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <IconBadge name={service.icon} />
                  <h3 className="text-lg font-bold text-ink">
                    {service.title_ar}
                  </h3>
                </div>
                {service.price_from !== null && service.price_from > 100 && (
                  <span className="whitespace-nowrap text-sm font-bold text-brand">
                    من {formatPrice(service.price_from)} ج.م
                  </span>
                )}
              </div>
              {service.description && (
                <p className="mt-3 text-body">{service.description}</p>
              )}
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="inline-flex items-center rounded-full bg-accent-soft/60 px-3 py-1 text-sm text-brand-deep"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
          >
            تفاصيل الخدمات والأسعار ←
          </Link>
        </div>
      </Container>
    </Section>
  );
}
