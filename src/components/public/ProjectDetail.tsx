"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  Layers,
  PenTool,
  ChevronLeft,
  MessageCircle,
} from "lucide-react";
import type { Project } from "@/lib/data";
import { categoryLabels } from "@/lib/categories";
import { dictionary } from "@/lib/dictionary";
import { waLink } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Lightbox } from "@/components/public/Lightbox";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectDetail({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const gallery = useMemo(
    () => (project.gallery.length ? project.gallery : [project.cover_image]),
    [project.gallery, project.cover_image]
  );

  const meta = useMemo(() => {
    const fields: { label: string; value: string; dir?: "ltr" }[] = [
      { label: "التصنيف", value: categoryLabels[project.category] },
    ];
    if (project.client) fields.push({ label: "العميل", value: project.client });
    if (project.year) fields.push({ label: "السنة", value: `${project.year}`, dir: "ltr" });
    return fields;
  }, [project]);

  return (
    <>
      {/* Cinematic hero with masked reveal */}
      <Container className="relative pt-8 md:pt-12">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center justify-between gap-4"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-deep"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent-soft/50 text-brand transition-all group-hover:bg-brand group-hover:text-white">
              <ArrowUpLeft size={16} />
            </span>
            كل الأعمال
          </Link>
          <span className="flex items-center gap-3 text-xs font-bold tracking-wide text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            معرض الأعمال
          </span>
        </motion.div>

        {/* Hero image — masked cinematic reveal */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: reduce ? 0.2 : 0.95, delay: reduce ? 0 : 0.08, ease: EASE }}
          className="relative mt-7 aspect-[16/10] overflow-hidden rounded-2xl shadow-warm ring-1 ring-line md:aspect-[16/8]"
        >
          <Image
            src={project.cover_image}
            alt={project.title_ar}
            fill
            sizes="(max-width:1200px) 100vw, 1200px"
            priority
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-deep/40 via-transparent to-transparent" />

          {/* floating caption */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0.1 : 0.7, ease: EASE }}
            className="absolute bottom-5 right-5 left-5 flex flex-wrap items-end justify-between gap-4 text-white"
          >
            <div>
              <p className="text-sm font-bold text-accent-soft">
                {categoryLabels[project.category]}
              </p>
              <h1 className="mt-1 text-3xl font-black leading-tight md:text-5xl">
                {project.title_ar}
              </h1>
            </div>
            {project.year && (
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-black backdrop-blur" dir="ltr">
                {project.year}
              </span>
            )}
          </motion.div>
        </motion.div>
      </Container>

      {/* Sticky meta strip + summary */}
      <Container className="mt-10 md:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] gap-8 lg:gap-14">
          {/* Left: summary + deliverables */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="flex items-center gap-2 text-sm font-bold text-brand">
              <span className="h-[2px] w-8 rounded-full bg-accent" />
              عن المشروع
            </p>
            {project.summary_ar && (
              <p className="mt-4 text-lg leading-[1.95] text-body md:text-xl">
                {project.summary_ar}
              </p>
            )}

            {project.deliverables.length > 0 && (
              <div className="mt-8 rounded-2xl border border-line bg-surface p-6 md:p-7">
                <p className="flex items-center gap-2 text-sm font-bold text-brand">
                  <PenTool size={17} />
                  مكونات المشروع
                </p>
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.deliverables.map((d, i) => (
                    <motion.li
                      key={d}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.06, ease: EASE }}
                      className="flex items-center gap-3 rounded-lg bg-white px-4 py-3"
                    >
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                        <Check size={13} strokeWidth={3.5} />
                      </span>
                      <span className="text-[15px] text-ink">{d}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Right: sticky id/meta card */}
          <motion.aside
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.1, ease: EASE }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
              <div aria-hidden className="h-1.5 bg-gradient-to-l from-brand via-brand-soft to-accent" />
              <div className="p-7">
                <div className="flex items-baseline justify-between border-b border-line pb-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-muted">
                    معرّف المشروع
                  </span>
                  <span className="text-2xl font-black text-brand" dir="ltr">
                    #{project.id.slice(0, 6)}
                  </span>
                </div>

                <dl className="divide-y divide-line">
                  {meta.map((f) => (
                    <div key={f.label} className="flex items-center justify-between py-4">
                      <dt className="text-sm font-bold text-muted">{f.label}</dt>
                      <dd className="text-base font-extrabold text-ink" dir={f.dir}>
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <a
              href={waLink(
                dictionary.brand.whatsapp,
                `مرحبًا، عجبني مشروع «${project.title_ar}» وعايز شغل زي ده.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-wa px-6 py-4 font-bold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-warm active:scale-[0.99]"
            >
              <MessageCircle size={19} />
              اطلب شغل زي ده
            </a>
          </motion.aside>
        </div>
      </Container>

      {/* Gallery — cinematic scroll reveals */}
      {gallery.length > 1 && (
        <Container className="mt-16 md:mt-20">
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-8 flex items-center gap-2 text-sm font-bold text-brand"
          >
            <Layers size={17} />
            معرض الصور — اضغط على أي صورة لتكبيرها
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gallery.map((img, i) => (
              <motion.button
                key={img + i}
                type="button"
                onClick={() => setLightbox(i)}
                initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
                whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: reduce ? 0.15 : 0.8, delay: reduce ? 0 : i * 0.08, ease: EASE }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-line cursor-zoom-in"
              >
                <Image
                  src={img}
                  alt={`${project.title_ar} — صورة ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 100vw, 600px"
                  className="object-cover transition-transform duration-[0.9s] ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-deep/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-brand-deep/80 px-3 py-1.5 text-xs font-bold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <ChevronLeft size={14} />
                  صورة {String(i + 1).padStart(2, "0")}
                </span>
              </motion.button>
            ))}
          </div>
        </Container>
      )}

      {/* Behance CTA */}
      {project.behance_url && (
        <Container className="mt-16 md:mt-20">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-bl from-brand-deep to-brand p-8 text-white shadow-warm md:p-12"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="texture-dots absolute inset-0 opacity-20" />
              <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border-[14px] border-white/5" />
            </div>
            <div className="relative flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-right">
              <div>
                <h3 className="text-[clamp(22px,3vw,30px)] font-black">
                  شوف المشروع كامل على بيهانس
                </h3>
                <p className="mt-2 text-white/85">
                  التفاصيل الكاملة وكل الصور عالية الجودة
                </p>
              </div>
              <a
                href={project.behance_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-8 py-4 font-bold shadow-lg transition-all hover:scale-[1.03]"
              >
                عرض على Behance
                <ArrowUpRight
                  size={20}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </motion.div>
        </Container>
      )}

      {/* Bottom CTA */}
      <Container className="mt-20 border-t border-line pt-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">شفت مشروع عجبك؟</h2>
            <p className="mt-2 text-body">
              عندي شغل كتير تاني وشغال على مختلف التصنيفات.
            </p>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-deep hover:scale-[1.02]"
          >
            كل الأعمال
            <ArrowUpLeft
              size={18}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="mt-12 flex flex-col items-center overflow-hidden rounded-2xl border border-line bg-surface p-10 text-center">
          <span aria-hidden className="text-4xl">✋</span>
          <h3 className="mt-2 text-2xl font-extrabold text-ink">عايز شغل زي ده؟</h3>
          <p className="mt-2 text-body">
            كلمني على الواتس ونبدأ نحكي عن مشروعك.
          </p>
          <a
            href={waLink(dictionary.brand.whatsapp, dictionary.whatsapp.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 font-bold text-white transition hover:bg-brand-deep hover:scale-[1.02]"
          >
            {dictionary.finalCta.cta}
          </a>
        </div>
      </Container>

      {lightbox !== null && (
        <Lightbox
          images={gallery}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={(i) => setLightbox(i)}
        />
      )}
    </>
  );
}