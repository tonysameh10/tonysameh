import { formatPrice, waLink } from "@/lib/utils";
import { dictionary } from "@/lib/dictionary";
import { cn } from "@/lib/utils";

/**
 * Unified price renderer.
 * When `show` is false, prices are hidden from clients and replaced with
 * an "ask for price" affordance that routes to WhatsApp.
 * Prices are only ever displayed after the admin turns them on from settings.
 */
export function PriceTag({
  price,
  show,
  message,
  className,
  size = "md",
  tone = "default",
}: {
  price: number | null;
  show: boolean;
  message: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "default" | "dark" | "light";
}) {
  if (!price || price <= 0) {
    return <PriceAsk message={message} className={className} size={size} tone={tone} />;
  }

  if (show) {
    const clamp =
      size === "lg"
        ? "text-[clamp(30px,3vw,40px)]"
        : size === "sm"
          ? "text-base"
          : "text-[clamp(22px,2.5vw,30px)]";
    return (
      <span
        className={cn(
          "inline-flex items-baseline gap-1.5 font-black",
          clamp,
          tone === "dark"
            ? "text-brand"
            : tone === "light"
              ? "text-white"
              : "text-ink",
          className
        )}
      >
        <span dir="ltr" className="tabular-nums">
          {formatPrice(price)}
        </span>
        <span className={cn("text-sm font-bold", tone === "light" ? "text-white/70" : "text-muted")}>
          ج.م
        </span>
      </span>
    );
  }

  return <PriceAsk message={message} className={className} size={size} tone={tone} />;
}

function PriceAsk({
  message,
  className,
  size,
  tone,
}: {
  message: string;
  className?: string;
  size: "sm" | "md" | "lg";
  tone: "default" | "dark" | "light";
}) {
  const padding = size === "lg" ? "px-5 py-2.5" : "px-3.5 py-1.5";
  return (
    <a
      href={waLink(dictionary.brand.whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-bold transition-all hover:scale-[1.04]",
        padding,
        tone === "light"
          ? "border-white/40 bg-white/10 text-white hover:bg-white/20"
          : tone === "dark"
            ? "border-brand/30 bg-accent-soft/60 text-brand-deep hover:bg-accent-soft"
            : "border-brand bg-brand/5 text-brand hover:bg-brand hover:text-white",
        size === "sm" ? "text-sm" : size === "lg" ? "text-base" : "text-sm",
        className
      )}
    >
      اسأل عن السعر
    </a>
  );
}