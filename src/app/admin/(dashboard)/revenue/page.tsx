import { getAdminPayments, getAdminClients } from "@/lib/admin-data";
import { AdminPageHeader } from "@/components/admin/ui";
import { RevenueManager } from "@/components/admin/RevenueManager";

export const metadata = {
  title: "الإيرادات والمدفوعات | لوحة التحكم",
  robots: { index: false, follow: false },
};

export default async function AdminRevenuePage() {
  const [payments, clients] = await Promise.all([
    getAdminPayments().catch(() => []),
    getAdminClients().catch(() => []),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="الإيرادات والمدفوعات"
        subtitle="سجل المتحصلات والمستحقات — شغلك أنت بس، مش ظاهر في الموقع"
      />
      <RevenueManager initialPayments={payments} clients={clients} />
    </div>
  );
}