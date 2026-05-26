"use client";
import { useState } from "react";
import {
  Hash,
  Pin,
  Plus,
  Smile,
  Send,
  Paperclip,
  Image as ImageIcon,
  Search,
  MapPin,
} from "lucide-react";
import { AppNavP3 } from "@/components/p3/layout/app-nav";
import { MobileTabBar } from "@/components/p3/layout/mobile-tabbar";
import { Avatar } from "@/components/p3/ui/avatar";
import { Badge } from "@/components/p3/ui/badge";
import { Button } from "@/components/p3/ui/button";
import { Input } from "@/components/p3/ui/input";
import { channels, me } from "@/lib/mock-p3";
import { cn } from "@/lib/cn";

const BASE = "/prototype2";

export default function CommunityP3() {
  const [activeId, setActiveId] = useState(channels[0].id);
  const active = channels.find((c) => c.id === activeId) ?? channels[0];

  // Group channels by city (PSA: location filter from xlsx)
  const grouped = channels.reduce<Record<string, typeof channels>>(
    (acc, c) => {
      (acc[c.city] ||= []).push(c);
      return acc;
    },
    {},
  );

  return (
    <>
      <AppNavP3 city={me.city} unread={3} />

      <main className="mx-auto h-[calc(100vh-4rem)] max-w-p3-page md:h-[calc(100vh-4rem)]">
        <div className="grid h-full grid-cols-1 md:grid-cols-[280px_1fr]">
          {/* Channel list */}
          <aside className="hidden flex-col border-r border-p3-line bg-white md:flex">
            <div className="border-b border-p3-line p-4">
              <Input
                placeholder="Search channels"
                leading={<Search className="h-4 w-4" strokeWidth={1.75} />}
              />
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {Object.entries(grouped).map(([city, cs]) => (
                <div key={city} className="mb-5">
                  <div className="mb-1.5 flex items-center gap-1.5 px-2 font-p3-mono text-[10px] uppercase tracking-widest text-p3-ink-3">
                    <MapPin className="h-3 w-3" strokeWidth={1.75} />
                    {city}
                  </div>
                  <ul className="space-y-0.5">
                    {cs.map((c) => {
                      const isActive = c.id === activeId;
                      return (
                        <li key={c.id}>
                          <button
                            onClick={() => setActiveId(c.id)}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-p3-md px-2.5 py-2 text-left text-sm transition-colors",
                              isActive
                                ? "bg-p3-brand text-white shadow-p3-sm"
                                : "text-p3-ink-2 hover:bg-p3-surface hover:text-p3-ink",
                            )}
                          >
                            <Hash
                              className={cn(
                                "h-3.5 w-3.5 shrink-0",
                                isActive ? "text-white" : "text-p3-ink-3",
                              )}
                              strokeWidth={1.75}
                            />
                            <span className="flex-1 truncate font-medium">
                              {c.name}
                            </span>
                            {c.unread ? (
                              <span
                                className={cn(
                                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-p3-accent-coral text-white",
                                )}
                              >
                                {c.unread}
                              </span>
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-p3-line p-3">
              <Button
                variant="ghost"
                size="sm"
                block
                leadingIcon={<Plus className="h-3.5 w-3.5" strokeWidth={2} />}
              >
                Suggest a channel
              </Button>
            </div>
          </aside>

          {/* Channel content */}
          <section className="flex h-full min-h-0 flex-col bg-p3-surface">
            {/* channel header */}
            <header className="flex items-center justify-between gap-4 border-b border-p3-line bg-white px-5 py-3">
              <div>
                <div className="flex items-center gap-1.5 text-base font-bold tracking-p3-tight text-p3-ink">
                  <Hash className="h-4 w-4 text-p3-brand" strokeWidth={2} />
                  {active.name}
                </div>
                <div className="text-xs text-p3-ink-2">{active.topic}</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-p3-ink-2">
                <Badge tone="brand" dot>
                  {active.members.toLocaleString()} members
                </Badge>
              </div>
            </header>

            {/* messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5 p3-scroll">
              {/* date divider */}
              <div className="flex items-center gap-3 text-[10px] font-p3-mono uppercase tracking-widest text-p3-ink-3">
                <span className="h-px flex-1 bg-p3-line" />
                Today · 26 May 2026
                <span className="h-px flex-1 bg-p3-line" />
              </div>

              {active.messages.map((m, i) => (
                <article
                  key={m.id}
                  className={cn(
                    "flex items-start gap-3",
                    m.pinned && "rounded-p3-lg bg-p3-accent-amber-soft p-3",
                  )}
                >
                  <Avatar
                    name={m.authorName}
                    seed={m.authorSeed}
                    nationality={m.authorNationality}
                    size={36}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-bold text-p3-ink">
                        {m.authorName}
                      </span>
                      <span className="font-p3-mono text-[10px] text-p3-ink-3">
                        {new Date(m.at).toLocaleTimeString("en-AU", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {m.pinned && (
                        <Badge tone="amber" size="sm">
                          <Pin className="h-3 w-3" strokeWidth={2} />
                          Pinned PSA
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-p3-ink">{m.body}</p>
                    {m.attachments?.map((a, j) => (
                      <a
                        key={j}
                        href="#"
                        className="mt-2 inline-block rounded-p3-md border border-p3-line bg-white px-3 py-2 text-xs text-p3-brand hover:bg-p3-brand-tint"
                      >
                        🔗 {a.label}
                      </a>
                    ))}
                    {m.reactions && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.reactions.map((r) => (
                          <span
                            key={r.emoji}
                            className="inline-flex items-center gap-1 rounded-full border border-p3-line bg-white px-2 py-0.5 text-xs"
                          >
                            <span>{r.emoji}</span>
                            <span className="font-p3-mono text-[10px] text-p3-ink-2">
                              {r.count}
                            </span>
                          </span>
                        ))}
                        <button className="inline-flex items-center justify-center rounded-full border border-dashed border-p3-line bg-white px-2 py-0.5 text-xs text-p3-ink-3 hover:bg-p3-surface">
                          + react
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}

              {/* show empty state for empty channels */}
              {active.messages.length === 0 && (
                <div className="grid place-items-center rounded-p3-xl border border-dashed border-p3-line bg-white p-10 text-center">
                  <div className="text-2xl">💬</div>
                  <h3 className="mt-3 text-base font-bold text-p3-ink">
                    Quiet in here.
                  </h3>
                  <p className="mt-1 max-w-xs text-sm text-p3-ink-2">
                    Be the first to post in #{active.name}. The {active.members}{" "}
                    members will see it.
                  </p>
                </div>
              )}
            </div>

            {/* composer */}
            <div className="border-t border-p3-line bg-white p-3">
              <div className="flex items-center gap-2 rounded-p3-lg border border-p3-line bg-p3-surface px-3 py-2">
                <button className="grid h-8 w-8 place-items-center rounded-p3-sm text-p3-ink-3 hover:bg-white hover:text-p3-ink">
                  <Paperclip className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <button className="grid h-8 w-8 place-items-center rounded-p3-sm text-p3-ink-3 hover:bg-white hover:text-p3-ink">
                  <ImageIcon className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <input
                  placeholder={`Message #${active.name}`}
                  className="h-9 flex-1 bg-transparent text-sm text-p3-ink placeholder:text-p3-ink-3 outline-none"
                />
                <button className="grid h-8 w-8 place-items-center rounded-p3-sm text-p3-ink-3 hover:bg-white hover:text-p3-ink">
                  <Smile className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <Button
                  size="sm"
                  trailingIcon={<Send className="h-3.5 w-3.5" strokeWidth={2.25} />}
                >
                  Send
                </Button>
              </div>
              <p className="mt-1.5 px-2 text-[10px] text-p3-ink-3">
                Be kind. Share scams, not solutions. Channel rules apply.
              </p>
            </div>
          </section>
        </div>
      </main>
      <MobileTabBar />
    </>
  );
}
