'use client'

import { navLinks, registerLinks } from '@/config/navigation'
import { cn } from '@/lib/utils'

import { Package2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

type Props = {}

function NavLinks({}: Props) {
  const pathname = usePathname()

  return (
    <nav className="grid text-lg font-medium">
      <Link
        href="#"
        className="group flex h-10 w-10 shrink-0 items-center mb-2 justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
      >
        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
        <span className="sr-only">iMonitor</span>
      </Link>
      <div className="space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)

          return (
            <Link
              key={link.title}
              href={link.href}
              className={cn(
                'transition flex items-center gap-4 text-sm hover:bg-neutral-200 hover:dark:bg-neutral-900 p-2.5 rounded-sm text-muted-foreground hover:text-foreground',
                isActive && 'text-foreground bg-neutral-200 dark:bg-neutral-900'
              )}
            >
              {link.icon}
              {link.title}
            </Link>
          )
        })}
      </div>

      {registerLinks.map((link) => {
        const isActive = pathname.startsWith(link.href)

        return (
          <Link
            key={link.title}
            href={link.href}
            className={cn(
              'transition flex items-center gap-4 text-sm hover:bg-neutral-200 hover:dark:bg-neutral-900 p-2.5 rounded-sm text-muted-foreground hover:text-foreground',
              isActive && 'text-foreground bg-neutral-200 dark:bg-neutral-900'
            )}
          >
            {link.icon}
            {link.title}
          </Link>
        )
      })}
    </nav>
  )
}

export default NavLinks
