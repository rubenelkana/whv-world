import { cn } from "@/lib/cn";

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "default" | "cream" | "ink";
  containerClassName?: string;
  align?: "left" | "center";
}

export const Section: React.FC<SectionProps> = ({
  eyebrow,
  title,
  intro,
  tone = "default",
  align = "left",
  className,
  containerClassName,
  children,
  ...rest
}) => (
  <section
    className={cn(
      "relative",
      tone === "cream" && "bg-p2-cream",
      tone === "ink" && "bg-p2-ink text-white",
      className,
    )}
    {...rest}
  >
    <div
      className={cn(
        "mx-auto max-w-p2-page px-6 py-20 md:py-28",
        containerClassName,
      )}
    >
      {(eyebrow || title || intro) && (
        <header
          className={cn(
            "mb-12 md:mb-16",
            align === "center" && "mx-auto max-w-2xl text-center",
            align === "left" && "max-w-3xl",
          )}
        >
          {eyebrow && (
            <div
              className={cn(
                "mb-4 font-p2-mono text-[11px] uppercase tracking-[0.18em]",
                tone === "ink" ? "text-p2-accent" : "text-p2-brand",
              )}
            >
              {eyebrow}
            </div>
          )}
          {title && (
            <h2
              className={cn(
                "p2-display text-4xl font-medium md:text-5xl",
                tone === "ink" ? "text-white" : "text-p2-ink",
              )}
            >
              {title}
            </h2>
          )}
          {intro && (
            <p
              className={cn(
                "mt-5 text-lg",
                tone === "ink" ? "text-white/70" : "text-p2-ink-2",
              )}
            >
              {intro}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  </section>
);
