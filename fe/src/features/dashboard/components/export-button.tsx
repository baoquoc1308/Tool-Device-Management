import { Button } from '@/components/ui'
import { Download } from 'lucide-react'
import type { DashboardData } from '../api/type'
import type { AssetsType } from '@/features/assets/view-all-assets/model'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface ExportButtonProps {
  stats: DashboardData
  format: 'csv' | 'pdf'
  assets: AssetsType[]
}

export const ExportButton = ({ stats, format, assets }: ExportButtonProps) => {
  const getStatusCount = (status: string) => {
    return assets.filter((asset) => asset.status === status).length
  }

  const getStatsData = () => {
    const newCount = getStatusCount('New')
    const inUseCount = getStatusCount('In Use')
    const underMaintenanceCount = getStatusCount('Under Maintenance')
    const retiredAndDisposedCount = getStatusCount('Retired') + getStatusCount('Disposed')

    return [
      { label: 'Total Assets', value: stats.total_assets },
      { label: 'Assigned Assets', value: inUseCount },
      { label: 'Under Maintenance', value: underMaintenanceCount },
      { label: 'Retired Assets', value: retiredAndDisposedCount },
      { label: 'New', value: newCount },
    ]
  }

  const getStatusDistribution = () => {
    const total = stats.total_assets
    if (total === 0) return []

    const newCount = getStatusCount('New')
    const inUseCount = getStatusCount('In Use')
    const underMaintenanceCount = getStatusCount('Under Maintenance')
    const retiredAndDisposedCount = getStatusCount('Retired') + getStatusCount('Disposed')

    return [
      {
        status: 'In Use',
        count: inUseCount,
        percentage: ((inUseCount / total) * 100).toFixed(1),
      },
      {
        status: 'Under Maintenance',
        count: underMaintenanceCount,
        percentage: ((underMaintenanceCount / total) * 100).toFixed(1),
      },
      {
        status: 'Retired / Disposed',
        count: retiredAndDisposedCount,
        percentage: ((retiredAndDisposedCount / total) * 100).toFixed(1),
      },
      {
        status: 'New',
        count: newCount,
        percentage: ((newCount / total) * 100).toFixed(1),
      },
    ]
  }

  const handleExportCSV = () => {
    const data = getStatsData()
    const csvContent = data.map((row) => `${row.label},${row.value}`).join('\n')
    const blob = new Blob([`Status,Count\n${csvContent}`], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'assets-dashboard-report.csv'
    link.click()
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()

    // Title
    doc.setFontSize(20)
    doc.text('Assets Dashboard Report', 20, 20)

    // Date
    doc.setFontSize(12)
    const now = new Date()
    doc.text(`Generated on: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 20, 30)

    // First Table - Asset Counts
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

    // Second Table - Status Distribution
    autoTable(doc, {
      head: [['Status', 'Count', 'Percentage']],
      body: getStatusDistribution().map((row) => [row.status, row.count, row.percentage + '%']),
      startY: (doc as any).lastAutoTable.finalY + 15,
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

    // Save PDF
    doc.save('assets-dashboard-report.pdf')
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
