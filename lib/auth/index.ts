import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/lib/db"
import {
  user,
  session,
  account,
  organization as organizationSchema,
  member,
  invitation,
} from "@/lib/db/schema"
import { nextCookies } from "better-auth/next-js"
import { admin, createAuthMiddleware, organization } from "better-auth/plugins"
import { createOrganization } from "@/lib/data/organization"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      member,
      organization: organizationSchema,
      invitation,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  // If this is enabled, the session is cached in the cookie
  // TODO: find a way to revalidate the session when the organization is changed without signing out
  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 5 * 60,
  //   },
  // },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const newSession = ctx.context.newSession
        if (newSession) {
          await createOrganization(newSession.user.id, newSession.user.email)
        }
      }
    }),
  },
  plugins: [
    nextCookies(),
    admin(),
    organization({
      organizationLimit: 2,
    }),
  ],
})
