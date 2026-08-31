import type { Metadata } from "next";
import { dictionary } from "@/lib/dictionary";
import { Section } from "@/components/ui/container";
import { PageHeader } from "@/components/public/PageHeader";
import { WorkGallery } from "@/components/public/WorkGallery";
import { getProjects } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: dictionary.workPage.title,
  description: dictionary.workPage.subtitle,
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <Section className="pt-16 md:pt-20">
      <PageHeader
        eyebrow="معرض الأعمال"
        title={dictionary.workPage.title}
        subtitle={dictionary.workPage.subtitle}
      />
      <WorkGallery projects={projects} />
    </Section>
  );
}
