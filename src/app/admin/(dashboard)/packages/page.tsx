import type { Metadata } from "next";
import { getAdminPackages } from "@/lib/admin-data";
import { AdminPageHeader } from "@/components/admin/ui";
import { PackagesManager } from "@/components/admin/PackagesManager";

export const metadata: Metadata = {
  title: "الباقات",
};

export default async function AdminPackagesPage() {
  const packages = await getAdminPackages().catch(() => []);

  return (
    <div>
      <AdminPageHeader
        title="الباقات"
        subtitle="عدّل الباقات وبعدين اضغط «حفظ»"
      />
      <PackagesManager initialPackages={packages} />
    </div>
  );
}
