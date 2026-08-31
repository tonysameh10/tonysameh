import type { Metadata } from "next";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { AdminPageHeader } from "@/components/admin/ui";

export const metadata: Metadata = {
  title: "مشروع جديد",
};

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader title="مشروع جديد" subtitle="املأ التفاصيل و انشر أو احفظ كمسودة" />
      <ProjectForm />
    </div>
  );
}
