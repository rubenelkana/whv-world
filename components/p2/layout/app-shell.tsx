import { Sidebar } from "./sidebar";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex min-w-0 flex-1 flex-col bg-p2-paper">{children}</div>
  </div>
);
