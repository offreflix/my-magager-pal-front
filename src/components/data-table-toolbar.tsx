import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import React, { useContext } from 'react'
import { PlusCircle, XCircle } from '@phosphor-icons/react'
import { DataTableViewOptions } from '@/components/data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  title: string
  filterValue: string
  children?: React.ReactNode
}

export function DataTableToolbar<TData>({
  table,
  title,
  filterValue,
  children,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table?.getState()?.columnFilters?.length > 0

  return (
    <div className="mb-2">
      <div className="flex w-full py-2 justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>

        {children}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder={'Filtrar...'}
            value={
              (table.getColumn(filterValue)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(filterValue)?.setFilterValue(event.target.value)
            }
            className="w-[150px] lg:w-[250px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="px-2 lg:px-3"
            >
              Resetar
              <XCircle weight="regular" className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

interface DataTableToolbarButtonsProps {
  addText: string
  openModalFn: () => void
}

export function DataTableToolbarButtons({
  openModalFn,
  addText,
}: DataTableToolbarButtonsProps) {
  return (
    <div className="flex space-x-2">
      <Button onClick={openModalFn} size="sm" className="h-7 gap-1">
        <PlusCircle weight="regular" className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          {addText}
        </span>
      </Button>
    </div>
  )
}
