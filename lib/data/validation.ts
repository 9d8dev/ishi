import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

/**
 * User actions
 */

export const adminUserActionSchema = z.object({
  id: z.string(),
})

/**
 * Organization actions
 */

export const adminOrganizationActionSchema = z.object({
  id: z.string(),
})

export const authenticatedOrganizationActionSchema = z.object({
  id: z.string(),
})
