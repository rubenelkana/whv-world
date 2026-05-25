# WHV World Prototype — Design Spec

**Date:** 2026-05-25
**Author:** Ruben E. (CPO) + Claude
**Source of truth:** `context/business-plan/Business Plan Lidya - WHV World.pdf`

---

## 1. Goal

Build a high-fidelity, click-through prototype of WHV World that **demonstrates the unique value proposition** stated in the business plan — commitment verification & hiring reliability for seasonal WHV recruitment — to a quality bar suitable for:

- Pilot conversations with recruitment agencies and seasonal employers
- Internal alignment between business plan and product
- Investor / partnership demos

**Coexistence requirement:** This is an *additive* prototype mounted at `/prototype-business-plan/*`. The existing Figma-derived prototype (`/`, `/signup`, `/onboarding/*`) is NOT removed, NOT restyled, and NOT impacted in any way. Both prototypes live in the same Next.js app and can be compared side-by-side.

## 2. Non-goals

- Backend, authentication, real data — all data is mocked statically
- Native mobile apps — web-only prototype, responsive but desktop-first (B2B users)
- Feature completeness for production — only the surfaces that prove the value
- Internationalisation — English only (Australian target market)
- Accommodation, car rental, or any feature outside the business plan

## 3. Target users

The prototype serves three personas. Quality bar is highest for #1 and #2 (paying customers).

| # | Persona | Context | Job-to-be-done on prototype |
|---|---------|---------|------------------------------|
| 1 | **Sarah — Recruitment Agency Manager** | Manages 50–100 WHV placements/yr across multiple farm clients in NSW/QLD | "Show me which placements are at risk this week and what to do about them" |
| 2 | **Marcus — Operations Manager at a horticulture farm** | Hires 20–40 seasonal pickers each harvest, dependent on workers showing up on day 1 | "Tell me before harvest day if my crew is solid, give me backups if not" |
| 3 | **Léa — French WHV holder, age 24** | Just arrived Sydney, looking for a regional job to extend her visa | "Find me a real job offer with a clear start date and contract" |

## 4. Design language

The visual direction departs deliberately from the prior Figma (purple consumer-app, 100px-radius CTAs). The brand needs to read as a *workforce ERP* — trustworthy, dense-but-readable, slightly editorial. Reference points: Linear, Vercel, Greenhouse, Pitch.

### Palette

| Token | Hex | Use |
|-------|-----|-----|
| `ink` | `#0B0F19` | Primary text |
| `ink-2` | `#475569` | Secondary text |
| `ink-3` | `#94A3B8` | Tertiary / placeholders |
| `paper` | `#FAFAF7` | App background (warm off-white) |
| `surface` | `#FFFFFF` | Card / panel |
| `line` | `#E5E7EB` | Borders, dividers |
| `brand` | `#1E2F5C` | Primary brand (deep navy — sophisticated nod to the brand's dark blue) |
| `brand-2` | `#3B82F6` | Interactive accents (links, focused states) |
| `accent` | `#06B6D4` | Highlight cyan (sparingly — pulled from brand's light-blue circle) |
| `success` | `#15803D` | "Committed", "Started", verified |
| `warn` | `#D97706` | "At risk", reconfirmation pending |
| `danger` | `#B91C1C` | "Failed to start", "No-show" |
| `cream` | `#F5F1E8` | Section tint (landing) |
| `slate-tint` | `#F1F5F9` | Section tint (app) |

### Typography

- **UI font:** Inter (variable) — replaces Space Grotesk
- **Editorial display:** Fraunces (serif, optical sizing) — for landing-page headlines only, to give brand personality
- **Mono:** JetBrains Mono — for IDs, timestamps, code-like data

### Shape

- Border radius: `4px` (chips), `8px` (inputs, buttons), `12px` (cards), `16px` (large panels). **No pill buttons.**
- Shadows: subtle, layered (e.g. `0 1px 2px rgba(11,15,25,0.04), 0 0 0 1px rgba(11,15,25,0.06)`)
- Spacing scale: 4/8/12/16/24/32/48/64/96

### Motion

Sparingly — fade + 4px lift on hover for cards; no auto-playing carousels; status-change pulses on commitment-check timeline only.

## 5. Page inventory

15 pages total, all mounted under `/prototype-business-plan/*`. Tier 1 = polished hero surfaces; Tier 2 = functional & on-brand.

> **Path convention:** every path below is shorthand. The actual URL is prefixed with `/prototype-business-plan`. So `/dashboard/jobs/[id]` = `/prototype-business-plan/dashboard/jobs/[id]`.

### Marketing (Tier 1)

1. `/` — **Landing** (URL: `/prototype-business-plan`). Hero with embedded pipeline-UI mock, problem section ($5.5K replacement cost), 5-module solution, how-it-works, audience split (agencies vs employers), pricing teaser, founder note, CTA.
2. `/pricing` — 3 tiers + "1 free hire + 1 backup" trial CTA. Comparison table.

### Auth (Tier 2)

3. `/login` — Email + password (visual only).
4. `/signup` — Multi-step: (1) Account type (Agency / Employer / Worker) → (2) Org details → (3) First hiring intent.

### Employer/Agency app — the hero surface

5. `/dashboard` **(Tier 1)** — At-risk alert banner, KPI cards (active placements, no-show rate, avg time-to-fill, on-time-start rate), pipeline funnel chart, recent reconfirmation activity feed.
6. `/dashboard/jobs` (Tier 2) — Table of all job postings with stage indicators, filterable.
7. `/dashboard/jobs/new` (Tier 2) — Stepped form to post a job (role, location, dates, headcount, requirements).
8. `/dashboard/jobs/[id]` **(Tier 1 — HERO PAGE)** — **The flagship**:
   - Kanban-style pipeline: *Sourced → Offer → Accepted → Contract Signed → 7-day Check → 48-hour Check → Started → Stayed (7d)*
   - Per-candidate commitment timeline with verification badges
   - Backup-candidate panel (always visible)
   - Risk-alert sidebar
9. `/dashboard/candidates` (Tier 2) — Worker database search. Left filter rail (visa subclass, location, availability window, start date, industry, languages). Result cards.
10. `/dashboard/candidates/[id]` **(Tier 1)** — Worker profile from employer view: avatar + identity, verification badges (visa, ID, work-right, references), reliability score with breakdown, availability calendar, prior placements, "Send offer" CTA.
11. `/dashboard/reliability` (Tier 2) — Analytics: cohort retention curve, on-time-start by region/industry, risk-pattern callouts.
12. `/dashboard/notifications` (Tier 2) — Activity log of system reconfirmation events.

### Worker app — lighter but coherent

13. `/worker/signup` (Tier 2) — Streamlined worker profile creation.
14. `/worker/dashboard` (Tier 2) — Incoming offers, upcoming jobs, today's reconfirmation prompts.
15. `/worker/offers/[id]` **(Tier 1)** — A live job offer with sign-contract widget + 7-day / 48-hour reconfirm UI.

## 6. Component architecture

```
components/
  ui/                       # Primitives — replace existing rounded-consumer set
    button.tsx              # variants: primary, secondary, ghost, danger
    input.tsx               # text, with label & helper
    select.tsx              # native-styled
    textarea.tsx
    checkbox.tsx
    radio.tsx
    badge.tsx               # status pill (success | warn | danger | info | neutral)
    card.tsx                # surface wrapper
    avatar.tsx              # with country flag overlay
    tabs.tsx
    table.tsx
    progress.tsx            # commitment-stage progress
    tooltip.tsx
    dialog.tsx
  brand/
    logo.tsx                # 2-color mark — keep brand identity
    section.tsx             # marketing section wrapper
    stat-card.tsx           # KPI card for dashboard
  pipeline/
    stage-tracker.tsx       # horizontal stage timeline
    candidate-card.tsx      # used in kanban
    commitment-timeline.tsx # vertical timeline of checks per candidate
    backup-queue.tsx
    risk-alert.tsx
  worker/
    verification-badges.tsx
    reliability-score.tsx
    availability-calendar.tsx
  layout/
    app-shell.tsx           # sidebar + topbar for /dashboard/**
    sidebar.tsx
    topbar.tsx
    marketing-nav.tsx
    marketing-footer.tsx
```

## 7. Data model (mocked)

All data lives in `lib/mock/` as typed TS, seeded with realistic Australian seasonal context (regions: Tully QLD, Mildura VIC, Margaret River WA, Northern Rivers NSW; industries: citrus, vineyards, hospitality; worker nationalities: UK, France, Germany, Italy, Taiwan, South Korea per business plan p.21).

```ts
// lib/mock/types.ts
type VisaSubclass = '417' | '462';
type Stage = 'sourced'|'offer'|'accepted'|'signed'|'check_7d'|'check_48h'|'started'|'stayed';
type RiskLevel = 'green'|'amber'|'red';
type ReliabilityScore = { value: number; breakdown: { onTime: number; stayed: number; reconfirmed: number } };

interface Worker { id; name; nationality; visa; arrivalDate; availability; industries; locations; reliability; verifications; ... }
interface Employer { id; name; industry; location; ... }
interface Job { id; employer; role; location; startDate; headcount; requirements; ... }
interface Placement { id; job; worker; stage; commitmentChecks: CheckEvent[]; risk; ... }
interface CheckEvent { id; type: '7d'|'48h'|'arrival'; status: 'pending'|'confirmed'|'failed'; timestamp; ... }
```

A small set of fixtures: ~25 workers, 8 employers, 12 jobs, 40 placements at varied stages, ~15 backup candidates per active job.

## 8. Key flows demonstrated

1. **Agency onboarding** — Land → Pricing → Signup as Agency → Dashboard (with seeded data, so it doesn't look empty)
2. **Spot a risk** — Dashboard at-risk banner → Click into Job Pipeline → See amber candidate → View commitment timeline → Open backup queue → "Promote backup" interaction
3. **Find a worker** — Sidebar → Candidates → Filter by NSW + 462 visa + Sep–Nov availability → Open profile → "Send offer"
4. **Worker side** — Worker logs in → sees offer → signs contract → does 48-hour reconfirm → status flips to "Committed" on employer side

## 9. Out-of-scope assumptions (made for the prototype)

- **Onboarding contract content** — generic Australian seasonal agreement placeholder text
- **Reliability score formula** — visual treatment only; weighted blend of on-time start (40%), stayed-7d (40%), reconfirmation responsiveness (20%)
- **Pricing display** — uses business plan figures verbatim (AUD $20/unlock, $500 Tier 1, $1000 Tier 2)
- **Mobile breakpoints** — designed for ≥1280px; degrades to readable single-column ≥640px; below that shows "use desktop for the full experience" banner on app pages (acceptable for B2B SaaS)
- **No real auth** — `/login` and `/signup` are visual; clicking submit deep-links into the seeded dashboard

## 10. Success criteria

A reviewer (Lidya, potential pilot agency, investor) can:

- Land on `/` and within 30 seconds say "ah, this is about workers actually showing up, not job posting"
- Reach `/dashboard/jobs/[id]` within 3 clicks and immediately understand stage flow & backup mechanism
- Distinguish WHV World from Seek/Indeed by visible UI differences alone
- Take a screenshot from any page and use it in a pitch deck without embarrassment

## 11. What this spec does NOT decide

- Final tone of copy (placeholder copy will be drafted; CEO can revise)
- Real legal-compliant contract template
- Production tech choices (DB, auth provider, hosting) — out of prototype scope

---

*This spec is the source of truth for the prototype build. The implementation plan derives directly from §5–§7.*
