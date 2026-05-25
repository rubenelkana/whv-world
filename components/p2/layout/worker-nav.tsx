"use client";
import Link from "next/link";
import { Logo } from "../brand/logo";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";

const BASE = "/prototype-business-plan/worker";

const links = [
  { href: `${BASE}/dashboard`, label: "My placements" },
  { href: `${BASE}/dashboard#offers`, label: "Offers", badge: 2 },
  { href: "#", label: "Profile" },
  { href: "#", label: "Help" },
];

export const WorkerNav: React.FC = () => (
  <header className="sticky top-0 z-40 border-b border-p2-line bg-white">
    <div className="mx-auto flex h-16 max-w-p2-page items-center justify-between gap-6 px-6">
      <div className="flex items-center gap-6">
        <Link href="/prototype-business-plan">
          <Logo />
        </Link>
        <Badge tone="brand" outline size="sm">
          Worker
        </Badge>
      </div>
      <nav className="flex items-center gap-6">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="relative text-sm text-p2-ink-2 transition-colors hover:text-p2-ink"
          >
            {l.label}
            {l.badge && (
              <span className="absolute -right-4 -top-1 grid h-4 w-4 place-items-center rounded-full bg-p2-danger text-[9px] font-semibold text-white">
                {l.badge}
              </span>
            )}
          </Link>
        ))}
        <span className="ml-2 flex items-center gap-2">
          <Avatar name="Léa Marchand" seed="lea-marchand-fr" nationality="FR" size={28} />
          <span className="hidden text-xs font-medium text-p2-ink sm:inline">
            Léa
          </span>
        </span>
      </nav>
    </div>
  </header>
);
