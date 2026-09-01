"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Input, Textarea, Field } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/lib/admin-data";

export function SettingsForm({ settings }: { settings: SiteSettings | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    whatsapp: settings?.whatsapp ?? "+201016042072",
    email: settings?.email ?? "",
    facebook_url: settings?.facebook_url ?? "",
    instagram_url: settings?.instagram_url ?? "",
    behance_url: settings?.behance_url ?? "",
    pinterest_url: settings?.pinterest_url ?? "",
    hero_title_ar: settings?.hero_title_ar ?? "",
    hero_lead_ar: settings?.hero_lead_ar ?? "",
    is_available: settings?.is_available ?? true,
    show_prices: settings?.show_prices ?? false,
  });

  function update(field: keyof typeof form, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function save() {
    setSaving(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.from("site_settings").upsert(
        {
          id: 1,
          whatsapp: form.whatsapp,
          email: form.email || null,
          facebook_url: form.facebook_url || null,
          instagram_url: form.instagram_url || null,
          behance_url: form.behance_url || null,
          pinterest_url: form.pinterest_url || null,
          hero_title_ar: form.hero_title_ar || null,
          hero_lead_ar: form.hero_lead_ar || null,
          is_available: form.is_available,
          show_prices: form.show_prices,
        },
        { onConflict: "id" }
      );
      if (error) throw error;
      toast.success("اتحفظت الإعدادات");
      router.refresh();
    } catch {
      toast.error("حصلت مشكلة في الحفظ — اتأكد إن الجدول موجود في Supabase");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <section className="rounded-lg bg-white border border-line p-6 space-y-4">
        <h2 className="text-lg font-bold text-ink">التواصل</h2>
        <Field label="رقم الواتساب">
          <Input
            value={form.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            dir="ltr"
            className="text-left"
          />
        </Field>
        <Field label="الإيميل (اختياري)">
          <Input
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            dir="ltr"
            className="text-left"
          />
        </Field>
      </section>

      <section className="rounded-lg bg-white border border-line p-6 space-y-4">
        <h2 className="text-lg font-bold text-ink">حسابات السوشيال</h2>
        {(
          [
            ["facebook_url", "فيسبوك"],
            ["instagram_url", "إنستجرام"],
            ["behance_url", "بيهانس"],
            ["pinterest_url", "بنترست"],
          ] as const
        ).map(([key, label]) => (
          <Field key={key} label={label}>
            <Input
              value={form[key]}
              onChange={(e) => update(key, e.target.value)}
              dir="ltr"
              className="text-left"
              placeholder="https://..."
            />
          </Field>
        ))}
      </section>

      <section className="rounded-lg bg-white border border-line p-6 space-y-4">
        <h2 className="text-lg font-bold text-ink">الصفحة الرئيسية</h2>
        <Field label="العنوان الرئيسي">
          <Input
            value={form.hero_title_ar}
            onChange={(e) => update("hero_title_ar", e.target.value)}
          />
        </Field>
        <Field label="النص التعريفي">
          <Textarea
            value={form.hero_lead_ar}
            onChange={(e) => update("hero_lead_ar", e.target.value)}
          />
        </Field>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_available}
            onChange={(e) => update("is_available", e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-sm font-semibold text-ink">
            متاح لاستقبال طلبات هذا الشهر
          </span>
        </label>
      </section>

      <section className="rounded-lg bg-white border border-line p-6 space-y-4">
        <h2 className="text-lg font-bold text-ink">الأسعار</h2>
        <p className="text-sm text-body">
          الأسعار الحالية مخفية عن العملاء. فعّل المفتاح ده لما تحب إظهارها على الموقع —
          ولو مقفل، العملاء هيلاقوا «اسأل عن السعر» ويوصلوك على واتساب.
        </p>
        <label className="flex items-center justify-between gap-4 cursor-pointer rounded-lg bg-surface p-4">
          <span className="text-sm font-semibold text-ink">
            إظهار الأسعار للعملاء
            <span className="block text-xs font-normal text-muted mt-1">
              مقفلة افتراضيًا — افعلها من هنا بس
            </span>
          </span>
          <input
            type="checkbox"
            checked={form.show_prices}
            onChange={(e) => update("show_prices", e.target.checked)}
            className="h-5 w-5 accent-brand shrink-0"
          />
        </label>
      </section>

      <Button onClick={save} disabled={saving} size="lg">
        <Save size={18} />
        {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
      </Button>
    </div>
  );
}
