import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { AssetSelector } from './_components/asset-selector'
import { ComparisonHeader } from './_components/comparison-header'
import { ComparisonTable } from './_components/comparison-table'
import { useQuery } from '@tanstack/react-query'
import { getDataAssetsFilter } from '../api'
import type { ComparisonAsset } from './model'
import type { AssetsType } from '../view-all-assets'

export const AssetComparison = () => {
  const [selectedAssets, setSelectedAssets] = useState<ComparisonAsset[]>([])

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ['assets-for-comparison'],
    queryFn: () =>
      getDataAssetsFilter({
        assetName: '',
        categoryId: null,
        departmentId: null,
        status: null,
      }),
  })

  const allAssets = apiResponse?.data || []

  const toISOStringSafe = (date: any): string => {
    if (!date) return ''
    if (typeof date === 'string') return date
    if (date instanceof Date) return date.toISOString()
    return new Date(date).toISOString()
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const assetIds = urlParams.get('assets')?.split(',').map(Number) || []

    if (assetIds.length > 0 && Array.isArray(allAssets) && allAssets.length > 0) {
      const assetsToCompare = (allAssets as AssetsType[])
        .filter((asset: AssetsType) => assetIds.includes(asset.id))
        .map(
          (asset) =>
            ({
              id: asset.id,
              assetName: asset.assetName,
              serialNumber: asset.serialNumber,
              cost: asset.cost,
              purchaseDate: toISOStringSafe(asset.purchaseDate),
              warrantExpiry: toISOStringSafe(asset.warrantExpiry),
              imageUpload: asset.imageUpload,
              status: asset.status,
              category: asset.category,
              department: asset.department,
              location: asset.department.location,
            }) as ComparisonAsset
        )

      setSelectedAssets(assetsToCompare)
    }
  }, [allAssets])

  const handleAssetSelect = (asset: ComparisonAsset) => {
    if (selectedAssets.length >= 4) {
      toast.error('Maximum 4 assets can be compared')
      return
    }
    setSelectedAssets((prev) => [...prev, asset])
  }

  const handleAssetRemove = (assetId: number) => {
    setSelectedAssets((prev) => prev.filter((asset) => asset.id !== assetId))
  }

  const handleClearAll = () => {
    setSelectedAssets([])
    const url = new URL(window.location.href)
    url.searchParams.delete('assets')
    window.history.replaceState({}, '', url.toString())
  }

  if (isLoading) {
    return (
      <div className='container mx-auto space-y-4 px-4 py-6 sm:space-y-6'>
        <div className='animate-pulse space-y-4'>
          <div className='bg-muted h-6 w-48 rounded sm:h-8 sm:w-64'></div>
          <div className='bg-muted h-3 w-64 rounded sm:h-4 sm:w-96'></div>
          <div className='bg-muted h-24 rounded sm:h-32'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto space-y-4 px-4 py-4 sm:space-y-6 sm:py-6'>
      <ComparisonHeader
        assetCount={selectedAssets.length}
        onClear={handleClearAll}
        selectedAssets={selectedAssets}
      />

      <AssetSelector
        availableAssets={Array.isArray(allAssets) ? allAssets : []}
        selectedAssets={selectedAssets}
        onAssetSelect={handleAssetSelect}
        onAssetRemove={handleAssetRemove}
      />

      <ComparisonTable assets={selectedAssets} />
    </div>
  )
}

export default AssetComparison
