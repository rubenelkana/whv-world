import * as React from "react";
import { cn } from "@/lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  padded = true,
  hoverable,
  bordered = true,
  ...rest
}) => (
  <div
    className={cn(
      "rounded-p2-lg bg-p2-surface",
      bordered && "border border-p2-line shadow-p2-sm",
      hoverable && "transition-all duration-150 hover:-translate-y-px hover:shadow-p2-md",
      padded && "p-5",
      className,
    )}
    {...rest}
  />
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <div
    className={cn("mb-4 flex items-start justify-between gap-3", className)}
    {...rest}
  />
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...rest
}) => (
  <h3
    className={cn(
      "text-base font-semibold tracking-p2-tight text-p2-ink",
      className,
    )}
    {...rest}
  />
);

export const CardSubtitle: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...rest
}) => (
  <p className={cn("text-sm text-p2-ink-2", className)} {...rest} />
);
