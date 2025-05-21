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

  // if no active organization and not already on workspace, redirect to workspace
  if (
    session &&
    !session.session.activeOrganizationId &&
    request.nextUrl.pathname !== "/workspace" &&
    !request.nextUrl.pathname.startsWith("/invitation")
  ) {
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
  matcher: [
    "/workspace",
    "/workspace/:path*",
    "/admin",
    "/admin/:path*",
    "/invitation/:path*",
  ],
}
