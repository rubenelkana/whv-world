import Link from "next/link";
import {
  ArrowRight,
  Check,
  Landmark,
  Smartphone,
  BadgeCheck,
  Calculator,
  ShieldCheck,
  Home,
  LifeBuoy,
  MessagesSquare,
} from "lucide-react";
import { AppNavP3 } from "@/components/p3/layout/app-nav";
import { MobileTabBar } from "@/components/p3/layout/mobile-tabbar";
import { Card, CardTitle, CardSubtitle } from "@/components/p3/ui/card";
import { Button } from "@/components/p3/ui/button";
import { Badge } from "@/components/p3/ui/badge";
import { Divider } from "@/components/p3/ui/divider";
import { me } from "@/lib/mock-p3";

const BASE = "/prototype2";

interface Item {
  id: string;
  label: string;
  done: boolean;
  href?: string;
  icon: React.ElementType;
  tone:
    | "brand"
    | "mint"
    | "coral"
    | "amber"
    | "indigo"
    | "emerald"
    | "sky"
    | "violet"
    | "orange"
    | "rose";
  blurb: string;
  duration: string;
}

const items: Item[] = [
  {
    id: "bank",
    label: "Open an Aussie bank account",
    done: true,
    href: `${BASE}/services/bank-setup`,
    icon: Landmark,
    tone: "indigo",
    blurb: "Start the application online before you arrive — finish in a branch with your passport.",
    duration: "~15 min online",
  },
  {
    id: "sim",
    label: "Get an Aussie SIM",
    done: true,
    icon: Smartphone,
    tone: "sky",
    blurb: "Most carriers (Telstra, Optus, Boost) sell prepaid SIMs at airport kiosks and convenience stores.",
    duration: "~10 min at airport",
  },
  {
    id: "community",
    label: "Join your city's community channels",
    done: true,
    href: `${BASE}/community`,
    icon: MessagesSquare,
    tone: "brand",
    blurb: "You're auto-joined to #sydney-general, #sydney-housing, and #sydney-jobs.",
    duration: "Automatic",
  },
  {
    id: "tfn",
    label: "Apply for a Tax File Number (TFN)",
    done: false,
    href: `${BASE}/services/tax-agents`,
    icon: Calculator,
    tone: "emerald",
    blurb: "Free, online via ATO. Most employers ask for it within your first 28 days of work.",
    duration: "~10 min online",
  },
  {
    id: "rsa",
    label: "Get an RSA certificate (if hospo)",
    done: false,
    href: `${BASE}/services/certification`,
    icon: BadgeCheck,
    tone: "amber",
    blurb: "Required for bars and many cafes. ~$45–95, online, same-day certificate.",
    duration: "~3 hours online",
  },
  {
    id: "insurance",
    label: "Sort OVHC / travel insurance",
    done: false,
    href: `${BASE}/services/insurance`,
    icon: ShieldCheck,
    tone: "sky",
    blurb: "Medicare doesn't cover most WHVers. A single ER visit without OVHC can cost $3,000+.",
    duration: "~20 min to quote",
  },
  {
    id: "accom",
    label: "Move into a longer-term stay",
    done: false,
    href: `${BASE}/services/accommodation`,
    icon: Home,
    tone: "orange",
    blurb: "Most WHVers move from hostel → share-house within 1–3 weeks of arrival.",
    duration: "1–2 weeks of viewings",
  },
  {
    id: "support",
    label: "Save emergency numbers",
    done: false,
    href: `${BASE}/services/support`,
    icon: LifeBuoy,
    tone: "rose",
    blurb: "000 (emergency), 13 11 14 (Lifeline), 131 450 (free interpreter), Fair Work Ombudsman.",
    duration: "~2 min",
  },
];

export default function OnboardingChecklistP3() {
  const done = items.filter((i) => i.done).length;
  const pct = Math.round((done / items.length) * 100);

  return (
    <>
      <AppNavP3 city={me.city} unread={3} />

      <main className="mx-auto max-w-p3-narrow px-5 pb-24 pt-6 md:pb-10 md:max-w-[820px]">
        <div className="mb-2 font-p3-mono text-[11px] uppercase tracking-[0.18em] text-p3-brand">
          First 30 days · Onboarding
        </div>
        <h1 className="text-3xl font-extrabold tracking-p3-tight text-p3-ink md:text-4xl">
          Your settle-in checklist
        </h1>
        <p className="mt-2 text-sm text-p3-ink-2">
          The 8 things most WHV holders do in their first month. Tick them off
          as you go — we'll point you to a provider for each.
        </p>

        {/* Progress card */}
        <Card lifted className="mt-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Progress · {done} of {items.length}</CardTitle>
              <CardSubtitle>
                You're {pct}% sorted. {items.length - done} steps to go.
              </CardSubtitle>
            </div>
            <span className="font-p3-mono text-2xl font-bold tracking-p3-tight text-p3-brand">
              {pct}%
            </span>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-p3-surface">
            <div
              className="h-full rounded-full bg-gradient-to-r from-p3-brand via-p3-accent-mint to-p3-accent-coral transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </Card>

        <Divider className="my-8" />

        <ol className="space-y-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <li key={it.id}>
                <Card
                  className={
                    it.done ? "border-p3-success/30 bg-p3-success-soft/30" : ""
                  }
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={
                        "grid h-11 w-11 shrink-0 place-items-center rounded-p3-md " +
                        (it.done
                          ? "bg-p3-success text-white"
                          : "bg-p3-surface text-p3-ink-2")
                      }
                    >
                      {it.done ? (
                        <Check className="h-5 w-5" strokeWidth={3} />
                      ) : (
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-p3-mono text-[10px] text-p3-ink-3">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3
                          className={
                            "text-base font-bold tracking-p3-tight " +
                            (it.done
                              ? "text-p3-ink-3 line-through"
                              : "text-p3-ink")
                          }
                        >
                          {it.label}
                        </h3>
                        {it.done && (
                          <Badge tone="success" size="sm">
                            Done
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-p3-ink-2">{it.blurb}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <Badge tone="neutral" size="sm">
                          {it.duration}
                        </Badge>
                        {!it.done && it.href && (
                          <Link
                            href={it.href}
                            className="inline-flex items-center gap-1 text-xs font-bold text-p3-brand hover:underline"
                          >
                            Go to step
                            <ArrowRight className="h-3 w-3" strokeWidth={2.25} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ol>

        <Card className="mt-8 border-p3-brand/20 bg-p3-brand-tint">
          <div className="flex items-start gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-p3-md bg-p3-brand text-white">
              <BadgeCheck className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <CardTitle>Finished early?</CardTitle>
              <CardSubtitle>
                Start the 88-day specified-work plan for your second-year visa.
                We have a guide and MARA-registered agents ready.
              </CardSubtitle>
              <Link href={`${BASE}/services/migration`}>
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-4"
                  trailingIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />}
                >
                  Open Migration
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </main>
      <MobileTabBar />
    </>
  );
}
