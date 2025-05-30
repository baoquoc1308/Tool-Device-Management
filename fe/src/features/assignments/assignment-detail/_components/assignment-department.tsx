import type { AssignmentData } from '../../get-all-assignments/model'
import { MapPin } from 'lucide-react'

export const AssignmentDepartment = ({ assignmentDetail }: { assignmentDetail: AssignmentData }) => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      <div className='space-y-2'>
        <p className='text-muted-foreground text-sm'>Department</p>
        <p className='font-medium'>{assignmentDetail.department.departmentName}</p>
      </div>

      <div className='space-y-2'>
        <p className='text-muted-foreground text-sm'>Location</p>
        <p className='flex items-center gap-1 font-medium'>
          <MapPin className='h-4 w-4' />
          {assignmentDetail.department.location.locationAddress}
        </p>
      </div>
    </div>
  )
}
