"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, MessagesSquare, PartyPopper, User2 } from "lucide-react";
import { cn } from "@/lib/cn";

const BASE = "/prototype2";

const tabs = [
  { href: `${BASE}/home`, label: "Home", icon: Home },
  { href: `${BASE}/jobs`, label: "Jobs", icon: Briefcase },
  { href: `${BASE}/community`, label: "Chat", icon: MessagesSquare },
  { href: `${BASE}/events`, label: "Events", icon: PartyPopper },
  { href: `${BASE}/profile`, label: "Profile", icon: User2 },
];

export const MobileTabBar: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-p3-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <ul className="mx-auto flex max-w-p3-app items-stretch justify-around">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active =
            t.href === `${BASE}/home`
              ? pathname === t.href
              : pathname?.startsWith(t.href);
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors",
                  active ? "text-p3-brand" : "text-p3-ink-3 hover:text-p3-ink-2",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    active && "scale-110",
                  )}
                  strokeWidth={active ? 2.25 : 1.75}
                />
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
