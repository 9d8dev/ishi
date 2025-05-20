import { Main, Section, Container } from "@/components/ds"
import { getSession } from "@/lib/auth/server"

export default async function Page() {
  return (
    <Main>
      <Section>
        <Container>
          <h1>Workspace Settings</h1>
        </Container>
      </Section>
    </Main>
  )
}
