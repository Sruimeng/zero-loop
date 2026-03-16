import { z } from 'zod'

// Vector3: 支持数组 [x,y,z] 或对象 {x,y,z}
const Vector3TupleSchema = z.tuple([z.number(), z.number(), z.number()])
const Vector3ObjectSchema = z.object({
  x: z.number().describe('X coordinate (right+)'),
  y: z.number().describe('Y coordinate (up+)'),
  z: z.number().describe('Z coordinate (forward-)'),
})

export const Vector3Schema = z
  .union([Vector3TupleSchema, Vector3ObjectSchema])
  .transform((val) => {
    if (Array.isArray(val)) return { x: val[0], y: val[1], z: val[2] }
    return val
  })
  .describe('3D vector, accepts [x,y,z] or {x,y,z}')

export type Vector3 = z.infer<typeof Vector3Schema>

// Color: Hex (#RRGGBB) 或 Nexus Token
export const ColorSchema = z
  .string()
  .describe('Hex code (#FF0000) or Nexus Token (text-core-blue)')

export type Color = z.infer<typeof ColorSchema>

// Vector3 输入类型 (转换前)
export const Vector3InputSchema = z.union([Vector3TupleSchema, Vector3ObjectSchema])
export type Vector3Input = z.infer<typeof Vector3InputSchema>
