# WHV Rocket Website Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a clickable Next.js prototype of the 6-frame WHV Rocket Website Figma design, verified locally and deployed to Vercel via GitHub.

**Architecture:** Next.js 14 App Router, file-based routing for 6 pages, custom Tailwind theme with Figma design tokens, components built from scratch (no UI library), assets downloaded from Figma via MCP, mobile fallback via Tailwind breakpoints.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Space Grotesk (next/font/google), lucide-react, Figma Developer MCP, Vercel (deployment), GitHub.

**Reference spec:** `docs/superpowers/specs/2026-05-24-whv-rocket-website-prototype-design.md`

**Note on verification:** This prototype has no automated tests (per spec section 10). Each task ends with a visual / build verification step instead of a passing test.

---

## Task 1: Scaffold Next.js Project (Manual)

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `next-env.d.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

We scaffold manually (instead of `create-next-app`) because the project directory already contains `docs/`, `context/`, `.gitignore`, and `.git/` — `create-next-app .` would conflict. Manual scaffold avoids those problems and gives us exactly the structure we want.

- [ ] **Step 1: Create package.json**

Create `package.json`:

```json
{
  "name": "whv-world",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.15",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.20",
    "eslint": "^8",
    "eslint-config-next": "14.2.15",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.mjs**

Create `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: Create next-env.d.ts**

Create `next-env.d.ts`:

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

- [ ] **Step 5: Create postcss.config.mjs**

Create `postcss.config.mjs`:

```js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

- [ ] **Step 6: Create minimal tailwind.config.ts (full theme comes in Task 2)**

Create `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 7: Create app/layout.tsx (placeholder — full version in Task 2)**

Create `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WHV World",
  description: "Find jobs, accommodation, and a car for your working holiday in Australia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create app/page.tsx (placeholder)**

Create `app/page.tsx`:

```tsx
export default function Home() {
  return <main className="p-10">WHV World scaffold OK</main>;
}
```

- [ ] **Step 9: Create app/globals.css**

Create `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 10: Install dependencies**

```bash
npm install
```

Expected: completes with `node_modules/` created, no errors.

- [ ] **Step 11: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts on http://localhost:3000. Open browser, page shows "WHV World scaffold OK". Stop with Ctrl+C.

- [ ] **Step 12: Commit scaffold**

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs next-env.d.ts postcss.config.mjs tailwind.config.ts app/
git commit -m "chore: scaffold Next.js 14 project with TypeScript and Tailwind"
```

---

## Task 2: Configure Design Tokens & Font

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Configure Tailwind theme with Figma tokens**

Replace contents of `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#631CA0",
        dark: "#080808",
        body: "#FFFFFF",
        border: "#B2B2B2",
        muted: "#7A7A7A",
        placeholder: "#B2B2B2",
        yellow: "#FFE066",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
      },
      borderRadius: {
        input: "8px",
        button: "50px",
        cta: "100px",
        card: "12px",
      },
      maxWidth: {
        page: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Configure Space Grotesk font in root layout**

Replace contents of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "WHV World",
  description: "Find jobs, accommodation, and a car for your working holiday in Australia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-sans bg-body text-dark antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Simplify globals.css**

Replace contents of `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}
```

- [ ] **Step 4: Verify tokens load**

```bash
npm run dev
```

Open http://localhost:3000 — page should still render (default Next.js template). Confirm font has changed to Space Grotesk (rounded geometric). Stop with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/layout.tsx app/globals.css
git commit -m "feat: configure design tokens and Space Grotesk font"
```

---

## Task 3: Install lucide-react & Set Up Components Folder

**Files:**
- Modify: `package.json` (via npm install)
- Create: `components/.gitkeep` (placeholder until first component)

- [ ] **Step 1: Install lucide-react**

```bash
npm install lucide-react
```

- [ ] **Step 2: Create components folder structure**

```bash
mkdir -p components/ui components/onboarding
touch components/.gitkeep
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json components/.gitkeep
git commit -m "chore: install lucide-react and create components folders"
```

---

## Task 4: Extract Figma Assets

**Files:**
- Create: `public/assets/` directory with downloaded SVGs/PNGs

This task uses the Figma MCP tool to identify and download image nodes. The exact filenames will be determined by what's in the Figma file.

- [ ] **Step 1: Fetch Figma data for Homepage (node 2:6) to identify assets**

Call the MCP tool:
```
mcp__figma-developer-mcp__get_figma_data
  fileKey: jd44TjOOM3SmIZWbH35jQk
  nodeId: 2:6
```

If output too large, it auto-saves to a file. Look for nodes with `type: IMAGE-SVG` or fills with `imageRef`. Record their IDs.

Expected image nodes on Homepage (based on prior exploration):
- `8:5139` — Frame (rocket illustration)
- `8:5113` — Abstract Line Splash
- `3:407` — Vector 1 (decorative purple shape)

- [ ] **Step 2: Download identified homepage assets as SVG**

Call:
```
mcp__figma-developer-mcp__download_figma_images
  fileKey: jd44TjOOM3SmIZWbH35jQk
  localPath: public/assets
  nodes:
    - nodeId: 8:5139
      fileName: rocket.svg
    - nodeId: 8:5113
      fileName: abstract-splash.svg
    - nodeId: 3:407
      fileName: vector-1.svg
```

If any download fails (e.g., node is not a valid image), skip it — that frame can use a CSS approximation in Task 9.

- [ ] **Step 3: Verify assets exist**

```bash
ls -la public/assets/
```

Expected: at least `rocket.svg` and one or two other SVGs present.

- [ ] **Step 4: Commit**

```bash
git add public/assets/
git commit -m "feat: download Figma illustrations for homepage hero"
```

---

## Task 5: Build Shared Nav Component

**Files:**
- Create: `components/nav.tsx`

- [ ] **Step 1: Write Nav component**

Create `components/nav.tsx`:

```tsx
import Link from "next/link";
import { Menu } from "lucide-react";

type NavProps = {
  variant?: "default" | "transparent";
};

export function Nav({ variant = "default" }: NavProps) {
  const bgClass = variant === "transparent" ? "bg-transparent" : "bg-body";

  return (
    <header className={`w-full ${bgClass}`}>
      <div className="max-w-page mx-auto px-6 md:px-24 py-8 flex items-center justify-between">
        <Link href="/" className="text-[39px] font-bold text-dark leading-none">
          Logo
        </Link>

        <nav className="hidden md:flex items-center gap-[50px]">
          <Link href="#" className="text-[18px] text-dark hover:opacity-70">
            Product
          </Link>
          <Link href="#" className="text-[18px] text-dark hover:opacity-70">
            Pricing
          </Link>
          <Link href="#" className="text-[18px] text-dark hover:opacity-70">
            Blog
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#"
            className="px-5 py-[15px] rounded-button text-[16px] text-muted hover:opacity-70"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-10 py-[15px] rounded-button text-[16px] font-bold bg-primary text-body hover:opacity-90"
          >
            Signup
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden text-dark"
        >
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify Nav renders by adding it to root page temporarily**

Replace `app/page.tsx` with a minimal test:

```tsx
import { Nav } from "@/components/nav";

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="p-10">Nav test</div>
    </main>
  );
}
```

```bash
npm run dev
```

Open http://localhost:3000 — confirm: Logo on left, three nav links centered-ish, Login + Signup buttons on right. Resize to mobile (<768px) — links should hide, hamburger appears. Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add components/nav.tsx app/page.tsx
git commit -m "feat: add shared Nav component with mobile hamburger fallback"
```

---

## Task 6: Build UI Atom Components

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/text-input.tsx`
- Create: `components/ui/select.tsx`
- Create: `components/ui/file-upload.tsx`
- Create: `components/ui/checkbox.tsx`

- [ ] **Step 1: Create Button component**

Create `components/ui/button.tsx`:

```tsx
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-bold transition hover:opacity-90 disabled:opacity-50";
    const variants = {
      primary: "bg-primary text-body",
      secondary: "border border-dark text-dark bg-transparent",
    };
    const sizes = {
      md: "px-10 py-[15px] text-[16px] rounded-button",
      lg: "px-12 py-5 text-[16px] rounded-cta",
    };
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

- [ ] **Step 2: Create TextInput component**

Create `components/ui/text-input.tsx`:

```tsx
import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, icon, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-[16px] font-medium text-dark">{label}</label>
        <div className="relative">
          {icon && (
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-border">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full h-[60px] rounded-input border border-border bg-body text-[16px] text-dark placeholder:text-placeholder outline-none focus:border-primary ${
              icon ? "pl-14" : "pl-5"
            } pr-5 ${className}`}
            {...props}
          />
        </div>
      </div>
    );
  }
);
TextInput.displayName = "TextInput";
```

- [ ] **Step 3: Create Select component**

Create `components/ui/select.tsx`:

```tsx
import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  label: string;
  placeholder?: string;
  options: Option[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, placeholder, options, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-[16px] font-medium text-dark">{label}</label>
        <div className="relative">
          <select
            ref={ref}
            className={`w-full h-[60px] rounded-input border border-border bg-body text-[16px] text-dark appearance-none px-5 pr-12 outline-none focus:border-primary ${className}`}
            defaultValue=""
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={20}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-border pointer-events-none"
          />
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
```

- [ ] **Step 4: Create FileUpload component**

Create `components/ui/file-upload.tsx`:

```tsx
import { Upload } from "lucide-react";

type FileUploadProps = {
  label: string;
};

export function FileUpload({ label }: FileUploadProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[16px] font-medium text-dark">{label}</label>
      <div className="border border-dashed border-border rounded-input p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition">
        <Upload size={24} className="text-muted" />
        <p className="text-[14px] text-muted">
          Drag &amp; drop or <span className="text-primary underline">browse</span>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create Checkbox component**

Create `components/ui/checkbox.tsx`:

```tsx
import { InputHTMLAttributes, forwardRef } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = "", ...props }, ref) => {
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className={`w-5 h-5 rounded border border-border accent-primary ${className}`}
          {...props}
        />
        <span className="text-[16px] text-dark">{label}</span>
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
```

- [ ] **Step 6: Verify all atoms compile (no visual test yet — they get used in later pages)**

```bash
npm run build
```

Expected: builds without TypeScript errors. If any error, fix the affected component before continuing.

- [ ] **Step 7: Commit**

```bash
git add components/ui/
git commit -m "feat: add UI atoms (Button, TextInput, Select, FileUpload, Checkbox)"
```

---

## Task 7: Build Composite Components

**Files:**
- Create: `components/onboarding/needs-card.tsx`
- Create: `components/onboarding/form-grid.tsx`
- Create: `components/onboarding/page-header.tsx`

- [ ] **Step 1: Create PageHeader**

Create `components/onboarding/page-header.tsx`:

```tsx
type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 mb-12">
      <h1 className="text-[36px] md:text-[46px] font-bold text-dark leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[18px] md:text-[20px] font-medium text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create FormGrid**

Create `components/onboarding/form-grid.tsx`:

```tsx
import { ReactNode } from "react";

type FormGridProps = {
  children: ReactNode;
};

export function FormGrid({ children }: FormGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[820px] mx-auto">
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create NeedsCard**

Create `components/onboarding/needs-card.tsx`:

```tsx
import Link from "next/link";
import { ReactNode } from "react";

type NeedsCardProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  href: string;
};

export function NeedsCard({ icon, title, subtitle, href }: NeedsCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-center gap-4 p-8 rounded-card border border-border bg-body hover:border-primary hover:shadow-lg transition cursor-pointer min-w-[260px]"
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-[20px] font-bold text-dark">{title}</h3>
      <p className="text-[14px] text-muted">{subtitle}</p>
    </Link>
  );
}
```

- [ ] **Step 4: Verify composites compile**

```bash
npm run build
```

Expected: builds without errors.

- [ ] **Step 5: Commit**

```bash
git add components/onboarding/
git commit -m "feat: add onboarding composite components (NeedsCard, FormGrid, PageHeader)"
```

---

## Task 8: Build Homepage (`/`)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Optional — re-fetch Homepage Figma data for precise positioning**

If you need exact layout values that aren't in this plan, call:
```
mcp__figma-developer-mcp__get_figma_data
  fileKey: jd44TjOOM3SmIZWbH35jQk
  nodeId: 2:6
```

Otherwise rely on the layout described in this step.

- [ ] **Step 2: Implement Homepage**

Replace `app/page.tsx` with:

```tsx
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Nav variant="transparent" />

      <section className="relative max-w-page mx-auto px-6 md:px-24 pt-16 md:pt-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col gap-6 max-w-xl">
            <span className="inline-flex items-center self-start px-4 py-2 rounded-button bg-yellow text-dark text-[14px] font-medium">
              For Working Holiday Visa Holders
            </span>
            <h1 className="text-[40px] md:text-[64px] font-bold text-dark leading-[1.05]">
              Your Australian adventure, fully sorted.
            </h1>
            <p className="text-[18px] md:text-[20px] text-muted leading-relaxed">
              Find seasonal jobs, accommodation, and a car — all in one place
              built for WHV travellers.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/signup">
                <Button size="lg">Get started</Button>
              </Link>
              <Link href="#">
                <Button size="lg" variant="secondary">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full aspect-square max-w-[560px] mx-auto">
            <Image
              src="/assets/rocket.svg"
              alt="Rocket illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <Image
          src="/assets/abstract-splash.svg"
          alt=""
          width={400}
          height={400}
          aria-hidden
          className="hidden md:block absolute top-10 right-0 opacity-60 -z-0 pointer-events-none"
        />
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Verify Homepage in browser**

```bash
npm run dev
```

Open http://localhost:3000. Confirm:
- Nav at top, transparent over hero
- Yellow pill badge ("For Working Holiday Visa Holders")
- Big bold heading
- Two CTAs (purple "Get started" + outline "Learn more")
- Rocket illustration on the right (or placeholder box if asset missing)
- Abstract splash behind, partial visible
- Mobile width: layout stacks vertically, no horizontal overflow

If rocket.svg missing, the `<Image>` will throw — temporarily replace with a `<div className="aspect-square bg-primary/10 rounded-card" />` placeholder.

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build homepage with hero, CTAs, and rocket illustration"
```

---

## Task 9: Build Signup Page (`/signup`)

**Files:**
- Create: `app/signup/page.tsx`

- [ ] **Step 1: Create signup directory and page**

```bash
mkdir -p app/signup
```

Create `app/signup/page.tsx`:

```tsx
import Link from "next/link";
import { Mail, Lock, User, Phone, MapPin, FileText, Eye } from "lucide-react";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Select } from "@/components/ui/select";
import { FormGrid } from "@/components/onboarding/form-grid";
import { PageHeader } from "@/components/onboarding/page-header";

export default function SignupPage() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="max-w-page mx-auto px-6 md:px-24 py-16">
        <PageHeader
          title="Create an profile"
          subtitle="You are creating account"
        />

        <FormGrid>
          <TextInput
            label="Full name"
            placeholder="John Benz"
            icon={<User size={20} />}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail size={20} />}
          />
          <TextInput
            label="Phone Number"
            placeholder="Enter phone number"
            icon={<Phone size={20} />}
          />
          <Select
            label="Gender"
            placeholder="Select gender"
            options={[
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
              { value: "other", label: "Other" },
              { value: "na", label: "Prefer not to say" },
            ]}
          />
          <TextInput
            label="Location"
            placeholder="Enter location"
            icon={<MapPin size={20} />}
          />
          <TextInput
            label="Passport Number"
            placeholder="Enter your passport number"
            icon={<FileText size={20} />}
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter password"
            icon={<Lock size={20} />}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="Enter password"
            icon={<Lock size={20} />}
          />
          <div className="md:col-span-2">
            <TextInput label="Verification code" placeholder="Enter code" />
          </div>
        </FormGrid>

        <div className="flex justify-center mt-12">
          <Link href="/onboarding/needs">
            <Button size="lg">Create Profile</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000/signup. Confirm:
- Nav at top
- Centered heading "Create an profile" + subtitle
- 2-column form grid with rows: (Full name | Email), (Phone | Gender), (Location | Passport), (Password | Confirm Password), then Verification code spans full width
- Icons on left side of inputs where applicable
- Big purple "Create Profile" button at the bottom
- Click Create Profile → navigates to `/onboarding/needs` (will 404 — next task)
- Mobile width: stacks to 1-column, no overflow

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add app/signup/
git commit -m "feat: build signup page with worker profile form"
```

---

## Task 10: Build Needs Page (`/onboarding/needs`)

**Files:**
- Create: `app/onboarding/needs/page.tsx`

- [ ] **Step 1: Create directory and page**

```bash
mkdir -p app/onboarding/needs
```

Create `app/onboarding/needs/page.tsx`:

```tsx
import { Briefcase, Home, Car } from "lucide-react";
import { Nav } from "@/components/nav";
import { NeedsCard } from "@/components/onboarding/needs-card";
import { PageHeader } from "@/components/onboarding/page-header";

export default function NeedsPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="max-w-page mx-auto px-6 md:px-24 py-16">
        <PageHeader
          title="What do you need?"
          subtitle="Pick what you want to set up first. You can always add more later."
        />

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-8">
          <NeedsCard
            icon={<Briefcase size={32} />}
            title="Job"
            subtitle="Find seasonal work that matches your visa and experience."
            href="/onboarding/job"
          />
          <NeedsCard
            icon={<Home size={32} />}
            title="Accommodation"
            subtitle="Short-stay or long-term rentals near your work."
            href="/onboarding/accommodation"
          />
          <NeedsCard
            icon={<Car size={32} />}
            title="Car"
            subtitle="Reliable wheels to move between regions and worksites."
            href="/onboarding/car"
          />
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000/onboarding/needs. Confirm:
- Nav at top
- Centered title + subtitle
- 3 cards in a horizontal row (desktop): Job / Accommodation / Car
- Each card has icon, title, subtitle
- Hover: border becomes purple, slight shadow
- Click each card → navigates to corresponding route (will 404 except Job once Task 11 is done)
- Mobile width: cards stack vertically

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add app/onboarding/needs/
git commit -m "feat: build onboarding needs page with Job/Accommodation/Car selector"
```

---

## Task 11: Build Job Detail Page (`/onboarding/job`)

**Files:**
- Create: `app/onboarding/job/page.tsx`

- [ ] **Step 1: Create directory and page**

```bash
mkdir -p app/onboarding/job
```

Create `app/onboarding/job/page.tsx`:

```tsx
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { FormGrid } from "@/components/onboarding/form-grid";
import { PageHeader } from "@/components/onboarding/page-header";

const AUSTRALIAN_STATES = [
  { value: "nsw", label: "New South Wales" },
  { value: "vic", label: "Victoria" },
  { value: "qld", label: "Queensland" },
  { value: "wa", label: "Western Australia" },
  { value: "sa", label: "South Australia" },
  { value: "tas", label: "Tasmania" },
  { value: "act", label: "Australian Capital Territory" },
  { value: "nt", label: "Northern Territory" },
];

const VISA_TYPES = [
  { value: "417", label: "Subclass 417 (Working Holiday)" },
  { value: "462", label: "Subclass 462 (Work and Holiday)" },
];

export default function JobDetailPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="max-w-page mx-auto px-6 md:px-24 py-16">
        <PageHeader
          title="Job details"
          subtitle="Tell us about your work eligibility and experience."
        />

        <FormGrid>
          <Select
            label="Right to work in Australia"
            placeholder="Select your visa subclass"
            options={VISA_TYPES}
          />
          <TextInput label="Visa Number" placeholder="Enter visa number" />
          <TextInput
            label="Expiry Date Visa"
            type="date"
            placeholder="dd/mm/yyyy"
          />
          <Select
            label="State preference"
            placeholder="Select state"
            options={AUSTRALIAN_STATES}
          />
          <TextInput
            label="Work Experience"
            placeholder="e.g. Hospitality, 2 years"
          />
          <TextInput
            label="Certification"
            placeholder="e.g. RSA, First Aid"
          />
          <div className="md:col-span-2">
            <FileUpload label="CV / Resume" />
          </div>
        </FormGrid>

        <div className="flex justify-center mt-12">
          <Link href="/onboarding/needs">
            <Button size="lg">Submit</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000/onboarding/job. Confirm:
- Nav, title "Job details", subtitle
- Form with: Right to work, Visa Number, Expiry Date, State, Work Experience, Certification, CV/Resume upload (spans 2 cols)
- Submit button → navigates back to `/onboarding/needs`
- Mobile: stacks to 1-column

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add app/onboarding/job/
git commit -m "feat: build job detail page with visa and experience form"
```

---

## Task 12: Build Accommodation Detail Page (`/onboarding/accommodation`)

**Files:**
- Create: `app/onboarding/accommodation/page.tsx`

- [ ] **Step 1: Create directory and page**

```bash
mkdir -p app/onboarding/accommodation
```

Create `app/onboarding/accommodation/page.tsx`:

```tsx
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Select } from "@/components/ui/select";
import { FormGrid } from "@/components/onboarding/form-grid";
import { PageHeader } from "@/components/onboarding/page-header";

const ACCOMMODATION_TYPES = [
  { value: "shared", label: "Shared house" },
  { value: "studio", label: "Studio" },
  { value: "private", label: "Private room" },
  { value: "hostel", label: "Hostel" },
];

const DURATIONS = [
  { value: "short", label: "Less than 1 month" },
  { value: "medium", label: "1–3 months" },
  { value: "long", label: "3+ months" },
];

export default function AccommodationDetailPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="max-w-page mx-auto px-6 md:px-24 py-16">
        <PageHeader
          title="Accommodation details"
          subtitle="Where and how long do you need to stay?"
        />

        <FormGrid>
          <TextInput label="Preferred location" placeholder="e.g. Sydney" />
          <TextInput
            label="Move-in date"
            type="date"
            placeholder="dd/mm/yyyy"
          />
          <Select
            label="Type"
            placeholder="Select type"
            options={ACCOMMODATION_TYPES}
          />
          <Select
            label="Duration"
            placeholder="Select duration"
            options={DURATIONS}
          />
          <TextInput
            label="Budget (AUD per week)"
            type="number"
            placeholder="e.g. 250"
          />
          <TextInput
            label="Number of people"
            type="number"
            placeholder="1"
          />
        </FormGrid>

        <div className="flex justify-center mt-12">
          <Link href="/onboarding/needs">
            <Button size="lg">Submit</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000/onboarding/accommodation. Confirm form renders, Submit returns to `/onboarding/needs`. Mobile stacks correctly. Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add app/onboarding/accommodation/
git commit -m "feat: build accommodation detail page"
```

---

## Task 13: Build Car Detail Page (`/onboarding/car`)

**Files:**
- Create: `app/onboarding/car/page.tsx`

- [ ] **Step 1: Create directory and page**

```bash
mkdir -p app/onboarding/car
```

Create `app/onboarding/car/page.tsx`:

```tsx
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Select } from "@/components/ui/select";
import { FormGrid } from "@/components/onboarding/form-grid";
import { PageHeader } from "@/components/onboarding/page-header";

const CAR_TYPES = [
  { value: "sedan", label: "Sedan" },
  { value: "hatchback", label: "Hatchback" },
  { value: "suv", label: "SUV" },
  { value: "van", label: "Van / Campervan" },
  { value: "ute", label: "Ute" },
];

const TRANSMISSION = [
  { value: "auto", label: "Automatic" },
  { value: "manual", label: "Manual" },
  { value: "any", label: "No preference" },
];

export default function CarDetailPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="max-w-page mx-auto px-6 md:px-24 py-16">
        <PageHeader
          title="Car details"
          subtitle="Tell us what kind of car you're after."
        />

        <FormGrid>
          <TextInput label="Pickup location" placeholder="e.g. Melbourne" />
          <TextInput
            label="Pickup date"
            type="date"
            placeholder="dd/mm/yyyy"
          />
          <Select label="Car type" placeholder="Select type" options={CAR_TYPES} />
          <Select
            label="Transmission"
            placeholder="Select transmission"
            options={TRANSMISSION}
          />
          <TextInput
            label="Budget (AUD per week)"
            type="number"
            placeholder="e.g. 200"
          />
          <TextInput
            label="Driver licence number"
            placeholder="Enter licence number"
          />
        </FormGrid>

        <div className="flex justify-center mt-12">
          <Link href="/onboarding/needs">
            <Button size="lg">Submit</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000/onboarding/car. Confirm form renders, Submit returns to `/onboarding/needs`. Mobile stacks correctly. Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add app/onboarding/car/
git commit -m "feat: build car detail page"
```

---

## Task 14: End-to-End Verification & Build

**Files:** (none — verification only)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build completes without TypeScript or lint errors. Reports static pages for all 6 routes.

If errors:
- Fix the reported issue
- Re-run `npm run build` until clean
- Commit the fix

- [ ] **Step 2: Run end-to-end flow in dev**

```bash
npm run dev
```

In browser, verify the full path:
1. http://localhost:3000 → Homepage loads, click "Get started"
2. → `/signup` loads, fill some fields, click "Create Profile"
3. → `/onboarding/needs` loads, click "Job"
4. → `/onboarding/job` loads, click "Submit"
5. → back at `/onboarding/needs`, click "Accommodation"
6. → `/onboarding/accommodation` loads, click "Submit"
7. → back at `/onboarding/needs`, click "Car"
8. → `/onboarding/car` loads, click "Submit"
9. → back at `/onboarding/needs`

Then click the Logo in nav → returns to `/`. Click Signup in nav → goes to `/signup`.

- [ ] **Step 3: Mobile width check**

In browser dev tools, set width to 375px. Walk through all 6 pages. Confirm:
- No horizontal scrollbar on any page
- Nav shows hamburger
- Forms stack to 1 column
- Needs cards stack vertically
- No element overflows the viewport

- [ ] **Step 4: Stop dev server. If everything looks good, no commit needed (no file changes).**

---

## Task 15: Initialize GitHub Repo & Deploy to Vercel

**Files:** (none locally — external services)

This task requires the user to be logged in to `gh` (GitHub CLI) and Vercel. If `gh` is not installed: `brew install gh` then `gh auth login`. If Vercel CLI is preferred: `npm i -g vercel` then `vercel login`. Otherwise this task can be done entirely in the GitHub + Vercel web UIs.

- [ ] **Step 1: Verify gh is authenticated**

```bash
gh auth status
```

Expected: shows logged-in account. If not, run `gh auth login` first.

- [ ] **Step 2: Create GitHub repo and push**

```bash
gh repo create whv-world --public --source=. --remote=origin --push
```

Expected: creates `https://github.com/<your-user>/whv-world` and pushes `main` branch.

- [ ] **Step 3: Verify GitHub repo**

```bash
gh browse
```

Should open the new repo in browser. Confirm code is visible.

- [ ] **Step 4: Connect Vercel to the repo (web UI)**

Go to https://vercel.com/new — sign in with GitHub if needed. Choose the `whv-world` repo, click **Import**. Vercel auto-detects Next.js — leave defaults. Click **Deploy**.

Expected: first deployment runs (~1–2 min), then Vercel shows a live URL like `whv-world-<hash>.vercel.app`.

- [ ] **Step 5: Set production domain to `whv-world.vercel.app`**

In the Vercel project, go to **Settings → Domains**. If `whv-world.vercel.app` is available, it's usually assigned automatically as the production alias. Otherwise add it manually if free, or accept Vercel's chosen subdomain.

- [ ] **Step 6: Verify live deployment**

Open the production URL in a browser. Walk through the same end-to-end flow as Task 14 Step 2. Confirm everything works on the live site.

- [ ] **Step 7: Final commit & push (if any local changes were needed during deployment)**

```bash
git status
# if clean, skip
# else:
git add .
git commit -m "chore: deployment adjustments"
git push
```

---

## Done

The prototype is now:
- Functional locally (`npm run dev`)
- Builds clean (`npm run build`)
- Live on Vercel, auto-deploys on push to `main`

Next steps (out of scope of this plan, future projects):
- Re-align design with business plan (employer side, commitment verification — see spec section 11 alignment notes)
- Wire up real form submission to a backend
- Add authentication
