import { UserRole } from "@/drizzle/schema"
import { clerkClient } from "@clerk/nextjs/server"

const client = await clerkClient()

export function syncClerkUserMetadata(user: {
    id: string
    role: UserRole
    clerkUserId: string

}) {
    return client.users.updateUserMetadata(user.clerkUserId, {
        publicMetadata: {
            dbId: user.id,
            role: user.role,
        },
    })
    }
