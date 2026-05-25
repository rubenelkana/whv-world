import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid, children, ...rest }, ref) => (
    <div
      className={cn(
        "relative flex h-10 items-center rounded-p2-md border bg-white pl-3 pr-9 text-sm shadow-p2-sm transition-colors",
        invalid
          ? "border-p2-danger focus-within:border-p2-danger"
          : "border-p2-line focus-within:border-p2-brand-2",
      )}
    >
      <select
        ref={ref}
        className={cn(
          "h-full w-full appearance-none bg-transparent text-p2-ink outline-none",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 h-4 w-4 text-p2-ink-3"
        strokeWidth={1.5}
      />
    </div>
  ),
);
Select.displayName = "Select";
