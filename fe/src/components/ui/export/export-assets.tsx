import { useState } from 'react'
import { Download, FileText, File, Globe } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Button } from '@/components/ui'
import { exportToCSV } from './export-csv'
import { exportToPDF } from './export-pdf'
import { exportToHTML } from './export-html'
import type { AssetsType } from '@/features/assets/view-all-assets/model'
import type { ComparisonAsset } from '@/features/assets/asset-comparison/model'

type ExportAsset = AssetsType | ComparisonAsset

interface ExportAssetsProps {
  assets: ExportAsset[]
  type: 'comparison' | 'all-assets'
  filename?: string
}

export const ExportAssets = ({ assets, type, filename }: ExportAssetsProps) => {
  const [isExporting, setIsExporting] = useState(false)

  const handleExportCSV = async () => {
    setIsExporting(true)
    try {
      exportToCSV(assets, { type, filename })
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      exportToPDF(assets, { type, filename })
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportHTML = async () => {
    setIsExporting(true)
    try {
      exportToHTML(assets, { type, filename })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          disabled={isExporting}
        >
          <Download className='mr-2 h-4 w-4' />
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleExportCSV}>
          <File className='mr-2 h-4 w-4' />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF}>
          <FileText className='mr-2 h-4 w-4' />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportHTML}>
          <Globe className='mr-2 h-4 w-4' />
          Export as HTML
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
