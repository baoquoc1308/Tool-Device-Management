import { Input } from '@/components'
import type { FilterType } from '../../../model'
import { Search } from 'lucide-react'

export const AssetNameInputFilter = ({
  filteredAssets,
  setFilteredAssets,
}: {
  filteredAssets: FilterType
  setFilteredAssets: React.Dispatch<React.SetStateAction<FilterType>>
}) => {
  return (
    <div className='relative flex-grow'>
      <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
      <Input
        placeholder='Search assets...'
        className='pl-8'
        value={filteredAssets.assetName || ''}
        onChange={(e) => setFilteredAssets({ ...filteredAssets, assetName: e.target.value })}
      />
    </div>
  )
}
