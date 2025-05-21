"use server"

import { auth } from "@/lib/auth"
import { member, organization, user } from "@/lib/db/schema"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth/server"
import { adminAction, authenticatedAction } from "./safe"
import {
  adminOrganizationActionSchema,
  authenticatedOrganizationActionSchema,
  inviteUserSchema,
  acceptInvitationSchema,
} from "./validation"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { resend } from "@/lib/resend"
import { EmailInviteTemplate } from "@/components/email/invite"
import { redirect } from "next/navigation"

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

export const getOrganization = async (organizationId?: string | null) => {
  if (!organizationId) {
    return null
  }

  const headersList = await headers()
  const usableHeaders = Object.fromEntries(headersList.entries())

  const org = await auth.api.getFullOrganization({
    headers: usableHeaders,
    query: {
      organizationId,
    },
  })

  return org
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

export const setActiveOrganization = authenticatedAction
  .schema(authenticatedOrganizationActionSchema)
  .action(async ({ parsedInput }) => {
    const headersList = await headers()
    const usableHeaders = Object.fromEntries(headersList.entries())

    await auth.api.setActiveOrganization({
      headers: usableHeaders,
      body: {
        organizationId: parsedInput.id,
      },
    })

    revalidatePath("/workspace")
  })

export const getOrganizationUsers = async (organizationId: string) => {
  const session = await getSession()
  if (!session) {
    throw new Error("Unauthenticated")
  }

  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
      banned: user.banned,
      banReason: user.banReason,
      banExpires: user.banExpires,
    })
    .from(user)
    .innerJoin(member, eq(member.userId, user.id))
    .where(eq(member.organizationId, organizationId))
  return users
}

export const testPermission = async () => {
  const headersList = await headers()
  const usableHeaders = Object.fromEntries(headersList.entries())

  const hasPermission = await auth.api.hasPermission({
    headers: usableHeaders,
    body: {
      permissions: {
        organization: ["update"],
      },
    },
  })

  return hasPermission
}

export const sendInvitationEmail = async ({
  email,
  invitedBy,
  teamName,
  inviteLink,
}: {
  email: string
  invitedBy: string
  teamName: string
  inviteLink: string
}) => {
  const { data, error } = await resend.emails.send({
    from: "9d8 <info@9d8.site>",
    to: [email],
    subject: "You've been invited to join a team on ishi.dev",
    react: await EmailInviteTemplate({
      email,
      invitedBy,
      teamName,
      inviteLink,
    }),
  })
  if (error) {
    console.error(error)
  }
  return data
}

export const getInvitation = async (id: string) => {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error("Unauthenticated")
    }

    const headersList = await headers()
    const usableHeaders = Object.fromEntries(headersList.entries())

    const invitation = await auth.api.getInvitation({
      headers: usableHeaders,
      query: {
        id,
      },
    })

    return invitation
  } catch (error) {
    return null
  }
}

export const inviteUser = authenticatedAction
  .schema(inviteUserSchema)
  .action(async ({ parsedInput }) => {
    const headersList = await headers()
    const usableHeaders = Object.fromEntries(headersList.entries())

    await auth.api.createInvitation({
      headers: usableHeaders,
      body: {
        organizationId: parsedInput.organizationId,
        email: parsedInput.email,
        role: parsedInput.role,
      },
    })

    revalidatePath("/workspace/settings")
  })

export const acceptInvitation = authenticatedAction
  .schema(acceptInvitationSchema)
  .action(async ({ parsedInput }) => {
    const headersList = await headers()
    const usableHeaders = Object.fromEntries(headersList.entries())

    await auth.api.acceptInvitation({
      headers: usableHeaders,
      body: {
        invitationId: parsedInput.id,
      },
    })

    revalidatePath("/workspace")
    redirect("/workspace")
  })

export const rejectInvitation = authenticatedAction
  .schema(acceptInvitationSchema)
  .action(async ({ parsedInput }) => {
    const headersList = await headers()
    const usableHeaders = Object.fromEntries(headersList.entries())

    await auth.api.rejectInvitation({
      headers: usableHeaders,
      body: {
        invitationId: parsedInput.id,
      },
    })

    revalidatePath("/workspace")
    redirect("/workspace")
  })
