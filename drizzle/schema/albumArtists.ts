import { createdAt, id } from "@/drizzle/schema/schemaHelpers";
import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { albums } from "@/drizzle/schema/albums";
import { artists } from "@/drizzle/schema/artists";

export const album_artists = pgTable(
  "album_artists",
  {
    id,
    album_id: uuid("album_id")
      .notNull()
      .references(() => albums.id, { onDelete: "cascade" }),
    artist_id: uuid("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
    createdAt,
  },
  (table) => ({
    // Unique constraint to prevent duplicate entries
    unq: unique().on(table.album_id, table.artist_id),
  }),
);
