import Link from "next/link";
import { Plus, Search, Filter, ArrowRight, MapPin, Calendar, Users as UsersIcon } from "lucide-react";
import { Topbar } from "@/components/p2/layout/topbar";
import { Button } from "@/components/p2/ui/button";
import { Input } from "@/components/p2/ui/input";
import { Badge } from "@/components/p2/ui/badge";
import {
  jobs,
  employerById,
  placements,
  STAGE_ORDER,
  STAGE_LABEL,
  INDUSTRY_LABEL,
} from "@/lib/mock";

const BASE = "/prototype-business-plan/dashboard";

export default function JobsListPage() {
  return (
    <>
      <Topbar
        breadcrumbs={[{ label: "Riverina Citrus" }, { label: "Jobs" }]}
        contextual={
          <Link href={`${BASE}/jobs/new`}>
            <Button size="sm" leadingIcon={<Plus className="h-3.5 w-3.5" strokeWidth={2} />}>
              Post a job
            </Button>
          </Link>
        }
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="p2-display text-3xl font-medium tracking-p2-tight text-p2-ink">
              Jobs
            </h1>
            <p className="mt-1.5 text-sm text-p2-ink-2">
              {jobs.length} open jobs · {placements.length} candidates in motion
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search role, employer, location"
              leading={<Search className="h-4 w-4" strokeWidth={1.5} />}
              className="w-64"
            />
            <Button
              size="md"
              variant="secondary"
              leadingIcon={<Filter className="h-4 w-4" strokeWidth={1.5} />}
            >
              Filter
            </Button>
          </div>
        </div>

        {/* Quick filter chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["All open", "Starting this week", "At risk", "Filled", "By industry"].map(
            (chip, i) => (
              <button
                key={chip}
                className={
                  "rounded-p2-md border px-3 py-1.5 text-xs font-medium transition-colors " +
                  (i === 0
                    ? "border-p2-ink bg-p2-ink text-white"
                    : "border-p2-line bg-white text-p2-ink-2 hover:border-p2-ink-4")
                }
              >
                {chip}
              </button>
            ),
          )}
        </div>

        <div className="overflow-hidden rounded-p2-xl border border-p2-line bg-white shadow-p2-sm">
          <table className="w-full text-sm">
            <thead className="border-b border-p2-line bg-p2-surface-2 text-left font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
              <tr>
                <th className="px-5 py-3">Role · Employer</th>
                <th className="px-5 py-3">Where & when</th>
                <th className="px-5 py-3">Pipeline</th>
                <th className="px-5 py-3 text-right">Headcount</th>
                <th className="px-5 py-3 text-right">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => {
                const employer = employerById[j.employerId];
                const ps = placements.filter((p) => p.jobId === j.id);
                const filled = ps.filter((p) =>
                  ["accepted", "signed", "check_7d", "check_48h", "started", "stayed"].includes(p.stage),
                ).length;
                const risk: "danger" | "warn" | "success" = ps.some((p) => p.risk === "red")
                  ? "danger"
                  : ps.some((p) => p.risk === "amber")
                  ? "warn"
                  : "success";
                const stageCounts: Record<string, number> = {};
                for (const p of ps) {
                  stageCounts[p.stage] = (stageCounts[p.stage] ?? 0) + 1;
                }
                const days = Math.ceil(
                  (new Date(j.startDate).getTime() - new Date("2026-05-25").getTime()) / 86400000,
                );

                return (
                  <tr
                    key={j.id}
                    className="border-b border-p2-line last:border-b-0 hover:bg-p2-surface-2/40"
                  >
                    <td className="px-5 py-4 align-top">
                      <Link
                        href={`${BASE}/jobs/${j.id}`}
                        className="block font-semibold text-p2-ink hover:underline"
                      >
                        {j.role}
                      </Link>
                      <div className="mt-0.5 text-xs text-p2-ink-2">
                        {employer?.name} · {INDUSTRY_LABEL[j.industry]}
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top text-xs text-p2-ink-2">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-p2-ink-3" strokeWidth={1.5} />
                        {j.location.town}, {j.location.state}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-p2-ink-3" strokeWidth={1.5} />
                        <span className="font-p2-mono text-[11px] text-p2-ink">
                          {new Date(j.startDate).toLocaleDateString("en-AU", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                        <span className="text-p2-ink-3">· T-{days}d</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <PipelineBar counts={stageCounts} />
                    </td>
                    <td className="px-5 py-4 text-right align-middle">
                      <div className="inline-flex items-center gap-2 font-p2-mono text-xs">
                        <UsersIcon className="h-3 w-3 text-p2-ink-3" strokeWidth={1.5} />
                        <span className="font-semibold text-p2-ink">
                          {filled}/{j.headcount}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right align-middle">
                      <Badge tone={risk} dot>
                        {risk === "danger"
                          ? "Critical"
                          : risk === "warn"
                          ? "At risk"
                          : "On track"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right align-middle">
                      <Link
                        href={`${BASE}/jobs/${j.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-p2-brand hover:underline"
                      >
                        Open <ArrowRight className="h-3 w-3" strokeWidth={2} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const stageColours: Record<string, string> = {
  sourced: "bg-p2-ink-4",
  offer: "bg-p2-info",
  accepted: "bg-p2-brand-2",
  signed: "bg-p2-brand",
  check_7d: "bg-p2-warn",
  check_48h: "bg-p2-warn",
  started: "bg-p2-success",
  stayed: "bg-emerald-800",
};

const PipelineBar: React.FC<{ counts: Record<string, number> }> = ({ counts }) => {
  const total = STAGE_ORDER.reduce((s, k) => s + (counts[k] ?? 0), 0) || 1;
  return (
    <div className="w-56">
      <div className="flex h-2 overflow-hidden rounded-full bg-p2-slate-tint">
        {STAGE_ORDER.map((s) => {
          const v = counts[s] ?? 0;
          if (v === 0) return null;
          return (
            <span
              key={s}
              className={stageColours[s] ?? "bg-p2-ink-3"}
              style={{ width: `${(v / total) * 100}%` }}
              title={`${STAGE_LABEL[s]}: ${v}`}
            />
          );
        })}
      </div>
      <div className="mt-1.5 flex items-center justify-between font-p2-mono text-[10px] text-p2-ink-3">
        <span>{total} in motion</span>
        <span>
          {(counts.started ?? 0) + (counts.stayed ?? 0)} active on site
        </span>
      </div>
    </div>
  );
};
