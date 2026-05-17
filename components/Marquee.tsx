export function Marquee() {
  const words = [
    "Podcasts",
    "Coaches",
    "Gaming",
    "Lifestyle",
    "Brands",
    "Fitness",
    "Tech",
    "Creators",
  ];
  const row = [...words, ...words];

  return (
    <section
      aria-hidden
      className="py-10 border-y border-border/60 bg-background/40 overflow-hidden"
    >
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {row.map((w, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-5xl font-semibold text-muted-foreground/40 hover:text-foreground transition-colors"
          >
            {w} <span className="text-primary mx-6">&diams;</span>
          </span>
        ))}
      </div>
    </section>
  );
}
