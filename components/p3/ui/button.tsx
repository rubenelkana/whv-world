import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "tonal";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  block?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-p3-brand text-white hover:bg-p3-brand-deep shadow-p3-sm border border-transparent",
  secondary:
    "bg-white text-p3-ink hover:bg-p3-surface border border-p3-line shadow-p3-sm",
  ghost:
    "bg-transparent text-p3-ink hover:bg-p3-surface border border-transparent",
  outline:
    "bg-transparent text-p3-brand hover:bg-p3-brand-tint border border-p3-brand",
  tonal:
    "bg-p3-brand-soft text-p3-brand-deep hover:bg-p3-brand-soft/80 border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-xs gap-1.5 rounded-p3-md",
  md: "h-11 px-5 text-sm gap-2 rounded-p3-md",
  lg: "h-13 px-7 text-base gap-2.5 rounded-p3-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      leadingIcon,
      trailingIcon,
      block,
      children,
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-semibold tracking-p3-tight transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
        size === "lg" && "h-12",
        variants[variant],
        sizes[size],
        block && "w-full",
        className,
      )}
      {...rest}
    >
      {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
      <span>{children}</span>
      {trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
    </button>
  ),
);
Button.displayName = "P3Button";
