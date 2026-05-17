import { AvailableBadge } from "./AvailableBadge";

export function Hero() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-5 max-w-6xl relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <AvailableBadge />
          </div>

          <h1
            className="opacity-0 animate-fade-in-up font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
            style={{ animationDelay: "0.2s" }}
          >
            I turn your content into{" "}
            <span className="text-gradient italic font-medium">
              high-retention
            </span>{" "}
            videos.
          </h1>

          <p
            className="opacity-0 animate-fade-in-up max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed"
            style={{ animationDelay: "0.4s" }}
          >
            Short-form edits engineered for the scroll &mdash; punchy hooks,
            clean captions, relentless pacing. Built to keep eyes on screen and
            grow your audience.
          </p>

          <div
            className="opacity-0 animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
            style={{ animationDelay: "0.55s" }}
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.03] transition-transform"
            >
              View My Work{" "}
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass font-medium hover:bg-secondary transition-colors"
            >
              Hire Me
            </a>
          </div>

          <div
            className="opacity-0 animate-fade-in pt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground/70"
            style={{ animationDelay: "0.8s" }}
          >
            <span>Trusted by creators</span>
            <span className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground/30" />
            <span>10M+ views edited</span>
            <span className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground/30" />
            <span>48h turnaround</span>
          </div>
        </div>
      </div>
    </section>
  );
}
