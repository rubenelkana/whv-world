import * as React from "react";
import { cn } from "@/lib/cn";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  leading?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  active,
  leading,
  className,
  children,
  ...rest
}) => (
  <button
    className={cn(
      "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-all",
      active
        ? "border-p3-ink bg-p3-ink text-white shadow-p3-sm"
        : "border-p3-line bg-white text-p3-ink-2 hover:border-p3-ink-4 hover:text-p3-ink",
      className,
    )}
    {...rest}
  >
    {leading && <span className="shrink-0">{leading}</span>}
    {children}
  </button>
);
