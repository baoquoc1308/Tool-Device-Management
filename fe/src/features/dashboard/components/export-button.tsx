import { Button } from '@/components/ui'
import { Download } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { AssetsType } from '@/features/assets/view-all-assets/model'

interface ExportButtonProps {
  format: 'csv' | 'pdf'
  assets: AssetsType[]
}

export const ExportButton = ({ format, assets }: ExportButtonProps) => {
  const getStatusCount = (status: string) => {
    return assets.filter((asset) => asset.status === status).length
  }

  const getStatsData = () => {
    const newCount = getStatusCount('New')
    const inUseCount = getStatusCount('In Use')
    const underMaintenanceCount = getStatusCount('Under Maintenance')
    const retiredCount = getStatusCount('Retired')
    const disposedCount = getStatusCount('Disposed')

    return [
      { label: 'Total Assets', value: assets.length },
      { label: 'New', value: newCount },
      { label: 'In Use', value: inUseCount },
      { label: 'Under Maintenance', value: underMaintenanceCount },
      { label: 'Retired', value: retiredCount },
      { label: 'Disposed', value: disposedCount },
    ]
  }

  const getAssetDetails = () => {
    return assets.map((asset) => ({
      id: asset.id,
      name: asset.assetName,
      category: asset.category?.categoryName || 'N/A',
      department: asset.department?.departmentName || 'N/A',
      status: asset.status,
      cost: asset.cost,
      serialNumber: asset.serialNumber,
      location: asset.department?.location?.locationAddress || 'N/A',
    }))
  }

  const handleExportCSV = () => {
    const assetDetails = getAssetDetails()
    const headers = ['ID', 'Asset Name', 'Category', 'Department', 'Status', 'Cost', 'Serial Number', 'Location']
    const csvContent = [
      headers.join(','),
      ...assetDetails.map((asset) =>
        [
          asset.id,
          `"${asset.name}"`,
          `"${asset.category}"`,
          `"${asset.department}"`,
          asset.status,
          asset.cost,
          `"${asset.serialNumber}"`,
          `"${asset.location}"`,
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'assets-report.csv'
    link.click()
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()

    // Title
    doc.setFontSize(20)
    doc.text('Assets Report', 20, 20)

    // Date
    doc.setFontSize(12)
    const now = new Date()
    doc.text(`Generated on: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 20, 30)

    // Statistics Table
    autoTable(doc, {
      head: [['Status', 'Count']],
      body: getStatsData().map((row) => [row.label, row.value]),
      startY: 40,
      theme: 'grid',
      headStyles: {
        fillColor: [76, 175, 80],
        textColor: [255, 255, 255],
      },
      styles: {
        fontSize: 12,
        cellPadding: 5,
      },
    })

    // Assets Details Table
    const assetDetails = getAssetDetails()
    autoTable(doc, {
      head: [['ID', 'Asset Name', 'Category', 'Department', 'Status', 'Cost', 'Serial Number']],
      body: assetDetails.map((asset) => [
        asset.id,
        asset.name,
        asset.category,
        asset.department,
        asset.status,
        asset.cost,
        asset.serialNumber,
      ]),
      startY: (doc as any).lastAutoTable.finalY + 15,
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

    // Save PDF
    doc.save('assets-report.pdf')
  }

  const handleExport = () => {
    if (format === 'csv') {
      handleExportCSV()
    } else {
      handleExportPDF()
    }
  }

  return (
    <Button
      onClick={handleExport}
      variant='outline'
      size='sm'
      className='gap-2'
    >
      <Download className='h-4 w-4' />
      Export {format.toUpperCase()}
    </Button>
  )
}
