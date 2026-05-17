"use client";

import { Mail, Instagram, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const subject = encodeURIComponent("New project inquiry");
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("msg")}`,
    );
    window.open(`mailto:obume.hq@gmail.com?subject=${subject}&body=${body}`);
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="container mx-auto px-5 max-w-6xl">
        <div className="relative max-w-5xl mx-auto rounded-3xl border border-border/60 bg-gradient-surface overflow-hidden p-8 md:p-14">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/30 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary-glow/20 blur-[100px] pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">
                -- Let&apos;s Work
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Ready to grow your
                <br />
                short-form?
              </h2>
              <p className="text-muted-foreground">
                Tell me about your channel and goals. I reply within 24 hours.
              </p>

              <div className="space-y-3 pt-4">
                <a
                  href="mailto:obume.hq@gmail.com"
                  className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                >
                  <span className="h-9 w-9 rounded-lg bg-secondary border border-border grid place-items-center">
                    <Mail className="h-4 w-4" />
                  </span>
                  obume.hq@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.instagram.com/obume.hq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <span className="h-9 w-9 rounded-lg bg-secondary border border-border grid place-items-center">
                    <Instagram className="h-4 w-4" />
                  </span>
                  obume.hq
                </a>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary outline-none transition-colors text-sm"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary outline-none transition-colors text-sm"
                  placeholder="you@domain.com"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="msg"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Project
                </label>
                <textarea
                  id="msg"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary outline-none transition-colors text-sm resize-none"
                  placeholder="Tell me about your channel & goals..."
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.02] transition-transform"
              >
                Send message <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
