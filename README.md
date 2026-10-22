# andreanpradana.com

Situs personal branding Andrean Pradana, Backend Engineer. Next.js 16 (App Router) + TypeScript + Tailwind CSS 4, statis, dideploy ke Vercel dengan domain andreanpradana.com.

## Menjalankan

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm test           # Vitest + Testing Library
pnpm test:coverage  # ambang 80%
pnpm build && pnpm typecheck
pnpm lint && pnpm format:check
```

## Struktur

- `src/app/` — routing, metadata, sitemap/robots, OG image
- `src/components/ui/` — primitif (Container, TextLink, SectionLabel, ProjectRow, ExperienceItem)
- `src/components/sections/` — Nav, Hero, Work, About, Contact, Footer
- `src/content/` — semua data situs (`site.ts`, `projects.ts`, `experience.ts`); ubah konten di sini
- `src/lib/` — util murni
- `docs/` — spec, progress, keputusan desain (lihat `docs/README.md`)
- `.claude/` — workflow Claude Code (command `/feature`, `/ui-check`, `/figma-spec`, agent, rules, hooks)

Salin `.env.example` ke `.env` bila perlu mengubah `NEXT_PUBLIC_SITE_URL`.
