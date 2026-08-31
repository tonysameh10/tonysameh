"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";
import { categoryOptions } from "@/lib/categories";
import { Input, Select, Textarea, Field } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { GalleryUploader } from "@/components/admin/GalleryUploader";
import { ChipInput } from "@/components/admin/ChipInput";
import type { Project } from "@/lib/admin-data";

type FormValues = {
  title_ar: string;
  title_en: string;
  slug: string;
  category: "cover" | "booklet" | "profile" | "book";
  client: string;
  year: string;
  summary_ar: string;
  behance_url: string;
  cover_image: string;
  deliverables: string[];
  featured: boolean;
  published: boolean;
};

const emptyValues: FormValues = {
  title_ar: "",
  title_en: "",
  slug: "",
  category: "cover",
  client: "",
  year: String(new Date().getFullYear()),
  summary_ar: "",
  behance_url: "",
  cover_image: "",
  deliverables: [],
  featured: false,
  published: false,
};

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [gallery, setGallery] = useState<string[]>(project?.gallery ?? []);
  const [slugTouched, setSlugTouched] = useState(false);

  const { register, control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: project
      ? {
          ...emptyValues,
          title_ar: project.title_ar,
          title_en: project.title_en ?? "",
          slug: project.slug,
          category: project.category,
          client: project.client ?? "",
          year: project.year ? String(project.year) : String(new Date().getFullYear()),
          summary_ar: project.summary_ar ?? "",
          behance_url: project.behance_url ?? "",
          cover_image: project.cover_image,
          deliverables: project.deliverables,
          featured: project.featured,
          published: project.published,
        }
      : emptyValues,
  });

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setValue("title_ar", value);
    if (!slugTouched) {
      setValue("slug", slugify(value));
    }
  }

  function buildPayload(values: FormValues, published: boolean) {
    return {
      title_ar: values.title_ar,
      title_en: values.title_en || null,
      slug: slugify(values.slug) || slugify(values.title_ar),
      category: values.category,
      client: values.client || null,
      year: values.year ? parseInt(values.year) : null,
      summary_ar: values.summary_ar || null,
      behance_url: values.behance_url || null,
      cover_image: values.cover_image,
      gallery,
      deliverables: values.deliverables,
      featured: values.featured,
      published,
    };
  }

  async function submit(values: FormValues, published: boolean) {
    setSaving(true);
    try {
      const payload = buildPayload(values, published);
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      if (project) {
        const { error } = await supabase
          .from("projects")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", project.id);
        if (error) throw error;
        toast.success(published ? "تم النشر" : "تم الحفظ كمسودة");
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
        toast.success(published ? "تم إنشاء المشروع ونشره" : "تم إنشاء المشروع كمسودة");
      }
      router.push("/admin/projects");
      router.refresh();
    } catch {
      toast.error("حصلت مشكلة في الحفظ — جرب تاني");
    } finally {
      setSaving(false);
    }
  }

  const handleSaveDraft = handleSubmit((v) => submit(v, false));
  const handlePublish = handleSubmit((v) => submit(v, true));

  return (
    <form className="max-w-3xl space-y-6" onSubmit={(e) => e.preventDefault()}>
      <Field label="اسم المشروع (عربي)" error={undefined}>
        <Input {...register("title_ar")} onChange={onTitleChange} placeholder="مثال: سلسلة القانون — الفيزياء" />
      </Field>

      <Field label="اسم المشروع (إنجليزي)">
        <Input {...register("title_en")} dir="ltr" className="text-left" placeholder="The Law — Physics Series" />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="الرابط المختصر (Slug)" hint={!slugTouched ? "بيتولّد أوتوماتيك من الاسم" : undefined}>
          <Input
            {...register("slug")}
            dir="ltr"
            className="text-left"
            onChange={(e) => {
              setSlugTouched(true);
              setValue("slug", slugify(e.target.value));
            }}
          />
        </Field>

        <Field label="التصنيف">
          <Select {...register("category")}>
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="العميل">
          <Input {...register("client")} placeholder="أ / اسم العميل" />
        </Field>
        <Field label="السنة">
          <Input {...register("year")} dir="ltr" className="text-left" />
        </Field>
      </div>

      <Field label="الملخص (فقرة قصيرة)" hint="بتظهر على صفحة تفاصيل المشروع">
        <Textarea {...register("summary_ar")} />
      </Field>

      <Controller
        control={control}
        name="cover_image"
        render={({ field }) => (
          <ImageUploader value={field.value} onChange={field.onChange} label="صورة الغلاف (إلزامي)" />
        )}
      />

      <div>
        <label className="block text-sm font-semibold text-ink mb-1.5">
          معرض الصور (3-4 صور)
        </label>
        <GalleryUploader value={gallery} onChange={setGallery} />
      </div>

      <Controller
        control={control}
        name="deliverables"
        render={({ field }) => (
          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">المخرجات</label>
            <ChipInput value={field.value} onChange={field.onChange} placeholder="اكتب مخرج واضغط Enter" />
          </div>
        )}
      />

      <Field
        label="رابط Behance"
        hint="سيبه فاضي لو المشروع لسه مترفعش على بيهانس"
      >
        <Input {...register("behance_url")} dir="ltr" className="text-left" placeholder="https://www.behance.net/..." />
      </Field>

      <div className="flex flex-wrap gap-6 pt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("featured")}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-sm font-semibold text-ink">مشروع مميز</span>
        </label>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-line pt-6">
        <Button type="button" variant="outline" size="lg" onClick={handleSaveDraft} disabled={saving} className="flex-1">
          {saving ? "جاري..." : project ? "حفظ التعديلات" : "حفظ كمسودة"}
        </Button>

        {project?.slug && (
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => window.open(`/work/${project.slug}`, "_blank")}
          >
            معاينة
          </Button>
        )}

        <Button type="button" variant="accent" size="lg" onClick={handlePublish} disabled={saving} className="flex-1">
          {saving ? "جاري..." : "نشر"}
        </Button>
      </div>
    </form>
  );
}
