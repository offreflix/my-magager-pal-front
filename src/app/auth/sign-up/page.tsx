import React from 'react'
import { SignUpForm } from '../_components/sign-up-form'

type Props = {}

function page({}: Props) {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <SignUpForm />
    </div>
  )
}

export default page
