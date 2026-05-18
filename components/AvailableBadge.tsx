export function AvailableBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-muted-foreground">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-status-online)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-status-online)]" />
      </span>
      Available for work &mdash; 2026
    </div>
  );
}
