import type { AssetsType } from '@/features/assets/view-all-assets/model'
import type { ComparisonAsset } from '@/features/assets/asset-comparison/model'

type ExportAsset = AssetsType | ComparisonAsset

interface ExportConfig {
  type: 'comparison' | 'all-assets'
  filename?: string
}

const formatDateForCSV = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return '-'

  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '-'

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  } catch {
    return '-'
  }
}

const normalizeAssetForCSV = (asset: ExportAsset, type: 'comparison' | 'all-assets') => {
  if (type === 'comparison') {
    const compAsset = asset as ComparisonAsset
    return {
      id: compAsset.id,
      assetName: compAsset.assetName,
      serialNumber: compAsset.serialNumber,
      cost: compAsset.cost,
      categoryName: compAsset.category.categoryName,
      departmentName: compAsset.department.departmentName,
      locationAddress: compAsset.location.locationAddress || '-',
      status: compAsset.status,
      purchaseDate: formatDateForCSV(compAsset.purchaseDate),
      warrantExpiry: formatDateForCSV(compAsset.warrantExpiry),
    }
  } else {
    const allAsset = asset as AssetsType
    return {
      id: allAsset.id,
      assetName: allAsset.assetName,
      serialNumber: allAsset.serialNumber,
      cost: allAsset.cost,
      categoryName: allAsset.category?.categoryName || 'N/A',
      departmentName: allAsset.department?.departmentName || 'N/A',
      locationAddress: allAsset.department?.location?.locationAddress || 'N/A',
      status: allAsset.status,
      purchaseDate: formatDateForCSV(allAsset.purchaseDate),
      warrantExpiry: formatDateForCSV(allAsset.warrantExpiry),
    }
  }
}

export const exportToCSV = (assets: ExportAsset[], config: ExportConfig) => {
  const { type, filename } = config
  const normalizedAssets = assets.map((asset) => normalizeAssetForCSV(asset, type))

  const headers =
    type === 'comparison'
      ? [
          'Asset Name',
          'Serial Number',
          'Cost',
          'Category',
          'Department',
          'Location',
          'Status',
          'Purchase Date',
          'Warranty Expiry',
        ]
      : [
          'ID',
          'Asset Name',
          'Serial Number',
          'Cost',
          'Category',
          'Department',
          'Location',
          'Status',
          'Purchase Date',
          'Warranty Expiry',
        ]

  const csvContent = [
    headers.join(','),
    ...normalizedAssets.map((asset) => {
      const row =
        type === 'comparison'
          ? [
              `"${asset.assetName}"`,
              `"${asset.serialNumber}"`,
              asset.cost,
              `"${asset.categoryName}"`,
              `"${asset.departmentName}"`,
              `"${asset.locationAddress}"`,
              `"${asset.status}"`,
              asset.purchaseDate,
              asset.warrantExpiry,
            ]
          : [
              asset.id,
              `"${asset.assetName}"`,
              `"${asset.serialNumber}"`,
              asset.cost,
              `"${asset.categoryName}"`,
              `"${asset.departmentName}"`,
              `"${asset.locationAddress}"`,
              `"${asset.status}"`,
              asset.purchaseDate,
              asset.warrantExpiry,
            ]
      return row.join(',')
    }),
  ].join('\n')

  const filePrefix = filename || (type === 'comparison' ? 'asset-comparison' : 'assets-report')

  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filePrefix}-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
