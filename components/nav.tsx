import Link from "next/link";
import { Menu } from "lucide-react";

type NavProps = {
  variant?: "default" | "transparent";
};

export function Nav({ variant = "default" }: NavProps) {
  const bgClass = variant === "transparent" ? "bg-transparent" : "bg-body";

  return (
    <header className={`w-full ${bgClass}`}>
      <div className="max-w-page mx-auto px-6 md:px-24 py-8 flex items-center justify-between">
        <Link href="/" className="text-[39px] font-bold text-dark leading-none">
          Logo
        </Link>

        <nav className="hidden md:flex items-center gap-[50px]">
          <Link href="#" className="text-[18px] text-dark hover:opacity-70">
            Product
          </Link>
          <Link href="#" className="text-[18px] text-dark hover:opacity-70">
            Pricing
          </Link>
          <Link href="#" className="text-[18px] text-dark hover:opacity-70">
            Blog
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#"
            className="px-5 py-[15px] rounded-button text-[16px] text-muted hover:opacity-70"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-10 py-[15px] rounded-button text-[16px] font-bold bg-primary text-body hover:opacity-90"
          >
            Signup
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden text-dark"
        >
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
}
