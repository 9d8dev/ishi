"use server"

import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { getSession } from "@/lib/auth/server"
import { adminAction } from "@/lib/data/safe"
import { deleteUserSchema } from "@/lib/data/validation"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

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
  .schema(deleteUserSchema)
  .action(async ({ parsedInput }) => {
    await db.delete(user).where(eq(user.id, parsedInput.id))
    revalidatePath("/admin/users")
  })
