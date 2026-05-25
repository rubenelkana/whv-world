# WHV World Prototype Implementation Plan

> **For agentic workers:** This plan is for a visual frontend prototype (Next.js, no backend, no real tests). "Verification" steps are `npm run build` (catches type/import errors) + spot-checks of routes. Skip strict TDD — there's nothing to test besides "page renders."

**Goal:** Build the 15-page WHV World prototype defined in `docs/superpowers/specs/2026-05-25-whv-world-prototype-design.md`.

**Architecture:** Next.js 14 App Router + Tailwind + TypeScript. **All new code is namespaced under `/prototype-business-plan/` (routes) and `components/p2/` (components) so the existing Figma prototype at `/`, `/signup`, `/onboarding/*` is untouched.** Tailwind config receives additive tokens (`p2-*` prefix). New fonts (Inter, Fraunces, JetBrains Mono) are loaded in the prototype's nested layout, not the root layout. Static mocked data in `lib/mock/`. No backend, no auth, no DB.

**Why `p2/` namespace:** "p2" = "prototype 2" (concise, won't collide with existing components/onboarding, components/ui — those stay as-is for the Figma prototype). Inside `app/prototype-business-plan/` the route names are clean (no prefix needed).

**Tech Stack:** Next.js 14.2, React 18, TypeScript 5, Tailwind 3.4, lucide-react. Add Inter + Fraunces via `next/font/google`.

---

## File structure

```
# UNCHANGED (existing Figma prototype — do not touch):
app/layout.tsx, app/globals.css, app/page.tsx, app/signup/**, app/onboarding/**
components/nav.tsx, components/onboarding/**, components/p2/ui/**
tailwind.config.ts  (extend additively, do not remove existing tokens)

# NEW (additive):
app/prototype-business-plan/
  layout.tsx                            # loads Inter+Fraunces+JBMono, applies p2 theme wrapper
  page.tsx                              # Landing
  pricing/page.tsx
  login/page.tsx
  signup/page.tsx
  dashboard/
    layout.tsx                          # app shell wrapper (sidebar + topbar)
    page.tsx                            # Overview
    jobs/page.tsx
    jobs/new/page.tsx
    jobs/[id]/page.tsx                  # HERO
    candidates/page.tsx
    candidates/[id]/page.tsx
    reliability/page.tsx
    notifications/page.tsx
  worker/
    layout.tsx
    signup/page.tsx
    dashboard/page.tsx
    offers/[id]/page.tsx

components/p2/
  ui/         button, input, select, textarea, checkbox, radio, badge, card, avatar, tabs, table, progress, tooltip, dialog
  brand/      logo, marketing-section, stat-card
  pipeline/   stage-tracker, candidate-card, commitment-timeline, backup-queue, risk-alert
  worker/     verification-badges, reliability-score, availability-calendar
  layout/     app-shell, sidebar, topbar, marketing-nav, marketing-footer

lib/
  cn.ts                                 # className helper (clsx + tailwind-merge)
  mock/                                 # types, workers, employers, jobs, placements, index
```

## Task batches

The plan is organised in 7 batches. Each batch ends with `npm run build` to catch errors before moving on.

---

### Batch 1 — Additive foundation (no destruction)

**Files:**
- Modify: `tailwind.config.ts` (add `p2-*` tokens additively), `package.json` (add `clsx`, `tailwind-merge`)
- Create: `lib/cn.ts`, `lib/mock/types.ts`
- Create: `app/prototype-business-plan/layout.tsx` (loads new fonts via CSS vars, wraps children in p2 theme div)
- Create: `app/prototype-business-plan/p2.css` (CSS vars for tokens + scoped base styles)

**Constraints:** Do NOT modify `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, or any existing routes/components. Do NOT remove or rename existing Tailwind tokens.

- [ ] **1.1** Install helpers: `npm i clsx tailwind-merge`.
- [ ] **1.2** Extend `tailwind.config.ts` additively. Keep existing `primary`, `dark`, `body`, `border`, `muted`, `placeholder`, `yellow`. Add new entries under `colors` with `p2-` prefix (`p2-ink`, `p2-paper`, etc. — all tokens from spec §4). Add new `fontFamily` entries: `p2-sans`, `p2-display`, `p2-mono`. Add new `borderRadius` entries with `p2-` prefix.
- [ ] **1.3** Create `app/prototype-business-plan/p2.css` — defines `:root { --p2-* }` CSS vars and a `.p2-root` class that resets within scope (font, background, color). Use `@import` from layout below.
- [ ] **1.4** Create `app/prototype-business-plan/layout.tsx`. Loads `Inter`, `Fraunces`, `JetBrains_Mono` via `next/font/google` with CSS-variable mode. Wraps `{children}` in `<div className={`p2-root ${inter.variable} ${fraunces.variable} ${jbMono.variable} font-p2-sans bg-p2-paper text-p2-ink min-h-screen`}>`. Imports `./p2.css`. Set per-route metadata (title: "WHV World — Workforce ERP for Seasonal WHV Hiring").
- [ ] **1.5** Create `lib/cn.ts` (clsx + tailwind-merge utility).
- [ ] **1.6** Create `lib/mock/types.ts` with all interfaces from spec §7.
- [ ] **1.7** Create temporary `app/prototype-business-plan/page.tsx` with a "Hello p2" smoke marker so the route exists.
- [ ] **1.8** `npm run build`. Verify both `/` (existing Figma) AND `/prototype-business-plan` build clean. Commit: `feat(p2): add additive prototype foundation under /prototype-business-plan`.

### Batch 2 — Mock data + UI primitives

**Files:**
- Create: `lib/mock/{workers,employers,jobs,placements,index}.ts`
- Create/Replace: `components/p2/ui/{button,input,select,textarea,checkbox,radio,badge,card,avatar,tabs,table,progress,tooltip,dialog}.tsx`
- Create: `components/p2/brand/logo.tsx`

- [ ] **2.1** Seed `lib/mock/workers.ts` — 25 worker records spanning nationalities listed in business plan (UK, France, Germany, Italy, Taiwan, South Korea, Indonesia, USA), visa 417/462, AU regions, varied reliability scores.
- [ ] **2.2** Seed `lib/mock/employers.ts` — 8 employers across horticulture (Tully Citrus Co, Mildura Vineyards), agriculture (Riverina Farm Co), regional hospitality (Cairns Reef Lodge, etc.).
- [ ] **2.3** Seed `lib/mock/jobs.ts` — 12 jobs tied to employers, varied start dates/headcounts.
- [ ] **2.4** Seed `lib/mock/placements.ts` — 40 placements distributed across stages (sourced/offer/accepted/signed/check_7d/check_48h/started/stayed) with realistic risk levels. Include CheckEvent history.
- [ ] **2.5** Index re-exports in `lib/mock/index.ts`.
- [ ] **2.6** Write each UI primitive with sensible variants (small, focused files — one component per file). Use `cn()` for className composition. Reference Linear/Vercel for visual style. Replace existing `components/p2/ui/*` files.
- [ ] **2.7** Create `components/p2/brand/logo.tsx` — 2-color SVG mark + wordmark variants.
- [ ] **2.8** `npm run build`. Commit: `feat: add mock data layer and UI primitive library`.

### Batch 3 — Layout shells + marketing nav/footer

**Files:**
- Create: `components/p2/layout/{marketing-nav,marketing-footer,app-shell,sidebar,topbar}.tsx`
- Create: `components/p2/brand/{marketing-section,stat-card}.tsx`

- [ ] **3.1** `marketing-nav.tsx` — sticky top nav: Logo, links (Product, For Agencies, For Employers, Pricing), Login/Get Started CTAs.
- [ ] **3.2** `marketing-footer.tsx` — multi-column footer with brand statement, navigation, legal, PT. Langkah Inovasi Digital attribution.
- [ ] **3.3** `app-shell.tsx` — server component wrapping sidebar + topbar + main; used as `app/prototype-business-plan/dashboard/layout.tsx`.
- [ ] **3.4** `sidebar.tsx` — fixed left nav with sections (Overview, Jobs, Candidates, Reliability, Notifications), org switcher at top, user menu at bottom.
- [ ] **3.5** `topbar.tsx` — breadcrumbs, search, notifications bell, profile.
- [ ] **3.6** `marketing-section.tsx` — wrapper with eyebrow + heading + content.
- [ ] **3.7** `stat-card.tsx` — KPI tile (label, value, delta, sparkline placeholder).
- [ ] **3.8** `npm run build`. Commit: `feat: add layout shells (marketing + app)`.

### Batch 4 — Marketing pages

**Files:**
- Create: `app/page.tsx`, `app/pricing/page.tsx`

- [ ] **4.1** `app/page.tsx` — Landing with sections per spec §5: editorial hero ("Workers actually show up. Or you know before they don't."), visual pipeline mock embedded, problem stat band ($5,500 / 30% / 224K), 5-module solution grid, how-it-works 3-step, audience split (Agencies / Employers cards), pricing teaser strip, founder note from Lidya, final CTA.
- [ ] **4.2** `app/pricing/page.tsx` — 3 tiers, comparison table, trial banner, FAQ accordion.
- [ ] **4.3** Browser check: visit `/` and `/pricing`. Commit: `feat: build landing and pricing pages`.

### Batch 5 — Auth + worker side

**Files:**
- Create: `app/login/page.tsx`, `app/signup/page.tsx`
- Create: `app/prototype-business-plan/worker/layout.tsx`, `app/prototype-business-plan/worker/signup/page.tsx`, `app/prototype-business-plan/worker/dashboard/page.tsx`, `app/prototype-business-plan/worker/offers/[id]/page.tsx`
- Create: `components/p2/worker/{verification-badges,reliability-score,availability-calendar}.tsx`

- [ ] **5.1** `app/login/page.tsx` — split layout, brand panel left, form right.
- [ ] **5.2** `app/signup/page.tsx` — 3-step wizard with tab control of state (account type → org → first intent).
- [ ] **5.3** Worker layout — lighter app shell variant (top nav only, no sidebar).
- [ ] **5.4** Worker components: `verification-badges`, `reliability-score`, `availability-calendar`.
- [ ] **5.5** `app/prototype-business-plan/worker/signup/page.tsx` — streamlined profile form.
- [ ] **5.6** `app/prototype-business-plan/worker/dashboard/page.tsx` — offers section, upcoming jobs, today's reconfirmation prompts.
- [ ] **5.7** `app/prototype-business-plan/worker/offers/[id]/page.tsx` — offer hero, employer info, contract preview, sign + 7-day/48-hour reconfirm widgets.
- [ ] **5.8** Browser check. Commit: `feat: build auth + worker-side pages`.

### Batch 6 — Dashboard + Hero pipeline page

**Files:**
- Create: `app/prototype-business-plan/dashboard/layout.tsx`, `app/prototype-business-plan/dashboard/page.tsx`, `app/prototype-business-plan/dashboard/jobs/page.tsx`, `app/prototype-business-plan/dashboard/jobs/new/page.tsx`, `app/prototype-business-plan/dashboard/jobs/[id]/page.tsx`
- Create: `components/p2/pipeline/{stage-tracker,candidate-card,commitment-timeline,backup-queue,risk-alert}.tsx`

- [ ] **6.1** `app/prototype-business-plan/dashboard/layout.tsx` — wrap children in `<AppShell>`.
- [ ] **6.2** `app/prototype-business-plan/dashboard/page.tsx` — Overview: at-risk alert banner (count + CTA), 4 KPI cards, pipeline funnel chart (pure CSS bars), recent activity feed.
- [ ] **6.3** `app/prototype-business-plan/dashboard/jobs/page.tsx` — table of jobs with stage distribution micro-bars, filter chips.
- [ ] **6.4** `app/prototype-business-plan/dashboard/jobs/new/page.tsx` — multi-step posting form.
- [ ] **6.5** Build pipeline components — each in its own focused file.
- [ ] **6.6** `app/prototype-business-plan/dashboard/jobs/[id]/page.tsx` **(HERO)** — job header (role/location/dates/headcount/days-to-start), `<StageTracker>`, kanban of candidates per stage, right rail with `<RiskAlert>` + `<BackupQueue>`; clicking a candidate opens drawer with `<CommitmentTimeline>`.
- [ ] **6.7** Browser check: navigate `/dashboard` → `/dashboard/jobs` → `/dashboard/jobs/[id]`. Verify hero page reads coherently. Commit: `feat: build agency dashboard + hero pipeline page`.

### Batch 7 — Worker DB + analytics + final polish

**Files:**
- Create: `app/prototype-business-plan/dashboard/candidates/page.tsx`, `app/prototype-business-plan/dashboard/candidates/[id]/page.tsx`, `app/prototype-business-plan/dashboard/reliability/page.tsx`, `app/prototype-business-plan/dashboard/notifications/page.tsx`

- [ ] **7.1** Candidates search — filter rail (visa, location, availability window, industry, languages, reliability min) + result grid of worker cards.
- [ ] **7.2** Candidate profile — identity header, verification badges, reliability score with breakdown, availability calendar, prior placements list, "Send offer" CTA.
- [ ] **7.3** Reliability — cohort retention curve (CSS), on-time-start by region table, risk-pattern callouts.
- [ ] **7.4** Notifications — chronological reconfirmation activity log with filter.
- [ ] **7.5** Polish pass: walk every route, fix overflow/spacing/contrast issues, ensure no console errors, mobile responsive degradation banner where needed.
- [ ] **7.6** `npm run build` clean. Commit: `feat: build candidate db, analytics, notifications + final polish`.

---

## Self-review checklist

- ✅ All 15 spec pages covered (1 landing, 1 pricing, 2 auth, 8 dashboard, 3 worker)
- ✅ All component categories in spec §6 have a creation task
- ✅ Mock data shape (spec §7) defined in 1.7 and seeded in batch 2
- ✅ Key flows (spec §8) walkable after batch 7 completes
- ✅ No placeholders / "TBD" — each task names files and content
