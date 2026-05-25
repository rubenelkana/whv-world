"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Briefcase,
  MapPin,
  Calendar,
  Users as UsersIcon,
  Banknote,
  Bed,
  Check,
  Sparkles,
} from "lucide-react";
import { Topbar } from "@/components/p2/layout/topbar";
import { Button } from "@/components/p2/ui/button";
import { Input, Field } from "@/components/p2/ui/input";
import { Select } from "@/components/p2/ui/select";
import { Textarea } from "@/components/p2/ui/textarea";
import { Checkbox } from "@/components/p2/ui/checkbox";
import { Card, CardTitle, CardSubtitle } from "@/components/p2/ui/card";
import { Badge } from "@/components/p2/ui/badge";
import { cn } from "@/lib/cn";

const BASE = "/prototype-business-plan/dashboard";

export default function NewJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [accommodation, setAccommodation] = useState(true);
  const [ppe, setPpe] = useState(true);
  return (
    <>
      <Topbar
        breadcrumbs={[
          { label: "Riverina Citrus" },
          { label: "Jobs" },
          { label: "New job" },
        ]}
      />
      <div className="mx-auto w-full max-w-[960px] px-6 py-8">
        <div className="mb-6">
          <h1 className="p2-display text-3xl font-medium tracking-p2-tight text-p2-ink">
            Post a new job
          </h1>
          <p className="mt-1.5 text-sm text-p2-ink-2">
            Three short steps — once posted, matched candidates appear in your
            pipeline within minutes.
          </p>
        </div>

        <Stepper current={step} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            {step === 1 && (
              <Step1
                accommodation={accommodation}
                setAccommodation={setAccommodation}
                ppe={ppe}
                setPpe={setPpe}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step2 onNext={() => setStep(3)} onBack={() => setStep(1)} />
            )}
            {step === 3 && (
              <Step3
                onBack={() => setStep(2)}
                onSubmit={() => router.push(`${BASE}/jobs/j_001`)}
              />
            )}
          </Card>

          <PreviewCard />
        </div>
      </div>
    </>
  );
}

const Stepper: React.FC<{ current: number }> = ({ current }) => {
  const labels = ["Role & location", "Crew & requirements", "Review & post"];
  return (
    <ol className="flex items-center gap-3">
      {labels.map((l, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={l} className="flex flex-1 items-center gap-3">
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
                done || active ? "text-p2-ink" : "text-p2-ink-3",
              )}
            >
              {l}
            </span>
            {i < labels.length - 1 && (
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
};

const Step1: React.FC<{
  accommodation: boolean;
  setAccommodation: (b: boolean) => void;
  ppe: boolean;
  setPpe: (b: boolean) => void;
  onNext: () => void;
}> = ({ accommodation, setAccommodation, ppe, setPpe, onNext }) => (
  <div>
    <h2 className="text-lg font-semibold tracking-p2-tight text-p2-ink">
      Role & location
    </h2>
    <p className="mt-1 text-sm text-p2-ink-2">
      What you're hiring for and where the work takes place.
    </p>

    <div className="mt-5 space-y-4">
      <Field label="Job title">
        <Input
          placeholder="Mandarin Pickers (Crew of 12)"
          defaultValue="Mandarin Pickers (Crew of 12)"
          leading={<Briefcase className="h-4 w-4" strokeWidth={1.5} />}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Industry">
          <Select defaultValue="horticulture">
            <option value="horticulture">Horticulture</option>
            <option value="agriculture">Agriculture</option>
            <option value="hospitality">Hospitality</option>
            <option value="tourism">Tourism</option>
            <option value="construction">Construction</option>
          </Select>
        </Field>
        <Field label="Employer">
          <Select defaultValue="riverina-citrus">
            <option value="riverina-citrus">Riverina Citrus</option>
            <option value="tully-sugar-co">Tully Sugar Co.</option>
            <option value="mildura-vine-house">Mildura Vine House</option>
          </Select>
        </Field>
        <Field label="Town">
          <Input
            placeholder="Griffith"
            defaultValue="Griffith"
            leading={<MapPin className="h-4 w-4" strokeWidth={1.5} />}
          />
        </Field>
        <Field label="State">
          <Select defaultValue="NSW">
            {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Brief description">
        <Textarea
          rows={4}
          defaultValue="Mandarin picking on Riverina Citrus, on-orchard bunkhouse provided. Repeat WHV crews preferred. Award-rate guarantee underwritten."
        />
      </Field>

      <div className="rounded-p2-md border border-p2-line bg-p2-surface-2 p-4">
        <div className="mb-2 text-xs font-semibold text-p2-ink">On-site basics</div>
        <div className="space-y-2.5">
          <Checkbox
            checked={accommodation}
            onChange={setAccommodation}
            label="Accommodation provided"
            description="Bunkhouse, hostel, or grower-supplied housing on or near site."
          />
          <Checkbox
            checked={ppe}
            onChange={setPpe}
            label="PPE provided"
            description="Hi-vis, gloves, sun hat — anything supplied free to the worker."
          />
        </div>
      </div>
    </div>

    <div className="mt-7 flex justify-end">
      <Button
        onClick={onNext}
        trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
      >
        Continue
      </Button>
    </div>
  </div>
);

const Step2: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => (
  <div>
    <h2 className="text-lg font-semibold tracking-p2-tight text-p2-ink">
      Crew & requirements
    </h2>
    <p className="mt-1 text-sm text-p2-ink-2">
      Headcount, dates, pay rate, and any worker requirements.
    </p>

    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Field label="Headcount needed">
        <Input
          type="number"
          defaultValue={12}
          leading={<UsersIcon className="h-4 w-4" strokeWidth={1.5} />}
        />
      </Field>
      <Field label="Visa subclass">
        <Select defaultValue="both">
          <option value="both">Accept 417 and 462</option>
          <option value="417">417 only</option>
          <option value="462">462 only</option>
        </Select>
      </Field>
      <Field label="Start date">
        <Input
          type="date"
          defaultValue="2026-06-08"
          leading={<Calendar className="h-4 w-4" strokeWidth={1.5} />}
        />
      </Field>
      <Field label="End date">
        <Input
          type="date"
          defaultValue="2026-08-30"
          leading={<Calendar className="h-4 w-4" strokeWidth={1.5} />}
        />
      </Field>
      <Field label="Pay rate">
        <Input
          defaultValue="0.38"
          leading={<Banknote className="h-4 w-4" strokeWidth={1.5} />}
        />
      </Field>
      <Field label="Pay unit">
        <Select defaultValue="piece">
          <option value="hour">Per hour</option>
          <option value="piece">Per piece</option>
          <option value="day">Per day</option>
        </Select>
      </Field>
      <Field label="Minimum English">
        <Select defaultValue="basic">
          <option value="basic">Basic</option>
          <option value="conversational">Conversational</option>
          <option value="fluent">Fluent</option>
        </Select>
      </Field>
      <Field label="Driving licence required">
        <Select defaultValue="no">
          <option value="no">Not required</option>
          <option value="yes">Required</option>
        </Select>
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
        trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
      >
        Continue
      </Button>
    </div>
  </div>
);

const Step3: React.FC<{ onBack: () => void; onSubmit: () => void }> = ({
  onBack,
  onSubmit,
}) => (
  <div>
    <h2 className="text-lg font-semibold tracking-p2-tight text-p2-ink">
      Review & post
    </h2>
    <p className="mt-1 text-sm text-p2-ink-2">
      Once posted, the system runs an initial match against your worker database
      and surfaces the top 10 candidates in the new pipeline.
    </p>

    <div className="mt-5 space-y-3 rounded-p2-md border border-p2-line bg-p2-surface-2 p-4 text-sm">
      <Row k="Job title" v="Mandarin Pickers (Crew of 12)" />
      <Row k="Employer" v="Riverina Citrus" />
      <Row k="Where & when" v="Griffith NSW · 8 Jun – 30 Aug 2026" />
      <Row k="Headcount · visa" v="12 workers · 417 + 462" />
      <Row k="Pay" v="$0.38 / piece, award-rate guarantee" />
      <Row k="Reconfirmation cadence" v="7-day SMS · 48-hour SMS · arrival ping · day-7 retention" />
    </div>

    <div className="mt-5 rounded-p2-md border border-dashed border-p2-brand/40 bg-p2-brand/5 p-4">
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-p2-brand">
        <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
        Concierge boost (pilot)
      </div>
      <p className="text-xs text-p2-ink-2">
        Our team will personally screen the first 10 matches before they hit
        your pipeline. No additional cost during pilot.
      </p>
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
        trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
      >
        Post job & open pipeline
      </Button>
    </div>
  </div>
);

const Row: React.FC<{ k: string; v: string }> = ({ k, v }) => (
  <div className="flex items-baseline gap-4">
    <span className="w-44 shrink-0 font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
      {k}
    </span>
    <span className="flex-1 text-p2-ink">{v}</span>
  </div>
);

const PreviewCard: React.FC = () => (
  <Card>
    <CardTitle>Live preview</CardTitle>
    <CardSubtitle>How candidates will see the role</CardSubtitle>
    <div className="mt-4 rounded-p2-md border border-p2-line bg-p2-surface-2 p-4">
      <Badge tone="brand" outline size="sm" className="mb-2">
        Horticulture · Griffith NSW
      </Badge>
      <div className="font-semibold text-p2-ink">Mandarin Pickers (Crew of 12)</div>
      <div className="mt-1 text-xs text-p2-ink-2">
        Riverina Citrus · 8 Jun – 30 Aug 2026
      </div>
      <ul className="mt-3 space-y-1 text-xs text-p2-ink-2">
        <li className="flex items-center gap-1.5">
          <Bed className="h-3 w-3 text-p2-ink-3" strokeWidth={1.5} />
          Accommodation provided (bunkhouse)
        </li>
        <li className="flex items-center gap-1.5">
          <Banknote className="h-3 w-3 text-p2-ink-3" strokeWidth={1.5} />
          $0.38/piece · award-rate floor
        </li>
        <li className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3 text-p2-ink-3" strokeWidth={1.5} />
          7-day + 48-hour reconfirm before start
        </li>
      </ul>
    </div>
  </Card>
);
