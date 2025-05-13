import { Section, Container } from "@/components/ds";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

export default function Page() {
  // Replace with your Homepage
  return <ToDelete />;
}

const Cards = [
  {
    name: "Admin Dashboard",
    icon: Trophy,
    href: "#",
    description: "This is an example of a card",
  },
  {
    name: "User Authentication",
    icon: Trophy,
    href: "#",
    description: "This is an example of a card",
  },
  {
    name: "Cards",
    icon: Trophy,
    href: "#",
    description: "This is an example of a card",
  },
];

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
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Cards.map((card) => (
            <div key={card.name} className="bg-background border p-3 rounded">
              <card.icon />
              <h3 className="text-lg font-medium">{card.name}</h3>
              <p className="mt-2 text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
