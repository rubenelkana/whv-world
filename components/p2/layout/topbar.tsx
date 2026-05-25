"use client";
import { Search, Bell, ArrowUpRight } from "lucide-react";
import { Kbd } from "../ui/kbd";
import { Avatar } from "../ui/avatar";

interface TopbarProps {
  breadcrumbs?: { label: string; href?: string }[];
  contextual?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({ breadcrumbs, contextual }) => (
  <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-p2-line bg-white/85 px-6 backdrop-blur">
    <nav className="flex min-w-0 items-center gap-1.5 text-sm">
      {breadcrumbs?.map((b, i) => {
        const last = i === breadcrumbs.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-p2-ink-4">/</span>}
            <span
              className={
                last
                  ? "truncate font-medium text-p2-ink"
                  : "truncate text-p2-ink-2 hover:text-p2-ink"
              }
            >
              {b.label}
            </span>
          </span>
        );
      })}
    </nav>

    <div className="flex flex-1 items-center justify-end gap-3">
      {contextual}

      <button className="hidden h-9 w-72 items-center gap-2 rounded-p2-md border border-p2-line bg-p2-surface-2 px-3 text-sm text-p2-ink-3 transition-colors hover:border-p2-ink-4 lg:flex">
        <Search className="h-4 w-4" strokeWidth={1.5} />
        <span className="flex-1 text-left">Find a worker, job, or alert</span>
        <Kbd>⌘K</Kbd>
      </button>

      <button className="relative grid h-9 w-9 place-items-center rounded-p2-md border border-p2-line bg-white text-p2-ink-2 hover:bg-p2-surface-2">
        <Bell className="h-4 w-4" strokeWidth={1.5} />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-p2-danger" />
      </button>

      <button className="flex h-9 items-center gap-2 rounded-p2-md border border-p2-line bg-white pl-1.5 pr-3 hover:bg-p2-surface-2">
        <Avatar name="Sarah Kelly" seed="sarah-kelly" size={26} />
        <span className="hidden text-left sm:block">
          <span className="block text-xs font-medium leading-none text-p2-ink">
            Sarah Kelly
          </span>
          <span className="block text-[10px] leading-tight text-p2-ink-3">
            Account manager
          </span>
        </span>
        <ArrowUpRight
          className="h-3.5 w-3.5 text-p2-ink-3"
          strokeWidth={1.5}
        />
      </button>
    </div>
  </div>
);
