---
id: data-models
type: reference
related_ids: [game-ir, zeroloop-pipeline, galacean-ecs]
---

# ZeroLoop GameIR Data Models

> Canonical protocol between LLM output and Galacean ECS. LLM emits GameIR JSON exclusively. No engine code. No scripts.

## Data Models

```typescript
// Source: packages/shared/src/types.ts

export interface GameIR {
  scene: Scene;
  entities: Entity[];
}

interface Scene {
  background: string;           // Hex color — e.g. "#1a1a2e"
  ambientLight: number;         // Intensity range: 0.0–1.0
  gravity: [number, number, number]; // Vector3 — default [0, -9.8, 0]
}

export interface Entity {
  id: string;                   // Unique. Stable across retries.
  name: string;
  transform: Transform;
  components: Component[];
}

interface Transform {
  position: [number, number, number]; // Vector3 — world space
  rotation: [number, number, number]; // Euler angles in degrees
  scale:    [number, number, number]; // Uniform or non-uniform
}

export interface Component {
  type: ComponentType;
  properties: Record<string, unknown>; // Mapped → Galacean ECS params
}

type ComponentType =
  | "MeshRenderer"
  | "DynamicCollider"
  | "StaticCollider"
  | "Script";
```

## Validation

```
Schema location: packages/shared/src/schema.ts  (Zod)
Pipeline rule:   LLM output → Zod.parse(GameIR)
On failure:      Retry. Max 3 attempts. Hard stop on 3rd failure.
```

## Critical Rules

- LLM output is **GameIR JSON only**. No engine-specific code. No script bodies.
- `Component.properties` keys are a **closed mapping** to Galacean ECS params. No arbitrary keys.
- `ComponentType` is an **exhaustive union**. Any value outside the four listed types is invalid.
- `Entity.id` must be **stable** across retry cycles to allow diff-patching.
- `Scene.ambientLight` outside `[0.0, 1.0]` is a validation error — Zod rejects it.
- `Transform` fields are all **required**. No optional omissions.

## Component.properties Mapping

| `type`            | Valid `properties` keys (Galacean ECS)       |
| :---------------- | :------------------------------------------- |
| `MeshRenderer`    | `mesh`, `material`, `castShadows`, `receiveShadows` |
| `DynamicCollider` | `shape`, `mass`, `friction`, `restitution`   |
| `StaticCollider`  | `shape`                                      |
| `Script`          | `script` — **value is a registered script name string, NOT code** |

## Retry Contract

```
attempt 1: LLM generates GameIR JSON
  → Zod validation pass? → continue
  → fail? → attempt 2

attempt 2: LLM regenerates with error context
  → fail? → attempt 3

attempt 3: final attempt
  → fail? → pipeline aborts, surfaces error to caller
```
