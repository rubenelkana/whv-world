import Link from "next/link";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Select } from "@/components/ui/select";
import { FormGrid } from "@/components/onboarding/form-grid";
import { PageHeader } from "@/components/onboarding/page-header";

const ACCOMMODATION_TYPES = [
  { value: "shared", label: "Shared house" },
  { value: "studio", label: "Studio" },
  { value: "private", label: "Private room" },
  { value: "hostel", label: "Hostel" },
];

const DURATIONS = [
  { value: "short", label: "Less than 1 month" },
  { value: "medium", label: "1–3 months" },
  { value: "long", label: "3+ months" },
];

export default function AccommodationDetailPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="max-w-page mx-auto px-6 md:px-24 py-16">
        <PageHeader
          title="Accommodation details"
          subtitle="Where and how long do you need to stay?"
        />

        <FormGrid>
          <TextInput label="Preferred location" placeholder="e.g. Sydney" />
          <TextInput
            label="Move-in date"
            type="date"
            placeholder="dd/mm/yyyy"
          />
          <Select
            label="Type"
            placeholder="Select type"
            options={ACCOMMODATION_TYPES}
          />
          <Select
            label="Duration"
            placeholder="Select duration"
            options={DURATIONS}
          />
          <TextInput
            label="Budget (AUD per week)"
            type="number"
            placeholder="e.g. 250"
          />
          <TextInput
            label="Number of people"
            type="number"
            placeholder="1"
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
