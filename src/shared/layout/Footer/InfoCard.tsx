type InfoCardProps = {
  icon: React.ElementType;
  label: string;
  title: string;
  children: React.ReactNode;
};

export function InfoCard({ icon, label, title, children }: InfoCardProps) {
  const Icon = icon;

  return (
    <div className="border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border bg-muted text-foreground">
          <Icon className="size-4" />
        </div>
        <div>
          <p className="eyebrow">{label}</p>
          <p className="mt-1 text-base font-semibold text-foreground">
            {title}
          </p>
        </div>
      </div>
      <div className="mt-4 pl-[3.25rem] text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
