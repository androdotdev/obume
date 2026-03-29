"use client";

import { useMemo } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { debounce } from "lodash-es";
import { FiMenu } from "react-icons/fi";
import { Work } from "../types";
import { WorkItem } from "./WorkItem";
import { updateWork } from "@/app/actions/works";

interface WorksListProps {
  works: Work[];
  editingId: number | null;
  editingValue: string;
  onReorder: (works: Work[]) => void;
  onDelete: (id: number) => void;
  onStartEdit: (work: Work) => void;
  onCancelEdit: () => void;
  onEditValueChange: (value: string) => void;
  onSaveEdit: (id: number, category: string) => void;
}

export function WorksList({
  works,
  editingId,
  editingValue,
  onReorder,
  onDelete,
  onStartEdit,
  onCancelEdit,
  onEditValueChange,
  onSaveEdit,
}: WorksListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const persistOrder = useMemo(
    () =>
      debounce((reordered: Work[]) => {
        reordered.forEach((work, index) => {
          updateWork(work.id, { order: index });
        });
      }, 1000),
    [],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = works.findIndex((w) => w.id === active.id);
    const newIndex = works.findIndex((w) => w.id === over.id);

    const reordered = arrayMove(works, oldIndex, newIndex);
    onReorder(reordered);

    persistOrder(reordered);
  };

  return (
    <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-lg font-semibold text-slate-200">
          Your Works ({works.length})
        </h2>
        {works.length > 1 && (
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <FiMenu className="inline" /> Drag to reorder
          </span>
        )}
      </div>

      {works.length === 0 ? (
        <div className="text-center text-slate-500 py-8">
          No works yet. Upload your first video above.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={works.map((w) => w.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {works.map((work) => (
                <WorkItem
                  key={work.id}
                  work={work}
                  isEditing={editingId === work.id}
                  editingValue={editingValue}
                  onEdit={() => onStartEdit(work)}
                  onDelete={() => onDelete(work.id)}
                  onSaveEdit={() => onSaveEdit(work.id, editingValue)}
                  onCancelEdit={onCancelEdit}
                  onEditValueChange={onEditValueChange}
                  onEditKeyDown={(e) => {
                    if (e.key === "Enter") onSaveEdit(work.id, editingValue);
                    if (e.key === "Escape") onCancelEdit();
                  }}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
