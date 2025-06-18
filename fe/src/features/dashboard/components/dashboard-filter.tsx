import { FilterAssets } from '@/features/assets/view-all-assets/_components'
import type { FilterType } from '@/features/assets/view-all-assets'

interface DashboardFilterProps {
  filteredAssets: FilterType
  setFilteredAssets: React.Dispatch<React.SetStateAction<FilterType>>
}

export const DashboardFilter = ({ filteredAssets, setFilteredAssets }: DashboardFilterProps) => {
  return (
    <div className='mb-6'>
      <FilterAssets
        filteredAssets={filteredAssets}
        setFilteredAssets={setFilteredAssets}
      />
    </div>
  )
}
