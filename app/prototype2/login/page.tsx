import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { Logo } from "@/components/p3/brand/logo";
import { Button } from "@/components/p3/ui/button";
import { Input, Field } from "@/components/p3/ui/input";
import { Divider } from "@/components/p3/ui/divider";

const BASE = "/prototype2";

export const metadata = { title: "Log in — WHV World" };

export default function LoginP3() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1fr]">
      {/* form panel */}
      <div className="flex flex-col px-6 py-10 md:px-14">
        <Link href={BASE}>
          <Logo />
        </Link>

        <div className="mx-auto my-auto w-full max-w-sm">
          <h1 className="text-3xl font-extrabold tracking-p3-tight text-p3-ink">
            Welcome back 👋
          </h1>
          <p className="mt-2 text-sm text-p3-ink-2">
            Pick up where you left off — your Sydney channels are buzzing.
          </p>

          <form
            className="mt-8 space-y-4"
            action={`${BASE}/home`}
            method="get"
          >
            <Field label="Email">
              <Input
                type="email"
                placeholder="lea@example.com"
                defaultValue="lea@example.com"
                leading={<Mail className="h-4 w-4" strokeWidth={1.75} />}
              />
            </Field>
            <Field
              label="Password"
              helper={
                <Link
                  href="#"
                  className="font-semibold text-p3-brand hover:underline"
                >
                  Forgot password?
                </Link>
              }
            >
              <Input
                type="password"
                placeholder="••••••••"
                defaultValue="prototype"
                leading={<Lock className="h-4 w-4" strokeWidth={1.75} />}
              />
            </Field>
            <Button
              size="lg"
              type="submit"
              block
              trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2.25} />}
            >
              Open my dashboard
            </Button>
          </form>

          <Divider label="or" className="my-8" />

          <Button variant="secondary" size="lg" block>
            Continue with Google
          </Button>

          <p className="mt-10 text-center text-sm text-p3-ink-2">
            Just landed in Australia?{" "}
            <Link
              href={`${BASE}/signup`}
              className="font-semibold text-p3-brand hover:underline"
            >
              Create your account
            </Link>
          </p>
        </div>

        <div className="text-xs text-p3-ink-3">© 2026 WHV World</div>
      </div>

      {/* brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-p3-brand via-p3-brand-deep to-p3-accent-violet lg:block">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute -left-32 top-1/3 h-[460px] w-[460px] rounded-full bg-p3-accent-mint/30 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-p3-accent-coral/30 blur-3xl" />
        </div>
        <div className="relative flex h-full flex-col items-start justify-between p-14 text-white">
          <Logo tone="light" />
          <figure className="max-w-md">
            <p className="text-3xl font-bold leading-snug tracking-p3-tight">
              &ldquo;Six weeks in. I have a job, a flat, a tax agent, and a
              Saturday surf crew. WHV World did most of it.&rdquo;
            </p>
            <figcaption className="mt-5 text-sm text-white/70">
              — Léa, 24, Sydney
            </figcaption>
          </figure>
          <div className="grid w-full grid-cols-3 gap-4 border-t border-white/10 pt-6 text-white">
            <Stat label="WHV holders" value="5.3k+" />
            <Stat label="Aussie cities" value="8" />
            <Stat label="Avg setup time" value="2 days" />
          </div>
        </div>
      </div>
    </div>
  );
}

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="font-p3-mono text-[10px] uppercase tracking-widest text-white/50">
      {label}
    </div>
    <div className="mt-1 text-2xl font-bold">{value}</div>
  </div>
);
