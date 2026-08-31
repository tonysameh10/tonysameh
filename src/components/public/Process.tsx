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
        <Stagger className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          <div
            aria-hidden
            className="hidden lg:block absolute top-7 right-0 left-0 h-px bg-gradient-to-l from-brand-soft/0 via-brand-soft/60 to-brand-soft/0"
          />
          {dictionary.process.steps.map((step) => (
            <StaggerItem
              key={step.num}
              className="relative rounded-lg bg-white border border-line p-7 pt-12 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-5 right-7 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand text-white font-black text-lg shadow-warm ring-4 ring-surface">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-body">{step.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
