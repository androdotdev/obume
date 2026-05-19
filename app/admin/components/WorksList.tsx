"use client";

import { useMemo } from "react";
import {
  DndContext,
  closestCenter,
  TouchSensor,
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
import { GripVertical } from "lucide-react";
import { Work } from "../types";
import { WorkItem } from "./WorkItem";
import { updateWork } from "@/app/actions/works";

interface WorksListProps {
  works: Work[];
  deleting: number | null;
  onReorder: (works: Work[]) => void;
  onDelete: (id: number) => void;
}

export function WorksList({
  works,
  deleting,
  onReorder,
  onDelete,
}: WorksListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
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
            <GripVertical size={15} className="inline" /> Drag to reorder
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
                <WorkItem key={work.id} work={work} deleting={deleting === work.id} onDelete={() => onDelete(work.id)} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
