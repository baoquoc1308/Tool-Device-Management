import { Badge } from '@/components'
import { cn } from '@/lib'
import type { AssignmentData } from '../../get-all-assignments/model'
export const AssignmentAssetStatus = ({ assignmentDetail }: { assignmentDetail: AssignmentData }) => {
  return (
    <div className='space-y-2'>
      <p className='text-muted-foreground text-sm'>Status</p>
      <Badge
        variant='outline'
        className={cn(
          'flex items-center',
          assignmentDetail.asset.status === 'New' && 'border-green-200 bg-green-100 text-green-800',
          assignmentDetail.asset.status === 'In Use' && 'border-blue-200 bg-blue-100 text-blue-800',
          assignmentDetail.asset.status === 'Under Maintenance' && 'border-amber-200 bg-amber-100 text-amber-800',
          assignmentDetail.asset.status === 'Retired' && 'border-slate-200 bg-slate-100 text-slate-800',
          assignmentDetail.asset.status === 'Disposed' && 'border-red-200 bg-red-100 text-red-800'
        )}
      >
        {assignmentDetail.asset.status}
      </Badge>
    </div>
  )
}
