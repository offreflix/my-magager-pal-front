import React from 'react'
import { LoginForm } from '../_components/login-form'
import { cookies } from 'next/headers'

type Props = {}

function page({}: Props) {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <LoginForm />
    </div>
  )
}

export default page
