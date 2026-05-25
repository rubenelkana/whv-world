import * as React from "react";
import { cn } from "@/lib/cn";

interface FieldProps {
  label?: React.ReactNode;
  helper?: React.ReactNode;
  error?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const Field: React.FC<React.PropsWithChildren<FieldProps>> = ({
  label,
  helper,
  error,
  children,
}) => (
  <label className="block text-sm">
    {label && (
      <span className="mb-1.5 block font-medium text-p2-ink">{label}</span>
    )}
    {children}
    {(helper || error) && (
      <span
        className={cn(
          "mt-1.5 block text-xs",
          error ? "text-p2-danger" : "text-p2-ink-2",
        )}
      >
        {error ?? helper}
      </span>
    )}
  </label>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, leading, trailing, ...rest }, ref) => (
    <div
      className={cn(
        "flex h-10 items-center gap-2 rounded-p2-md border bg-white px-3 text-sm shadow-p2-sm transition-colors",
        invalid
          ? "border-p2-danger focus-within:border-p2-danger"
          : "border-p2-line focus-within:border-p2-brand-2",
      )}
    >
      {leading && <span className="text-p2-ink-3 shrink-0">{leading}</span>}
      <input
        ref={ref}
        className={cn(
          "h-full flex-1 bg-transparent text-p2-ink placeholder:text-p2-ink-3 outline-none",
          className,
        )}
        {...rest}
      />
      {trailing && <span className="text-p2-ink-3 shrink-0">{trailing}</span>}
    </div>
  ),
);
Input.displayName = "Input";
