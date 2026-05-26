import Link from "next/link";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Banknote,
  Bed,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { AppNavP3 } from "@/components/p3/layout/app-nav";
import { MobileTabBar } from "@/components/p3/layout/mobile-tabbar";
import { Input } from "@/components/p3/ui/input";
import { Button } from "@/components/p3/ui/button";
import { Chip } from "@/components/p3/ui/chip";
import { Badge } from "@/components/p3/ui/badge";
import { Card, CardTitle, CardSubtitle } from "@/components/p3/ui/card";
import { jobs, me } from "@/lib/mock-p3";

const BASE = "/prototype2";

export default function JobsListP3() {
  return (
    <>
      <AppNavP3 city={me.city} unread={3} />

      <main className="mx-auto max-w-p3-page px-5 pb-24 pt-6 md:pb-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-p3-tight text-p3-ink md:text-4xl">
              Jobs in {me.city}
            </h1>
            <p className="mt-1.5 text-sm text-p3-ink-2">
              All employers verified by WHV World. Apply with one tap.
            </p>
          </div>
          <Input
            placeholder="Role, company, location"
            leading={<Search className="h-4 w-4" strokeWidth={1.75} />}
            className="w-72"
          />
        </div>

        {/* Filter chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Chip active leading={<Filter className="h-3 w-3" strokeWidth={2} />}>
            All
          </Chip>
          <Chip>Hospitality</Chip>
          <Chip>Horticulture</Chip>
          <Chip>Construction</Chip>
          <Chip>WHV-only</Chip>
          <Chip>Accom. provided</Chip>
          <Chip>Counts toward 88 days</Chip>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <Link
              key={j.id}
              href={`${BASE}/jobs/${j.id}`}
              className="group flex flex-col rounded-p3-xl border border-p3-line bg-white p-5 shadow-p3-sm transition-all hover:-translate-y-0.5 hover:shadow-p3-md"
            >
              <header className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-p3-mono text-[10px] uppercase tracking-widest text-p3-ink-3">
                    {j.industry}
                  </div>
                  <h3 className="mt-1 line-clamp-2 text-base font-bold tracking-p3-tight text-p3-ink">
                    {j.role}
                  </h3>
                  <p className="mt-0.5 text-xs text-p3-ink-2">{j.company}</p>
                </div>
                {j.whvOnly && (
                  <Badge tone="brand" size="sm">
                    WHV
                  </Badge>
                )}
              </header>

              <p className="mt-3 line-clamp-2 text-sm text-p3-ink-2">{j.blurb}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge tone="mint" size="sm">
                  <Banknote className="h-3 w-3" strokeWidth={1.75} />
                  {j.payRate}
                </Badge>
                <Badge tone="neutral" size="sm">
                  <Calendar className="h-3 w-3" strokeWidth={1.75} />
                  {new Date(j.startDate).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "short",
                  })}
                </Badge>
                {j.accommodationProvided && (
                  <Badge tone="orange" size="sm">
                    <Bed className="h-3 w-3" strokeWidth={1.75} />
                    Accom.
                  </Badge>
                )}
              </div>

              <footer className="mt-5 flex items-center justify-between gap-2 border-t border-p3-line pt-4 text-xs">
                <span className="flex items-center gap-1.5 text-p3-ink-2">
                  <MapPin className="h-3 w-3 text-p3-ink-3" strokeWidth={1.75} />
                  {j.city}, {j.state}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-p3-brand">
                  View role
                  <ArrowRight
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </span>
              </footer>
            </Link>
          ))}
        </div>

        <Card className="mt-10 border-p3-brand/20 bg-p3-brand-tint">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-p3-md bg-p3-brand text-white">
              <Briefcase className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <CardTitle>Not seeing the right role?</CardTitle>
              <CardSubtitle>
                Set up a job alert and we'll ping you when a match goes up.
                Filter by industry, region, pay, and accommodation.
              </CardSubtitle>
              <Button
                size="sm"
                variant="primary"
                className="mt-4"
                trailingIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />}
              >
                Create job alert
              </Button>
            </div>
          </div>
        </Card>
      </main>
      <MobileTabBar />
    </>
  );
}
