"use client";
import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Banknote,
  Bed,
  Bookmark,
  Share2,
  Briefcase,
  Building2,
  Check,
  X,
  ShieldCheck,
} from "lucide-react";
import { AppNavP3 } from "@/components/p3/layout/app-nav";
import { MobileTabBar } from "@/components/p3/layout/mobile-tabbar";
import { Card, CardTitle, CardSubtitle } from "@/components/p3/ui/card";
import { Badge } from "@/components/p3/ui/badge";
import { Button } from "@/components/p3/ui/button";
import { Field, Input } from "@/components/p3/ui/input";
import { Textarea } from "@/components/p3/ui/textarea";
import { Select } from "@/components/p3/ui/select";
import { Checkbox } from "@/components/p3/ui/checkbox";
import { Divider } from "@/components/p3/ui/divider";
import { jobs, me } from "@/lib/mock-p3";

const BASE = "/prototype2";

export default function JobDetailP3() {
  const params = useParams<{ id: string }>();
  const job = jobs.find((j) => j.id === params.id);
  const [openApply, setOpenApply] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [agree, setAgree] = useState(false);

  if (!job) {
    if (typeof window !== "undefined") notFound();
    return null;
  }

  return (
    <>
      <AppNavP3 city={me.city} unread={3} />

      <main className="mx-auto max-w-p3-page px-5 pb-24 pt-6 md:pb-10">
        <Link
          href={`${BASE}/jobs`}
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-p3-ink-2 hover:text-p3-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          All jobs
        </Link>

        <Card padded={false} className="overflow-hidden">
          <div className="bg-gradient-to-br from-p3-accent-mint to-emerald-600 px-7 py-8 text-white">
            <Badge tone="brand" className="bg-white/15 text-white">
              {job.industry}
            </Badge>
            <h1 className="mt-3 text-4xl font-extrabold tracking-p3-tight md:text-5xl">
              {job.role}
            </h1>
            <p className="mt-2 text-base text-white/85">
              {job.company} · {job.city}, {job.state}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 p-6 md:grid-cols-4">
            <Meta
              icon={<Banknote className="h-3.5 w-3.5" strokeWidth={1.75} />}
              label="Pay"
              value={job.payRate}
            />
            <Meta
              icon={<Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />}
              label="Starts"
              value={new Date(job.startDate).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
            />
            <Meta
              icon={<MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />}
              label="Where"
              value={`${job.city}, ${job.state}`}
            />
            <Meta
              icon={<Bed className="h-3.5 w-3.5" strokeWidth={1.75} />}
              label="Accommodation"
              value={job.accommodationProvided ? "Provided" : "Self"}
            />
          </div>
        </Card>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <Card>
              <CardTitle>About the role</CardTitle>
              <p className="mt-3 text-sm text-p3-ink-2">{job.blurb}</p>
              <Divider className="my-5" />
              <h4 className="text-sm font-bold text-p3-ink">What you'll do</h4>
              <ul className="mt-3 space-y-1.5 text-sm text-p3-ink-2">
                <li>· Daily 7am–3pm shifts, 5 days a week</li>
                <li>· Work in a crew of 12, on-orchard supervisor</li>
                <li>· Lift up to 15kg, work outdoors year-round</li>
                <li>· PPE provided (sun hat, gloves, hi-vis)</li>
              </ul>
            </Card>

            <Card>
              <CardTitle>About the employer</CardTitle>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-p3-md bg-p3-brand-soft text-p3-brand-deep">
                  <Building2 className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <div className="text-base font-bold text-p3-ink">
                    {job.company}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-p3-ink-2">
                    <Badge tone="success" size="sm" dot>
                      Verified employer
                    </Badge>
                    · ABN registered · 23 prior placements
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-p3-ink-2">
                Established 1998. Australia's largest mandarin grower. Pays
                weekly via direct deposit. Past WHV crews report 96% on-time
                start rate.
              </p>
            </Card>

            <Card>
              <CardTitle>What past WHV workers said</CardTitle>
              <CardSubtitle>Anonymous reviews from {job.company} placements</CardSubtitle>
              <Divider className="my-4" />
              <ul className="space-y-4 text-sm">
                <Review
                  rating={5}
                  nationality="🇬🇧"
                  body="Solid crew, paid on time every Friday. Bunkhouse basic but clean. 8/10 — would do again for second-year days."
                />
                <Review
                  rating={4}
                  nationality="🇫🇷"
                  body="Hard work but fair. Supervisor was great about helping with the 88-day paperwork. Bring sunscreen."
                />
                <Review
                  rating={5}
                  nationality="🇰🇷"
                  body="My first farm job — felt safe and respected. They explain piece-rate clearly so you know what you'll earn."
                />
              </ul>
            </Card>
          </div>

          <aside className="space-y-5">
            <Card lifted className="sticky top-20">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-p3-tight text-p3-ink">
                  {job.payRate}
                </span>
              </div>
              <Divider className="my-4" />
              <Row label="Visa" value={job.visa.join(" + ")} />
              <Row label="Hours" value="Full-time" />
              <Row
                label="Counts toward"
                value={job.whvOnly ? "88 days specified work ✓" : "Not specified"}
              />
              <Row
                label="Listed"
                value={new Date(job.postedAt).toLocaleDateString("en-AU")}
              />
              <Divider className="my-4" />
              <Button
                size="lg"
                block
                onClick={() => setOpenApply(true)}
                trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2.25} />}
              >
                Apply for this role
              </Button>
              <p className="mt-2 text-center text-[11px] text-p3-ink-3">
                Fill in 3 questions · the employer replies within 48h
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button variant="secondary" size="sm" leadingIcon={<Bookmark className="h-3.5 w-3.5" strokeWidth={1.75} />}>
                  Save
                </Button>
                <Button variant="secondary" size="sm" leadingIcon={<Share2 className="h-3.5 w-3.5" strokeWidth={1.75} />}>
                  Share
                </Button>
              </div>
            </Card>

            <Card>
              <CardTitle>Safety first</CardTitle>
              <ul className="mt-3 space-y-2 text-xs text-p3-ink-2">
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-p3-success" strokeWidth={2.5} />
                  Employer ABN verified against ABR
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-p3-success" strokeWidth={2.5} />
                  Award-rate floor guaranteed
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-p3-success" strokeWidth={2.5} />
                  Past workers' reviews verified
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-p3-success" strokeWidth={2.5} />
                  Fair Work Ombudsman handles disputes
                </li>
              </ul>
            </Card>
          </aside>
        </div>
      </main>
      <MobileTabBar />

      {/* Apply modal */}
      {openApply && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-p3-ink/40 backdrop-blur-sm md:items-center">
          <div className="w-full max-w-lg overflow-hidden rounded-t-p3-2xl bg-white shadow-p3-lg md:rounded-p3-2xl">
            <div className="flex items-center justify-between border-b border-p3-line px-6 py-4">
              <div>
                <div className="font-p3-mono text-[10px] uppercase tracking-widest text-p3-ink-3">
                  Apply · Step {step} of 2
                </div>
                <div className="text-base font-bold tracking-p3-tight text-p3-ink">
                  {job.role}
                </div>
              </div>
              <button
                onClick={() => setOpenApply(false)}
                className="grid h-9 w-9 place-items-center rounded-p3-md text-p3-ink-2 hover:bg-p3-surface"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            {step === 1 ? (
              <div className="space-y-4 p-6">
                <Field label="Why are you a good fit?" required>
                  <Textarea
                    rows={3}
                    placeholder="2-3 sentences. Tell the employer about your relevant experience."
                    defaultValue="Six months of café experience in France + harvest experience at a vineyard. Comfortable with early starts and physical work."
                  />
                </Field>
                <Field label="When can you start?" required>
                  <Input type="date" defaultValue={job.startDate} />
                </Field>
                <Field label="Do you have your own transport?" required>
                  <Select defaultValue="no">
                    <option value="no">No</option>
                    <option value="public">Public transport access</option>
                    <option value="yes">Yes, I have a vehicle</option>
                  </Select>
                </Field>
                <Field
                  label="Anything else the employer should know?"
                  helper="Optional"
                >
                  <Textarea
                    rows={2}
                    placeholder="Dietary needs, language preferences, etc."
                  />
                </Field>
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={() => setStep(2)}
                    trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2.25} />}
                  >
                    Review application
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-6">
                <Card padded className="bg-p3-surface">
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-p3-md bg-p3-brand text-white">
                      <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div>
                      <div className="text-sm font-bold text-p3-ink">
                        Your contact details are private
                      </div>
                      <p className="mt-1 text-xs text-p3-ink-2">
                        We only share your phone and email with{" "}
                        <span className="font-semibold text-p3-ink">{job.company}</span> after they
                        respond to this application.
                      </p>
                    </div>
                  </div>
                </Card>

                <Checkbox
                  checked={agree}
                  onChange={setAgree}
                  label="I confirm the answers above are accurate"
                  description="Misleading applications are flagged and may impact your reliability score."
                />

                <div className="flex items-center justify-between pt-2">
                  <Button variant="ghost" size="md" onClick={() => setStep(1)}>
                    ← Back
                  </Button>
                  <Button
                    size="md"
                    disabled={!agree}
                    onClick={() => setOpenApply(false)}
                    trailingIcon={<Check className="h-4 w-4" strokeWidth={2.25} />}
                  >
                    Submit application
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const Meta: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center gap-1 font-p3-mono text-[10px] uppercase tracking-widest text-p3-ink-3">
      {icon} {label}
    </div>
    <div className="mt-1 text-sm font-bold text-p3-ink">{value}</div>
  </div>
);

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="mb-3 flex items-start justify-between gap-2 text-sm last:mb-0">
    <span className="font-p3-mono text-[10px] uppercase tracking-widest text-p3-ink-3">
      {label}
    </span>
    <span className="text-right text-p3-ink">{value}</span>
  </div>
);

const Review: React.FC<{
  rating: number;
  nationality: string;
  body: string;
}> = ({ rating, nationality, body }) => (
  <li className="rounded-p3-md border border-p3-line p-3">
    <div className="flex items-center justify-between">
      <div className="text-xs text-p3-ink-2">
        <span className="text-base">{nationality}</span>{" "}
        <span className="ml-1">anonymous WHV holder</span>
      </div>
      <span className="font-p3-mono text-xs font-bold text-p3-accent-amber">
        {"★".repeat(rating)}
      </span>
    </div>
    <p className="mt-1.5 text-p3-ink">{body}</p>
  </li>
);
