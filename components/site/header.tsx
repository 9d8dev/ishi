import { Nav } from "@/components/ds";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import LogoDark from "@/public/logo-dark.svg";
import Link from "next/link";

export const Header = () => {
  return (
    <Nav>
      <Link href="/">
        <Image src={Logo} alt="Logo" className="block dark:hidden" />
        <Image src={LogoDark} alt="Logo" className="hidden dark:block" />
      </Link>
    </Nav>
  );
};
