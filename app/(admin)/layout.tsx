import { Users, Building, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/ds";
import { Logo } from "@/components/site/logo";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Logo href="/admin" width={60} />
            <nav className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href="/admin/users"
                  className="flex items-center space-x-2"
                >
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href="/admin/organizations"
                  className="flex items-center space-x-2"
                >
                  <Building className="h-4 w-4" />
                  <span>Organizations</span>
                </Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/workspace">Back to App</Link>
            </Button>
          </div>
        </div>
      </Nav>
      {children}
    </div>
  );
}
