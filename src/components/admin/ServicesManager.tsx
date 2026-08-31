"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChipInput } from "@/components/admin/ChipInput";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { IconBadge } from "@/components/ui/icon";
import type { Service } from "@/lib/admin-data";

interface ServiceEditable {
  id?: string;
  title_ar: string;
  description: string;
  icon: string;
  price_from: string;
  features: string[];
  sort_order: number;
  active: boolean;
}

export function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const router = useRouter();
  const [services, setServices] = useState<ServiceEditable[]>(
    (initialServices.length ? initialServices : []).map((s) => ({
      id: s.id,
      title_ar: s.title_ar,
      description: s.description ?? "",
      icon: s.icon ?? "",
      price_from: s.price_from ? String(s.price_from) : "",
      features: s.features,
      sort_order: s.sort_order,
      active: s.active,
    }))
  );
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const emptyDraft: ServiceEditable = {
    title_ar: "",
    description: "",
    icon: "sparkles",
    price_from: "",
    features: [],
    sort_order: services.length,
    active: true,
  };

  async function startEdit(id: string) {
    setEditing(id);
  }

  function saveDraft(data: ServiceEditable) {
    setServices((prev) => {
      if (editing === "new") {
        return [...prev, { ...data, sort_order: prev.length }];
      }
      return prev.map((s) => (s.id === editing ? data : s));
    });
    setEditing(null);
  }

  async function persistAll() {
    setSaving(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      // Delete ones that were removed
      const existingIds = initialServices.map((s) => s.id);
      const currentIds = services.filter((s) => s.id).map((s) => s.id);
      const removedIds = existingIds.filter((id) => !currentIds.includes(id));
      for (const id of removedIds) {
        await supabase.from("services").delete().eq("id", id);
      }
      // Upsert all
      for (const [idx, s] of services.entries()) {
        const payload = {
          title_ar: s.title_ar,
          description: s.description || null,
          icon: s.icon || null,
          price_from: s.price_from ? parseInt(s.price_from) : null,
          features: s.features,
          sort_order: idx,
          active: s.active,
        };
        if (s.id) {
          await supabase.from("services").update(payload).eq("id", s.id);
        } else {
          await supabase.from("services").insert(payload);
        }
      }
      toast.success("اتحفظت الخدمات");
      router.refresh();
    } catch {
      toast.error("حصلت مشكلة في الحفظ");
    } finally {
      setSaving(false);
    }
  }

  function removeLocal(id: string) {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setDeleteId(null);
  }

  return (
    <div>
      <div className="rounded-lg bg-white border border-line overflow-hidden">
        {services.length === 0 && (
          <p className="py-10 text-center text-muted">مفيش خدمات — ضيف أول خدمة.</p>
        )}
        {services.map((svc) =>
          editing === svc.id ? (
            <ServiceRowEditable
              key={svc.id}
              data={svc}
              onCancel={() => setEditing(null)}
              onSave={saveDraft}
            />
          ) : (
            <div
              key={svc.id}
              className="flex items-center justify-between gap-4 border-b border-line px-5 py-4"
            >
              <div className="flex items-center gap-4">
                <IconBadge name={svc.icon} />
                <div>
                  <p className="font-bold text-ink">{svc.title_ar}</p>
                  <p className="text-muted text-sm">{svc.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {svc.features.map((f) => (
                      <span key={f} className="rounded-full bg-accent-soft/60 px-2 py-0.5 text-xs text-brand-deep">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {svc.price_from && (
                  <span className="text-sm font-bold text-brand" dir="ltr">
                    {parseInt(svc.price_from).toLocaleString("ar-EG")} ج.م
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => startEdit(svc.id!)}
                  className="p-2 text-muted hover:text-brand"
                  aria-label="تعديل"
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(svc.id!)}
                  className="p-2 text-muted hover:text-danger"
                  aria-label="حذف"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        )}

        {editing === "new" && (
          <ServiceRowEditable
            key="new"
            data={emptyDraft}
            onCancel={() => setEditing(null)}
            onSave={saveDraft}
          />
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={() => setEditing("new")}
          className="inline-flex items-center gap-2 rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/5"
        >
          <Plus size={16} />
          خدمة جديدة
        </button>
        <button
          type="button"
          onClick={persistAll}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-50"
        >
          <Check size={16} />
          {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
        </button>
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="حذف الخدمة"
        message="متأكد إنك عايز تحذف الخدمة دي؟"
        onConfirm={() => deleteId && removeLocal(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

function ServiceRowEditable({
  data,
  onSave,
  onCancel,
}: {
  data: ServiceEditable;
  onSave: (data: ServiceEditable) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(data);
  const update = (patch: Partial<ServiceEditable>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div className="border-b border-line p-5 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={draft.title_ar}
          onChange={(e) => update({ title_ar: e.target.value })}
          className="rounded-md border border-line px-3 py-2 text-ink focus:border-brand focus:outline-none"
          placeholder="اسم الخدمة"
        />
        <input
          value={draft.price_from}
          onChange={(e) => update({ price_from: e.target.value })}
          className="rounded-md border border-line px-3 py-2 text-ink focus:border-brand focus:outline-none"
          placeholder="السعر من (اختياري)"
          dir="ltr"
        />
      </div>
      <div className="flex items-center gap-3">
        <IconBadge name={draft.icon} />
        <input
          value={draft.icon}
          onChange={(e) => update({ icon: e.target.value })}
          className="w-40 rounded-md border border-line px-3 py-2 text-ink focus:border-brand focus:outline-none"
          placeholder="اسم الأيقونة"
        />
        <span className="text-xs text-muted ltr" dir="ltr">
          booklet · covers · profile · books · flask · chart · files · printer · ruler · file · timer
        </span>
      </div>
      <textarea
        value={draft.description}
        onChange={(e) => update({ description: e.target.value })}
        className="w-full rounded-md border border-line px-3 py-2 text-ink focus:border-brand focus:outline-none"
        placeholder="الوصف"
        rows={2}
      />
      <ChipInput value={draft.features} onChange={(f) => update({ features: f })} />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1 rounded-md border border-line px-4 py-2 text-sm text-ink hover:bg-surface-2"
        >
          <X size={14} /> إلغاء
        </button>
        <button
          type="button"
          onClick={() => onSave(draft)}
          className="inline-flex items-center gap-1 rounded-md bg-brand px-4 py-2 text-sm text-white hover:bg-brand-deep"
        >
          <Check size={14} /> حفظ
        </button>
      </div>
    </div>
  );
}
