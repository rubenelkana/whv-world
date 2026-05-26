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
        "relative flex h-11 items-center rounded-p3-md border bg-white pl-3.5 pr-10 text-sm shadow-p3-sm transition-colors",
        invalid
          ? "border-p3-danger focus-within:border-p3-danger"
          : "border-p3-line focus-within:border-p3-brand",
      )}
    >
      <select
        ref={ref}
        className={cn(
          "h-full w-full appearance-none bg-transparent text-p3-ink outline-none",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 h-4 w-4 text-p3-ink-3"
        strokeWidth={1.75}
      />
    </div>
  ),
);
Select.displayName = "P3Select";
