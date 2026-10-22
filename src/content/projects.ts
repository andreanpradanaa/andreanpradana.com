export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  repo?: string;
  live?: string;
};

/** Proyek terpilih, urutan = urutan tampil. */
export const projects: Project[] = [
  {
    slug: "commercehub-api",
    title: "CommerceHub API",
    year: "2026",
    summary:
      "Backend for a multi-vendor marketplace: layered Go services for catalogue, orders and payments, JWT auth, rate limiting, and a Docker setup that mirrors production.",
    stack: ["Go", "PostgreSQL", "Redis", "Docker"],
    repo: "https://github.com/andreanpradanaa/commercehub-api",
  },
  {
    slug: "distributed-reservation-system",
    title: "Distributed Reservation System",
    year: "2026",
    summary:
      "A high-concurrency reservation engine. Seat holds are locked in Redis, bookings are idempotent, and confirmation runs asynchronously through RabbitMQ so a slow downstream never blocks the request path.",
    stack: ["Go", "PostgreSQL", "RabbitMQ", "Redis"],
    repo: "https://github.com/andreanpradanaa/distributed-reservation-system",
  },
  {
    slug: "svcgen",
    title: "svcgen",
    year: "2026",
    summary:
      "A CLI that scaffolds a production-shaped Go service in one command: fx wiring, Fiber router, optional Postgres, Redis and partner clients, plus Dockerfile, GitLab CI and Sonar config. Used to spin up new integrator services at work.",
    stack: ["Go", "Fiber", "fx", "GitLab CI"],
    repo: "https://github.com/andreanpradanaa/go-service-generator",
  },
  {
    slug: "go-auth-system",
    title: "Go Auth System",
    year: "2026",
    summary:
      "An authentication playground where every branch is a standalone implementation, from plain sessions to JWT with refresh rotation, OAuth2 and multi-factor. Written to understand the trade-offs, not to ship a library.",
    stack: ["Go", "JWT", "OAuth2"],
    repo: "https://github.com/andreanpradanaa/go-auth-system",
  },
  {
    slug: "sysdesign-lab",
    title: "SysDesign Lab",
    year: "2026",
    summary:
      "A free, open-source system design course in Indonesian: 42 lessons, 16 mock interviews, quizzes and cheat sheets, all written from primary sources rather than copied from paid material.",
    stack: ["Astro", "MDX", "TypeScript"],
    repo: "https://github.com/andreanpradanaa/sysdesign-lab",
  },
  {
    slug: "system-design-practice",
    title: "System Design Practice",
    year: "2026",
    summary:
      "A Go and HTMX app for interview practice: a question bank with answer frameworks, spaced flashcards, a progress tracker and timed mock interviews with self-rating.",
    stack: ["Go", "chi", "HTMX", "PostgreSQL"],
    repo: "https://github.com/andreanpradanaa/system-design-practice",
  },
];
