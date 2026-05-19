"use client";

import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { getWorks } from "@/app/actions/works";

interface Work {
  id: number;
  youtubeVideoId: string;
}

export function Portfolio() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    getWorks().then((data) => {
      setWorks(data);
      setLoading(false);
    });
  }, []);

  const openWork = works[openIndex ?? -1];

  return (
    <section id="work" className="py-28 relative">
      <div className="container mx-auto px-5 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">
              -- Selected Work
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight max-w-xl">
              Short-Form Edits.
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
            {works.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setOpenIndex(i)}
                className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500"
              >
                {!loadedImages.has(item.id) && (
                  <div className="absolute inset-0 animate-pulse bg-card z-10" />
                )}
                <img
                  src={`https://img.youtube.com/vi/${item.youtubeVideoId}/maxresdefault.jpg`}
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  onLoad={() => setLoadedImages(prev => new Set(prev).add(item.id))}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = "1";
                      img.src = `https://img.youtube.com/vi/${item.youtubeVideoId}/hqdefault.jpg`;
                    } else {
                      setLoadedImages(prev => new Set(prev).add(item.id));
                    }
                  }}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
                    loadedImages.has(item.id) ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-primary grid place-items-center shadow-glow scale-75 group-hover:scale-100 transition-transform">
                    <Play className="h-6 w-6 text-primary-foreground fill-primary-foreground ml-0.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {openIndex !== null && openWork && (
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

            <div className="aspect-[9/16] relative bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${openWork.youtubeVideoId}?autoplay=1&loop=1&playlist=${openWork.youtubeVideoId}&controls=0&rel=0&playsinline=1`}
                allow="autoplay; fullscreen"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
