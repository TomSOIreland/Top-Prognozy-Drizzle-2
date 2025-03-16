import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "@/drizzle/schema/schemaHelpers";

export const artists = pgTable("artists", {
  id,
  name: text("name").notNull(),
  bio: text("bio"),
  image_url: text("image_url"),
  createdAt,
  updatedAt,
});
