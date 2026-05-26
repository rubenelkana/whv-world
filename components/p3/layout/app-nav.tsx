"use client";
import Link from "next/link";
import { MapPin, Bell, Settings } from "lucide-react";
import { Logo } from "../brand/logo";
import { Avatar } from "../ui/avatar";

const BASE = "/prototype2";

interface AppNavProps {
  city?: string;
  unread?: number;
}

export const AppNavP3: React.FC<AppNavProps> = ({ city = "Sydney", unread = 3 }) => (
  <header className="sticky top-0 z-40 border-b border-p3-line/60 bg-white/90 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-p3-page items-center gap-3 px-5">
      <Link href={`${BASE}/home`} className="shrink-0">
        <Logo />
      </Link>

      <button className="ml-auto flex h-9 items-center gap-1.5 rounded-full border border-p3-line bg-white px-3 text-xs font-medium text-p3-ink shadow-p3-sm transition-colors hover:bg-p3-surface">
        <MapPin className="h-3.5 w-3.5 text-p3-brand" strokeWidth={1.75} />
        {city}
      </button>

      <Link
        href={`${BASE}/notifications`}
        className="relative grid h-9 w-9 place-items-center rounded-full border border-p3-line bg-white text-p3-ink-2 shadow-p3-sm hover:bg-p3-surface"
      >
        <Bell className="h-4 w-4" strokeWidth={1.75} />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-p3-accent-coral px-1 text-[9px] font-bold text-white">
            {unread}
          </span>
        )}
      </Link>

      <Link
        href={`${BASE}/profile`}
        className="rounded-full ring-2 ring-transparent transition-all hover:ring-p3-brand-soft"
      >
        <Avatar name="Léa Marchand" seed="lea-marchand-fr" nationality="FR" size={36} />
      </Link>
    </div>
  </header>
);
