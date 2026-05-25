import Link from "next/link";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { Topbar } from "@/components/p2/layout/topbar";
import { Input } from "@/components/p2/ui/input";
import { Button } from "@/components/p2/ui/button";
import { Badge } from "@/components/p2/ui/badge";
import { Avatar } from "@/components/p2/ui/avatar";
import { Checkbox } from "@/components/p2/ui/checkbox";
import { workers } from "@/lib/mock";

const BASE = "/prototype-business-plan/dashboard";

export default function CandidatesPage() {
  return (
    <>
      <Topbar
        breadcrumbs={[{ label: "Riverina Citrus" }, { label: "Candidates" }]}
        contextual={
          <Button size="sm" leadingIcon={<Filter className="h-3.5 w-3.5" strokeWidth={1.5} />}>
            Save filter
          </Button>
        }
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="p2-display text-3xl font-medium tracking-p2-tight text-p2-ink">
              Worker database
            </h1>
            <p className="mt-1.5 text-sm text-p2-ink-2">
              {workers.length} verified profiles · concierge-screened by our team
            </p>
          </div>
          <Input
            placeholder="Search name, location, skill"
            leading={<Search className="h-4 w-4" strokeWidth={1.5} />}
            className="w-80"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <FilterRail />

          <section>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-p2-ink-2">
                <span className="font-semibold text-p2-ink">{workers.length}</span>{" "}
                workers · sorted by{" "}
                <button className="font-medium text-p2-brand hover:underline">
                  reliability score
                </button>
              </p>
              <div className="flex items-center gap-1 rounded-p2-md border border-p2-line bg-white p-0.5 shadow-p2-sm">
                <button className="h-7 rounded-p2-sm bg-p2-ink px-3 text-xs font-medium text-white">
                  Cards
                </button>
                <button className="h-7 rounded-p2-sm px-3 text-xs font-medium text-p2-ink-2">
                  Table
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {workers
                .slice()
                .sort((a, b) => b.reliability.value - a.reliability.value)
                .map((w) => (
                  <article
                    key={w.id}
                    className="group flex h-full flex-col rounded-p2-lg border border-p2-line bg-white p-5 shadow-p2-sm transition-shadow hover:shadow-p2-md"
                  >
                    <header className="flex items-start gap-3">
                      <Avatar
                        name={w.name}
                        seed={w.photoSeed}
                        nationality={w.nationality}
                        size={44}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="truncate text-base font-semibold text-p2-ink">
                            {w.name}
                          </div>
                          <span className="shrink-0 font-p2-mono text-[10px] text-p2-ink-3">
                            {w.visa}
                          </span>
                        </div>
                        <div className="text-xs text-p2-ink-2">
                          {w.age} · {w.nationality} ·{" "}
                          {w.inAustralia
                            ? w.currentLocation?.city
                            : "Not yet arrived"}
                        </div>
                      </div>
                    </header>

                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      {w.preferredIndustries.slice(0, 2).map((i) => (
                        <Badge key={i} tone="neutral" size="sm">
                          <Briefcase className="h-3 w-3" strokeWidth={1.5} />
                          {i}
                        </Badge>
                      ))}
                      {w.preferredStates.slice(0, 2).map((s) => (
                        <Badge key={s} tone="brand" outline size="sm">
                          <MapPin className="h-3 w-3" strokeWidth={1.5} />
                          {s}
                        </Badge>
                      ))}
                    </div>

                    <p className="mt-3 line-clamp-2 text-xs text-p2-ink-2">
                      {w.bio}
                    </p>

                    <footer className="mt-auto flex items-end justify-between gap-3 pt-4">
                      <div>
                        <div className="font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
                          Reliability
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="p2-display text-xl font-medium text-p2-ink">
                            {w.reliability.value}
                          </span>
                          <span className="text-xs text-p2-ink-3">/100</span>
                        </div>
                      </div>
                      <Link href={`${BASE}/candidates/${w.id}`}>
                        <Button
                          size="sm"
                          variant="secondary"
                          trailingIcon={
                            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
                          }
                        >
                          View profile
                        </Button>
                      </Link>
                    </footer>
                  </article>
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

const FilterRail: React.FC = () => (
  <aside className="space-y-5">
    <FilterGroup title="Visa subclass">
      <Checkbox checked label="417 — Working Holiday" />
      <Checkbox checked label="462 — Work & Holiday" />
    </FilterGroup>

    <FilterGroup title="State">
      <div className="grid grid-cols-3 gap-1.5">
        {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"].map((s, i) => (
          <button
            key={s}
            className={
              "h-8 rounded-p2-sm border text-xs font-medium transition-colors " +
              (i < 4
                ? "border-p2-brand bg-p2-brand/5 text-p2-brand"
                : "border-p2-line bg-white text-p2-ink-2 hover:border-p2-ink-4")
            }
          >
            {s}
          </button>
        ))}
      </div>
    </FilterGroup>

    <FilterGroup title="Availability window">
      <Input type="date" defaultValue="2026-06-01" />
      <Input type="date" defaultValue="2026-11-30" />
    </FilterGroup>

    <FilterGroup title="Reliability min">
      <input type="range" min={0} max={100} defaultValue={70} className="w-full accent-p2-brand" />
      <div className="flex justify-between font-p2-mono text-[10px] text-p2-ink-3">
        <span>0</span>
        <span>70</span>
        <span>100</span>
      </div>
    </FilterGroup>

    <FilterGroup title="Other">
      <Checkbox checked={false} label="Has driving licence" />
      <Checkbox checked={false} label="In Australia now" />
      <Checkbox checked={false} label="Fluent English" />
    </FilterGroup>

    <button className="w-full rounded-p2-md border border-p2-line bg-white py-2 text-xs font-medium text-p2-ink-2 hover:bg-p2-surface-2">
      Clear all filters
    </button>
  </aside>
);

const FilterGroup: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <div className="mb-2.5 font-p2-mono text-[10px] uppercase tracking-widest text-p2-ink-3">
      {title}
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);
