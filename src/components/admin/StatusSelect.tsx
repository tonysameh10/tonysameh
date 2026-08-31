"use client";

import { useState } from "react";
import { toast } from "sonner";
import { type Status } from "@/components/admin/StatusBadge";

const options: { value: Status; label: string }[] = [
  { value: "new", label: "جديد" },
  { value: "contacted", label: "تم التواصل" },
  { value: "won", label: "كسب" },
  { value: "lost", label: "ضاع" },
];

export function StatusSelect({
  id,
  status,
}: {
  id: string;
  status: Status;
}) {
  const [current, setCurrent] = useState<Status>(status);

  async function change(next: Status) {
    const prev = current;
    setCurrent(next);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase
        .from("inquiries")
        .update({ status: next })
        .eq("id", id);
      if (error) throw error;
      toast.success("تم تحديث الحالة");
    } catch {
      setCurrent(prev);
      toast.error("مش قادر أحدّث الحالة");
    }
  }

  return (
    <select
      value={current}
      onChange={(e) => change(e.target.value as Status)}
      className="cursor-pointer rounded-md border border-line bg-white px-2 py-1 text-sm font-semibold text-ink"
      aria-label="تحديث الحالة"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
