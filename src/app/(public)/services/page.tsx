import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { getServices, getPackages } from "@/lib/data";
import { formatPrice, waLink } from "@/lib/utils";
import { dictionary } from "@/lib/dictionary";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon";
import { PageHeader } from "@/components/public/PageHeader";
import { FadeUp } from "@/components/motion/FadeUp";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "الخدمات والأسعار",
  description: "تفاصيل الخدمات والباقات والأسعار",
};

export default async function ServicesPage() {
  const [services, packages] = await Promise.all([getServices(), getPackages()]);

  return (
    <>
      <PageHeader
        eyebrow="الخدمات"
        title="الخدمات والأسعار"
        subtitle="أربع خدمات أساسية — كل واحدة بتاخد من الفوضى لملف جاهز للمطبعة"
      />

      {/* Services breakdown */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {services.map((service, i) => (
              <FadeUp
                key={service.id}
                delay={i * 0.05}
                className="rounded-lg bg-surface border border-line p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <IconBadge name={service.icon} />
                    <h2 className="text-xl font-extrabold text-ink">
                      {service.title_ar}
                    </h2>
                  </div>
                  {service.price_from !== null && service.price_from > 100 && (
                    <span
                      className="whitespace-nowrap text-lg font-bold text-brand"
                      dir="ltr"
                    >
                      {formatPrice(service.price_from)} ج.م
                    </span>
                  )}
                </div>
                {service.description && (
                  <p className="mt-3 text-body">{service.description}</p>
                )}
                <ul className="mt-5 grid grid-cols-1 gap-2.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <Check size={18} className="text-brand shrink-0" />
                      <span className="text-[15px] text-ink">{f}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison */}
      <Section className="bg-surface py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="مقارنة"
            title="مش هتلاقي في كل مكان"
            subtitle="الفرق بين الشغل الصح والشغل العادي"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "الشغل العادي",
                items: [
                  { text: "جداول بتتكسر", good: false },
                  { text: "فهرس بيتعدل بإيد", good: false },
                  { text: "ملف ممكن المطبعة ترفضه", good: false },
                  { text: "أرقام تحت فوق", good: false },
                ],
              },
              {
                title: "الشغل الصح",
                highlighted: true,
                items: [
                  { text: "جداول ومعادلات مضبوطة", good: true },
                  { text: "فهرس أوتوماتيك", good: true },
                  { text: "ملف CMYK جاهز للمطبعة", good: true },
                  { text: "نظام كامل متسق", good: true },
                ],
              },
              {
                title: "بعد التسليم",
                items: [
                  { text: "تعديلان مجانيان", good: true },
                  { text: "ملف PDF للطلبة", good: true },
                  { text: "دعم للتعديلات الجاية", good: true },
                  { text: "ملفات مطبعة سليمة", good: true },
                ],
              },
            ].map((col, i) => (
              <FadeUp
                key={col.title}
                delay={i * 0.06}
                className={
                  col.highlighted
                    ? "rounded-lg bg-white border-2 border-brand p-7 shadow-warm"
                    : "rounded-lg bg-white border border-line p-7 shadow-sm"
                }
              >
                <h3 className="text-lg font-extrabold text-ink mb-5">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item.text} className="flex items-start gap-2.5">
                      {item.good ? (
                        <Check size={18} className="text-success shrink-0 mt-0.5" />
                      ) : (
                        <X size={18} className="text-danger shrink-0 mt-0.5" />
                      )}
                      <span className="text-[15px] text-ink">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* Packages */}
      <Section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="الباقات"
            title="باقات جاهزة"
            subtitle="مش عارف تبدأ منين؟ الباقات دي بتغطي أغلب الاحتياجات"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <FadeUp
                key={pkg.id}
                className={
                  pkg.is_featured
                    ? "relative rounded-lg bg-brand-deep text-white p-8 shadow-warm"
                    : "rounded-lg bg-white border border-line p-8 shadow-sm"
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
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-[clamp(28px,3vw,36px)] font-black" dir="ltr">
                    {formatPrice(pkg.price)}
                  </span>
                  <span
                    className={pkg.is_featured ? "text-white/80 mb-1" : "text-muted mb-1"}
                  >
                    ج.م
                  </span>
                  {pkg.old_price && (
                    <span className="text-sm line-through mb-1 opacity-60" dir="ltr">
                      {formatPrice(pkg.old_price)}
                    </span>
                  )}
                </div>
                <ul className="mt-6 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        size={18}
                        className={
                          pkg.is_featured ? "text-accent shrink-0 mt-0.5" : "text-brand shrink-0 mt-0.5"
                        }
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
                      ? "mt-8 block text-center rounded-md bg-accent px-6 py-3 font-semibold text-white transition hover:brightness-105"
                      : "mt-8 block text-center rounded-md border-2 border-brand px-6 py-3 font-semibold text-brand transition hover:bg-brand/5"
                  }
                >
                  اطلب الباقة
                </a>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
