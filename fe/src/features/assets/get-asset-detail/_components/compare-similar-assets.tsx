import { GitCompare } from 'lucide-react'
import { Button } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { AppPaths } from '@/router/path'
import type { AssetsType } from '../../view-all-assets/model'

interface CompareSimilarAssetsProps {
  currentAsset: AssetsType
  className?: string
}

export const CompareSimilarAssets = ({ currentAsset, className }: CompareSimilarAssetsProps) => {
  const navigate = useNavigate()

  const handleCompareWithSimilar = () => {
    navigate(`${AppPaths.ASSET_COMPARISON}?assets=${currentAsset.id}`)
  }

  return (
    <Button
      variant='outline'
      onClick={handleCompareWithSimilar}
      className={`flex w-full items-center gap-2 sm:w-auto ${className}`}
    >
      <GitCompare className='mr-0.5 h-4 w-4' />
      <span className='hidden sm:inline'>Compare with Similar</span>
      <span className='sm:hidden'>Compare with Similar</span>
    </Button>
  )
}
