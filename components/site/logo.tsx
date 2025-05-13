import Image from "next/image";
import LogoLight from "@/public/logo.svg";
import LogoDark from "@/public/logo-dark-mode.svg";

export const Logo = () => {
  return (
    <>
      <Image
        width={72}
        src={LogoLight}
        alt="Logo"
        className="block dark:hidden"
      />
      <Image
        width={72}
        src={LogoDark}
        alt="Logo"
        className="hidden dark:block"
      />
    </>
  );
};
