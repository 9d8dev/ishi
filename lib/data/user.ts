"use server"

import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { getSession } from "@/lib/auth/server"
import { adminAction } from "@/lib/data/safe"
import { adminUserActionSchema } from "@/lib/data/validation"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

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
    try {
      await db.delete(user).where(eq(user.id, parsedInput.id))
      revalidatePath("/admin/users")
    } catch (error) {
      console.error(error)
    }
  })

export const banUser = adminAction
  .schema(adminUserActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      const headersList = await headers()
      const usableHeaders = Object.fromEntries(headersList.entries())

      await auth.api.banUser({
        headers: usableHeaders,
        body: {
          userId: parsedInput.id,
        },
      })

      revalidatePath("/admin/users")
    } catch (error) {
      console.error(error)
    }
  })

export const unbanUser = adminAction
  .schema(adminUserActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      const headersList = await headers()
      const usableHeaders = Object.fromEntries(headersList.entries())

      await auth.api.unbanUser({
        headers: usableHeaders,
        body: { userId: parsedInput.id },
      })

      revalidatePath("/admin/users")
    } catch (error) {
      console.error(error)
    }
  })

export const promoteUser = adminAction
  .schema(adminUserActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      const headersList = await headers()
      const usableHeaders = Object.fromEntries(headersList.entries())

      await auth.api.setRole({
        headers: usableHeaders,
        body: {
          userId: parsedInput.id,
          role: "admin",
        },
      })

      revalidatePath("/admin/users")
    } catch (error) {
      console.error(error)
    }
  })

export const demoteUser = adminAction
  .schema(adminUserActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      const headersList = await headers()
      const usableHeaders = Object.fromEntries(headersList.entries())

      await auth.api.setRole({
        headers: usableHeaders,
        body: { userId: parsedInput.id, role: "user" },
      })

      revalidatePath("/admin/users")
    } catch (error) {
      console.error(error)
    }
  })

export const revokeSessions = adminAction
  .schema(adminUserActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      const headersList = await headers()
      const usableHeaders = Object.fromEntries(headersList.entries())

      await auth.api.revokeUserSessions({
        headers: usableHeaders,
        body: { userId: parsedInput.id },
      })

      revalidatePath("/admin/users")
    } catch (error) {
      console.error(error)
    }
  })

export const impersonateUser = adminAction
  .schema(adminUserActionSchema)
  .action(async ({ parsedInput }) => {
    try {
      const headersList = await headers()
      const usableHeaders = Object.fromEntries(headersList.entries())

      await auth.api.impersonateUser({
        headers: usableHeaders,
        body: { userId: parsedInput.id },
      })
    } catch (error) {
      console.error(error)
    }
  })

export const stopImpersonatingUser = adminAction.action(async () => {
  try {
    const headersList = await headers()
    const usableHeaders = Object.fromEntries(headersList.entries())

    await auth.api.stopImpersonating({
      headers: usableHeaders,
    })
  } catch (error) {
    console.error(error)
  }
})
