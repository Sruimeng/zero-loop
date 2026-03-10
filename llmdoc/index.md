---
id: index
type: guide
---

# ZeroLoop LLMDoc

**Project:** 言铸引擎 — text-to-3D-game pipeline
**Stack:** TypeScript Monorepo · Vue 3 · Galacean · Redis · Puppeteer

## Navigation

| Doc | Path | Purpose |
|-----|------|---------|
| Constitution | `reference/constitution.md` | Hard rules. Read first. |
| Style Law | `reference/style-hemingway.md` | Code & doc standards. |
| Tech Stack | `reference/tech-stack.md` | Dependencies & tools. |
| Data Models | `reference/data-models.md` | GameIR types + Zod schema. |
| Pipeline | `reference/pipeline.md` | 8-step execution flow. |
| Doc Standard | `guides/doc-standard.md` | How to write docs. |
| Strategy | `agent/strategy-bootstrap.md` | Build order & roadmap. |

## Quick Rules
1. Read `constitution.md` before writing ANY code.
2. LLM → GameIR JSON ONLY.
3. Redis cache before any API call.
4. `packages/shared` = source of truth for types.
