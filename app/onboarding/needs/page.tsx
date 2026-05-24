import { Briefcase, Home, Car } from "lucide-react";
import { Nav } from "@/components/nav";
import { NeedsCard } from "@/components/onboarding/needs-card";
import { PageHeader } from "@/components/onboarding/page-header";

export default function NeedsPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="max-w-page mx-auto px-6 md:px-24 py-16">
        <PageHeader
          title="What do you need?"
          subtitle="Pick what you want to set up first. You can always add more later."
        />

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-8">
          <NeedsCard
            icon={<Briefcase size={32} />}
            title="Job"
            subtitle="Find seasonal work that matches your visa and experience."
            href="/onboarding/job"
          />
          <NeedsCard
            icon={<Home size={32} />}
            title="Accommodation"
            subtitle="Short-stay or long-term rentals near your work."
            href="/onboarding/accommodation"
          />
          <NeedsCard
            icon={<Car size={32} />}
            title="Car"
            subtitle="Reliable wheels to move between regions and worksites."
            href="/onboarding/car"
          />
        </div>
      </section>
    </main>
  );
}
