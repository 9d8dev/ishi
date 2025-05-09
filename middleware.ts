import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  // TODO: make this more resilient
  if (request.nextUrl.pathname === "/d") {
    console.log("redirecting")
    const activeOrg = session.session.activeOrganizationId
    const targetUrl = `/d/${activeOrg}`

    if (request.nextUrl.pathname !== targetUrl) {
      return NextResponse.redirect(new URL(targetUrl, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  runtime: "nodejs",
  matcher: ["/d", "/d/:org"], // Add /d to match both the base route and org routes
}
