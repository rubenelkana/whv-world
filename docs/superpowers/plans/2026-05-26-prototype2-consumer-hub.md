# Prototype2 — Consumer Hub Implementation Plan

> **For agentic workers:** Visual prototype, no backend, no tests. Verification = `npm run build` + spot-check routes. Same pattern as the earlier `/prototype-business-plan` plan.

**Goal:** Build the 13-route consumer-hub prototype from the design spec at `docs/superpowers/specs/2026-05-26-prototype2-consumer-hub-design.md`.

**Architecture:** Additive under `/prototype2`. Tailwind tokens prefixed `p3-*`. Plus Jakarta Sans + JetBrains Mono loaded in nested layout. Components under `components/p3/`. Mock data under `lib/mock-p3/` (kept separate from the B2B prototype's mocks).

---

## File map

```
app/prototype2/
  layout.tsx, p3.css, page.tsx (landing)
  signup/page.tsx, login/page.tsx
  home/page.tsx
  profile/page.tsx
  community/page.tsx
  events/page.tsx
  events/[id]/page.tsx
  jobs/page.tsx
  jobs/[id]/page.tsx
  services/[slug]/page.tsx
  onboarding-checklist/page.tsx
  notifications/page.tsx

components/p3/
  ui/  brand/  layout/  hub/  community/  events/  jobs/  services/

lib/mock-p3/  types.ts  services.ts  events.ts  jobs.ts  messages.ts  index.ts
```

## Batches

### Batch 1 — Foundation
- [ ] Add `p3-*` colour/font/radius/shadow tokens to `tailwind.config.ts` (additive — keep p2 and original).
- [ ] Create `app/prototype2/p3.css` with scoped base styles.
- [ ] Create `app/prototype2/layout.tsx` loading Plus Jakarta Sans + JetBrains Mono.
- [ ] Build mock data under `lib/mock-p3/`.

### Batch 2 — Primitives
- [ ] Create primitives in `components/p3/ui/`: button, input, select, textarea, checkbox, badge, card, avatar, app-icon, search-bar, chip, divider.

### Batch 3 — Layout & landing
- [ ] Marketing nav, app nav, app shell.
- [ ] Landing page.
- [ ] Signup (multi-step) + Login.

### Batch 4 — Hub (HERO)
- [ ] `home` page: greeting, location pill, 10-tile grid, ad slot, onboarding checklist surface.
- [ ] Mobile tab bar component (sticky bottom on mobile).

### Batch 5 — Core 3 deep dives
- [ ] Community page (channels + messages + composer)
- [ ] Events list + detail
- [ ] Jobs list + detail (with apply form modal)

### Batch 6 — Service directory template + 7 instances
- [ ] `services/[slug]/page.tsx` with seven static params: certification, bank-setup, tax-agents, insurance, migration, accommodation, support.
- [ ] Provider card component.

### Batch 7 — Tail pages
- [ ] Profile, Notifications, Onboarding checklist.

### Batch 8 — Verify & deploy
- [ ] `npm run build` green.
- [ ] Commit & push to `main`.
- [ ] Confirm Vercel deploy.
