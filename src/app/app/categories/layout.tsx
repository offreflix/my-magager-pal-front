import Header from '@/components/header'

import { Separator } from '@/components/ui/separator'

import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <Separator />

      <main>{children}</main>
    </>
  )
}
