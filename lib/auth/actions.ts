"use server"

import { actionClient } from "@/lib/data/utils"
import {
  signIn as signInFunc,
  signUp as signUpFunc,
  signOut as signOutFunc,
} from "@/lib/auth/server"
import { redirect } from "next/navigation"
import { signInSchema, signUpSchema } from "@/lib/data/validation"

/**
 * Sign in action
 *
 */
export const signIn = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput
    await signInFunc(email, password)
    redirect("/workspace")
  })

/**
 * Sign up action
 *
 */
export const signUp = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput }) => {
    const { name, email, password } = parsedInput
    await signUpFunc(name, email, password)
    await signInFunc(email, password)
    redirect("/workspace")
  })

/**
 * Sign out action
 *
 */
export const signOut = actionClient.action(async () => {
  await signOutFunc()
  redirect("/")
})
