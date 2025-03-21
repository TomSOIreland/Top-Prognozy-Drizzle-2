import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "@/drizzle/schema/schemaHelpers";
import { Users } from "@/drizzle/schema/users";

export const Comments = pgTable(
  "comments",
  {
    id,
    user_id: uuid("user_id")
      .notNull()
      .references(() => Users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    target_type: text("target_type").notNull(), // 'programme', 'album', or 'artist'
    target_id: uuid("target_id").notNull(), // ID of the programme, album, or artist
    createdAt,
    updatedAt,
  },
  (table) => ({
    // Composite index for faster lookup of comments for a specific target
    targetIdx: index("target_idx").on(table.target_type, table.target_id),
  }),
);
