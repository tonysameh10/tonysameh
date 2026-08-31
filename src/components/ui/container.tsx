import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 md:px-8", className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      {children}
    </section>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg bg-white border border-line p-6 shadow-sm transition-shadow duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-12 md:mb-16",
        center && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-3 text-sm font-bold tracking-wide",
            dark ? "text-accent-soft" : "text-brand"
          )}
        >
          <span
            className={cn(
              "h-[2px] w-8 rounded-full",
              dark ? "bg-accent-soft/60" : "bg-accent/60"
            )}
          />
          {eyebrow}
          <span
            className={cn(
              "h-[2px] w-8 rounded-full",
              dark ? "bg-accent-soft/60" : "bg-accent/60"
            )}
          />
        </p>
      )}
      <h2
        className={cn(
          "text-[clamp(22px,3vw,32px)] font-extrabold leading-[1.35]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg leading-relaxed mt-3",
            dark ? "text-white/80" : "text-body"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
