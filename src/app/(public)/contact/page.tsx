import type { Metadata } from "next";
import { Section, Container } from "@/components/ui/container";
import { PageHeader } from "@/components/public/PageHeader";
import { ContactForm } from "@/components/public/ContactForm";

export const metadata: Metadata = {
  title: "?? ??? ?? ?????",
  description: "???? ??? ?? ?????? ?? ???????",
};

export default function ContactPage() {
  return (
    <Section className="pt-16 md:pt-20">
      <PageHeader
        eyebrow="تواصل"
        title="يلا نبدأ شغلنا"
        subtitle="مكالمة قصيرة أو واتساب لحل أي تفاصيل — بدون التزامات."
      />
      <Container className="pt-4">
        <ContactForm />
      </Container>
    </Section>
  );
}
