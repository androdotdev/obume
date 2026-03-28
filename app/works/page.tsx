"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import { getWorks } from "@/app/actions/works";
import { VideoModal } from "@/components/ui/VideoModal";

const CATEGORIES = ["All", "Motion Graph", "Speed Remapping", "Talking-Head", "Gaming Short"];

interface Work {
  id: number;
  category: string;
  cloudinaryUrl: string | null;
}

export default function Works() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<Work | null>(null);

  useEffect(() => {
    async function fetchWorks() {
      const data = await getWorks();
      setWorks(data);
      setLoading(false);
    }
    fetchWorks();
  }, []);

  const filtered = activeCategory === "All" ? works : works.filter((w) => w.category === activeCategory);

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center px-4 sm:px-6 pt-16 sm:pt-10">
        <div className="flex-1 w-full max-w-5xl">
          <div className="flex items-center justify-between mb-6 sm:mb-9">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[14px] border border-white/[0.07] bg-white/4 text-[#64748B] text-sm no-underline transition-all duration-220 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400"
            >
              <FaArrowLeft className="text-sm" />
              <span>Back</span>
            </Link>

            <div className="text-right">
              <h1 className="m-0 text-2xl sm:text-[32px] font-bold text-slate-100 tracking-tight font-serif">
                Past Works
              </h1>
              <span className="text-sm text-slate-600">
                {filtered.length} of {works.length} projects
              </span>
            </div>
          </div>

          <div className="h-px mb-6 sm:mb-7 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex flex-wrap gap-3 mb-6 sm:mb-8">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 sm:px-5 py-2.5 rounded-[14px] text-sm sm:text-base cursor-pointer transition-all duration-220"
                  style={{
                    fontWeight: active ? 500 : 400,
                    background: active
                      ? "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(168,85,247,0.08))"
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${active ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.07)"}`,
                    color: active ? "#c084fc" : "#64748B",
                    boxShadow: active ? "0 4px 24px rgba(168,85,247,0.12)" : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="text-center text-slate-500 py-12">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              No works yet. Check back soon!
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-8">
              {filtered.map((work) => (
                <div
                  key={work.id}
                  onClick={() => work.cloudinaryUrl && setSelectedVideo(work)}
                  className="relative rounded-3xl overflow-hidden border border-white/5 bg-black/20 cursor-pointer group hover:border-purple-500/30 transition-all duration-300"
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
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <FaPlay className="text-white text-2xl ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5 flex justify-center">
                        <p className="text-base font-medium text-slate-200">{work.category}</p>
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
          )}
        </div>

        <footer className="w-full max-w-5xl py-6 text-center">
          <p className="text-[11.5px] text-slate-600">
            Made with <span style={{ color: "#F472B6" }}>♥</span> · <span style={{ color: "#F472B6" }}>Obume.hq</span>
          </p>
        </footer>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.cloudinaryUrl || ""}
        category={selectedVideo?.category || ""}
      />
    </div>
  );
}
