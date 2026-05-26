import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MessagesSquare,
  PartyPopper,
  Briefcase,
  BadgeCheck,
  Landmark,
  Calculator,
  ShieldCheck,
  Plane,
  Home as HomeIcon,
  LifeBuoy,
  Sparkles,
  MapPin,
  Bell,
} from "lucide-react";
import { MarketingNavP3 } from "@/components/p3/layout/marketing-nav";
import { MarketingFooterP3 } from "@/components/p3/layout/marketing-footer";
import { Button } from "@/components/p3/ui/button";
import { Badge } from "@/components/p3/ui/badge";
import { Card, CardTitle, CardSubtitle } from "@/components/p3/ui/card";
import { Avatar } from "@/components/p3/ui/avatar";
import { IconCircle } from "@/components/p3/ui/icon-circle";
import { Logo } from "@/components/p3/brand/logo";

const BASE = "/prototype2";

export default function LandingP3() {
  return (
    <>
      <MarketingNavP3 />
      <main>
        <Hero />
        <FeaturesSection />
        <HowItWorksSection />
        <ServicesSection />
        <CommunitySection />
        <TestimonialSection />
        <FinalCta />
      </main>
      <MarketingFooterP3 />
    </>
  );
}

// --- Hero --------------------------------------------------------------------

const Hero: React.FC = () => (
  <section className="p3-hero-mesh relative overflow-hidden">
    <div className="mx-auto grid max-w-p3-page gap-14 px-5 pb-24 pt-16 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div className="flex flex-col justify-center">
        <Badge tone="brand" className="self-start">
          <Sparkles className="h-3 w-3" strokeWidth={2.5} />
          One app for your whole working-holiday year
        </Badge>
        <h1 className="mt-6 text-[48px] font-extrabold leading-[1.02] tracking-p3-tight text-p3-ink md:text-[68px]">
          Your Aussie
          <br />
          adventure,{" "}
          <span className="bg-gradient-to-r from-p3-brand via-p3-accent-mint to-p3-accent-coral bg-clip-text text-transparent">
            actually sorted.
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-lg text-p3-ink-2">
          From your first hostel to your second-year visa — community, jobs,
          events, bank, tax, insurance, migration help. All in one place,
          filtered to your city.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href={`${BASE}/signup`}>
            <Button
              size="lg"
              trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2.25} />}
            >
              Sign up — it's free
            </Button>
          </Link>
          <Link href={`${BASE}/home`}>
            <Button
              size="lg"
              variant="secondary"
              trailingIcon={
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              }
            >
              Peek the app
            </Button>
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm text-p3-ink-2">
          <div className="flex -space-x-2.5">
            <Avatar name="Léa" seed="lea-marchand-fr" nationality="FR" size={32} ring />
            <Avatar name="Liam" seed="liam-carter-gb" nationality="GB" size={32} ring />
            <Avatar name="Mia" seed="mia-bauer-de" nationality="DE" size={32} ring />
            <Avatar name="Aoi" seed="aoi-tanaka-jp" nationality="JP" size={32} ring />
            <Avatar name="Bayu" seed="bayu-pratama-id" nationality="ID" size={32} ring />
          </div>
          <p>
            <span className="font-bold text-p3-ink">5,300+ WHV holders</span>{" "}
            already on board across 8 Aussie cities.
          </p>
        </div>
      </div>

      <div className="relative">
        <PhoneMockup />
      </div>
    </div>
  </section>
);

const PhoneMockup: React.FC = () => (
  <div className="relative mx-auto w-full max-w-[380px]">
    <div className="absolute -inset-12 -z-10 rounded-[60px] bg-gradient-to-br from-p3-brand/20 via-p3-accent-mint/15 to-p3-accent-coral/15 blur-3xl" />
    <div className="rounded-[40px] border-[6px] border-p3-ink bg-p3-ink p-1.5 shadow-p3-lg">
      <div className="overflow-hidden rounded-[32px] bg-white">
        {/* phone status bar */}
        <div className="flex items-center justify-between bg-white px-6 pt-4 text-[11px] font-semibold text-p3-ink">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="font-p3-mono text-[10px]">5G</span>
            <span>•••</span>
            <span className="rounded-sm border border-p3-ink-3 px-1 text-[10px]">87</span>
          </span>
        </div>
        {/* app header */}
        <div className="flex items-center justify-between border-b border-p3-line px-5 py-3">
          <Logo />
          <div className="flex items-center gap-1.5">
            <span className="flex h-7 items-center gap-1 rounded-full border border-p3-line bg-white px-2 text-[10px] font-medium text-p3-ink">
              <MapPin className="h-3 w-3 text-p3-brand" strokeWidth={2} />
              Sydney
            </span>
            <span className="relative grid h-7 w-7 place-items-center rounded-full border border-p3-line bg-white">
              <Bell className="h-3 w-3 text-p3-ink-2" strokeWidth={1.75} />
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-p3-accent-coral" />
            </span>
            <Avatar name="Léa" seed="lea-marchand-fr" nationality="FR" size={28} />
          </div>
        </div>
        {/* greeting */}
        <div className="px-5 py-4">
          <div className="text-[11px] font-p3-mono uppercase tracking-widest text-p3-ink-3">
            Tue · 26 May
          </div>
          <div className="mt-1 text-lg font-bold tracking-p3-tight text-p3-ink">
            Bonjour, Léa 👋
          </div>
          <div className="mt-0.5 text-[11px] text-p3-ink-2">
            3 new messages in your Sydney channels.
          </div>
        </div>

        {/* 5x2 service grid */}
        <div className="p-5 pt-1">
          <div className="grid grid-cols-5 gap-3">
            {[
              { Icon: MessagesSquare, label: "Community", accent: "brand" as const },
              { Icon: PartyPopper, label: "Events", accent: "coral" as const },
              { Icon: Briefcase, label: "Jobs", accent: "mint" as const },
              { Icon: BadgeCheck, label: "Cert", accent: "amber" as const },
              { Icon: Landmark, label: "Bank", accent: "indigo" as const },
              { Icon: Calculator, label: "Tax", accent: "emerald" as const },
              { Icon: ShieldCheck, label: "Insur.", accent: "sky" as const },
              { Icon: Plane, label: "Visa", accent: "violet" as const },
              { Icon: HomeIcon, label: "Home", accent: "orange" as const },
              { Icon: LifeBuoy, label: "Help", accent: "rose" as const },
            ].map(({ Icon, label, accent }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <IconCircle accent={accent} size={44}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </IconCircle>
                <span className="text-[9px] font-medium text-p3-ink-2">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* preview row */}
          <div className="mt-5 rounded-p3-lg bg-gradient-to-br from-p3-accent-coral to-rose-600 p-4 text-white">
            <div className="text-[10px] font-p3-mono uppercase tracking-widest text-white/80">
              Tonight · 7pm · Surry Hills
            </div>
            <div className="mt-1 text-sm font-bold">
              Rooftop Meet-up @ Cliff Dive
            </div>
            <div className="mt-1 text-[11px] text-white/85">
              142 going · Free entry
            </div>
          </div>

          <div className="mt-3 rounded-p3-md bg-p3-surface p-3">
            <div className="text-[10px] font-p3-mono uppercase tracking-widest text-p3-ink-3">
              Sponsored
            </div>
            <div className="mt-0.5 text-xs font-semibold text-p3-ink">
              Greythorn Tax — Lodge your WHV return today
            </div>
            <div className="text-[11px] text-p3-ink-2">
              ~$120 flat, refund in 5-7 days
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Features section --------------------------------------------------------

const FeaturesSection: React.FC = () => (
  <section id="features" className="bg-white py-24">
    <div className="mx-auto max-w-p3-page px-5">
      <div className="mb-14 max-w-2xl">
        <div className="mb-3 font-p3-mono text-[11px] uppercase tracking-[0.18em] text-p3-brand">
          What's inside
        </div>
        <h2 className="text-4xl font-extrabold leading-tight tracking-p3-tight text-p3-ink md:text-5xl">
          Ten things you'll need, in one place.
        </h2>
        <p className="mt-5 text-lg text-p3-ink-2">
          We talked to dozens of WHV holders and pulled out the same checklist
          every time. So we built it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { Icon: MessagesSquare, label: "Community", body: "Chat with WHV holders in your city.", accent: "brand" as const },
          { Icon: PartyPopper, label: "Events", body: "Meet-ups, free walks, parties.", accent: "coral" as const },
          { Icon: Briefcase, label: "Jobs", body: "Verified employers, no scams.", accent: "mint" as const },
          { Icon: BadgeCheck, label: "Certification", body: "RSA, white card, food safety.", accent: "amber" as const },
          { Icon: Landmark, label: "Bank Setup", body: "Open an Aussie account from home.", accent: "indigo" as const },
          { Icon: Calculator, label: "Tax Agents", body: "TFN + the 15% WHV tax return.", accent: "emerald" as const },
          { Icon: ShieldCheck, label: "Insurance", body: "OVHC + travel cover that works.", accent: "sky" as const },
          { Icon: Plane, label: "Migration", body: "Second-year visa, 88-day rules.", accent: "violet" as const },
          { Icon: HomeIcon, label: "Accommodation", body: "Hostels & share-houses, vetted.", accent: "orange" as const },
          { Icon: LifeBuoy, label: "Support", body: "Save these numbers before you need them.", accent: "rose" as const },
        ].map(({ Icon, label, body, accent }) => (
          <article
            key={label}
            className="group rounded-p3-xl border border-p3-line bg-white p-5 shadow-p3-sm transition-all hover:-translate-y-0.5 hover:shadow-p3-md"
          >
            <IconCircle accent={accent} size={44}>
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </IconCircle>
            <h3 className="mt-4 text-base font-bold tracking-p3-tight text-p3-ink">
              {label}
            </h3>
            <p className="mt-1 text-sm text-p3-ink-2">{body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// --- How it works -----------------------------------------------------------

const HowItWorksSection: React.FC = () => (
  <section className="bg-p3-surface py-24">
    <div className="mx-auto max-w-p3-page px-5">
      <div className="mb-12 max-w-2xl">
        <div className="mb-3 font-p3-mono text-[11px] uppercase tracking-[0.18em] text-p3-accent-coral">
          How it works
        </div>
        <h2 className="text-4xl font-extrabold leading-tight tracking-p3-tight text-p3-ink md:text-5xl">
          Sign up · land · sorted.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {[
          {
            n: "01",
            t: "Tell us where you are",
            b: "Sign up, pick your Aussie city — Sydney, Melbourne, Brisbane, anywhere. We filter everything in the app to your location.",
          },
          {
            n: "02",
            t: "Use the home grid",
            b: "Ten icons. Tap one. Community for chat, Jobs for work, Bank to open an account, Tax for your TFN — every category has a clear next step.",
          },
          {
            n: "03",
            t: "Relocate when you do",
            b: "Moving to Cairns for the harvest? Switch your city and the app rebuilds around you — new channels, new jobs, new events.",
          },
        ].map((s) => (
          <article
            key={s.n}
            className="relative rounded-p3-xl border border-p3-line bg-white p-7 shadow-p3-sm"
          >
            <div className="mb-5 flex items-baseline gap-3">
              <span className="font-p3-mono text-3xl font-bold text-p3-brand">
                {s.n}
              </span>
              <span className="h-px flex-1 bg-p3-line" />
            </div>
            <h3 className="text-xl font-bold tracking-p3-tight text-p3-ink">
              {s.t}
            </h3>
            <p className="mt-3 text-sm text-p3-ink-2">{s.b}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// --- Services section -------------------------------------------------------

const ServicesSection: React.FC = () => (
  <section id="services" className="bg-p3-ink py-24 text-white">
    <div className="mx-auto max-w-p3-page px-5">
      <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-3 font-p3-mono text-[11px] uppercase tracking-[0.18em] text-p3-accent-mint">
            Services, but vetted
          </div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-p3-tight md:text-5xl">
            Not a random Google search.
          </h2>
        </div>
        <p className="text-base text-white/70">
          Every provider on WHV World is reviewed by our team and tagged WHV-
          friendly. Banks, tax agents, insurers, MARA agents, hostels, support
          hotlines — all curated.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[
          { label: "CommBank", tag: "Bank", colour: "#FFD600" },
          { label: "Greythorn Tax", tag: "Tax", colour: "#1D4ED8" },
          { label: "Bupa OVHC", tag: "Insurance", colour: "#0EA5E9" },
          { label: "Visa Envoy", tag: "Migration", colour: "#8B5CF6" },
          { label: "Wake Up!", tag: "Hostel", colour: "#F97316" },
          { label: "ANZ Plus", tag: "Bank", colour: "#005EB8" },
          { label: "H&R Block", tag: "Tax", colour: "#16A34A" },
          { label: "Medibank", tag: "Insurance", colour: "#0E7490" },
        ].map((p) => (
          <div
            key={p.label}
            className="flex items-center gap-3 rounded-p3-lg border border-white/10 bg-white/[0.04] p-4"
          >
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-p3-md text-sm font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${p.colour}, ${p.colour}aa)`,
              }}
            >
              {p.label[0]}
            </span>
            <div>
              <div className="text-sm font-semibold">{p.label}</div>
              <div className="text-xs text-white/55">{p.tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Community spotlight ----------------------------------------------------

const CommunitySection: React.FC = () => (
  <section id="community" className="bg-white py-24">
    <div className="mx-auto max-w-p3-page px-5">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div className="mb-3 font-p3-mono text-[11px] uppercase tracking-[0.18em] text-p3-accent-coral">
            Community first
          </div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-p3-tight text-p3-ink md:text-5xl">
            It's the WhatsApp group you didn't have to ask to join.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-p3-ink-2">
            Every Aussie city has its own channels: general, housing, jobs,
            events. Already in the right ones the moment you sign up. Verified
            members only.
          </p>
          <ul className="mt-7 space-y-3 text-sm text-p3-ink">
            <li className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-p3-success-soft text-p3-success">
                ✓
              </span>
              No more "is this group still active?" Facebook digging.
            </li>
            <li className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-p3-success-soft text-p3-success">
                ✓
              </span>
              Scam alerts pinned to the top of every housing channel.
            </li>
            <li className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-p3-success-soft text-p3-success">
                ✓
              </span>
              Real names, real flags — no anonymous trolls.
            </li>
          </ul>
        </div>

        <Card lifted padded={false}>
          <div className="flex items-center justify-between border-b border-p3-line bg-p3-surface px-5 py-3">
            <div>
              <div className="text-sm font-bold text-p3-ink">#sydney-general</div>
              <div className="text-xs text-p3-ink-3">1,842 members · active now</div>
            </div>
            <Badge tone="brand" dot>
              Online
            </Badge>
          </div>
          <ul className="space-y-3 p-5">
            <ChatRow
              name="James"
              seed="james-whitaker-gb"
              nat="GB"
              body="express online learning, did mine in ~3hrs and got cert by email. $45ish"
              time="9:17"
            />
            <ChatRow
              name="Aoi"
              seed="aoi-tanaka-jp"
              nat="JP"
              body="+1 for express. just make sure to pick NSW when you sign up"
              time="9:33"
            />
            <ChatRow
              name="Tomás"
              seed="tomas-romero-ar"
              nat="AR"
              body="PSA: do NOT pay any landlord upfront before viewing the place in person."
              time="10:31"
              pinned
            />
          </ul>
        </Card>
      </div>
    </div>
  </section>
);

const ChatRow: React.FC<{
  name: string;
  seed: string;
  nat: string;
  body: string;
  time: string;
  pinned?: boolean;
}> = ({ name, seed, nat, body, time, pinned }) => (
  <li className="flex items-start gap-3">
    <Avatar name={name} seed={seed} nationality={nat} size={36} />
    <div className="flex-1">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-semibold text-p3-ink">{name}</span>
        <span className="font-p3-mono text-[10px] text-p3-ink-3">{time}</span>
        {pinned && (
          <Badge tone="amber" size="sm">
            📌 Pinned
          </Badge>
        )}
      </div>
      <p className="mt-0.5 text-sm text-p3-ink-2">{body}</p>
    </div>
  </li>
);

// --- Testimonial ------------------------------------------------------------

const TestimonialSection: React.FC = () => (
  <section className="bg-p3-surface py-24">
    <div className="mx-auto max-w-p3-app px-5 text-center">
      <p className="text-2xl font-semibold leading-snug tracking-p3-tight text-p3-ink md:text-3xl">
        &ldquo;Six weeks ago I landed in Sydney not knowing anyone. WHV World
        gave me a flat, a barista job, a tax agent, and a Saturday-night surf
        crew. It's mad.&rdquo;
      </p>
      <div className="mt-7 flex items-center justify-center gap-3 text-sm text-p3-ink-2">
        <Avatar name="Léa" seed="lea-marchand-fr" nationality="FR" size={36} />
        <span>
          <span className="block font-semibold text-p3-ink">Léa Marchand</span>
          <span className="block text-xs text-p3-ink-3">
            24, French, Sydney 6 weeks
          </span>
        </span>
      </div>
    </div>
  </section>
);

// --- Final CTA --------------------------------------------------------------

const FinalCta: React.FC = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-p3-brand via-p3-brand-deep to-p3-accent-violet text-white">
    <div className="absolute inset-0 -z-0 opacity-40">
      <div className="absolute -left-32 top-1/3 h-[460px] w-[460px] rounded-full bg-p3-accent-mint/30 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-p3-accent-coral/30 blur-3xl" />
    </div>
    <div className="relative mx-auto flex max-w-p3-page flex-col items-start gap-10 px-5 py-24 md:flex-row md:items-center md:justify-between">
      <div className="max-w-2xl">
        <Badge tone="brand" className="bg-white/10 text-white">
          🇦🇺 For all WHV holders in Australia
        </Badge>
        <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-p3-tight md:text-5xl">
          Free forever for WHV holders.
        </h2>
        <p className="mt-4 max-w-lg text-white/80">
          No subscriptions, no paywalls. Open the app the day you book your
          flight, keep it through your second year.
        </p>
      </div>
      <div className="flex flex-col items-start gap-2 md:items-end">
        <Link href={`${BASE}/signup`}>
          <Button
            size="lg"
            variant="secondary"
            className="text-p3-brand-deep"
            trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
          >
            Sign up — it's free
          </Button>
        </Link>
        <span className="text-xs text-white/60">No card required</span>
      </div>
    </div>
  </section>
);
