import { type Worker, type Placement } from "@/lib/mock";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

interface BackupQueueProps {
  backups: { placement: Placement; worker: Worker }[];
  className?: string;
}

export const BackupQueue: React.FC<BackupQueueProps> = ({ backups, className }) => (
  <div className={className}>
    <div className="mb-3 flex items-center justify-between">
      <h4 className="text-sm font-semibold text-p2-ink">Backup queue</h4>
      <Badge tone="brand" size="sm">
        {backups.length} ready
      </Badge>
    </div>

    <ol className="space-y-2.5">
      {backups.map(({ placement, worker }, i) => (
        <li
          key={placement.id}
          className="flex items-center gap-3 rounded-p2-md border border-p2-line bg-white p-3"
        >
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-p2-slate-tint font-p2-mono text-[10px] font-semibold text-p2-ink-2">
            {i + 1}
          </span>
          <Avatar
            name={worker.name}
            seed={worker.photoSeed}
            nationality={worker.nationality}
            size={32}
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-p2-ink">
              {worker.name}
            </div>
            <div className="text-[11px] text-p2-ink-2">
              Reliability {worker.reliability.value} ·{" "}
              {worker.currentLocation?.city ?? "Arriving"}
            </div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            leadingIcon={<ArrowUp className="h-3 w-3" strokeWidth={2} />}
          >
            Promote
          </Button>
        </li>
      ))}
    </ol>

    <p className="mt-4 text-[11px] text-p2-ink-3">
      Backups are auto-ranked by availability, visa fit, prior reliability, and
      distance to job site.
    </p>
  </div>
);
