import Link from "next/link";
import { ReactNode } from "react";

type NeedsCardProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  href: string;
};

export function NeedsCard({ icon, title, subtitle, href }: NeedsCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-center gap-4 p-8 rounded-card border border-border bg-body hover:border-primary hover:shadow-lg transition cursor-pointer min-w-[260px]"
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-[20px] font-bold text-dark">{title}</h3>
      <p className="text-[14px] text-muted">{subtitle}</p>
    </Link>
  );
}
