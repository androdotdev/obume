"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiMenu, FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { Work } from "../types";

interface WorkItemProps {
  work: Work;
  isEditing: boolean;
  editingValue: string;
  onEdit: () => void;
  onDelete: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditValueChange: (value: string) => void;
  onEditKeyDown: (e: React.KeyboardEvent) => void;
}

export function WorkItem({
  work,
  isEditing,
  editingValue,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  onEditValueChange,
  onEditKeyDown,
}: WorkItemProps) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 transition-all select-none ${
        isDragging ? "opacity-50 bg-white/10" : ""
      }`}
    >
      {/* Drag handle only — listeners scoped here, not whole row */}
      <FiMenu
        {...listeners}
        className="text-slate-600 shrink-0 cursor-grab active:cursor-grabbing"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            autoFocus
            value={editingValue}
            onChange={(e) => onEditValueChange(e.target.value)}
            onKeyDown={onEditKeyDown}
            className="w-full px-3 py-1.5 rounded-lg bg-white/10 border border-purple-500/50 text-slate-200 focus:outline-none text-sm"
          />
        ) : (
          <p className="text-slate-200 font-medium text-base truncate">
            {work.category}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isEditing ? (
          <>
            <button
              onClick={onSaveEdit}
              className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all"
              title="Save"
            >
              <FiCheck size={15} />
            </button>
            <button
              onClick={onCancelEdit}
              className="p-2 rounded-lg bg-white/10 text-slate-400 hover:bg-white/20 transition-all"
              title="Cancel"
            >
              <FiX size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onEdit}
              className="p-2 rounded-lg bg-white/10 text-slate-400 hover:bg-purple-500/20 hover:text-purple-400 transition-all"
              title="Edit category"
            >
              <FiEdit2 size={15} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/25 transition-all"
              title="Delete"
            >
              <FiTrash2 size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
