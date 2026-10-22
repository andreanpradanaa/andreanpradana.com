export type ArchitectureItem = { name: string; role: string };
export type Decision = { title: string; body: string };
export type FlowNode = { id: string; label: string; note?: string };
export type FlowEdge = { from: string; to: string; label?: string };
export type Flow = { nodes: FlowNode[]; edges: FlowEdge[] };
export type Impact = { value: string; label: string };
export type CaseStudy = {
  /** Masalah yang dipecahkan. */
  problem: string;
  /** Apa yang dibangun, satu paragraf. */
  built: string;
  architecture: ArchitectureItem[];
  /** Keputusan dan trade-off yang diambil. */
  decisions: Decision[];
  /** Bukti yang bisa dicek di repo (bukan klaim angka). */
  evidence: string[];
  status?: string;
  /** Diagram alur dari data; tanpa `flow` tidak ada diagram. */
  flow?: Flow;
  /** Angka dampak terukur; hanya dari data user, kosong = tidak dirender. */
  impact?: Impact[];
};
export type Project = {
  slug: string;
  title: string;
  year: string;
  /** Konteks singkat yang membedakan proyek: Used at work / Open source / Study project. */
  context: string;
  summary: string;
  stack: string[];
  repo?: string;
  live?: string;
  /** Urutan tampil di beranda (1 = pertama); tanpa nilai = tidak ditampilkan di beranda. */
  featured?: number;
  caseStudy: CaseStudy;
};

/**
 * Proyek terpilih, urutan = urutan tampil. Hanya repo yang benar-benar berisi kode
 * (diaudit 2026-10-23). Angka hasil (RPS, p99) sengaja tidak ditulis karena belum diukur.
 */
export const projects: Project[] = [
  {
    slug: "svcgen",
    title: "svcgen",
    year: "2026",
    context: "Used at work",
    summary:
      "A CLI that scaffolds a production-shaped Go service in one command and keeps extending it: fx wiring, Fiber router, optional Postgres, Redis and partner clients, Dockerfile, GitLab CI and Sonar config. Used at Icon Plus to start new integrator services.",
    stack: ["Go", "Fiber", "fx", "GitLab CI"],
    repo: "https://github.com/andreanpradanaa/go-service-generator",
    featured: 1,
    caseStudy: {
      problem:
        "Every new integrator service at work started as a copy of the last one. Folder layout drifted, CI files diverged, and the first day of a new service went to boilerplate instead of the integration itself.",
      built:
        "svcgen generates a service with the structure the team already runs in production, then adds to it over time: `svcgen new` for the project, `svcgen add external` for a partner client, `svcgen add feature` for a router + controller + usecase + DTO wired into fx.",
      architecture: [
        {
          name: "cmd/svcgen",
          role: "CLI entrypoint with interactive prompts that can also be piped for CI",
        },
        {
          name: "internal/generator/templates",
          role: "text/template files embedded in the binary; generated Go is gofmt-ed",
        },
        {
          name: "Generated service",
          role: "fx modules for router, controller, usecase, repository; Fiber HTTP; config from YAML + env",
        },
        {
          name: "external/<partner>",
          role: "HTTP client with SUCCESS / PENDING / FAILED classification and timeout mapping",
        },
        {
          name: "/healthz",
          role: "liveness probe outside /api/v1 with version and uptime, for Kubernetes",
        },
      ],
      decisions: [
        {
          title: "Generate the shape of production, not a toy",
          body: "The templates mirror a service already running at work (Dockerfile, .gitlab-ci.yml, sonar-project.properties, request filter for signature headers), so a generated repo is deployable on day one instead of being a starting point to rewrite.",
        },
        {
          title: "Leave no trace in the generated repo",
          body: "The generated project has no svcgen markers. `svcgen add` inserts code by recognising stable anchors in the existing structure (`fx.Provide(`, `var serviceCodeByPath`), which keeps the output readable for people who never use the tool, at the cost of a few names that must not be renamed.",
        },
        {
          title: "Opt-in dependencies at generation time",
          body: "Postgres, Redis and partner clients are questions, not defaults. A service that does not need a database runs without one, and data sources can still be switched on later through env, so the generator never forces infrastructure a service does not use.",
        },
        {
          title: "Classify partner responses explicitly",
          body: "Every generated partner client maps responses to SUCCESS, PENDING or FAILED and turns timeouts into a typed error. Payment-style integrations are mostly about handling the ambiguous middle, so the client makes that state visible instead of hiding it in an HTTP status.",
        },
      ],
      evidence: [
        "Template changes are verified by `go test ./...` plus generating a throwaway service and building it.",
        "Prompts accept piped answers (`printf 'y\\nn\\ny' | svcgen new my-svc`) so CI can generate services unattended.",
        "Used at Icon Plus for new integrator services; the README documents the private module path the generated code depends on.",
      ],
      status: "Actively used and extended",
      flow: {
        nodes: [
          { id: "input", label: "Prompts", note: "or piped answers" },
          { id: "templates", label: "Embedded templates", note: "text/template" },
          { id: "generate", label: "Generate + gofmt" },
          { id: "repo", label: "Service repo", note: "fx modules · Fiber · config" },
          { id: "add", label: "svcgen add", note: "feature | external" },
          { id: "anchor", label: "Insert via anchors", note: "fx.Provide(" },
        ],
        edges: [
          { from: "input", to: "generate" },
          { from: "templates", to: "generate" },
          { from: "generate", to: "repo", label: "svcgen new" },
          { from: "add", to: "anchor" },
          { from: "anchor", to: "repo", label: "same repo" },
        ],
      },
    },
  },
  {
    slug: "trendstore",
    title: "Trendstore API",
    year: "2025",
    context: "Open source",
    summary:
      "E-commerce backend in Go with a layered domain / application / infrastructure structure, SQL migrations, repository interfaces with generated mocks, and a documented REST API for products, categories, cart, checkout and admin.",
    stack: ["Go", "PostgreSQL", "golang-migrate"],
    repo: "https://github.com/andreanpradanaa/trendstore",
    featured: 3,
    caseStudy: {
      problem:
        "A practice ground for the layering questions that come up in every backend codebase: where business rules live, how handlers stay thin, and how to keep the database replaceable in tests.",
      built:
        "A REST API for a fashion store: auth with roles, products and categories, cart, checkout and orders, plus an admin surface. Each domain has an entity and a repository interface; application services hold the use cases; HTTP handlers and Postgres repositories live in infrastructure.",
      architecture: [
        {
          name: "internal/domain",
          role: "entities and repository interfaces, no framework imports",
        },
        { name: "internal/application", role: "use-case services with DTOs and mappers" },
        {
          name: "internal/infrastructure/http",
          role: "handlers per aggregate, thin, map errors to a shared response envelope",
        },
        { name: "internal/infrastructure/persistence", role: "Postgres repositories" },
        { name: "db/migration", role: "versioned up/down SQL migrations" },
        { name: "test/mocks", role: "repository mocks for service tests" },
      ],
      decisions: [
        {
          title: "Dependency direction points inward",
          body: "Domain packages import nothing from HTTP or SQL. The cost is some mapping code between DTOs, entities and rows; the benefit is that use cases can be tested with the repository mocks in `test/mocks` and the database can change without touching business rules.",
        },
        {
          title: "Migrations as versioned SQL, not ORM auto-sync",
          body: "Four numbered up/down migrations (schema, categories, timestamps, product–category linking) make the schema history explicit and reversible, which matters more than convenience once data exists.",
        },
        {
          title: "One response envelope",
          body: "All handlers return the same shape from `pkg/response`, so clients and admin tooling parse one format and error handling is consistent across endpoints.",
        },
      ],
      evidence: [
        "32 commits; README documents every endpoint group (admin, auth, user, product, cart, checkout, order).",
        "Repository interfaces have mocks in `test/mocks`, used by service tests.",
        "`project-structure.md` records the layering rules.",
      ],
      status: "Feature-complete for the documented API; no load testing yet",
    },
  },
  {
    slug: "sysdesign-lab",
    title: "SysDesign Lab",
    year: "2026",
    context: "Open source",
    summary:
      "A free system design course in Indonesian: 42 lessons, 16 mock interviews, quizzes and cheat sheets, written from primary sources rather than copied from paid material. Static site with tests that validate the content itself.",
    stack: ["Astro", "MDX", "TypeScript", "Vitest"],
    repo: "https://github.com/andreanpradanaa/sysdesign-lab",
    caseStudy: {
      problem:
        "Good system design material in Indonesian is rare and the best English courses sit behind paywalls. I wanted a free, original curriculum I could also use to keep my own fundamentals sharp.",
      built:
        "A static Astro site with a four-part curriculum of MDX lessons, case studies and postmortems, a mock-interview bank, quizzes and cheat sheets. Learning progress is kept in the browser; there is no backend or account.",
      architecture: [
        {
          name: "src/content/lessons",
          role: "MDX lessons grouped by curriculum part, with a required front-matter format",
        },
        { name: "src/data/curriculum.ts", role: "single source of truth for ordering and parts" },
        { name: "src/lib", role: "pure logic: progress, quiz scoring, mock timer; unit tested" },
        {
          name: "Vitest content tests",
          role: "validate every lesson's structure and links before build",
        },
        {
          name: "GitHub Actions → Pages",
          role: "static deploy; `BASE_PATH` switch for a custom domain",
        },
      ],
      decisions: [
        {
          title: "Test the content, not just the code",
          body: "Lessons are data. A test suite checks front matter, required sections and internal links, so a broken lesson fails CI the same way a broken function would.",
        },
        {
          title: "No backend on purpose",
          body: "Progress lives in localStorage. It loses cross-device sync, but it keeps the site free to host, private by default, and impossible to take down by a database bill.",
        },
        {
          title: "Original text from free primary sources",
          body: "Structure is inspired by popular courses, but every lesson, diagram and quiz is written from the System Design Primer, DDIA, engineering blogs and RFCs, so the material can stay open source.",
        },
      ],
      evidence: [
        "42 lessons and 16 mock interviews in the repo; `pnpm test` runs logic and content validation.",
        "CI workflow builds and deploys the static output.",
      ],
      status: "Growing; lessons added over time",
    },
  },
  {
    slug: "system-design-practice",
    title: "System Design Practice",
    year: "2026",
    context: "Study project",
    summary:
      "A Go + HTMX app for interview practice: a question bank with answer frameworks, flashcards and quizzes, a progress tracker and timed mock interviews with self-rating. Server-rendered, no JS build step.",
    stack: ["Go", "chi", "PostgreSQL", "Redis", "HTMX"],
    repo: "https://github.com/andreanpradanaa/system-design-practice",
    featured: 2,
    caseStudy: {
      problem:
        "Reading theory does not stick; practising with a timer and a rubric does. I wanted a personal tool for that without paying for a course.",
      built:
        "A single-user web app: 15 practice problems with framework hints, 12 flashcard/quiz topics, a topic checklist and a timed mock mode. Content is original YAML loaded into Postgres at startup; pages are Go templates enhanced with HTMX.",
      architecture: [
        { name: "cmd/server", role: "entrypoint and route wiring with chi" },
        { name: "internal/store", role: "Postgres queries, Redis cache, embedded SQL migrations" },
        {
          name: "internal/seed",
          role: "YAML curriculum loaded on startup, so adding content needs no code change",
        },
        { name: "internal/web", role: "embedded templates and static assets" },
        { name: "docker compose", role: "Postgres, Redis and the app for local runs" },
      ],
      decisions: [
        {
          title: "Server-rendered HTML with HTMX instead of a SPA",
          body: "The interaction model is forms and partial updates, so HTMX keeps the whole app in Go with one deploy artefact and no frontend build. The trade-off is less client-side richness, which this tool does not need.",
        },
        {
          title: "Single-user auth, by design",
          body: "One admin account from env variables. Multi-tenancy would add accounts, authorisation and data isolation for a tool that only I use; leaving it out keeps the surface small and honest about its scope.",
        },
        {
          title: "Cache the read-heavy list, not everything",
          body: "The curriculum/problem list is read on every page and rarely changes, so it is cached in Redis. Per-user progress is written often and read once, so it stays in Postgres.",
        },
      ],
      evidence: [
        "Runs with `docker compose up --build`; migrations are embedded and applied on start.",
        "README describes the 6-step answer structure and the rubric used in mock mode.",
      ],
      status: "Working; content grows via YAML",
      flow: {
        nodes: [
          { id: "browser", label: "Browser", note: "HTMX partials" },
          { id: "router", label: "chi router" },
          { id: "handlers", label: "Handlers + templates" },
          { id: "store", label: "Store" },
          { id: "pg", label: "PostgreSQL", note: "embedded migrations" },
          { id: "redis", label: "Redis", note: "curriculum cache" },
          { id: "seed", label: "Seed YAML", note: "on startup" },
        ],
        edges: [
          { from: "browser", to: "router" },
          { from: "router", to: "handlers" },
          { from: "handlers", to: "store" },
          { from: "store", to: "pg" },
          { from: "store", to: "redis", label: "list cache" },
          { from: "seed", to: "pg", label: "load" },
        ],
      },
    },
  },
];

export function findProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Proyek unggulan beranda, diurutkan lewat `featured`; `/projects` memakai urutan array. */
export function featuredProjects(): Project[] {
  return projects
    .filter((p): p is Project & { featured: number } => typeof p.featured === "number")
    .sort((a, b) => a.featured - b.featured);
}
