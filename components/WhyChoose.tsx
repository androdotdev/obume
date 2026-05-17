import { Captions, Zap, Target, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Captions,
    title: "Clean Captions",
    desc: "Readable, on-brand, perfectly synced -- every frame.",
  },
  {
    icon: Zap,
    title: "Fast Pacing",
    desc: "Cuts that match the beat of the scroll, never the script.",
  },
  {
    icon: Target,
    title: "Hook-Focused",
    desc: "First 3 seconds engineered to stop the thumb.",
  },
  {
    icon: TrendingUp,
    title: "Trend Aware",
    desc: "Editing styles tuned to what's working this week.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-28 relative">
      <div className="container mx-auto px-5 max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
          <div className="lg:sticky lg:top-32 space-y-5">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              -- Why Obume
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              The difference is in the details.
            </h2>
            <p className="text-muted-foreground max-w-md">
              Every cut, caption, and transition is intentional -- designed to
              keep viewers watching from the first frame to the last.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-card/60 border border-border/60 hover:border-primary/40 hover:-translate-y-1 transition-all duration-500"
                >
                  <Icon className="h-6 w-6 text-primary mb-5" />
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
