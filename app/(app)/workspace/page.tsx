import { Main, Section, Container } from "@/components/ds"
import { getSession } from "@/lib/auth/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { OrganizationSwitcher } from "@/components/models/organizations/switcher"

export default async function Page() {
  const session = await getSession()
  const orgs = await auth.api.listOrganizations({
    headers: await headers(),
  })

  return (
    <Main>
      <Section>
        {session?.session.activeOrganizationId ? (
          <Container>
            <h1>Dashboard</h1>
            <h2>
              Current Organization: {session?.session.activeOrganizationId}
            </h2>
            <h2>Organizations: {orgs.length}</h2>
            <OrganizationSwitcher
              organizations={orgs}
              activeOrganization={session?.session.activeOrganizationId ?? ""}
            />
          </Container>
        ) : (
          <Container>
            <h1>No organization selected</h1>
            <OrganizationSwitcher
              organizations={orgs}
              activeOrganization={session?.session.activeOrganizationId ?? ""}
            />
          </Container>
        )}
      </Section>
    </Main>
  )
}
