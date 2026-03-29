"use client";

import { useState, useEffect } from "react";
import {
  createWork,
  deleteWork,
  getWorks,
  updateWork,
} from "@/app/actions/works";
import { QuickLinks, UploadForm, WorksList } from "./components";
import { Work, UploadedFile } from "./types";

export default function AdminDashboard() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    const data = await getWorks();
    setWorks(data);
    setLoading(false);
  };

  const handleCreateWork = async () => {
    if (!category.trim()) return alert("Please enter a category.");
    if (!uploadedFile) return alert("Please upload a video first.");

    setUploading(true);
    try {
      const res = await createWork({
        category,
        cloudinaryUrl: uploadedFile.url,
        cloudinaryPublicId: uploadedFile.publicId,
      });
      if (res.success) {
        await fetchWorks();
        setCategory("");
        setUploadedFile(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save work. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this work?")) return;
    await deleteWork(id);
    fetchWorks();
  };

  const handleStartEdit = (work: Work) => {
    setEditingId(work.id);
    setEditingValue(work.category);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const handleSaveEdit = async (id: number, categoryValue: string) => {
    if (!categoryValue.trim()) return;
    const res = await updateWork(id, { category: categoryValue.trim() });
    if (res.success) {
      setWorks((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, category: categoryValue.trim() } : w,
        ),
      );
    }
    setEditingId(null);
    setEditingValue("");
  };

  if (loading)
    return <div className="text-slate-400 py-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <UploadForm
        uploadedFile={uploadedFile}
        category={category}
        uploading={uploading}
        onFileUpload={setUploadedFile}
        onCategoryChange={setCategory}
        onSubmit={handleCreateWork}
      />

      <WorksList
        works={works}
        editingId={editingId}
        editingValue={editingValue}
        onReorder={setWorks}
        onDelete={handleDelete}
        onStartEdit={handleStartEdit}
        onCancelEdit={handleCancelEdit}
        onEditValueChange={setEditingValue}
        onSaveEdit={handleSaveEdit}
      />

      <QuickLinks />
    </div>
  );
}
