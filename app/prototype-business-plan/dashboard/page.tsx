import Link from "next/link";
import {
  Briefcase,
  AlertTriangle,
  CalendarClock,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Plus,
  Activity as ActivityIcon,
  Megaphone,
} from "lucide-react";
import { Topbar } from "@/components/p2/layout/topbar";
import { StatCard } from "@/components/p2/brand/stat-card";
import { Button } from "@/components/p2/ui/button";
import { Badge } from "@/components/p2/ui/badge";
import { Avatar } from "@/components/p2/ui/avatar";
import { Card, CardHeader, CardTitle, CardSubtitle } from "@/components/p2/ui/card";
import { FunnelChart } from "@/components/p2/pipeline/funnel-chart";
import { RiskAlert } from "@/components/p2/pipeline/risk-alert";
import {
  alerts,
  activity,
  getDashboardKpis,
  getStageDistribution,
  jobs,
  jobById,
  employerById,
  placements,
  workerById,
} from "@/lib/mock";

const BASE = "/prototype-business-plan/dashboard";

export default function OverviewPage() {
  const k = getDashboardKpis();
  const distribution = getStageDistribution();

  // Pull next 3 jobs starting soon to drive the "starting soon" panel.
  const upcoming = jobs
    .slice()
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 4);

  const danger = alerts.find((a) => a.severity === "danger");

  return (
    <>
      <Topbar
        breadcrumbs={[{ label: "Riverina Citrus" }, { label: "Overview" }]}
        contextual={
          <Link href={`${BASE}/jobs/new`}>
            <Button size="sm" leadingIcon={<Plus className="h-3.5 w-3.5" strokeWidth={2} />}>
              Post a job
            </Button>
          </Link>
        }
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 py-8">
        {/* Headline */}
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <div className="font-p2-mono text-[11px] uppercase tracking-widest text-p2-ink-3">
              Monday · 25 May 2026
            </div>
            <h1 className="mt-1 p2-display text-3xl font-medium tracking-p2-tight text-p2-ink md:text-4xl">
              Good morning, Sarah.
            </h1>
            <p className="mt-1.5 text-sm text-p2-ink-2">
              You have{" "}
              <span className="font-medium text-p2-ink">{k.activePlacements}</span>{" "}
              live placements across{" "}
              <span className="font-medium text-p2-ink">{k.openJobs}</span> open
              jobs.{" "}
              <span className="font-medium text-p2-danger">
                {k.criticalAlerts} critical
              </span>{" "}
              need attention.
            </p>
          </div>
        </div>

        {/* Critical alert */}
        {danger && (
          <RiskAlert
            severity="danger"
            title="Sasha Volkov has not responded — Tully Sugar Co. starts in 14 days"
            body={
              <span>
                3 SMS reconfirmation attempts since Saturday, 0 reply. Backup
                queue is loaded; promote a candidate before Wednesday EOD to
                hold headcount at 12.
              </span>
            }
            cta={{
              label: "Open the pipeline",
            }}
            className="mb-6"
          />
        )}

        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Active placements"
            value={k.activePlacements}
            hint="across 12 open jobs"
            delta={{ value: "+6", positive: true, period: "this week" }}
            icon={<Briefcase className="h-4 w-4" strokeWidth={1.5} />}
            spark={[4, 6, 7, 6, 9, 11, 12]}
          />
          <StatCard
            label="On-time start rate"
            value={`${Math.round(k.onTimeStartRate * 100)}%`}
            hint="last 30 days"
            delta={{ value: "+2.4pp", positive: true, period: "vs last 30d" }}
            tone="success"
            icon={<ShieldCheck className="h-4 w-4" strokeWidth={1.5} />}
            spark={[88, 90, 92, 94, 93, 95, 96]}
          />
          <StatCard
            label="Avg time to fill"
            value={`${k.avgTimeToFillDays}d`}
            hint="from job post to signed"
            delta={{ value: "−1.3d", positive: true, period: "vs last 30d" }}
            icon={<CalendarClock className="h-4 w-4" strokeWidth={1.5} />}
            spark={[14, 13, 12, 11, 10, 10, 9]}
          />
          <StatCard
            label="Critical alerts"
            value={k.criticalAlerts}
            hint="needs action today"
            tone="danger"
            icon={<AlertTriangle className="h-4 w-4" strokeWidth={1.5} />}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Pipeline funnel */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div>
                <CardTitle>Pipeline by stage</CardTitle>
                <CardSubtitle>All active placements across your jobs</CardSubtitle>
              </div>
              <Badge tone="brand" outline>
                {placements.length} total
              </Badge>
            </CardHeader>
            <FunnelChart counts={distribution} />
          </Card>

          {/* Reliability */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Worker pool reliability</CardTitle>
                <CardSubtitle>Weighted across your 25 candidates</CardSubtitle>
              </div>
              <TrendingUp className="h-4 w-4 text-p2-success" strokeWidth={1.5} />
            </CardHeader>
            <div className="flex items-baseline gap-2">
              <span className="p2-display text-5xl font-medium tracking-p2-tighter text-p2-ink">
                {k.avgReliabilityScore}
              </span>
              <span className="text-sm text-p2-ink-2">/ 100</span>
            </div>
            <div className="mt-4 space-y-3 text-xs text-p2-ink-2">
              <RowMetric label="On-time start" value="96%" />
              <RowMetric label="Stayed 7 days" value="93%" />
              <RowMetric label="Reconfirm responsiveness" value="67%" />
            </div>
          </Card>
        </div>

        {/* Two-column: jobs starting soon + activity */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card padded={false}>
            <div className="flex items-center justify-between p-5 pb-3">
              <div>
                <CardTitle>Jobs starting in the next 30 days</CardTitle>
                <CardSubtitle>
                  Sorted by start date · placements vs. headcount required
                </CardSubtitle>
              </div>
              <Link href={`${BASE}/jobs`}>
                <Button
                  size="sm"
                  variant="ghost"
                  trailingIcon={<ArrowRight className="h-3 w-3" strokeWidth={2} />}
                >
                  All jobs
                </Button>
              </Link>
            </div>
            <table className="w-full text-sm">
              <thead className="border-y border-p2-line bg-p2-surface-2/60 text-left font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
                <tr>
                  <th className="px-5 py-2.5">Job</th>
                  <th className="px-5 py-2.5">Employer</th>
                  <th className="px-5 py-2.5">Starts</th>
                  <th className="px-5 py-2.5">Filled</th>
                  <th className="px-5 py-2.5">Risk</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((j) => {
                  const employer = employerById[j.employerId];
                  const ps = placements.filter((p) => p.jobId === j.id);
                  const filled = ps.filter((p) =>
                    [
                      "accepted",
                      "signed",
                      "check_7d",
                      "check_48h",
                      "started",
                      "stayed",
                    ].includes(p.stage),
                  ).length;
                  const risky = ps.some((p) => p.risk === "red");
                  const amber = ps.some((p) => p.risk === "amber");
                  const days = Math.ceil(
                    (new Date(j.startDate).getTime() -
                      new Date("2026-05-25").getTime()) /
                      86400000,
                  );
                  return (
                    <tr
                      key={j.id}
                      className="border-b border-p2-line last:border-b-0"
                    >
                      <td className="px-5 py-3 align-middle">
                        <Link
                          href={`${BASE}/jobs/${j.id}`}
                          className="font-medium text-p2-ink hover:underline"
                        >
                          {j.role}
                        </Link>
                        <div className="text-xs text-p2-ink-2">
                          {j.location.town}, {j.location.state}
                        </div>
                      </td>
                      <td className="px-5 py-3 align-middle text-p2-ink-2">
                        {employer?.name}
                      </td>
                      <td className="px-5 py-3 align-middle">
                        <span className="font-p2-mono text-xs text-p2-ink">
                          T-{days}d
                        </span>
                      </td>
                      <td className="px-5 py-3 align-middle">
                        <div className="flex items-center gap-2">
                          <span className="font-p2-mono text-xs text-p2-ink">
                            {filled}/{j.headcount}
                          </span>
                          <span className="h-1.5 w-20 overflow-hidden rounded-full bg-p2-slate-tint">
                            <span
                              className="block h-full bg-p2-brand"
                              style={{
                                width: `${(filled / j.headcount) * 100}%`,
                              }}
                            />
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 align-middle">
                        {risky ? (
                          <Badge tone="danger" dot>
                            Critical
                          </Badge>
                        ) : amber ? (
                          <Badge tone="warn" dot>
                            At risk
                          </Badge>
                        ) : (
                          <Badge tone="success" dot>
                            On track
                          </Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          {/* Activity feed */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Reconfirmation activity</CardTitle>
                <CardSubtitle>Live signals from across your pipeline</CardSubtitle>
              </div>
              <ActivityIcon className="h-4 w-4 text-p2-ink-3" strokeWidth={1.5} />
            </CardHeader>
            <ol className="relative space-y-3.5">
              <span className="absolute bottom-1 left-[13px] top-1 w-px bg-p2-line" />
              {activity.slice(0, 7).map((a) => {
                const w = a.placementId
                  ? workerById[
                      placements.find((p) => p.id === a.placementId)?.workerId ?? ""
                    ]
                  : null;
                return (
                  <li key={a.id} className="relative flex gap-3 pl-0.5">
                    <span
                      className={
                        "z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-semibold uppercase " +
                        (a.actor === "system"
                          ? "bg-p2-brand text-white"
                          : a.actor === "worker"
                          ? "bg-p2-success-soft text-p2-success"
                          : a.actor === "employer"
                          ? "bg-p2-info-soft text-p2-info"
                          : "bg-p2-slate-tint text-p2-ink-2")
                      }
                    >
                      {a.actor[0]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-p2-ink">
                        <span className="font-medium capitalize">{a.actor}</span>{" "}
                        <span className="text-p2-ink-2">{a.verb}</span>{" "}
                        <span className="font-medium">{a.target}</span>
                      </div>
                      <div className="mt-0.5 text-[11px] text-p2-ink-3">
                        {new Date(a.at).toLocaleString("en-AU", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {w && <> · {w.name}</>}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Card>
        </div>

        {/* Concierge prompt — gentle pitch for the trial */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-p2-xl bg-gradient-to-br from-p2-cream to-p2-paper p-6 ring-1 ring-p2-line md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-p2-md bg-p2-brand text-white">
              <Megaphone className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div>
              <div className="font-semibold text-p2-ink">
                Pilot status — you have 1 unlock remaining
              </div>
              <p className="mt-1 max-w-2xl text-sm text-p2-ink-2">
                Your trial includes 1 free hire and 1 free backup. Use them in
                the same job to see the full commitment-verification flow in
                action, then upgrade to Tier 1 to keep unlocking.
              </p>
            </div>
          </div>
          <Link href="/prototype-business-plan/pricing">
            <Button
              variant="secondary"
              trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
            >
              See pricing
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

const RowMetric: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between gap-3">
    <span>{label}</span>
    <span className="font-semibold text-p2-ink">{value}</span>
  </div>
);

