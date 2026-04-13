type ActionLinkProps = {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
};

export function ActionLink({ href, icon, children }: ActionLinkProps) {
  const Icon = icon;

  return (
    <a
      href={href}
      className="flex items-center gap-3 border border-input bg-background/80 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      <Icon className="size-4" />
      {children}
    </a>
  );
}
