import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "@/drizzle/schema/schemaHelpers";

export const programmes = pgTable("programmes", {
  id,
  title: text("title").notNull(),
  air_date: timestamp("air_date").notNull(),
  image_url: text("image_url"),
  createdAt,
  updatedAt,
});
