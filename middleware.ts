import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // if no session, redirect to sign in
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  // if no active organization, redirect to workspace
  if (!session.session.activeOrganizationId) {
    return NextResponse.redirect(new URL("/workspace", request.url))
  }

  // if user is not admin, redirect to home
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const isAdmin = session.user.role === "admin"
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  runtime: "nodejs",
  matcher: ["/d", "/d/:path*", "/admin", "/admin/:path*"],
}
