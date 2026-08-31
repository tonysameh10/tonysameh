import { forwardRef } from "react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] hover:scale-[1.02] whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-deep shadow-md",
        secondary:
          "bg-transparent text-brand border-2 border-brand hover:bg-brand/5",
        dark: "bg-brand-deep text-white hover:bg-ink shadow-md",
        wa: "bg-wa text-white hover:brightness-105 shadow-md",
        ghost: "bg-transparent text-ink hover:bg-surface-2",
        outline:
          "bg-transparent text-ink border border-line hover:border-brand-soft",
        accent: "bg-accent text-white hover:brightness-105 shadow-md",
      },
      size: {
        sm: "text-sm px-4 py-2",
        md: "text-base px-6 py-3",
        lg: "text-lg px-8 py-4",
        icon: "p-2.5",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export interface ButtonLinkProps
  extends ComponentProps<typeof Link>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function ButtonLink({
  className,
  variant,
  size,
  fullWidth,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant, size, fullWidth }),
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export { buttonVariants };
