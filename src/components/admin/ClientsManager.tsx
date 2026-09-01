"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Search, Trash2, ArrowLeft, Building2, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { Client } from "@/lib/admin-data";

const statusLabels: Record<Client["status"], string> = {
  active: "عميل نشط",
  won: "مكتمل",
  prospect: "عميل محتمل",
  archived: "مؤرشف",
};

const statusColors: Record<Client["status"], string> = {
  active: "bg-success/10 text-success",
  won: "bg-brand-soft/30 text-brand-deep",
  prospect: "bg-amber-500/10 text-amber-700",
  archived: "bg-muted/10 text-muted",
};

export function ClientsManager({ initialClients }: { initialClients: Client[] }) {
  const router = useRouter();
  const [clients, setClients] = useState(initialClients);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Client["status"]>("all");
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    location: "القاهرة، مصر",
    status: "active" as Client["status"],
  });

  const visible = clients.filter((c) => {
    const q = query.trim().toLowerCase();
    const matchesQ =
      !q ||
      c.name.toLowerCase().includes(q) ||
      (c.company ?? "").toLowerCase().includes(q) ||
      (c.phone ?? "").includes(q) ||
      (c.email ?? "").toLowerCase().includes(q);
    const matchesF = filter === "all" || c.status === filter;
    return matchesQ && matchesF;
  });

  async function createClient() {
    if (!form.name.trim()) {
      toast.error("اكتب اسم العميل");
      return;
    }
    setSaving(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("clients")
      .insert({
        name: form.name.trim(),
        company: form.company.trim() || null,
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        location: form.location.trim() || null,
        status: form.status,
      })
      .select()
      .single();
    setSaving(false);
    if (error) {
      toast.error("مش قادر أضيف العميل");
      return;
    }
    toast.success("اتضاف العميل");
    setShowNew(false);
    setForm({ name: "", company: "", phone: "", email: "", location: "القاهرة، مصر", status: "active" });
    router.refresh();
    if (data) {
      router.push(`/admin/clients/${data.id}`);
    }
  }

  async function deleteClient(c: Client) {
    if (!confirm(`هل متأكد إنك عايز تحذف العميل «${c.name}»؟`)) return;
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.from("clients").delete().eq("id", c.id);
    if (error) {
      toast.error("مش قادر أحذف العميل");
      return;
    }
    toast.success("اتحذف العميل");
    setClients((cs) => cs.filter((x) => x.id !== c.id));
    router.refresh();
  }

  const filters: { value: "all" | Client["status"]; label: string }[] = [
    { value: "all", label: "الكل" },
    { value: "active", label: "نشط" },
    { value: "won", label: "مكتمل" },
    { value: "prospect", label: "محتمل" },
    { value: "archived", label: "مؤرشف" },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث بالاسم أو الشركة أو الهاتف..."
            className="w-full rounded-md border border-line bg-white py-2 pl-3 pr-9 text-ink focus:border-brand focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowNew((v) => !v)}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep"
        >
          <Plus size={16} />
          عميل جديد
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold",
              filter === f.value
                ? "bg-brand text-white"
                : "border border-brand/40 text-brand hover:bg-brand/5"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {showNew && (
        <div className="mb-4 rounded-lg border border-line bg-white p-5">
          <h3 className="mb-4 font-bold text-ink">إضافة عميل جديد</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              الاسم *
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-md border border-line px-3 py-2 text-sm font-normal text-ink focus:border-brand focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              الشركة
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="rounded-md border border-line px-3 py-2 text-sm font-normal text-ink focus:border-brand focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              الهاتف
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                dir="ltr"
                className="rounded-md border border-line px-3 py-2 text-sm font-normal text-ink focus:border-brand focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              الإيميل
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                dir="ltr"
                className="rounded-md border border-line px-3 py-2 text-sm font-normal text-ink focus:border-brand focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              المكان
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="rounded-md border border-line px-3 py-2 text-sm font-normal text-ink focus:border-brand focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              الحالة
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Client["status"] })}
                className="rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
              >
                {Object.entries(statusLabels).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNew(false)}
              className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={createClient}
              disabled={saving}
              className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-50"
            >
              {saving ? "جاري..." : "حفظ العميل"}
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg bg-white border border-line">
        {visible.length === 0 ? (
          <p className="py-12 text-center text-muted">
            {clients.length === 0
              ? "مفيش عملاء لسه — اضيف أول عميل دلوقتي."
              : "مفيش عملاء مطابقين للبحث ده."}
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right border-b border-line text-muted">
                <th className="py-2 pr-4 font-semibold">العميل</th>
                <th className="px-3 py-2 font-semibold">الشركة</th>
                <th className="px-3 py-2 font-semibold">التواصل</th>
                <th className="px-3 py-2 font-semibold">الحالة</th>
                <th className="px-3 py-2 font-semibold">أُضيف</th>
                <th className="py-2 pl-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((c) => (
                <tr key={c.id} className="border-b border-line/50 hover:bg-surface/40">
                  <td className="py-3 pr-4">
                    <Link href={`/admin/clients/${c.id}`} className="font-bold text-ink hover:text-brand">
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-muted">
                    {c.company ? (
                      <span className="inline-flex items-center gap-1">
                        <Building2 size={14} />
                        {c.company}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3 py-3 text-muted">
                    {c.phone ? (
                      <span className="inline-flex items-center gap-1 text-xs" dir="ltr">
                        <Phone size={13} />
                        {c.phone}
                      </span>
                    ) : c.email ? (
                      <span className="text-xs" dir="ltr">{c.email}</span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", statusColors[c.status])}>
                      {statusLabels[c.status]}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-xs text-muted">{formatDate(c.created_at)}</td>
                  <td className="py-3 pl-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/clients/${c.id}`}
                        className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1 text-xs font-semibold text-brand hover:bg-surface-2"
                      >
                        <ArrowLeft size={13} />
                        فتح الصفحة
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteClient(c)}
                        className="rounded-md p-1.5 text-danger hover:bg-danger/5"
                        aria-label="حذف"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}