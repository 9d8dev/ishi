"use server"

import { auth } from "./"
import { headers, cookies } from "next/headers"

// NOTE: refer to actions for auth actions
// this file contains primitive functions for auth

/**
 * Get session function
 *
 */
export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

/**
 * Sign in function
 *
 */
export const signIn = async (email: string, password: string) => {
  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  })

  return response
}

/**
 * Sign out function
 *
 */
export const signOut = async () => {
  const allCookies = await cookies()
  allCookies.delete("better-auth.session_token")
  allCookies.delete("better-auth.session_data")
}

/**
 * Sign up function
 *
 */
export const signUp = async (name: string, email: string, password: string) => {
  const response = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  })

  return response
}
