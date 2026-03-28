import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const works = pgTable("works", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 100 }).notNull(),
  cloudinaryUrl: varchar("cloudinary_url", { length: 500 }),
  cloudinaryPublicId: varchar("cloudinary_public_id", { length: 255 }),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});
