import * as React from "react";
import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "full" | "mark";
  tone?: "default" | "light";
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  tone = "default",
  className,
}) => {
  const textColour = tone === "light" ? "text-white" : "text-p3-ink";
  return (
    <span
      className={cn("inline-flex items-center gap-2.5", textColour, className)}
      aria-label="WHV World"
    >
      <Mark tone={tone} />
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span className="text-[17px] font-bold tracking-p3-tight">
            WHV World
          </span>
          <span
            className={cn(
              "mt-1 font-p3-mono text-[9px] uppercase tracking-[0.18em]",
              tone === "light" ? "text-white/70" : "text-p3-ink-3",
            )}
          >
            for working holiday
          </span>
        </span>
      )}
    </span>
  );
};

const Mark: React.FC<{ tone: "default" | "light" }> = ({ tone }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="p3-mark-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={tone === "light" ? "#FFFFFF" : "#2563EB"} />
        <stop offset="100%" stopColor={tone === "light" ? "#DBEAFE" : "#14B8A6"} />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="9" fill="url(#p3-mark-grad)" />
    <path
      d="M9 11 L12 22 L16 14 L20 22 L23 11"
      stroke={tone === "light" ? "#1D4ED8" : "#FFFFFF"}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="16"
      cy="16"
      r="1.5"
      fill={tone === "light" ? "#1D4ED8" : "#FFFFFF"}
    />
  </svg>
);
