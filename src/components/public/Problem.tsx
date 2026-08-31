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
          {dictionary.problem.cards.map((card) => (
            <StaggerItem
              key={card.title}
              className="rounded-lg bg-white border border-line p-7 shadow-sm hover:shadow-md transition-shadow"
            >
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
