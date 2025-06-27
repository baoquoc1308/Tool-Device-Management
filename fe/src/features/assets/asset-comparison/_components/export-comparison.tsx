import { ExportAssets } from '@/components/ui/export/export-assets'
import type { ComparisonAsset } from '../model'

interface ExportComparisonProps {
  assets: ComparisonAsset[]
}

export const ExportComparison = ({ assets }: ExportComparisonProps) => {
  return (
    <ExportAssets
      assets={assets}
      type='comparison'
    />
  )
}
