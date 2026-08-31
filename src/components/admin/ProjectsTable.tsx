"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import { GripVertical, Star, Trash2, Pencil } from "lucide-react";
import { categoryLabels } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import type { Project } from "@/lib/admin-data";

function SortableRow({
  project,
  onToggle,
  onDelete,
}: {
  project: Project;
  onToggle: (field: "published" | "featured") => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`border-b border-line/50 ${isDragging ? "bg-accent-soft/40" : ""}`}
    >
      <td className="py-2 pl-2 w-8">
        <button
          type="button"
          className="cursor-grab text-muted hover:text-ink"
          {...attributes}
          {...listeners}
          aria-label="إعادة ترتيب"
        >
          <GripVertical size={18} />
        </button>
      </td>
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
            <Image
              src={project.cover_image}
              alt=""
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-ink">{project.title_ar}</p>
            <p className="text-xs text-muted">
              {categoryLabels[project.category]}
            </p>
          </div>
        </div>
      </td>
      <td className="py-2">
        <button
          type="button"
          onClick={() => onToggle("published")}
          className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            project.published
              ? "bg-success/10 text-success"
              : "bg-surface-2 text-muted"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              project.published ? "bg-success" : "bg-muted"
            }`}
          />
          {project.published ? "منشور" : "مسودة"}
        </button>
      </td>
      <td className="py-2">
        <button
          type="button"
          onClick={() => onToggle("featured")}
          className="text-muted hover:text-accent"
          aria-label="مميز"
        >
          <Star
            size={18}
            className={project.featured ? "fill-accent text-accent" : ""}
          />
        </button>
      </td>
      <td className="py-2 text-muted text-xs" dir="ltr">
        {formatDate(project.updated_at)}
      </td>
      <td className="py-2">
        <div className="flex items-center gap-1 justify-end">
          <Link
            href={`/admin/projects/${project.id}`}
            className="p-2 text-muted hover:text-brand"
            aria-label="تعديل"
          >
            <Pencil size={16} />
          </Link>
          <Link
            href={`/work/${project.slug}`}
            target="_blank"
            className="p-2 text-muted hover:text-brand text-xs"
          >
            عرض
          </Link>
          <button
            type="button"
            onClick={onDelete}
            className="p-2 text-muted hover:text-danger"
            aria-label="حذف"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function ProjectsTable({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [deleting, setDeleting] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const visible = projects.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      (query.trim() === "" || p.title_ar.includes(query) || (p.title_en ?? "").includes(query))
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setProjects((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const reordered = arrayMove(items, oldIndex, newIndex);
      // Persist new sort_order
      const updates = reordered.map((item, index) => ({
        id: item.id,
        sort_order: index,
      }));
      syncOrder(updates);
      return reordered;
    });
  }

  async function syncOrder(updates: { id: string; sort_order: number }[]) {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    for (const u of updates) {
      await supabase.from("projects").update({ sort_order: u.sort_order }).eq("id", u.id);
    }
    toast.success("تم إعادة الترتيب");
  }

  async function toggleField(id: string, field: "published" | "featured") {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    const next = !target[field];
    setProjects((items) =>
      items.map((p) => (p.id === id ? { ...p, [field]: next } : p))
    );
    try {
      const { error } = await supabase
        .from("projects")
        .update({ [field]: next })
        .eq("id", id);
      if (error) throw error;
      toast.success(field === "published" ? "تم تحديث النشر" : "تم تحديث المميز");
    } catch {
      setProjects(initialProjects);
      toast.error("حصلت مشكلة — جرب تاني");
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    try {
      const { error } = await supabase.from("projects").delete().eq("id", deleteId);
      if (error) throw error;
      setProjects((items) => items.filter((p) => p.id !== deleteId));
      toast.success("اتحذف المشروع");
      setDeleteId(null);
    } catch {
      toast.error("مش قادر أحذف — جرب تاني");
    } finally {
      setDeleting(false);
    }
  }

  const categories = ["all", "cover", "booklet", "profile", "book"];

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث باسم المشروع..."
          className="flex-1 rounded-md border border-line bg-white px-4 py-2 text-ink focus:border-brand focus:outline-none"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border border-line bg-white px-4 py-2 text-ink"
        >
          <option value="all">كل التصنيفات</option>
          {categories.filter((c) => c !== "all").map((c) => (
            <option key={c} value={c}>
              {categoryLabels[c as keyof typeof categoryLabels]}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-right border-b border-line text-muted">
              <th className="py-2 pl-2 w-8"></th>
              <th className="py-2 pr-1 font-semibold">المشروع</th>
              <th className="px-3 py-2 font-semibold">الحالة</th>
              <th className="px-3 py-2 font-semibold">مميز</th>
              <th className="px-3 py-2 font-semibold">آخر تعديل</th>
              <th className="py-2 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext
                items={visible.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                {visible.map((project) => (
                  <SortableRow
                    key={project.id}
                    project={project}
                    onToggle={(field) => toggleField(project.id, field)}
                    onDelete={() => setDeleteId(project.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-muted">
                  مفيش مشاريع بده الشكل — جرب تعدّل البحث.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="حذف المشروع"
        message="متأكد إنك عايز تحذف المشروع ده؟ من غير رجوع."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
