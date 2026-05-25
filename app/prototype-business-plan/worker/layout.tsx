import { WorkerNav } from "@/components/p2/layout/worker-nav";

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-p2-paper">
      <WorkerNav />
      {children}
    </div>
  );
}
