"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { dictionary } from "@/lib/dictionary";
import { seedProjects } from "@/lib/seed";
import { Container } from "@/components/ui/container";

const categories = ["all", "cover", "booklet", "profile", "book"] as const;
type Category = (typeof categories)[number];

const categoryLabels: Record<Category, string> = {
  all: dictionary.categories.all,
  cover: dictionary.categories.cover,
  booklet: dictionary.categories.booklet,
  profile: dictionary.categories.profile,
  book: dictionary.categories.book,
};

export function WorkGallery() {
  const [active, setActive] = useState<Category>("all");
  const reduce = useReducedMotion();

  const published = seedProjects.filter((p) => p.published);
  const filtered =
    active === "all"
      ? published
      : published.filter((p) => p.category === active);

  return (
    <Container>
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={
              active === cat
                ? "rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors"
                : "rounded-full border border-brand/40 px-5 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand/5"
            }
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted text-lg">
            مفيش شغل في التصنيف ده لسه — جرب تصنيف تاني.
          </p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group block rounded-lg overflow-hidden bg-white border border-line shadow-sm hover:shadow-warm transition-all hover:-translate-y-1.5"
                >
                  <motion.div
                    layoutId={`project-${project.slug}`}
                    className="relative aspect-[4/5] overflow-hidden"
                  >
                    <Image
                      src={project.cover_image}
                      alt={project.title_ar}
                      fill
                      sizes="(max-width:768px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 inset-x-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="text-white font-bold text-lg">
                        {project.title_ar}
                      </h3>
                      <div className="mt-1 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-400 w-12" />
                      <span className="text-accent-soft text-sm mt-1 block">
                        {categoryLabels[project.category]}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Container>
  );
}
