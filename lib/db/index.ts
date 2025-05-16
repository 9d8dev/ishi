import { drizzle } from "drizzle-orm/neon-http"
import { user } from "./schema"
import { InferSelectModel } from "drizzle-orm"

export const db = drizzle(process.env.DATABASE_URL!)

export type User = InferSelectModel<typeof user>
