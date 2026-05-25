import * as React from "react";
import { cn } from "@/lib/cn";

export const Kbd: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...rest
}) => (
  <span
    className={cn(
      "inline-flex h-5 min-w-5 items-center justify-center rounded-p2-xs border border-p2-line bg-white px-1 font-p2-mono text-[10px] text-p2-ink-2 shadow-p2-sm",
      className,
    )}
    {...rest}
  />
);
