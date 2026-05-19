"use client";

import { useState } from "react";

interface UploadFormProps {
  onSubmit: (youtubeVideoId: string) => void;
}

export function UploadForm({ onSubmit }: UploadFormProps) {
  const [videoId, setVideoId] = useState("");

  const handleSubmit = () => {
    onSubmit(videoId);
    setVideoId("");
  };

  const thumbnailUrl = videoId.trim()
    ? `https://img.youtube.com/vi/${videoId.trim()}/hqdefault.jpg`
    : null;

  return (
    <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5">
      <h2 className="text-base md:text-lg font-semibold text-slate-200 mb-1">
        Add YouTube Video
      </h2>
      <p className="text-sm text-slate-500 mb-5">
        Paste a YouTube video ID to add it to your portfolio.
      </p>

      <div className="space-y-5">
        <input
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="e.g. dQw4w9WgXcQ"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 text-base"
        />

        {thumbnailUrl && (
          <div className="rounded-xl overflow-hidden border border-white/10">
            <img
              src={thumbnailUrl}
              alt="Video thumbnail preview"
              className="w-full aspect-video object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                if (img.src.includes("maxresdefault")) {
                  img.src = `https://img.youtube.com/vi/${videoId.trim()}/hqdefault.jpg`;
                } else {
                  img.style.display = "none";
                }
              }}
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!videoId.trim()}
          className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all disabled:opacity-40 text-base"
        >
          Add Work
        </button>
      </div>
    </div>
  );
}
