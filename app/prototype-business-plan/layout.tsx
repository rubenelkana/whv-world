import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./p2.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-p2-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-p2-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-p2-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WHV World — Workforce ERP for Seasonal WHV Hiring",
  description:
    "WHV World turns informal job promises into structured, verified, and monitored commitments. Built for Australian recruitment agencies and seasonal employers.",
};

export default function PrototypeBusinessPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`p2-root ${inter.variable} ${fraunces.variable} ${jbMono.variable} font-p2-sans bg-p2-paper text-p2-ink min-h-screen`}
    >
      {children}
    </div>
  );
}
