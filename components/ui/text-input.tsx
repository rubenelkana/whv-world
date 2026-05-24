import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, icon, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-[16px] font-medium text-dark">{label}</label>
        <div className="relative">
          {icon && (
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-border">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full h-[60px] rounded-input border border-border bg-body text-[16px] text-dark placeholder:text-placeholder outline-none focus:border-primary ${
              icon ? "pl-14" : "pl-5"
            } pr-5 ${className}`}
            {...props}
          />
        </div>
      </div>
    );
  }
);
TextInput.displayName = "TextInput";
