"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Download, Plus, Trash2, Wallet, TrendingUp, Clock, CalendarRange, Search } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { Payment, Client } from "@/lib/admin-data";

const currencyFmt = (n: number) => Number(n).toLocaleString("ar-EG") + " ج.م";

const methodLabels: Record<string, string> = {
  cash: "كاش",
  bank_transfer: "تحويل بنكي",
  instapay: "إنستا باي",
  vodafone_cash: "فودافون كاش",
  other: "آخر",
};

export function RevenueManager({
  initialPayments,
  clients,
}: {
  initialPayments: Payment[];
  clients: Client[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientFilter = searchParams.get("client") ?? "all";

  const [payments, setPayments] = useState(initialPayments);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Payment["status"]>("all");
  const [showAdd, setShowAdd] = useState(false);

  const clientName = useMemo(() => {
    if (clientFilter === "all") return null;
    return clients.find((c) => c.id === clientFilter)?.name ?? null;
  }, [clientFilter, clients]);

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      if (clientFilter !== "all" && p.client_id !== clientFilter) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const row = `${p.note ?? ""} ${p.method ?? ""} ${p.currency ?? ""}`.toLowerCase();
        if (!row.includes(q)) return false;
      }
      return true;
    });
  }, [payments, clientFilter, statusFilter, query]);

  const totals = useMemo(() => {
    const paid = filtered.filter((p) => p.status === "paid").reduce((s, p) => s + Number(p.amount), 0);
    const pending = filtered.filter((p) => p.status === "pending").reduce((s, p) => s + Number(p.amount), 0);
    const partial = filtered.filter((p) => p.status === "partial").reduce((s, p) => s + Number(p.amount), 0);
    return { paid, pending, partial, total: paid + partial };
  }, [filtered]);

  const thisMonthTotal = useMemo(() => {
    const now = new Date();
    const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    return payments
      .filter((p) => p.status === "paid" && (p.date ?? "").startsWith(ym))
      .reduce((s, p) => s + Number(p.amount), 0);
  }, [payments]);

  const stats = [
    { label: "إجمالي المتحصل (مدفوع)", value: currencyFmt(totals.paid), icon: Wallet, color: "text-success", iconBg: "bg-success/10" },
    { label: "الإيرادات هذا الشهر", value: currencyFmt(thisMonthTotal), icon: TrendingUp, color: "text-brand", iconBg: "bg-accent-soft" },
    { label: "مستحق (متأخر)", value: currencyFmt(totals.pending), icon: Clock, color: "text-amber-600", iconBg: "bg-amber-500/10" },
    { label: "مدفوعات جزئية", value: currencyFmt(totals.partial), icon: CalendarRange, color: "text-ink", iconBg: "bg-muted/10" },
  ];

  function handleClientFilterChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("client");
    else params.set("client", value);
    router.push(`/admin/revenue?${params.toString()}`);
  }

  function exportCsv() {
    const header = ["amount", "currency", "date", "status", "method", "note", "client_id"];
    const rows = filtered.map((p) => [
      p.amount,
      p.currency,
      p.date,
      p.status,
      p.method ?? "",
      p.note ?? "",
      p.client_id ?? "",
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `payments-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    toast.success("تم تصدير CSV");
  }

  async function deletePayment(p: Payment) {
    if (!confirm(`حذف دفعة ${currencyFmt(Number(p.amount))}؟`)) return;
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.from("payments").delete().eq("id", p.id);
    if (error) {
      toast.error("مش قادر أحذف الدفعة");
      return;
    }
    setPayments((ps) => ps.filter((x) => x.id !== p.id));
    toast.success("اتحذفت الدفعة");
    router.refresh();
  }

  return (
    <div>
      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`rounded-md p-2.5 ${s.iconBg}`}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <p className={cn("text-lg font-black", s.color)} dir="ltr">
                  {s.value}
                </p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="بحث في الملاحظات..."
              className="w-48 rounded-md border border-line bg-white py-2 pl-3 pr-8 text-sm text-ink focus:border-brand focus:outline-none"
            />
          </div>
          <select
            value={clientFilter}
            onChange={(e) => handleClientFilterChange(e.target.value)}
            className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          >
            <option value="all">كل العملاء</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | Payment["status"])}
            className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          >
            <option value="all">كل الحالات</option>
            <option value="paid">مدفوع</option>
            <option value="pending">مستحق</option>
            <option value="partial">جزئي</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2"
          >
            <Download size={15} />
            تصدير CSV
          </button>
          <button
            type="button"
            onClick={() => setShowAdd((v) => !v)}
            className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep"
          >
            <Plus size={15} />
            إضافة دفعة
          </button>
        </div>
      </div>

      {clientName && (
        <p className="mb-3 text-sm text-muted">
          عرض مدفوعات العميل: <span className="font-bold text-ink">{clientName}</span>
        </p>
      )}

      {showAdd && (
        <AddPaymentForm
          clients={clients}
          defaultClientId={clientFilter !== "all" ? clientFilter : ""}
          onDone={() => {
            setShowAdd(false);
            router.refresh();
          }}
        />
      )}

      {/* Ledger table */}
      <div className="overflow-x-auto rounded-lg bg-white border border-line">
        {filtered.length === 0 ? (
          <p className="py-14 text-center text-muted">مفيش مدفوعات هنا.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right border-b border-line text-muted">
                <th className="py-2 pr-4 font-semibold">العميل</th>
                <th className="px-3 py-2 font-semibold">المبلغ</th>
                <th className="px-3 py-2 font-semibold">التاريخ</th>
                <th className="px-3 py-2 font-semibold">الطريقة</th>
                <th className="px-3 py-2 font-semibold">الحالة</th>
                <th className="px-3 py-2 font-semibold">ملاحظة</th>
                <th className="py-2 pl-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const client = clients.find((c) => c.id === p.client_id);
                return (
                  <tr key={p.id} className="border-b border-line/50 hover:bg-surface/40">
                    <td className="py-3 pr-4 font-semibold text-ink">
                      {client ? (
                        <Link href={`/admin/clients/${client.id}`} className="hover:text-brand">
                          {client.name}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-3 py-3 font-black text-ink" dir="ltr">
                      {currencyFmt(Number(p.amount))}
                    </td>
                    <td className="px-3 py-3 text-muted">{formatDate(p.date)}</td>
                    <td className="px-3 py-3 text-muted">{methodLabels[p.method ?? "other"] ?? p.method}</td>
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-bold",
                          p.status === "paid"
                            ? "bg-success/10 text-success"
                            : p.status === "pending"
                              ? "bg-amber-500/10 text-amber-600"
                              : "bg-brand-soft/30 text-brand-deep"
                        )}
                      >
                        {p.status === "paid" ? "مدفوع" : p.status === "pending" ? "مستحق" : "جزئي"}
                      </span>
                    </td>
                    <td className="max-w-[200px] truncate px-3 py-3 text-muted">{p.note ?? "—"}</td>
                    <td className="py-3 pl-4">
                      <button
                        type="button"
                        onClick={() => deletePayment(p)}
                        className="rounded-md p-1.5 text-danger hover:bg-danger/5"
                        aria-label="حذف"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function AddPaymentForm({
  clients,
  defaultClientId,
  onDone,
}: {
  clients: Client[];
  defaultClientId: string;
  onDone: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    client_id: defaultClientId,
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    status: "paid",
    method: "cash",
    note: "",
  });

  async function submit() {
    const amount = Number(form.amount);
    if (!amount || amount <= 0) {
      toast.error("اكتب مبلغ صحيح");
      return;
    }
    setSaving(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.from("payments").insert({
      client_id: form.client_id || null,
      amount,
      currency: "EGP",
      date: form.date,
      status: form.status,
      method: form.method,
      note: form.note.trim() || null,
    });
    setSaving(false);
    if (error) {
      toast.error("مش قادر أضيف الدفعة");
      return;
    }
    toast.success("اتضافت الدفعة");
    setForm({ client_id: defaultClientId, amount: "", date: new Date().toISOString().slice(0, 10), status: "paid", method: "cash", note: "" });
    onDone();
  }

  return (
    <div className="mb-4 rounded-lg border border-line bg-white p-5">
      <h3 className="mb-4 font-bold text-ink">تسجيل دفعة جديدة</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
          العميل
          <select
            value={form.client_id}
            onChange={(e) => setForm({ ...form, client_id: e.target.value })}
            className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          >
            <option value="">بدون عميل</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
          المبلغ (ج.م)
          <input
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            type="number"
            dir="ltr"
            className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
          التاريخ
          <input
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            type="date"
            dir="ltr"
            className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
          الحالة
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          >
            <option value="paid">مدفوع</option>
            <option value="pending">مستحق</option>
            <option value="partial">جزئي</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
          الطريقة
          <select
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value })}
            className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          >
            <option value="cash">كاش</option>
            <option value="bank_transfer">تحويل بنكي</option>
            <option value="instapay">إنستا باي</option>
            <option value="vodafone_cash">فودافون كاش</option>
            <option value="other">آخر</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
          ملاحظة (اختياري)
          <input
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
          />
        </label>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onDone}
          className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2"
        >
          إلغاء
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={saving}
          className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-50"
        >
          {saving ? "جاري..." : "تسجيل الدفعة"}
        </button>
      </div>
    </div>
  );
}