import { createdAt, id } from "@/drizzle/schema/schemaHelpers";
import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { Albums } from "@/drizzle/schema/albums";
import { Artists } from "@/drizzle/schema/artists";

export const AlbumArtists = pgTable(
  "album_artists",
  {
    id,
    album_id: uuid("album_id")
      .notNull()
      .references(() => Albums.id, { onDelete: "cascade" }),
    artist_id: uuid("artist_id")
      .notNull()
      .references(() => Artists.id, { onDelete: "cascade" }),
    createdAt,
  },
  (table) => ({
    // Unique constraint to prevent duplicate entries
    unq: unique().on(table.album_id, table.artist_id),
  }),
);
