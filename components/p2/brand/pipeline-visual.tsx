// Decorative pipeline visual for the landing hero — shows the value-prop
// (commitment verification) at a glance without needing real interactivity.
import { Check, AlertTriangle, X, Clock } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";

const stages = [
  { label: "Sourced", count: 18 },
  { label: "Offer", count: 9 },
  { label: "Signed", count: 7 },
  { label: "7-day check", count: 5 },
  { label: "48-hour", count: 3 },
  { label: "Started", count: 2 },
];

export const PipelineVisual: React.FC = () => (
  <div className="relative overflow-hidden rounded-p2-xl border border-p2-line bg-white shadow-p2-lg">
    {/* mock window chrome */}
    <div className="flex items-center justify-between border-b border-p2-line/70 bg-p2-surface-2 px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-p2-ink-4" />
        <span className="h-2.5 w-2.5 rounded-full bg-p2-ink-4" />
        <span className="h-2.5 w-2.5 rounded-full bg-p2-ink-4" />
      </div>
      <span className="font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
        whvworld.app/dashboard/jobs/citrus-griffith
      </span>
      <span className="w-9" />
    </div>

    <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_18rem]">
      <div className="border-r border-p2-line p-5">
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-p2-tight text-p2-ink">
              Mandarin Pickers · Crew of 12
            </h3>
            <p className="text-xs text-p2-ink-2">
              Riverina Citrus · Griffith, NSW · Starts in{" "}
              <span className="font-medium text-p2-ink">14 days</span>
            </p>
          </div>
          <Badge tone="warn" dot>
            1 at risk
          </Badge>
        </div>

        {/* Stage tracker */}
        <div className="mb-5 flex items-center gap-1">
          {stages.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center gap-1">
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex h-1 w-full overflow-hidden rounded-full bg-p2-slate-tint">
                  <div
                    className="h-full bg-p2-brand"
                    style={{ width: `${(s.count / 18) * 100}%` }}
                  />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-p2-mono text-[9px] uppercase tracking-widest text-p2-ink-3">
                    {s.label}
                  </span>
                  <span className="text-[10px] font-semibold text-p2-ink">
                    {s.count}
                  </span>
                </div>
              </div>
              {i < stages.length - 1 && (
                <span className="h-3 w-px bg-p2-line" />
              )}
            </div>
          ))}
        </div>

        {/* Candidate rows */}
        <div className="space-y-1.5">
          <CandidateRow
            name="Léa Marchand"
            country="FR"
            seed="lea-marchand-fr"
            stage="7-day check"
            status="confirmed"
            note="SMS confirmed 8m ago"
          />
          <CandidateRow
            name="Liam Carter"
            country="GB"
            seed="liam-carter-gb"
            stage="48-hour check"
            status="confirmed"
            note="On site Mon · ⭐ Repeat hire"
          />
          <CandidateRow
            name="Sasha Volkov"
            country="EE"
            seed="sasha-volkov-ee"
            stage="7-day check"
            status="failed"
            note="3 SMS attempts · 0 reply"
            risky
          />
          <CandidateRow
            name="Ji-ho Park"
            country="KR"
            seed="jiho-park-kr"
            stage="Contract signed"
            status="pending"
            note="Flight lands 2 June"
          />
        </div>
      </div>

      {/* Right rail: backup queue */}
      <div className="bg-p2-surface-2 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
            Backup queue
          </span>
          <Badge tone="brand" size="sm">
            3 ready
          </Badge>
        </div>
        <div className="space-y-2">
          {[
            { n: "Hannah Schmidt", c: "DE", s: "hannah-schmidt-de", r: 68 },
            { n: "Yuki Sato", c: "JP", s: "yuki-sato-jp", r: 60 },
            { n: "Camille Lefèvre", c: "FR", s: "camille-lefevre-fr", r: 70 },
          ].map((b) => (
            <div
              key={b.n}
              className="flex items-center gap-2.5 rounded-p2-md border border-p2-line bg-white p-2.5"
            >
              <Avatar
                name={b.n}
                seed={b.s}
                nationality={b.c}
                size={28}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium text-p2-ink">
                  {b.n}
                </span>
                <span className="block text-[10px] text-p2-ink-3">
                  Reliability · {b.r}
                </span>
              </span>
              <button className="rounded-p2-xs border border-p2-line bg-p2-paper px-2 py-1 text-[10px] font-medium text-p2-ink hover:bg-white">
                Promote
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-p2-md border border-dashed border-p2-warn/50 bg-p2-warn-soft/60 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-p2-warn">
            <AlertTriangle className="h-3 w-3" strokeWidth={2.5} />
            Action required
          </div>
          <p className="text-[11px] leading-snug text-p2-ink-2">
            Promote a backup for{" "}
            <span className="font-medium text-p2-ink">Sasha Volkov</span> within
            48h to maintain headcount of 12.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CandidateRow: React.FC<{
  name: string;
  country: string;
  seed: string;
  stage: string;
  status: "confirmed" | "pending" | "failed";
  note: string;
  risky?: boolean;
}> = ({ name, country, seed, stage, status, note, risky }) => {
  const StatusIcon =
    status === "confirmed" ? Check : status === "failed" ? X : Clock;
  const tone =
    status === "confirmed"
      ? "success"
      : status === "failed"
      ? "danger"
      : "info";
  const bg =
    tone === "success"
      ? "bg-p2-success-soft text-p2-success"
      : tone === "danger"
      ? "bg-p2-danger-soft text-p2-danger"
      : "bg-p2-info-soft text-p2-info";
  return (
    <div
      className={`flex items-center gap-3 rounded-p2-md border px-3 py-2 ${
        risky ? "border-p2-danger/30 bg-p2-danger-soft/30" : "border-p2-line/70"
      }`}
    >
      <Avatar name={name} seed={seed} nationality={country} size={30} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-p2-ink">
          {name}
        </span>
        <span className="block text-[11px] text-p2-ink-2">{note}</span>
      </span>
      <Badge tone="neutral" size="sm">
        {stage}
      </Badge>
      <span className={`grid h-6 w-6 place-items-center rounded-full ${bg}`}>
        <StatusIcon className="h-3 w-3" strokeWidth={3} />
      </span>
    </div>
  );
};
