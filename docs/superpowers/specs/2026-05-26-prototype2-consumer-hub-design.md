# Prototype2 — Consumer Hub Design Spec

**Date:** 2026-05-26
**Author:** Ruben E. (CPO) + Claude
**Source of truth:** `context/requirement/Draft App.xlsx` (sparse — assumptions made and called out)
**Coexistence:** Additive only. Path `/prototype2/*`. Existing `/`, `/signup`, `/onboarding/*` and `/prototype-business-plan/*` untouched.

---

## 1. Goal

Build a click-through prototype of the **consumer-facing** WHV World hypothesis — a superapp that helps WHV holders organise their entire first-year-in-Australia journey from a single home screen.

This is a deliberately **different product hypothesis** from `/prototype-business-plan` (which is B2B workforce-ERP). Both prototypes live side-by-side so the team can stakeholder-test and pick.

## 2. Non-goals

- No backend, no real auth — all mocked
- No mobile-native app; web-first responsive that *feels* like an app
- Not a clone of `/prototype-business-plan` design language — fully separate token set
- Not exhaustive content for every service tile — representative samples only
- No real 3rd-party integration (Humanitix, Luma, etc.) — the prototype simulates them

## 3. Target user

| Persona | Context | Job-to-be-done |
|---|---|---|
| **Léa, 24, French WHV holder** | Just landed in Sydney 3 weeks ago | "Set up bank, TFN, insurance, find work + community, all without 8 different apps and 30 Facebook groups" |

## 4. Design language

The brief specifies **blue primary, white background**. I've widened it into a system that feels social and mobile-first rather than corporate.

### Palette

| Token | Hex | Use |
|---|---|---|
| `p3-ink` | `#0B1220` | Primary text |
| `p3-ink-2` | `#475569` | Secondary |
| `p3-ink-3` | `#94A3B8` | Tertiary |
| `p3-paper` | `#FFFFFF` | App background (white per brief) |
| `p3-surface` | `#F8FAFD` | Cards / wells |
| `p3-line` | `#E2E8F0` | Borders |
| `p3-brand` | `#2563EB` | Electric blue primary |
| `p3-brand-deep` | `#1D4ED8` | Hover / pressed |
| `p3-brand-soft` | `#DBEAFE` | Soft brand tint |
| `p3-accent-mint` | `#14B8A6` | Secondary accent |
| `p3-accent-coral` | `#FB7185` | Tertiary accent (events, hot items) |
| `p3-accent-amber` | `#F59E0B` | Highlights |
| `p3-success` | `#16A34A` | Verified / done |
| `p3-warn` | `#D97706` | Soft warnings |
| `p3-danger` | `#DC2626` | Alerts |

Each of the 10 service tiles gets its own colour signature so the hub feels lively but consistent (community = brand blue, events = coral, jobs = mint, certification = amber, bank = indigo, tax = green, insurance = sky, migration = purple, accommodation = orange, support = rose).

### Typography

- **Display + body:** Plus Jakarta Sans (variable) — friendly, modern sans
- **Mono accents:** JetBrains Mono — for IDs, timestamps

### Shape & motion

- Generous rounded radii (12–24px) for an app-like feel
- Gradient mesh on hero / signup splash
- Card-based home grid styled like an iOS app launcher
- Hover lifts + slight scale on tile press (CSS only)

## 5. Page inventory

13 unique routes. URL prefix `/prototype2`.

| # | Path | Tier | Notes |
|---|---|---|---|
| 1 | `/` | 1 | Landing / promo for the WHV-side app |
| 2 | `/signup` | 1 | Multi-step (account type → WHV details → location → done) |
| 3 | `/login` | 2 | Simple form |
| 4 | `/home` | 1 | The 10-icon hub + ad slot + greeting (HERO) |
| 5 | `/profile` | 2 | User info, verifications, settings |
| 6 | `/community` | 1 | Discord/Telegram-style chat, location-filtered |
| 7 | `/events` | 1 | Humanitix-style event feed |
| 8 | `/events/[id]` | 2 | Event detail (cross-platform link) |
| 9 | `/jobs` | 1 | Job listings filtered to platform employers |
| 10 | `/jobs/[id]` | 2 | Job detail with the "fill form to apply" prompt |
| 11 | `/services/[slug]` | 1 | One template — reused by Certification, Bank Setup, Tax Agents, Insurance, Migration, Accommodation, Support (7 instances) |
| 12 | `/onboarding-checklist` | 2 | "First 30 days in Australia" checklist surfaced after signup |
| 13 | `/notifications` | 2 | In-app notifications |

## 6. Service categories (data model)

```ts
// All 10 service tiles
type ServiceSlug =
  | 'community'       // in-app: chat
  | 'events'          // in-app: feed
  | 'jobs'            // in-app: listings
  | 'certification'   // directory: RSA, white card, food safety, etc.
  | 'bank-setup'      // directory: CommBank, ANZ, Westpac, NAB, etc.
  | 'tax-agents'      // directory: H&R Block, Greythorn, etc.
  | 'insurance'       // directory: Bupa, Medibank, OVHC providers
  | 'migration'       // directory: MARA agents, second-year visa info
  | 'accommodation'   // directory: hostels, share-houses, Airbnb, NRMA stays
  | 'support';        // emergencies, embassies, mental health, scams

interface ServiceCategory {
  slug: ServiceSlug;
  label: string;
  iconName: string;
  colour: string;
  shortDesc: string;
  longDesc: string;
  providers: Provider[];
  faq: Array<{ q: string; a: string }>;
}

interface Provider {
  id: string;
  name: string;
  blurb: string;
  tags: string[];
  rating: number; // 0–5
  reviewCount: number;
  highlightedFor?: 'WHV';
  ctaLabel: string;
  ctaHref: string;
}
```

## 7. Component architecture

```
components/p3/
  ui/         button, input, select, textarea, checkbox, badge, card, avatar,
              icon-tile, app-icon, search-bar, chip, sheet, divider
  layout/     marketing-nav, app-nav, app-shell, mobile-tab-bar
  hub/        greeting, service-grid, ad-slot, location-pill
  community/  channel-list, channel-header, message-bubble, composer
  events/     event-card, event-detail-hero
  jobs/       job-card, job-detail-hero, apply-cta
  services/   provider-card, category-hero, checklist-block, faq-block
```

## 8. Out-of-scope assumptions (explicit)

- Real 3rd-party event sources — mocked with believable AU data
- Real provider directory accuracy — names are real Australian brands, content is generic
- Actual chat — community is read-only sample messages with composer that doesn't send
- Job application form ("TBC" in source) — implemented as a simple 3-question form
- Notifications — sample notifications only

## 9. Key flows

1. **First-time WHV user** — Landing → Signup → Home → Onboarding checklist nudge → Bank Setup → back to Home
2. **Job-seeker** — Home → Jobs → Jobs detail → Apply (3-question form prompt)
3. **Newly arrived, looking for community** — Home → Community → Browse Sydney channel → See a message → Open composer
4. **Curious about events** — Home → Events → Event detail → "Register on Humanitix" CTA

## 10. Success criteria

- A 25-year-old WHV holder can see the home screen and within 3 seconds know what the app is for
- All 10 service tiles are clickable and lead to a believable destination
- The two prototypes (`/prototype-business-plan` and `/prototype2`) are visually distinct enough that nobody mistakes one for the other
