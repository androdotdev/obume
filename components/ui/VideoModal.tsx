"use client";

import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  category: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, category }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <video
            src={videoUrl}
            autoPlay
            loop
            className="w-full h-full object-contain rounded-lg"
          />
          <p className="text-white/70 text-sm font-medium">{category}</p>
        </div>
      </div>
    </div>
  );
}
