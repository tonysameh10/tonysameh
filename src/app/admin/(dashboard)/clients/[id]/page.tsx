import { notFound } from "next/navigation";
import {
  getAdminClient,
  getAdminClientNotes,
  getAdminClientPayments,
} from "@/lib/admin-data";
import { ClientDetail } from "@/components/admin/ClientDetail";

export const metadata = {
  title: "تفاصيل العميل | لوحة التحكم",
  robots: { index: false, follow: false },
};

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [client, notes, payments] = await Promise.all([
    getAdminClient(id),
    getAdminClientNotes(id).catch(() => []),
    getAdminClientPayments(id).catch(() => []),
  ]);

  if (!client) {
    notFound();
  }

  return <ClientDetail client={client} notes={notes} payments={payments} />;
}