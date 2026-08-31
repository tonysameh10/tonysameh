"use client";

import { useState } from "react";
import { toast } from "sonner";

export function AvailabilityToggle({
  initial,
}: {
  initial: boolean;
}) {
  const [available, setAvailable] = useState(initial);

  async function toggle() {
    const next = !available;
    setAvailable(next);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase
        .from("site_settings")
        .update({ is_available: next })
        .eq("id", 1);
      if (error) throw error;
      toast.success(next ? "ظاهر: متاح لاستقبال الطلبات" : "مخفي: مقفول الطلبات");
    } catch {
      setAvailable(available);
      toast.error("مش قادر أحدّث الحالة — جرب تاني");
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-3"
      aria-pressed={available}
    >
      <span
        className={`relative inline-block h-6 w-11 shrink-0 rounded-full transition-colors ${
          available ? "bg-success" : "bg-line"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
            available ? "start-[calc(100%-1.25rem)]" : "start-0.5"
          }`}
        />
      </span>
      <span className="text-sm font-semibold text-ink">
        {available ? "متاح لاستقبال طلبات هذا الشهر" : "مش متاح هذا الشهر"}
      </span>
    </button>
  );
}
