import type { FilterType } from '../../assets/view-all-assets/model'
import type { AssetsType } from '../../assets/view-all-assets/model'
import { FilterAssets } from '../../assets/view-all-assets/_components/filter/filter-assets'

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
