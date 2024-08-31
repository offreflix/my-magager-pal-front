import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'

import React, { useContext } from 'react'
import { PlusCircle, XCircle } from '@phosphor-icons/react'
import { Context } from '../../_context'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table?.getState()?.columnFilters?.length > 0
  const { setCreateModalIsOpen, form, defaultValues } = useContext(Context)

  return (
    <div className="mb-2">
      <div className="flex w-full py-2 justify-between items-center">
        <h1 className="text-2xl font-bold">Usuários</h1>

        <Button
          onClick={() => {
            setCreateModalIsOpen(true)
            form.reset(defaultValues)
          }}
          size="sm"
          className="h-7 gap-1"
        >
          <PlusCircle weight="regular" className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Organização
          </span>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder={'Filtrar...'}
            value={
              (table.getColumn('nickname')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('nickname')?.setFilterValue(event.target.value)
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
