export * from "./types";
export { workers, workerById } from "./workers";
export { employers, employerById } from "./employers";
export { jobs, jobById } from "./jobs";
export {
  placements,
  placementsByJob,
  placementById,
  alerts,
  activity,
} from "./placements";

import { workers } from "./workers";
import { jobs } from "./jobs";
import { placements, alerts } from "./placements";

// Top-line KPIs for the dashboard overview.
export function getDashboardKpis() {
  const activePlacements = placements.filter(
    (p) => !["stayed"].includes(p.stage),
  ).length;

  const stayed = placements.filter((p) => p.stage === "stayed").length;
  const failedReached = placements.filter((p) =>
    p.checks.some((c) => c.status === "failed"),
  ).length;
  const totalReached = placements.filter((p) =>
    ["check_7d", "check_48h", "started", "stayed"].includes(p.stage),
  ).length;

  const noShowRate = totalReached ? failedReached / totalReached : 0;
  const onTimeStartRate = 1 - noShowRate;

  return {
    activePlacements,
    workersInDb: workers.length,
    openJobs: jobs.filter((j) => j.status === "open").length,
    noShowRate,
    onTimeStartRate,
    avgTimeToFillDays: 9,
    avgReliabilityScore: Math.round(
      workers.reduce((s, w) => s + w.reliability.value, 0) / workers.length,
    ),
    criticalAlerts: alerts.filter((a) => a.severity === "danger").length,
    stayedTotal: stayed,
  };
}

// Stage distribution across the whole pipeline.
export function getStageDistribution() {
  const counts: Record<string, number> = {};
  for (const p of placements) {
    counts[p.stage] = (counts[p.stage] ?? 0) + 1;
  }
  return counts;
}
