import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import type { AssignmentData } from '../../get-all-assignments/model'
export const AssignmentUserAssign = ({ assignmentDetail }: { assignmentDetail: AssignmentData }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='font-medium'>Assigned To</TableCell>
          <TableCell>
            <div className='flex items-center gap-2'>
              <span>
                {assignmentDetail.userAssigned.lastName} {assignmentDetail.userAssigned.firstName}
              </span>
            </div>
          </TableCell>
          <TableCell>{assignmentDetail.userAssigned.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>Assigned By</TableCell>
          <TableCell>
            <span>
              {assignmentDetail.userAssign.firstName} {assignmentDetail.userAssign.lastName}
            </span>
          </TableCell>
          <TableCell>{assignmentDetail.userAssign.email}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
