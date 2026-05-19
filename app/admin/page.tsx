"use client";

import { useState, useEffect } from "react";
import {
  createWork,
  deleteWork,
  getWorks,
} from "@/app/actions/works";
import { QuickLinks, UploadForm, WorksList } from "./components";
import { Work } from "./types";

export default function AdminDashboard() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    const data = await getWorks();
    setWorks(data);
    setLoading(false);
  };

  const handleCreateWork = async (youtubeVideoId: string) => {
    if (!youtubeVideoId.trim()) return alert("Please enter a YouTube video ID.");

    const res = await createWork({ youtubeVideoId: youtubeVideoId.trim() });
    if (res.success) {
      await fetchWorks();
    } else {
      alert("Failed to save work. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this work?")) return;
    setDeleting(id);
    await deleteWork(id);
    await fetchWorks();
    setDeleting(null);
  };

  if (loading)
    return <div className="text-slate-400 py-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <UploadForm onSubmit={handleCreateWork} />

      <WorksList
        works={works}
        deleting={deleting}
        onReorder={setWorks}
        onDelete={handleDelete}
      />

      <QuickLinks />
    </div>
  );
}
