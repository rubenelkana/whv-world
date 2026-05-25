import { AlertTriangle, AlertOctagon, Info, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/cn";

interface RiskAlertProps {
  severity: "info" | "warn" | "danger";
  title: string;
  body: React.ReactNode;
  cta?: { label: string; href?: string; onClick?: () => void };
  className?: string;
  compact?: boolean;
}

export const RiskAlert: React.FC<RiskAlertProps> = ({
  severity,
  title,
  body,
  cta,
  className,
  compact,
}) => {
  const Icon =
    severity === "danger" ? AlertOctagon : severity === "warn" ? AlertTriangle : Info;
  const tones: Record<string, string> = {
    danger: "border-p2-danger/40 bg-p2-danger-soft",
    warn: "border-p2-warn/40 bg-p2-warn-soft",
    info: "border-p2-info/30 bg-p2-info-soft",
  };
  const iconTones: Record<string, string> = {
    danger: "text-p2-danger",
    warn: "text-p2-warn",
    info: "text-p2-info",
  };
  return (
    <div
      className={cn(
        "rounded-p2-lg border",
        tones[severity],
        compact ? "p-3" : "p-4",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white",
            iconTones[severity],
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <div className="flex-1">
          <div className="text-sm font-semibold text-p2-ink">{title}</div>
          <div className="mt-1 text-[13px] text-p2-ink-2">{body}</div>
          {cta && (
            <div className="mt-3">
              <Button
                size="sm"
                variant="secondary"
                trailingIcon={<ArrowRight className="h-3 w-3" strokeWidth={2} />}
                onClick={cta.onClick}
              >
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
