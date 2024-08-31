import { Skeleton } from './ui/skeleton'
import { TableCell, TableRow } from './ui/table'

interface SkeletonRowInterface {
  row: number
  data: number
  action?: boolean
}

function SkeletonRow({ row, data, action }: SkeletonRowInterface) {
  return (
    <>
      {Array.from({ length: row }).map((_, i) => (
        <TableRow key={i}>
          {action && (
            <TableCell className="py-2">
              <Skeleton className="h-8 w-8" />
            </TableCell>
          )}

          {Array.from({ length: data }).map((_, i) => (
            <TableCell key={i} className="py-2">
              <Skeleton className="h-8" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default SkeletonRow
