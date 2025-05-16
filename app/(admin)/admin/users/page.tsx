import { getUsers } from "@/lib/data/user"

export default async function Page() {
  const users = await getUsers()

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <div className="inline-flex gap-2">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
