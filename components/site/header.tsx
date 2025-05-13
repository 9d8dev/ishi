import { Button } from "@/components/ui/button";
import { Nav } from "@/components/ds";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import LogoDark from "@/public/logo-dark-mode.svg";
import Link from "next/link";

export const Header = () => {
  return (
    <Nav
      className="border-b bg-background sticky top-0 z-50"
      containerClassName="flex justify-between items-center"
    >
      <Link href="/">
        <Image width={72} src={Logo} alt="Logo" className="block dark:hidden" />
        <Image
          width={72}
          src={LogoDark}
          alt="Logo"
          className="hidden dark:block"
        />
      </Link>
      <Button>Sign In</Button>
    </Nav>
  );
};
