"use client";

import { dictionary } from "@/lib/dictionary";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon";
import { Stagger, StaggerItem } from "@/components/motion/FadeUp";

export function WhyMe() {
  return (
    <Section className="bg-brand-deep text-white">
      <Container>
        <SectionHeading
          title={dictionary.whyMe.title}
          dark
          className="mb-12 md:mb-16"
        />
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dictionary.whyMe.cards.map((card) => (
              <StaggerItem
                key={card.title}
                className="rounded-lg bg-white/5 border border-white/10 p-7"
              >
                <div className="mb-4">
                  <IconBadge name={card.icon} tone="light" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-white/80">{card.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
      </Container>
    </Section>
  );
}
