import Link from "next/link";
import {
  Bell,
  Briefcase,
  MessagesSquare,
  PartyPopper,
  Wrench,
  Sparkles,
} from "lucide-react";
import { AppNavP3 } from "@/components/p3/layout/app-nav";
import { MobileTabBar } from "@/components/p3/layout/mobile-tabbar";
import { Card } from "@/components/p3/ui/card";
import { Chip } from "@/components/p3/ui/chip";
import { Badge } from "@/components/p3/ui/badge";
import { notifications, me } from "@/lib/mock-p3";

const BASE = "/prototype2";

const ICON_FOR = {
  community: MessagesSquare,
  job: Briefcase,
  event: PartyPopper,
  service: Wrench,
  system: Sparkles,
};

const TONE_FOR = {
  community: "brand" as const,
  job: "mint" as const,
  event: "coral" as const,
  service: "amber" as const,
  system: "neutral" as const,
};

export default function NotificationsP3() {
  return (
    <>
      <AppNavP3 city={me.city} unread={0} />

      <main className="mx-auto max-w-p3-narrow px-5 pb-24 pt-6 md:pb-10 md:max-w-[760px]">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-p3-tight text-p3-ink md:text-4xl">
              Notifications
            </h1>
            <p className="mt-1.5 text-sm text-p3-ink-2">
              Everything that needs your attention, in one feed.
            </p>
          </div>
          <button className="text-xs font-semibold text-p3-brand hover:underline">
            Mark all as read
          </button>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          <Chip active leading={<Bell className="h-3 w-3" strokeWidth={2} />}>
            All
          </Chip>
          <Chip>Community</Chip>
          <Chip>Jobs</Chip>
          <Chip>Events</Chip>
          <Chip>Services</Chip>
        </div>

        <Card padded={false}>
          <ul>
            {notifications.map((n, i) => {
              const Icon = ICON_FOR[n.kind] ?? Bell;
              return (
                <li
                  key={n.id}
                  className={
                    "border-b border-p3-line last:border-b-0 " +
                    (n.unread ? "bg-p3-brand-tint/50" : "")
                  }
                >
                  <Link
                    href={n.href ?? "#"}
                    className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-p3-surface"
                  >
                    <span
                      className={
                        "grid h-10 w-10 shrink-0 place-items-center rounded-p3-md " +
                        (n.kind === "community"
                          ? "bg-p3-brand-soft text-p3-brand-deep"
                          : n.kind === "job"
                          ? "bg-p3-accent-mint-soft text-teal-700"
                          : n.kind === "event"
                          ? "bg-p3-accent-coral-soft text-rose-700"
                          : n.kind === "service"
                          ? "bg-p3-accent-amber-soft text-amber-700"
                          : "bg-p3-surface text-p3-ink-2")
                      }
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-p3-ink">
                          {n.title}
                        </span>
                        {n.unread && (
                          <Badge tone={TONE_FOR[n.kind]} size="sm" dot>
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-p3-ink-2">{n.body}</p>
                      <p className="mt-1 font-p3-mono text-[10px] text-p3-ink-3">
                        {new Date(n.at).toLocaleString("en-AU", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </main>
      <MobileTabBar />
    </>
  );
}
