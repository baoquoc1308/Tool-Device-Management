import { Button } from '@/components'
import { FilterX } from 'lucide-react'
import type { FilterData } from '../model'
export const ButtonClearFilter = ({
  filters,
  setFilters,
}: {
  filters: FilterData
  setFilters: React.Dispatch<React.SetStateAction<FilterData>>
}) => {
  const resetFilters = () => {
    setFilters({
      assetName: '',
      emailAssign: '',
      emailAssigned: '',
    })
  }
  return (
    <Button
      disabled={!filters.assetName && !filters.emailAssign && !filters.emailAssigned}
      variant='outline'
      onClick={resetFilters}
      className='gap-2'
    >
      <FilterX className='h-4 w-4' />
      Clear filters
    </Button>
  )
}
