// Domain types for the prototype2 consumer hub.
// Mocked, no backend. Kept separate from lib/mock (which is the B2B prototype).

export type AuCity =
  | "Sydney"
  | "Melbourne"
  | "Brisbane"
  | "Perth"
  | "Adelaide"
  | "Cairns"
  | "Byron Bay"
  | "Darwin";

export type ServiceSlug =
  | "community"
  | "events"
  | "jobs"
  | "certification"
  | "bank-setup"
  | "tax-agents"
  | "insurance"
  | "migration"
  | "accommodation"
  | "support";

export interface ServiceTile {
  slug: ServiceSlug;
  label: string;
  shortDesc: string;
  iconKey: string; // lucide icon name
  accent:
    | "brand"
    | "coral"
    | "mint"
    | "amber"
    | "indigo"
    | "emerald"
    | "sky"
    | "violet"
    | "orange"
    | "rose";
  inApp: boolean; // true = native page; false = directory
}

export interface Provider {
  id: string;
  name: string;
  blurb: string;
  rating: number; // 0–5
  reviewCount: number;
  whvFriendly?: boolean;
  highlights: string[];
  startingPrice?: string;
  ctaLabel: string;
}

export interface ServiceCategory {
  slug: ServiceSlug;
  label: string;
  intro: string;
  longDesc: string;
  heroAccent:
    | "brand"
    | "coral"
    | "mint"
    | "amber"
    | "indigo"
    | "emerald"
    | "sky"
    | "violet"
    | "orange"
    | "rose";
  checklist?: { label: string; done?: boolean }[];
  providers: Provider[];
  faq: { q: string; a: string }[];
  iconKey: string;
}

export interface ChatMessage {
  id: string;
  authorName: string;
  authorSeed: string;
  authorNationality: string;
  at: string; // ISO
  body: string;
  reactions?: { emoji: string; count: number }[];
  attachments?: { type: "image" | "link"; label: string }[];
  pinned?: boolean;
}

export interface ChatChannel {
  id: string;
  city: AuCity;
  name: string;
  members: number;
  unread?: number;
  pinned?: boolean;
  topic: string;
  messages: ChatMessage[];
}

export interface EventItem {
  id: string;
  title: string;
  source: "humanitix" | "luma" | "eventbrite" | "in-app";
  city: AuCity;
  venue: string;
  startsAt: string;
  price: string;
  cover: { gradient: [string, string]; emoji: string };
  hostName: string;
  hostSeed: string;
  blurb: string;
  attendees: number;
  tags: string[];
}

export interface JobItem {
  id: string;
  role: string;
  company: string;
  industry: string;
  city: AuCity;
  state: string;
  payRate: string;
  startDate: string;
  endDate: string;
  visa: ("417" | "462")[];
  accommodationProvided: boolean;
  blurb: string;
  whvOnly: boolean;
  postedAt: string;
}

export interface NotificationItem {
  id: string;
  kind: "system" | "job" | "community" | "event" | "service";
  title: string;
  body: string;
  at: string;
  unread?: boolean;
  href?: string;
}

export interface UserProfile {
  name: string;
  nationality: string;
  age: number;
  arrivedAt: string;
  city: AuCity;
  bio: string;
  verified: {
    email: boolean;
    phone: boolean;
    visa: boolean;
    tfn: boolean;
  };
}
