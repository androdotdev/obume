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
      <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] p-6 md:p-10" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="w-full h-full flex flex-col items-center justify-center gap-5">
          <video
            src={videoUrl}
            autoPlay
            loop
            className="w-full h-full object-contain rounded-xl"
          />
          <p className="text-white/70 text-base font-medium">{category}</p>
        </div>
      </div>
    </div>
  );
}
