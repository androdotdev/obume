export function About() {
  const stats = [
    { value: "10M+", label: "Views edited" },
    { value: "150+", label: "Videos shipped" },
    { value: "48h", label: "Avg turnaround" },
    { value: "20+", label: "Creators served" },
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="container mx-auto px-5 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            -- About
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            I&apos;m a freelance editor obsessed with{" "}
            <span className="text-gradient italic font-medium">
              making creators grow
            </span>
            .
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Obume is a one-person studio focused on short-form. I work with
            creators, coaches, and brands who care about retention -- not just
            posting. If you have the content, I&apos;ll turn it into the kind of
            edits people watch twice.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60 max-w-4xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-8 text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
