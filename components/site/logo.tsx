import LogoLight from "@/public/logo.svg";
import LogoDark from "@/public/logo-dark-mode.svg";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({
  href = "/",
  width = 72,
  className,
}: {
  href?: string;
  width?: number;
  className?: string;
}) => {
  return (
    <Link href={href} className={className}>
      <Image
        width={width}
        src={LogoLight}
        alt="Logo"
        className="block dark:hidden"
      />
      <Image
        width={width}
        src={LogoDark}
        alt="Logo"
        className="hidden dark:block"
      />
    </Link>
  );
};
