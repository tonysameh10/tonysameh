import Link from "next/link";
import {
  Plus,
  Users,
  FolderKanban,
  MessagesSquare,
  TrendingUp,
  Wallet,
  UserRound,
} from "lucide-react";
import {
  getAdminProjects,
  getAdminInquiries,
  getAdminSettings,
  getAdminClients,
  getAdminPayments,
} from "@/lib/admin-data";
import { formatDate } from "@/lib/utils";
import { AdminCard, AdminPageHeader } from "@/components/admin/ui";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { AvailabilityToggle } from "@/components/admin/AvailabilityToggle";
import type { Inquiry } from "@/lib/admin-data";

async function getData() {
  const [projects, inquiries, settings, clients, payments] = await Promise.all([
    getAdminProjects().catch(() => []),
    getAdminInquiries().catch(() => []),
    getAdminSettings().catch(() => null),
    getAdminClients().catch(() => []),
    getAdminPayments().catch(() => []),
  ]);
  return { projects, inquiries, settings, clients, payments };
}

export default async function AdminOverviewPage() {
  const { projects, inquiries, settings, clients, payments } = await getData();

  const now = new Date();
  const thisMonth = inquiries.filter(
    (q) => new Date(q.created_at).getMonth() === now.getMonth()
  );
  const newInquiries = inquiries.filter((q) => q.status === "new");
  const conversion =
    inquiries.length > 0
      ? Math.round((inquiries.filter((q) => q.status === "won").length / inquiries.length) * 100)
      : 0;

  const totalRevenue = payments
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + Number(p.amount), 0);
  const pendingRevenue = payments
    .filter((p) => p.status === "pending")
    .reduce((s, p) => s + Number(p.amount), 0);

  const stats = [
    {
      label: "إجمالي المشاريع",
      value: projects.length,
      icon: FolderKanban,
    },
    { label: "العملاء", value: clients.length, icon: UserRound },
    { label: "التحصيلات", value: `${Number(totalRevenue).toLocaleString("ar-EG")} ج.م`, icon: Wallet },
    { label: "استفسارات جديدة", value: newInquiries.length, icon: MessagesSquare },
    { label: "استفسارات هذا الشهر", value: thisMonth.length, icon: Users },
    { label: "نسبة التحويل", value: `${conversion}%`, icon: TrendingUp },
  ];

  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const revenueThisMonth = payments
    .filter((p) => p.status === "paid" && (p.date ?? "").startsWith(monthKey))
    .reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div>
      <AdminPageHeader
        title="نظرة عامة"
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

      {/* Availability toggle */}
      {settings && (
        <AdminCard className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-ink">حالة التوفر</p>
            <p className="text-sm text-muted">
              بتتحكم في الشارة اللي تظهر على الصفحة الرئيسية
            </p>
          </div>
          <AvailabilityToggle initial={settings.is_available} />
        </AdminCard>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <AdminCard key={stat.label}>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-accent-soft p-2.5 text-brand-deep">
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-xl font-black text-ink" dir="ltr">
                  {stat.value}
                </p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Revenue snapshot */}
      {(totalRevenue > 0 || pendingRevenue > 0 || revenueThisMonth > 0) && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <AdminCard className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted">إجمالي المتحصلات</p>
              <p className="text-xl font-black text-success" dir="ltr">
                {Number(totalRevenue).toLocaleString("ar-EG")} ج.م
              </p>
            </div>
            <Wallet size={22} className="text-success" />
          </AdminCard>
          <AdminCard className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted">إيرادات هذا الشهر</p>
              <p className="text-xl font-black text-brand" dir="ltr">
                {Number(revenueThisMonth).toLocaleString("ar-EG")} ج.م
              </p>
            </div>
            <TrendingUp size={22} className="text-brand" />
          </AdminCard>
          <AdminCard className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted">مستحق (متأخر)</p>
              <p className="text-xl font-black text-amber-600" dir="ltr">
                {Number(pendingRevenue).toLocaleString("ar-EG")} ج.م
              </p>
            </div>
            <Users size={22} className="text-amber-600" />
          </AdminCard>
        </div>
      )}

      {/* Recent inquiries */}
      <AdminCard className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-ink">آخر الاستفسارات</h2>
          <Link
            href="/admin/inquiries"
            className="text-sm font-semibold text-brand hover:underline"
          >
            عرض الكل
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <p className="py-10 text-center text-muted">
            مفيش استفسارات لسه — أول ما يجي استفسار هيظهر هنا.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right border-b border-line text-muted">
                  <th className="py-2 pr-1 font-semibold">الاسم</th>
                  <th className="px-3 py-2 font-semibold">الهاتف</th>
                  <th className="px-3 py-2 font-semibold">الخدمة</th>
                  <th className="px-3 py-2 font-semibold">التاريخ</th>
                  <th className="px-3 py-2 font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((q: Inquiry) => (
                  <tr key={q.id} className="border-b border-line/50">
                    <td className="py-3 pr-1 font-medium text-ink">{q.name}</td>
                    <td className="px-3 py-3" dir="ltr">
                      {q.phone}
                    </td>
                    <td className="px-3 py-3 text-muted">{q.service_type}</td>
                    <td className="px-3 py-3 text-muted">
                      {formatDate(q.created_at)}
                    </td>
                    <td className="px-3 py-3">
                      <StatusSelect id={q.id} status={q.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
