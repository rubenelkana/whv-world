import { InputHTMLAttributes, forwardRef } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = "", ...props }, ref) => {
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className={`w-5 h-5 rounded border border-border accent-primary ${className}`}
          {...props}
        />
        <span className="text-[16px] text-dark">{label}</span>
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
