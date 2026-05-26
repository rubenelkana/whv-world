import * as React from "react";
import { cn } from "@/lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  lifted?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  padded = true,
  hoverable,
  bordered = true,
  lifted,
  ...rest
}) => (
  <div
    className={cn(
      "rounded-p3-xl bg-white",
      bordered && "border border-p3-line",
      lifted ? "shadow-p3-md" : "shadow-p3-sm",
      hoverable &&
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-p3-md",
      padded && "p-5",
      className,
    )}
    {...rest}
  />
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...rest
}) => (
  <h3
    className={cn(
      "text-base font-semibold tracking-p3-tight text-p3-ink",
      className,
    )}
    {...rest}
  />
);

export const CardSubtitle: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...rest
}) => (
  <p className={cn("text-sm text-p3-ink-2", className)} {...rest} />
);
