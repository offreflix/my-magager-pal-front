'use server'

import { cookies } from 'next/headers'
import { api } from '../api'

export const GetCookie = async (value: string) => {
  return cookies().get(value)?.value
}
