import * as React from "react";
import { cn } from "@/lib/cn";

interface ProgressProps {
  value: number; // 0–100
  tone?: "brand" | "success" | "warn" | "danger";
  size?: "xs" | "sm" | "md";
  className?: string;
}

const tones: Record<NonNullable<ProgressProps["tone"]>, string> = {
  brand: "bg-p2-brand-2",
  success: "bg-p2-success",
  warn: "bg-p2-warn",
  danger: "bg-p2-danger",
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  tone = "brand",
  size = "sm",
  className,
}) => (
  <div
    className={cn(
      "w-full overflow-hidden rounded-full bg-p2-slate-tint",
      size === "xs" && "h-1",
      size === "sm" && "h-1.5",
      size === "md" && "h-2",
      className,
    )}
  >
    <div
      className={cn("h-full rounded-full transition-all", tones[tone])}
      style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
    />
  </div>
);
