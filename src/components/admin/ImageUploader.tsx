"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("الصورة كبيرة — الصورة لازم تكون أقل من 2MB");
      return;
    }
    setUploading(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const ext = file.name.split(".").pop();
      const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from("projects")
        .upload(path, file, { upsert: true });
      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("projects").getPublicUrl(path);

      onChange(publicUrl);
      toast.success("اترفعت الصورة");
    } catch {
      toast.error("حصلت مشكلة في رفع الصورة — جرب تاني");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label && <label className="block text-sm font-semibold text-ink mb-1.5">{label}</label>}
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="relative h-32 w-32 shrink-0 overflow-hidden rounded-md border-2 border-dashed border-line hover:border-brand flex items-center justify-center bg-surface-2 text-muted"
        >
          {value ? (
            <Image src={value} alt="معاينة" fill sizes="128px" className="object-cover" />
          ) : uploading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <Upload size={24} />
          )}
        </button>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep"
          >
            <Upload size={16} />
            {value ? "استبدال الصورة" : "رفع صورة"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-2 rounded-md border border-danger/40 px-4 py-2 text-sm font-semibold text-danger hover:bg-danger/5"
            >
              <X size={16} />
              إزالة
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </div>
  );
}
