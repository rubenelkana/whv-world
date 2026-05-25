// Domain types for the WHV World prototype.
// Mocked, no backend — these mirror the platform concept in the business plan
// (Appendix C, page 24) but are intentionally lightweight for a click-through demo.

export type VisaSubclass = "417" | "462";

export type Industry =
  | "horticulture"
  | "agriculture"
  | "hospitality"
  | "tourism"
  | "construction";

export type AuState =
  | "NSW"
  | "VIC"
  | "QLD"
  | "WA"
  | "SA"
  | "TAS"
  | "NT"
  | "ACT";

export type Stage =
  | "sourced"
  | "offer"
  | "accepted"
  | "signed"
  | "check_7d"
  | "check_48h"
  | "started"
  | "stayed";

export type RiskLevel = "green" | "amber" | "red";

export type CheckType = "7d" | "48h" | "arrival" | "day7_retention";
export type CheckStatus = "pending" | "confirmed" | "failed" | "skipped";

export interface CheckEvent {
  id: string;
  type: CheckType;
  status: CheckStatus;
  scheduledAt: string; // ISO
  resolvedAt?: string; // ISO
  channel: "sms" | "email" | "in_app";
  note?: string;
}

export interface Verification {
  visa: boolean;
  identity: boolean;
  workRight: boolean;
  references: number; // count of references on file
  english: "basic" | "conversational" | "fluent";
}

export interface ReliabilityScore {
  value: number; // 0–100
  placements: number;
  breakdown: {
    onTimeStart: number; // 0–100
    stayed7d: number; // 0–100
    reconfirmResponsiveness: number; // 0–100
  };
}

export interface AvailabilityWindow {
  from: string; // YYYY-MM-DD
  to: string;
  notes?: string;
}

export interface Worker {
  id: string;
  name: string;
  nationality: string; // ISO 3166-1 alpha-2
  age: number;
  photoSeed: string; // used to deterministically render an avatar gradient
  visa: VisaSubclass;
  arrivalDate: string; // YYYY-MM-DD
  inAustralia: boolean;
  currentLocation: { city: string; state: AuState } | null;
  availability: AvailabilityWindow[];
  preferredIndustries: Industry[];
  preferredStates: AuState[];
  languages: string[];
  experience: { role: string; durationMonths: number; country: string }[];
  hasDriversLicence: boolean;
  hasCar: boolean;
  reliability: ReliabilityScore;
  verifications: Verification;
  bio: string;
}

export interface Employer {
  id: string;
  name: string;
  industry: Industry;
  size: "small" | "medium" | "large";
  location: { town: string; state: AuState; region: string };
  abn: string;
  blurb: string;
  joinedAt: string;
}

export interface JobRequirement {
  visa?: VisaSubclass[];
  minExperienceMonths?: number;
  requiresCar?: boolean;
  requiresLicence?: boolean;
  englishMin?: "basic" | "conversational" | "fluent";
  ppeProvided?: boolean;
}

export interface Job {
  id: string;
  employerId: string;
  role: string;
  industry: Industry;
  location: { town: string; state: AuState };
  startDate: string; // YYYY-MM-DD
  endDate: string;
  headcount: number;
  payRate: { amount: number; unit: "hour" | "piece" | "day" };
  accommodationProvided: boolean;
  postedAt: string;
  description: string;
  requirements: JobRequirement;
  status: "open" | "filled" | "closed";
}

export interface Placement {
  id: string;
  jobId: string;
  workerId: string;
  stage: Stage;
  risk: RiskLevel;
  agreedStartDate: string;
  checks: CheckEvent[];
  agencyOwner?: string; // user name
  notes?: string;
  lastUpdated: string;
}

export interface AlertItem {
  id: string;
  placementId: string;
  kind:
    | "failed_check"
    | "no_response_48h"
    | "visa_expiring"
    | "backup_promoted";
  severity: "info" | "warn" | "danger";
  at: string;
  summary: string;
}

export interface ActivityItem {
  id: string;
  at: string;
  actor: "system" | "worker" | "employer" | "agency";
  verb: string;
  target: string;
  placementId?: string;
}

// --- View helpers -----------------------------------------------------------

export const STAGE_ORDER: Stage[] = [
  "sourced",
  "offer",
  "accepted",
  "signed",
  "check_7d",
  "check_48h",
  "started",
  "stayed",
];

export const STAGE_LABEL: Record<Stage, string> = {
  sourced: "Sourced",
  offer: "Offer sent",
  accepted: "Accepted",
  signed: "Contract signed",
  check_7d: "7-day check",
  check_48h: "48-hour check",
  started: "Started",
  stayed: "Stayed 7 days",
};

export const RISK_LABEL: Record<RiskLevel, string> = {
  green: "On track",
  amber: "At risk",
  red: "Critical",
};

export const INDUSTRY_LABEL: Record<Industry, string> = {
  horticulture: "Horticulture",
  agriculture: "Agriculture",
  hospitality: "Hospitality",
  tourism: "Tourism",
  construction: "Construction",
};
