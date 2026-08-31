"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { SeedProject } from "@/lib/seed";
import { dictionary } from "@/lib/dictionary";
import { waLink } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Lightbox } from "@/components/public/Lightbox";

const categoryLabels = {
  cover: dictionary.categories.cover,
  booklet: dictionary.categories.booklet,
  profile: dictionary.categories.profile,
  book: dictionary.categories.book,
} as const;

export function ProjectDetail({ project }: { project: SeedProject }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const gallery = project.gallery.length ? project.gallery : [project.cover_image];

  return (
    <>
      <Container className="pt-24 md:pt-28">
        {/* Hero image */}
        <motion.div
          layoutId={`project-${project.slug}`}
          className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg"
          transition={{ duration: reduce ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={project.cover_image}
            alt={project.title_ar}
            fill
            sizes="(max-width:1200px) 100vw, 1200px"
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.2, duration: 0.5 }}
          className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted"
        >
          {project.client && (
            <div>
              <span className="block text-xs text-muted">العميل</span>
              <span className="font-semibold text-ink">{project.client}</span>
            </div>
          )}
          <div>
            <span className="block text-xs text-muted">التصنيف</span>
            <span className="font-semibold text-ink">
              {categoryLabels[project.category]}
            </span>
          </div>
          {project.year && (
            <div>
              <span className="block text-xs text-muted">السنة</span>
              <span className="font-semibold text-ink" dir="ltr">
                {project.year}
              </span>
            </div>
          )}
        </motion.div>

        {/* Title + summary */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.24, duration: 0.5 }}
          className="mt-8 max-w-3xl"
        >
          <h1 className="text-[clamp(28px,4vw,42px)] font-extrabold text-ink leading-tight">
            {project.title_ar}
          </h1>
          {project.summary_ar && (
            <p className="mt-4 text-[18px] leading-[1.9] text-body">
              {project.summary_ar}
            </p>
          )}
        </motion.div>
      </Container>

      {/* Gallery */}
      <Container className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gallery.map((img, i) => (
            <motion.button
              key={img + i}
              type="button"
              onClick={() => setLightbox(i)}
              initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
              whileInView={
                reduce
                  ? { opacity: 1 }
                  : { clipPath: "inset(0 0 0% 0)" }
              }
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: reduce ? 0.15 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-zoom-in"
            >
              <Image
                src={img}
                alt={`${project.title_ar} — صورة ${i + 1}`}
                fill
                sizes="(max-width:768px) 100vw, 600px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </Container>

      {/* Behance CTA */}
      {project.behance_url && (
        <Container className="mt-12">
          <div className="rounded-lg bg-gradient-to-b from-brand-deep to-brand p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-warm">
            <div>
              <h3 className="text-2xl font-extrabold">شوف المشروع كامل على بيهانس</h3>
              <p className="mt-2 text-white/85">التفاصيل الكاملة وكل الصور</p>
            </div>
            <a
              href={project.behance_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-8 py-3.5 font-bold transition hover:brightness-105 hover:scale-[1.02]"
            >
              عرض على Behance
              <ArrowUpRight size={20} />
            </a>
          </div>
        </Container>
      )}

      {/* Bottom CTA */}
      <Container className="mt-16 text-center py-8">
        <h2 className="text-2xl font-extrabold text-ink">عايز شغل زي ده؟</h2>
        <a
          href={waLink(dictionary.brand.whatsapp, dictionary.whatsapp.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-brand px-8 py-3.5 font-bold text-white transition hover:bg-brand-deep hover:scale-[1.02]"
        >
          {dictionary.finalCta.cta}
        </a>
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
