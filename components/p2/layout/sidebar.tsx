"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  LineChart,
  Bell,
  Settings,
  ChevronsUpDown,
  HelpCircle,
} from "lucide-react";
import { Logo } from "../brand/logo";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/cn";

const BASE = "/prototype-business-plan/dashboard";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: { tone: "warn" | "danger" | "info" | "neutral"; label: string };
}

const nav: { section: string; items: NavItem[] }[] = [
  {
    section: "Workspace",
    items: [
      { href: BASE, label: "Overview", icon: LayoutDashboard },
      { href: `${BASE}/jobs`, label: "Jobs", icon: Briefcase, badge: { tone: "neutral", label: "12" } },
      { href: `${BASE}/candidates`, label: "Candidates", icon: Users },
    ],
  },
  {
    section: "Insights",
    items: [
      { href: `${BASE}/reliability`, label: "Reliability", icon: LineChart },
      {
        href: `${BASE}/notifications`,
        label: "Activity",
        icon: Bell,
        badge: { tone: "danger", label: "1" },
      },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-p2-line bg-white lg:flex">
      <div className="flex h-16 items-center px-5">
        <Link href="/prototype-business-plan">
          <Logo />
        </Link>
      </div>

      <button className="mx-3 mb-5 mt-1 flex items-center gap-3 rounded-p2-md border border-p2-line bg-p2-surface-2 p-2.5 text-left transition-colors hover:bg-p2-slate-tint">
        <span className="grid h-8 w-8 place-items-center rounded-p2-sm bg-p2-brand text-xs font-semibold text-white">
          RC
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-p2-ink">
            Riverina Citrus
          </span>
          <span className="block text-[11px] text-p2-ink-3">
            Employer · NSW
          </span>
        </span>
        <ChevronsUpDown className="h-4 w-4 text-p2-ink-3" strokeWidth={1.5} />
      </button>

      <nav className="flex-1 space-y-6 px-3">
        {nav.map((section) => (
          <div key={section.section}>
            <div className="mb-1 px-2 font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
              {section.section}
            </div>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  item.href === BASE
                    ? pathname === BASE
                    : pathname?.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex h-9 items-center gap-2.5 rounded-p2-md px-2.5 text-sm transition-colors",
                        active
                          ? "bg-p2-ink text-white"
                          : "text-p2-ink-2 hover:bg-p2-surface-2 hover:text-p2-ink",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          active ? "text-white" : "text-p2-ink-3",
                        )}
                        strokeWidth={1.75}
                      />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge tone={item.badge.tone} size="sm">
                          {item.badge.label}
                        </Badge>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-p2-line p-3">
        <Link
          href="#"
          className="flex items-center gap-2 rounded-p2-md p-2 text-sm text-p2-ink-2 hover:bg-p2-surface-2"
        >
          <HelpCircle className="h-4 w-4 text-p2-ink-3" strokeWidth={1.5} />
          Help & docs
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 rounded-p2-md p-2 text-sm text-p2-ink-2 hover:bg-p2-surface-2"
        >
          <Settings className="h-4 w-4 text-p2-ink-3" strokeWidth={1.5} />
          Settings
        </Link>
      </div>
    </aside>
  );
};
