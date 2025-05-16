"use server"

import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { getSession } from "@/lib/auth/server"
import { adminAction } from "@/lib/data/safe"
import { adminUserActionSchema } from "@/lib/data/validation"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"

export const getUsers = async () => {
  const session = await getSession()
  if (!session) {
    throw new Error("Unauthenticated")
  }

  if (session.user.role !== "admin") {
    throw new Error("Unauthorized")
  }

  const users = await db.select().from(user)
  return users
}

export const deleteUser = adminAction
  .schema(adminUserActionSchema)
  .action(async ({ parsedInput }) => {
    await db.delete(user).where(eq(user.id, parsedInput.id))
    revalidatePath("/admin/users")
  })

export const banUser = adminAction
  .schema(adminUserActionSchema)
  .action(async ({ parsedInput }) => {
    await auth.api.banUser({
      body: {
        userId: parsedInput.id,
      },
    })
  })

export const unbanUser = adminAction
  .schema(adminUserActionSchema)
  .action(async ({ parsedInput }) => {
    await auth.api.unbanUser({
      body: { userId: parsedInput.id },
    })
  })

export const promoteUser = adminAction
  .schema(adminUserActionSchema)
  .action(async ({ parsedInput }) => {
    await auth.api.setRole({
      body: {
        userId: parsedInput.id,
        role: "admin",
      },
    })
  })

export const demoteUser = adminAction
  .schema(adminUserActionSchema)
  .action(async ({ parsedInput }) => {
    await auth.api.setRole({
      body: { userId: parsedInput.id, role: "user" },
    })
  })
