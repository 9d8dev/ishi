import { Main, Section, Container } from "@/components/ds";

import Link from "next/link";

export default function Page() {
  return (
    <Main>
      <Section>
        <Container>
          <h1>Admin</h1>
          <p>Admin eyes only</p>
          <div className="flex flex-col">
            <Link href="/admin/users">Users</Link>
            <Link href="/admin/organizations">Organizations</Link>
          </div>
        </Container>
      </Section>
    </Main>
  );
}
