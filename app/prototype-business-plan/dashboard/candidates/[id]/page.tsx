import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  MapPin,
  Car,
  Mail,
  Phone,
  MessageSquare,
  Languages,
} from "lucide-react";
import { Topbar } from "@/components/p2/layout/topbar";
import { Button } from "@/components/p2/ui/button";
import { Badge } from "@/components/p2/ui/badge";
import { Avatar } from "@/components/p2/ui/avatar";
import { Card, CardTitle, CardSubtitle } from "@/components/p2/ui/card";
import { Divider } from "@/components/p2/ui/divider";
import { VerificationBadges } from "@/components/p2/worker/verification-badges";
import { ReliabilityScore } from "@/components/p2/worker/reliability-score";
import { AvailabilityCalendar } from "@/components/p2/worker/availability-calendar";
import {
  workers,
  workerById,
  placements,
  jobById,
  employerById,
  STAGE_LABEL,
} from "@/lib/mock";

const BASE = "/prototype-business-plan/dashboard";

export function generateStaticParams() {
  return workers.map((w) => ({ id: w.id }));
}

export default function CandidateProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const w = workerById[params.id];
  if (!w) notFound();

  // Prior placements this candidate has been part of
  const myPlacements = placements.filter((p) => p.workerId === w.id);

  return (
    <>
      <Topbar
        breadcrumbs={[
          { label: "Riverina Citrus" },
          { label: "Candidates", href: `${BASE}/candidates` },
          { label: w.name },
        ]}
        contextual={
          <div className="flex items-center gap-2">
            <Link href={`${BASE}/candidates`}>
              <Button
                size="sm"
                variant="ghost"
                leadingIcon={<ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />}
              >
                Back to database
              </Button>
            </Link>
            <Button
              size="sm"
              variant="secondary"
              leadingIcon={<MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />}
            >
              Message
            </Button>
            <Button
              size="sm"
              trailingIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />}
            >
              Send job offer
            </Button>
          </div>
        }
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 py-8">
        {/* Identity header */}
        <Card padded={false} className="mb-6 overflow-hidden">
          <div className="relative h-24 bg-gradient-to-r from-p2-brand via-p2-brand-2 to-p2-accent" />
          <div className="px-6 pb-6">
            <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <span className="rounded-full bg-white p-1 shadow-p2-md">
                  <Avatar
                    name={w.name}
                    seed={w.photoSeed}
                    nationality={w.nationality}
                    size={88}
                  />
                </span>
                <div className="pb-1">
                  <h1 className="p2-display text-3xl font-medium tracking-p2-tight text-p2-ink">
                    {w.name}
                  </h1>
                  <p className="mt-0.5 text-sm text-p2-ink-2">
                    {w.age} · {w.nationality} · Visa {w.visa} ·{" "}
                    {w.inAustralia
                      ? `${w.currentLocation?.city}, ${w.currentLocation?.state}`
                      : `Arriving ${new Date(w.arrivalDate).toLocaleDateString("en-AU")}`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pb-1">
                <Badge tone={w.inAustralia ? "success" : "info"} dot>
                  {w.inAustralia ? "In Australia" : "Pre-arrival"}
                </Badge>
                {w.hasDriversLicence && (
                  <Badge tone="neutral">
                    <Car className="h-3 w-3" strokeWidth={1.5} /> Licence
                  </Badge>
                )}
                {w.hasCar && (
                  <Badge tone="neutral">Has own vehicle</Badge>
                )}
              </div>
            </div>

            <p className="mt-4 max-w-3xl text-sm text-p2-ink-2">{w.bio}</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Left column */}
          <div className="space-y-6">
            <Card>
              <CardTitle>Verifications</CardTitle>
              <CardSubtitle>
                Concierge-screened before profile was made discoverable
              </CardSubtitle>
              <div className="mt-4">
                <VerificationBadges v={w.verifications} />
              </div>
            </Card>

            <Card>
              <CardTitle>Availability</CardTitle>
              <CardSubtitle>
                Windows captured at onboarding and re-checked monthly
              </CardSubtitle>
              <div className="mt-5">
                <AvailabilityCalendar windows={w.availability} />
              </div>
            </Card>

            <Card>
              <CardTitle>Experience</CardTitle>
              <CardSubtitle>
                Self-reported work history with concierge sanity-check
              </CardSubtitle>
              <ol className="mt-4 space-y-3">
                {w.experience.map((e, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-p2-md border border-p2-line bg-p2-surface-2/60 p-3"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-p2-md bg-p2-ink text-white">
                      <Briefcase className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-p2-ink">{e.role}</div>
                      <div className="text-xs text-p2-ink-2">
                        {e.country} · {e.durationMonths} month
                        {e.durationMonths === 1 ? "" : "s"}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            <Card padded={false}>
              <div className="border-b border-p2-line px-5 py-4">
                <CardTitle>Placement history on WHV World</CardTitle>
                <CardSubtitle>
                  {myPlacements.length} placement
                  {myPlacements.length === 1 ? "" : "s"} tracked through the
                  system
                </CardSubtitle>
              </div>
              <table className="w-full text-sm">
                <thead className="border-b border-p2-line bg-p2-surface-2/60 text-left font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
                  <tr>
                    <th className="px-5 py-2.5">Job · Employer</th>
                    <th className="px-5 py-2.5">Stage</th>
                    <th className="px-5 py-2.5">Risk</th>
                    <th className="px-5 py-2.5">Start date</th>
                  </tr>
                </thead>
                <tbody>
                  {myPlacements.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-6 text-center text-xs text-p2-ink-3">
                        No prior placements yet. This will be their first.
                      </td>
                    </tr>
                  ) : (
                    myPlacements.map((p) => {
                      const j = jobById[p.jobId];
                      const emp = employerById[j?.employerId ?? ""];
                      return (
                        <tr
                          key={p.id}
                          className="border-b border-p2-line last:border-b-0"
                        >
                          <td className="px-5 py-3">
                            <Link
                              href={`${BASE}/jobs/${j?.id}`}
                              className="font-medium text-p2-ink hover:underline"
                            >
                              {j?.role}
                            </Link>
                            <div className="text-xs text-p2-ink-2">
                              {emp?.name}
                            </div>
                          </td>
                          <td className="px-5 py-3 text-p2-ink-2">
                            {STAGE_LABEL[p.stage]}
                          </td>
                          <td className="px-5 py-3">
                            <Badge
                              tone={
                                p.risk === "red"
                                  ? "danger"
                                  : p.risk === "amber"
                                  ? "warn"
                                  : "success"
                              }
                              dot
                              size="sm"
                            >
                              {p.risk === "red"
                                ? "Critical"
                                : p.risk === "amber"
                                ? "At risk"
                                : "On track"}
                            </Badge>
                          </td>
                          <td className="px-5 py-3 font-p2-mono text-xs text-p2-ink-2">
                            {new Date(p.agreedStartDate).toLocaleDateString("en-AU")}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Right rail */}
          <div className="space-y-6">
            <Card>
              <CardTitle>Reliability</CardTitle>
              <CardSubtitle>
                Composite, recomputed after each placement
              </CardSubtitle>
              <div className="mt-5">
                <ReliabilityScore score={w.reliability} />
              </div>
            </Card>

            <Card>
              <CardTitle>Preferences</CardTitle>
              <CardSubtitle>What this candidate is looking for</CardSubtitle>
              <Divider className="my-4" />
              <PrefRow
                icon={<Briefcase className="h-3.5 w-3.5" strokeWidth={1.5} />}
                label="Industries"
                value={w.preferredIndustries.join(", ")}
              />
              <PrefRow
                icon={<MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />}
                label="Locations"
                value={w.preferredStates.join(", ")}
              />
              <PrefRow
                icon={<Languages className="h-3.5 w-3.5" strokeWidth={1.5} />}
                label="Languages"
                value={w.languages.join(", ")}
              />
              <PrefRow
                icon={<Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />}
                label="Arrival"
                value={new Date(w.arrivalDate).toLocaleDateString("en-AU")}
              />
            </Card>

            <Card>
              <CardTitle>Contact (revealed after offer)</CardTitle>
              <CardSubtitle>Masked until you send a verified offer</CardSubtitle>
              <Divider className="my-4" />
              <PrefRow
                icon={<Mail className="h-3.5 w-3.5" strokeWidth={1.5} />}
                label="Email"
                value={`${w.name.split(" ")[0].toLowerCase()}.****@****`}
                muted
              />
              <PrefRow
                icon={<Phone className="h-3.5 w-3.5" strokeWidth={1.5} />}
                label="Phone"
                value="+61 4** *** **5"
                muted
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

const PrefRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
}> = ({ icon, label, value, muted }) => (
  <div className="mb-3 flex items-start gap-2.5 last:mb-0">
    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-p2-xs bg-p2-slate-tint text-p2-ink-2">
      {icon}
    </span>
    <div className="flex-1">
      <div className="font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
        {label}
      </div>
      <div className={"text-sm " + (muted ? "text-p2-ink-3" : "text-p2-ink")}>
        {value}
      </div>
    </div>
  </div>
);
