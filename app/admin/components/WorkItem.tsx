"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Loader2 } from "lucide-react";
import { Work } from "../types";

interface WorkItemProps {
  work: Work;
  deleting: boolean;
  onDelete: () => void;
}

export function WorkItem({ work, deleting, onDelete }: WorkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: work.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const thumbnail = work.youtubeVideoId
    ? `https://img.youtube.com/vi/${work.youtubeVideoId}/maxresdefault.jpg`
    : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 transition-all select-none ${
        isDragging ? "opacity-50 bg-white/10" : ""
      }`}
    >
      <GripVertical
        {...listeners}
        size={15}
        className="text-slate-600 shrink-0 cursor-grab active:cursor-grabbing"
      />

      <div className="flex items-center gap-3 flex-1 min-w-0">
        {thumbnail && (
          <img
            src={thumbnail}
            alt=""
            className="h-10 w-[18px] rounded object-cover bg-black"
          />
        )}
        <p className="text-slate-200 font-mono text-sm truncate">
          {work.youtubeVideoId}
        </p>
      </div>

      <button
        onClick={onDelete}
        disabled={deleting}
        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/25 transition-all shrink-0 disabled:opacity-50"
        title="Delete"
      >
        {deleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
      </button>
    </div>
  );
}
