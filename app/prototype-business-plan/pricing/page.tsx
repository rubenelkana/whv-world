import Link from "next/link";
import { ArrowRight, Check, X, Sparkles, Calendar } from "lucide-react";
import { MarketingNav } from "@/components/p2/layout/marketing-nav";
import { MarketingFooter } from "@/components/p2/layout/marketing-footer";
import { Section } from "@/components/p2/brand/marketing-section";
import { Button } from "@/components/p2/ui/button";
import { Badge } from "@/components/p2/ui/badge";

const BASE = "/prototype-business-plan";

export const metadata = {
  title: "Pricing — WHV World",
  description:
    "Pay-per-candidate, two annual tiers, and a free pilot. Pricing designed so agencies and seasonal employers can adopt WHV World gradually.",
};

export default function PricingPage() {
  return (
    <>
      <MarketingNav />
      <main>
        <Hero />
        <Tiers />
        <Comparison />
        <Faq />
        <FinalCta />
      </main>
      <MarketingFooter />
    </>
  );
}

// --- Hero --------------------------------------------------------------------

const Hero: React.FC = () => (
  <section className="p2-hero-gradient">
    <div className="mx-auto max-w-p2-page px-6 pb-16 pt-20 text-center md:pt-28">
      <Badge tone="brand" outline className="mx-auto mb-5">
        <Sparkles className="h-3 w-3" strokeWidth={2.5} />
        Pricing
      </Badge>
      <h1 className="p2-display text-5xl font-medium leading-[1.05] tracking-p2-tighter text-p2-ink md:text-6xl">
        Pricing that scales with your hiring,
        <br />
        not with your team size.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-p2-ink-2">
        Start with one fully concierged hire, free. Move to annual tiers when
        your placement volume justifies it. No seat fees, no per-employer
        charges.
      </p>
    </div>
  </section>
);

// --- Tiers -------------------------------------------------------------------

const tiers = [
  {
    name: "Trial",
    price: "Free",
    per: "1 hire + 1 backup",
    description:
      "For pilot agencies and first-time seasonal employers evaluating the platform.",
    cta: { label: "Start your pilot", href: `${BASE}/signup` },
    accent: false,
    features: [
      "Unlock 1 verified WHV worker",
      "1 backup candidate slot",
      "Full pipeline + reconfirmation flow",
      "Concierge-led setup & launch",
      "Standard contract template",
    ],
  },
  {
    name: "Tier 1",
    price: "AUD $500",
    per: "per year",
    description:
      "Small to medium agencies and seasonal employers placing under 60 workers per year.",
    cta: { label: "Get Tier 1", href: `${BASE}/signup` },
    accent: true,
    features: [
      "Unlimited reconfirmation cadence (7d / 48h / arrival / day-7)",
      "All five modules",
      "Reliability analytics across cohorts",
      "Up to 60 worker unlocks · $20 each after",
      "Standard contract template + e-sign",
      "Email + chat support",
    ],
  },
  {
    name: "Tier 2",
    price: "AUD $1,000",
    per: "per year",
    description:
      "High-volume agencies and labour-hire firms placing 100+ workers across multiple clients.",
    cta: { label: "Talk to sales", href: "mailto:Sales@braviconsults.com" },
    accent: false,
    features: [
      "Everything in Tier 1",
      "Unlimited worker unlocks",
      "Custom branding on contracts & SMS",
      "Multi-client workspaces",
      "Dedicated account manager",
      "Quarterly reliability benchmarking report",
    ],
  },
];

const Tiers: React.FC = () => (
  <Section
    eyebrow="Choose your tier"
    title="Three ways to start. One thing in common: no surprise charges."
  >
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {tiers.map((t) => (
        <article
          key={t.name}
          className={
            t.accent
              ? "relative flex flex-col rounded-p2-xl border-2 border-p2-brand bg-white p-7 shadow-p2-lg md:-translate-y-2"
              : "relative flex flex-col rounded-p2-xl border border-p2-line bg-white p-7"
          }
        >
          {t.accent && (
            <Badge tone="brand" className="absolute right-6 top-6">
              Most adopted
            </Badge>
          )}
          <div className="font-p2-mono text-[11px] uppercase tracking-widest text-p2-ink-3">
            {t.name}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="p2-display text-4xl font-medium text-p2-ink">
              {t.price}
            </span>
            <span className="text-sm text-p2-ink-2">{t.per}</span>
          </div>
          <p className="mt-2 text-sm text-p2-ink-2">{t.description}</p>

          <ul className="mt-6 flex-1 space-y-2.5 text-sm text-p2-ink">
            {t.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-p2-brand"
                  strokeWidth={2.5}
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link href={t.cta.href} className="mt-7">
            <Button
              variant={t.accent ? "primary" : "secondary"}
              size="lg"
              className="w-full"
              trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
            >
              {t.cta.label}
            </Button>
          </Link>
        </article>
      ))}
    </div>

    <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-p2-lg border border-p2-line bg-p2-cream p-6 md:flex-row md:items-center">
      <div>
        <div className="font-p2-mono text-[11px] uppercase tracking-widest text-p2-brand">
          Add-on
        </div>
        <h3 className="mt-1 text-lg font-semibold tracking-p2-tight text-p2-ink">
          Pay-per-candidate unlock · AUD $20
        </h3>
        <p className="mt-1 text-sm text-p2-ink-2">
          Use on top of any tier (or solo) to unlock a verified candidate
          on-demand. Same five-module workflow applies.
        </p>
      </div>
      <Link href={`${BASE}/signup`}>
        <Button
          variant="ghost"
          trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={1.75} />}
        >
          Start an unlock
        </Button>
      </Link>
    </div>
  </Section>
);

// --- Comparison table --------------------------------------------------------

const rows: { label: string; cells: (string | boolean)[]; note?: string }[] = [
  { label: "Worker unlocks (verified)", cells: ["1", "60 included", "Unlimited"] },
  { label: "Worker database search", cells: [true, true, true] },
  { label: "Job posting & multi-applicant pipeline", cells: [true, true, true] },
  { label: "Automated 7-day SMS reconfirmation", cells: [true, true, true] },
  { label: "Automated 48-hour reconfirmation", cells: [true, true, true] },
  { label: "Arrival ping + day-7 retention check", cells: [true, true, true] },
  { label: "Backup-candidate queue & alerts", cells: [true, true, true] },
  { label: "Reliability analytics (cohort retention)", cells: [false, true, true] },
  { label: "Multi-client workspaces", cells: [false, false, true] },
  { label: "Custom branding on contracts & SMS", cells: [false, false, true] },
  { label: "Dedicated account manager", cells: [false, false, true] },
  {
    label: "Pay-per-candidate add-on price",
    cells: ["$20", "$20 after 60", "Included"],
  },
];

const Comparison: React.FC = () => (
  <Section
    tone="cream"
    eyebrow="What you get"
    title="Side-by-side comparison"
  >
    <div className="overflow-hidden rounded-p2-xl border border-p2-line bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-p2-line bg-p2-surface-2">
            <th className="px-5 py-4 text-left font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
              Feature
            </th>
            {["Trial", "Tier 1", "Tier 2"].map((h, i) => (
              <th
                key={h}
                className={
                  "px-5 py-4 text-center font-semibold " +
                  (i === 1 ? "text-p2-brand" : "text-p2-ink")
                }
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr
              key={r.label}
              className={
                idx % 2 ? "bg-p2-surface-2/40" : "bg-white"
              }
            >
              <td className="px-5 py-3.5 text-p2-ink">{r.label}</td>
              {r.cells.map((c, i) => (
                <td
                  key={i}
                  className="px-5 py-3.5 text-center text-p2-ink-2"
                >
                  {typeof c === "boolean" ? (
                    c ? (
                      <Check
                        className={
                          "mx-auto h-4 w-4 " +
                          (i === 1 ? "text-p2-brand" : "text-p2-success")
                        }
                        strokeWidth={3}
                      />
                    ) : (
                      <X
                        className="mx-auto h-4 w-4 text-p2-ink-4"
                        strokeWidth={2}
                      />
                    )
                  ) : (
                    <span className="font-medium text-p2-ink">{c}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Section>
);

// --- FAQ ---------------------------------------------------------------------

const faqs = [
  {
    q: "Why is the trial fully free instead of credit-card-first?",
    a: "Adoption depends on agencies and employers trusting that the verification actually works. We concierge the first placement end-to-end so you see the system in motion before deciding.",
  },
  {
    q: "How is the worker database built?",
    a: "We source profiles through WHV worker communities (Facebook groups, Telegram channels, in-person at backpacker hostels) and screen each one manually before they're discoverable. Concierge-style during the first year.",
  },
  {
    q: "Do workers pay anything?",
    a: "No. The platform is free for workers — employers and recruitment agencies are the paying side of the marketplace.",
  },
  {
    q: "What happens if a placement falls through?",
    a: "The backup-candidate queue surfaces ranked alternatives in real time. If you promote a backup within 48h of a failed check, no extra unlock charge applies.",
  },
  {
    q: "Are you registered as a labour-hire provider?",
    a: "We are the platform, not the labour-hire provider — your agency or employer holds the relationship and any required licence. We comply with the Privacy Act, Fair Work Act, and applicable state labour-hire licensing rules.",
  },
  {
    q: "What's the difference between Trial and pay-per-candidate?",
    a: "Trial is a one-off ‘full taste' of the system on us. Pay-per-candidate is an ongoing low-commitment way to unlock individual verified workers on top of any plan.",
  },
];

const Faq: React.FC = () => (
  <Section eyebrow="Common questions" title="What pilots usually ask first.">
    <div className="grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group rounded-p2-lg border border-p2-line bg-white p-5 transition-colors open:bg-p2-surface-2"
        >
          <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-medium text-p2-ink marker:hidden">
            <span>{f.q}</span>
            <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-p2-line bg-white text-p2-ink-3 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm text-p2-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  </Section>
);

const FinalCta: React.FC = () => (
  <section className="bg-p2-ink text-white">
    <div className="mx-auto flex max-w-p2-page flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <Badge tone="accent" outline className="mb-5">
          <Calendar className="h-3 w-3" strokeWidth={2} />
          Free pilot, no card required
        </Badge>
        <h2 className="p2-display text-3xl font-medium leading-tight tracking-p2-tight md:text-4xl">
          Run your first verified hire on us.
        </h2>
      </div>
      <Link href={`${BASE}/signup`}>
        <Button
          size="lg"
          trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
        >
          Start the pilot
        </Button>
      </Link>
    </div>
  </section>
);
