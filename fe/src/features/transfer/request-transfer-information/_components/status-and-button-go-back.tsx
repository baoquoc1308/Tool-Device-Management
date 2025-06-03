import { Button, Badge } from '@/components/ui'
import { ArrowLeft } from 'lucide-react'
import type { RequestTransferType } from '../../all-request-transfer/model'
import { cn } from '@/lib'
import { useNavigate } from 'react-router-dom'

export const StatusAndButtonGoBack = ({ requestTransfer }: { requestTransfer: RequestTransferType }) => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => navigate('/transfers')}
        className='w-fit'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back to Requests
      </Button>
      <div className='flex items-center gap-2'>
        <span className='text-muted-foreground'>Request ID:</span>
        <span className='font-semibold'>#{requestTransfer.id}</span>
        <Badge
          variant='outline'
          className={cn(
            'ml-4 flex items-center gap-1',
            requestTransfer.status === 'Pending' && 'border-yellow-100 bg-yellow-100 text-yellow-800',
            requestTransfer.status === 'Confirm' && 'border-green-200 bg-green-100 text-green-800',
            requestTransfer.status === 'Deny' && 'border-red-200 bg-red-100 text-red-800'
          )}
        >
          {requestTransfer.status}
        </Badge>
      </div>
    </div>
  )
}
