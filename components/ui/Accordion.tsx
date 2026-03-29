"use client";

import { useState, ReactNode } from "react";

interface AccordionItem {
  id?: string;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  accentColor?: string;
  defaultOpen?: string | number;
}

export function Accordion({
  items,
  accentColor = "#a855f7",
  defaultOpen,
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | number | null>(
    defaultOpen ?? null,
  );

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const id = item.id ?? index;
        const isOpen = openId === id;
        return (
          <div
            key={id}
            onClick={() => setOpenId(isOpen ? null : id)}
            className={`rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
              isOpen
                ? "border-purple-500/40 bg-purple-500/5"
                : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
            }`}
          >
            <div
              className={`flex items-center gap-3 sm:gap-4 px-5 py-5 md:py-4 ${isOpen ? "border-b border-white/5" : ""}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span
                className={`flex-1 text-[16px] md:text-[15px] font-semibold font-serif transition-colors duration-200 ${
                  isOpen ? "text-slate-100" : "text-slate-300"
                }`}
              >
                {item.title}
              </span>
              <span
                className={`text-[9px] tracking-[2px] transition-colors duration-200 shrink-0 ${
                  isOpen ? "text-purple-400" : "text-slate-500"
                }`}
              >
                {isOpen ? "▲" : "▼"}
              </span>
            </div>

            {isOpen && <div className="px-5 py-5">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
