"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/lib/data";
import { categoryLabels } from "@/lib/categories";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/FadeUp";
import { cn } from "@/lib/utils";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
  const [first, ...rest] = projects;

  return (
    <Section className="bg-surface">
      <Container>
        <FadeUp>
          <SectionHeading
            eyebrow="الأعمال"
            title="شغل مميز اتصمم للمطبعة"
            subtitle="بنماذج من ملفات اتعملت على أساس إنها تطلع صحيحة من أول مرة"
          />
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-7">
          {/* Featured lead item */}
          <Stagger className="lg:col-span-2">
            <StaggerItem>
              <Link
                href={`/work/${first.slug}`}
                className="group relative block overflow-hidden rounded-lg border border-line bg-white shadow-sm hover:shadow-warm transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden">
                  <Image
                    src={first.cover_image}
                    alt={first.title_ar}
                    fill
                    sizes="(max-width:1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/25 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white">
                    <span className="inline-block mb-3 rounded-full bg-accent px-3 py-1 text-xs font-bold">
                      {categoryLabels[first.category]}
                    </span>
                    <h3 className="text-xl md:text-3xl font-black leading-tight">
                      {first.title_ar}
                    </h3>
                    <div className="mt-3 inline-flex items-center gap-2 text-accent-soft font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      شوف الشغل
                      <ArrowLeft size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          </Stagger>

          {/* Side stack */}
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-7">
            {rest.map((project) => (
              <StaggerItem key={project.id}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group block overflow-hidden rounded-lg border border-line bg-white shadow-sm hover:shadow-warm transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.cover_image}
                      alt={project.title_ar}
                      fill
                      sizes="(max-width:768px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 inset-x-0 p-5 text-white translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="font-bold text-lg">{project.title_ar}</h3>
                      <span className="text-accent-soft text-sm mt-1 block">
                        {categoryLabels[project.category]}
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <FadeUp className="mt-10 text-center">
          <Link
            href="/work"
            className={cn(
              "group inline-flex items-center gap-2 rounded-md border-2 border-brand px-8 py-3.5",
              "font-semibold text-brand transition-all hover:bg-brand hover:text-white"
            )}
          >
            شوف كل الأعمال
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          </Link>
        </FadeUp>
      </Container>
    </Section>
  );
}
