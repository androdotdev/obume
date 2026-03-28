"use server";

import { db } from "@/lib/db";
import { works } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getWorks() {
  try {
    const allWorks = await db.select().from(works).orderBy(asc(works.order));
    return allWorks;
  } catch (error) {
    console.error("Get works error:", error);
    return [];
  }
}

export async function createWork(data: {
  category: string;
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
}) {
  try {
    const [newWork] = await db.insert(works).values({
      category: data.category,
      cloudinaryUrl: data.cloudinaryUrl,
      cloudinaryPublicId: data.cloudinaryPublicId,
    }).returning();

    return { success: true, work: newWork };
  } catch (error) {
    console.error("Create work error:", error);
    return { error: "Failed to create work" };
  }
}

export async function updateWork(id: number, data: Partial<{
  category: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  order: number;
}>) {
  try {
    const [updated] = await db.update(works).set(data).where(eq(works.id, id)).returning();
    return { success: true, work: updated };
  } catch (error) {
    console.error("Update work error:", error);
    return { error: "Failed to update work" };
  }
}

export async function deleteWork(id: number) {
  try {
    await db.delete(works).where(eq(works.id, id));
    return { success: true };
  } catch (error) {
    console.error("Delete work error:", error);
    return { error: "Failed to delete work" };
  }
}
