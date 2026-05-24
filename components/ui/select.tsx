import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  label: string;
  placeholder?: string;
  options: Option[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, placeholder, options, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-[16px] font-medium text-dark">{label}</label>
        <div className="relative">
          <select
            ref={ref}
            className={`w-full h-[60px] rounded-input border border-border bg-body text-[16px] text-dark appearance-none px-5 pr-12 outline-none focus:border-primary ${className}`}
            defaultValue=""
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={20}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-border pointer-events-none"
          />
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
