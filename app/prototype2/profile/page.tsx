import Link from "next/link";
import {
  ArrowRight,
  Settings,
  Mail,
  Phone,
  MapPin,
  Plane,
  CalendarCheck,
  ShieldCheck,
  BadgeCheck,
  LogOut,
  Edit3,
} from "lucide-react";
import { AppNavP3 } from "@/components/p3/layout/app-nav";
import { MobileTabBar } from "@/components/p3/layout/mobile-tabbar";
import { Card, CardTitle, CardSubtitle } from "@/components/p3/ui/card";
import { Button } from "@/components/p3/ui/button";
import { Badge } from "@/components/p3/ui/badge";
import { Avatar } from "@/components/p3/ui/avatar";
import { Divider } from "@/components/p3/ui/divider";
import { me, jobs } from "@/lib/mock-p3";

const BASE = "/prototype2";

export default function ProfileP3() {
  return (
    <>
      <AppNavP3 city={me.city} unread={0} />

      <main className="mx-auto max-w-p3-page px-5 pb-24 pt-6 md:pb-10">
        {/* Header */}
        <Card padded={false} className="mb-6 overflow-hidden">
          <div className="relative h-24 bg-gradient-to-br from-p3-brand to-p3-accent-violet" />
          <div className="px-6 pb-6">
            <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <span className="rounded-full bg-white p-1 shadow-p3-md">
                  <Avatar
                    name={me.name}
                    seed="lea-marchand-fr"
                    nationality="FR"
                    size={88}
                  />
                </span>
                <div className="pb-1">
                  <h1 className="text-2xl font-extrabold tracking-p3-tight text-p3-ink md:text-3xl">
                    {me.name}
                  </h1>
                  <p className="mt-0.5 text-sm text-p3-ink-2">
                    {me.age} · {me.nationality} · {me.city}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pb-1">
                <Button
                  size="sm"
                  variant="secondary"
                  leadingIcon={<Edit3 className="h-3.5 w-3.5" strokeWidth={1.75} />}
                >
                  Edit profile
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  leadingIcon={<Settings className="h-3.5 w-3.5" strokeWidth={1.75} />}
                >
                  Settings
                </Button>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-sm text-p3-ink-2">{me.bio}</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Left */}
          <div className="space-y-6">
            <Card>
              <CardTitle>Profile verifications</CardTitle>
              <CardSubtitle>
                Verified profiles get faster employer responses + higher trust
                in community.
              </CardSubtitle>
              <Divider className="my-5" />
              <ul className="grid grid-cols-2 gap-3">
                <VerifyItem
                  ok={me.verified.email}
                  icon={<Mail className="h-4 w-4" />}
                  label="Email verified"
                />
                <VerifyItem
                  ok={me.verified.phone}
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone verified"
                />
                <VerifyItem
                  ok={me.verified.visa}
                  icon={<Plane className="h-4 w-4" />}
                  label={`Visa 417 verified`}
                />
                <VerifyItem
                  ok={me.verified.tfn}
                  icon={<BadgeCheck className="h-4 w-4" />}
                  label="TFN on file"
                  cta="Apply"
                />
              </ul>
            </Card>

            <Card>
              <CardTitle>About me</CardTitle>
              <CardSubtitle>Shown publicly in community + on offers</CardSubtitle>
              <Divider className="my-5" />
              <Detail icon={<Mail className="h-3.5 w-3.5" />} label="Email" value="lea@example.com" muted />
              <Detail icon={<Phone className="h-3.5 w-3.5" />} label="Phone" value="+61 412 *** 678" muted />
              <Detail icon={<MapPin className="h-3.5 w-3.5" />} label="City" value={me.city} />
              <Detail icon={<Plane className="h-3.5 w-3.5" />} label="Visa" value="417 — Working Holiday · Approved" />
              <Detail icon={<CalendarCheck className="h-3.5 w-3.5" />} label="Arrived" value={new Date(me.arrivedAt).toLocaleDateString("en-AU")} />
            </Card>

            <Card padded={false}>
              <div className="border-b border-p3-line px-5 py-4">
                <CardTitle>Recent activity</CardTitle>
                <CardSubtitle>What you've done on the platform</CardSubtitle>
              </div>
              <ul>
                {[
                  { v: "Applied to", t: "Café floor — Single O Surry Hills", at: "2 hrs ago" },
                  { v: "RSVP'd", t: "WHV Rooftop Meet-up at Cliff Dive", at: "Yesterday" },
                  { v: "Joined channel", t: "#sydney-jobs", at: "Yesterday" },
                  { v: "Opened account with", t: "CommBank — Smart Access", at: "2 days ago" },
                ].map((a, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 px-5 py-3 border-b border-p3-line last:border-b-0"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-p3-md bg-p3-brand-soft text-p3-brand-deep">
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <div className="flex-1 text-sm">
                      <span className="text-p3-ink-2">{a.v}</span>{" "}
                      <span className="font-semibold text-p3-ink">{a.t}</span>
                    </div>
                    <span className="font-p3-mono text-[10px] text-p3-ink-3">
                      {a.at}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <Card>
              <CardTitle>Your WHV journey</CardTitle>
              <CardSubtitle>Track your year</CardSubtitle>
              <div className="mt-4 space-y-3">
                <Stat label="Days in Australia" value="44" />
                <Stat label="Days of specified work" value="0 / 88" />
                <Stat label="Visa expires" value="12 Apr 2027" />
              </div>
              <Divider className="my-5" />
              <Link href={`${BASE}/services/migration`}>
                <Button
                  variant="secondary"
                  size="sm"
                  block
                  trailingIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />}
                >
                  Plan my 2nd-year visa
                </Button>
              </Link>
            </Card>

            <Card>
              <CardTitle>Saved jobs</CardTitle>
              <CardSubtitle>Pick up where you left off</CardSubtitle>
              <ul className="mt-4 space-y-2.5">
                {jobs.slice(0, 3).map((j) => (
                  <li key={j.id}>
                    <Link
                      href={`${BASE}/jobs/${j.id}`}
                      className="block rounded-p3-md border border-p3-line p-3 transition-colors hover:bg-p3-surface"
                    >
                      <div className="text-sm font-semibold text-p3-ink">
                        {j.role}
                      </div>
                      <div className="text-[11px] text-p3-ink-2">
                        {j.company} · {j.payRate}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <CardTitle>Privacy & data</CardTitle>
              <CardSubtitle>What's public, what's private</CardSubtitle>
              <ul className="mt-4 space-y-2 text-xs text-p3-ink-2">
                <li className="flex items-start gap-2">
                  <Badge tone="success" size="sm">Public</Badge>
                  Name, city, bio, profile photo
                </li>
                <li className="flex items-start gap-2">
                  <Badge tone="warn" size="sm">Private</Badge>
                  Email, phone, password, visa documents
                </li>
                <li className="flex items-start gap-2">
                  <Badge tone="brand" size="sm">Hidden</Badge>
                  Shared with employer only when you accept an offer
                </li>
              </ul>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                Manage privacy →
              </Button>
            </Card>

            <Button
              variant="secondary"
              size="sm"
              block
              leadingIcon={<LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />}
            >
              Log out
            </Button>
          </div>
        </div>
      </main>
      <MobileTabBar />
    </>
  );
}

const VerifyItem: React.FC<{
  ok: boolean;
  icon: React.ReactNode;
  label: string;
  cta?: string;
}> = ({ ok, icon, label, cta }) => (
  <li
    className={
      "flex items-center justify-between gap-2 rounded-p3-md border px-3 py-2.5 text-sm " +
      (ok
        ? "border-p3-success-soft bg-p3-success-soft/40 text-p3-success"
        : "border-p3-line bg-white text-p3-ink-2")
    }
  >
    <span className="flex items-center gap-2 font-semibold">
      {icon}
      <span className={ok ? "text-p3-ink" : "text-p3-ink"}>{label}</span>
    </span>
    {ok ? (
      <ShieldCheck className="h-4 w-4 text-p3-success" strokeWidth={2} />
    ) : (
      <span className="text-xs font-bold text-p3-brand">{cta}</span>
    )}
  </li>
);

const Detail: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
}> = ({ icon, label, value, muted }) => (
  <div className="mb-3 flex items-start gap-3 last:mb-0">
    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-p3-xs bg-p3-surface text-p3-ink-3">
      {icon}
    </span>
    <div className="flex-1">
      <div className="font-p3-mono text-[10px] uppercase tracking-widest text-p3-ink-3">
        {label}
      </div>
      <div className={"text-sm " + (muted ? "text-p3-ink-3" : "text-p3-ink")}>
        {value}
      </div>
    </div>
  </div>
);

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-baseline justify-between">
    <span className="text-sm text-p3-ink-2">{label}</span>
    <span className="text-xl font-bold tracking-p3-tight text-p3-ink">
      {value}
    </span>
  </div>
);
