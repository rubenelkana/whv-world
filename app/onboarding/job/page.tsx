import Link from "next/link";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { FormGrid } from "@/components/onboarding/form-grid";
import { PageHeader } from "@/components/onboarding/page-header";

const AUSTRALIAN_STATES = [
  { value: "nsw", label: "New South Wales" },
  { value: "vic", label: "Victoria" },
  { value: "qld", label: "Queensland" },
  { value: "wa", label: "Western Australia" },
  { value: "sa", label: "South Australia" },
  { value: "tas", label: "Tasmania" },
  { value: "act", label: "Australian Capital Territory" },
  { value: "nt", label: "Northern Territory" },
];

const VISA_TYPES = [
  { value: "417", label: "Subclass 417 (Working Holiday)" },
  { value: "462", label: "Subclass 462 (Work and Holiday)" },
];

export default function JobDetailPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="max-w-page mx-auto px-6 md:px-24 py-16">
        <PageHeader
          title="Job details"
          subtitle="Tell us about your work eligibility and experience."
        />

        <FormGrid>
          <Select
            label="Right to work in Australia"
            placeholder="Select your visa subclass"
            options={VISA_TYPES}
          />
          <TextInput label="Visa Number" placeholder="Enter visa number" />
          <TextInput
            label="Expiry Date Visa"
            type="date"
            placeholder="dd/mm/yyyy"
          />
          <Select
            label="State preference"
            placeholder="Select state"
            options={AUSTRALIAN_STATES}
          />
          <TextInput
            label="Work Experience"
            placeholder="e.g. Hospitality, 2 years"
          />
          <TextInput
            label="Certification"
            placeholder="e.g. RSA, First Aid"
          />
          <div className="md:col-span-2">
            <FileUpload label="CV / Resume" />
          </div>
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
