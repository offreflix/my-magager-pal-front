import { z } from 'zod'
import { api } from '../api'
import { CreateUserSchema } from '@/types/user'

interface SignInParams {
  username: string
  password: string
}

interface SignInResponse {
  data: { access_token: string }
}

interface User {
  data: {
    id: number
    name: string
    email: string
    username: string
    updatedAt: string
    createdAt: string
  }
}

const AuthService = {
  signIn: async (data: SignInParams) => {
    const response: SignInResponse = await api.post('/auth/login', data)

    return response
  },

  signUp: async (data: z.infer<typeof CreateUserSchema>) => {
    const response: SignInResponse = await api.post('/auth/sign-up', data)

    return response
  },

  signOut: async () => {
    return api.post('/auth/logout')
  },

  getProfile: async () => {
    const response: User = await api.get('/auth/profile')
    console.log('response', response)
    return response
  },
}

export default AuthService
