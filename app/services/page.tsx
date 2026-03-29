"use client";

import Link from "next/link";
import { FaFileContract } from "react-icons/fa6";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion } from "@/components/ui/Accordion";

const SERVICES = [
  {
    id: "01",
    icon: "✂️",
    title: "Video Editing",
    content: (
      <>
        <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
          Full-cycle editing with precision cuts, color grading, and narrative
          pacing. Delivered with cinematic intent and zero compromise on quality.
        </p>
        <p className="text-[10px] text-slate-500 tracking-[2px] uppercase mb-3">
          Deliverables
        </p>
        <div className="flex flex-wrap gap-2">
          {["Raw footage cleanup", "Color grading", "Audio sync"].map((d) => (
            <span
              key={d}
              className="text-[11px] text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full"
            >
              {d}
            </span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "02",
    icon: "🎬",
    title: "Short-Form Content",
    content: (
      <>
        <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
          Instagram Reels, YouTube Shorts, and TikTok-native edits. Hook-first
          structure, platform-optimized pacing, retention-engineered from frame one.
        </p>
        <p className="text-[10px] text-slate-500 tracking-[2px] uppercase mb-3">
          Deliverables
        </p>
        <div className="flex flex-wrap gap-2">
          {["Reels 9:16", "YouTube Shorts", "TikTok cuts", "Caption overlays"].map((d) => (
            <span
              key={d}
              className="text-[11px] text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full"
            >
              {d}
            </span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "03",
    icon: "✨",
    title: "Motion Graphics",
    content: (
      <>
        <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
          Custom animated titles, lower thirds, transitions, and kinetic typography.
          Motion that elevates brand identity and keeps eyes locked.
        </p>
        <p className="text-[10px] text-slate-500 tracking-[2px] uppercase mb-3">
          Deliverables
        </p>
        <div className="flex flex-wrap gap-2">
          {["Animated titles", "Lower thirds", "Kinetic type", "Custom transitions"].map((d) => (
            <span
              key={d}
              className="text-[11px] text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full"
            >
              {d}
            </span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "04",
    icon: "📱",
    title: "Social Media Content",
    content: (
      <>
        <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
          End-to-end social-ready packages. Consistent visual language across
          platforms, optimized specs, scroll-stopping presentation.
        </p>
        <p className="text-[10px] text-slate-500 tracking-[2px] uppercase mb-3">
          Deliverables
        </p>
        <div className="flex flex-wrap gap-2">
          {["Multi-platform sizing", "Story formats", "Brand consistency"].map((d) => (
            <span
              key={d}
              className="text-[11px] text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full"
            >
              {d}
            </span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "05",
    icon: "🎞️",
    title: "Motion & Effects",
    content: (
      <>
        <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
          Speed ramps, Glitch effects, Dynamic transitions.
        </p>
        <p className="text-[10px] text-slate-500 tracking-[2px] uppercase mb-3">
          Deliverables
        </p>
        <div className="flex flex-wrap gap-2">
          {["Speed ramps", "Overlays", "Glitch & distortion", "Sound design sync"].map((d) => (
            <span
              key={d}
              className="text-[11px] text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full"
            >
              {d}
            </span>
          ))}
        </div>
      </>
    ),
  },
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col items-center px-5 md:px-6 py-24 md:py-10">
      <div className="flex-1 w-full max-w-2xl">
        <Header title="Services" backHref="/" subtitle={`${SERVICES.length} services available`} />

        <Accordion items={SERVICES} />

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
          <Link
            href="/terms"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-[14px] border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[14px] md:text-[13px] no-underline transition-all duration-220 hover:bg-purple-500/20"
          >
            <FaFileContract className="text-[11px]" />
            <span>Terms & Conditions</span>
          </Link>
        </div>
      </div>

      <Footer className="max-w-2xl" />
    </div>
  );
}
