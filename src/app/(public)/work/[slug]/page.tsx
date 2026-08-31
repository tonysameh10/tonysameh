import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seedProjects } from "@/lib/seed";
import { ProjectDetail } from "@/components/public/ProjectDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = seedProjects.find((p) => p.slug === slug && p.published);
  if (!project) return {};
  return {
    title: project.title_ar,
    description: project.summary_ar,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = seedProjects.find((p) => p.slug === slug && p.published);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
