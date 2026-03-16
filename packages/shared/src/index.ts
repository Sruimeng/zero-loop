import { z } from 'zod'
import { SceneSchema } from './scene.js'
import { UILayoutSchema } from './ui.js'

// Meta
const MetaSchema = z.object({
  title: z.string().describe('Game title'),
  author: z.string().default('AI Architect').describe('Creator name'),
  engine: z.enum(['galacean', 'maxel', 'auto']).default('auto').describe('Target engine'),
})

// Root Configuration
export const GameConfigSchema = z.object({
  meta: MetaSchema.describe('Game metadata'),
  scene: SceneSchema.describe('Scene definition'),
  ui: UILayoutSchema.describe('UI layout'),
})

export type IGameConfig = z.infer<typeof GameConfigSchema>

// Re-export all schemas and types
export * from './primitives.js'
export * from './scene.js'
export * from './ui.js'
