import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { Nav } from "@/components/ds";

import Link from "next/link";

export const Header = () => {
  return (
    <Nav
      className="border-b bg-muted sticky top-0 z-50"
      containerClassName="flex justify-between items-center"
    >
      <Logo />
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </Nav>
  );
};
