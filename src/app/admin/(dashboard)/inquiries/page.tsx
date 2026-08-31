import type { Metadata } from "next";
import { getAdminInquiries } from "@/lib/admin-data";
import { AdminPageHeader } from "@/components/admin/ui";
import { InquiriesTable } from "@/components/admin/InquiriesTable";

export const metadata: Metadata = {
  title: "الاستفسارات",
};

export default async function AdminInquiriesPage() {
  const inquiries = await getAdminInquiries().catch(() => []);

  return (
    <div>
      <AdminPageHeader
        title="الاستفسارات"
        subtitle="كل الرسائل اللي جت من صفحة التواصل"
      />
      <InquiriesTable initialInquiries={inquiries} />
    </div>
  );
}
