import Link from "next/link";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Select } from "@/components/ui/select";
import { FormGrid } from "@/components/onboarding/form-grid";
import { PageHeader } from "@/components/onboarding/page-header";

const CAR_TYPES = [
  { value: "sedan", label: "Sedan" },
  { value: "hatchback", label: "Hatchback" },
  { value: "suv", label: "SUV" },
  { value: "van", label: "Van / Campervan" },
  { value: "ute", label: "Ute" },
];

const TRANSMISSION = [
  { value: "auto", label: "Automatic" },
  { value: "manual", label: "Manual" },
  { value: "any", label: "No preference" },
];

export default function CarDetailPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="max-w-page mx-auto px-6 md:px-24 py-16">
        <PageHeader
          title="Car details"
          subtitle="Tell us what kind of car you're after."
        />

        <FormGrid>
          <TextInput label="Pickup location" placeholder="e.g. Melbourne" />
          <TextInput
            label="Pickup date"
            type="date"
            placeholder="dd/mm/yyyy"
          />
          <Select label="Car type" placeholder="Select type" options={CAR_TYPES} />
          <Select
            label="Transmission"
            placeholder="Select transmission"
            options={TRANSMISSION}
          />
          <TextInput
            label="Budget (AUD per week)"
            type="number"
            placeholder="e.g. 200"
          />
          <TextInput
            label="Driver licence number"
            placeholder="Enter licence number"
          />
        </FormGrid>

        <div className="flex justify-center mt-12">
          <Link href="/onboarding/needs">
            <Button size="lg">Submit</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
