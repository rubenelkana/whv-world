import Link from "next/link";
import { Logo } from "../brand/logo";

const BASE = "/prototype-business-plan";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: `${BASE}/#solution`, label: "Five modules" },
      { href: `${BASE}/#how-it-works`, label: "How it works" },
      { href: `${BASE}/pricing`, label: "Pricing" },
      { href: `${BASE}/login`, label: "Customer log in" },
    ],
  },
  {
    title: "Who it's for",
    links: [
      { href: `${BASE}/#for-agencies`, label: "Recruitment agencies" },
      { href: `${BASE}/#for-employers`, label: "Seasonal employers" },
      { href: `${BASE}/worker/signup`, label: "WHV workers" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About Byte Bridge Digital" },
      { href: "#", label: "Pilot programme" },
      { href: "mailto:Sales@braviconsults.com", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Labour-hire licensing" },
    ],
  },
];

export const MarketingFooter: React.FC = () => (
  <footer className="border-t border-p2-line bg-white">
    <div className="mx-auto max-w-p2-page px-6 py-16">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
        <div className="col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-p2-ink-2">
            A workforce ERP for seasonal WHV hiring in Australia. Built by{" "}
            <span className="text-p2-ink">PT. Langkah Inovasi Digital</span>{" "}
            under Byte Bridge Digital.
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <div className="mb-4 font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
              {c.title}
            </div>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-p2-ink-2 transition-colors hover:text-p2-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-start gap-3 border-t border-p2-line pt-6 text-xs text-p2-ink-3 md:flex-row md:items-center md:justify-between">
        <p>© 2026 PT. Langkah Inovasi Digital. ABN pending.</p>
        <p className="font-p2-mono">
          Workforce ERP System for Seasonal WHV Hiring · v0.1 prototype
        </p>
      </div>
    </div>
  </footer>
);
