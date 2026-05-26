import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Briefcase,
  Users as UsersIcon,
  ListChecks,
  TrendingUp,
} from "lucide-react";
import { AppNavP3 } from "@/components/p3/layout/app-nav";
import { MobileTabBar } from "@/components/p3/layout/mobile-tabbar";
import { Card, CardTitle, CardSubtitle } from "@/components/p3/ui/card";
import { Badge } from "@/components/p3/ui/badge";
import { Button } from "@/components/p3/ui/button";
import { Avatar } from "@/components/p3/ui/avatar";
import { ServiceTileCard } from "@/components/p3/hub/service-tile";
import { AdSlot } from "@/components/p3/hub/ad-slot";
import { tiles, events, jobs, channels, me, notifications } from "@/lib/mock-p3";

const BASE = "/prototype2";

export default function HomeHubPage() {
  const tonightEvent = events[0];
  const nextEvent = events[1];
  const recentJobs = jobs.slice(0, 3);
  const myChannel = channels[0];
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <>
      <AppNavP3 city={me.city} unread={unread} />

      <main className="mx-auto max-w-p3-page px-5 pb-24 pt-6 md:pb-10">
        {/* GREETING */}
        <section className="p3-soft-mesh -mx-5 mb-6 rounded-p3-2xl px-5 py-8 md:mx-0 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-p3-mono text-[11px] uppercase tracking-[0.18em] text-p3-ink-3">
                Tue · 26 May
              </div>
              <h1 className="mt-1 text-3xl font-extrabold tracking-p3-tight text-p3-ink md:text-4xl">
                Bonjour, {me.name.split(" ")[0]} 👋
              </h1>
              <p className="mt-1.5 text-sm text-p3-ink-2">
                You have{" "}
                <span className="font-bold text-p3-ink">3 new messages</span> in{" "}
                <span className="font-bold text-p3-ink">#sydney-general</span>,
                a rooftop meet-up tonight, and a tax reminder.
              </p>
            </div>
            <Link href={`${BASE}/onboarding-checklist`}>
              <Button
                size="sm"
                variant="tonal"
                trailingIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />}
              >
                Continue setup (3 of 8 done)
              </Button>
            </Link>
          </div>
        </section>

        {/* GRID + RIGHT RAIL */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section>
            <h2 className="mb-3 font-p3-mono text-[11px] uppercase tracking-[0.18em] text-p3-ink-3">
              Your dashboard
            </h2>

            {/* 10-icon grid: 5×2 on md+, 2×5 on mobile */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {tiles.map((t, i) => (
                <ServiceTileCard
                  key={t.slug}
                  tile={t}
                  badgeLabel={i === 0 ? "3" : undefined}
                />
              ))}
            </div>

            {/* Ad slot */}
            <div className="mt-6">
              <AdSlot />
            </div>

            {/* Tonight strip */}
            <h2 className="mb-3 mt-8 font-p3-mono text-[11px] uppercase tracking-[0.18em] text-p3-ink-3">
              Happening near you
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <EventTile event={tonightEvent} primary />
              <EventTile event={nextEvent} />
            </div>

            {/* Job teaser */}
            <h2 className="mb-3 mt-8 font-p3-mono text-[11px] uppercase tracking-[0.18em] text-p3-ink-3">
              Fresh jobs in {me.city}
            </h2>
            <Card padded={false}>
              <ul>
                {recentJobs.map((j, i) => (
                  <li
                    key={j.id}
                    className={
                      "flex items-center gap-3 px-5 py-3.5 " +
                      (i < recentJobs.length - 1 ? "border-b border-p3-line" : "")
                    }
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-p3-md bg-p3-accent-mint-soft text-teal-700">
                      <Briefcase className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`${BASE}/jobs/${j.id}`}
                        className="block truncate text-sm font-bold text-p3-ink hover:underline"
                      >
                        {j.role}
                      </Link>
                      <div className="text-xs text-p3-ink-2">
                        {j.company} ·{" "}
                        <span className="font-medium text-p3-ink">{j.payRate}</span>{" "}
                        · {j.industry}
                      </div>
                    </div>
                    {j.whvOnly && (
                      <Badge tone="brand" size="sm">
                        WHV
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
              <div className="border-t border-p3-line px-5 py-3">
                <Link
                  href={`${BASE}/jobs`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-p3-brand hover:underline"
                >
                  See all 8 open jobs
                  <ArrowRight className="h-3 w-3" strokeWidth={2.25} />
                </Link>
              </div>
            </Card>
          </section>

          {/* RIGHT RAIL */}
          <aside className="space-y-5">
            {/* Onboarding checklist */}
            <Card>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>First 30 days</CardTitle>
                  <CardSubtitle>3 of 8 done</CardSubtitle>
                </div>
                <ListChecks className="h-4 w-4 text-p3-brand" strokeWidth={1.75} />
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-p3-surface">
                <div className="h-full w-[37%] rounded-full bg-gradient-to-r from-p3-brand to-p3-accent-mint" />
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <CheckItem done label="Bank account opened" />
                <CheckItem done label="SIM card sorted" />
                <CheckItem done label="Joined #sydney-general" />
                <CheckItem label="Apply for TFN" highlight />
                <CheckItem label="Get RSA certificate" />
                <CheckItem label="Tax agent picked" />
                <CheckItem label="OVHC insurance" />
                <CheckItem label="Save emergency numbers" />
              </ul>
              <Link href={`${BASE}/onboarding-checklist`}>
                <Button variant="ghost" size="sm" className="mt-3 w-full">
                  Open full checklist →
                </Button>
              </Link>
            </Card>

            {/* Community heat */}
            <Card>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>Sydney community</CardTitle>
                  <CardSubtitle>{myChannel.members.toLocaleString()} members</CardSubtitle>
                </div>
                <TrendingUp className="h-4 w-4 text-p3-accent-coral" strokeWidth={1.75} />
              </div>
              <ul className="mt-4 space-y-3">
                {myChannel.messages.slice(2, 5).map((m) => (
                  <li key={m.id} className="flex items-start gap-2.5">
                    <Avatar
                      name={m.authorName}
                      seed={m.authorSeed}
                      nationality={m.authorNationality}
                      size={28}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-p3-ink">
                        <span className="font-semibold">
                          {m.authorName.split(" ")[0]}
                        </span>{" "}
                        <span className="font-p3-mono text-[10px] text-p3-ink-3">
                          {new Date(m.at).toLocaleTimeString("en-AU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-xs text-p3-ink-2">
                        {m.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href={`${BASE}/community`}>
                <Button variant="ghost" size="sm" className="mt-3 w-full">
                  Open #sydney-general →
                </Button>
              </Link>
            </Card>

            {/* Compact ad */}
            <AdSlot variant="compact" />
          </aside>
        </div>
      </main>

      <MobileTabBar />
    </>
  );
}

const CheckItem: React.FC<{
  label: string;
  done?: boolean;
  highlight?: boolean;
}> = ({ label, done, highlight }) => (
  <li className="flex items-start gap-2.5">
    <span
      className={
        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border " +
        (done
          ? "border-p3-success bg-p3-success text-white"
          : highlight
          ? "border-p3-brand bg-p3-brand-soft text-p3-brand-deep"
          : "border-p3-line bg-white text-p3-ink-3")
      }
    >
      {done ? "✓" : highlight ? "→" : ""}
    </span>
    <span
      className={
        "text-sm " +
        (done ? "text-p3-ink-3 line-through" : highlight ? "font-semibold text-p3-ink" : "text-p3-ink")
      }
    >
      {label}
    </span>
  </li>
);

const EventTile: React.FC<{
  event: (typeof events)[number];
  primary?: boolean;
}> = ({ event, primary }) => (
  <Link
    href={`${BASE}/events/${event.id}`}
    className="group block overflow-hidden rounded-p3-xl border border-p3-line bg-white shadow-p3-sm transition-all hover:-translate-y-0.5 hover:shadow-p3-md"
  >
    <div
      className="relative h-32 p-5 text-white"
      style={{
        background: `linear-gradient(135deg, ${event.cover.gradient[0]} 0%, ${event.cover.gradient[1]} 100%)`,
      }}
    >
      <span className="text-3xl">{event.cover.emoji}</span>
      <div className="absolute bottom-3 left-5 right-5">
        <Badge tone="brand" className="bg-white/15 text-white" size="sm">
          {primary ? "Tonight" : new Date(event.startsAt).toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" })}
        </Badge>
        <div className="mt-1 line-clamp-1 text-sm font-bold">{event.title}</div>
      </div>
    </div>
    <div className="flex items-center justify-between gap-2 px-5 py-3 text-xs text-p3-ink-2">
      <span className="flex items-center gap-1">
        <MapPin className="h-3 w-3 text-p3-ink-3" strokeWidth={1.75} />
        {event.venue}
      </span>
      <span className="flex items-center gap-1 font-medium text-p3-ink">
        <UsersIcon className="h-3 w-3 text-p3-ink-3" strokeWidth={1.75} />
        {event.attendees}
      </span>
    </div>
  </Link>
);

