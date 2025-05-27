import { getSession } from "@/lib/auth/server"
import { actionClient } from "./utils"

/**
 * Creates an authenticated action
 *
 * Passes the userId to the next function
 *
 * @returns {Promise<void>} A promise that resolves when the action is executed.
 * @throws {Error} If the user is not authenticated or the user ID is not available.
 */
export const authenticatedAction = actionClient.use(async ({ next }) => {
  const session = await getSession()
  const userId = session?.user.id

  if (!session || !userId) {
    throw new Error("Not authenticated")
  }

  return next({ ctx: { userId } })
})

/**
 * Creates an admin action
 *
 * Passes the userId and admin status to the next function
 *
 * @returns {Promise<void>} A promise that resolves when the action is executed.
 * @throws {Error} If the user is not authenticated or the user ID is not available.
 */
export const adminAction = actionClient.use(async ({ next }) => {
  const session = await getSession()
  const userId = session?.user.id

  if (!session || !userId || session.user.role !== "admin") {
    throw new Error("Not authorized")
  }

  return next({ ctx: { userId } })
})
