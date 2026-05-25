import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-p2-brand text-white hover:bg-p2-brand-deep shadow-p2-sm border border-transparent",
  secondary:
    "bg-white text-p2-ink hover:bg-p2-surface-2 border border-p2-line shadow-p2-sm",
  ghost: "bg-transparent text-p2-ink hover:bg-p2-surface-2 border border-transparent",
  outline: "bg-transparent text-p2-brand hover:bg-p2-brand/5 border border-p2-brand",
  danger:
    "bg-p2-danger text-white hover:bg-red-800 shadow-p2-sm border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-p2-md",
  md: "h-10 px-4 text-sm gap-2 rounded-p2-md",
  lg: "h-12 px-6 text-base gap-2.5 rounded-p2-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", leadingIcon, trailingIcon, children, ...rest },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
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
Button.displayName = "Button";
