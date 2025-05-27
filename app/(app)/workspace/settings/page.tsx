import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Clock, Mail, X, Settings } from "lucide-react";
import { Section, Container } from "@/components/ds";
import { InviteUserDialog } from "@/components/models/organizations/invite-user-dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getOrganization } from "@/lib/data/organization";
import { getSession } from "@/lib/auth/server";

export default async function Page() {
  const session = await getSession();

  const organization = await getOrganization(
    session?.session.activeOrganizationId
  );

  return (
    <Section className="py-8">
      <Container className="max-w-none space-y-8">
        {organization ? (
          <>
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Workspace Settings
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your organization members and settings
                  </p>
                </div>
              </div>
            </div>

            {/* Organization Details */}
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Users className="h-5 w-5" />
                  Organization Details
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Basic information about your organization
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Organization Name
                  </label>
                  <p className="text-lg font-medium">{organization.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Created
                  </label>
                  <p className="text-lg font-medium">
                    {new Date(organization.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Total Members
                  </label>
                  <p className="text-lg font-medium">
                    {organization.members.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="rounded-lg border bg-card">
              <div className="flex items-start justify-between border-b p-6">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <Users className="h-5 w-5" />
                    Team Members
                    <Badge variant="secondary" className="ml-2">
                      {organization.members.length}
                    </Badge>
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage who has access to this workspace
                  </p>
                </div>
                <InviteUserDialog organizationId={organization.id} />
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {organization.members.map((member, index) => (
                    <div key={member.id}>
                      <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={member.user.image || ""}
                              alt={member.user.name}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {member.user.name?.[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="font-semibold leading-none">
                              {member.user.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {member.user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="capitalize">
                            {member.role}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Joined
                            </p>
                            <p className="text-sm font-medium">
                              {new Date(member.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      {index < organization.members.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Invitations Section */}
            {organization.invitations.length > 0 && (
              <div className="rounded-lg border bg-card">
                <div className="border-b p-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <Mail className="h-5 w-5" />
                    Pending Invitations
                    <Badge variant="secondary" className="ml-2">
                      {organization.invitations.length}
                    </Badge>
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Invitations waiting for response
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {organization.invitations.map((invitation, index) => (
                      <div key={invitation.id}>
                        <div className="flex items-center justify-between py-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                              <Mail className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                              <p className="font-semibold leading-none">
                                {invitation.email}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={
                                    invitation.status === "pending"
                                      ? "outline"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {invitation.status}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  Expires{" "}
                                  {new Date(
                                    invitation.expiresAt
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>
                          {invitation.status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                        </div>
                        {index < organization.invitations.length - 1 && (
                          <Separator />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg border bg-card p-12">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">No organization found</p>
              <p className="text-sm text-muted-foreground">
                Please contact support if this seems incorrect
              </p>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
