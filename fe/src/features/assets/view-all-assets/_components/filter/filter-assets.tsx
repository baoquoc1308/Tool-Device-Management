import React from 'react'
import { Button } from '@/components/ui'
import { FilterX } from 'lucide-react'
import type { FilterType } from '../../model'
import type { AssetsType } from '../../model'
import { ExportAssets } from '@/components/ui/export/export-assets'

import { AssetNameInputFilter, CategoriesFilter, DepartmentsFilter, StatusFilter } from './_components'

export const FilterAssets = ({
  filteredAssets,
  setFilteredAssets,
  assets,
  showExportButtons = false,
}: {
  filteredAssets: FilterType
  setFilteredAssets: React.Dispatch<React.SetStateAction<FilterType>>
  assets: AssetsType[]
  showExportButtons?: boolean
}) => {
  const resetFilters = () => {
    setFilteredAssets({
      assetName: '',
      categoryId: null,
      departmentId: null,
      status: null,
    })
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between'>
        <AssetNameInputFilter
          filteredAssets={filteredAssets}
          setFilteredAssets={setFilteredAssets}
        />

        <CategoriesFilter
          filteredAssets={filteredAssets}
          setFilteredAssets={setFilteredAssets}
        />

        <DepartmentsFilter
          filteredAssets={filteredAssets}
          setFilteredAssets={setFilteredAssets}
        />

        <StatusFilter
          filteredAssets={filteredAssets}
          setFilteredAssets={setFilteredAssets}
        />

        <div className='flex gap-2'>
          <Button
            disabled={
              !filteredAssets.assetName &&
              !filteredAssets.categoryId &&
              !filteredAssets.departmentId &&
              !filteredAssets.status
            }
            variant='outline'
            onClick={resetFilters}
            className='gap-2'
          >
            <FilterX className='h-4 w-4' />
            Clear filters
          </Button>
          {showExportButtons && (
            <ExportAssets
              assets={assets}
              type='all-assets'
            />
          )}
        </div>
      </div>
    </div>
  )
}
