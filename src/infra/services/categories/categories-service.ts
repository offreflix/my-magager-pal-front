import { api } from '@/services/api'
import {
  CategoriesDataSchema,
  CategoriesSchema,
  TransformCategories,
  TransformCategoriesData,
} from '@/shared/schemas/categories/categories-schema'

const CategoriesService = {
  findAll: async () => {
    const response: { data: Array<CategoriesDataSchema> } = await api.get(
      '/categories'
    )

    console.log(response)

    return response.data
  },

  create: async (data: any) => {
    const response: CategoriesSchema = await api.post(
      '/categories',
      TransformCategories(data)
    )

    return response
  },

  edit: async (data: CategoriesDataSchema) => {
    const dataToSend = TransformCategories(data)

    const response: { data: CategoriesDataSchema; status: number } =
      await api.put(`/categories/${data.id}`, dataToSend)

    if (response.status === 200) {
      response.data = data
    }

    return response
  },

  delete: async (id: string) => {
    const response: any = await api.delete(`/categories/${id}`)

    return response
  },
}

export default CategoriesService
