import { SignInForm } from "@/components/auth/signin-form"

import { getSession } from "@/lib/auth/server"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await getSession()

  if (session) {
    redirect("/workspace")
  }

  return <SignInForm />
}
