import { z } from 'zod'
import { Vector3Schema, ColorSchema, Vector3InputSchema } from './primitives.js'

// Transform Component
const TransformComponentSchema = z.object({
  type: z.literal('Transform'),
  data: z.object({
    position: Vector3InputSchema.default([0, 0, 0]).describe('World position'),
    rotation: Vector3InputSchema.optional().describe('Euler angles (degrees)'),
    scale: Vector3InputSchema.default([1, 1, 1]).describe('Scale factor'),
  }),
})

// Visual Component
const VisualComponentSchema = z.object({
  type: z.literal('Visual'),
  data: z.object({
    type: z.enum(['icon', 'shape', 'model']).describe('Visual type'),
    asset: z.string().describe('UnoCSS class, primitive name, or model path'),
    color: ColorSchema.optional(),
    bloom: z.boolean().default(false).describe('Enable glow effect'),
  }),
})

// Script Component
const ScriptComponentSchema = z.object({
  type: z.literal('Script'),
  data: z.object({
    name: z.string().describe('Behavior script name'),
    properties: z.record(z.any()).describe('Script parameters'),
  }),
})

// Component Union (discriminated by 'type')
export const ComponentSchema = z.discriminatedUnion('type', [
  TransformComponentSchema,
  VisualComponentSchema,
  ScriptComponentSchema,
])

export type Component = z.infer<typeof ComponentSchema>

// Entity
export const EntitySchema = z.object({
  id: z.string().describe('Unique entity identifier'),
  name: z.string().optional().describe('Display name'),
  components: z.array(ComponentSchema).describe('Entity components'),
})

export type Entity = z.infer<typeof EntitySchema>

// Scene
export const SceneSchema = z.object({
  entities: z.array(EntitySchema).describe('Scene entities'),
  environment: z.object({
    background: z.string().default('bg-obsidian-100').describe('Nexus background color'),
  }),
})

export type Scene = z.infer<typeof SceneSchema>

// Re-export component schemas for extension
export {
  TransformComponentSchema,
  VisualComponentSchema,
  ScriptComponentSchema,
}
