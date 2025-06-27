import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
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

const normalizeAssetForPDF = (asset: ExportAsset, type: 'comparison' | 'all-assets') => {
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

export const exportToPDF = (assets: ExportAsset[], config: ExportConfig) => {
  const { type, filename } = config
  const normalizedAssets = assets.map((asset) => normalizeAssetForPDF(asset, type))
  const doc = new jsPDF(type === 'comparison' ? 'l' : 'p', 'mm', 'a4')

  const reportTitle = type === 'comparison' ? 'Asset Comparison Report' : 'Assets Report'

  doc.setFontSize(20)
  doc.text(reportTitle, 20, 20)

  doc.setFontSize(12)
  const now = new Date()
  doc.text(`Generated on: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 20, 30)

  if (type === 'comparison') {
    const tableData = [
      ['Asset Name', ...normalizedAssets.map((asset) => asset.assetName)],
      ['Serial Number', ...normalizedAssets.map((asset) => asset.serialNumber)],
      ['Cost', ...normalizedAssets.map((asset) => `$${asset.cost.toLocaleString()}`)],
      ['Category', ...normalizedAssets.map((asset) => asset.categoryName)],
      ['Department', ...normalizedAssets.map((asset) => asset.departmentName)],
      ['Location', ...normalizedAssets.map((asset) => asset.locationAddress)],
      ['Status', ...normalizedAssets.map((asset) => asset.status)],
      ['Purchase Date', ...normalizedAssets.map((asset) => asset.purchaseDate)],
      ['Warranty Expiry', ...normalizedAssets.map((asset) => asset.warrantExpiry)],
    ]

    autoTable(doc, {
      head: [['Property', ...normalizedAssets.map((_, index) => `Asset ${index + 1}`)]],
      body: tableData,
      startY: 40,
      theme: 'grid',
      headStyles: {
        fillColor: [76, 175, 80],
        textColor: [255, 255, 255],
      },
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
      },
    })
  } else {
    autoTable(doc, {
      head: [['ID', 'Asset Name', 'Category', 'Department', 'Status', 'Cost', 'Serial Number']],
      body: normalizedAssets.map((asset) => [
        asset.id,
        asset.assetName,
        asset.categoryName,
        asset.departmentName,
        asset.status,
        asset.cost,
        asset.serialNumber,
      ]),
      startY: 40,
      theme: 'grid',
      headStyles: {
        fillColor: [76, 175, 80],
        textColor: [255, 255, 255],
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 35 },
        2: { cellWidth: 25 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25 },
        5: { cellWidth: 20 },
        6: { cellWidth: 30 },
      },
    })
  }

  const filePrefix = filename || (type === 'comparison' ? 'asset-comparison' : 'assets-report')
  doc.save(`${filePrefix}-${new Date().toISOString().split('T')[0]}.pdf`)
}
