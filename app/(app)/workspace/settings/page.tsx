import { Main, Section, Container } from "@/components/ds"
import { getSession } from "@/lib/auth/server"
import { getOrganization } from "@/lib/data/organization"

export default async function Page() {
  const session = await getSession()

  const organization = await getOrganization(
    session?.session.activeOrganizationId
  )

  return (
    <Main>
      <Section>
        <Container>
          <h1 className="font-bold">Workspace Settings</h1>
          {organization && (
            <div className="space-y-8">
              {/* Members Section */}
              <div className="rounded-lg border bg-card">
                <div className="flex items-center justify-between border-b p-4">
                  <h3 className="text-lg font-semibold">
                    Members ({organization.members.length})
                  </h3>
                  <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" />
                      <line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                    Invite User
                  </button>
                </div>
                <div className="divide-y">
                  {organization.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center gap-3">
                        {member.user.image ? (
                          <img
                            src={member.user.image}
                            alt={member.user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-lg font-medium text-primary">
                              {member.user.name?.[0]?.toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{member.user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                          {member.role}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(member.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invitations Section */}
              {organization.invitations.length > 0 && (
                <div className="rounded-lg border bg-card">
                  <div className="border-b p-4">
                    <h3 className="text-lg font-semibold">
                      Pending Invitations ({organization.invitations.length})
                    </h3>
                  </div>
                  <div className="divide-y">
                    {organization.invitations.map((invitation) => (
                      <div
                        key={invitation.id}
                        className="flex items-center justify-between p-4"
                      >
                        <div>
                          <p className="font-medium">{invitation.email}</p>
                          <p className="text-sm text-muted-foreground">
                            Expires{" "}
                            {new Date(
                              invitation.expiresAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <button className="text-sm text-destructive hover:underline">
                          Cancel Invitation
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>
    </Main>
  )
}
