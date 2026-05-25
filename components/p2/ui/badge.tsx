import * as React from "react";
import { cn } from "@/lib/cn";

type Tone =
  | "neutral"
  | "info"
  | "success"
  | "warn"
  | "danger"
  | "brand"
  | "accent";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  size?: "sm" | "md";
  dot?: boolean;
  outline?: boolean;
}

const tones: Record<Tone, { solid: string; outline: string; dot: string }> = {
  neutral: {
    solid: "bg-p2-slate-tint text-p2-ink-2",
    outline: "border-p2-line text-p2-ink-2",
    dot: "bg-p2-ink-3",
  },
  info: {
    solid: "bg-p2-info-soft text-p2-info",
    outline: "border-p2-info/40 text-p2-info",
    dot: "bg-p2-info",
  },
  success: {
    solid: "bg-p2-success-soft text-p2-success",
    outline: "border-p2-success/40 text-p2-success",
    dot: "bg-p2-success",
  },
  warn: {
    solid: "bg-p2-warn-soft text-p2-warn",
    outline: "border-p2-warn/40 text-p2-warn",
    dot: "bg-p2-warn",
  },
  danger: {
    solid: "bg-p2-danger-soft text-p2-danger",
    outline: "border-p2-danger/40 text-p2-danger",
    dot: "bg-p2-danger",
  },
  brand: {
    solid: "bg-p2-brand/10 text-p2-brand",
    outline: "border-p2-brand/30 text-p2-brand",
    dot: "bg-p2-brand",
  },
  accent: {
    solid: "bg-p2-accent/15 text-cyan-700",
    outline: "border-p2-accent/40 text-cyan-700",
    dot: "bg-p2-accent",
  },
};

export const Badge: React.FC<BadgeProps> = ({
  tone = "neutral",
  size = "sm",
  dot,
  outline,
  className,
  children,
  ...rest
}) => {
  const t = tones[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-p2-xs font-medium leading-none",
        size === "sm" ? "h-5 px-1.5 text-[11px]" : "h-6 px-2 text-xs",
        outline ? `border bg-transparent ${t.outline}` : t.solid,
        className,
      )}
      {...rest}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", t.dot)} />}
      {children}
    </span>
  );
};
