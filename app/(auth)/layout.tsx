import { Main } from "@/components/ds";
import { Logo } from "@/components/site/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main className="flex-1 bg-muted flex flex-col gap-6 items-center justify-center">
      <Logo />
      {children}
      <div className="text-center space-y-2">
        <p className="text-muted-foreground text-sm">
          By using Ishi, you agree to the{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} 9d8.dev. All rights reserved.
        </p>
      </div>
    </Main>
  );
}
