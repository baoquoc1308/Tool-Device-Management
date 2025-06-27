import type { AssetsType } from '@/features/assets/view-all-assets/model'
import type { ComparisonAsset } from '@/features/assets/asset-comparison/model'

type ExportAsset = AssetsType | ComparisonAsset

interface ExportConfig {
  type: 'comparison' | 'all-assets'
  filename?: string
}

const formatDateForDisplay = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return '-'

  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '-'
    return date.toLocaleDateString()
  } catch {
    return '-'
  }
}

const normalizeAssetForHTML = (asset: ExportAsset, type: 'comparison' | 'all-assets') => {
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
      purchaseDate: formatDateForDisplay(compAsset.purchaseDate),
      warrantExpiry: formatDateForDisplay(compAsset.warrantExpiry),
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
      purchaseDate: formatDateForDisplay(allAsset.purchaseDate),
      warrantExpiry: formatDateForDisplay(allAsset.warrantExpiry),
    }
  }
}

const generateComparisonHTML = (normalizedAssets: ReturnType<typeof normalizeAssetForHTML>[], reportTitle: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${reportTitle}</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f5f5f5; font-weight: bold; }
          .currency { font-weight: bold; color: #059669; }
          .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          .status-new { background-color: #dcfce7; color: #166534; }
          .status-in-use { background-color: #f3f4f6; color: #374151; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${reportTitle}</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Field</th>
              ${normalizedAssets.map((asset) => `<th>${asset.assetName}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Serial Number</strong></td>
              ${normalizedAssets.map((asset) => `<td>${asset.serialNumber}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Cost</strong></td>
              ${normalizedAssets.map((asset) => `<td class="currency">$${asset.cost.toLocaleString()}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Category</strong></td>
              ${normalizedAssets.map((asset) => `<td>${asset.categoryName}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Department</strong></td>
              ${normalizedAssets.map((asset) => `<td>${asset.departmentName}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Status</strong></td>
              ${normalizedAssets.map((asset) => `<td><span class="status status-${asset.status.toLowerCase().replace(' ', '-')}">${asset.status}</span></td>`).join('')}
            </tr>
            <tr>
              <td><strong>Purchase Date</strong></td>
              ${normalizedAssets.map((asset) => `<td>${asset.purchaseDate}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Warranty Expiry</strong></td>
              ${normalizedAssets.map((asset) => `<td>${asset.warrantExpiry}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Location</strong></td>
              ${normalizedAssets.map((asset) => `<td>${asset.locationAddress}</td>`).join('')}
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `
}

const generateAllAssetsHTML = (normalizedAssets: ReturnType<typeof normalizeAssetForHTML>[], reportTitle: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${reportTitle}</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f5f5f5; font-weight: bold; }
          .currency { font-weight: bold; color: #059669; }
          .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          .status-new { background-color: #dcfce7; color: #166534; }
          .status-in-use { background-color: #f3f4f6; color:rgb(82, 134, 218); }
          .status-under-maintenance { background-color: #fef3c7; color: #92400e; }
          .status-retired { background-color: #f3f4f6; color: #dc2626; }
          .status-disposed { background-color: #fee2e2; color: #dc2626; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${reportTitle}</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Department</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Serial Number</th>
              <th>Location</th>
              <th>Purchase Date</th>
              <th>Warranty Expiry</th>
            </tr>
          </thead>
          <tbody>
            ${normalizedAssets
              .map(
                (asset) => `
              <tr>
                <td>${asset.id}</td>
                <td>${asset.assetName}</td>
                <td>${asset.categoryName}</td>
                <td>${asset.departmentName}</td>
                <td><span class="status status-${asset.status.toLowerCase().replace(' ', '-')}">${asset.status}</span></td>
                <td class="currency">$${asset.cost.toLocaleString()}</td>
                <td>${asset.serialNumber}</td>
                <td>${asset.locationAddress}</td>
                <td>${asset.purchaseDate}</td>
                <td>${asset.warrantExpiry}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </body>
    </html>
  `
}

export const exportToHTML = (assets: ExportAsset[], config: ExportConfig) => {
  const { type, filename } = config
  const normalizedAssets = assets.map((asset) => normalizeAssetForHTML(asset, type))
  const reportTitle = type === 'comparison' ? 'Asset Comparison Report' : 'Assets Report'

  const htmlContent =
    type === 'comparison'
      ? generateComparisonHTML(normalizedAssets, reportTitle)
      : generateAllAssetsHTML(normalizedAssets, reportTitle)

  const filePrefix = filename || (type === 'comparison' ? 'asset-comparison' : 'assets-report')
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filePrefix}-${new Date().toISOString().split('T')[0]}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
