import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { Badge } from "../ui/badge";

interface AdSlotProps {
  variant?: "wide" | "compact";
}

export const AdSlot: React.FC<AdSlotProps> = ({ variant = "wide" }) => {
  if (variant === "compact") {
    return (
      <Link
        href="/prototype2/services/tax-agents"
        className="block rounded-p3-md border border-dashed border-p3-line bg-p3-surface p-4 transition-colors hover:bg-white"
      >
        <Badge tone="amber" size="sm" className="mb-1.5">
          <Megaphone className="h-3 w-3" strokeWidth={2} />
          Sponsored
        </Badge>
        <div className="text-sm font-bold text-p3-ink">
          Greythorn Tax — WHV specialists
        </div>
        <div className="mt-0.5 text-xs text-p3-ink-2">
          Flat fee $120 · Refund in 5-7 days · 8,000+ WHV returns
        </div>
      </Link>
    );
  }

  return (
    <div className="overflow-hidden rounded-p3-xl border border-p3-line">
      <Link
        href="/prototype2/services/bank-setup"
        className="block bg-gradient-to-br from-p3-accent-indigo to-blue-600 p-6 text-white"
      >
        <Badge
          tone="brand"
          className="bg-white/15 text-white"
        >
          <Megaphone className="h-3 w-3" strokeWidth={2} />
          Sponsored
        </Badge>
        <h3 className="mt-4 text-xl font-extrabold tracking-p3-tight">
          Open an ANZ Plus account before you fly
        </h3>
        <p className="mt-1.5 max-w-md text-sm text-white/85">
          No monthly fees, instant virtual card, round-up savings. Land,
          activate at any branch with your passport.
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold">
          Open the account
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </Link>
    </div>
  );
};
