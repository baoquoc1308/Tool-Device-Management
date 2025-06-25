import { FilterAssets } from '@/features/assets/view-all-assets/_components'
import type { FilterType } from '@/features/assets/view-all-assets'
import type { AssetsType } from '@/features/assets/view-all-assets/model'

interface DashboardFilterProps {
  filteredAssets: FilterType
  setFilteredAssets: React.Dispatch<React.SetStateAction<FilterType>>
  assets: AssetsType[]
}

export const DashboardFilter = ({ filteredAssets, setFilteredAssets, assets }: DashboardFilterProps) => {
  return (
    <div className='mb-6'>
      <FilterAssets
        filteredAssets={filteredAssets}
        setFilteredAssets={setFilteredAssets}
        assets={assets}
      />
    </div>
  )
}
