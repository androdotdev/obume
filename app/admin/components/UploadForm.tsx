"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { FiUploadCloud } from "react-icons/fi";
import { UploadedFile } from "../types";

interface UploadFormProps {
  uploadedFile: UploadedFile | null;
  category: string;
  uploading: boolean;
  onFileUpload: (file: UploadedFile) => void;
  onCategoryChange: (value: string) => void;
  onSubmit: () => void;
}

export function UploadForm({
  uploadedFile,
  category,
  uploading,
  onFileUpload,
  onCategoryChange,
  onSubmit,
}: UploadFormProps) {
  const handleUploadSuccess = (result: any) => {
    const { secure_url, public_id } = result.info;
    onFileUpload({ url: secure_url, publicId: public_id });
  };

  return (
    <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5">
      <h2 className="text-base md:text-lg font-semibold text-slate-200 mb-1">
        Upload New Video
      </h2>
      <p className="text-sm text-slate-500 mb-5">
        Videos are stored and streamed directly from Cloudinary.
      </p>

      <div className="space-y-5">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
            Step 1 — Upload Video
          </p>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            options={{
              folder: "obume/works",
              resourceType: "video",
              maxChunkSize: 6000000,
              sources: ["local"],
            }}
            onSuccess={handleUploadSuccess}
            onQueuesEnd={(_result, { widget }) => widget.close()}
          >
            {({ open }) => (
              <button
                onClick={() => open()}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-dashed border-white/10 bg-white/5 text-slate-400 hover:border-purple-500/50 hover:text-purple-400 transition-all text-sm w-full justify-center"
              >
                <FiUploadCloud size={16} />
                {uploadedFile
                  ? "✓ Video uploaded — click to replace"
                  : "Choose video file"}
              </button>
            )}
          </CldUploadWidget>
        </div>

        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
            Step 2 — Add Details
          </p>
          <input
            type="text"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            placeholder="e.g. Motion Graph, Gaming Short"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 text-base mb-3"
          />
          <button
            onClick={onSubmit}
            disabled={uploading || !uploadedFile}
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all disabled:opacity-40 text-base"
          >
            {uploading ? "Saving..." : "Add Work"}
          </button>
        </div>
      </div>
    </div>
  );
}
