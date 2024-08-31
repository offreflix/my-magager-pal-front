import { DataTableColumnHeader } from './data-table-column-header'
import React, { useContext } from 'react'
import { ColumnDef, Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Context } from '../../_context'
import { CategoriesDataSchema } from '@/shared/schemas/categories/categories-schema'
import { Badge } from '@/components/ui/badge'

export const DropdownMenuActions = ({ row }: { row: CategoriesDataSchema }) => {
  const {
    setDeleteModalIsOpen,
    setEditModalIsOpen,
    editForm: form,
    setDeleteId,
  } = useContext(Context)

  return (
    <>
      <DropdownMenuItem
        onClick={() => {
          setEditModalIsOpen(true)
          form.reset(row)
        }}
      >
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => {
          setDeleteModalIsOpen(true)
          setDeleteId(row.id)
        }}
      >
        Delete
      </DropdownMenuItem>
    </>
  )
}

export const columns: ColumnDef<CategoriesDataSchema>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[30rem] truncate font-medium">
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },

  {
    accessorKey: '_count.transactions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="In use?" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[30rem] truncate font-medium">
            {row.original._count.transactions > 0 ? (
              <Badge>Yes</Badge>
            ) : (
              <Badge>No</Badge>
            )}
          </span>
        </div>
      )
    },
  },

  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[30rem] truncate font-medium">
            {new Date(row.getValue('createdAt')).toLocaleDateString()}
          </span>
        </div>
      )
    },
  },

  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[30rem] truncate font-medium">
            {row.getValue('description')}
          </span>
        </div>
      )
    },
  },

  {
    id: 'actions',
    header: () => (
      <span className="text-xs flex justify-center items-center">Actions</span>
    ),
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuActions row={row.original} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
