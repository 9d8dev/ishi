import { Main } from "@/components/ds"
import { getSession } from "@/lib/auth/server"

export default async function Page() {
  const session = await getSession()
  return (
    <Main>
      <h1>Dashboard</h1>
      <h2>Current Organization: {session?.session.activeOrganizationId}</h2>
    </Main>
  )
}
