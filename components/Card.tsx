"use client";

import { useEffect, useRef, useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import { FaGlobe, FaEnvelope } from "react-icons/fa";
import { FaXTwitter, FaDiscord, FaInstagram, FaScrewdriverWrench } from "react-icons/fa6";
import LinkButton from "./LinkButton";

const PROFILE = {
  name: "Obume",
  title: "Video Editor",
  bio: "Turning raw footage into something people actually want to watch.",
  avatar: "/obume.png",
};

const LINKS = [
  { label: "Works", href: "/works", icon: FaGlobe, accent: "#6EE7B7", prefetch: true },
  { label: "Services Offered", href: "/services", icon: FaScrewdriverWrench, accent: "#F87171" },
  { label: "Send me an Email", href: "mailto:obume.hq@gmail.com", icon: FaEnvelope, accent: "#93C5FD" },
];

const SOCIALS = [
  { icon: FaXTwitter, href: "https://x.com/ObumeHq", label: "Twitter" },
  { icon: FaDiscord, href: "https://discord.com/users/1484088863482839050", label: "Discord" },
  { icon: FaInstagram, href: "https://www.instagram.com/obume.hq", label: "Instagram" },
];

export default function Card() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 8, y: dx * 8 });
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: mounted
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(0) scale(1)`
          : "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(40px) scale(0.96)",
        opacity: mounted ? 1 : 0,
        transition: mounted
          ? "transform 0.2s ease-out, opacity 0.75s ease"
          : "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 1s ease",
        position: "relative",
        width: "100%",
        maxWidth: 420,
        borderRadius: 28,
        background: "rgba(12, 12, 20, 0.82)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset",
        overflow: "hidden",
        padding: 0,
        willChange: "transform",
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          borderRadius: 28,
          pointerEvents: "none",
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(110,231,183,0.10) 0%, transparent 65%)`,
          transition: "background 0.1s ease",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, padding: "40px 36px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="relative w-32 h-32 mb-4.5">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <img src={PROFILE.avatar} alt={PROFILE.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-1 right-1 w-5.5 h-5.5 rounded-full bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center border-2 border-[#0c0c14] text-[11px] text-white">
              ✓
            </div>
          </div>

          <h1 className="m-0 font-serif text-2xl font-bold text-slate-100 tracking-tight text-center">
            {PROFILE.name}
          </h1>

          <div className="flex items-center gap-1.5 mt-1.5">
            <HiSparkles className="text-emerald-300 text-[13px]" />
            <span className="font-sans text-[13px] text-slate-400 tracking-wide">
              {PROFILE.title}
            </span>
          </div>

          <p className="font-sans text-[13.5px] text-slate-500 text-center leading-relaxed mt-3.5 mb-0 max-w-77.5">
            {PROFILE.bio}
          </p>
        </div>

        <div
          style={{
            height: 1,
            margin: "28px 0",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LINKS.map((link, i) => (
            <LinkButton
              key={i}
              link={link}
              hovered={hovered === i}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
              delay={i * 70}
              mounted={mounted}
              prefetch={"prefetch" in link ? link.prefetch : false}
            />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 28 }}>
          {SOCIALS.map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94A3B8",
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                }}
              >
                <Icon />
              </a>
            );
          })}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 24,
            marginBottom: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11.5,
            color: "rgba(100,116,139,0.6)",
            letterSpacing: "0.4px",
          }}
        >
          Made with <span style={{ color: "#F472B6" }}>♥</span> ·{" "}
          <span style={{ color: "#F472B6" }}>Obume.hq</span>
        </p>
      </div>
    </div>
  );
}
