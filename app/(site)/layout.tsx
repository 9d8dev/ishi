import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Main } from "@/components/ds";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Main className="flex-1">{children}</Main>
      <Footer />
    </>
  );
}
