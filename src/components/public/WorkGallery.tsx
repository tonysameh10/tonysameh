"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { dictionary } from "@/lib/dictionary";
import { categoryLabels as baseCategoryLabels, projectCategories } from "@/lib/categories";
import type { Project } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const categories = ["all", ...projectCategories] as const;
type Category = (typeof categories)[number];

const categoryLabels: Record<Category, string> = {
  all: dictionary.categories.all,
  ...baseCategoryLabels,
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function WorkGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Category>("all");
  const reduce = useReducedMotion();

  const counts = categories.reduce<Record<Category, number>>((acc, cat) => {
    acc[cat] = cat === "all" ? projects.length : projects.filter((p) => p.category === cat).length;
    return acc;
  }, {} as Record<Category, number>);

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <Container>
      {/* Intro strip */}
      <div className="mb-10">
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center text-muted"
        >
          {counts.all} عمل مطبوع — صفّي بالنوع
        </motion.p>

        {/* Filters with sliding pill */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                  isActive ? "text-white" : "text-brand hover:bg-brand/5"
                )}
              >
                {isActive && !reduce && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 rounded-full bg-brand shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {isActive && reduce && (
                  <span className="absolute inset-0 rounded-full bg-brand shadow-md" />
                )}
                <span className="relative">{categoryLabels[cat]}</span>
                <span
                  className={cn(
                    "relative rounded-full px-1.5 text-xs font-bold",
                    isActive ? "bg-white/20 text-white" : "bg-accent-soft text-brand-deep"
                  )}
                >
                  {counts[cat]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted text-lg">مفيش شغل في التصنيف ده لسه — جرب تصنيف تاني.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.96 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: reduce ? 0.15 : 0.5, delay: reduce ? 0 : i * 0.05, ease: EASE }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group relative block overflow-hidden rounded-lg border border-line bg-white shadow-sm hover:shadow-warm transition-all hover:-translate-y-1.5"
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
                      className="object-cover transition-transform duration-[0.9s] ease-out group-hover:scale-105"
                    />
                    {/* always-on gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/25 to-transparent" />

                    {/* editorial index number */}
                    <span className="absolute top-4 left-5 text-sm font-black text-white/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* category chip */}
                    <span className="absolute top-4 right-5 inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-deep">
                      {categoryLabels[project.category]}
                    </span>

                    <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                      <div className="h-0.5 w-12 origin-right bg-accent scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold transition-transform duration-300 group-hover:-translate-y-1">
                          {project.title_ar}
                        </h3>
                        <span className="inline-flex h-9 w-9 shrink-0 translate-y-3 items-center justify-center rounded-full bg-accent text-white opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <ArrowUpLeft size={18} />
                        </span>
                      </div>
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
