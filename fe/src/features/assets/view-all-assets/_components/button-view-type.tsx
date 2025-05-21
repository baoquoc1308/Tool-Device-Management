import { Button } from '@/components'
import { LayoutGridIcon, TableIcon } from 'lucide-react'

export const ButtonViewType = ({
  viewMode,
  setViewMode,
}: {
  viewMode: string
  setViewMode: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <div className='mb-4 flex items-center justify-end space-x-2'>
      <div className='text-muted-foreground text-sm'>View as:</div>
      <Button
        variant={viewMode === 'table' ? 'default' : 'outline'}
        size='sm'
        onClick={() => setViewMode('table')}
        className='h-8 w-8 p-0'
      >
        <TableIcon className='h-4 w-4' />
      </Button>
      <Button
        variant={viewMode === 'cards' ? 'default' : 'outline'}
        size='sm'
        onClick={() => setViewMode('cards')}
        className='h-8 w-8 p-0'
      >
        <LayoutGridIcon className='h-4 w-4' />
      </Button>
    </div>
  )
}


