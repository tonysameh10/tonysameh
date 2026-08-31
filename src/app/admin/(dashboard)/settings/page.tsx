import type { Metadata } from "next";
import { getAdminSettings } from "@/lib/admin-data";
import { AdminPageHeader } from "@/components/admin/ui";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const metadata: Metadata = {
  title: "الإعدادات",
};

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings().catch(() => null);

  return (
    <div>
      <AdminPageHeader
        title="الإعدادات"
        subtitle="عدّل بيانات الموقع والسوشيال والنصوص"
      />
      <SettingsForm settings={settings} />
    </div>
  );
}
