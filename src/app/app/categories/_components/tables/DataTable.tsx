import React, { useContext, useState } from 'react'

import { columns } from './columns'
import { v4 as uuidv4 } from 'uuid'

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table'

import {
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { Context } from '../../_context'
import SkeletonRow from '@/components/skeleton-row'
import {
  DataTableToolbar,
  DataTableToolbarButtons,
} from '@/components/data-table-toolbar'
import { CategoriesDataSchema } from '@/shared/schemas/categories/categories-schema'

function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const { categoriessQuery, openModalFn } = useContext(Context)

  const { data, isLoading, isError } = categoriessQuery as {
    data: CategoriesDataSchema[]
    isLoading: boolean
    isError: boolean
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      columnVisibility: {
        transitTime: false,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="mx-6">
      <div className="rounded">
        <div>
          <DataTableToolbar table={table} title="Categories" filterValue="name">
            <DataTableToolbarButtons
              addText="Add Category"
              openModalFn={openModalFn}
            />
          </DataTableToolbar>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={uuidv4()}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={uuidv4()}
                      className={header.id === 'actions' ? 'w-0' : ''}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="overflow-scroll">
            {isLoading && (
              <SkeletonRow
                data={table.getVisibleFlatColumns().length}
                row={10}
              />
            )}

            {isError && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Erro ao carregar dados...
                </TableCell>
              </TableRow>
            )}

            {!isError && !isLoading && table?.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={uuidv4()}
                    data-state={row.getIsSelected() && 'selected'}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={uuidv4()}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : !isError &&
                !isLoading && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Sem Resultados...
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>

      {/* {!isLoading && (
        <div className="flex items-center justify-end space-x-2 py-4 sticky bottom-0 bg-neutral-100 dark:bg-primary-bg px-2">
          <DataTablePaginationDashboard
            table={table}
            totalData={totalData}
            page={page}
            changePage={changePage}
          />
        </div>
      )} */}
    </div>
  )
}

export default DataTable
