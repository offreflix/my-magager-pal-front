import { z } from 'zod'

export const categoriesSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
})

export const categoriesDataSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  _count: z.object({
    transactions: z.number(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type CategoriesSchema = z.infer<typeof categoriesSchema>

export type CategoriesDataSchema = z.infer<typeof categoriesDataSchema>

export function TransformCategoriesData(data: CategoriesDataSchema) {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
  }
}

export function TransformCategories(data: CategoriesSchema) {
  return {
    name: data.name,
    description: data.description,
  }
}
