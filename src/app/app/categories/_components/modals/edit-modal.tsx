'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useContext } from 'react'
import { Context } from '../../_context'
import { Form } from '@/components/ui/form'

import { FormFields } from './form-fields'

export function EditModal() {
  const {
    editForm: form,
    onUpdate,
    editModalIsOpen,
    setEditModalIsOpen,
  } = useContext(Context)

  return (
    <Dialog open={editModalIsOpen} onOpenChange={setEditModalIsOpen}>
      <DialogContent
        className="max-h-[80%] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onUpdate)}>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>

            <FormFields form={form} />

            <DialogFooter className="pt-4">
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
