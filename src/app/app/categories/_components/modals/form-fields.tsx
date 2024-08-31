import { ComboboxSelect } from '@/components/combobox-select'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React, { useContext } from 'react'
import { Context } from '../../_context'

type Props = {
  form: any
}

export function FormFields({ form }: Props) {
  const { types } = useContext(Context)

  return (
    <>
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="flex flex-col pt-2">
            <FormLabel>Name</FormLabel>
            <ComboboxSelect
              field={field}
              form={form}
              options={types}
              value="type"
              text="Tipo"
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
