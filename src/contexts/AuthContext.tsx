'use client'

import AuthService from '@/services/auth/auth-service'
import { createContext, useEffect, useState } from 'react'
import { ReactNode } from 'react'

import { useRouter } from 'next/navigation'
import { SetCookie } from './SetCookie'
import { toast } from 'sonner'
import { set } from 'zod'

interface AuthContextProps {
  isAuthenticated: boolean
  user: User | null
  signIn: (data: SignInData) => Promise<any>
}

interface SignInData {
  username: string
  password: string
}

interface User {
  username: string
  email: string
  name: string
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  async function getUser() {
    try {
      const response = await AuthService.getProfile()

      setUser(response.data)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/auth/login')
      }
    }
  }, [isAuthenticated, loading, router])

  async function signIn({ username, password }: SignInData) {
    const response = await AuthService.signIn({ username, password })

    SetCookie('myManagerPal.token', response.data.access_token, {
      maxAge: 60 * 60 * 1, // 1 hour
      httpOnly: true,
      secure: true,
    })

    toast.success('Login successful!')

    router.push('/categories')

    return response
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
