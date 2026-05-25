import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Banknote,
  Bed,
  Users as UsersIcon,
  ShieldCheck,
  Check,
  FileText,
  Languages,
} from "lucide-react";
import { Button } from "@/components/p2/ui/button";
import { Badge } from "@/components/p2/ui/badge";
import { Card, CardTitle, CardSubtitle } from "@/components/p2/ui/card";
import { Divider } from "@/components/p2/ui/divider";
import { Checkbox } from "@/components/p2/ui/checkbox";
import { jobById, jobs, employerById, INDUSTRY_LABEL } from "@/lib/mock";

const BASE = "/prototype-business-plan/worker";

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export default function OfferDetailPage({ params }: { params: { id: string } }) {
  const j = jobById[params.id];
  if (!j) notFound();
  const emp = employerById[j.employerId];

  return (
    <main className="mx-auto max-w-p2-page px-6 py-8">
      <Link
        href={`${BASE}/dashboard`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-p2-ink-2 hover:text-p2-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to dashboard
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Offer detail */}
        <section>
          {/* Hero */}
          <Card padded={false} className="overflow-hidden">
            <div className="border-b border-p2-line bg-gradient-to-br from-p2-brand to-p2-brand-deep px-6 py-7 text-white">
              <Badge tone="accent" outline className="mb-3">
                {INDUSTRY_LABEL[j.industry]}
              </Badge>
              <h1 className="p2-display text-3xl font-medium tracking-p2-tight md:text-4xl">
                {j.role}
              </h1>
              <p className="mt-1 text-sm text-white/70">
                {emp?.name} · {j.location.town}, {j.location.state}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
              <Meta icon={<Calendar />} label="Starts" value={new Date(j.startDate).toLocaleDateString("en-AU")} />
              <Meta icon={<UsersIcon />} label="Crew" value={`${j.headcount} workers`} />
              <Meta icon={<Banknote />} label="Pay" value={`$${j.payRate.amount}/${j.payRate.unit}`} />
              <Meta icon={<Bed />} label="Accom." value={j.accommodationProvided ? "Provided" : "Self-arranged"} />
            </div>
          </Card>

          <Card className="mt-6">
            <CardTitle>About the role</CardTitle>
            <p className="mt-3 text-sm text-p2-ink-2">{j.description}</p>
          </Card>

          <Card className="mt-6">
            <CardTitle>What you commit to</CardTitle>
            <CardSubtitle>
              Signing locks in your start date and triggers reconfirmation
              checks
            </CardSubtitle>
            <ul className="mt-4 space-y-2.5 text-sm">
              <Commit text={`Arrive at ${j.location.town} ready to work on ${new Date(j.startDate).toLocaleDateString("en-AU")}`} />
              <Commit text="Respond to a 7-day SMS and a 48-hour SMS before start" />
              <Commit text="Stay through the first 7 days minimum (any earlier exit must be discussed)" />
              <Commit text="Follow site safety standards (PPE provided)" />
            </ul>
          </Card>

          {/* Contract preview */}
          <Card padded={false} className="mt-6">
            <div className="flex items-center justify-between border-b border-p2-line bg-p2-surface-2/60 px-5 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-p2-ink">
                <FileText className="h-4 w-4 text-p2-ink-3" strokeWidth={1.5} />
                Employment agreement — preview
              </div>
              <Badge tone="neutral" size="sm">
                Generated · standard template
              </Badge>
            </div>
            <div className="space-y-3 px-5 py-5 font-p2-mono text-[11px] leading-relaxed text-p2-ink-2">
              <p>
                <span className="text-p2-ink">PART 1 — PARTIES.</span> This
                Agreement is between {emp?.name} (the &ldquo;Employer&rdquo;,
                ABN {emp?.abn}) and the WHV holder identified below (the
                &ldquo;Worker&rdquo;), facilitated by WHV World (PT. Langkah
                Inovasi Digital).
              </p>
              <p>
                <span className="text-p2-ink">PART 2 — POSITION.</span> Worker
                will perform the duties of <em>{j.role}</em> at{" "}
                {j.location.town}, {j.location.state}, commencing{" "}
                {new Date(j.startDate).toLocaleDateString("en-AU")} and ending
                approximately {new Date(j.endDate).toLocaleDateString("en-AU")}.
              </p>
              <p>
                <span className="text-p2-ink">PART 3 — PAY.</span>{" "}
                ${j.payRate.amount} per {j.payRate.unit}, paid weekly into the
                Worker&rsquo;s Australian bank account, with an award-rate floor
                applied to piece-rate work.
              </p>
              <p>
                <span className="text-p2-ink">PART 4 — RECONFIRMATION.</span>{" "}
                Worker agrees to respond to 7-day and 48-hour reconfirmation
                checks scheduled by the WHV World platform. Failure to respond
                may result in the Worker&rsquo;s slot being offered to a backup
                candidate.
              </p>
              <p className="text-p2-ink-3">
                Full agreement (5 pages) available on request after signing.
              </p>
            </div>
          </Card>

          <Card className="mt-6 border-p2-brand/30 bg-p2-brand/[0.03]">
            <CardTitle>Sign and accept this offer</CardTitle>
            <CardSubtitle>
              Tick to confirm you understand the commitments above
            </CardSubtitle>
            <div className="mt-4 space-y-2.5">
              <Checkbox
                checked
                label="I agree to the start date and pay terms above"
              />
              <Checkbox
                checked
                label="I agree to respond to reconfirmation checks (7d / 48h / arrival / day-7)"
              />
              <Checkbox
                checked={false}
                label="I agree to the full employment agreement"
              />
            </div>
            <Divider className="my-5" />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-p2-ink-2">
                Once signed, you&rsquo;re visible to the employer as{" "}
                <span className="font-semibold text-p2-success">
                  Committed
                </span>{" "}
                in their dashboard.
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="lg">
                  Decline politely
                </Button>
                <Button
                  size="lg"
                  trailingIcon={<Check className="h-4 w-4" strokeWidth={2} />}
                >
                  Sign & accept offer
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Right rail */}
        <aside className="space-y-6">
          <Card>
            <CardTitle>About this employer</CardTitle>
            <CardSubtitle>{emp?.location.region}</CardSubtitle>
            <p className="mt-3 text-sm text-p2-ink-2">{emp?.blurb}</p>
            <Divider className="my-4" />
            <ul className="space-y-2.5 text-xs text-p2-ink-2">
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-p2-ink-3" strokeWidth={1.5} />
                {emp?.location.town}, {emp?.location.state}
              </li>
              <li className="flex items-center gap-2">
                <UsersIcon className="h-3.5 w-3.5 text-p2-ink-3" strokeWidth={1.5} />
                {emp?.size === "large" ? "Large operation" : emp?.size === "medium" ? "Medium operation" : "Small operation"}
              </li>
              <li className="flex items-center gap-2">
                <Languages className="h-3.5 w-3.5 text-p2-ink-3" strokeWidth={1.5} />
                English, Spanish, Italian spoken on site
              </li>
            </ul>
          </Card>

          <Card className="border-p2-success/30 bg-p2-success-soft/40">
            <CardTitle>Why this is safer than a job board</CardTitle>
            <ul className="mt-4 space-y-2.5 text-sm">
              <SafePoint text="Employer ABN verified against ABR" />
              <SafePoint text="Standard contract template — no hidden terms" />
              <SafePoint text="Pay rate floor enforced even on piece work" />
              <SafePoint text="Concierge support if anything goes wrong" />
            </ul>
          </Card>

          <Card>
            <CardTitle>What happens next</CardTitle>
            <ol className="mt-4 space-y-3 text-xs text-p2-ink-2">
              <Step n={1} text="You sign — status flips to Committed" />
              <Step n={2} text="7-day SMS: confirm you're on track" />
              <Step n={3} text="48-hour SMS: confirm travel plan" />
              <Step n={4} text="Arrival ping on day 1" />
              <Step n={5} text="Day-7 retention check — score updates" />
            </ol>
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

const Commit: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-2">
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-p2-brand/10 text-p2-brand">
      <ShieldCheck className="h-3 w-3" strokeWidth={2} />
    </span>
    <span className="text-p2-ink-2">{text}</span>
  </li>
);

const SafePoint: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-2">
    <Check className="mt-0.5 h-4 w-4 shrink-0 text-p2-success" strokeWidth={2.5} />
    <span className="text-p2-ink">{text}</span>
  </li>
);

const Step: React.FC<{ n: number; text: string }> = ({ n, text }) => (
  <li className="flex items-start gap-3">
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-p2-ink text-[11px] font-semibold text-white">
      {n}
    </span>
    <span className="pt-0.5 text-p2-ink">{text}</span>
  </li>
);
