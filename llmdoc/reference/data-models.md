---
id: data-models
type: reference
related_ids: [game-ir, zeroloop-pipeline, galacean-ecs]
---

# ZeroLoop GameIR Data Models

> Canonical protocol between LLM output and Galacean ECS. LLM emits GameIR JSON exclusively. No engine code. No scripts.

## Data Models

```typescript
// Source: packages/shared/src/index.ts (Zod-based, inherited from protocol)

// Primitives
export const Vector3Schema = z.union([
  z.tuple([z.number(), z.number(), z.number()]),
  z.object({ x: z.number(), y: z.number(), z: z.number() })
]).transform(val => Array.isArray(val) ? { x: val[0], y: val[1], z: val[2] } : val)

export const ColorSchema = z.string() // Hex (#RRGGBB) or Nexus Token

// Scene Components (discriminated by 'type')
export const ComponentSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('Transform'),
    data: z.object({
      position: Vector3InputSchema.default([0, 0, 0]),
      rotation: Vector3InputSchema.optional(),
      scale: Vector3InputSchema.default([1, 1, 1])
    })
  }),
  z.object({
    type: z.literal('Visual'),
    data: z.object({
      type: z.enum(['icon', 'shape', 'model']),
      asset: z.string(),
      color: ColorSchema.optional(),
      bloom: z.boolean().default(false)
    })
  }),
  z.object({
    type: z.literal('Script'),
    data: z.object({
      name: z.string(),
      properties: z.record(z.any())
    })
  })
])

// Entity
export const EntitySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  components: z.array(ComponentSchema)
})

// Scene
export const SceneSchema = z.object({
  entities: z.array(EntitySchema),
  environment: z.object({
    background: z.string().default('bg-obsidian-100')
  })
})

// UI Components (discriminated by 'component')
export const NexusComponentSchema = z.discriminatedUnion('component', [
  // 17 component types: Icon, Button, IconButton, Badge, Progress,
  // Slider, Switch, Checkbox, Toggle, ToggleGroup,
  // Tabs, Dialog, Confirm, Drawer, Popover, Tooltip, Avatar
])

export const UILayoutSchema = z.object({
  elements: z.array(z.object({
    id: z.string().optional(),
    slot: z.enum(['TOP_LEFT', 'TOP_CENTER', 'TOP_RIGHT', 'MIDDLE_LEFT', 'CENTER', 'MIDDLE_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_CENTER', 'BOTTOM_RIGHT', 'OVERLAY']),
    content: NexusComponentSchema
  }))
})

// Root Config
export const GameConfigSchema = z.object({
  meta: z.object({
    title: z.string(),
    author: z.string().default('AI Architect'),
    engine: z.enum(['galacean', 'maxel', 'auto']).default('auto')
  }),
  scene: SceneSchema,
  ui: UILayoutSchema
})

export type IGameConfig = z.infer<typeof GameConfigSchema>
```

## Validation

```
Schema location: packages/shared/src/index.ts (Zod) ✅ implemented
Pipeline rule:   LLM output → GameConfigSchema.parse()
On failure:      Retry. Max 3 attempts. Hard stop on 3rd failure.
Source:          Inherited from /Users/sruim/Desktop/projects/max/protocol
```

## Critical Rules

- LLM output is **GameConfigSchema JSON only**. No engine-specific code. No script bodies.
- Scene components use `type` discriminator (Transform | Visual | Script).
- UI components use `component` discriminator (17 Nexus component types).
- `Vector3` accepts dual format: `[x,y,z]` or `{x,y,z}` (auto-normalized to object).
- `Script.data.properties` keys are a **closed mapping** to Galacean ECS params. No arbitrary keys.
- `Entity.id` must be **stable** across retry cycles to allow diff-patching.
- `Transform.position/scale` have defaults. `rotation` is optional.

## Component Data Mapping

| `type`      | `data` fields                                      |
| :---------- | :------------------------------------------------- |
| `Transform` | `position`, `rotation`, `scale` (all Vector3)      |
| `Visual`    | `type` (icon/shape/model), `asset`, `color`, `bloom` |
| `Script`    | `name` (registered script), `properties` (arbitrary JSON) |

## UI Component Categories

| Category   | Components                                         |
| :--------- | :------------------------------------------------- |
| Basic      | Icon, Button, IconButton, Badge, Progress          |
| Input      | Slider, Switch, Checkbox, Toggle, ToggleGroup      |
| Composite  | Tabs, Dialog, Confirm, Drawer, Popover, Tooltip, Avatar |

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
