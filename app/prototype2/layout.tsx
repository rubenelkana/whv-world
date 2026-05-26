import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./p3.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-p3-sans",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-p3-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WHV World — Your Australian adventure, sorted.",
  description:
    "The app every Working Holiday Visa holder needs from day one: jobs, community, events, bank, tax, insurance — all in one place.",
};

export default function Prototype2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`p3-root ${jakarta.variable} ${jbMono.variable} font-p3-sans bg-p3-paper text-p3-ink min-h-screen`}
    >
      {children}
    </div>
  );
}
