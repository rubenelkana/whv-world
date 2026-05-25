"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Mail,
  User2,
  Globe,
  Plane,
  Calendar,
  MapPin,
  Briefcase,
  Check,
} from "lucide-react";
import { Button } from "@/components/p2/ui/button";
import { Input, Field } from "@/components/p2/ui/input";
import { Select } from "@/components/p2/ui/select";
import { Checkbox } from "@/components/p2/ui/checkbox";
import { Card } from "@/components/p2/ui/card";
import { Badge } from "@/components/p2/ui/badge";

const BASE = "/prototype-business-plan";

export default function WorkerSignupPage() {
  const router = useRouter();
  const [horticulture, setHorticulture] = useState(true);
  const [agriculture, setAgriculture] = useState(false);
  const [hospitality, setHospitality] = useState(true);
  return (
    <main className="mx-auto max-w-p2-narrow px-6 py-12">
      <div className="mb-8">
        <Badge tone="accent" outline className="mb-3">
          Free for workers — always
        </Badge>
        <h1 className="p2-display text-4xl font-medium tracking-p2-tight text-p2-ink">
          Set up your WHV World profile
        </h1>
        <p className="mt-2 max-w-xl text-p2-ink-2">
          We screen each profile manually before it's discoverable to
          employers. Most are reviewed within 48 hours.
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold tracking-p2-tight text-p2-ink">
          About you
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Full name">
            <Input
              placeholder="Léa Marchand"
              defaultValue="Léa Marchand"
              leading={<User2 className="h-4 w-4" strokeWidth={1.5} />}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              placeholder="lea@example.com"
              defaultValue="lea@example.com"
              leading={<Mail className="h-4 w-4" strokeWidth={1.5} />}
            />
          </Field>
          <Field label="Nationality">
            <Select defaultValue="FR">
              <option value="FR">France</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="IT">Italy</option>
              <option value="JP">Japan</option>
              <option value="KR">South Korea</option>
              <option value="ID">Indonesia</option>
              <option value="TW">Taiwan</option>
            </Select>
          </Field>
          <Field label="Age">
            <Input type="number" defaultValue={24} />
          </Field>
        </div>

        <h2 className="mt-8 text-lg font-semibold tracking-p2-tight text-p2-ink">
          Visa & arrival
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Visa subclass">
            <Select defaultValue="417">
              <option value="417">417 — Working Holiday</option>
              <option value="462">462 — Work & Holiday</option>
            </Select>
          </Field>
          <Field label="Visa status">
            <Select defaultValue="approved">
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </Select>
          </Field>
          <Field label="Expected arrival in Australia">
            <Input
              type="date"
              defaultValue="2026-06-15"
              leading={<Plane className="h-4 w-4" strokeWidth={1.5} />}
            />
          </Field>
          <Field label="First city in Australia">
            <Input
              placeholder="Sydney"
              defaultValue="Sydney"
              leading={<MapPin className="h-4 w-4" strokeWidth={1.5} />}
            />
          </Field>
        </div>

        <h2 className="mt-8 text-lg font-semibold tracking-p2-tight text-p2-ink">
          What you're looking for
        </h2>
        <div className="mt-4 space-y-4">
          <Field label="Available from / to">
            <div className="grid grid-cols-2 gap-3">
              <Input type="date" defaultValue="2026-06-20" leading={<Calendar className="h-4 w-4" strokeWidth={1.5} />} />
              <Input type="date" defaultValue="2026-11-30" leading={<Calendar className="h-4 w-4" strokeWidth={1.5} />} />
            </div>
          </Field>

          <Field label="Industries you're open to">
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              <Checkbox checked={horticulture} onChange={setHorticulture} label="Horticulture (picking, packing)" />
              <Checkbox checked={agriculture} onChange={setAgriculture} label="Agriculture (cropping, livestock)" />
              <Checkbox checked={hospitality} onChange={setHospitality} label="Hospitality (lodges, restaurants)" />
              <Checkbox checked={false} label="Tourism (reef, wineries)" />
            </div>
          </Field>

          <Field
            label="Brief intro"
            helper="One paragraph. Employers see this on your card."
          >
            <textarea
              rows={4}
              defaultValue="Hospitality background, looking for a regional placement to qualify for second-year visa. Comfortable with early starts."
              className="block w-full rounded-p2-md border border-p2-line bg-white px-3 py-2 text-sm shadow-p2-sm outline-none focus:border-p2-brand-2"
            />
          </Field>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <Link
            href={BASE}
            className="text-sm text-p2-ink-2 hover:text-p2-ink"
          >
            ← Back to homepage
          </Link>
          <Button
            size="lg"
            onClick={() => router.push(`${BASE}/worker/dashboard`)}
            trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
          >
            Create profile
          </Button>
        </div>
      </Card>

      <div className="mt-6 flex items-start gap-3 rounded-p2-md border border-p2-line bg-p2-cream p-4 text-xs text-p2-ink-2">
        <Globe className="mt-0.5 h-4 w-4 shrink-0 text-p2-brand" strokeWidth={1.5} />
        <p>
          By signing up you agree to the{" "}
          <Link href="#" className="font-medium text-p2-brand hover:underline">
            Privacy Statement
          </Link>{" "}
          (compliant with the Australian Privacy Principles). We share your
          details only with employers you've accepted offers from.
        </p>
      </div>
    </main>
  );
}
