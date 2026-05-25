import { Topbar } from "@/components/p2/layout/topbar";
import { StatCard } from "@/components/p2/brand/stat-card";
import { Card, CardTitle, CardSubtitle } from "@/components/p2/ui/card";
import { Badge } from "@/components/p2/ui/badge";
import { TrendingUp, ShieldCheck, AlertTriangle, Activity } from "lucide-react";
import { workers, placements, getDashboardKpis } from "@/lib/mock";

export default function ReliabilityPage() {
  const k = getDashboardKpis();

  const top = workers.slice().sort((a, b) => b.reliability.value - a.reliability.value).slice(0, 5);
  const watch = workers
    .slice()
    .sort((a, b) => a.reliability.value - b.reliability.value)
    .slice(0, 5);

  // Synthetic cohort retention buckets (illustrative).
  const cohort = [
    { week: "Sourced", value: 100 },
    { week: "Offered", value: 78 },
    { week: "Accepted", value: 64 },
    { week: "Signed", value: 56 },
    { week: "7-day check", value: 48 },
    { week: "48h check", value: 44 },
    { week: "Started", value: 41 },
    { week: "Stayed 7d", value: 39 },
  ];

  const byIndustry = [
    { name: "Horticulture", on: 96, no: 4 },
    { name: "Agriculture", on: 91, no: 9 },
    { name: "Hospitality", on: 98, no: 2 },
    { name: "Tourism", on: 94, no: 6 },
    { name: "Construction", on: 88, no: 12 },
  ];

  return (
    <>
      <Topbar
        breadcrumbs={[{ label: "Riverina Citrus" }, { label: "Reliability" }]}
      />
      <div className="mx-auto w-full max-w-[1280px] px-6 py-8">
        <div className="mb-6">
          <h1 className="p2-display text-3xl font-medium tracking-p2-tight text-p2-ink">
            Reliability analytics
          </h1>
          <p className="mt-1.5 text-sm text-p2-ink-2">
            Where your placements drop off, where they stick, and which workers
            consistently deliver.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="On-time start rate"
            value={`${Math.round(k.onTimeStartRate * 100)}%`}
            hint="rolling 90 days"
            delta={{ value: "+2.4pp", positive: true }}
            tone="success"
            icon={<ShieldCheck className="h-4 w-4" strokeWidth={1.5} />}
            spark={[88, 89, 91, 93, 93, 95, 96]}
          />
          <StatCard
            label="Day-7 retention"
            value="93%"
            hint="of placements that started"
            delta={{ value: "+1.1pp", positive: true }}
            icon={<TrendingUp className="h-4 w-4" strokeWidth={1.5} />}
            spark={[85, 86, 88, 90, 91, 92, 93]}
          />
          <StatCard
            label="Reconfirmation response"
            value="67%"
            hint="responded within 24h"
            delta={{ value: "−3pp", positive: false }}
            tone="warn"
            icon={<Activity className="h-4 w-4" strokeWidth={1.5} />}
          />
          <StatCard
            label="No-show rate"
            value={`${Math.round(k.noShowRate * 100)}%`}
            hint="industry avg ~30%"
            tone="danger"
            icon={<AlertTriangle className="h-4 w-4" strokeWidth={1.5} />}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Cohort funnel */}
          <Card>
            <CardTitle>Cohort retention through the pipeline</CardTitle>
            <CardSubtitle>
              Of 100 candidates sourced, how many reach each stage
            </CardSubtitle>
            <div className="mt-5 space-y-2.5">
              {cohort.map((c) => (
                <div key={c.week} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-xs text-p2-ink-2">
                    {c.week}
                  </span>
                  <div className="relative h-6 flex-1 overflow-hidden rounded-p2-md bg-p2-slate-tint">
                    <div
                      className="h-full bg-gradient-to-r from-p2-brand to-p2-brand-2/85"
                      style={{ width: `${c.value}%` }}
                    />
                    <span className="absolute inset-y-0 right-2 grid place-items-center font-p2-mono text-[10px] font-semibold text-p2-ink">
                      {c.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-p2-ink-3">
              Biggest drop-off: offered → accepted (−14pp). Reconfirmation
              cadence captures the rest before the start date.
            </p>
          </Card>

          {/* By industry */}
          <Card>
            <CardTitle>By industry</CardTitle>
            <CardSubtitle>On-time start rate, last 6 months</CardSubtitle>
            <ol className="mt-5 space-y-3">
              {byIndustry.map((i) => (
                <li key={i.name}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-p2-ink">{i.name}</span>
                    <span className="font-p2-mono text-p2-ink-2">
                      {i.on}% on-time · {i.no}% no-show
                    </span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full bg-p2-slate-tint">
                    <span
                      className="h-full bg-p2-success"
                      style={{ width: `${i.on}%` }}
                    />
                    <span
                      className="h-full bg-p2-danger"
                      style={{ width: `${i.no}%` }}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card padded={false}>
            <div className="flex items-center justify-between border-b border-p2-line px-5 py-4">
              <div>
                <CardTitle>Top reliability</CardTitle>
                <CardSubtitle>Promote these candidates to repeat clients</CardSubtitle>
              </div>
              <Badge tone="success" dot>
                Top 5
              </Badge>
            </div>
            <ul>
              {top.map((w, i) => (
                <WorkerLine
                  key={w.id}
                  rank={i + 1}
                  name={w.name}
                  meta={`${w.nationality} · ${w.reliability.placements} prior · ${w.preferredIndustries[0]}`}
                  score={w.reliability.value}
                  tone="success"
                />
              ))}
            </ul>
          </Card>

          <Card padded={false}>
            <div className="flex items-center justify-between border-b border-p2-line px-5 py-4">
              <div>
                <CardTitle>Watch list</CardTitle>
                <CardSubtitle>Pair these candidates with concierge support</CardSubtitle>
              </div>
              <Badge tone="warn" dot>
                Needs care
              </Badge>
            </div>
            <ul>
              {watch.map((w, i) => (
                <WorkerLine
                  key={w.id}
                  rank={i + 1}
                  name={w.name}
                  meta={`${w.nationality} · ${w.reliability.placements} prior · ${w.preferredIndustries[0]}`}
                  score={w.reliability.value}
                  tone="warn"
                />
              ))}
            </ul>
          </Card>
        </div>

        <p className="mt-8 text-center font-p2-mono text-[11px] text-p2-ink-3">
          Computed across {placements.length} placements and {workers.length}{" "}
          worker profiles · refreshed daily
        </p>
      </div>
    </>
  );
}

const WorkerLine: React.FC<{
  rank: number;
  name: string;
  meta: string;
  score: number;
  tone: "success" | "warn";
}> = ({ rank, name, meta, score, tone }) => (
  <li className="flex items-center gap-3 border-b border-p2-line px-5 py-3 last:border-b-0">
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-p2-slate-tint font-p2-mono text-xs font-semibold text-p2-ink-2">
      {rank}
    </span>
    <div className="min-w-0 flex-1">
      <div className="truncate text-sm font-medium text-p2-ink">{name}</div>
      <div className="truncate text-xs text-p2-ink-2">{meta}</div>
    </div>
    <span
      className={
        "p2-display text-xl font-medium " +
        (tone === "success" ? "text-p2-success" : "text-p2-warn")
      }
    >
      {score}
    </span>
  </li>
);
