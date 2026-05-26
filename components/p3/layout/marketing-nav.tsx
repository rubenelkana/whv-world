"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "../brand/logo";
import { Button } from "../ui/button";

const BASE = "/prototype2";

const links = [
  { href: `${BASE}/#features`, label: "Features" },
  { href: `${BASE}/#community`, label: "Community" },
  { href: `${BASE}/#services`, label: "Services" },
];

export const MarketingNavP3: React.FC = () => (
  <header className="sticky top-0 z-40 border-b border-p3-line/60 bg-white/85 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-p3-page items-center justify-between gap-6 px-5">
      <Link href={BASE}>
        <Logo />
      </Link>
      <nav className="hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm text-p3-ink-2 transition-colors hover:text-p3-ink"
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
            trailingIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />}
          >
            Get the app
          </Button>
        </Link>
      </div>
    </div>
  </header>
);
