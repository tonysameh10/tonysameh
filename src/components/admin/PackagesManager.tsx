"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChipInput } from "@/components/admin/ChipInput";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import type { Package } from "@/lib/admin-data";

interface PackageEditable {
  id?: string;
  name_ar: string;
  description: string;
  price: string;
  old_price: string;
  features: string[];
  is_featured: boolean;
  sort_order: number;
}

export function PackagesManager({ initialPackages }: { initialPackages: Package[] }) {
  const router = useRouter();
  const [packages, setPackages] = useState<PackageEditable[]>(
    (initialPackages.length ? initialPackages : []).map((p) => ({
      id: p.id,
      name_ar: p.name_ar,
      description: p.description ?? "",
      price: String(p.price),
      old_price: p.old_price ? String(p.old_price) : "",
      features: p.features,
      is_featured: p.is_featured,
      sort_order: p.sort_order,
    }))
  );
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function startNew() {
    setEditing("new");
  }

  function saveDraft(data: PackageEditable) {
    setPackages((prev) => {
      if (editing === "new") {
        return [...prev, { ...data, sort_order: prev.length }];
      }
      return prev.map((p) => (p.id === editing ? data : p));
    });
    setEditing(null);
  }

  async function persistAll() {
    setSaving(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const existingIds = initialPackages.map((p) => p.id);
      const currentIds = packages.filter((p) => p.id).map((p) => p.id);
      for (const id of existingIds.filter((x) => !currentIds.includes(x))) {
        await supabase.from("packages").delete().eq("id", id);
      }
      for (const [idx, p] of packages.entries()) {
        const payload = {
          name_ar: p.name_ar,
          description: p.description || null,
          price: parseInt(p.price) || 0,
          old_price: p.old_price ? parseInt(p.old_price) : null,
          features: p.features,
          is_featured: p.is_featured,
          sort_order: idx,
          active: true,
        };
        if (p.id) {
          await supabase.from("packages").update(payload).eq("id", p.id);
        } else {
          await supabase.from("packages").insert(payload);
        }
      }
      toast.success("اتحفظت الباقات");
      router.refresh();
    } catch {
      toast.error("حصلت مشكلة في الحفظ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="rounded-lg bg-white border border-line overflow-hidden">
        {packages.length === 0 && (
          <p className="py-10 text-center text-muted">مفيش باقات — ضيف أول باقة.</p>
        )}
        {packages.map((pkg) =>
          editing === pkg.id ? (
            <PackageRowEditable
              key={pkg.id}
              data={pkg}
              onCancel={() => setEditing(null)}
              onSave={saveDraft}
            />
          ) : (
            <div key={pkg.id} className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-ink">{pkg.name_ar}</p>
                  {pkg.is_featured && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">
                      الأكثر طلبًا
                    </span>
                  )}
                </div>
                <p className="text-muted text-sm">{pkg.description}</p>
                <div className="flex items-center gap-2 mt-1 text-sm font-bold text-brand" dir="ltr">
                  {parseInt(pkg.price).toLocaleString("ar-EG")} ج.م
                  {pkg.old_price && (
                    <span className="text-muted line-through font-normal">
                      {parseInt(pkg.old_price).toLocaleString("ar-EG")} ج.م
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" onClick={() => setEditing(pkg.id!)} className="p-2 text-muted hover:text-brand" aria-label="تعديل">
                  <Pencil size={16} />
                </button>
                <button type="button" onClick={() => setDeleteId(pkg.id!)} className="p-2 text-muted hover:text-danger" aria-label="حذف">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        )}

        {editing === "new" && (
          <PackageRowEditable
            key="new"
            data={{
              name_ar: "",
              description: "",
              price: "",
              old_price: "",
              features: [],
              is_featured: false,
              sort_order: packages.length,
            }}
            onCancel={() => setEditing(null)}
            onSave={saveDraft}
          />
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={startNew}
          className="inline-flex items-center gap-2 rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/5"
        >
          <Plus size={16} />
          باقة جديدة
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
        title="حذف الباقة"
        message="متأكد إنك عايز تحذف الباقة دي؟"
        onConfirm={() => {
          setPackages((prev) => prev.filter((p) => p.id !== deleteId));
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

function PackageRowEditable({
  data,
  onSave,
  onCancel,
}: {
  data: PackageEditable;
  onSave: (data: PackageEditable) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(data);
  const update = (patch: Partial<PackageEditable>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div className="border-b border-line p-5 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={draft.name_ar}
          onChange={(e) => update({ name_ar: e.target.value })}
          className="rounded-md border border-line px-3 py-2 text-ink focus:border-brand focus:outline-none"
          placeholder="اسم الباقة"
        />
        <input
          value={draft.price}
          onChange={(e) => update({ price: e.target.value })}
          className="rounded-md border border-line px-3 py-2 text-ink focus:border-brand focus:outline-none"
          placeholder="السعر"
          dir="ltr"
        />
        <input
          value={draft.old_price}
          onChange={(e) => update({ old_price: e.target.value })}
          className="rounded-md border border-line px-3 py-2 text-ink focus:border-brand focus:outline-none"
          placeholder="السعر القديم (اختياري)"
          dir="ltr"
        />
      </div>
      <input
        value={draft.description}
        onChange={(e) => update({ description: e.target.value })}
        className="w-full rounded-md border border-line px-3 py-2 text-ink focus:border-brand focus:outline-none"
        placeholder="الوصف"
      />
      <ChipInput value={draft.features} onChange={(f) => update({ features: f })} />
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={draft.is_featured}
          onChange={(e) => update({ is_featured: e.target.checked })}
          className="h-4 w-4 accent-brand"
        />
        <span className="text-sm font-semibold text-ink">باقة مميزة (الأكثر طلبًا)</span>
      </label>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="inline-flex items-center gap-1 rounded-md border border-line px-4 py-2 text-sm text-ink hover:bg-surface-2">
          <X size={14} /> إلغاء
        </button>
        <button type="button" onClick={() => onSave(draft)} className="inline-flex items-center gap-1 rounded-md bg-brand px-4 py-2 text-sm text-white hover:bg-brand-deep">
          <Check size={14} /> حفظ
        </button>
      </div>
    </div>
  );
}
