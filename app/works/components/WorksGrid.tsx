"use client";

import { FaPlay } from "react-icons/fa";
import { VideoModal } from "@/components/ui/VideoModal";
import { useState } from "react";
import { Badge } from "./Badge";

interface Work {
  id: number;
  category: string;
  cloudinaryUrl: string | null;
}

interface WorksGridProps {
  works: Work[];
}

export function WorksGrid({ works }: WorksGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Work | null>(null);

  if (works.length === 0) {
    return (
      <div className="text-center text-slate-500 py-12">
        No works yet. Check back soon!
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-8">
        {works.map((work) => (
          <div
            key={work.id}
            onClick={() => work.cloudinaryUrl && setSelectedVideo(work)}
            className="relative rounded-2xl overflow-hidden border border-white/5 bg-black/20 cursor-pointer group hover:border-purple-500/30 transition-all duration-300"
          >
            {work.cloudinaryUrl ? (
              <>
                <div className="relative aspect-video bg-black/50">
                  <video
                    src={work.cloudinaryUrl}
                    muted
                    loop
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <Badge>{work.category}</Badge>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <FaPlay className="text-white text-xl ml-1" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full aspect-video bg-white/5 flex items-center justify-center text-slate-600">
                No video
              </div>
            )}
          </div>
        ))}
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.cloudinaryUrl || ""}
        category={selectedVideo?.category || ""}
      />
    </>
  );
}
