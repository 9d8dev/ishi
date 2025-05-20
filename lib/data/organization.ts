import { auth } from "@/lib/auth"
import { member, organization } from "@/lib/db/schema"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth/server"
import { adminAction } from "./safe"
import { adminOrganizationActionSchema } from "./validation"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export const createOrganization = async (userId: string, email: string) => {
  try {
    const name = `${email.split("@")[0]}'s Organization`
    const slug = email.split("@")[0]

    await auth.api.createOrganization({
      body: {
        name,
        slug,
        userId,
        metadata: {
          ownedBy: userId,
        },
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export const getActiveOrganization = async (userId: string) => {
  const [org] = await db
    .select()
    .from(organization)
    .innerJoin(member, eq(member.organizationId, organization.id))
    .where(eq(member.userId, userId))
    .limit(1)

  return org.organization
}

export const getOrganizations = async () => {
  const session = await getSession()
  if (!session) {
    throw new Error("Unauthenticated")
  }

  if (session?.user.role !== "admin") {
    throw new Error("Unauthorized")
  }

  const orgs = await db.select().from(organization)
  return orgs
}

export const deleteOrganization = adminAction
  .schema(adminOrganizationActionSchema)
  .action(async ({ parsedInput }) => {
    const headersList = await headers()
    const usableHeaders = Object.fromEntries(headersList.entries())

    await auth.api.deleteOrganization({
      headers: usableHeaders,
      body: {
        organizationId: parsedInput.id,
      },
    })

    revalidatePath("/admin/organizations")
  })
