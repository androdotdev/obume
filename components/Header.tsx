"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface HeaderProps {
  title: string;
  backHref: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

export function Header({ title, backHref, subtitle, rightElement }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 sm:mb-9">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-[14px] border border-white/[0.07] bg-white/4 text-[#64748B] text-[13px] no-underline transition-all duration-220 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400"
      >
        <FaArrowLeft className="text-[11px]" />
        <span>Back</span>
      </Link>

      <div className="text-right">
        <h1 className="m-0 text-xl sm:text-[28px] font-bold text-slate-100 tracking-tight font-serif">
          {title}
        </h1>
        {subtitle && (
          <span className="text-[12px] text-slate-600">{subtitle}</span>
        )}
      </div>

      {rightElement && <div>{rightElement}</div>}
    </div>
  );
}
