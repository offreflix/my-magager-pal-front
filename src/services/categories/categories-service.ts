import { api } from '../api'
import { GetCookie } from './GetCookie'

interface findAllResponse {
  data: Array<{
    id: number
    name: string
    _count: {
      transactions: number
    }
    createdAt: Date
    updatedAt: Date
  }>
}

const CategoriesService = {
  findAll: async () => {
    console.log(await GetCookie('myManagerPal.token'))

    const response: findAllResponse = await api.get('/categories')

    console.log(response)

    return response.data
  },
}

export default CategoriesService
