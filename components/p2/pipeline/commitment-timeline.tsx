import {
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  Mail,
  Smartphone,
} from "lucide-react";
import { type CheckEvent } from "@/lib/mock";
import { cn } from "@/lib/cn";

interface CommitmentTimelineProps {
  checks: CheckEvent[];
  startDate: string;
  className?: string;
}

const CHECK_LABEL: Record<CheckEvent["type"], string> = {
  "7d": "7-day check",
  "48h": "48-hour check",
  arrival: "Arrival ping",
  day7_retention: "Day-7 retention",
};

const CHANNEL_ICON: Record<CheckEvent["channel"], React.ElementType> = {
  sms: Smartphone,
  email: Mail,
  in_app: MessageSquare,
};

export const CommitmentTimeline: React.FC<CommitmentTimelineProps> = ({
  checks,
  startDate,
  className,
}) => {
  // Build a "planned" set so we render upcoming + completed.
  const planned: CheckEvent["type"][] = ["7d", "48h", "arrival", "day7_retention"];
  const map = new Map(checks.map((c) => [c.type, c]));

  return (
    <ol className={cn("relative space-y-3", className)}>
      <span className="absolute bottom-2 left-[11px] top-2 w-px bg-p2-line" />
      {planned.map((t) => {
        const event = map.get(t);
        const status = event?.status ?? "pending";
        const StatusIcon =
          status === "confirmed"
            ? CheckCircle2
            : status === "failed"
            ? XCircle
            : Clock;
        const tone =
          status === "confirmed"
            ? "text-p2-success bg-p2-success-soft"
            : status === "failed"
            ? "text-p2-danger bg-p2-danger-soft"
            : "text-p2-ink-3 bg-white border border-dashed border-p2-line";
        const ChannelIcon = event ? CHANNEL_ICON[event.channel] : null;
        return (
          <li key={t} className="relative flex gap-3 pl-0.5">
            <span
              className={cn(
                "z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full",
                tone,
              )}
            >
              <StatusIcon className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-p2-ink">
                  {CHECK_LABEL[t]}
                </span>
                <span className="font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
                  {status}
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-[11px] text-p2-ink-2">
                {ChannelIcon && (
                  <ChannelIcon className="h-3 w-3" strokeWidth={1.5} />
                )}
                <span>
                  {event
                    ? new Date(
                        event.resolvedAt ?? event.scheduledAt,
                      ).toLocaleString("en-AU", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : `Scheduled relative to start ${new Date(startDate).toLocaleDateString("en-AU")}`}
                </span>
              </div>
              {status === "failed" && (
                <p className="mt-1.5 text-[11px] text-p2-danger">
                  3 attempts — no response received.
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
