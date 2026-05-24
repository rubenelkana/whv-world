import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-bold transition hover:opacity-90 disabled:opacity-50";
    const variants = {
      primary: "bg-primary text-body",
      secondary: "border border-dark text-dark bg-transparent",
    };
    const sizes = {
      md: "px-10 py-[15px] text-[16px] rounded-button",
      lg: "px-12 py-5 text-[16px] rounded-cta",
    };
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
