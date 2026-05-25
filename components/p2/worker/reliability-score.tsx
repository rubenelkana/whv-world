import { Progress } from "../ui/progress";
import { type ReliabilityScore as RS } from "@/lib/mock";

interface Props {
  score: RS;
  compact?: boolean;
}

export const ReliabilityScore: React.FC<Props> = ({ score, compact }) => {
  const items = [
    { label: "On-time start", value: score.breakdown.onTimeStart },
    { label: "Stayed 7 days", value: score.breakdown.stayed7d },
    { label: "Reconfirm responsiveness", value: score.breakdown.reconfirmResponsiveness },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <Ring value={score.value} size={48} />
        <div>
          <div className="p2-display text-xl font-medium text-p2-ink">
            {score.value}
            <span className="ml-1 text-sm font-normal text-p2-ink-2">/100</span>
          </div>
          <div className="text-[11px] text-p2-ink-3">
            {score.placements} prior placement{score.placements === 1 ? "" : "s"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <Ring value={score.value} size={80} />
        <div>
          <div className="p2-display text-3xl font-medium text-p2-ink">
            {score.value}
            <span className="ml-1 text-base font-normal text-p2-ink-2">/100</span>
          </div>
          <div className="text-xs text-p2-ink-2">
            Composite reliability score across{" "}
            <span className="font-medium text-p2-ink">
              {score.placements}
            </span>{" "}
            prior placements
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {items.map((it) => (
          <div key={it.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-p2-ink-2">{it.label}</span>
              <span className="font-semibold text-p2-ink">{it.value}</span>
            </div>
            <Progress
              value={it.value}
              tone={it.value >= 80 ? "success" : it.value >= 60 ? "warn" : "danger"}
              size="sm"
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-p2-ink-3">
        Score blends on-time start (40%), retention through week 1 (40%), and
        reconfirmation responsiveness (20%).
      </p>
    </div>
  );
};

const Ring: React.FC<{ value: number; size: number }> = ({ value, size }) => {
  const r = size / 2 - 4;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const colour = value >= 80 ? "#15803D" : value >= 60 ? "#D97706" : "#B91C1C";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="6"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={colour}
        strokeWidth="6"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};
