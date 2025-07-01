import { useState, useEffect } from 'react'
import { Plus, Search, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Card,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Button,
} from '@/components/ui'
import { cn } from '@/lib'
import type { AssetsType } from '../../view-all-assets/model'
import { getAllAssets } from '../../api'

interface SimpleAssetSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectAsset: (asset: AssetsType) => void
  excludeAssetIds: number[]
  currentAsset: AssetsType
}

const getStatusBadgeClasses = (status: string) => {
  return cn(
    'flex items-center gap-1',
    status === 'New' &&
      'border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400',
    status === 'In Use' &&
      'border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    status === 'Under Maintenance' &&
      'border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    status === 'Retired' &&
      'border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300',
    status === 'Disposed' &&
      'border-red-200 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400'
  )
}

export const SimpleAssetSelector = ({
  isOpen,
  onClose,
  onSelectAsset,
  excludeAssetIds,
  currentAsset,
}: SimpleAssetSelectorProps) => {
  const [allAssets, setAllAssets] = useState<AssetsType[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAssets = async () => {
      if (!isOpen) return

      setLoading(true)
      try {
        const assets = await getAllAssets()
        const filteredAssets = assets.data.filter((asset) => asset.category.id === currentAsset.category.id)
        setAllAssets(filteredAssets)
      } catch (error) {
        console.error('Failed to fetch assets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [isOpen, currentAsset.category.id])

  const filteredAssets = allAssets.filter(
    (asset) =>
      !excludeAssetIds.includes(asset.id) &&
      (asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleAssetClick = (asset: AssetsType) => {
    onSelectAsset(asset)
    setSearchTerm('')
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className='max-w-2xl'
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Plus className='h-4 w-4' />
              <span className='text-sm'>Select Device to Compare</span>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={onClose}
              className='hover:bg-muted h-6 w-6 p-0'
            >
              <X className='h-4 w-4' />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='relative'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
            <Input
              placeholder='Search device...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>

          <div className='max-h-96 space-y-2 overflow-y-auto'>
            {loading ? (
              <div className='text-muted-foreground py-8 text-center'>Loading...</div>
            ) : filteredAssets.length === 0 ? (
              <div className='text-muted-foreground py-8 text-center'>
                {searchTerm ? 'No matching products found' : 'No products available for comparison'}
              </div>
            ) : (
              filteredAssets.map((asset) => (
                <Card
                  key={asset.id}
                  className='bg-card hover:bg-muted/50 dark:bg-card/50 dark:hover:bg-muted/80 cursor-pointer transition-colors'
                  onClick={() => handleAssetClick(asset)}
                >
                  <CardContent className='p-3 py-0'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-12 w-12'>
                        <AvatarImage src={asset.imageUpload} />
                        <AvatarFallback>{asset.assetName[0]}</AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <p className='font-medium'>{asset.assetName}</p>
                        <p className='text-muted-foreground text-sm'>{asset.serialNumber}</p>
                        <div className='mt-1 flex gap-2'>
                          <Badge
                            variant='outline'
                            className='text-xs'
                          >
                            {asset.category.categoryName}
                          </Badge>
                          <Badge
                            variant='outline'
                            className={cn('text-xs', getStatusBadgeClasses(asset.status))}
                          >
                            {asset.status}
                          </Badge>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='font-medium'>${asset.cost?.toLocaleString() || '0'}</p>
                        <p className='text-muted-foreground text-sm'>{asset.department.departmentName}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
