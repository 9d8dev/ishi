import { createAuthClient } from "better-auth/react"
import { adminClient, organizationClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL,
  plugins: [adminClient(), organizationClient()],
})

export const { signIn, signUp, signOut, useSession } = authClient
