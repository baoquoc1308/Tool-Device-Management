import { Badge } from '@/components/ui'
import { cn } from '@/lib'
import type { AssetsType } from '../../view-all-assets/model'
export const AssetBadge = ({ asset }: { asset: AssetsType }) => {
  return (
    <Badge
      variant='outline'
      className={cn(
        'ml-4 flex items-center gap-1',
        asset.status === 'New' && 'border-green-200 bg-green-100 text-green-800',
        asset.status === 'In Use' && 'border-blue-200 bg-blue-100 text-blue-800',
        asset.status === 'Under Maintenance' && 'border-amber-200 bg-amber-100 text-amber-800',
        asset.status === 'Retired' && 'border-slate-200 bg-slate-100 text-slate-800',
        asset.status === 'Disposed' && 'border-red-200 bg-red-100 text-red-800'
      )}
    >
      {asset.status}
    </Badge>
  )
}
