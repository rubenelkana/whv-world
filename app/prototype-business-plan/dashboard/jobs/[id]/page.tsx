import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Calendar,
  Users as UsersIcon,
  Banknote,
  Bed,
  ShieldCheck,
  Repeat,
  Megaphone,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  Activity as ActivityIcon,
  Filter,
} from "lucide-react";
import { Topbar } from "@/components/p2/layout/topbar";
import { Button } from "@/components/p2/ui/button";
import { Badge } from "@/components/p2/ui/badge";
import { Avatar } from "@/components/p2/ui/avatar";
import { Card, CardTitle, CardSubtitle } from "@/components/p2/ui/card";
import { CandidateCard } from "@/components/p2/pipeline/candidate-card";
import { CommitmentTimeline } from "@/components/p2/pipeline/commitment-timeline";
import { BackupQueue } from "@/components/p2/pipeline/backup-queue";
import { RiskAlert } from "@/components/p2/pipeline/risk-alert";
import {
  jobById,
  employerById,
  placementsByJob,
  workerById,
  jobs,
  STAGE_ORDER,
  STAGE_LABEL,
  INDUSTRY_LABEL,
  type Stage,
} from "@/lib/mock";

const BASE = "/prototype-business-plan/dashboard";
const TODAY = new Date("2026-05-25");

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export default function JobPipelinePage({ params }: { params: { id: string } }) {
  const job = jobById[params.id];
  if (!job) notFound();
  const employer = employerById[job.employerId];
  const ps = placementsByJob[job.id] ?? [];

  const daysToStart = Math.ceil(
    (new Date(job.startDate).getTime() - TODAY.getTime()) / 86400000,
  );

  // Split into pipeline (committed-track) and backups (sourced)
  const inPipeline = ps.filter((p) => p.stage !== "sourced");
  const backups = ps.filter((p) => p.stage === "sourced");

  const filled = ps.filter((p) =>
    ["accepted", "signed", "check_7d", "check_48h", "started", "stayed"].includes(
      p.stage,
    ),
  ).length;

  const riskAggr = ps.some((p) => p.risk === "red")
    ? "danger"
    : ps.some((p) => p.risk === "amber")
    ? "warn"
    : "success";

  // Group by stage for the kanban.
  const byStage: Record<Stage, typeof ps> = Object.fromEntries(
    STAGE_ORDER.map((s) => [s, [] as typeof ps]),
  ) as Record<Stage, typeof ps>;
  for (const p of inPipeline) byStage[p.stage].push(p);

  // Pull the spotlight (failed-check) candidate to show timeline detail.
  const spotlight = ps.find((p) => p.risk === "red") ?? ps.find((p) => p.risk === "amber") ?? ps[0];
  const spotlightWorker = spotlight ? workerById[spotlight.workerId] : null;

  return (
    <>
      <Topbar
        breadcrumbs={[
          { label: "Riverina Citrus" },
          { label: "Jobs", href: `${BASE}/jobs` },
          { label: job.role },
        ]}
        contextual={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              leadingIcon={<Repeat className="h-3.5 w-3.5" strokeWidth={1.75} />}
            >
              Trigger reconfirm
            </Button>
            <Button
              size="sm"
              leadingIcon={<Megaphone className="h-3.5 w-3.5" strokeWidth={1.75} />}
            >
              Promote a backup
            </Button>
          </div>
        }
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 py-6">
        {/* Job header */}
        <div className="mb-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge tone="brand" outline>
                  {INDUSTRY_LABEL[job.industry]}
                </Badge>
                <Badge tone={riskAggr === "success" ? "success" : riskAggr === "warn" ? "warn" : "danger"} dot>
                  {riskAggr === "success"
                    ? "On track"
                    : riskAggr === "warn"
                    ? "At risk"
                    : "1 critical"}
                </Badge>
              </div>
              <h1 className="mt-2 p2-display text-3xl font-medium tracking-p2-tight text-p2-ink md:text-4xl">
                {job.role}
              </h1>
              <p className="mt-1.5 text-sm text-p2-ink-2">
                {employer?.name} ·{" "}
                <span className="text-p2-ink">{job.location.town}, {job.location.state}</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Meta
                icon={<Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />}
                label="Starts in"
                value={`${daysToStart} days`}
                accent
              />
              <Meta
                icon={<UsersIcon className="h-3.5 w-3.5" strokeWidth={1.5} />}
                label="Filled"
                value={`${filled}/${job.headcount}`}
              />
              <Meta
                icon={<Banknote className="h-3.5 w-3.5" strokeWidth={1.5} />}
                label="Pay"
                value={`$${job.payRate.amount}/${job.payRate.unit}`}
              />
              <Meta
                icon={<Bed className="h-3.5 w-3.5" strokeWidth={1.5} />}
                label="Accom."
                value={job.accommodationProvided ? "Provided" : "Worker-arr."}
              />
            </div>
          </div>
        </div>

        {/* Top-level stage tracker */}
        <Card padded={false} className="mb-6 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-p2-line bg-p2-surface-2/60 px-5 py-3">
            <div className="font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
              Pipeline progress
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 text-p2-ink-2">
                <span className="h-1.5 w-1.5 rounded-full bg-p2-success" /> Confirmed
              </span>
              <span className="inline-flex items-center gap-1.5 text-p2-ink-2">
                <span className="h-1.5 w-1.5 rounded-full bg-p2-warn" /> Pending
              </span>
              <span className="inline-flex items-center gap-1.5 text-p2-ink-2">
                <span className="h-1.5 w-1.5 rounded-full bg-p2-danger" /> Action required
              </span>
            </div>
          </div>
          <ol className="grid grid-cols-8 gap-0 px-5 py-5">
            {STAGE_ORDER.map((s, i) => {
              const count = byStage[s].length;
              const isBackup = s === "sourced";
              const total = inPipeline.length;
              const pct = total ? (count / total) * 100 : 0;
              return (
                <li
                  key={s}
                  className="flex items-center gap-3 border-r border-dashed border-p2-line/70 px-3 last:border-r-0 last:pr-0 first:pl-0"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-p2-md bg-p2-ink/[0.04] font-p2-mono text-xs font-semibold text-p2-ink">
                    {count}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-p2-mono uppercase tracking-widest text-p2-ink-3">
                      Stage {i + 1}
                    </div>
                    <div className="truncate text-xs font-medium text-p2-ink">
                      {STAGE_LABEL[s]}
                    </div>
                    {!isBackup && (
                      <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-p2-slate-tint">
                        <div
                          className="h-full bg-p2-brand"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>

        {/* Critical alert if any */}
        {ps.some((p) => p.risk === "red") && spotlight && spotlightWorker && (
          <RiskAlert
            severity="danger"
            title={`${spotlightWorker.name} has not responded to the 7-day reconfirmation`}
            body={
              <>
                3 SMS attempts since Saturday · No reply.{" "}
                <span className="font-medium text-p2-ink">
                  Promote a backup within 48h
                </span>{" "}
                to hold headcount.
              </>
            }
            cta={{ label: "Promote Hannah Schmidt" }}
            className="mb-6"
          />
        )}

        {/* Main two-column: Kanban + right rail */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* KANBAN */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-p2-ink-2">
                  Commitment pipeline
                </h2>
                <span className="text-xs text-p2-ink-3">
                  {inPipeline.length} active · {backups.length} backups in queue
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                leadingIcon={<Filter className="h-3.5 w-3.5" strokeWidth={1.5} />}
              >
                Filter
              </Button>
            </div>

            <div className="p2-scroll flex gap-3 overflow-x-auto pb-3">
              {STAGE_ORDER.filter((s) => s !== "sourced").map((s) => {
                const col = byStage[s];
                return (
                  <div
                    key={s}
                    className="flex w-64 shrink-0 flex-col rounded-p2-lg border border-p2-line bg-p2-surface-2/60 p-3"
                  >
                    <div className="mb-2.5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-p2-ink">
                          {STAGE_LABEL[s]}
                        </div>
                        <div className="font-p2-mono text-[10px] text-p2-ink-3">
                          {col.length} candidate{col.length === 1 ? "" : "s"}
                        </div>
                      </div>
                      {col.some((p) => p.risk === "red") && (
                        <span className="h-2 w-2 animate-p2-pulse-ring rounded-full bg-p2-danger" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2.5">
                      {col.length === 0 ? (
                        <div className="rounded-p2-md border border-dashed border-p2-line bg-white p-4 text-center text-[11px] text-p2-ink-3">
                          No candidates here yet.
                        </div>
                      ) : (
                        col.map((p) => {
                          const w = workerById[p.workerId];
                          return (
                            <CandidateCard
                              key={p.id}
                              placement={p}
                              worker={w}
                              daysToStart={Math.ceil(
                                (new Date(p.agreedStartDate).getTime() -
                                  TODAY.getTime()) /
                                  86400000,
                              )}
                              detailHref={`${BASE}/candidates/${w.id}`}
                            />
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Spotlight: commitment timeline for selected candidate */}
            {spotlight && spotlightWorker && (
              <div className="mt-6 grid grid-cols-1 gap-4 rounded-p2-xl border border-p2-line bg-white p-5 shadow-p2-sm md:grid-cols-[1fr_1.4fr]">
                <div>
                  <div className="font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
                    Selected candidate
                  </div>
                  <div className="mt-2 flex items-start gap-3">
                    <Avatar
                      name={spotlightWorker.name}
                      seed={spotlightWorker.photoSeed}
                      nationality={spotlightWorker.nationality}
                      size={52}
                    />
                    <div>
                      <Link
                        href={`${BASE}/candidates/${spotlightWorker.id}`}
                        className="block text-base font-semibold text-p2-ink hover:underline"
                      >
                        {spotlightWorker.name}
                      </Link>
                      <div className="text-xs text-p2-ink-2">
                        {spotlightWorker.visa} ·{" "}
                        {spotlightWorker.currentLocation?.city ?? "Arriving"} ·{" "}
                        Reliability {spotlightWorker.reliability.value}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-1">
                        {spotlightWorker.verifications.visa && (
                          <Badge tone="success" size="sm">
                            Visa ✓
                          </Badge>
                        )}
                        {spotlightWorker.verifications.workRight && (
                          <Badge tone="success" size="sm">
                            Work-right ✓
                          </Badge>
                        )}
                        {!spotlightWorker.verifications.identity && (
                          <Badge tone="warn" size="sm">
                            ID pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {spotlight.notes && (
                    <p className="mt-4 rounded-p2-md bg-p2-slate-tint p-3 text-xs text-p2-ink-2">
                      <span className="font-medium text-p2-ink">Note · </span>
                      {spotlight.notes}
                    </p>
                  )}

                  <div className="mt-4 flex gap-2">
                    <Link href={`${BASE}/candidates/${spotlightWorker.id}`}>
                      <Button
                        size="sm"
                        variant="secondary"
                        trailingIcon={
                          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
                        }
                      >
                        Open profile
                      </Button>
                    </Link>
                    <Button size="sm" variant="ghost">
                      Message worker
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
                    Commitment timeline
                  </div>
                  <div className="mt-3">
                    <CommitmentTimeline
                      checks={spotlight.checks}
                      startDate={spotlight.agreedStartDate}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT RAIL */}
          <aside className="space-y-4">
            {/* Headcount sleeve */}
            <Card>
              <CardTitle>Headcount status</CardTitle>
              <CardSubtitle>vs. {job.headcount} requested</CardSubtitle>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="p2-display text-4xl font-medium text-p2-ink">
                  {filled}
                </span>
                <span className="text-p2-ink-2">/ {job.headcount}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-p2-md bg-p2-success-soft p-2">
                  <div className="font-semibold text-p2-success">
                    {byStage.check_48h.length + byStage.check_7d.length + byStage.signed.length}
                  </div>
                  <div className="mt-0.5 text-[10px] text-p2-ink-2">Committed track</div>
                </div>
                <div className="rounded-p2-md bg-p2-warn-soft p-2">
                  <div className="font-semibold text-p2-warn">
                    {ps.filter((p) => p.risk === "amber" || p.risk === "red").length}
                  </div>
                  <div className="mt-0.5 text-[10px] text-p2-ink-2">At risk</div>
                </div>
                <div className="rounded-p2-md bg-p2-slate-tint p-2">
                  <div className="font-semibold text-p2-ink">{backups.length}</div>
                  <div className="mt-0.5 text-[10px] text-p2-ink-2">Backups ready</div>
                </div>
              </div>
            </Card>

            {/* Backup queue */}
            <Card>
              <BackupQueue
                backups={backups.map((b) => ({
                  placement: b,
                  worker: workerById[b.workerId],
                }))}
              />
            </Card>

            {/* Recon schedule */}
            <Card>
              <CardTitle>Reconfirmation cadence</CardTitle>
              <CardSubtitle>Scheduled around {new Date(job.startDate).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}</CardSubtitle>
              <ul className="mt-4 space-y-2.5 text-xs">
                <CadenceItem icon={<Repeat className="h-3 w-3" strokeWidth={1.5} />} label="7-day SMS" value="Mon 1 Jun · 9:00 ACST" />
                <CadenceItem icon={<Repeat className="h-3 w-3" strokeWidth={1.5} />} label="48-hour SMS" value="Sat 6 Jun · 9:00 ACST" />
                <CadenceItem icon={<ShieldCheck className="h-3 w-3" strokeWidth={1.5} />} label="Arrival ping" value="Mon 8 Jun · 6:30 ACST" />
                <CadenceItem icon={<ActivityIcon className="h-3 w-3" strokeWidth={1.5} />} label="Day-7 retention" value="Mon 15 Jun · 17:00 ACST" />
              </ul>
            </Card>

            {/* Tip */}
            <div className="rounded-p2-md border border-dashed border-p2-brand/40 bg-p2-brand/5 p-3 text-xs text-p2-ink-2">
              <div className="mb-1 flex items-center gap-1.5 font-semibold text-p2-brand">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                Concierge tip
              </div>
              When a 7-day check fails twice, message the worker on their primary
              channel before triggering a third SMS — restores response rates by ~38%.
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

const Meta: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}> = ({ icon, label, value, accent }) => (
  <div
    className={
      "rounded-p2-md border bg-white px-3 py-2 " +
      (accent ? "border-p2-brand/30 bg-p2-brand/5" : "border-p2-line")
    }
  >
    <div className="flex items-center gap-1 font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
      {icon} {label}
    </div>
    <div className={"mt-1 text-sm font-semibold " + (accent ? "text-p2-brand" : "text-p2-ink")}>
      {value}
    </div>
  </div>
);

const CadenceItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <li className="flex items-start gap-2">
    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-p2-xs bg-p2-slate-tint text-p2-ink-2">
      {icon}
    </span>
    <span className="flex flex-1 items-baseline justify-between gap-2">
      <span className="text-p2-ink">{label}</span>
      <span className="font-p2-mono text-[10px] text-p2-ink-3">{value}</span>
    </span>
  </li>
);
