import * as React from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...rest }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "block w-full rounded-p3-md border bg-white px-3.5 py-2.5 text-sm shadow-p3-sm placeholder:text-p3-ink-3 outline-none transition-colors",
        invalid
          ? "border-p3-danger focus:border-p3-danger"
          : "border-p3-line focus:border-p3-brand",
        className,
      )}
      {...rest}
    />
  ),
);
Textarea.displayName = "P3Textarea";
