import { Main } from "@/components/ds";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Main className="flex-1">{children}</Main>;
}
