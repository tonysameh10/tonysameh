"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MessageCircle, Download, X, Sparkles } from "lucide-react";
import { cleanPhone, formatDate, waLink } from "@/lib/utils";
import { dictionary } from "@/lib/dictionary";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { StatusBadge, type Status } from "@/components/admin/StatusBadge";
import type { Inquiry } from "@/lib/admin-data";

interface NotesEditorProps {
  id: string;
  initial: string | null;
  onSaved: () => void;
}

function NotesEditor({ id, initial, onSaved }: NotesEditorProps) {
  const [notes, setNotes] = useState(initial ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.from("inquiries").update({ notes }).eq("id", id);
    setSaving(false);
    if (error) {
      toast.error("مش قادر أحفظ الملاحظات");
    } else {
      toast.success("اتحفظت الملاحظات");
      onSaved();
    }
  }

  return (
    <div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="اكتب ملاحظات عن العميل..."
        className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
        rows={3}
      />
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-md bg-brand px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-50"
        >
          {saving ? "جاري..." : "حفظ الملاحظات"}
        </button>
      </div>
    </div>
  );
}

export function InquiriesTable({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const router = useRouter();
  const [inquiries] = useState(initialInquiries);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState<"all" | Status>("all");

  const visible = filter === "all" ? inquiries : inquiries.filter((q) => q.status === filter);

  function exportCsv() {
    const header = ["name", "phone", "service", "status", "message", "file_url", "created_at"];
    const rows = inquiries.map((q) => [
      q.name,
      q.phone,
      q.service_type ?? "",
      q.status,
      q.message ?? "",
      q.file_url ?? "",
      q.created_at,
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "inquiries.csv";
    link.click();
    toast.success("تم تصدير CSV");
  }

  const filters: { value: "all" | Status; label: string }[] = [
    { value: "all", label: "الكل" },
    { value: "new", label: "جديد" },
    { value: "contacted", label: "تم التواصل" },
    { value: "won", label: "كسب" },
    { value: "lost", label: "ضاع" },
  ];

  function handleStatusChanged() {
    router.refresh();
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={
                filter === f.value
                  ? "rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white"
                  : "rounded-full border border-brand/40 px-4 py-1.5 text-sm font-semibold text-brand hover:bg-brand/5"
              }
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2"
        >
          <Download size={16} />
          تصدير CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white border border-line">
        {visible.length === 0 ? (
          <p className="py-12 text-center text-muted">مفيش استفسارات في ده الفلتر.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right border-b border-line text-muted">
                <th className="py-2 pr-4 font-semibold">الاسم</th>
                <th className="px-3 py-2 font-semibold">الهاتف</th>
                <th className="px-3 py-2 font-semibold">الخدمة</th>
                <th className="px-3 py-2 font-semibold">التاريخ</th>
                <th className="px-3 py-2 font-semibold">الحالة</th>
                <th className="py-2 pl-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((q) => (
                <tr
                  key={q.id}
                  className="border-b border-line/50 cursor-pointer hover:bg-surface/50"
                  onClick={() => setSelected(q)}
                >
                  <td className="py-3 pr-4 font-medium text-ink">{q.name}</td>
                  <td className="px-3 py-3" dir="ltr">
                    {q.phone}
                  </td>
                  <td className="px-3 py-3 text-muted">{q.service_type}</td>
                  <td className="px-3 py-3 text-muted text-xs">
                    {formatDate(q.created_at)}
                  </td>
                  <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                    <StatusSelect id={q.id} status={q.status} />
                  </td>
                  <td className="py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={waLink(dictionary.brand.whatsapp, `مرحبًا ${q.name}، وصلني استفسارك`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(ev) => ev.stopPropagation()}
                      className="inline-flex items-center gap-1 rounded-full bg-wa/10 px-3 py-1 text-xs font-semibold text-wa hover:bg-wa/20"
                    >
                      <MessageCircle size={14} />
                      واتساب
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Side panel */}
      {selected && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <aside className="relative h-full w-full max-w-md bg-white shadow-lg p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-ink">تفاصيل الاستفسار</h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="p-2 text-muted hover:text-ink"
                aria-label="إغلاق"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-md bg-surface p-4">
                <p className="text-lg font-bold text-ink">{selected.name}</p>
                <p className="text-muted" dir="ltr">
                  {selected.phone}
                </p>
                <div className="mt-2">
                  <StatusBadge status={selected.status} />
                </div>
              </div>

              {selected.service_type && (
                <div>
                  <p className="text-sm font-semibold text-muted">نوع الخدمة</p>
                  <p className="text-ink">{selected.service_type}</p>
                </div>
              )}

              {selected.message && (
                <div>
                  <p className="text-sm font-semibold text-muted">الرسالة</p>
                  <p className="text-ink whitespace-pre-wrap">{selected.message}</p>
                </div>
              )}

              {selected.file_url && (
                <div>
                  <p className="text-sm font-semibold text-muted">ملف الشغل</p>
                  <a
                    href={selected.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand font-semibold hover:underline"
                    dir="ltr"
                  >
                    {selected.file_url}
                  </a>
                </div>
              )}

              <a
                href={waLink(cleanPhone(selected.phone), `مرحبًا ${selected.name}، وصلني استفسارك عن ${selected.service_type ?? "الخدمات"}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-wa px-4 py-2.5 font-semibold text-white hover:brightness-105"
              >
                <MessageCircle size={18} />
                فتح في واتساب
              </a>

              <div className="border-t border-line pt-4">
                <p className="text-sm font-semibold text-ink mb-2 flex items-center gap-1">
                  <Sparkles size={14} className="text-brand" />
                  الملاحظات
                </p>
                <NotesEditor
                  id={selected.id}
                  initial={selected.notes}
                  onSaved={handleStatusChanged}
                />
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
