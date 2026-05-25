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
  const inkClass = tone === "light" ? "text-white" : "text-p2-ink";
  return (
    <span
      className={cn("inline-flex items-center gap-2", inkClass, className)}
      aria-label="WHV World"
    >
      <Mark tone={tone} />
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span className="font-p2-display text-[18px] font-semibold tracking-p2-tight">
            WHV World
          </span>
          <span
            className={cn(
              "mt-0.5 font-p2-mono text-[9px] uppercase tracking-widest",
              tone === "light" ? "text-white/70" : "text-p2-ink-3",
            )}
          >
            workforce ERP
          </span>
        </span>
      )}
    </span>
  );
};

const Mark: React.FC<{ tone: "default" | "light" }> = ({ tone }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="32"
      height="32"
      rx="8"
      fill={tone === "light" ? "white" : "#1E2F5C"}
    />
    <path
      d="M7 10 L11.5 22 L16 13 L20.5 22 L25 10"
      stroke={tone === "light" ? "#1E2F5C" : "white"}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="25"
      cy="9"
      r="2.6"
      fill="#06B6D4"
      stroke={tone === "light" ? "white" : "#1E2F5C"}
      strokeWidth="1.2"
    />
  </svg>
);
