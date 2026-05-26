import Link from "next/link";
import { MapPin, Users as UsersIcon, Calendar, ExternalLink, Plus } from "lucide-react";
import { AppNavP3 } from "@/components/p3/layout/app-nav";
import { MobileTabBar } from "@/components/p3/layout/mobile-tabbar";
import { Chip } from "@/components/p3/ui/chip";
import { Badge } from "@/components/p3/ui/badge";
import { Button } from "@/components/p3/ui/button";
import { Avatar } from "@/components/p3/ui/avatar";
import { events, me } from "@/lib/mock-p3";

const BASE = "/prototype2";

const SOURCE_LABEL: Record<string, string> = {
  humanitix: "Humanitix",
  luma: "Luma",
  eventbrite: "Eventbrite",
  "in-app": "WHV World",
};

export default function EventsListP3() {
  return (
    <>
      <AppNavP3 city={me.city} unread={3} />

      <main className="mx-auto max-w-p3-page px-5 pb-24 pt-6 md:pb-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-p3-tight text-p3-ink md:text-4xl">
              Events near you
            </h1>
            <p className="mt-1.5 text-sm text-p3-ink-2">
              Curated from Humanitix, Luma, Eventbrite, and the WHV World
              community.
            </p>
          </div>
          <Button
            leadingIcon={<Plus className="h-3.5 w-3.5" strokeWidth={2.25} />}
          >
            Post an event
          </Button>
        </div>

        {/* Filter chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["All", "Tonight", "This week", "Free", "Meet-ups", "Webinars", "Surf & outdoors"].map(
            (chip, i) => (
              <Chip key={chip} active={i === 0}>
                {chip}
              </Chip>
            ),
          )}
        </div>

        {/* Featured */}
        <FeaturedEvent event={events[0]} />

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(1).map((e) => (
            <Link
              key={e.id}
              href={`${BASE}/events/${e.id}`}
              className="group flex flex-col overflow-hidden rounded-p3-xl border border-p3-line bg-white shadow-p3-sm transition-all hover:-translate-y-0.5 hover:shadow-p3-md"
            >
              <div
                className="relative flex h-32 items-end p-5"
                style={{
                  background: `linear-gradient(135deg, ${e.cover.gradient[0]} 0%, ${e.cover.gradient[1]} 100%)`,
                }}
              >
                <span className="absolute right-4 top-4 text-3xl">
                  {e.cover.emoji}
                </span>
                <div>
                  <Badge tone="brand" className="bg-white/15 text-white" size="sm">
                    {SOURCE_LABEL[e.source]}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="font-p3-mono text-[10px] uppercase tracking-widest text-p3-ink-3">
                  {new Date(e.startsAt).toLocaleDateString("en-AU", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <h3 className="line-clamp-2 text-base font-bold tracking-p3-tight text-p3-ink">
                  {e.title}
                </h3>
                <p className="line-clamp-2 text-xs text-p3-ink-2">{e.blurb}</p>
                <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-xs">
                  <span className="flex items-center gap-1.5 text-p3-ink-2">
                    <MapPin className="h-3 w-3" strokeWidth={1.75} />
                    {e.venue}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-p3-ink">
                    <UsersIcon className="h-3 w-3 text-p3-ink-3" strokeWidth={1.75} />
                    {e.attendees}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <MobileTabBar />
    </>
  );
}

const FeaturedEvent: React.FC<{ event: (typeof events)[number] }> = ({ event }) => (
  <Link
    href={`${BASE}/events/${event.id}`}
    className="group block overflow-hidden rounded-p3-2xl border border-p3-line bg-white shadow-p3-md transition-all hover:shadow-p3-lg"
  >
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
      <div
        className="relative flex min-h-[280px] flex-col justify-between p-7 text-white"
        style={{
          background: `linear-gradient(135deg, ${event.cover.gradient[0]} 0%, ${event.cover.gradient[1]} 100%)`,
        }}
      >
        <div className="flex items-start justify-between">
          <Badge tone="brand" className="bg-white/15 text-white">
            {SOURCE_LABEL[event.source]}
          </Badge>
          <span className="text-5xl">{event.cover.emoji}</span>
        </div>
        <div>
          <Badge tone="brand" className="mb-3 bg-white/15 text-white">
            Tonight · {event.venue.split(",")[0]}
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-p3-tight">{event.title}</h2>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-7">
        <div className="space-y-2">
          <Detail
            icon={<Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />}
            label="When"
            value={new Date(event.startsAt).toLocaleString("en-AU", {
              weekday: "long",
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
          <Detail
            icon={<MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />}
            label="Where"
            value={event.venue}
          />
          <Detail
            icon={<UsersIcon className="h-3.5 w-3.5" strokeWidth={1.75} />}
            label="Going"
            value={`${event.attendees} WHV holders`}
          />
        </div>
        <p className="text-sm text-p3-ink-2">{event.blurb}</p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Avatar
              name={event.hostName}
              seed={event.hostSeed}
              size={28}
            />
            <span className="text-xs text-p3-ink-2">
              by{" "}
              <span className="font-semibold text-p3-ink">{event.hostName}</span>
            </span>
          </div>
          <Badge tone="brand">
            <ExternalLink className="h-3 w-3" strokeWidth={2} />
            View on {SOURCE_LABEL[event.source]}
          </Badge>
        </div>
      </div>
    </div>
  </Link>
);

const Detail: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-start gap-2.5">
    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-p3-xs bg-p3-surface text-p3-ink-3">
      {icon}
    </span>
    <div className="flex-1">
      <div className="font-p3-mono text-[10px] uppercase tracking-widest text-p3-ink-3">
        {label}
      </div>
      <div className="text-sm text-p3-ink">{value}</div>
    </div>
  </div>
);
