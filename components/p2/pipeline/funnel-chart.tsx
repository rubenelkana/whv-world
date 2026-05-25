import { STAGE_LABEL, STAGE_ORDER, type Stage } from "@/lib/mock";

interface FunnelChartProps {
  counts: Record<string, number>;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ counts }) => {
  const max = Math.max(...STAGE_ORDER.map((s) => counts[s] ?? 0), 1);
  return (
    <div className="space-y-2.5">
      {STAGE_ORDER.map((s) => {
        const v = counts[s] ?? 0;
        const pct = (v / max) * 100;
        return <FunnelRow key={s} stage={s} value={v} pct={pct} />;
      })}
    </div>
  );
};

const FunnelRow: React.FC<{ stage: Stage; value: number; pct: number }> = ({
  stage,
  value,
  pct,
}) => (
  <div className="flex items-center gap-3">
    <span className="w-28 shrink-0 text-xs text-p2-ink-2">
      {STAGE_LABEL[stage]}
    </span>
    <div className="relative flex h-7 flex-1 items-center overflow-hidden rounded-p2-md bg-p2-slate-tint">
      <div
        className="absolute inset-y-0 left-0 rounded-p2-md bg-gradient-to-r from-p2-brand to-p2-brand-2/80"
        style={{ width: `${pct}%` }}
      />
      <span className="relative ml-2.5 text-xs font-semibold text-white mix-blend-difference">
        {value}
      </span>
    </div>
  </div>
);
