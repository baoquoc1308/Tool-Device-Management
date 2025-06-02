import { Button } from '@/components/ui'
import { X } from 'lucide-react'

export function ClearFilterButton({
  setStatusFilter,
}: {
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <div className='flex items-end'>
      <Button
        variant='outline'
        size='sm'
        className='flex gap-1'
        onClick={() => setStatusFilter('')}
      >
        <X className='h-4 w-4' />
        Clear Filters
      </Button>
    </div>
  )
}
