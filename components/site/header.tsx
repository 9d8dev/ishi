import { SignOutButton } from "@/components/auth/signout";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { Nav } from "@/components/ds";

import Link from "next/link";

import { getSession } from "@/lib/auth/server";

export const Header = async () => {
  const session = await getSession();

  return (
    <Nav
      className="border-b bg-muted sticky top-0 z-50"
      containerClassName="flex justify-between items-center"
    >
      <Logo />
      <div className="flex gap-2">
        {!session ? (
          <>
            <Button variant="outline" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </>
        ) : (
          <>
            <SignOutButton />
            <Button asChild>
              <Link href="/workspace">Workspace</Link>
            </Button>
          </>
        )}
      </div>
    </Nav>
  );
};
