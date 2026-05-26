import * as React from "react";
import { cn } from "@/lib/cn";

type Accent =
  | "brand"
  | "coral"
  | "mint"
  | "amber"
  | "indigo"
  | "emerald"
  | "sky"
  | "violet"
  | "orange"
  | "rose";

const bg: Record<Accent, string> = {
  brand: "bg-gradient-to-br from-p3-brand to-p3-brand-deep",
  coral: "bg-gradient-to-br from-p3-accent-coral to-rose-600",
  mint: "bg-gradient-to-br from-p3-accent-mint to-emerald-600",
  amber: "bg-gradient-to-br from-p3-accent-amber to-orange-500",
  indigo: "bg-gradient-to-br from-p3-accent-indigo to-blue-600",
  emerald: "bg-gradient-to-br from-p3-accent-emerald to-teal-600",
  sky: "bg-gradient-to-br from-p3-accent-sky to-blue-500",
  violet: "bg-gradient-to-br from-p3-accent-violet to-fuchsia-600",
  orange: "bg-gradient-to-br from-p3-accent-orange to-amber-600",
  rose: "bg-gradient-to-br from-p3-accent-rose to-pink-600",
};

const soft: Record<Accent, string> = {
  brand: "bg-p3-brand-soft text-p3-brand-deep",
  coral: "bg-p3-accent-coral-soft text-rose-700",
  mint: "bg-p3-accent-mint-soft text-teal-700",
  amber: "bg-p3-accent-amber-soft text-amber-700",
  indigo: "bg-p3-accent-indigo-soft text-indigo-700",
  emerald: "bg-p3-accent-emerald-soft text-emerald-700",
  sky: "bg-p3-accent-sky-soft text-sky-700",
  violet: "bg-p3-accent-violet-soft text-violet-700",
  orange: "bg-p3-accent-orange-soft text-orange-700",
  rose: "bg-p3-accent-rose-soft text-rose-700",
};

interface IconCircleProps {
  accent: Accent;
  variant?: "filled" | "soft";
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

export const IconCircle: React.FC<IconCircleProps> = ({
  accent,
  variant = "filled",
  size = 44,
  className,
  children,
}) => (
  <span
    className={cn(
      "grid shrink-0 place-items-center rounded-p3-md",
      variant === "filled" ? `${bg[accent]} text-white shadow-p3-sm` : soft[accent],
      className,
    )}
    style={{ width: size, height: size }}
  >
    {children}
  </span>
);
