import { Section, Container } from "@/components/ds";

export const Footer = () => {
  return (
    <footer>
      <Section className="border-t bg-muted">
        <Container>
          <p>
            © {new Date().getFullYear()}{" "}
            <a className="underline underline-offset-2" href="https://9d8.dev">
              9d8.dev
            </a>
            . All rights reserved.
          </p>
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
        </Container>
      </Section>
    </footer>
  );
};
