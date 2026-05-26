import Link from "next/link";
import * as Icons from "lucide-react";
import { IconCircle } from "../ui/icon-circle";
import { type ServiceTile } from "@/lib/mock-p3";

interface Props {
  tile: ServiceTile;
  badgeLabel?: string;
}

export const ServiceTileCard: React.FC<Props> = ({ tile, badgeLabel }) => {
  const Icon =
    ((Icons as unknown) as Record<string, React.ElementType>)[tile.iconKey] ??
    Icons.Sparkles;

  const href = tile.inApp
    ? `/prototype2/${tile.slug}`
    : `/prototype2/services/${tile.slug}`;

  return (
    <Link
      href={href}
      className="p3-tile-press group relative flex flex-col items-center gap-2 rounded-p3-xl border border-p3-line bg-white p-3 text-center shadow-p3-sm transition-all hover:-translate-y-0.5 hover:border-p3-ink-4 hover:shadow-p3-tile"
    >
      {badgeLabel && (
        <span className="absolute right-2 top-2 grid h-4 min-w-4 place-items-center rounded-full bg-p3-accent-coral px-1 text-[9px] font-bold text-white">
          {badgeLabel}
        </span>
      )}
      <IconCircle accent={tile.accent} size={48}>
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </IconCircle>
      <span className="mt-1 text-xs font-bold text-p3-ink">{tile.label}</span>
      <span className="line-clamp-2 text-[10px] text-p3-ink-3">
        {tile.shortDesc}
      </span>
    </Link>
  );
};
