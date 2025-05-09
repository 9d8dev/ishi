import { auth } from "@/lib/auth"

export const createOrganization = async (userId: string, email: string) => {
  try {
    await auth.api.createOrganization({
      body: {
        name: `${email.split("@")[0]}'s Organization`,
        slug: email.split("@")[0],
        userId,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
