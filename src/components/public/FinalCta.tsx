"use client";

import { dictionary } from "@/lib/dictionary";
import { waLink } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/motion/FadeUp";

export function FinalCta() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-brand-deep to-brand text-center text-white">
      <Container>
        <FadeUp>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.3]">
            {dictionary.finalCta.title}
          </h2>
          <p className="mt-4 text-white/85 text-lg">{dictionary.finalCta.desc}</p>
          <a
            href={waLink(dictionary.brand.whatsapp, dictionary.whatsapp.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-10 py-4 text-lg font-bold transition hover:brightness-105 hover:scale-[1.02] active:scale-[0.98]"
          >
            {dictionary.finalCta.cta}
          </a>
        </FadeUp>
      </Container>
    </section>
  );
}
