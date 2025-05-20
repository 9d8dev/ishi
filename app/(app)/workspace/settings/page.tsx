import { Main, Section, Container } from "@/components/ds"
import { getSession } from "@/lib/auth/server"
import { getOrganizationUsers } from "@/lib/data/organization"

export default async function Page() {
  const session = await getSession()
  const users = await getOrganizationUsers(
    session?.session.activeOrganizationId ?? ""
  )

  return (
    <Main>
      <Section>
        <Container>
          <h1 className="font-bold">Workspace Settings</h1>
        </Container>
        <Container>
          <h2>Workspace Users</h2>
          <div>
            {users.map((user) => (
              <div key={user.id}>
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </Main>
  )
}
