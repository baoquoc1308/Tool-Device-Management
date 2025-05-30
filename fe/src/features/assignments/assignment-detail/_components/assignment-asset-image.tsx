import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import type { AssignmentData } from '../../get-all-assignments/model'

export const AssignmentAssetImage = ({ assignmentDetail }: { assignmentDetail: AssignmentData }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='col-span-1 space-y-2 md:col-span-2'>
      <p className='text-muted-foreground text-sm'>Asset Image</p>
      <div className='relative h-64 w-full max-w-md'>
        {isLoading && <Skeleton className='absolute inset-0 h-full w-full rounded-md' />}
        <img
          src={assignmentDetail.asset.imageUpload}
          alt={assignmentDetail.asset.assetName}
          className='h-full w-full max-w-md rounded-md object-contain'
          style={{ display: isLoading ? 'none' : 'block' }}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>
    </div>
  )
}
