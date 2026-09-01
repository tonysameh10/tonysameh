import { getAdminClients } from "@/lib/admin-data";
import { AdminPageHeader } from "@/components/admin/ui";
import { ClientsManager } from "@/components/admin/ClientsManager";

export const metadata = {
  title: "العملاء | لوحة التحكم",
  robots: { index: false, follow: false },
};

export default async function AdminClientsPage() {
  const clients = await getAdminClients().catch(() => []);

  return (
    <div>
      <AdminPageHeader
        title="العملاء"
        subtitle="سجلّك الخاص بالعملاء — شغلك أنت بس، مش ظاهر في الموقع"
      />
      <ClientsManager initialClients={clients} />
    </div>
  );
}