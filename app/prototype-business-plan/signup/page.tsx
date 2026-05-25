"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Tractor,
  UserCircle2,
  Check,
  Building2,
  Calendar,
  MapPin,
  Users as UsersIcon,
} from "lucide-react";
import { Logo } from "@/components/p2/brand/logo";
import { Button } from "@/components/p2/ui/button";
import { Input, Field } from "@/components/p2/ui/input";
import { Select } from "@/components/p2/ui/select";
import { Textarea } from "@/components/p2/ui/textarea";
import { Badge } from "@/components/p2/ui/badge";
import { cn } from "@/lib/cn";

const BASE = "/prototype-business-plan";

type AccountType = "agency" | "employer" | "worker";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType>("agency");

  const totalSteps = accountType === "worker" ? 2 : 3;

  return (
    <div className="min-h-screen bg-p2-paper">
      <header className="border-b border-p2-line bg-white">
        <div className="mx-auto flex h-16 max-w-p2-page items-center justify-between px-6">
          <Link href={BASE}>
            <Logo />
          </Link>
          <div className="text-sm text-p2-ink-2">
            Already have an account?{" "}
            <Link
              href={`${BASE}/login`}
              className="font-medium text-p2-brand hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-p2-narrow px-6 py-12">
        <div className="mb-10">
          <Badge tone="accent" outline className="mb-3">
            Free pilot — 1 hire + 1 backup
          </Badge>
          <h1 className="p2-display text-4xl font-medium tracking-p2-tight text-p2-ink">
            Set up your WHV World workspace
          </h1>
          <p className="mt-2 max-w-xl text-p2-ink-2">
            Three short steps. You can change anything later from inside the
            dashboard.
          </p>
        </div>

        <Stepper current={step} total={totalSteps} />

        <div className="mt-10 rounded-p2-xl border border-p2-line bg-white p-8 shadow-p2-sm">
          {step === 1 && (
            <Step1
              value={accountType}
              onChange={setAccountType}
              onNext={() => {
                if (accountType === "worker") {
                  router.push(`${BASE}/worker/signup`);
                } else {
                  setStep(2);
                }
              }}
            />
          )}
          {step === 2 && (
            <Step2
              type={accountType}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <Step3
              type={accountType}
              onSubmit={() => router.push(`${BASE}/dashboard`)}
              onBack={() => setStep(2)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// --- Stepper -----------------------------------------------------------------

const Stepper: React.FC<{ current: number; total: number }> = ({
  current,
  total,
}) => (
  <ol className="flex items-center gap-3">
    {Array.from({ length: total }).map((_, i) => {
      const n = i + 1;
      const done = n < current;
      const active = n === current;
      return (
        <li key={n} className="flex flex-1 items-center gap-3">
          <span
            className={cn(
              "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-semibold",
              done && "border-p2-brand bg-p2-brand text-white",
              active && "border-p2-brand bg-white text-p2-brand",
              !done && !active && "border-p2-line bg-white text-p2-ink-3",
            )}
          >
            {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : n}
          </span>
          <span
            className={cn(
              "text-xs font-medium",
              (done || active) ? "text-p2-ink" : "text-p2-ink-3",
            )}
          >
            {labels[i]}
          </span>
          {i < total - 1 && (
            <span
              className={cn(
                "ml-auto h-px flex-1",
                done ? "bg-p2-brand" : "bg-p2-line",
              )}
            />
          )}
        </li>
      );
    })}
  </ol>
);
const labels = ["Account type", "Organisation", "First hiring intent"];

// --- Step 1: account type ----------------------------------------------------

const typeOptions: { id: AccountType; label: string; sub: string; icon: React.ElementType }[] = [
  {
    id: "agency",
    label: "Recruitment agency",
    sub: "I place WHV workers with multiple employer clients",
    icon: Briefcase,
  },
  {
    id: "employer",
    label: "Seasonal employer",
    sub: "I hire WHV workers directly for my own operation",
    icon: Tractor,
  },
  {
    id: "worker",
    label: "WHV worker",
    sub: "I'm looking for a verified seasonal job in Australia",
    icon: UserCircle2,
  },
];

const Step1: React.FC<{
  value: AccountType;
  onChange: (v: AccountType) => void;
  onNext: () => void;
}> = ({ value, onChange, onNext }) => (
  <div>
    <h2 className="text-xl font-semibold tracking-p2-tight text-p2-ink">
      What kind of account are you setting up?
    </h2>
    <p className="mt-1.5 text-sm text-p2-ink-2">
      This determines which surfaces of WHV World you see.
    </p>

    <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
      {typeOptions.map((o) => {
        const Icon = o.icon;
        const active = value === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "group flex h-full flex-col items-start gap-3 rounded-p2-lg border p-5 text-left transition-all",
              active
                ? "border-p2-brand bg-p2-brand/[0.04] ring-2 ring-p2-brand/15"
                : "border-p2-line bg-white hover:border-p2-ink-4",
            )}
          >
            <span
              className={cn(
                "grid h-10 w-10 place-items-center rounded-p2-md",
                active
                  ? "bg-p2-brand text-white"
                  : "bg-p2-slate-tint text-p2-ink-2",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-p2-ink">
                {o.label}
              </span>
              <span className="mt-0.5 block text-xs text-p2-ink-2">
                {o.sub}
              </span>
            </span>
          </button>
        );
      })}
    </div>

    <div className="mt-8 flex justify-end">
      <Button
        onClick={onNext}
        trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
      >
        Continue
      </Button>
    </div>
  </div>
);

// --- Step 2: organisation details -------------------------------------------

const Step2: React.FC<{
  type: AccountType;
  onNext: () => void;
  onBack: () => void;
}> = ({ type, onNext, onBack }) => (
  <div>
    <h2 className="text-xl font-semibold tracking-p2-tight text-p2-ink">
      Tell us about{" "}
      {type === "agency" ? "your agency" : "your operation"}.
    </h2>
    <p className="mt-1.5 text-sm text-p2-ink-2">
      Used to set up your workspace and connect you with the right candidates.
    </p>

    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Field label={type === "agency" ? "Agency name" : "Business name"}>
        <Input
          placeholder={
            type === "agency" ? "Outback Recruitment Partners" : "Riverina Citrus"
          }
          defaultValue={
            type === "agency" ? "Outback Recruitment Partners" : "Riverina Citrus"
          }
          leading={<Building2 className="h-4 w-4" strokeWidth={1.5} />}
        />
      </Field>
      <Field label="Australian Business Number (ABN)" helper="11 digits, no spaces.">
        <Input placeholder="21887654321" defaultValue="21887654321" />
      </Field>
      <Field label="Primary industry">
        <Select defaultValue={type === "agency" ? "labour-hire" : "horticulture"}>
          <option value="horticulture">Horticulture</option>
          <option value="agriculture">Agriculture</option>
          <option value="hospitality">Hospitality</option>
          <option value="tourism">Tourism</option>
          <option value="construction">Construction</option>
          <option value="labour-hire">Labour-hire (multi-industry)</option>
        </Select>
      </Field>
      <Field label="State">
        <Select defaultValue="QLD">
          {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Your name">
        <Input placeholder="Sarah Kelly" defaultValue="Sarah Kelly" />
      </Field>
      <Field label="Work email">
        <Input
          type="email"
          placeholder="sarah@orp.com.au"
          defaultValue="sarah@orp.com.au"
        />
      </Field>
    </div>

    <div className="mt-8 flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={onBack}
        leadingIcon={<ArrowLeft className="h-4 w-4" strokeWidth={2} />}
      >
        Back
      </Button>
      <Button
        onClick={onNext}
        trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
      >
        Continue
      </Button>
    </div>
  </div>
);

// --- Step 3: hiring intent ---------------------------------------------------

const Step3: React.FC<{
  type: AccountType;
  onSubmit: () => void;
  onBack: () => void;
}> = ({ type, onSubmit, onBack }) => (
  <div>
    <h2 className="text-xl font-semibold tracking-p2-tight text-p2-ink">
      What are you hiring for first?
    </h2>
    <p className="mt-1.5 text-sm text-p2-ink-2">
      We&rsquo;ll pre-seed your dashboard with a starter pipeline so you have
      something to look at on day one.
    </p>

    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Field label="Role">
        <Input
          placeholder="Mandarin pickers (crew)"
          defaultValue="Mandarin pickers (crew)"
          leading={<Briefcase className="h-4 w-4" strokeWidth={1.5} />}
        />
      </Field>
      <Field label="Headcount needed">
        <Input
          type="number"
          defaultValue={12}
          leading={<UsersIcon className="h-4 w-4" strokeWidth={1.5} />}
        />
      </Field>
      <Field label="Start date">
        <Input
          type="date"
          defaultValue="2026-06-08"
          leading={<Calendar className="h-4 w-4" strokeWidth={1.5} />}
        />
      </Field>
      <Field label="Location (town, state)">
        <Input
          placeholder="Griffith, NSW"
          defaultValue="Griffith, NSW"
          leading={<MapPin className="h-4 w-4" strokeWidth={1.5} />}
        />
      </Field>
      <Field
        label="Brief description"
        helper="Optional. Helps us suggest matching candidates."
        // span 2 cols via wrapper below
      >
        <Textarea
          rows={4}
          placeholder="Mandarin picking on a 240-acre orchard, on-site bunkhouse provided…"
          defaultValue="Mandarin picking on a 240-acre orchard, on-site bunkhouse provided. Looking for repeat WHV crews."
        />
      </Field>
    </div>

    <div className="mt-6 rounded-p2-md border border-p2-line bg-p2-cream p-4 text-sm">
      <span className="font-medium text-p2-ink">Pilot details</span>{" "}
      <span className="text-p2-ink-2">
        — your first hire is fully concierge-managed by our team and includes 1
        backup candidate at no cost. You&rsquo;ll be invited to upgrade once the
        placement is verified-started.
      </span>
    </div>

    <div className="mt-8 flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={onBack}
        leadingIcon={<ArrowLeft className="h-4 w-4" strokeWidth={2} />}
      >
        Back
      </Button>
      <Button
        size="lg"
        onClick={onSubmit}
        trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
      >
        {type === "agency"
          ? "Open my agency workspace"
          : "Open my employer dashboard"}
      </Button>
    </div>
  </div>
);
