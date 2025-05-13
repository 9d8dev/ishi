import { Section, Container } from "@/components/ds";
import { Logo } from "@/components/site/logo";

export const Footer = () => {
  return (
    <footer>
      <Section className="border-t bg-muted">
        <Container className="grid grid-cols-[auto_1fr_auto] items-center gap-6">
          <Logo />
          <p className="text-muted-foreground">
            Clone the Repo on{" "}
            <a
              className="underline underline-offset-2"
              href="https://github.com/9d8dev/ishi"
            >
              Github
            </a>
            .
          </p>
          <p>
            © {new Date().getFullYear()}{" "}
            <a className="underline underline-offset-2" href="https://9d8.dev">
              9d8.dev
            </a>
            . All rights reserved.
          </p>
        </Container>
      </Section>
    </footer>
  );
};
