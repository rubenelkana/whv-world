import * as React from "react";
import { cn } from "@/lib/cn";

interface FieldProps {
  label?: React.ReactNode;
  helper?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
}

export const Field: React.FC<React.PropsWithChildren<FieldProps>> = ({
  label,
  helper,
  error,
  required,
  children,
}) => (
  <label className="block text-sm">
    {label && (
      <span className="mb-1.5 flex items-center gap-1 font-semibold text-p3-ink">
        {label}
        {required && <span className="text-p3-danger">*</span>}
      </span>
    )}
    {children}
    {(helper || error) && (
      <span
        className={cn(
          "mt-1.5 block text-xs",
          error ? "text-p3-danger" : "text-p3-ink-2",
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
        "flex h-11 items-center gap-2 rounded-p3-md border bg-white px-3.5 text-sm shadow-p3-sm transition-colors",
        invalid
          ? "border-p3-danger focus-within:border-p3-danger"
          : "border-p3-line focus-within:border-p3-brand",
      )}
    >
      {leading && <span className="shrink-0 text-p3-ink-3">{leading}</span>}
      <input
        ref={ref}
        className={cn(
          "h-full flex-1 bg-transparent text-p3-ink placeholder:text-p3-ink-3 outline-none",
          className,
        )}
        {...rest}
      />
      {trailing && <span className="shrink-0 text-p3-ink-3">{trailing}</span>}
    </div>
  ),
);
Input.displayName = "P3Input";
