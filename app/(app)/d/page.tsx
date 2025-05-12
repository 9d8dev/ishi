import { Main, Section, Container } from "@/components/ds"
import { getSession } from "@/lib/auth/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Page() {
  const session = await getSession()
  const orgs = await auth.api.listOrganizations({
    headers: await headers(),
  })
  return (
    <Main>
      <Section>
        <Container>
          <h1>Dashboard</h1>
          <h2>Current Organization: {session?.session.activeOrganizationId}</h2>
          <h2>Organizations: {orgs.length}</h2>
          {orgs.map((org) => (
            <h2 key={org.id}>{org.name}</h2>
          ))}
        </Container>
      </Section>
    </Main>
  )
}
