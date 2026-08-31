"use client";

import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/data";
import { categoryLabels } from "@/lib/categories";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/motion/FadeUp";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="الأعمال"
          title="شغل مميز"
          subtitle="نماذج من شغل اتصمم على أساس إنه يصلح للمطبعة من أول مرة"
        />
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <Link
                href={`/work/${project.slug}`}
                className="group block rounded-lg overflow-hidden bg-white border border-line shadow-sm hover:shadow-warm transition-all hover:-translate-y-1.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.cover_image}
                    alt={project.title_ar}
                    fill
                    sizes="(max-width:768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 inset-x-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-white font-bold text-lg">{project.title_ar}</h3>
                    <div className="mt-1 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-400 w-12" />
                    <span className="text-accent-soft text-sm mt-1 block">
                      {categoryLabels[project.category]}
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
          >
            شوف كل الأعمال ←
          </Link>
        </div>
      </Container>
    </Section>
  );
}
