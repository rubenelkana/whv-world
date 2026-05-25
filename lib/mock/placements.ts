import type { Placement, ActivityItem, AlertItem, CheckEvent } from "./types";

// Placements span all stages so the pipeline page has real material to render.
// Stage distribution roughly mirrors a healthy mid-season agency funnel.

function checks(
  startDate: string,
  stage: Placement["stage"],
  outcomes: Partial<Record<CheckEvent["type"], CheckEvent["status"]>> = {},
): CheckEvent[] {
  // Build deterministic CheckEvents based on stage; outcomes overrides default statuses.
  const start = new Date(startDate);
  const dayBefore = (days: number) => {
    const d = new Date(start);
    d.setDate(d.getDate() - days);
    return d.toISOString();
  };
  const after = (days: number) => {
    const d = new Date(start);
    d.setDate(d.getDate() + days);
    return d.toISOString();
  };

  const stageReachedIndex = [
    "sourced",
    "offer",
    "accepted",
    "signed",
    "check_7d",
    "check_48h",
    "started",
    "stayed",
  ].indexOf(stage);

  const events: CheckEvent[] = [];

  if (stageReachedIndex >= 4) {
    events.push({
      id: `${startDate}-7d`,
      type: "7d",
      status: outcomes["7d"] ?? "confirmed",
      scheduledAt: dayBefore(7),
      resolvedAt: dayBefore(7),
      channel: "sms",
    });
  }
  if (stageReachedIndex >= 5) {
    events.push({
      id: `${startDate}-48h`,
      type: "48h",
      status: outcomes["48h"] ?? "confirmed",
      scheduledAt: dayBefore(2),
      resolvedAt: dayBefore(2),
      channel: "sms",
    });
  }
  if (stageReachedIndex >= 6) {
    events.push({
      id: `${startDate}-arrival`,
      type: "arrival",
      status: outcomes.arrival ?? "confirmed",
      scheduledAt: start.toISOString(),
      resolvedAt: start.toISOString(),
      channel: "in_app",
    });
  }
  if (stageReachedIndex >= 7) {
    events.push({
      id: `${startDate}-day7`,
      type: "day7_retention",
      status: outcomes.day7_retention ?? "confirmed",
      scheduledAt: after(7),
      resolvedAt: after(7),
      channel: "in_app",
    });
  }

  return events;
}

export const placements: Placement[] = [
  // --- Job j_001 (Mandarin pickers, Griffith, start 2026-06-08) — flagship for hero page ---
  {
    id: "p_001",
    jobId: "j_001",
    workerId: "w_001",
    stage: "check_7d",
    risk: "green",
    agreedStartDate: "2026-06-08",
    checks: checks("2026-06-08", "check_7d", { "7d": "confirmed" }),
    agencyOwner: "Sarah K.",
    lastUpdated: "2026-05-25T09:14:00Z",
  },
  {
    id: "p_002",
    jobId: "j_001",
    workerId: "w_011",
    stage: "check_48h",
    risk: "green",
    agreedStartDate: "2026-06-08",
    checks: checks("2026-06-08", "check_48h"),
    agencyOwner: "Sarah K.",
    lastUpdated: "2026-05-25T08:02:00Z",
  },
  {
    id: "p_003",
    jobId: "j_001",
    workerId: "w_014",
    stage: "check_7d",
    risk: "red",
    agreedStartDate: "2026-06-08",
    checks: checks("2026-06-08", "check_7d", { "7d": "failed" }),
    agencyOwner: "Sarah K.",
    notes: "No response to 7-day SMS (3 attempts). Identity verification expiring.",
    lastUpdated: "2026-05-25T11:42:00Z",
  },
  {
    id: "p_004",
    jobId: "j_001",
    workerId: "w_007",
    stage: "signed",
    risk: "amber",
    agreedStartDate: "2026-06-08",
    checks: [],
    agencyOwner: "Sarah K.",
    notes: "Flight lands 2 June — tight margin for any delays.",
    lastUpdated: "2026-05-24T15:30:00Z",
  },
  {
    id: "p_005",
    jobId: "j_001",
    workerId: "w_023",
    stage: "check_48h",
    risk: "green",
    agreedStartDate: "2026-06-08",
    checks: checks("2026-06-08", "check_48h"),
    agencyOwner: "Sarah K.",
    lastUpdated: "2026-05-25T07:10:00Z",
  },
  {
    id: "p_006",
    jobId: "j_001",
    workerId: "w_019",
    stage: "accepted",
    risk: "green",
    agreedStartDate: "2026-06-08",
    checks: [],
    agencyOwner: "Sarah K.",
    lastUpdated: "2026-05-23T14:50:00Z",
  },
  {
    id: "p_007",
    jobId: "j_001",
    workerId: "w_020",
    stage: "signed",
    risk: "green",
    agreedStartDate: "2026-06-08",
    checks: [],
    agencyOwner: "Sarah K.",
    lastUpdated: "2026-05-24T10:20:00Z",
  },
  {
    id: "p_008",
    jobId: "j_001",
    workerId: "w_010",
    stage: "offer",
    risk: "green",
    agreedStartDate: "2026-06-08",
    checks: [],
    agencyOwner: "Sarah K.",
    lastUpdated: "2026-05-22T18:00:00Z",
  },
  {
    id: "p_009",
    jobId: "j_001",
    workerId: "w_017",
    stage: "sourced",
    risk: "amber",
    agreedStartDate: "2026-06-08",
    checks: [],
    agencyOwner: "Sarah K.",
    notes: "Backup candidate — not yet contacted. Use if p_003 fails.",
    lastUpdated: "2026-05-25T09:14:00Z",
  },
  {
    id: "p_010",
    jobId: "j_001",
    workerId: "w_022",
    stage: "sourced",
    risk: "green",
    agreedStartDate: "2026-06-08",
    checks: [],
    agencyOwner: "Sarah K.",
    notes: "Backup — first WHV, accommodation-provided fits.",
    lastUpdated: "2026-05-25T09:14:00Z",
  },
  {
    id: "p_011",
    jobId: "j_001",
    workerId: "w_012",
    stage: "sourced",
    risk: "amber",
    agreedStartDate: "2026-06-08",
    checks: [],
    agencyOwner: "Sarah K.",
    notes: "Backup — identity verification still pending.",
    lastUpdated: "2026-05-25T09:14:00Z",
  },

  // --- Job j_002 (Table grape pruners, Mildura, start 2026-06-22) ---
  {
    id: "p_012",
    jobId: "j_002",
    workerId: "w_011",
    stage: "signed",
    risk: "green",
    agreedStartDate: "2026-06-22",
    checks: [],
    agencyOwner: "Daniel M.",
    lastUpdated: "2026-05-23T11:00:00Z",
  },
  {
    id: "p_013",
    jobId: "j_002",
    workerId: "w_020",
    stage: "accepted",
    risk: "green",
    agreedStartDate: "2026-06-22",
    checks: [],
    agencyOwner: "Daniel M.",
    lastUpdated: "2026-05-24T13:00:00Z",
  },
  {
    id: "p_014",
    jobId: "j_002",
    workerId: "w_019",
    stage: "offer",
    risk: "green",
    agreedStartDate: "2026-06-22",
    checks: [],
    agencyOwner: "Daniel M.",
    lastUpdated: "2026-05-24T16:00:00Z",
  },

  // --- Job j_003 (F&B Service, Port Douglas, start 2026-06-15) ---
  {
    id: "p_015",
    jobId: "j_003",
    workerId: "w_005",
    stage: "check_48h",
    risk: "green",
    agreedStartDate: "2026-06-15",
    checks: checks("2026-06-15", "check_48h"),
    agencyOwner: "Priya N.",
    lastUpdated: "2026-05-25T08:30:00Z",
  },
  {
    id: "p_016",
    jobId: "j_003",
    workerId: "w_003",
    stage: "signed",
    risk: "green",
    agreedStartDate: "2026-06-15",
    checks: [],
    agencyOwner: "Priya N.",
    lastUpdated: "2026-05-24T17:00:00Z",
  },
  {
    id: "p_017",
    jobId: "j_003",
    workerId: "w_021",
    stage: "accepted",
    risk: "green",
    agreedStartDate: "2026-06-15",
    checks: [],
    agencyOwner: "Priya N.",
    lastUpdated: "2026-05-25T10:00:00Z",
  },

  // --- Job j_004 (Cane harvest, Tully) ---
  {
    id: "p_018",
    jobId: "j_004",
    workerId: "w_008",
    stage: "signed",
    risk: "green",
    agreedStartDate: "2026-06-25",
    checks: [],
    agencyOwner: "Sarah K.",
    lastUpdated: "2026-05-22T09:00:00Z",
  },
  {
    id: "p_019",
    jobId: "j_004",
    workerId: "w_016",
    stage: "accepted",
    risk: "amber",
    agreedStartDate: "2026-06-25",
    checks: [],
    agencyOwner: "Sarah K.",
    notes: "Currently in WA, hesitant about NT relocation.",
    lastUpdated: "2026-05-24T14:00:00Z",
  },

  // --- Job j_005 (Cellar hands, Margaret River) ---
  {
    id: "p_020",
    jobId: "j_005",
    workerId: "w_009",
    stage: "signed",
    risk: "green",
    agreedStartDate: "2026-07-01",
    checks: [],
    agencyOwner: "Daniel M.",
    lastUpdated: "2026-05-24T11:00:00Z",
  },
  {
    id: "p_021",
    jobId: "j_005",
    workerId: "w_024",
    stage: "accepted",
    risk: "green",
    agreedStartDate: "2026-07-01",
    checks: [],
    agencyOwner: "Daniel M.",
    lastUpdated: "2026-05-25T09:00:00Z",
  },
  {
    id: "p_022",
    jobId: "j_005",
    workerId: "w_006",
    stage: "offer",
    risk: "green",
    agreedStartDate: "2026-07-01",
    checks: [],
    agencyOwner: "Daniel M.",
    lastUpdated: "2026-05-25T11:00:00Z",
  },

  // --- Job j_007 (Strawberry pickers — high volume) ---
  {
    id: "p_023",
    jobId: "j_007",
    workerId: "w_010",
    stage: "check_7d",
    risk: "green",
    agreedStartDate: "2026-06-05",
    checks: checks("2026-06-05", "check_7d"),
    agencyOwner: "Priya N.",
    lastUpdated: "2026-05-25T07:00:00Z",
  },
  {
    id: "p_024",
    jobId: "j_007",
    workerId: "w_018",
    stage: "check_7d",
    risk: "green",
    agreedStartDate: "2026-06-05",
    checks: checks("2026-06-05", "check_7d"),
    agencyOwner: "Priya N.",
    lastUpdated: "2026-05-25T07:00:00Z",
  },
  {
    id: "p_025",
    jobId: "j_007",
    workerId: "w_023",
    stage: "started",
    risk: "green",
    agreedStartDate: "2026-05-20",
    checks: checks("2026-05-20", "started"),
    agencyOwner: "Priya N.",
    lastUpdated: "2026-05-24T08:00:00Z",
  },
  {
    id: "p_026",
    jobId: "j_007",
    workerId: "w_014",
    stage: "started",
    risk: "amber",
    agreedStartDate: "2026-05-20",
    checks: checks("2026-05-20", "started", { arrival: "confirmed" }),
    agencyOwner: "Priya N.",
    notes: "Arrived 1 day late — flag for Day-7 retention check.",
    lastUpdated: "2026-05-24T08:00:00Z",
  },

  // --- Job j_008 (Stone fruit, Renmark) ---
  {
    id: "p_027",
    jobId: "j_008",
    workerId: "w_019",
    stage: "accepted",
    risk: "green",
    agreedStartDate: "2026-06-20",
    checks: [],
    agencyOwner: "Daniel M.",
    lastUpdated: "2026-05-24T15:00:00Z",
  },
  {
    id: "p_028",
    jobId: "j_008",
    workerId: "w_002",
    stage: "offer",
    risk: "green",
    agreedStartDate: "2026-06-20",
    checks: [],
    agencyOwner: "Daniel M.",
    lastUpdated: "2026-05-25T10:30:00Z",
  },

  // --- Historical (stayed) placements feeding reliability analytics ---
  {
    id: "p_029",
    jobId: "j_009",
    workerId: "w_003",
    stage: "stayed",
    risk: "green",
    agreedStartDate: "2026-04-10",
    checks: checks("2026-04-10", "stayed"),
    agencyOwner: "Priya N.",
    lastUpdated: "2026-04-18T09:00:00Z",
  },
  {
    id: "p_030",
    jobId: "j_009",
    workerId: "w_015",
    stage: "stayed",
    risk: "green",
    agreedStartDate: "2026-04-10",
    checks: checks("2026-04-10", "stayed"),
    agencyOwner: "Priya N.",
    lastUpdated: "2026-04-18T09:00:00Z",
  },
  {
    id: "p_031",
    jobId: "j_010",
    workerId: "w_011",
    stage: "stayed",
    risk: "green",
    agreedStartDate: "2026-03-15",
    checks: checks("2026-03-15", "stayed"),
    agencyOwner: "Sarah K.",
    lastUpdated: "2026-03-23T09:00:00Z",
  },
  {
    id: "p_032",
    jobId: "j_010",
    workerId: "w_004",
    stage: "stayed",
    risk: "green",
    agreedStartDate: "2026-03-15",
    checks: checks("2026-03-15", "stayed"),
    agencyOwner: "Sarah K.",
    lastUpdated: "2026-03-23T09:00:00Z",
  },
];

export const placementsByJob = placements.reduce<Record<string, Placement[]>>(
  (acc, p) => {
    (acc[p.jobId] ||= []).push(p);
    return acc;
  },
  {},
);

export const placementById = Object.fromEntries(
  placements.map((p) => [p.id, p]),
);

// --- Alerts derived from placements -----------------------------------------

export const alerts: AlertItem[] = [
  {
    id: "a_001",
    placementId: "p_003",
    kind: "no_response_48h",
    severity: "danger",
    at: "2026-05-25T11:42:00Z",
    summary:
      "Sasha Volkov has not responded to 7-day check (3 SMS attempts). Tully Sugar Co. starts in 14 days.",
  },
  {
    id: "a_002",
    placementId: "p_004",
    kind: "visa_expiring",
    severity: "warn",
    at: "2026-05-24T09:00:00Z",
    summary:
      "Ji-ho Park's flight lands 2 June — only 6-day margin before start. Confirm transport on arrival.",
  },
  {
    id: "a_003",
    placementId: "p_026",
    kind: "failed_check",
    severity: "warn",
    at: "2026-05-21T07:30:00Z",
    summary:
      "Sasha Volkov arrived 1 day late at Wamuran. Trigger Day-7 retention check early.",
  },
];

// --- Activity feed ----------------------------------------------------------

export const activity: ActivityItem[] = [
  {
    id: "act_001",
    at: "2026-05-25T11:42:00Z",
    actor: "system",
    verb: "flagged",
    target: "Sasha Volkov — no response to 7-day check",
    placementId: "p_003",
  },
  {
    id: "act_002",
    at: "2026-05-25T09:14:00Z",
    actor: "system",
    verb: "promoted backup candidate",
    target: "Hannah Schmidt → Riverina Citrus mandarins",
    placementId: "p_009",
  },
  {
    id: "act_003",
    at: "2026-05-25T08:30:00Z",
    actor: "worker",
    verb: "confirmed",
    target: "48-hour check — Aoi Tanaka, Cape Reef Lodge",
    placementId: "p_015",
  },
  {
    id: "act_004",
    at: "2026-05-25T08:02:00Z",
    actor: "worker",
    verb: "signed contract",
    target: "Liam Carter — Riverina Citrus",
    placementId: "p_002",
  },
  {
    id: "act_005",
    at: "2026-05-25T07:00:00Z",
    actor: "system",
    verb: "scheduled",
    target: "7-day SMS for 4 placements starting next week",
  },
  {
    id: "act_006",
    at: "2026-05-24T17:00:00Z",
    actor: "employer",
    verb: "approved",
    target: "Mia Bauer's offer at Cape Reef Lodge",
    placementId: "p_016",
  },
  {
    id: "act_007",
    at: "2026-05-24T15:30:00Z",
    actor: "agency",
    verb: "added note",
    target: "Ji-ho Park — tight arrival margin",
    placementId: "p_004",
  },
  {
    id: "act_008",
    at: "2026-05-24T11:00:00Z",
    actor: "system",
    verb: "confirmed",
    target: "Contract signed — Sofia Ricci, Margaret River",
    placementId: "p_020",
  },
];
