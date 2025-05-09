import { SignInForm } from "@/components/auth/signin-form"
import { getSession } from "@/lib/auth/server"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="p-20 flex justify-center items-center w-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] antialiased" />
      <SignInForm />
    </main>
  )
}
