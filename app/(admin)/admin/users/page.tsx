import { getUsers } from "@/lib/data/user"
import { DeleteUserButton } from "@/components/models/users/delete-button"
import { PromoteUserButton } from "@/components/models/users/promote-button"
import { BanUserButton } from "@/components/models/users/ban-button"
import { DemoteUserButton } from "@/components/models/users/demote-button"
import { UnbanUserButton } from "@/components/models/users/unban-button"
import { RevokeSessionsButton } from "@/components/models/users/revoke-button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
export default async function Page() {
  const users = await getUsers()

  return (
    <div>
      <h1>Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <DeleteUserButton id={user.id} />
                {user.banned ? (
                  <UnbanUserButton id={user.id} />
                ) : (
                  <BanUserButton id={user.id} />
                )}
                {user.role === "admin" ? (
                  <DemoteUserButton id={user.id} />
                ) : (
                  <PromoteUserButton id={user.id} />
                )}
                <RevokeSessionsButton id={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
