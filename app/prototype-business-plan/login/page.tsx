import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { Logo } from "@/components/p2/brand/logo";
import { Button } from "@/components/p2/ui/button";
import { Input, Field } from "@/components/p2/ui/input";
import { Divider } from "@/components/p2/ui/divider";
import { Avatar } from "@/components/p2/ui/avatar";

const BASE = "/prototype-business-plan";

export const metadata = { title: "Log in — WHV World" };

export default function LoginPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
      {/* Form panel */}
      <div className="flex flex-col px-8 py-10 md:px-16 md:py-14">
        <Link href={BASE}>
          <Logo />
        </Link>

        <div className="mx-auto my-auto w-full max-w-sm">
          <h1 className="p2-display text-3xl font-medium tracking-p2-tight text-p2-ink">
            Welcome back.
          </h1>
          <p className="mt-2 text-sm text-p2-ink-2">
            Log in to manage your placements, candidates, and reconfirmation
            pipeline.
          </p>

          <form
            className="mt-8 space-y-4"
            action={`${BASE}/dashboard`}
            method="get"
          >
            <Field label="Work email">
              <Input
                type="email"
                placeholder="sarah@riverina-citrus.com.au"
                defaultValue="sarah@riverina-citrus.com.au"
                leading={<Mail className="h-4 w-4" strokeWidth={1.5} />}
              />
            </Field>
            <Field
              label="Password"
              helper={
                <Link
                  href="#"
                  className="font-medium text-p2-brand hover:underline"
                >
                  Forgot password?
                </Link>
              }
            >
              <Input
                type="password"
                placeholder="••••••••"
                defaultValue="prototype"
                leading={<Lock className="h-4 w-4" strokeWidth={1.5} />}
              />
            </Field>

            <Button
              size="lg"
              type="submit"
              className="w-full"
              trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
            >
              Continue to dashboard
            </Button>
          </form>

          <Divider label="or" className="my-8" />

          <Button variant="secondary" size="lg" className="w-full">
            Continue with Google
          </Button>

          <p className="mt-10 text-center text-sm text-p2-ink-2">
            New to WHV World?{" "}
            <Link
              href={`${BASE}/signup`}
              className="font-medium text-p2-brand hover:underline"
            >
              Start a free pilot
            </Link>
          </p>
        </div>

        <div className="text-xs text-p2-ink-3">
          © 2026 PT. Langkah Inovasi Digital
        </div>
      </div>

      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-p2-ink lg:block">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute -left-32 top-1/3 h-[460px] w-[460px] rounded-full bg-p2-brand-2/30 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-p2-accent/20 blur-3xl" />
        </div>

        <div className="relative flex h-full flex-col justify-between px-14 py-14 text-white">
          <Logo tone="light" />

          <figure className="max-w-md">
            <p className="p2-display text-3xl font-medium leading-snug tracking-p2-tight">
              &ldquo;Before WHV World, I had a spreadsheet, a WhatsApp group, and
              a low-grade panic for two weeks before every harvest. Now I open
              the dashboard with my morning coffee and just trust it.&rdquo;
            </p>
            <figcaption className="mt-6 flex items-center gap-3 text-sm">
              <Avatar name="Sarah K" seed="sarah-kelly" size={36} />
              <span>
                <span className="block font-medium">Sarah K.</span>
                <span className="block text-xs text-white/60">
                  Outback Recruitment Partners · Toowoomba QLD
                </span>
              </span>
            </figcaption>
          </figure>

          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <Stat label="Active placements" value="42" />
            <Stat label="On-time start rate" value="96%" />
            <Stat label="Avg time-to-fill" value="9 days" />
          </div>
        </div>
      </div>
    </div>
  );
}

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="font-p2-mono text-[10px] uppercase tracking-widest text-white/50">
      {label}
    </div>
    <div className="p2-display mt-1 text-2xl font-medium">{value}</div>
  </div>
);
