// Annual vote periods table
import { createdAt, id, updatedAt } from "@/drizzle/schema/schemaHelpers";
import { boolean, integer, pgTable, timestamp } from "drizzle-orm/pg-core";

export const VotePeriods = pgTable("vote_periods", {
  id,
  year: integer("year").notNull().unique(),
  track_voting_open: boolean("track_voting_open").default(false).notNull(),
  album_voting_open: boolean("album_voting_open").default(false).notNull(),
  track_voting_start: timestamp("track_voting_start"),
  track_voting_end: timestamp("track_voting_end"),
  album_voting_start: timestamp("album_voting_start"),
  album_voting_end: timestamp("album_voting_end"),
  createdAt,
  updatedAt,
});
