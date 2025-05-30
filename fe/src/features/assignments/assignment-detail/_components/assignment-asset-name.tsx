import type { AssignmentData } from '../../get-all-assignments/model'

export const AssignmentAssetName = ({ assignmentDetail }: { assignmentDetail: AssignmentData }) => {
  return (
    <div className='space-y-2'>
      <p className='text-muted-foreground text-sm'>Asset Name</p>
      <p className='font-medium'>{assignmentDetail.asset.assetName}</p>
    </div>
  )
}
