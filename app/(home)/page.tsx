import { Section, Container, Prose } from "@/components/ds";

export default function Page() {
  // Replace with your Homepage
  return <ToDelete />;
}

const ToDelete = () => {
  return (
    <Section>
      <Container>
        <Prose isSpaced>
          <h1>Welcome to Ishi</h1>
          <h3>
            A web app starter created at <a href="https://9d8.dev">9d8</a>
          </h3>
        </Prose>
      </Container>
    </Section>
  );
};
