import { Section, Main } from "@/components/ds"
import { getInvitation } from "@/lib/data/organization"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Mail, Building2, Users2 } from "lucide-react"
import { format } from "date-fns"
import { notFound } from "next/navigation"
import { AcceptInvitation } from "@/components/models/organizations/accept-invitation"
import { RejectInvitation } from "@/components/models/organizations/reject-invitation"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const usableParams = await params
  const { id } = usableParams

  const invitation = await getInvitation(id)

  if (!invitation) {
    notFound()
  }

  // Function to get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10"
      case "accepted":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/10"
      case "rejected":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/10"
      case "canceled":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/10"
      default:
        return ""
    }
  }

  return (
    <Main>
      <Section className="py-20 w-[500px]">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Organization Invitation
              </CardTitle>
              <Badge
                className={getStatusBadge(invitation.status)}
                variant="secondary"
              >
                {invitation.status.charAt(0).toUpperCase() +
                  invitation.status.slice(1)}
              </Badge>
            </div>
            <CardDescription>
              You have been invited to join an organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {invitation.organizationName}
                  </p>
                  <p className="text-sm text-muted-foreground">Organization</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Users2 className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none capitalize">
                    {invitation.role}
                  </p>
                  <p className="text-sm text-muted-foreground">Role</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {invitation.inviterEmail}
                  </p>
                  <p className="text-sm text-muted-foreground">Invited by</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <CalendarDays className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {format(new Date(invitation.expiresAt), "PPP")}
                  </p>
                  <p className="text-sm text-muted-foreground">Expires on</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            {invitation.status === "pending" && (
              <>
                <RejectInvitation id={id} />
                <AcceptInvitation id={id} />
              </>
            )}
          </CardFooter>
        </Card>
      </Section>
    </Main>
  )
}
