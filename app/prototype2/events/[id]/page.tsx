import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Users as UsersIcon,
  ExternalLink,
  Share2,
  Bookmark,
} from "lucide-react";
import { AppNavP3 } from "@/components/p3/layout/app-nav";
import { MobileTabBar } from "@/components/p3/layout/mobile-tabbar";
import { Card, CardTitle, CardSubtitle } from "@/components/p3/ui/card";
import { Badge } from "@/components/p3/ui/badge";
import { Button } from "@/components/p3/ui/button";
import { Avatar } from "@/components/p3/ui/avatar";
import { Divider } from "@/components/p3/ui/divider";
import { events, me } from "@/lib/mock-p3";

const BASE = "/prototype2";

const SOURCE_LABEL: Record<string, string> = {
  humanitix: "Humanitix",
  luma: "Luma",
  eventbrite: "Eventbrite",
  "in-app": "WHV World",
};

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export default function EventDetailP3({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id);
  if (!event) notFound();

  return (
    <>
      <AppNavP3 city={me.city} unread={3} />

      <main className="mx-auto max-w-p3-page px-5 pb-24 pt-6 md:pb-10">
        <Link
          href={`${BASE}/events`}
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-p3-ink-2 hover:text-p3-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          All events
        </Link>

        {/* Hero */}
        <Card padded={false} className="overflow-hidden">
          <div
            className="relative flex min-h-[320px] items-end p-10 text-white"
            style={{
              background: `linear-gradient(135deg, ${event.cover.gradient[0]} 0%, ${event.cover.gradient[1]} 100%)`,
            }}
          >
            <span className="absolute right-6 top-6 text-6xl">
              {event.cover.emoji}
            </span>
            <div className="max-w-3xl">
              <Badge tone="brand" className="mb-4 bg-white/15 text-white">
                <ExternalLink className="h-3 w-3" strokeWidth={2} />
                via {SOURCE_LABEL[event.source]}
              </Badge>
              <h1 className="text-4xl font-extrabold leading-tight tracking-p3-tight md:text-5xl">
                {event.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/85">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
                  {new Date(event.startsAt).toLocaleString("en-AU", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="opacity-50">·</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                  {event.venue}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Two-column */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="space-y-6">
            <Card>
              <CardTitle>About this event</CardTitle>
              <p className="mt-3 text-sm text-p3-ink-2">{event.blurb}</p>
              <Divider className="my-5" />
              <h4 className="text-sm font-bold text-p3-ink">What to expect</h4>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-p3-ink-2 md:grid-cols-2">
                <li>· Casual meet-up, drop in anytime</li>
                <li>· Free entry, cash bar</li>
                <li>· Friendly to first-timers</li>
                <li>· English-speaking, all welcome</li>
              </ul>
            </Card>

            <Card>
              <CardTitle>Hosted by</CardTitle>
              <div className="mt-4 flex items-center gap-3">
                <Avatar name={event.hostName} seed={event.hostSeed} size={56} />
                <div>
                  <div className="text-base font-bold text-p3-ink">
                    {event.hostName}
                  </div>
                  <div className="text-xs text-p3-ink-2">
                    Trusted host · 12 past events on WHV World
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="ml-auto">
                  Follow
                </Button>
              </div>
            </Card>

            <Card>
              <CardTitle>Going ({event.attendees})</CardTitle>
              <CardSubtitle>A few faces you'll see there</CardSubtitle>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { n: "Léa", s: "lea-marchand-fr", c: "FR" },
                  { n: "Liam", s: "liam-carter-gb", c: "GB" },
                  { n: "Mia", s: "mia-bauer-de", c: "DE" },
                  { n: "Sofia", s: "sofia-ricci-it", c: "IT" },
                  { n: "Aoi", s: "aoi-tanaka-jp", c: "JP" },
                  { n: "Tomás", s: "tomas-romero-ar", c: "AR" },
                  { n: "Niamh", s: "niamh-osullivan-ie", c: "IE" },
                  { n: "Bayu", s: "bayu-pratama-id", c: "ID" },
                ].map((a) => (
                  <span key={a.s} className="flex flex-col items-center gap-1">
                    <Avatar name={a.n} seed={a.s} nationality={a.c} size={44} />
                    <span className="text-[10px] text-p3-ink-2">{a.n}</span>
                  </span>
                ))}
                <span className="grid h-11 w-11 place-items-center rounded-full bg-p3-surface text-xs font-bold text-p3-ink-2">
                  +{event.attendees - 8}
                </span>
              </div>
            </Card>
          </section>

          <aside className="space-y-5">
            <Card lifted className="sticky top-20">
              <Badge tone="success" size="sm" className="mb-3">
                ✓ Free entry
              </Badge>
              <div className="text-3xl font-extrabold tracking-p3-tight text-p3-ink">
                {event.price}
              </div>
              <Divider className="my-4" />
              <div className="space-y-3 text-sm">
                <Row label="When" value={new Date(event.startsAt).toLocaleString("en-AU", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} />
                <Row label="Where" value={event.venue} />
                <Row label="Going" value={`${event.attendees} WHV holders`} />
                <Row label="Source" value={SOURCE_LABEL[event.source]} />
              </div>
              <Divider className="my-4" />
              <Button
                size="lg"
                block
                trailingIcon={<ExternalLink className="h-4 w-4" strokeWidth={2.25} />}
              >
                Register on {SOURCE_LABEL[event.source]}
              </Button>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button variant="secondary" size="sm" leadingIcon={<Bookmark className="h-3.5 w-3.5" strokeWidth={1.75} />}>
                  Save
                </Button>
                <Button variant="secondary" size="sm" leadingIcon={<Share2 className="h-3.5 w-3.5" strokeWidth={1.75} />}>
                  Share
                </Button>
              </div>
              <p className="mt-4 text-[10px] text-p3-ink-3">
                Registration happens on the source platform — we link out so you
                always keep your ticket and the host's policies.
              </p>
            </Card>

            <Card>
              <CardTitle>Related events</CardTitle>
              <ul className="mt-3 space-y-3">
                {events
                  .filter((e) => e.id !== event.id)
                  .slice(0, 3)
                  .map((e) => (
                    <li key={e.id}>
                      <Link
                        href={`${BASE}/events/${e.id}`}
                        className="flex items-start gap-3 rounded-p3-md border border-p3-line p-2.5 transition-colors hover:bg-p3-surface"
                      >
                        <span
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-p3-md text-lg"
                          style={{
                            background: `linear-gradient(135deg, ${e.cover.gradient[0]} 0%, ${e.cover.gradient[1]} 100%)`,
                          }}
                        >
                          {e.cover.emoji}
                        </span>
                        <div className="flex-1 text-xs">
                          <div className="line-clamp-1 font-semibold text-p3-ink">
                            {e.title}
                          </div>
                          <div className="text-p3-ink-2">
                            {new Date(e.startsAt).toLocaleDateString("en-AU", { day: "numeric", month: "short" })} · {e.attendees} going
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </Card>
          </aside>
        </div>
      </main>
      <MobileTabBar />
    </>
  );
}

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-start justify-between gap-3">
    <span className="font-p3-mono text-[10px] uppercase tracking-widest text-p3-ink-3">
      {label}
    </span>
    <span className="text-right text-p3-ink">{value}</span>
  </div>
);
