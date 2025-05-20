import * as React from "react"

type EmailInviteTemplateProps = {
  email: string
  invitedBy: string
  teamName: string
  inviteLink: string
}

export const EmailInviteTemplate: React.FC<
  Readonly<EmailInviteTemplateProps>
> = ({ email, invitedBy, teamName, inviteLink }) => (
  <div>
    <h1>Welcome, {email}!</h1>
    <p>
      You've been invited to join {teamName} on ishi.dev by {invitedBy}
    </p>
    <p>Click the link below to accept the invitation</p>
    <a href={inviteLink}>Accept Invitation</a>
  </div>
)
