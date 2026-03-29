interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-sm text-white/90 border border-white/10 ${className}`}
    >
      {children}
    </span>
  );
}
