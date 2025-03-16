// Junction table for many-to-many relationship between programmes and tracks
import { integer, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { createdAt, id } from "@/drizzle/schema/schemaHelpers";
import { programmes } from "@/drizzle/schema/programmes";
import { tracks } from "@/drizzle/schema/tracks";

export const programme_tracks = pgTable(
  "programme_tracks",
  {
    id,
    programme_id: uuid("programme_id")
      .notNull()
      .references(() => programmes.id, { onDelete: "cascade" }),
    track_id: uuid("track_id")
      .notNull()
      .references(() => tracks.id, { onDelete: "cascade" }),
    play_order: integer("play_order").notNull(), // Order in which tracks were played
    createdAt,
  },
  (table) => ({
    // Unique constraint to prevent duplicate tracks in the same programme with the same play order
    unq: unique().on(table.programme_id, table.track_id, table.play_order),
  }),
);
