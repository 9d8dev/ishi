import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { getSession } from "@/lib/auth/server"

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
