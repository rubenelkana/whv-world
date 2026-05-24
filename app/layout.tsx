import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WHV World",
  description: "Find jobs, accommodation, and a car for your working holiday in Australia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
