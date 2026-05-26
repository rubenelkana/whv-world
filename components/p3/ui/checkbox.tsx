"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled,
  className,
}) => (
  <label
    className={cn(
      "group inline-flex cursor-pointer items-start gap-3",
      disabled && "cursor-not-allowed opacity-50",
      className,
    )}
  >
    <span
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-p3-xs border transition-colors",
        checked
          ? "border-p3-brand bg-p3-brand text-white"
          : "border-p3-ink-4 bg-white",
      )}
    >
      {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
    </span>
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onChange?.(e.target.checked)}
      disabled={disabled}
      className="sr-only"
    />
    {(label || description) && (
      <span className="text-sm">
        {label && (
          <span className="block font-medium text-p3-ink">{label}</span>
        )}
        {description && (
          <span className="block text-xs text-p3-ink-2">{description}</span>
        )}
      </span>
    )}
  </label>
);
