import Link from "next/link";
import {
  AlertTriangle,
  AlertOctagon,
  CalendarCheck,
  PhoneCall,
} from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/cn";
import {
  type Placement,
  type Worker,
  RISK_LABEL,
} from "@/lib/mock";

interface CandidateCardProps {
  placement: Placement;
  worker: Worker;
  daysToStart: number;
  detailHref: string;
}

const riskTone: Record<Placement["risk"], "success" | "warn" | "danger"> = {
  green: "success",
  amber: "warn",
  red: "danger",
};

export const CandidateCard: React.FC<CandidateCardProps> = ({
  placement,
  worker,
  daysToStart,
  detailHref,
}) => {
  const isRed = placement.risk === "red";
  const isAmber = placement.risk === "amber";

  return (
    <Link
      href={detailHref}
      className={cn(
        "group block rounded-p2-md border bg-white p-3 transition-all hover:-translate-y-px hover:shadow-p2-md",
        isRed && "border-p2-danger/40 bg-p2-danger-soft/40",
        isAmber && "border-p2-warn/40 bg-p2-warn-soft/30",
        !isRed && !isAmber && "border-p2-line",
      )}
    >
      <div className="flex items-start gap-2.5">
        <Avatar
          name={worker.name}
          seed={worker.photoSeed}
          nationality={worker.nationality}
          size={36}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-sm font-semibold text-p2-ink">
              {worker.name}
            </span>
            <span className="shrink-0 font-p2-mono text-[10px] text-p2-ink-3">
              {worker.visa}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-p2-ink-2">
            <span>Reliability {worker.reliability.value}</span>
            <span className="text-p2-ink-4">·</span>
            <span className="truncate">
              {worker.currentLocation
                ? `${worker.currentLocation.city}`
                : "Arriving"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-[11px]">
        <Badge tone={riskTone[placement.risk]} dot size="sm">
          {RISK_LABEL[placement.risk]}
        </Badge>
        <span className="inline-flex items-center gap-1 text-p2-ink-2">
          <CalendarCheck className="h-3 w-3" strokeWidth={1.75} />
          T-{daysToStart}d
        </span>
      </div>

      {placement.notes && (
        <p
          className={cn(
            "mt-2 line-clamp-2 rounded-p2-xs px-2 py-1 text-[11px] leading-snug",
            isRed
              ? "bg-p2-danger-soft text-p2-danger"
              : isAmber
              ? "bg-p2-warn-soft text-p2-warn"
              : "bg-p2-slate-tint text-p2-ink-2",
          )}
        >
          <span className="mr-1 inline-block align-middle">
            {isRed ? (
              <AlertOctagon className="h-3 w-3" strokeWidth={2} />
            ) : isAmber ? (
              <AlertTriangle className="h-3 w-3" strokeWidth={2} />
            ) : (
              <PhoneCall className="h-3 w-3" strokeWidth={2} />
            )}
          </span>
          {placement.notes}
        </p>
      )}
    </Link>
  );
};
