import Link from "next/link";
import { notFound } from "next/navigation";
import * as Icons from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Star,
  Megaphone,
  ShieldCheck,
  ListChecks,
  Sparkles,
} from "lucide-react";
import { AppNavP3 } from "@/components/p3/layout/app-nav";
import { MobileTabBar } from "@/components/p3/layout/mobile-tabbar";
import { Card, CardTitle, CardSubtitle } from "@/components/p3/ui/card";
import { Badge } from "@/components/p3/ui/badge";
import { Button } from "@/components/p3/ui/button";
import { IconCircle } from "@/components/p3/ui/icon-circle";
import { Divider } from "@/components/p3/ui/divider";
import { serviceCategories, serviceSlugs, me } from "@/lib/mock-p3";

const BASE = "/prototype2";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export default function ServicePageP3({
  params,
}: {
  params: { slug: string };
}) {
  const cat = serviceCategories[params.slug];
  if (!cat) notFound();
  const Icon =
    ((Icons as unknown) as Record<string, React.ElementType>)[cat.iconKey] ??
    Icons.Sparkles;

  return (
    <>
      <AppNavP3 city={me.city} unread={3} />

      <main className="mx-auto max-w-p3-page px-5 pb-24 pt-6 md:pb-10">
        <Link
          href={`${BASE}/home`}
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-p3-ink-2 hover:text-p3-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Back to home
        </Link>

        {/* Hero */}
        <section
          className={
            "relative overflow-hidden rounded-p3-2xl border border-p3-line p-7 md:p-10 " +
            heroBg(cat.heroAccent)
          }
        >
          <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <Badge tone={cat.heroAccent} className="mb-3">
                Service category
              </Badge>
              <h1 className="text-4xl font-extrabold leading-tight tracking-p3-tight text-p3-ink md:text-5xl">
                {cat.label}
              </h1>
              <p className="mt-3 max-w-2xl text-base text-p3-ink-2 md:text-lg">
                {cat.intro}
              </p>
              <p className="mt-2 max-w-2xl text-sm text-p3-ink-2/80">
                {cat.longDesc}
              </p>
            </div>
            <IconCircle accent={cat.heroAccent} size={88} className="hidden md:flex">
              <Icon className="h-10 w-10" strokeWidth={1.5} />
            </IconCircle>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Left: providers */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-p3-ink-2">
                Vetted providers
              </h2>
              <Badge tone="success" size="sm" dot>
                Curated by WHV World
              </Badge>
            </div>

            <ul className="space-y-4">
              {cat.providers.map((p) => (
                <li key={p.id}>
                  <Card className="transition-all hover:-translate-y-0.5 hover:shadow-p3-md">
                    <div className="flex items-start gap-4">
                      <span
                        className={
                          "grid h-12 w-12 shrink-0 place-items-center rounded-p3-md font-bold text-white " +
                          gradientBg(cat.heroAccent)
                        }
                      >
                        {p.name[0]}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h3 className="text-base font-bold tracking-p3-tight text-p3-ink">
                            {p.name}
                          </h3>
                          {p.whvFriendly && (
                            <Badge tone="brand" size="sm">
                              WHV-friendly
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1.5 text-sm text-p3-ink-2">{p.blurb}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                          {p.highlights.map((h) => (
                            <Badge key={h} tone="neutral" size="sm">
                              {h}
                            </Badge>
                          ))}
                          {p.rating > 0 && (
                            <span className="inline-flex items-center gap-1 text-xs text-p3-ink-2">
                              <Star
                                className="h-3 w-3 fill-current text-p3-accent-amber"
                                strokeWidth={0}
                              />
                              <span className="font-semibold text-p3-ink">{p.rating}</span>
                              <span className="text-p3-ink-3">
                                ({p.reviewCount.toLocaleString()} reviews)
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-right">
                        {p.startingPrice && (
                          <div>
                            <div className="font-p3-mono text-[10px] uppercase tracking-widest text-p3-ink-3">
                              From
                            </div>
                            <div className="text-lg font-bold tracking-p3-tight text-p3-ink">
                              {p.startingPrice}
                            </div>
                          </div>
                        )}
                        <Button
                          size="sm"
                          trailingIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />}
                        >
                          {p.ctaLabel}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>

            {/* FAQ */}
            <h2 className="mb-3 mt-10 text-sm font-bold uppercase tracking-widest text-p3-ink-2">
              FAQ
            </h2>
            <Card padded={false}>
              {cat.faq.map((f, i) => (
                <details
                  key={i}
                  className="group border-b border-p3-line last:border-b-0 open:bg-p3-surface"
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 text-sm font-semibold text-p3-ink marker:hidden">
                    <span>{f.q}</span>
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-p3-line bg-white text-p3-ink-3 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-p3-ink-2">{f.a}</p>
                </details>
              ))}
            </Card>
          </section>

          {/* Right: checklist + sponsored + cross-link */}
          <aside className="space-y-5">
            {cat.checklist && (
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>Your {cat.label.toLowerCase()} checklist</CardTitle>
                    <CardSubtitle>
                      The boring-but-necessary steps
                    </CardSubtitle>
                  </div>
                  <ListChecks className="h-4 w-4 text-p3-brand" strokeWidth={1.75} />
                </div>
                <ul className="mt-4 space-y-2.5">
                  {cat.checklist.map((c) => (
                    <li key={c.label} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={
                          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border " +
                          (c.done
                            ? "border-p3-success bg-p3-success text-white"
                            : "border-p3-line bg-white text-p3-ink-3")
                        }
                      >
                        {c.done && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                      <span
                        className={
                          c.done ? "text-p3-ink-3 line-through" : "text-p3-ink"
                        }
                      >
                        {c.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            <Card className="border-p3-brand/20 bg-p3-brand-tint">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-p3-md bg-p3-brand text-white">
                  <Megaphone className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <div className="text-sm font-bold text-p3-ink">
                    Want to be listed here?
                  </div>
                  <p className="mt-1 text-xs text-p3-ink-2">
                    We curate providers carefully. Email{" "}
                    <span className="font-semibold text-p3-ink">
                      Sales@braviconsults.com
                    </span>{" "}
                    with your WHV-friendly offer.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <CardTitle>Stay safe</CardTitle>
              <CardSubtitle>What to watch for</CardSubtitle>
              <Divider className="my-4" />
              <ul className="space-y-2.5 text-xs text-p3-ink-2">
                <li className="flex gap-2">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-p3-success" strokeWidth={2} />
                  Never pay providers via wire transfer to a personal account.
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-p3-success" strokeWidth={2} />
                  Use providers that issue tax invoices with an ABN.
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-p3-success" strokeWidth={2} />
                  Report scams in <span className="font-semibold text-p3-ink">#sydney-housing</span> — we pin alerts.
                </li>
              </ul>
            </Card>

            <Card>
              <CardTitle>Browse other categories</CardTitle>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {serviceSlugs
                  .filter((s) => s !== cat.slug)
                  .map((s) => {
                    const other = serviceCategories[s];
                    const O =
                      ((Icons as unknown) as Record<string, React.ElementType>)[other.iconKey] ??
                      Sparkles;
                    return (
                      <Link
                        key={s}
                        href={`${BASE}/services/${s}`}
                        className="group flex flex-col items-center gap-1.5 rounded-p3-md border border-p3-line bg-white p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-p3-sm"
                      >
                        <IconCircle accent={other.heroAccent} size={36} variant="soft">
                          <O className="h-4 w-4" strokeWidth={1.75} />
                        </IconCircle>
                        <span className="text-[10px] font-semibold text-p3-ink">
                          {other.label}
                        </span>
                      </Link>
                    );
                  })}
              </ul>
            </Card>
          </aside>
        </div>
      </main>
      <MobileTabBar />
    </>
  );
}

function heroBg(accent: string): string {
  const m: Record<string, string> = {
    brand: "bg-gradient-to-br from-p3-brand-tint to-white",
    coral: "bg-gradient-to-br from-p3-accent-coral-soft to-white",
    mint: "bg-gradient-to-br from-p3-accent-mint-soft to-white",
    amber: "bg-gradient-to-br from-p3-accent-amber-soft to-white",
    indigo: "bg-gradient-to-br from-p3-accent-indigo-soft to-white",
    emerald: "bg-gradient-to-br from-p3-accent-emerald-soft to-white",
    sky: "bg-gradient-to-br from-p3-accent-sky-soft to-white",
    violet: "bg-gradient-to-br from-p3-accent-violet-soft to-white",
    orange: "bg-gradient-to-br from-p3-accent-orange-soft to-white",
    rose: "bg-gradient-to-br from-p3-accent-rose-soft to-white",
  };
  return m[accent] ?? m.brand;
}

function gradientBg(accent: string): string {
  const m: Record<string, string> = {
    brand: "bg-gradient-to-br from-p3-brand to-p3-brand-deep",
    coral: "bg-gradient-to-br from-p3-accent-coral to-rose-600",
    mint: "bg-gradient-to-br from-p3-accent-mint to-emerald-600",
    amber: "bg-gradient-to-br from-p3-accent-amber to-orange-500",
    indigo: "bg-gradient-to-br from-p3-accent-indigo to-blue-600",
    emerald: "bg-gradient-to-br from-p3-accent-emerald to-teal-600",
    sky: "bg-gradient-to-br from-p3-accent-sky to-blue-500",
    violet: "bg-gradient-to-br from-p3-accent-violet to-fuchsia-600",
    orange: "bg-gradient-to-br from-p3-accent-orange to-amber-600",
    rose: "bg-gradient-to-br from-p3-accent-rose to-pink-600",
  };
  return m[accent] ?? m.brand;
}
