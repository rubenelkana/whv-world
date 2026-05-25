import { type AvailabilityWindow } from "@/lib/mock";
import { cn } from "@/lib/cn";

interface Props {
  windows: AvailabilityWindow[];
  /** anchor date — usually today */
  anchor?: Date;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const AvailabilityCalendar: React.FC<Props> = ({
  windows,
  anchor = new Date("2026-05-25"),
}) => {
  // Render a 9-month strip starting from anchor month.
  const months: { y: number; m: number }[] = [];
  for (let i = 0; i < 9; i++) {
    const d = new Date(anchor);
    d.setDate(1);
    d.setMonth(d.getMonth() + i);
    months.push({ y: d.getFullYear(), m: d.getMonth() });
  }

  function monthRange(y: number, m: number) {
    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0);
    return { start, end };
  }

  function intersects(y: number, m: number) {
    const { start, end } = monthRange(y, m);
    return windows.some((w) => {
      const f = new Date(w.from);
      const t = new Date(w.to);
      return f <= end && t >= start;
    });
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
        <span>Availability — next 9 months</span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-sm bg-p2-brand" /> available
          <span className="ml-2 h-2 w-3 rounded-sm bg-p2-slate-tint" /> not set
        </span>
      </div>
      <div className="flex gap-1.5">
        {months.map(({ y, m }) => (
          <div key={`${y}-${m}`} className="flex-1 text-center">
            <div
              className={cn(
                "h-10 rounded-p2-sm",
                intersects(y, m) ? "bg-p2-brand" : "bg-p2-slate-tint",
              )}
            />
            <div className="mt-1 font-p2-mono text-[10px] text-p2-ink-3">
              {MONTHS[m]}
              {m === 0 && <span className="ml-1 text-p2-ink-3">'{(y % 100).toString().padStart(2, "0")}</span>}
            </div>
          </div>
        ))}
      </div>
      {windows.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-p2-ink-2">
          {windows.map((w, i) => (
            <li key={i} className="font-p2-mono">
              {new Date(w.from).toLocaleDateString("en-AU")} →{" "}
              {new Date(w.to).toLocaleDateString("en-AU")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
