type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 mb-12">
      <h1 className="text-[36px] md:text-[46px] font-bold text-dark leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[18px] md:text-[20px] font-medium text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
