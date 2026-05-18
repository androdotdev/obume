import Link from "next/link";

export function Footer({ className }: { className?: string } = {}) {
  return (
    <footer className={`border-t border-border/60 py-10 ${className ?? ""}`}>
      <div className="container mx-auto px-5 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded bg-gradient-primary grid place-items-center font-display font-bold text-primary-foreground text-xs">
            O
          </span>
          <span className="font-display font-semibold text-foreground">
            obume
          </span>
          <span className="ml-2">&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/services" className="hover:text-foreground transition-colors">
            Services
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <a href="/admin" className="hover:text-foreground transition-colors">
            Crafted for creators who care about retention.
          </a>
        </div>
      </div>
    </footer>
  );
}
