---
id: strategy-bootstrap
type: strategy
---

# Bootstrap Strategy

Goal: Physical skeleton → working pipeline.

## Build Order (Dependency-Driven)

### Phase 0: Workspace Init ✅
```
pnpm init (workspace root)
Create pnpm-workspace.yaml
Create packages/shared/
Create packages/agent/
Create packages/adapters/
Create packages/skills/
Create apps/web/
```
Status: Complete. Monorepo structure established.

### Phase 1: Shared Types (Unblocks Everything) ✅
```
packages/shared/src/primitives.ts  ← Vector3, Color (dual-format adapter)
packages/shared/src/scene.ts       ← Entity, Component (discriminated union)
packages/shared/src/ui.ts          ← NexusComponent (17 UI types)
packages/shared/src/index.ts       ← GameConfigSchema (root)
packages/shared/package.json       ← @zero-loop/shared
packages/shared/tsconfig.json      ← TypeScript config
```
Milestone: `GameConfigSchema` validates with Zod. Inherited from `/Users/sruim/Desktop/projects/max/protocol`.
Status: Complete. Build passing.

### Phase 2: Agent Core
```
packages/agent/src/llm.ts       ← LLM router (prompt → GameIR)
packages/agent/src/cache.ts     ← Redis hash lookup
packages/agent/src/validate.ts  ← Zod validation + retry logic
packages/agent/src/ws.ts        ← WebSocket server
```
Milestone: Prompt in → GameIR out. Cache hit/miss working.

### Phase 3: Skills (Async I/O)
```
packages/skills/src/tripo.ts    ← Tripo AI asset downloader
packages/skills/src/fs.ts       ← Local asset library reader
```
Milestone: Asset resolution (local first, Tripo fallback).

### Phase 4: Adapters (Engine Translation)
```
packages/adapters/src/galacean-loader.ts ← GameIR → Galacean ECS
```
Milestone: GameIR compiles to renderable Galacean scene.

### Phase 5: QA + Publish
```
packages/agent/src/qa.ts        ← Puppeteer headless render
packages/agent/src/publish.ts   ← S3/OSS upload + short link
```
Milestone: Full pipeline end-to-end.

### Phase 6: Web UI
```
apps/web/src/App.vue            ← Input + Canvas
apps/web/src/ws.ts              ← WebSocket client
```
Milestone: Working UI.

## Critical Path
shared → agent → skills → adapters → qa → web

## Blocked Until
- LLM provider selected (OpenAI / Anthropic / local)
- Tripo AI API key obtained
- S3/OSS bucket configured
- Redis instance (local dev: docker-compose)
