import Sidebar from '@/components/sidebar'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />

      <div className="flex flex-col sm:gap-4 sm:pb-4 sm:pl-14">
        <main>{children}</main>
      </div>
    </>
  )
}
