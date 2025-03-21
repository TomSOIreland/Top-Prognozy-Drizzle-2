// Junction table for many-to-many relationship between tracks and albums
import { integer, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { createdAt, id } from "@/drizzle/schema/schemaHelpers";
import { Albums } from "@/drizzle/schema/albums";
import { Tracks } from "@/drizzle/schema/tracks";

export const AlbumTracks = pgTable(
  "album_tracks",
  {
    id,
    album_id: uuid("album_id")
      .notNull()
      .references(() => Albums.id, { onDelete: "cascade" }),
    track_id: uuid("track_id")
      .notNull()
      .references(() => Tracks.id, { onDelete: "cascade" }),
    track_number: integer("track_number"), // Position on the album
    createdAt,
  },
  (table) => ({
    // Unique constraint to prevent duplicate tracks on the same album
    unq: unique().on(table.album_id, table.track_id),
  }),
);
