'use client'

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { ReactNode } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  CategoriesDataSchema,
  CategoriesSchema,
  categoriesSchema,
  TransformCategories,
  categoriesDataSchema,
} from '@/shared/schemas/categories/categories-schema'
import CategoriesService from '@/infra/services/categories/categories-service'

interface ContextProps {
  form: UseFormReturn<CategoriesSchema>
  editForm: UseFormReturn<z.infer<typeof categoriesDataSchema>>
  onCreate: (data: CategoriesSchema) => void
  createModalIsOpen: boolean
  setCreateModalIsOpen: (value: boolean) => void
  defaultValues: Omit<CategoriesSchema, 'role'>
  categoriessQuery: UseQueryResult<Array<CategoriesDataSchema>>
  openModalFn: () => void
  editModalIsOpen: boolean
  setEditModalIsOpen: (value: boolean) => void
  onUpdate: (data: z.infer<typeof categoriesDataSchema>) => void
  deleteModalIsOpen: boolean
  setDeleteModalIsOpen: (value: boolean) => void
  deleteId: string
  setDeleteId: (value: string) => void
  onDelete: (id: string) => void
  types: Array<{ label: string; value: string }>
}

export const Context = createContext({} as ContextProps)

function CategoriesProvider({ children }: { children: ReactNode }) {
  const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<string>('')

  const categoriessQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoriesService.findAll(),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation<CategoriesSchema, AxiosError, CategoriesSchema>({
    mutationFn: CategoriesService.create,

    onSuccess: (_, variables) => {
      const transformedVariables = TransformCategories(variables)

      queryClient.setQueryData(
        ['categories'],
        (data: Array<CategoriesDataSchema>) => {
          return [...data, { ...transformedVariables }]
        }
      )

      toast.success('Cliente criado com sucesso')
      setCreateModalIsOpen(false)
    },

    onError: (e) => {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.message)
    },
  })

  type EditMutationData = {
    data: CategoriesDataSchema
  }

  const editMutation = useMutation<
    EditMutationData,
    AxiosError,
    CategoriesDataSchema
  >({
    mutationFn: CategoriesService.edit,

    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ['categories'],
        (data: Array<CategoriesDataSchema>) => {
          const newData = data.map((categories) => {
            if (categories.id === variables.id) {
              return { ...variables }
            }
            return categories
          })

          return [...newData]
        }
      )

      toast.success('Cliente editado com sucesso')
      setEditModalIsOpen(false)
    },

    onError: (e) => {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.message)
    },
  })

  const deleteMutation = useMutation<string, AxiosError, string>({
    mutationFn: CategoriesService.delete,

    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ['categories'],
        (data: Array<CategoriesDataSchema>) => {
          const updatedData = data.filter((item) => item.id !== variables)

          return updatedData
        }
      )

      toast.success('Cliente editado com sucesso')
      setDeleteModalIsOpen(false)
    },

    onError: (e) => {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.message)
    },
  })

  function openModalFn() {
    setCreateModalIsOpen(true)
    form.reset(defaultValues)
  }

  const defaultValues = {
    name: '',
  }

  const form = useForm<CategoriesSchema>({
    resolver: zodResolver(categoriesSchema),
    defaultValues,
  })

  const editForm = useForm<z.infer<typeof categoriesDataSchema>>({
    resolver: zodResolver(categoriesDataSchema),
  })

  function onCreate(data: CategoriesSchema) {
    mutation.mutate(data)
  }

  function onUpdate(data: z.infer<typeof categoriesDataSchema>) {
    editMutation.mutate(data)
  }

  function onDelete(id: string) {
    deleteMutation.mutate(id)
  }

  const types = [{ label: 'TESTE', value: 'TESTE' }]

  return (
    <Context.Provider
      value={{
        setDeleteModalIsOpen,
        setCreateModalIsOpen,
        setEditModalIsOpen,
        deleteModalIsOpen,
        createModalIsOpen,
        editModalIsOpen,
        defaultValues,
        openModalFn,
        setDeleteId,
        categoriessQuery,
        deleteId,
        onUpdate,
        editForm,
        onDelete,
        onCreate,
        types,
        form,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default CategoriesProvider
