import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminProjects } from "@/lib/admin-data";
import { AdminPageHeader } from "@/components/admin/ui";
import { ProjectsTable } from "@/components/admin/ProjectsTable";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects().catch(() => []);

  return (
    <div>
      <AdminPageHeader
        title="المشاريع"
        subtitle="اسحب لإعادة الترتيب، بدّل النشر والمميز من أمكانهم"
        actions={
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-deep"
          >
            <Plus size={16} />
            مشروع جديد
          </Link>
        }
      />
      <ProjectsTable initialProjects={projects} />
    </div>
  );
}
