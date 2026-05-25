import { STAGE_LABEL, STAGE_ORDER, type Stage } from "@/lib/mock";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface StageTrackerProps {
  current: Stage;
  reachedStages?: Stage[];
  className?: string;
}

export const StageTracker: React.FC<StageTrackerProps> = ({
  current,
  reachedStages,
  className,
}) => {
  const currentIdx = STAGE_ORDER.indexOf(current);
  return (
    <ol className={cn("flex items-stretch", className)}>
      {STAGE_ORDER.map((s, i) => {
        const reached = reachedStages ? reachedStages.includes(s) : i < currentIdx;
        const active = i === currentIdx;
        const failed = false; // placeholder if needed later
        return (
          <li key={s} className="flex flex-1 items-center">
            <div className="flex flex-1 flex-col items-center gap-2">
              <span
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full border text-[11px] font-semibold transition-colors",
                  active && "border-p2-brand bg-p2-brand text-white shadow-p2-focus",
                  reached &&
                    !active &&
                    "border-p2-success bg-p2-success text-white",
                  !active &&
                    !reached &&
                    "border-p2-line bg-white text-p2-ink-3",
                )}
              >
                {reached && !active ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={cn(
                  "px-1 text-center text-[10px] font-medium leading-tight",
                  active
                    ? "text-p2-ink"
                    : reached
                    ? "text-p2-ink-2"
                    : "text-p2-ink-3",
                )}
              >
                {STAGE_LABEL[s]}
              </span>
            </div>
            {i < STAGE_ORDER.length - 1 && (
              <span
                className={cn(
                  "h-px w-full self-start",
                  i < currentIdx ? "bg-p2-success" : "bg-p2-line",
                )}
                style={{ marginTop: 14 }}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};
