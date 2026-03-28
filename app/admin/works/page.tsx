"use client";

import { useState, useEffect } from "react";
import { getWorks, createWork, deleteWork } from "@/app/actions/works";
import { uploadToCloudinary } from "@/app/actions/upload";

const CATEGORIES = ["Motion Graph", "Speed Remapping", "Talking-Head", "Gaming Short"];

interface Work {
  id: number;
  category: string;
  cloudinaryUrl: string | null;
}

export default function AdminWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("Motion Graph");

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

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    if (!file) {
      setUploading(false);
      return;
    }

    try {
      const uploadResult = await uploadToCloudinary(formData);

      if ("error" in uploadResult) {
        alert(uploadResult.error);
        setUploading(false);
        return;
      }

      const result = await createWork({
        category,
        cloudinaryUrl: uploadResult.url,
        cloudinaryPublicId: uploadResult.publicId,
      });

      if (result.success) {
        fetchWorks();
        setCategory("Motion Graph");
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this work?")) return;
    await deleteWork(id);
    fetchWorks();
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-slate-100 font-serif mb-8 md:mb-10">Manage Works</h1>
      <p className="text-base text-slate-500 mb-8">Upload videos to Cloudinary. Videos will be stored and streamed from Cloudinary.</p>

      <form onSubmit={handleUpload} className="mb-10 p-5 md:p-7 rounded-3xl bg-white/5 border border-white/5">
        <h2 className="text-lg md:text-xl font-semibold text-slate-200 mb-5">Upload New Video</h2>

        <div className="grid gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Video File</label>
            <input
              type="file"
              name="file"
              accept="video/*"
              required
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-400 file:cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:border-purple-500/50"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="px-6 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Add Work"}
          </button>
        </div>
      </form>

        <div className="space-y-5">
          {works.length === 0 ? (
            <div className="text-center text-slate-500 py-10">No works yet. Upload your first video above.</div>
          ) : (
            works.map((work) => (
              <div key={work.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex-1 w-full">
                  <p className="text-slate-200 font-medium text-base">{work.category}</p>
                </div>
                <button
                  onClick={() => handleDelete(work.id)}
                  className="px-5 py-2.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-sm whitespace-nowrap"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
    </div>
  );
}
