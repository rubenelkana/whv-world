"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "../brand/logo";
import { Button } from "../ui/button";

const BASE = "/prototype-business-plan";

const links = [
  { href: `${BASE}/#solution`, label: "Solution" },
  { href: `${BASE}/#how-it-works`, label: "How it works" },
  { href: `${BASE}/#for-agencies`, label: "For agencies" },
  { href: `${BASE}/#for-employers`, label: "For employers" },
  { href: `${BASE}/pricing`, label: "Pricing" },
];

export const MarketingNav: React.FC = () => (
  <header className="sticky top-0 z-40 border-b border-p2-line/70 bg-p2-paper/85 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-p2-page items-center justify-between gap-6 px-6">
      <Link href={BASE} className="shrink-0">
        <Logo />
      </Link>
      <nav className="hidden items-center gap-7 lg:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm text-p2-ink-2 transition-colors hover:text-p2-ink"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Link href={`${BASE}/login`}>
          <Button variant="ghost" size="sm">
            Log in
          </Button>
        </Link>
        <Link href={`${BASE}/signup`}>
          <Button
            size="sm"
            trailingIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />}
          >
            Start a pilot
          </Button>
        </Link>
      </div>
    </div>
  </header>
);
