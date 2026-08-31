"use client";

import { dictionary } from "@/lib/dictionary";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/motion/CountUp";
import { Stagger, StaggerItem } from "@/components/motion/FadeUp";

export function Stats() {
  return (
    <section className="bg-surface py-14 md:py-16">
      <Container>
        <div className="relative border-t border-line pt-12">
          <span className="absolute -top-px left-0 h-px w-16 bg-gradient-to-r from-accent to-brand-soft" aria-hidden />
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {dictionary.stats.items.map((item) => (
              <StaggerItem key={item.label} className="text-center">
                <div className="text-[clamp(28px,4vw,40px)] font-black text-brand-deep leading-none">
                  <CountUp value={item.value} suffix={item.suffix} />
                </div>
                <div className="mt-3 text-body font-semibold">{item.label}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
