// Junction table for many-to-many relationship between programmes and tracks
import { integer, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { createdAt, id } from "@/drizzle/schema/schemaHelpers";
import { Programmes } from "@/drizzle/schema/programmes";
import { Tracks } from "@/drizzle/schema/tracks";

export const ProgrammeTracks = pgTable(
  "programme_tracks",
  {
    id,
    programme_id: uuid("programme_id")
      .notNull()
      .references(() => Programmes.id, { onDelete: "cascade" }),
    track_id: uuid("track_id")
      .notNull()
      .references(() => Tracks.id, { onDelete: "cascade" }),
    play_order: integer("play_order").notNull(), // Order in which tracks were played
    createdAt,
  },
  (table) => ({
    // Unique constraint to prevent duplicate tracks in the same programme with the same play order
    unq: unique().on(table.programme_id, table.track_id, table.play_order),
  }),
);
