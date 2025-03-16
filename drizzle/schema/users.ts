import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "@/drizzle/schema/schemaHelpers";

export const userRoles = ["user", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);
export const users = pgTable("users", {
  id,
  clerkUserId: text("clerkUserId").notNull().unique(),
  username: text("username").notNull().unique(),
  display_name: text("display_name"),
  role: userRoleEnum().notNull().default("user"),
  email: text("email").notNull().unique(),
  avatar_url: text("avatar_url"),
  createdAt,
  updatedAt,
  deletedAt: timestamp("deleted_at"),
});
