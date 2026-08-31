"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  // Duplicate the list so the loop is seamless (translateX 50%)
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "marquee-mask overflow-hidden border-y border-line bg-surface-2 py-4",
        className
      )}
      aria-hidden
    >
      <div className="marquee-track flex w-max whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-8 text-lg font-extrabold text-brand-deep/80"
          >
            {item}
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
