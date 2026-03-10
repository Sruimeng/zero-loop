---
id: style-hemingway
type: reference
---

# Hemingway Style

> High signal, low noise. Surface = simple API. Depth = hidden complexity.

## Iceberg Principle

Public interface is clean. Complexity lives below the waterline.

```typescript
// Surface: simple
function buildScene(prompt: string): Promise<GameIR> {}

// Depth: hidden in impl
async function _parseEntities(ir: unknown): Promise<Entity[]> {}
async function _validateLayout(entities: Entity[]): Promise<void> {}
```

## No Fluff

Banned phrases — delete on sight:

- "In this section..."
- "I will now..."
- "Here is..."
- "This function..."
- "As you can see..."

## Composition > Inheritance

Has-a beats Is-a. One level of inheritance maximum.

```typescript
// BANNED
class SpecialRenderer extends BaseRenderer extends AbstractBase {}

// CORRECT
interface Renderer { render(scene: Scene): Frame }
interface Validator { validate(ir: unknown): Result }
type Pipeline = { renderer: Renderer; validator: Validator }
```

## Type-First Design

Interface before logic. Schema before function.

```typescript
// 1. Define contract
interface SceneBuilder {
  build(prompt: string): Promise<GameIR>;
  validate(ir: unknown): ValidationResult;
}

// 2. Then implement
function createSceneBuilder(): SceneBuilder { ... }
```

## Max Nesting: 2 Levels

Guard clauses instead of nested ifs.

```typescript
// BANNED: depth 3
function process(data: unknown) {
  if (data) {
    if (isValid(data)) {
      if (hasAssets(data)) { /* ... */ }
    }
  }
}

// CORRECT: guard clauses
function process(data: unknown) {
  if (!data) return;
  if (!isValid(data)) return;
  if (!hasAssets(data)) return;
  // logic here
}
```

## Naming: Concrete Nouns Only

| BANNED | CORRECT |
| :--- | :--- |
| `AbstractRenderer` | `Renderer` |
| `BaseSceneImpl` | `Scene` |
| `EntityManager` | `EntityStore` |
| `LayoutHelper` | `layoutScene` |
| `ProcessorFactory` | `buildProcessor` |

## Comments: WHY Only

```typescript
// BANNED (what)
// loop through entities and render each one
entities.forEach(e => render(e));

// CORRECT (why)
// Tripo fallback only — local cache miss rate > 5% triggers alert
const asset = await tripoFetch(id);
```
