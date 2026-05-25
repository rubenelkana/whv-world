import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  delta?: { value: string; positive?: boolean; period?: string };
  spark?: number[]; // 0–1 normalised
  icon?: React.ReactNode;
  tone?: "default" | "danger" | "success" | "warn";
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  hint,
  delta,
  spark,
  icon,
  tone = "default",
  className,
}) => (
  <div
    className={cn(
      "relative flex flex-col gap-3 overflow-hidden rounded-p2-lg border bg-white p-5 shadow-p2-sm",
      tone === "danger" && "border-p2-danger/30 bg-p2-danger-soft/40",
      tone === "warn" && "border-p2-warn/30 bg-p2-warn-soft/40",
      tone === "success" && "border-p2-success/30 bg-p2-success-soft/40",
      tone === "default" && "border-p2-line",
      className,
    )}
  >
    <div className="flex items-start justify-between gap-3">
      <span className="font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
        {label}
      </span>
      {icon && <span className="text-p2-ink-3">{icon}</span>}
    </div>

    <div className="flex items-end justify-between gap-3">
      <span className="p2-display text-3xl font-medium tracking-p2-tight text-p2-ink">
        {value}
      </span>
      {spark && <Sparkline values={spark} tone={tone} />}
    </div>

    <div className="flex items-center justify-between text-xs">
      {hint && <span className="text-p2-ink-2">{hint}</span>}
      {delta && (
        <span
          className={cn(
            "inline-flex items-center gap-1 font-medium",
            delta.positive ? "text-p2-success" : "text-p2-danger",
          )}
        >
          {delta.positive ? (
            <TrendingUp className="h-3 w-3" strokeWidth={2} />
          ) : (
            <TrendingDown className="h-3 w-3" strokeWidth={2} />
          )}
          {delta.value}
          {delta.period && (
            <span className="text-p2-ink-3"> · {delta.period}</span>
          )}
        </span>
      )}
    </div>
  </div>
);

const Sparkline: React.FC<{
  values: number[];
  tone: StatCardProps["tone"];
}> = ({ values, tone }) => {
  const w = 84;
  const h = 28;
  if (values.length < 2) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = w / (values.length - 1);
  const points = values
    .map(
      (v, i) =>
        `${i * stepX},${h - ((v - min) / range) * (h - 4) - 2}`,
    )
    .join(" ");

  const stroke =
    tone === "danger"
      ? "#B91C1C"
      : tone === "warn"
      ? "#D97706"
      : tone === "success"
      ? "#15803D"
      : "#1E2F5C";

  return (
    <svg width={w} height={h} className="-mb-1">
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};
