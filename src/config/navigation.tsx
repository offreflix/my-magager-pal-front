import { House, Tag } from '@phosphor-icons/react'

const IconClass = 'h-5 w-5'
const IconWeight = 'bold'

export const navLinks = [
  {
    title: 'Dashboard',
    href: '/app/dashboard',
    icon: <House className={IconClass} weight={IconWeight} />,
  },
]

export const registerLinks = [
  {
    title: 'Categorias',
    href: '/app/categories',
    icon: <Tag className={IconClass} weight={IconWeight} />,
  },
]
