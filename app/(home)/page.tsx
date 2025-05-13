import { Section, Container, Prose } from "@/components/ds";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  // Replace with your Homepage
  return <ToDelete />;
}

const ToDelete = () => {
  return (
    <Section>
      <Container>
        <Badge variant="secondary" asChild>
          <a href="https://github.com/9d8dev/ishi">Star on Github</a>
        </Badge>
        <h1 className="mt-4 text-4xl font-medium">
          Welcome to <span className="text-orange-500">Ishi</span>
        </h1>
        <h3 className="mt-2 text-xl">
          A web app starter created at{" "}
          <a className="text-orange-500" href="https://9d8.dev">
            9d8
          </a>
        </h3>
      </Container>
    </Section>
  );
};
