import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works Page" },
  { href: "/services", label: "Services Page" },
];

export function QuickLinks() {
  return (
    <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5">
      <h2 className="text-base md:text-lg font-semibold text-slate-200 mb-4">Quick Links</h2>
      <div className="flex flex-wrap gap-3 md:gap-4">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-2 p-6 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-purple-400 hover:border-purple-500/30 transition-all text-sm"
          >
            <span>{link.label}</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </Link>
        ))}
      </div>
    </div>
  );
}
