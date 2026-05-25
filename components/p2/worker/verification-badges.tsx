import { ShieldCheck, IdCard, FileCheck, Users, Languages } from "lucide-react";
import { Badge } from "../ui/badge";
import { type Verification } from "@/lib/mock";

interface Props {
  v: Verification;
  compact?: boolean;
}

export const VerificationBadges: React.FC<Props> = ({ v, compact }) => {
  const items = [
    { ok: v.visa, label: "Visa verified", icon: ShieldCheck },
    { ok: v.identity, label: "Identity verified", icon: IdCard },
    { ok: v.workRight, label: "Work right", icon: FileCheck },
    {
      ok: v.references > 0,
      label: `${v.references} reference${v.references === 1 ? "" : "s"}`,
      icon: Users,
    },
    { ok: true, label: `English: ${v.english}`, icon: Languages, neutral: true },
  ];

  return (
    <ul className={compact ? "flex flex-wrap gap-1.5" : "grid grid-cols-2 gap-2"}>
      {items.map((it) => {
        const Icon = it.icon;
        const tone = it.neutral ? "neutral" : it.ok ? "success" : "warn";
        return (
          <li key={it.label}>
            <Badge tone={tone} size={compact ? "sm" : "md"} outline={!it.ok}>
              <Icon className="h-3 w-3" strokeWidth={1.75} />
              {it.label}
            </Badge>
          </li>
        );
      })}
    </ul>
  );
};
