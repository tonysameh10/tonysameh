"use client";

import { dictionary } from "@/lib/dictionary";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/motion/FadeUp";

export function Process() {
  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="آلية الشغل"
          title={dictionary.process.title}
          subtitle={dictionary.process.subtitle}
        />
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {dictionary.process.steps.map((step) => (
            <StaggerItem
              key={step.num}
              className="relative rounded-lg bg-white border border-line p-7 shadow-sm"
            >
              <div className="absolute top-6 right-7 text-5xl font-black text-accent-soft">
                {step.num}
              </div>
              <div className="relative pt-16">
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-body">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
