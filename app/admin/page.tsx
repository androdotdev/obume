"use client";

import { useState, useEffect, useRef } from "react";
import { getWorks, createWork, deleteWork } from "@/app/actions/works";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { QuickLinks } from "./components";

interface Work {
  id: number;
  category: string;
  cloudinaryUrl: string | null;
}

export default function AdminDashboard() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    const data = await getWorks();
    setWorks(data);
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const file = (e.currentTarget.elements.namedItem("file") as HTMLInputElement)?.files?.[0];

    if (!file) {
      setUploading(false);
      return;
    }

    try {
      // File goes browser → Cloudinary directly (no Next.js server involved)
      const { url, publicId } = await uploadToCloudinary(file);

      // Only the URL string goes through the server action to DB
      const result = await createWork({
        category,
        cloudinaryUrl: url,
        cloudinaryPublicId: publicId,
      });

      if (result.success) {
        fetchWorks();
        setCategory("");
        formRef.current?.reset(); // stable ref, safe across awaits
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this work?")) return;
    await deleteWork(id);
    fetchWorks();
  };

  if (loading)
    return <div className="text-slate-400 py-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5">
        <h2 className="text-base md:text-lg font-semibold text-slate-200 mb-4">
          Upload New Video
        </h2>
        <p className="text-sm text-slate-500 mb-5">
          Upload videos to Cloudinary. Videos will be stored and streamed from
          Cloudinary.
        </p>

        <form ref={formRef} onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Video File
            </label>
            <input
              type="file"
              name="file"
              accept="video/*"
              required
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:bg-purple-500/20 file:text-purple-400 file:cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Motion Graph, Gaming Short"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 text-base"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all disabled:opacity-50 text-base"
          >
            {uploading ? "Uploading..." : "Add Work"}
          </button>
        </form>
      </div>

      {/* Works List */}
      <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5">
        <h2 className="text-base md:text-lg font-semibold text-slate-200 mb-4">
          Your Works ({works.length})
        </h2>

        {works.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            No works yet. Upload your first video above.
          </div>
        ) : (
          <div className="space-y-3">
            {works.map((work) => (
              <div
                key={work.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="flex-1 w-full">
                  <p className="text-slate-200 font-medium text-base">
                    {work.category}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(work.id)}
                  className="px-5 py-2.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-sm whitespace-nowrap"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <QuickLinks />
    </div>
  );
}