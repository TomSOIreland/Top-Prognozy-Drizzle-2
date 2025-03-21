import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "@/drizzle/schema/schemaHelpers";

export const Albums = pgTable("albums", {
  id,
  title: text("title").notNull(),
  release_date: timestamp("release_date").notNull(),
  cover_art_url: text("cover_art_url"),
  genre: text("genre"),
  progArchive_rating: integer(),
  progArchive_url: text("progArchive_url"),
  createdAt,
  updatedAt,
});
