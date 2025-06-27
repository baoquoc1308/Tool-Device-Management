import { GitCompare } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { AppPaths } from '@/router/path'
import type { AssetsType } from '../model'

interface ComparisonActionsProps {
  selectedAssets: AssetsType[]
  onToggleAsset: (asset: AssetsType) => void
  maxSelection?: number
}

export const ComparisonActions = ({ selectedAssets, onToggleAsset, maxSelection = 4 }: ComparisonActionsProps) => {
  const navigate = useNavigate()

  const handleCompare = () => {
    if (selectedAssets.length < 2) {
      return
    }

    const assetIds = selectedAssets.map((a) => a.id).join(',')
    navigate(`${AppPaths.ASSET_COMPARISON}?assets=${assetIds}`)
  }

  if (selectedAssets.length === 0) return null

  return (
    <div className='bg-card fixed right-4 bottom-4 z-50 rounded-lg border p-4 shadow-lg'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <GitCompare className='h-4 w-4' />
          <span className='text-sm font-medium'>{selectedAssets.length} selected</span>
          <Badge variant='secondary'>{maxSelection - selectedAssets.length} more</Badge>
        </div>

        <div className='flex gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => selectedAssets.forEach(onToggleAsset)}
          >
            Clear
          </Button>
          <Button
            size='sm'
            onClick={handleCompare}
            disabled={selectedAssets.length < 2}
          >
            Compare
          </Button>
        </div>
      </div>
    </div>
  )
}
