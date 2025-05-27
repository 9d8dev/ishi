import { Section, Container } from "@/components/ds";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getOrganizations } from "@/lib/data/organization";

export default async function Page() {
  const organizations = await getOrganizations();
  console.log(organizations);

  return (
    <Section>
      <Container>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>{org.name}</TableCell>
                <TableCell>{org.slug}</TableCell>
                <TableCell>
                  {new Date(org.createdAt).toLocaleDateString()}
                </TableCell>
                {/* <TableCell>
                  <OrganizationActionsMenu organization={org} />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Section>
  );
}
