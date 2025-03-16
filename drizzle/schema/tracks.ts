import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "@/drizzle/schema/schemaHelpers";

export const tracks = pgTable("tracks", {
  id,
  title: text("title").notNull(),
  duration: integer("duration"),
  createdAt,
  updatedAt,
});
