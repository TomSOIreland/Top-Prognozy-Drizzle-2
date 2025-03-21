import { Users } from "@/drizzle/schema/users";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

export async function insertUsers(data: typeof Users.$inferInsert) {
  const newUser = await db
    .insert(Users)
    .values(data)
    .returning()
    .onConflictDoUpdate({
      target: Users.clerkUserId,
      set: data,
    });

  if (!newUser) throw new Error("Failed to insert user");

  return newUser;
}

export async function updateUsers(
  { clerkUserId }: { clerkUserId: string },
  data: Partial<typeof Users.$inferInsert>,
) {
  const updatedUser = await db
    .update(Users)
    .set(data)
    .where(eq(Users.clerkUserId, clerkUserId))
    .returning();

  if (!updatedUser) throw new Error("Failed to update user");

  return updatedUser;
}

export async function deleteUser({ clerkUserId }: { clerkUserId: string }) {
  const deletedUser = await db
    .update(Users)
    .set({
      deletedAt: new Date(),
      email: "redacted@userDeleted.com",
      display_name: "Deleted User",
      clerkUserId: "Deleted User",
      avatar_url: null,
    })
    .where(eq(Users.clerkUserId, clerkUserId))
    .returning();

  if (!deletedUser) throw new Error("Failed to update user");

  return deletedUser;
}
