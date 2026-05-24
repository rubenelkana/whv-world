# WHV Rocket Website Prototype — Design Spec

**Date:** 2026-05-24
**Status:** Draft → pending user review
**Source Figma:** [Rocket Website](https://www.figma.com/design/jd44TjOOM3SmIZWbH35jQk/Rocket-Website)

## 1. Goal & Scope

Build a clickable prototype of the "Rocket Website" Figma design as a Next.js web app. The prototype demonstrates navigation flow and visual fidelity to Figma. **No backend, no database, no real authentication, no form validation.** Forms render fields and submit by navigating to the next page only.

Out of scope for this spec: business-plan alignment fixes (employer flow, commitment verification, pricing page). Those are a separate future project — see `docs/figma-businessplan-alignment.md` (TBD) if needed.

## 2. Figma Frames in Scope

| Route | Figma Node | Frame Name |
|---|---|---|
| `/` | `2:6` | Homepage |
| `/signup` | `8:5245` | Creating profile |
| `/onboarding/needs` | `8:5146` | What do you need |
| `/onboarding/job` | `8:5436` | Job detail |
| `/onboarding/accommodation` | `8:5596` | Accommodation detail |
| `/onboarding/car` | `8:5735` | Car detail |

## 3. Navigation Flow

```
Homepage (/)
  ↓ click "Signup" CTA
Creating Profile (/signup)
  ↓ click "Create Profile" button
What Do You Need (/onboarding/needs)
  ↓ click one of three cards
Job Detail (/onboarding/job)            ┐
Accommodation Detail (/onboarding/accommodation)  ├─ all return to /onboarding/needs on submit
Car Detail (/onboarding/car)            ┘
```

Nav (Logo, Product, Pricing, Blog, Signup, Login) appears on all pages. None of the nav links go anywhere except Signup (→ `/signup`) and Logo (→ `/`).

## 4. Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (custom config with Figma tokens)
- **Font:** Space Grotesk via `next/font/google`
- **Icons:** lucide-react for generic icons; downloaded SVGs from Figma for custom illustrations
- **No UI library** — components built from scratch
- **No state management library** — local React state only, no global store
- **No backend, no API routes, no DB** — pure static-ish frontend

## 5. Folder Structure

```
whv-project/
├── context/                            (existing — business plan PDF)
├── docs/superpowers/specs/             (this design doc lives here)
├── app/
│   ├── layout.tsx                      (root layout, font setup, html/body wrapper)
│   ├── globals.css                     (Tailwind base + design tokens)
│   ├── page.tsx                        (Homepage — frame 2:6)
│   ├── signup/page.tsx                 (frame 8:5245)
│   └── onboarding/
│       ├── needs/page.tsx              (frame 8:5146)
│       ├── job/page.tsx                (frame 8:5436)
│       ├── accommodation/page.tsx      (frame 8:5596)
│       └── car/page.tsx                (frame 8:5735)
├── components/
│   ├── nav.tsx                         (shared header)
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── text-input.tsx
│   │   ├── select.tsx
│   │   ├── file-upload.tsx
│   │   └── checkbox.tsx
│   └── onboarding/
│       ├── needs-card.tsx
│       ├── form-grid.tsx
│       └── page-header.tsx
├── public/assets/                      (downloaded from Figma)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

## 6. Design Tokens

Configured in `tailwind.config.ts` extending the default theme.

**Colors:**
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#631CA0` | Buttons, accents, links |
| `dark` | `#080808` | Heading text |
| `body` | `#FFFFFF` | Page background, button text |
| `border` | `#B2B2B2` | Input borders (Black/B60) |
| `muted` | `#7A7A7A` | Secondary text (Black/B100) |
| `placeholder` | `#B2B2B2` | Input placeholder text |
| `yellow` | extracted at implementation time | Homepage accent rectangle (Figma `Yellow/Y20`) |

The exact hex for `yellow` is read from the homepage Figma data during implementation — this is a known unknown, not a blocker. Default fallback if extraction fails: `#FFE066`.

**Typography:**
- Font family: Space Grotesk
- Weights: 400 (regular), 500 (medium), 700 (bold)
- Sizes used: 46px (h1), 39px (logo), 20px (subheading), 18px (nav), 16px (body), 16px (button)

**Radius:**
- `rounded-input` → 8px
- `rounded-button` → 50px (pill)
- `rounded-cta` → 100px (large CTA)
- `rounded-card` → 12px

**Container:**
- Desktop: 1440px max-width, centered
- Mobile: full width with horizontal padding

## 7. Components

### 7.1 Shared

**`<Nav>`** — top header. Imported and rendered by each page (not in root layout) so individual pages can pick a variant.
- Props: `variant?: "default" | "transparent"` (homepage uses transparent over hero, others use default)
- Contents: Logo (text "Logo"), nav links (Product, Pricing, Blog), Signup button (filled purple pill), Login button (outline pill)
- Mobile (`<md`): hide nav links, show hamburger icon (decorative — no menu opens)

### 7.2 UI Atoms (`components/ui/`)

**`<Button>`**
- Props: `variant: "primary" | "secondary"`, `size: "md" | "lg"`, standard button props
- Primary: `bg-primary text-body rounded-button`
- Secondary: outline + dark text
- Sizes: `md` = `px-10 py-4`, `lg` = `px-12 py-5 rounded-cta`

**`<TextInput>`**
- Props: `label`, `placeholder`, `icon?` (lucide ReactNode), `type?`, plus native input props
- Layout: label above border-box, optional left icon, placeholder text
- Visual: 8px radius, 1px border `#B2B2B2`, 60px height

**`<Select>`**
- Props: `label`, `placeholder`, `options: {value, label}[]`
- Uses native `<select>` styled to match Figma (no fancy dropdown)

**`<FileUpload>`**
- Props: `label`, `accept?`
- Decorative large area with upload icon — no real file handling needed for prototype

**`<Checkbox>`**
- Props: `label`, standard input props

### 7.3 Composites (`components/onboarding/`)

**`<NeedsCard>`**
- Props: `icon`, `title`, `subtitle`, `href`
- Used on `/onboarding/needs` for Job / Accommodation / Car choices
- Clickable card with hover state

**`<FormGrid>`**
- Two-column responsive grid (`grid-cols-1 md:grid-cols-2 gap-6`)
- Wraps form inputs in onboarding pages

**`<PageHeader>`**
- Props: `title`, `subtitle`
- Used at top of signup + onboarding pages

## 8. Asset Handling

**Strategy: Download key illustrations from Figma via MCP, use lucide-react for generic icons.**

Process:
1. Fetch each Figma frame via `mcp__figma-developer-mcp__get_figma_data`.
2. Identify nodes with `IMAGE-SVG` type or `imageRef` fills.
3. Download via `mcp__figma-developer-mcp__download_figma_images` to `public/assets/`.
4. Reference via Next.js `<Image>` component.

Target downloads (final list confirmed during implementation):
- Rocket illustration (homepage hero)
- Abstract Line Splash (homepage decoration)
- Any custom decorative shapes (Vector 1, Ellipses) that don't map well to Tailwind

Generic icons (mail, lock, eye, person, phone, chevron-down) → lucide-react, not downloaded.

If a Figma export fails or produces a broken asset, fall back to a lucide icon or a CSS-only approximation rather than blocking on the asset.

## 9. Mobile Fallback

**Strategy:** Use Tailwind's `md:` breakpoint (768px). Below `md`, fall back to mobile-friendly defaults. Above `md`, render the Figma desktop layout.

Per-page mobile behavior:
- **Nav:** hide nav links, show hamburger icon (decorative)
- **Homepage hero:** illustration stacks below the text instead of overlapping
- **Signup form:** 2-column → 1-column
- **Needs cards:** horizontal row → vertical stack
- **Onboarding forms:** 2-column → 1-column

No tablet-specific design. No mobile-specific interactions. Goal: "not ugly on a phone."

## 10. Verification Plan

No automated tests for this prototype. Verification by inspection:

1. `npm run dev` → open all 6 pages, click through full navigation flow end-to-end (Homepage → Signup → Needs → Job/Accom/Car and back).
2. Side-by-side visual comparison with Figma at 1440px desktop width — major elements (heading, hero, form fields, buttons, nav) should match in layout, color, typography.
3. Resize browser to mobile width (~375px) — confirm nothing overflows, content stacks correctly, no horizontal scrollbars.
4. `npm run build` → must complete without TypeScript or lint errors.

## 11. Deployment

Target: Vercel, linked to a GitHub repository, auto-deploy on push to `main`.

- **Hosting:** Vercel (free tier sufficient for prototype)
- **Repo:** GitHub (to be created — repo name `whv-world` or similar)
- **Subdomain:** `whv-world.vercel.app` (Vercel default; `.com` would require a custom domain purchased separately)
- **Trigger:** auto-deploy on every push to `main` branch
- **Build command:** `next build` (Vercel auto-detects Next.js)

Implementation order:
1. Build & verify locally (`npm run dev`, `npm run build`)
2. `git init` + initial commit
3. Create GitHub repo + push
4. Connect Vercel to the GitHub repo + deploy
5. Confirm live URL works end-to-end

Deployment is part of "done" for this project — not deferred.

## 12. Out of Scope / Explicit Non-Goals

- Backend, API, database, or any persistence.
- Real authentication, password hashing, sessions.
- Form validation (required fields, regex, etc.).
- Pricing page, blog page, employer-side flow (not in scope of these 6 Figma frames).
- Pixel-perfect mobile design (no mobile mockup exists in Figma).
- Accessibility audit beyond basic semantic HTML.
- Internationalization, dark mode, theming.
- Custom `.com` domain (requires separate purchase; default `.vercel.app` is sufficient).

## 13. Open Questions / Assumptions

- **Yellow accent color:** Exact hex to be confirmed when fetching homepage Figma data during implementation.
- **Login button behavior:** No Login page in Figma — button is decorative or links to a future `/login`. Assumed decorative for now.
- **Product / Pricing / Blog nav links:** No corresponding pages — assumed decorative.
- **"Logo":** Figma shows the literal text "Logo". Assumed to remain as text placeholder until a real logo asset is provided.
