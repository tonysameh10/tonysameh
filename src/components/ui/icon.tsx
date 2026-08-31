import {
  BookOpen,
  Palette,
  User,
  Book,
  FlaskConical,
  BarChart3,
  Files,
  Printer,
  Ruler,
  FileText,
  Timer,
  Building2,
  PenTool,
  Sparkles,
  Scissors,
  Layers,
  Pencil,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  booklet: BookOpen,
  covers: Palette,
  profile: User,
  books: Book,
  flask: FlaskConical,
  chart: BarChart3,
  files: Files,
  printer: Printer,
  ruler: Ruler,
  file: FileText,
  timer: Timer,
  building: Building2,
  pen: PenTool,
  sparkles: Sparkles,
  scissors: Scissors,
  layers: Layers,
  pencil: Pencil,
  check: CheckCircle2,
} as const;

export type IconName = keyof typeof iconMap;

export function Icon({
  name,
  className,
  size = 24,
  strokeWidth = 1.6,
  tone = "default",
}: {
  name: string | null;
  className?: string;
  size?: number;
  strokeWidth?: number;
  tone?: "default" | "light";
}) {
  const Cmp = iconMap[(name ?? "") as IconName] ?? Sparkles;
  return (
    <Cmp
      className={cn(tone === "light" ? "text-accent-soft" : "text-brand", className)}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
}

export function IconBadge({
  name,
  className,
  tone = "default",
}: {
  name: string | null;
  className?: string;
  tone?: "default" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-12 h-12 rounded-xl",
        tone === "light"
          ? "bg-white/10 text-accent-soft"
          : "bg-brand-soft/20 text-brand",
        className
      )}
    >
      <Icon name={name} size={24} tone={tone} />
    </span>
  );
}
