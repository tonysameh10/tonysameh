import type { Metadata } from "next";
import { getAdminServices } from "@/lib/admin-data";
import { AdminPageHeader } from "@/components/admin/ui";
import { ServicesManager } from "@/components/admin/ServicesManager";

export const metadata: Metadata = {
  title: "الخدمات",
};

export default async function AdminServicesPage() {
  const services = await getAdminServices().catch(() => []);

  return (
    <div>
      <AdminPageHeader
        title="الخدمات"
        subtitle="عدّل الخدمات اللي بتظهر على الموقع، وبعدين اضغط «حفظ»"
      />
      <ServicesManager initialServices={services} />
    </div>
  );
}
