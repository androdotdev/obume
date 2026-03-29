"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LinkData {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}

interface LinkButtonProps {
  link: LinkData;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  delay: number;
  mounted: boolean;
  prefetch?: boolean;
  prefetchFn?: () => void;
}

export default function LinkButton({ 
  link, 
  hovered, 
  onEnter, 
  onLeave, 
  delay, 
  mounted,
  prefetch = false,
  prefetchFn 
}: LinkButtonProps) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const hasPrefetched = useRef(false);
  const Icon = link.icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

  useEffect(() => {
    if (mounted) {
      const t = setTimeout(() => setVisible(true), 100 + delay);
      return () => clearTimeout(t);
    }
  }, [mounted, delay]);

  useEffect(() => {
    if (hovered && prefetch && !hasPrefetched.current) {
      hasPrefetched.current = true;
      router.prefetch(link.href);
      if (prefetchFn) {
        prefetchFn();
      }
    }
    if (!hovered) {
      hasPrefetched.current = false;
    }
  }, [hovered, prefetch, link.href, router, prefetchFn]);

  return (
    <Link
      href={link.href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 18px",
        borderRadius: 16,
        background: hovered ? `${link.accent}12` : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? `${link.accent}40` : "rgba(255,255,255,0.07)"}`,
        textDecoration: "none",
        transform: visible ? (hovered ? "translateY(-2px)" : "translateY(0)") : "translateY(20px)",
        opacity: visible ? 1 : 0,
        transition: "all 0.22s ease",
        boxShadow: hovered ? `0 8px 32px ${link.accent}15` : "none",
      }}
    >
      <span style={{ color: hovered ? link.accent : "#64748B" }}>
        <Icon className="text-lg" />
      </span>
      <span
        style={{
          flex: 1,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: hovered ? "#f1f5f9" : "#94a3b8",
          transition: "color 0.22s ease",
        }}
      >
        {link.label}
      </span>
      <span
        style={{
          fontSize: 11,
          color: hovered ? link.accent : "#475569",
          transition: "color 0.22s ease",
        }}
      >
        →
      </span>
    </Link>
  );
}
