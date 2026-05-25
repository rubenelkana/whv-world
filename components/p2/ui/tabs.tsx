"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

interface TabsProps {
  tabs: { id: string; label: React.ReactNode; count?: number }[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, value, onChange, className }) => (
  <div
    className={cn(
      "inline-flex items-center gap-1 rounded-p2-md border border-p2-line bg-white p-1 shadow-p2-sm",
      className,
    )}
  >
    {tabs.map((t) => {
      const active = t.id === value;
      return (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-p2-sm px-3 text-xs font-medium transition-colors",
            active
              ? "bg-p2-ink text-white"
              : "text-p2-ink-2 hover:text-p2-ink",
          )}
        >
          {t.label}
          {typeof t.count === "number" && (
            <span
              className={cn(
                "rounded-p2-xs px-1 py-px text-[10px]",
                active ? "bg-white/20 text-white" : "bg-p2-slate-tint text-p2-ink-2",
              )}
            >
              {t.count}
            </span>
          )}
        </button>
      );
    })}
  </div>
);
