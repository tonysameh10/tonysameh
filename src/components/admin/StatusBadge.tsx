import { cn } from "@/lib/utils";

const statusConfig = {
  new: { label: "جديد", className: "bg-accent-soft text-brand-deep" },
  contacted: { label: "تم التواصل", className: "bg-brand/10 text-brand" },
  won: { label: "كسب", className: "bg-success/10 text-success" },
  lost: { label: "ضاع", className: "bg-danger/10 text-danger" },
} as const;

export type Status = keyof typeof statusConfig;

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status] ?? statusConfig.new;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
