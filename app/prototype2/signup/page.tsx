"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Briefcase,
  User2,
  Mail,
  Phone,
  Lock,
  MapPin,
  Check,
  Building2,
} from "lucide-react";
import { Logo } from "@/components/p3/brand/logo";
import { Button } from "@/components/p3/ui/button";
import { Input, Field } from "@/components/p3/ui/input";
import { Select } from "@/components/p3/ui/select";
import { Checkbox } from "@/components/p3/ui/checkbox";
import { Card } from "@/components/p3/ui/card";
import { Badge } from "@/components/p3/ui/badge";
import { cn } from "@/lib/cn";

const BASE = "/prototype2";

type AccountType = "whv" | "company";

export default function SignupP3() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType>("whv");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-p3-paper">
      <header className="border-b border-p3-line bg-white">
        <div className="mx-auto flex h-16 max-w-p3-page items-center justify-between px-5">
          <Link href={BASE}>
            <Logo />
          </Link>
          <span className="text-sm text-p3-ink-2">
            Already have an account?{" "}
            <Link
              href={`${BASE}/login`}
              className="font-semibold text-p3-brand hover:underline"
            >
              Log in
            </Link>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-p3-app px-5 py-12">
        <div className="mb-8 text-center">
          <Badge tone="brand">Free forever for WHV holders</Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-p3-tight text-p3-ink">
            Welcome to WHV World
          </h1>
          <p className="mt-2 text-sm text-p3-ink-2">
            Three minutes and you're in.
          </p>
        </div>

        <Stepper current={step} />

        <Card className="mt-8" lifted>
          {step === 1 && (
            <Step1
              type={accountType}
              onChange={setAccountType}
              onNext={() => setStep(2)}
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
              agreed={agreed}
              setAgreed={setAgreed}
              onBack={() => setStep(2)}
              onSubmit={() => router.push(`${BASE}/home`)}
            />
          )}
        </Card>
      </main>
    </div>
  );
}

const Stepper: React.FC<{ current: number }> = ({ current }) => {
  const labels = ["Who are you", "About you", "Location & terms"];
  return (
    <ol className="flex items-center gap-2">
      {labels.map((l, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={l} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-bold",
                done && "border-p3-brand bg-p3-brand text-white",
                active && "border-p3-brand bg-p3-brand-soft text-p3-brand-deep",
                !done && !active && "border-p3-line bg-white text-p3-ink-3",
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : n}
            </span>
            <span
              className={cn(
                "text-xs font-semibold",
                done || active ? "text-p3-ink" : "text-p3-ink-3",
              )}
            >
              {l}
            </span>
            {i < labels.length - 1 && (
              <span
                className={cn(
                  "ml-auto h-px flex-1",
                  done ? "bg-p3-brand" : "bg-p3-line",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};

const Step1: React.FC<{
  type: AccountType;
  onChange: (v: AccountType) => void;
  onNext: () => void;
}> = ({ type, onChange, onNext }) => (
  <div>
    <h2 className="text-xl font-bold tracking-p3-tight text-p3-ink">
      Are you a company or a WHV holder?
    </h2>
    <p className="mt-1.5 text-sm text-p3-ink-2">
      The app is built for WHV holders, but companies can post jobs and events
      too.
    </p>

    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {[
        {
          id: "whv" as const,
          icon: User2,
          label: "I'm a WHV holder",
          sub: "I'm on 417 or 462, looking for jobs, community, and services.",
        },
        {
          id: "company" as const,
          icon: Building2,
          label: "I'm a company",
          sub: "I want to post jobs and events for WHV workers.",
        },
      ].map((o) => {
        const Icon = o.icon;
        const active = type === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "rounded-p3-lg border-2 p-5 text-left transition-all",
              active
                ? "border-p3-brand bg-p3-brand-tint shadow-p3-sm"
                : "border-p3-line bg-white hover:border-p3-ink-4",
            )}
          >
            <span
              className={cn(
                "grid h-11 w-11 place-items-center rounded-p3-md",
                active
                  ? "bg-p3-brand text-white"
                  : "bg-p3-surface text-p3-ink-2",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div className="mt-4 font-bold text-p3-ink">{o.label}</div>
            <p className="mt-1 text-xs text-p3-ink-2">{o.sub}</p>
          </button>
        );
      })}
    </div>

    <div className="mt-7 flex justify-end">
      <Button
        onClick={onNext}
        trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2.25} />}
      >
        Continue
      </Button>
    </div>
  </div>
);

const Step2: React.FC<{
  type: AccountType;
  onNext: () => void;
  onBack: () => void;
}> = ({ type, onNext, onBack }) => (
  <div>
    <h2 className="text-xl font-bold tracking-p3-tight text-p3-ink">
      {type === "whv" ? "Tell us about yourself" : "Tell us about your company"}
    </h2>
    <p className="mt-1.5 text-sm text-p3-ink-2">
      We use this to filter what you see and to verify your account.
    </p>

    <div className="mt-6 space-y-4">
      <Field label={type === "whv" ? "Name (public)" : "Company name (public)"} required>
        <Input
          placeholder={type === "whv" ? "Léa Marchand" : "Riverina Citrus"}
          defaultValue={type === "whv" ? "Léa Marchand" : "Riverina Citrus"}
          leading={<User2 className="h-4 w-4" strokeWidth={1.75} />}
        />
      </Field>
      <Field label="Email (private)" required>
        <Input
          type="email"
          placeholder="you@example.com"
          defaultValue="lea@example.com"
          leading={<Mail className="h-4 w-4" strokeWidth={1.75} />}
        />
      </Field>
      <Field label="Phone (private)" required>
        <Input
          type="tel"
          placeholder="+61 4xx xxx xxx"
          defaultValue="+61 412 345 678"
          leading={<Phone className="h-4 w-4" strokeWidth={1.75} />}
        />
      </Field>
      <Field
        label="Password"
        helper="At least 8 characters · one number"
        required
      >
        <Input
          type="password"
          placeholder="••••••••"
          defaultValue="prototype"
          leading={<Lock className="h-4 w-4" strokeWidth={1.75} />}
        />
      </Field>
    </div>

    <div className="mt-7 flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={onBack}
        leadingIcon={<ArrowLeft className="h-4 w-4" strokeWidth={2} />}
      >
        Back
      </Button>
      <Button
        onClick={onNext}
        trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2.25} />}
      >
        Continue
      </Button>
    </div>
  </div>
);

const Step3: React.FC<{
  agreed: boolean;
  setAgreed: (b: boolean) => void;
  onBack: () => void;
  onSubmit: () => void;
}> = ({ agreed, setAgreed, onBack, onSubmit }) => (
  <div>
    <h2 className="text-xl font-bold tracking-p3-tight text-p3-ink">
      Where in Australia?
    </h2>
    <p className="mt-1.5 text-sm text-p3-ink-2">
      We filter community, jobs and events to your city. You can change this
      anytime — relocation is part of WHV life.
    </p>

    <div className="mt-6 space-y-4">
      <Field label="Current Australian city" required>
        <Select defaultValue="Sydney">
          {["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Cairns", "Byron Bay", "Darwin"].map(
            (c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ),
          )}
        </Select>
      </Field>
      <Field label="Visa subclass" required>
        <Select defaultValue="417">
          <option value="417">417 — Working Holiday</option>
          <option value="462">462 — Work & Holiday</option>
          <option value="other">Other / unsure</option>
        </Select>
      </Field>
      <Field
        label="When did you / will you arrive?"
        helper="Used to surface relevant onboarding tips."
        required
      >
        <Input type="date" defaultValue="2026-04-12" leading={<MapPin className="h-4 w-4" strokeWidth={1.75} />} />
      </Field>

      <Checkbox
        checked={agreed}
        onChange={setAgreed}
        label="I agree to the Terms of Service and Privacy Policy"
        description="Compliant with the Australian Privacy Principles. Your email and phone stay private unless you share them in a chat or an offer."
      />
    </div>

    <div className="mt-7 flex items-center justify-between">
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
        disabled={!agreed}
        trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2.25} />}
      >
        Open my home screen
      </Button>
    </div>
  </div>
);
