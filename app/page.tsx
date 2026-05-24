import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Nav variant="transparent" />

      <section className="relative max-w-page mx-auto px-6 md:px-24 pt-16 md:pt-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col gap-6 max-w-xl">
            <span className="inline-flex items-center self-start px-4 py-2 rounded-button bg-yellow text-dark text-[14px] font-medium">
              For Working Holiday Visa Holders
            </span>
            <h1 className="text-[40px] md:text-[64px] font-bold text-dark leading-[1.05]">
              Your Australian adventure, fully sorted.
            </h1>
            <p className="text-[18px] md:text-[20px] text-muted leading-relaxed">
              Find seasonal jobs, accommodation, and a car — all in one place
              built for WHV travellers.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/signup">
                <Button size="lg">Get started</Button>
              </Link>
              <Link href="#">
                <Button size="lg" variant="secondary">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full aspect-square max-w-[560px] mx-auto">
            <Image
              src="/assets/rocket.svg"
              alt="Rocket illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <Image
          src="/assets/abstract-splash.svg"
          alt=""
          width={400}
          height={400}
          aria-hidden
          className="hidden md:block absolute top-10 right-0 opacity-60 -z-0 pointer-events-none"
        />
      </section>
    </main>
  );
}
