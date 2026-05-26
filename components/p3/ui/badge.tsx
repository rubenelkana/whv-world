import * as React from "react";
import { cn } from "@/lib/cn";

type Tone =
  | "neutral"
  | "brand"
  | "mint"
  | "coral"
  | "amber"
  | "indigo"
  | "emerald"
  | "sky"
  | "violet"
  | "orange"
  | "rose"
  | "success"
  | "warn"
  | "danger";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  size?: "sm" | "md";
  dot?: boolean;
}

const toneSolid: Record<Tone, string> = {
  neutral: "bg-p3-surface text-p3-ink-2",
  brand: "bg-p3-brand-soft text-p3-brand-deep",
  mint: "bg-p3-accent-mint-soft text-teal-700",
  coral: "bg-p3-accent-coral-soft text-rose-700",
  amber: "bg-p3-accent-amber-soft text-amber-700",
  indigo: "bg-p3-accent-indigo-soft text-indigo-700",
  emerald: "bg-p3-accent-emerald-soft text-emerald-700",
  sky: "bg-p3-accent-sky-soft text-sky-700",
  violet: "bg-p3-accent-violet-soft text-violet-700",
  orange: "bg-p3-accent-orange-soft text-orange-700",
  rose: "bg-p3-accent-rose-soft text-rose-700",
  success: "bg-p3-success-soft text-p3-success",
  warn: "bg-p3-warn-soft text-p3-warn",
  danger: "bg-p3-danger-soft text-p3-danger",
};

const dotColour: Record<Tone, string> = {
  neutral: "bg-p3-ink-3",
  brand: "bg-p3-brand",
  mint: "bg-p3-accent-mint",
  coral: "bg-p3-accent-coral",
  amber: "bg-p3-accent-amber",
  indigo: "bg-p3-accent-indigo",
  emerald: "bg-p3-accent-emerald",
  sky: "bg-p3-accent-sky",
  violet: "bg-p3-accent-violet",
  orange: "bg-p3-accent-orange",
  rose: "bg-p3-accent-rose",
  success: "bg-p3-success",
  warn: "bg-p3-warn",
  danger: "bg-p3-danger",
};

export const Badge: React.FC<BadgeProps> = ({
  tone = "neutral",
  size = "sm",
  dot,
  className,
  children,
  ...rest
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full font-medium leading-none",
      size === "sm" ? "h-6 px-2 text-[11px]" : "h-7 px-2.5 text-xs",
      toneSolid[tone],
      className,
    )}
    {...rest}
  >
    {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotColour[tone])} />}
    {children}
  </span>
);
