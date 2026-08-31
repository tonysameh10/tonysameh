import type { Metadata } from "next";
import { dictionary } from "@/lib/dictionary";
import { Container, Section } from "@/components/ui/container";
import { WorkGallery } from "@/components/public/WorkGallery";

export const metadata: Metadata = {
  title: dictionary.workPage.title,
  description: dictionary.workPage.subtitle,
};

export default function WorkPage() {
  return (
    <Section className="pt-24 md:pt-28">
      <Container className="text-center mb-16">
        <h1 className="text-[clamp(32px,5vw,48px)] font-black text-ink">
          {dictionary.workPage.title}
        </h1>
        <p className="mt-4 text-body text-lg max-w-2xl mx-auto">
          {dictionary.workPage.subtitle}
        </p>
      </Container>
      <WorkGallery />
    </Section>
  );
}
