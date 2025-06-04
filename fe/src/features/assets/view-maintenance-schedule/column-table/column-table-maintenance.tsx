import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Badge, Button } from '@/components/ui'
import { Link } from 'react-router-dom'
import type { MaintenanceSchedule } from '../model'
export const columnTableMaintenance: ColumnDef<MaintenanceSchedule>[] = [
  {
    accessorKey: 'asset.assetName',
    header: 'Asset Name',
    cell: ({ row }) => (
      <div>
        <div className='font-medium'>{row.original.asset.assetName}</div>
        <div className='text-muted-foreground text-xs'>ID: {row.original.asset.id}</div>
      </div>
    ),
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => format(new Date(row.original.startDate), 'MM/dd/yyyy'),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => format(new Date(row.original.endDate), 'MM/dd/yyyy'),
  },
  {
    accessorKey: 'asset.status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant='outline'
        className={
          row.original.asset.status === 'New'
            ? 'border-green-200 bg-green-100 text-green-800'
            : row.original.asset.status === 'In Use'
              ? 'border-blue-200 bg-blue-100 text-blue-800'
              : row.original.asset.status === 'Under Maintenance'
                ? 'border-yellow-200 bg-yellow-100 text-yellow-800'
                : 'border-red-200 bg-red-100 text-red-800'
        }
      >
        {row.original.asset.status}
      </Badge>
    ),
  },
  {
    id: 'duration',
    header: 'Duration',
    cell: ({ row }) => {
      const startDate = new Date(row.original.startDate)
      const endDate = new Date(row.original.endDate)
      const daysDiff = Math.ceil(endDate.getTime() - startDate.getTime()) / 86400000
      return `${daysDiff} days`
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <Button
        variant='outline'
        size='sm'
        asChild
      >
        <Link to={`/assets/${row.original.asset.id}`}>View Asset</Link>
      </Button>
    ),
  },
]
