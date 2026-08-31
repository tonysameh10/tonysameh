"use client";

import { dictionary } from "@/lib/dictionary";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon";
import { Stagger, StaggerItem } from "@/components/motion/FadeUp";

export function Problem() {
  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading title={dictionary.problem.title} />
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {dictionary.problem.cards.map((card, i) => (
            <StaggerItem
              key={card.title}
              className="group relative overflow-hidden rounded-lg bg-white border border-line p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <span className="absolute top-5 left-6 text-5xl font-black text-accent-soft/70 transition-colors group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mb-4">
                <IconBadge name={card.icon} />
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">{card.title}</h3>
              <p className="text-body">{card.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
