"use client";

interface WorksFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  counts: { total: number; filtered: number };
}

export function WorksFilter({ categories, activeCategory, onCategoryChange, counts }: WorksFilterProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6 sm:mb-7">
        {["All", ...categories].map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className="px-3 sm:px-4 py-2 rounded-[14px] text-[12px] sm:text-[13px] cursor-pointer transition-all duration-220"
              style={{
                fontWeight: active ? 500 : 400,
                background: active
                  ? "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(168,85,247,0.08))"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${active ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.07)"}`,
                color: active ? "#c084fc" : "#64748B",
                boxShadow: active ? "0 4px 24px rgba(168,85,247,0.12)" : "none",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <p className="text-[12px] text-slate-600 mb-6 sm:mb-7">
        {counts.filtered} of {counts.total} projects
      </p>
    </>
  );
}
