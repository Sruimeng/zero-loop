---
id: constitution
type: reference
---

# Constitution

> Non-negotiable rules governing all ZeroLoop development.

## Law 1 — GameIR Supremacy

LLM output = GameIR JSON ONLY.
Engine-specific code/scripts from LLM = FORBIDDEN.
All engine logic lives in `adapters/`.

## Law 2 — Cache First

Redis hash check BEFORE any LLM or Tripo API call.
Skipping cache = financial violation.

## Law 3 — Local Assets First

`packages/skills/` local library = primary source.
Tripo AI = fallback when local asset not found.

## Law 4 — Validate Before Execute

All GameIR must pass Zod schema (`packages/shared`).
Max 3 LLM retries on validation failure.

## Law 5 — QA Gate

Puppeteer headless render (5s) required before any publish.
FPS < 30 or NaN coordinates = fail → retry.

## Law 6 — No Multiplayer

Strictly single-player, client-side rendering.
No WebSocket state sync between clients.

## Forbidden Patterns

```typescript
// BANNED naming
class AbstractGameManager {}   // AbstractXxx
class BaseSceneImpl {}         // BaseXxxImpl
class EntityHelper {}          // XxxHelper

// BANNED structure
if (a) {
  if (b) {
    if (c) { /* depth > 2 */ }
  }
}

// BANNED comment
// loop through array
items.forEach(item => process(item));

// BANNED type
function render(data: any) {}  // use `unknown`

// BANNED inheritance
class A extends B extends C {} // chain > 1 level
```

## Package Ownership

| Package | Responsibility | Constraint |
| :--- | :--- | :--- |
| `shared/` | Types + schemas | No logic |
| `agent/` | Orchestration + LLM routing | No rendering |
| `adapters/` | Engine translation | No business logic |
| `skills/` | Isolated I/O tools | No cross-dependencies |
| `apps/web/` | UI | No business logic |
