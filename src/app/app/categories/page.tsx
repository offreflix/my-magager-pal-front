'use client'

import DataTable from './_components/tables/DataTable'
import BookingProvider from './_context'
import { CreateModal } from './_components/modals/create-modal'
import { EditModal } from './_components/modals/edit-modal'
import { DeleteModal } from './_components/modals/delete-modal'

function Booking() {
  return (
    <BookingProvider>
      <CreateModal />

      <DeleteModal />

      <EditModal />

      <DataTable />
    </BookingProvider>
  )
}

export default Booking
