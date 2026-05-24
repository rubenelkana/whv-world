import { ReactNode } from "react";

type FormGridProps = {
  children: ReactNode;
};

export function FormGrid({ children }: FormGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[820px] mx-auto">
      {children}
    </div>
  );
}
