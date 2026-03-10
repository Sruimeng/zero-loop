---
id: tech-stack
type: reference
related_ids: [game-ir, agent-routing, adapter-layer]
---

# Tech Stack

> ZeroLoop (言铸引擎): text-to-3D-game pipeline. Pure TypeScript across all boundaries.

## Package Manager

- **pnpm** `10.28.2` (workspaces monorepo)

## Language

- **TypeScript** — unified type system, no boundary exceptions

## Monorepo Layout

```
zero_loop_workspace/
├── packages/
│   ├── shared/     # GameIR interfaces + Zod schemas (source of truth)
│   ├── agent/      # Node.js backend — LLM routing, API keys, forked OpenClaw
│   ├── adapters/   # Engine translation — galacean-loader.ts, godot-loader.gd
│   └── skills/     # Isolated I/O tools — tripo_downloader, fs_writer
└── apps/
    └── web/        # Vue 3 + Vite — Input + Canvas only
```

## Data Models

```typescript
// packages/shared — canonical GameIR contract
interface GameIR {
  version: string;
  scene: SceneNode[];
  assets: AssetRef[];
  scripts: ScriptDef[];
}

interface AssetRef {
  id: string;
  type: "mesh" | "texture" | "audio";
  uri: string;       // S3/OSS short link
  source: "tripo" | "baked" | "cached";
}

interface SceneNode {
  id: string;
  component: string; // Galacean ECS component name
  props: Record<string, unknown>;
  children?: string[]; // SceneNode ids
}
```

## Core Services

| Service | Role | Trigger |
|---|---|---|
| Redis | Cache layer — hash match | Before any LLM or Tripo call |
| LLM API | GameIR JSON generation | Cache miss (provider TBD) |
| Tripo AI | External 3D asset gen | Fallback only |
| Galacean Engine | 3D rendering (ECS) | Client canvas |
| Puppeteer | Headless QA renderer | 5s scene validation |
| S3/OSS | Static asset hosting + short links | Post-generation |
| WebSocket | client <-> agent realtime comm | Always-on |

## Build Tools

- **pnpm workspaces** — monorepo linking
- **Vite** — `apps/web` bundler
- **Zod** — runtime validation (`packages/shared` only)

## Critical Rules

- `packages/shared` is the **sole source of truth** for all types and schemas
- Zod schemas in `shared` must mirror TypeScript interfaces exactly — no drift
- `adapters/` must never import from `agent/` — one-way dependency only
- `skills/` are isolated I/O tools — no cross-skill imports
- Redis hash check is **mandatory** before any LLM or Tripo API call
- Tripo is **fallback only** — never primary asset path
- Puppeteer validation timeout: **5s hard limit**
