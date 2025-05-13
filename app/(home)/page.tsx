import { Section, Container } from "@/components/ds";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  SquareChartGantt,
  User2,
  Component,
  FileCode2,
  LineChart,
} from "lucide-react";

import Link from "next/link";

export default function Page() {
  // Replace with your Homepage
  return <ToDelete />;
}

const features = [
  {
    name: "Admin Dashboard",
    icon: SquareChartGantt,
    href: "/admin",
    description: "Secure admin panel with role-based access control",
  },
  {
    name: "Authentication",
    icon: User2,
    href: "/sign-in",
    description: "Complete sign-in/sign-up flows with form validation",
  },
  {
    name: "Database Integration",
    icon: BarChart,
    href: "/sign-up",
    description: "Drizzle ORM with NeonDB serverless Postgres",
  },
  {
    name: "Modern UI Components",
    icon: Component,
    href: "#",
    description: "Shadcn UI and Craft Design System built on Tailwind CSS",
  },
  {
    name: "Type Safety",
    icon: FileCode2,
    href: "#",
    description: "End-to-end TypeScript with Zod validation",
  },
  {
    name: "Analytics",
    icon: LineChart,
    href: "#",
    description: "Built-in Vercel Analytics for monitoring performance",
  },
];

const ToDelete = () => {
  return (
    <Section>
      <Container>
        <Badge variant="outline" asChild>
          <a href="https://github.com/9d8dev/ishi">Star on Github</a>
        </Badge>
        <h1 className="mt-8 text-4xl font-medium">
          Welcome to <span className="text-orange-500">Ishi</span>
        </h1>
        <h3 className="mt-2 text-xl">
          A{" "}
          <a className="text-orange-500" href="https://9d8.dev">
            9d8
          </a>{" "}
          joint. Created by <a href="https://cameron.so">youngbloodcyb</a> and{" "}
          <a href="https://bridger.to">brijr</a>.
        </h3>
      </Container>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.href}
              className="bg-muted hover:bg-muted/50 transition-colors border p-4 rounded"
            >
              <feature.icon className="mb-6" />
              <h3 className="text-lg font-medium">{feature.name}</h3>
              <p className="mt-2 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>
      </Container>
      <Container>
        <p className="text-muted-foreground">
          <a
            href="https://github.com/9d8dev/ishi"
            className="underline underline-offset-2"
          >
            Star on Github
          </a>{" "}
          to show your support for this project. Oh and, Ishi means stone in
          Japanese.
        </p>
      </Container>
    </Section>
  );
};
