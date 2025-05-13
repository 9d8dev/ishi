import { SignUpForm } from "@/components/auth/signup-form"
import { Main } from "@/components/ds"
import { getSession } from "@/lib/auth/server"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await getSession()

  if (session) {
    redirect("/d")
  }
  return (
    <Main>
      <SignUpForm />
    </Main>
  )
}
