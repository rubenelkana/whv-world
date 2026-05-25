import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Sparkles,
  Workflow,
  ShieldCheck,
  Repeat,
  LifeBuoy,
  LineChart,
  Quote,
  Check,
} from "lucide-react";
import { MarketingNav } from "@/components/p2/layout/marketing-nav";
import { MarketingFooter } from "@/components/p2/layout/marketing-footer";
import { Section } from "@/components/p2/brand/marketing-section";
import { PipelineVisual } from "@/components/p2/brand/pipeline-visual";
import { Button } from "@/components/p2/ui/button";
import { Badge } from "@/components/p2/ui/badge";
import { Avatar } from "@/components/p2/ui/avatar";

const BASE = "/prototype-business-plan";

export default function LandingPage() {
  return (
    <>
      <MarketingNav />
      <main>
        <Hero />
        <ProblemBand />
        <SolutionSection />
        <HowItWorksSection />
        <AudienceSplit />
        <ProofSection />
        <PricingTeaser />
        <FounderNote />
        <FinalCTA />
      </main>
      <MarketingFooter />
    </>
  );
}

// --- Hero --------------------------------------------------------------------

const Hero: React.FC = () => (
  <section className="p2-hero-gradient relative overflow-hidden">
    <div className="mx-auto grid max-w-p2-page gap-14 px-6 pb-24 pt-16 md:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
      <div className="flex flex-col justify-center">
        <Badge tone="accent" size="md" className="self-start">
          <Sparkles className="h-3 w-3" strokeWidth={2.5} />
          Workforce ERP for Seasonal WHV Hiring
        </Badge>
        <h1 className="p2-display mt-6 text-[58px] font-medium leading-[1.02] tracking-p2-tighter text-p2-ink md:text-[72px]">
          Your workers
          <br />
          actually <em className="not-italic text-p2-brand">show up.</em>
          <br />
          Or you{" "}
          <span className="underline decoration-p2-accent decoration-[6px] underline-offset-[10px]">
            know
          </span>{" "}
          before they don't.
        </h1>

        <p className="mt-7 max-w-xl text-lg text-p2-ink-2">
          WHV World turns informal job promises into{" "}
          <span className="text-p2-ink">structured, verified, monitored
          commitments</span>{" "}
          — so seasonal employers and recruitment agencies stop losing AUD $5,500
          every time a worker no-shows.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href={`${BASE}/signup`}>
            <Button
              size="lg"
              trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
            >
              Start your pilot — 1 free hire
            </Button>
          </Link>
          <Link href={`${BASE}/dashboard`}>
            <Button
              size="lg"
              variant="secondary"
              trailingIcon={
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              }
            >
              See a live pipeline
            </Button>
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-3 text-xs text-p2-ink-2">
          <div className="flex -space-x-2">
            <Avatar name="Léa" seed="lea-marchand-fr" nationality="FR" size={28} />
            <Avatar name="Liam" seed="liam-carter-gb" nationality="GB" size={28} />
            <Avatar name="Mia" seed="mia-bauer-de" nationality="DE" size={28} />
            <Avatar name="Bayu" seed="bayu-pratama-id" nationality="ID" size={28} />
          </div>
          <p>
            <span className="font-semibold text-p2-ink">25 workers</span> in
            today's verified database · screened by humans, monitored by
            software.
          </p>
        </div>
      </div>

      <div className="relative lg:pl-6">
        <div className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-p2-accent/10 via-transparent to-p2-brand-2/10 blur-2xl" />
        <PipelineVisual />
      </div>
    </div>

    <div className="border-t border-p2-line bg-white/50 backdrop-blur">
      <div className="mx-auto flex max-w-p2-page flex-wrap items-center gap-x-10 gap-y-3 px-6 py-4 text-xs text-p2-ink-3">
        <span className="font-p2-mono uppercase tracking-widest">
          Built for
        </span>
        {[
          "Riverina Citrus",
          "Tully Sugar Co.",
          "Margaret River Wine Estates",
          "Cape Reef Lodge",
          "Outback Recruitment Partners",
          "Mildura Vine House",
        ].map((c) => (
          <span key={c} className="text-sm text-p2-ink-2">
            {c}
          </span>
        ))}
      </div>
    </div>
  </section>
);

// --- Problem stats band ------------------------------------------------------

const ProblemBand: React.FC = () => (
  <section className="bg-p2-ink py-16 text-white">
    <div className="mx-auto max-w-p2-page px-6">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="mb-3 font-p2-mono text-[11px] uppercase tracking-[0.18em] text-p2-accent">
            The cost of guessing
          </div>
          <h2 className="p2-display max-w-2xl text-3xl font-medium md:text-4xl">
            Seasonal hiring breaks in the seven days between offer and start.
          </h2>
        </div>
        <p className="hidden max-w-sm text-sm text-white/60 md:block">
          Numbers from the AU WHV market — Department of Home Affairs (2024),
          ABS labour data, and 20-respondent agency/worker survey from the WHV
          World business plan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatTile
          headline="$5,500"
          label="Average replacement cost per failed WHV hire"
        />
        <StatTile
          headline="224,431"
          label="WHV visas granted in AU last financial year"
        />
        <StatTile
          headline="~30%"
          label="Of seasonal placements impacted by no-shows or late drop-outs"
        />
        <StatTile
          headline="6,853"
          label="WHV-relevant hiring orgs in Australia today"
        />
      </div>
    </div>
  </section>
);

const StatTile: React.FC<{ headline: string; label: string }> = ({
  headline,
  label,
}) => (
  <div className="rounded-p2-lg border border-white/10 bg-white/[0.03] p-6">
    <div className="p2-display text-4xl font-medium tracking-p2-tighter text-white md:text-5xl">
      {headline}
    </div>
    <p className="mt-3 text-sm text-white/70">{label}</p>
  </div>
);

// --- Solution: 5 modules -----------------------------------------------------

const modules = [
  {
    icon: Workflow,
    title: "Automated matching",
    body:
      "Match WHV workers to roles based on visa subclass, in-Australia arrival window, and start-date availability — not generic keyword search.",
  },
  {
    icon: ShieldCheck,
    title: "Commitment check",
    body:
      "Digital confirmation of visa status, arrival timeline, role expectations, and signed agreement. Status only moves to ‘Committed' once verified.",
  },
  {
    icon: Repeat,
    title: "Reconfirmation & monitoring",
    body:
      "Automated 7-day and 48-hour checkpoints before start. Workers reconfirm in-app or SMS — silence triggers an alert, not a surprise.",
  },
  {
    icon: LifeBuoy,
    title: "Backup option",
    body:
      "If a placement is wobbling, the system surfaces ready-to-go backup candidates from your database. Promote one before harvest day.",
  },
  {
    icon: LineChart,
    title: "Reliability tracking",
    body:
      "Post-start retention: did they arrive on time, did they stay through week one? Reliability scores compound across your worker pool.",
  },
];

const SolutionSection: React.FC = () => (
  <Section
    id="solution"
    eyebrow="The five modules"
    title={
      <>
        We&rsquo;re not a job board. We&rsquo;re the layer that comes{" "}
        <em className="not-italic text-p2-brand">after</em> the offer.
      </>
    }
    intro="Job boards optimise for posting and applying. WHV World optimises for the seven days that decide whether a placement actually happens."
  >
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((m, i) => {
        const Icon = m.icon;
        return (
          <article
            key={m.title}
            className="group relative flex h-full flex-col rounded-p2-lg border border-p2-line bg-white p-6 shadow-p2-sm transition-shadow hover:shadow-p2-md"
          >
            <div className="mb-5 flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-p2-md bg-p2-ink text-white">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="font-p2-mono text-[11px] text-p2-ink-3">
                0{i + 1}
              </span>
            </div>
            <h3 className="text-lg font-semibold tracking-p2-tight text-p2-ink">
              {m.title}
            </h3>
            <p className="mt-2 text-sm text-p2-ink-2">{m.body}</p>
          </article>
        );
      })}

      <article className="relative flex flex-col justify-between overflow-hidden rounded-p2-lg bg-p2-brand p-6 text-white shadow-p2-md">
        <div>
          <div className="mb-3 font-p2-mono text-[11px] uppercase tracking-widest text-p2-accent">
            The thing competitors can&rsquo;t copy
          </div>
          <h3 className="p2-display text-2xl font-medium leading-snug">
            All five modules running on the same worker record, the same job,
            the same employer.
          </h3>
        </div>
        <p className="mt-6 text-sm text-white/70">
          Seek lists. Agencies coordinate. Government schemes regulate. We are
          the only system tracking commitment as a state machine.
        </p>
      </article>
    </div>
  </Section>
);

// --- How it works ------------------------------------------------------------

const HowItWorksSection: React.FC = () => (
  <Section
    id="how-it-works"
    tone="cream"
    eyebrow="How it works"
    title="A workflow you can run during morning coffee."
    intro="Three loops, one platform. The boring parts (SMS reconfirms, status updates, backup ranking) run in the background while your team focuses on relationships."
  >
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <Step
        number="01"
        title="Source & verify"
        body="Search 25+ verified WHV worker profiles by state, visa, availability, and prior reliability. Send offers in two clicks."
        bullets={[
          "Filter by 462/417, region, English level",
          "See verification badges before you commit",
          "Concierge-screened during early launch",
        ]}
      />
      <Step
        number="02"
        title="Commit & confirm"
        body="Once the worker accepts, the system runs your reconfirmation playbook: 7-day SMS, 48-hour SMS, arrival ping. Silence becomes a visible signal."
        bullets={[
          "Auto-scheduled SMS / email / in-app pings",
          "Status moves from Accepted → Committed only when verified",
          "Risk dial turns amber before it turns red",
        ]}
      />
      <Step
        number="03"
        title="Recover & remember"
        body="If a candidate goes silent, your backup queue is already ranked. After start, retention is tracked so reliability data compounds for next season."
        bullets={[
          "Promote a backup in two clicks",
          "Day-7 retention check feeds reliability score",
          "Better data each season, less guesswork",
        ]}
      />
    </div>
  </Section>
);

const Step: React.FC<{
  number: string;
  title: string;
  body: string;
  bullets: string[];
}> = ({ number, title, body, bullets }) => (
  <article className="relative">
    <div className="mb-5 flex items-baseline gap-4">
      <span className="font-p2-mono text-[44px] font-medium leading-none text-p2-brand">
        {number}
      </span>
      <span className="h-px flex-1 bg-p2-ink/15" />
    </div>
    <h3 className="p2-display text-2xl font-medium tracking-p2-tight text-p2-ink">
      {title}
    </h3>
    <p className="mt-3 text-sm text-p2-ink-2">{body}</p>
    <ul className="mt-5 space-y-2.5">
      {bullets.map((b) => (
        <li key={b} className="flex gap-2.5 text-sm text-p2-ink">
          <Check
            className="mt-0.5 h-4 w-4 shrink-0 text-p2-brand"
            strokeWidth={2.5}
          />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </article>
);

// --- Audience split ----------------------------------------------------------

const AudienceSplit: React.FC = () => (
  <section className="bg-white py-24">
    <div className="mx-auto max-w-p2-page px-6">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="mb-3 font-p2-mono text-[11px] uppercase tracking-widest text-p2-brand">
            Who pays for it
          </div>
          <h2 className="p2-display text-4xl font-medium tracking-p2-tight md:text-5xl">
            Two customers. One system of record.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AudienceCard
          id="for-agencies"
          eyebrow="Recruitment agencies & labour-hire firms"
          title="Place 50–100 WHV workers a year without WhatsApp chaos."
          bullets={[
            "One pipeline view across all employer clients",
            "Bulk reconfirm 40 workers in one tap",
            "Backup queue auto-ranked by reliability",
            "Charge premium for ‘verified commitment' placements",
          ]}
          metric={{ label: "Time saved per placement", value: "~2.4 hrs" }}
          ctaLabel="Run a 5-worker pilot"
          ctaHref={`${BASE}/signup`}
          tone="brand"
        />
        <AudienceCard
          id="for-employers"
          eyebrow="Seasonal employers — farms, vineyards, lodges"
          title="Show up on harvest day with the crew you were promised."
          bullets={[
            "Each worker arrives signed, screened, reconfirmed",
            "Get a red-flag SMS before harvest day, not on it",
            "Backup candidate slotted within 48h of a wobble",
            "Reliability data follows workers across seasons",
          ]}
          metric={{ label: "No-show rate, pilot crews", value: "Under 5%" }}
          ctaLabel="See how it works"
          ctaHref={`${BASE}/dashboard`}
          tone="dark"
        />
      </div>
    </div>
  </section>
);

const AudienceCard: React.FC<{
  id: string;
  eyebrow: string;
  title: string;
  bullets: string[];
  metric: { label: string; value: string };
  ctaLabel: string;
  ctaHref: string;
  tone: "brand" | "dark";
}> = ({ id, eyebrow, title, bullets, metric, ctaLabel, ctaHref, tone }) => (
  <article
    id={id}
    className={
      tone === "brand"
        ? "relative overflow-hidden rounded-p2-xl bg-p2-cream p-10 ring-1 ring-p2-line"
        : "relative overflow-hidden rounded-p2-xl bg-p2-ink p-10 text-white"
    }
  >
    <div
      className={
        "mb-3 font-p2-mono text-[11px] uppercase tracking-widest " +
        (tone === "brand" ? "text-p2-brand" : "text-p2-accent")
      }
    >
      {eyebrow}
    </div>
    <h3
      className={
        "p2-display max-w-md text-3xl font-medium leading-tight tracking-p2-tight " +
        (tone === "brand" ? "text-p2-ink" : "text-white")
      }
    >
      {title}
    </h3>
    <ul className="mt-6 grid grid-cols-1 gap-2.5">
      {bullets.map((b) => (
        <li
          key={b}
          className={
            "flex gap-2.5 text-sm " +
            (tone === "brand" ? "text-p2-ink" : "text-white/85")
          }
        >
          <Check
            className={
              "mt-0.5 h-4 w-4 shrink-0 " +
              (tone === "brand" ? "text-p2-brand" : "text-p2-accent")
            }
            strokeWidth={2.5}
          />
          {b}
        </li>
      ))}
    </ul>
    <div
      className={
        "mt-8 flex flex-wrap items-end justify-between gap-4 border-t pt-6 " +
        (tone === "brand" ? "border-p2-line" : "border-white/10")
      }
    >
      <div>
        <div
          className={
            "font-p2-mono text-[10px] uppercase tracking-widest " +
            (tone === "brand" ? "text-p2-ink-3" : "text-white/50")
          }
        >
          {metric.label}
        </div>
        <div
          className={
            "p2-display text-2xl font-medium " +
            (tone === "brand" ? "text-p2-ink" : "text-white")
          }
        >
          {metric.value}
        </div>
      </div>
      <Link href={ctaHref}>
        <Button
          variant={tone === "brand" ? "primary" : "secondary"}
          trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
        >
          {ctaLabel}
        </Button>
      </Link>
    </div>
  </article>
);

// --- Proof / quote -----------------------------------------------------------

const ProofSection: React.FC = () => (
  <section className="bg-p2-paper py-24">
    <div className="mx-auto grid max-w-p2-page grid-cols-1 gap-12 px-6 lg:grid-cols-[1.05fr_1fr]">
      <figure className="relative">
        <Quote
          className="absolute -left-2 -top-4 h-12 w-12 text-p2-accent/30"
          strokeWidth={1}
        />
        <blockquote className="p2-display relative text-3xl font-medium leading-snug tracking-p2-tight text-p2-ink md:text-4xl">
          &ldquo;Adoption of a new system depends on addressing human, process,
          and technical factors simultaneously. WHV World is the first tool we
          looked at that didn&rsquo;t pretend the human part was easy.&rdquo;
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3 text-sm text-p2-ink-2">
          <Avatar name="Pilot Employer" seed="pilot-grower-au" size={32} />
          <span>
            <span className="block font-medium text-p2-ink">
              Pilot horticulture employer
            </span>
            <span className="block text-xs text-p2-ink-3">
              Survey response · WHV World business plan, 2026
            </span>
          </span>
        </figcaption>
      </figure>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Pilot agencies", value: "5–10" },
          { label: "Worker profiles", value: "500+ Y1" },
          { label: "Reconfirm cadence", value: "7d · 48h" },
          { label: "Backup latency", value: "< 2h" },
          { label: "Capital to break-even", value: "~$200K" },
          { label: "First profit", value: "Year 5" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-p2-lg border border-p2-line bg-white p-5"
          >
            <div className="font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
              {m.label}
            </div>
            <div className="p2-display mt-2 text-2xl font-medium text-p2-ink">
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Pricing teaser ----------------------------------------------------------

const PricingTeaser: React.FC = () => (
  <Section
    tone="cream"
    eyebrow="Pricing built for adoption"
    title="Start with one free hire. Pay for the candidates you actually unlock."
    intro="A hybrid model: low-friction transaction pricing for agencies trying us out, annual tiers as your placement volume grows."
  >
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {[
        {
          name: "Trial",
          price: "Free",
          per: "1 hire + 1 backup",
          for: "Pilot agencies & first-time employers",
          features: [
            "Unlock 1 worker",
            "1 backup candidate slot",
            "Full pipeline + reconfirmation",
            "Concierge support",
          ],
          accent: false,
        },
        {
          name: "Tier 1",
          price: "AUD $500",
          per: "per year",
          for: "Small to medium agencies",
          features: [
            "Unlimited reconfirmation",
            "All five modules",
            "Reliability analytics",
            "Up to 60 unlocks · then $20 each",
          ],
          accent: true,
        },
        {
          name: "Tier 2",
          price: "AUD $1,000",
          per: "per year",
          for: "High-volume agencies",
          features: [
            "Everything in Tier 1",
            "Unlimited unlocks",
            "Custom branding on contracts",
            "Dedicated account manager",
          ],
          accent: false,
        },
      ].map((p) => (
        <article
          key={p.name}
          className={
            p.accent
              ? "relative -translate-y-2 rounded-p2-xl border-2 border-p2-brand bg-white p-6 shadow-p2-md"
              : "rounded-p2-xl border border-p2-line bg-white p-6"
          }
        >
          {p.accent && (
            <Badge tone="brand" className="absolute right-5 top-5">
              Most adopted
            </Badge>
          )}
          <div className="font-p2-mono text-[11px] uppercase tracking-widest text-p2-ink-3">
            {p.name}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="p2-display text-4xl font-medium text-p2-ink">
              {p.price}
            </span>
            <span className="text-sm text-p2-ink-2">{p.per}</span>
          </div>
          <p className="mt-2 text-sm text-p2-ink-2">{p.for}</p>
          <ul className="mt-5 space-y-2 text-sm text-p2-ink">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-p2-brand"
                  strokeWidth={2.5}
                />
                {f}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
    <div className="mt-10 flex justify-center">
      <Link href={`${BASE}/pricing`}>
        <Button
          variant="ghost"
          trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={1.75} />}
        >
          See full pricing & comparison
        </Button>
      </Link>
    </div>
  </Section>
);

// --- Founder note ------------------------------------------------------------

const FounderNote: React.FC = () => (
  <section className="bg-white py-24">
    <div className="mx-auto grid max-w-p2-narrow grid-cols-1 gap-10 px-6 lg:grid-cols-[auto_1fr]">
      <Avatar name="Lidya Setyawati" seed="lidya-setyawati" size={96} />
      <div>
        <div className="mb-3 font-p2-mono text-[11px] uppercase tracking-widest text-p2-brand">
          Note from the founder
        </div>
        <p className="p2-display text-2xl font-medium leading-snug tracking-p2-tight text-p2-ink md:text-3xl">
          &ldquo;I built WHV World because the seven days between a worker
          saying ‘yes' and a worker showing up should not be the most fragile
          part of seasonal hiring in Australia.&rdquo;
        </p>
        <p className="mt-5 max-w-prose text-sm text-p2-ink-2">
          We start as a concierge service: humans verify every profile, every
          reconfirmation, every backup. Then we&rsquo;ll productise the parts
          that prove themselves. The platform is for agencies and employers, but
          everything we build improves the experience of the workers themselves
          — because their reliability is the asset we&rsquo;re protecting.
        </p>
        <p className="mt-4 text-sm text-p2-ink-2">
          — Lidya Setyawati, Founder & CEO ·{" "}
          <span className="font-p2-mono text-p2-ink-3">
            PT. Langkah Inovasi Digital
          </span>
        </p>
      </div>
    </div>
  </section>
);

// --- Final CTA ---------------------------------------------------------------

const FinalCTA: React.FC = () => (
  <section className="relative overflow-hidden bg-p2-ink text-white">
    <div className="absolute inset-0 -z-0 opacity-50">
      <div className="absolute -left-32 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-p2-brand-2/20 blur-3xl" />
      <div className="absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-p2-accent/15 blur-3xl" />
    </div>
    <div className="relative mx-auto flex max-w-p2-page flex-col items-start gap-10 px-6 py-24 md:flex-row md:items-center md:justify-between">
      <div className="max-w-2xl">
        <Badge tone="accent" outline className="mb-5">
          <Calendar className="h-3 w-3" strokeWidth={2} />
          Vintage, harvest, mustering — book your pilot
        </Badge>
        <h2 className="p2-display text-4xl font-medium leading-tight tracking-p2-tight md:text-5xl">
          One free verified hire. One backup. No card.
        </h2>
        <p className="mt-4 max-w-lg text-white/70">
          We&rsquo;ll concierge your first placement end-to-end while you
          evaluate the platform. Most pilots are live within 5 working days of a
          first call.
        </p>
      </div>
      <div className="flex flex-col items-start gap-3 md:items-end">
        <Link href={`${BASE}/signup`}>
          <Button
            size="lg"
            trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
          >
            Start your pilot
          </Button>
        </Link>
        <a
          href="mailto:Sales@braviconsults.com"
          className="text-sm text-white/60 underline-offset-4 hover:underline"
        >
          or email Sales@braviconsults.com
        </a>
      </div>
    </div>
  </section>
);
