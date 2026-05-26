import * as React from "react";
import { cn } from "@/lib/cn";

export const Divider: React.FC<{
  className?: string;
  vertical?: boolean;
  label?: string;
}> = ({ className, vertical, label }) => {
  if (vertical) {
    return <div className={cn("w-px self-stretch bg-p3-line", className)} />;
  }
  if (label) {
    return (
      <div className={cn("flex items-center gap-3 text-xs text-p3-ink-3", className)}>
        <span className="h-px flex-1 bg-p3-line" />
        <span className="font-medium uppercase tracking-widest">{label}</span>
        <span className="h-px flex-1 bg-p3-line" />
      </div>
    );
  }
  return <div className={cn("h-px w-full bg-p3-line", className)} />;
};
