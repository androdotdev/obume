import { Mic, Gamepad2, Film, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Short-Form Editing",
    desc: "Reels, TikToks, and Shorts crafted to maximise watch time and reshares.",
    points: ["Hook in 1.5s", "Retention pacing", "Native captions"],
  },
  {
    icon: Mic,
    title: "Talking Head Edits",
    desc: "Podcast clips and coach content tightened with cuts, b-roll, and emphasis.",
    points: ["Jump cuts", "Dynamic captions", "B-roll layering"],
  },
  {
    icon: Gamepad2,
    title: "Gaming Edits",
    desc: "Highlights, montages, and clips with energy that lands the impact.",
    points: ["Beat-synced cuts", "SFX & VFX", "Killcam pacing"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-28 relative">
      <div className="container mx-auto px-5 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            -- Services
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Built for retention. Engineered for growth.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group relative p-7 rounded-2xl bg-gradient-surface border border-border/60 hover:border-primary/40 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div className="h-11 w-11 rounded-xl bg-secondary border border-border grid place-items-center group-hover:bg-gradient-primary group-hover:border-transparent transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="font-display text-xl font-semibold mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {s.desc}
                  </p>

                  <ul className="space-y-2 pt-5 border-t border-border/60">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
