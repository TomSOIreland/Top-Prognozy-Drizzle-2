import {
  pgTable,
  uuid,
  integer,
  pgEnum,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { Users } from "@/drizzle/schema/users";
import { Programmes } from "@/drizzle/schema/programmes";
import { createdAt, updatedAt } from "@/drizzle/schema/schemaHelpers";

// Enum for vote types
export const voteTypeEnum = pgEnum("vote_type", [
  "programme_track",
  "annual_track",
  "annual_album",
]);

// Votes table with proper unique constraints
export const votes = pgTable(
  "votes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => Users.id, { onDelete: "cascade" }),
    vote_type: voteTypeEnum("vote_type").notNull(),
    target_id: uuid("target_id").notNull(), // ID of track or album
    programme_id: uuid("programme_id").references(() => Programmes.id, {
      onDelete: "cascade",
    }), // Only for programme_track votes
    year: integer("year"), // Year of vote for annual votes
    rank: integer("rank").notNull(), // Position in user's ranking (1 = most favorite)
    points: integer("points").notNull(), // Calculated points based on rank
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      // For programme track votes - include vote_type to ensure we're only checking uniqueness within programme_track votes
      programmeVoteIdx: unique("programme_vote_idx").on(
        table.user_id,
        table.vote_type,
        table.programme_id,
        table.target_id,
      ),

      // For annual track votes - include vote_type to ensure we're only checking uniqueness within annual_track votes
      annualTrackVoteIdx: unique("annual_track_vote_idx").on(
        table.user_id,
        table.vote_type,
        table.year,
        table.target_id,
      ),

      // For annual album votes - include vote_type to ensure we're only checking uniqueness within annual_album votes
      annualAlbumVoteIdx: unique("annual_album_vote_idx").on(
        table.user_id,
        table.vote_type,
        table.year,
        table.target_id,
      ),

      // Add a compound index for efficient filtering by vote_type
      voteTypeIdx: index("vote_type_idx").on(table.vote_type),
    };
  },
);
