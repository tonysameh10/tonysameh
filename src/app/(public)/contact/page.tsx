import type { Metadata } from "next";
import { dictionary } from "@/lib/dictionary";
import { Section, Container } from "@/components/ui/container";
import { ContactForm } from "@/components/public/ContactForm";

export const metadata: Metadata = {
  title: "تواصل معايا",
  description: "اطلب شغل أو استفسر عن الخدمات",
};

export default function ContactPage() {
  return (
    <Section className="pt-24 md:pt-28">
      <Container className="text-center mb-16">
        <h1 className="text-[clamp(32px,5vw,48px)] font-black text-ink">
          {dictionary.nav.contact}
        </h1>
        <p className="mt-4 text-body text-lg max-w-2xl mx-auto">
          ابعت تفاصيل شغلك — هبعتلك مراجعة مجانية على أول صفحات.
        </p>
      </Container>
      <Container>
        <ContactForm />
      </Container>
    </Section>
  );
}
