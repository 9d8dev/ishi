import { auth } from "@/lib/auth"

export const createOrganization = async (userId: string, email: string) => {
  await auth.api.createOrganization({
    body: {
      name: `${email.split("@")[0]}'s Organization`,
      slug: email.split("@")[0],
      userId,
    },
  })
}
