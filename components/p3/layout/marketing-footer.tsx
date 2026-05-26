import Link from "next/link";
import { Logo } from "../brand/logo";

const BASE = "/prototype2";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "App",
    links: [
      { href: `${BASE}/home`, label: "Home" },
      { href: `${BASE}/jobs`, label: "Jobs" },
      { href: `${BASE}/community`, label: "Community" },
      { href: `${BASE}/events`, label: "Events" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: `${BASE}/services/certification`, label: "Certifications" },
      { href: `${BASE}/services/bank-setup`, label: "Banking" },
      { href: `${BASE}/services/tax-agents`, label: "Tax" },
      { href: `${BASE}/services/insurance`, label: "Insurance" },
      { href: `${BASE}/services/migration`, label: "Migration" },
      { href: `${BASE}/services/accommodation`, label: "Accommodation" },
      { href: `${BASE}/services/support`, label: "Support" },
    ],
  },
  {
    title: "Other prototypes",
    links: [
      { href: "/prototype-business-plan", label: "B2B workforce-ERP" },
      { href: "/", label: "Original Figma prototype" },
    ],
  },
];

export const MarketingFooterP3: React.FC = () => (
  <footer className="border-t border-p3-line bg-white">
    <div className="mx-auto max-w-p3-page px-5 py-14">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
        <div className="col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-p3-ink-2">
            One app for every part of your Australian working-holiday year. Built
            by <span className="text-p3-ink">PT. Langkah Inovasi Digital</span>.
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <div className="mb-3 font-p3-mono text-[10px] uppercase tracking-widest text-p3-ink-3">
              {c.title}
            </div>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-p3-ink-2 transition-colors hover:text-p3-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-start gap-2 border-t border-p3-line pt-6 text-xs text-p3-ink-3 md:flex-row md:items-center md:justify-between">
        <p>© 2026 PT. Langkah Inovasi Digital · WHV World</p>
        <p className="font-p3-mono">prototype2 · v0.1</p>
      </div>
    </div>
  </footer>
);
