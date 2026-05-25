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
        "block w-full rounded-p2-md border bg-white px-3 py-2 text-sm shadow-p2-sm transition-colors placeholder:text-p2-ink-3 outline-none",
        invalid
          ? "border-p2-danger focus:border-p2-danger"
          : "border-p2-line focus:border-p2-brand-2",
        className,
      )}
      {...rest}
    />
  ),
);
Textarea.displayName = "Textarea";
