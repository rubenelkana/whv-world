export * from "./types";
export { tiles, serviceCategories, serviceSlugs } from "./services";
export { channels } from "./messages";
export { events } from "./events";
export { jobs } from "./jobs";

import type { NotificationItem, UserProfile } from "./types";

export const me: UserProfile = {
  name: "Léa Marchand",
  nationality: "FR",
  age: 24,
  arrivedAt: "2026-04-12",
  city: "Sydney",
  bio: "Hospitality background. In Sydney for 6 weeks, planning to do regional work mid-year for second-year visa.",
  verified: { email: true, phone: true, visa: true, tfn: false },
};

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    kind: "community",
    title: "5 new messages in #sydney-general",
    body: "Tomás pinned: 'Do NOT pay any landlord upfront before viewing…'",
    at: "2026-05-26T10:32:00Z",
    unread: true,
    href: "/prototype2/community",
  },
  {
    id: "n2",
    kind: "job",
    title: "New job match — Café floor in Surry Hills",
    body: "Pay $32/hr + tips · Single O Surry Hills",
    at: "2026-05-26T08:00:00Z",
    unread: true,
    href: "/prototype2/jobs/p3j_001",
  },
  {
    id: "n3",
    kind: "event",
    title: "Tonight: WHV Rooftop Meet-up at Cliff Dive",
    body: "142 going · Free entry · Surry Hills",
    at: "2026-05-26T07:30:00Z",
    unread: true,
    href: "/prototype2/events/evt_001",
  },
  {
    id: "n4",
    kind: "service",
    title: "TFN application reminder",
    body: "You haven't applied for a TFN yet — most employers ask in week 1.",
    at: "2026-05-25T18:00:00Z",
    href: "/prototype2/services/tax-agents",
  },
  {
    id: "n5",
    kind: "system",
    title: "Profile 75% complete",
    body: "Add a phone number to unlock direct employer messaging.",
    at: "2026-05-25T09:00:00Z",
  },
];
