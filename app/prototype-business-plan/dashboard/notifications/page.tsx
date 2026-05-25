import { Topbar } from "@/components/p2/layout/topbar";
import { Card } from "@/components/p2/ui/card";
import { Badge } from "@/components/p2/ui/badge";
import { Avatar } from "@/components/p2/ui/avatar";
import { activity, placements, workerById } from "@/lib/mock";

export default function NotificationsPage() {
  // Group activity by date string
  const grouped: Record<string, typeof activity> = {};
  for (const a of activity) {
    const d = new Date(a.at).toLocaleDateString("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    (grouped[d] ||= []).push(a);
  }

  return (
    <>
      <Topbar
        breadcrumbs={[{ label: "Riverina Citrus" }, { label: "Activity" }]}
      />
      <div className="mx-auto w-full max-w-[1024px] px-6 py-8">
        <div className="mb-6">
          <h1 className="p2-display text-3xl font-medium tracking-p2-tight text-p2-ink">
            Reconfirmation activity
          </h1>
          <p className="mt-1.5 text-sm text-p2-ink-2">
            Every reconfirmation, status change, and alert in your workspace —
            in one place.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            "All activity",
            "System actions",
            "Worker responses",
            "Employer actions",
            "Critical alerts",
          ].map((f, i) => (
            <button
              key={f}
              className={
                "rounded-p2-md border px-3 py-1.5 text-xs font-medium " +
                (i === 0
                  ? "border-p2-ink bg-p2-ink text-white"
                  : "border-p2-line bg-white text-p2-ink-2 hover:border-p2-ink-4")
              }
            >
              {f}
            </button>
          ))}
        </div>

        {Object.entries(grouped).map(([date, items]) => (
          <section key={date} className="mb-8">
            <div className="sticky top-14 z-20 mb-3 -mx-2 bg-p2-paper/85 px-2 py-1 backdrop-blur">
              <h2 className="font-p2-mono text-[11px] uppercase tracking-widest text-p2-ink-3">
                {date}
              </h2>
            </div>
            <Card padded={false}>
              <ul>
                {items.map((a, idx) => {
                  const w = a.placementId
                    ? workerById[
                        placements.find((p) => p.id === a.placementId)?.workerId ?? ""
                      ]
                    : null;
                  const tone =
                    a.actor === "system"
                      ? "brand"
                      : a.actor === "worker"
                      ? "success"
                      : a.actor === "employer"
                      ? "info"
                      : "neutral";
                  return (
                    <li
                      key={a.id}
                      className="flex items-start gap-4 border-b border-p2-line px-5 py-4 last:border-b-0"
                    >
                      <div className="w-16 shrink-0 pt-0.5 font-p2-mono text-[11px] text-p2-ink-3">
                        {new Date(a.at).toLocaleTimeString("en-AU", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <Badge tone={tone} size="sm" className="mt-0.5 capitalize">
                        {a.actor}
                      </Badge>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-p2-ink">
                          <span className="text-p2-ink-2">{a.verb}</span>{" "}
                          <span className="font-medium">{a.target}</span>
                        </div>
                        {w && (
                          <div className="mt-1.5 flex items-center gap-2 text-xs text-p2-ink-2">
                            <Avatar
                              name={w.name}
                              seed={w.photoSeed}
                              nationality={w.nationality}
                              size={20}
                            />
                            {w.name} · {w.visa} ·{" "}
                            {w.currentLocation?.city ?? "Arriving"}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </section>
        ))}
      </div>
    </>
  );
}
