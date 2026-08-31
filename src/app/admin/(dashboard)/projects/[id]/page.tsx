import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminProjects } from "@/lib/admin-data";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { AdminPageHeader } from "@/components/admin/ui";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "تعديل مشروع",
};

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const projects = await getAdminProjects().catch(() => []);
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div>
      <AdminPageHeader title="تعديل مشروع" subtitle={project.title_ar} />
      <ProjectForm project={project} />
    </div>
  );
}
