'use server'

import { cookies } from 'next/headers'

export const SetCookie = (name: string, value: string, options: any) => {
  cookies().set({
    name: name,
    value: value,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  })

  console.log('Name: ', name)
  console.log('Value: ', value)
}
