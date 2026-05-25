import * as React from "react";
import { cn } from "@/lib/cn";

interface AvatarProps {
  name: string;
  seed?: string;
  nationality?: string; // ISO 3166-1 alpha-2 for flag overlay
  size?: number;
  className?: string;
}

// Deterministic gradient from a seed string — no external image needed.
function hashSeed(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const palettes = [
  ["#0F1B3D", "#3B82F6"],
  ["#15803D", "#84CC16"],
  ["#7C2D12", "#F59E0B"],
  ["#1E2F5C", "#06B6D4"],
  ["#7E22CE", "#EC4899"],
  ["#155E75", "#A5F3FC"],
  ["#1F2937", "#94A3B8"],
  ["#92400E", "#FDE68A"],
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function flagEmoji(iso?: string) {
  if (!iso || iso.length !== 2) return null;
  const codePoints = iso
    .toUpperCase()
    .split("")
    .map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  seed,
  nationality,
  size = 36,
  className,
}) => {
  const palette = palettes[hashSeed(seed ?? name) % palettes.length];
  const flag = flagEmoji(nationality);
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 100%)`,
      }}
      aria-label={name}
    >
      <span className="leading-none">{initials(name)}</span>
      {flag && (
        <span
          className="absolute -bottom-0.5 -right-0.5 grid place-items-center rounded-full bg-white"
          style={{
            width: Math.max(14, size * 0.42),
            height: Math.max(14, size * 0.42),
            fontSize: Math.max(8, size * 0.28),
          }}
        >
          {flag}
        </span>
      )}
    </span>
  );
};
