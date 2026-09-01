"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, Layers } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { PageHeader } from "@/components/public/PageHeader";
import { Icon } from "@/components/ui/icon";
import { waLink } from "@/lib/utils";
import { dictionary } from "@/lib/dictionary";
import { Stagger, StaggerItem, FadeUp } from "@/components/motion/FadeUp";

const EASE = [0.22, 1, 0.36, 1] as const;

const fields = [
  { icon: "sparkles", title: "الهوية البصرية", desc: "لوجو و هوية متكاملة تصنع حضور مستمر" },
  { icon: "building", title: "مطبوعات الشركات", desc: "بروفايلات وكتالوجات وتقارير تفرض وجودك" },
  { icon: "books", title: "الكتب والنشر", desc: "إخراج احترافي للمؤلفين ودور النشر" },
  { icon: "covers", title: "الأغلفة والسلاسل", desc: "أغلفة بحضور يسجّل قبل ما يفتحوا" },
  { icon: "printer", title: "المطبوعات الدعائية", desc: "فلايرات وبروشورات ومنيوهات تبان محترمة" },
  { icon: "pen", title: "التصميم الرقمي", desc: "سوشيال ميديا وعروض تقديمية بهوية واحدة" },
];

const approach = [
  "الفكرة قبل الشكل — التصميم بيخدم الهدف مش العكس",
  "نظام قبل جمال: كل عنصر ليه مكانه وهيشتغل مع باقي النظام",
  "الملف يطلع جاهز للمطبعة من أول مرة — CMYK وبليد وخطوط سليمة",
  "تعديلان مجانيان على كل عمل، والتواصل مباشر ومفتوح",
];

const tools = ["Adobe InDesign", "Illustrator", "Photoshop", "Acrobat Pro"];

export function About() {
  const reduce = useReducedMotion();

  return (
    <>
      <PageHeader
        eyebrow="من أنا"
        title="Tony Sameh — مصمم طباعة"
        subtitle="شغّال على هوية بصرية، مطبوعات، كتب، وإخراج يجمع بين النظام والجمال."
      />

      {/* Who I am + portrait */}
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-14 items-center">
            <FadeUp>
              <div className="relative mx-auto max-w-sm">
                <div aria-hidden className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-brand-soft/30 to-accent-soft/40" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-warm ring-1 ring-line">
                  <Image
                    src="/images/tony.png"
                    alt={dictionary.brand.name}
                    fill
                    sizes="(max-width:768px) 90vw, 400px"
                    className="object-cover"
                  />
                </div>
                <span className="absolute -bottom-4 right-5 rounded-full bg-brand-deep px-4 py-2 text-sm font-bold text-white shadow-md">
                  {dictionary.brand.tagline}
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="flex items-center gap-2 text-sm font-bold text-brand">
                <span className="h-[2px] w-8 rounded-full bg-accent" />
                عني في كام سطر
              </p>
              <h2 className="mt-4 text-[clamp(26px,3.5vw,34px)] font-black text-ink leading-[1.3]">
                بشتغل بالنظام والتفاصيل — عشان شكلك يوصل قد ما مستواك يستاهل
              </h2>
              <p className="mt-5 text-body text-lg leading-[1.95]">
                أنا مصمم طباعة، تخصصي إن المنتج النهائي يطلع جاهز للمطبعة من أول مرة —
                من الهوية البصرية والبروفايلات والكتالوجات، لكتب وأغلفة ومطبوعات دعائية.
                بستثمر في Adobe InDesign و Illustrator و Photoshop عشان كل ملف يطلع
                متسق، مضبوط المعادلات والجداول، وسليم الطباعة.
              </p>
              <p className="mt-3 text-body leading-[1.95]">
                مبدأي مش «شكل حلو» وخلاص — النظام قبل الجمال. لو أي مصمم تاني بعدي
                هيشتغل على مشروعك، هيلاقي كل حاجة موثّقة وواضحة.
              </p>

              <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {approach.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: reduce ? 0 : 0.1 + i * 0.08, ease: EASE }}
                    className="flex items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3"
                  >
                    <Check size={17} className="mt-0.5 shrink-0 text-brand" />
                    <span className="text-[15px] text-ink">{p}</span>
                  </motion.li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* Fields */}
      <Section className="bg-surface">
        <Container>
          <SectionHeading
            eyebrow="بحبّهم كلهم"
            title="مجالات تصميم واسعة"
            subtitle="مش حابس نفسي في مجال واحد — دي كل اللي بقدر أخدمك فيه"
          />
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((f) => (
              <StaggerItem
                key={f.title}
                className="group rounded-xl bg-white border border-line p-6 transition-all hover:-translate-y-1 hover:shadow-warm"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft/60 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name={f.icon} size={22} />
                </div>
                <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm text-body">{f.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Tools + CTA */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 items-stretch">
            <FadeUp className="rounded-2xl border border-line bg-surface p-8">
              <h3 className="flex items-center gap-2 text-xl font-black text-ink">
                <Layers size={20} className="text-brand" />
                أدوات الشغل
              </h3>
              <p className="mt-3 text-body">
                شغال بمنظومة Adobe المتكاملة — عشان ملفك يطلع بمستوى دور النشر المهنية.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span key={t} className="rounded-full bg-accent-soft/60 px-4 py-1.5 text-sm font-bold text-brand-deep">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-body">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-success" />
                  ملف جاهز للمطبعة من أول مرة
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                  تعديلان مجانيان
                </span>
              </div>
            </FadeUp>

            <FadeUp
              delay={0.1}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-bl from-brand-deep to-brand p-8 text-white shadow-warm"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="texture-dots absolute inset-0 opacity-20" />
                <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[12px] border-white/5" />
              </div>
              <div className="relative">
                <h3 className="text-2xl font-black">عندك فكرة أو ملف محتاج شغل؟</h3>
                <p className="mt-2 text-white/85 leading-relaxed">
                  ابعتلي تفاصيل مشروعك على واتساب — وهقولك نبدأ منين وأي حاجة هتحتاجها.
                </p>
                <a
                  href={waLink(dictionary.brand.whatsapp, dictionary.whatsapp.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-bold text-white shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98]"
                >
                  كلمني على واتساب
                  <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                </a>
              </div>
            </FadeUp>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-brand font-semibold hover:underline"
            >
              شوف الخدمات والتفاصيل
              <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}