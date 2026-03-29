"use client";

import { useState, useEffect } from "react";
import { getWorks } from "@/app/actions/works";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WorksGrid, WorksFilter } from "./components";

interface Work {
  id: number;
  category: string;
  cloudinaryUrl: string | null;
}

export default function Works() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchWorks() {
      const data = await getWorks();
      setWorks(data);
      setLoading(false);
    }
    fetchWorks();
  }, []);

  const filtered = activeCategory === "All" ? works : works.filter((w) => w.category === activeCategory);
  const categories = [...new Set(works.map((w) => w.category))];

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center px-4 sm:px-6 pt-16 sm:pt-10">
        <div className="flex-1 w-full max-w-5xl">
          <Header
            title="Works"
            backHref="/"
            subtitle={`${filtered.length} of ${works.length} projects`}
          />

          <div className="h-px mb-6 sm:mb-7 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {loading ? (
            <div className="text-center text-slate-500 py-12">Loading...</div>
          ) : (
            <>
              <WorksFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                counts={{ total: works.length, filtered: filtered.length }}
              />
              <WorksGrid works={filtered} />
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
