import Link from "next/link";
import { Mail, Lock, User, Phone, MapPin, FileText } from "lucide-react";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Select } from "@/components/ui/select";
import { FormGrid } from "@/components/onboarding/form-grid";
import { PageHeader } from "@/components/onboarding/page-header";

export default function SignupPage() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="max-w-page mx-auto px-6 md:px-24 py-16">
        <PageHeader
          title="Create an profile"
          subtitle="You are creating account"
        />

        <FormGrid>
          <TextInput
            label="Full name"
            placeholder="John Benz"
            icon={<User size={20} />}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail size={20} />}
          />
          <TextInput
            label="Phone Number"
            placeholder="Enter phone number"
            icon={<Phone size={20} />}
          />
          <Select
            label="Gender"
            placeholder="Select gender"
            options={[
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
              { value: "other", label: "Other" },
              { value: "na", label: "Prefer not to say" },
            ]}
          />
          <TextInput
            label="Location"
            placeholder="Enter location"
            icon={<MapPin size={20} />}
          />
          <TextInput
            label="Passport Number"
            placeholder="Enter your passport number"
            icon={<FileText size={20} />}
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter password"
            icon={<Lock size={20} />}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="Enter password"
            icon={<Lock size={20} />}
          />
          <div className="md:col-span-2">
            <TextInput label="Verification code" placeholder="Enter code" />
          </div>
        </FormGrid>

        <div className="flex justify-center mt-12">
          <Link href="/onboarding/needs">
            <Button size="lg">Create Profile</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
