"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Upload, X, GripVertical, Loader2 } from "lucide-react";

function SortableImage({
  id,
  url,
  index,
  onRemove,
}: {
  id: string;
  url: string;
  index: number;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-line ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <Image src={url} alt={`صورة ${index + 1}`} fill sizes="96px" className="object-cover" />
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 cursor-grab rounded bg-black/30 p-0.5 text-white"
        aria-label="تحريك"
      >
        <GripVertical size={14} />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="absolute bottom-1 left-1 rounded bg-black/30 p-0.5 text-white hover:bg-danger"
        aria-label="إزالة"
      >
        <X size={14} />
      </button>
    </div>
  );
}

interface GalleryUploaderProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function GalleryUploader({ value, onChange }: GalleryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        if (file.size > 2 * 1024 * 1024) {
          toast.error(`${file.name} أكبر من 2MB — اتجاهل`);
          continue;
        }
        const ext = file.name.split(".").pop();
        const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("projects").upload(path, file, { upsert: true });
        if (error) continue;
        const { data: { publicUrl } } = supabase.storage.from("projects").getPublicUrl(path);
        urls.push(publicUrl);
      }
      if (urls.length > 0) {
        onChange([...value, ...urls]);
        toast.success("اترفعت الصور");
      }
    } catch {
      toast.error("حصلت مشكلة في الرفع");
    } finally {
      setUploading(false);
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = value.findIndex((v) => v === active.id);
    const newIndex = value.findIndex((v) => v === over.id);
    onChange(arrayMove(value, oldIndex, newIndex));
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-line text-muted hover:border-brand"
        >
          {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
          <span className="text-xs">إضافة</span>
        </button>

        {value.length > 0 && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={value} strategy={horizontalListSortingStrategy}>
              <div className="flex flex-wrap gap-2">
                {value.map((url, i) => (
                  <SortableImage
                    key={url}
                    id={url}
                    url={url}
                    index={i}
                    onRemove={() => onChange(value.filter((v) => v !== url))}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
