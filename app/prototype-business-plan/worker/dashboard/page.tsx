import Link from "next/link";
import {
  MapPin,
  Calendar,
  Bed,
  Banknote,
  ArrowRight,
  CheckCircle2,
  AlertOctagon,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/p2/ui/button";
import { Badge } from "@/components/p2/ui/badge";
import { Card, CardTitle, CardSubtitle } from "@/components/p2/ui/card";
import { Avatar } from "@/components/p2/ui/avatar";
import { ReliabilityScore } from "@/components/p2/worker/reliability-score";
import { VerificationBadges } from "@/components/p2/worker/verification-badges";
import { workerById, jobs, employerById, INDUSTRY_LABEL } from "@/lib/mock";

const BASE = "/prototype-business-plan/worker";

export default function WorkerDashboardPage() {
  const me = workerById["w_001"]; // Léa
  // Two illustrative offer jobs
  const offers = [jobs.find((j) => j.id === "j_001")!, jobs.find((j) => j.id === "j_005")!];

  return (
    <main className="mx-auto max-w-p2-page px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-p2-mono text-[11px] uppercase tracking-widest text-p2-ink-3">
            Monday · 25 May 2026 · Sydney NSW
          </div>
          <h1 className="mt-1 p2-display text-3xl font-medium tracking-p2-tight text-p2-ink md:text-4xl">
            Bonjour, {me.name.split(" ")[0]}.
          </h1>
          <p className="mt-1.5 text-sm text-p2-ink-2">
            You have{" "}
            <span className="font-semibold text-p2-ink">2 active offers</span>{" "}
            and 1 reconfirmation due today.
          </p>
        </div>
        <Badge tone="success" dot>
          Profile verified ✓
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Offers */}
        <section id="offers">
          {/* Reconfirmation prompt */}
          <Card className="mb-5 border-p2-warn/30 bg-p2-warn-soft/40" hoverable>
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-p2-md bg-white text-p2-warn">
                <AlertOctagon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-p2-ink">
                  Reconfirm your 7-day check
                </div>
                <p className="mt-1 text-xs text-p2-ink-2">
                  Riverina Citrus needs you to confirm you're still on track to
                  start{" "}
                  <span className="font-medium text-p2-ink">Mon 8 Jun</span>. Two
                  taps.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm">Yes — I'm coming</Button>
                  <Button size="sm" variant="secondary">
                    I need to change date
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <h2 className="mb-3 font-p2-mono text-[11px] uppercase tracking-widest text-p2-ink-3">
            Active offers
          </h2>

          <div className="space-y-4">
            {offers.map((j) => {
              const emp = employerById[j.employerId];
              return (
                <Card key={j.id} className="p-0" padded={false}>
                  <div className="flex items-start justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <Badge tone="brand" outline size="sm">
                        {INDUSTRY_LABEL[j.industry]}
                      </Badge>
                      <h3 className="mt-2 text-lg font-semibold tracking-p2-tight text-p2-ink">
                        {j.role}
                      </h3>
                      <p className="text-xs text-p2-ink-2">
                        {emp?.name} ·{" "}
                        <span className="text-p2-ink">
                          {j.location.town}, {j.location.state}
                        </span>
                      </p>
                    </div>
                    <Badge tone="success" dot>
                      Verified employer
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 border-t border-p2-line bg-p2-surface-2/50 p-5 md:grid-cols-4">
                    <Meta icon={<Calendar />} label="Starts" value={new Date(j.startDate).toLocaleDateString("en-AU", { day: "numeric", month: "short" })} />
                    <Meta icon={<Banknote />} label="Pay" value={`$${j.payRate.amount}/${j.payRate.unit}`} />
                    <Meta icon={<Bed />} label="Accom." value={j.accommodationProvided ? "Provided" : "Not provided"} />
                    <Meta icon={<MapPin />} label="Where" value={`${j.location.town}, ${j.location.state}`} />
                  </div>
                  <div className="flex items-center justify-between border-t border-p2-line px-5 py-3">
                    <span className="text-xs text-p2-ink-2">
                      Offer sent · awaiting your acceptance
                    </span>
                    <Link href={`${BASE}/offers/${j.id}`}>
                      <Button
                        size="sm"
                        trailingIcon={<ArrowRight className="h-3 w-3" strokeWidth={2} />}
                      >
                        Review offer
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Confirmed upcoming */}
          <h2 className="mb-3 mt-8 font-p2-mono text-[11px] uppercase tracking-widest text-p2-ink-3">
            Upcoming confirmed
          </h2>
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-p2-ink">
                  Mandarin Pickers — Riverina Citrus
                </div>
                <p className="text-xs text-p2-ink-2">
                  Griffith NSW · Starts Mon 8 Jun · 14 days away
                </p>
              </div>
              <Badge tone="success" dot>
                Contract signed
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
              <CheckPill done label="Contract signed" />
              <CheckPill done label="7-day reconfirm" />
              <CheckPill pending label="48-hour reconfirm" />
              <CheckPill pending label="Arrival ping" />
            </div>
          </Card>
        </section>

        {/* Profile card */}
        <aside className="space-y-6">
          <Card>
            <div className="flex items-center gap-3">
              <Avatar
                name={me.name}
                seed={me.photoSeed}
                nationality={me.nationality}
                size={48}
              />
              <div>
                <div className="text-sm font-semibold text-p2-ink">{me.name}</div>
                <div className="text-xs text-p2-ink-2">
                  {me.nationality} · {me.visa} · Sydney NSW
                </div>
              </div>
            </div>
            <p className="mt-3 line-clamp-3 text-xs text-p2-ink-2">{me.bio}</p>
            <Button variant="secondary" size="sm" className="mt-4 w-full">
              Edit profile
            </Button>
          </Card>

          <Card>
            <CardTitle>Your reliability</CardTitle>
            <CardSubtitle>What employers see</CardSubtitle>
            <div className="mt-4">
              <ReliabilityScore score={me.reliability} compact />
            </div>
            <p className="mt-3 text-[11px] text-p2-ink-3">
              Reconfirm on time and stay through week 1 to grow your score.
            </p>
          </Card>

          <Card>
            <CardTitle>Verifications</CardTitle>
            <CardSubtitle>Screened by our concierge team</CardSubtitle>
            <div className="mt-4">
              <VerificationBadges v={me.verifications} compact />
            </div>
          </Card>

          <Card>
            <CardTitle>Your hiring history</CardTitle>
            <CardSubtitle>Placements completed on WHV World</CardSubtitle>
            <ul className="mt-4 space-y-2 text-xs">
              <li className="flex items-center gap-2 rounded-p2-md border border-p2-line bg-p2-surface-2/60 p-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-p2-md bg-p2-success text-white">
                  <Briefcase className="h-3 w-3" strokeWidth={2} />
                </span>
                <div className="flex-1">
                  <div className="font-medium text-p2-ink">Strawberry pick · Wamuran QLD</div>
                  <div className="text-p2-ink-3">Stayed full season · Apr 2026</div>
                </div>
              </li>
              <li className="flex items-center gap-2 rounded-p2-md border border-p2-line bg-p2-surface-2/60 p-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-p2-md bg-p2-success text-white">
                  <Briefcase className="h-3 w-3" strokeWidth={2} />
                </span>
                <div className="flex-1">
                  <div className="font-medium text-p2-ink">FOH service · Sydney NSW</div>
                  <div className="text-p2-ink-3">3-month placement · Feb 2026</div>
                </div>
              </li>
            </ul>
          </Card>
        </aside>
      </div>
    </main>
  );
}

const Meta: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <div>
    <div className="flex items-center gap-1 font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
      <span className="h-3 w-3 [&_svg]:h-3 [&_svg]:w-3 [&_svg]:stroke-[1.5]">{icon}</span>
      {label}
    </div>
    <div className="mt-1 text-sm font-medium text-p2-ink">{value}</div>
  </div>
);

const CheckPill: React.FC<{ label: string; done?: boolean; pending?: boolean }> = ({
  label,
  done,
  pending,
}) => (
  <span
    className={
      "inline-flex items-center gap-1.5 rounded-p2-md border px-2.5 py-1.5 " +
      (done
        ? "border-p2-success/30 bg-p2-success-soft text-p2-success"
        : pending
        ? "border-p2-line bg-white text-p2-ink-2"
        : "border-p2-line bg-white text-p2-ink-3")
    }
  >
    <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
    {label}
  </span>
);
