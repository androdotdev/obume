"use client";

import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { getWorks } from "@/app/actions/works";

interface Work {
  id: number;
  category: string;
  cloudinaryUrl: string | null;
  cloudinaryPublicId: string | null;
}

function getThumbnail(url: string | null): string {
  if (!url) return "";
  return url
    .replace("/video/upload/", "/video/upload/w_400,q_auto,f_auto/")
    .replace(/\.[^/.]+$/, ".jpg");
}

function getEmbedUrl(url: string | null): string {
  if (!url) return "";
  return url.replace(
    "/video/upload/",
    "/video/upload/w_600,q_auto/",
  );
}

export function Portfolio() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    getWorks().then((data) => {
      setWorks(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="work" className="py-28 relative">
      <div className="container mx-auto px-5 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">
              -- Selected Work
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight max-w-xl">
              Edits that earn the scroll.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            A glimpse at recent projects across podcasts, gaming, and creator
            content.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[9/16] rounded-2xl bg-card border border-border/50 animate-pulse"
              />
            ))}
          </div>
        ) : works.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No works uploaded yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back soon for fresh edits.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {works.map((item, i) => {
              const thumb = getThumbnail(item.cloudinaryUrl);
              return (
                <button
                  key={item.id}
                  onClick={() => setOpenIndex(i)}
                  className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500"
                >
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={item.category}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary grid place-items-center">
                      <Play className="h-10 w-10 text-primary/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-primary grid place-items-center shadow-glow scale-75 group-hover:scale-100 transition-transform">
                      <Play className="h-6 w-6 text-primary-foreground fill-primary-foreground ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-left">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-medium">
                      {item.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative max-w-md w-full bg-card border border-border rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenIndex(null)}
              className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-black/50 grid place-items-center hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {works[openIndex]?.cloudinaryUrl ? (
              <div className="aspect-[9/16] relative">
                <video
                  src={getEmbedUrl(works[openIndex].cloudinaryUrl)}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 h-full w-full object-contain bg-black"
                />
              </div>
            ) : (
              <div className="aspect-[9/16] relative bg-card grid place-items-center">
                <div className="text-center space-y-3 px-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-primary grid place-items-center mx-auto shadow-glow">
                    <Play className="h-7 w-7 text-primary-foreground fill-primary-foreground ml-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Full preview available on request
                  </p>
                  <a
                    href="#contact"
                    onClick={() => setOpenIndex(null)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium"
                  >
                    Request portfolio &rarr;
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
