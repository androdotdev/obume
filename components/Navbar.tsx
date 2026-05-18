"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="container mx-auto px-5 max-w-6xl">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
            scrolled ? "glass shadow-card" : "bg-transparent",
          )}
        >
          <a href="#" className="flex items-center gap-2 group">
            {/* <span className="h-7 w-7 rounded-md bg-gradient-primary grid place-items-center font-display font-bold text-primary-foreground shadow-glow group-hover:scale-105 transition-transform">
              O
            </span> */}
            <span className="relative inline-flex items-center justify-center">
              {/* Glow layers */}
              <span className="absolute inset-0 rounded-full bg-violet-800 blur-sm scale-50" />
              <span className="absolute inset-0 rounded-full bg-violet-800 blur-sm scale-50" />

              <Image
                src="/logo.png"
                alt="obume"
                width={60} 
                loading="eager"
                height={60}
                className="relative drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] w-auto h-auto group-hover:scale-105 transition-transform"
              />
            </span>
            <span className="font-display font-semibold tracking-tight text-lg">
              obume
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.03]"
          >
            Hire Me<span aria-hidden>&rarr;</span>
          </a>

          <button
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-md hover:bg-secondary"
            onClick={() => setOpen((o) => !o)}
          >
            <div className="space-y-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-foreground transition-all",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-foreground transition-all",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-foreground transition-all",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </div>
          </button>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 animate-fade-in">
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-foreground text-background"
                >
                  Hire Me &rarr;
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
